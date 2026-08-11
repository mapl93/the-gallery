# Collection Promo Web Refinement Audit

Status: `human-review-ready`

Date: 2026-07-20

Component: `E6` / `collection-promo`

Contract: `0.3.0` / `pilot`

ADRs: [0218 Collection Promo As Passive Grid Article With Canonical Link](../decisions/0218-collection-promo-as-passive-grid-article-with-canonical-link.md)
and [0248 First-Party Collection Promo Placement Policy](../decisions/0248-first-party-collection-promo-placement-policy.md)

Dossier: [Collection Promo Tile](../refinement/dossiers/collection-promo.md)

## Outcome

E6 is technically refined as a passive editorial article inside a canonical
Collection Grid item. It has required title semantics, contextual image alt,
optional eyebrow/media, one optional complete CTA pair, canonical Link
composition, target-context heading rank, a parent-owned real Span 2 placement,
container-responsive internal geometry and zero neutral runtime.

One `CollectionPromoArtwork` and one fixture now serve Exhibit and Studio. The
normalized DOM and non-geometric computed-style hashes match exactly. Browser,
interaction, responsive, content, theme, contrast, high-contrast and motion
checks pass with `failures: []`.

Owner decision E6-A now bounds the candidate to first-party editorial content,
keeps the complete explicit Link CTA optional, assigns eligibility/insertion to
the target, permits Span 2 only with two coherent parent tracks and requires
product pagination/count truth. E6 remains `pilot` and is not `stable`; final
visuals, E6-specific Figma evidence and target integration require explicit
human review.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | First-party self-contained editorial promotion only; sponsored/paid content is excluded and no result ownership, insertion algorithm, analytics or synthetic card interaction is added. |
| Anatomy | pass | Parent Grid `li`, passive `article`, optional image/overlay/eyebrow, required contextual heading, content and one pair-conditional canonical Link. |
| Public API | pass | `variant`, `media`, `mediaAlt`, `eyebrow`, required `title`, paired `ctaLabel` and `href`; visual/compositional internals stay private. |
| Canonical composition | pass | Direct `collection-grid` and `link` dependencies; no duplicated link focus, hover, motion or root activation. |
| Semantics and accessibility | pass | Native article/image/heading/anchor, useful or empty alt, passive overlay/icon, one focus stop, no false role/live region. |
| Interaction | pass | Native pointer and Enter activate only the CTA; root remains passive and incomplete CTA pairs omit the link. |
| Responsive/content resilience | pass | Four paired viewports, direct 200/320/520/720px hosts, 1--4 Grid tracks, localized/unbroken copy, RTL, text spacing and effective 200% zoom. |
| Themes and special modes | pass technically | AA contrast at black/white media extremes, coherent light/dark scrim opposition, system forced-color boundary/focus and zero reduced-motion animation. |
| Exhibit/Studio parity | pass | Identical normalized DOM and non-geometric style hashes from one renderer and fixture. |
| Runtime/assets | pass | `0 B` E6 runtime, no listener/observer/timer/storage/request and no component-owned media asset. |
| Web/Webflow | pass | Generated adapter validates and copied Collection CSS is byte-identical to source. |
| Shopify | planned honestly | E6-A accepts an explicit collection-grid block/record boundary; schema/data/localization/editor/live-store implementation and result-truth evidence are still not invented. |
| Performance | pass | Current Collection family is `2,366 B gzip / 2,560 B`, leaving `194 B`; cumulative Web/runtime exceptions are not reset. |
| Human review | ready | Dark visual inversion, final geometry/type/crop/icon, target integration, Figma evidence and explicit stability approval remain human gates. |

## Baseline Findings

The pre-refinement tile looked coherent in light mode but had contract and
composition gaps:

- Span 2 was applied to the nested article instead of the canonical Grid item;
- CTA text silently invented `#collection-edit` when `href` was absent;
- Link hover, focus and motion behavior were duplicated;
- the fixed-black scrim failed when dark mode mapped inverse text to dark;
- overlay and icon passivity, RTL direction and contextual heading ownership
  were incomplete;
