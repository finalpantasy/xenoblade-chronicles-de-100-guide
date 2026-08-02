// Interaction smoke test. Pass an absolute jsdom module path when it is not
// installed in this folder:
//   node test-guide-runtime.js C:\temp\node_modules\jsdom
const fs = require("fs");
const path = require("path");
const jsdomPath = process.argv[2] || "jsdom";
const { JSDOM, VirtualConsole } = require(jsdomPath);

const root = __dirname;
const dataFiles = ["route-data.js", "completion-data.js", "monsterpedia-data.js", "world-data.js", "world-route-anchors-early.js", "world-route-anchors-mid.js", "world-route-anchors-late.js", "build-data.js", "workshop-data.js", "collectopaedia-data.js", "map-atlas-data.js", "map-coordinates-data.js", "frontier-map-data.js", "combat-dossier-data.js", "affinity-data.js", "route-bindings-data.js"];
const injectedData = dataFiles.map(file => `<script>${fs.readFileSync(path.join(root, "data", file), "utf8")}</script>`).join("");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8").replace("</head>", `${injectedData}</head>`);
const errors = [];

const waitFor = async (test, message, timeout = 5000) => {
  const start = Date.now();
  while (!test()) {
    if (Date.now() - start > timeout) throw new Error(`Timed out: ${message}`);
    await new Promise(resolve => setTimeout(resolve, 20));
  }
};
const assert = (condition, message) => { if (!condition) throw new Error(message); };

async function makeDom({ legacy = null, previous = null, url = "https://guide.local/index.html" } = {}) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", error => errors.push(error.message));
  virtualConsole.on("error", error => errors.push(String(error)));
  const dom = new JSDOM(html, {
    url,
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(window) {
      window.confirm = () => true;
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      window.URL.createObjectURL = () => "blob:guide-test";
      window.URL.revokeObjectURL = () => {};
      // The data constants were injected into the test HTML above. Treat the
      // guide's cache-busted dynamic data scripts as immediately loaded.
      const appendChild = window.Node.prototype.appendChild;
      window.Node.prototype.appendChild = function(node) {
        const result = appendChild.call(this, node);
        if (node.tagName === "SCRIPT" && /\/data\/(?:world-route-anchors-(?:early|mid|late)|(route|completion|monsterpedia|world|build|route-bindings)-data)\.js/.test(node.src)) {
          window.setTimeout(() => node.onload?.(), 0);
        }
        return result;
      };
      if (legacy) window.localStorage.setItem("xc1de-100-v1", JSON.stringify(legacy));
      if (previous) window.localStorage.setItem("xc1de-guide-state-v2", JSON.stringify(previous));
    }
  });
  await waitFor(() => dom.window.document.querySelectorAll("#route section.ch").length === 20, "route render");
  await waitFor(() => dom.window.document.querySelectorAll("#route .world-it").length === 461, "world tracker render");
  assert(dom.window.document.querySelectorAll("#route .area-arrival").length >= 20, "world discoveries were not grouped into area-arrival trackers");
  assert([...dom.window.document.querySelectorAll("#route .world-it")].every(row => row.closest(".area-arrival")), "a world discovery escaped its compact area-arrival tracker");
  assert(!dom.window.document.querySelector("#route .world-it .rec-level"), "minor discovery cues still repeat thick recommended-level metadata");
  await waitFor(() => dom.window.document.querySelectorAll("#quest-results .result-card").length === 80, "quest lookup render");
  await waitFor(() => dom.window.document.querySelectorAll("#party-presets .preset").length === 17, "party presets render");
  return dom;
}

