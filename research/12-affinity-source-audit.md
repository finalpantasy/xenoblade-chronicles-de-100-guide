# Stargleam NPC Affinity Link Guide: structured-source audit

## Source and scope

- Primary: [NPC Affinity Link Guide — Stargleam (Wii)](https://gamefaqs.gamespot.com/wii/960564-xenoblade-chronicles/faqs/73533)
- Mirror/platform variant: [NPC Affinity Link Guide — Switch](https://gamefaqs.gamespot.com/switch/272738-xenoblade-chronicles-definitive-edition/faqs/73533)
- Classification cross-check: [XC1 Affinity](https://xenoblade.fandom.com/wiki/Affinity_(XC1))

This is a 2017 Wii guide that is still exposed under the DE listing. It is a high-value **route-order and affinity-link trigger** source, not a replacement for the public 480-quest checklist. It describes the best attainable chart state, including mutually exclusive outcomes, rather than asserting every link can be positive.

## Exact guide section markers

Use the bracketed markers below as durable extraction anchors. They are printed in the source, so a refresh must locate markers rather than rely on mutable rendered-page line numbers.

| Marker | Section | Structured value |
|---|---|---|
| `{1} [INTR]` | Introduction | scope, chart-completion definition, caveats |
| `{2} [HTRG]` | How to Read This Guide | parsing conventions and link colours |
| `{3} [AFFG]` | Affinity Guide | root of chronological action records |
| `{3.01} [CLN9]` | Colony 9 | residents, talk links, quests, choices |
| `{3.02} [MLTD]` | Military District | same grammar |
| `{3.03} [TPCV]` | Tephra Cave | same grammar |
| `{3.04} [MCNT]` | Mechon Attack | story transition / temporary NPC state |
| `{3.05} [BNLG]` | Bionis’ Leg | same grammar |
| `{3.06} [RFCP]` | Refugee Camp | pre-Ether Mine window / camp links |
| `{3.07} [STRL]` | Satorl Marsh | same grammar |
| `{3.08} [MKFS]` | Makna Forest | same grammar |
| `{3.08.01} [CLRC]` | Colony 6 Recruitment | move/recruitment-dependent links |
| `{3.09} [FRVL]` | Frontier Village | same grammar |
| `{3.10} [ERYS]` | Eryth Sea | same grammar |
| `{3.11} [ALCM]` | Alcamoth | critical pre-Core link/quest window |
| `{3.12} [HETB]` | High Entia Tomb | same grammar |
| `{3.13} [VLKM]` | Valak Mountain | same grammar |
| `{3.14} [HDMV]` | Hidden Machina Village | same grammar |
| `{3.15} [MCFD]` | Mechonis Field | sealed-area timing |
| `{3.16} [CFAR]` | Central Factory and Agniratha | sealed-area timing |
| `{3.17} [MCHC]` | Mechonis Core | final pre-transition state |
| `{3.18} [BNIT]` | Bionis’ Interior | late-game records |
| `{3.19} [PRLN]` | Prison Island | late-game records |
| `{4} [HPAL]` | Highest Possible Affinity Links | canonical end-state link audit |
| `{4.01} [C9AL]` | Colony 9 Area | end-state links by resident |
| `{4.02} [C6AL]` | Colony 6 Area | end-state links by resident |
| `{4.03} [CBAL]` | Central Bionis | end-state links by resident |
| `{4.04} [UBAL]` | Upper Bionis | end-state links by resident |
| `{4.05} [HVAL]` | Hidden Village | end-state links by resident |
| `{5} [MTEL]` | Mutually Exclusive Links | decision alternatives and irreversible outcomes |
| `{6} [LCTM]` | NPC Locations and Times | lookup root |
| `{6.01} [C9LT]` | Colony 9 Area | resident location/time lookup |
| `{6.02} [C6LT]` | Colony 6 Area | resident location/time lookup |
| `{6.03} [CBLT]` | Central Bionis | resident location/time lookup |
| `{6.04} [UBLT]` | Upper Bionis | resident location/time lookup |
| `{6.05} [HVLT]` | Hidden Village | resident location/time lookup |

## Guide grammar to parse

The source is prose, but it uses recurring, extractable sentences:

| Source grammar | Record emitted | Confidence |
|---|---|---|
| `Talk to the following NPCs ... to register them` | `resident_registration` list | high |
| `X at HH:MM for the [colour] X-Y link, “Label”` | `talk_link` with speaker, time, endpoints, colour, label | high |
| `X at any time` | `talk_link.time = any` | high |
| `X will offer the quest Q` | `quest_offer` | high |
| `After [quest/event], X will offer Q` | `quest_offer.prerequisitesRaw`, and quest edge only when target resolves uniquely | high |
| `Completing Q automatically creates ... link` | `quest_auto_link` | high |
| `After completing Q, talking to X at HH:MM creates ...` | ordered `post_quest_talk_link` | high |
| `X will ask you to make a choice` / `See section 5` | `choice_ref` linked to `{5} [MTEL]` case | high |
| `This is the best affinity you can get` / section 4 | `ultimate_outcome = true` | high |
| `OR` / `[colour] OR None` | mutually exclusive outcome set | high |
| `before ...`, `after ...`, NPC leaves/moves, Chapter/Core transition | `availability` / `missableConstraint` (raw text first) | medium-high |

Talk links can appear in either first or second dialogue. Store `talkAttempts: "repeat-if-needed"`; do not encode the source's suggested time as an exclusive availability window.

## Proposed records

```js
{
  id: "affinity-link:<stable hash>",
  areaId: "colony-9", routeChapterId: "ch1",
  source: { url, section: "{3.01} [CLN9]", ordinal: 14 },
  kind: "talk_link", // resident_registration | quest_offer | quest_auto_link | choice
  actorId: "francoise", targetIds: ["narine"],
  time: { type: "exact", value: "10:00" },
  link: { colour: "green", label: "Happy Family" },
  trigger: { type: "talk", questId: null, raw: "Talking to ..." },
  prerequisites: { questIds: [], raw: [] },
  outcomes: [{ state: "created", ultimate: true }],
  exclusivityGroupId: null,
  availability: { deadline: null, raw: [] },
  confidence: "source-explicit"
}
```

Use a separate resident index to avoid copying location text into every action:

```js
{ id, name, areaAffinityBucket, locations: [{ section: "{6.01} [C9LT]", location, timeRange, raw }], source }
```

`raw` is required for every prose-derived condition. Preserve the exact relation text until corroboration converts it into an operational deadline or resolved quest ID.

## Feasibility and coverage plan

1. Fetch/cache plain guide text; assert all 35 markers above occur once before parsing.
2. Split `{3.*}` into chronological batches, `{4.*}` into end-state assertions, `{5}` into choice cases, and `{6.*}` into resident lookup rows.
3. Regex-extract high-confidence sentence grammar, retaining unmatched paragraphs in `parseReview` with section and line-within-section markers.
4. Resolve quest names against the existing 480 outcomes only on a single match. Preserve all other names as raw.
5. Reconcile every `ultimate_outcome` with section 4 and every choice with section 5; emit conflicts rather than choosing a result.

Expected coverage is strong for named residents, talk times, explicit quest-triggered links, and documented choices. It is intentionally incomplete for unnamed generic quests, non-link quest rewards, exact story-chapter conversion, and DE/Switch-2 additions not present in the Wii-era source. It should enrich, not overwrite, the quest checklist and world-lockout dataset.

## Current access limitation

GameFAQs' browser-rendered page exposes the full source and markers, but direct unauthenticated HTTP retrieval is currently Cloudflare-blocked. Therefore this audit specifies marker-based parsing and validation, but does **not** claim a local full-text snapshot, complete extracted resident count, or a successful automated parser run. Acquire the text through an authorized browser/archive step before ingestion.
