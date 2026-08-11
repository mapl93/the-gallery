# Component Dossier: Product Slider

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/product-slider.contract.json`

## Recommendation

Keep Product Slider as a finite, user-controlled product-list composition over
the accepted Carousel primitive: a visible contextual heading, optional
canonical Icon Button controls, one native horizontally scrollable list, and
canonical Product Card children. Preserve ordinary list semantics because
several complete products can be visible at once; do not present each card as a
temporarily hidden APG slide or add a second keyboard model.

Use the Carousel track, item, control, finite-bound, logical navigation, direct-
scroll synchronization, forced-colors, RTL, and reduced-motion decisions rather
than maintaining a second physical `scrollLeft` implementation. Product Slider
adds only product-list anatomy and container-based card density. It does not own
recommendation algorithms, recently-viewed persistence, inventory, quick-add,
analytics, fetching, pagination, virtualization, or an autoplay/loop engine.

The repository candidate can be refined without an aesthetic decision because
the current two/three/four-card density and type hierarchy can be preserved while
their behavior becomes intrinsic and semantic. Human review must still approve
the visual density, card crop, heading/control balance, gap, and control surface
before any `stable` promotion.

## Purpose And Limits

- Presents a short, finite collection of related, complementary, recommended, or
  recently viewed products in a compact horizontal browsing surface.
- Keeps every supplied Product Card in normal DOM order and exposes native
  touch, wheel, trackpad, scrollbar, and keyboard scrolling.
- Provides previous/next controls as an optional non-drag path. Focus remains on
  the activated control while another item is reachable; when that control
  becomes natively disabled at a finite bound, focus moves to the named track
  instead of falling back to the document.
- Composes Product Card for product identity/navigation/Price/quick-add and
  Carousel plus Icon Button for scrolling and control behavior.
- Is not Product Gallery, a rotating hero, an infinite feed, a collection grid,
  search results, or a recommendation provider.
- v1 has no autoplay, loop, dots, drag physics, page-count property, lazy-loading
  algorithm, virtualization, or target-agnostic network client.
- Empty collections are not a valid rendered component. The owning target omits
  the section or keeps a loading placeholder outside the canonical Slider until
  it has one or more valid items.

## Current Gallery Baseline

- Registry `D6`, Product, review order `74`, dependency depth `2`, with direct
  Icon Button and Product Card dependencies. ADR 0104 additionally requires
  Product Slider to consume the accepted Carousel primitive.
- Contract `0.1.0`, `pilot`: seven anatomy entries, one variant, one size, three
  states, two behaviors, and three properties (`title`, `navigation`, `items`).
  It does not model finite bounds, track focus, logical exact-item navigation,
  direct-scroll synchronization, reduced motion, forced colors, RTL, empty/single
  collections, canonical Carousel composition, or localized control names.
- Canonical CSS owns a physical `x` mandatory grid with hardcoded `8px`/`16px`,
  duplicated scroll/scrollbar rules, and viewport media queries at `768px` and
  `1024px`. The track has no focus boundary, logical snap axis, overscroll
  containment, reduced-motion rule, forced-colors rule, or root container.
- ProductStudio uses the same registered renderer for Exhibit and Studio, and
  reuses its local Product Card render function. Its navigation uses
  `scrollBy(clientWidth * 0.75)` with physical `left`, always-smooth behavior, no
  disabled bounds, no direct-scroll synchronization, no `aria-controls`, and no
  localized property bindings. Four items produce no overflow at the XL four-card
  density.
- The MDX fallback has two Product Cards and icon-labelled Buttons, but no list,
  track name, exact-item state, disabled bounds, or canonical Carousel classes.
- Shopify has a dedicated `related-products` section and product-template
  composition, but the section reads `recommendations.products` before the
  recommendations object is populated, emits untranslated literals, uses Button
  classes that are not the canonical Icon Button contract, and has inert
  `data-slider-*` attributes with no controller.
- Baseline deterministic gzip is Product CSS `5,299 B / 5.2 KiB`, complete Web
  component CSS `65,408 B / 64 KiB`, and shared neutral runtime `10,492 B / 8
  KiB`. Product has approximately `25 B` family headroom and the complete bundle
  approximately `128 B`; shared runtime already has a recorded exception. This
  refinement must reuse Carousel rules and add `0 B` neutral runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | A carousel has a named region/group, native previous/next Buttons, labelled slides, optional picker controls, and no scripted Tab behavior. Autoplay adds stop/restart, focus, and hover duties. | Keep v1 user-controlled and controls native. Product Slider is a multi-card product list, so use APG interaction guidance without overriding useful list semantics with one-slide-at-a-time roles. |
| [Open UI Carousel research](https://open-ui.org/components/carousel.research/) | Surveyed systems disagree on autoplay, wrapping, item grouping, dots, effects, timing, and events; no interoperable Product Slider API emerges. | Do not expose engine options or convert layout density into a large neutral property surface. |
| [CSS Scroll Snap Level 1](https://www.w3.org/TR/css-scroll-snap-1/) | Snap positions are native scroll-container behavior and can serve touch, wheel, scrollbar, keyboard, and scripted scrolling. Item snap areas remain tied to actual layout. | Keep a native scroll viewport and navigate to real item elements rather than multiplying viewport offsets. |
| [CSS Overflow Level 3](https://www.w3.org/TR/css-overflow-3/) | Authored smooth scrolling is controlled by `scroll-behavior` and follows platform conventions; user agents may vary. | Reuse Carousel motion rules and switch authored motion off for reduced-motion preference. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Radix publishes composable low-level primitives but no Carousel/Product Slider primitive; its Scroll Area preserves native scroll behavior. | Absence is useful evidence: do not import a React engine/API into the target-agnostic contract. |
| [Shopify recommendations object](https://shopify.dev/docs/api/liquid/objects/recommendations) | `recommendations` is populated only through the Product Recommendations and Section Rendering APIs. | Shopify must fetch/re-render target-native recommendation data rather than pretending initial Liquid has products. |
| [Shopify related-products tutorial](https://shopify.dev/docs/storefronts/themes/product-merchandising/recommendations/related-products) | Related products load asynchronously from the locale-aware recommendations endpoint; an empty result can omit the section. | Implement the section as a target-local loader and then initialize bounded scrolling on canonical markup. |
| [Shopify Dawn reference theme](https://github.com/Shopify/dawn) | Dawn separates product recommendation loading, finite product data, card rendering, and slider enhancement. | Reuse concepts only: Gallery keeps its own classes, Product Card snippet, schema, fixture, and visual identity. |

Polaris is an administrative application system rather than a storefront product-
recommendation owner. Its absence of a portable storefront Product Slider API is
supporting evidence, not a source contract. The base therefore remains native
HTML/CSS with target-local state and data adapters.

## Owner Visual Reference

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Adjacent Product dossiers already verified that this is
the generic Studio/Button shell, not Product Slider artwork. It confirms the
stage/inspector model only and supplies no component-specific density, crop,
control, type, or spacing decision.

The repository render is therefore a candidate rather than approval. Human
review must approve two/three/four-card density, whether the next item should
peek, the Product Card crop and content density, heading scale, gap, navigation
surface/shadow, and alignment in all themes.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | contextual `section` named by its visible heading | Product Slider/target | Also consumes the canonical Carousel root class; no duplicate `aria-label` when `aria-labelledby` is available. |
| Header | yes | ordinary grouping container | Product Slider | Holds heading and optional controls; wraps intrinsically. |
| Title | yes | contextual heading | Target | Native rank is chosen by page context; Gallery classes own presentation. |
| Navigation | no | named `group` | Product Slider/target | Omitted when controls are not requested or the collection has no overflow. |
| Previous control | conditional | canonical Icon Button | Carousel/Icon Button/target | Localized action name, `aria-controls`, native disabled at the first bound. |
| Next control | conditional | canonical Icon Button | Carousel/Icon Button/target | Localized action name, `aria-controls`, native disabled at the last bound. |
| Track | yes | focusable native `ul` scroll viewport | Carousel/Product Slider | Named from the visible heading; preserves list semantics and all native scrolling paths. |
| Item | one or more | native `li` snap item | Carousel/Product Slider | Position is target collection data; no extra tab stop. |
| Product Card | exactly one per item | canonical Product Card `article` | Product Card | Product Card owns link, media, Price, badge, and quick-add semantics. |

The root, track, item, and nav buttons should layer the public Carousel/Icon
Button classes with Product Slider classes. Product Slider must not copy
Carousel focus, scrollbar, snap, motion, forced-colors, RTL, button, or finite-
navigation presentation.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One finite horizontal product list. Related/complementary/recently-viewed is data purpose, not a visual variant. |
| Size | One intrinsic density model: two cards initially, three at a 48rem component container, four at 64rem. No viewport media query. |
| First bound | Previous disabled; next enabled only when overflow remains. |
| Middle | Both controls enabled; nearest logical-start item is current target state. |
| Last bound | Next disabled; previous enabled. |
| Single/no overflow | Both controls disabled or navigation omitted; track/list remains valid. |
| Empty | Invalid rendered component; target omits it. |
| Direct scroll | Touch, wheel, trackpad, scrollbar, and keyboard scroll synchronize derived bounds. |
| Focus | Native track has a visible focus boundary; Product Card controls keep normal Tab order. |
| RTL | Exact items are targeted; logical start/end and canonical icon mirroring replace physical offsets. |
| Reduced motion | Authored smooth navigation becomes instant; native user scrolling remains native. |
| Forced colors | Carousel/Icon Button focus, current boundaries, and disabled states use system colors. |
| Long/localized | Heading and Product Card text wrap; header controls do not overlap; item/list geometry stays contained. |
| Missing image/price/badge | Product Card owns its valid omission/fallback rules; Slider does not branch on card internals. |

Unsupported combinations are autoplay without a pause lifecycle, loop with
disabled finite bounds, a transform-only track, drag-only navigation, an empty
list, duplicated product-card markup, physical `scrollLeft` paging, viewport-
coupled density, or arrows that remain enabled when no adjacent item exists.

## Public API And State Ownership

- `title` — required visible collection heading and source of the root/track
  accessible name. The target chooses native heading rank.
- `previousLabel` — required localized accessible action name whenever navigation
  is present.
- `nextLabel` — required localized accessible action name whenever navigation is
  present.
- `navigation` — optional Icon Button composition. It is a capability/slot, not
  an instruction to render active controls when the collection does not overflow.
- `items` — required consumer-owned collection of canonical Product Cards.
- Current item index, first/middle/last bounds, item count, overflow, and direct-
  scroll position are derived target state, not author configuration.
- Web/Shopify targets may emit a current-item/change event for analytics or
  coordination, but the neutral contract does not prescribe a framework event
  name or analytics payload.
- React/Angular adapters should support controlled `currentId` plus
  `onCurrentChange` and uncontrolled `defaultCurrentId` only if a consumer needs
  external coordination. Both modes serialize to the same scroll position and
  disabled bounds; they do not become parallel DOM sources of truth.
- Recommendation source, intent, loading/error/empty copy, fetch cancellation,
  recently-viewed persistence, quick-add results, inventory, and analytics stay
  with the target/application.

## Token And Value Audit

- Public Product Slider tokens remain semantic: text primary, heading family,
  heading size/line-height, and layout element gap.
- Carousel and Icon Button dependencies own focus border, surface, shadow,
  disabled opacity, touch target, transition, easing, forced colors, and motion.
  Product Slider must not re-declare those dependency tokens as its own API.
- Product Slider may derive private header/card gaps and exact density arithmetic
  from `--space-layout-element-gap`; these remain private composition values.
- Current hardcoded `8px` nav gap, `16px` track gap, and viewport breakpoints must
  be removed. The preserved 48rem/64rem container thresholds and two/three/four
  counts are private layout geometry pending visual approval, not public tokens.
- Chevron SVG geometry belongs to canonical Icon Button/target icon rendering.
  Product Slider exposes only localized previous/next intent.
- Consumer product images, copy, URLs, prices, badge text, and recommendation data
  are not component assets or token values.

## Visual And Content Audit

- Preserve the current heading family/scale but add its paired line-height,
  zero native margin, and overflow wrapping.
- Keep controls at the header inline end, allow header wrapping, and prevent long
  headings from colliding with the control group.
- Keep Product Cards fluid inside exact grid tracks with `min-inline-size: 0`;
  the Slider must not override Product Card typography, media ratio, border,
  focus, badge, Price, or quick-add presentation.
- Use six varied fixture cards so four-up XL still proves overflow and bounds.
  Include short, long, localized, mixed-script, and absent optional card content
  without presenting fixture copy as API defaults.
- No Slider-specific image crop or loading rule is valid; Product Card and the
  data target own those decisions.
- Header, list, and controls must remain stable in light/dark themes and at
  390/768/1280/1600 preview widths.

## Accessibility And Interaction

- Use one visible heading to name the section and track. Do not repeat the word
  “carousel” in an additional accessible label or add `aria-roledescription`
  where a product-list announcement is clearer.
- Use native `ul`/`li` semantics because multiple complete cards remain visible
  and all items remain in DOM order. Product Card provides the descriptive
  product link; items do not need duplicated position labels.
- Make the native overflow track focusable and retain its visible Carousel focus
  boundary. Do not intercept ArrowLeft/ArrowRight at the section root.
- Previous/next are native Buttons with localized accessible names,
  `aria-controls`, and actual `disabled` bounds. Activation targets the adjacent
  real item. If the activated control becomes disabled at the resulting bound,
  focus moves to the named track; otherwise it remains on the Button.
- Direct scrolling and explicit navigation derive the same nearest logical-start
  item and finite bounds. No live region is required for v1 because content is
  neither inserted nor hidden during navigation; a future status must be stable,
  localized, and non-duplicative.
- Touch/trackpad/native scroll remains primary progressive behavior. Controls are
  supplemental and must not be the only access path.
- Canonical Carousel and Icon Button own reduced-motion, RTL icon mirroring,
  forced-colors, focus-visible, disabled, and touch-target treatment.

## Responsive And Performance

- Root establishes a named inline-size container; density responds to the
  component rather than the page viewport.
- Preserve two/three/four complete-card density at the current 48rem and 64rem
  thresholds. Test narrower embedded containers at desktop viewport width.
- DOM and layout work scale linearly with supplied items. v1 recommendation
  collections should remain short; large-data pagination/virtualization belongs
  to the target.
- Neutral runtime budget is `0 B`. Carousel CSS and target-local React/Shopify
  controllers own exact-item navigation. Do not add network, observers, or
  product state to `components/js/theme.js`.
- The six-item Studio evidence controller may perform one bounded geometry read
  per native scroll event. Shopify coalesces those reads through one animation
  frame, uses one ResizeObserver for its asynchronously loaded section, and
  releases listeners, observer, and pending frame when disconnected.
- No canonical asset or network request is added. Shopify's recommendation fetch
  is target data behavior and should issue once per mounted product section.
- CSS must finish at or below Product `5.2 KiB` and complete Web `64 KiB`; reuse
  and deletion, not budget reset, pays for the component-specific container rules.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Layer Carousel/Product Slider classes on a named section, focusable native list, snap items, canonical Icon Buttons, and Product Cards; consumer target owns the finite controller. | Implemented, generated, validated, and browser-tested; the neutral shared runtime remains unchanged. |
| Shopify | Dedicated related-products section fetches the recommendations section through the locale-aware endpoint, renders canonical Product Card snippets, localizes schema/control text, omits empty results, and initializes finite target JS. | Implemented and adapter-validated as a ready `section-adapter`; live-store and owner visual review remain separate gates. |
| React / Angular | Finite item array/children, canonical Product Card nodes, optional controls, target-local refs/index synchronization, and optional controlled/uncontrolled current id. | The shared React Studio proof uses exact logical item navigation and synchronized bounds; packaged adapter naming remains planned. |
| Figma | Product Slider frame with header, optional control group, two/three/four-card container examples, long/localized text, and first/middle/last/no-overflow states. | Generic Studio trace only; no component-specific owner artwork. |
| SwiftUI / Compose | Native horizontal lazy/list container with product-card equivalents, semantic heading, accessibility scroll actions, finite bounds, and target-native state. | Planned; native collection/data/persistence APIs remain target-owned. |

## Exhibit And Studio Parity

`ProductStudio` remains the one registered renderer for Exhibit and Studio. One
fixture, one Product Slider render branch, canonical Carousel/Icon Button/Product
Card classes, and the same initial first-bound state must serve both surfaces.
Studio may edit title/control labels and toggle optional navigation/items through
contract-backed controls, but it must not call those fixture values component
defaults.

Site-only classes may bound the stage and supply editorial fixture media; they
must not implement Slider spacing, density, scrolling, focus, Card visuals, or
control states. The MDX Preview remains fallback/audit evidence and must mirror
the same canonical anatomy.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Product Slider duplicates Carousel scroll/snap/motion behavior but does not declare the dependency. | high | Compose public Carousel root/track/item/control classes and add the dependency. | accepted ADR/implementation |
| Fractional physical `scrollBy` fails exact items, gaps, RTL, and variable widths. | high | Target adjacent item elements with logical `scrollIntoView`. | implementation |
| Controls never expose finite bounds and direct scrolling is unsynchronized. | high | Derive nearest item and first/last disabled state after every navigation path. | implementation |
| Track uses viewport breakpoints inside a composable component. | high | Preserve density through named container queries. | accepted responsive principle |
| Track is an unnamed `div` and item wrappers add no collection semantics. | high | Use a focusable named native list with list items. | implementation/accessibility |
| Four-item fixture cannot prove XL overflow or next/last behavior. | medium | Use six varied canonical Product Card fixtures. | documentation/testing |
| Contract omits localized control intent. | high | Add semantic previous/next label properties and Studio bindings. | implementation/contract |
| Shopify reads unpopulated recommendations and ships inert controls. | high | Add Section Rendering/Product Recommendations loading and bounded target JS. | Shopify target |
| Figma reference is not component-specific. | human review | Preserve repository visual candidate and require explicit owner approval. | owner |

## Evidence And Validation

The baseline and refined 390/768/1280/1600 captures, middle and last bounds,
keyboard focus, wheel scrolling, RTL, localized long content, dark theme,
forced colors, reduced motion, and 2/3/4-card container probes live under
`output/playwright/refinement-batch-33/`. Exhibit and Studio render identical
`6,709`-character initial outerHTML with one native list, six items, six canonical
Product Cards, and six product links.

At a middle item, focus remains on the enabled next Button and both directions
are available. At the final bound, the track reaches its exact maximum, next is
natively disabled, and focus moves to the named `ul` instead of the document.
Wheel and keyboard scrolling update the same derived bounds. Reduced motion
computes `scroll-behavior: auto`; RTL uses negative native scroll coordinates
without physical-offset assumptions. Long Spanish heading/control text wraps
without overlap. Measured content containers show two cards at `480px`, three at
`802px`, and four at `1052px`.

Contract/registry/Studio/docs validation, neutral Web and Shopify adapter
builds/validation, static preview and Exhibit/Studio parity audits,
refinement/certification matrices, a temporary Vite build outside `site/dist`,
browser semantic/interaction probes, deterministic gzip, Liquid validation,
syntax/diff checks, generated-copy identity, and explicit `site/dist`
cleanliness are required final gates.

## Risks And Open Questions

1. Human review must approve card count/peek, item gap, heading/control hierarchy,
   nav surface/shadow, Product Card density/crop, and overall visual rhythm.
2. A future Product Slider may need autoplay, loop, item grouping, dots, lazy
   loading, virtualization, or a carousel engine. Those are product/architecture
   decisions and are not inferred for v1.
3. Shopify recommendation intent, complementary-product merchandising, recently-
   viewed persistence, loading/error UI, analytics, fetch cancellation, and
   section-editor lifecycle remain target/application concerns beyond the base
   Product Slider contract.
4. Framework targets need an explicit demand before standardizing
   controlled/uncontrolled current-id names or events across packages.
5. No component-specific owner artwork exists. Automated/browser evidence cannot
   approve the candidate or promote `pilot` to `stable`.

## Readiness Decision

Research, source refinement, target composition, and automated/browser evidence
are complete. Product Slider is ready for human review of density, crop,
heading/control balance, spacing, control surface, and the inherited Product Card
candidate. The contract stays `pilot`; no component is promoted to `stable`
without explicit human approval.
