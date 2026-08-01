// Regenerates ROUTE.md from data/route-data.js so the two can never diverge.
// Run:  node build-route-md.js
const fs = require("fs");
const path = require("path");

const dir = __dirname;
eval(fs.readFileSync(path.join(dir, "data/route-data.js"), "utf8").replace("const ROUTE", "global.ROUTE"));

const FLAG = {
  d: "🔴", s: "🟡", h: "💜", m: "⛏️", u: "👾", g: "🏁", q: "📜", x: "⚪"
};
const KIND = {
  lvl: "📊 Set your level", build: "⚔️ Party & build", weather: "🌦️ Weather / time",
  grind: "⛏️ Grind stop", branch: "🔀 Branch choice", boss: "💀 Boss prep", info: "ℹ️ Note"
};

// Convert the inline HTML used by the web guide into plain Markdown.
function md(html) {
  if (!html) return "";
  return html
    .replace(/<span class=step>/g, "\n   - ")
    .replace(/<\/span>/g, "")
    .replace(/<br><br>/g, "\n\n   ")
    .replace(/<br>/g, "\n   ")
    .replace(/<\/?b>/g, "**")
    .replace(/<\/?i>/g, "*")
    .replace(/<code>/g, "`").replace(/<\/code>/g, "`")
    .replace(/<ul>|<\/ul>/g, "")
    .replace(/<li>/g, "\n   - ").replace(/<\/li>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/[ \t]+$/gm, "");
}

// Prose that is not per-item lives here so the generated file is a superset of the old
// hand-written ROUTE.md and nothing is lost when it is regenerated.
const PREAMBLE = `# Xenoblade Chronicles DE (Switch 2) — The 100% Route

> **Generated file — do not edit by hand.**
> Source of truth is \`data/route-data.js\`. Regenerate with \`node build-route-md.js\`.
> The interactive version with tick-boxes is \`index.html\`.

Profile: **fresh file, Expert Mode, cap at story level and bank the surplus, full spoilers, Shulk-controlled.**

🔴 hard deadline · 🟡 soft deadline · 💜 Heart-to-Heart · ⛏️ Colony 6 material · 👾 Unique Monster · 🏁 Grand Prix · 📜 quest · ⚪ safe

---

## Standing rules

Apply in every chapter. Not repeated below.

1. **Talk to every named NPC twice**, at different times of day, and again after finishing a batch of quests. This is the Affinity Chart engine.
2. **Never sell a collectable** without checking it against the Colony 6 bill of materials. Sell weapons and armour freely.
3. **Bank EXP.** Set your level to the chapter target and leave it. The bank is for the post-game.
4. **Register every collectable** to the Collectopaedia before selling duplicates.
5. **Kill every Unique Monster once, on sight.** First kill grants an Affinity Coin to all seven characters.

### The collectable farm loop — use this constantly

**Skip Travel resets every emptied Collection Point.** Empty the collection points in an area, Skip Travel to any landmark, come straight back, and they have refilled. Each point draws from a fixed pool, so each cycle re-rolls the rare slot.

Pick a landmark with several collection points within thirty seconds of it. That is your farm. Ten cycles takes about five minutes and beats wandering the map every time.

### Heart-to-Heart reality check

Party join order: Shulk/Reyn/Fiora Ch1 → **Sharla Ch4** → **Dunban permanent Ch5** → **Melia and Riki Ch7** → **Fiora returns Ch12**.

A pair cannot reach high affinity before they have been in the party together a long time. **Roughly 20 of the 63 are Pink-tier and cannot be done before the late game**, no matter how you route. That is the game, not a routing failure. Each one below is pinned to the earliest chapter it is actually achievable.

### Quest types — how they complete

**Generic quests** (Monster, Challenge, Material, Collection, Search) come from unnamed NPCs and **complete automatically in the field**. No walk back. A **Challenge** quest's whole objective is killing one named Unique Monster — the quest and the kill are the same action, and the monster will not be there until you take the quest.

**Named-NPC quests** are the opposite: you must return to the person who gave it.
`;

const APPENDIX = `
---

## Verification status

### Resolved

- ✅ **All 10 mutually exclusive quest pairs** have recommendations with reasons and reward numbers. See \`research/05-branch-decisions.md\`.
- ✅ **All 7 characters' hidden skill trees** mapped to their unlock quests. See \`COMBAT-AND-BUILDS.md\`.
- ✅ **Heart-to-Hearts are never missable.** All 63 pinned to chapters anyway.
- ✅ **Colony 6 cannot be soft-locked.** Every at-risk material has a recovery path.
- ✅ **The Refugee Camp is repopulated in Chapter 17**, so it is not permanently dead after Chapter 5.
- ✅ **Fallen Arm and Alcamoth both survive** their apparent lockouts. Quests and NPCs die; the areas do not.

### Still open, both routed defensively at zero cost

1. **Does \`World-Changing Whatchamajig\` expire with the Refugee Camp?** No source states either way. The route does it first thing in Chapter 4, so the answer does not matter.
2. **Do the Alcamoth Grand Prix courses survive Mechonis Core?** Menu access suggests yes, but unconfirmed. The route clears them before Chapter 15 anyway.

### Known coverage limits

- **Step-by-step density.** Chapters 0-2 carry full per-quest detail (pick up / do / turn in / pays / unlocks). The remaining chapters are still at summary density and are being expanded in play order.
- **Quest enumeration** is complete for every area carrying a deadline, plus Colony 9, Bionis' Leg, Eryth Sea, Frontier Village and Valak Mountain. Eight permanent-access areas are covered at block level. Nothing in them can be lost.
- **Source conflicts** are flagged inline where they exist rather than silently resolved.
`;

const out = [];
out.push(PREAMBLE);

let totalTicks = 0, totalPanels = 0;

for (const ch of ROUTE) {
  const ticks = ch.items.filter(i => !i.k);
  totalTicks += ticks.length;
  totalPanels += ch.items.length - ticks.length;

  out.push("---");
  out.push("");
  out.push(`## ${ch.title} — ${ch.subtitle}`);
  out.push("");
  out.push(`**Level ${ch.level}** · ${ticks.length} tracked items`);
  out.push("");
  if (ch.note) { out.push(`> ${md(ch.note).trim()}`); out.push(""); }

  let n = 0;
  for (const it of ch.items) {
    if (it.k) {
      out.push(`> **${KIND[it.k] || KIND.info}${it.t ? " — " + md(it.t).trim() : ""}**`);
      out.push(">");
      md(it.d).split("\n").forEach(l => out.push(`> ${l.trim()}`.trimEnd()));
      out.push("");
      continue;
    }
    n++;
    out.push(`${n}. ${FLAG[it.f] || "⚪"} ${md(it.t).trim()}`);
    if (it.d) md(it.d).split("\n").filter(l => l.trim()).forEach(l => out.push(l.replace(/^\s*/, "   ")));
    out.push("");
  }
}

out.push(APPENDIX);
out.push("");
out.push(`**Totals:** ${ROUTE.length} chapters · ${totalTicks} tracked items · ${totalPanels} inline guidance panels.`);
out.push("");

fs.writeFileSync(path.join(dir, "ROUTE.md"), out.join("\n"), "utf8");
console.log(`ROUTE.md written: ${ROUTE.length} chapters, ${totalTicks} items, ${totalPanels} panels.`);