- viewport width, not the component container, controlled compact geometry;
- MDX fallback used different image semantics; and
- Shopify had no truthful promo placement or editor architecture.

Preserved before evidence lives at:

- `output/playwright/parity/collection/collection-promo-exhibit-mobile.png`;
- `output/playwright/parity/collection/collection-promo-exhibit-desktop.png`;
- `output/playwright/parity/collection/collection-promo-studio-mobile.png`; and
- `output/playwright/parity/collection/collection-promo-studio-desktop.png`.

Baseline performance was:

| Artifact | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| E6 slice | `1,735 B` | `723 B` | `a37551dc2d4abc8dbe4066386deea5f6a70818dc86ab6f07cf8da3a455d6b929` |
| Collection family | `9,425 B` | `2,261 B` | `845dd4d329bc4e20b29364ab4552c79cc7eb49465344423679d50b1e70362b16` |
| Neutral Web components | `514,705 B` | `68,988 B` | `8fd36657c275fac0041da265b6541747b29c7f2ef02e6e4348b7f5f85c5018ef` |
| Shared runtime | `53,811 B` | `10,501 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

## Research And Direction

The dossier compares WAI link/naming/image guidance, WCAG contrast, Open UI Card
and Link Area Delegation research, Radix Card, Polaris Card and Shopify theme
block guidance. Sources converge on native descriptive links, contextual image
alternatives, measurable media contrast and target-owned content. They do not
establish a standard promotional-card anatomy, universal full-card link,
insertion policy, disclosure rule, span policy or Shopify schema.

ADR 0218 therefore preserves Gallery's explicit native CTA. Incubating link-area
delegation and wrapper/pseudo-element/JavaScript workarounds do not justify a
synthetic clickable root. ADR 0248 applies owner-selected E6-A: first-party only,
optional CTA, target-owned placement and unchanged product pagination/count
truth.

## Shared Renderer And API

`CollectionPromoArtwork`:

- trims the required title and omits the full tile when it is blank;
- renders a native article and context-ranked heading;
- preserves informative text or native `alt=""` for target-supplied media;
- renders overlay only with media and marks overlay/icon passive;
- renders exactly one native `.link.collection-promo__cta` only when label and
  destination are both non-empty; and
- contains no root click handler, role, tabindex, fallback URL or runtime work.

The public API deliberately excludes article tag, heading level, link style,
icon choice, overlay strength, focal point, crop, height/aspect, spacing,
typography, radius, breakpoint, insertion position, pagination and analytics.

## Grid And Responsive Evidence

Span 2 is a request interpreted by the canonical parent Grid:

| Grid host | Tracks | Span request | Measured item |
| --- | ---: | --- | ---: |
| `280px` | 1 | falls back | `280px` |
| `360px` | 2 | `span 2` | `360px` |
| `800px` | 3 | `span 2` | `530px` |
| `1100px` | 4 | `span 2` | `545px` |
| `800px` default | 3 | one track | `260px` |

Every probe reports zero Grid/list overflow. Direct E6 hosts at 200, 320, 520
and 720px report zero horizontal overflow; the internal compact mode changes at
the E6 container rather than viewport. Localized Spanish, unbroken strings, RTL,
text spacing and effective 200% zoom remain contained and grow vertically.

## Accessibility And Theme Evidence

The initial DOM has one native article, one `h2` in docs context, one informative
native image, one canonical native anchor and no other interactive descendant.
Decorative media preserves empty alt. Missing title fails closed; missing either
CTA value omits the complete link.

The media scrim uses current primary text while visible content uses inverse
text, following ADR 0119. Theoretical contrast across completely black and white
source pixels is:

| Mode | Title minimum | Eyebrow minimum | CTA minimum |
| --- | ---: | ---: | ---: |
| Light | `6.17:1` | `5.01:1` | `6.17:1` |
| Dark | `7.72:1` | `5.92:1` | `6.26:1` |

Visual inspection caught and corrected the former illegible fixed-black dark
state. The final dark state intentionally becomes a light scrim with dark copy;
its accessibility is proven, while its aesthetic direction remains owner-owned.
Forced colors visually suppresses image/scrim, preserves image semantics, adds a
system boundary and retains a separate `2px` visible Link focus. Reduced motion
reports zero animated descendants.

## Exhibit And Studio Parity

Paired component and viewport screenshots cover Mobile `390x844`, Tablet
`768x1024`, Desktop `1440x1000` and XL `1920x1080` in both surfaces. Initial
component widths are `326px` on mobile and approximately `520px` otherwise.

- normalized DOM SHA-256 on both:
  `6207cb418a8058d9ca434a75380b12f05a36c2e91af48fb5c073fa4a197d5959`;
- non-geometric style SHA-256 on both:
  `de76f3b0ac364d0677728d47c2fdbf3bb686adafea46108b1393a941df226542`.

Final evidence and the structured result live in
`output/playwright/refinement-batch-127/`. The phase used one managed server,
one named headless Chromium session and one tab, then passed
`evidence:assert-clean` with no owned resource left running.

## Performance And Target Translation

Final deterministic level-9 gzip is:

| Artifact | Raw | Gzip | Delta gzip | SHA-256 |
| --- | ---: | ---: | ---: | --- |
| E6 slice | `3,237 B` | `1,034 B` | `+311 B` | `ba5f1551dc56e55623de81cf6e8e6179a19dc4131d4b705fb2dddce51e588a87` |
| Collection family | `10,927 B` | `2,509 B` | `+248 B` | `e3fd510d96748fb4570c434585ca7bb4b7eb43ce77b19bc1aa76c8bf55ac4d8b` |
| Neutral Web components | `516,207 B` | `69,155 B` | `+167 B` | `16d104aa4360f854e213eec3a043df12f003fdb9fbd44c6e88e3c7d18619b63b` |
| Shared runtime | `53,811 B` | `10,501 B` | `0 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

