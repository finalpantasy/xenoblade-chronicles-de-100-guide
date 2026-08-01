// Builds an offline XCDE Monsterpedia snapshot. It deliberately writes only after
// every required roster download succeeds, so a failed refresh never destroys a
// known-good data/monsterpedia-data.js.
//
//   node build-monsterpedia-data.js
//   node build-monsterpedia-data.js --refresh-drops
//   node build-monsterpedia-data.js --refresh-images
//
// Sources are public Fandom wiki pages. Rates are retained only where the page's
// chest template exposes a numeric rate; omitted rates are intentionally unknown.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");

const API = "https://xenoblade.fandom.com/api.php";
const ROSTER_PAGE = "List of Enemies in Xenoblade Chronicles";
const OUT = path.join(__dirname, "data", "monsterpedia-data.js");
const IMAGE_DIR = path.join(__dirname, "assets", "monster-images");
const REFRESH_DROPS = process.argv.includes("--refresh-drops");
const REFRESH_IMAGES = process.argv.includes("--refresh-images");
const BUILD_STAMP = "source-snapshot";
// Three roster pages do not publish a page-image thumbnail even though the wiki
// hosts an exact enemy file. Keep these explicit so the offline guide never swaps
// in invented art or a misleading species representative.
const PORTRAIT_FILE_OVERRIDES = Object.freeze({
  "Clap Bunniv": "File:Clap Bunniv.jpg",
  "Energy Device": "File:Energy Device.jpg",
  "M32 Transport Unit": "File:Mechon M32 Transport Unit.jpg"
});
const SOURCE = {
  roster: `${API}?action=parse&format=json&page=${encodeURIComponent(ROSTER_PAGE)}&prop=wikitext`,
  enemy: title => `${API}?action=parse&format=json&page=${encodeURIComponent(title)}&prop=wikitext`
};
const PAGE = title => {
  const [page, anchor] = String(title).split("#", 2);
  return `https://xenoblade.fandom.com/wiki/${encodeURIComponent(page.replace(/ /g, "_"))}${anchor ? `#${encodeURIComponent(anchor.replace(/ /g, "_"))}` : ""}`;
};

function slug(s) { return String(s).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "enemy"; }
function id(game, name, area, n) { return `monster-${game}-${slug(name)}-${crypto.createHash("sha1").update(`${game}\x1f${name}\x1f${area}\x1f${n}`).digest("hex").slice(0, 8)}`; }
function levelBounds(value) { const values = String(value).match(/\d+/g)?.map(Number) || []; return { levelMin: values[0] ?? null, levelMax: values.at(-1) ?? null }; }
function areaName(value) { return String(value).replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim(); }
function imageExtension(url) { return (String(url).split("?")[0].match(/\.(png|jpe?g|webp|gif)$/i)?.[1] || "jpg").toLowerCase().replace("jpeg", "jpg"); }
function flags(category, conditions) {
  const c = String(category).toLowerCase(), s = String(conditions).toLowerCase();
  return {
    unique: c.includes("unique monster"), boss: c.includes("boss"), questOnly: c.includes("quest exclusive") || /\bduring\b/.test(s),
    timeSpecific: /night|daytime|\bday\b|\d{1,2}:\d{2}/.test(s),
    weatherSpecific: /weather|rain|storm|blizzard|snow|fog|clear|torrid/.test(s)
  };
}
function text(s) {
  return String(s || "").replace(/<!--.*?-->/gs, "").replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "").replace(/<br\s*\/?\s*>/gi, "; ").replace(/''+/g, "")
    .replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
