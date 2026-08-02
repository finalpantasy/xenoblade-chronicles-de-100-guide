#!/usr/bin/env node
"use strict";

// Builds the Gift Optimizer's complete recipient-affinity matrix from Game8's
// eight published collectable tables, then combines it with small, reviewed
// mechanical datasets used by the other Workshop assistants.
const fs = require("node:fs");
const path = require("node:path");

const SOURCE_URL = "https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/289015";
const OUTPUT = path.join(__dirname, "data", "workshop-data.js");
const CATEGORIES = ["Vegetable", "Fruit", "Flower", "Animal", "Bug", "Nature", "Parts", "Strange"];
const CHARACTERS = ["shulk", "reyn", "fiora", "dunban", "sharla", "riki", "melia"];

function decode(value) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<hr[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseGiftTables(html) {
  const tables = [...html.matchAll(/<table[^>]*>[\s\S]*?<\/table>/gi)]
    .map(match => match[0])
    .filter(table => /Collectable/i.test(table) && />Shu</i.test(table));
  if (tables.length !== CATEGORIES.length) throw new Error(`Expected ${CATEGORIES.length} gift tables, found ${tables.length}.`);
  const gifts = [];
  tables.forEach((table, tableIndex) => {
    const rows = [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].slice(1);
    rows.forEach(row => {
      const cells = [...row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(cell => cell[1]);
      if (cells.length !== 8) return;
      // Game8 separates the collectable name and area with an <hr>. Split the
      // raw HTML first: decode() intentionally normalizes all whitespace and
      // would otherwise erase the delimiter, merging e.g. "Sweet Wasabi" and
      // "Colony 9" while assigning every row to Other.
      const [nameCell, ...areaCells] = cells[0].split(/<hr[^>]*>/i);
      const name = decode(nameCell || "");
      const area = decode(areaCells.join(" ")) || "Other";
      const values = cells.slice(1).map(cell => Number.parseInt(decode(cell), 10));
      if (!name || values.some(value => !Number.isFinite(value))) return;
      gifts.push({ id: `gift-${gifts.length + 1}`, name, area, category: CATEGORIES[tableIndex], affinity: Object.fromEntries(CHARACTERS.map((id, index) => [id, values[index]])) });
    });
  });
  if (gifts.length < 150) throw new Error(`Gift extraction looks incomplete (${gifts.length} rows).`);
  const areas = new Set(gifts.map(gift => gift.area));
  if (areas.size < 10 || gifts.every(gift => gift.area === "Other")) {
    throw new Error(`Gift area extraction looks incomplete (${areas.size} distinct areas).`);
  }
  return gifts;
}

const staticData = {
  schemaVersion: 1,
  generated: new Date().toISOString().slice(0, 10),
  sources: [
    { id: "game8-gifts", label: "Game8 — Presents Guide", url: SOURCE_URL, use: "complete gift affinity matrix and item areas" },
    { id: "wiki-crafting", label: "Xenoblade Wiki — Gem Crafting", url: "https://xenoblade.fandom.com/wiki/Gem_Crafting", use: "flame behavior, engineer tendencies, Heat and Mega Heat thresholds" },
    { id: "game8-crafting", label: "Game8 — Gem Crafting Guide", url: "https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/289812", use: "recommended Shooter / Engineer pairs" },
    { id: "gamefaqs-arts", label: "GameFAQs — Arts Guide", url: "https://gamefaqs.gamespot.com/switch/272738-xenoblade-chronicles-definitive-edition/faqs/65244", use: "Art colors and Chain Attack color rules" },
    { id: "wiki-chain", label: "Xenoblade Wiki — Chain Attack (XC1)", url: "https://xenoblade.fandom.com/wiki/Chain_Attack_(XC1)", use: "Talent Art wildcard and chain multiplier behavior" }
  ],
  gemTargets: ["Agility Up", "Night Vision", "Spike Defence", "Topple Plus", "Debuff Resist", "Divine Protect", "Haste", "Double Attack", "Strength Up", "Ether Up", "HP Up", "Physical Def Up", "Ether Def Up", "Aggro Up", "Aggro Down", "Heat Sink"],
  gemPairs: {
    strong: [
      { shooter: "shulk", engineer: "reyn", unlock: 1, why: "Shulk can trigger Fever; Reyn strongly favors Strong Flame." },
      { shooter: "dunban", engineer: "reyn", unlock: 5, why: "Dunban rewards a steady flame; Reyn strongly favors Strong Flame." },
      { shooter: "riki", engineer: "reyn", unlock: 7, why: "Definitive Edition fixes Riki's Shooter behavior; repeated Strong Flame cycles make this the consistent late option." }
    ],
    medium: [
      { shooter: "melia", engineer: "fiora", unlock: 12, why: "Melia boosts Medium Flame gains and Fiora has a 90% Medium Flame tendency." },
      { shooter: "riki", engineer: "fiora", unlock: 12, why: "Riki repeats cycles while Fiora overwhelmingly produces Medium Flame." },
      { shooter: "dunban", engineer: "fiora", unlock: 12, why: "Fiora holds Medium Flame steady so Dunban's Shooter ability can contribute." }
    ],
    gentle: [
      { shooter: "sharla", engineer: "riki", unlock: 7, why: "Sharla boosts Gentle Flame and Riki has an 80% Gentle Flame tendency." },
      { shooter: "shulk", engineer: "riki", unlock: 7, why: "A practical cylinder-prep pair when Sharla is not being used." },
      { shooter: "fiora", engineer: "riki", unlock: 12, why: "Fiora begins with three cylinder gauges; Riki strongly favors Gentle Flame." }
    ]
  },
  chainArts: {
    shulk: [
      { name: "Stream Edge", color: "pink", effect: "Break", note: "Area Break." },
      { name: "Air Slash", color: "pink", effect: "Break", unlock: 3, note: "Single-target Break plus Slow when positioned." },
      { name: "Shaker Edge", color: "yellow", effect: "Daze", unlock: 5, note: "Dazes a Toppled target." },
      { name: "Back Slash", color: "red", effect: "Damage", note: "Best from behind." },
      { name: "Slit Edge", color: "red", effect: "Debuff", note: "Physical defence down from the side." },
      { name: "Monado Art", color: "talent", effect: "Wildcard", note: "Preserves multiplier and lets the next Art establish a new color." }
    ],
    reyn: [
      { name: "Wild Down", color: "green", effect: "Topple", note: "Requires Break." },
      { name: "Shield Bash", color: "yellow", effect: "Daze", note: "Requires Topple." },
      { name: "Sword Drive", color: "red", effect: "Damage", note: "High physical burst." },
      { name: "Bone Upper", color: "red", effect: "Talent gain", note: "Builds Talent Gauge for Mad Taunt." },
      { name: "Mad Taunt", color: "talent", effect: "Wildcard", note: "Talent Art wildcard in a Chain Attack." }
    ],
    sharla: [
      { name: "Metal Blast", color: "pink", effect: "Break", note: "Line Break." },
      { name: "Head Shot", color: "red", effect: "Damage", note: "Can instantly defeat a Dazed non-boss enemy." },
      { name: "Heal Round", color: "blue", effect: "Heal", note: "Party recovery." }
    ],
    dunban: [
      { name: "Steel Strike", color: "green", effect: "Topple", note: "Requires Break." },
      { name: "Thunder", color: "yellow", effect: "Daze", unlock: 7, note: "Dazes a Toppled target while an Aura is active." },
      { name: "Gale Slash", color: "red", effect: "Damage", note: "Starts several Dunban combos." },
      { name: "Worldly Slash", color: "red", effect: "Debuff", note: "Physical defence down." },
      { name: "Blossom Dance", color: "talent", effect: "Wildcard", note: "Four-stage Talent Art and color bridge." }
    ],
    melia: [
      { name: "Spear Break", color: "red", effect: "Damage", note: "Sets Starlight Kick." },
      { name: "Starlight Kick", color: "green", effect: "Topple", unlock: 7, note: "Topples after Spear Break without needing Break." },
      { name: "Element Discharge", color: "talent", effect: "Wildcard", note: "Talent Art wildcard; discharged element controls the actual effect." }
    ],
    riki: [
      { name: "Roly-Poly", color: "green", effect: "Topple", note: "Requires Break." },
      { name: "Bitey Bitey", color: "red", effect: "Damage", note: "Physical damage and Bleed." },
      { name: "Say Sorry", color: "red", effect: "Damage", note: "Consumes target debuffs for burst." },
      { name: "Lurgy", color: "purple", effect: "Ether DoT", note: "Poison damage over time." },
      { name: "Burninate", color: "purple", effect: "Ether DoT", unlock: 7, note: "Blaze damage over time." },
      { name: "Yoink!", color: "talent", effect: "Wildcard", note: "Talent Art wildcard." }
    ],
    fiora: [
      { name: "Final Cross", color: "green", effect: "Topple", unlock: 12, note: "Returned Fiora only; Topples in the required high-tension state." },
      { name: "Cross Impact", color: "yellow", effect: "Daze", unlock: 12, note: "Returned Fiora only; Dazes a Toppled target." },
      { name: "Double Wind", color: "red", effect: "Damage", unlock: 12, note: "Returned Fiora only; multi-target physical damage." },
      { name: "Talent Art", color: "talent", effect: "Wildcard", unlock: 12, note: "Returned Fiora's current Talent Art bridges colors." }
    ]
  },
  chemistry: {
    shulk: { tags: ["break", "physical", "vision", "support"], ai: 1, player: 3 },
    reyn: { tags: ["tank", "topple", "daze", "physical"], ai: 3, player: 2 },
    sharla: { tags: ["heal", "break", "ether", "cleanse"], ai: 2, player: 2 },
    dunban: { tags: ["tank", "topple", "daze", "physical", "evasion"], ai: 3, player: 3 },
    melia: { tags: ["ether", "topple", "burst"], ai: 0, player: 3 },
    riki: { tags: ["heal", "topple", "ether", "physical", "support"], ai: 3, player: 3 },
    fiora: { tags: ["heal", "topple", "daze", "physical", "burst"], ai: 2, player: 3 },
    "fc-shulk": { tags: ["break", "physical", "support"], ai: 1, player: 3 },
    "fc-melia": { tags: ["ether", "topple", "burst"], ai: 0, player: 3 },
    kino: { tags: ["heal", "break", "ether", "cleanse"], ai: 3, player: 2 },
    nene: { tags: ["tank", "topple", "physical"], ai: 3, player: 2 }
  }
};

async function main() {
  const response = await fetch(SOURCE_URL, { headers: { "user-agent": "Mozilla/5.0 XCDE Guide data builder" } });
  if (!response.ok) throw new Error(`Gift source returned HTTP ${response.status}.`);
  const gifts = parseGiftTables(await response.text());
  const data = { ...staticData, gifts };
  fs.writeFileSync(OUTPUT, `// Generated by build-workshop-data.js. Do not edit gift rows by hand.\nconst WORKSHOP_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
  console.log(`Wrote ${path.relative(__dirname, OUTPUT)} with ${gifts.length} gifts.`);
}

main().catch(error => { console.error(error.stack || error.message); process.exitCode = 1; });
