// Historical filename retained so old maintenance notes still work.
//
// This script no longer renumbers route IDs. Progress is keyed by these IDs in
// localStorage, so positional renumbering silently attaches saved ticks to the
// wrong tasks. It now validates stability instead.
//
//   node normalize-ids.js                  # validate current IDs
//   node normalize-ids.js --write-manifest # explicitly accept current IDs
//
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BUILD_STAMP = "source-snapshot";

const root = __dirname;
const routeFile = path.join(root, "data", "route-data.js");
const manifestFile = path.join(root, "data", "route-id-manifest.json");

const context = {};
vm.createContext(context);
vm.runInContext(fs.readFileSync(routeFile, "utf8").replace("const ROUTE", "ROUTE"), context);

const ids = [];
let panels = 0;
for (const chapter of context.ROUTE) {
  for (const item of chapter.items) {
    if (item.k) { panels++; continue; }
    if (!item.id) throw new Error(`Tickable item without an ID in ${chapter.id}: ${item.t}`);
    ids.push(item.id);
  }
}

const seen = new Set(), duplicates = [];
for (const id of ids) { if (seen.has(id)) duplicates.push(id); seen.add(id); }
const malformed = ids.filter(id => !/^[a-z0-9][a-z0-9-]*$/.test(id));
if (duplicates.length || malformed.length) {
  console.error("FAILED", { duplicates, malformed });
  process.exit(1);
}

if (process.argv.includes("--write-manifest")) {
  const manifest = {
    warning: "Route IDs are persistent progress keys. Never rename or reuse an existing ID.",
    updated: BUILD_STAMP,
    ids
  };
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`Accepted ${ids.length} stable route IDs in ${path.relative(root, manifestFile)}.`);
  process.exit(0);
}

if (!fs.existsSync(manifestFile)) {
  console.error("No route ID manifest exists. Review the IDs, then run with --write-manifest once.");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
const current = new Set(ids);
const missing = manifest.ids.filter(id => !current.has(id));
const added = ids.filter(id => !manifest.ids.includes(id));
if (missing.length) {
  console.error("FAILED: persisted route IDs were renamed or removed. This can corrupt saved progress.");
  console.error(missing);
  process.exit(1);
}
console.log(`OK: ${ids.length} stable route IDs, ${panels} guidance panels, 0 duplicates.`);
if (added.length) console.log(`New IDs not yet in the manifest (${added.length}):`, added.join(", "));
