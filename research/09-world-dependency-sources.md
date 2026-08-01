# World tracker and quest dependencies: sources

Generated data lives in `data/world-data.js`; refresh it deliberately with:

```powershell
node build-world-data.js
```

## Primary sources

- [XCDE 100% Completionist Checklist](https://docs.google.com/spreadsheets/d/1glad9ZiT9Ze42KWdVH-OvNh5KAGJIBv4zlJydWdi6dc/edit?usp=sharing) supplies all 480 base-game quest outcomes, their requirement text, timed flag, giver and time/location fields.
- [Game8 XCDE map index](https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/290827) supplies the 20 base-game map pages. The generator reads each map's published landmark and location tables.
- [Gamer Guides: Bionis' Shoulder tour](https://www.gamerguides.com/xenoblade-chronicles-definitive-edition/guide/future-connected/tour-guide/bionis-shoulder) supplies Future Connected's Bionis' Shoulder landmarks, locations and its two secret areas.
- [Xenoblade Wiki: XC Secret Areas](https://xenoblade.fandom.com/wiki/Category:XC_Secret_Areas) is the explicit classification source for base-game secret areas. This prevents a normal landmark table from silently downgrading entries such as Believer's Paradise, Glowmoss Lake, Divine Sanctuary and Three Sage Summit.
- [Gamer Guides: Tephra Cave quests](https://www.gamerguides.com/xenoblade-chronicles-definitive-edition/guide/quests/tephra-cave/tephra-cave-quests) confirms that the high-level Tephra route, Bafalgar Tomb and Heavenly Window open after Mechonis Core. Those late discoveries are routed to `ch17`, not the opening visit.

## Dependency policy

`requirements` always retains the checklist's raw public text. `prerequisites` is only populated when that text contains the exact name of a unique quest outcome, plus a small, source-backed follow-up list for named chains. `mutuallyExclusive` contains the reliably documented branch pairs from the guide's branch research. No edge is inferred from proximity, area, giver, timing, or reward.

This means the lookup is deliberately conservative: game-state gates such as Area Affinity, story progress, party leader and NPC affinity remain raw requirements instead of pretending they are quest-to-quest edges. Game8 does not consistently expose a separate secret-area table, so every category-listed base-game secret area plus the two Future Connected secret areas is classified explicitly in the generator.

Each area and entry has a deterministic `routeChapterId` (`ch1` through `ch17` or `fc`) aligned to this guide's chapters, rather than blindly copying another guide's chapter numbers. Sealed maps carry their final safe deadline. Fallen Arm and Alcamoth map discoveries intentionally have no area lockout flag: their separately timed quests still warn in the Route, but the maps themselves remain revisit-able.
