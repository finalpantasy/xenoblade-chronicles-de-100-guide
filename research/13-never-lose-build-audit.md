# Never-lose build audit

Audit date: 2026-08-01. Read-only review of the current safe-party, Art, gem, skill, and route-timing guidance.

## Verdict

The durable default is sound: **player Shulk / AI Dunban / AI Riki** from Chapter 7, with **Shulk / Dunban / Sharla** during the transition. It is a low-speed, high-reliability setup because it retains manual Vision answers, uses a straightforward evasion tank, and keeps a recover/DoT support slot. Use **Melia / Dunban / Riki** only after the specific encounter is understood and Melia is player-controlled.

## Exact corrections

| Priority | Current guidance | Correction | Evidence |
|---|---|---|---|
| P0 | `ROUTE.md:2480` says Blizzard Belgazas has “no spike abilities at all” and recommends removing Spike Defence. | **Do not call Belgazas spike-free.** It has a 2,540-damage, 35m **Topple Spike**. If the plan includes Topple/Topple-lock, retain Spike Defence or otherwise prevent the Spike from firing. | [Blizzard Belgazas](https://xenoblade.fandom.com/wiki/Blizzard_Belgazas), [Spike status](https://xenoblade.fandom.com/wiki/Spike_%28status%29) |
| P1 | `COMBAT-AND-BUILDS.md:38` describes `You Can Do It` as a whole-party heal. | Change to **a frontal-line party heal**. It can cover more than one ally, but the party must be positioned in front of Riki; do not base a never-lose plan on it automatically reaching all three members. | [Riki](https://xenoblade.fandom.com/wiki/Riki) |
| P1 | “Spike Defence on everyone / mandatory for superbosses” appears as a general loadout rule. | Make it **per boss and per Spike type**. It is vital for damaging/counter/topple Spike encounters, but a blanket loadout can waste slots on a no-relevant-spike fight. Keep the safe first-pull rule: inspect the boss’s Spike/aura first, then slot the counter. | [Spike status](https://xenoblade.fandom.com/wiki/Spike_%28status%29), [Dunban — Steel Protection](https://xenoblade.fandom.com/wiki/Dunban) |
| P1 | “With Dunban’s Steel Protection [Spike Defence] approaches immunity.” | Qualify it. **Steel Protection is a 20% Spike-damage reduction**, not immunity by itself. State the equipped gem total/encounter Spike explicitly before claiming a survivability threshold. | [Dunban](https://xenoblade.fandom.com/wiki/Dunban) |
| P1 | `Monado Enchant` is described as mandatory for Mechon through the relevant chapters. | Add the Fiora exception: after her Chapter 12 return, **Fiora can damage Mechon normally without Enchant**. Keep Enchant for other physical party members in Mechon-heavy sections. | [Fiora](https://xenoblade.fandom.com/wiki/Fiora), [Monado](https://xenoblade.fandom.com/wiki/Monado) |
| P2 | “AI Melia / Fiora are bad” shorthand. | Preserve the recommendation but state the mechanical reason: manual Melia selects elemental storage/Copy/discharge and manual Fiora controls timing/positioning. It is a reliability policy, not an absolute AI failure claim. | [Melia](https://xenoblade.fandom.com/wiki/Melia), [Fiora](https://xenoblade.fandom.com/wiki/Fiora) |

## Availability and timing check

- The current chapter snapshots are materially safer than an all-endgame palette: they gate Dunban’s later Arts by learned level and do not prescribe Fiora’s late kit before her return.
- The primary availability edges to preserve are: Shulk `Air Slash` Lv14 / `Shaker Edge` Lv23 / `Battle Soul` Lv32; Dunban `Serene Heart` Lv28, `Tempest Kick` Lv32, `Thunder` Lv40; Riki `You Can Do It` Lv27, `Freezinate` Lv31, `Burninate` Lv43; Melia `Summon Copy` Lv38, `Starlight Kick` Lv44, `Summon Earth` Lv47. [Battle Arts](https://xenoblade.fandom.com/wiki/Battle_Arts_%28XC1%29)
- Shield/Armour wording is correctly conditional: Shield blocks one Talent Art only when its level meets the displayed Roman numeral; max-level Armour reduces physical/Ether damage by 75% but does not block Talent Arts. [Monado Shield](https://xenoblade.fandom.com/wiki/Monado_Shield_%28XC1%29), [Monado Armour](https://xenoblade.fandom.com/wiki/Monado_Armour)
- Future Connected has all Arts known at its start and lacks Visions; use its Union Strike/Ponspector logic rather than treating Shulk as a reactive Vision leader there. [Battle Arts](https://xenoblade.fandom.com/wiki/Battle_Arts_%28XC1%29), [Vision](https://xenoblade.fandom.com/wiki/Vision_%28XC1%29)

## Safe operating card

1. **Story / first blind UM:** Shulk / Dunban / Riki. Keep `You Can Do It` on Riki; tank with Agility and use Shield only for a shown Talent Art whose numeral it meets.
2. **Known Ether/physical-defence target:** player Melia / Dunban / Riki. Do not switch until the team can survive a missed heal window.
3. **Superboss:** begin Shulk / Dunban / Riki, solve accuracy and the boss’s exact Spike/aura first, then move to Melia for speed. Never assume an Agility, Spike Defence, or Topple Plus stack substitutes for the boss-specific check.

