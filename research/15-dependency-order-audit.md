# Dependency and chronology audit (read-only)

Audited 2026-08-01 against `data/route-data.js`, `data/completion-data.js`, and `data/world-data.js` (generated v2). No source or runtime file was changed.

## Result

The route is a strong **human-readable** chronology, but the current dependency graph is not yet safe to treat as an executable ordering proof. It preserves raw requirements for all 480 quest outcomes, but contains confirmed false-positive prerequisite edges, incomplete explicit branch coverage, and no stable completion-item-to-route-card mapping. Therefore the answer to “does every Completion Hub item have a feasible route position?” is **not mechanically verifiable yet**; it is not a verified yes.

## Dataset and route anchors

| Data key / route ID | Audited role | Result |
|---|---|---|
| `WORLD_DATA.quests` | 480 public-checklist outcomes | count is present; every item preserves `requirements`, `timed`, `prerequisites`, `followUps`, `mutuallyExclusive` |
| `WORLD_DATA.areas[*].routeChapterId` | area chronology (`ch1`–`ch17`, `fc`) | present on every world area/entry; sealed areas carry `lockoutDeadline` |
| `ROUTE` | ordered cards `ch0`…`ch17`, `post`, `fc` | 417 route cards; human-route source but no foreign keys to quest/completion IDs |
| `COMPLETION_DATA.categories` | Completion Hub | 480 quests, 200 achievements, 157 monsters, 63 Heart-to-Hearts, 70 Grand Prix, 76 milestones, 7 FC goals |

Fresh static comparison: 185 of 480 exact quest titles do not occur in rendered route-card text. This is not automatically a route failure—many are covered by generic batch cards—but it proves title search cannot establish a per-item route position. Examples include `quest-colony-9-education-minded-suzanna-*`, all individually named generic quest parts, `quest-tephra-cave-the-book-of-bafalgar-*`, and multiple Colony 6 outcome variants.

## Confirmed graph defects

### P0 — impossible Cook-Off cycle

| Record | Raw checklist requirement | Current edges | Why invalid |
|---|---|---|---|
| `quest-colony-6-cook-off-showdown-2644f7b8` | `Cook-Off Final Blow?!` | prerequisite `quest-colony-6-cook-off-final-blow-2fed8c3a` | this makes Showdown require Final Blow |
| `quest-colony-6-cook-off-final-blow-2fed8c3a` | `Cook-Off Comeback?` | prerequisite `quest-colony-6-cook-off-showdown-2644f7b8` from manual `FOLLOW_UPS` | this makes Final Blow require Showdown |

The resulting cycle makes both cards infeasible in a topological route. Existing route cards instead place `Cook-Off Showdown!` at `ROUTE[ch8].items[id="c8-…"]` and `Obstinate Berryjammy` at `ROUTE[ch10].items[id="c10-40"]`; this conflict must be resolved from a primary quest source before using graph edges. Do not infer a direction from the current manual chain.

### P0 — negation incorrectly becomes a positive prerequisite

`quest-eryth-sea-investigating-satorl-968ac172` contains raw requirement `Talia's Research not completed`. Its generated `prerequisites` includes `quest-alcamoth-talia-s-research-d77fade7`, while the reciprocal `mutuallyExclusive` link is also present. This is logically contradictory. Requirements containing `not completed`, `not accepted`, `or`, a choice route, or a plain NPC/event condition must remain `raw` unless a relation parser explicitly understands that operator.

Route policy is directionally correct: `Talia's Research` is placed at `ROUTE[ch8].items[id="c8-17"]`; `Investigating Satorl` is post-Core only. The graph must represent that as an exclusion, not a prerequisite.

### P1 — duplicate generic title resolution creates unrelated prerequisites

`quest-colony-9-a-young-captain-s-trust-a927076c` raw requirement is `A Young Captain's Challenge (B route) completed`. Its `prerequisites` currently contains the Colony 9 Challenge plus generic `Challenge` entries in Satorl Marsh, Makna Forest, and Eryth Sea:

- `quest-colony-9-a-young-captain-s-challenge-3b6e8a3c`
- `quest-satorl-marsh-challenge-123635e9`
- `quest-makna-forest-challenge-7ec939fe`
- `quest-eryth-sea-challenge-bb182f57`

Only the Colony 9 named chain can be a candidate. Exact-name scanning must require a unique canonical quest title or a scoped area/quest-giver disambiguator. The same audit rule applies to all generic `Challenge`, `Monster Quest`, `Material Quest`, `Collection Quest`, and `Search Quest` titles.

### P1 — explicit mutually-exclusive coverage is incomplete

The graph reports 16 directed branch edges = 8 paired choices, although research documents ten quest-choice families. Both checklist outcome IDs below have no `mutuallyExclusive` relation:

- `quest-colony-6-miss-sweetness-showdown-berryjammy-058f80d0`
- `quest-colony-6-miss-sweetness-showdown-ma-crish-91417867`

