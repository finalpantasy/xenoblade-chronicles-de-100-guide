# Combat, Party, Skills, Gems and Gear

Companion to `ROUTE.md`. This answers: who you control, who the AI gets, what to level first, what to link, what gems to chase, and what gear to wear.

The interactive `index.html` **Build Lab is the canonical loadout matrix**: every character has player-controlled and AI-controlled variants for both reliable and aggressive play, plus party presets. This document explains the reasoning behind those choices.

---

## 1. Who you control

**Guide default: Shulk, from Chapter 1 to the post-game.** He is the safest leader for this first-clear completion route, not a required leader.

Visions can occur without Shulk in the active party. Controlling him makes the guide's manual responses reliable: **Monado Shield** can nullify an enemy Talent Art when its Art level meets the displayed Roman numeral; **Monado Armour** reduces physical/ether Art damage by up to 75% at maximum Art level but does not stop enemy Talent Arts; **Monado Speed** helps one target evade physical attacks; or warn the targeted ally with **B**. The AI cannot choose among those encounter-specific reactions reliably.

**Aggressive alternative from Chapter 8 onward: player-controlled Melia.** She has a very high Ether burst/DoT ceiling, but she is fragile and her AI is not reliable for a deliberately banked elemental rotation. Player-controlled Melia retains the desired buffs, uses Summon Copy, and discharges during burst windows. Use her for Ether-weak enemies, Unique Monster farming and faster superboss kills after you understand the encounter.

**Do not make AI Melia or AI Fiora your only damage plan.** Both lose important sequencing under AI control. Their Build Lab presets remain useful as support or secondary damage, but manual control is how either reaches her ceiling.

---

## 2. Party composition by phase

Three slots. You are one of them.

| Phase | Party | Notes |
|---|---|---|
| Ch 1-2 | Shulk / Reyn / Fiora | Forced. Learn Break → Topple on Reyn. |
| Ch 3 | **Shulk / Reyn** | Forced two-person party. |
| Ch 4 | **Shulk / Reyn / Sharla** | Sharla joins; Reyn tanks with raw Defence while she heals. |
| Ch 5-6 | **Shulk / Dunban / Sharla** | Transition to Dunban's agility tanking while retaining dedicated healing. |
| Ch 7-11 | **Shulk / Dunban / Riki** | Reliable general-purpose core once Riki joins. |
| Ch 12+ | Shulk / Dunban / Riki, or swap Riki → Fiora for more damage | Fiora rejoins. Riki is still better as AI. |
| Superbosses | Melia (you) / Dunban / Riki, or Shulk / Dunban / Riki | Melia for speed, Shulk for safety. |

### Why Shulk / Dunban / Riki is the answer

- **Dunban is an evasion tank.** His Agility is high enough that with Agility gems and Monado Speed he simply does not get hit by physical attacks. Sources describe a maxed-agility Dunban as near-invincible to physical damage. He holds aggro and takes almost nothing.
- **Riki is an excellent all-rounder.** `You Can Do It` heals allies in a line in front of him, so positioning matters; Lurgy, Burninate and Freezinate supply strong damage over time, and his HP pool is enormous. His AI plays him well.
- **This comp does not need a dedicated healer.** An evasion tank means almost no incoming damage, so Sharla's healing becomes redundant and her low damage becomes the limiting factor. Battles get dramatically faster.
- Do **not** run Reyn and Dunban together. Two tanks is redundant unless you are deliberately topple-locking.

### AI quality, character by character

| Character | AI quality | Use as AI? |
|---|---|---|
| Dunban | Excellent | Yes, best AI tank |
| Riki | Excellent | Yes, best AI support |
| Reyn | Good | Yes, early game |
| Sharla | Adequate | Early only, falls off hard |
| Fiora | Mediocre | Acceptable, but underperforms her ceiling |
| Melia | Poor for burst sequencing | Support/filler only; control her when her damage matters |
| Shulk | Limited by vision timing | Use beside player Melia/Fiora only when you accept weaker reactive safety |

---

## 3. The combat loop you are actually playing

