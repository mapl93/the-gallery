# Product Slider Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-14

## Outcome

Product Slider is now a finite native product-list composition over canonical
Carousel, Icon Button, and Product Card. It preserves list semantics, exact
logical item navigation, native direct scrolling, synchronized finite bounds,
container-driven density, RTL and reduced-motion behavior, and one shared
Exhibit/Studio implementation. Shopify now loads and renders locale-aware
related-product recommendations through a target-owned section controller.

The candidate is ready for human review of density, crop, gap, heading/control
balance, navigation surface, overall rhythm, and the inherited Product Card
visual treatment. It is not `stable`, and no human approval is inferred.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Short finite related/recommended product collection only; no hero, feed, grid, provider, autoplay, loop, persistence, virtualization, or analytics contract. |
| Anatomy and composition | pass | Named section/header/navigation/focusable native list/list item with canonical Carousel, Icon Button, Product Card, and Price ownership. |
| Variants, sizes and states | pass | One intrinsic presentation; two/three/four-card container density; first, middle, last, no-overflow, and track-focus states. |
| Public API and ownership | pass | Required title/items, optional navigation, and conditional localized control labels; current item, data source, loading/errors, intent, analytics, and paging stay target-owned. |
| Tokens and visual system | pass with critical headroom risk | Five existing public tokens; two private derived gaps; no hardcoded component visual value; Product CSS has only 2 B of whole-byte gzip headroom. |
| Accessibility and interaction | pass | Native list order, labelled section/track, native Buttons/disabled bounds, `aria-controls`, exact adjacent items, direct-scroll sync, visible track focus, and boundary-focus recovery. |
| Responsive/content resilience | pass | Container—not viewport—density; 2/3/4-card measurements; mobile through XL, long Spanish heading/labels, mixed currencies/scripts, RTL, dark, forced colors, and reduced motion. |
| Runtime and assets | pass | `0 B` neutral runtime; bounded six-item Studio evidence controller; Shopify owns one fetched section, frame-coalesced geometry, ResizeObserver, and cleanup. |
| Cross-target translation | pass for Web/Shopify | Neutral Web generated/validated; Shopify is an implemented, ready section adapter; packaged framework/native/Figma targets remain planned. |
| Exhibit/Studio parity | pass | Exact identical `6,709`-character initial outerHTML from one renderer, fixture, and extracted Product Card artwork. |
| Architecture/readiness | **human-review-ready** | ADR 0118 records composition, list semantics, finite focus/bounds, container density, target state, and Shopify data ownership; visual approval remains human. |

## Research And Decision Evidence

