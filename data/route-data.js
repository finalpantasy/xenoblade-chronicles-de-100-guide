// Xenoblade Chronicles DE (Switch 2) - 100% Route data
// Item flags: d = hard deadline, s = soft deadline, h = heart-to-heart, m = Colony 6 material,
//             u = unique monster, q = quest/branch, g = grand prix, x = safe/optional
const ROUTE = [
  {
    id: "ch0", title: "Chapter 0", subtitle: "Before you press start", level: "—",
    items: [
      { id: "c0-01", f: "x", t: "Set difficulty to <b>Expert Mode</b> in the options." },
      { k: "lvl", t: "How Expert Mode levelling actually works",
        d: "Two things to understand before you use it.<br><br>"
         + "<b>1. EXP goes to a bank, not straight into levels.</b> Open the menu and you will see banked EXP separate from your level. You spend it deliberately.<br>"
         + "<b>2. It is fully reversible.</b> Levelling down refunds the EXP back into the bank. There is no way to waste it and no penalty for holding a large bank.<br><br>"
         + "<b>The policy for this run:</b> sit at the level this guide gives for each chapter and bank everything else. You are saving it for the post-game, where the superbosses are Lv100 to Lv120 and you will finish the story around Lv90. That gap is what the bank closes.<br><br>"
         + "You will also <b>drop</b> your level on purpose sometimes: some quests have level conditions, and Unique Monsters stop giving useful fights if you outclass them." },
      { k: "build", t: "Guide control policy: Shulk for reliable first clears",
        d: "Visions can occur even when Shulk is not active, but controlling him makes the guide's manual responses dependable: use Monado Shield for a sufficiently low-level enemy Talent Art, Monado Armour against physical/ether Arts, Monado Speed on a physical target, or a <b>B</b> warning to the targeted ally. The AI cannot choose among those encounter-specific reactions reliably.<br><br>"
         + "This is a safe-route recommendation, not a game requirement. One planned alternative later is player-controlled Melia for Ether burst and superboss farming." },
      { id: "c0-02", f: "x", t: "Confirm Shulk is your party leader before you start questing." },
      { k: "info", t: "🔴 THE PARTY-LEADER TRAP — the most dangerous mechanic in the game",
        d: "<b>Twenty-three later route steps depend on the active party leader.</b> Eighteen quests list a leader prerequisite (the two mutually exclusive Young Captain finales share one route card), four more hide a leader-only interaction in the middle, and two one-time Melia events require you to control her. There is often no useful error message: the quest simply fails to appear or progress.<br><br>"
         + "<b>Extra-skill-tree rule:</b> lead with the character whose tree the quest awards. The one exception is <code>Stunted Growth</code>: <b>Dunban accepts it, then Shulk must turn it in.</b><br><br>"
         + "<b>Other easy-to-miss gates:</b> Shulk for <code>The Broken Watch</code>, the Dean step of <code>Rocco's Heartful Request</code>, <code>Making a Mixer</code>, <code>Paola and Narine</code> and <code>A Token of Friendship</code>; Melia for <code>Building Bridges</code>; Dunban for <code>Obstinate Berryjammy</code>; Sharla for the conversations in <code>Stopping the Elopement</code>.<br><br>"
         + "<b>Every exact gate is repeated on its route card with a pink Required Leader badge.</b> If a quest you expect is absent, use that badge before assuming it is missable." },
      { k: "info", t: "🔴 One dialogue choice permanently destroys a quest",
        d: "There is exactly one place in this game where picking the wrong conversation option kills content forever, with no warning and no retry.<br><br>"
         + "<b><code>The Old Soldier's Test</code></b> — Jan, at the training ground on the east side of Colony 9's <b>Military District</b>.<br><br>"
         + "To unlock it you must talk to <b>Dionysis</b> in the Residential District and answer:<br>"
         + "<b>✅ &quot;He's too old for that girl.&quot;</b><br>"
         + "<b>❌ &quot;Love keeps the ticker going&quot;</b> — this <b>permanently kills the quest for the entire playthrough.</b><br><br>"
         + "It costs you 5,000 EXP, the <b>Dawn Staff</b> (two gem slots), and the Unique Monster <b>Elder Gragus</b> — an Affinity Coin for all seven characters.<br><br>"
         + "Full prerequisites, since they are fiddly: Melia must have temporarily joined in Makna Forest · <b>Colony 9 affinity at 3★</b> · Dionysis, Cheryl and Minnie registered on the Affinity Chart · talk to <b>Jan between 9:00 and 15:00</b> first to give him affinity for Minnie · <i>then</i> speak to Dionysis and answer correctly." }
    ]
  },
  {
    id: "ch1", title: "Chapter 1", subtitle: "Colony 9 and Tephra Cave", level: "1-10",
    note: "Party: Shulk and Reyn, then Fiora joins in Tephra Cave. <b>Colony 9 never permanently closes</b>, so nothing here is a true emergency — but the quests are affinity-gated in a chain, so the order below is the order they actually unlock in.",
    items: [
      { k: "lvl", t: "Levels 1 to 10 — do not touch the slider yet",
        d: "Chapter 1 enemies are Lv1-10 and you level naturally through them. There is nothing to bank yet and nothing to spend. Just play.<br><br>"
         + "First real decision point is Chapter 4. From there the guide gives you a number each chapter." },
      { k: "info", t: "How Colony 9's quests are gated — read this once",
        d: "Colony 9 side quests unlock on <b>Area Affinity</b> (the star rating for the region), and completing quests is what raises it. So there is a forced order:<br><br>"
         + "<b>No gate</b> → The Key to a Long Life · Lonely Niranira · Biscuits for a Grandson · The Broken Watch · all generic quests<br>"
         + "<b>1.25★</b> → A Young Captain's Request<br>"
         + "<b>1.5★</b> → A Curry Conundrum · Rocco's Heartful Request<br>"
         + "<b>2★</b> → Pride and Courage · Dean's Shady Request<br>"
         + "<b>2.5★</b> → Liliana's Sincere Request<br><br>"
         + "Work top to bottom. If a quest below is not showing up, you have not done enough of the ones above it." },
      { k: "info", t: "Generic quests do not need turning in",
        d: "<b>Monster Quests</b> (kill N of an enemy), <b>Challenges</b> (kill one Unique Monster), <b>Material</b>, <b>Collection</b> and <b>Search</b> Quests all come from unnamed NPCs and <b>complete automatically in the field</b> the moment you satisfy them. No walk back.<br><br>"
         + "<b>Named-NPC quests are the opposite</b> — you must return to the person who gave it. Every named quest below tells you where to return." },

      { id: "c1-miss-brave-protectors", f: "d", t: "🔴 Earn <b>The Brave Protectors</b> before inviting Nic to Colony 6",
        d: "Register all nine Colony 9 Defence Force members on the Affinity Chart: <b>Andreas, Dorothy, Kantz, Emmy Leater, Miller, Minnie, Monica, Nic and Raoul</b>. Talk to named NPCs twice and at their active time until the link registers. Inviting Nic to Colony 6 before this is complete can make the achievement unobtainable on this file." },

      { id: "c1-01", f: "q", t: "<b>The Key to a Long Life</b> — Dionysis",
        d: "<span class=step><b>Pick up:</b> Dionysis, Residential District (near Tranquil Square).</span>"
         + "<span class=step><b>Do:</b> kill Brogs around Colony 9 until you have <b>2x Medicinal Brog Oil</b>.</span>"
         + "<span class=step><b>Turn in:</b> back to Dionysis.</span>"
         + "<span class=step><b>Pays:</b> 500 G · 50 EXP · Light Shoes (has an empty gem slot) · +100 Colony 9 affinity.</span>" },
      { id: "c1-02", f: "q", t: "<b>Lonely Niranira</b> — Niranira",
        d: "<span class=step><b>Pick up:</b> Niranira, Tranquil Square.</span>"
         + "<span class=step><b>Do:</b> take her letter to <b>Lukas</b>, also in Tranquil Square.</span>"
         + "<span class=step><b>Turn in:</b> back to Niranira.</span>"
         + "<span class=step><b>Pays:</b> 100 G · 50 EXP · Block Guarder.</span>"
         + "<span class=step><b>Unlocks:</b> Pride and Courage — <b>do not skip this</b>, the chain eventually reaches Friendship Tokens in Ch17, which is Reyn's hidden Camaraderie skill tree.</span>" },
      { id: "c1-03", f: "q", t: "<b>Biscuits for a Grandson</b> — Marcia",
        d: "<span class=step><b>Pick up:</b> Marcia, Ether Light (Commercial District).</span>"
         + "<span class=step><b>Do:</b> take Marcia's Biscuits to <b>Jiroque</b> in the Residential District — he is training to beat his older brother.</span>"
         + "<span class=step><b>Turn in:</b> back to Marcia.</span>"
         + "<span class=step><b>Pays:</b> 800 G · 30 EXP · Swimming Sandals.</span>"
         + "<span class=step><b>Unlocks:</b> A Big Brother's Fight, which is the branch below.</span>" },
      { id: "c1-04", f: "d", t: "<b>The Broken Watch</b> — Désirée · <b>Shulk must be leading</b>",
        d: "<span class=step><b>Pick up:</b> Désirée, at the <b>Gem Man's Stall</b>. She will not give it to you unless <b>Shulk is the active party leader</b>.</span>"
         + "<span class=step><b>Do:</b> collect <b>3x Blue Chain</b> around Colony 9, then go to the <b>Weapon Development Lab</b> (Shulk's lab) and mend the watch.</span>"
         + "<span class=step><b>Turn in:</b> back to Désirée.</span>"
         + "<span class=step><b>Pays:</b> 750 G · 80 EXP · Muscle Up II.</span>"
         + "<span class=step><b>Why it is flagged:</b> this is step one of the chain to <b>Désirée's Future</b> in Chapter 6, the only source of <b>Shulk's hidden Pessimism skill tree</b>. Miss this and that tree never becomes available.</span>" },

      { k: "branch", t: "A Big Brother's Fight vs A Little Brother's Fight",
        d: "Unlocked by Biscuits for a Grandson. These are mutually exclusive — doing one kills the other permanently.<br><br>"
         + "<b>Take A Little Brother's Fight. Give the pollen to Jiroque</b> (the younger grandson).<br><br>"
         + "Slightly better affinity, and it changes which follow-up quest you receive. Marcia herself is quietly rooting for the younger one." },
      { id: "c1-05", f: "d", t: "<b>A Little Brother's Fight</b> — give the pollen to <b>Jiroque</b>",
        d: "Not A Big Brother's Fight. See the branch note above." },

      { k: "info", t: "The four Challenge quests ARE the Unique Monster fights",
        d: "This trips people up. A <b>Challenge</b> quest's entire objective is <i>kill one named Unique Monster</i>. You are not doing a quest and then separately hunting a monster — they are the same action, and the monster will not be there until you take the quest.<br><br>"
         + "So: take the Challenge, go kill the thing, it auto-completes. Each one also gives every party member an <b>Affinity Coin</b>, which is the currency for Skill Links later." },
      { id: "c1-06", f: "u", t: "<b>Challenge 1</b> → kill <b>Evil Rhangrot</b> (Lv6)",
        d: "<span class=step><b>Pick up:</b> Defence Force Soldier, <b>Military District</b> — the dark alley by the containers to the northeast.</span>"
         + "<span class=step><b>Do:</b> kill Evil Rhangrot near <b>Tephra Hill</b>. It is escorted by two Hand Bunnits. It drops a <b>Gold Chest</b>.</span>"
         + "<span class=step><b>Pays:</b> 1,800 G · +50 Rep · one Affinity Coin for all seven characters.</span>" },
      { id: "c1-07", f: "u", t: "<b>Challenge 2</b> → kill <b>Verdant Bluchal</b> (Lv5)",
        d: "<span class=step><b>Pick up:</b> a Colony 9 Resident in the <b>Commercial District</b> (around Ether Light).</span>"
         + "<span class=step><b>Do:</b> kill Verdant Bluchal on the beach near <b>Anti-Air Battery 1</b>.</span>"
         + "<span class=step><b>Pays:</b> 1,800 G · +50 Rep · Affinity Coin.</span>" },
      { id: "c1-08", f: "u", t: "<b>Challenge 3</b> → kill <b>Lake Magdalena</b> (Lv6) · <b>night only</b>",
        d: "<span class=step><b>Pick up:</b> Defence Force Soldier, <b>Military District</b>.</span>"
         + "<span class=step><b>Do:</b> Lake Magdalena appears <b>only at night</b>, in the pool <b>below Outlook Park</b>. If it is daytime, rest at an inn or wait for the clock.</span>"
         + "<span class=step><b>Pays:</b> 3,000 G · +50 Rep · Affinity Coin.</span>" },
      { id: "c1-09", f: "u", t: "<b>Itinerant Dorothea</b> (Lv6) — free-roaming, no quest needed",
        d: "Cliff Lake, <b>daytime</b>. Not tied to any Challenge — just go and kill it." },

      { k: "weather", t: "Time-of-day targets in Colony 9",
        d: "Two things here need the clock moved, and it is worth doing them in one night trip rather than two:<br>"
         + "<b>Night</b> → Lake Magdalena, in the pool below Outlook Park (Challenge 3).<br>"
         + "<b>Day</b> → Itinerant Dorothea at Cliff Lake.<br><br>"
         + "You cannot set the clock directly this early. Sleep at an inn or just keep questing and it will roll around." },

      { k: "info", t: "These generic quests are flagged timed — but nobody says when they expire",
        d: "Game8 marks the whole Colony 9 generic block (Monster, Challenge, Material, Collection, Search) as <b>timed</b>, meaning they expire at some story point. It does <b>not</b> say which point, and the authoritative missables lists do not mention Colony 9 quests at all.<br><br>"
         + "<b>So treat the expiry as unknown and clear the block in Chapter 1.</b> It costs about an hour. If they turn out to last until Mechonis Core, you lost nothing; if they expire early, you kept three Unique Monsters and a pile of Affinity Coins that are otherwise gone." },
      { id: "c1-10", f: "d", t: "<b>Monster Quests 1-4</b> (all parts) — generic, auto-complete",
        d: "<span class=step><b>Pick up:</b> Defence Force Soldiers at the Fortress Entrance, Colony 9 Residents at Ether Light, and a guard outside Tephra Cave.</span>"
         + "<span class=step><b>Known objectives:</b> Monster Quest 1 — kill Ridge Antois near the water, then a Lv6 Cute Brog that only appears <b>at night</b> by the shore, then 3x Lv9 Colony Krabble at <b>Cliff Lake at night</b>. Monster Quest 4 — kill 1 Willow Bunniv, 2x Lv8 Singing Brog, and 5x Lv5 Meil Lizard, all inside Tephra Cave / the ruins.</span>"
         + "<span class=step><b>Note:</b> several parts are night-only, so fold them into the same night trip as Lake Magdalena.</span>" },
      { id: "c1-11", f: "d", t: "<b>Material Quests 1-4</b> — generic, auto-complete",
        d: "<span class=step><b>Known objectives:</b> Material Quest 2 — a Small Scale from the piranhas in the water below the colony. Material Quest 4 — a Yolkless Flamil Egg from <b>Lake Flamii, near Anti-Air Battery 1</b>.</span>"
         + "<span class=step>These consume the items when they complete, so do not sell anything odd you pick up in Colony 9 until the board is clear.</span>" },
      { id: "c1-12", f: "d", t: "<b>Collection Quests 1-4</b> — generic, auto-complete",
        d: "<span class=step><b>Known objective:</b> Collection Quest 2 — one <b>Plate Snow</b>, from the field outside town. Given by an old man in the northwest of the Commercial District.</span>" },
      { id: "c1-13", f: "d", t: "<b>Search Quests 1-4</b> — generic, auto-complete",
        d: "<span class=step><b>Known objective:</b> Search Quest 1 — find a man's ring, <b>behind Dunban's house</b> in the Commercial District. Given by a man in the central plaza.</span>" },

      { k: "info", t: "Affinity gate reached — 1.25★ quests now appear",
        d: "If the next quest is not showing, go back and finish more of the block above." },
      { id: "c1-14", f: "q", t: "<b>A Young Captain's Request</b> — Emmy Leater · needs <b>1.25★</b>",
        d: "<span class=step><b>Pick up:</b> Emmy Leater, Fortress Entrance.</span>"
         + "<span class=step><b>Do:</b> find <b>Miller</b> in the Commercial District and send him back. He comes quietly.</span>"
         + "<span class=step><b>Turn in:</b> back to Emmy Leater.</span>"
         + "<span class=step><b>Pays:</b> 600 G · 70 EXP · Dyed Top, Dyed Bottoms, Dyed Mules.</span>"
         + "<span class=step><b>Unlocks:</b> A Young Captain's Suffering (Ch3), and eventually A Young Captain's Revival / Trust in Ch17 — <b>Shulk's hidden Bravery skill tree</b>.</span>" },

      { id: "c1-15", f: "q", t: "<b>A Curry Conundrum</b> — Giorgio · needs <b>1.5★</b>",
        d: "<span class=step><b>Pick up:</b> Giorgio, at the Curry Shop, Ether Light.</span>"
         + "<span class=step><b>Do:</b> collect <b>5x Dance Apple</b> around Colony 9.</span>"
         + "<span class=step><b>Turn in:</b> back to Giorgio. He gives you free curry forever after.</span>"
         + "<span class=step><b>Pays:</b> 1,200 G · 60 EXP · Caravan Gauntlets.</span>"
         + "<span class=step><b>Unlocks:</b> Overworked and Underpaid (Ch3).</span>" },
      { id: "c1-16", f: "d", t: "<b>Rocco's Heartful Request</b> — Rocco · needs <b>1.5★</b> · <b>Shulk must be leading</b>",
        d: "<span class=step><b>Pick up:</b> Rocco, at Ether Light.</span>"
         + "<span class=step><b>Do:</b> he needs a broken keepsake repaired. Take the pendant to <b>Dean at the lab</b>. <b>Dean will only accept it if Shulk is the party leader</b> — with anyone else leading he flatly refuses and the quest stalls with no explanation.</span>"
         + "<span class=step><b>Turn in:</b> bring the repaired pendant back to Rocco.</span>"
         + "<span class=step><b>Pays:</b> 350 G · 100 EXP · Tinted Glasses · Pretty Bangle.</span>"
         + "<span class=step><b>Affinity:</b> repairs Rocco and Sonia from Warring Family to <b>Happy Family</b>.</span>"
         + "<span class=step><b>Unlocks:</b> Dean's Shady Request.</span>" },

      { id: "c1-17", f: "q", t: "<b>Pride and Courage</b> — Lukas · needs <b>Lonely Niranira</b> + <b>2★</b>",
        d: "<span class=step><b>Pick up:</b> Lukas, Tranquil Square.</span>"
         + "<span class=step><b>Do:</b> Niranira has gone off alone to <b>Hazzai Cape</b> to get a Krabble shell. Go get him, then speak to <b>Moritz</b> to patch things up.</span>"
         + "<span class=step><b>Turn in:</b> back to Lukas.</span>"
         + "<span class=step><b>Pays:</b> 800 G · 100 EXP · Attack Plus II.</span>"
         + "<span class=step><b>Affinity:</b> makes Moritz, Lukas and Niranira all <b>Best Friends</b> with each other — three links from one quest.</span>"
         + "<span class=step><b>Unlocks:</b> <b>Friendship Tokens</b> (Ch17) = <b>Reyn's hidden Camaraderie skill tree</b>.</span>" },
      { id: "c1-18", f: "q", t: "<b>Dean's Shady Request</b> — Dean · needs <b>Rocco's</b> + <b>2★</b>",
        d: "<span class=step><b>Pick up:</b> Dean, Fortress Entrance. He wants help arranging dinner with Sonia, his first love.</span>"
         + "<span class=step><b>Do:</b> talk to <b>Sonia</b> → she wants <b>2x Shin Gecko</b> from <b>Tephra Cave</b> to settle her kids' argument → bring them back to Sonia.</span>"
         + "<span class=step><b>Turn in:</b> report back to Dean.</span>"
         + "<span class=step><b>Pays:</b> 1,500 G · 200 EXP · Lock-On Resist II.</span>"
         + "<span class=step><b>Unlocks:</b> Liliana's Sincere Request.</span>" },
      { id: "c1-19", f: "q", t: "<b>Liliana's Sincere Request</b> — Liliana · needs <b>Dean's</b> + <b>2.5★</b>",
        d: "<span class=step><b>Pick up:</b> Liliana, Ether Light. She is worried her mother is forgetting her late father now that she is seeing Dean.</span>"
         + "<span class=step><b>Do:</b> get the <b>Message in a Bottle</b> from the small cave at <b>Agora Shore</b>, then take it to <b>Sonia</b>.</span>"
         + "<span class=step><b>Turn in:</b> back to Liliana.</span>"
         + "<span class=step><b>Pays:</b> 4,000 G · 500 EXP · Swimming Oil. Biggest payout in Chapter 1.</span>"
         + "<span class=step><b>Also:</b> this is listed as the trigger for <b>Gentle Rodriguez</b> (Lv40) at the north end of Agora Shore. You cannot beat it at Lv10 — note the spot and come back much later.</span>" },

      { id: "c1-20", f: "h", t: "💜 <b>Shulk &amp; Fiora</b> — Outlook Park, day, Yellow",
        d: "Called <i>Sunrise in the Park</i>. It unlocks during the story when you meet Fiora at Outlook Park, so you will walk into it naturally. The only Heart-to-Heart reachable this chapter — everything else needs affinity you do not have yet.<br><br>"
         + "<b>Missable achievement setup:</b> choose <b>‘You and Dunban...’</b> then <b>‘Kind of.’</b> to make this go as smoothly as possible and earn <b>Heartwarming</b>. On one later Heart-to-Heart, deliberately choose both worst answers to earn <b>Heartbreaking</b>; after those two achievements, use the documented best answers for every remaining scene." },
      { id: "c1-21", f: "m", t: "⛏️ <b>Rainbow Zirconia</b> x3 and <b>Rabbit Diode</b> x3",
        d: "Both are Colony 9 collection-point items, needed much later for <b>Colony 6 Housing 5</b> and <b>Special 5</b>. Rainbow Zirconia also appears in Colony 6 itself, so neither is at risk.<br>Just register them in the Collectopaedia as you pass and <b>do not sell them</b>." },
      { id: "c1-22", f: "x", t: "Touch every landmark in Colony 9 and Tephra Cave",
        d: "Free EXP each, and they unlock Skip Travel points you will use constantly for the collectable farm loop later." }
    ]
  },
  {
    id: "ch2", title: "Chapter 2", subtitle: "Colony 9, Mechon invasion", level: "10-14",
    note: "Short, mostly story. <b>Dunban joins as a guest</b> and is monstrously strong — enjoy it, he leaves. The one thing that matters here is Fiora: <b>she leaves at the end of this chapter and does not come back until Chapter 12</b>.",
    items: [
      { k: "lvl", t: "Sit at 13-14, still no banking needed",
        d: "The chapter is short and the fights are scripted around Dunban carrying you. Nothing to tune yet." },
      { k: "build", t: "Guest Dunban is a preview, not a plan",
        d: "Dunban joins temporarily and shreds everything, which makes this chapter misleading. Do not build habits around him yet — he leaves at the end and does not become permanent until <b>Chapter 5</b>.<br><br>"
         + "<b>What to actually use this chapter:</b> keep practising Break → Topple with Reyn, and start paying attention to <b>Visions</b>. This is where the game starts showing you incoming attacks, and reacting to them is the skill that carries the entire run." },

      { k: "info", t: "🔴 Fiora leaves at the end of this chapter",
        d: "She returns in <b>Chapter 12</b>, ten chapters away. Any Heart-to-Heart involving Fiora above Yellow is blocked until then, and there is nothing you can do about it — her affinity simply cannot build while she is gone.<br><br>"
         + "The one worth attempting now is below. If it does not fire, let it go; it is not missable, just deferred a very long time." },
      { id: "c2-01", f: "h", t: "💜 <b>Reyn &amp; Fiora</b> — Dunban's house, day, Green · <b>try now or wait until Ch12</b>",
        d: "<span class=step><b>Where:</b> inside Dunban's house, Colony 9, during the day.</span>"
         + "<span class=step><b>Needs:</b> Green affinity between Reyn and Fiora. They have only been together since Ch1, so this is tight.</span>"
         + "<span class=step><b>How to force it:</b> run a few fights with both in the party and hit <b>every</b> Burst Affinity prompt. That is the fastest affinity lever in the game and most players ignore it.</span>"
         + "<span class=step>If it will not trigger, move on. It is re-listed in Chapter 13 once she is back.</span>" },

      { k: "info", t: "Time Attack unlocks — start banking Noponstone now",
        d: "After the Mechon attack, the <b>Land of Challenge</b> opens. The first portal is at <b>Leg Pass, in the Tephra Cave area</b>. Portals appear in most major regions from here on.<br><br>"
         + "<b>Why bother this early:</b> Time Attack pays <b>Noponstone</b>, and the Nopon Archsage sells Colony 6 reconstruction materials for it — including the two that come from areas which permanently seal. It is your insurance policy against a mistake in Chapter 14.<br><br>"
         + "<b>How to treat it:</b> run a set whenever you walk past a portal. Do not go out of your way to farm it. You are banking against a future problem, not solving a present one.<br><br>"
         + "Note: you cannot save or Skip Travel while inside the Land of Challenge." },
      { id: "c2-02", f: "x", t: "Find the <b>Leg Pass</b> Time Attack portal in Tephra Cave and run one set" },

      { id: "c2-03", f: "u", t: "UM: <b>Speedy Ramshyde</b> (10) — Cliff Lake. Free-roaming, no quest needed" },
      { id: "c2-04", f: "u", t: "UM: <b>Enchanting Grune</b> (13) — beach east of the Tephra Cave Entrance · <b>5:00 PM only</b>",
        d: "One of only two monsters in the game tied to a specific hour rather than day/night. If the clock is wrong, sleep at an inn and come back — it will not appear otherwise." },
      { id: "c2-05", f: "u", t: "<b>Challenge 4</b> → kill <b>Wallslide Gwynry</b> (Lv9) — <b>only appears now</b>",
        d: "<span class=step><b>Why it is here and not Chapter 1:</b> this quest does not exist until <b>after Reyn obtains the Monado</b>, which happens in this chapter. If you looked for it in Ch1 and could not find it, that is why.</span>"
         + "<span class=step><b>Pick up:</b> a Colony 9 Resident at the <b>Gem Man's Stall</b>. He nearly got eaten by the thing.</span>"
         + "<span class=step><b>Do:</b> kill Wallslide Gwynry inside <b>Tephra Cave</b>. Sources disagree on the exact spot — the quest page says <b>Mag Mell Ruins</b>, the monster list says <b>north of the Escape Pod Bay</b>. Both are in the same stretch of cave; sweep it and you will find it.</span>"
         + "<span class=step><b>Pays:</b> 2,200 G · +50 Rep · one Affinity Coin for all seven characters.</span>"
         + "<span class=step>Completes the set of four Colony 9 Challenges.</span>" }
    ]
  },
  {
    id: "ch3", title: "Chapter 3", subtitle: "Tephra Cave revisited + Colony 9 reopens", level: "14-18",
    note: "The big one for side content. <b>Colony 9 unlocks 13 new quests</b> the moment the Mechon leave, and most of them send you into Tephra Cave, so do the two areas together rather than in sequence. The Lv92-98 Tephra monsters do not exist yet — they appear after Mechonis Core.",
    items: [
      { k: "lvl", t: "Sit at 14-18, still nothing to bank",
        d: "Tephra Cave enemies are Lv8-18 and Colony 9's new quests target the same band. You will drift to about 18 naturally. <b>Do not spend anything yet</b> — the first time the guide asks you to actually set a number is Chapter 4." },
      { k: "build", t: "Party: Shulk (you) / Reyn",
        d: "Fiora has left and Sharla has not joined yet, so this stretch is a forced two-person party. What to actually practise this chapter:<br><br>"
         + "<b>Break → Topple.</b> Reyn's <b>Bone Upper</b> topples anything already Broken. Shulk's <b>Slit Edge</b> breaks. Getting this loop automatic now is what carries you through the whole game — a toppled enemy cannot act.<br>"
         + "<b>Burst Affinity.</b> When a party member shouts, press the button on cue. Free party affinity, and you need a lot of it. Do it every single time.<br>"
         + "<b>Positioning.</b> Most arts hit harder from the side or behind. Shulk's Back Slash roughly doubles from behind." },

      { k: "info", t: "Colony 9's second wave — affinity gates again",
        d: "Same pattern as Chapter 1, new thresholds. Work top down:<br><br>"
         + "<b>No gate</b> → Flattened Flowers · Mementos of a Lost Son · An Impoverished Critic → Financial Planning · The Plan - Preparation<br>"
         + "<b>1.5★</b> → A Young Captain's Suffering<br>"
         + "<b>2★</b> → Romantic Notions of a Girl · The Plan - The Night Before · A Young Captain's Rise · Overworked and Underpaid<br><br>"
         + "All of them require the story beat <i>after the Mechon leave Colony 9</i>, which is this chapter." },

      { id: "c3-01", f: "q", t: "<b>Flattened Flowers</b> — Françoise",
        d: "<span class=step><b>Pick up:</b> Françoise, Tranquil Square.</span>"
         + "<span class=step><b>Do:</b> collect <b>5x Dawn Hydrangea</b> from collection points around Colony 9.</span>"
         + "<span class=step><b>Turn in:</b> back to Françoise.</span>"
         + "<span class=step><b>Pays:</b> 750 G · 100 EXP · Soil Gauntlets · +100 Colony 9 affinity.</span>" },
      { id: "c3-02", f: "q", t: "<b>Mementos of a Lost Son</b> — Cheryl",
        d: "<span class=step><b>Pick up:</b> Cheryl, at the <b>Gem Man's Stall</b>.</span>"
         + "<span class=step><b>Do:</b> find three keepsakes of her missing son — <b>Tatty Armour</b>, <b>Twisted Gun</b>, <b>Nicked Knife</b>, one each.</span>"
         + "<span class=step><b>Turn in:</b> back to Cheryl.</span>"
         + "<span class=step><b>Pays:</b> 4,500 G · 1,500 EXP · Bomber Lancer (empty gem slot) · +200 Colony 9 affinity. One of the best early affinity payouts.</span>" },
      { id: "c3-03", f: "q", t: "<b>An Impoverished Critic</b> — Leopold · auto-chains into Financial Planning",
        d: "<span class=step><b>Pick up:</b> Leopold, Ether Light. King Squeeze is squeezing him over a debt.</span>"
         + "<span class=step><b>Do:</b> talk to <b>King Squeeze</b>. This automatically hands you <b>Financial Planning</b> — the two are one story.</span>"
         + "<span class=step><b>Turn in:</b> it closes when Financial Planning closes.</span>" },

      { k: "branch", t: "Financial Planning — Route A vs Route B",
        d: "You are dragged into this by An Impoverished Critic and must pick a side. Both need <b>5x Caterpile Poison</b> from Caterpiles in Tephra Cave, so gather those first either way.<br><br>"
         + "<b>Route A — side with King Squeeze:</b> talk to Sylviane, get the poison, retrieve the <b>Top-Secret Orders</b> discarded at Central Plaza, show King Squeeze the evidence. Reward <b>Quark Boots</b>.<br>"
         + "<b>Route B — help Leopold:</b> talk to Leopold, get the poison, plant it in King Squeeze's pocket during the meeting, report to Leopold. Reward <b>Ranger Shoes</b>.<br><br>"
         + "Gold and EXP are identical (2,500 G / 500 EXP). The difference is the chart: the routes push Leopold↔King Squeeze toward <i>Complicated</i> or <i>Got Revenge</i>, and Leopold↔Sylviane between <i>Awkward</i> and <i>Endless Love</i>.<br><br>"
         + "<b>Take Route B.</b> <i>Endless Love</i> is a stronger link than <i>Awkward</i>, and you are chasing chart quality, not footwear." },
      { id: "c3-04", f: "q", t: "<b>Financial Planning</b> — take <b>Route B</b>, help Leopold",
        d: "<span class=step><b>Do:</b> talk to Leopold → collect <b>5x Caterpile Poison</b> from Caterpiles in <b>Tephra Cave</b> → plant it in King Squeeze's pocket at the meeting.</span>"
         + "<span class=step><b>Turn in:</b> back to Leopold.</span>"
         + "<span class=step><b>Pays:</b> 2,500 G · 500 EXP · Ranger Shoes.</span>" },

      { id: "c3-05", f: "q", t: "<b>The Plan - Preparation</b> — Sesame (1 of 3)",
        d: "<span class=step><b>Pick up:</b> Sesame, Ether Light.</span>"
         + "<span class=step><b>Do:</b> kill <b>Singing Brogs</b> in Tephra Cave for <b>2x Croaking Brog Bag</b> → back to Sesame → talk to <b>Betty</b> in the Residential District → bring the <b>Sealed Package</b> to Sesame.</span>"
         + "<span class=step><b>Turn in:</b> Sesame, one more time.</span>"
         + "<span class=step><b>Pays:</b> 1,000 G · 150 EXP · Critical Up II · +100 Betty affinity.</span>" },
      { id: "c3-06", f: "q", t: "<b>A Young Captain's Suffering</b> — Emmy Leater · needs <b>1.5★</b>",
        d: "<span class=step><b>Pick up:</b> Emmy Leater, Fortress Entrance. Requires <b>A Young Captain's Request</b> from Ch1.</span>"
         + "<span class=step><b>Do:</b> kill <b>5x Wind Vang</b> in Tephra Cave.</span>"
         + "<span class=step><b>Turn in:</b> back to Emmy Leater.</span>"
         + "<span class=step><b>Pays:</b> 1,100 G · 180 EXP · Ether Def Up III · +150 Miller affinity.</span>" },

      { k: "info", t: "Affinity gate — 2★ quests now open",
        d: "The four below all need <b>2★ Colony 9</b>. If they are not showing, finish the block above first." },

      { k: "branch", t: "Romantic Notions — Girl or Boy (I had this wrong earlier)",
        d: "I previously called this pair harmless. <b>It is not.</b> They are mutually exclusive and they move the Affinity Chart in opposite directions.<br><br>"
         + "<b>Romantic Notions of a Girl</b> (Monica, Fortress Entrance): Monica↔Erik goes <i>Unrequited</i> → <b>Mutual Love?</b>, <b>+250 affinity</b>. Reward Soil Gear.<br>"
         + "<b>Romantic Notions of a Boy</b> (Andreas, Fortress Entrance): Monica↔Andreas becomes <i>Passionate</i>, +200 — but Monica↔Erik <b>degrades to Parted Ways</b>. Reward Soil Boots. Also <b>timed</b>.<br><br>"
         + "<b>Take the Girl version.</b> More affinity, and it is the only one that does not damage an existing link.<br><br>"
         + "<b>Quirk to know:</b> the Boy version only becomes available after the Girl version has been <b>accepted</b>, and it dies the moment you <b>complete</b> the Girl version. So you may see both in your log at once. Just finish Monica's." },
      { id: "c3-07", f: "d", t: "<b>Romantic Notions of a Girl</b> — Monica · needs <b>2★</b> · <b>night</b>",
        d: "<span class=step><b>Pick up:</b> Monica, Fortress Entrance.</span>"
         + "<span class=step><b>Do:</b> get <b>1x Tephra Drop</b> from near the <b>Spring of Grief</b> in Tephra Cave. <b>It only appears at night.</b></span>"
         + "<span class=step><b>Turn in:</b> back to Monica.</span>"
         + "<span class=step><b>Pays:</b> 1,200 G · 300 EXP · Soil Gear · +250 across Monica and Erik.</span>" },
      { id: "c3-08", f: "q", t: "<b>The Plan - The Night Before</b> — Sesame (2 of 3) · needs <b>2★</b> · <b>night</b>",
        d: "<span class=step><b>Do:</b> kill <b>Colony Krabbles at Cliff Lake</b> for <b>2x Iron Krabble Shell</b> — <b>night only</b> → back to Sesame → talk to <b>Kenny Rohan</b> (he wanders, so hunt around) → back to Sesame.</span>"
         + "<span class=step><b>Pays:</b> 1,500 G · 200 EXP · Strength Up III · +150 Colony 9 affinity.</span>" },
      { id: "c3-09", f: "u", t: "<b>The Plan - Execution</b> — Sesame (3 of 3) → spawns <b>Dark Murakmor</b> (18) · <b>night</b>",
        d: "<span class=step><b>Do:</b> kill <b>Dark Murakmor</b> near <b>Anti-Air Battery 3</b> — <b>it only spawns at night</b> → back to Sesame → check the street lights at the Commercial District entrance → stop the plan.</span>"
         + "<span class=step><b>Turn in:</b> Sesame.</span>"
         + "<span class=step><b>Pays:</b> 5,000 G · 1,200 EXP · Attack Stability II · Affinity Coin for all seven.</span>"
         + "<span class=step>The sinister plan turns out to be a fireworks display to cheer the colony up.</span>" },
      { id: "c3-10", f: "q", t: "<b>A Young Captain's Rise</b> — Emmy Leater · needs <b>2★</b>",
        d: "<span class=step><b>Do:</b> pick one — <b>Lurker Brog at the Spring of Grief</b>, or <b>Lurker Krabble at Vilia Lake</b>. Either satisfies it.</span>"
         + "<span class=step><b>Turn in:</b> back to Emmy Leater.</span>"
         + "<span class=step><b>Pays:</b> 1,800 G · 250 EXP · Flame Gear (Blaze Attack slot) · +200 Miller.</span>"
         + "<span class=step><b>Unlocks:</b> A Young Captain's Challenge, and the chain eventually reaches <b>Shulk's Bravery skill tree</b> in Ch17.</span>" },
      { id: "c3-11", f: "q", t: "<b>Overworked and Underpaid</b> — Giorgio · needs <b>2★</b> + <b>A Curry Conundrum</b>",
        d: "<span class=step><b>Pick up:</b> triggers off a Vision of Giorgio collapsing at Ether Light.</span>"
         + "<span class=step><b>Do:</b> either route needs <b>3x Fresh Armu Milk</b> (from Armus in Colony 9) and <b>3x Insanity Mint</b> (Tephra Cave). <b>Route B is better</b> — consult Paola first, then tell Giorgio about her staged fainting scheme. It makes Giorgio↔Paola a <b>Happy Family</b> link; Route A only gives flat area affinity.</span>"
         + "<span class=step><b>Pays:</b> 3,000 G · 300 EXP · HP Up II · Ether Def Up II.</span>"
         + "<span class=step><b>Unlocks:</b> Out-of-Luck Giorgio and Pestering Paola (Ch4).</span>" },
      { id: "c3-12", f: "q", t: "<b>The Lost Pendant</b> — Defence Force Soldier, Cylinder Hangar",
        d: "<span class=step><b>Prerequisite nobody mentions:</b> you must have done <b>Missing in Action</b> first.</span>"
         + "<span class=step><b>Do:</b> find the <b>Lost Pendant</b> near <b>Vilia Lake</b> in Tephra Cave, around the collapsed path.</span>"
         + "<span class=step><b>Turn in:</b> back to the soldier at the Cylinder Hangar.</span>"
         + "<span class=step><b>Pays:</b> 950 G · 100 EXP · Quark Gear · +50 Rep.</span>"
         + "<span class=step>Game8 flags this <b>timed</b> but no source gives the expiry. Do it now.</span>" },

      { k: "weather", t: "Do one night circuit and clear five things at once",
        d: "Chapter 3 is unusually night-heavy. Rather than five separate trips, wait for dusk and do this loop:<br>"
         + "<b>1.</b> Tephra Cave, Spring of Grief — <b>Tephra Drop</b> (Romantic Notions) and <b>Solid Konev</b> (Lv10 UM, just south of it).<br>"
         + "<b>2.</b> Cliff Lake — <b>Colony Krabbles</b> for Iron Krabble Shells (The Plan - The Night Before).<br>"
         + "<b>3.</b> Anti-Air Battery 3 — <b>Dark Murakmor</b> (The Plan - Execution).<br><br>"
         + "You cannot set the clock directly yet, so sleep at an inn or keep questing until it rolls over." },

      { id: "c3-13", f: "u", t: "UM: <b>Mining Patrichev</b> (8) — NE of Caterpile Nest" },
      { id: "c3-14", f: "u", t: "UM: <b>Cellar Bugworm</b> (10) — Caterpile Nest" },
      { id: "c3-15", f: "u", t: "UM: <b>Solid Konev</b> (10) — south of Spring of Grief, <b>night</b>" },
      { id: "c3-16", f: "u", t: "UM: <b>Gluttonous Eugen</b> (11) — Vilia Lake" },
      { id: "c3-17", f: "x", t: "<b>Wallslide Gwynry</b> should already be dead — that was Challenge 4 in Chapter 2",
        d: "Listed only so you notice if you skipped it. If it is still alive: quest from a Colony 9 Resident at the <b>Gem Man's Stall</b>, monster in Tephra Cave around Mag Mell Ruins / north of the Escape Pod Bay." },
      { id: "c3-18", f: "h", t: "💜 <b>Shulk &amp; Reyn</b> — outside Tephra Cave, day, Green",
        d: "They have been together since Chapter 1, so Green should be live by now. If not, spam Burst Affinity prompts for a session and come back." },
      { id: "c3-19", f: "m", t: "⛏️ <b>Steel Silk</b> x2 (Housing 1) — Tephra collection, or trade Peppino in Colony 9" },
      { id: "c3-20", f: "m", t: "⛏️ <b>Dark Grape</b> x2 (Nature 1) — Tephra collection" },
      { id: "c3-21", f: "m", t: "⛏️ <b>Kneecap Rock</b> x1 (Special 1) — Tephra collection" },

      { k: "grind", t: "First real farm stop — learn the Skip Travel loop here",
        d: "You need three Colony 6 materials out of Tephra Cave (Steel Silk ×2, Dark Grape ×2, Kneecap Rock ×1) plus a full Collectopaedia page. This is the ideal place to learn the loop you will use for the next 200 hours:<br><br>"
         + "<b>1.</b> Pick a Tephra Cave landmark with several blue collection sparkles within about thirty seconds of it.<br>"
         + "<b>2.</b> Grab every one of them.<br>"
         + "<b>3.</b> Skip Travel to any other landmark, then Skip Travel straight back.<br>"
         + "<b>4.</b> The points have refilled and the rare slot has re-rolled. Repeat.<br><br>"
         + "Ten cycles is about five minutes. Do not wander the map hunting individual spawns — that is the slow way and it never gets faster." },
      { id: "c3-22", f: "x", t: "Fill the Tephra Cave Collectopaedia page" },

      { k: "info", t: "Two Colony 9 quests you will see but cannot finish yet",
        d: "<b>Paola and Narine</b> (Narine, Tranquil Square) shows up now and pays a startling <b>20,000 EXP</b>. Ignore it for a long while: it requires <b>two female party members</b>, so it is locked until <b>Melia joins in Chapter 7</b>, and on top of that it wants White-tier Shulk↔Reyn affinity and White-tier affinity between the two women. Realistically a Chapter 8+ job. It is re-listed there.<br><br>"
         + "<b>Liliana's Sincere Request</b> is listed as the trigger for <b>Gentle Rodriguez</b> (Lv40) at the north end of Agora Shore. You are Lv18. Note the spot and come back much later." }
    ]
  },
  {
    id: "ch4", title: "Chapter 4", subtitle: "Bionis' Leg", level: "18-25",
    note: "<b>Sharla joins.</b> The biggest material chapter in the game, and the first major deadline: the <b>timed Refugee Camp quest block</b> expires when you complete the Colony 6 relocation. Note that Bionis' Leg quests feed <b>Colony 6's</b> Area Affinity, not Colony 9's.",
    items: [
      { k: "lvl", t: "Guide target — sit at 22",
        d: "<b>This is a recommended Expert Mode target, not a game requirement.</b> Bionis' Leg enemies run Lv15-25 and the Unique Monsters you can realistically take are Lv15-18. Set your level to 22 and leave it there; recruited characters cannot be lowered below their individual join-level floor.<br><br>"
         + "From here on you will out-earn the curve because you are doing every side quest. <b>Bank the surplus, do not spend it.</b> If you let yourself drift to 30 here, the Refugee Camp quests stop giving meaningful EXP, the Unique Monsters become free, and you learn nothing before Chapter 5's difficulty step.<br><br>"
         + "The Lv73-90 monsters wandering Bionis' Leg (Barnaby, Altrich, Valencia, Rotbart, Rockwell, Gonzalez) are <b>post-game</b>. Do not go near them." },
      { k: "build", t: "Sharla joins — swap to Shulk / Reyn / Sharla",
        d: "<b>Reyn tanks, Sharla heals, you damage and control.</b> This is the training-wheels comp and it lasts until Chapter 6.<br><br>"
         + "<b>Sharla:</b> her Talent Art is a <b>Cooldown</b> gauge — she overheats if you spam. Left to the AI she manages it fine; that is why she is an AI slot and not yours.<br>"
         + "<b>Reyn:</b> put <b>War Swing</b> and <b>Bone Upper</b> on his bar. Bone Upper topples anything already Broken.<br>"
         + "<b>Shulk:</b> <b>Back Slash</b> (from behind), <b>Slit Edge</b> (breaks, and drops enemy physical defence), <b>Light Heal</b>. Keep Monado Buster ready.<br><br>"
         + "<b>Gems:</b> you can craft now. Anything <b>Agility Up</b> you find goes on Reyn first — the whole game rewards not being hit. Do not overthink gems this early; slot count matters more than quality." },

      { k: "boss", t: "🔴 Do this before you touch any quest — the Ether Jet",
        d: "The single most time-saving fifteen minutes in the run, and it sits behind a quest giver who <b>may not survive the chapter</b>." },
      { id: "c4-01", f: "d", t: "🔴 <b>World-Changing Whatchamajig</b> — unlocks the <b>Ether Jet</b>. Do it first.",
        d: "<span class=step><b>Pick up:</b> the <b>Nopon Engineer</b> standing near the entrance to the <b>Refugee Camp</b>, Bionis' Leg.</span>"
         + "<span class=step><b>Do:</b> travel to <b>Colony 9's Cylinder Hangar</b>, take the ether cylinders, kill the one weak enemy that interrupts you.</span>"
         + "<span class=step><b>Turn in:</b> back to the Nopon Engineer.</span>"
         + "<span class=step><b>Controls once you have it:</b> <b>ZL+ZR</b> to summon anywhere in the field · <b>B</b> accelerate · <b>ZL</b> brake and reverse · <b>A</b> boost while accelerating.</span>"
         + "<span class=step><b>Why first:</b> the quest giver stands at the Refugee Camp, and the camp closes permanently when you start the relocation next chapter. No source confirms whether this Switch 2 quest dies with it. Doing it now costs fifteen minutes; being wrong later costs the Ether Jet, the entire Nopon Grand Prix and its five armour sets, permanently.</span>" },

      { k: "info", t: "The Refugee Camp deadline — what actually dies",
        d: "Completing <b>The Road Home</b> relocates the refugees to Colony 6 and expires the camp's <b>timed quest block</b>. Finish every task this route flags at the camp before the turn-in; do not read this as a claim that every non-timed Bionis' Leg quest vanishes.<br><br>"
         + "<b>Spiral Valley is a different matter</b> — those quests are out in Bionis' Leg proper and survive. If <i>The Road Home</i> itself expires, <b>To Colony 6!</b> is the mutually exclusive fallback that starts reconstruction." },

      { k: "branch", t: "Spirits Raised vs Imaginations Tempered — and the trick to it",
        d: "Both come from the same situation: Matryona's granddaughter <b>Pama</b> is upset, and two people disagree about how to help her.<br><br>"
         + "<b>Take Spirits Raised</b> (from <b>Arda</b>). Better affinity, it unlocks extra Colony 6 quests later, and narratively it is the one that stops Pama going to the river alone and drowning.<br><br>"
         + "<b>The trick:</b> <code>Spirits Raised</code> does not appear until you have <b>accepted Imaginations Tempered</b>. So take Matryona's quest first, then Arda's, then finish <b>Arda's</b>. Completing Matryona's kills the other one.<br><br>"
         + "Both expire at the relocation regardless." },
      { id: "c4-02", f: "d", t: "🔴 <b>Spirits Raised</b> — Arda · accept <b>Imaginations Tempered</b> first",
        d: "<span class=step><b>Pick up:</b> accept <b>Imaginations Tempered</b> from <b>Matryona</b> at the Refugee Camp, which makes <b>Arda's</b> version appear. Take that one.</span>"
         + "<span class=step><b>Do:</b> collect <b>1x Medicinal Herb</b> near <b>Tranquil Grotto</b> → speak to <b>Arda</b> → go back to <b>Matryona</b> → give the picture book to <b>Pama</b>.</span>"
         + "<span class=step><b>Turn in:</b> <b>Pama</b> — not Arda. The final dialogue is with the girl.</span>"
         + "<span class=step><b>Pays:</b> 800 G · 400 EXP · Arts Heal II · Pama becomes a <i>Kind Person</i> (+150 with Ewan), Arda a <i>Great Person</i>.</span>" },
      { id: "c4-03", f: "d", t: "🔴 <b>Emergency Treatment</b> — Olga · <b>night</b>",
        d: "<span class=step><b>Pick up:</b> Olga, Refugee Camp. You must have met <b>Gorman</b> first.</span>"
         + "<span class=step><b>Do:</b> kill <b>Wisps</b> on Bionis' Leg for <b>5x Glowing Wisp Fluid</b>. <b>Wisps only appear at night.</b></span>"
         + "<span class=step><b>Turn in:</b> back to Olga.</span>"
         + "<span class=step><b>Pays:</b> 750 G · 300 EXP · Quark Gear · +50 Olga.</span>" },
      { id: "c4-04", f: "d", t: "🔴 <b>Thieving Monsters</b> — Gorman",
        d: "<span class=step><b>Pick up:</b> Gorman, Refugee Camp. Tirkins stole the refugees' laundry.</span>"
         + "<span class=step><b>Do:</b> get <b>1x Clothes</b> from <b>Tirkin Headquarters</b>.</span>"
         + "<span class=step><b>Turn in:</b> back to Gorman.</span>"
         + "<span class=step><b>Pays:</b> 950 G · 300 EXP · Grand Armour · Grand Leggings · +50 Rep.</span>" },
      { id: "c4-05", f: "d", t: "🔴 <b>Save the Girl!</b> — surprise quest, cannot be declined",
        d: "<span class=step><b>Triggers:</b> walk to the <b>waterfall southeast of Gaur Plain</b>, near the <b>Volff Lair</b> on the Ragrinar Canyon Path. Available once the story sends you after Juju.</span>"
         + "<span class=step><b>Do:</b> kill <b>4x Ferocious Volff</b> menacing the bathing woman, then talk to her.</span>"
         + "<span class=step><b>Pays:</b> 1,200 G · 300 EXP · Diver Top · Diver Bottoms (empty gem slot) · +50 Rep.</span>" },
      { id: "c4-06", f: "d", t: "🔴 The rest of the Refugee Camp board — <b>19 more quests</b>",
        d: "<span class=step><b>Named, from the camp:</b> Being a Good Grandfather (Satata) · A Thoughtful Idea (Matryona) · A Dash of Colour (Ewan) · The Greedy Monster (Satata) · <b>Earnest's Fibs → Earnest's Mischief → Earnest's Solitude</b> (Earnest, a three-part chain worth 2,950 G and a Grand Boots).</span>"
         + "<span class=step><b>Generic, auto-complete:</b> Monster Quest 2 · Monster Quest 3 Parts 1-2 · Challenge 1 Parts 1-2 · Challenge 2 Parts 1-2 · Material Quest 1-4 · Collection Quest 1-2 · Search Quest 1-2.</span>"
         + "<span class=step><b>All of it dies at the relocation.</b> The generic ones auto-complete in the field, so take every one before you go monster hunting and they will tick off as you go.</span>" },

      { k: "info", t: "The four Challenge parts are Unique Monster fights again",
        d: "Same rule as Colony 9. Take them from the Refugee Camp before you hunt, or the monsters will not be there:<br>"
         + "<b>Challenge 1 Part 1</b> → White Eduardo · <b>Challenge 1 Part 2</b> → Violent Andante<br>"
         + "<b>Challenge 2 Part 1</b> → Trainer Harmelon · <b>Challenge 2 Part 2</b> → Vagrant Alfead" },
      { id: "c4-07", f: "u", t: "UM: <b>Sniper Paramecia</b> (15) — southwest of Gaur Plain. Free-roaming" },
      { id: "c4-08", f: "u", t: "UM: <b>Trainer Harmelon</b> (15) — east of Zax Guidepost · <b>Challenge 2 Part 1</b>" },
      { id: "c4-09", f: "u", t: "UM: <b>Violent Andante</b> (16) — near Raguel Lake, Viliera Hill · <b>Challenge 1 Part 2</b>" },
      { id: "c4-10", f: "u", t: "UM: <b>Vagrant Alfead</b> (16) — Tirkin Headquarters · <b>Challenge 2 Part 2</b>",
        d: "Same building as the Thieving Monsters clothes. Do both in one trip." },
      { id: "c4-11", f: "u", t: "UM: <b>White Eduardo</b> (17) — island in Raguel Lake · <b>thunderstorm only</b> · Challenge 1 Part 1" },
      { id: "c4-12", f: "u", t: "UM: <b>Napping Volfen</b> (17) — eastern Gaur Plain · <b>rain or thunderstorm</b>" },
      { id: "c4-13", f: "u", t: "UM: <b>Night Cardamon</b> (18) — near Kasharpa Falls · <b>night, and not raining</b>" },
      { id: "c4-14", f: "u", t: "UM: <b>Clifftop Bayern</b> (32) — Daksha Shrine",
        d: "Fourteen levels above you. Either skip it and come back, or bring it down with a full Break → Topple → Daze lock. Your call — it is not going anywhere." },

      { k: "weather", t: "Bionis' Leg is the worst weather chapter. Plan two trips, not six",
        d: "<b>Trip 1 — a thunderstorm.</b> Wait for one rather than chasing it, then in a single storm clear:<br>"
         + "· <b>White Eduardo</b>, island in Raguel Lake (Challenge 1 Part 1)<br>"
         + "· <b>Napping Volfen</b>, eastern Gaur Plain (rain also works)<br>"
         + "· <b>Aqua Nebula</b> for the <b>Light Rain Element</b> — Colony 6 Special 1. <b>Thunderstorm only, nothing else drops it.</b><br><br>"
         + "<b>Trip 2 — one night.</b><br>"
         + "· <b>Wisps</b> for 5x Glowing Wisp Fluid (Emergency Treatment)<br>"
         + "· <b>Night Cardamon</b> near Kasharpa Falls — needs night <b>and</b> clear skies, so do it on a dry night, not the storm night.<br><br>"
         + "Everything else here is weather-independent." },

      { k: "grind", t: "Ten Colony 6 materials live here. Clear them now, not at Lv85",
        d: "Bionis' Leg carries more of the Colony 6 bill than any other area. None of it is on a deadline — the area is permanent — but these are ordinary Lv15-25 enemies you are fighting anyway. Coming back at level 85 to farm them is an hour you throw away.<br><br>"
         + "<b>Do not sell any of these.</b> Check the ten items below off as you go." },
      { id: "c4-15", f: "m", t: "⛏️ <b>Spotted Volff Hide</b> ×2 — Housing 1. Kill Volff (everywhere)" },
      { id: "c4-16", f: "m", t: "⛏️ <b>Sharp Hox Spur</b> ×2 — Nature 1. Kill Hox near <b>Jabos Rock Rest Area</b>" },
      { id: "c4-17", f: "m", t: "⛏️ <b>Gogol Horn</b> ×3 — Housing 5. Kill Gogols near <b>Raguel Bridge</b>" },
      { id: "c4-18", f: "m", t: "⛏️ <b>Hox Daylight Spur</b> ×3 — Nature 4. Kill Dark or White Hox <b>under Raguel Bridge</b>" },
      { id: "c4-19", f: "m", t: "⛏️ <b>Ardun Elder Beard</b> ×3 — Nature 5. Kill Magnis Ardun near <b>Rho Oasis</b>" },
      { id: "c4-20", f: "m", t: "⛏️ <b>Tokilos King Egg</b> ×1 — Nature 5. Kill <b>Leg Tokilos</b> near <b>Zax Guidepost</b>" },
      { id: "c4-21", f: "m", t: "⛏️ <b>Hill Firefly</b> ×4 — Commerce 5. Bionis' Leg collection points" },
      { id: "c4-22", f: "m", t: "⛏️ <b>Light Rain Element</b> ×1 — Special 1. <b>Aqua Nebula, thunderstorm only</b>" },
      { id: "c4-23", f: "m", t: "⛏️ <b>Vang Star Wing</b> ×2 — Housing 5. Tempest Vang in <b>Windy Cave</b>" },
      { id: "c4-24", f: "m", t: "⛏️ <b>Caterpile Silk</b> ×3 — Nature 4. Royal Caterpile in <b>Windy Cave</b>",
        d: "Same cave as the Vang Star Wings. One trip covers both." },

      { k: "info", t: "Spiral Valley — a separate chain that does NOT expire",
        d: "Out in Bionis' Leg proper, given by Nopon near <b>Zax Guidepost</b>. These survive the relocation, so if you are short on time before Chapter 5, sacrifice these and not the camp." },
      { id: "c4-25", f: "q", t: "<b>The Lost Nopon</b> — Gerugu, Spiral Valley",
        d: "<span class=step><b>Pays:</b> 750 G · 300 EXP · Point Rifle · +50 Colony 6 affinity.</span>"
         + "<span class=step>First link of the chain below.</span>" },
      { id: "c4-26", f: "q", t: "<b>With Much Gratitude</b> — Batubatu, Spiral Valley",
        d: "<span class=step><b>Pays:</b> 1,000 G · 450 EXP · Spike II · +100 affinity.</span>" },
      { id: "c4-27", f: "q", t: "<b>With Even More Gratitude</b> — Gerugu, Spiral Valley",
        d: "<span class=step><b>Pays:</b> 1,200 G · 750 EXP · Grand Gear · Electric Plus III · +150 affinity.</span>"
         + "<span class=step><b>Then talk to Pachipa</b> — that hands you <code>It Definitely Exist!</code>, which is the gate on the quest below.</span>" },
      { id: "c4-28", f: "q", t: "<b>Legend of Mythical Empress</b> — Gerugu · needs <b>3.5★ Colony 6</b>",
        d: "<span class=step><b>Prerequisites:</b> <code>With Even More Gratitude</code> and <code>It Definitely Exist!</code> (from Pachipa), plus <b>3.5★ Colony 6 Area Affinity</b>. That is high for this chapter — you may not clear it until after the relocation, which is fine because Spiral Valley does not expire.</span>"
         + "<span class=step><b>Do:</b> kill the <b>Mythical Empress</b>, enraged near her nest after something killed her child.</span>"
         + "<span class=step><b>Turn in:</b> back to Gerugu.</span>"
         + "<span class=step><b>Pays:</b> 6,500 G · 3,000 EXP · Haste II · +200 Rep. Biggest single payout available this chapter.</span>" },

      { id: "c4-29", f: "h", t: "💜 <b>Shulk &amp; Sharla</b> — Raguel Bridge North, day, Green",
        d: "Sharla just joined, so give it an hour of party time and Burst Affinity prompts before you try." },
      { id: "c4-30", f: "d", t: "🔴 💜 <b>Reyn &amp; Sharla</b> — Refugee Camp interior, day, Green",
        d: "In the camp, so treat it as on the deadline even though Heart-to-Hearts are generally not missable. Do it before the relocation and the question never comes up." },
      { id: "c4-31", f: "d", t: "🔴 Fill the <b>Refugee Camp</b> Collectopaedia entries before the relocation" },
      { k: "info", t: "Two Bionis' Leg Heart-to-Hearts you cannot reach yet",
        d: "<b>Shulk &amp; Dunban</b> at Believer's Paradise needs Purple, and <b>Dunban &amp; Sharla</b> at Rho Oasis needs Pink. Dunban does not even join permanently until Chapter 5. They are pinned to Chapter 8 and the post-game respectively." }
    ]
  },
  {
    id: "ch5", title: "Chapter 5", subtitle: "Colony 6 and Ether Mine", level: "25-32", lock: "Xord seals half the Ether Mine",
    note: "<b>Dunban becomes permanent.</b> One hard deadline here — <b>Xord</b> seals half the Ether Mine. The Refugee Camp relocation is <b>Chapter 6</b>, not this one, so you have more room than most guides imply.",
    items: [
      { k: "lvl", t: "Set level to 28",
        d: "Ether Mine runs Lv20-29 and Colony 6's monsters sit around 19-25. <b>28 keeps Xord honest</b> without trivialising him.<br><br>"
         + "You should now be visibly banking EXP — if your bank is empty you are spending it, which is the one mistake this policy exists to prevent. Check the menu." },
      { k: "build", t: "Dunban is permanent now — start the handover",
        d: "Swap to <b>Shulk / Dunban / Sharla</b> and retire Reyn from the active party.<br><br>"
         + "<b>Why now:</b> Dunban is an <b>evasion tank</b>, and he needs time in the party for his Agility skills and affinity to build before he becomes the wall he ends up as. Starting him now means he is ready when the difficulty steps up.<br>"
         + "<b>Prioritize Agility Up on Dunban</b> until he reliably evades. Reserve enough Agility Up or Night Vision for your controlled attacker to hit consistently when fighting above its level.<br>"
         + "<b>Dunban's arts:</b> <b>Gale Slash</b>, <b>Blossom Dance</b>, <b>Serene Heart</b> (big evasion buff — the AI uses it well). Use <b>Steel Strike</b> to Topple an enemy after Break. Tempest Kick is a later Lv32 buff-removal art, not a Topple.<br>"
         + "<b>Skill tree:</b> spend his AP on the agility and evasion branches first. This is the highest-return AP in the entire game.<br><br>"
         + "Keep Reyn levelled — he is fine — but Dunban is the tank from here to the end." },

      { k: "boss", t: "🔴 Xord — and what he takes with him",
        d: "Beating Xord permanently seals the <b>Central Pit</b>, roughly half the Ether Mine. Finish the four items below <b>before</b> you fight him.<br><br>"
         + "<b>The fight itself:</b> he is a Mechon, so ordinary attacks bounce. You need <b>Monado Enchant</b> up on the party — that is the entire gimmick. Refresh it when it lapses and he is a normal fight." },
      { id: "c5-01", f: "d", t: "🔴 Before Xord — UM: <b>Dark Kisling</b> (20), east of Central Terminal" },
      { id: "c5-02", f: "d", t: "🔴 Before Xord — UM: <b>Vengeful Daulton</b> (22), east of Test Pit 4" },
      { id: "c5-03", f: "d", t: "🔴 Before Xord — ⛏️ <b>Ready Coil</b> ×2 (Commerce 2) and <b>Black Beetle</b> ×2 (Nature 5)",
        d: "Both from Ether Mine collection points. Run the Skip Travel loop off the nearest landmark until you have all four." },
      { id: "c5-04", f: "d", t: "🔴 Before Xord — fill the <b>Ether Mine</b> Collectopaedia page" },
      { k: "info", t: "⚠️ Elegant Marin — a timing trap worth checking yourself",
        d: "<b>Elegant Marin</b> (Lv29) sits near <b>Glowmoss Lake</b> in the Ether Mine and only spawns via the quest <code>What is Courage?!</code> — which comes from Ewan at the Colony 6 Reconstruction HQ and, per the quest lists, does not appear until <b>Chapter 6</b>.<br><br>"
         + "That is after Xord. <b>If Glowmoss Lake happens to be inside the sealed Central Pit, this Unique Monster is unobtainable.</b> No source addresses it either way.<br><br>"
         + "<b>What to do:</b> before you fight Xord, walk to Glowmoss Lake and note where it sits relative to the Central Pit. Then when <code>What is Courage?!</code> appears in Chapter 6, go straight back and check access. If it is sealed, you have lost one Affinity Coin and nothing else — but you will know rather than wonder." },

      { k: "info", t: "Watchpoint Junction — three quests from Daza, one timed",
        d: "On the road between Bionis' Leg and Colony 6. Easy to blow past." },
      { id: "c5-05", f: "q", t: "<b>Proof of Status</b> — Daza, Watchpoint Junction",
        d: "<span class=step><b>Pays:</b> 850 G · 320 EXP · Break II · +50 Rep.</span>" },
      { id: "c5-06", f: "q", t: "<b>Safety First</b> — Daza, Watchpoint Junction",
        d: "<span class=step><b>Pays:</b> 900 G · 400 EXP · Pelt Bottoms · Pelt Top · +50 Rep.</span>" },
      { id: "c5-07", f: "d", t: "🔴 <b>Secret Mission</b> — Daza, Watchpoint Junction · <b>timed</b>",
        d: "<span class=step><b>Pays:</b> 1,000 G · 500 EXP · Slow III · <b>Top-Secret Data</b> · +150 Rep.</span>"
         + "<span class=step>Flagged timed by Game8 with no stated expiry. Do it while you are passing.</span>" },

      { k: "info", t: "Colony 6 opens — and reconstruction is a 200-hour background task",
        d: "You are about to be handed the largest single project in the game. Two numbers to hold onto:<br><br>"
         + "<b>~2,000,000 G total</b> across all four categories at Level 5. Gold is the wall here, not materials.<br>"
         + "<b>Four categories</b> — Housing, Commerce, Nature, Special — each 0 to 5.<br><br>"
         + "<b>Build order: Housing to 3, then Nature to 3.</b> Nearly every resident gates on a Housing level, and Housing 3 + Nature 3 is exactly what unlocks <b>Berryjammy</b>, who is a hard prerequisite for both Minana and Gowago later and who trades <b>Lewisia Silver</b>, one of the materials from an area that dies.<br><br>"
         + "<b>Do not push any category to Level 5 yet.</b> Three of the four Level 5 tiers want materials from areas you have not reached, some of which close." },
      { id: "c5-08", f: "x", t: "<b>Begin reconstruction: Housing → 3, then Nature → 3</b>" },
      { id: "c5-09", f: "u", t: "UM: <b>Graceful Holand</b> (19) — NE of Drainage Outlet · <b>rain or thunderstorm</b>" },
      { id: "c5-10", f: "u", t: "UM: <b>Drifter Jutard</b> (25) — Pod Depot" },
      { id: "c5-11", f: "m", t: "⛏️ <b>Amblygon Turtle</b> ×2 — Commerce 1. Colony 6 collection, or trade Arda in Colony 6" },
      { k: "grind", t: "Colony 6's collection points are your permanent safety net",
        d: "Worth understanding now rather than in Chapter 14. Colony 6 <b>never closes</b>, and its own collection points also yield <b>Rainbow Zirconia</b>, <b>Retro Diode</b>, <b>Black Styrene</b> and <b>Fortune Feather</b> — every one of which otherwise comes from an area that permanently seals.<br><br>"
         + "So if you miss one of those in Agniratha, Mechonis Field or Central Factory later, you are not soft-locked. Come back here and farm it. Set up a Skip Travel loop off the Colony 6 landmark whenever you are passing through." },

      { k: "branch", t: "Perrine vs Mefimefi — your first exclusive resident",
        d: "Both come from Colony 9. Inviting one permanently excludes the other.<br><br>"
         + "<b>Perrine:</b> needs Housing 3 + Commerce 2 + Nature 2 + Special 2.<br>"
         + "<b>Mefimefi:</b> needs only Housing 3 + Special 2, and unlocks <code>Nopon Determination</code> in Ch17 which pays far more (48,000 G / 72,000 EXP vs 16,000 / 9,100).<br><br>"
         + "<b>Route recommendation: take Perrine.</b> <code>Homs Determination</code> requires the defeat of <b>Territorial Rotbart</b> (Lv81) on Gaur Plain, so this route keeps that Unique Monster objective visible in the late-game checklist. It does <b>not</b> claim that the quest spawns Rotbart or makes its Affinity Coin exclusive. Choose Mefimefi instead only if you prefer <code>Nopon Determination</code>'s larger reward; the resident and their quest are an irreversible branch.<br><br>"
         + "You are building all four categories to 5 regardless, so Perrine's harder gate costs you nothing but time." },
      { id: "c5-12", f: "d", t: "<b>Choose the Perrine path</b> (route recommendation) <b>or Mefimefi reward path</b> — exclusive Colony 6 branch" },

      { id: "c5-13", f: "d", t: "🔴 💜 <b>Reyn &amp; Dunban</b> — Refugee Camp, lake area, day, Green",
        d: "<span class=step><b>Why it is flagged:</b> it needs <b>Dunban in the party</b>, which only happens now, and the Refugee Camp closes when you start <code>The Road Home</code>. That quest is Chapter 6, so you have this chapter plus part of the next — wider than it looks, but do not sit on it.</span>"
         + "<span class=step>If Dunban and Reyn are not Green yet, run a few fights with both in the party and hit every Burst Affinity prompt.</span>" },

      { k: "info", t: "Nopon Grand Prix unlocks — Switch 2 content",
        d: "Opens after the <b>Metal Face encounter</b> here, provided you did <code>World-Changing Whatchamajig</code> in Chapter 4. Access it from the <b>main menu with Y</b> — you do not have to travel to the tracks.<br><br>"
         + "<b>Full completion is all 70 clears</b> (5 tracks × 7 characters × 2 modes), which grants a permanent Ether Jet acceleration and boost bonus. That is a long tail — run each track as it unlocks rather than saving them all for the end." },
      { id: "c5-14", f: "g", t: "🏁 <b>Bionis' Leg pair</b> — Caterpile Circuit (Score Attack) and Twilight Speedway (Battle Race)",
        d: "First clear of each gives a character-specific <b>head</b> armour piece. Rewards Noponstone scaled to your rank." },
      { k: "info", t: "Two Colony 6 branches that are NOT this chapter",
        d: "Correcting a mistake in an earlier version of this guide:<br><br>"
         + "<b>Miss Sweetness Showdown</b> (Berryjammy vs Ma'crish) is <b>Chapter 10</b>. It needs 3.5★ Colony 6 and a five-quest Cook-Off chain first.<br>"
         + "<b>The Melody of Happiness vs Dream of a Poet</b> is <b>Chapter 14</b>, and it needs <code>In Pursuit of Love</code> from Rosemary in Chapter 13 first.<br><br>"
         + "Both are re-listed in their proper chapters. Do not go looking for them now." }
    ]
  },
  {
    id: "ch6", title: "Chapter 6", subtitle: "Satorl Marsh, Colony 6 rebuilds, Bionis' Interior", level: "32-38", lock: "The Road Home ends the Refugee Camp",
    note: "Dense chapter. The Colony 6 Reconstruction HQ opens a long quest chain, Satorl Marsh has two substantial Nopon chains, and <b>this is where the relocation happens</b> — which kills the Refugee Camp for good.",
    items: [
      { k: "lvl", t: "Set level to 35",
        d: "Satorl Marsh runs Lv25-31 and the Colony 6 quests target similar. 35 gives you headroom for the Lv33 quest-exclusive monsters without trivialising anything.<br><br>"
         + "<b>Do not</b> chase Immovable Gonzalez (Lv90) in Spiral Valley. He is post-game and there is a way around him — see the For the Restoration note." },
      { k: "build", t: "Satorl Marsh at night is a different area",
        d: "Worth knowing before you plan anything here: <b>Satorl Marsh transforms at night</b>, lighting up with glowing trees. It is not cosmetic — visibility and navigation change completely, and one Heart-to-Heart requires it.<br><br>"
         + "<b>Combat:</b> Igna enemies here hit hard for the level. Keep Dunban tanking and use Shulk's <b>Monado Speed</b> on him — you should be leaning on it reflexively by now." },

      { k: "info", t: "🔴 The relocation happens this chapter — order matters",
        d: "Completing <b><code>The Road Home</code></b> moves the refugees to Colony 6 and expires every unfinished <b>timed Refugee Camp quest</b>. Non-timed Bionis' Leg content is not universally deleted.<br><br>"
         + "<b>So: finish every route-flagged Refugee Camp task from Chapter 4 BEFORE you complete The Road Home.</b> Go back and check your log now, not after.<br><br>"
         + "<b>Do not delay it either.</b> If The Road Home itself expires, <code>To Colony 6!</code> is the mutually exclusive reconstruction fallback, but it does not appear until Chapter 13." },
      { id: "c6-01", f: "d", t: "🔴 <b>The Road Home</b> — Otharon, Colony 6 Main Entrance · <b>ends the Refugee Camp</b>",
        d: "<span class=step><b>Do first:</b> confirm every Chapter 4 route-flagged timed Refugee Camp quest is closed.</span>"
         + "<span class=step><b>Do:</b> kill <b>6x Black Smoke Hox</b> (Lv30, quest-exclusive) at <b>Raguel Bridge South</b> on Bionis' Leg → <b>6x White Smoke Hox</b> (Lv32) spawn in the same spot, kill those → talk to <b>Juju</b>.</span>"
         + "<span class=step><b>Turn in:</b> Juju, at the Refugee Camp.</span>"
         + "<span class=step><b>Pays:</b> 3,200 G · 550 EXP · +100 Rep · EXP Up I · AP Up I.</span>" },

      { k: "info", t: "The Colony 6 HQ chain — one long thread, do it in order",
        d: "Almost everything at the Reconstruction HQ is a single sequence. Out of order, quests simply will not appear:<br><br>"
         + "<b>What is Love?!</b> → <b>What is Courage?!</b> (1.25★) → <b>Matryona's Answer</b> (2★)<br>"
         + "<b>Satata's Younger Brother</b> → <b>Rest in Peace</b> (1.5★)<br>"
         + "<b>Making a New Path</b> → <b>For the Restoration</b> ← do these in this order, it matters, see below<br>"
         + "Standalone: A Selfish Girl's Mistake (1.5★) · Chemist's Reopening" },
      { k: "branch", t: "🔴 Why Spirits Raised in Chapter 4 mattered more than I said",
        d: "Back in Chapter 4 I told you to take <code>Spirits Raised</code> over <code>Imaginations Tempered</code> for better affinity. The real reason is much bigger:<br><br>"
         + "<b><code>What is Love?!</code> requires that <code>Imaginations Tempered</code> was NOT completed.</b><br><br>"
         + "If you finished Matryona's version instead of Arda's, the entire Ewan/Matryona chain — What is Love?!, What is Courage?!, Matryona's Answer — <b>never becomes available.</b> That is three quests, an Affinity Chart romance outcome, and a Unique Monster gone from one choice two chapters ago.<br><br>"
         + "<b>There is a second trap in the same thread.</b> If you collected the <b>Lake Drop</b> during Imaginations Tempered but never delivered it before the relocation, that Lake Drop is gone permanently, and <code>Matryona's Answer</code> is forced onto Route B (the rejection ending). Conversely, if a Lake Drop is already in your inventory when you accept, Route A fires automatically." },
      { id: "c6-02", f: "q", t: "<b>What is Love?!</b> — Ewan, Reconstruction HQ",
        d: "<span class=step><b>Requires:</b> <code>Imaginations Tempered</code> was <b>not</b> completed. If it was, this quest does not exist.</span>"
         + "<span class=step><b>Do:</b> talk to four Colony 6 residents about love — <b>Olga</b>, <b>Gorman</b>, <b>Anna</b>, <b>Satata</b>.</span>"
         + "<span class=step><b>Turn in:</b> Ewan.</span>"
         + "<span class=step><b>Pays:</b> 3,500 G · 620 EXP · +50 Rep · Bleed Defence III.</span>" },
      { id: "c6-03", f: "u", t: "<b>What is Courage?!</b> — Ewan · needs <b>1.25★</b> · spawns a Unique Monster",
        d: "<span class=step><b>Do:</b> escort Ewan and kill one of two targets. <b>Route A: Elegant Marin</b> (Lv29 Unique Monster, Ether Mine, Glowmoss Lake, any time or weather). <b>Route B: Hungry Volff</b> (Lv33, quest-exclusive, Satorl Marsh near the Glowing Obelisk).</span>"
         + "<span class=step><b>Take Route A.</b> Rewards are identical either way, but Elegant Marin is a <b>Unique Monster</b> — an Affinity Coin for all seven characters. Hungry Volff is quest-exclusive filler.</span>"
         + "<span class=step><b>Then:</b> protect Ewan on the trip and talk to him twice.</span>"
         + "<span class=step><b>Pays:</b> 3,700 G · 650 EXP · +100 Rep · Daze Tension III.</span>"
         + "<span class=step>This resolves the Chapter 5 worry about Elegant Marin: it spawns any time and Glowmoss Lake is reachable after Xord.</span>" },
      { k: "branch", t: "Matryona's Answer — Lake Drop or Nasty Weed",
        d: "<b>Route A (Lake Drop, near Raguel Lake on Bionis' Leg):</b> Matryona accepts Ewan. Reward <b>Blaze Attack II</b>.<br>"
         + "<b>Route B (Nasty Weed, east of the Crown Tree in Satorl Marsh):</b> she paints a deliberately unflattering portrait to reject him. Reward <b>Blaze Defence III</b>.<br><br>"
         + "<b>Take Route A.</b> Gold, EXP and reputation are identical (4,500 G / 700 EXP / +150). The difference is the outcome, and the positive one is the recommended route.<br><br>"
         + "The Nasty Weed does not even spawn until the quest reaches that step, so if you want Route A just make sure you are carrying a Lake Drop when you accept." },
      { id: "c6-04", f: "q", t: "<b>Matryona's Answer</b> — Matryona · needs <b>2★</b> · take <b>Route A</b>",
        d: "<span class=step><b>Do:</b> collect a <b>Lake Drop</b> near <b>Raguel Lake</b>, Bionis' Leg → talk to Matryona → deliver the portrait to <b>Ewan</b> → return to Matryona.</span>"
         + "<span class=step><b>Pays:</b> 4,500 G · 700 EXP · +150 Rep · Blaze Attack II.</span>" },
      { id: "c6-05", f: "q", t: "<b>A Selfish Girl's Mistake</b> — Anna · needs <b>1.5★</b> · cannot be declined",
        d: "<span class=step><b>Do:</b> find <b>Nikita</b> on the <b>Splintered Path</b> (south of Colony 6), then find <b>Kiroki</b> in the <b>Drainage Control Room</b> of the Ether Mine.</span>"
         + "<span class=step><b>Turn in:</b> Anna.</span>"
         + "<span class=step><b>Pays:</b> 4,200 G · 680 EXP · +100 Rep · Pierce Resist II.</span>"
         + "<span class=step><b>Affinity:</b> creates two <b>Friends Always</b> links — Kiroki↔Nikita and Anna↔Nikita. Good chart value for one quest.</span>" },
      { id: "c6-06", f: "q", t: "<b>Chemist's Reopening</b> — Olga",
        d: "<span class=step><b>Do:</b> 1x <b>Chewy Radish</b> (Colony 9), 2x <b>Red Durian</b> (Bionis' Leg), 1x <b>Sirius Anemone</b> (Colony 6 collection points — 12 of them, low drop rate, so run the Skip Travel loop).</span>"
         + "<span class=step><b>Pays:</b> 3,600 G · 620 EXP · +50 Rep · Recovery Up II.</span>" },
      { id: "c6-07", f: "q", t: "<b>Satata's Younger Brother</b> — Satata",
        d: "<span class=step><b>Do:</b> collect 1x <b>Mushroom Cap</b> at the <b>Mining Base</b> in the Ether Mine.</span>"
         + "<span class=step><b>Pays:</b> 4,200 G · 700 EXP · +50 Rep · Iron Armour · Iron Leggings.</span>" },
      { id: "c6-08", f: "q", t: "<b>Rest in Peace</b> — Satata · needs <b>1.5★</b>",
        d: "<span class=step><b>Do:</b> go to the <b>Divine Sanctuary in Makna Forest</b>, stand where <b>Great Makna Falls is fully visible</b>, and throw the Mushroom Cap.</span>"
         + "<span class=step><b>Turn in:</b> Satata.</span>"
         + "<span class=step><b>Pays:</b> 6,500 G · 850 EXP · +100 Rep · Jungle Shoes.</span>"
         + "<span class=step>Needs Makna Forest, so it completes in Chapter 7.</span>" },

      { k: "info", t: "⚠️ Do Making a New Path BEFORE For the Restoration — it skips a Lv90 monster",
        d: "<code>For the Restoration</code> sends you for a <b>Divine Rock</b> at the peak of <b>Spiral Valley</b>. The direct route is blocked by <b>Immovable Gonzalez</b>, a <b>Level 90</b> Unique Monster that spawns there once the refugees leave. At Lv35 that is not a fight, it is a wall.<br><br>"
         + "<b><code>Making a New Path</code> is the answer.</b> Do it first and Gorman blasts an alternative route, letting you finish For the Restoration without touching Gonzalez.<br><br>"
         + "<b>Both expire when Colony 6 reconstruction is completed</b> — an unusual trigger. If you are an efficient rebuilder you can accidentally lock yourself out of two quests by finishing the colony too fast. Do them early." },
      { id: "c6-09", f: "d", t: "🔴 <b>Making a New Path</b> — Gorman · <b>do this before For the Restoration</b>",
        d: "<span class=step><b>Do:</b> collect <b>3x Dynamite</b> in the Ether Mine — one in the dead end <b>south of Test Pit 2</b>, one in the dead end <b>just south of Test Pit 3</b>, one <b>slightly east of Test Pit 4</b>.</span>"
         + "<span class=step><b>Turn in:</b> Gorman.</span>"
         + "<span class=step><b>Pays:</b> no gold or EXP published on any source — the reward is functional: Gorman opens the Spiral Valley route.</span>"
         + "<span class=step><b>Expires</b> when reconstruction is complete.</span>" },
      { id: "c6-10", f: "d", t: "🔴 <b>For the Restoration</b> — Gorman",
        d: "<span class=step><b>Do:</b> collect 1x <b>Divine Rock</b> at the peak of <b>Spiral Valley</b>, Bionis' Leg — via Gorman's new path, not past Gonzalez.</span>"
         + "<span class=step><b>Pays:</b> 4,400 G · 680 EXP · +150 Rep · Spike III.</span>"
         + "<span class=step><b>Expires</b> when reconstruction is complete.</span>" },

      { k: "info", t: "Satorl Marsh — two Nopon chains worth real money",
        d: "The marsh has more side content than its reputation suggests. Two sequential chains, plus four one-off monster quests.<br><br>"
         + "<b>Zazadan chain</b> — giver stands at the <b>Glowing Obelisk</b>. Six quests, strictly in order.<br>"
         + "<b>Bokoko / Kacha chain</b> — givers at the <b>Nopon Merchant Camp</b>. Four quests." },
      { id: "c6-11", f: "q", t: "<b>Preventing Starvation</b> — Zazadan (1 of 6)",
        d: "<span class=step><b>Do:</b> 2x <b>Twin Flamii Egg</b> (from Flamii) and 5x <b>Lemon Stone</b>, both in Satorl Marsh.</span>"
         + "<span class=step><b>Pays:</b> 2,400 G · 400 EXP · +100 Rep · Mist Gel, Mist Cream, Mist Sandals.</span>" },
      { id: "c6-12", f: "q", t: "<b>Zazadan in Danger</b> — Zazadan (2 of 6)",
        d: "<span class=step><b>Do:</b> kill <b>8x Ogre Bunnia</b> in Satorl Marsh. Convenient — Ogre Bunnia also drop <b>Bunnia Scent Wood</b>, which Colony 6 Housing 2 wants ×4.</span>"
         + "<span class=step><b>Pays:</b> 3,200 G · 680 EXP · +150 Rep · Swep Gear · Agility Up II.</span>" },
      { id: "c6-13", f: "u", t: "<b>Zazadan Still in Danger</b> — Zazadan (3 of 6) → <b>Sunlight Schvaik</b> (30) · <b>day only</b>",
        d: "<span class=step><b>Do:</b> kill <b>Sunlight Schvaik</b>, flying around <b>Barren Moor</b>.</span>"
         + "<span class=step><b>Conditions:</b> <b>morning, day or evening only — never night.</b> Clear, fog or heavy fog all work. About a 30% spawn, so re-enter the area if it is absent.</span>"
         + "<span class=step><b>Pays:</b> 4,500 G · 850 EXP · +150 Rep · Swep Gauntlets · HP Up II · Affinity Coin.</span>" },
      { id: "c6-14", f: "q", t: "<b>It's All in the Mind</b> — Zazadan (4 of 6)",
        d: "<span class=step><b>Do:</b> collect 1x <b>Nopon Potion</b> in the <b>Lacus Swamp</b> area.</span>"
         + "<span class=step><b>Pays:</b> 5,100 G · 1,000 EXP · +150 Rep · Swep Boots · Ether Up II.</span>" },
      { id: "c6-15", f: "q", t: "<b>A Mysterious Delicacy</b> — Zazadan (5 of 6)",
        d: "<span class=step><b>Do:</b> dip the Red Pollen Orb into the <b>Shining Pond</b> at <b>Dark Swamp</b>. Yields Highmore Caviar.</span>"
         + "<span class=step><b>Pays:</b> 5,800 G · 1,500 EXP · +250 Rep · <b>Pioneer</b> (sword).</span>" },
      { id: "c6-16", f: "d", t: "🔴 <b>A Gift?</b> — Zazadan (6 of 6) · <b>timed</b>",
        d: "<span class=step><b>Do:</b> deliver the Highmore Caviar to <b>Dedeba</b>. One source places Dedeba at Frontier Village rather than the marsh — check both.</span>"
         + "<span class=step><b>Pays:</b> 7,800 G · 2,500 EXP · +200 Rep · Panther Bottoms.</span>"
         + "<span class=step><b>Expires</b> after the party disperses in Colony 6 having escaped Mechonis Core (Ch15). Long window, but it is a real deadline.</span>" },
      { id: "c6-17", f: "q", t: "<b>Kacha's Kidnapping</b> — Bokoko, Nopon Merchant Camp (1 of 4)",
        d: "<span class=step><b>Do:</b> talk to Kacha → go to <b>Exile Fortress</b> → rescue Kacha from the Ignas → back to Bokoko.</span>"
         + "<span class=step><b>Pays:</b> 3,500 G · 410 EXP · +150 Rep · Jungle Cap, Jungle Gloves, Jungle Shoes.</span>" },
      { id: "c6-18", f: "q", t: "<b>The Giants' Key</b> — Kacha (2 of 4)",
        d: "<span class=step><b>Do:</b> kill <b>5x Deluded Igna</b> on the high plateau above <b>Dark Swamp</b> → dig up the <b>Giants' Key</b> there → inspect the altar on the <b>Exile Fortress roof</b>.</span>"
         + "<span class=step><b>Pays:</b> 5,900 G · 2,200 EXP · +200 Rep · Recovery Up IV.</span>" },
      { id: "c6-19", f: "q", t: "<b>The Giants' Treasure</b> — Kacha (3 of 4)",
        d: "<span class=step><b>Do:</b> collect the <b>Giants' Mirror</b> at <b>Daksha Shrine</b> on Bionis' Leg, then use it at the Exile Fortress roof altar.</span>"
         + "<span class=step><b>Pays:</b> 9,100 G · 3,100 EXP · +250 Rep · Double Attack IV.</span>"
         + "<span class=step><b>Also:</b> completing this is what makes <b>Eternal Palsadia</b> (Lv91) spawn at the top of Exile Fortress. Post-game target — note it.</span>" },
      { id: "c6-20", f: "q", t: "<b>Making Camp</b> — Bokoko (4 of 4)",
        d: "<span class=step><b>Do:</b> 4x <b>Glowing Upa Seed</b> (Upas), 3x <b>Fancy Volff Hide</b> (Volff), 4x <b>Feather Leaf</b>, 3x <b>Wool Rock</b> — all in Satorl Marsh.</span>"
         + "<span class=step><b>Pays:</b> 10,500 G · 1,000 EXP · +100 Rep · Iron Armour · Nopol Boots. Best gold in the chapter.</span>" },
      { id: "c6-21", f: "q", t: "<b>Nopon Merchant monster quests ×4</b> — Nopon Merchant Camp, generic, auto-complete",
        d: "<span class=step>1. Kill <b>2x Detox Brog</b> — 5,800 G</span>"
         + "<span class=step>2. Kill <b>3x Coppice Quadwing</b> — 6,200 G. These also drop <b>Quadwing Bag</b>, which Colony 6 Nature 2 wants ×2.</span>"
         + "<span class=step>3. Kill <b>2x Mist Rhogul</b> at <b>Barren Moor</b> — 6,800 G</span>"
         + "<span class=step>4. Kill <b>1x Officer Volff</b> (Lv23-26, six spawn points, <b>not at night</b>) — 6,500 G</span>" },

      { id: "c6-22", f: "u", t: "UM: <b>Stormy Widardun</b> (25) — Zaldania Waterfall, <b>day</b>" },
      { id: "c6-23", f: "u", t: "UM: <b>Cautious Balteid</b> (26) — west of Barren Moor" },
      { id: "c6-24", f: "u", t: "UM: <b>Tumultuous Felix</b> (27) — southeast of the Silent Obelisk" },
      { id: "c6-25", f: "u", t: "UM: <b>Amber Fischer</b> (27) — near the Altar of Fate, on the C-shaped island" },
      { id: "c6-26", f: "u", t: "UM: <b>Aggressive Cornelius</b> (28) — southern Igna Territory" },
      { id: "c6-27", f: "u", t: "UM: <b>Swift Zektol</b> (28) — east of Igna Territory" },
      { id: "c6-28", f: "u", t: "UM: <b>Reckless Godwin</b> (31) — Exile Fortress" },
      { k: "info", t: "Satorl's high-level block is post-game",
        d: "<b>Veteran Yozel</b> (83), <b>Indomitable Daulton</b> (85), <b>Eternal Palsadia</b> (91) and the superboss <b>Despotic Arsene</b> (108) all live here too. Leave them. Arsene does not even spawn until after Mechonis Core." },

      { id: "c6-29", f: "h", t: "💜 <b>Shulk &amp; Dunban</b> — Zaldania Waterfall, <b>night</b>, Green",
        d: "Go at night — the marsh transforms and the scene needs it. Dunban has been permanent since Ch5 so Green should be live." },
      { id: "c6-30", f: "m", t: "⛏️ <b>Bunnia Scent Wood</b> ×4 — Housing 2. Ogre Bunnia north of the Glowing Obelisk, or trade Bokoko",
        d: "Same enemy as <code>Zazadan in Danger</code> (kill 8 Ogre Bunnia). Do both at once." },
      { id: "c6-31", f: "m", t: "⛏️ <b>Igna Hide Jacket</b> ×2 — Commerce 1. Kill Igna" },
      { id: "c6-32", f: "m", t: "⛏️ <b>Quadwing Bag</b> ×2 — Nature 2. Kill Coppice Quadwing",
        d: "Same enemy as Nopon Merchant monster quest 2. Do both at once." },
      { id: "c6-33", f: "x", t: "Fill the <b>Satorl Marsh</b> Collectopaedia page" },
      { id: "c6-34", f: "x", t: "<b>Bionis' Interior, first visit</b> — nothing to hunt yet",
        d: "Its 8 Unique Monsters only spawn on the <b>second</b> visit in Chapter 17. <b>Black Liver Bean</b> ×2 (Nature 5) is a rare collection drop here — grab it if it appears, but you return, so it is not a deadline." },
      { id: "c6-35", f: "q", t: "<b>Désirée's Future</b> — Colony 9, Ether Light · <b>⚠️ SHULK MUST LEAD</b> · <b>Shulk's Pessimism skill tree</b>",
        d: "<span class=step><b>Requires</b> <code>The Broken Watch</code> from Chapter 1. If you skipped that, this does not exist and the tree is gone.</span>"
         + "<span class=step><b>Leader gate:</b> Désirée only offers it with Shulk leading.</span>"
         + "<span class=step><b>Pays:</b> 8,000 G · 3,500 EXP · Swep gear · <b>Shulk Skill Tree — Pessimism</b>.</span>" },
      { id: "c6-36", f: "q", t: "<b>The Gem Man's Invention</b> — Colony 9, Gem Man's Stall · <b>Mobile Furnace</b>",
        d: "Rewards the <b>Mobile Furnace</b>: gem crafting anywhere instead of trekking back to a fixed furnace. Take it the moment it appears — it changes how you play for the rest of the game." }
    ]
  },
  {
    id: "ch7", title: "Chapter 7", subtitle: "Makna Forest and Frontier Village", level: "38-44",
    note: "<b>Melia and Riki join and the party is finally six.</b> Frontier Village is the densest quest hub in the game and nothing here expires, but a lot of it <b>chains forward into Chapter 10</b> — so what you do now decides what exists later.",
    items: [
      { k: "lvl", t: "Set level to 42",
        d: "Makna runs Lv33-37 with a Lv46 outlier (Brutal Gravar). 42 handles everything including Gravar if you play well.<br><br>"
         + "Your bank should be getting fat now. Good. Leave it." },
      { k: "build", t: "⚔️ The permanent party arrives — switch to Shulk / Dunban / Riki",
        d: "This is the comp for the rest of the game. Make the change now and stop fiddling.<br><br>"
         + "<b>Riki</b> is a superb all-rounder and the AI plays him well. <b>You Can Do It</b> heals allies in a line in front of him, so positioning matters; <b>Lurgy</b>, <b>Burninate</b> and <b>Freezinate</b> supply strong damage over time, and his HP pool is enormous.<br>"
         + "<b>Drop Sharla.</b> With Dunban dodging nearly everything physical, a dedicated healer is dead weight and her damage is the worst in the party. Riki covers healing well enough.<br>"
         + "<b>Melia stays on the bench for this safe-route preset.</b> Her AI can contribute, but it is not reliable for a planned elemental-storage-and-burst rotation because it may discharge summons early. Control her yourself when using that build; the guide introduces it later for Ether-heavy fights and superboss farming.<br><br>"
         + "<b>Skill Links are worth spending on now.</b> Put <b>High Speed</b> (Melia, 20 coins, +15 Agility) on Dunban immediately. Coins refund on unlink, so there is no wrong answer." },

      { k: "info", t: "⚠️ Four things people expect here that are actually Chapter 10",
        d: "Correcting several guides, including an earlier version of this one:<br><br>"
         + "<b>Medical Advancements / Let's Make Fillings!</b> — Ch10. Needs the story to pass Kallian seeing you off from Alcamoth.<br>"
         + "<b>Getting Bigger!</b> (Riki's Cowardice tree) — Ch10, and it is <b>four quests deep</b>, not one.<br>"
         + "<b>Mystery of Makna Ruins 1-4</b> — Ch10.<br>"
         + "<b>Bridge Repair</b> — Ch10, needs Prison Island visited.<br><br>"
         + "What you must do <b>now</b> is the two gateway quests that make all of that possible: <code>Mushy Mushrooms</code> and <code>Kind Lupa's Grampypon</code>. Skip those and the Chapter 10 chains never appear." },
      { id: "c7-01", f: "d", t: "🔴 <b>Mushy Mushrooms</b> — Kofuko, Sacred Altar · <b>gateway to the whole Ch10 doctor chain</b>",
        d: "<span class=step><b>Do:</b> collect <b>8x Kelp Mushroom</b> in Makna Forest.</span>"
         + "<span class=step><b>Pays:</b> 1,000 G · 1,150 EXP · +100 Rep · Jungle Gloves · Bleed Attack II.</span>"
         + "<span class=step><b>Why flagged:</b> without this, <code>Medical Advancements</code>, <code>Healing the Healer</code>, <code>Mislabelling Problem</code> and <code>Getting Bigger!</code> — i.e. <b>Riki's entire hidden skill tree</b> — never become available in Chapter 10.</span>" },
      { id: "c7-02", f: "d", t: "🔴 <b>Kind Lupa's Grampypon</b> — Lupa, Riki's House · needs <b>2★</b> · gateway to Makna Ruins",
        d: "<span class=step><b>Sub-quest first</b> (<code>Secret Elixir Ingredients</code>, auto-attached): <b>5x Hades Beetle</b> (Makna), <b>3x All-Seeing Eye</b> from Jungle Quadwings (Makna), <b>2x Potent Brog Poison</b> from Poison Brogs (Satorl Marsh).</span>"
         + "<span class=step><b>Then:</b> deliver the Secret Nopon Elixir to <b>Satata in Colony 6</b> → report to Lupa.</span>"
         + "<span class=step><b>Pays:</b> 3,300 G · 1,200 EXP · +100 Rep · Panther Shoes.</span>"
         + "<span class=step><b>Unlocks:</b> the four-part <b>Mystery of Makna Ruins</b> chain in Ch10, which ends with the <b>'Eater' Records — Monado Eater for Shulk</b>, plus Barrier Gnasher and Heart of the Giants.</span>" },

      { k: "info", t: "Riki's family chain — Riki's House, five quests, strictly in order",
        d: "Rising affinity gates: none → 1.5★ → 1.5★ → 2★ → 2.5★. All givers are Riki's children." },
      { id: "c7-03", f: "q", t: "<b>Leku's Food Crisis</b> — Leku (1 of 5)",
        d: "<span class=step><b>Do:</b> <b>10x Peachy Leg Joint</b> from <b>Deinoses</b> in Makna.</span>"
         + "<span class=step><b>Pays:</b> 3,200 G · 800 EXP · +50 Rep · Chill Defence IV.</span>" },
      { id: "c7-04", f: "q", t: "<b>Hunt for a Patron</b> — Leku (2 of 5) · needs <b>1.5★</b>",
        d: "<span class=step><b>Do:</b> talk to <b>Lupa</b> (cleverest), <b>Modamo</b> (strongest) and <b>Pepa</b> (cutest).</span>"
         + "<span class=step><b>Pays:</b> 3,800 G · 950 EXP · +100 Rep · Blaze Defence IV.</span>" },
      { id: "c7-05", f: "q", t: "<b>Heropon's Spirit</b> — <b>Kilaki</b> (3 of 5) · needs <b>1.5★</b>",
        d: "<span class=step><b>Do:</b> <b>2x Tasty Ansel Wing</b> from <b>Makna Ansels</b>.</span>"
         + "<span class=step><b>Pays:</b> 4,300 G · 1,100 EXP · +150 Rep · Poison Defence IV · Kilaki's Note.</span>" },
      { id: "c7-06", f: "u", t: "<b>Beat Kilaki to it!</b> — Leku (4 of 5) · needs <b>2★</b> → <b>Obsessive Galgaron</b> (35)",
        d: "<span class=step><b>Do:</b> kill <b>Obsessive Galgaron</b> at the <b>Hode Lair</b> in Makna. Any time, any weather, ~30% spawn — re-enter the area if absent.</span>"
         + "<span class=step><b>Pays:</b> 5,500 G · 1,500 EXP · +200 Rep · Panther Gloves · Affinity Coin.</span>" },
      { id: "c7-07", f: "q", t: "<b>Popularity Premonition</b> — Leku (5 of 5) · needs <b>2.5★</b> · permanent choice",
        d: "<span class=step><b>Do:</b> pick <b>Pepa</b> (Route A, marriage) or <b>Lupa</b> (Route B, engagement) — this is permanent. Then collect <b>3x Delicious Vang Tail</b> (Vangs) and <b>2x Royal Apis Nectar</b> (Apis), both Makna.</span>"
         + "<span class=step><b>Pays:</b> 11,000 G · 2,800 EXP · +200 Rep · Shell Boots.</span>"
         + "<span class=step>Sources disagree on whether this and Beat Kilaki to it! are timed. Treat both as <b>do before leaving Chapter 7</b> and it stops mattering.</span>" },

      { k: "weather", t: "⏰ Two Pachipa quests only exist between 12:00 and 15:00",
        d: "Genuinely easy to miss because the NPC is standing there the whole time and simply will not talk about it outside the window.<br><br>"
         + "<b>Talk to Pachipa at Riki's House between 12:00 and 15:00</b> to get <code>Dadapon In Trouble</code>, and again in the same window for <code>It Definitely Exist!</code>.<br><br>"
         + "The second one matters beyond itself: it is a prerequisite for <b>Legend of Mythical Empress</b> back in Spiral Valley (6,500 G / 3,000 EXP), which you may still have open from Chapter 4." },
      { id: "c7-08", f: "q", t: "<b>Dadapon In Trouble</b> — Pachipa · <b>12:00-15:00</b> · needs <b>2★</b>",
        d: "<span class=step><b>Do:</b> kill <b>2x Mount Torta</b> on Bionis' Leg.</span>"
         + "<span class=step><b>Pays:</b> 3,900 G · 1,000 EXP · +100 Rep · Poison Plus III.</span>" },
      { id: "c7-09", f: "q", t: "<b>It Definitely Exist!</b> — Pachipa · <b>12:00-15:00</b> · needs <b>2.5★</b>",
        d: "<span class=step><b>Do:</b> talk to <b>Gerugu</b> → kill the <b>Daughter Empress</b> (quest-exclusive) → return.</span>"
         + "<span class=step><b>Pays:</b> 6,400 G · 2,000 EXP · +100 Rep · Jack Guarder.</span>"
         + "<span class=step><b>Unlocks</b> Legend of Mythical Empress in Spiral Valley (needs 3.5★ Colony 6).</span>" },

      { id: "c7-10", f: "d", t: "🔴 <b>Making a Mixer</b> — Rono, Pollen Works · <b>Shulk must lead to build it</b>",
        d: "<span class=step><b>Do:</b> sub-quest <code>Materials for a Mixer</code> — <b>2x Generic Shaft</b> (Mechon M64) and <b>2x Generic Blade</b> (Mechon M53), both on Bionis' Leg.</span>"
         + "<span class=step><b>Then:</b> build it at the <b>Weapon Development Lab in Colony 9</b>. <b>Shulk must be the party leader</b> or the machine will not respond.</span>"
         + "<span class=step><b>Pays:</b> 3,800 G · 1,200 EXP · +100 Rep · Good Footing IV.</span>" },
      { id: "c7-11", f: "q", t: "<b>Disinsectization</b> — Rasha, Sacred Altar · needs <b>1.5★</b> · <b>leads to Sharla's skill tree</b>",
        d: "<span class=step><b>Do:</b> kill <b>5x Makna Eluca</b> at the <b>Yellow Flower Grove</b> → talk to <b>Cherri</b> → back to Rasha.</span>"
         + "<span class=step><b>Pays:</b> 3,200 G · 900 EXP · +50 Rep · Mist Gel, Mist Cream, Mist Sandals.</span>"
         + "<span class=step><b>Unlocks:</b> <code>Avenge a Mamapon's Death</code> in Ch8, which grants <b>Sharla's hidden Reliance skill tree</b>. Do not skip this one.</span>" },
      { id: "c7-12", f: "q", t: "<b>Strange Noises from Below</b> — Pipiki, Sacred Altar",
        d: "<span class=step><b>Do:</b> talk to <b>Tati</b> → <b>3x Hode Camouflage</b> from Hodes in Makna → Tati → Pipiki.</span>"
         + "<span class=step><b>Pays:</b> 5,800 G · 2,000 EXP · +50 Rep · Panther Top.</span>"
         + "<span class=step><b>Unlocks:</b> <code>Musical Genius</code> and <code>Honouring the Nopon Sage</code> (Ch8) — the latter starts the chain to <b>Riki's Heroism skill tree</b>.</span>" },
      { id: "c7-13", f: "q", t: "<b>Musical Genius</b> — Tati · needs <b>1.5★</b> · big collectathon",
        d: "<span class=step><b>Things that Hum:</b> 2x Humming Plum (Bionis' Leg), 2x Humming Cabbage (Satorl), 2x Humming Cat (Satorl), 2x Humming Nettle (Makna).</span>"
         + "<span class=step><b>Things that Rumble:</b> 2x Rumble Stonefly (Tephra Cave), 2x Rumble Coal (Ether Mine), 2x Rumble Part (Satorl), 2x Rumble Box (Frontier Village).</span>"
         + "<span class=step><b>Pays:</b> 10,000 G · 6,500 EXP · +150 Rep · Climb Armour, Climb Leggings, Quick Step III. Worth the legwork.</span>" },
      { id: "c7-14", f: "q", t: "<b>Pollen Orb Ingredients</b> — Dobadoba, Pollen Orb Storehouse · needs <b>1.5★</b>",
        d: "<span class=step><b>Do:</b> <b>5x Yellow Pollen</b> at the <b>Yellow Flower Grove</b>, Makna.</span>"
         + "<span class=step><b>Pays:</b> 5,000 G · 1,500 EXP · +50 Rep · Panther Bottoms · First Atk Plus III.</span>"
         + "<span class=step><b>Unlocks:</b> Secret Ingredient Hunt and Secret Innovation.</span>" },
      { id: "c7-15", f: "q", t: "<b>Secret Innovation</b> — Rasha · needs <b>1.5★</b> · <b>dawn to dusk only</b>",
        d: "<span class=step><b>Do:</b> <b>1x Filtered Water</b> near the <b>Sparkling Pool</b>, Makna — <b>daytime only</b> → Cherri → Rasha.</span>"
         + "<span class=step><b>Pays:</b> 6,000 G · 2,100 EXP · +50 Rep · Buff Time Plus II.</span>"
         + "<span class=step><b>Unlocks:</b> The Master's Successor → <code>Dangerous Ambition</code> (Ch8, timed, dies at Mechonis Core).</span>" },
      { id: "c7-16", f: "q", t: "<b>Secret Ingredient Hunt</b> — Bana · needs <b>1.5★</b>",
        d: "<span class=step><b>Do:</b> <b>1x Monster Egg</b> on the hill right of the <b>Twisted Tree Gate</b>, Makna → give to <b>Gadada</b> → Bana.</span>"
         + "<span class=step><b>Pays:</b> 5,500 G · 1,800 EXP · +50 Rep · Aura Heal II.</span>" },
      { id: "c7-17", f: "q", t: "<b>The Master's Successor</b> — Dobadoba · needs <b>2★</b>",
        d: "<span class=step><b>Do:</b> choose <b>Gadada</b> or <b>Cherri</b> as successor.</span>"
         + "<span class=step><b>Pays:</b> 7,500 G · 2,400 EXP · +100 Rep · Debuff Resist II.</span>" },
      { id: "c7-18", f: "q", t: "<b>Fixing Time Mushrooms</b> → <b>Sweet Seduction</b> — Migaga, Sacred Altar",
        d: "<span class=step><b>Fixing Time Mushrooms:</b> feed compost to the Time Mushrooms on <b>floors 1, 4 and 7</b> of Frontier Village. 4,000 G · 1,150 EXP.</span>"
         + "<span class=step><b>Sweet Seduction</b> (needs 2★ and <code>Ingredients for a Brew</code>): 3,600 G · 1,000 EXP · +150 Rep · Sky Gloves.</span>" },
      { id: "c7-19", f: "q", t: "<b>Ingredients for a Brew</b> — Kofuko · <b>route decided by your inventory</b>",
        d: "<span class=step><b>Quirk:</b> the route is chosen automatically by what you are carrying when you accept. <b>Route B</b> (4x Walnut Grape, Bionis' Leg) fires unless you dump your Walnut Grapes first, because they are common.</span>"
         + "<span class=step><b>Route A:</b> 2x Bitter Kiwi (Makna) → Sky Shoes + Terrain Defence II. <b>Route B:</b> Sky Shoes + Auto-Heal Up III. Both 3,400 G · 850 EXP.</span>" },
      { id: "c7-20", f: "q", t: "<b>Lousy Lizards</b> — Modamo, Riki's House · needs <b>2.5★</b>",
        d: "<span class=step><b>Do:</b> kill <b>5x Inferno Deinos</b> and <b>5x Plasma Deinos</b> in Makna.</span>"
         + "<span class=step><b>Pays:</b> 7,500 G · 2,000 EXP · +100 Rep · Jungle Top, Jungle Bottoms.</span>" },
      { id: "c7-21", f: "q", t: "<b>Hunt for Bug-Loving Friend</b> → <b>A Worried Bug-Lover</b> — Kokora / Deki, Nopon Tower",
        d: "<span class=step><b>First:</b> talk to <b>Ababa</b> → <b>3x Shield Bug</b> (Makna) → Ababa → Kokora. 3,600 G · 950 EXP.</span>"
         + "<span class=step><b>Then</b> (Deki, needs 1.5★): <b>2x Green Eluca Juice</b> from Makna Elucas → Ababa → Deki. 4,200 G · 1,000 EXP · Night Vision IV.</span>"
         + "<span class=step><b>Unlocks:</b> A Tormented Bug-Lover (Ch8, <b>timed</b>).</span>" },
      { id: "c7-22", f: "q", t: "<b>Decoration Makeover</b> — Pepa, Chief's Residence",
        d: "<span class=step><b>Do:</b> <b>6x Enigma Lotus</b> (Makna), <b>4x Happy Rabbit</b> (Tephra Cave), <b>3x Love Crane</b> (Ether Mine).</span>"
         + "<span class=step><b>Pays:</b> 5,200 G · 1,050 EXP · +100 Rep · Jungle Cap.</span>" },

      { k: "info", t: "The Challenge quests here are split across three different NPCs",
        d: "Each Challenge is one Unique Monster kill. The givers are in <b>three different spots</b>, which is why people find two and assume that is all:<br><br>"
         + "<b>Challenge 1</b> — Nopon Villager at the <b>Nopon Tower</b> → Agile Albatro<br>"
         + "<b>Challenge 2</b> — Nopon Villager at the <b>Sacred Altar</b> → Breezy Zolos<br>"
         + "<b>Challenge 3</b> — Nopon Villager at <b>Riki's House</b> → Lazy Bluco<br>"
         + "<b>Challenge (Makna)</b> — <b>Nopon Merchant at the Agni Tablet</b>, out in Makna, not the village → Shimmering Forte" },
      { id: "c7-23", f: "u", t: "<b>Challenge 1</b> (Nopon Tower) → <b>Agile Albatro</b> (33) — below Bridge Three · <b>avoids rain</b>",
        d: "Pays 23,000 G + Affinity Coin." },
      { id: "c7-24", f: "u", t: "<b>Challenge 2</b> (Sacred Altar) → <b>Breezy Zolos</b> (37) — Windmill Pavilion · any conditions",
        d: "Pays 26,000 G + Affinity Coin." },
      { id: "c7-25", f: "u", t: "<b>Challenge 3</b> (Riki's House) → <b>Lazy Bluco</b> (34) — Yellow Flower Grove · <b>night only</b>",
        d: "Pays 29,000 G + Affinity Coin. ~30% spawn, so re-enter if absent." },
      { id: "c7-26", f: "u", t: "<b>Challenge (Makna)</b> (Nopon Merchant, Agni Tablet) → <b>Shimmering Forte</b> (33) — Eks Watering Hole",
        d: "<span class=step><b>Conditions:</b> <b>clear weather</b>, and <b>not at night</b>. ~30% spawn.</span>"
         + "<span class=step>Pays 25,000 G + Affinity Coin.</span>" },
      { id: "c7-27", f: "u", t: "<b>Brutal Gravar</b> (46) — King Agni's Tomb · <b>no quest needed</b>",
        d: "Correcting a common claim, including in an earlier version of this guide: Gravar is <b>not</b> quest-gated by the Mystery of Makna Ruins chain. It spawns naturally at about 30%. The Ruins chain just gives you a reason to be standing there." },
      { id: "c7-28", f: "q", t: "<b>Makna Monster Quests 1-4</b> — Nopon Merchant, Agni Tablet · generic, auto-complete",
        d: "<span class=step>1. Kill 5x Jungle Quadwing — 15,000 G · 2. Kill 2x Makna Feris — 9,600 G · 3. Kill 2x Makna Ansel — 8,500 G · 4. Kill 3x Makna Eks — 12,000 G</span>"
         + "<span class=step>Quest 4's Makna Eks also drop <b>Eks Iron Heart</b>, which Colony 6 Housing 3 needs. Do them together.</span>" },

      { k: "info", t: "🔴 The Old Soldier's Test becomes possible now — and it can be destroyed",
        d: "Melia has temporarily joined, which is one of its prerequisites. This is the quest with the <b>permanent dialogue lockout</b> described in Chapter 0.<br><br>"
         + "<b>Sequence:</b> get Colony 9 to <b>3★</b> · have Dionysis, Cheryl and Minnie on the Affinity Chart · talk to <b>Jan</b> (Colony 9 Military District training ground) between <b>9:00 and 15:00</b> · then talk to <b>Dionysis</b> in the Residential District and answer <b>&quot;He's too old for that girl.&quot;</b><br><br>"
         + "The other answer kills it for the playthrough." },
      { id: "c7-29", f: "d", t: "🔴 <b>The Old Soldier's Test</b> — Jan, Colony 9 → <b>Elder Gragus</b> (34)",
        d: "<span class=step><b>Do:</b> kill <b>Elder Gragus</b> at the <b>Nopon Arch</b> in Makna Forest. Avoids rain.</span>"
         + "<span class=step><b>Turn in:</b> Jan, Colony 9 Military District.</span>"
         + "<span class=step><b>Pays:</b> 5,800 G · 5,000 EXP · <b>Dawn Staff</b> (2 empty gem slots) · +100 Colony 9 affinity · Affinity Coin.</span>" },

      { id: "c7-30", f: "h", t: "💜 <b>Shulk &amp; Riki</b> — Pollen Works, day, Green" },
      { id: "c7-31", f: "h", t: "💜 <b>Shulk &amp; Melia</b> — Agni Tablet, day, Green" },
      { id: "c7-32", f: "h", t: "💜 <b>Sharla &amp; Melia</b> — Sparkling Pool, day, Green" },
      { id: "c7-33", f: "h", t: "💜 <b>Dunban &amp; Melia</b> — Apex Lake / Contemplation Terrace, day, Green" },
      { id: "c7-34", f: "h", t: "💜 <b>Riki &amp; Melia</b> — Prophecy Hut, day, Green",
        d: "Five at once — the best Heart-to-Heart chapter in the game, because Melia and Riki are new and Green comes fast. Run them as one circuit after a few hours of party time." },
      { id: "c7-35", f: "m", t: "⛏️ <b>Fossil Monkey</b> ×1 — Housing 2. Makna collection, <b>rare</b>",
        d: "Run the Skip Travel loop off a Makna landmark. If it resists you more than twenty minutes, trade <b>Puko</b> in Frontier Village instead — this is not worth an hour." },
      { id: "c7-36", f: "m", t: "⛏️ <b>Eks Iron Heart</b> ×1 — Housing 3. Kill Makna Eks (same as Monster Quest 4)" },
      { id: "c7-37", f: "m", t: "⛏️ <b>Hode Plank</b> ×3 — Commerce 2. Kill Hyle Hode, or trade Lupa" },
      { id: "c7-38", f: "m", t: "⛏️ <b>Lemonade Sky</b> ×3 — Special 3. Makna collection" },
      { id: "c7-39", f: "m", t: "⛏️ <b>Dust Element</b> ×2 — Special 2. Kill Caris Nebula at the Bridge Two/Three junction" },
      { id: "c7-40", f: "m", t: "⛏️ <b>Empress Beetle</b> ×3 — Nature 2. Frontier Village collection" },
      { id: "c7-41", f: "x", t: "Fill the <b>Makna Forest</b> and <b>Frontier Village</b> Collectopaedia pages" },
      { k: "grind", t: "⛏️ Push Central Bionis affinity to 3.5★ before you leave",
        d: "This is the single most useful thing you can bank in Chapter 7. <b>3.5★ Central Bionis</b> is the gate on <code>Getting Bigger!</code> in Chapter 10 — <b>Riki's hidden Cowardice skill tree</b>.<br><br>"
         + "Frontier Village side quests are the fastest way there, and you are doing them anyway. Just do not leave the chapter at 2★ and then have to come back and grind it cold." }
    ]
  },
  {
    id: "ch8", title: "Chapter 8", subtitle: "Eryth Sea, Alcamoth, High Entia Tomb", level: "44-52",
    note: "<b>The single most important chapter in the run.</b> Every Alcamoth NPC quest dies at Mechonis Core in Chapter 15, and Alcamoth is the biggest gold source in the game. Eryth Sea's own quests are safe. Work Alcamoth in the five phases below — its quests are affinity-gated, so brute-forcing the list out of order does not work.",
    items: [
      { k: "lvl", t: "Set level to 50",
        d: "Eryth Sea runs Lv36-44, High Entia Tomb 38. 50 covers everything comfortably and leaves the Lv87-93 Eryth Sea block (Belagon, Ragoel, Zagamei, Dablon, Medorlo) safely post-game.<br><br>"
         + "This chapter has more quests than any other. Do not be tempted to spend the bank to speed it up — the quests are gated on <b>affinity</b>, not level." },
      { k: "build", t: "⚔️ Where your build should be, and the Melia note",
        d: "<b>Party:</b> Shulk / Dunban / Riki. Dunban should be visibly dodging most physical attacks by now — if not, put more Agility Up on him and spend AP on his evasion branches.<br><br>"
         + "<b>You will need to swap leader twice this chapter</b>, which is unusual and easy to forget:<br>"
         + "· <b>Melia</b> leads for <code>Building Bridges</code><br>"
         + "· <b>Shulk</b> leads for <code>Paola and Narine</code><br><br>"
         + "<b>Gems:</b> you have the Mobile Furnace from Ch6, so craft in the field. Remember the crafting pair's affinity sets the cycle count — pair characters who like each other." },

      { k: "info", t: "🔴 What actually dies at Mechonis Core, and what does not",
        d: "Worth being precise, because the panic in most guides is broader than the truth:<br><br>"
         + "<b>DIES:</b> every Alcamoth NPC quest. The NPCs leave or are gone. This is roughly 90 quests.<br>"
         + "<b>SURVIVES:</b> the Alcamoth <b>area</b> itself — reachable in Ch17 on foot via the <b>Centre Gate portal from Eryth Sea</b> (no Skip Travel, and it is overrun by Telethia). Its six Heart-to-Hearts are therefore safe.<br>"
         + "<b>SURVIVES:</b> all Eryth Sea and Syrath Lighthouse quests. They are Normal, not timed.<br><br>"
         + "<b>Correction to an earlier version of this guide:</b> <code>Ancient High Entia Mystery</code> — the source of <b>Melia's Passion skill tree</b> — is a <b>Chapter 17</b> quest from Talia at the Ether Plant, and it is <b>not missable</b>. Its prerequisite can be satisfied by either <code>Talia's Research</code> (Ch8, missable) <i>or</i> <code>Investigating Satorl</code> (Ch17). Melia's tree is safe whatever you do." },

      { k: "info", t: "ALCAMOTH PHASE 1 — no affinity gates. These are what build your affinity",
        d: "Do all of these on your first visit, before the story sends you into the High Entia Tomb. None require a star rating, and completing them is how you reach the 1.25★-2.5★ gates that Phases 2-3 need." },
      { id: "c8-01", f: "d", t: "🔴 <b>The Deciphering Machine</b> — Ruthan, Imperial Palace",
        d: "<span class=step><b>Do:</b> <b>6x Sturdy Armour</b> from <b>Flavel Andos</b> at Eryth Sea.</span>"
         + "<span class=step><b>Pays:</b> 5,500 G · 1,500 EXP · +100 Rep · Slow Resist III.</span>"
         + "<span class=step>Convenient: Colony 6 Housing 3 also wants <b>Sturdy Armour ×4</b>. Farm 10 and cover both.</span>" },
      { id: "c8-02", f: "d", t: "🔴 <b>Bring Back My Son!</b> → <b>Teaching Materials</b> — Merisa / Mir'leiz, Imperial Palace",
        d: "<span class=step><b>Bring Back My Son!:</b> talk to <b>Mir'leiz</b> at Eryth Sea, return. 3,500 G · 1,800 EXP.</span>"
         + "<span class=step><b>Teaching Materials:</b> talk to <b>Caul</b> → <b>3x Murky Eluca Water</b> from <b>Perna Elucas</b> at Eryth Sea → Caul → Mir'leiz. 4,300 G · 2,000 EXP.</span>" },
      { id: "c8-03", f: "d", t: "🔴 <b>How Do They Feel?</b> → <b>How Do I Feel?</b> — Scarlen, Main Entrance · <b>the branch is here</b>",
        d: "<span class=step><b>How Do They Feel?:</b> talk Ricoth → talk Rozeal → Scarlen. 3,800 G · 1,300 EXP.</span>"
         + "<span class=step><b>How Do I Feel? — this is where you choose.</b> Talk to <b>Rozeal FIRST</b>, then Ricoth → unlocks <code>Together Forever</code>. Talking to Ricoth first instead unlocks <code>I Love You No Matter What</code>.</span>"
         + "<span class=step><b>Take the Rozeal-first route.</b> Together Forever upgrades two chart links (Scarlen↔Ricoth to Very Close, Ricoth↔Rozeal to Best Friends); the alternative documents none.</span>" },
      { id: "c8-04", f: "d", t: "🔴 <b>Together Forever</b> — Scarlen · Rozeal-first route only",
        d: "<span class=step><b>Do:</b> talk to Rozeal → Scarlen.</span>"
         + "<span class=step><b>Pays:</b> 4,800 G · 2,100 EXP · +200 Rep · Physical Protect IV.</span>" },
      { id: "c8-05", f: "d", t: "🔴 <b>Building Bridges</b> — Arielle, Fountain of Eternity · <b>⚠️ MELIA MUST LEAD</b>",
        d: "<span class=step><b>Switch your party leader to Melia before you start.</b> Both the Lesunia conversations require it — with anyone else leading the quest simply will not progress.</span>"
         + "<span class=step><b>Do:</b> talk to <b>Lesunia</b> as Melia → <b>2x Marine Marble</b> at Eryth Sea → back to Lesunia as Melia → report to Arielle.</span>"
         + "<span class=step><b>Pays:</b> 5,300 G · 1,750 EXP · +100 Rep · Topple Resist III.</span>"
         + "<span class=step><b>Unlocks:</b> <code>Believing Again</code> → <code>Vidian Rescue Mission</code> in Ch17, worth 58,000 G and 97,500 EXP. Skipping this quietly costs you that.</span>" },
      { id: "c8-06", f: "d", t: "🔴 <b>Preparing for Adventure</b> — Zain, Fountain of Eternity (1 of 3)",
        d: "<span class=step><b>Do:</b> <b>Kasharpa Water</b> (Kasharpa Falls, Bionis' Leg) + <b>Statue Water</b> (Sororal Statues, Satorl Marsh) + <b>Makna Water</b> (Great Makna Falls, Makna Forest). One of each.</span>"
         + "<span class=step><b>Pays:</b> 4,200 G · 1,600 EXP · +200 Rep · Strength Up III / Ether Up III / Agility Up III.</span>" },
      { id: "c8-07", f: "d", t: "🔴 <b>Looking for a Lost Son</b> → <b>Lost Daughter</b> — Vol'aren, Fountain of Hope",
        d: "<span class=step>Neither can be declined. <b>Son:</b> talk to <b>Atael</b>, return. <b>Daughter:</b> talk to <b>Cian</b>, return.</span>"
         + "<span class=step><b>Pays:</b> 6,750 G + 7,200 G · 2,300 + 2,500 EXP · Tension Swing III, Strength Up IV.</span>"
         + "<span class=step><b>Atael is also your Ocean Elixir of Life trade</b> — do it in the same visit.</span>" },
      { id: "c8-08", f: "d", t: "🔴 <b>Losing the Taste for Alcohol</b> — Nelo, Fountain of Hope",
        d: "<span class=step><b>Do:</b> <b>2x Feris Blood</b> from Feris in Makna + <b>5x Pagul Hot Pot</b> from <b>Cruz Paguls</b> at Eryth Sea.</span>"
         + "<span class=step><b>Pays:</b> 4,750 G · 1,800 EXP · +150 Rep · Confuse Resist III.</span>" },
      { id: "c8-09", f: "d", t: "🔴 <b>Looking for Gold Bugs</b> — Teelan, Imperial Palace",
        d: "<span class=step><b>Do:</b> <b>9x Gold Caterpillar</b> in <b>Tephra Cave</b>. A long way back, so fold it into another Tephra trip.</span>"
         + "<span class=step><b>Pays:</b> 5,100 G · 1,950 EXP · +100 Rep · Fall Defence II.</span>" },
      { id: "c8-10", f: "d", t: "🔴 <b>Going Out to Play</b> — Popipo, Main Entrance",
        d: "<span class=step><b>Do:</b> talk to <b>Baroba</b> → <b>5x Ether Rose</b> in Satorl Marsh → Baroba → return.</span>"
         + "<span class=step><b>Pays:</b> 6,400 G · 1,600 EXP · +100 Rep · Paralysis Resist III.</span>" },

      { k: "info", t: "ALCAMOTH PHASE 2 — 1.25★ to 1.5★, and one ordering trap",
        d: "<b>⚠️ <code>Protect the Capital!</code> expires the instant <code>Brave Actions</code> completes</b> — and Brave Actions is what grants it, during its first step. So the sequence is: start Brave Actions → it hands you Protect the Capital! → <b>finish and turn in Protect the Capital! FIRST</b> → then finish Brave Actions.<br><br>"
         + "Get that backwards and you lose a quest with no warning." },
      { id: "c8-11", f: "d", t: "🔴 <b>Brave Actions</b> — Mir'leiz · needs <b>1.5★</b> · read the trap above",
        d: "<span class=step><b>Do:</b> talk to <b>Lecrough</b> (this hands you Protect the Capital!) → kill <b>2x Buono Nebula</b> at Eryth Sea → back to Lecrough → Mir'leiz.</span>"
         + "<span class=step><b>Pays:</b> 5,600 G · 2,400 EXP · +200 Rep · Unbeatable III.</span>" },
      { id: "c8-12", f: "d", t: "🔴 <b>Protect the Capital!</b> — Lecrough, Ascension Hall · <b>turn in BEFORE finishing Brave Actions</b>",
        d: "<span class=step><b>Do:</b> kill <b>2x Bono Nebula</b> at Eryth Sea.</span>"
         + "<span class=step><b>Pays:</b> 4,400 G · 2,100 EXP · +100 Rep · Panther Top, Panther Shoes.</span>"
         + "<span class=step><b>Note the two nebula names are different</b> — Brave Actions wants <b>Buono</b> Nebula, this wants <b>Bono</b> Nebula. Easy to conflate.</span>" },
      { id: "c8-13", f: "d", t: "🔴 <b>Preparing for Adventure 2</b> — Kurralth · needs <b>1.25★</b>",
        d: "<span class=step><b>Do:</b> <b>1x Chalk Container</b> at <b>Anu Shore</b>, Eryth Sea.</span>"
         + "<span class=step><b>Pays:</b> 4,700 G · 1,800 EXP · Muscle Up III, Ether Def Up III.</span>" },
      { id: "c8-14", f: "d", t: "🔴 <b>Preparing for Adventure 3</b> — Zain · needs <b>1.5★</b> → spawns <b>Lakebed Orthlus</b> (40)",
        d: "<span class=step><b>Do:</b> get <b>Orthlus' Liver</b> by killing <b>Lakebed Orthlus</b> at <b>Agora Shore, Colony 9</b>. This is a quest-exclusive Unique Monster — no quest, no monster, and it dies with the quest at Mechonis Core.</span>"
         + "<span class=step><b>Pays:</b> 6,600 G · 2,500 EXP · +150 Rep · Mithril Gear, Gauntlets, Boots · Affinity Coin.</span>"
         + "<span class=step><b>Unlocks:</b> Starlight Seeker and Adventurers in Peril.</span>" },
      { id: "c8-15", f: "d", t: "🔴 <b>Starlight Seeker</b> — Elior · needs <b>1.5★</b>",
        d: "<span class=step><b>Do:</b> talk to <b>Miriall</b> → <b>2x Silver Eks Plate</b> from <b>Stella Eks</b> at Eryth Sea → Miriall → Elior.</span>"
         + "<span class=step><b>Pays:</b> 5,600 G · 2,000 EXP · +100 Rep · Daze Resist III.</span>" },

      { k: "info", t: "ALCAMOTH PHASE 3 — after the story sends you into the High Entia Tomb",
        d: "Three quests unlock, and between them they want four different things out of the Tomb. <b>Sweep it once and collect all of them together</b> so you never have to go back:<br><br>"
         + "<b>5x Green Diode</b> · <b>3x Astas Remote Unit</b> (from Hover Astas) · <b>1x Attachment Part</b> (Second Treasury) · <b>3x Andos Antenna</b> (from Andos, for an Eryth Sea collect quest) · <b>2x Blue Ladybird</b> (Colony 6 Commerce 3)" },
      { id: "c8-16", f: "d", t: "🔴 <b>A Necessary Upgrade</b> — Naroth · needs <b>1.25★</b> + Tomb story point",
        d: "<span class=step><b>Do:</b> <b>5x Green Diode</b> in the High Entia Tomb + <b>3x Astas Remote Unit</b> from <b>Hover Astas</b> there.</span>"
         + "<span class=step><b>Pays:</b> 6,500 G · 1,800 EXP · +150 Rep · Shell Gauntlets.</span>" },
      { id: "c8-17", f: "d", t: "🔴 <b>Talia's Research</b> — Talia · needs <b>2★</b> · <b>take this over Investigating Satorl</b>",
        d: "<span class=step><b>Do:</b> kill <b>Dogmatic Gogol</b> (quest-exclusive) at the <b>Place of Judgement, Satorl Marsh</b>.</span>"
         + "<span class=step><b>Pays:</b> 6,800 G · 2,250 EXP · +200 Rep · Ether Def Up IV, Arts Seal Resist III.</span>"
         + "<span class=step><b>Why take it:</b> more Upper Bionis reputation, which is Area Affinity, which you need at 5★ for the Collectopaedia's Other page. The Ch17 alternative <code>Investigating Satorl</code> pays more EXP and gold, which you are banking and can farm.</span>" },
      { id: "c8-18", f: "d", t: "🔴 <b>Starlight Gazer</b> — Elior · needs <b>2.5★</b> + Tomb story point",
        d: "<span class=step><b>Do:</b> talk to <b>Kaleka</b> → <b>1x Attachment Part</b> from the <b>Second Treasury</b> in the High Entia Tomb → Kaleka → Elior.</span>"
         + "<span class=step><b>Pays:</b> 6,900 G · 2,700 EXP · +200 Rep · Amethyst Leggings.</span>" },

      { k: "info", t: "ALCAMOTH PHASE 4 — after the Whitewing Palace scene. This is the gold.",
        d: "Two more named quests open at the Ascension Hall, and then the entire generic block becomes available.<br><br>"
         + "<b>The generic block alone pays 614,000 G.</b> Monster Quests 1-4 (three parts each) 231,000 · Challenges 1-4 168,000 · Material 1-4 92,500 · Collection 1-4 80,500 · Search 1-4 42,000.<br><br>"
         + "With the named quests, Alcamoth totals roughly <b>745,000 G</b> — over a third of your 2,000,000 G Colony 6 bill, from one city, on a deadline. Generic fetch quests look like filler, which is exactly why people skip them and then wonder why they cannot afford reconstruction 100 hours later.<br><br>"
         + "Nearly every target is an <b>Eryth Sea</b> monster, so take the whole board at once and clear it in one sweep." },
      { id: "c8-19", f: "d", t: "🔴 <b>Back Pain</b> — Galdo, Ascension Hall",
        d: "<span class=step><b>Do:</b> kill <b>6x Archer Hode</b> at Eryth Sea. 5,500 G · 1,800 EXP · Bind II.</span>"
         + "<span class=step>Galdo is also your <b>Sturdy Armour</b> trade if you would rather not farm Flavel Andos.</span>" },
      { id: "c8-20", f: "d", t: "🔴 <b>A Friend in Need</b> — Lecrough, Ascension Hall",
        d: "<span class=step><b>Do:</b> kill <b>6x Eryth Hiln</b> at Eryth Sea. 7,500 G · 2,500 EXP · Arts Stealth III.</span>"
         + "<span class=step>Eryth Hiln also drop <b>Jagged Tail</b>, which Colony 6 Nature 3 wants ×3.</span>" },
      { id: "c8-21", f: "d", t: "🔴 <b>Challenge 1</b> (Citizen, <b>Fountain of Hope</b>) → <b>Proper Bandaz</b> (39) · <b>45,000 G</b>",
        d: "<span class=step><b>The hardest spawn condition in the game:</b> Secluded Island, <b>night AND shooting stars simultaneously</b>. Camp it — you cannot force weather this early.</span>" },
      { id: "c8-22", f: "d", t: "🔴 <b>Challenge 2</b> (Citizen, <b>Fountain of Eternity</b>) → <b>Tempestuous Edegia</b> (39) · <b>38,000 G</b>",
        d: "Hovering Reef 10. <b>Night only</b>, any weather." },
      { id: "c8-23", f: "d", t: "🔴 <b>Challenge 3</b> (Imperial Guard, <b>Ascension Hall</b>) → <b>Peeling Kircheis</b> (38) · <b>35,000 G</b>",
        d: "Hovering Reef 7. Any time, any weather — the easy one." },
      { id: "c8-24", f: "d", t: "🔴 <b>Challenge 4</b> (Citizen, <b>Fountain of Eternity</b>) → <b>Lightspeed Sonid</b> (44) · <b>50,000 G</b>",
        d: "Anu Shore. Any time, any weather. Biggest single generic payout in the game." },
      { id: "c8-25", f: "d", t: "🔴 <b>Alcamoth Monster Quests 1-4</b>, three parts each — <b>231,000 G</b>",
        d: "<span class=step>Imperial Guards and Citizens at the <b>Imperial Palace</b> and <b>Ascension Hall</b>. Every target is an Eryth Sea monster — Chloro Laia, Stella Eks, Racti Lexos, Somati Kromar and similar.</span>"
         + "<span class=step>Generic, so they auto-complete in the field. Take all twelve parts before you go hunting.</span>" },
      { id: "c8-26", f: "d", t: "🔴 <b>Alcamoth Material / Collection / Search Quests 1-4 each</b> — <b>215,000 G</b>",
        d: "<span class=step><b>Material</b> (~92,500 G): Glossy Grady Fan from Lunar Gradys, Orluga Grass Skirt from Orlugas in Makna, and similar.</span>"
         + "<span class=step><b>Collection</b> (~80,500 G): Gold Burdock, White Tail and other Eryth Sea collectables.</span>"
         + "<span class=step><b>Search</b> (~42,000 G): lost items <b>inside Alcamoth itself</b> — Mother's Necklace on the second level, Silver Ring, and so on.</span>"
         + "<span class=step>All generic and auto-completing. Take the entire board in one pass.</span>" },
      { id: "c8-27", f: "s", t: "🟡 <b>Repair the Alcamoth warps</b>",
        d: "Three of the six Alcamoth Heart-to-Hearts need repaired warps to reach. The Heart-to-Hearts themselves survive Mechonis Core, but the <b>repair quests die with the NPCs</b>. Do the repairs now or those three become a long walk you cannot make." },
      { id: "c8-28", f: "d", t: "🔴 ⛏️ <b>Ocean Elixir of Life</b> ×1 — Commerce 5. Trade <b>Atael</b> in Alcamoth",
        d: "Backup exists (Kyel Lexos at Freight Road in Colony 6) but it is rain-gated and post-Mechonis Core. Take the trade while Atael is standing here." },
      { id: "c8-29", f: "x", t: "Alcamoth residents for Colony 6: <b>Talonyth</b>, <b>Ma'crish</b>, <b>Jer'ell</b>, <b>Yura</b>",
        d: "All four are <b>also findable outside Alcamoth</b> (Bionis' Leg, Satorl Marsh, Valak Mountain), so they are <b>not</b> on the Chapter 15 deadline. Relax about these." },

      { k: "info", t: "ERYTH SEA — safe, not timed, but two skill trees run through it",
        d: "None of this expires. But the Ether Plant chain is <b>Melia's Reticence tree</b>, and Rasha's Ch7 quest chains into <b>Sharla's Reliance tree</b> here." },
      { id: "c8-30", f: "q", t: "<b>Trouble at the Plant</b> — Jarack, Ether Plant (umbrella quest, 2 sub-quests)",
        d: "<span class=step><b>Sub-quest — Punish the Hodes:</b> kill <b>Funeral Gozra</b> (Lv42 Unique Monster, <b>Hode Refuge</b>, any time or weather). Affinity Coin.</span>"
         + "<span class=step><b>Sub-quest — Mend the Plant:</b> <b>3x Luxury Hode Wood</b> from Hodes at Eryth Sea → talk Jarack → interact with the <b>Turbine Access Panel</b> in the Ether Plant → talk Jarack.</span>"
         + "<span class=step><b>Pays:</b> 7,700 G · 4,700 EXP · +200 Rep · Shell Gauntlets · Good Footing II.</span>" },
      { id: "c8-31", f: "q", t: "<b>Hode Attack</b> — Jarack · auto-received, cannot decline",
        d: "<span class=step><b>Do:</b> kill <b>2x Confusion Ekidno</b> (quest-exclusive spawns) at Eryth Sea.</span>"
         + "<span class=step><b>Pays:</b> 5,400 G · 3,000 EXP · +100 Rep · Buff Time Plus II, Divine Protect II.</span>" },
      { id: "c8-32", f: "q", t: "<b>Trouble at the Lighthouse</b> — Shalen, <b>Syrath Lighthouse</b> · <b>⚠️ MELIA MUST LEAD</b> · <b>Melia's Reticence tree</b>",
        d: "<span class=step><b>Leader gate:</b> put Melia in front before speaking to Shalen or the quest will not be offered.</span>"
         + "<span class=step><b>Do:</b> kill <b>3x Decay Ekidno</b> near the Syrath Lighthouse. <b>They only spawn at night.</b></span>"
         + "<span class=step><b>Pays:</b> 5,700 G · 3,800 EXP · <b>+500 Rep</b> · <b>Nightglow Staff</b> (2 slots) · <b>Melia Skill Tree — Reticence</b>.</span>"
         + "<span class=step>Note the giver is at the <b>Syrath Lighthouse</b>, not Hovering Reef 4 as some guides say.</span>" },
      { id: "c8-33", f: "u", t: "<b>Challenge</b> (Lighthouse Keeper, Syrath Lighthouse) → <b>Flabbergasted Jerome</b> (38) · <b>32,000 G</b>",
        d: "Hovering Reef 5, lower level. Any time; clear or shooting stars — <b>not during a thunderstorm</b>." },
      { id: "c8-34", f: "q", t: "<b>Eryth Sea Monster / Collect quests</b> — Lighthouse Keeper and Citizen, Syrath Lighthouse",
        d: "<span class=step><b>Monster 1:</b> 5x Palti Kromar — 13,000 G. <b>Monster 2:</b> 5x Maleza Kromar — 15,000 G. Both drop Colony 6 Kromar materials, so this doubles up.</span>"
         + "<span class=step><b>Collect 1:</b> 3x Hiln Coin Purse + 5x Doomsday Poppy — 12,000 G.</span>"
         + "<span class=step><b>Collect 2:</b> 3x Andos Antenna (<b>High Entia Tomb</b>) + 3x Old Dragon Spine (Racti Lexos) + 3x Pink Asparagus — 20,000 G. Fold the Antennae into your Tomb sweep.</span>" },
      { id: "c8-35", f: "q", t: "<b>Avenge a Mamapon's Death</b> — Rasha, Frontier Village · <b>⚠️ SHARLA MUST LEAD</b> · <b>Sharla's Reliance skill tree</b>",
        d: "<span class=step><b>Requires:</b> <code>Disinsectization</code>, <code>Secret Innovation</code>, 4★ Central Bionis and Sharla leading.</span>"
         + "<span class=step><b>Do:</b> defeat <b>Pillager Hode</b> at the Ether Crystal Deposit, Eryth Sea → return to Rasha → give the Cloth Shred to Cherri → return to Rasha.</span>"
         + "<span class=step><b>Pays:</b> 5,200 G · 3,600 EXP · Shell Leggings · <b>Sharla Skill Tree — Reliance</b>.</span>" },
      { id: "c8-36", f: "q", t: "<b>Honouring the Nopon Sage</b> → <b>Legend of the Sage</b> → <b>Challenge of the Sage</b>",
        d: "<span class=step>Follows from <code>Strange Noises from Below</code> (Ch7). Giver: <b>Nopon Sage, Divine Sanctuary</b> in Makna.</span>"
         + "<span class=step><b>Legend of the Sage:</b> talk Pipiki → Sage → Pachipa → Sage. 4,500 G · 1,500 EXP.</span>"
         + "<span class=step>The chain finishes in Ch17 with <b>Final Challenge of the Sage</b> — <b>Riki's Heroism skill tree</b>, 38,000 G, 73,500 EXP, Meteor Nibbler.</span>" },

      { id: "c8-37", f: "d", t: "🔴 <b>Paola and Narine</b> — Narine, Tranquil Square, Colony 9 · <b>Shulk must lead</b> · <b>20,000 EXP</b>",
        d: "<span class=step><b>Why now:</b> it needs <b>two female party members</b>, impossible until Melia joined in Ch7, plus White-tier Shulk↔Reyn affinity and White-tier affinity between the two women.</span>"
         + "<span class=step><b>Do:</b> raise Shulk↔Reyn to Blue → talk Narine → raise it higher → talk <b>Paola</b> → raise affinity between two female party members → talk Paola again → return to Narine.</span>"
         + "<span class=step><b>Pays:</b> 200 G · <b>20,000 EXP</b> · Daze Plus IV · Narine and Paola become Best Friends.</span>" },
      { id: "c8-38", f: "g", t: "🏁 <b>Makna Grand Prix pair</b> — Jungle Rumble and Midnight Forest. <b>Torso</b> slot",
        d: "Unlocks on reaching Eryth Sea. Access from the main menu with Y." },
      { id: "c8-39", f: "u", t: "Free-roaming Eryth Sea UMs: <b>Turbulent Belmo</b> (36, <b>clear days</b>), <b>Subterranean Zomar</b> (40), <b>Cumulus Danaemos</b> (41), and <b>Calm Anzabi</b> (38, High Entia Tomb Second Treasury)",
        d: "No quests needed for these four. The Lv87-93 Eryth Sea block is post-game." },
      { id: "c8-40", f: "h", t: "💜 <b>Reyn &amp; Riki</b> — Sleeping Dragon Isle, day, Green" },
      { id: "c8-41", f: "h", t: "💜 <b>Dunban &amp; Sharla</b> — Ether Plant, day, Green" },
      { id: "c8-42", f: "h", t: "💜 <b>Sharla &amp; Riki</b> — Hovering Reef 2, day, Green" },
      { id: "c8-43", f: "h", t: "💜 <b>Reyn &amp; Melia</b> — Valley of Emperors south, High Entia Tomb, day, Green" },
      { id: "c8-44", f: "h", t: "💜 <b>Shulk &amp; Reyn</b> — Bone Corridor, Tephra Cave, day, Purple" },
      { id: "c8-45", f: "h", t: "💜 <b>Shulk &amp; Dunban</b> — Believer's Paradise, Bionis' Leg, day, Purple" },
      { id: "c8-46", f: "h", t: "💜 <b>Shulk &amp; Sharla</b> — Mining Base, Ether Mine, day, Purple",
        d: "The last three are a detour back through old areas. The Ether Jet makes it quick — run them as one loop." },
      { id: "c8-47", f: "m", t: "⛏️ <b>Sturdy Armour</b> ×4 — Housing 3. Flavel Andos, or trade Galdo in Alcamoth" },
      { id: "c8-48", f: "m", t: "⛏️ <b>Oil Branch</b> ×2, <b>Despair Clover</b> ×2, <b>Sea Berry</b> ×3 — Eryth Sea collection points" },
      { id: "c8-49", f: "m", t: "⛏️ <b>Shiny Kromar Hide</b> ×3 and <b>Slick Kromar Stone</b> ×2 — Commerce 3. Kill the Kromar variants" },
      { id: "c8-50", f: "m", t: "⛏️ <b>Jagged Tail</b> ×3 — Nature 3. Kill Eryth Hiln (same as A Friend in Need)" },
      { id: "c8-51", f: "m", t: "⛏️ <b>Squall Element</b> ×2 — Special 3. Kill Bono Nebula (same as Protect the Capital!)" },
      { id: "c8-52", f: "m", t: "⛏️ <b>Blue Ladybird</b> ×2 — Commerce 3. High Entia Tomb collection — get it during the Tomb sweep" },
      { id: "c8-53", f: "x", t: "Fill the <b>Eryth Sea</b>, <b>Alcamoth</b> and <b>High Entia Tomb</b> Collectopaedia pages" }
    ]
  },
  {
    id: "ch9", title: "Chapter 9", subtitle: "Prison Island (first visit)", level: "52-56",
    note: "A short, almost entirely linear story chapter. There is no side content on the island itself — its <b>8 Unique Monsters only exist on the second visit in Chapter 17</b>. Treat this as a breather and a checkpoint.",
    items: [
      { k: "lvl", t: "Set level to 55",
        d: "The chapter is a corridor with scripted fights. 55 clears it comfortably. Bank everything else.<br><br>"
         + "<b>Sanity check on your bank:</b> by now, doing every side quest, you should be carrying a substantial surplus. If your bank is thin you have been spending it — stop, because the post-game gap from Lv90 to Avalanche Abaasy at Lv120 is exactly what it is for." },
      { k: "build", t: "Checkpoint — where your build should be by now",
        d: "Before the back half of the game, confirm all of this:<br><br>"
         + "<b>Party:</b> Shulk (you) / Dunban / Riki. If you are still running Sharla, swap her out — Dunban's evasion means you barely take damage, which makes a dedicated healer dead weight.<br>"
         + "<b>Dunban:</b> agility and evasion branches prioritised, every Agility Up gem you own on him. He should already be dodging most physical attacks.<br>"
         + "<b>Monado Speed on Dunban</b> should be reflex by now. Evasion tank plus evasion buff is the strongest interaction in the game.<br>"
         + "<b>Skill Links:</b> you should have Affinity Coins from every Unique Monster killed so far. Spend them — <b>High Speed</b> from Melia (+15 Agility, 20 coins) onto Dunban first. Coins are refundable, so experiment freely.<br>"
         + "<b>Gems:</b> start deliberately crafting Agility Up. Remember the crafting pair's <b>affinity</b> sets how many furnace cycles you get, so craft with two characters who like each other." },

      { k: "info", t: "🔴 Imperial Staff — the window is open RIGHT NOW",
        d: "From <b>Chapter 10</b> you can obtain <b>Melia's Imperial Staff</b>, a unique weapon with an appearance you cannot get any other way. It is lost the moment <b>Kallian departs with the allied force</b>.<br><br>"
         + "<b>The catch that makes people miss it:</b> you must <b>switch your controlled character to Melia</b> and talk to Kallian yourself. On a Shulk-led run there is no reason you would ever do that, and the game never hints at it.<br><br>"
         + "It is listed again as the first item of Chapter 10. Do it the moment that chapter starts." },

      { id: "c9-01", f: "x", t: "Play through Prison Island — no side content exists here yet",
        d: "The island's 8 Unique Monsters (Ageless Moabit, Serene Imlaly, Inferno Heinrich, Cold Ageshu, both Clone Bargs, Masterful Gigapur, Fiendish Auburn) and its 3 Heart-to-Hearts all belong to the <b>second</b> visit in Chapter 17. Do not hunt for them." },
      { id: "c9-02", f: "g", t: "🏁 <b>Alcamoth Grand Prix pair unlocks</b> — Alcamoth Orbital and Alcamoth at Dawn",
        d: "<span class=step><b>Unlocks:</b> after the Prison Island events. Access from the main menu with <b>Y</b>.</span>"
         + "<span class=step><b>Gives:</b> the <b>arms</b> armour slot, one piece per character on first clear, plus Noponstone by rank.</span>"
         + "<span class=step><b>Alcamoth Orbital</b> is a Score Attack run at night, starting at the Main Entrance and finishing at the mural in the Great Hall.</span>" },
      { id: "c9-03", f: "s", t: "🟡 Clear both Alcamoth courses with <b>all seven characters before Chapter 15</b>",
        d: "<span class=step><b>The risk:</b> Alcamoth dies at Mechonis Core in Ch15. The Grand Prix is accessed from a menu and Alcamoth stays physically walkable from the Eryth Sea Centre Gate afterwards, so these courses <b>probably</b> survive — but no source confirms it.</span>"
         + "<span class=step><b>The call:</b> 14 of the 70 total clears are here. Doing them now costs about an hour and removes the question entirely. Being wrong costs 14 clears and the permanent Ether Jet bonus that needs all 70.</span>" }
    ]
  },
  {
    id: "ch10", title: "Chapter 10", subtitle: "Valak Mountain + the Purple sweep", level: "56-62",
    note: "By now everyone except Fiora has enough shared party time for Purple. Items 8-17 are one circuit: Colony 9 → Tephra → Bionis' Leg → Satorl → Makna → Colony 6 → Alcamoth. The Ether Jet makes it fast.",
    items: [
      { k: "lvl", t: "Set level to 60",
        d: "Valak runs Lv45-50. 60 is generous, but this chapter has a Lv100 superboss standing in the open and several Lv97-98 monsters, so a buffer stops an accidental encounter ending your session.<br><br>"
         + "<b>Do not</b> engage Final Marcus, Blizzard Belgazas, Avalanche Abaasy, Exposure Wolfol or Wandering Amon. All post-game." },
      { k: "build", t: "⚔️ Consider picking Melia up for a while",
        d: "This chapter has a lot of ether-weak enemies and you are about to spend real time on Valak. If you want to learn Melia before the post-game — where she is the fastest superboss killer — <b>this is the chapter to practise</b>.<br><br>"
         + "<b>Planned Melia rotation:</b> summon an elemental (Summon Bolt, Summon Ice etc.), retain the buffs you need, use <b>Summon Copy</b>, then discharge during a burst or Chain Attack window. Her AI does not reliably preserve that exact setup, so control her when using this preset.<br><br>"
         + "If that sounds like a chore, stay on Shulk. You lose nothing except a faster post-game." },
      { id: "c10-01", f: "d", t: "🔴 <b>Imperial Staff</b> — control <b>Melia</b> and talk to <b>Kallian</b>. Do it the moment the chapter starts",
        d: "<span class=step><b>The trap:</b> you must <b>switch your controlled character to Melia</b> yourself. On a Shulk-led run there is no reason you ever would, and the game never hints at it.</span>"
         + "<span class=step><b>Lost when:</b> Kallian departs with the allied force.</span>"
         + "<span class=step><b>Gives:</b> Melia's unique <b>Imperial Staff</b>, with an appearance obtainable no other way.</span>" },

      { k: "info", t: "The Magma Rock gates half of Valak Mountain",
        d: "<b>The Magma Rock</b> is a story quest, auto-given at <b>Harict Chapel</b>, cannot be declined. Kill <b>Conflagrant Raxeal</b> (Lv45) in the <b>Lava Cave</b> — 100% spawn, any time or weather, guaranteed Magma Rock drop.<br><br>"
         + "The rock melts <b>four ice walls</b> around the mountain. Downstream it unlocks the <b>Great Glacier</b> ice wall, which is where <code>Bad Timing</code> hides — and that is the middle of Dunban's skill tree chain. Without the Magma Rock, half this chapter does not exist." },
      { id: "c10-02", f: "u", t: "<b>The Magma Rock</b> (story) → kill <b>Conflagrant Raxeal</b> (45), Lava Cave",
        d: "Quest-exclusive Unique Monster, 100% spawn. Guaranteed Magma Rock drop. Affinity Coin." },

      { k: "info", t: "Dunban's Obstinance tree — six quests, two different NPCs, three locations",
        d: "The reason people miss this is that the chain <b>moves</b>. The Nopon Researcher who starts it is at the Nopon Camp, but two later steps are given by the <i>same NPC standing somewhere else entirely</i>, and the last two come from <b>Dakuku</b> instead.<br><br>"
         + "<b>No affinity gate on any of them</b> — it is purely sequential." },
      { id: "c10-03", f: "q", t: "<b>Chilkins and Antols</b> — Nopon Researcher, <b>Nopon Camp</b> (1 of 6)",
        d: "<span class=step><b>Do:</b> kill <b>5x Poleaxe Chilkin</b>, then <b>5x Ent Antol</b>, then talk to him.</span>"
         + "<span class=step><b>Pays:</b> 10,000 G · 3,300 EXP · +100 Rep · Spike Defence IV, Chill Defence IV, Paralysis Resist IV.</span>" },
      { id: "c10-04", f: "q", t: "<b>Valak Mountain Research</b> — Nopon Researcher, Nopon Camp (2 of 6) · no combat",
        d: "<span class=step><b>Do:</b> view the scenery at <b>Befalgar Pedestal</b>, then at <b>Kana Peak</b>, then return.</span>"
         + "<span class=step><b>Pays:</b> 11,500 G · 3,800 EXP · +150 Rep · Chill Defence V.</span>" },
      { id: "c10-05", f: "q", t: "<b>The Freezing Nopon</b> — Nopon Researcher at <b>Hollow Bone</b> (3 of 6) · different spot",
        d: "<span class=step><b>Do:</b> <b>3x Hox Flint</b> (Porcu Hoxes), <b>2x Antol Fire Pouch</b> (Ent Antols), <b>1x Feris Aged Ale</b> (a Noto Feris) — all on Valak Mountain.</span>"
         + "<span class=step><b>Pays:</b> 12,000 G · 4,500 EXP · +200 Rep · Heavy Leggings.</span>" },
      { id: "c10-06", f: "q", t: "<b>Bad Timing</b> — hidden behind the <b>Great Glacier ice wall</b> (4 of 6)",
        d: "<span class=step><b>How to find it:</b> melt the <b>Thick Ice Wall</b> in the <b>Great Glacier</b> with the Magma Rock and talk to the Nopon Researcher inside. Cannot be declined.</span>"
         + "<span class=step><b>Do:</b> kill <b>4x Cunning Chilkin</b> (quest-exclusive).</span>"
         + "<span class=step><b>Pays:</b> 13,800 G · 5,000 EXP · +200 Rep · Heavy Gear, Heavy Armour.</span>"
         + "<span class=step>This is the step that makes the Magma Rock a hard prerequisite for Dunban's tree.</span>" },
      { id: "c10-07", f: "q", t: "<b>Chilkin Changes</b> — <b>Dakuku</b>, Nopon Camp (5 of 6)",
        d: "<span class=step><b>Do:</b> investigate the <b>Chilkin Lair at Bagnar Snowfield</b>, then talk to Dakuku.</span>"
         + "<span class=step><b>Pays:</b> 15,000 G · 3,200 EXP · Blaze Defence V, Daze Resist II.</span>" },
      { id: "c10-08", f: "u", t: "<b>The Balance of Power</b> — Dakuku (6 of 6) · <b>⚠️ DUNBAN MUST LEAD</b> · <b>Dunban's Obstinance tree + 2 Unique Monsters</b>",
        d: "<span class=step><b>Leader gate:</b> Dakuku only offers the finale with Dunban leading.</span>"
         + "<span class=step><b>Do:</b> kill <b>Barbaric Sitri</b> (Lv47, <b>Antol Den</b>) and <b>Banquet Vassago</b> (Lv48, hatches from the large <b>Bonterra Pod</b> in Antol Den — <b>quest-exclusive</b>, 173,200 HP, weak to Topple and Daze), then talk to Dakuku.</span>"
         + "<span class=step><b>Pays:</b> 21,000 G · 8,500 EXP · +250 Rep · <b>Snaer Striker</b>, Stellar Gear, Stellar Gauntlets, <b>Dunban Skill Tree — Obstinance</b>.</span>"
         + "<span class=step><b>Correction:</b> Barbaric Sitri is <b>not</b> quest-exclusive — it is a normal field UM at ~30% spawn, any time or weather. Only Vassago needs the quest.</span>" },

      { id: "c10-09", f: "u", t: "Free-roaming Valak UMs: <b>Glorious Buer</b> (45), <b>Moonlight Paimon</b> (46, Lava Cave), <b>Vague Barbas</b> (46)" },
      { id: "c10-10", f: "u", t: "Night-only Valak UMs: <b>Agile Barbatos</b> (47), <b>Hidden Gamigin</b> (49), <b>North Star Gusion</b> (50)",
        d: "Gusion is west of Url Crevasse and needs <b>night AND a blizzard</b> — the second-fussiest spawn in the game after Proper Bandaz." },
      { id: "c10-11", f: "x", t: "<b>Final Marcus</b> (Lv100 superboss) is at Three Sage Summit at night. Note the spot, walk away",
        d: "You will come back for it first in the post-game superboss run, because it is the only one beatable without Night Vision gems." },
      { id: "c10-12", f: "q", t: "<b>Valak Monster Quests 1-4</b> — Nopon Merchant, <b>Zokhed Pass</b> · big money",
        d: "<span class=step>1. 2x Monta Moramora — 23,000 G · 2. 5x Sparas Pagul — 25,500 G · 3. 3x Bow Chilkin — 28,000 G · 4. 1x Sesna Lexos — 30,000 G</span>"
         + "<span class=step><b>106,500 G total.</b> Generic, so they auto-complete. Take all four before hunting. The merchant says there is no rush; sources disagree on whether they are timed, so just do them.</span>" },
      { id: "c10-13", f: "m", t: "⛏️ <b>Ice Cabbage</b> ×2 — Nature 3. Valak collection, <b>the grindiest item in the game</b>",
        d: "Find a landmark with clustered collection points and run the Skip Travel loop. <b>If it resists you more than twenty minutes, trade Yura on Valak Mountain instead</b>, or buy it with Noponstone at 13,600. This item is not worth an hour of your life." },
      { id: "c10-14", f: "m", t: "⛏️ <b>Snow Element</b> ×2 — Special 3. Kill Reef Nebula" },
      { id: "c10-15", f: "h", t: "<b>Riki &amp; Dunban</b> — Harict Chapel, day, Green." },
      { id: "c10-16", f: "h", t: "<b>Shulk &amp; Riki</b> — Jakt Geyser, day, Purple." },
      { id: "c10-17", f: "h", t: "<b>Dunban &amp; Melia</b> — Sororal Statues, Satorl Marsh, day, Purple." },
      { id: "c10-18", f: "h", t: "<b>Reyn &amp; Riki</b> — NW Twisted Tree Gate, Makna, day, Purple." },
      { id: "c10-19", f: "h", t: "<b>Reyn &amp; Sharla</b> — Agora Shore, Colony 9, day, Purple." },
      { id: "c10-20", f: "h", t: "<b>Reyn &amp; Melia</b> — Cylinder Hangar, Colony 9, day, Purple." },
      { id: "c10-21", f: "h", t: "<b>Sharla &amp; Riki</b> — Mechon Wreckage Site, Colony 9, day, Purple." },
      { id: "c10-22", f: "h", t: "<b>Dunban &amp; Riki</b> — Spring of Grief, Tephra Cave, <b>night</b>, Purple." },
      { id: "c10-23", f: "h", t: "<b>Shulk &amp; Melia</b> — Audience Chamber, Alcamoth, day, Purple." },
      { id: "c10-24", f: "h", t: "<b>Sharla &amp; Melia</b> — Melfica Road 1F far west, Alcamoth, <b>night</b>, Purple." },
      { id: "c10-25", f: "h", t: "<b>Reyn &amp; Dunban</b> — Pod Depot, Colony 6, day, Purple." },
      { id: "c10-26", f: "h", t: "<b>Dunban &amp; Sharla</b> — Hope Farm north, Colony 6, day, Purple." },
      { id: "c10-27", f: "g", t: "🏁 <b>Valak Grand Prix pair</b> — Valak Slalom and Blizzard Rally. <b>Legs</b> slot" },

      { k: "info", t: "🔴 The Frontier Village return trip — four quests and Riki's skill tree",
        d: "These only exist now, gated on <i>after Kallian sees the party off from Alcamoth</i>. If you looked for them in Chapter 7 and could not find them, this is why.<br><br>"
         + "The chain is <b>four deep</b>: <code>Medical Advancements</code> (or Fillings) → <code>Healing the Healer</code> → <code>Mislabelling Problem</code> → <code>Getting Bigger!</code>, with the affinity gate climbing <b>2★ → 3★ → 3★ → 3.5★</b>. That is why Chapter 7 told you to bank Central Bionis affinity." },
      { k: "branch", t: "Medical Advancements vs Let's Make Fillings! — both timed, mutually exclusive",
        d: "<b>Take Medical Advancements</b> (from <b>Medi</b>, Sacred Altar).<br><br>"
         + "<b>Medical Advancements:</b> 2x <b>Ories Horn</b> from Ories <b>on Valak Mountain</b> — convenient, you are already here. Pays <b>12,000 G / 5,300 EXP</b> / Topple Up IV.<br>"
         + "<b>Let's Make Fillings!:</b> from <b>Yusa</b> (some guides misspell him Yuka). 4x <b>Vang Milk Tooth</b> from Vangs in <b>Satorl Marsh</b> — a trip backwards. Pays 7,000 G / 2,500 EXP / Daze Up IV.<br><br>"
         + "Nearly double the gold and EXP, and no detour. Each expires the instant the other completes." },
      { id: "c10-28", f: "d", t: "🔴 <b>Medical Advancements</b> — Medi, Sacred Altar · needs <b>2★ Central Bionis</b> + <code>Mushy Mushrooms</code>",
        d: "<span class=step><b>Do:</b> <b>2x Ories Horn</b> from Ories on Valak Mountain → back to Medi.</span>"
         + "<span class=step><b>Pays:</b> 12,000 G · 5,300 EXP · +150 Rep · Topple Up IV.</span>" },
      { id: "c10-29", f: "q", t: "<b>Healing the Healer</b> — Npa, Sacred Altar · needs <b>3★</b>",
        d: "<span class=step><b>Do:</b> talk Medi → Yusa → sub-quest <code>Legendary Nopon Charm</code>: offer flowers at <b>four altars on Bionis' Leg</b> — near <b>Kasharpa Falls</b>, <b>Tranquil Grotto</b>, <b>Viliera Hill</b> and <b>southern Gaur Plain</b> → Yusa → Npa.</span>"
         + "<span class=step><b>Pays:</b> 5,200 G · 900 EXP · +150 Rep · Bleed Plus III.</span>" },
      { id: "c10-30", f: "q", t: "<b>Mislabelling Problem</b> — Medi · needs <b>3★</b>",
        d: "<span class=step><b>Do:</b> talk to <b>Puko</b> → kill <b>Abominable Hiln</b> (quest-exclusive) at <b>Showdown Cliff, Eryth Sea</b> → collect High Entia Medicine → Puko → Medi.</span>"
         + "<span class=step><b>Pays:</b> 6,000 G · 2,850 EXP · +150 Rep · Shell Gauntlets.</span>" },
      { id: "c10-31", f: "q", t: "<b>Getting Bigger!</b> — <b>Dabidabi, Chief's Residence</b> · needs <b>3.5★</b> · <b>⚠️ RIKI MUST LEAD</b> · <b>Riki's Cowardice tree</b>",
        d: "<span class=step><b>Leader gate:</b> Dabidabi only offers the quest with Riki leading.</span>"
         + "<span class=step><b>Do:</b> talk to <b>Adidi</b> → <b>5x Ekidno Jaw Gristle</b> from Ekidno at <b>Eryth Sea</b> → talk to <b>Puko</b> → sub-quest <code>Who is Bigger?</code>: give the Enlarging Seaweed to <b>Adidi</b> (Route B) to make Dabidabi and Adidi a <b>Happy Couple</b>, then talk to Dabidabi twice.</span>"
         + "<span class=step><b>Take Route B</b> — it is the only one that creates an Affinity Chart link.</span>"
         + "<span class=step><b>Pays:</b> 8,500 G · 4,800 EXP · +150 Rep · Shell Armour · <b>Riki Skill Tree — Cowardice</b>.</span>" },

      { k: "info", t: "The Mystery of Makna Ruins chain also opens now — and it ends in a Monado art",
        d: "Four quests from <b>Lupa at Riki's House</b>, gated on <code>Kind Lupa's Grampypon</code> from Chapter 7 plus the story reaching Makna near Valak.<br><br>"
         + "The payoff is unusually good: part 4 gives the <b>'Eater' Records — Monado Eater for Shulk</b> — plus the <b>Barrier Gnasher</b>, the <b>Heart of the Giants</b> (needed for The Final Giants' Ruins) and an advanced Battle Soul art book." },
      { id: "c10-32", f: "q", t: "<b>Mystery of Makna Ruins 1</b> — Lupa. Collect <b>3x Ancient Document</b> around Makna",
        d: "3,800 EXP · 5,500 G · Amethyst Gear · Lightning Attack II." },
      { id: "c10-33", f: "q", t: "<b>Mystery of Makna Ruins 2</b> — recite the prayer at <b>King Agni's Tomb</b>, investigate the coffin",
        d: "<span class=step>5,300 EXP · 6,200 G · Amethyst Gauntlets · Blaze Attack II.</span>"
         + "<span class=step>While you are here: <b>Brutal Gravar</b> (Lv46) spawns naturally at King Agni's Tomb at ~30%. It is <b>not</b> gated by this quest, contrary to most guides — but this is the reason you are standing here.</span>" },
      { id: "c10-34", f: "q", t: "<b>Mystery of Makna Ruins 3</b> — needs <b>3★</b>",
        d: "<span class=step><b>Do:</b> <b>3x Aqueous Andos Oil</b> from Flavel Andos (Eryth Sea) + <b>3x Algora Sap</b> from <b>Sap Cave</b>, Makna.</span>"
         + "<span class=step>7,200 EXP · 8,000 G · Amethyst Boots · Chill Attack II · Lubricant Oil.</span>" },
      { id: "c10-35", f: "q", t: "<b>Mystery of Makna Ruins 4</b> — auto-accepted → <b>Monado Eater</b>",
        d: "<span class=step><b>Do:</b> oil the coffin, descend.</span>"
         + "<span class=step><b>Pays:</b> 13,000 G · 10,000 EXP · <b>Barrier Gnasher</b> · <b>Heart of the Giants</b> · and a chest containing the <b>'Eater' Records (Monado Eater)</b> and an advanced Battle Soul art book.</span>" },

      { k: "info", t: "🔴 The Colony 6 Cook-Off and Berryjammy chains — and a leader gate",
        d: "Long, interlocking, and one step needs <b>Dunban leading</b>. Order:<br><br>"
         + "<code>Cook-Off Comeback?</code> → <code>Cook-Off Final Blow?!</code> and <code>A Delectable Delicacy</code><br>"
         + "<code>Missing Lodger</code> → <code>Looking for Freedom</code><br>"
         + "<code>Cursed</code> <b>or</b> <code>Weak Berryjammy</code> → <code>Obstinate</code> (<b>Dunban leads</b>) → <code>Unstoppable</code> → <b>Miss Sweetness Showdown</b> → <code>The Most Transparent Thing</code>" },
      { id: "c10-36", f: "q", t: "<b>Cook-Off Final Blow?!</b> — Talonyth · needs <b>2★ Colony 6</b>",
        d: "<span class=step><b>Do:</b> <b>Sky Frying Pan</b> near <b>Sky Stage</b>, Bionis' Leg → Talonyth → <b>Nature's Stove</b> near <b>Eks Watering Hole</b>, Makna → Talonyth.</span>"
         + "<span class=step><b>Pays:</b> 6,000 G · 2,050 EXP · Heavy Boots.</span>" },
      { id: "c10-37", f: "q", t: "<b>A Delectable Delicacy</b> — Pokapoka · needs <b>2★</b>",
        d: "<span class=step><b>Do:</b> <b>3x Bunnia Ham</b> from <b>Ether Bunnia</b> in Satorl Marsh.</span>"
         + "<span class=step><b>Pays:</b> 6,500 G · 1,900 EXP · Confuse Resist IV.</span>" },
      { id: "c10-38", f: "q", t: "<b>Looking for Freedom</b> — Nopo'rikh · needs <code>Missing Lodger</code> + <b>2★</b>",
        d: "<span class=step><b>Take Route A</b> (do not tell Ma'crish): <b>Smelly Perfume</b> from <b>Poison Swamp</b>, Satorl → talk Ma'crish → Nopo'rikh → <b>Pure Perfume</b> from <b>Great Makna Falls</b> → Nopo'rikh → Ma'crish. Nopo'rikh gets his freedom.</span>"
         + "<span class=step><b>Pays:</b> 7,200 G · 2,000 EXP · +200 Rep · Sky Cap, Shell Leggings.</span>"
         + "<span class=step><b>Unlocks</b> Nic's Training.</span>" },
      { id: "c10-39", f: "q", t: "<b>Cursed</b> or <b>Weak Berryjammy</b> — Norara · <b>which one you get depends on your residents</b>",
        d: "<span class=step><b>Cursed Berryjammy</b> appears if you invited <b>Berryjammy + Mefimefi</b>. <b>Weak Berryjammy</b> appears if you invited <b>Berryjammy + Perrine</b>. Since this guide told you to take Perrine, expect <b>Weak Berryjammy</b>.</span>"
         + "<span class=step><b>Weak Berryjammy:</b> <b>4x Thick Nectar</b> from Skeeters on Bionis' Leg + <b>4x Juicy Grapes</b> in Makna. 5,500 G · 1,500 EXP · Bind Resist IV.</span>" },
      { id: "c10-40", f: "d", t: "🔴 <b>Obstinate Berryjammy</b> — Norara · <b>⚠️ DUNBAN MUST LEAD</b>",
        d: "<span class=step><b>Switch your party leader to Dunban.</b> Berryjammy can only be talked round by him — with anyone else leading the quest does not progress and the whole Miss Sweetness line stops dead here.</span>"
         + "<span class=step><b>Do:</b> talk to Berryjammy as Dunban → return to Norara.</span>"
         + "<span class=step><b>Pays:</b> 6,500 G · 2,000 EXP · Panther Gloves.</span>" },
      { id: "c10-41", f: "q", t: "<b>Unstoppable Berryjammy</b> — Berryjammy · needs <code>Chemist's Reopening</code> + <b>3★</b>",
        d: "<span class=step><b>Route B is faster:</b> talk to <b>Olga</b> → talk to Berryjammy. No collecting at all. Route A wants 3x Caterpile Vinegar from Satorl Caterpiles for the same reward.</span>"
         + "<span class=step><b>Pays:</b> 7,800 G · 2,300 EXP · +150 Rep · Shell Leggings.</span>" },
      { id: "c10-46", f: "q", t: "<b>Cook-Off Showdown!</b> — Ma'crish, Colony 6 · <b>⚠️ REYN MUST LEAD</b> · <b>Reyn's Impatience tree</b>",
        d: "<span class=step><b>Requires:</b> <code>Missing Lodger</code>, <code>Cook-Off Final Blow?!</code>, 2.5★ Colony 6 and Reyn leading.</span>"
         + "<span class=step><b>Do:</b> speak to Hoko → collect <b>2x Soya Paste Shell</b> from Entma Kings near Mechonis Wound, Valak Mountain → return to Hoko with Reyn leading → report to Ma'crish.</span>"
         + "<span class=step><b>Choose Route B, “Make food that you want to make,”</b> for the otherwise unavailable HP Steal gem.</span>"
         + "<span class=step><b>Pays:</b> 7,500 G · 2,200 EXP · Brave Top · <b>Reyn Skill Tree — Impatience</b>. Unlocks <code>Miss Sweetness Showdown</code>.</span>" },
      { id: "c10-42", f: "d", t: "🔴 <b>Miss Sweetness Showdown</b> — take the <b>Ma'crish</b> version · needs <b>3.5★</b> + <code>Cook-Off Showdown!</code>",
        d: "<span class=step><b>Near coin flip.</b> Ma'crish: 11,000 G · 5,000 EXP · <b>Amethyst Armour</b>. Berryjammy: 10,000 G · 5,300 EXP · Amethyst Leggings. Affinity outcome is identical either way.</span>"
         + "<span class=step>Take Ma'crish for the extra 1,000 G and the chest piece. Completing one expires the other.</span>"
         + "<span class=step><b>Do:</b> complete <code>The Most Transparent Thing</code>, then report back.</span>" },
      { id: "c10-43", f: "q", t: "<b>The Most Transparent Thing</b> — 12,000 G · 6,800 EXP",
        d: "<span class=step><b>Do:</b> talk to <b>Lalapa</b> in Frontier Village → talk to <b>Dakuku</b> on Valak Mountain → collect <b>1x Pure Ice Flower</b> near <b>Url Crevasse</b>, Valak Mountain.</span>"
         + "<span class=step>Url Crevasse is also where <b>North Star Gusion</b> spawns at night during a blizzard. Combine the trips if the weather cooperates.</span>" },

      { k: "info", t: "Two Alcamoth quests that only open now — go back for them",
        d: "<b>Adventurers in Peril</b> (Miriall, Imperial Palace, needs 2.5★): find <b>Zain</b> and <b>Kurralth</b> injured near <b>Three Sage Summit</b> on Valak Mountain, then report. 11,000 G · 5,200 EXP · Black Sniper. <b>Take this over The Missing Partner</b> — that Ch17 alternative pays more but leaves the Affinity Chart unchanged.<br><br>"
         + "<b>Believing Again</b> (Vidian, Imperial Palace, needs <code>Building Bridges</code> + 1.5★): collect <b>Morning Dew Ice</b> at <b>Befalgar Pedestal</b>, Valak Mountain — <b>dawn or morning only</b> → Vidian → Lesunia → return. 8,500 G · 4,200 EXP · Amethyst Armour. Unlocks <b>Vidian Rescue Mission</b> in Ch17 (58,000 G / 97,500 EXP).<br><br>"
         + "Both targets are on Valak Mountain. <b>Do them on this trip</b>, not as a separate journey." },
      { id: "c10-44", f: "d", t: "🔴 <b>Adventurers in Peril</b> — Miriall, Alcamoth · needs <b>2.5★</b> · targets on Valak" },
      { id: "c10-miss-mumkhars-razor", f: "d", t: "🔴 Trade with <b>Kurralth on Valak Mountain</b> for <b>Mumkhar's Razor</b>",
        d: "This permanently missable Easter-egg collectable is only in Kurralth's trade inventory while he is on Valak Mountain. Get it during <code>Adventurers in Peril</code> and before the Mechonis Core cutoff." },
      { id: "c10-45", f: "d", t: "🔴 <b>Believing Again</b> — Vidian, Alcamoth · needs <b>Building Bridges</b> · <b>dawn/morning only</b>" }
    ]
  },
  {
    id: "ch11", title: "Chapter 11", subtitle: "Sword Valley and Galahad Fortress", level: "62-66",
    note: "<b>11 Unique Monsters, 4 quests, 2 materials and 2 Collectopaedia pages all die at Jade Face in Chapter 13.</b> Take the quests before hunting — four UMs will not spawn otherwise. The four quests pay 145,000 G toward your 2,000,000 G Colony 6 bill.",
    items: [
      { k: "lvl", t: "Set level to 65",
        d: "Sword Valley runs Lv49-57, Galahad Fortress Lv52-55. 65 handles the lot including Mischievous Naberius.<br><br>"
         + "This is a linear military corridor with a hard deadline attached, so err on the side of comfortable — you want to be clearing the checklist, not retrying fights." },
      { k: "build", t: "⚔️ Bring Blaze Defence gems specifically",
        d: "One monster here — <b>Mischievous Naberius</b> behind the 3rd Gate — punishes you badly without <b>Blaze Defence</b>. Craft or equip a couple before you come.<br><br>"
         + "Everything here is Mechon, so keep <b>Monado Enchant</b> up for physical attackers other than returned Fiora, who can damage Mechon normally." },

      { k: "info", t: "🔴 Everything below dies at Jade Face in Chapter 13",
        d: "You pass through Fallen Arm (Ch12) in between, which gives you exactly one return trip. Do not rely on it.<br><br>"
         + "<b>Total loss if you skip this chapter:</b> 11 Unique Monsters · 4 quests worth <b>145,000 G and 50,000 EXP</b> · 2 Colony 6 materials · 2 Collectopaedia pages.<br><br>"
         + "Note that <b>Galahad Fortress has no side quests at all</b> — its four quests are story-only and unavoidable. The quest value is entirely in Sword Valley." },
      { k: "info", t: "The four Sword Valley quests have no quest giver",
        d: "All four are <b>Surprise Quests</b>: they trigger automatically when you approach the location and <b>cannot be declined</b>. There is nobody to talk to.<br><br>"
         + "So do not sweep looking for NPCs — just walk the map and they will fire. Three of them spawn a Unique Monster as their objective.<br><br>"
         + "They expire <i>after the party enters the Central Factory and Vanea points where to go</i>, which is Chapter 14 — slightly later than Jade Face, but the <b>area</b> closes at Jade Face, so treat Chapter 13 as the real deadline." },
      { id: "c11-01", f: "d", t: "🔴 <b>Secure Dolgan Outpost</b> → <b>Prudent Purson</b> (49) · 28,000 G",
        d: "<span class=step><b>Triggers:</b> approaching the <b>Dolgan Outpost</b>.</span>"
         + "<span class=step>182,400 HP, ~30% spawn, any time or weather. <b>70% Break and 60% Pierce resistance</b>, so lean on Topple and Daze instead. Its battle theme is <i>You Will Know Our Names</i>, which tells you the game considers it a real fight.</span>"
         + "<span class=step><b>Pays:</b> 28,000 G · 5,000 EXP · Orion Cap · Affinity Coin.</span>" },
      { id: "c11-02", f: "d", t: "🔴 <b>Secure Enalda Control Base</b> → <b>Tranquil Morax</b> (50) · 32,000 G",
        d: "<span class=step><b>Triggers:</b> approaching the <b>Enalda Control Base</b>.</span>"
         + "<span class=step>164,800 HP, ~30% spawn, any conditions.</span>"
         + "<span class=step><b>Pays:</b> 32,000 G · 8,000 EXP · Orion Gloves · Affinity Coin.</span>" },
      { id: "c11-03", f: "d", t: "🔴 <b>Secure the Radio Tower</b> → <b>Lightning Ronove</b> (55) · 45,000 G",
        d: "<span class=step><b>Triggers:</b> approaching the <b>Radio Tower</b>.</span>"
         + "<span class=step>214,200 HP. <b>Quest-exclusive</b> — no quest, no monster, ever.</span>"
         + "<span class=step><b>Pays:</b> 45,000 G · 22,000 EXP · Topple Resist IV · Daze Resist IV · Affinity Coin. Best single payout of the four.</span>" },
      { id: "c11-04", f: "d", t: "🔴 <b>3rd Gate Front Line</b> · 40,000 G",
        d: "<span class=step><b>Triggers:</b> passing through the <b>3rd Gate</b> once it is opened.</span>"
         + "<span class=step><b>Do:</b> kill <b>Reinforcement M104</b> (Lv53). 100% spawn. This one is <b>not</b> a Unique Monster despite the fanfare, so no Affinity Coin.</span>"
         + "<span class=step><b>Pays:</b> 40,000 G · 15,000 EXP · Orion Shoes.</span>" },
      { id: "c11-05", f: "d", t: "🔴 Free-roaming Sword Valley UMs: <b>Defective Ipos</b> (50), <b>Fate Labolas</b> (51), <b>Benevolent Aim</b> (51), <b>Kamikaze Bune</b> (53)",
        d: "West of the Ether Storage Area, Port Maintenance Bay, Monado Wound and north of the Control Tower respectively. No quests needed." },
      { id: "c11-06", f: "d", t: "🔴 UM: <b>Mischievous Naberius</b> (57) — behind the 3rd Gate · <b>bring Blaze Defence</b>",
        d: "The most dangerous thing in the chapter for its level. Do not walk in without the gems." },
      { id: "c11-07", f: "d", t: "🔴 Galahad Fortress UMs: <b>Glacier Acon</b> (52), <b>Precious Retrato</b> (53), <b>Glorious Jurom</b> (55)",
        d: "1st Turbine Room, 3rd Fuel Supply Room and Ether Blast Furnace. You pass all three on the story route, so just do not run past them." },
      { id: "c11-08", f: "d", t: "🔴 ⛏️ <b>Red Frontier</b> ×2 — Housing 5. <b>Sword Valley collection points</b>",
        d: "Backup exists — trade <b>Rizaka</b> at Hidden Machina Village in Ch12 — but grab it here so you have the choice." },
      { id: "c11-09", f: "d", t: "🔴 ⛏️ <b>Art Core Coil</b> ×2 — Commerce 5. <b>Galahad Fortress collection points</b>",
        d: "Backup: trade <b>Kazat</b> at Hidden Machina Village in Ch12." },
      { id: "c11-miss-fashion", f: "d", t: "🔴 Buy every unique appearance from the <b>Sword Valley Supply Convoy</b>",
        d: "Shop inventories disappear with their areas. Buy at least one of every shop-exclusive weapon and armour appearance before Jade Face, especially the <b>Anti-Mechon Driver</b>. Fashion unlocks are saved globally, so you may save, buy the stock, then reload to keep the appearances without spending the money." },
      { id: "c11-10", f: "d", t: "🔴 Fill the <b>Sword Valley</b> and <b>Galahad Fortress</b> Collectopaedia pages",
        d: "Sword Valley's completion chain includes <b>Cosmic Nibbler</b> and <b>Arkose Pike</b>. Neither area ever returns." },
      { k: "info", t: "Galahad Fortress's four quests are story-only",
        d: "Nothing to hunt for and nothing missable: <b>Lift Battle</b> (find the Fortress Pass Key), <b>Turbine Battle</b> (stop both turbines), <b>Supply Station Battle</b> (stop the piston in the Piston Control Room), and <b>Fiora's Conviction</b> — which is the <b>Face Nemesis</b> boss fight. All auto-given, none declinable." }
    ]
  },
  {
    id: "ch12", title: "Chapter 12", subtitle: "Fallen Arm", level: "66-70",
    note: "<b>Fiora rejoins.</b> Third big material stop, seven Heart-to-Hearts, and a village full of traders whose stock you will need later. Several quests here reach into <b>Mechonis Field</b>, which dies in Chapter 14 — so the Fallen Arm quests that send you there die with it.",
    items: [
      { k: "lvl", t: "Set level to 68",
        d: "Fallen Arm runs Lv54-58. 68 handles it and keeps <b>Powerful Eligos</b> (Lv80, Digit 1) as an optional stretch fight rather than an instant death.<br><br>"
         + "Leave <b>Wicked Sallos</b> (95) and <b>Ancient Daedala</b> (105 superboss, Wreckage Beach) alone. Daedala does not even spawn until after Mechonis Core." },
      { k: "build", t: "⚔️ Fiora is back — and she is not a straight upgrade",
        d: "Mechon Fiora rejoins with high mobility and strong damage. <b>But keep Shulk / Dunban / Riki.</b><br><br>"
         + "<b>Why:</b> Fiora's AI is mediocre and underperforms her ceiling badly. Riki's AI plays him near-optimally. Swapping Riki out for Fiora is a downgrade unless <i>you</i> control her, and you are controlling Shulk.<br>"
         + "<b>What Fiora is for:</b> her affinity. Ten Heart-to-Hearts involve her and they have been frozen since Chapter 2. Run her in the party during ordinary fights to build affinity, then swap back for anything hard.<br><br>"
         + "<b>Gear note:</b> Fiora uses Mechon armour, a separate equipment pool. Do not sell Machina gear you pick up here." },

      { k: "info", t: "🔴 What dies and when — three different deadlines converge here",
        d: "<b>Chapter 13, Jade Face:</b> Sword Valley and Galahad Fortress. <b>This is your last safe trip</b> — if anything from Chapter 11 is unticked, go now.<br>"
         + "<b>Chapter 14, Meyneth Shrine:</b> Mechonis Field. Several Fallen Arm quests send you there, so <b>they die too even though Fallen Arm survives</b>.<br>"
         + "<b>Fallen Arm itself never closes.</b> You return in Chapter 17 and the superboss spawns here post-game." },
      { id: "c12-01", f: "d", t: "🔴 <b>Last safe trip to Sword Valley and Galahad Fortress</b> — check Chapter 11 is empty" },
      { id: "c12-02", f: "d", t: "🔴 <b>The History of Mechonis</b> — Zilex, Junks bridge (next to Miqol), any hour",
        d: "<span class=step><b>Do:</b> collect <b>4x Memory 925 Piece</b> in <b>Mechonis Field</b>.</span>"
         + "<span class=step><b>Pays:</b> 15,000 G · 11,000 EXP · <b>+500 Rep</b> · Paralysis IV.</span>"
         + "<span class=step><b>Dies with Mechonis Field</b> in Ch14.</span>" },
      { id: "c12-03", f: "d", t: "🔴 <b>The History of the Capital</b> — Zilex, Junks",
        d: "<span class=step><b>Do:</b> collect <b>1x Memory 903</b> from the <b>Judicial District, Agniratha</b>.</span>"
         + "<span class=step><b>Pays:</b> 16,800 G · 14,500 EXP · <b>+500 Rep</b> · M100 Helm, M100 Arms, Slow IV.</span>"
         + "<span class=step>Needs Agniratha, so it completes in Ch14 — and dies at the Meyneth Shrine. Take it now, finish it there.</span>" },
      { id: "c12-04", f: "d", t: "🔴 <b>For My Loved One...</b> — Zarkort, Digit 2 Plain · <b>thunderstorm only</b>",
        d: "<span class=step><b>Do:</b> collect <b>1x Tear of the Sky</b> at the <b>Distant Fingertip</b> — <b>only during a thunderstorm</b>. Wait for weather; there is no other way.</span>"
         + "<span class=step><b>Pays:</b> 10,000 G · 7,600 EXP · +300 Rep · Alcyone Bottoms.</span>" },
      { id: "c12-05", f: "d", t: "🔴 <b>To My Loved One...</b> — Zarkort · turn in at <b>Mechonis Field</b>",
        d: "<span class=step><b>Do:</b> Zarkort is afraid of heights and will not go himself. Deliver the <b>Tear of the Sky</b> to <b>Bozatrox</b> at the <b>Machina Refuge, Mechonis Field</b>.</span>"
         + "<span class=step><b>Turn in:</b> Bozatrox, not Zarkort.</span>"
         + "<span class=step><b>Pays:</b> 13,600 G · 10,000 EXP · Alcyone Top.</span>"
         + "<span class=step><b>Unlocks</b> Best Boots, which also dies with Mechonis Field.</span>" },
      { id: "c12-06", f: "q", t: "<b>Fixing a Broken Door</b> → <b>The Wilted Flower</b> — Rizaka, Junks · <b>6:00-18:00 only</b>",
        d: "<span class=step><b>The Wilted Flower</b> needs <b>1.5★ Hidden Machina Village</b>: collect <b>1x Pure Water</b> at <b>Zakt Spring</b> → Rizaka → <b>5x Electric Upa Tears</b> from <b>Prado Upas</b> on Fallen Arm → Rizaka.</span>"
         + "<span class=step><b>Pays:</b> 12,300 G · 9,000 EXP · Lightning Attack IV · <b>Mechonis Key</b>.</span>"
         + "<span class=step><b>Unlocks</b> Scheduled Inspection and The Oath Sword. Rizaka only talks during daylight hours.</span>" },
      { id: "c12-07", f: "u", t: "<b>Scheduled Inspection</b> — Xekit, <b>Ether Light</b>, <b>18:00-6:00 only</b> → <b>Evil Bathin</b> (54)",
        d: "<span class=step><b>Two gates:</b> needs <code>The Wilted Flower</code> and <b>2.5★ Hidden Machina Village</b>, and <b>Xekit only exists at night</b>.</span>"
         + "<span class=step><b>Do:</b> kill <b>Evil Bathin</b> at the <b>Ether Exhaust System</b>. 215,700 HP, Mechon, weak to Topple and Daze. Drops Silence (rifle) and Frozen Gauntlets.</span>"
         + "<span class=step><b>Pays:</b> 16,000 G · 12,000 EXP · <b>+500 Rep</b> · Break IV · Affinity Coin.</span>" },

      { k: "grind", t: "⛏️ Hidden Machina Village is a shop run, not just a quest hub",
        d: "Six traders live here, and between them they stock <b>two materials you can otherwise lose forever</b>. Do a full shopping trip before you leave.<br><br>"
         + "<b>Rizaka</b> (6:00-18:00) — sells <b>Red Frontier</b>, your backup for the Sword Valley collectable.<br>"
         + "<b>Kazat</b> (near the entrance, 6:00-18:00) — sells <b>Art Core Coil</b>, your backup for the Galahad Fortress collectable.<br>"
         + "<b>Eleqa</b> (village entrance, 6:00-18:00) — Ponio Hoof Seal, Sour Turnip, and overtrades White Plum.<br>"
         + "<b>Xekit</b> (Ether Light, <b>18:00-6:00</b>) — Royal Volff Hide, Stellar Gear, Bud of Eternity.<br>"
         + "<b>Shilx</b> (6:00-18:00) — Silver Antol Fibre, Oil Oyster, Electric Upa Tears.<br>"
         + "<b>Rakzet</b> (small island, ~1:00-21:00) — Silver Antol Fibre, Angel Engine Y.<br><br>"
         + "Note the <b>day/night split</b>: Xekit is nocturnal and everyone else is not, so you need two visits." },
      { id: "c12-08", f: "d", t: "🔴 ⛏️ Buy <b>Red Frontier</b> from <b>Rizaka</b> and <b>Art Core Coil</b> from <b>Kazat</b>",
        d: "Your insurance against having missed the Sword Valley and Galahad Fortress collection points. If you already have them, skip." },
      { id: "c12-miss-fashion", f: "d", t: "🔴 Register every unique <b>Hidden Machina Village</b> shop appearance",
        d: "Buy one of each distinct weapon and armour appearance before the Meyneth Shrine cutoff, including <b>Sparrow Blades</b> and <b>Murder Knives</b>. Fashion unlocks are global, so save → buy → reload works if you want to preserve your money." },
      { id: "c12-09", f: "m", t: "⛏️ <b>Ponio Hoof Seal</b> ×5 — Housing 4. <b>Lampo Ponio at night</b>, or trade Eleqa" },
      { id: "c12-10", f: "m", t: "⛏️ <b>Royal Volff Hide</b> ×3 — Housing 4. <b>Caelum Volff at night</b>, or trade Xekit" },
      { id: "c12-11", f: "m", t: "⛏️ <b>Piranhax Fishmeal</b> ×5 — Commerce 4. <b>Fair Piranhax. No trade exists anywhere in the game</b>",
        d: "The only Colony 6 material with no purchase or trade option. You must kill for it. Do it now while you are here." },
      { id: "c12-12", f: "m", t: "⛏️ <b>Silver Antol Fibre</b> ×8 — Commerce 4. Kill antols, or trade Shilx / Rakzet",
        d: "Largest single quantity on the entire bill of materials. Buying some is reasonable." },
      { id: "c12-13", f: "m", t: "⛏️ Fallen Arm collection: <b>Warning Lamp</b> ×3, <b>Sour Turnip</b> ×3, <b>Oil Oyster</b> ×3, <b>White Plum</b> ×3, <b>Rainbow Slug</b> ×2" },

      { k: "weather", t: "One night circuit, one thunderstorm — plan both",
        d: "<b>Night trip:</b> <b>Lampo Ponio</b> (Ponio Hoof Seal ×5) · <b>Caelum Volff</b> (Royal Volff Hide ×3) · <b>Aged Leraje</b> (Lv56 UM, Radiocarpea Coast) · <b>Xekit's shop</b> at Ether Light · <b>Fiora &amp; Sharla</b> Heart-to-Heart near Junks. Five objectives, one night.<br><br>"
         + "<b>Thunderstorm:</b> <b>Tear of the Sky</b> at the Distant Fingertip (For My Loved One...). Nothing else needs the storm, so just wait for one.<br><br>"
         + "<b>6:00 PM exactly:</b> <b>Prosperous Zepar</b> (Lv56) at Jifum Beach, northeast of the mining station. One of only two hour-specific spawns in the game." },
      { id: "c12-14", f: "u", t: "UM: <b>Aged Leraje</b> (56) — Radiocarpea Coast · <b>night</b>" },
      { id: "c12-15", f: "u", t: "UM: <b>Prosperous Zepar</b> (56) — Jifum Beach, NE of the mining station · <b>6:00 PM</b>" },
      { id: "c12-16", f: "u", t: "UM: <b>Affluent Beleth</b> (57) — in the water at the 5th Pulse Zone" },
      { id: "c12-17", f: "u", t: "UM: <b>Splendid Botis</b> (58) — Digit 5 Beach" },
      { id: "c12-18", f: "u", t: "UM: <b>Powerful Eligos</b> (80) — Digit 1. Stretch fight, or come back later" },

      { id: "c12-19", f: "h", t: "💜 <b>Fiora &amp; Sharla</b> — near Junks, <b>night</b>, Green" },
      { id: "c12-20", f: "h", t: "💜 <b>Riki &amp; Melia</b> — Inlet Beach, day, Purple" },
      { k: "info", t: "Five more Fallen Arm Heart-to-Hearts are waiting on Fiora's affinity",
        d: "<b>Shulk &amp; Fiora</b> (Wreckage Beach, Purple), <b>Shulk &amp; Riki</b> (Distant Fingertip, Pink), <b>Fiora &amp; Dunban</b> (Junks 2F, Pink), <b>Fiora &amp; Melia</b> (Digit 1, Pink), <b>Dunban &amp; Melia</b> (Black Wreckage, Pink).<br><br>"
         + "Fiora has been away for ten chapters, so hers are all low. <b>Run her in the party through ordinary fights this chapter</b> and the Purple ones become reachable in Chapter 13's Fiora sweep. The Pink ones are post-game regardless.<br><br>"
         + "Fallen Arm is the densest Heart-to-Heart region in the game at seven, so it is worth a dedicated return trip later rather than forcing them now." }
    ]
  },
  {
    id: "ch13", title: "Chapter 13", subtitle: "Mechonis Field + the Fiora sweep", level: "70-72", lock: "Jade Face closes Sword Valley and Galahad Fortress",
    note: "<b>Jade Face destroys Sword Valley and Galahad Fortress.</b> Items 7-16 are the Fiora sweep — run it as one circuit before Chapter 15.",
    items: [
      { k: "lvl", t: "Set level to 71",
        d: "Short chapter, Lv57-61 enemies, Jade Face at 60. 71 is plenty.<br><br>"
         + "Most of your time here is the <b>Fiora sweep</b> back through old areas, not fighting. Do not over-level for it." },
      { k: "boss", t: "🔴 Jade Face is the point of no return for two entire areas",
        d: "Beating Jade Face permanently closes <b>Sword Valley</b> and <b>Galahad Fortress</b>.<br><br>"
         + "<b>Stop and check your Chapter 11 list before you engage.</b> Eleven Unique Monsters, four quests worth 145,000 G, two Colony 6 materials and two Collectopaedia pages are on the line. This is your last opportunity, and there is no warning in-game.<br><br>"
         + "<b>The fight itself:</b> Mechon, so keep <b>Monado Enchant</b> active for physical attackers other than returned Fiora. Otherwise a standard boss." },
      { id: "c13-01", f: "d", t: "🔴 <b>Before Jade Face — go back and confirm every Chapter 11 item is ticked</b>",
        d: "Filter this guide to Deadlines and scan Chapter 11. If anything is open, Fallen Arm connects back — go now." },
      { id: "c13-15", f: "q", t: "<b>The Oath Sword</b> — Karlos, Hidden Machina Village entrance · <b>18:00-6:00</b> · <b>⚠️ FIORA MUST LEAD</b> · <b>Fiora's Rashness tree</b>",
        d: "<span class=step><b>Do this as soon as Mechonis Field opens.</b> Requires <code>The Wilted Flower</code> and 2★ Hidden Machina Village.</span>"
         + "<span class=step><b>Do:</b> from Ulna Passage activate the Pressure Control Device west of the 5th Pulse Zone tunnel → climb to the upper level → head south and drop to the Power Pipe Ruins → collect the Oath Sword → return to Karlos.</span>"
         + "<span class=step><b>Pays:</b> 15,200 G · 11,000 EXP · Jack Daggers · <b>Fiora Skill Tree — Rashness</b>.</span>" },
      { k: "info", t: "Mechonis Field's own content is listed in Chapter 14",
        d: "You pass through Mechonis Field here, but its quests and Unique Monsters do not expire until the <b>Meyneth Shrine events in Chapter 14</b>. To avoid listing them twice, they all live in Chapter 14's list — the Garrisoned Troop challenge quests, Bozatrox's <code>Best Boots</code>, the five Unique Monsters and the two Colony 6 materials.<br><br>"
         + "If you would rather clear it now while you are standing in it, jump to Chapter 14 and work its Mechonis Field block early. Nothing stops you." },
      { id: "c13-02", f: "d", t: "<b>Mossy Panel</b> x2 (Commerce 4) — Mechonis Field collection. Backup: trade Nopo'rikh in Colony 6." },
      { id: "c13-03", f: "d", t: "<b>Azure Hollyhock</b> x2 (Special 4) — Mechonis Field collection. Backup: trade Scarlen in Satorl Marsh, post-Mechonis Core." },
      { id: "c13-04", f: "d", t: "Fill the Mechonis Field Collectopaedia page (<b>Taurus Greaves</b>, <b>Taurus Helm</b>)." },
      { id: "c13-05", f: "h", t: "<b>Shulk &amp; Fiora</b> — Wreckage Beach, Fallen Arm, day, Purple." },
      { id: "c13-06", f: "h", t: "<b>Fiora &amp; Dunban</b> — Hope Farm south, Colony 6, day, Purple." },
      { id: "c13-07", f: "h", t: "<b>Fiora &amp; Riki</b> — Armu Farm north, Colony 6, day, Purple." },
      { id: "c13-08", f: "h", t: "<b>Fiora &amp; Sharla</b> — west of Prophecy Hut, Frontier Village, day, Purple." },
      { id: "c13-09", f: "h", t: "<b>Fiora &amp; Melia</b> — Nopon Tower, Frontier Village, day, Purple." },
      { id: "c13-10", f: "h", t: "<b>Reyn &amp; Fiora</b> — La Luz Church secret passage, Valak, <b>night</b>, Purple." },
      { id: "c13-11", f: "h", t: "<b>Fiora &amp; Dunban</b> — east of Fountain of Hope, Alcamoth, day, Green." },
      { id: "c13-12", f: "h", t: "<b>Fiora &amp; Riki</b> — Great Hall, Alcamoth, day, Green." },
      { id: "c13-13", f: "h", t: "<b>Fiora &amp; Melia</b> — Whitewing Villa, Alcamoth, day, Green." },
      { id: "c13-14", f: "h", t: "<b>Reyn &amp; Fiora</b> — Dunban's house, Colony 9, day, Green. Only if you missed it in Ch2." }
    ]
  },
  {
    id: "ch14", title: "Chapter 14", subtitle: "Central Factory and Agniratha", level: "72-76", lock: "The Meyneth Shrine events close Mechonis Field and Agniratha",
    note: "<b>The Meyneth Shrine events kill Mechonis Field and Agniratha.</b> Second-worst loss point, stacked directly on top of the worst one.",
    items: [
      { k: "lvl", t: "Set level to 75",
        d: "Agniratha runs Lv63-68, Central Factory Lv58-70. 75 clears everything including Magestic Mordred.<br><br>"
         + "<b>Do not overshoot.</b> The next chapter is the largest loss point in the game and you want to be doing quests, not steamrolling. Bank the surplus." },
      { k: "build", t: "⚔️ Everything here is Mechon — keep Monado Enchant up",
        d: "Both areas are wall-to-wall Mechon. Keep <b>Monado Enchant</b> active for most physical party members; returned Fiora is the exception and can damage Mechon normally without it.<br><br>"
         + "Refresh it the moment it lapses. If you find yourself doing no damage, that is why.<br><br>"
         + "<b>Fiora note:</b> as a Mechon herself, she is strong here. Good chapter to run her for affinity ahead of Chapter 13's sweep." },

      { k: "info", t: "🔴 Two separate deadlines, and Agniratha's is the tighter one",
        d: "<b>The Meyneth Shrine events kill Mechonis Field AND Agniratha.</b> Everything below in those areas is gone permanently.<br>"
         + "<b>Central Factory survives to Chapter 16</b>, so its monsters and Collectopaedia page get a second window. Its <b>surprise quests do not</b> — those die at Mechonis Core.<br><br>"
         + "Priority if you are short on time: <b>Agniratha first</b>, Central Factory second." },

      { k: "info", t: "Agniratha's quests all come from TERMINALS, not people",
        d: "This catches people out — there are no NPCs handing out quests in Agniratha. Everything is a <b>terminal in the Central Tower</b>. Four terminals, fourteen quests:<br><br>"
         + "<b>Military Status Terminal</b> — 4 quests, each spawns a Unique Monster<br>"
         + "<b>Civil Protection Terminal</b> — <b>6</b> quests (1-1 to 2-3), ordinary Mechon kills<br>"
         + "<b>City Planning Terminal</b> — 2 Beautification collect quests<br>"
         + "<b>Strategic Intel Terminal</b> — 2 Telethia Investigation quests, the only Agniratha quests that pay EXP<br><br>"
         + "<b>Take all fourteen before you start hunting.</b> They pay roughly <b>640,000 G</b> between them." },
      { id: "c14-01", f: "d", t: "🔴 <b>Military Status 1-1</b> → <b>Vagabond Allocer</b> (63) — <b>Helas Pillar</b> · 79,000 G",
        d: "186,500 HP, Aerial Mechon, weak to Topple, Daze and Paralysis." },
      { id: "c14-02", f: "d", t: "🔴 <b>Military Status 1-2</b> → <b>Wise Gremory</b> (68) — <b>Meyneth Statue</b> · 68,500 G",
        d: "329,700 HP, ~30% spawn, weak to Topple. The quest text says Zedonia Plaza; the monster is actually west of the <b>Meyneth Statue</b>. Trust the statue." },
      { id: "c14-03", f: "d", t: "🔴 <b>Military Status 2-1</b> → <b>Meditative Varla</b> (65) — <b>Telethia Bridge</b> · 75,000 G",
        d: "270,300 HP, weak to Topple and Daze. Same quest-text discrepancy — it is at the bridge, not Zedonia Plaza." },
      { id: "c14-04", f: "d", t: "🔴 <b>Military Status 2-2</b> → <b>Wrathful Orobas</b> (67) — <b>Dios Pillar</b> · 83,500 G",
        d: "386,700 HP, ~30% spawn, weak to Pierce, Topple and Daze. The beefiest of the four." },
      { id: "c14-05", f: "d", t: "🔴 <b>Civil Protection 1-1 to 2-3</b> — six quests, ordinary Mechon · <b>239,000 G</b>",
        d: "<span class=step><b>1-1:</b> 5x M67/HASTE in Residential District 2 — 43,500 G</span>"
         + "<span class=step><b>1-2:</b> 6x M36/SACRE, scattered — 38,500 G</span>"
         + "<span class=step><b>1-3:</b> 3x Offensive/BRAVE, mainly Zedonia Plaza — 40,000 G</span>"
         + "<span class=step><b>2-1:</b> 6x M55/DREAD, scattered — 36,000 G</span>"
         + "<span class=step><b>2-2:</b> 4x M67/RADAR, mainly Zedonia Plaza — 41,500 G</span>"
         + "<span class=step><b>2-3:</b> 4x M87/GRAND at the Dios, Cleas and Helas Pillars — 39,500 G</span>" },
      { id: "c14-06", f: "d", t: "🔴 <b>Agniratha Beautification 1 &amp; 2</b> — City Planning Terminal · 104,500 G",
        d: "<span class=step><b>1:</b> 4x New Part S (small Mechon) + 5x Fairy Tale Diode (collectables) — 51,000 G</span>"
         + "<span class=step><b>2:</b> 3x New Part L (large Mechon) + 6x Grape Spring (collectables) — 53,500 G</span>"
         + "<span class=step>Collect these while sweeping for Lewisia Silver and Blue Light Amp — same collection points.</span>" },
      { id: "c14-07", f: "d", t: "🔴 <b>Telethia Investigation 1 &amp; 2</b> — Strategic Intel Terminal · the only EXP here",
        d: "<span class=step><b>1:</b> examine four <b>Phoenix Telethia</b> corpses — <b>Helas Pillar</b>, <b>Dios Pillar</b>, <b>Effigy of Meyneth</b>, <b>Calcos Pillar</b>. 27,000 G · 25,000 EXP.</span>"
         + "<span class=step><b>2:</b> examine four three-headed <b>Gigas Telethia</b> corpses — <b>Residential District 1</b>, <b>Helas Pillar</b>, <b>Telethia Bridge</b>, <b>Judicial District</b>. 22,500 G · 30,000 EXP.</span>"
         + "<span class=step>No combat in either. Pure walking, 55,000 EXP.</span>" },
      { id: "c14-secret-cloister", f: "d", t: "🔴 After all 14 terminal quests, claim the <b>Cloister Key</b> and find the secret area",
        d: "Interact with the final Central Tower terminal after completing all fourteen optional Agniratha quests. Use the key on the locked 3F door to discover the <b>Seventh Sage Cloister</b> before the Meyneth Shrine cutoff." },
      { id: "c14-08", f: "d", t: "🔴 Free-roaming Agniratha UMs: <b>Experienced Tristan</b> (64), <b>Destructive Bors</b> (64), <b>Soothed Aglovale</b> (65), <b>Sentimental Flamral</b> (66)" },
      { id: "c14-09", f: "d", t: "🔴 ⛏️ <b>Lewisia Silver</b> ×2 — Nature 5. Agniratha collection · backup: trade Berryjammy in Colony 6" },
      { id: "c14-10", f: "d", t: "🔴 ⛏️ <b>Blue Light Amp</b> ×3 — Special 5. Agniratha collection · backup: trade Oleksiy in Colony 6" },
      { id: "c14-11", f: "m", t: "⛏️ <b>Fortune Feather</b> ×1 — Commerce 5. Agniratha collection, <b>also in Colony 6</b>. Safe, grab it anyway" },
      { id: "c14-miss-fashion", f: "d", t: "🔴 Register every unique <b>Agniratha / Central Tower</b> shop appearance",
        d: "Buy one of every distinct appearance before the Meyneth Shrine lockout, especially <b>Machina Cannon</b> and <b>Machina Biter II</b>. Also register <b>Machina Rod, Machina Nibbler, Machina Sniper, Palva Drones</b> and <b>Grizzly Drones</b> from Mechonis Field drops. Fashion unlocks are global, so save → buy/farm → reload is valid." },
      { id: "c14-12", f: "d", t: "🔴 <b>The History of the Capital</b> — finish it here",
        d: "Collect <b>1x Memory 903</b> from the <b>Judicial District</b>, then return to <b>Zilex</b> on Fallen Arm. 16,800 G · 14,500 EXP · +500 Rep. You took this in Chapter 12; this is the only window to complete it." },
      { id: "c14-13", f: "d", t: "🔴 <b>Best Boots</b> — Bozatrox, <b>Machina Refuge, Mechonis Field</b> · dies with the area",
        d: "<span class=step><b>Needs</b> <code>To My Loved One...</code> from Ch12.</span>"
         + "<span class=step><b>Do:</b> <b>2x Reinforced Jet</b> + <b>2x Reinforced Plunger</b>.</span>"
         + "<span class=step><b>Pays:</b> 20,500 G · 18,000 EXP · <b>+700 Rep</b> · <b>M100 Greaves</b> with <b>Quick Step V</b>.</span>"
         + "<span class=step>Good news: Bozatrox <b>survives</b> — she relocates to the Rotating Bulkhead on Fallen Arm afterwards with different stock.</span>" },
      { id: "c14-14", f: "d", t: "🔴 <b>Mechonis Field Challenge Quest 1</b> — Garrisoned Troop → <b>Revolutionary Bifrons</b> (60) · 65,000 G",
        d: "164,400 HP, ~30% spawn, at the <b>4F Main Power Switch</b>. Has a <b>520-damage spike counter</b> — bring Spike Defence or stop attacking into it. Weak to Topple, Daze, Bind, Confuse." },
      { id: "c14-15", f: "d", t: "🔴 <b>Mechonis Field Challenge Quest 2</b> — Garrisoned Troop → <b>Infernal Crocell</b> (58) · 62,000 G",
        d: "209,900 HP, ~30% spawn, also around the <b>4F Main Power Switch</b>. Aerial Mechon, weak to Topple." },
      { id: "c14-16", f: "d", t: "🔴 <b>Mechonis Field Monster Quest</b> — kill <b>3x M66/TRICK</b> · 35,000 G" },
      { id: "c14-17", f: "d", t: "🔴 Free-roaming Mechonis Field UMs: <b>Amorous Arca</b> (57), <b>Destroyer Salvacion</b> (59), <b>Commander Oracion</b> (61)",
        d: "Oracion is in the <b>Spent Fuel Tank</b> and requires a jump to reach." },
      { id: "c14-18", f: "d", t: "🔴 ⛏️ <b>Mossy Panel</b> ×2 (Commerce 4) and <b>Azure Hollyhock</b> ×2 (Special 4) — Mechonis Field collection",
        d: "Backups exist — Nopo'rikh in Colony 6 for the Panel, Scarlen in Satorl Marsh post-Mechonis Core for the Hollyhock — but grab them here." },
      { id: "c14-19", f: "d", t: "🔴 Fill the <b>Mechonis Field</b> and <b>Agniratha</b> Collectopaedia pages",
        d: "Mechonis Field's chain includes <b>Taurus Greaves</b> and <b>Taurus Helm</b>. Neither area returns." },

      { k: "info", t: "Central Factory — surprise quests trigger by walking, not by talking",
        d: "All four appear automatically when you approach the right spot and <b>cannot be declined</b>. There is no giver to find, so <b>sweep the map</b> rather than looking for NPCs.<br><br>"
         + "These three die at Mechonis Core even though the area itself returns in Chapter 16." },
      { id: "c14-20", f: "d", t: "🔴 <b>Eliminate the Backup!</b> — <b>Storage Depot</b> → <b>Beautiful Vagul</b> (60)",
        d: "<span class=step>196,300 HP. Uses <b>Thunder Flash</b> which inflicts Paralysis. Weak to Topple.</span>"
         + "<span class=step><b>Pays:</b> 24,500 G · 23,500 EXP · Blaze Attack IV, Paralysis Resist IV.</span>" },
      { id: "c14-21", f: "d", t: "🔴 <b>Roof Battle</b> — <b>2F Training Ground Roof</b> → <b>Venerable Focalor</b> (64)",
        d: "<span class=step><b>Getting there:</b> jump from the north end of the Central Lift <b>while it is moving</b>. Fiddly, and the only way up.</span>"
         + "<span class=step>356,500 HP, Extra-Large Mechon. Flame Throw inflicts Blaze; its physical attacks cause Bleed. Weak to Break and Topple, immune to Instant Death.</span>"
         + "<span class=step><b>Pays:</b> 30,000 G · 38,500 EXP · Chill Attack IV, Arts Seal Resist IV.</span>" },
      { id: "c14-22", f: "d", t: "🔴 <b>Daring Assault</b> — <b>Mechon Factory</b>",
        d: "<span class=step><b>Do:</b> kill <b>M96 Crisis Unit</b> (boss-class) plus <b>2x Crisis Response Unit</b>.</span>"
         + "<span class=step><b>Pays:</b> 27,000 G · 20,000 EXP · Retrieved Armour, Retrieved Leggings.</span>" },
      { id: "c14-23", f: "u", t: "Central Factory UMs: <b>Mild Florence</b> (58), <b>Faithful Lancelot</b> (59), <b>Synchronised Gaheris</b> (61), <b>Balanced Palamedes</b> (62), <b>Sinful Lamorak</b> (63), <b>Temporal Gawain</b> (65), <b>Magestic Mordred</b> (70)",
        d: "Gawain only appears after you open the hangar door. All of these get a second window in Chapter 16." },
      { id: "c14-24", f: "m", t: "⛏️ <b>Angel Engine X</b> ×2 (Special 5) and <b>Black Styrene</b> ×2 (Housing 5) — Central Factory collection",
        d: "Black Styrene is also in Colony 6, so it is safe. Angel Engine X backup is a trade with Shilx in Colony 6." },
      { id: "c14-25", f: "x", t: "Fill the <b>Central Factory</b> Collectopaedia page (<b>Machina Driver III</b>)",
        d: "Second window in Chapter 16 if you run out of time here." }
    ]
  },
  {
    id: "ch15", title: "Chapter 15", subtitle: "Mechonis Core", level: "76-80", lock: "Mechonis Core — roughly 90 quests vanish",
    note: "<b>The largest loss point in the game.</b> Roughly 90 quests vanish the moment you finish here. Do not take one step into Mechonis Core until this list is empty.",
    items: [
      { k: "lvl", t: "Set level to 78",
        d: "Mechonis Core is a linear boss run. 78 clears it. Everything that matters this chapter happens <b>before</b> you walk in." },
      { k: "boss", t: "🔴 STOP. Run this checklist before entering Mechonis Core.",
        d: "The precise trigger phrase in the game files is <i>after the party disperses in Colony 6 having escaped Mechonis Core</i>. When that happens, everything below is gone.<br><br>"
         + "<b>1. Every Alcamoth NPC quest.</b> All of them, named and generic. The city's people leave or die.<br>"
         + "<b>2. Every Agniratha terminal quest</b> — though those already died at the Meyneth Shrine in Ch14.<br>"
         + "<b>3. The three Central Factory surprise quests</b> and the two Unique Monsters they spawn.<br>"
         + "<b>4. <code>New Weapon for Fiora</code></b>, sitting in the Ventilation Conduit right on your path.<br>"
         + "<b>5. <code>A Gift?</code></b> — the Satorl Marsh Zazadan chain finale, from all the way back in Chapter 6.<br><br>"
         + "<b>What survives:</b> the Alcamoth <b>area</b> (on foot from the Eryth Sea Centre Gate), its six Heart-to-Hearts, and Fallen Arm entirely." },
      { id: "c15-01", f: "d", t: "<b>Every Alcamoth quest.</b> Dangerous Ambition, Find the Kingpin, Adviser Hunt, Evidence Collection, Destroying the City Trade, The Deciphering Machine, A Necessary Upgrade, Talia's Research, Bring Back My Son!, Teaching Materials, Brave Actions, Protect the Capital!, How Do They Feel?, How Do I Feel?, Together Forever, A Friend in Need, Preparing for Adventure 1-3, Adventurers in Peril, Building Bridges, Believing Again, Starlight Seeker, Starlight Gazer, Back Pain, Looking for Gold Bugs, Losing the Taste for Alcohol, Looking for a Lost Son, Looking for a Lost Daughter, Going Out to Play, Getting a Member's Card." },
      { id: "c15-02", f: "d", t: "The ~48 Alcamoth Monster / Challenge / Material / Collection / Search quests from citizens and guards." },
      { id: "c15-03", f: "d", t: "<b>Preparing for Adventure 3</b> spawns <b>Lakebed Orthlus</b> (40) back at Agora Shore, Colony 9. Quest-exclusive UM, dies with the quest." },
      { id: "c15-04", f: "d", t: "<b>Zel Argentis vs En Argentis.</b> Speak to <b>both</b> and invite <b>Don</b> first, then take one. Both +4 Pop, functionally identical." },
      { id: "c15-05", f: "d", t: "Confirm the <b>Alcamoth Grand Prix courses</b> are cleared with all seven characters." },
      { id: "c15-06", f: "d", t: "Confirm <b>Lewisia Silver</b> and <b>Blue Light Amp</b> are banked." },
      { id: "c15-07", f: "d", t: "<b>New Weapon for Fiora</b> — Junks Staff, at the <b>Ventilation Conduit</b>. Timed, dies here. 29,500 G, 32,000 EXP and the <b>War Blades</b>, a Fiora weapon. Easy to walk past on the way into the Core." },
      { id: "c15-08", f: "x", t: "The six Alcamoth Heart-to-Hearts are <b>safe</b>. You can walk in from the <b>Centre Gate at Eryth Sea</b> afterwards — only Skip Travel dies." },
      { id: "c15-09", f: "d", t: "<b>Melia's Lament.</b> Immediately after escaping Mechonis Core and landing in Colony 6, <b>control Melia and talk to Shulk</b>. One-time window." }
    ]
  },
  {
    id: "ch16", title: "Chapter 16", subtitle: "Central Factory revisited", level: "80-84",
    items: [
      { k: "lvl", t: "Set level to 82",
        d: "A short recovery chapter. 82 is fine. The real levelling decision is the post-game push to 99." },
      { k: "info", t: "This chapter is a second chance, not new content",
        d: "You re-enter Central Factory via Junks through a cooling duct on the Mechonis' back, landing near the <b>Apocrypha Generator</b>.<br><br>"
         + "<b>What you get back:</b> the nine Central Factory Unique Monsters, its Collectopaedia page, and the <b>Angel Engine X</b> and <b>Black Styrene</b> collection points.<br>"
         + "<b>What you do NOT get back:</b> the three surprise quests (Eliminate the Backup!, Daring Assault, Roof Battle) — those died at Mechonis Core along with the two Unique Monsters they spawned. If you missed them in Chapter 14, they are gone.<br><br>"
         + "After this chapter the area is permanently inaccessible, and its collectables are only obtainable through Colony 6 reconstruction or NPC trading." },
      { id: "c16-01", f: "x", t: "Second window: the <b>9 Central Factory Unique Monsters</b>",
        d: "Mild Florence (58), Faithful Lancelot (59), Synchronised Gaheris (61), Balanced Palamedes (62), Sinful Lamorak (63), Temporal Gawain (65), Magestic Mordred (70). Beautiful Vagul and Venerable Focalor are <b>not</b> here — they were quest-exclusive and are gone." },
      { id: "c16-02", f: "x", t: "Second window: the <b>Central Factory Collectopaedia page</b> (<b>Machina Driver III</b>)" },
      { id: "c16-03", f: "m", t: "⛏️ Second window: <b>Angel Engine X</b> ×2 (Special 5) and <b>Black Styrene</b> ×2 (Housing 5)",
        d: "Backups if you still miss them: trade <b>Shilx</b> in Colony 6 for Angel Engine X; Black Styrene is also a Colony 6 collectable." },
      { id: "c16-04", f: "g", t: "🏁 <b>Colony 9 Grand Prix pair</b> — Rural Road and Colony 9 Wild Ride · <b>feet</b> slot",
        d: "<span class=step>Unlocks after the reunion at Hidden Machina Village. <b>The last of the five track pairs.</b></span>"
         + "<span class=step>With this you have access to all 10 courses. Full completion is <b>70 clears</b> (5 tracks × 7 characters × 2 modes) for the permanent Ether Jet acceleration and boost bonus — chip away at it rather than saving it all for the end.</span>" },
      { id: "c16-05", f: "m", t: "⛏️ <b>Ocean Elixir of Life</b> — recovery window opens now",
        d: "If you missed the Atael trade in Alcamoth, kill <b>Kyel Lexos at Freight Road, Colony 6</b>. <b>Requires rain</b> and only works post-Mechonis Core, which is now." },
      { id: "c16-06", f: "m", t: "⛏️ <b>Azure Hollyhock</b> ×2 — recovery window opens now",
        d: "If you missed the Mechonis Field collection points, <b>Scarlen in Satorl Marsh</b> now trades it." },
      { id: "c16-07", f: "h", t: "💜 <b>Shulk &amp; Reyn</b> — Freight Elevator, Colony 6, day, <b>Pink</b>",
        d: "The first Pink-tier Heart-to-Heart that is realistically live. They have been together since Chapter 1, so if any pair has hit Pink by now it is these two. If it will not fire, it joins the post-game batch." }
    ]
  },
  {
    id: "ch17", title: "Chapter 17", subtitle: "The world reopens — biggest side-content chapter in the game", level: "84-90",
    note: "Do not rush to the ending. <b>The entire world reopens with new quests</b>, including <b>seven hidden skill trees</b>, the five Replica Monados, and quests paying 90,000+ EXP each. Bionis' Interior and Prison Island themselves have <b>no side quests at all</b> — the content is everywhere else.",
    items: [
      { k: "lvl", t: "Set level to 88",
        d: "Bionis' Interior runs Lv72-77, Prison Island Lv75-78. 88 is comfortable.<br><br>"
         + "<b>Do not spend the bank yet.</b> Several quests here pay enormous EXP (Battling Brutes alone is 158,000) which flows straight into the bank. Save the spending for the post-game superboss run." },
      { k: "build", t: "⚔️ Seven hidden skill trees are available this chapter — plan every leader swap",
        d: "Every Chapter 17 hidden-tree finale is leader-gated. Clear them as a deliberate circuit:<br><br>"
         + "<b>Fiora leads</b> → Battling Brutes (Innocence)<br>"
         + "<b>Melia leads</b> → Ancient High Entia Mystery (Passion)<br>"
         + "<b>Dunban accepts, then Shulk turns in</b> → Stunted Growth (Enthusiasm)<br>"
         + "<b>Riki leads</b> → Final Challenge of the Sage (Heroism)<br>"
         + "<b>Shulk leads</b> → A Young Captain's Revival / Trust (Bravery), plus A Token of Friendship<br>"
         + "<b>Reyn leads</b> → Friendship Tokens (Camaraderie)<br>"
         + "<b>Sharla leads</b> → Stopping the Elopement (Affection)<br><br>"
         + "The pink badge on each card repeats the required leader at the exact moment you need it." },

      { k: "info", t: "The Refugee Camp is repopulated — easy to overlook, but not timed",
        d: "Most guides call the Refugee Camp dead after Chapter 6. It is not. Dulland and Elior are back with four quests worth <b>182,500 G and 351,000 EXP</b> between them.<br><br>"
         + "<b>But you have to unlock them.</b> The gateway is <code>Securing Provisions</code>, given by <b>Dulland near Junks at the Colony 6 Reconstruction HQ</b> — not at the camp. It opens both the Dulland and Elior branches; Dulland's branch then continues from <code>A Flower for a Rose</code> into <code>Battling Brutes</code>." },
      { id: "c17-01", f: "q", t: "<b>Securing Provisions</b> — Dulland, <b>Colony 6 Reconstruction HQ near Junks</b> · the gateway",
        d: "<span class=step><b>Do:</b> collect <b>1x Trader's Spare Key</b> at the <b>Trader's Stopover</b>, Tephra Cave → <b>1x Emergency Rations</b> at the <b>Trader's Emergency Warehouse</b>, Tephra Cave → return to Dulland <b>at the Refugee Camp, Bionis' Leg</b>.</span>"
         + "<span class=step><b>Pays:</b> 36,000 G · 42,500 EXP · +150 Rep.</span>"
         + "<span class=step><b>Unlocks</b> A Flower for a Rose and Supplies for Satorl.</span>" },
      { id: "c17-02", f: "q", t: "<b>A Flower for a Rose</b> — Dulland, Refugee Camp",
        d: "<span class=step><b>Do:</b> collect <b>1x Ancient Lily</b> near <b>Bafalgar Tomb</b>, Tephra Cave.</span>"
         + "<span class=step><b>Pays:</b> 38,000 G · <b>92,500 EXP</b> · +200 Rep · Cosmo Drones · Initial Tension VI.</span>"
         + "<span class=step><b>Unlocks Battling Brutes.</b> This is the required middle step.</span>" },
      { id: "c17-03", f: "q", t: "<b>Battling Brutes</b> — Dulland · <b>⚠️ FIORA MUST LEAD</b> · <b>one of the richest optional bundles</b>",
        d: "<span class=step><b>Leader gate:</b> Dulland only offers it with Fiora leading.</span>"
         + "<span class=step><b>Do:</b> kill <b>Reckless Zanden</b> (Lv98, 280,500 HP) and <b>Firework Geldesia</b> (Lv98, 414,500 HP), both in the <b>Arachno Queen's Nest, Tephra Cave</b>. Both are <b>quest-exclusive</b> — they exist only while this quest is active.</span>"
         + "<span class=step><b>Pays:</b> 63,500 G · <b>158,000 EXP</b> · +200 Rep · <b>Eternity Knives</b> · Speed V Frame · Speed V Booster · <b>Fiora Skill Tree — Innocence</b>.</span>"
         + "<span class=step>Geldesia alone grants 106,931 EXP and 1,089 AP on the kill. Both are weak to Topple.</span>" },
      { id: "c17-04", f: "q", t: "<b>Supplies for Satorl</b> — Elior, Refugee Camp · <b>18:00-6:00</b>",
        d: "<span class=step><b>Do:</b> give the emergency rations to <b>Scarlen in Satorl Marsh</b>: Oath Sanctuary before Imperial Ceremony Offerings, or Sororal Statues from 18:00-3:00 afterwards.</span>"
         + "<span class=step><b>Pays:</b> 45,000 G · 58,000 EXP · Speed V Goggles · Speed V Arms · <b>+250 Upper Bionis affinity</b>.</span>" },
      { id: "c17-31", f: "q", t: "<b>Ancient High Entia Mystery</b> — Talia, Ether Plant · <b>18:00-6:00</b> · <b>⚠️ MELIA MUST LEAD</b> · <b>Melia's Passion tree</b>",
        d: "<span class=step><b>Requires:</b> 2.5★ Upper Bionis, <code>Talia's Research</code> <i>or</i> <code>Investigating Satorl</code>, and the <b>High Entia Emblem</b> from <code>The Imperial Ceremony</code>.</span>"
         + "<span class=step><b>Do:</b> lead with Melia → accept from Talia → use the Emblem to enter <b>La Luz Church</b>, Valak Mountain → inspect the War God statue → return to Talia.</span>"
         + "<span class=step><b>Pays:</b> 59,500 G · 93,000 EXP · Meteor Staff · Talent Boost V · <b>Melia Skill Tree — Passion</b>.</span>"
         + "<span class=step><b>Not missable:</b> if Talia's Ch8 research expired, <code>Investigating Satorl</code> is the replacement prerequisite.</span>" },

      { k: "info", t: "The five remaining hidden-tree chains",
        d: "<b>Dunban — Enthusiasm:</b> the Orkatix chain at <b>Fallen Arm / Junks</b>. Three collect quests then <code>Stunted Growth</code>. Needs <b>3.5★ Hidden Machina Village</b>.<br>"
         + "<b>Riki — Heroism:</b> <code>Final Challenge of the Sage</code> from the <b>Nopon Sage at the Divine Sanctuary</b>, Makna. Requires the whole Sage chain from Ch7-8.<br>"
         + "<b>Shulk — Bravery:</b> Miller at Colony 9. <b>Revival and Trust are mutually exclusive</b> — both grant Bravery, so take either.<br>"
         + "<b>Reyn — Camaraderie:</b> Friendship Tokens, Moritz. Needs <code>Pride and Courage</code> from Chapter 1.<br>"
         + "<b>Sharla — Affection:</b> <code>Stopping the Elopement</code> after the Argentis chain at Colony 6." },
      { id: "c17-05", f: "q", t: "<b>Orkatix chain</b> → <b>Stunted Growth</b> · <b>⚠️ DUNBAN ACCEPTS → SHULK TURNS IN</b> · <b>Dunban's Enthusiasm tree</b> · needs <b>3.5★ Hidden Machina Village</b>",
        d: "<span class=step><b>Transmission Bypass:</b> from an <b>Offensive Strike Unit</b> at <b>Black Wreckage</b>.</span>"
         + "<span class=step><b>The Exhaust Pump:</b> from an <b>Offensive Hover Unit</b> at <b>Digit 4</b>.</span>"
         + "<span class=step><b>The Mini Reactor:</b> from an <b>Experimental M86</b> near <b>Digit 2 Plain</b>.</span>"
         + "<span class=step><b>Leader handoff:</b> Dunban must lead to accept <code>Stunted Growth</code>; switch to Shulk before returning the completed device to Orkatix.</span>"
         + "<span class=step><b>Then Stunted Growth</b> → 44,000 G · 51,500 EXP · +700 Rep · <b>Dunban Skill Tree — Enthusiasm</b> · Haste IV · Agility Up V.</span>" },
      { id: "c17-06", f: "q", t: "<b>Final Challenge of the Sage</b> — Nopon Sage, Divine Sanctuary · <b>12:00-15:00</b> · <b>⚠️ RIKI MUST LEAD</b> · <b>Riki's Heroism tree</b>",
        d: "<span class=step><b>Requires</b> the Sage chain: <code>Honouring the Nopon Sage</code> → <code>Legend of the Sage</code> → <code>Challenge of the Sage</code>, all begun back in Ch7-8 via <code>Strange Noises from Below</code>, plus 3.5★ Central Bionis.</span>"
         + "<span class=step><b>Pays:</b> 38,000 G · 73,500 EXP · <b>Meteor Nibbler</b> · <b>Riki Skill Tree — Heroism</b>.</span>"
         + "<span class=step>Also spawns <b>Unreliable Rezno</b> (Lv96) on the island in Great Makna Falls.</span>" },
      { id: "c17-07", f: "q", t: "<b>A Young Captain's Revival</b> <i>or</i> <b>Trust</b> — Miller, Colony 9 · <b>⚠️ SHULK MUST LEAD</b> · <b>Shulk's Bravery tree</b>",
        d: "<span class=step><b>Mutually exclusive — both give Bravery.</b> Take whichever you prefer.</span>"
         + "<span class=step><b>Revival:</b> collect <b>4x Poisonous Gourd</b> in Satorl Marsh. Reward includes <b>Daze Plus V</b>.</span>"
         + "<span class=step><b>Trust:</b> talk to <b>Emmy Leater as Shulk</b> and deliver Miller's letter. Reward includes <b>Topple Plus V</b>. Changes Miller/Emmy and Raoul/Emmy affinity.</span>"
         + "<span class=step><b>Both pay</b> 25,000 G · 75,000 EXP · <b>Shulk Skill Tree — Bravery</b>. <b>Take Trust</b> — Topple Plus V is directly useful against Blizzard Belgazas, and it moves two chart links.</span>"
         + "<span class=step>Requires the whole chain: A Young Captain's Request (Ch1) → Suffering (Ch3) → Rise (Ch3) → <b>Challenge</b>.</span>" },
      { id: "c17-08", f: "q", t: "<b>A Young Captain's Challenge</b> — Emmy Leater · the missing middle step",
        d: "<span class=step><b>Route A:</b> collect <b>1x Carbo Shield</b> at the <b>Colony 6 Storage Area</b>. <b>Route B:</b> <b>4x Bunnia Scent Wood</b> from Ogre Bunnias in Satorl Marsh, then trade the <b>Nopon Merchant in Satorl Marsh</b> for a Nopon Claymore.</span>"
         + "<span class=step><b>Pays:</b> 3,300 G · 600 EXP · Purity Striker · Swep Gauntlets.</span>" },
      { id: "c17-09", f: "q", t: "<b>Friendship Tokens</b> — Moritz, Colony 9 <b>Residential District</b> · <b>⚠️ REYN MUST LEAD</b> · <b>Reyn's Camaraderie tree</b>",
        d: "<span class=step><b>Requires</b> <code>Pride and Courage</code> from Chapter 1. If you skipped Lonely Niranira all the way back then, this tree does not exist.</span>"
         + "<span class=step><b>Do:</b> <b>4x Arachno Sickle</b> (Arachno), <b>4x Lizard Moon Jewel</b> (Lizards), <b>4x Bunniv Club</b> (Bunnivs) — all in <b>Tephra Cave</b>.</span>"
         + "<span class=step><b>Pays:</b> 330 G · <b>65,000 EXP</b> · AP Up V · <b>Reyn Skill Tree — Camaraderie</b>. Creates <b>Eternal Bond</b> links Moritz↔Lukas and Moritz↔Niranira.</span>" },

      { id: "c17-10", f: "q", t: "<b>Replica Monado 1-5</b> — <b>Vanea, Colony 6 Reconstruction HQ</b> · 12,000 EXP each",
        d: "<span class=step><b>Correction:</b> Vanea is at the <b>Colony 6 Reconstruction HQ</b>, not the Junks Ship as many guides state. Available after Junks reaches the Interior Landing Site.</span>"
         + "<span class=step><b>1 → Monado Rudra:</b> Lucky Fang (Feris, Satorl) · Caterpile Silk · Ardun Elder Beard</span>"
         + "<span class=step><b>2 → Monado Agni:</b> Ocean Elixir of Life (Lexos, Colony 6) · Immortal Moss (Torta) · Quadwing Treasure</span>"
         + "<span class=step><b>3 → Monado Abyss:</b> Glacier Element (Nebula, Satorl) · Wisp Sun Bead · Hox Daylight Spur</span>"
         + "<span class=step><b>4 → Monado Dogma:</b> Demonic Everflame (Dragon) · Mammut Horn · Tirkin Elder Medal</span>"
         + "<span class=step><b>5 → Monado Saga:</b> Yellow Slobos Rock (Valak) · Tokilos King Egg · Diamond Brog Eye</span>"
         + "<span class=step><b>Watch out:</b> several of these overlap the Colony 6 bill of materials. Farm doubles so you are not choosing between a Monado and reconstruction.</span>" },
      { id: "c17-11", f: "q", t: "<b>Melancholy Tyrea</b> — surprise quest in <b>Colony 6</b> → <b>Empress Staff</b>",
        d: "<span class=step><b>Correction:</b> this triggers in <b>Colony 6</b>, not Watchpoint Junction.</span>"
         + "<span class=step><b>Do:</b> the four-stage Telethia chase. Boss is the <b>Mysterious Telethia</b>, revealed as <b>Yumea, First Consort</b>.</span>"
         + "<span class=step><b>Pays:</b> 58,500 EXP · <b>Empress Staff</b> · Auto-Atk Stealth VI. A Melia weapon, and partial consolation if you missed the Imperial Staff in Ch10.</span>" },
      { id: "c17-12", f: "q", t: "<b>Vidian Rescue Mission</b> — surprise quest, <b>Alcamoth Main Entrance</b>",
        d: "<span class=step><b>Requires</b> <code>Broken Ether Furnace</code>, and upstream <code>Believing Again</code> (Ch10) which needed <code>Building Bridges</code> (Ch8, Melia leading). A long dependency chain that starts with a leader swap nine chapters ago.</span>"
         + "<span class=step><b>Do:</b> repair the broken transporters in <b>Whitewing Palace</b>, then speak to <b>Vidian</b>.</span>"
         + "<span class=step><b>Pays:</b> 58,000 G · <b>97,500 EXP</b> · +700 Rep · Gracielle Helm, Arms and Greaves.</span>"
         + "<span class=step>Reach Alcamoth on foot via the <b>Centre Gate from Eryth Sea</b> — no Skip Travel, and it is overrun by Telethia.</span>" },
      { id: "c17-13", f: "q", t: "<b>The Final Giants' Ruins</b> — Zain, Harict Chapel, Valak Mountain",
        d: "<span class=step><b>Sub-quest <code>The Giants' Treasures</code></b> comes with it: collect <b>Truth of the Giants</b>, <b>Daring of the Giants</b> and <b>Heart of the Giants</b>. The <b>Heart</b> comes from <code>Mystery of Makna Ruins 4</code> in Ch10 — another reason that chain mattered.</span>"
         + "<span class=step><b>Then:</b> unseal the door at <b>Three Sage Summit</b>.</span>"
         + "<span class=step><b>Pays:</b> 88,000 G · <b>175,000 EXP</b> · +700 Rep · Damage Heal VI · Arts Stealth VI. Largest EXP payout in the game.</span>" },
      { id: "c17-14", f: "q", t: "<b>The Giants' Treasure</b> (Satorl Marsh, Kacha) → spawns <b>Eternal Palsadia</b> (91)",
        d: "The Ch6 Bokoko/Kacha chain quest. Completing it makes Eternal Palsadia appear at the top of <b>Exile Fortress</b>. If you did it back in Chapter 6, it is waiting for you now." },
      { id: "c17-15", f: "q", t: "<b>Stopping the Elopement</b> — Don Argentis, Colony 6 · <b>⚠️ SHARLA MUST LEAD</b> · <b>Sharla's Affection tree</b>",
        d: "<span class=step><b>Requires:</b> 4.5★ Colony 6 and the matching Argentis chain: <code>Family Secrets</code> → <code>Betrothal Test</code>.</span>"
         + "<span class=step><b>Leader gate:</b> Sharla must lead when speaking to the couple, persuading the partner and reporting to Don.</span>"
         + "<span class=step><b>Pays:</b> 28,000 G · 30,000 EXP · Satellite Shot · <b>Sharla Skill Tree — Affection</b>.</span>" },
      { id: "c17-16", f: "q", t: "<b>Birthday Shoes</b> — Kantz, Colony 9 Military District",
        d: "<span class=step><b>Requires</b> <code>Education-Crazy Suzanna</code> from Chapter 1.</span>"
         + "<span class=step><b>Do:</b> <b>2x Azure Flamii Wing</b> from <b>Opulent Flamii</b> in Colony 9.</span>"
         + "<span class=step><b>Pays:</b> 42,500 G · 50,000 EXP · <b>Rex Helm</b>. Raises Kantz↔Moritz to Doting Parent.</span>" },
      { id: "c17-17", f: "q", t: "<b>A Token of Friendship</b> — Colony 9 Central Plaza · <b>⚠️ SHULK MUST LEAD</b>",
        d: "<span class=step><b>Leader gate:</b> inspect the Central Plaza prompt with Shulk leading, then use the prompt at his lab.</span>"
         + "<span class=step><b>Do:</b> <b>3x Gogol Horn</b>, <b>3x Thick Rhana Hide</b>, <b>3x Aged Chilkin Hair</b>, all from Bionis enemies.</span>"
         + "<span class=step><b>Pays:</b> 72,000 EXP · <b>Vangarre Driver</b> (3 empty gem slots).</span>" },
      { id: "c17-18", f: "q", t: "Remaining Colony 9 and Colony 6 late quests",
        d: "<span class=step><b>Colony 9:</b> The Elite Captain's Anguish (22,000 G / 35,000 EXP) · Getting to Know Minnie · Getting to Know Dorothy.</span>"
         + "<span class=step><b>Colony 6:</b> Lifespan of a Machine (Neonik, 38,000 G) · A Poet's Concerns (Yura, 38,500 G) · Delivering the Undeliverable and Finding the Unfindable (Shilx) · A Dauntless Trader (Werner) · <b>Nopon Determination</b> (Mefimefi, only if you took her over Perrine) · Defend Colony 6 - Ancient and Demon.</span>" },
      { id: "c17-19", f: "q", t: "<b>Satorl Marsh's late quest block</b> — eight quests that only exist now",
        d: "Challenge · For a Friend · A Merciful End · A Release from Duty · <b>The Imperial Ceremony</b> · Imperial Ceremony Offerings · The Ancient Ceremony · Ancient Ceremony Offerings.<br>The Imperial Ceremony gives the <b>High Entia Emblem</b>, which unlocks the sealed section of the High Entia Tomb and the Unique Monster <b>Furious Jozan</b> (96)." },

      { id: "c17-20", f: "m", t: "⛏️ <b>Black Liver Bean</b> ×2 — Nature 5. Bionis' Interior collection, rare, <b>no trade backup</b>" },
      { id: "c17-21", f: "m", t: "⛏️ <b>Flexible Selua Cell</b> ×3 and <b>Steel Selua Cell</b> ×3 — Special 4. Largo Selua and Wool Selua, Bionis' Interior" },
      { id: "c17-22", f: "m", t: "⛏️ <b>Inferno Element</b> ×2 and <b>Bolt Element</b> ×2 — Special 5. Cratere and Solare Nebula, <b>Prison Island</b>" },
      { id: "c17-23", f: "u", t: "Bionis' Interior UMs (8) — second visit only",
        d: "Active Impulso (72), Mystical Klesida (72), Victorious Gross (73), Clandestine Apety (74), Vivid Anstan (75), Officer Robusto (75), Ghostly Mahatos (76), Dark King Barbarus (77, flying outside the Second Lung)." },
      { id: "c17-24", f: "u", t: "Prison Island UMs (7) — second visit only",
        d: "Ageless Moabit (75), Serene Imlaly (76), Inferno Heinrich (76, back room of the Kitchen), Cold Ageshu (77), Abnormal Clone Barg (77, First Sanctum), Majestic Clone Barg (77, Second Sanctum), Masterful Gigapur (77, Travalga Bridge)." },
      { id: "c17-25", f: "u", t: "UM: <b>Fiendish Auburn</b> (78) — Gravina Bridge · <b>kill 3 Babel Deinos and 3 Babeli Bargs first</b>" },
      { id: "c17-26", f: "h", t: "💜 <b>Fiora &amp; Sharla</b> — Spinal Nerve Tower south, Pink" },
      { id: "c17-27", f: "h", t: "💜 <b>Riki &amp; Melia</b> — Terminal Nerve Tower NW, Pink" },
      { id: "c17-28", f: "h", t: "💜 <b>Shulk &amp; Fiora</b> — Corridor of Silence, Pink" },
      { id: "c17-29", f: "h", t: "💜 <b>Reyn &amp; Riki</b> — Empty Throne, Pink" },
      { id: "c17-30", f: "h", t: "💜 <b>Sharla &amp; Melia</b> — Gravina Bridge, Pink",
        d: "All five need Pink. If your party affinity is not there yet, come back after the superboss run — Love Sources from Veritas Glyphs will close the gap fast." }
    ]
  },
  {
    id: "post", title: "Post-game", subtitle: "The completion phase", level: "90+",
    note: "Now spend the bank. <b>Superbosses come before the affinity grind</b> — they drop Veritas Glyphs, which trade for Love Sources, which is what makes the remaining Pink Heart-to-Hearts reachable.",
    items: [
      { k: "lvl", t: "Now spend the bank — and here is what it was for",
        d: "You finish the story around <b>Lv90</b>. The five superbosses are <b>Lv100 to Lv120</b>. Seventeen chapters of capping your level exists to close that gap in one sitting.<br><br>"
         + "<b>Spend up to 99</b> before the superboss run. That is the cap.<br><br>"
         + "<b>Level is not the whole answer.</b> Avalanche Abaasy at Lv120 will still delete an unprepared Lv99 party in seconds. Gems and Monado Armour matter more than the last few levels — do the build panel below before you go anywhere near Valak.<br><br>"
         + "<b>You will also drop your level deliberately</b> during the high-level Unique Monster sweep, so those fights stay worth doing rather than becoming a chore." },
      { k: "build", t: "⚔️ The superboss loadout — build this before the first fight",
        d: "<b>Party:</b> Shulk / Dunban / Riki, or swap yourself to <b>Melia</b> for faster Ether/DoT kills. Melia is fragile, and her AI is not reliable for the guide's planned elemental-storage-and-burst rotation; control her when using that preset.<br><br>"
         + "<b>Mandatory gems:</b><br>"
         + "· <b>Spike Defence</b> for encounters whose dossier documents a damaging, counter or Topple Spike. Do not spend those slots blindly on a spike-free fight. Dunban's <b>Steel Protection</b> reduces Spike damage by 20%; it is useful support, not immunity by itself.<br>"
         + "· <b>Night Vision</b> — accuracy against higher-level enemies. Without it you simply miss. <b>Maxed rank required for Abaasy.</b><br>"
         + "· <b>Agility Up</b> stacked on Dunban.<br>"
         + "· <b>Topple Plus</b> — Rank VI needed to topple-lock Abaasy.<br>"
         + "· <b>Debuff Resist</b> or <b>Divine Protect</b> — specifically for Abaasy's instant-death counter spike.<br><br>"
         + "<b>Arts:</b> <b>Monado Armour maxed</b> — at maximum Art level it reduces physical and ether Art damage by 75%, but it does not stop enemy Talent Arts.<br>"
         + "<b>Skills:</b> Dunban's <b>Steel Protection</b> is a strong 20% Spike-damage reduction when the selected boss actually uses a damaging Spike." },
      { k: "boss", t: "💀 Kill order matters — do not go straight for the big one",
        d: "The order below is not difficulty ranking, it is a <b>dependency chain</b>. Marcus is beatable without Night Vision; Daedala <i>drops</i> Night Vision; the last two are unreasonable without it.<br><br>"
         + "<b>1. Final Marcus</b> → <b>2. Ancient Daedala (farm it)</b> → <b>3. Despotic Arsene</b> → <b>4. Blizzard Belgazas</b> → <b>5. Avalanche Abaasy</b><br><br>"
         + "All five drop <b>Rank V crystals</b> with Daze Up and Night Vision attributes, craftable into the Rank VI gems endgame armour wants. They also drop <b>Veritas Glyphs</b>, which trade for <b>Love Sources</b> — large party affinity boosts. That is why superbosses come <i>before</i> the affinity grind rather than after." },
      { id: "pg-01", f: "u", t: "💀 <b>1. Final Marcus</b> (Lv100) — Valak Mountain, Three Sage Summit · <b>night</b>",
        d: "<span class=step><b>Why first:</b> the weakest of the five, the <b>only one that can be dazed</b>, and the most consistently hittable without Night Vision gems. Start here to test your build.</span>"
         + "<span class=step><b>Watch for:</b> an aura damage spike. Bring Spike Defence.</span>"
         + "<span class=step><b>Strategy:</b> exploit the daze vulnerability — daze locking largely removes its offence.</span>" },
      { id: "pg-02", f: "u", t: "💀 <b>2. Ancient Daedala</b> (Lv105) — Fallen Arm, Wreckage Beach · <b>farm this one</b>",
        d: "<span class=step><b>Why second:</b> it drops <b>Rank V Night Vision cylinders</b>, and Night Vision is what makes Belgazas and Abaasy hittable at all. Kill it, then <b>keep killing it</b> until you have enough cylinders to gem the whole party.</span>"
         + "<span class=step><b>What it is:</b> the strongest Mechon-type enemy in the game. Aura damage spike — Spike Defence mandatory.</span>"
         + "<span class=step>Fallen Arm is revisitable after Mechonis Core, which is why this is reachable at all.</span>" },
      { id: "pg-03", f: "u", t: "💀 <b>3. Despotic Arsene</b> (Lv108) — Satorl Marsh, north of the Glowing Obelisk",
        d: "<span class=step><b>Profile:</b> purely physical moveset, <b>no spike abilities at all</b>, but very high damage and fast attacks. Topple duration against it is halved.</span>"
         + "<span class=step><b>Strategy:</b> because there are no spikes, drop Spike Defence and stack <b>agility and defence</b> instead. This is the one fight where evasion alone can carry you — a maxed-agility Dunban simply does not get hit.</span>" },
      { id: "pg-04", f: "u", t: "💀 <b>4. Blizzard Belgazas</b> (Lv114) — Valak Mountain, near the Great Glacier",
        d: "<span class=step><b>Profile:</b> second-highest level in the game. Uses topple-down abilities and its attacks shift with the weather.</span>"
         + "<span class=step><b>The exploit and risk:</b> it has <b>no topple resistance</b>, but it also has a 2,540-damage, 35 m <b>Topple Spike</b>. A Topple-lock plan must retain Spike Defence instead of treating the boss as harmless while down.</span>"
         + "<span class=step><b>Gems:</b> Spike Defence, <b>Good Footing</b>, accuracy and Topple Plus for the chosen control plan.</span>" },
      { id: "pg-05", f: "u", t: "💀 <b>5. Avalanche Abaasy</b> (Lv120) — Valak, Three Sage Summit · <b>night + blizzard</b>",
        d: "<span class=step><b>The hardest fight in the game.</b> Highest level, and it needs two simultaneous conditions to even appear: <b>night</b> and an active <b>blizzard</b> on Valak Mountain.</span>"
         + "<span class=step><b>Instant-death counter spike.</b> Attacking into it can simply kill a party member. <b>Debuff Resist or Divine Protect is mandatory</b>, not optional.</span>"
         + "<span class=step><b>Accuracy:</b> requires <b>maxed Night Vision</b> or you will miss most of your attacks at a 21-level deficit.</span>"
         + "<span class=step><b>Topple:</b> half duration, and topple-locking is near impossible without <b>Rank VI Topple Plus</b>.</span>"
         + "<span class=step><b>Arts:</b> maxed Monado Shield and Monado Armour. Optimise for agility.</span>" },
      { id: "pg-06", f: "h", t: "The remaining 15 Pink Heart-to-Hearts, now reachable with Love Sources. Reyn &amp; Dunban (Tranquil Square, night), Reyn &amp; Fiora (Kneecap Hill), Dunban &amp; Sharla (Rho Oasis), Shulk &amp; Dunban (Colony 6 Main Entrance east), Shulk &amp; Sharla (Colony 6 building top NW), Reyn &amp; Sharla (Central Terminal), Sharla &amp; Riki (Crown Tree), Dunban &amp; Riki (Riki's House), Fiora &amp; Riki (Syrath Lighthouse top), Reyn &amp; Melia (Sky Terrace), Shulk &amp; Melia (Hall of Trials), Shulk &amp; Riki (Distant Fingertip), Fiora &amp; Dunban (Junks 2F), Fiora &amp; Melia (Digit 1), Dunban &amp; Melia (Black Wreckage)." },
      { id: "pg-07", f: "u", t: "High-level UM sweep: Tephra Lv92-98 block (10, four quest-exclusive), Colony 9 Lv37-73, Bionis' Leg Lv75-90, Satorl Lv83-91, Makna Lv96-99, Eryth Sea Lv87-93, Valak Lv97-98." },
      { id: "pg-08", f: "u", t: "UM: <b>Furious Jozan</b> (96) — High Entia Tomb, Telethia Laboratory. <b>Requires the High Entia Emblem.</b>" },
      { k: "grind", t: "⛏️ Finishing Colony 6 — money is the wall, not materials",
        d: "If you followed the route you already hold every material. What is left is <b>~2,000,000 G</b>, the largest single sink in the game.<br><br>"
         + "<b>Where the gold actually comes from:</b><br>"
         + "· <b>Alcamoth's generic quest block</b> paid ~614,000 G back in Chapter 8 — if you skipped it, that hole is why you are short now, and it cannot be recovered.<br>"
         + "· <b>Selling superboss and high-level UM drops.</b> The post-game monsters drop equipment worth thousands a piece.<br>"
         + "· <b>Sell all weapons and armour freely.</b> Never sell a collectable without checking the bill of materials first.<br><br>"
         + "<b>Order:</b> finish <b>Housing</b> to 5 first — it gates the most residents. Then Commerce 5 (for Shilx), Nature 5 (for Neonik), Special 5 last since it is the most expensive tier at 400,000 G on its own.<br><br>"
         + "<b>Residents you still need:</b> Neonik (Housing 5 + Nature 5), Shilx (Pop 120 + Housing 5 + Commerce 5), Nic (Housing 5 + Nopo'rikh), and one of Minana/Gowago (both need Berryjammy invited)." },
      { id: "pg-09", f: "x", t: "⛏️ <b>Colony 6 to 100%</b> — all four categories at Level 5",
        d: "Rewards <b>Titan Plate</b> for all four, plus a per-category item at each Level 5 (Oriental Glass for Housing, Titan Arms for Commerce)." },
      { k: "info", t: "The last three goals have a strict dependency order",
        d: "Do not attempt these in parallel — one gates the next:<br><br>"
         + "<b>1. Superbosses</b> → drop Veritas Glyphs → trade for <b>Love Sources</b> → large party affinity boosts.<br>"
         + "<b>2. Affinity</b> — Love Sources make the remaining Pink Heart-to-Hearts reachable, and area quests push every region to <b>5★</b>.<br>"
         + "<b>3. Collectopaedia</b> — the <b>Other</b> page is 7 items obtainable <i>only</i> by trading with NPCs, and those trades are gated behind <b>3★ and 5★ Area Affinity</b>. It is literally impossible before step 2.<br><br>"
         + "Doing these out of order is the single most common way people stall at 95% completion." },
      { id: "pg-10", f: "x", t: "<b>Affinity Chart to 5★ in every area</b>",
        d: "Use Love Sources from superboss Veritas Glyphs to accelerate party affinity. For NPC affinity, keep talking to named NPCs twice at different times of day — that never stops being the engine." },
      { id: "pg-11", f: "x", t: "<b>Collectopaedia to 100%</b> — 19 area pages plus the <b>Other</b> page",
        d: "<span class=step>The 19 area pages are ordinary collection-point work — use the Skip Travel refill loop.</span>"
         + "<span class=step>The <b>Other</b> page is 7 items available <b>only through NPC trading</b>, gated behind 3★ and 5★ Area Affinity. This is why it comes last.</span>"
         + "<span class=step>Each completed area page gives a unique piece of gear — Carbon Driver for Colony 9, White Cluster for Bionis' Leg, and so on.</span>" },
      { id: "pg-12", f: "x", t: "<b>Skill Links complete</b> — Affinity Coins from all 157 Unique Monsters",
        d: "Coins also come from levelling, and they are <b>refundable</b> — unlink a skill and you get them back. So there is no wrong allocation, only a current one." },
      { id: "pg-13", f: "g", t: "🏁 <b>Nopon Grand Prix: all 70 clears</b>",
        d: "<span class=step>5 tracks × 7 characters × 2 modes (Score Attack and Battle Race).</span>"
         + "<span class=step><b>Reward for all 70:</b> a permanent Ether Jet acceleration and boost bonus that applies regardless of equipped gear.</span>"
         + "<span class=step>If you ran each track as it unlocked you should be most of the way there already. The Colony 9 pair (Rural Road, Colony 9 Wild Ride) was the last to open, in Ch16.</span>" },
      { k: "info", t: "One thing you cannot get on this file",
        d: "<b>Monado III</b> is <b>New Game Plus exclusive.</b> It cannot be obtained on a first playthrough by any means. If your definition of 100% includes it, that is a second file — everything else on this list is achievable here." }
    ]
  },
  {
    id: "fc", title: "Future Connected", subtitle: "The epilogue", level: "—",
    note: "Separate save context. The Ether Jet carries over. UMs here grant <b>Art Coins</b>, not Affinity Coins, and <b>re-drop on repeat kills</b>.",
    items: [
      { k: "info", t: "Different rules — read before you start",
        d: "Future Connected is a self-contained epilogue on <b>Bionis' Shoulder</b> with a separate party and its own systems. Four differences that matter:<br><br>"
         + "<b>1. No Affinity Chart, no trading.</b> The whole NPC-affinity apparatus you spent 200 hours on is simply absent. That is why its missables are harmless.<br>"
         + "<b>2. Unique Monsters give Art Coins, not Affinity Coins</b> — and they <b>re-drop on repeat kills</b>, unlike the main game where the first kill is the only one that pays.<br>"
         + "<b>3. Ponspectors replace Chain Attacks with Union Strikes.</b> They support the active party; they do not replace playable members.<br>"
         + "<b>4. Your Ether Jet carries over</b> from the main game, provided you did <code>World-Changing Whatchamajig</code> back in Chapter 4." },
      { k: "build", t: "⚔️ Choose three of four — and choose your leader",
        d: "Shulk, Melia, Kino and Nene are the four playable characters; you field <b>three</b> and may control any active member. Kino is the dedicated healer and Nene the tank, so most safe parties use one or both.<br><br>"
         + "Control <b>Shulk</b> when you want Monado safety, or <b>Melia</b> when you want to manage elementals and maximise ether damage yourself. Do not leave Melia to the AI if her damage is central to the setup.<br>"
         + "<b>Ponspectors</b> build the Union Strike gauge and add combat support outside the three playable slots. Recruiting more of them directly increases your combat power, so treat recruitment as a build task, not a collectathon." },
      { id: "fc-01", f: "q", t: "Recruit <b>every Ponspector</b> — this is a power curve, not a side quest",
        d: "Each one recruited strengthens your Ponspector squad, which is a meaningful chunk of your damage and utility. Doing them early makes the rest of the epilogue easier, so front-load recruitment before the Fog King." },
      { id: "fc-02", f: "u", t: "👾 <b>20 Unique Monsters</b> on Bionis' Shoulder (Lv63-80)",
        d: "<span class=step>Phlegmatic Jamir (63) · Highborn Alexandra (64) · Grotesque Deimis (65) · Booming Frederick (66, <b>rain only</b>) · Buoyant Rostein (68) · Quondam Grimbellum (69) · Confluent Uzva (69) · Air Marshal Reisenbach (69) · Cyclonic Yughana (70) · Deputy Seagal (72) · Dismal Umya (73) · Caustic Naquatra (73) · Terpsichorean Cenoth (73) · Marquis Odesh (74) · Perceptive Quinops (74) · Citadel Tostiga (74) · Ravager Apelpisia (77)</span>"
         + "<span class=step><b>Because Art Coins re-drop</b>, the strongest of these are worth farming repeatedly rather than killing once and moving on.</span>" },
      { id: "fc-03", f: "u", t: "👾 The two <b>Fogbeast</b> Unique Monsters — gated behind a story fight",
        d: "<span class=step><b>Prerequisite:</b> the <b>Ponio Fogbeasts fight at Soltnar Seal Island</b>. Neither exists before it.</span>"
         + "<span class=step><b>Custodian Barreldart Fogbeast</b> (71) — Gamaro Hollow.</span>"
         + "<span class=step><b>Contemptuous Greymane Fogbeast</b> (78) — Agni's Skygarden Ruins.</span>" },
      { id: "fc-04", f: "u", t: "👾 <b>Prosecutor Davrum</b> (80) — Nerthis Necropolis · <b>quest-exclusive</b>",
        d: "The highest-level Unique Monster in the epilogue and the only one locked behind a quest. Take the quest first or it will not be there." },
      { id: "fc-05", f: "q", t: "Clear <b>every Future Connected side quest</b>" },
      { id: "fc-06", f: "u", t: "💀 Defeat the <b>Fog King</b>",
        d: "The epilogue's final boss. Do your Ponspector recruitment and Unique Monster sweep first — both directly increase your power going in." },
      { k: "info", t: "Two missables here, both genuinely harmless",
        d: "Unusually for this game, you can relax:<br><br>"
         + "<b>Gael'gar</b> disappears after the fog Armus attack Gran Dell. Because Future Connected has <b>no Affinity Chart and no trading</b>, losing an NPC costs you nothing.<br>"
         + "<b>The Companions' Cape Shop</b> closes after the relocation — but the <b>Gran Dell Shop stocks every item it sold</b>. Zero impact.<br><br>"
         + "These are listed in missables guides and they alarm completionists unnecessarily. Neither affects 100%." },
      { k: "info", t: "Finishing this unlocks one last thing back in the main game",
        d: "Clearing Future Connected adds <b>Master Arts Manuals</b> to the Nopon Archsage's Noponstone stock in the Land of Challenge.<br><br>"
         + "So if you are chasing a fully maxed main-game build, the correct order is: finish the main game → do the superbosses → <b>clear Future Connected</b> → go back and buy Master Arts Manuals with the Noponstone you have been banking since Chapter 2." }
    ]
  }
];