The generator's matching seed uses unqualified `Miss Sweetness Showdown`, but the source rows are parenthetically disambiguated. `Miss Sweetness' Gratitude (Berryjammy)` / `(Ma'crish)` should be audited as downstream alternatives as well, not assumed to be independently completable.

## Party-leader and NPC gates

The raw checklist correctly records leader gates, but they are not normalized as route constraints. The route does place the important checks, so these are feasible **only while players honour the cards**:

| Quest key | Required leader / condition | Route anchor |
|---|---|---|
| `quest-colony-9-paola-and-narine-18d94380` | Shulk | `ch8:c8-37` |
| `quest-colony-9-a-young-captain-s-revival-6417f76a`, `quest-colony-9-a-young-captain-s-trust-a927076c` | Shulk | `ch17:c17-07` (route card represents the choice result) |
| `quest-colony-9-friendship-tokens-f32a6115` | Reyn | `ch17:c17-09` |
| `quest-colony-9-desiree-s-future-f8d99dfa` | Shulk | `ch6:c6-35` |
| `quest-bionis-leg-battling-brutes-adab749b` | Fiora | `ch17:c17-02` / `ch17:c17-03` |
| `quest-colony-6-cook-off-showdown-2644f7b8` | Reyn | requires cycle repair before feasibility can be asserted |
| `quest-makna-forest-final-challenge-of-the-sage-3d8ee72d`, `quest-frontier-village-getting-bigger-f8926db1` | Riki | post-Core cards must retain leader condition |
| `quest-eryth-sea-trouble-at-the-lighthouse-de94d51f`, `quest-eryth-sea-ancient-high-entia-mystery-03d27957` | Melia | `ch8:c8-05` / `ch17:c17-31` |
| `quest-valak-mountain-the-balance-of-power-29a46cce` | Dunban | `ch10:c10-08` |
| `quest-fallen-arm-stunted-growth-2d12d5d5` | Dunban accepts; route policy says Shulk turns in | `ch17:c17-05` |
| `quest-fallen-arm-the-oath-sword-ed4e9dff` | Fiora | `ch12:c12-06`, `ch13:c13-15` |

NPC registration/affinity link gates are stored only as prose in `requirements` (for example `Paola registered…`, `Vronik registered…`, `Eleqa and Eiz affinity link yellow`). The route repeats some instructions, but neither data file exposes a resident/link ID that can be verified against the route. Stargleam’s guide is the appropriate source to normalize this layer; see `research/12-affinity-source-audit.md`.

## Area affinity, relocation, and lockout chronology

1. Area-star conditions are retained as raw strings throughout `WORLD_DATA.quests` (for example `Colony 9 area ☆4`, `Upper Bionis ☆2½`, `Hidden Village ☆3½`). The route offers ordering guidance, but no numeric affinity ledger/validator. Feasibility is therefore unproven for every star-gated quest.
2. Refugee relocation is correctly treated as a hard boundary by the route: `ROUTE[ch5].items[id="c5-13"]` / `ROUTE[ch6].items[id="c6-01"]` cover `The Road Home`; the mutually exclusive fallback is `quest-colony-6-to-colony-6-d46af1a9`. Clearing camp quests before relocation remains necessary.
3. Sealed-area records correctly expose deadlines in `WORLD_DATA.areas`: `sword-valley`, `galahad-fortress`, `fallen-arm`, `mechonis-field`, `central-factory`, `agniratha`, `alcamoth`, `prison-island`. However their entries are only area-tagged; there is no validator that every timed quest in those areas has a route card before its deadline.
4. The Mechonis Core cutoff is a real external constraint; use it as the final pre-Core audit boundary for Alcamoth/Agniratha quests, map entries, and Grand Prix handling.

## Required changes before claiming full feasibility

1. Add a route binding table keyed by `WORLD_DATA.quests[*].id` and `COMPLETION_DATA` item ID: `{ targetId, routeChapterId, routeItemId, handling: exact|batch|post|fc }`.
2. Replace current substring prerequisite generation with parsed operators: `completed`, `accepted`, `not completed`, `A or B`, `route A/B`, area/NPC/story gates. Reject ambiguous titles rather than emitting edges.
3. Topologically sort only positive `completed` dependencies; assert no cycles. Keep exclusion edges separate.
4. Add first-class `leaderId`, `areaAffinity`, `residentIds`, `linkRequirements`, `deadlineRouteChapterId`, and `branchGroupId` fields.
5. Assert every timed/lockout quest binding precedes its area deadline, and every Completion Hub item has exactly one binding or an explicit `not-routeable` rationale.

## Source URLs

- [XCDE 100% Completionist Checklist](https://docs.google.com/spreadsheets/d/1glad9ZiT9Ze42KWdVH-OvNh5KAGJIBv4zlJydWdi6dc/edit?usp=sharing) — quest requirements/outcomes.
- [Stargleam NPC Affinity Link Guide](https://gamefaqs.gamespot.com/wii/960564-xenoblade-chronicles/faqs/73533) — NPC links, timed talks, choices, route ordering.
- [Game8 missables](https://game8.co/games/Xenoblade-Chronicles-Definitive-Edition/archives/290848) — external confirmation that quests should be cleared before Mechonis Core.
- [RPG Site missables](https://www.rpgsite.net/feature/9775-xenoblade-chronicles-missables-list-dont-miss-a-thing-with-our-checklist) — Refugee relocation / Road Home cutoff context.
- [Gamer Guides: Colony 6 reconstruction](https://www.gamerguides.com/xenoblade-chronicles-definitive-edition/guide/quests/colony-6/colony-6-reconstruction) — either `The Road Home` or `To Colony 6!` begins reconstruction.
