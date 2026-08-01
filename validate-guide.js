// Offline regression checks for the guide and its generated completion snapshot.
// Run: node validate-guide.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = __dirname;
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const loadConst = (file, name) => {
  const context = {};
  vm.createContext(context);
  vm.runInContext(read(file).replace(`const ${name}`, name), context, { filename: file });
  return context[name];
};
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const route = loadConst("data/route-data.js", "ROUTE");
const completion = loadConst("data/completion-data.js", "COMPLETION_DATA");
const monsterpedia = loadConst("data/monsterpedia-data.js", "MONSTERPEDIA_DATA");
const world = loadConst("data/world-data.js", "WORLD_DATA");
const builds = loadConst("data/build-data.js", "BUILD_DATA");
const collectopaedia = loadConst("data/collectopaedia-data.js", "COLLECTOPAEDIA_DATA");
const atlas = loadConst("data/map-atlas-data.js", "MAP_ATLAS_DATA");
const coordinates = loadConst("data/map-coordinates-data.js", "MAP_COORDINATE_DATA");
const dossiers = loadConst("data/combat-dossier-data.js", "COMBAT_DOSSIER_DATA");
const affinity = loadConst("data/affinity-data.js", "AFFINITY_DATA");
const frontier = loadConst("data/frontier-map-data.js", "FRONTIER_MAP_DATA");
const bindings = loadConst("data/route-bindings-data.js", "ROUTE_BINDINGS_DATA");
const html = read("index.html");
const heartsResearch = read("research/03-heart-to-hearts.md");

const routeItems = route.flatMap(chapter => chapter.items.filter(item => !item.k));
const panels = route.flatMap(chapter => chapter.items.filter(item => item.k));
assert(route.length === 20, `Expected 20 route sections, got ${route.length}`);
assert(routeItems.length === 417, `Expected 417 route tasks, got ${routeItems.length}`);
assert(panels.length === 119, `Expected 119 guidance panels, got ${panels.length}`);
assert(new Set(routeItems.map(item => item.id)).size === routeItems.length, "Duplicate route IDs");
assert(routeItems.every(item => item.id), "A tickable route item has no persistent ID");

const expected = { quests: 480, achievements: 200, monsters: 157, hearts: 63, "grand-prix": 70 };
const completionItems = [];
for (const category of completion.categories) {
  const items = category.groups.flatMap(group => group.items);
  completionItems.push(...items);
  if (expected[category.id]) assert(items.length === expected[category.id],
    `${category.id}: expected ${expected[category.id]}, got ${items.length}`);
}
assert(completionItems.length === 1053, `Expected 1053 Completion Hub items, got ${completionItems.length}`);
assert(new Set(completionItems.map(item => item.id)).size === completionItems.length, "Duplicate completion IDs");
assert(bindings.bindings.length === completionItems.length, `Expected ${completionItems.length} route bindings, got ${bindings.bindings.length}`);
assert(new Set(bindings.bindings.map(binding => binding.targetId)).size === completionItems.length, "Completion route bindings are duplicated or incomplete");
assert(bindings.bindings.every(binding => routeItems.some(item => item.id === binding.routeItemId)), "A Completion Hub binding points to a missing route task");
for (const name of ["Heartwarming", "Heartbreaking", "The Brave Protectors"]) {
  const item = completionItems.find(entry => entry.name === name);
  assert(item && item.missable, `${name} is not marked as missable`);
}

