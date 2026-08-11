# Component Dossier: Collage Section

Status: `human-review-ready`

Target reviewed: Neutral Web with Webflow and Shopify translation

Contract: `components/contracts/collage-section.contract.json`

## Recommendation

Refine S19 as a passive, finite, ordered media collection with one optional
visible heading and one item-level feature span. A non-empty heading creates and
names a native section; without it the root is a generic `div`. One or more valid
items are required. The collection uses native `ul`/`li` source order, and each
neutral item uses `figure`, target-owned media and an optional always-visible
`figcaption`.

The neutral fixture and base must not make passive items focusable. A target may
wrap a figure in a native anchor only when it has a real destination, or compose
a separately accepted Lightbox/commerce control. This preserves the explicit
ADR 0082 boundary: S19 owns media grouping and art-directed layout, while targets
own activation semantics, routes, overlays, commerce disclosures and analytics.

Feature is item metadata for visual emphasis, not component state. It does not
move the item in DOM order or imply priority, selection, activation or loading
policy. Captions remain readable without hover, focus, touch or motion. S19 adds
no component JavaScript or assets.

## Purpose And Limits

- Presents a curated finite group of related images with one optional visually
  emphasized record.
- Supports an optional contextual heading, item-specific alternatives, optional
  captions and target-supplied native destinations.
- Preserves meaningful source order while CSS Grid creates two-dimensional
  emphasis.
- Does not become Gallery Grid, Masonry Gallery, Carousel, Lightbox, Product
  Grid, drag-and-drop layout editor, provider feed or infinite collection.
- Does not own media delivery, crop focal points, rights, loading priority,
  destinations, analytics, inventory, pricing, consent or error recovery.
- Multiple arbitrary spans, reorder controls, overlapping items, text cards,
  video playback and nested interactive controls are outside v1.

## Current Gallery Baseline

| Fact | Baseline |
| --- | --- |
| Registry | `S19`, Sections, `.collage-section`, no dependencies; “featured item spanning 2x2”. |
| Contract | `0.2.0`, `pilot`; optional heading, required items slot, target-owned activation. |
| Anatomy | Root/header/heading/grid/item/feature/caption; generic containers do not prescribe native relationships. |
| CSS | Four/two/one viewport and container tracks, one 2x2 feature, hover image scale and hidden overlay captions. |
| Renderer | Always an unnamed `section`; five generic `div[tabindex=0]` items with generic alternatives and hidden captions. |
| Required omission | Disabling items leaves an empty section rather than omitting the component. |
| Studio / Exhibit | Same renderer and fixture; site CSS fixes every grid row to `180px`. |
| Shopify | Copied CSS only; no target-native section/data/editor implementation. |
| Figma | Registered `943:7` and `1020:480` nodes are Button Studio, not S19. |
| Runtime | No S19 selector, state, listener, observer, request or asset in shared JS. |

Batch 78 baseline confirms five generic passive tab stops, zero list/figure
semantics, an unnamed section despite a visible heading, captions at computed
opacity `0`, and exact shared defects in Exhibit and Studio. Eight paired
screenshots cover Mobile, Tablet, Desktop and XL under
`output/playwright/batch78-collage-section/before/`.

