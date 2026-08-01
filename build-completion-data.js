// Builds the offline Completion Hub data from the public Xenoblade Chronicles DE
// completionist spreadsheet. The guide never fetches at runtime: run this script
// deliberately when refreshing the source snapshot.
//
//   node build-completion-data.js

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SHEET_ID = "1glad9ZiT9Ze42KWdVH-OvNh5KAGJIBv4zlJydWdi6dc";
const SOURCE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`;
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;

const QUEST_SHEETS = [
  "Colony 9", "Tephra Cave", "Bionis' Leg", "Colony 6", "Satorl Marsh",
  "Makna Forest", "Frontier Village", "Eryth Sea", "Alcamoth", "Valak Mountain",
  "Sword Valley +", "Fallen Arm", "Mechonis Field", "Central Factory", "Agniratha"
];

const GRAND_PRIX = {
  "Bionis' Leg": ["Caterpile Circuit", "Twilight Speedway"],
  "Makna Forest": ["Jungle Rumble", "Midnight Forest"],
  "Alcamoth": ["Alcamoth Orbital", "Alcamoth at Dawn"],
  "Valak Mountain": ["Valak Slalom", "Blizzard Rally"],
  "Colony 9": ["Rural Road", "Colony 9 Wild Ride"]
};
const CHARACTERS = ["Shulk", "Reyn", "Sharla", "Dunban", "Melia", "Riki", "Fiora"];
const PAIRS = [];
for (let a = 0; a < CHARACTERS.length; a++) {
  for (let b = a + 1; b < CHARACTERS.length; b++) PAIRS.push([CHARACTERS[a], CHARACTERS[b]]);
}

const COLLECTOPAEDIA = [
  "Colony 9", "Tephra Cave", "Bionis' Leg", "Colony 6", "Ether Mine",
  "Satorl Marsh", "Makna Forest", "Frontier Village", "Eryth Sea", "Alcamoth",
  "High Entia Tomb", "Valak Mountain", "Sword Valley", "Galahad Fortress",
  "Fallen Arm", "Mechonis Field", "Central Factory", "Agniratha",
  "Bionis' Interior", "Other"
];

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ""; }
    else if (c === '\n') { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  return rows;
}

function records(text) {
  const rows = parseCsv(text);
  const headers = (rows.shift() || []).map(h => h.trim());
  return rows.map(row => Object.fromEntries(headers.map((h, i) => [h, (row[i] || "").trim()])));
}

function slug(value) {
  return String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "").slice(0, 64) || "item";
}

function stableId(kind, group, name, disambiguator = "") {
  const raw = [kind, group, name, disambiguator].join("\u001f");
  const hash = crypto.createHash("sha1").update(raw).digest("hex").slice(0, 8);
  return `${kind}-${slug(group)}-${slug(name)}-${hash}`;
}

function isTrue(value) { return /^true$/i.test(value || ""); }
function canonicalCompletionName(value) {
  return ({ "Iternant Dorothea": "Itinerant Dorothea", "Avalange Abaasy": "Avalanche Abaasy" })[value] || value;
}

async function readSheet(name) {
  const res = await fetch(CSV_URL + encodeURIComponent(name), {
    headers: { "user-agent": "XCDE-offline-guide-builder/1.0" }
  });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const text = await res.text();
  if (/^<!doctype html/i.test(text)) throw new Error(`${name}: received HTML instead of CSV`);
  return records(text);
}

function manualCategory() {
  const milestones = [];
  const add = (group, name, details = "", flags = {}) => milestones.push({
    id: stableId("milestone", group, name), name, details, ...flags
  });

  CHARACTERS.forEach(name => add("Max levels", `${name}: reach level 99`));
  CHARACTERS.forEach(name => add("Arts and skills", `${name}: raise every Art to level 12`,
    "Master Arts Manuals become available from the Nopon Archsage after clearing Future Connected."));
  CHARACTERS.forEach(name => add("Arts and skills", `${name}: unlock both extra skill branches and learn every skill`));
  PAIRS.forEach(([a, b]) => add("Party affinity", `${a} + ${b}: reach maximum party affinity`));
  ["Colony 9", "Colony 6", "Central Bionis", "Upper Bionis", "Hidden Village"]
    .forEach(name => add("Area affinity", `${name}: reach 5-star Area Affinity`));
  COLLECTOPAEDIA.forEach(name => add("Collectopaedia", `${name}: complete the page`));
  ["Housing", "Commerce", "Nature", "Special"].forEach(name =>
    add("Colony 6", `${name}: reconstruct to level 5`));
  add("Colony 6", "Population: invite all 150 residents");
  add("Exploration", "Reveal every map and visit every landmark, location and secret area",
    "Area maps fill automatically after every named location is found; permanently sealed Mechonis areas must be finished before their lockouts.");
  add("Collections", "Obtain Mumkhar's Razor from Kurralth on Valak Mountain",
    "Trade with Kurralth while he is on Valak Mountain, before the Mechonis Core cutoff. This item is permanently missable.", { missable: true });
  add("Collections", "Obtain every fashion appearance that can be collected on this file",
    "Buy one of every shop-exclusive appearance before Sword Valley, Hidden Machina Village and Agniratha shop inventories disappear.", { missable: true });
  add("Collections", "Earn S rank in every available Time Attack challenge in Restricted and Free Mode");

  const order = ["Max levels", "Arts and skills", "Party affinity", "Area affinity", "Collectopaedia", "Colony 6", "Exploration", "Collections"];
  return {
    id: "milestones", title: "World & maxing", description: "End-state goals not represented by a single quest, achievement or monster entry.",
    groups: order.map(title => ({ title, items: milestones.filter(item => {
      const raw = item.id.split("-");
      return item.id.includes(`milestone-${slug(title)}-`);
    }) }))
  };
}

function futureConnectedCategory() {
  const groups = [
    { title: "Story and quests", names: [
      "Clear every side quest", "Recruit all 12 Ponspectors", "Defeat the Fog King"
    ] },
    { title: "Exploration", names: [
      "Defeat all 20 Unique Monsters on Bionis' Shoulder", "Find every landmark, location and secret area",
      "Complete Shoulder Survey Snaps"
    ] },
    { title: "Return to the main game", names: [
      "Buy the Master Arts Manuals needed to raise every main-game Art to level 12"
    ] }
  ];
  return {
    id: "future-connected", title: "Future Connected", description: "Separate-save epilogue goals. Ponspectors power Union Strikes; they do not replace playable party members.",
    groups: groups.map(group => ({
      title: group.title,
      items: group.names.map(name => ({ id: stableId("fc", group.title, name), name }))
    }))
  };
}

async function main() {
  console.log("Downloading public source sheets...");
  const questRows = await Promise.all(QUEST_SHEETS.map(async area => ({ area, rows: await readSheet(area) })));
  const [achievementRows, monsterRows, heartRows] = await Promise.all([
    readSheet("Achievements"), readSheet("Unique Monsters"), readSheet("Heart-to-Hearts")
  ]);

  const questGroups = questRows.map(({ area, rows }) => ({
    title: area === "Sword Valley +" ? "Sword Valley, Galahad Fortress & Mechonis Core" : area,
    items: rows.filter(r => r["Quest Name"]).map(r => ({
      id: stableId("quest", area, r["Quest Name"], `${r["Quest Giver"]}|${r["Time and Location"]}`),
      name: r["Quest Name"],
      meta: [r["Quest Giver"], r["Time and Location"]].filter(Boolean).join(" · "),
      details: [r["Requirements"] && `Requires: ${r["Requirements"]}`, r["Objectives"]].filter(Boolean).join(" — "),
      branch: isTrue(r["Mutually Exclusive?"]), timed: isTrue(r["Timed Quest?"])
    }))
  }));

  const achievementItems = achievementRows.filter(r => r.Name).map(r => ({
    id: stableId("achievement", isTrue(r.Trial) ? "Trials" : "Records", r.Name),
    name: r.Name, details: r.Objective,
    missable: ["Heartwarming", "Heartbreaking", "The Brave Protectors"].includes(r.Name)
  }));
  const monsterItems = monsterRows.filter(r => r.Name).map(r => ({
    id: stableId("monster", "base-game", canonicalCompletionName(r.Name)), name: canonicalCompletionName(r.Name),
    meta: [`Lv ${r.Level}`, r["Location and Time"]].filter(Boolean).join(" · "),
    details: isTrue(r["Quest Monster?"]) ? `Quest monster${r["Quest Name"] ? `: ${r["Quest Name"]}` : ""}` : "",
    quest: isTrue(r["Quest Monster?"])
  }));
  const heartItems = heartRows.filter(r => r.Title).map(r => ({
    id: stableId("heart", r.Location, r.Title, r.Characters), name: r.Title,
    meta: [r.Characters, r.Affinity, r.Location].filter(Boolean).join(" · "), details: r.Prerequisites
  }));

  const gpGroups = Object.entries(GRAND_PRIX).map(([area, courses]) => ({
    title: area,
    items: courses.flatMap(course => CHARACTERS.map(character => ({
      id: stableId("grand-prix", area, `${course}: ${character}`),
      name: `${course}: ${character}`, meta: "Clear this character-course combination"
    })))
  }));

  const data = {
    version: 1,
    generated: new Date().toISOString().slice(0, 10),
    source: { label: "XCDE 100% Completionist Checklist", url: SOURCE_URL },
    categories: [
      { id: "quests", title: "Base-game quests", description: "Every quest outcome in the source ledger. Resolve mutually exclusive alternatives with Not my branch.", groups: questGroups },
      { id: "achievements", title: "Achievements", description: "50 Trials and 150 Records.", groups: [
        { title: "Trials", items: achievementItems.filter(i => i.id.includes("achievement-trials-")) },
        { title: "Records", items: achievementItems.filter(i => i.id.includes("achievement-records-")) }
      ] },
      { id: "monsters", title: "Unique Monsters", description: "All 157 base-game Unique Monsters. First kills award Affinity Coins.", groups: [{ title: "Base game", items: monsterItems }] },
      { id: "hearts", title: "Heart-to-Hearts", description: "All 63 scenes. These are not permanently missable.", groups: [{ title: "All scenes", items: heartItems }] },
      { id: "grand-prix", title: "Nopon Grand Prix", description: "70 character-course clears; each row resolves when both modes are cleared.", groups: gpGroups },
      manualCategory(),
      futureConnectedCategory()
    ]
  };

  const expected = { quests: 480, achievements: 200, monsters: 157, hearts: 63, "grand-prix": 70 };
  const ids = new Set();
  for (const category of data.categories) {
    const count = category.groups.reduce((n, group) => n + group.items.length, 0);
    if (expected[category.id] && count !== expected[category.id]) {
      throw new Error(`${category.id}: expected ${expected[category.id]}, received ${count}`);
    }
    for (const group of category.groups) for (const item of group.items) {
      if (ids.has(item.id)) throw new Error(`Duplicate completion id: ${item.id}`);
      ids.add(item.id);
    }
  }

  const out = `// Generated by build-completion-data.js on ${data.generated}. Do not edit by hand.\n` +
    `const COMPLETION_DATA = ${JSON.stringify(data, null, 2)};\n`;
  const file = path.join(__dirname, "data", "completion-data.js");
  fs.writeFileSync(file, out, "utf8");
  console.log(`Wrote ${path.relative(__dirname, file)} with ${ids.size} stable checklist items.`);
}

main().catch(error => { console.error(error.stack || error); process.exit(1); });