(async () => {
  const dom = await makeDom({ legacy: { "c0-01": true } });
  const { document, Event, MouseEvent, KeyboardEvent, localStorage } = dom.window;

  const themeSelect = document.querySelector("#theme-select");
  assert(themeSelect && document.documentElement.dataset.theme === "light", "readable light theme is not the default");
  themeSelect.value = "dark";
  themeSelect.dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.documentElement.dataset.theme === "dark" && localStorage.getItem("xc1de-guide-theme") === "dark", "simple dark theme did not apply or persist");
  themeSelect.value = "xenoblade";
  themeSelect.dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.documentElement.dataset.theme === "xenoblade" && localStorage.getItem("xc1de-guide-theme") === "xenoblade", "Xenoblade theme did not apply or persist");
  const globalSearch = document.getElementById("guide-search");
  globalSearch.value = "Avalanche Abaasy";
  globalSearch.dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.querySelector("body > #guide-search-results")?.textContent.includes("Avalanche Abaasy"), "global search results are not portalled above the clipped header region");
  globalSearch.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  assert(!document.getElementById("guide-search-results"), "Escape did not dismiss global search results");
  globalSearch.value = "Territorial Rotbart";
  globalSearch.dispatchEvent(new Event("input", { bubbles: true }));
  await waitFor(() => document.getElementById("guide-search-results")?.textContent.includes("Monsterpedia: Territorial Rotbart"), "global search lazy Monsterpedia index");
  globalSearch.value = "no-such-xenoblade-record-zzzz";
  globalSearch.dispatchEvent(new Event("input", { bubbles: true }));
  assert(!document.getElementById("guide-search-results") && document.getElementById("guide-search-count").textContent === "No matches", "empty global search results leave a click-blocking overlay");
  globalSearch.value = "";
  globalSearch.dispatchEvent(new Event("input", { bubbles: true }));

  globalSearch.value = "wedding ring";
  globalSearch.dispatchEvent(new Event("input", { bubbles: true }));
  await waitFor(() => document.querySelector("#guide-search-results [data-guide-hit]")?.textContent.includes("Route:"), "route-first Wedding Ring result");
  globalSearch.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  assert(document.getElementById("p-route").classList.contains("on") && document.activeElement?.id === "c1-13", "Enter on global search did not navigate to the Wedding Ring route card");

  document.querySelector('[data-p="companion"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#inventory-list input[data-inventory-id]"), "Play Mode inventory planner render");
  assert(document.getElementById("p-companion").classList.contains("on") && document.getElementById("play-current").textContent.includes("Confirm Shulk"), "Play Mode did not open on the next incomplete route card");
  const verdant = dom.window.MONSTERPEDIA_DATA.entries.find(entry => entry.name === "Verdant Bluchal");
  await waitFor(() => document.querySelector(`#encounter-select option[value="${verdant.id}"]`), "Play Mode encounter dossiers");
  document.getElementById("encounter-select").value = verdant.id;
  document.getElementById("encounter-select").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.getElementById("encounter-detail").textContent.includes("Shulk / Reyn / Fiora · control Shulk"), "Play Mode recommends a party that is unavailable for Verdant Bluchal");
  assert(!document.getElementById("encounter-detail").textContent.includes("Shulk / Dunban / Riki"), "Play Mode leaked the late-game Unique Monster party into Chapter 1");
  document.getElementById("session-length").value = "30";
  document.getElementById("session-focus").value = "completion";
  document.getElementById("session-build").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.querySelectorAll("#session-dashboard .session-check").length > 0 && document.getElementById("session-dashboard").textContent.includes("route order preserved"), "Adventure Companion did not build a route-ordered session");
  assert(!document.getElementById("session-dashboard").textContent.includes("Party data is loading"), "Adventure Companion shows a false loading state when the current chapter has no scheduled party swap");
  assert(JSON.parse(localStorage.getItem("xc1de-guide-state-v4")).preferences.sessionIds.length > 0, "Adventure Companion session did not persist");
  document.querySelector("#play-current [data-complete-play]").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  let companionSaved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(companionSaved.route["c0-02"], "Play Mode did not persist the current route checkpoint");
  const inventoryInput = document.querySelector("#inventory-list input[data-inventory-id]");
  inventoryInput.value = "3";
  inventoryInput.dispatchEvent(new Event("change", { bubbles: true }));
  companionSaved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(companionSaved.inventory[inventoryInput.dataset.inventoryId] === 3, "Play Mode did not persist a manual inventory quantity");
  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));

  assert(document.querySelectorAll("#route .it").length === 417 && document.querySelectorAll("#route .world-arrival-item").length === 461, "route did not render 417 major tasks plus 461 compact map discoveries");
  assert(!document.getElementById("p-route").hidden && document.getElementById("p-completion").hidden, "inactive tab panels are not semantically hidden");
  assert(document.querySelectorAll("#route .chh[aria-expanded]").length === 20, "chapter buttons lack expanded state");
  assert(document.querySelectorAll("#route .it:not(.world-it) .rec-level").length === 417, "not every major route card has a recommended level");
  assert(document.querySelectorAll("#route .world-it .rec-level").length === 0, "minor discovery cues still repeat recommended-level badges");
  assert(document.querySelectorAll("#route .leader-badge").length === 24, "the 23 later party-leader steps plus the Chapter 0 setup are not all badged");
  assert([...document.querySelectorAll("#route .leader-badge")].some(badge => badge.textContent.includes("DUNBAN → SHULK")), "Stunted Growth does not show its two-leader handoff");
  assert(document.querySelectorAll("#route .deadline-badge").length > 100, "missable/lockout badges are not visible throughout the route");
  assert(document.querySelectorAll("#route .route-build").length === 9, "route build updates did not render at all nine progression milestones");
  assert(document.querySelectorAll("#route details.pan").length >= 100, "long route guidance is not collapsed into readable details");
  assert([...document.querySelectorAll("#route details")].every(detail => detail.open), "the route does not start with every disclosure expanded");
  assert(!document.querySelector("#s-ch0 .chapter-heading").textContent.includes("Lv —"), "Chapter 0 still exposes a placeholder level");
  assert(document.querySelectorAll("#route .chapter-heading").length === 20, "route chapters are not exposed as semantic headings");
  assert(document.querySelector("#route .route-build-grid"), "route build updates are not split into readable sections");
  assert(!document.querySelector("#route .route-build").textContent.includes("Slot nowShulk"), "route build text still collapses Slot now and Shulk together");
  assert([...document.querySelectorAll("#route .it label")].every(label => !/^\p{Extended_Pictographic}/u.test(label.textContent.trim())), "route titles still use leading emoji instead of the shared icon/tag system");
  assert(document.getElementById("route-count").textContent.includes("878 checkpoints"), "route search result count is missing or incorrect");
  const chapterJump = document.getElementById("chapter-jump");
  assert(chapterJump.options.length === 21, "chapter jump control did not list every route chapter");
  chapterJump.value = "ch14";
  chapterJump.dispatchEvent(new Event("change", { bubbles: true }));
  assert(!document.getElementById("s-ch14").classList.contains("closed") && document.getElementById("q").value === "", "chapter jump did not restore and open the requested route chapter");
  assert(document.querySelector('script[src*="completion-data"]') && document.querySelector('script[src*="monsterpedia-data"]'), "Play Mode did not request its completion and encounter datasets");
  assert(document.getElementById("c0-01").checked, "legacy v1 route progress did not migrate");
  let saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.route["c0-01"] && saved.version === 4, "migrated state was not persisted under v4");

  const braveParent = document.getElementById("c1-miss-brave-protectors");
  const braveStep = document.querySelector('[data-subcheck-parent="c1-miss-brave-protectors"]');
  assert(braveStep && document.querySelectorAll('[data-subcheck-parent="c1-miss-brave-protectors"]').length === 9, "The Brave Protectors did not render nine sub-checkpoints");
  braveStep.checked = true;
  braveStep.dispatchEvent(new Event("change", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.routeSteps["c1-miss-brave-protectors"][braveStep.dataset.subcheckId] && !braveParent.checked, "Sub-checkpoint progress did not persist independently from its parent card");
  assert(braveStep.closest(".route-subchecks").textContent.includes("1/9"), "Sub-checkpoint completion count did not update");
  assert(braveStep.closest(".route-subchecks").textContent.includes("18:00–06:00"), "Brave Protectors sub-checkpoints lack a time and location hint");
  const genericQuestGroups = {"c1-10":13,"c1-11":4,"c1-12":4,"c1-13":4,"c4-06":22,"c6-21":4,"c7-28":4,"c8-25":12,"c8-26":12,"c10-12":4,"c14-05":6,"c15-02":28};
  for (const [id, count] of Object.entries(genericQuestGroups)) {
    assert(document.querySelectorAll(`[data-subcheck-parent="${id}"]`).length === count, `${id} did not render ${count} grouped-quest checkboxes`);
    const group = document.querySelector(`[data-subcheck-group="${id}"]`), buttons = [...group.querySelectorAll(".subcheck-atlas-link")];
    assert(buttons.length === count * 2, `${id} does not expose exactly two map actions per small quest`);
    assert(buttons.every((button, index) => button.textContent.trim() === (index % 2 ? "Target" : "Pickup")), `${id} does not use consistent Pickup / Target labels`);
    assert([...group.querySelectorAll(".route-subcheck-copy > span")].every(label => label.textContent.includes("—")), `${id} still contains a vague objective-free title`);
    assert([...group.querySelectorAll(".route-subcheck-copy small")].every(hint => hint.textContent.startsWith("Pickup ")), `${id} contains an inconsistent one-line pickup hint`);
  }
  assert(document.querySelector('[data-subcheck-group="c1-13"] [data-subcheck-id="search-quest-2"]'), "Search Quest objective enrichment changed the stable progress key");
  const normalizedButtons = [...document.querySelectorAll('[data-subcheck-group="c1-13"] .subcheck-atlas-link')];
  assert(normalizedButtons.every(button => dom.window.getComputedStyle(button).width === "72px" && dom.window.getComputedStyle(button).height === "46px"), "Pickup / Target buttons do not share one fixed size");
  assert([...document.querySelectorAll('[data-subcheck-group="c1-13"] .route-subcheck-copy small')].every(hint => /Pickup \d{2}:\d{2}–\d{2}:\d{2}/.test(hint.textContent)), "Colony 9 Search Quest sub-checkpoints lack concise pickup schedules and item directions");

  const ridgeTarget = document.querySelector('[data-subcheck-group="c1-10"] [data-open-atlas-query="Ridge Antol"]');
  ridgeTarget.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.getElementById("atlas-q")?.value === "Ridge Antol" && document.querySelectorAll("#frontier-pins .EnemySpawnPoint").length > 0, "quest Target Atlas search");
  assert(document.getElementById("atlas-area").value === "colony-9-map" && document.querySelector('[data-atlas-type="EnemySpawnPoint"]').checked, "quest Target action did not open the correct map and pin type");
  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));

  const worldCheck = document.querySelector("#route input[data-world-id]");
  worldCheck.checked = true;
  worldCheck.dispatchEvent(new Event("change", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.world[worldCheck.dataset.worldId], "world discovery tick was not saved");

  const dunbanAtlasButton = document.querySelector('.world-arrival-item [data-open-world-id="world-colony-9-dunban-s-house-eee084ec"]');
  assert(dunbanAtlasButton, "Dunban's House arrival checkpoint lacks an Atlas deep link");
  dunbanAtlasButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#reference-atlas .frontier-pin.is-focused"), "Dunban's House exact Atlas focus");
  assert(document.getElementById("atlas-area").value === "colony-9-map" && document.getElementById("atlas-q").value === "Dunban's House" && document.getElementById("frontier-detail").textContent.includes("Dunban's House"), "area-arrival Atlas link opened the map without focusing its exact pin");
  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));

  const routeSearch = document.getElementById("q");
  routeSearch.value = "Bafalgar Tomb";
  routeSearch.dispatchEvent(new Event("input", { bubbles: true }));
  const bafalgar = [...document.querySelectorAll("#route .world-it")].find(row => row.textContent.includes("Bafalgar Tomb"));
  assert(bafalgar && !bafalgar.classList.contains("hide") && bafalgar.closest("section").style.display !== "none", "route search did not find a world discovery");
  const hiddenArrivalTrackers = [...document.querySelectorAll("#route .area-arrival.hide")];
  assert(hiddenArrivalTrackers.length > 0 && hiddenArrivalTrackers.every(bundle => dom.window.getComputedStyle(bundle).display === "none"), "route search leaves nonmatching area-arrival trackers visibly stacked below its results");
  routeSearch.value = ""; routeSearch.dispatchEvent(new Event("input", { bubbles: true }));
  document.querySelector('#p-route .chip[data-f="d"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert([...document.querySelectorAll('#route .world-it[data-deadline="true"]')].some(row => !row.classList.contains("hide")), "deadline filter omitted lockout-map discoveries");
  assert(document.querySelector('#p-route .chip[data-f="d"]').getAttribute("aria-pressed") === "true", "route filter does not expose its pressed state");
  document.querySelector('#p-route .chip[data-f="all"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));

  document.querySelector('[data-p="completion"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelectorAll("#ccat option").length === 7, "completion data lazy render");
  assert(document.getElementById("p-completion").classList.contains("on"), "Completion Hub tab did not activate");
  assert(!document.getElementById("p-completion").hidden && document.getElementById("p-route").hidden, "tab panel hidden states did not update");
  assert(document.getElementById("dash").style.display === "none", "route dashboard remained visible in Completion Hub");
  assert(document.querySelector('[data-p="completion"]').tabIndex === 0 && document.querySelector('[data-p="route"]').tabIndex === -1, "tabs do not use roving tabindex");

  const category = document.getElementById("ccat");
  category.value = "achievements";
  category.dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#completion .citem").length === 200, "achievement ledger did not render 200 rows");
  const achievement = document.querySelector("#completion input[data-cid]");
  achievement.checked = true;
  achievement.dispatchEvent(new Event("change", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.completion[achievement.dataset.cid], "completion tick was not saved");

  category.value = "quests";
  category.dispatchEvent(new Event("change", { bubbles: true }));
  const skip = document.querySelector("#completion button.skip");
  assert(skip, "no mutually exclusive quest branch control rendered");
  skip.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.skipped[skip.dataset.cid], "Not my branch state was not saved");

  const completionTab = document.querySelector('[data-p="completion"]');
  completionTab.focus();
  completionTab.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
  assert(document.getElementById("p-monsters").classList.contains("on"), "arrow-key tab navigation did not activate Monsterpedia");
  await waitFor(() => document.querySelectorAll("#monster-results .result-card").length === 80, "Monsterpedia lazy render");
  const monsterSearch = document.getElementById("monster-q");
  monsterSearch.value = "Brog Leg Meat";
  monsterSearch.dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.querySelectorAll("#monster-results .result-card").length > 0, "Monsterpedia drop search returned nothing");
  assert(document.getElementById("monster-count").textContent.includes("of 866"), "Monsterpedia count is incorrect");
  assert(document.getElementById("monster-ledger").textContent.includes("0 / 12,582 drops logged"), "Monsterpedia ledger total is missing or incorrect");
  monsterSearch.value = "Territorial Rotbart";
  monsterSearch.dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.getElementById("monster-more").hidden, "Monsterpedia pagination control is not hidden when all filtered results fit");
  assert(document.querySelector("#monster-results [data-chain-phase]")?.dataset.chainPhase === "ch12", "high-level Monsterpedia encounters fall back to the opening-party Chain Planner phase");
  assert(document.querySelectorAll("#monster-results .monster-portrait").length > 0, "Monsterpedia portraits did not render");
  assert([...document.querySelectorAll("#monster-results .monster-portrait")].some(image => image.getAttribute("src").startsWith("assets/monster-images/")), "Monsterpedia is not using its locally cached wiki portraits");
  assert([...document.querySelectorAll("#monster-results .monster-card")].every(card => card.dataset.family), "Monsterpedia cards lack their family identity");
  assert(![...document.querySelectorAll("#monster-results .monster-card")].some(card => card.dataset.family === "unknown"), "Known Monsterpedia species fell through to an unclassified icon");
  assert(dom.window.MONSTERPEDIA_DATA.entries.every(entry => dom.window.monsterFamily(entry).id !== "unknown"), "The family map does not cover the complete Monsterpedia roster");
  monsterSearch.value = "";
  document.getElementById("monster-family").value = "mechon";
  document.getElementById("monster-family").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#monster-results .monster-card").length > 0 && [...document.querySelectorAll("#monster-results .monster-card")].every(card => card.dataset.family === "mechon"), "Monsterpedia family filter leaked another species family");
  document.getElementById("monster-family").value = "";
  document.getElementById("monster-family").dispatchEvent(new Event("change", { bubbles: true }));
  const logButton = document.querySelector("#monster-results button[data-monster-log]");
  assert(logButton, "Monsterpedia did not render a completion-ledger control");
  const logId = logButton.dataset.monsterLog;
  logButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.monsterLog[logId], "Monsterpedia completion-log entry was not persisted");
  assert(document.getElementById("ptxt").textContent.includes("Monsterpedia 1 / 866"), "Header progress did not switch to the Monsterpedia ledger");
  document.getElementById("monster-condition").value = "logged";
  document.getElementById("monster-condition").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#monster-results .monster-card").length === 1 && document.querySelector("#monster-results button[data-monster-log]")?.getAttribute("aria-pressed") === "true", "Monsterpedia logged filter did not isolate the marked entry");
  document.getElementById("monster-condition").value = "unlogged";
  document.getElementById("monster-condition").dispatchEvent(new Event("change", { bubbles: true }));
  assert([...document.querySelectorAll("#monster-results button[data-monster-log]")].every(button => button.getAttribute("aria-pressed") === "false"), "Monsterpedia unlogged filter leaked a completed entry");
  document.getElementById("monster-condition").value = "";
  document.getElementById("monster-condition").dispatchEvent(new Event("change", { bubbles: true }));
  const huntButton = document.querySelector("#monster-results button[data-hunt]");
  assert(huntButton, "Monsterpedia did not render a hunt-list control");
  const huntId = huntButton.dataset.hunt;
  huntButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.hunts[huntId], "Monsterpedia hunt pin was not persisted");
  document.getElementById("monster-condition").value = "hunt";
  document.getElementById("monster-condition").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#monster-results .monster-card").length === 1 && document.querySelector("#monster-results button[data-hunt]")?.getAttribute("aria-pressed") === "true", "Monsterpedia hunt filter did not isolate the pinned monster");
  document.getElementById("monster-clear-hunts").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(Object.keys(saved.hunts).length === 0, "Monsterpedia hunt clear did not reset the local list");
  document.getElementById("monster-condition").value = "";
  document.getElementById("monster-condition").dispatchEvent(new Event("change", { bubbles: true }));
  document.getElementById("monster-condition").value = "unique";
  document.getElementById("monster-condition").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#monster-results .result-card").length > 0 && [...document.querySelectorAll("#monster-results .result-card")].every(card => /Unique Monster/i.test(card.textContent)), "Monsterpedia unique filter leaked normal enemies");
  assert([...document.querySelectorAll("#monster-results .monster-card")].every(card => card.querySelector(".combat-dossier")?.textContent.includes("source-backed mechanics")), "A Unique Monster card lacks its source-backed combat dossier");
  const routeLinkedEncounters = dom.window.MONSTERPEDIA_DATA.entries.filter(entry => entry.unique && dom.window.COMBAT_DOSSIER_DATA.records[entry.id]).map(entry => ({ entry, reference:dom.window.routeItemReference(entry.name, item => item.f === "u") })).filter(record => record.reference);
  assert(routeLinkedEncounters.length >= 80, "too few route-linked Unique Monster dossiers were available for the party-legality audit");
  for (const { entry, reference } of routeLinkedEncounters) {
    const record = dom.window.COMBAT_DOSSIER_DATA.records[entry.id];
    const baseAdvice = dom.window.COMBAT_DOSSIER_DATA.encounters?.[entry.name] || record?.guidePrep;
    const advice = dom.window.routeAwareEncounterAdvice(baseAdvice, reference);
    const phase = dom.window.routePartyPhase(reference);
    const members = advice.party.split("·")[0].split("/").map(name => name.trim());
    assert(members.every(name => phase.members.includes(name)), `${entry.name} recommends an unavailable party member in ${reference.chapterId}`);
  }
  monsterSearch.value = "Verdant Bluchal";
  monsterSearch.dispatchEvent(new Event("input", { bubbles: true }));
  const verdantCard = document.querySelector("#monster-results .monster-card");
  assert(verdantCard?.textContent.includes("Shulk / Reyn / Fiora · control Shulk"), "Monsterpedia does not show the legal Chapter 1 party for Verdant Bluchal");
  assert(verdantCard?.querySelector('.combat-dossier[open]') && verdantCard.querySelector('details[open]'), "Monsterpedia disclosures do not start expanded");
  const dossierChainLink = verdantCard.querySelector('[data-open-tool="chain"][data-chain-target]');
  assert(dossierChainLink?.dataset.chainTarget === verdant.id && dossierChainLink.dataset.chainPhase === "ch1", "Unique Monster dossier does not carry target and story phase into Chain Planner");
  dossierChainLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-chain").classList.contains("on") && document.getElementById("chain-target").value === verdant.id && document.getElementById("chain-phase").value === "ch1", "Unique Monster-to-Chain-Planner context was not applied");
  document.querySelector('[data-hub="reference"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  monsterSearch.value = "Verdant Bluchal";
  monsterSearch.dispatchEvent(new Event("input", { bubbles: true }));
  const monsterGemLink = document.querySelector('#monster-results [data-open-tool="gems"][data-gem-target]');
  assert(monsterGemLink?.dataset.gemTarget === "Agility Up", "Monsterpedia dossier does not expose its relevant gem preparation");
  monsterGemLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-gems").classList.contains("on") && document.getElementById("gem-target").value === "Agility Up", "Monsterpedia-to-Gem-Assistant context was not applied");
  monsterSearch.value = "";
  monsterSearch.dispatchEvent(new Event("input", { bubbles: true }));

  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const monsterRouteLink = document.querySelector("#route button[data-open-monster]");
  assert(monsterRouteLink, "Unique Monster route cards do not link to Monsterpedia");
  const routeMonsterId = monsterRouteLink.dataset.openMonster;
  const routeMonsterName = dom.window.MONSTERPEDIA_DATA.entries.find(entry => entry.id === routeMonsterId)?.name;
  monsterRouteLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-monsters").classList.contains("on") && document.getElementById("monster-q").value === routeMonsterName, "Route-to-Monsterpedia link did not open the exact enemy dossier");
  assert(document.querySelector("#monster-results .monster-card")?.textContent.includes(routeMonsterName), "Route-to-Monsterpedia search did not isolate the linked monster");
  const monsterBackLink = document.querySelector("#monster-results button[data-open-route]");
  assert(monsterBackLink, "Monsterpedia dossier does not link back to its route card");
  const monsterRouteCardId = monsterBackLink.dataset.openRoute;
  monsterBackLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-route").classList.contains("on") && document.querySelector(`#route .it[data-id="${monsterRouteCardId}"]`), "Monsterpedia-to-route link did not open the exact route card");

  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const questRouteLink = document.querySelector("#route button[data-open-quest]");
  assert(questRouteLink, "Quest route cards do not link to the dependency lookup");
  const routeQuestName = questRouteLink.textContent.replace(/^Open\s+/, "").replace(/\s+in Quest Lookup$/, "").trim();
  questRouteLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-quests").classList.contains("on") && document.getElementById("quest-q").value === routeQuestName, "Route-to-Quest link did not open the exact dependency card");
  assert(document.querySelector("#quest-results .result-card")?.textContent.includes(routeQuestName), "Route-to-Quest search did not isolate the linked quest");
  const questBackLink = document.querySelector("#quest-results button[data-open-route]");
  assert(questBackLink, "Quest lookup does not link back to its route card");
  const questRouteCardId = questBackLink.dataset.openRoute;
  questBackLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-route").classList.contains("on") && document.querySelector(`#route .it[data-id="${questRouteCardId}"]`), "Quest-to-route link did not open the exact route card");

  document.querySelector('[data-p="monsters"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document.querySelector('[data-hub-destination="quests"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const questSearch = document.getElementById("quest-q");
  questSearch.value = "Talia's Research";
  questSearch.dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.querySelector("#quest-results .result-card")?.textContent.includes("Investigating Satorl"), "quest dependency lookup did not show the mutually exclusive branch");
  document.getElementById("quest-status").value = "branch";
  document.getElementById("quest-status").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#quest-results .result-card").length > 0, "quest branch filter returned nothing");

  document.querySelector('[data-p="combat"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.querySelectorAll("#build-character-tabs .build-character-tab").length === 11, "Build Lab roster did not render 11 character tabs");
  assert([...document.querySelectorAll("#build-character-tabs [role=tab]")].every(tab => tab.id && tab.getAttribute("aria-controls") && tab.getAttribute("tabindex")), "Build character tabs lack complete keyboard/ARIA relationships");
  assert([...document.querySelectorAll("#build-character-tabs [role=tab]")].every(tab => document.getElementById(tab.getAttribute("aria-controls"))), "A Build Lab character tab controls a missing panel");
  assert(document.querySelector("label[for=import-file]")?.textContent.includes("progress JSON"), "Import file control lacks a visible-to-assistive label");
  assert(document.querySelectorAll("#party-presets .preset-avatar[src^='assets/party-portraits/']").length > 0, "Party presets are missing their sourced character portraits");
  assert(document.getElementById("build-goal-note").textContent.includes("Same 8 normal Arts"), "Shulk's fortress comparison does not explain why its Arts match Reliable meta");
  document.querySelector('[data-build-character="reyn"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("build-goal-note").textContent.includes("Fortress adds Last Stand, Aura Burst"), "Reyn's fortress comparison does not expose its actual Art changes");
  document.querySelector('[data-build-character="melia"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document.getElementById("build-control").value = "ai";
  document.getElementById("build-goal").value = "aggressive";
  document.getElementById("build-goal").dispatchEvent(new Event("change", { bubbles: true }));
  assert(/Melia · AI · Fastest-kill meta/.test(document.getElementById("build-result").textContent), "Build Lab selectors did not update the recommendation");
  document.getElementById("build-goal").value = "fortress";
  document.getElementById("build-goal").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.getElementById("build-goal-note").textContent.includes("Survival-first"), "Fortress mode does not explain how it differs from Reliable meta");
  document.getElementById("build-show-all").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.querySelectorAll("#build-result .build-character-block").length === 11, "Build Lab Show all did not render every character sequentially");
  document.getElementById("build-show-all").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.querySelectorAll("#build-result .build-character-block").length === 1, "Build Lab did not return to single-character mode");
  document.querySelector("#party-presets .preset").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("preset-detail").textContent.includes("Party:"), "party preset did not open");
  assert(document.querySelectorAll("#tabs > button").length === 5 && !document.getElementById("mobile-section"), "global navigation did not consolidate to five hubs");
  assert([...document.querySelectorAll("#tabs > button")].map(button => button.textContent.trim()).join("|") === "The Route|Companion|Completion|Reference|Workshop", "global navigation labels or order do not match the five-hub design");
  const expectedHubSections = {
    companion:["Adventure session","Next objective","Area briefing","Inventory","Encounter mode"],
    completion:["Completion ledger","Colony 6","Decisions","Endgame"],
    reference:["Monsterpedia","Quests","Atlas & planners","Time & weather"],
    workshop:["Builds & presets","Chain Planner","Gem Crafting","Gift Optimizer","Party Chemistry"]
  };
  for (const [hub, labels] of Object.entries(expectedHubSections)) {
    document.querySelector(`[data-hub="${hub}"]`).dispatchEvent(new MouseEvent("click", { bubbles: true }));
    assert([...document.querySelectorAll("#hub-rail [data-hub-destination]")].map(button => button.textContent.trim()).join("|") === labels.join("|"), `${hub} hub rail is incomplete or out of order`);
    assert(document.getElementById("hub-section-label").textContent === `${hub === "companion" ? "Companion" : hub[0].toUpperCase()+hub.slice(1)}:`, `${hub} mobile section picker is not context-labelled`);
  }
  document.querySelector('[data-hub="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(["hub-breadcrumb","hub-rail","hub-section-picker"].every(id => document.getElementById(id).hidden), "Workshop hub chrome remains active after returning to the Route");
  document.querySelector('[data-hub="workshop"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document.querySelector('#p-combat [data-open-tool="chain"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-chain").classList.contains("on") && document.querySelectorAll("#chain-result .chain-art").length >= 2, "Chain Planner did not render a phase-legal sequence");
  assert(!document.getElementById("chain-result").textContent.includes("Dunban") && !document.getElementById("chain-result").textContent.includes("Riki"), "Chain Planner leaked later party members into the opening phase");
  document.querySelector('[data-hub-destination="gems"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("gem-result").textContent.includes("100% makes a gem") && document.getElementById("gem-result").textContent.includes("300% Mega Heat"), "Gem Crafting Assistant is missing its threshold plan");
  document.querySelector('[data-hub-destination="gifts"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("gift-source").textContent.includes("300-item matrix") && document.querySelectorAll("#gift-result .gift-row").length === 20, "Gift Optimizer did not load the complete gift matrix or ranked results");
  const giftArea = document.getElementById("gift-area");
  document.getElementById("gift-protect").checked = false;
  for (const option of [...giftArea.options].filter(option => option.value)) {
    giftArea.value = option.value;
    giftArea.dispatchEvent(new Event("change", { bubbles: true }));
    assert(document.querySelectorAll("#gift-result .gift-row").length > 0, `Gift Optimizer area filter returned nothing for ${option.value}`);
  }
  giftArea.value = "Colony 9";
  document.getElementById("gift-q").value = "Sweet Wasabi";
  document.getElementById("gift-q").dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.getElementById("gift-result").textContent.includes("Sweet Wasabi") && !document.getElementById("gift-result").textContent.includes("Sweet Wasabi Colony 9"), "Gift Optimizer did not separate gift names from their areas");
  document.getElementById("gift-q").value = "";
  giftArea.value = "";
  giftArea.dispatchEvent(new Event("change", { bubbles: true }));
  document.querySelector('[data-hub-destination="party"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("party-leader").options.length === 3 && !document.getElementById("party-result").textContent.includes("Dunban"), "Party Chemistry Lab did not enforce Chapter 1 roster availability");
  document.getElementById("party-phase").value = "ch3";
  document.getElementById("party-phase").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.getElementById("party-three").disabled && document.getElementById("party-three").closest("label").hidden, "Party Lab did not represent the Chapter 3 forced pair");
  assert(document.getElementById("party-result").textContent.includes("Forced two-person phase") && !document.getElementById("party-result").textContent.includes("Invalid party"), "Party Lab incorrectly scores the Chapter 3 forced pair as illegal");

  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const ch5PartyLink = document.querySelector('#s-ch5 .route-build [data-open-tool="party"]');
  assert(ch5PartyLink?.dataset.partyPhase === "ch5" && ch5PartyLink.dataset.partyMembers === "shulk,dunban,sharla", "route build update does not carry its phase and party into Party Lab");
  ch5PartyLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("party-phase").value === "ch5" && document.getElementById("party-leader").value === "shulk" && document.getElementById("party-two").value === "dunban" && document.getElementById("party-three").value === "sharla", "route-to-Party-Lab context was not applied");
  document.querySelector('#party-result [data-open-tool="chain"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("chain-phase").value === "ch5" && document.getElementById("chain-preset").value === "__context" && /Shulk \/ Dunban \/ Sharla/.test(document.getElementById("chain-result").textContent), "Party Lab did not carry the selected party into Chain Planner");

  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const ch5GemLink = document.querySelector('#s-ch5 .route-build [data-open-tool="gems"]');
  assert(ch5GemLink?.dataset.gemTarget === "Agility Up", "route build update did not identify its primary gem need");
  ch5GemLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("gem-phase").value === "ch5" && document.getElementById("gem-target").value === "Agility Up", "route-to-Gem-Assistant context was not applied");
  document.querySelector('#gem-result [data-search-monster-drop]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-monsters").classList.contains("on") && document.getElementById("monster-q").value === "Agility Up" && document.querySelectorAll("#monster-results .monster-card").length > 0, "Gem Assistant did not open relevant Monsterpedia encounter/drop context");

  const ch5Record = dom.window.playableRouteCards().find(record => record.chapter.id === "ch5");
  dom.window.renderAreaBriefing(ch5Record);
  const companionAgilityLink = document.querySelector('#area-briefing [data-open-tool="gems"][data-gem-target="Agility Up"]');
  assert(companionAgilityLink && companionAgilityLink.textContent.includes("Craft Agility Up"), "Companion does not turn the Chapter 5 Dunban agility need into a contextual gem action");

  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const heartGiftLink = document.querySelector('#route [data-open-tool="gifts"][data-gift-route]');
  assert(heartGiftLink, "Heart-to-Heart route card does not link to Gift Optimizer");
  heartGiftLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("p-gifts").classList.contains("on") && document.getElementById("gift-giver").value !== document.getElementById("gift-recipient").value, "Heart-to-Heart link did not preselect its character pair");

  document.querySelector('[data-p="completion"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document.querySelector('[data-hub-destination="bosses"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document.querySelector('#p-bosses [data-open-tool="party"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.getElementById("party-phase").value === "post" && ["party-leader","party-two","party-three"].map(id => document.getElementById(id).value).join(",") === "shulk,dunban,riki", "Endgame guide did not load its superboss party in Workshop");

  for (const query of ["Adventure Companion","Completion Hub","Quest Lookup","Atlas planners","Chain Planner","Gem Crafting Assistant","Gift Optimizer","Party Chemistry Lab"]) {
    globalSearch.value = query;
    globalSearch.dispatchEvent(new Event("input", { bubbles: true }));
    assert(document.getElementById("guide-search-results")?.textContent.toLowerCase().includes(query.split(" ")[0].toLowerCase()), `global search did not index the ${query} subsection`);
  }
  globalSearch.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  document.querySelector('[data-hub="companion"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.querySelectorAll("#recent-tools button").length > 0 && document.getElementById("recent-tools").textContent.includes("Party Chemistry"), "Companion does not retain recently used Workshop shortcuts");

  document.querySelector('[data-p="monsters"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  document.querySelector('[data-hub-destination="reference"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#reference-atlas img"), "offline map atlas render");
  assert(document.querySelectorAll("#reference-atlas .frontier-tiles img").length === 4, "interactive atlas did not render its four local map tiles");
  assert(document.querySelectorAll("#reference-atlas .frontier-pin").length > 0, "interactive atlas did not render exact source pins");
  assert([...document.querySelectorAll("#reference-atlas .frontier-pin")].every(pin => /Collection pin|Enemy spawn|Landmark/.test(pin.getAttribute("aria-label") || "")), "interactive atlas pins lack unique accessible labels");
  document.getElementById("atlas-q").value = "Strong Dandelion";
  document.getElementById("atlas-q").dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.querySelectorAll("#reference-atlas .frontier-pin.CollectionPoint").length > 0 && document.querySelector("#reference-atlas .frontier-route polyline"), "collectible map search did not render pins and a suggested route");
  document.querySelector('[data-reference-view="collect"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#reference-collect input[data-collect-id]"), "Collectopaedia tracker render");
  const collectInput = document.querySelector("#reference-collect input[data-collect-id]");
  collectInput.checked = true; collectInput.dispatchEvent(new Event("change", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.collectopaedia[collectInput.dataset.collectId], "Collectopaedia item was not persisted");
  document.querySelector('[data-reference-view="affinity"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#affinity-residents .collect-page"), "Affinity resident planner render");
  assert(document.querySelector("#reference-affinity .lookup-count").textContent.includes("177 resident"), "Affinity planner coverage summary is missing");
  document.getElementById("affinity-q").value = "Dionysis";
  document.getElementById("affinity-q").dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.querySelector("#affinity-residents .collect-page")?.textContent.includes("Dionysis"), "Affinity resident search failed");

  document.querySelector('[data-p="completion"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const mobileSection = document.getElementById("hub-section-select");
  mobileSection.value = "bosses";
  mobileSection.dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.getElementById("p-bosses").classList.contains("on") && mobileSection.value === "bosses", "mobile hub section picker did not activate the selected section");
  assert(document.getElementById("tab-completion").getAttribute("aria-controls") === "p-bosses", "active hub tab does not identify its visible subsection panel");
  assert(document.querySelector("#p-bosses .guide-feature img")?.getAttribute("src") === "assets/game-icons/superboss-abaasy.png", "Superboss guide panel is missing its sourced in-game image");

  // A Back navigation that restores a route-card state must not push a new
  // history entry from inside popstate and discard the Forward destination.
  const historyRouteId = dom.window.playableRouteCards()[12].item.id;
  dom.window.openRouteCard(historyRouteId);
  dom.window.activatePanel("gifts");
  const historyLength = dom.window.history.length;
  dom.window.history.back();
  await waitFor(() => dom.window.history.state?.routeItem === historyRouteId, "route-card history restore");
  assert(dom.window.history.length === historyLength && document.getElementById("p-route").classList.contains("on"), "route-card popstate created a replacement history entry");

  document.getElementById("reset").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(Object.keys(saved.route).length === 0 && Object.keys(saved.routeSteps).length === 0 && Object.keys(saved.completion).length === 0 && Object.keys(saved.world).length === 0 && Object.keys(saved.hunts).length === 0 && Object.keys(saved.monsterLog).length === 0 && Object.keys(saved.collectopaedia).length === 0 && Object.keys(saved.drops).length === 0, "reset did not clear route, sub-checkpoint, completion, world, and Monsterpedia ledgers");
  assert(localStorage.getItem("xc1de-guide-state-v4-last-backup"), "reset did not create an automatic backup");
  document.getElementById("restore").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.route["c0-01"] && saved.routeSteps["c1-miss-brave-protectors"][braveStep.dataset.subcheckId] && saved.completion[achievement.dataset.cid] && saved.world[worldCheck.dataset.worldId], "automatic backup did not restore every ledger");

  await new Promise(resolve => setTimeout(resolve, 20));
  assert(errors.length === 0, `runtime errors: ${errors.join(" | ")}`);
  dom.window.close();
  const previousDom = await makeDom({ previous: { version: 2, route: { "c1-01": true }, completion: {}, skipped: {} } });
  const previousSaved = JSON.parse(previousDom.window.localStorage.getItem("xc1de-guide-state-v4"));
  assert(previousSaved.route["c1-01"] && previousSaved.version === 4 && previousSaved.world && previousSaved.routeSteps, "v2 structured state did not migrate to v4");
  previousDom.window.close();
  const referenceDom = await makeDom({ url: "https://guide.local/index.html#/reference" });
  await waitFor(() => referenceDom.window.document.querySelectorAll("#atlas-area option").length === 73, "direct Reference-hub data load");
  assert(referenceDom.window.document.getElementById("p-reference").classList.contains("on") && referenceDom.window.document.querySelectorAll("#route .world-arrival-item").length === 461, "direct Reference-hub reload aborted route/data initialization");
  referenceDom.window.close();
  console.log("OK: migration, route/world render, five hubs, Companion sessions, searches, Monsterpedia, Workshop tools, builds, presets, reset and restore interactions.");
})().catch(error => { console.error(error.stack || error); process.exit(1); });