At batch 127, Collection stayed below its `2,560 B` family ceiling with `51 B`
headroom. After the subsequent E5 reconciliation in the same source family, the
current deterministic family measurement is `2,366 B` with `194 B` headroom and
SHA-256 `c620bbba92b0c3db86ccb3944b6ed1824edb5d3e8203ead95266ece032b947e0`.
The existing cumulative Web CSS and runtime exceptions remain recorded program
gaps; E6 adds no runtime.

`components/css/collection.css`, Shopify's copied asset and Webflow's copied
asset are byte-identical at the final Collection hash. Neutral Web is
implemented. Shopify remains planned under the accepted E6-A boundary until an
explicit collection-grid block or record proves section ownership, insertion,
pagination/count/order preservation, schema, data, localization, editor preview
and live-store behavior. Framework, native and Figma mappings remain documented
planned translations.

## Owner Decision Reconciliation And Verdict

E6-A resolves the neutral product and architecture questions:

- neutral v1 is first-party editorial only and may remain passive without a CTA;
- only the complete explicit Link CTA navigates;
- the target owns eligibility, insertion, frequency, audience and stable order;
- Span 2 requires two coherent parent tracks;
- promo insertion preserves product query/order/pagination/count/filter truth;
- heading rank and destination metadata stay target-owned; and
- Shopify uses an explicit owning collection-grid block or record.

Human review still covers dark-mode visual inversion, crop/focal point, depth,
spacing, type, overlay, radius, focus, icon, E6-specific Figma evidence, target
integration and stability.

Verdict: safe Neutral Web implementation, canonical composition, evidence and
target boundaries are complete. E6 is `human-review-ready`, remains `pilot`, is
not `stable`, and no stability promotion is claimed.