1. **Auto-attack does the work.** Arts are the spice. Positioning matters: many arts do more from the side or behind.
2. **Break → Topple → Daze.** Break makes Topple possible, Topple makes Daze possible. A toppled enemy cannot act. Reyn (`Bone Upper`) and Dunban set this up; this chain is how you beat things well above your level.
3. **Burst Affinity.** When a party member calls out mid-fight, press the button on cue. Raises party affinity and fills the Party Gauge. Do this every time, it is free affinity and you need a lot of affinity.
4. **Chain Attacks** when the Party Gauge is full. Chaining arts of the **same colour** extends the chain. This is your burst window and your topple window.
5. **Visions.** The whole reason you control Shulk. Respond, do not spectate.

### Monado Arts priority

| Art | When | Priority |
|---|---|---|
| **Monado Enchant** | Lets most physical party members damage Mechon normally; returned Fiora is the important exception | Highest, mid-game |
| **Monado Shield** | Nullifies an enemy Talent Art when its Art level meets or exceeds the Vision's Roman numeral | Raise as required |
| **Monado Armour** | Up to 75% reduction to physical/ether Art damage at maximum Art level; does not stop enemy Talent Arts | Highest, late |
| **Monado Speed** | Agility/evasion to one target. **Put it on Dunban** and he stops being hit | Very high |
| **Monado Buster** | Heavy damage, anti-Mechon | High |
| **Monado Purge** | Blocks enemy buffs and ether attacks | Situational |
| **Monado Eater** | Strips buffs, applies bleed | Situational |

**Monado Speed on Dunban is the single strongest interaction in the game.** An evasion tank with an evasion buff is unhittable by physical attacks.

---

## 4. Skill trees: what to level first

Each character has three default branches plus two hidden branches unlocked by quests and affinity. **Skill Trees use SP; Arts use AP.** The active branch changes that branch's stat bonus, while every skill already learned remains active. Skill Links use refundable Affinity Coins.

**Order of investment:**

1. **Shulk: Intuition**, then Humanity; switch to Bravery after unlocking it. Intuition's Agility is the best early accuracy/evasion return.
2. **Reyn: Spirit**, then Diligence; Camaraderie is the late tank/chain target once `Friendship Tokens` unlocks it.
3. **Sharla: Perseverance**, then Devotion; Perseverance contains Ether Expansion and the shorter Cool Off skill.
4. **Dunban: Wisdom**, then Prudence; Enthusiasm becomes the offensive hidden-tree target. Wisdom is the core agility/evasion branch.
5. **Melia: Honesty**, then Reliability; Passion becomes the Ether-stat target when unlocked. Honesty contains High Speed and Enlightenment.
6. **Riki: Vivacity**, then Innocence; move to Cowardice after his HP reaches the cap and the branch unlocks.
7. **Fiora: Courage**, then Daring; Rashness becomes the multi-hit critical target once `The Oath Sword` unlocks it.

Before superbosses, finish Dunban's `Steel Protection`, then prioritize accuracy, Spike Defence and the specific links named in the Build Lab. Do not confuse the branch stat bonus with its individual skills: you retain learned skills after changing branches.

### Hidden skill trees — the unlock map

Each character has hidden trees beyond their default three, containing some of the best passives. They are **quest rewards**, several sit behind long or timed prerequisite chains, and every finale has a required leader. The route repeats that requirement on the exact card.

**There are 14 hidden branches across the seven base-game characters: two each.**

