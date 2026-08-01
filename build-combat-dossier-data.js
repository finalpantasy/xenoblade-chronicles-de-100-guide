// Builds source-backed combat records for every base-game Unique Monster and
// boss in the offline Monsterpedia. Strategy overlays stay curated; mechanical
// stats, arts, spikes and resistances come directly from cited enemy pages.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const MONSTERS = path.join(ROOT, "data", "monsterpedia-data.js");
const OUT = path.join(ROOT, "data", "combat-dossier-data.js");
const BUILD_STAMP = "source-snapshot";
const CURATED = Object.freeze({
  "Final Marcus": { preset:"main-superboss-safe", gems:["Spike Defence", "Agility Up", "Night Vision if accuracy is low"], watch:["Aura damage spike", "Can be dazed; use this as the first endgame accuracy check."], route:"First superboss: defeat before farming the harder four." },
  "Ancient Daedala": { preset:"main-superboss-safe", gems:["Spike Defence", "Night Vision", "Agility Up"], watch:["Aura damage spike", "Farm Rank V Night Vision cylinders before the Lv114/Lv120 fights."], route:"Second superboss; this farm unlocks the practical Abaasy preparation path." },
  "Despotic Arsene": { preset:"main-superboss-safe", gems:["Agility Up", "Night Vision", "Physical defence / evasion plan"], watch:["Pure physical damage", "Fast attacks", "Half-duration Topple; no spike requirement documented."], route:"Third superboss after the Daedala Night Vision farm." },
  "Blizzard Belgazas": { preset:"main-topple-lock", gems:["Night Vision", "Topple Plus", "Agility Up"], watch:["No topple resistance", "Topple-lock is the intended kill plan."], route:"Fourth superboss; use the topple-lock preset once accuracy is solved." },
  "Avalanche Abaasy": { preset:"main-superboss-safe", gems:["Max Night Vision", "Spike Defence", "Debuff Resist or Divine Protect", "Rank VI Topple Plus", "Agility Up"], watch:["Instant-death counter spike", "Night + blizzard spawn", "Max Monado Armour is mandatory defensive value."], route:"Final Lv120 target; do not pull until the Daedala farm and gem plan are finished." }
});

function loadMonsters() {
  const context = {};
  vm.runInNewContext(fs.readFileSync(MONSTERS, "utf8").replace("const MONSTERPEDIA_DATA", "MONSTERPEDIA_DATA"), context);
  return context.MONSTERPEDIA_DATA.entries.filter(entry => entry.game === "base" && (entry.unique || entry.boss));
}
function clean(value) {
  return String(value || "").replace(/<!--.*?-->/gs, "")
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1")
    .replace(/\{\{lang\|[^|}]+\|([^}]+)\}\}/g, "$1")
    .replace(/<br\s*\/?\s*>/gi, "; ").replace(/''+/g, "")
    .replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
