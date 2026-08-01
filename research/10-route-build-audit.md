# Route and build guidance audit

Audit date: 2026-08-01  
Scope: `ROUTE.md`, `COMBAT-AND-BUILDS.md`, `data/route-data.js`, and the route-facing portions of `data/build-data.js`. This is an audit only; it does not change guide content.

## Method

- **High confidence**: direct quest/Art/system reference with a page describing the prerequisite, effect, or level.
- **Medium confidence**: two sources agree, but neither is first-party game data.
- **Editorial / unverified**: a sensible guide recommendation that is not a factual game claim. Keep it if it is intentional, but label it as a target rather than an exact game requirement.

Primary reference set used in this pass:

- [Xenoblade Wiki — Difficulty Levels](https://xenoblade.fandom.com/wiki/Difficulty_Levels) — Expert Mode, stored EXP, and each character's lowest selectable level.
- [Xenoblade Wiki — Xenoblade Chronicles plot](https://xenoblade.fandom.com/wiki/Xenoblade_Chronicles_%28plot%29) — Chapter 3 party/story sequence.
- [Xenoblade Wiki — The Road Home](https://xenoblade.fandom.com/wiki/The_Road_Home) and [Refugee Camp](https://xenoblade.fandom.com/wiki/Refugee_Camp) — relocation timing and scope.
- [Xenoblade Wiki — Stunted Growth](https://xenoblade.fandom.com/wiki/Stunted_Growth), [Cook-Off Showdown!](https://xenoblade.fandom.com/wiki/Cook-Off_Showdown%21), [Désirée's Future](https://xenoblade.fandom.com/wiki/D%C3%A9sir%C3%A9e%27s_Future), and [Battling Brutes](https://xenoblade.fandom.com/wiki/Battling_Brutes) — leader gates / skill-tree rewards.
- [Gamer Guides — Dunban Arts](https://www.gamerguides.com/xenoblade-chronicles-definitive-edition/guide/characters/dunban/arts) and [Xenoblade Wiki — Dunban](https://xenoblade.fandom.com/wiki/Dunban) — Art effects and learned levels.
- [Xenoblade Wiki — Vision](https://xenoblade.fandom.com/wiki/Vision_%28XC1%29), [Monado Shield](https://xenoblade.fandom.com/wiki/Monado_Shield_%28XC1%29), [Monado Armour](https://xenoblade.fandom.com/wiki/Monado_Armour), and [Monado](https://xenoblade.fandom.com/wiki/Monado) — counter options and Monado behavior.
- [Xenoblade Wiki — Melia](https://xenoblade.fandom.com/wiki/Melia) and [Battle Arts](https://xenoblade.fandom.com/wiki/Battle_Arts_%28XC1%29) — summon/Discharge behavior and Talent-Art identities.

## Actionable findings

| Priority | Guide location | Finding | Required correction / clarification | Confidence |
|---|---|---|---|---|
| P0 | `ROUTE.md:343` | The Chapter 3 build card says `Shulk / Reyn / Fiora`, but Fiora leaves at the end of Chapter 2. Chapter 3's story sequence is Shulk/Reyn in the revisited Tephra Cave; Sharla has not joined yet. | Replace the Chapter 3 party card with `Shulk / Reyn` only. The join-order summary’s `Sharla Ch4` is consistent and should be retained. | High |
| P0 | `ROUTE.md:702` | It recommends **Tempest Kick for topple** when Dunban becomes permanent. Tempest Kick is learned at Lv32, does not Topple, and is instead a ranged Ether Art that removes an enemy buff after Gale Slash. Dunban's early Topple is **Steel Strike**, following Break. | Replace with `Steel Strike for Topple after Break`. Keep Tempest Kick as a later optional aura-removal / Chain utility Art, not an early Chapter 5 tool. | High |
| P1 | `ROUTE.md:543`, `826`, `828` | “Every quest at [the Refugee Camp] expires” is broader than the reference. Completing The Road Home relocates refugees and expires **timed** Refugee Camp quests; non-timed quests are not universally invalidated. The Road Home itself can also expire and be replaced by the mutually exclusive `To Colony 6!`. | Change every universal wording to “every **timed** Refugee Camp quest”. Preserve the strong instruction to finish the known timed block first. Add the `To Colony 6!` fallback/branch note. | High |
| P1 | `ROUTE.md:62-64`; `COMBAT-AND-BUILDS.md` control guidance | “Shulk-controlled” is an excellent safety recommendation, but reads as a factual requirement. Visions can occur while Shulk is not in the active party; Future Connected has no Visions. | Label this as a guide policy: `Control Shulk in the main game for the most reliable manual vision responses.` Explicitly exclude FC. Do not imply Shulk must be active for a Vision to occur. | High |
| P1 | `ROUTE.md:49-58`, chapter level cards | Expert Mode behavior is described correctly in broad strokes, but the chapter levels (`22`, `28`, `65`, `88`, etc.) are recommendations, not source-derived requirements. Minimum selectable levels also constrain lowering (e.g. Dunban 20, Riki 22, Melia 23, post-return Fiora 40). | Add a single note near the first level card: “These are guide targets, not game-required levels; Expert Mode cannot lower each character below their join minimum.” Cite/check the listed floor values in the UI before asking a player to lower. | High for system, editorial for targets |
| P1 | `ROUTE.md:2311-2334` leader-trap section | The audited specific gates are accurate: Melia for Ancient High Entia Mystery, Dunban accept/Shulk return for Stunted Growth, Riki for Final Challenge of the Sage; Fiora for Battling Brutes; Reyn for Cook-Off Showdown. | Keep these cards. Add source links or a compact `verified leader gate` source note so the large “23 later steps” summary remains auditable. | High on listed gates; Medium on total count |
| P1 | `ROUTE.md:2301-2304` | Battling Brutes is correctly treated as post-Core and Fiora-led, but it requires **A Flower for a Rose** in addition to Mechonis Core and Fiora lead. | Include `A Flower for a Rose complete` in the card's explicit prerequisite line; the current gateway prose should not be the only place it is inferable. | High |
| P1 | `COMBAT-AND-BUILDS.md` general build claims | Monado Armour's 75% result is accurate only at Art level 10 and excludes Talent-Art damage. Shield blocks only one enemy Talent Art of equal/lower level. | Whenever the guide says `75%` or “Shield nullifies”, retain the qualification: max-level Armour; Shield level must meet the Roman numeral. | High |
| P2 | `data/build-data.js:52-54`, route updates around Ch5+ | The base Dunban endgame build lists late Arts (Thunder Lv40, Jaws of Death Lv48) as expected endgame choices. The chapter updates need a hard availability check: Tempest Kick Lv32, Heat Haze Lv36, Thunder Lv40, Soaring Tempest Lv44, Jaws Lv48. | Maintain only the Art’s learnable-by-phase entries in route snapshots. The currently audited Ch5 row is good where it uses Electric Gutbuster / Peerless / Spirit Breath; preserve that rule for later maintenance. | High |
| P2 | `data/build-data.js` and `COMBAT-AND-BUILDS.md` AI language | “AI Melia is bad” is useful shorthand, but the factual part is narrower: manual play is needed to deliberately maintain/duplicate/release a chosen elemental stack and to manually execute her topple sequence. AI performance is matchup/build-dependent. | Phrase as `AI Melia is not reliable for planned elemental storage/burst; control her for that build.` Keep Dunban/Riki recommendations as recommendations, not guarantees. | Medium |
| P2 | `ROUTE.md:701`, gear section | “Put every Agility Up gem on Dunban” is strong advice, not a universal rule. Agility is also accuracy versus level gaps; Shulk/Melia/Fiora or the controlled attacker can need it before a damage gem against evasive/high-level targets. | Change to `Prioritize Agility Up on Dunban until he reliably evades; reserve enough accuracy/Agility or Night Vision for the character that must hit.` | Medium |

## Checked and retained

- **Expert Mode storage and reversibility:** It uses stored reserve EXP and permits lowering, subject to join-level floors. The guide’s core “bank EXP deliberately” policy is mechanically sound. [Difficulty Levels](https://xenoblade.fandom.com/wiki/Difficulty_Levels)
- **The Road Home as a real decision point:** accepting/completing the relocation path deserves the guide’s prominent warning. The needed fix is scope wording, not removal of the warning. [Refugee Camp](https://xenoblade.fandom.com/wiki/Refugee_Camp)
- **Stunted Growth leader handoff:** Dunban must lead to receive it, then Shulk must lead to return it. [Stunted Growth](https://xenoblade.fandom.com/wiki/Stunted_Growth)
- **Cook-Off Showdown:** Reyn lead and the B-route HP Steal reward are correct; the latter is no longer permanently unique in DE because the Archsage can provide it. Do not call it an irreplaceable missable reward. [Cook-Off Showdown!](https://xenoblade.fandom.com/wiki/Cook-Off_Showdown%21)
- **Pessimism chain:** Désirée’s Future is Shulk-led and has the stated late affinity/story prerequisites; do not present it as simply a Chapter 6 pickup. [Désirée’s Future](https://xenoblade.fandom.com/wiki/D%C3%A9sir%C3%A9e%27s_Future)
- **Future Connected difference:** visions are absent there. Any FC build note should use Union Strike/Ponspector logic, not main-game Vision/Chain assumptions. [Vision](https://xenoblade.fandom.com/wiki/Vision_%28XC1%29)

## Gaps that need a deliberate verification pass

1. **Leader-gate total (“23 later route steps”).** The individual checked cards are sound, but the numeric total and complete inventory need a source-backed ledger. Add a per-card source URL / quest ID before presenting the count as exact.
2. **All recommended chapter levels.** They are a coherent completion-run policy, but there is no public reference proving `22`, `28`, `65`, etc. are the uniquely correct targets. Mark them as the guide’s Expert Mode targets and validate they never go below a recruited member’s floor.
3. **Generic quest expiry labels.** Where a third-party guide says “timed” but supplies no cutoff, do not manufacture one. Record “timed; cutoff unverified” and direct the reader to do it on the current visit if cheap.
4. **Named gear lists versus traits.** The current trait-first gear advice is safer than a static named-equipment list. If named drops are later added, each needs a source and a version note (DE vs Switch 2 Edition / Time Attack availability).

## Suggested correction order

1. Fix roster/chapter inconsistencies and Tempest Kick immediately; they affect a player’s current party and combat execution.
2. Narrow Refugee Camp wording and add the relocation fallback branch.
3. Make the vision and Expert Mode language distinguish **mechanics** from the guide’s **recommended policy**.
4. Add source metadata to every leader-trap card, then verify the claimed total.