| Character | Tree | How to unlock | Ch |
|---|---|---|---|
| **Riki** | **Heroism** | **Riki leads:** `Meeting the Nopon Sage` → `Legend of the Sage` → `Challenge of the Sage` → **`Final Challenge of the Sage`** (Nopon Sage, Divine Sanctuary). Pays 38,000 G / 73,500 EXP / Meteor Nibbler | 17 |
| **Sharla** | **Reliance** | **Sharla leads:** `Disinsectization` + `Secret Innovation` → **`Avenge a Mamapon's Death`** | 8 |
| **Dunban** | **Enthusiasm** | **Dunban accepts; Shulk turns in:** Orkatix chain, Fallen Arm/Junks: `Transmission Bypass` + `The Exhaust Pump` + `The Mini Reactor` → **`Stunted Growth`**. Needs **3.5★ Hidden Machina Village** | 17 |
| **Shulk** | Pessimism | **Shulk leads:** `The Broken Watch` (Ch1, Désirée, Ether Light) → **`Désirée's Future`** | 1 → 6 |
| **Shulk** | Bravery | **Shulk leads:** `A Young Captain's Revival` **or** `A Young Captain's Trust` — mutually exclusive; either unlocks the tree | 17 |
| **Reyn** | Camaraderie | **Reyn leads:** `Friendship Tokens` — Moritz, Tranquil Square, Colony 9 | 17 |
| **Reyn** | Impatience | **Reyn leads:** **`Cook-Off Showdown!`** — Ma'crish, Colony 6 HQ | 10 |
| **Sharla** | Affection | **Sharla leads for every objective:** `Stopping the Elopement` — Don Argentis, Colony 6. Needs 4.5★ Colony 6 and `Family Secrets` → `Betrothal Test` | 17 |
| **Fiora** | Innocence | **Fiora leads:** **`Battling Brutes`** — Dulland, Refugee Camp | 17 |
| **Fiora** | Rashness | **Fiora leads:** **`The Oath Sword`** — Karlos, Hidden Machina Village; requires `The Wilted Flower`, 2★ and Mechonis Field access | 13 |
| **Dunban** | **Obstinance** | **Dunban leads:** six-quest Valak chain ending in **`The Balance of Power`** (Dakuku). Pays 21,000 G, Snaer Striker, Stellar Gear and Gauntlets | 10 |
| **Riki** | Cowardice | **Riki leads:** `Mislabelling Problem` → **`Getting Bigger!`** (Dabidabi, Chief's Residence). Needs **3.5★ Central Bionis** | 10 |
| **Melia** | Reticence | **Melia leads:** Ether Plant chain ending in **`Trouble at the Lighthouse`** at Syrath Lighthouse. Also gives the **Nightglow Staff** | 8 |
| **Melia** | Passion | **Melia leads:** **`Ancient High Entia Mystery`**, Ch17. Needs **2.5★ Upper Bionis**, the High Entia Emblem, and either `Talia's Research` **or** `Investigating Satorl` | 17 |

**Five traps here.**

1. **`Désirée's Future` chains from `The Broken Watch` in Chapter 1.** Skip the Chapter 1 quest and Shulk's Pessimism tree never becomes available.
2. **`Battling Brutes` appears at the Refugee Camp in Chapter 17**, which most guides treat as permanently closed after Chapter 5. It is not — Dulland and Elior repopulate it. The quest is **not timed**, but it is easy to overlook; as one of the richest optional bundles, it unlocks Fiora's tree, pays 63,500 G and 158,000 EXP, and spawns two Unique Monsters (Firework Geldesia and Reckless Zanden, Lv98, Arachno Queen's Nest in Tephra Cave).
3. **Frontier Village needs a deliberate return trip in Chapter 10.** `Medical Advancements`, `Let's Make Fillings!`, `Mislabelling Problem` and `Getting Bigger!` are all **Chapter 10** quests from the Sacred Altar and Chief's Residence, not Chapter 7. Build Central Bionis affinity to **3.5★** during your Chapter 7 pass so Riki's gate is already open when you come back.
4. **Two of these chains are bundled with Unique Monsters.** `The Balance of Power` spawns **Barbaric Sitri** (47) and **Banquet Vassago** (48) in Antol Den. `Punish the Hodes`, inside Melia's Reticence chain, spawns **Funeral Gozra** (42) at Hode Refuge.
5. **Melia's Passion tree is not missable with `Talia's Research`.** `Ancient High Entia Mystery` opens in Chapter 17 after either `Talia's Research` **or** its post-Core replacement, `Investigating Satorl`; it also needs 2.5★ Upper Bionis, the High Entia Emblem, and Melia leading. Doing Talia's earlier quest helps affinity, but skipping it does not lose the tree.