## External Evidence

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [HTML grouping content](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) | `figure` represents self-contained content and `figcaption` provides its caption; native lists group related records. | Use `ul`/`li` plus one figure per media record instead of focusable generic divs. |
| [WAI Groups of Images](https://www.w3.org/WAI/tutorials/images/groups/) | A related image collection needs item-specific alternatives and can use figures/captions to preserve each image's relation to the collection. | Each informative item needs authored alternative text; captions remain semantic content. |
| [WCAG 2.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) | When sequence affects meaning, at least one correct reading sequence must be programmatically determinable; matching DOM/visual order is a sufficient technique. | Feature placement must not reorder the source or produce a misleading collapsed order. |
| [CSS Grid 2 reordering and accessibility](https://www.w3.org/TR/css-grid/#order-accessibility) | Grid placement does not change speech or sequential navigation order and must not replace correct source order. | Use span only for size; never use `order`, dense packing or explicit placement to change narrative sequence. |
| [WCAG 2.2 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) | Focusable components follow an order that preserves meaning and operability. | Passive figures have no tab stop; only real target-native links/buttons enter the sequence. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Systems expose generic Grid/Image/List building blocks but no interoperable Collage widget contract. | Keep S19 a semantic composition instead of inventing custom widget roles or keyboard commands. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix focuses on behavior-heavy primitives and does not define a Collage component. | Native content semantics and target-owned activation are more portable than a React-shaped state API. |
| [Polaris Grid](https://polaris-react.shopify.com/components/layout-and-structure/grid) | Grid exposes responsive layout while warning against area-based structures that create accessibility problems. | Span visual emphasis without changing logical order; keep item content/activation independent. |
| [Shopify `image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) | Native image output carries alt, intrinsic dimensions and responsive `srcset`. | Shopify maps validated merchant image blocks to native figures and responsive media without neutral runtime. |

APG defines no Collage widget pattern. No custom ARIA role, roving focus or key
model is required for the passive neutral composition.

## Owner Reference Audit

Studio points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
inspector `1020:480`. Direct inspection during the adjacent Section batches
shows the Button Studio pilot and Button controls. The nodes cannot approve S19
grid, crop, span, caption, radius, type, spacing or target interaction.

Human review must therefore treat all visual values as candidates, not owner
reference matches.

## Recommended Anatomy

| Part | Required | Neutral element | Ownership |
| --- | --- | --- | --- |
| root | yes for valid items | heading-labelled `section` or untitled `div` | S19 structure |
| header | optional | `header` | S19 placement |
| heading | optional | contextual heading with unique id | consumer content/rank |
| grid | yes | `ul` | S19 ordered collection |
| item | repeated | `li` | target record + S19 geometry |
| feature item | optional, one recommended | same `li` plus modifier | target item metadata |
| item link | optional | native `a[href]` wrapping one figure | target destination |
| figure | yes per valid item | `figure` | S19 relationship |
| media | yes per valid item | target-native `img`/media | target source/alt/loading |
| caption | optional | always-visible `figcaption` | target text, S19 presentation |

The complete root is omitted when no valid items remain. An empty heading omits
the header and yields a generic root. Passive items receive no `tabindex`, role,
click handler, pointer cursor, focus style or hover-only content.

## State, Variant, Size, And Mode Matrix

| Dimension | v1 direction |
| --- | --- |
| variant / size | one default; feature is item metadata, not a component variant/state |
| titled / untitled | named native section / generic div |
| empty required items | omit complete root |
| passive item | native list item and figure, no focus or action |
| linked item | real native anchor only when target supplies a destination |
| feature | spans two tracks/rows only when at least two tracks fit; returns to one span on narrow containers |
| captioned / uncaptioned | optional persistent figcaption / no reserved caption node |
| short / long / localized | wrapping caption and heading, meaningful source order |
| RTL | logical insets and authored source order; no visual reordering |
| 200% text | caption wraps without clipping essential text or page overflow |
| reduced motion | no S19-authored transition or animation |
| forced colors | native text/link/focus visible; media never sole carrier of required text |
| controlled/uncontrolled | not applicable; no neutral value, selection, open state or event |

## Public API And State Ownership

- `heading`: optional trimmed visible string/slot; consumer controls contextual
  heading rank and unique id in target mapping.
- `items`: required ordered slot with one or more valid item compositions.
- Per target item: required media, explicit alternative-text intent, optional
  caption, optional feature flag and optional native destination/control chosen
  by the target.
- No public columns, rows, gap, row height, aspect ratio, crop, radius, overlay,
  caption visibility, hover scale, transition, breakpoint, max width, heading
  alignment, media loading, focal point or editor setting.
- No component state or events. Targets own destination, Lightbox state,
  selection, overlay, commerce disclosure and analytics outside the passive base.

The `items` slot remains the cross-target API because the current contract model
does not yet define nested record schemas. Shopify can expose editor block fields
without promoting them to universal neutral properties.

## Token And Hardcoded-Value Audit

The final contract declares 16 existing public tokens: semantic primary,
inverse and focus colors; H3 and Body Small typography; small radius; and
section, container, element and grid spacing. The implementation uses every
declared token and introduces no component-scoped public token.

Final private composition retains the `80rem` preferred measure, `8%` narrow
inset, `clamp(9rem, 22cqi, 18rem)` row size, four/two/one tracks, one 2x2
feature span, `.75em 1em` caption inset, `78%` caption surface mix and inset
focus geometry. Forced colors maps captions to `Canvas`/`CanvasText`.

The refinement therefore:

- use existing semantic section/container, element/grid spacing and H3/Body
  Small typography tokens;
- retain semantic primary/surface/focus colors and small radius;
- keep row size, feature span, media crop and caption inset as private
  composition;
- removes easing/transition tokens because passive S19 owns no motion;
- removes hover/focus disclosure and image scale rather than tokenizing them; and
- do not create component-scoped public tokens for columns, crop or overlay.

## Responsive And Content Tests

Evidence must cover:

- direct component widths `200–1120px`, paired Mobile/Tablet/Desktop/XL, and
  nested containers independent of viewport;
- one, two, five, many, empty and invalid items;
- first/non-first feature, no feature, and more than one target feature request;
- captions absent, short, long localized, unbroken, RTL and effective 200% text;
- informative and intentionally decorative media alternatives;
- passive, native-linked and mixed target compositions;
- dark, forced-colors, reduced-motion, broken media and CSS-disabled source order;
- no generic focus stops, clipped focus, hidden essential captions, distorted
  images, dense-grid reorder, horizontal page overflow or empty shell.

## Runtime And Performance Budget

S19 budget is `0 B` neutral runtime: no state, event, listener, observer, timer,
request, layout read, animation loop, custom element, hydration or bundled asset.
Responsive behavior is CSS-only and container-driven.

The S19 baseline was Sections `6,795 B` gzip and total neutral component CSS
`67,136 B`. Final values are `6,662 B` and `66,965 B`: S19 recovers `133 B`
from the Sections family and `171 B` from the generated Web bundle. Shared
runtime remains `10,501 B`; S19 adds `0 B`. Sections stays under its permanent
`6,861 B` ceiling. The existing total CSS/runtime program gaps remain separate.

Shopify media use responsive intrinsic image output. Loading priority remains
section-position/target policy rather than a consumer-facing S19 property.

## Cross-Target Translation

| Target | Mapping |
| --- | --- |
| Neutral Web | conditional native root, `ul`/`li`, figures/captions, optional native links, container CSS, zero JS |
| Webflow | source-identical CSS plus CMS-authored ordered media records; activation remains project-owned |
| Shopify | localized addable section with validated image blocks, optional feature/caption/destination, editor attributes and zero JS |
| React / Angular | thin conditional native wrapper over framework records; no Gallery state store |
| Figma | static component/set with optional heading, repeated items and one feature property after corrected evidence |
| SwiftUI / Compose | native lazy/non-lazy grid, image, caption and link semantics; source order preserved |

## Exhibit And Studio Findings

- Both surfaces already use one renderer and fixture, so source parity is
  achievable without a second implementation.
- The current fixture violates the contract by adding `tabIndex=0` to five
  actionless items. It must become native passive figures, optionally mixed with
  real native destinations for target composition evidence.
- The current section has no `aria-labelledby`, and the heading has no id.
- The current grid and items are generic divs; captions are generic divs and
  opacity `0` until pointer/focus disclosure.
- Site-only `180px` row sizing is a presentation fork and should be removed in
  favor of canonical container-driven geometry shared by both surfaces.
- Registered Studio controls describe only heading/items and selected tokens;
  they must not invent activation or private layout API.

The final renderer resolves these findings. Normalized Exhibit and Studio DOM
is exactly equal, both use the same five-record fixture, passive items have
`tabIndex -1`, two real destinations remain native links, all five captions have
computed opacity `1`, and no site-only S19 geometry remains.

## Risks And Human Questions

- Approve one-feature recommendation versus allowing multiple emphasized items.
- Approve final four/two/one track thresholds, row height, gap, radius and crop.
- Approve persistent caption surface, inset, typography and contrast treatment.
- Confirm two-property neutral API and target-owned optional item links.
- Decide concrete Lightbox/product-link use per target; the neutral component
  does not choose it.
- Supply component-specific Figma/reference evidence.
- Review total Web CSS/shared runtime program overruns separately; S19 must not
  raise them.

## Implementation And Certification Result

- ADR 0159 records the passive native collection boundary.
- Registry, contract `0.3.0`, anatomy, states, tokens, MDX and Studio metadata
  agree on optional `heading` plus required ordered `items`.
- The shared renderer conditionally names a native section, emits `ul`/`li` and
  figure/caption relationships, omits invalid required content and keeps passive
  items out of the tab order.
- Canonical CSS owns persistent captions, container-driven four/two/one tracks,
  inset visible link focus, forced-color adaptation and zero motion.
- Exhibit and Studio share exact normalized DOM; paired four-viewport plus
  untitled, focus, localized RTL/long, dark, forced-colors and reduced-motion
  evidence lives under `output/playwright/batch78-collage-section/after/`.
- Web, Webflow and Shopify projections are regenerated; their Sections CSS is
  source-identical at SHA-256
  `ae5ecab17ec09ace05305af95f38c5bb5d30eb07233ec3b5792c6a28a2cc8da6`.
- Shopify has a localized target-native section and all four touched theme files
  pass official validation artifact `collage-section-s19-batch78`, revision 2.
- The browser session and strict-port server were closed, ports are free and
  tracked `site/dist` remains untouched.

Contract remains `pilot`. S19 is prepared for explicit human review but is not
promoted to `stable`.