assert(monsterpedia.entries.length === 866, `Expected 866 Monsterpedia entries, got ${monsterpedia.entries.length}`);
assert(monsterpedia.entries.filter(entry => entry.game === "base").length === 721, "Base-game Monsterpedia count changed");
assert(monsterpedia.entries.filter(entry => entry.game === "future-connected").length === 145, "Future Connected Monsterpedia count changed");
assert(new Set(monsterpedia.entries.map(entry => entry.id)).size === monsterpedia.entries.length, "Duplicate Monsterpedia IDs");
const drops = monsterpedia.entries.flatMap(entry => entry.drops.confirmed);
assert(drops.length === 12582, `Expected 12582 verified drop rows, got ${drops.length}`);
assert(drops.every(drop => drop.item && drop.chest && /^\d+(?:\.\d+)?%$/.test(drop.rate)), "A confirmed drop lacks an item, chest, or explicit rate");
assert(drops.every(drop => Number.parseFloat(drop.rate) > 0), "A zero-rate/unavailable drop leaked into the Monsterpedia");
const dossierTargets = monsterpedia.entries.filter(entry => entry.game === "base" && (entry.unique || entry.boss));
assert(dossiers.counts.records === 191 && Object.keys(dossiers.records).length === dossierTargets.length, "Combat dossier roster coverage changed");
assert(dossierTargets.every(entry => dossiers.records[entry.id]?.variants?.some(variant => variant.stats && variant.arts.length)), "A base-game boss/Unique Monster lacks source-backed stats or arts");
assert(dossiers.counts.withSpike === 49, "Documented combat-spike coverage changed");
const portraits = monsterpedia.entries.filter(entry => entry.image?.local);
assert(portraits.length === monsterpedia.entries.length, `Every Monsterpedia entry needs a locally cached portrait, got ${portraits.length}/${monsterpedia.entries.length}`);
assert(portraits.every(entry => fs.existsSync(path.join(root, entry.image.local))), "A Monsterpedia portrait path does not exist locally");
for (const name of ["Clap Bunniv", "Energy Device", "M32 Transport Unit"]) {
  const entry = monsterpedia.entries.find(candidate => candidate.name === name);
  assert(entry?.image?.sourceFile, `Exact wiki-file portrait override is missing for ${name}`);
}
for (const species of new Set(monsterpedia.entries.map(entry => entry.species))) {
  assert(species.startsWith("Fogbeast") || html.includes(`"${species}"`), `Monster family map does not cover ${species}`);
}

const worldEntries = world.areas.flatMap(area => area.entries);
assert(world.areas.length === 21, `Expected 21 map areas, got ${world.areas.length}`);
assert(worldEntries.length === 461, `Expected 461 map discoveries, got ${worldEntries.length}`);
assert(worldEntries.filter(entry => entry.type === "secret-area").length === 19, "Expected all 19 base + Future Connected secret areas");
const collectItems = collectopaedia.collections.flatMap(page => page.groups.flatMap(group => group.items));
assert(collectopaedia.collections.length === 21 && collectItems.length === 300, "Collectopaedia tracker coverage changed");
assert(new Set(collectItems.map(item => item.id)).size === collectItems.length, "Collectopaedia has duplicate item IDs");
assert(atlas.areas.filter(area => area.map).length === 19, "Map atlas must retain 19 verified local maps");
assert(coordinates.coverage.exact === 417 && coordinates.coordinates.every(point => Number.isFinite(point.x) && Number.isFinite(point.z)), "Exact landmark coordinate coverage regressed");
for (const area of atlas.areas.filter(area => area.map)) assert(fs.existsSync(path.join(root, area.map.local)), `Map atlas image missing: ${area.name}`);
assert(frontier.counts.maps === 73 && frontier.counts.points === 5688, "Interactive map graph coverage changed");
assert(frontier.counts.collectionPoints === 1759 && frontier.counts.enemySpawnPoints === 3499 && frontier.counts.landmarks === 430, "Interactive pin-type coverage changed");
assert(frontier.maps.every(map => map.tiles.length === 4 && map.tiles.every(tile => fs.existsSync(path.join(root, tile.local)))), "An interactive map is missing locally cached tiles");
assert(frontier.maps.flatMap(map => map.points).every(point => point.coordinates.length === 2 && point.coordinates.every(Number.isFinite)), "An interactive map pin lacks exact GeoJSON coordinates");
assert(world.quests.length === 480, `Expected 480 dependency-lookup quests, got ${world.quests.length}`);
assert(affinity.counts.residents === 177 && affinity.quests.length === 480 && affinity.choices.length === 16, "Affinity planner coverage changed");
assert(affinity.quests.every(quest => world.quests.some(worldQuest => worldQuest.id === quest.id)), "Affinity planner contains an unresolved quest ID");
const routeReferenceText = item => String(`${item.t || ""} ${item.d || ""}`)
  .replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").toLocaleLowerCase();
const linkedMonsterCards = routeItems.filter(item => item.f === "u" && monsterpedia.entries
  .some(entry => entry.unique && routeReferenceText(item).includes(entry.name.toLocaleLowerCase())));
const linkedQuestCards = routeItems.filter(item => item.f === "q" && world.quests
  .some(quest => routeReferenceText(item).includes(quest.name.toLocaleLowerCase())));