---

## 5. Skill Links

**How it works:** spend **Affinity Coins** to let one character borrow a passive skill another character has unlocked. Affinity between the two characters limits how much you can link.

**Two things worth knowing:**
- Affinity Coins come from **levelling up** *and* from **first kills on Unique Monsters**. Missing a UM costs coins but is not the only source.
- **Coins are refundable.** Unlink a skill and you get the coins back. Experiment freely, there is no wrong permanent choice here.

### Recommended links

**Shulk**
| Skill | From | Cost | Effect |
|---|---|---|---|
| Battle Character | Reyn | 17 | +10% weapon attack |
| Ultimate Strike | Fiora | 13 | +20% critical damage |
| Deadly Determination | Dunban | 48 | More tension from Arts |
| High Speed | Melia | 20 | +15 Agility |

**Dunban** — the priority character
| Skill | From | Cost | Effect |
|---|---|---|---|
| High Speed | Melia | 20 | +15 Agility. **Take this first** |
| Rampage | Reyn | 20 | +10% double attack chance |
| Ultimate Teamwork | Shulk | 18 | +25% chain attack damage |
| Ultimate Strike | Fiora | 13 | +20% critical damage |

Rampage plus Haste plus Double Attack gems compounds: faster attacks trigger more double attacks, which trigger more criticals.

**Riki**
| Skill | From | Cost | Effect |
|---|---|---|---|
| Healing Wisdom | Shulk | 8 | +15% healing from Arts |
| Chain of Friendship | Shulk | 45 | +15% Chain Link chance |
| Glorious Future | Shulk | 28 | Maxes talent gauge after Visions |
| High Speed | Melia | 20 | +15 Agility |

**Reyn**
| Skill | From | Cost | Effect |
|---|---|---|---|
| Resilient Warrior | Shulk | 11 | Physical and ether defence |
| Body of Steel | Dunban | 49 | -15% physical damage taken |
| Immunization | Shulk | 45 | Blocks stat-reduction debuffs |
| Cuddly Hero! | Riki | 43 | Debuff resistance |

**Sharla**
| Skill | From | Cost | Effect |
|---|---|---|---|
| Healing Wisdom | Shulk | 8 | +15% healing |
| Bodybuilder | Reyn | 6 | +5% max HP |
| Heavy Equipment | Dunban | 15 | Equip heavy armour early |
| Body of Steel | Dunban | 49 | -15% physical damage taken |

**Melia**
| Skill | From | Cost | Effect |
|---|---|---|---|
| Ether Assault | Sharla | 20 | +20% ether Art damage |
| Chain of Friendship | Shulk | 45 | +15% Chain Link chance |
| Love Sun! | Riki | 18 | Reduced cooldown in daytime |
| Explosion of Energy | Fiora | 80 | Tension from Talent Arts |

**Fiora** (listed as "Seven" in some guides — that is her Mechon designation)
| Skill | From | Cost | Effect |
|---|---|---|---|
| Critical Drain | Dunban | 50 | Restores HP on criticals |
| Epic Evasion | Shulk | 45 | +5% Burst Affinity chance after evading |
| Equipment Expert | Dunban | 10 | Reduces equipment weight |
| High Speed | Melia | 20 | +15 Agility |

---

## 6. Gems

Gems slot into equipment and are the largest single source of power in the game.

### The one rule

**Agility is the strongest stat in the game.** Agility Up gems are the most valuable gems. They power the evasion-tank plan, they raise your hit rate against higher-level enemies, and hit rate is what gates the superbosses.

### Gem crafting

Refine cylinders plus crystallised ether at an Ether Furnace. **The pair of characters working the furnace determines the number of cycles, based on their affinity.** Higher affinity between the two crafters means more cycles, which means better gems. Another reason the affinity grind pays for itself.

### Priority list