function templates(wikitext, name) {
  const out = []; const needle = `{{${name}`; let start = 0;
  while ((start = wikitext.indexOf(needle, start)) >= 0) {
    let depth = 0, end = start;
    for (; end < wikitext.length - 1; end++) {
      const pair = wikitext.slice(end, end + 2);
      if (pair === "{{") { depth++; end++; }
      else if (pair === "}}") { depth--; end++; if (!depth) break; }
    }
    out.push(wikitext.slice(start, end + 1)); start = end + 1;
  }
  return out;
}
function params(template) {
  const out = {};
  for (const line of template.split("\n")) {
    const match = line.match(/^\|\s*([^=]+?)\s*=\s*(.*)$/);
    if (match) out[match[1].trim()] = clean(match[2]);
  }
  return out;
}
function parseStats(template) {
  if (!template) return null; const p = params(template);
  return { hp:p.HP||"", attack:p.atk||"", ether:p.eth||"", agility:p.agl||"", doubleAttack:p.doub||"", critical:p.crit||"", physicalResistance:p.physres||"", etherResistance:p.ethres||"", orientation:p.ot||"" };
}
function parseArts(template) {
  if (!template) return []; const p = params(template), out = [];
  for (let i=1;i<=30;i++) if (p[`art${i}`]) out.push({ name:p[`art${i}`], type:p[`type${i}`]||"", strength:p[`strength${i}`]||"", hits:p[`hits${i}`]||"", range:p[`range${i}`]||"", effect:p[`effect${i}`]||"", knockback:p[`kb${i}`]||"", breakDamage:p[`bd${i}`]||"" });
  return out;
}
function parseSpike(template) { if (!template) return null; const p=params(template); return { type:p.type||"", range:p.range||"", damage:p.damage||"" }; }
function parseResistances(template) {
  if (!template) return null; const p=params(template);
  const keys={break:"brk",topple:"top",daze:"daze",sleep:"slp",lockOn:"lock",bind:"bind",paralysis:"para",slow:"slow",physicalDefDown:"def",etherDefDown:"ethdef",physicalAttackDown:"atk",etherAttackDown:"ethatk",agilityDown:"agl",auraSeal:"aura",artSeal:"art",instantDeath:"death"};
  return Object.fromEntries(Object.entries(keys).map(([label,key])=>[label,p[key]||""]));
}
function guidePrep(entry,variant){
  const physical=Number.parseFloat(variant.stats?.physicalResistance)||0,ether=Number.parseFloat(variant.stats?.etherResistance)||0,level=entry.levelMin||Number.parseInt(entry.level)||0;
  const etherPlan=physical>=40&&physical>ether+10,preset=etherPlan?"main-um-fast":"main-um-safe",party=etherPlan?"Melia / Dunban / Riki · control Melia":"Shulk / Dunban / Riki · control Shulk";
  const effects=variant.arts.map(art=>`${art.name}: ${art.effect||art.type}`).filter(text=>!/[: ]-$/.test(text)),gems=["Agility Up"];
  if(level>=75)gems.push("Night Vision when accuracy falls behind");
  if(variant.spike){if(/instant death/i.test(variant.spike.damage))gems.push("Debuff Resist or Divine Protect for instant-death spike");else gems.push("Spike Defence");}
  if(effects.some(effect=>/blaze|bleed|poison|paralysis|bind|sleep|slow|art seal|aura seal/i.test(effect)))gems.push("Debuff Resist");
  if(etherPlan)gems.push("Ether Up on Melia");
  const watch=effects.filter(effect=>!/[: ]-$/.test(effect)).slice(0,4);
  return{preset,party,gems:[...new Set(gems)],watch:watch.length?watch:["No special art effect is listed; manage aggro and the level gap."],route:etherPlan?"High physical resistance favors a controlled Melia ether plan; store elements and discharge into safe windows.":"Use the reliable vision-response party; Break → Topple only when the listed resistance allows it.",basis:"Rule-based guide advice derived from the cited level, resistances, arts and spike fields."};
}
async function fetchWikitext(entry) {
  const response = await fetch(entry.source.apiUrl, { headers:{"user-agent":"XCDE-Guide-combat-dossier-builder/1.0"} });
  if (!response.ok) throw new Error(`${entry.name}: HTTP ${response.status}`);
  const data = await response.json(); const wikitext=data.parse?.wikitext?.["*"];
  if (!wikitext) throw new Error(`${entry.name}: missing wikitext`); return wikitext;
}
async function mapLimit(values, limit, fn) { const results=new Array(values.length); let next=0; await Promise.all(Array.from({length:limit},async()=>{while(next<values.length){const i=next++;results[i]=await fn(values[i],i);}})); return results; }
async function main() {
  const entries=loadMonsters(); const pages=new Map();
  for (const entry of entries) { const key=entry.source.apiUrl; if(!pages.has(key)) pages.set(key,entry); }
  const fetched=new Map();
  console.log(`Fetching ${pages.size} cited enemy pages for ${entries.length} dossier records...`);
  await mapLimit([...pages.entries()],6,async([url,entry],i)=>{fetched.set(url,await fetchWikitext(entry)); if((i+1)%25===0) console.log(`${i+1}/${pages.size}`);});
  const records={};
  for (const entry of entries) {
    const wiki=fetched.get(entry.source.apiUrl); const statTemplates=templates(wiki,"Enemy stats"), artTemplates=templates(wiki,"Enemy arts"), spikeTemplates=templates(wiki,"Enemy spike"), resistanceTemplates=templates(wiki,"Enemy immunities");
    const variantCount=Math.max(1,statTemplates.length,artTemplates.length,resistanceTemplates.length);
    const variants=Array.from({length:variantCount},(_,i)=>({stats:parseStats(statTemplates[i]||statTemplates[0]),arts:parseArts(artTemplates[i]||artTemplates[0]),spike:parseSpike(spikeTemplates[i]||spikeTemplates[0]),resistances:parseResistances(resistanceTemplates[i]||resistanceTemplates[0])}));
    records[entry.id]={ name:entry.name, level:entry.level, area:entry.areaName, conditions:entry.conditions, source:{label:"Xenoblade Wiki enemy mechanics",url:entry.source.url,apiUrl:entry.source.apiUrl,confidence:"community-reference"}, variants,guidePrep:guidePrep(entry,variants[0]) };
  }
  const withArts=Object.values(records).filter(record=>record.variants.some(v=>v.arts.length)).length;
  const withStats=Object.values(records).filter(record=>record.variants.some(v=>v.stats)).length;
  const withSpike=Object.values(records).filter(record=>record.variants.some(v=>v.spike)).length;
  const data={version:2,generated:BUILD_STAMP,policy:"Mechanical fields are source-extracted. Strategy appears only in curated overlays and remains labeled as guide advice.",counts:{records:Object.keys(records).length,withStats,withArts,withSpike},records,encounters:CURATED};
  if(withStats < Math.floor(entries.length*.9) || withArts < Math.floor(entries.length*.9)) throw new Error(`Coverage too low: stats ${withStats}/${entries.length}, arts ${withArts}/${entries.length}`);
  fs.writeFileSync(OUT,`// Generated by build-combat-dossier-data.js.\nconst COMBAT_DOSSIER_DATA=${JSON.stringify(data,null,2)};if(typeof window!=="undefined")window.COMBAT_DOSSIER_DATA=COMBAT_DOSSIER_DATA;\n`);
  console.log(JSON.stringify(data.counts,null,2));
}
main().catch(error=>{console.error(error.stack||error);process.exitCode=1;});
