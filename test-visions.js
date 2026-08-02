// Focused test for the Vision warning system.
// Pass an absolute jsdom module path when it is not installed in this folder:
//   node test-visions.js C:\temp\node_modules\jsdom
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
const waitFor = async (test, message, timeout = 8000) => {
  const start = Date.now();
  while (!test()) {
    if (Date.now() - start > timeout) throw new Error(`Timed out: ${message}`);
    await new Promise(r => setTimeout(r, 20));
  }
};

(async () => {
  const virtualConsole = new VirtualConsole();
  const dom = new JSDOM(html, {
    url: "https://guide.local/index.html",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(window) {
      window.confirm = () => true;
      window.scrollTo = () => {};
      window.HTMLElement.prototype.scrollIntoView = () => {};
      const appendChild = window.Node.prototype.appendChild;
      window.Node.prototype.appendChild = function(node) {
        const result = appendChild.call(this, node);
        if (node.tagName === "SCRIPT" && /\/data\/(?:world-route-anchors-(?:early|mid|late)|(route|completion|monsterpedia|world|build|route-bindings)-data)\.js/.test(node.src)) {
          window.setTimeout(() => node.onload?.(), 0);
        }
        return result;
      };
    }
  });
  const { window } = dom;
  await waitFor(() => window.document.querySelectorAll("#route section.ch").length === 20, "route render");
  const doc = window.document;
  const host = doc.getElementById("vision");

  check("overlay host exists", !!host);
  check("overlay starts hidden", host && host.hidden);
  check("no Vision ambush on a fresh file", host.hidden);

  // ROUTE is a top-level `const`, so it lives in the script scope, not on window.
  const route = window.eval("ROUTE");

  // Completing Chapter 0's two setup cards must not announce Xord five chapters
  // early, including when startup calls dashboard again with that saved state.
  const ch0 = route[0];
  ch0.items.filter(i => !i.k).forEach(i => {
    const cb = doc.getElementById(i.id);
    if (cb && !cb.checked) { cb.checked = true; cb.dispatchEvent(new window.Event("change", { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 100));
  check("no Vision after Chapter 0's two setup cards", host.hidden);
  window.dashboard();
  await new Promise(r => setTimeout(r, 100));
  check("no Vision when Chapter 0 progress is restored", host.hidden);

  // Beginning the actual lock chapter is the earliest useful warning moment.
  const firstLock = route.find(c => c.lock);
  const lockProgress = firstLock.items.find(i => !i.k && i.f !== "d") || firstLock.items.find(i => !i.k);
  const lockCheckbox = doc.getElementById(lockProgress.id);
  lockCheckbox.checked = true;
  lockCheckbox.dispatchEvent(new window.Event("change", { bubbles: true }));
  await new Promise(r => setTimeout(r, 100));
  const fired = !host.hidden;
  check("fires after the actual lock chapter begins with deadlines ahead", fired);

  if (fired) {
    const text = host.textContent;
    check("names the point of no return", /Ether Mine|Xord|Refugee Camp|Road Home/i.test(text), text.slice(0, 80));
    check("states a loss count", /\d+\s*deadline item/i.test(text));
    check("itemises the loss", host.querySelectorAll(".vision-losses li").length > 0,
      `${host.querySelectorAll(".vision-losses li").length} rows`);
    check("alertdialog semantics", !!host.querySelector('[role="alertdialog"][aria-modal="true"]'));
    check("is labelled and described", !!host.querySelector("#vision-title") && !!host.querySelector("#vision-body"));
    check("offers both actions", !!doc.getElementById("vision-show") && !!doc.getElementById("vision-dismiss"));
    check("locks background scroll", doc.documentElement.classList.contains("vision-active"));
    check("focus moved into the dialog", doc.activeElement === doc.getElementById("vision-show"));

    const lockId = route.find(c => c.lock).id;
    doc.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await new Promise(r => setTimeout(r, 80));
    check("Escape closes it", host.hidden);
    check("scroll lock released", !doc.documentElement.classList.contains("vision-active"));
    const ack = JSON.parse(window.localStorage.getItem("xc1de-visions-acknowledged") || "{}");
    check("Escape does not permanently silence it", !ack[lockId]);

    window.dashboard();
    await new Promise(r => setTimeout(r, 80));
    check("does not nag twice in one session", host.hidden);

    window.localStorage.setItem("xc1de-visions-acknowledged", JSON.stringify({ [lockId]: true }));
    doc.getElementById("reset").dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    check("reset clears acknowledged Visions for a new playthrough", !window.localStorage.getItem("xc1de-visions-acknowledged"));
    check("reset clears the in-session Vision suppression map", !window.eval(`visionShownThisSession[${JSON.stringify(lockId)}]`));
  }

  console.log(failures ? `\nFAILED: ${failures}` : "\nOK: Visions fire accurately, are accessible, dismissible and non-nagging.");
  window.close();
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error("harness error:", e.message); process.exit(1); });