async function get(url) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 30000);
  try { const res = await fetch(url, { headers: { "user-agent": "XCDE-Monsterpedia-offline-builder/1.0" }, signal: controller.signal }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return await res.json(); }
  finally { clearTimeout(timer); }
}
async function getBinary(url) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 30000);
  try { const res = await fetch(url, { headers: { "user-agent": "XCDE-Monsterpedia-offline-builder/1.0" }, signal: controller.signal }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return Buffer.from(await res.arrayBuffer()); }
  finally { clearTimeout(timer); }
}
function section(wikitext, heading) {
  const start = wikitext.indexOf(heading); if (start < 0) return "";
  const end = wikitext.indexOf("\n==", start + heading.length); return wikitext.slice(start, end < 0 ? undefined : end);
}
function parseRows(block, game) {
  const table = block.slice(block.indexOf("{|"));
  const rawRows = table.split("\n|-").slice(1);
  const out = [];
  for (const raw of rawRows) {
    const cells = raw.split("\n").filter(l => /^\|/.test(l) && !/^\|-/.test(l)).join("\n").replace(/^\|\s*/gm, "").split(/\s*\|\|\s*/).map(c => text(c.replace(/^rowspan="\d+"\s*\|/i, "").replace(/^style="[^"]*"\s*\|/i, "")));
    if (cells.length < 6 || !cells[0] || /^Name$/i.test(cells[0])) continue;
    // Preserve a piped link target for identity (e.g. Ancient Machine left/right),
    // while text() keeps the readable label everywhere else.
    const nameCell = raw.split("\n").filter(l => /^\|/.test(l) && !/^\|-/.test(l)).join("\n").replace(/^\|\s*/gm, "").split(/\s*\|\|\s*/)[0] || "";
    const target = nameCell.match(/\[\[([^\]|]+)/);
    const [displayName, area, level, species, spawn, category] = cells;
    const name = text(target ? target[1] : displayName);
    // Continuation rows created by rowspan have no name/category and are not a new enemy.
    if (!name || !category || !/(Enemy|Monster|Boss)/i.test(category)) continue;
    const normalizedCategory = category.replace(/[}]+$/g, "").replace(/\s+/g, " ").trim();
    out.push({ id: id(game, name, area, out.length), name, game, category: normalizedCategory, level, ...levelBounds(level), species, area, areaName: areaName(area), conditions: spawn, ...flags(normalizedCategory, spawn), drops: { confirmed: [] }, source: { page: name, url: PAGE(name), apiUrl: SOURCE.enemy(name) } });
  }
  return out;
}
function parameter(template, key) { const m = template.match(new RegExp(`\\|\\s*${key}\\s*=\\s*([^\\n|}]+)`, "i")); return m ? text(m[1]) : ""; }
function dropsFrom(wikitext) {
  const drops = []; const seen = new Set();
  for (const match of wikitext.matchAll(/\{\{Chest (Wood|Silver|Gold)\s*([\s\S]*?)\n\}\}/gi)) {
    const chest = match[1]; const body = match[2];
    for (const line of body.split("\n")) {
      const item = line.match(/^\|\s*(?:material|weapon|uweapon|armour|uarmour|artbook)\d*\s*=\s*(.+)$/i);
      if (!item) continue;
      const raw = text(item[1]); if (!raw || raw === "-" || /^\d+$/.test(raw)) continue;
      const key = (line.match(/^\|\s*([^=\s]+)/) || [])[1] || "";
      const num = (key.match(/\d+/) || [""])[0];
      const rateKey = key.replace(/\d+$/, "").replace(/^(material|weapon|uweapon|armour|uarmour|artbook)/i, m => ({ material: "mrate", weapon: "wrate", uweapon: "uwrate", armour: "arate", uarmour: "uarate", artbook: "abrate" }[m.toLowerCase()] || "")) + num;
      const rate = parameter(body, rateKey);
      const entry = { item: raw, chest }; if (/^\d+(?:\.\d+)?%?$/.test(rate)) entry.rate = rate.endsWith("%") ? rate : `${rate}%`;
      if (entry.rate && Number.parseFloat(entry.rate) === 0) continue;
      const sig = `${entry.item}|${entry.chest}|${entry.rate || ""}`; if (!seen.has(sig)) { seen.add(sig); drops.push(entry); }
    }
  }
  return drops;
}
async function mapLimit(values, limit, fn) { const results = new Array(values.length); let next = 0; await Promise.all(Array.from({ length: limit }, async () => { while (next < values.length) { const i = next++; results[i] = await fn(values[i], i); } })); return results; }
async function pageImages(entries) {
  const images = new Map();
  const imagePage = entry => String(entry.source?.page || entry.name).split("#", 1)[0].trim();
  const unique = [...new Map(entries.map(entry => [imagePage(entry), entry])).values()];
  for (let start = 0; start < unique.length; start += 40) {
    const batch = unique.slice(start, start + 40);
    const url = `${API}?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=320&titles=${encodeURIComponent(batch.map(imagePage).join("|"))}`;
    const pages = Object.values((await get(url)).query?.pages || {});
    for (const page of pages) if (page.title && page.thumbnail?.source) images.set(page.title, page.thumbnail.source);
  }
  return { images, imagePage };
}
async function overrideFileImages() {
  const names = Object.keys(PORTRAIT_FILE_OVERRIDES);
  const url = `${API}?action=query&format=json&prop=imageinfo&iiprop=url&iiurlwidth=320&titles=${encodeURIComponent(names.map(name => PORTRAIT_FILE_OVERRIDES[name]).join("|"))}`;
  const pages = Object.values((await get(url)).query?.pages || {});
  const byFile = new Map(pages.map(page => [page.title, page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url]).filter(([, image]) => image));
  return new Map(names.map(name => [name, { file: PORTRAIT_FILE_OVERRIDES[name], url: byFile.get(PORTRAIT_FILE_OVERRIDES[name]) }]).filter(([, image]) => image.url));
}
async function cacheImages(entries) {
  console.log(`Refreshing portrait metadata for ${entries.length} enemies...`);
  const { images, imagePage } = await pageImages(entries);
  const overrides = await overrideFileImages();
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  let cached = 0, missing = 0, failures = 0;
  await mapLimit(entries, 6, async (entry, i) => {
    const override = overrides.get(entry.name);
    const url = images.get(imagePage(entry)) || override?.url;
    if (!url) { missing++; return; }
    const local = `assets/monster-images/${entry.id}.${imageExtension(url)}`;
    const disk = path.join(__dirname, local);
    try {
      if (REFRESH_IMAGES || !fs.existsSync(disk)) fs.writeFileSync(disk, await getBinary(url));
      entry.image = { local, url, sourcePage: entry.source.url, ...(override ? { sourceFile: PAGE(override.file) } : {}) };
      cached++;
    } catch (error) { failures++; entry.imageError = String(error.message || error); }
    if ((i + 1) % 100 === 0) console.log(`Portraits ${i + 1}/${entries.length}`);
  });
  console.log(`Portrait cache: ${cached} ready, ${missing} not supplied by page image metadata, ${failures} download failures.`);
}
function validate(data) {
  const ids = new Set(); const names = new Set();
  for (const e of data.entries) { if (ids.has(e.id)) throw new Error(`Duplicate ID: ${e.id}`); ids.add(e.id); const key = `${e.game}|${e.name}|${e.area}`; if (names.has(key)) throw new Error(`Duplicate roster entry: ${key}`); names.add(key); if (!e.name || !e.category || !e.level || !e.area || !e.areaName || e.levelMin === null || e.levelMax === null) throw new Error(`Incomplete roster row: ${e.name}`); for (const d of e.drops.confirmed) { if (d.rate && Number.parseFloat(d.rate) === 0) throw new Error(`Unavailable drop retained: ${e.name} / ${d.item}`); } }
  const base = data.entries.filter(e => e.game === "base").length, fc = data.entries.filter(e => e.game === "future-connected").length;
  if (base < 500 || fc < 50) throw new Error(`Unexpected roster size (base ${base}, FC ${fc})`);
}
function existingDrops() {
  if (!fs.existsSync(OUT)) return new Map();
  const context = {};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(OUT, "utf8").replace("const MONSTERPEDIA_DATA", "MONSTERPEDIA_DATA"), context, { filename: OUT });
  return new Map((context.MONSTERPEDIA_DATA?.entries || []).map(entry => [
    `${entry.game}\x1f${entry.name}\x1f${entry.area}`,
    entry.drops
  ]));
}
function existingImages() {
  if (!fs.existsSync(OUT)) return new Map();
  const context = {};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(OUT, "utf8").replace("const MONSTERPEDIA_DATA", "MONSTERPEDIA_DATA"), context, { filename: OUT });
  return new Map((context.MONSTERPEDIA_DATA?.entries || []).map(entry => [
    `${entry.game}\x1f${entry.name}\x1f${entry.area}`,
    entry.image
  ]));
}
async function main() {
  console.log("Downloading canonical enemy roster...");
  const roster = (await get(SOURCE.roster)).parse?.wikitext?.["*"]; if (!roster) throw new Error("Roster page did not contain wikitext");
  const base = parseRows(section(roster, "== {{XC|-}} =="), "base");
  const fc = parseRows(section(roster, "== {{XCFC|sub}} =="), "future-connected");
  const data = { version: 1, generated: BUILD_STAMP, source: { label: "Xenoblade Wiki: List of Enemies in Xenoblade Chronicles", url: PAGE(ROSTER_PAGE), apiUrl: SOURCE.roster, accessed: BUILD_STAMP }, ratePolicy: "Rates appear only when the cited enemy page explicitly exposes a numeric chest-template rate. Absence means unverified, not zero.", entries: [...base, ...fc] };
  validate(data);
  if (REFRESH_DROPS) {
    console.log(`Refreshing explicit chest drops for ${data.entries.length} entries...`);
    await mapLimit(data.entries, 6, async (entry, i) => { try { const page = await get(entry.source.apiUrl || entry.source.url); entry.drops.confirmed = dropsFrom(page.parse?.wikitext?.["*"] || ""); } catch (error) { entry.drops.refreshError = String(error.message || error); } if ((i + 1) % 100 === 0) console.log(`${i + 1}/${data.entries.length}`); });
  } else {
    const previous = existingDrops(); let restored = 0;
    for (const entry of data.entries) {
      const prior = previous.get(`${entry.game}\x1f${entry.name}\x1f${entry.area}`);
      if (prior) { entry.drops = prior; restored++; }
    }
    if (previous.size) {
      if (restored !== data.entries.length) throw new Error(`Refusing partial drop carry-forward: matched ${restored}/${data.entries.length} current enemies`);
      console.log(`Preserved verified drop snapshots for ${restored} enemies. Use --refresh-drops to download them again.`);
    }
  }
  if (REFRESH_IMAGES) {
    await cacheImages(data.entries);
  } else {
    const previous = existingImages(); let restored = 0;
    for (const entry of data.entries) {
      const prior = previous.get(`${entry.game}\x1f${entry.name}\x1f${entry.area}`);
      if (prior?.local && fs.existsSync(path.join(__dirname, prior.local))) { entry.image = prior; restored++; }
    }
    if (restored) console.log(`Preserved cached portraits for ${restored} enemies. Use --refresh-images to download or repair them.`);
  }
  const counts = Object.fromEntries(["base", "future-connected"].map(game => [game, data.entries.filter(e => e.game === game).length]));
  const byCategory = Object.fromEntries([...new Set(data.entries.map(e => e.category))].sort().map(c => [c, data.entries.filter(e => e.category === c).length]));
  data.counts = { ...counts, total: data.entries.length, byCategory, dropsWithExplicitRates: data.entries.filter(e => e.drops.confirmed.some(d => d.rate)).length, portraits: data.entries.filter(entry => entry.image?.local).length };
  validate(data);
  const output = `// Generated by build-monsterpedia-data.js on ${data.generated}. Do not edit by hand.\nconst MONSTERPEDIA_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof window !== "undefined") window.MONSTERPEDIA_DATA = MONSTERPEDIA_DATA;\n`;
  const temp = `${OUT}.tmp`; fs.writeFileSync(temp, output, "utf8"); fs.renameSync(temp, OUT);
  console.log(JSON.stringify(data.counts, null, 2));
}
main().catch(error => { console.error(`Monsterpedia build failed: ${error.stack || error}`); process.exitCode = 1; });
