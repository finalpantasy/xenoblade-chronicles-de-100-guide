# Phase 0: Points of No Return, Missables, and Branch Locks

Game: Xenoblade Chronicles: Definitive Edition - Nintendo Switch 2 Edition
Built: 2026-07-31

Confidence key: **[V]** verified across two independent sources. **[S]** single source. **[?]** unresolved, treat defensively.

Sources used so far:
- Xeno Series Wiki, List of missable content (XC1)
- Game8, List of Missables (XCDE)
- RPG Site, XCDE Quest Guide
- Xeno Series Wiki: Nopon Grand Prix, Noponstone (XC1DE), Land of Challenge (XC1DE)

---

## 1. Points of no return, in play order

| # | What locks | Trigger | Chapter | Scale of loss | Conf |
|---|---|---|---|---|---|
| 1 | Ether Mine Central Pit (about half the area) | Defeating Xord | 5 | Collectopedia + area | [S] |
| 2 | Refugee Camp (Bionis' Leg) | Starting `The Road Home` or `To Colony 6!` | ~6 | 23 quests | [V] |
| 3 | Sword Valley, Galahad Fortress | Defeating Jade Face in Mechonis Field | end of 13 | 4 quests + Collectopedia | [V] |
| 4 | Fallen Arm / Machina Village, Mechonis Field | Defeating the Agniratha bosses (Yaldabaoth) | 14 | 7 quests + Collectopedia | [S] |
| 5 | Central Factory, Agniratha | Skip Travel disabled after Yaldabaoth; on foot only until the Mechonis Core escape | 14-15 | Collectopedia | [S] |
| 6 | **Agniratha + Alcamoth (all of it)** | **Entering / completing Mechonis Core** | **15** | **~90+ quests. Largest single loss in the game.** | [V] |
| 7 | Prison Island (original map) | Mechonis Core events. Returns later as a separate map | 15 | Area version | [S] |
| 8 | Mechonis Core | Escaping it | 15 | Area | [S] |

**The one deadline that matters most:** everything in Alcamoth and Agniratha must be finished *before* you enter Mechonis Core in Chapter 15. That is roughly 90 quests, the Alcamoth Affinity Chart block, and two Nopon Grand Prix courses.

---

## 2. Mutually exclusive quest pairs

**All ten are now resolved with reasons. See `05-branch-decisions.md` for the full analysis.** Summary below.

| Take | Not | Area | Why |
|---|---|---|---|
| A Little Brother's Fight | A Big Brother's Fight | Colony 9 | Better affinity |
| *(either)* Romantic Notions | — | Colony 9 | Verified no effect |
| Spirits Raised | Imaginations Tempered | Refugee Camp | Affinity + unlocks Colony 6 quests |
| The Road Home | To Colony 6! | Colony 6 | Same outcome, 7 chapters earlier |
| Miss Sweetness (Ma'crish) | Miss Sweetness (Berryjammy) | Colony 6 | Coin flip; +1,000 G |
| The Melody of Happiness | Dream of a Poet | Colony 6 | 28,500 G + Rosemary chart upgrade |
| Medical Advancements | Let's Make Fillings! | Frontier Village | Better EXP and money |
| Talia's Research | Investigating Satorl | Alcamoth | Area Affinity. 🔴 Deadline Ch15 |
| Together Forever | I Love You No Matter What | Alcamoth | Two chart upgrades vs none |
| Adventurers in Peril | The Missing Partner | Alcamoth | Alternative leaves chart unchanged |

The chapter each branch appears in, and the full reasoning with reward numbers, is in `05-branch-decisions.md`.

---

## 3. Mutually exclusive Colony 6 resident invitations

Three pairs where inviting one permanently excludes the other. These change **both** the Affinity Chart and which later quests exist.

| Option A | Option B | From | Conf |
|---|---|---|---|
| Perrine | Mefimefi | Colony 9 | [S] |
| Minana | Gowago | Frontier Village | [S] |
| Zel Argentis | En Argentis | Alcamoth | [S] |

Note on the third pair: after the Mechonis Core escape, Zel relocates to Satorl Marsh and En to Eryth Sea, so the choice is recoverable in the sense that both remain alive, but the invitation is still one-or-the-other.

---

## 4. Missable items and unique interactions

| Item / event | How | Window | Conf |
|---|---|---|---|
| **Imperial Staff** (Melia-exclusive weapon, unique appearance) | Talk to Kallian **while controlling Melia** | After reaching Chapter 10, before Kallian leaves with the allied force | [S] |
| **Melia's Lament** (unique interaction) | Talk to Shulk **while controlling Melia** | Immediately after escaping Mechonis Core and landing in Colony 6 | [S] |
| Equipment appearances | Tied to the equipment itself | Same windows as the gear | [S] |
| Collectables / materials / ether crystals from locked areas | Partially recoverable via NPC trading and Colony 6 reconstruction, but described as extremely tedious | After the area locks | [S] |

Both Melia interactions require you to have **switched your controlled character to Melia**. Easy to miss on a Shulk-controlled run. Put a hard stop in the route at both points.

---

## 5. Future Connected

| Item | Note | Impact |
|---|---|---|
| Gael'gar (NPC) | Disappears after the fog Armus attack on Gran Dell | Low. FC has no Affinity Chart or trading |
| Companions' Cape Shop | Closes after relocation | None. Gran Dell Shop stocks everything it sold |

---

## 6. Switch 2 Edition additions and their routing consequences

### Ether Jet
- Unlocked by the new quest **World-Changing Whatchamajig**, from a **Nopon Engineer near the entrance to the Refugee Camp, Bionis' Leg**.
- Steps: take the quest, go to **Colony 9's Cylinder Hangar**, get the ether cylinders, kill one easy enemy, return to the Nopon Engineer.
- Summon with **ZL+ZR** in the overworld. Accelerate **B**, brake/reverse **ZL**, boost while accelerating **A**.
- Usable in the main game **and** Future Connected.

**[?] UNRESOLVED RISK - highest priority in the whole map.** The quest giver stands at the Refugee Camp, and the Refugee Camp expires when you start the Colony 6 relocation. No source states whether this new quest expires with it. **Route defensively: pick up and complete World-Changing Whatchamajig the moment you arrive on Bionis' Leg, before anything else.** Cost if the fear is wrong: zero, and you get fast traversal for the whole game. Cost if the fear is right and you ignore it: you lose the Ether Jet, the entire Nopon Grand Prix, and its armour sets permanently.

### Nopon Grand Prix
Unlocks after the Metal Face encounter in Colony 6, provided the Ether Jet is already unlocked. Access from the **main menu with Y**, or via Nopon Assistant NPCs in the field. Menu access is the easier route.

| Location | Score Attack | Battle Race | Unlocks | Armour slot |
|---|---|---|---|---|
| Bionis' Leg | Caterpile Circuit | Twilight Speedway | Available from GP unlock | Head |
| Makna Forest | Jungle Rumble | Midnight Forest | On reaching Eryth Sea | Torso |
| **Alcamoth** | **Alcamoth Orbital** | **Alcamoth at Dawn** | **After Prison Island events** | **Arms** |
| Valak Mountain | Valak Slalom | Blizzard Rally | After the Metal Face encounter | Legs |
| Colony 9 | Rural Road | Colony 9 Wild Ride | After reuniting in Hidden Machina Village | Feet |

- **Score Attack:** smash Ether Ore for points, reach the goal before time expires, checkpoints extend the clock.
- **Battle Race:** beat rival racers through all checkpoints to the goal.
- Rewards: **Noponstone** scaled to rank, plus a character-specific armour piece on first clear of each.
- Full armour set equipped = Ether Jet acceleration and boost bonus.
- **Full completion = all 70 clears** (5 tracks x 7 characters x 2 modes), which grants a permanent acceleration and boost bonus independent of equipped gear.

**[?] UNRESOLVED RISK.** The Alcamoth courses unlock after Prison Island, and Alcamoth itself dies at Mechonis Core. If course access follows area access, 14 of the 70 clears are missable. The main-menu access strongly suggests they persist, but no source confirms it. **Route defensively: clear Alcamoth Orbital and Alcamoth at Dawn with all 7 characters before entering Mechonis Core.** Same logic as above, near-zero cost to be safe.

Note the Colony 9 courses unlock only after the Hidden Machina Village reunion, which is Chapter 14ish, so those 14 clears are necessarily late-game.

### Noponstone economy
- Earned from **Time Attack** in the Land of Challenge, and from **Nopon Grand Prix** courses.
- Rank-scaled, with a 10% chance of a bonus A-rank payout and a 1% chance of a bonus S-rank payout.
- Spent at the **Nopon Archsage** in the Land of Challenge.
- Stock: cosmetic equipment (Resort beachwear, Legacy armour sets), **materials and collectables for Colony 6 reconstruction**, **gems ranks I-V**, and Master Arts Manuals (only after clearing Future Connected).
- Noponstone is stated to be **equivalent in value to gold**, meaning items cost the same number as they would in G.

### Land of Challenge / Time Attack
- Unlocks after the **Mechon attack on Colony 9** (very early, Chapter 2).
- Entered through portals in most major areas; **the first portal is at Leg Pass in the Tephra Cave area**.
- No saving and no Skip Travel while inside.

**Routing consequence:** Noponstone income is available from Chapter 2 onward, while Colony 6 reconstruction does not begin until Chapter 6+. Banking Noponstone early is the lever that shortcuts the worst grind in the game. This did not exist in the original Definitive Edition and most older guides do not account for it.

### Other Switch 2 changes
- Heart-to-Hearts are now **fully voiced** (English and Japanese). Cosmetic only.
- New armour that changes character appearance.
- amiibo support returns from Xenoblade Chronicles 3D; scanning yields armour, overlapping with Grand Prix rewards.
- 4K/60 docked, 1080p handheld, rumble on key events.

---

## 7. Open items still to resolve in Phase 0

1. **[?]** Does `World-Changing Whatchamajig` expire with the Refugee Camp?
2. **[?]** Do the Alcamoth Grand Prix courses survive the Mechonis Core lockout?
3. Colony 6 reconstruction full bill of materials, back-mapped to earliest farm location, and Noponstone prices for those same materials.
4. Full Heart-to-Heart list with availability windows, flagging any that die with Alcamoth / Agniratha / Fallen Arm.
5. Confirm the Fallen Arm / Machina Village lockout at [V] rather than [S].
6. ✅ **Resolved.** All 10 mutually exclusive pairs have verified recommendations — see `05-branch-decisions.md`.
7. Whether any Unique Monster is exclusive to a locked area.
