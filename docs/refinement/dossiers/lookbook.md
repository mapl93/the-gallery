# Component Dossier: Lookbook

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify Section translation

Contract: `components/contracts/lookbook.contract.json`

## Recommendation

Keep Lookbook as a passive, finite, deliberately ordered editorial sequence of
target-owned media figures. Its optional visible title provides collection
context; its required `items` slot owns complete media/caption compositions and
item-level `wide`/`tall` placement. Use a native ordered list with native
`figure`/`figcaption` content in the canonical fixture. A titled composition is
a native `section` named by its heading; an untitled composition is a generic
`div`; missing required items omits the root.

Make essential captions persistently visible. Remove passive `tabIndex`,
hover-only disclosure, image zoom and the continuously pulsing decorative
hotspot. Lookbook itself must not invent activation. A target may compose a
native link/button only when it supplies an accessible name and a real result.
A product destination can be a normal link; a disclosure must compose the
canonical Popover or another complete target-native overlay rather than
recreating focus, dismissal and controlled/uncontrolled behavior in S6.

Preserve current `wide` and `tall` item modifiers because ADR 0082 accepts them
as item-level layout anatomy. Use one named component container, sparse source-
ordered Grid placement and private implicit row geometry. The initial one/two/
four-column thresholds, row height, spans and edge-to-edge gap are visual
candidates, not public configuration or approved identity.

Add a localized Shopify Section Adapter whose reorderable image blocks map the
accepted target-owned slot. Shopify may provide an optional native product-link
hotspot with block-owned coordinates because that target can supply a concrete
destination and product object. Those settings remain Shopify adapter facts and
do not expand the neutral API.

## Purpose And Limits

- Presents a finite, curated sequence of related media where asymmetric scale
  creates editorial hierarchy and order contributes to the narrative.
- `wide` emphasizes horizontal context; `tall` emphasizes portrait content;
  default cells maintain the base rhythm.
- Lookbook owns optional collection heading, ordered list layout, sparse Grid
  placement, span modifiers, media containment, persistent caption treatment,
  responsive composition and target-interactive focus geometry.
- The target owns media source, intrinsic dimensions, responsive candidates,
  loading, alternative/decorative intent, caption text, item order, layout
  modifier assignment, destination/action, hotspot coordinates, commerce data,
  analytics, localization and editor lifecycle.
- It is not Gallery Grid, Masonry Gallery, Collage, Product Gallery, Carousel,
  Lightbox, selectable grid, product query, image loader, virtualizer, infinite
  feed, drag surface or Popover implementation.
- It owns no current item, selection, roving tabindex, Arrow-key model, modal or
  disclosure lifecycle, history, live announcement, observer, timer or runtime.

## Current Lookbook Baseline

- Registry identity `S6`, category `sections`, selector `.lookbook`, no declared
  dependencies, dependency depth `0`, and review order `166`.
- Registry describes an “asymmetric image grid with hover captions and
  shoppable hotspots,” but ADR 0082 explicitly leaves item activation and
  hotspot result ownership unresolved.
- Contract `0.2.0`, `pilot`: nine anatomy parts, one generic variant, one generic
  size, four states, two behaviors, two properties, fifteen public tokens, Web
  implemented and Shopify planned.
- Every shared-renderer root is an unnamed `section`. Empty title removes only
  the header; it leaves an unnamed section. Missing required items leaves the
  root instead of omitting invalid composition.
- Renderer collection/cells are generic `div` elements. All four passive cells
  receive `tabIndex=0` despite having no role, name, destination or event.
- The first passive cell also contains an `aria-hidden` empty `span` hotspot.
  CSS expands it from hardcoded `28px` to the shared `44px` minimum and runs an
  infinite two-second pulse despite there being no control or result.
- Every essential caption is visually hidden at rest (`opacity: 0`) and appears
  only on cell hover/focus-within or non-hover input. Programmatic focus on the
  passive cell scales its image to `1.04`, reveals the caption and draws a focus
  outline without offering activation.
- Canonical MDX is semantically stronger: named section plus `figure`/
  `figcaption`, including one `wide`, one `tall` and one default cell. It still
  disagrees with renderer DOM and has no native sequence/list grouping.