assert(linkedMonsterCards.length >= 50, `Too few route cards link to exact Monsterpedia dossiers: ${linkedMonsterCards.length}`);
assert(linkedQuestCards.length >= 100, `Too few route cards link to exact quest dependency cards: ${linkedQuestCards.length}`);
assert(new Set(worldEntries.map(entry => entry.id)).size === worldEntries.length, "Duplicate world tracker IDs");
const routeIds = new Set(route.map(chapter => chapter.id));
assert(worldEntries.every(entry => routeIds.has(entry.routeChapterId)), "A world discovery is assigned to a missing route chapter");
const area = name => world.areas.find(entry => entry.name === name);
assert(area("Bionis' Leg").routeChapterId === "ch4", "Bionis' Leg must enter this guide in Chapter 4");
assert(area("Sword Valley").routeChapterId === "ch11", "Sword Valley must enter this guide in Chapter 11");
assert(area("Fallen Arm").routeChapterId === "ch12" && !area("Fallen Arm").lockoutDeadline, "Fallen Arm must not carry a false lockout warning");
assert(area("Mechonis Field").routeChapterId === "ch13", "Mechonis Field must enter this guide in Chapter 13");
assert(area("Agniratha").routeChapterId === "ch14", "Agniratha must enter this guide in Chapter 14");
for (const late of ["Heavenly Window", "Bafalgar Tomb", "Trader's Stopover", "Arachno Feeding Lair", "Path of Absolution"]) {
  assert(area("Tephra Cave").entries.find(entry => entry.name === late)?.routeChapterId === "ch17", `${late} must be deferred until the post-Core route`);
}
const questIds = new Set(world.quests.map(quest => quest.id));
for (const quest of world.quests) for (const id of [...quest.prerequisites, ...quest.followUps, ...quest.mutuallyExclusive]) {
  assert(questIds.has(id), `${quest.name} links to missing quest ID ${id}`);
}
const questById = new Map(world.quests.map(quest => [quest.id, quest]));
const visiting = new Set(), visited = new Set();
const hasPrerequisiteCycle = id => {
  if (visiting.has(id)) return true;
  if (visited.has(id)) return false;
  visiting.add(id);
  const cyclic = (questById.get(id)?.prerequisites || []).some(hasPrerequisiteCycle);
  visiting.delete(id); visited.add(id);
  return cyclic;
};
assert(!world.quests.some(quest => hasPrerequisiteCycle(quest.id)), "Quest prerequisite graph contains a cycle");
const questNamed = name => world.quests.find(quest => quest.name === name);
assert(questNamed("Cook-Off Counter Attack!")?.followUps.some(id => questById.get(id)?.name === "Cook-Off Comeback?"), "Cook-Off chain order regressed");
assert(!questNamed("Investigating Satorl")?.prerequisites.some(id => questById.get(id)?.name === "Talia's Research"), "Investigating Satorl incorrectly requires the quest it excludes");
assert(completionItems.some(item => item.name === "Itinerant Dorothea") && completionItems.some(item => item.name === "Avalanche Abaasy"), "Canonical completion names regressed");
const plain = value => String(value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const leaderQuests = world.quests.filter(quest => /\b(?:as party leader|in the lead)\b/i.test(quest.requirements));
assert(leaderQuests.length === 18, `Expected 18 explicit leader-prerequisite quests, got ${leaderQuests.length}`);
for (const quest of leaderQuests) {
  const card = quest.name.startsWith("A Young Captain's ")
    ? routeItems.find(item => item.id === "c17-07")
    : routeItems.find(item => plain(item.t).includes(quest.name));
  assert(card, `${quest.name} has a leader prerequisite but no route card`);
  const leader = quest.requirements.match(/\b(Shulk|Reyn|Sharla|Dunban|Melia|Riki|Fiora) (?:as party leader|in the lead)/i)?.[1];
  assert(leader && new RegExp(`${leader}.{0,80}(?:must lead|leading|accepts|turns in|party leader)`, "i").test(plain(`${card.t} ${card.d}`)), `${quest.name} route card does not clearly warn that ${leader} must lead`);
}
for (const [name, leader] of [["Rocco's Heartful Request", "Shulk"], ["Building Bridges", "Melia"], ["Obstinate Berryjammy", "Dunban"], ["Stopping the Elopement", "Sharla"]]) {
  const card = routeItems.find(item => plain(item.t).includes(name));
  assert(card && new RegExp(`${leader}.{0,80}(?:must lead|leading)`, "i").test(plain(`${card.t} ${card.d}`)), `${name} is missing its mid-quest ${leader} leader warning`);
}
assert(route.find(chapter => chapter.id === "ch10").items.some(item => item.id === "c10-46" && plain(item.t).includes("Cook-Off Showdown!")), "Reyn's Impatience unlock is missing from Chapter 10");
assert(route.find(chapter => chapter.id === "ch13").items.some(item => item.id === "c13-15" && plain(item.t).includes("The Oath Sword")), "Fiora's Rashness unlock is missing from Chapter 13");
assert(route.find(chapter => chapter.id === "ch17").items.some(item => item.id === "c17-31" && plain(item.t).includes("Ancient High Entia Mystery")), "Melia's Passion unlock is missing from Chapter 17");

assert(builds.characters.length === 7 && builds.futureConnected.characters.length === 4, "Build Lab roster must include 7 base and 4 Future Connected characters");
assert(builds.partyPresets.length === 17, `Expected 17 party presets, got ${builds.partyPresets.length}`);
for (const id of ["main-never-lose-ch4", "main-never-lose-ch5-6", "main-never-lose-core"]) assert(builds.partyPresets.some(preset => preset.id === id), `Never-lose preset missing: ${id}`);
assert(builds.routeUpdates.length === 9, `Expected 9 route build updates, got ${builds.routeUpdates.length}`);
const buildCharacters = [...builds.characters, ...builds.futureConnected.characters];
assert(new Set(buildCharacters.map(character => character.id)).size === buildCharacters.length, "Duplicate build character IDs");
for (const character of buildCharacters) {
  for (const control of ["controlled", "ai"]) for (const goal of ["metaSafe", "aggressive"]) {
    assert(character[control]?.[goal]?.length === 8, `${character.id} ${control}.${goal} must contain exactly 8 normal Arts`);
    assert(new Set(character[control][goal]).size === 8, `${character.id} ${control}.${goal} contains a duplicate Art`);
  }
}
for (const shulk of buildCharacters.filter(character => /shulk/.test(character.id))) {
  const arts = [shulk.controlled.metaSafe, shulk.controlled.aggressive, shulk.ai.metaSafe, shulk.ai.aggressive].flat();
  assert(!arts.includes("Sword Drive"), `${shulk.id} illegally contains Reyn's Sword Drive`);
}
const legalArts = {
  shulk: ["Back Slash", "Light Heal", "Slit Edge", "Stream Edge", "Shadow Eye", "Air Slash", "Shaker Edge", "Battle Soul"],
  reyn: ["Hammer Beat", "Wild Down", "War Swing", "Bone Upper", "Dive Sobat", "Sword Drive", "Shield Bash", "Lariat", "Rage", "Berserker", "Last Stand", "Magnum Charge", "Aura Burst", "Engage", "Anchor Chain", "Guard Shift"],
  sharla: ["Heal Bullet", "Thunder Bullet", "Shield Bullet", "Cure Bullet", "Tranquilizer", "Tranquilliser", "Heal Blast", "Metal Blast", "Heal Round", "Heat Bullet", "Covert Stance", "Head Shaker", "Aura Bullet", "Heal Counter", "Head Shot", "Cure Round", "Drive Boost"],
  dunban: ["Gale Slash", "Electric Gutbuster", "Worldly Slash", "Battle Eye", "Steel Strike", "Spirit Breath", "Blinding Blossom", "Serene Heart", "Tempest Kick", "Heat Haze", "Thunder", "Soaring Tempest", "Jaws of Death", "Final Flicker", "Demon Slayer", "Peerless"],
  melia: ["Summon Bolt", "Summon Flare", "Summon Aqua", "Spear Break", "Hypnotise", "Shadow Stitch", "Reflection", "Healing Gift", "Summon Copy", "Summon Wind", "Starlight Kick", "Summon Earth", "Burst End", "Summon Ice", "Mind Blast", "Power Effect"],
  riki: ["Happy Happy", "Bitey Bitey", "Sneaky", "Play Dead", "Lurgy", "Hero Time", "Roly-Poly", "Behave", "You Can Do It", "Freezinate", "Bedtime", "Tantrum", "Burninate", "Riki is Angry", "Peekaboo", "Say Sorry"],
  fiora: ["Power Smash", "Screw Edge", "Hidden Thorn", "Lacerate", "Double Blade", "Spear Blade", "Cross Impact", "Healing Energy", "Zero Gravity", "Ether Drain", "Air Fang", "Double Wind", "Second Gear", "Lock-On", "Mag Storm", "Shutdown", "Guard Shift", "Power Drain", "Speed Shift", "Final Cross"],
  kino: ["Healy Bullet", "Healy Round", "Shield Bullet", "Cure Round", "Thunder Bullet", "Head Shaker", "Tranquilliser", "Drive Boost", "Metal Blast", "Covert Stance"],
  nene: ["Sword Drive", "Bone Upper", "Mild Down", "Magnum Starch", "Engage", "Guard Sift", "Hammer Beat", "Feather Swing", "Berserker", "Lariat", "Chive Sobat"]
};
const legalFor = id => new Set(legalArts[id.replace(/^fc-/, "")]);
for (const character of buildCharacters) {
  const allowed = legalFor(character.id);
  for (const art of [character.controlled.metaSafe, character.controlled.aggressive, character.ai.metaSafe, character.ai.aggressive].flat()) {
    assert(allowed.has(art), `${character.id} contains an illegal normal Art: ${art}`);
  }
}
for (const update of builds.routeUpdates) for (const [id, arts] of Object.entries(update.artsByMember)) {
  const allowed = legalFor(id); for (const art of arts) assert(allowed.has(art), `${update.routeChapterId} ${id} contains an illegal normal Art: ${art}`);
}
const forbiddenNormal = { riki: ["Yoink!"], fiora: ["Butterfly Step"], shulk: ["Monado Shield", "Sword Drive"] };
for (const character of builds.characters) for (const art of forbiddenNormal[character.id] || []) {
  assert(![character.controlled.metaSafe, character.controlled.aggressive, character.ai.metaSafe, character.ai.aggressive].flat().includes(art), `${character.id} puts a Talent or foreign Art in a normal slot: ${art}`);
}
const invalidBranches = { reyn: ["Fortitude", "Zeal"], sharla: ["Diligence"], dunban: ["Serenity"], riki: ["Cheerfulness"], fiora: ["Speed ("] };
for (const character of builds.characters) for (const invalid of invalidBranches[character.id] || []) {
  assert(!character.skills.branchPriority.some(value => value.includes(invalid)), `${character.id} uses non-branch label ${invalid}`);
}
const routeMax = { ch1:10, ch3:18, ch5:32, ch7:44, ch8:52, ch12:70, ch17:90, post:99 };
const unlockLevel = { "Head Shot":42, "Thunder":40, "Tempest Kick":32, "Serene Heart":28, "Heat Haze":36, "Jaws of Death":48, "Burninate":43, "Freezinate":31, "Bedtime":35, "Starlight Kick":44, "Summon Earth":47 };
for (const update of builds.routeUpdates.filter(item => routeMax[item.routeChapterId])) for (const art of Object.values(update.artsByMember).flat()) {
  assert(!unlockLevel[art] || unlockLevel[art] <= routeMax[update.routeChapterId], `${update.routeChapterId} slots ${art} before its level-${unlockLevel[art]} unlock`);
}

const routeSource = read("data/route-data.js");
assert(!routeSource.includes("Ponspectors replace party members"), "Stale Future Connected Ponspector claim");
assert(!routeSource.includes("Party is fixed — Shulk, Melia, Kino and Nene"), "Stale Future Connected party claim");
assert(routeSource.includes("Ponspectors replace Chain Attacks with Union Strikes"), "Correct Union Strike guidance missing");
assert(!routeSource.includes("sixteen quests"), "Agniratha has fourteen optional terminal quests, not sixteen");
assert(routeSource.includes("Seventh Sage Cloister"), "Agniratha secret-area step missing");
assert(routeSource.includes("Twenty-three later route steps depend on the active party leader"), "Leader-trap overview count is stale");
for (const id of ["c17-01", "c17-02", "c17-03", "c17-04"]) assert(routeItems.find(item => item.id === id)?.f !== "d", `${id} is a permanent post-Core quest and must not carry a false deadline`);
assert(!plain(routeItems.find(item => item.id === "c17-04")?.t).match(/Shulk.*lead/i), "Supplies for Satorl has a false Shulk leader warning");
assert(routeSource.includes("Seven hidden skill trees are available this chapter"), "Chapter 17 hidden-tree leader circuit is missing");
assert(!heartsResearch.includes("Fallen Arm / Machina Village is flagged as locking"), "Stale Fallen Arm lock warning");
assert(!heartsResearch.includes("permanently locks when you begin the Colony 6 relocation"), "Stale Refugee Camp lock warning");

for (const text of ["Play Mode", "Completion Hub", "Monsterpedia", "Quest Lookup", "Builds &amp; Presets", "Recommended Level:", "Required Leader:", "Location, landmark &amp; secret-area tracker", "Export progress", "Import progress", "Restore last reset", "xc1de-guide-state-v4", "Not my branch"]) {
  assert(html.includes(text), `index.html is missing ${text}`);
}
assert(html.includes('role="progressbar"'), "Progress bar lacks ARIA semantics");
assert(html.includes('role="tablist"'), "Tabs lack ARIA semantics");
assert(!html.includes('<span class="chip'), "Route filters must be native buttons");
assert(html.includes('<button type="button" class="chh"'), "Chapter headers must be native buttons");
assert(html.includes('const text = plainText(item.t || "")'), "Leader badges must be derived from the current card title, not historical detail text");
assert(!html.includes("There are 13 of these"), "Static hidden-tree count is stale");
assert(html.includes('--bg:#f2f6f8') && html.includes('--nav:#0b2438'), "Reading-first Xenoblade color tokens are missing");
assert(html.includes('id="theme-select"') && html.includes('Readable Light') && html.includes('Simple Dark') && html.includes('Xenoblade Extreme'), "Appearance selector is missing one or more themes");
assert(html.includes('html[data-theme="dark"]') && html.includes('html[data-theme="xenoblade"]'), "Dark and Xenoblade theme tokens are missing");
assert(html.includes('XENOBLADE EXTREME V2') && html.includes('class="route-legend"'), "Extreme V2 route HUD or warning legend is missing");
assert(html.includes('id="tab-route"') && html.includes('id="tab-branches"') && html.includes('assets/game-icons/affinity-mission.png') && html.includes('id="tab-colony6"') && html.includes('assets/game-icons/colony6-shop.png') && html.includes('id="tab-weather"') && html.includes('assets/game-icons/timed-quest.png'), "Themed navigation is missing sourced game UI assets");
assert(html.includes('monster-card') && html.includes('monster-crest') && html.includes('monster-portrait') && html.includes('id="monster-family"') && html.includes('function monsterFamily(entry)') && html.includes('function monsterPortrait(entry)'), "Extreme V2 Monsterpedia dossier, portrait, and family filter treatment is missing");
assert(html.includes('id="monster-clear-hunts"') && html.includes('data-hunt="${esc(entry.id)}"') && html.includes('state.hunts') && html.includes('condition === "hunt"'), "Monsterpedia hunt-list persistence or filtering is missing");
assert(html.includes('data-monster-log="${esc(entry.id)}"') && html.includes('state.monsterLog') && html.includes('condition === "unlogged"'), "Monsterpedia completion-ledger persistence or filtering is missing");
assert(html.includes('data-open-monster="${esc(monster.id)}"') && html.includes('data-open-quest="${esc(quest.id)}"') && html.includes('function routeQuickLinks(item)'), "Route cards do not link to their Monsterpedia and quest dossiers");
assert(html.includes('xc1de-guide-theme'), "Appearance preference is not persisted");
assert(fs.existsSync(path.join(root, "assets", "xenoblade-mechonis-scene.png")), "In-game Xenoblade background asset is missing");
assert(fs.existsSync(path.join(root, "assets", "xbcde-logo.png")), "Official Xenoblade DE logo asset is missing");
assert(fs.existsSync(path.join(root, "assets", "game-icons", "superboss-abaasy.png")), "Superboss reference image is missing");
assert(fs.existsSync(path.join(root, "assets", "game-icons", "colony6-shop.png")), "Colony 6 reference map is missing");
for (const portrait of ["shulk", "reyn", "sharla", "dunban", "melia", "riki", "fiora", "kino", "nene"]) assert(fs.existsSync(path.join(root, "assets", "party-portraits", `${portrait}.png`)), `Party portrait is missing: ${portrait}`);
assert(html.includes('assets/xenoblade-mechonis-scene.png') && html.includes('assets/xbcde-logo.png') && html.includes('class="brand-logo"'), "Extreme theme artwork or official logo is not wired into the guide");
assert(html.includes('class="guide-feature"') && html.includes('assets/game-icons/superboss-abaasy.png') && html.includes('class="guide-reference"') && html.includes('assets/game-icons/colony6-shop.png'), "Sourced visual references are not wired into the guide");
const gameIcons = ["quest-alert.png", "timed-quest.png", "landmark-xcde.png", "quest-complete.png", "back-slash-xcde.png", "skills.png", "enemy-sight.png"];
for (const icon of gameIcons) {
  assert(fs.existsSync(path.join(root, "assets", "game-icons", icon)), `Game icon asset is missing: ${icon}`);
  assert(html.includes(`assets/game-icons/${icon}`), `Game icon is not wired into the guide: ${icon}`);
}
assert(html.includes('class="game-icon"') && html.includes('alt="" aria-hidden="true"'), "Decorative game icons must preserve their adjacent text labels and stay out of the accessibility tree");
assert(fs.existsSync(path.join(root, "assets", "fonts", "RobotoSlab-Variable.ttf")), "Self-hosted Xenoblade display font is missing");
assert(html.includes('font-family:"XC Guide Slab"') && html.includes('font-family:var(--display)'), "Self-hosted display typography is not wired into the themed hierarchy");
assert(html.includes('font:18px/1.72'), "Base guide typography has regressed below the readability target");
assert(/\.it label\{[^}]*font-size:17px/.test(html), "Route task text has regressed below 17px");
assert(/\.det\{[^}]*font-size:15\.5px/.test(html), "Route detail text has regressed below 15.5px");
assert(/\.det\{[^}]*max-width:74ch/.test(html) && /\.det \.step\{[^}]*display:block/.test(html), "Route detail measure or step formatting regressed");
assert(/\.tag\{[^}]*font-size:12\.5px/.test(html) && /\.world-head\{[^}]*font-size:16px/.test(html), "Dense metadata or world-tracker text has regressed below the legibility target");
assert(html.includes('grid-template-columns:repeat(3,minmax(180px,1fr))'), "Lookup filters lost their readable three-column layout");
assert(html.includes('--fg3:#526b7b') && html.includes('--focus:#00658d'), "Light-theme contrast tokens regressed");
assert(html.includes('class="tabs-shell"') && html.includes('id="mobile-section"'), "Compact sticky navigation or mobile More control is missing");
assert(html.includes('class="chapter-heading"') && html.includes('aria-labelledby="tab-route"'), "Route heading or tab-panel semantics are missing");
assert(html.includes('aria-pressed="true">All') && html.includes('id="route-count"'), "Route filter state or result feedback is missing");
assert(html.includes('class="route-build-grid"') && html.includes('<h3>Slot now</h3>'), "Route build updates are not structurally formatted");
assert(html.includes('function routeTitle(html)') && html.includes('${tag}${routeTitle(it.t)}'), "Route status emoji are not normalized into the icon and tag system");
assert(html.includes('function ensurePanelData(name)') && html.includes('completionLoad = loadData(') && html.includes('monsterLoad = loadData('), "Heavy secondary datasets are not lazy loaded");
assert(!html.includes('max-width:1440px'), "Appearance mode must not change the guide container width");
assert(html.includes('background-attachment:scroll'), "The themed mobile background still uses fixed attachment");
assert(html.includes('id="p-companion"') && html.includes('id="advance-status"') && html.includes('id="inventory-list"'), "Play Mode companion controls are missing");
assert(html.includes('id="guide-search"') && html.includes('class="header-tools"') && html.includes('class="header-status"'), "Header search, theme, and progress regions are not structurally separated");
assert(fs.existsSync(path.join(root, "manifest.webmanifest")) && fs.existsSync(path.join(root, "sw.js")), "PWA manifest or service worker is missing");

const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
inlineScripts.forEach((code, i) => {
  try { new Function(code); }
  catch (error) { throw new Error(`Inline script ${i + 1} has invalid syntax: ${error.message}`); }
});

console.log(`OK: ${routeItems.length} route tasks, ${panels.length} guidance panels, ${completionItems.length} completion items.`);
console.log(`OK: ${monsterpedia.entries.length} monsters / ${drops.length} drops, ${worldEntries.length} discoveries, ${world.quests.length} dependency records, ${builds.partyPresets.length} presets.`);
console.log("OK: stable IDs, route mapping, build legality, factual regressions, readability tokens, accessibility hooks, and inline JavaScript syntax.");