| Gem | Why |
|---|---|
| **Agility Up** | Best stat. Everything else is downstream of this |
| **Spike Defence** | Equip for a documented damaging/counter/Topple Spike; Dunban's Steel Protection reduces Spike damage by 20%, not to immunity by itself |
| **Night Vision** | Accuracy against higher-level enemies. Maxed rank required for Avalanche Abaasy |
| **Topple Plus** | Extends topple. Rank VI needed to topple-lock Abaasy |
| **Debuff Resist** / **Divine Protect** | Abaasy's instant-death counter spike |
| **Haste** | Faster Art cooldowns |
| **Double Attack** | Compounds with Rampage on Dunban |
| **Strength Up** / **Ether Up** | Flat damage, fine but lower priority than Agility |

### The superboss loadout

Build toward this from roughly Chapter 14:
- Spike Defence where the boss dossier documents a relevant damaging, counter or Topple Spike
- Night Vision maxed, especially before Abaasy
- Agility Up stacked on Dunban
- Topple Plus for Belgazas
- Debuff Resist or Divine Protect for Abaasy
- Monado Armour maxed on Shulk

**The farm that unlocks the rest:** **Ancient Daedala** (Lv105, Fallen Arm, Wreckage Beach, post-Mechonis Core) drops **Rank V Night Vision cylinders**. Kill it second in the superboss order, then farm it before attempting Belgazas and Abaasy. Superboss drops in general are Rank V crystals with Daze Up and Night Vision attributes, craftable into the Rank VI gems the endgame armour wants.

---

## 7. Gear

Two honest points:

1. **Gear matters less than gems.** A mediocre piece with three good gem slots beats a better piece with one. Prioritise slot count.
2. **Do not grind gear during the story.** Story-pace equipment from quest rewards and shops is sufficient the whole way through, because your level is capped at the story target and your enemies are level-appropriate. The gear chase belongs in the post-game, where it is fed by superboss drops and Colony 6 rewards.

**Named gear worth routing for:**
- **Imperial Staff** (Melia) — 🔴 missable, Chapter 10, control Melia and talk to Kallian before he leaves.
- **Titan Plate** — all four Colony 6 categories at Level 5.
- Per-category Colony 6 Level 5 rewards: Oriental Glass (Housing), Titan Arms (Commerce), and equivalents.
- Collectopaedia area completion rewards: Carbon Driver (Colony 9), White Cluster (Bionis' Leg), Cosmic Nibbler and Arkose Pike (Sword Valley 🔴), Taurus Greaves and Taurus Helm (Mechonis Field 🔴), Machina Driver III (Central Factory 🔴).
- **Monado III** is **New Game Plus only.** It cannot be obtained on a first playthrough. If your definition of 100% includes it, budget a second file.

---

## 8. Expert Mode level management

You chose cap-at-story-level and bank the surplus. Practical rules:

1. Set your level to the chapter target listed in `ROUTE.md` at the start of each chapter, and leave it there.
2. Banked EXP is never lost and there is no penalty for holding a large bank.
3. **Do not spend the bank during the story.** Its purpose is the post-game, where the level gap between you (~90) and the superbosses (100-120) is otherwise brutal.
4. **Do drop your level deliberately** for quests with level conditions, and for Unique Monsters you want to fight at a meaningful difficulty.
5. Against superbosses, level is only part of it. Abaasy at Lv120 will still shred an underprepared Lv99 party. Gems and Monado Armour matter more than the last few levels.

---

## 9. Affinity, the currency behind everything

Three separate affinity systems, all of which the route grinds simultaneously:

| Type | What it gates | How to raise |
|---|---|---|
| **Party affinity** (character to character) | Heart-to-Hearts, Skill Link capacity, gem crafting cycles | Burst Affinity prompts, Heart-to-Hearts, questing with them in the party, gifts |
| **Area affinity** (per region, up to 5★) | Collectopaedia "Other" page, NPC trades, quest availability | Completing side quests for that area's residents |
| **NPC affinity** (individual, the Affinity Chart) | Quests, trades, Colony 6 residents | Talking to NPCs repeatedly at different times, completing their quests |

**The shortcut:** superbosses drop **Veritas Glyphs**, tradeable for **Love Sources**, which give large party affinity boosts. This is why `ROUTE.md` puts superbosses *before* the affinity grind in the post-game rather than after.
