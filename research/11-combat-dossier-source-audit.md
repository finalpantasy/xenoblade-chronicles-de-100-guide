# Combat dossier source audit — XCDE base-game bosses and Unique Monsters

Audited 2026-08-01. This is a source/pipeline audit, not a claim that every
field has been extracted or independently game-verified.

## Recommendation

Use the Xenoblade Wiki's MediaWiki wikitext as the scalable primary data source.
The roster page provides stable coverage and the individual enemy pages expose
regular, machine-readable templates for combat stats, arts, spikes, and
resistances. Fetch roster first, then fetch only the 157 base-game Unique
Monsters and 34 rostered base-game boss/quest-boss battle variants. Batch the
individual pages with MediaWiki `action=query` (up to 50 titles per request),
falling back to `action=parse` for a single-page diagnostic.

The existing offline Monsterpedia roster confirms **157 base-game Unique
Monsters**. Its direct boss categories contain **34 base-game conventional
boss/quest-boss battle variants** (the list intentionally represents some
multi-phase/story encounters separately). The Wiki's boss overview describes
27 bosses, so display/curation policy must decide whether the dossier treats
phases as separate encounters or grouped encounters.

## Endpoints

| Purpose | Parsable endpoint |
| --- | --- |
| Canonical all-enemy roster | `https://xenoblade.fandom.com/api.php?action=parse&format=json&page=List%20of%20Enemies%20in%20Xenoblade%20Chronicles&prop=wikitext` |
| Unique Monster roster/reference | `https://xenoblade.fandom.com/api.php?action=parse&format=json&page=Unique%20Monster%20%28XC1%29&prop=wikitext` |
| Boss reference | `https://xenoblade.fandom.com/api.php?action=parse&format=json&page=Boss%20%28XC1%29&prop=wikitext` |
| One enemy, diagnostic / fallback | `https://xenoblade.fandom.com/api.php?action=parse&format=json&page=Avalanche%20Abaasy&prop=wikitext` |
| Batched page wikitext | `https://xenoblade.fandom.com/api.php?action=query&format=json&prop=revisions&rvprop=content&rvslots=main&titles=Arachno%20Queen%7CAvalanche%20Abaasy%7CAbnormal%20Clone%20Barg` |

The batched endpoint returned `query.pages[pageid].revisions[0].slots.main["*"]`
in the proof request. Preserve the returned page title and source URL beside
each record, because a roster name can contain a section fragment (for example
`Dickson#Battles`) or a piped display label.

## Confirmed template schema

The following is directly represented in enemy-page wikitext and can be parsed
without screen scraping:

```js
{
  source: { page, url, retrievedAt },
  identity: { name, rosterId, category, species, area, level, spawnConditions },
  variants: [{ // one per stat/template block; do not silently merge phases
    stats: { hp, attack, ether, agility, doubleAttack, crit, physicalRes, etherRes, orientation },
    arts: [{ name, type, strength, hits, range, effect, knockback, breakDamage }],
    spike: { type, range, damage } | null,
    resistances: {
      break, topple, daze, sleep, lock, bind, paralysis, slow,
      physicalDefDown, etherDefDown, physicalAttackDown, etherAttackDown,
      agilityDown, auraSeal, artSeal, instantDeath
    },
    notes: []
  }],
  strategy: { text, sourceSection } | null
}
```

Template mapping:

| Wikitext template | Fields |
| --- | --- |
| `{{Enemy stats ...}}` | `HP`, `atk`, `eth`, `agl`, `doub`, `crit`, `physres`, `ethres`, `ot` |
| `{{Enemy arts ...}}` | indexed `artN`, `typeN`, `strengthN`, `hitsN`, `rangeN`, `effectN`, `kbN`, `bdN` |
| `{{Enemy spike ...}}` | `type`, `range`, `damage` |
| `{{Enemy immunities ...}}` | `brk`, `top`, `daze`, `slp`, `lock`, `bind`, `para`, `slow`, `def`, `ethdef`, `atk`, `ethatk`, `agl`, `aura`, `art`, `death` |

Keep resistance annotations such as `‡` and `※` as raw note text: the
Avalanche Abaasy page explicitly qualifies Topple and Break resistance. Do not
reduce these values to plain numbers without retaining that condition.

## Small proof sample and coverage

Fetched 12 alphabetical base-game Unique Monsters:
Abnormal Clone Barg, Active Impulso, Affluent Beleth, Aged Leraje, Ageless
Moabit, Aggressive Cornelius, Agile Albatro, Agile Barbatos, Amber Fischer,
Amorous Arca, Ancient Daedala, and Armoured Rockwell.

Fetched 10 base-game boss/quest-boss pages in a separate sample: Ancient
Machine (left/right), Apocrypha Generator, Arachno Queen, Demon Pavlovsk,
Dickson, Dragon King Alcar, Egil, Gadolt, and Yaldabaoth.

| Field/template | Unique sample (12) | Boss sample (10) | Notes |
| --- | ---: | ---: | --- |
| `Enemy stats` | 12/12 | 10/10 | Some pages contain multiple stat blocks for forms/difficulties. |
| `Enemy arts` | 12/12 | 10/10 | Indexed arts are directly parseable. |
| `Enemy immunities` | 12/12 | 10/10 | Page section heading is commonly `Resistances`, not `Immunities`. |
| `Enemy spike` | 5/12 | 4/10 | Absence is meaningful; store `null`, not an inferred zero-value spike. |
| Explicit strategy/tips heading | 0/12 | 1/10 | Not a dependable structured source; author strategy only when cited. |

Proof pages: [Avalanche Abaasy](https://xenoblade.fandom.com/wiki/Avalanche_Abaasy),
[Arachno Queen](https://xenoblade.fandom.com/wiki/Arachno_Queen),
[Abnormal Clone Barg](https://xenoblade.fandom.com/wiki/Abnormal_Clone_Barg),
and [Xord](https://xenoblade.fandom.com/wiki/Xord).

## Caveats and safe extraction rules

1. **Version/form ambiguity:** a page can include XC1 and Future Connected
   material or multiple story forms. Select the block associated with the
   base-game XC1 roster row; retain all matching forms where identity is not
   mechanically equivalent.
2. **Roster/page identity:** resolve redirects and fragments before requesting
   pages. Ancient Machine's left/right variants are an example where a display
   name alone would collapse two encounters.
3. **Spikes are sparse:** `Enemy spike` is available only when documented. No
   template means `null`/undocumented, never “no spike confirmed by game data.”
4. **Strategy is editorial:** combat strategy paragraphs are inconsistent and
   may be absent. Keep them source-attributed free text, do not manufacture a
   strategy field from arts alone.
5. **Template changes/network failure:** cache raw wikitext, store source
   revision/retrieval date, validate required template counts, and write a new
   generated snapshot only after a whole refresh succeeds.
6. **Rate/attack semantics:** strength ranges, effect text, and resistance
   footnotes are display data; preserve raw strings alongside any numeric
   normalization.

## Game-table investigation result

No locally available extracted XCDE combat table was found in this guide
workspace. A bounded public-code search did not surface a maintained,
attributable complete DE enemy-table dump with a more reliable schema than the
Wiki templates. Therefore do not present an unverified reverse-engineered game
table as a source. If a future asset dump is supplied, use it as a comparison
lane (especially for undocumented spikes/form linkage), not an automatic
replacement for the documented public source.
