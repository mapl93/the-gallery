# Component Dossier: Collection Promo Tile

Status: `human-review-ready`

Date: 2026-07-20

Registry: `E6` / `collection-promo`

Dependency order: 142, phase 6 (Composed components), current depth 0;
recommended direct dependencies `collection-grid` and `link`

## Accepted Direction

Owner decision E6-A and [ADR 0248](../../decisions/0248-first-party-collection-promo-placement-policy.md)
keep E6 as a first-party, passive, self-contained editorial promotion inside
one real Collection Grid item. Sponsored or paid placements are excluded from
neutral v1. The target owns eligible pages, insertion index, frequency,
audience and stable source order and must preserve product order, pagination,
counts and filter/sort truth.

Default and Span 2 remain accepted presentations. The real parent
`li.collection-grid__item`, not the nested article, owns track placement. Span 2
applies only when that Grid has at least two coherent tracks; incompatible
targets omit E6 rather than inventing layout or result behavior. E6's internal
compact mode responds to its own inline-size container.

The article has an optional eyebrow/media, one required visible heading and one
optional destination. A destination composes canonical Link from a complete
non-empty `ctaLabel + href` pair plus a passive directional icon. Missing title
omits the tile; an incomplete CTA pair omits only the CTA. The title, media and
remaining card surface stay passive. Heading rank and destination metadata are
target-owned.

E6 remains `pilot` but is ready for human review. Canonical composition,
semantics, content resilience, contrast, parity and Neutral Web evidence are
complete. Final visual approval, component-specific Figma evidence and a proven
Shopify block/record integration remain review gates, not unresolved neutral
component decisions.

## Purpose, Use Cases And Limits

### Purpose

Present one clearly editorial collection, artist, story or campaign destination
among product results without masquerading as a Product Card or changing the
meaning of neighboring product records.

### In scope

- one self-contained article with one required heading;
- optional short eyebrow and optional native media;
- meaningful or decorative image alternative treatment;
- one optional canonical Link destination with visible descriptive label;
- one passive target-supplied directional indicator;
- statement-without-media and overlay-with-media presentation modes;
- accepted Default and Span 2 layout variants;
- parent Collection Grid list-item integration without source-order changes;
- intrinsic container response, zoom, localization, RTL, text-spacing, dark,
  forced-color and reduced-motion resilience;
- one shared Exhibit/Studio renderer and fixture; and
- documented neutral Web, Shopify, framework, native and Figma translations.

### Out of scope

- product identity, Product Card semantics, price, availability, quick add or cart;
- advertising disclosure, campaign eligibility, targeting or measurement policy;
- sponsored/native-ad classification or legal disclosure requirements;
- deciding which collections, pages, positions or audiences receive a promo;
- collection query, product ordering, pagination, filtering or result counts;
- changing DOM/visual order, dense grid packing, masonry or automatic insertion;
- making the whole tile clickable through JavaScript, pseudo-element overlays or
  non-standard link-area delegation;
- multiple destinations, nested actions, dismiss controls or carousel behavior;
- inventing a fallback URL, title, CTA or media description;
- consumer-configurable overlay opacity, crop, focal point, height, padding,
  typography, radius, icon, animation or breakpoint;
- choosing the target heading level or collection landmark structure; and
- claiming a target-native Shopify block/editor/live-store implementation from
  copied CSS alone.

## Accepted Repository Facts

- ADR 0076 keeps Collection Promo editorial, uses primary text without media and
  inverse text only when media plus overlay are present.
- The public contract already accepts Default and Span 2 variants, optional
  media/eyebrow/CTA and required title.
- ADR 0120 makes `.collection-grid__items` the grid and its direct
  `.collection-grid__item` native `li` the actual grid item. E6's current nested
  article-level `grid-column` cannot span canonical Collection Grid tracks.
- Canonical Link owns native anchor semantics, required visible label and href,
  focus, hover, wrapping and reduced-motion behavior.
- Collection Grid owns list/order/container geometry; E6 must not recreate its
  wrappers or Product Card markup.
- Exhibit and Studio already resolve one `CollectionStudio`, but E6 remains an
  inline branch rather than an extracted artwork renderer.
- Lucide is site-only. The target-agnostic contract must not expose an ArrowRight
  name or framework dependency.
- The registered Figma nodes `943:7` and `1020:480` are generic Studio/Button
  references, not E6-specific visual proof.
- No contract may become `stable` without explicit human review.

## Baseline Audit

### Current anatomy and behavior

- the shared docs renderer uses a native `article`, native image, optional
  eyebrow, heading and one native anchor;