- [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
  supports named carousel regions, native controls, predictable focus, and the
  additional obligations that make autoplay inappropriate for this v1 scope.
- [Open UI carousel research](https://open-ui.org/components/carousel.explainer/)
  documents the broad unresolved carousel design space; Product Slider therefore
  keeps a deliberately narrow native-scroll contract instead of inventing an
  engine API.
- [CSS Scroll Snap Level 1](https://www.w3.org/TR/css-scroll-snap-1/) and
  [CSS Overflow Level 3](https://www.w3.org/TR/css-overflow-3/) support logical
  native overflow/snap behavior without transform-only or drag-only runtime.
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
  does not define a carousel primitive, reinforcing composition over an inferred
  cross-framework API.
- [Shopify Product Recommendations](https://shopify.dev/docs/api/liquid/objects/recommendations)
  and [the related-products tutorial](https://shopify.dev/docs/storefronts/themes/product-merchandising/recommendations/related-products)
  support target-owned, locale-aware async recommendation loading and omission
  of empty results.
- ADR 0118 accepts native list composition, exact logical navigation,
  boundary-focus recovery, container density, zero neutral runtime, and Shopify
  data ownership.

## Contract And Browser Evidence

- Contract `0.2.0` validates with eight anatomy parts, one presentation/size,
  six states, seven behaviors, five properties, five public tokens, and Web,
  Shopify, framework, native, and Figma translation notes.
- Baseline used an unnamed `div`, physical fractional scrolling, viewport media
  queries, inert/non-bounded controls, duplicated Card markup, and only four
  fixtures. The refined DOM has one labelled `ul`, six `li`, six canonical
  Product Cards, six product links, and no per-slide ARIA override.
- Exhibit and Studio initial Product Slider outerHTML are exactly equal at
  `6,709` characters. Studio edits the five semantic controls and reuses the
  same render branch and six-item fixture.
- At the first bound, previous is natively disabled and next is available. One
  activation scrolls exactly one item, keeps focus on next, and enables both
  directions. At maximum scroll, next is disabled and focus is transferred to
  the named focusable `ul` instead of the document.
- Horizontal wheel input reached an intermediate `scrollLeft` and synchronized
  both bounds. Two ArrowRight presses moved the focused track to the next snap
  position while retaining a visible solid outline.
- RTL navigation resolves logical edges from item/track rectangles and works
  with native negative `scrollLeft`; no physical offset is used. Reduced motion
  computes `scroll-behavior: auto` and exact item activation is immediate.
- A `480px` content container renders two cards, `802px` renders three, and
  `1052px` renders four. The same narrow component remains two-up inside a large
  viewport, proving container-driven behavior.
- A long Spanish heading wraps to four lines at 390px without intersecting the
  navigation group. Fixtures cover short/long text, Spanish, Japanese, dollars,
  euros, and yen. Dark and forced-colors captures remain legible and preserve
  focus/boundary affordances.
- Four baseline, eight viewport, and thirteen special-state images are stored in
  `output/playwright/refinement-batch-33/`. The only observed site-console error
  was the pre-existing favicon 404; component runtime produced no error/warning.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named section, native list, Carousel snap/focus, Icon Button controls, Product Cards, container density, target finite controller. | Implemented, generated, validated, and browser-tested; no neutral runtime added. |
| Shopify | Locale-aware recommendation fetch, section-render replacement, empty/error omission, translated schema/storefront labels, canonical Product Card snippets, exact finite controller and cleanup. | Implemented `section-adapter`; CSS, Liquid, schema, data, behavior, composition, and editor layers validate ready. |
| React / Angular | Child/item array, target refs, exact logical current item, optional controlled/uncontrolled id after package demand. | Studio proves the model; public package naming/events remain planned. |
| Figma | Header, optional controls, Product Card instances, 2/3/4 density, first/middle/last/no-overflow, localized/extreme examples. | Planned; no component-specific owner artwork. |
| SwiftUI / Compose | Native horizontal collection and accessibility scroll actions with target product data/state. | Conceptual; DOM, Liquid, and Web scroll coordinates do not leak. |

## Performance And Risks

- Product CSS is `5,322 B / 5.2 KiB`, leaving `2 B` of whole-byte headroom.
- Complete Web component CSS is `65,452 B / 64 KiB`, leaving `84 B`.
- Shared runtime is `10,492 B / 8 KiB`, the existing `2,300 B` cumulative
  exception. Product Slider adds `0 B`.
- Product and complete Web CSS ceilings are effectively exhausted. Later work
  must simplify existing source rather than reset either budget.
- Shopify live-store recommendation intent, complementary merchandising,
  recently-viewed persistence, loading/error presentation, analytics,
  cancellation, and theme-editor lifecycle remain target/product decisions.
- Framework controlled/uncontrolled names and events, and any autoplay, loop,
  dots, engine, lazy loading, pagination, or virtualization expansion remain
  intentionally unstandardized.
- Human review must approve card count/peek, media crop, heading/control rhythm,
  gap, control surface/shadow, and the inherited Product Card candidate.

## Validation

Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, Neutral Web
and Shopify adapter builds/validation, Shopify Liquid validation, generated/
source identity, temporary Vite build outside `site/dist`, exact parity,
semantic DOM, native button/direct-scroll/keyboard/RTL/boundary-focus probes,
four viewports, container thresholds, long localized content, dark, forced
colors, reduced motion, deterministic gzip, structural/static-preview/parity/
refinement audits, diff checks, and explicit `site/dist` cleanliness comprise
Batch 33. `site/dist` was not rebuilt or modified.