- Canonical CSS uses hardcoded `32px`, `4px`, `3/4`, `16px`, `28px`, physical
  dimensions/insets, rgba overlays and keyframes. H2 and caption typography are
  incomplete. A viewport query, anonymous container query and Studio-specific
  grid rules compete over columns and spans.
- Studio forces four columns, then two below its own stage threshold, sets a
  fixed hotspot position, and collapses only the wide span at its narrow
  threshold. Site code materially owns S6 layout and target hotspot placement.
- Baseline Exhibit/Studio root DOM is exactly `1,289` characters, FNV-1a
  `997cc055`, at every paired viewport because both modes share the same flawed
  branch.
- Mobile is `343x633px` with two `169.5px` columns and four `226px` cells.
  Tablet is `721x932.27px` with four `177.25px` tracks; the wide cell becomes
  `358.5x478px`, much taller than its `236.33px` peers because every cell keeps
  the same `3 / 4` ratio.
- Desktop Exhibit is `420x735.66px` with two `208px` tracks; Studio is
  `532x1,608.8px`, where the wide cell becomes `532x709.33px` before later
  cells. XL Exhibit is `584x1,754.74px`; Studio is `752x967.59px` with four
  columns. The same content density therefore changes materially by host.
- Direct Studio roots at `200/260/520/900/1120px` all force four columns. At
  `200px`, tracks shrink to `47px`; at `260px`, to `62px`. This proves the
  current behavior responds to host/viewport rules rather than usable component
  space.
- Three source images are `1800x2700` portraits and one is `1800x1202`
  landscape. All render through one `3 / 4` crop, so item modifiers do not map
  to a stable editorial geometry.
- All 183 Studio definitions reference the same Figma file/frame/inspector
  (`k3axoTaF87g17fBRgJ0PMY`, `943:7`, `1020:480`). Those generic shell nodes do
  not approve S6 density, spans, crop, captions, hotspots, motion or hierarchy.
- Shopify has copied Section CSS but no dedicated Liquid/schema/data mapping.
  Adapter maturity is `css-ready`, missing Liquid/data, and `ready: false`.
- Eight paired baseline captures plus hover evidence live under
  `output/playwright/refinement-batch-65/before/`; all measured roots contain
  horizontally even when individual tracks become unusably narrow.
- Deterministic gzip baseline is Sections `6,855 B`, Neutral Web component CSS
  `67,874 B`, and shared runtime `10,589 B`. Sections has a `6,861 B` ceiling;
  the batch must simplify source and add `0 B` neutral runtime.

## External Evidence

