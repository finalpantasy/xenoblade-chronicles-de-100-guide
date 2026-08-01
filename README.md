# Xenoblade Chronicles: Definitive Edition — 100% Guide

An unofficial, source-backed walkthrough, completion ledger, Monsterpedia, build lab, map planner, and second-screen Play Mode for *Xenoblade Chronicles: Definitive Edition*.

## What is included

- 878 ordered route and world-discovery checkpoints across the base game, post-game, and Future Connected
- clear missable, lockout, deadline, and required-party-leader warnings
- recommended level on every checkbox card
- 1,053-item Completion Hub, each bound to a route checkpoint
- 866-monster Monsterpedia with 12,582 confirmed drop rows and locally cached wiki portraits
- searchable quest prerequisites, follow-ups, mutually exclusive branches, and “why blocked” explanations
- character builds for player and AI control, Art and skill priorities, party presets, and durable “never-lose” progression teams
- interactive maps, Collectopaedia, affinity planning, Colony 6 planning, superboss dossiers, and weather notes
- Play Mode with next-step guidance, safe-to-advance checks, area briefings, a manual inventory planner, spoiler controls, and encounter mode
- three appearances: Readable Light, Simple Dark, and Xenoblade Extreme V2
- offline/PWA support plus progress export, import, reset backup, and restore

## Progress privacy

Checklist progress is stored with browser `localStorage`. GitHub receives no checklist data. Every visitor, browser profile, and device therefore starts with its own independent progress.

Progress does **not** automatically sync between browsers or devices. Use **Export progress** and **Import progress** to move or back up a run.

## Run locally

The guide can be opened directly as `index.html`, but a small local web server also enables its offline service worker:

```powershell
python -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

## Rebuild and verify

Generated datasets preserve their source URLs inside the resulting data files and/or the research notes.

```powershell
node build-world-data.js
node build-completion-data.js
node build-route-bindings.js
node build-route-md.js
node validate-guide.js
```

`node validate-guide.js` is dependency-free and is the check to run first. The three JSDOM suites
need `jsdom`:

```powershell
node test-guide-runtime.js C:\path\to\node_modules\jsdom
node test-visions.js C:\path\to\node_modules\jsdom
node test-gate-ladder.js C:\path\to\node_modules\jsdom
```

**`npm install` does not work when this folder lives on a synced Google Drive letter.** The Drive
filesystem does not support the file handles npm needs and the install dies with `EBADF`, leaving a
partial `node_modules` that looks installed but is not. Install the dev dependency somewhere on a
local disk and pass its path as the first argument, as above, or point `NODE_PATH` at it:

```powershell
$env:NODE_PATH = "C:\path\to\node_modules"; npm run qa
```

If a partial `node_modules` already exists here, delete it — it will shadow a working install.
`npm install` and `npm run qa` behave normally on any non-Drive checkout.

## Rights and attribution

This is a non-commercial, unofficial fan project. Xenoblade Chronicles, its names, game artwork, icons, maps, screenshots, and logos are property of Nintendo and MONOLITHSOFT. Those materials are not covered by the repository’s code license.

See [ATTRIBUTION.md](ATTRIBUTION.md) and [assets/game-icons/SOURCES.md](assets/game-icons/SOURCES.md) for dataset, wiki, map, image, and guide sources.