- the CTA is shown whenever a label exists and silently invents
  `#collection-edit` when `href` is empty;
- E6 duplicates Link color, underline, hover opacity and a `4px` zero-offset
  focus outline instead of composing `.link`;
- the CTA ArrowRight is a site fixture with no E6 class, RTL rule or documented
  passive anatomy;
- the overlay is visual-only but lacks an explicit passive marker in renderer or
  fallback markup;
- MDX fallback media uses a `div role="img"` while the shared renderer uses a
  native `img`, weakening fallback parity;
- the renderer hardcodes `h2` while MDX hardcodes `h3`; heading rank is contextual
  but the mismatch is not documented;
- missing title still renders an empty heading/article in Studio;
- `.collection-promo--span-2` applies `grid-column` to the nested article even
  though canonical Collection Grid's direct list item is the grid item;
- the `639px` viewport query controls internal density and span behavior even in
  embedded containers; and
- E6 has no neutral runtime, listener, observer, timer, storage or request.

### API and target gaps

- `ctaLabel` and `href` are individually optional but their required-pair
  invariant is undocumented and unenforced in the shared renderer;
- `mediaAlt` does not explain decorative empty-alt versus informative text;
- title heading ownership, overlay passivity, one-link limit and no-clickable-root
  rule are missing;
- `variant` does not explain that Span 2 requires a compatible Collection Grid
  parent and may fall back to one track in narrow containers;
- Shopify's `main-collection.liquid` renders only paginated product records and
  has no accepted promo block, placement rule, schema, data source or locale set;
- framework/native adapters do not document passive versus linked modes; and
- no E6-specific Figma artwork proves media crop, type, height or span rhythm.

### CSS and token findings

- public tokens cover statement/primary/inverse/focus colors, radius, body/H3/
  small-body type and heading family;
- the current CSS omits accepted small-body line-height and body font-family
  mappings from the contract inventory;
- `24px`, `16px`, `240px`, `180px`, `6px`, `12px`, `3px`, `600`, `1.2`, `.75`,
  `.85`, `.1em`, `68%` and `639px` are private compositional/visual literals,
  not automatic public API candidates;
- structural zero/inset/object-fit values remain private implementation facts;
- the fixed black overlay pairs with inverse text only in the light theme and
  becomes incoherent when dark mode maps inverse text to a dark value;
- logical properties, zero-min sizing and wrapping are incomplete; and
- E6 must not add a component-token layer merely to name every private value.

Baseline performance:

| Artifact | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| E6 slice | `1,735 B` | `723 B` | `a37551dc2d4abc8dbe4066386deea5f6a70818dc86ab6f07cf8da3a455d6b929` |
| Collection family | `9,425 B` | `2,261 B` | `845dd4d329bc4e20b29364ab4552c79cc7eb49465344423679d50b1e70362b16` |
| Neutral Web components | `514,705 B` | `68,988 B` | `8fd36657c275fac0041da265b6541747b29c7f2ef02e6e4348b7f5f85c5018ef` |
| Shared runtime | `53,811 B` | `10,501 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

The Collection-family ceiling is `2,560 B` gzip, leaving `299 B` headroom. E6
must favor canonical Link reuse and removal of the viewport fork. Its
component-specific neutral runtime budget remains `0 B`.

## Visual Reference Analysis

The preserved Exhibit and Studio captures agree on a wide low editorial tile:
darkened still-life media, rounded clipping, bottom-aligned content, uppercase
eyebrow, high-contrast serif title, fine divider/underline, visible CTA and a
rightward line icon. Mobile keeps the same hierarchy in a narrower, taller crop.
The no-media Preview uses the statement surface and primary text. Exhibit and
Studio currently show the same initial candidate.

Preserve that recognizable identity while correcting ownership:

- keep the editorial treatment distinct from Product Card;
- keep one strong title and one visibly separate navigational CTA;
- preserve media/no-media color roles and bounded overlay contrast;
- keep content source order eyebrow, title, CTA in both LTR and RTL;
- let the directional icon mirror in RTL without changing text/DOM order;
- allow long/localized content to grow the tile rather than clip or truncate;
- let canonical Link own native focus/hover/motion with contextual inherited
  color; and
- make Span 2 a real parent-grid placement effect rather than a standalone width
  illusion in the docs stage.

The baseline does not prove final `240px`/`180px` height, `24px`/`16px` padding,
overlay strength, title scale/line-height, eyebrow tracking/opacity, link spacing,
radius, crop, focal point, icon geometry or one-versus-two-column rhythm. Generic
Figma nodes do not establish those values. They remain human visual-review
questions.

## Primary Evidence And Comparison

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI-ARIA APG Link Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Native `a[href]` supplies link semantics and Enter activation; visible link content supplies its name. | Compose canonical Link and keep one descriptive visible CTA. |
| [WAI accessible-name guidance](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Links and headings derive names from child content; hiding visible naming content can remove what assistive technology perceives. | Require real title/CTA text; do not substitute icons or invented ARIA strings. |
| [WAI alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) | Context determines whether an image is informative, redundant or decorative; decorative/redundant images use empty alt. | Keep native image alt target-authored and allow intentional empty alt. |
| [WCAG 2.2 contrast](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Normal text needs `4.5:1`; large text needs `3:1`; the actual background behind overlaid text matters. | Retain a bounded overlay and measure title, eyebrow and CTA against the composited crop. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems vary widely on card media, overlay, link, size and interaction; no standardized promo-card anatomy is established. | Preserve Gallery's narrow semantic API instead of copying a generic Card API. |
| [Open UI Link Area Delegation explainer](https://open-ui.org/components/link-area-delegation.explainer/) | Clickable-card delegation is incubating; current wrapper/overlay/JS workarounds have naming, nested-interaction and activation tradeoffs. | Keep only the explicit native CTA; do not add whole-tile click delegation. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Card groups related content/actions and can be rendered as a link, but interactive styling and sizing are framework presentation choices. | Reuse the grouping insight, not Radix's React `asChild`, responsive size API or full-card-link default. |
| [Polaris Card](https://polaris-react.shopify.com/components/layout-and-structure/card) | Cards group one coherent flow, use clear headings and should avoid excess calls to action. | Keep one title and at most one destination; Polaris Admin visuals are not storefront identity. |
| [Shopify theme blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/index) | Blocks provide merchant-customizable, reorderable section content; snippets are reusable markup without editor settings. | A target-native promo likely needs a block plus canonical snippet, but exact ownership is a Shopify architecture decision. |
| [Shopify sections/blocks best practices](https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks) | Mixed grid blocks must preserve logical flow, reflow, and avoid fragile order-specific layout assumptions. | Keep source/visual order aligned and require an explicit placement policy before adding Shopify insertion. |

### Coincidences

- use a native visible link for navigation and a heading that names the article;
- keep the promo to one coherent editorial purpose and one destination;
- treat media alternative text according to its actual contextual meaning;
- preserve logical source order and responsive reflow in mixed grids;
- keep the target/editor responsible for content, destination and placement;
- avoid whole-card interaction workarounds while link-area delegation is not a
  stable Web primitive; and
- measure contrast over the actual composited background, not the token names.

### Differences and non-consensus

- systems disagree on full-card link versus explicit CTA, but the repository
  already exposes one CTA and Open UI documents current whole-card tradeoffs;
- generic Card systems expose size/surface/padding APIs that are not stable
  commerce semantics for E6;
- sources do not agree on article versus generic grouping in every placement;
  E6's required self-contained editorial heading supports article in Gallery;
- informative versus decorative media is contextual and cannot be inferred from
  the mere presence of an image;
- sources do not establish a universal promo insertion position, frequency,
  sponsorship disclosure, Span 2 rule or Shopify block schema; and
- no external source defines The Gallery's overlay, crop, typography or icon.

## Recommended Anatomy

| Part | Required | Candidate mapping | Owner | Notes |
| --- | --- | --- | --- | --- |
| Grid item | in Collection Grid | `li.collection-grid__item` | Collection Grid | Parent owns list membership and span placement. |
| Root | yes | `article.collection-promo` | E6 | Self-contained passive editorial unit; no href/click handler. |
| Media | no | `img.collection-promo__media` | target content + E6 geometry | Empty alt when decorative/redundant; concise alt when informative. |
| Overlay | with media | `.collection-promo__overlay[aria-hidden="true"]` | E6 visual | Passive contrast layer, absent without media. |
| Content | yes | `.collection-promo__content` | E6 | Logical flow and intrinsic sizing. |
| Eyebrow | no | `.collection-promo__eyebrow` | target content + E6 type | Short context, not an accessible substitute for title. |
| Title | yes | heading `.collection-promo__title` | target semantic context + E6 type | Target chooses valid heading rank. |
| CTA | pair-conditional | `a.link.collection-promo__cta[href]` | canonical Link + target destination | Visible descriptive label; only focus stop. |
| CTA icon | with CTA in Web candidate | `.collection-promo__cta-icon[aria-hidden="true"]` | target visual | Passive, logical-direction aware, not a public icon property. |

## Recommended Public API And State Matrix

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `variant` | enum | optional, default `default` | `default` or accepted `span-2`; span requires compatible Collection Grid parent. |
| `media` | slot | optional | Target-supplied native media; no asset request in neutral source. |
| `mediaAlt` | string | optional, may be empty | Contextual native image alternative; not generated from title. |
| `eyebrow` | string | optional | Short visible editorial context; omitted when blank. |
| `title` | string | required non-empty | Visible article heading content. |
| `ctaLabel` | string | optional pair | Visible canonical Link text; requires non-empty `href`. |
| `href` | string | optional pair | Native destination; requires non-empty `ctaLabel`. |

| State or mode | Expected behavior |
| --- | --- |
| Default/no media | Statement surface, primary text, no overlay. |
| Media | Native image plus passive theme-opposed overlay; inverse text; same DOM content order. |
| Informative media | Concise contextual alt text. |
| Decorative/redundant media | `alt=""`; copy still communicates promotion. |
| Default span | One parent Grid track. |
| Span 2 | Parent list item spans two tracks only when the Grid container supports at least two. |
| No CTA pair | Passive article with no anchor/focus stop. |
| Complete CTA pair | One canonical native anchor; Enter/click navigate normally. |
| Incomplete CTA pair | CTA omitted; no invented URL or unnamed link. |
| Missing title | Complete tile omitted in shared/production renderers. |
| Long/localized content | Tile grows; title/link wrap; no clipping or fixed text line count. |
| RTL | Source order unchanged; text follows direction; directional icon mirrors. |
| Narrow/zoom/text spacing | One-track parent fallback and compact internal padding; no page overflow. |
| Dark mode | Semantic statement/inverse tokens remain legible. |
| Forced colors | Media/overlay do not obscure system text/boundary/focus. |
| Reduced motion | Canonical Link removes decorative transitions; E6 adds no animation. |

Do not expose article tag, heading level, link variant, target/rel, icon, overlay
strength, focal point, crop, height, aspect ratio, padding, gap, type, radius,
breakpoint or insertion position as E6 public properties. Native `target`/`rel`
can be reviewed later if a concrete cross-target promotional use requires them.

## Controlled / Uncontrolled Strategy

E6 is passive except for native navigation. It has no controlled/uncontrolled
state, value, selection, disclosure, loading or synchronization contract.

- Static/neutral Web authors one native anchor only when both CTA values exist.
- React/Angular adapters receive immutable content/destination props and emit no
  synthetic E6 state event; router hosts may compose Link while preserving href.
- Shopify Liquid owns block/editor values, image sources, destination and
  placement. No neutral JavaScript or hidden field is needed.
- Figma properties describe visual presence and Span 2 composition only; they do
  not imply a storefront insertion algorithm or a runtime link delegation.
- Native targets use one native navigation destination when present and one
  target-native accessible image description decision.

## Token And Performance Direction

- Canonical Link owns anchor focus, hover, wrapping and reduced-motion behavior.
- E6 owns contextual inherited link color, article surface, media/overlay,
  content flow, internal container response and passive icon direction.
- Pair inverse text with a scrim drawn from current primary text, following the
  accepted Collection Hero theme opposition; do not keep a fixed black scrim
  when dark mode maps inverse text to a dark value.
- Use existing semantic color, radius, spacing and typography tokens; private
  `--_` variables may name overlay/min-block/padding/tracking details without
  creating public API.
- Use logical inline/block properties and container queries; remove the `639px`
  viewport fork.
- E6 should remain within its `723 B` gzip slice while Collection stays below
  `2,560 B` gzip. Reuse should ideally reclaim duplicated link CSS.
- E6 adds `0 B` neutral runtime and no component asset request; target media is
  supplied content and responsive image policy remains target-owned.

## Target Translation

- **Neutral Web:** article inside a Collection Grid list item, native image,
  passive overlay, contextual heading and canonical Link.
- **Shopify:** likely a merchant-configurable theme/section block rendered inside
  the collection list, with explicit insertion and span policy. Current target
  has no accepted block or data path; keep planned.
- **React/Angular/Hydrogen:** passive composition with target/router-native Link,
  one optional destination and parent Grid placement.
- **Webflow/Framer:** canonical CSS and target-authored content; parent layout must
  preserve source order and span semantics.
- **Figma:** Default/Span 2, media/no-media and CTA/no-CTA visual properties after
  component-specific owner review; generic Studio nodes are not evidence.
- **SwiftUI/Compose:** target-native editorial card/list-grid item with one
  optional navigation destination and accessible image semantics.

## Evidence Plan

1. Preserve the four existing Mobile/Desktop screenshots as before evidence.
2. Prove one extracted shared renderer and fixture in Exhibit and Studio.
3. Compare normalized DOM and non-geometric computed styles between surfaces.
4. Capture paired Mobile, Tablet, Desktop and XL initial states.
5. Test one native anchor, Enter/click behavior, Tab sequence, visible focus and
   no root click/role/tabindex.
6. Verify media/no-media, informative/decorative alt, CTA/no-CTA/incomplete-pair
   omission and missing-title fail-closed behavior.
7. Place Default and Span 2 tiles inside canonical Collection Grid list items and
   measure real 1/2/3/4-track container effects without source reordering.
8. Test direct 200/320/520/720px hosts, effective 200% zoom, localized/unbroken
   content, RTL, text spacing, dark, reduced motion and forced colors.
9. Measure text/CTA contrast against the no-media surface and composited maximum
   media background; inspect crop extremes.
10. Assert no E6 listener, observer, timer, request, asset, delegated link area or
    framework dependency in neutral source.
11. Measure E6/Collection/Web/runtime raw, gzip and hashes against baseline.
12. Regenerate Web/Shopify/Webflow copies, validate them, run all program gates,
    and finish with a clean owned browser/server resource assertion.

## Risks And Open Questions

### Resolved owner policy

- neutral v1 is first-party editorial only; sponsored/paid promotion is out of
  scope;
- the complete explicit Link CTA is optional and the remaining article stays
  passive;
- the target owns eligible pages, editorial records, insertion index, frequency,
  audience, source order, heading rank and destination metadata;
- placement must preserve product query, order, pagination, counts and filter/
  sort truth;
- Span 2 is available only with at least two coherent parent tracks; and
- Shopify needs an explicit collection-grid block or record and evidence from
  its owning section rather than being inferred from copied CSS.

### Human visual input required

- approve no-media statement and media-overlay directions;
- approve tile height/aspect, crop/focal point, padding and one/two-track rhythm;
- approve overlay strength across real production media extremes;
- approve eyebrow/title/link hierarchy, line-height, tracking and wrapping;
- approve radius, link focus, underline and directional icon geometry;
- provide or approve E6-specific Figma artwork and content fixtures; and
- explicitly approve stability after reviewing complete evidence.

### Supported alternatives

1. **Recommended:** passive article with one explicit canonical Link CTA, optional
   media and parent-owned real Span 2 placement.
2. **Single linked article:** make one valid native anchor wrap the complete
   content only if E6 is guaranteed never to contain another interactive element
   and owner review accepts the resulting accessible name/hit area. This changes
   the accepted CTA model and requires an ADR.
3. **Target omission:** omit inline promotions from Collection Grid when a target
   cannot preserve truthful source order, pagination, disclosure, reflow and
   editor behavior. A separate Featured Collection/marketing section remains
   preferable to a false in-grid implementation.

## Refinement Outcome

E6 is technically reconciled on Neutral Web. One shared
`CollectionPromoArtwork` now renders Exhibit and Studio from the same fixture;
the root is a passive native article, the required title fails closed, media alt
semantics are contextual, overlay/icon nodes are passive and the optional
`ctaLabel + href` pair composes one canonical Link without an invented URL.

The real Collection Grid parent `li` owns Span 2 at compatible container
densities. E6 uses its own inline-size container for internal compact response,
logical properties, safe wrapping and zero neutral runtime. Final evidence has
`failures: []` across four paired viewports, 200--720px direct hosts, one to four
Grid tracks, media/no-media, optional omission, localized/unbroken content, RTL,
text spacing, effective 200% zoom, light/dark contrast, forced colors and reduced
motion. Exhibit/Studio normalized DOM and non-geometric style hashes match.

Visual inspection caught the baseline fixed-black scrim becoming illegible with
dark-mode inverse text. The final implementation follows accepted ADR 0119 and
pairs inverse text with a current-primary scrim: minimum theoretical contrast is
`5.01:1` in light and `5.92:1` in dark across black/white source extremes. The
light-scrim/dark-text dark-mode direction remains an explicit aesthetic review
item rather than an inferred product decision.

The current Collection family measures `2,366 B gzip` against the `2,560 B`
ceiling, leaving `194 B`; E6 adds no runtime. Web, Shopify and Webflow CSS
projections are regenerated and source-identical where copied. Shopify remains
honestly planned until the accepted block/record ownership is implemented and
proven. E6 remains `pilot`, is not `stable`, and is now ready for explicit human
visual, target and stability review.
