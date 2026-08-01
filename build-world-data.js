// Builds the offline world explorer and quest-dependency lookup.  No runtime
// network access is used; refresh intentionally with `node build-world-data.js`.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SHEET_ID = "1glad9ZiT9Ze42KWdVH-OvNh5KAGJIBv4zlJydWdi6dc";
const CHECKLIST_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`;
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;
const BUILD_STAMP = "source-snapshot";
const GAME8 = "https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/";
const QUEST_AREAS = ["Colony 9", "Tephra Cave", "Bionis' Leg", "Colony 6", "Satorl Marsh", "Makna Forest", "Frontier Village", "Eryth Sea", "Alcamoth", "Valak Mountain", "Sword Valley +", "Fallen Arm", "Mechonis Field", "Central Factory", "Agniratha"];
const MAPS = [
  ["Colony 9", 290818, 1], ["Tephra Cave", 290821, 1], ["Bionis' Leg", 291399, 4], ["Colony 6", 291400, 5],
  ["Ether Mine", 291404, 5], ["Satorl Marsh", 291410, 6], ["Makna Forest", 290815, 7], ["Frontier Village", 291412, 7],
  ["Eryth Sea", 291413, 8], ["Alcamoth", 291414, 8], ["High Entia Tomb", 291427, 8],
  ["Prison Island", 291433, 9, "before the Mechonis Core story transition (Chapter 15)"], ["Valak Mountain", 291434, 10],
  ["Sword Valley", 291436, 11, "before defeating Jade Face in Mechonis Field (Chapter 13)"], ["Galahad Fortress", 291437, 11, "before defeating Jade Face in Mechonis Field (Chapter 13)"],
  ["Fallen Arm", 291439, 12], ["Mechonis Field", 291440, 13, "before the Meyneth Shrine events in Chapter 14"],
  ["Central Factory", 291442, 14, "before finishing the Chapter 16 revisit"], ["Agniratha", 291444, 14, "before the Meyneth Shrine events in Chapter 14"],
  ["Bionis' Interior", 291446, 17]
];
// Game8 labels secret areas in prose rather than a consistently separate table.
// The XC Secret Areas category is the classification authority; map pages remain
// the source for normal landmark/location enumeration.
const SECRET_SOURCE = "https://xenoblade.fandom.com/wiki/Category:XC_Secret_Areas";
const SECRET_AREAS = new Map([
  ["Tephra Cave", new Set(["Bafalgar Tomb", "Heavenly Window"])],
  ["Bionis' Leg", new Set(["Believer's Paradise"])], ["Ether Mine", new Set(["Glowmoss Lake"])],
  ["Satorl Marsh", new Set(["Shining Pond"])], ["Makna Forest", new Set(["Divine Sanctuary", "King Agni's Tomb", "Seahorse Islet", "Sparkling Pool"])],
  ["Eryth Sea", new Set(["Faras Cave"])], ["Valak Mountain", new Set(["Three Sage Summit"])],
  ["Sword Valley", new Set(["Monado Wound"])], ["Fallen Arm", new Set(["Distant Fingertip"])],
  ["Mechonis Field", new Set(["Great Battle Scar", "Machina Refuge"])], ["Central Factory", new Set(["Observation Platform"])],
  ["Agniratha", new Set(["Seven Sage Cloister"])], ["Bionis' Shoulder", new Set(["Cloudtop Lookout", "Eternal Zenith"])]
]);
// The upper Tephra Cave route opens only after the Mechonis Core events. Keep
// those discoveries out of the opening chapter checklist so they appear when
// the player can actually reach them.
const ROUTE_OVERRIDES = new Map([
  ["Tephra Cave", new Map([
    ["Heavenly Window", "ch17"],
    ["Bafalgar Tomb", "ch17"],
    ["Trader's Stopover", "ch17"],
    ["Arachno Feeding Lair", "ch17"],
    ["Path of Absolution", "ch17"]
  ])]
]);
const FC = {
  area: "Bionis' Shoulder", chapter: "Future Connected", source: "https://www.gamerguides.com/xenoblade-chronicles-definitive-edition/guide/future-connected/tour-guide/bionis-shoulder",
  landmarks: ["Junks", "Navvir Crossroads", "Companions' Cape", "Nerthis Necropolis Gate", "Zephyr's Counsel", "Barouh Plaza", "Pillar Knoll", "Soltnar Seal Island", "Thulles Way", "Xen's Thoroughfare", "Skybridge", "Abaasy's Dorsum", "Old King's Testament", "Gran Dell Ramparts", "Agni's Birthplace", "Gran Dell Approach", "Grand Arch", "Prayer Rock", "Scapular Lance", "Old Expedition HQ", "Quarry Colonnade", "Marga's Weeping", "Eternal Zenith", "Cloudtop Lookout"],
  locations: ["Agni's Skygarden Ruins", "Barouh Ruins Cave", "Cinnabar Plateau", "Clear Sky Bluff", "Companions' Forum", "Cragmaw Caverns", "Forbidden Hushland", "Fyme Lane", "Gamaro Hollow", "Gran Dell", "Halcyon Wheats", "Heroes' Rest", "Lamentation Ridge", "Navvir Highland", "Nerthis Necropolis", "Purifying Falls", "Shoulderstone Scree", "Teelan's Laboratory", "Tranquil Tarn", "Whisperwind Crossing", "Zekr Marga Quarry"]
};
const BRANCHES = [["A Little Brother's Fight", "A Big Brother's Fight"], ["Romantic Notions of a Girl", "Romantic Notions of a Boy"], ["Spirits Raised", "Imaginations Tempered"], ["The Road Home", "To Colony 6!"], ["Miss Sweetness Showdown (Berryjammy)", "Miss Sweetness Showdown (Ma'crish)"], ["Miss Sweetness' Gratitude (Berryjammy)", "Miss Sweetness' Gratitude (Ma'crish)"], ["The Melody of Happiness", "Dream of a Poet"], ["Medical Advancements", "Let's Make Fillings!"], ["Talia's Research", "Investigating Satorl"], ["Together Forever", "I Love You No Matter What"], ["Adventurers in Peril", "The Missing Partner"]];
const FOLLOW_UPS = [["The Broken Watch", "Désirée's Future"], ["In Pursuit of Love", "The Melody of Happiness"], ["In Pursuit of Love", "Dream of a Poet"], ["Cook-Off Counter Attack!", "Cook-Off Comeback?"], ["Cook-Off Comeback?", "Cook-Off Final Blow?!"], ["Cook-Off Final Blow?!", "Cook-Off Showdown!"], ["Cursed Berryjammy", "Weak Berryjammy"], ["Weak Berryjammy", "Obstinate Berryjammy"], ["Obstinate Berryjammy", "Unstoppable Berryjammy"]];

function slug(v) { return String(v).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "item"; }
function id(kind, area, name, extra = "") { return `${kind}-${slug(area)}-${slug(name)}-${crypto.createHash("sha1").update([kind, area, name, extra].join("\u001f")).digest("hex").slice(0, 8)}`; }
function clean(s) { return s.replace(/<[^>]*>/g, " ").replace(/&(?:amp|#38);/g, "&").replace(/&#(?:39|x27);/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(); }
function csv(text) { let r=[], row=[], f="", q=false; for(let i=0;i<text.length;i++){let c=text[i];if(q){if(c==='"'&&text[i+1]==='"'){f+='"';i++;}else if(c==='"')q=false;else f+=c;}else if(c==='"')q=true;else if(c===','){row.push(f);f="";}else if(c==='\n'){row.push(f.replace(/\r$/, ""));r.push(row);row=[];f="";}else f+=c;} if(f||row.length){row.push(f.replace(/\r$/, ""));r.push(row);} let h=r.shift().map(x=>x.trim()); return r.map(x=>Object.fromEntries(h.map((k,i)=>[k,(x[i]||"").trim()]))); }
async function get(url) { const r=await fetch(url,{headers:{"user-agent":"XCDE-offline-guide-builder/1.0"}}); if(!r.ok)throw new Error(`${url}: HTTP ${r.status}`); return r.text(); }
function tableAfter(html, heading) { const escaped=heading.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/'/g,"(?:'|&#39;)?"); const m=new RegExp(`<h3[^>]*>${escaped}<\\/h3>`,"i").exec(html); if(!m) throw new Error(`Map page lacks ${heading}`); const p=m.index; let t=html.indexOf("<table",p), end=html.indexOf("</table>",t); if(t<0||end<0)throw new Error(`Map page has no ${heading} table`); if(/<img\b/i.test(html.slice(t,end))){ t=html.indexOf("<table",end); end=html.indexOf("</table>",t); } return html.slice(t,end); }
function names(table) { return [...new Set([...table.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(x=>clean(x[1])).filter(n=>n&&!/^Image:/i.test(n)))]; }
async function mapArea([area, archive, chapter, deadline]) { const source=GAME8+archive, html=await get(source); const landmarks=names(tableAfter(html, `${area} Landmarks`)); const locations=names(tableAfter(html, `${area} Locations`)); const secrets=SECRET_AREAS.get(area)||new Set(), routeChapterId=`ch${chapter}`; const access=deadline ? `Complete before ${deadline}.` : "Available during its story visit; return later unless separately locked."; const found=new Map(); for(const [name, normalType] of [...landmarks.map(n=>[n,"landmark"]),...locations.map(n=>[n,"location"]),...secrets].map(x=>Array.isArray(x)?x:[x,"landmark"])){ const type=secrets.has(name)?"secret-area":normalType; const entryRouteChapterId=ROUTE_OVERRIDES.get(area)?.get(name)||routeChapterId; const entryChapter=entryRouteChapterId==="fc"?"Future Connected":Number(entryRouteChapterId.slice(2)); if(!found.has(name)||type==="secret-area") found.set(name,{id:id("world",area,name,type),name,type,accessNotes:type==="location"?"Map discovery entry.":"Skip Travel point once discovered.",recommendedChapter:entryChapter,routeChapterId:entryRouteChapterId,lockoutDeadline:deadline||null,source:type==="secret-area"?SECRET_SOURCE:source}); } return { id:slug(area), name:area, game:"base", recommendedChapter:chapter,routeChapterId,accessNotes:access,lockoutDeadline:deadline||null, source, entries:[...found.values()]}; }
function resolve(quests, title, area) { const matches=quests.filter(q=>q.name===title && (!area||q.area===area)); return matches.length===1?matches[0].id:null; }
function requirementReferences(quests, quest) {
  const positive = new Set(), excluded = new Set();
  const lines = String(quest.requirements || "").split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  for (const line of lines) {
    const lower = line.toLowerCase();
    const isNegative = /\bnot\s+(?:completed|accepted)\b/.test(lower);
    const statusMatch = line.match(/^(.*?)(?:\s+\([^)]*route\))?\s+(?:not\s+)?(?:completed|accepted)$/i);
    const rawTitle = (statusMatch ? statusMatch[1] : line).trim();
    let matches = quests.filter(candidate => candidate.id !== quest.id && candidate.name === rawTitle);
    if (!matches.length) matches = quests.filter(candidate => candidate.id !== quest.id && line.toLowerCase() === candidate.name.toLowerCase());
    if (matches.length > 1) {
      const sameArea = matches.filter(candidate => candidate.area === quest.area);
      matches = sameArea.length === 1 ? sameArea : [];
    }
    if (matches.length !== 1) continue;
    (isNegative ? excluded : positive).add(matches[0].id);
  }
  return { positive: [...positive], excluded: [...excluded] };
}
async function quests() { const rows=await Promise.all(QUEST_AREAS.map(async area=>[area,csv(await get(CSV_URL+encodeURIComponent(area)))])); const q=[]; for(const [area,rs] of rows) for(const r of rs) if(r["Quest Name"]) q.push({id:id("quest",area,r["Quest Name"],`${r["Quest Giver"]}|${r["Time and Location"]}`),name:r["Quest Name"],area,requirements:r.Requirements||"",timed:/^true$/i.test(r["Timed Quest?"]||""),source:CHECKLIST_URL,prerequisites:[],followUps:[],mutuallyExclusive:[]}); if(q.length!==480)throw new Error(`Expected 480 quests, got ${q.length}`);
  for(const x of q){ const refs=requirementReferences(q,x); x.prerequisites.push(...refs.positive); x.mutuallyExclusive.push(...refs.excluded); }
  for(const [a,b] of FOLLOW_UPS){const from=resolve(q,a),to=resolve(q,b); if(from&&to){q.find(x=>x.id===to).prerequisites.push(from);q.find(x=>x.id===from).followUps.push(to);}}
  for(const [a,b] of BRANCHES){const aa=q.filter(x=>x.name===a),bb=q.filter(x=>x.name===b); for(const x of aa)for(const y of bb)if(x.id!==y.id){x.mutuallyExclusive.push(y.id);y.mutuallyExclusive.push(x.id);}}
  for(const x of q){x.prerequisites=[...new Set(x.prerequisites)];x.followUps=[...new Set(x.followUps)];x.mutuallyExclusive=[...new Set(x.mutuallyExclusive)];} return q;
}
async function main(){ console.log("Downloading public map pages and checklist CSV..."); const areas=await Promise.all(MAPS.map(mapArea)); const fcSecrets=SECRET_AREAS.get(FC.area),fcEntries=new Map(); for(const [name,normalType] of [...FC.landmarks.map(n=>[n,"landmark"]),...FC.locations.map(n=>[n,"location"] )]){const type=fcSecrets.has(name)?"secret-area":normalType;if(!fcEntries.has(name)||type==="secret-area")fcEntries.set(name,{id:id("world",FC.area,name,type),name,type,accessNotes:type==="location"?"Map discovery entry.":"Skip Travel point once discovered.",recommendedChapter:FC.chapter,routeChapterId:"fc",lockoutDeadline:null,source:FC.source});} areas.push({id:"bionis-shoulder",name:FC.area,game:"future-connected",recommendedChapter:FC.chapter,routeChapterId:"fc",accessNotes:"Story-gated routes open progressively; Gran Dell access is needed for full map completion.",lockoutDeadline:null,source:FC.source,entries:[...fcEntries.values()]}); const questData=await quests(); const entries=areas.flatMap(x=>x.entries); if(new Set(entries.map(x=>x.id)).size!==entries.length)throw new Error("Duplicate world ids"); const data={version:2,generated:BUILD_STAMP,source:{checklist:{label:"XCDE 100% Completionist Checklist",url:CHECKLIST_URL},maps:{label:"Game8 XCDE maps",url:"https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/290827"},secretAreas:{label:"Xenoblade Wiki XC Secret Areas category",url:SECRET_SOURCE},futureConnected:{label:"Gamer Guides Bionis' Shoulder tour",url:FC.source}},areas,quests:questData,coverage:{areas:areas.length,worldEntries:entries.length,quests:questData.length,baseGameAreas:MAPS.length,futureConnectedAreas:1,baseGameSecretAreas:[...SECRET_AREAS.entries()].filter(([a])=>a!==FC.area).reduce((n,[,x])=>n+x.size,0),futureConnectedSecretAreas:fcSecrets.size}}; const out=`// Generated by build-world-data.js on ${data.generated}. Do not edit by hand.\nconst WORLD_DATA = ${JSON.stringify(data,null,2)};\n`; fs.writeFileSync(path.join(__dirname,"data","world-data.js"),out,"utf8"); console.log(`Wrote data/world-data.js: ${data.coverage.areas} areas, ${data.coverage.worldEntries} map entries, ${data.coverage.quests} quests.`); }
main().catch(e=>{console.error(e.stack||e);process.exit(1);});
