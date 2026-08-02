// Generates a reviewable Completion Hub -> route binding layer.
// The route remains human-authored; this file proves that every ledger target has
// an explicit safe handling point instead of relying on fuzzy title searches.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BUILD_STAMP = "source-snapshot";

function load(file, name) {
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${fs.readFileSync(path.join(__dirname, file), "utf8")}\nthis.__value = ${name};`, context);
  return context.__value;
}
function text(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/&(?:amp|#38);/g, "&")
    .replace(/&#(?:39|x27);/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ").trim();
}
function norm(value) { return text(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }

const ROUTE = load("data/route-data.js", "ROUTE");
const COMPLETION_DATA = load("data/completion-data.js", "COMPLETION_DATA");
const WORLD_DATA = load("data/world-data.js", "WORLD_DATA");
const QUEST_SCHEDULE_DATA = load("data/quest-schedule-data.js", "QUEST_SCHEDULE_DATA");
const cards = ROUTE.flatMap((chapter, chapterIndex) => chapter.items.filter(item => item.id).map((item, itemIndex) => ({
  id: item.id, chapterId: chapter.id, chapterTitle: chapter.title, chapterIndex, itemIndex,
  storyQuestId: item.storyQuestId || "",
  title: text(item.t || ""), titleNormalized: norm(item.t || ""),
  bodyNormalized: norm(item.d || ""),
  text: text(`${item.t || ""} ${item.d || ""}`), normalized: norm(`${item.t || ""} ${item.d || ""}`)
})));
const cardById = new Map(cards.map(card => [card.id, card]));
const questById = new Map(WORLD_DATA.quests.map(quest => [quest.id, quest]));
const scheduleByQuestId = new Map(QUEST_SCHEDULE_DATA.schedules.map(schedule => [schedule.questId, schedule]));

const AREA_ANCHORS = Object.freeze({
  "Colony 9": "c1-22", "Tephra Cave": "c3-22", "Bionis' Leg": "c4-30", "Colony 6": "c17-18",
  "Satorl Marsh": "c6-33", "Makna Forest": "c7-41", "Frontier Village": "c7-41", "Eryth Sea": "c8-53",
  "Alcamoth": "c15-02", "Valak Mountain": "c10-27", "Sword Valley +": "c11-10", "Fallen Arm": "c12-20",
  "Mechonis Field": "c14-19", "Central Factory": "c14-25", "Agniratha": "c14-19"
});
const TIMED_ANCHORS = Object.freeze({
  "Colony 9": "c1-22", "Tephra Cave": "c3-22", "Bionis' Leg": "c4-31", "Colony 6": "c10-46",
  "Satorl Marsh": "c6-33", "Makna Forest": "c7-41", "Frontier Village": "c7-41", "Eryth Sea": "c15-01",
  "Alcamoth": "c15-02", "Valak Mountain": "c10-27", "Sword Valley +": "c11-10", "Fallen Arm": "c12-20",
  "Mechonis Field": "c14-19", "Central Factory": "c14-25", "Agniratha": "c14-19"
});
const LATE_ANCHORS = Object.freeze({
  "Colony 9": "c17-18", "Tephra Cave": "c17-04", "Bionis' Leg": "c17-03", "Colony 6": "c17-18",
  "Satorl Marsh": "c17-19", "Makna Forest": "pg-07", "Frontier Village": "pg-10", "Eryth Sea": "c17-31",
  "Alcamoth": "c17-31", "Valak Mountain": "pg-07", "Sword Valley +": "c11-10", "Fallen Arm": "c17-05",
  "Mechonis Field": "c14-19", "Central Factory": "c16-02", "Agniratha": "c14-19"
});

function questNameNeedles(name) {
  const corrected = String(name || "").replace(/\bAdventureres\b/gi, "Adventurers");
  return [...new Set([corrected, corrected.replace(/\s*\([^)]*\)\s*$/, "")].map(norm).filter(needle => needle.length >= 4))];
}
function exactCard(name, quest = null) {
  const needles = questNameNeedles(name);
  if (!needles.length) return null;
  const giverNeedles = (scheduleByQuestId.get(quest?.id)?.givers || []).map(giver => norm(giver.name)).filter(needle => needle.length >= 3);
  let titleMatches = cards.filter(card => needles.some(needle => card.titleNormalized.includes(needle)));
  // Several regions have a quest literally named "Challenge". It must not bind
  // to Challenge 1/2/3 merely because its one-word name is a prefix.
  if (quest && norm(name) === "challenge") {
    const areaNeedle = norm(quest.area);
    titleMatches = titleMatches.filter(card =>
      (areaNeedle && card.titleNormalized.includes(areaNeedle)) || giverNeedles.some(needle => card.titleNormalized.includes(needle))
    );
    if (!titleMatches.length) return null;
  }
  const matches = titleMatches.length ? titleMatches : cards.filter(card => needles.some(needle => card.bodyNormalized.includes(needle)));
  const areaAnchor = quest?.area ? cardById.get(AREA_ANCHORS[quest.area]) : null;
  return matches.sort((a, b) => {
    // The real quest card conventionally begins with its quest name. Mentions in
    // prerequisites and "Unlocks" notes must never steal the Completion binding.
    const aStarts = needles.some(needle => a.titleNormalized.startsWith(needle)) ? 1 : 0;
    const bStarts = needles.some(needle => b.titleNormalized.startsWith(needle)) ? 1 : 0;
    if (aStarts !== bStarts) return bStarts - aStarts;
    // A title naming the actual giver is stronger than a later warning or spawn
    // reference that happens to repeat the quest name.
    const aGiver = giverNeedles.some(needle => a.titleNormalized.includes(needle)) ? 1 : 0;
    const bGiver = giverNeedles.some(needle => b.titleNormalized.includes(needle)) ? 1 : 0;
    if (aGiver !== bGiver) return bGiver - aGiver;
    // Generic names such as Challenge 1 repeat in several regions. Choose the
    // route visit nearest that quest's canonical area anchor before chronology.
    if (areaAnchor) {
      const aDistance = Math.abs(a.chapterIndex - areaAnchor.chapterIndex);
      const bDistance = Math.abs(b.chapterIndex - areaAnchor.chapterIndex);
      if (aDistance !== bDistance) return aDistance - bDistance;
    }
    return a.chapterIndex - b.chapterIndex || a.itemIndex - b.itemIndex;
  })[0] || null;
}
function bind(targetId, targetType, routeItemId, handling, rationale) {
  const card = cardById.get(routeItemId);
  if (!card) throw new Error(`Unknown route anchor ${routeItemId} for ${targetId}`);
  return { targetId, targetType, routeItemId, routeChapterId: card.chapterId, handling, rationale };
}
function questBinding(item) {
  const quest = questById.get(item.id);
  const explicitStoryCard = cards.find(card => card.storyQuestId === item.id);
  if (explicitStoryCard) return bind(item.id, "quest", explicitStoryCard.id, "exact", "Formal story quest is linked by its retained source ID.");
  const exact = exactCard(item.name, quest);
  if (exact) return bind(item.id, "quest", exact.id, "exact", "Quest name is printed on this route card.");
  if (!quest) return bind(item.id, "quest", "c17-18", "post", "Source quest lacks a dependency record; resolve during the final quest ledger cleanup.");
  const late = /mechonis core cleared|after mechonis core|replica monado|high entia emblem/i.test(quest.requirements);
  const anchor = late ? LATE_ANCHORS[quest.area] : quest.timed ? TIMED_ANCHORS[quest.area] : AREA_ANCHORS[quest.area];
  return bind(item.id, "quest", anchor || "c17-18", late ? "post" : "batch",
    `${quest.timed ? "Timed" : "Area"} quest is included in the ${quest.area} ledger sweep; inspect its dependency card before turn-in.`);
}
function genericBinding(category, item) {
  const exact = exactCard(item.name);
  if (exact) return bind(item.id, category.id, exact.id, "exact", "Target name is printed on this route card.");
  if (category.id === "monsters") return bind(item.id, "monster", "pg-07", "post", "Covered by the level-sorted Unique Monster cleanup; use Monsterpedia for its exact spawn conditions.");
  if (category.id === "hearts") return bind(item.id, "heart", "pg-06", "post", "Covered by the final Heart-to-Heart ledger cleanup after affinity preparation.");
  if (category.id === "grand-prix") return bind(item.id, "grand-prix", "pg-13", "post", "Covered by the all-character Grand Prix ledger clear.");
  if (category.id === "future-connected") return bind(item.id, "future-connected", "fc-05", "fc", "Covered by the Future Connected completion sweep.");
  if (category.id === "achievements") return bind(item.id, "achievement", "pg-12", "post", "Non-missable residual achievement verified during the final records audit.");
  return bind(item.id, category.id, "pg-11", "post", "Manual completion milestone verified during final cleanup.");
}

const bindings = [];
for (const category of COMPLETION_DATA.categories) for (const group of category.groups) for (const item of group.items) {
  bindings.push(category.id === "quests" ? questBinding(item) : genericBinding(category, item));
}
const ids = new Set();
for (const binding of bindings) {
  if (ids.has(binding.targetId)) throw new Error(`Duplicate binding for ${binding.targetId}`);
  ids.add(binding.targetId);
}
const completionCount = COMPLETION_DATA.categories.flatMap(category => category.groups.flatMap(group => group.items)).length;
if (bindings.length !== completionCount) throw new Error(`Expected ${completionCount} bindings, got ${bindings.length}`);

const handling = Object.fromEntries([...new Set(bindings.map(binding => binding.handling))].sort().map(key => [key, bindings.filter(binding => binding.handling === key).length]));
const data = {
  version: 1, generated: BUILD_STAMP,
  policy: "Every Completion Hub item has one explicit safe route handling point. Exact means named on-card; batch/post/fc means resolved through the linked ledger sweep, not silently assumed complete.",
  counts: { total: bindings.length, exact: handling.exact || 0, batch: handling.batch || 0, post: handling.post || 0, fc: handling.fc || 0 },
  bindings
};
fs.writeFileSync(path.join(__dirname, "data", "route-bindings-data.js"), `// Generated by build-route-bindings.js on ${data.generated}. Do not edit by hand.\nconst ROUTE_BINDINGS_DATA = ${JSON.stringify(data, null, 2)};\n`, "utf8");
console.log(`Wrote data/route-bindings-data.js: ${bindings.length} bindings (${data.counts.exact} exact, ${data.counts.batch} batch, ${data.counts.post} post, ${data.counts.fc} FC).`);
