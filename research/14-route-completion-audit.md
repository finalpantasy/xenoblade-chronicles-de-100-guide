# Route to Completion Hub audit (read-only)

Audited 2026-08-01 against the current route (417 tickable cards), Completion
Hub (1,053 items), World/Map tracker, Collectopaedia tracker, and Monsterpedia.
No shared source or generated data was edited.

## Outcome

There is no confirmed P0 route-card ordering failure in the current
human-readable route. The known hard cutoffs appear before relevant story
transitions, and the static validator passes. But the project cannot
mechanically prove every Completion Hub item has exactly one feasible route
position: batch cards are intentional, but no completion-to-route foreign key
exists. Two display-name mismatches also break exact Unique Monster joins.

## Findings

| Severity | Exact record / route location | Finding and impact |
| --- | --- | --- |
| P1 | Completion UM / `c1-09` | Completion calls it `Iternant Dorothea`; route and Monsterpedia use **Itinerant Dorothea**. Exact joins miss this correctly routed Lv6 UM. Correct or alias it. |
| P1 | Completion UM / `pg-05` | Completion calls it `Avalange Abaasy`; route and Monsterpedia use **Avalanche Abaasy**. The endgame card is ordered correctly, but title-keyed joins cannot reliably resolve it. Correct or alias it. |
| P1 | All Completion categories ↔ `ROUTE` | No `completionItemId -> routeItemId` binding exists. Title comparison cannot prove coverage because batch cards intentionally cover many targets. Add `{ targetId, routeItemId, routeChapterId, handling }` and assert timed targets occur before deadlines. |
| P1 | `quest-colony-6-cook-off-showdown-2644f7b8` / `quest-colony-6-cook-off-final-blow-2fed8c3a`; route `c10-46` | Current dependency data contains an impossible positive prerequisite cycle between these Cook-Off records. The human card is not itself proven wrong, but graph-based feasibility claims are invalid until quest direction is re-sourced. |
| P1 | `quest-eryth-sea-investigating-satorl-968ac172` | Raw condition says `Talia's Research not completed`, but the graph includes positive prerequisite `quest-alcamoth-talia-s-research-d77fade7`. This must be an exclusion/branch rule, not a required predecessor. |
| P2 | 63 Heart-to-Hearts / `pg-06` | The final 15 Pink scenes are one tickable aggregate, while the Completion Hub tracks all 63 independently. No scene is shown missing, but route progress cannot identify which of those 15 remains. |
| P2 | 461 map discoveries / `ROUTE` | Each discovery has `routeChapterId`, but route text does not enumerate each landmark/location/secret area. Fine for a separate tracker, not a route-level proof. Add individual or map-sweep bindings. |
| P2 | 300 Collectopaedia items | Route page sweeps are scheduled, including hard deadlines at `c11-10`, `c13-05`, `c14-21`, and `c14-25`; detailed item tracking is separate. No concrete page omission found, but bind pages/items before claiming every item route-covered. |

## Confirmed sequencing safeguards

| Completion concern | Route anchor(s) | Result |
| --- | --- | --- |
| Refugee Camp timing, early quest UMs, camp Collectopaedia | `c4-06`…`c4-31`, then `c5-13` | Correctly before relocation; green Heart-to-Hearts are represented at `c4-30` and `c5-13`. |
| Ether Mine late content | `c17-01`…`c17-04` | Late Tephra Cave content is deferred rather than required on opening visit. |
| Sword Valley / Galahad closure | `c11-01`…`c11-10` | 11 UMs, four quests, two pages, and materials are before Jade Face. |
| Mechonis Field, Agniratha, Central Factory | `c14-01`…`c14-27`, `c15-01`…`c15-08`, `c16-01`…`c16-04` | Cutoff and Central Factory second window are separated; surprise-quest loss is stated. |
| High Entia Tomb endgame UM | `pg-08` | Furious Jozan is held until the High Entia Emblem requirement. |
| Superbosses, affinity, skill links, Grand Prix | `pg-01`…`pg-13` | Superbosses precede Love Source affinity cleanup; `pg-12` calls out 157 UM coins and `pg-13` all 70 Grand Prix clears. |
| Colony 6 endgame | `pg-09`…`pg-11` | Housing 5 precedes the other completion tiers/resident gates. |
| Future Connected | `fc-01`…`fc-06` | Ponspectors precede the 20-UM/Fogbeast sweep and Fog King. |

## Coverage facts and verification limits

- Static validator passed: 417 route tasks, 119 panels, and 1,053 Completion
  Hub items. Scope includes 480 quests, 200 achievements, 157 base-game UMs,
  63 Heart-to-Hearts, 70 Grand Prix entries, 76 milestones, and 7 FC goals.
- Map tracker has 461 discoveries including 19 secret areas; Collectopaedia has
  300 entries across 21 pages.
- Browser runtime test was not run: `test-guide-runtime.js` cannot load because
  local dependency `jsdom` is absent. This is an environment gap, not a route
  content finding.

## Required proof layer

Add a generated, reviewable binding table:

```js
{ targetId, targetType, routeItemId, routeChapterId,
  handling: "exact" | "batch" | "post" | "fc" | "not-routeable",
  deadlineChapterId: null, rationale: "" }
```

Validate unique target ownership; no timed target after its deadline; no
positive prerequisite cycle; one branch choice per branch group; and canonical
name/alias resolution before joining Monsterpedia and Completion Hub records.

## Sources

- [XCDE 100% Completionist Checklist](https://docs.google.com/spreadsheets/d/1glad9ZiT9Ze42KWdVH-OvNh5KAGJIBv4zlJydWdi6dc/edit?usp=sharing) — quest outcomes and timed flags.
- [Xenoblade Wiki: Unique Monster (XC1)](https://xenoblade.fandom.com/wiki/Unique_Monster_(XC1)) — 157 base-game UM scope and spawn conditions.
- [Xenoblade Wiki: XC Secret Areas](https://xenoblade.fandom.com/wiki/Category:XC_Secret_Areas) — secret-area classification.
- [Game8 XCDE map index](https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/290827) — map/landmark tables.
- [RPG Site missables checklist](https://www.rpgsite.net/feature/9775-xenoblade-chronicles-missables-list-dont-miss-a-thing-with-our-checklist) — relocation and late-story missable context.
- [Stargleam NPC Affinity Link Guide](https://gamefaqs.gamespot.com/wii/960564-xenoblade-chronicles/faqs/73533) — NPC, choice, and affinity ordering context.