| Source | Relevant evidence | Lookbook implication |
| --- | --- | --- |
| [HTML grouping content](https://html.spec.whatwg.org/dev/grouping-content.html) | `ol` expresses intentional order; `figure` groups self-contained content and `figcaption` supplies its caption; a thematic section normally has identifying heading content. | Use ordered native list semantics, complete figure/caption groups and conditional named-section semantics. |
| [WAI groups of images](https://www.w3.org/WAI/tutorials/images/groups/) | A collection of related artwork needs context-appropriate alternatives for each informative image; native figure/caption structures can group individual works. | Keep per-image meaning and decorative classification target-owned and make captions persistently available. |
| [CSS Grid 2](https://www.w3.org/TR/css-grid/) | Visual placement cannot substitute for logical source order; sparse row auto-placement moves forward while `dense` may backfill out of order. | Keep DOM/editor order authoritative, use sparse placement and avoid `order`, dense packing or runtime repositioning. |
| [Open UI Popover explainer](https://open-ui.org/components/popover.research.explainer/) | A disclosure requires an explicit invoker and popover lifecycle rather than a decorative point. | Do not make S6 own an anonymous hotspot or disclosure; targets compose a complete native/canonical interaction. |
| [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Ratio is a generic framework composition primitive accepting any custom value. | Keep S6 row/span geometry private instead of adding React ratio props to the neutral API. |
| [Radix Popover](https://www.radix-ui.com/primitives/docs/components/popover) | A popover coordinates trigger, controlled/uncontrolled state, focus, collision, dismissal and keyboard behavior. | A disclosure hotspot must compose Popover/target overlay behavior; S6 cannot reproduce only its circle and claim completeness. |
| [Polaris Grid](https://polaris-react.shopify.com/components/layout-and-structure/grid) | Polaris exposes framework-specific responsive columns/gaps/spans through a layout primitive rather than child meaning. | S6 owns a private opinionated layout while target cell content retains its semantics; do not copy Polaris breakpoint props. |
| [Shopify sections and blocks](https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks) | Reorderable blocks should group complete records, preserve logical flow and avoid sequence-dependent layout magic. | Map each complete image/caption/layout/product record to one block and use explicit block layout settings. |
| [Shopify settings](https://shopify.dev/docs/storefronts/themes/architecture/settings) | Section/block schema supports image, product and other target-native settings with dynamic sources. | Optional product destination and coordinates are Shopify facts, not neutral Lookbook properties. |

No WAI-ARIA APG composite pattern applies. Lookbook has no cell selection,
two-dimensional keyboard navigation, roving tabindex or single composite focus
stop. A target product hotspot is an ordinary link; a disclosure must use its
own Button/Popover semantics and lifecycle.

## Mature-System And Owner-Reference Comparison

- HTML/WAI/CSS provide the stable core: ordered source, native collection and
  figure semantics, contextual alternatives, persistent captions and no fake
  composite focus model.
- Open UI and Radix show that a popover is a full invoker/open/focus/dismissal
  system. A pulsing `span` is neither a shoppable link nor a disclosure.
- Radix Aspect Ratio and Polaris Grid expose target/framework layout controls;
  neither establishes a cross-target Lookbook record, product lifecycle or
  editorial span API.
- Shopify blocks are a correct merchant projection of complete target-owned
  cells. Resource objects, editor settings, product destinations and percentage
  coordinates remain target data.
- The registered Figma nodes are generic Studio shell references. No S6-
  specific owner reference establishes final row height, crop, spans, gap,
  caption surface, hotspot styling or density.
- The repository candidate can become technically truthful and visually
  reviewable, but it cannot claim owner-approved aesthetics or a universal
  hotspot product model.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | titled `section` or untitled `div` | Lookbook / target | Contains one complete finite editorial sequence. |
| Header | no | generic grouping | Lookbook | Exists only with non-empty title. |
| Title | no | contextual native heading | Target | Fixture uses `h2`; id names titled root. |
| Items | yes | native `ol` | Lookbook / target | Preserves target/editor sequence and owns layout only. |
| Cell | repeated | native `li` | Lookbook / target | Passive layout wrapper with optional `wide`/`tall` modifier. |
| Figure | recommended per captioned media | native `figure` | Target | Groups one target media/caption composition. |
| Media | required per complete fixture item | native target media | Target | Source, intrinsic size, loading and alternative/decorative intent remain target-owned. |
| Caption | no | native `figcaption` when paired with figure | Target | Persistent; never requires hover/focus to become available. |
| Hotspot | no | native `a` or `button` only with a real result | Target / child | Owns name, activation, destination/disclosure, position and lifecycle. |

The required `items` slot remains one target-owned composition boundary under
ADR 0082. Adding a neutral media/product record, hotspot coordinates, caption
field, URL, focal point or loading policy requires a separate architecture
decision.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One editorial sequence; item `wide`/`tall` modifiers are anatomy, not parent variants. |
| Size | One intrinsic size; columns, thresholds, row height, spans and gap are private. |
| Titled | Native `section` named by visible heading. |
| Untitled | Generic `div`; no empty heading or unnamed thematic section. |
| Complete | At least one complete target-owned media item. |
| Missing items | Invalid composition; omit root. |
| Passive cell | No tabindex, cursor, hover zoom, hidden caption, event or implied action. |
| Product hotspot | Target native link owns name, destination, focus and analytics. |
| Disclosure hotspot | Target/canonical Button + Popover own open state, focus, dismissal, collision and result. |
| Theme | Semantic heading/caption/focus/surface tokens; media owns pixels. |
| Forced colors | Caption remains readable; native target control remains visible and focusable. |
| Reduced motion | S6 has no authored motion; target interaction follows its owning contract. |
| RTL | Logical placement/insets; DOM order is unchanged and Grid follows writing direction. |
| Responsive | Named S6 component container; no viewport or Studio column/span authority. |

## Public API And State Ownership

- `title` — optional non-empty visible contextual heading. Target owns native
  heading rank; empty content omits header and selects a generic root.
- `items` — required ordered target-owned slot containing one or more complete
  native list-item compositions, including item layout modifier and any media,
  caption or legitimate native hotspot.
- S6 exposes no parent `variant`, columns, mobile columns, threshold, row size,
  gap, crop, ratio, fit, radius, image source, alt shortcut, caption string,
  record array, product, href, hotspot coordinates, disclosure, selection,
  loading, heading level, animation, editor object or event.
- Neutral S6 has no controlled/uncontrolled store. A product link is stateless;
  any disclosure delegates state to canonical Popover or the target platform.

## Token And Value Audit

- Legitimate public references: section/container rhythm; complete H2 type;
  caption family/weight/size/line-height; primary/inverse text; overlay opacity;
  focus color; target hotspot surface, full radius, shadow and touch target.
- Motion/easing/transition tokens become unnecessary when captions are
  persistent and the decorative pulse/image zoom are removed.
- Replace physical width/height/insets/margins with logical properties. List
  reset, grid fractions, spans, structural zeroes and item coordinates remain
  layout mechanics.
- Private visual candidates: `0.25rem` edge gap, one/two/four tracks,
  `20rem`/`40rem` thresholds and `clamp(9rem, 28cqi, 18rem)` implicit rows.
  Do not promote them to public tokens/properties before owner review.
- Sections begins only `6 B` below its binding gzip ceiling. Removing hover,
  transitions and keyframes must fund the semantic/container improvements.

## Visual And Content Audit

- One uniform `3 / 4` ratio makes a two-column-wide cell twice as wide and
  therefore twice as tall, producing `709px` to `779px` feature items in host
  widths where peers are roughly half the width. Item modifiers do not create a
  coherent editorial system.
- Private implicit rows let `wide` span two columns without becoming twice as
  tall and let `tall` span two rows deliberately. Sparse placement may leave
  intentional holes rather than changing reading order.
- Persistent bottom captions avoid hover-only essential content. Their scrim,
  padding, type and maximum line count need contrast/extreme-content evidence.
- One, two, four, six and many cells; default/wide/tall mixtures; short/long/
  empty captions; informative/decorative images; localized RTL; unbroken text;
  extreme ratios; missing media; and effective 200% layout require evidence.
- Target product hotspots need touch size, focus, native activation, localized
  accessible name and coordinates that remain within each media cell. S6 does
  not create a hover-only commerce disclosure.

## Accessibility And Interaction

- Titled roots use `aria-labelledby`; untitled roots are generic.
- Use native `ol`/`li` because current source establishes deliberate order. Use
  native `figure`/`figcaption` for captioned fixture media.
- Informative images require contextual alternatives; decorative/redundant
  images use empty alternatives. Captions do not replace missing functional alt
  text for interactive imagery.
- Passive cells are not focusable, clickable, selected, hover-zoomed or
  announced as actions. Captions remain visually present.
- A target link/button owns accessible name, focus, Enter/Space behavior,
  destination/result, disabled/busy lifecycle and analytics. A disclosure also
  owns `aria-expanded`/relationship, open state, focus and dismissal through
  Popover/target primitives.
- Preserve DOM order. Do not use `dense`, CSS `order`, absolute layout packing,
  runtime measurement or position as the only semantic cue.
- No APG Grid, roving tabindex, Arrow keys, drag, focus trap, restoration, live
  region, observer, timer or announcement is warranted by passive S6.

## Responsive And Performance

- Name the root `lookbook` and make its inline size the sole responsive
  authority.
- Candidate: one column below `20rem`, two above `20rem`, four above `40rem`;
  sparse row auto-flow with private clamped implicit rows; `wide` spans two
  columns when at least two exist; `tall` spans two rows.
- Test paired Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960`, plus direct `200/260/520/900/1120px` roots, item counts,
  modifier mixtures, title/caption/media omission, native target hotspot,
  localized RTL/unbroken content, themes, forced colors and effective 200%.
- Neutral runtime budget is `0 B`: no listener, observer, request, timer,
  formatter, layout read, custom element or asset.
- Shopify responsive image candidates/loading and product routing remain target-
  owned. DOM/CSS cost grows linearly with blocks; target schema owns its finite
  block limit.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Conditional named root, ordered native list/cells, target figure/media/caption and optional native target action. | Implemented, generated, validated and browser-evidenced. |
| Shopify | Addable section with optional title and reorderable complete media blocks; optional product link and coordinates are target facts. | Implemented, localized and `ready: true` across Liquid/schema/data/editor layers. |
| Webflow | Canonical target-agnostic CSS plus target-authored semantic collection and content. | Regenerated and source-identical to canonical Sections CSS. |
| React / Angular | Optional title plus required children/list slot; no local store; disclosure composes canonical Popover. | Planned thin composition. |
| Figma | Default/wide/tall cells, counts, captions, themes and target hotspot specimens. | Generic shell traceability only; no S6-specific visual approval. |
| SwiftUI / Compose | Native ordered adaptive/lazy collection preserving logical order and target media semantics. | Conceptual; target owns routing, loading and any overlay behavior. |

## Exhibit And Studio Parity

- Exhibit and Studio share `SectionsStudio`, one fixture, contract, Studio
  definition, validity rule and render branch.
- The branch enforces required items, derives one stable title id, selects
  titled/untitled root semantics and emits native ordered-list/figure content.
- Both modes normalize to the exact same fixture, layout modifiers, captions
  and subtree. Studio exposes semantic content/tokens without selecting layout
  geometry or target hotspot coordinates.
- Site-owned Lookbook columns, hotspot coordinates and narrow span overrides
  are removed. Canonical CSS is the sole layout implementation.
- MDX mirrors the named ordered list/figure composition and documents native
  product links versus complete Popover disclosure ownership.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Four passive cells are focusable without names/actions. | high | Remove tabindex; only real native descendants receive focus. | implementation |
| Empty `span` hotspot pulses indefinitely with no result. | high | Remove from passive fixture and pulse CSS; target native control only. | accepted ADR 0082 / implementation |
| Captions are hidden until hover/focus. | high | Make essential captions persistent; no pointer-only disclosure. | accessibility / implementation |
| Optional title never names root; untitled remains `section`. | high | Named titled `section`; untitled generic `div`. | accepted pattern / implementation |
| Missing required items leaves empty root. | high | Omit invalid composition. | accepted contract / implementation |
| Renderer generic DOM and MDX figures disagree. | high | Native ordered list with figure/caption fixture in both. | implementation |
| `wide` retains base ratio and becomes excessively tall; `tall` has unstable effect. | medium | Private implicit rows plus explicit spans. | visual candidate / owner review |
| Viewport, anonymous container and Studio rules compete. | high | One named component container; remove host rules. | implementation |
| Hardcoded physical values and incomplete type. | medium | Existing semantic tokens, logical geometry and documented private candidates. | implementation |
| Link versus Popover versus Lightbox remains open. | architecture | Neutral target-owned action; concrete target may choose complete native profile. | owner / target |
| Shopify has no target-native adapter. | high | Localized image-block section with optional native product-link profile. | implementation |
| Figma reference is generic. | human review | Browser candidate first; component-specific Figma after approval. | owner |

## Evidence And Validation

Baseline evidence under `output/playwright/refinement-batch-65/before/` covers:

- exact Exhibit/Studio DOM equality (`1,289`, `997cc055`);
- unnamed `SECTION`, generic collection/cells, four passive tab stops;
- hidden captions, hover/focus `scale(1.04)`, empty pulsing hotspot;
- Mobile/Tablet/Desktop/XL geometry and host-driven divergence;
- direct `200/260/520/900/1120px` roots with four-column squeezing;
- source image dimensions, Shopify missing layers and generic Figma refs;
- Sections/Web/runtime gzip `6,855/67,874/10,589 B`.

Final evidence under `output/playwright/refinement-batch-65/after/` contains 26
captures: eight paired viewports plus direct roots, one/two/seven items,
untitled/invalid/empty-caption compositions, native hotspot focus, light/dark,
forced colors, reduced motion, RTL and unbroken effective-zoom content.

- Exhibit and Studio normalize to the same `2,156`-character subtree and FNV-1a
  `1d32498f` at all paired viewports. The only raw difference is the per-mount
  React title id; every relationship is valid.
- Every default root is a named `SECTION` with native `OL`/`LI`, six complete
  `figure`/`figcaption` pairs, persistent caption opacity `1`, contextual media
  alternatives, no media transform and zero focusable descendants.
- Mobile uses two tracks at `358px`; Tablet uses four at `736px`; Desktop uses
  two at Exhibit `420px` and Studio `532px`; XL uses two at Exhibit `584px` and
  four at Studio `752px`. All paired roots contain horizontally.
- Direct `200/260/520/900/1120px` roots use one/one/two/four/four tracks. An
  initial `200px` header overflow exposed during evidence was fixed with the
  existing bounded-padding pattern; the final root has equal `200px`
  client/scroll width.
- One, two and seven-item fixtures preserve source order and contain. Empty
  caption omits only `figcaption`; titleless output is an unlabelled generic
  `DIV`; disabling required items produces root count `0`.
- The synthetic target product link is the only focus stop, measures `44x44px`,
  matches `:focus-visible`, resolves a `2px` solid outline with `2px` offset,
  has the name “View mineral study product,” and Enter reaches
  `#lookbook-product`.
- Title contrast is `17.93:1` light and `17.18:1` dark. The adaptive semantic
  caption pair remains at least `4.69:1` over the worst light image and `6.06:1`
  over the worst dark image. Forced colors resolves system Canvas text/surface
  and a bordered, shadowless hotspot.
- S6 has no animation, transition or authored motion. Reduced motion reports
  only the global `0.00001s` safety clamp. RTL and unbroken `200px` content have
  equal client/scroll widths and retain source order.
- The isolated final browser console reports zero errors and zero warnings.
- Final deterministic gzip is Sections `6,814 B`, generated Web component CSS
  `66,941 B`, and shared runtime `10,492 B`. S6 adds no runtime; adapter rebuild
  also synchronizes accumulated source changes.
- Shopify reports `implemented`, `ready: true`, one section setting, eight block
  settings, a preset, no dead/undeclared settings and no section JavaScript.
  Official Liquid/runtime/schema locale validation passes at revision 2 for
  artifact `lookbook-s6-batch65`.
- Canonical, Webflow and Shopify Sections CSS are SHA-256-identical
  (`fd468c549ea9c9e30c47b97a1fc7fbc4f76fbf33d4547e6d24f62d08766047f1`).

## Risks And Open Questions

- Human review must approve the private one/two/four-column thresholds, clamped
  row height, wide/tall spans, edge gap, caption surface/type/padding and final
  editorial hierarchy.
- Owner/target review must confirm whether product navigation, Popover
  disclosure, Lightbox activation or a mixture are supported profiles. This
  batch cannot make one universal hotspot behavior from the current open source.
- Shopify can safely implement an optional product-link profile because it owns
  a concrete product object and URL. That does not authorize neutral product,
  URL or coordinate properties.
- If captions may be omitted, informative alt still carries image meaning. If a
  caption is essential metadata, targets must keep it present and localized.
- Sparse placement may leave visual holes. Dense packing is intentionally
  rejected because it can alter visual reading order.
- Heading rank, image alternative and ordered-list appropriateness depend on
  document/content context. Targets must not infer them from visual size.
- Sections is `6,814 B` against its `6,861 B` ceiling, leaving `47 B` headroom.
  The ceiling was not raised.
- The adaptive caption scrim intentionally follows the semantic primary/inverse
  pair. Human review must approve its dark-mode light-scrim appearance or
  request a separate stable “on dark media” semantic token decision; this batch
  does not introduce a new token role by assumption.
- Contract remains `pilot`; automated evidence may reach
  `human-review-ready`, never `stable`, without explicit owner approval.

## Readiness Decision

`ready for human review`: semantic source, passive/target-interactive boundary,
responsive ownership, Web/Shopify translation, parity, browser evidence,
performance and documentation are reconciled. Human review must approve the
visual candidates, API, caption treatment and target activation profiles before
stability. Contract remains `pilot`; no `stable` promotion was made.
