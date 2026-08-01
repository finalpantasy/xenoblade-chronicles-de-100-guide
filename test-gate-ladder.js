// Focused test for the Area Affinity gate ladder.
//   node test-gate-ladder.js C:\temp\node_modules\jsdom
const fs = require("fs");
const path = require("path");
const jsdomPath = process.argv[2] || "jsdom";
const { JSDOM, VirtualConsole } = require(jsdomPath);

const root = __dirname;
const dataFiles = ["route-data.js", "completion-data.js", "monsterpedia-data.js", "world-data.js", "world-route-anchors-early.js", "world-route-anchors-mid.js", "world-route-anchors-late.js", "build-data.js", "collectopaedia-data.js", "map-atlas-data.js", "map-coordinates-data.js", "frontier-map-data.js", "affinity-data.js", "route-bindings-data.js"];
const injectedData = dataFiles.map(f => `<script>${fs.readFileSync(path.join(root, "data", f), "utf8")}</script>`).join("");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8").replace("</head>", `${injectedData}</head>`);

let failures = 0;
const check = (name, cond, extra = "") => {
  if (cond) console.log(`  ok   ${name}`);
  else { failures++; console.log(`  FAIL ${name}${extra ? " — " + extra : ""}`); }
};
const waitFor = async (test, message, timeout = 10000) => {
  const start = Date.now();
  while (!test()) {
    if (Date.now() - start > timeout) throw new Error(`Timed out: ${message}`);
    await new Promise(r => setTimeout(r, 20));
  }
};

(async () => {
  const dom = new JSDOM(html, {
    url: "https://guide.local/index.html",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: new VirtualConsole(),
    beforeParse(window) {
      window.confirm = () => true;
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      const appendChild = window.Node.prototype.appendChild;
      window.Node.prototype.appendChild = function(node) {
        const result = appendChild.call(this, node);
        if (node.tagName === "SCRIPT" && /\/data\/[a-z-]+\.js/.test(node.src)) window.setTimeout(() => node.onload?.(), 0);
        return result;
      };
    }
  });
  const { window } = dom;
  const doc = window.document;
  await waitFor(() => doc.querySelectorAll("#route section.ch").length === 20, "route render");

  // Open the Reference tab, then the Affinity Planner view.
  doc.getElementById("tab-reference")?.click();
  doc.querySelector('[data-reference-view="affinity"]')?.click();
  await waitFor(() => doc.getElementById("affinity-gates"), "gate ladder render");

  const gates = doc.getElementById("affinity-gates");
  const AFF = window.eval("AFFINITY_DATA");
  const route = window.eval("ROUTE");

  const areas = [...gates.querySelectorAll(".gate-area")];
  const chips = [...gates.querySelectorAll(".gate-q")];
  const expectedAreas = new Set(AFF.quests.filter(q => q.star).map(q => q.area));
  const expectedGated = AFF.quests.filter(q => q.star).length;

  check("renders one block per gated area", areas.length === expectedAreas.size, `${areas.length} vs ${expectedAreas.size}`);
  check("shows every gated quest, none truncated", chips.length === expectedGated, `${chips.length} vs ${expectedGated}`);

  // Star tiers must run low to high inside each area, with fractions ordered correctly.
  const val = s => (parseInt(s, 10) || 0) + ({ "¼": .25, "½": .5, "¾": .75 }[s.slice(-1)] || 0);
  const ordered = areas.every(a => {
    const tiers = [...a.querySelectorAll(".gate-tier-head b")].map(b => val(b.textContent.replace("☆", "")));
    return tiers.every((v, i) => i === 0 || v > tiers[i - 1]);
  });
  check("orders star tiers numerically, fractions included", ordered);

  const colony9 = areas.find(a => a.querySelector("summary b").textContent === "Colony 9");
  check("Colony 9 ladder starts at its lowest gate",
    colony9?.querySelector(".gate-tier-head b").textContent === "☆1¼",
    colony9?.querySelector(".gate-tier-head b").textContent);

  // Every chip is one of the three declared states, and states are labelled in text.
  check("every quest carries a state", chips.every(c => /is-(done|open|swept)/.test(c.className)));
  check("state is announced, not just coloured", chips.every(c => /ticked|still open|area sweep/.test(c.title)));

  const swept = chips.filter(c => c.classList.contains("is-swept"));
  check("area-sweep quests fall back to Quest Lookup", swept.every(c => c.hasAttribute("data-open-affinity-quest")));
  const routed = chips.filter(c => !c.classList.contains("is-swept"));
  check("routed quests jump to their route line", routed.every(c => c.hasAttribute("data-gate-route") && c.hasAttribute("data-gate-chapter")));
  check("routed quest ids are real route ids", routed.every(c => {
    const id = c.dataset.gateRoute;
    return route.some(ch => ch.items.some(i => i.id === id));
  }));

  // No claim of an affinity total anywhere in the card.
  const cardText = doc.querySelector(".gate-card").textContent;
  check("makes no claim about current affinity",
    /reports what each gate opens/.test(cardText) && !/you (are|have) (at|reached) ☆/.test(cardText));

  // Ticking a gated quest's route item must move it from open to done.
  const target = routed.find(c => c.classList.contains("is-open"));
  check("some gated quest is still open on a fresh file", !!target);
  if (target) {
    const routeId = target.dataset.gateRoute, name = target.textContent;
    const cb = doc.getElementById(routeId);
    check("its route checkbox exists", !!cb, routeId);
    if (cb) {
      cb.checked = true; cb.dispatchEvent(new window.Event("change", { bubbles: true }));
      await new Promise(r => setTimeout(r, 120));
      const after = [...doc.querySelectorAll(`#affinity-gates .gate-q[data-gate-route="${routeId}"]`)];
      check("ticking the route line flips the chip to done",
        after.length > 0 && after.every(c => c.classList.contains("is-done")),
        after.map(c => c.className).join(" | "));
      check("the chip is still the same quest", after[0]?.textContent === name);
    }
  }

  // Area filter narrows the ladder.
  const select = doc.getElementById("affinity-area");
  select.value = "Colony 9";
  select.dispatchEvent(new window.Event("change", { bubbles: true }));
  await new Promise(r => setTimeout(r, 80));
  const filtered = [...gates.querySelectorAll(".gate-area")];
  check("Area filter narrows the ladder", filtered.length === 1 && filtered[0].querySelector("summary b").textContent === "Colony 9",
    filtered.map(a => a.querySelector("summary b").textContent).join(","));

  select.value = "";
  select.dispatchEvent(new window.Event("change", { bubbles: true }));
  await new Promise(r => setTimeout(r, 80));
  check("clearing the filter restores every area", gates.querySelectorAll(".gate-area").length === expectedAreas.size);

  console.log(failures ? `\nFAILED: ${failures}` : "\nOK: gate ladder is complete, ordered, honest and live.");
  window.close();
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error("harness error:", e.message); process.exit(1); });
