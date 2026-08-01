// Interaction smoke test. Pass an absolute jsdom module path when it is not
// installed in this folder:
//   node test-guide-runtime.js C:\temp\node_modules\jsdom
const fs = require("fs");
const path = require("path");
const jsdomPath = process.argv[2] || "jsdom";
const { JSDOM, VirtualConsole } = require(jsdomPath);

const root = __dirname;
const dataFiles = ["route-data.js", "completion-data.js", "monsterpedia-data.js", "world-data.js", "build-data.js", "collectopaedia-data.js", "map-atlas-data.js", "map-coordinates-data.js", "frontier-map-data.js", "combat-dossier-data.js", "affinity-data.js", "route-bindings-data.js"];
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

async function makeDom({ legacy = null, previous = null } = {}) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", error => errors.push(error.message));
  virtualConsole.on("error", error => errors.push(String(error)));
  const dom = new JSDOM(html, {
    url: "https://guide.local/index.html",
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
        if (node.tagName === "SCRIPT" && /\/data\/(route|completion|monsterpedia|world|build|route-bindings)-data\.js/.test(node.src)) {
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
  assert(document.querySelector(".header-tools > #guide-search-results")?.textContent.includes("Avalanche Abaasy"), "global search results are not anchored to the header search region");
  globalSearch.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  assert(!document.getElementById("guide-search-results"), "Escape did not dismiss global search results");

  document.querySelector('[data-p="companion"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#inventory-list input[data-inventory-id]"), "Play Mode inventory planner render");
  assert(document.getElementById("p-companion").classList.contains("on") && document.getElementById("play-current").textContent.includes("Confirm Shulk"), "Play Mode did not open on the next incomplete route card");
  document.querySelector("#play-current [data-complete-play]").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  let companionSaved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(companionSaved.route["c0-02"], "Play Mode did not persist the current route checkpoint");
  const inventoryInput = document.querySelector("#inventory-list input[data-inventory-id]");
  inventoryInput.value = "3";
  inventoryInput.dispatchEvent(new Event("change", { bubbles: true }));
  companionSaved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(companionSaved.inventory[inventoryInput.dataset.inventoryId] === 3, "Play Mode did not persist a manual inventory quantity");
  document.querySelector('[data-p="route"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));

  assert(document.querySelectorAll("#route .it").length === 878, "route did not render 417 route tasks plus 461 map discoveries");
  assert(!document.getElementById("p-route").hidden && document.getElementById("p-completion").hidden, "inactive tab panels are not semantically hidden");
  assert(document.querySelectorAll("#route .chh[aria-expanded]").length === 20, "chapter buttons lack expanded state");
  assert(document.querySelectorAll("#route .rec-level").length === 878, "not every checkbox card has a recommended level");
  assert(document.querySelectorAll("#route .leader-badge").length === 24, "the 23 later party-leader steps plus the Chapter 0 setup are not all badged");
  assert([...document.querySelectorAll("#route .leader-badge")].some(badge => badge.textContent.includes("DUNBAN → SHULK")), "Stunted Growth does not show its two-leader handoff");
  assert(document.querySelectorAll("#route .deadline-badge").length > 100, "missable/lockout badges are not visible throughout the route");
  assert(document.querySelectorAll("#route .route-build").length === 9, "route build updates did not render at all nine progression milestones");
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

  const worldCheck = document.querySelector("#route input[data-world-id]");
  worldCheck.checked = true;
  worldCheck.dispatchEvent(new Event("change", { bubbles: true }));
  saved = JSON.parse(localStorage.getItem("xc1de-guide-state-v4"));
  assert(saved.world[worldCheck.dataset.worldId], "world discovery tick was not saved");

  const routeSearch = document.getElementById("q");
  routeSearch.value = "Bafalgar Tomb";
  routeSearch.dispatchEvent(new Event("input", { bubbles: true }));
  const bafalgar = [...document.querySelectorAll("#route .world-it")].find(row => row.textContent.includes("Bafalgar Tomb"));
  assert(bafalgar && !bafalgar.classList.contains("hide") && bafalgar.closest("section").style.display !== "none", "route search did not find a world discovery");
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

  document.querySelector('[data-p="quests"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const questSearch = document.getElementById("quest-q");
  questSearch.value = "Talia's Research";
  questSearch.dispatchEvent(new Event("input", { bubbles: true }));
  assert(document.querySelector("#quest-results .result-card")?.textContent.includes("Investigating Satorl"), "quest dependency lookup did not show the mutually exclusive branch");
  document.getElementById("quest-status").value = "branch";
  document.getElementById("quest-status").dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.querySelectorAll("#quest-results .result-card").length > 0, "quest branch filter returned nothing");

  document.querySelector('[data-p="combat"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  assert(document.querySelectorAll("#build-character-tabs .build-character-tab").length === 11, "Build Lab roster did not render 11 character tabs");
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

  document.querySelector('[data-p="reference"]').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await waitFor(() => document.querySelector("#reference-atlas img"), "offline map atlas render");
  assert(document.querySelectorAll("#reference-atlas .frontier-tiles img").length === 4, "interactive atlas did not render its four local map tiles");
  assert(document.querySelectorAll("#reference-atlas .frontier-pin").length > 0, "interactive atlas did not render exact source pins");
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

  const mobileSection = document.getElementById("mobile-section");
  mobileSection.value = "bosses";
  mobileSection.dispatchEvent(new Event("change", { bubbles: true }));
  assert(document.getElementById("p-bosses").classList.contains("on") && mobileSection.value === "bosses", "mobile More navigation did not activate the selected section");
  assert(document.querySelector("#p-bosses .guide-feature img")?.getAttribute("src") === "assets/game-icons/superboss-abaasy.png", "Superboss guide panel is missing its sourced in-game image");

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
  console.log("OK: v1/v2 migration, route/world render, searches, Monsterpedia ledger and hunt filters, builds, presets, reset and restore interactions.");
})().catch(error => { console.error(error.stack || error); process.exit(1); });
