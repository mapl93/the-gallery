# Component Dossier: Featured Collection

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/featured-collection.contract.json`

## Recommendation

Keep Featured Collection as a passive merchandising section over a short,
finite, target-supplied product collection. Require a visible contextual title
and at least one canonical Product Card, expose the existing `grid`, `carousel`,
and `spotlight` presentation choices, and keep collection selection, query,
sorting, inventory, price freshness, loading, error, and commercial spotlight
policy outside the neutral source.

The component should compose accepted Gallery surfaces instead of maintaining
parallel implementations: Link for the optional collection destination,
Collection Grid list/layout classes in `grid`, Carousel track/item classes in
`carousel`, and Product Card for every product. The carousel presentation is a
focusable native horizontal product list with Scroll Snap; it has no autoplay,
loop, dots, bespoke Arrow-key model, or neutral controller. Spotlight only
emphasizes the first supplied item through parent layout. The target remains
responsible for deciding and ordering that first record.

This direction is safe to implement without choosing new product imagery,
ratio, density, merchandising rules, or visual identity. Human review must
still approve the three presentations, heading/action hierarchy, spacing,
carousel peek, spotlight emphasis, and inherited Product Card candidate before
any stability promotion.

## Purpose And Limits

- Presents a deliberately selected, finite group of products in a page-builder
  section with a contextual heading and optional collection destination.
- Supports ordinary grid browsing, a passive horizontal browse lane, and a
  first-record spotlight presentation without changing child Product Card
  semantics.
- Use Collection Grid for full result pages, Product Slider for recommendations
  with finite previous/next controls, and Hero for a single campaign message.
- Product Card owns media, product identity, Price, Badge, quick add, focus, and
  product navigation. Link owns the optional view-all navigation primitive.
- Featured Collection does not own fetching, sorting, personalization,
  recommendation logic, inventory, money formatting, loading/error messaging,
  pagination, virtualization, analytics, or purchase state.
- Empty product data is not a valid rendered Featured Collection. Targets omit
  the section until one or more complete products are available.

## Current Gallery Baseline

- Registry identity `S2`, category `sections`, selector
  `.featured-collection`, dependency depth `2`, direct dependency Product Card,
  and review order `162`.
- Contract `0.2.0`, `pilot`: five anatomy parts, three variants, one size, two
  states, two behaviors, five properties, ten public tokens, Web implemented,
  and Shopify planned.
- `title` is optional even though the renderer always emits a thematic
  `section`; the root and product region have no accessible relationship.
- The repeated region is an unlabelled `div`, not a native product list, and
  Product Cards are direct children without list items.
- Canonical CSS duplicates grid and Carousel layout, uses hardcoded `24px`,
  `16px`, `260px`, and a viewport breakpoint, and omits complete H2 typography.
- The shared Sections renderer recreates a reduced Product Card instead of
  using `ProductCardArtwork`, blocks all fixture navigation, uses fragment
  placeholders, always emits an empty header, and supplies only three uniform
  records.
- Site-only Studio CSS forces three columns, a portrait media ratio, one-column
  breakpoints, and Carousel display. It therefore owns candidate behavior and
  visual decisions that belong to canonical source or Product Card.
- The registered Figma nodes (`k3axoTaF87g17fBRgJ0PMY`, `943:7`, `1020:480`)
  are the generic Studio/Button shell already inspected in adjacent dossiers;
  they provide no Featured Collection-specific density, crop, or hierarchy
  evidence. The reusable capture is
  `output/playwright/refinement-batch-60/references/figma-studio-reference.png`.
- Shopify has generated section CSS and a canonical Product Card snippet but no
  `sections/featured-collection.liquid`; the maturity manifest reports
  `css-ready`, missing Liquid/data, target behavior work, and `ready: false`.
- Baseline deterministic gzip: Sections `6,407 B`, Neutral Web component CSS
  `66,440 B`, shared runtime `10,501 B`. The latter two already exceed their
  original program ceilings; this passive component must add no runtime and
  should reuse existing CSS primitives.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML section](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | A `section` is a thematic grouping, typically identified by a heading, rather than a generic styling wrapper. | Require a visible title for the neutral section and connect the root/list with `aria-labelledby`. |
| [HTML `ul`/`li`](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element) | Native list elements represent a collection of sequential items without introducing widget behavior. | Render products as `ul`/`li`; do not use an APG Grid role or roving focus. |
| [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | A claimed carousel brings naming, controls, slide, rotation, focus, and pause duties; autoplay adds further obligations. | Keep `carousel` as a user-scrolled multi-card list that composes native Carousel track geometry but claims no autoplay/loop engine. |
| [Open UI List research](https://open-ui.org/components/list.research/) | List items may contain compound image/text surfaces and systems do not converge on one higher-level commerce-list API. | Preserve native list semantics and keep Product Card compound content as the child contract. |
| [Open UI Carousel research](https://open-ui.org/components/carousel.research/) | Systems disagree on grouping, controls, looping, autoplay, timing, effects, and events. | Do not expose engine configuration or infer a controller from the `carousel` presentation name. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Radix layers behavior onto consumer-owned elements instead of duplicating leaf implementations; it provides no storefront collection section. | Compose Gallery dependencies/classes and keep the neutral implementation framework-free. |
| [Polaris Resource List](https://polaris-react.shopify.com/components/lists/resource-list) | Polaris separates repeated resource rendering from optional admin workflows such as filtering, selection, sorting, empty states, and pagination. | Keep repeated Product Card composition explicit while leaving merchant/admin workflows out of the storefront section. |
| [Shopify section best practices](https://shopify.dev/docs/storefronts/themes/architecture/sections/best-practices) | Sections are reorderable, merchant-configurable template modules and should scope settings to their content/layout responsibility. | Implement a dedicated addable Section Adapter with collection, title, variant, limit, and view-all settings only. |
| [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#collection) | A `collection` setting returns a selected collection resource and supports Theme Editor dynamic data. | Shopify maps merchant selection to the target-owned product slot without introducing a neutral query API. |
| [Dawn Featured Collection](https://github.com/Shopify/dawn/blob/main/sections/featured-collection.liquid) | Dawn limits a selected collection, renders each product through one card snippet, and derives view-all from the collection URL. | Reuse the data/composition pattern only; retain Gallery classes, contract, minimal settings, and visual identity. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `section` named by visible heading | Featured Collection/target | Composes `collection-grid` in Grid and `carousel` in Carousel presentation. |
| Header | yes | native `header` | Featured Collection | Holds required title and optional Link; wraps intrinsically. |
| Title | yes | contextual `h2` in fixtures | Target | Target chooses rank in native adapters; id names section and product list. |
| View-all Link | no | canonical native Link | Link/target | Render only when both meaningful label and real destination exist. |
| Product list | yes | `ul[role=list]` | Featured Collection plus layout dependency | Composes `collection-grid__items` or `carousel__track` by presentation. |
| Product item | one or more | `li` | Featured Collection plus layout dependency | Composes `collection-grid__item` or `carousel__slide`; preserves supplied order. |
| Product Card | exactly one per item | canonical `article.card.product-card` | Product Card | No copied card/media/Price markup or behavior. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Grid | Default finite native list; canonical Collection Grid provides intrinsic one/two/three/four-column response. |
| Carousel | Native focusable horizontal list with canonical Carousel track/items, direct scrolling and Scroll Snap; no controls/autoplay/loop/dots. |
| Spotlight | Native list in parent-owned asymmetric grid; first supplied item spans more columns only when space allows. |
| Size | One intrinsic size. Card count, card basis, breakpoint geometry, and spotlight span are private composition. |
| Populated | One or more complete Product Cards; source order remains visual order. |
| Empty | Invalid rendered section; target omits it or composes loading/error/Empty State outside this component. |
| Header | Required title; optional view-all appears only as a valid label/destination pair. |
| Focus | Native Link/Product Card focus; Carousel track is an additional named scroll viewport focus stop. |
| Theme | Light/dark inherited from semantic tokens and child contracts. |
| Forced colors | No decorative replacement; dependency focus indicators remain visible. |
| Reduced motion | No component motion; Carousel dependency disables authored smooth scrolling. |
| RTL | Native list order and logical scroll/snap axes; no physical offsets or mirrored product order. |
| Responsive | Named component containers, not viewport media queries or site-only breakpoints. |

Unsupported combinations include a missing title, an empty products slot, a
label without destination, a destination without label, Product Cards outside
list items, copied Product Card markup, visual reordering, autoplay without a
pause lifecycle, transform-only tracks, target queries in neutral JS, and a
spotlight selector that changes commercial order inside CSS or runtime.

## Public API And State Ownership

- `variant` — optional enum, default `grid`; `grid`, `carousel`, or `spotlight`.
- `title` — required non-empty visible contextual heading. Targets select the
  native heading rank; fixtures use `h2`.
- `viewAllLabel` and `viewAllDestination` — optional but coupled. Both are
  required to render the canonical Link; partial pairs are omitted/rejected.
- `products` — required ordered slot containing one or more canonical Product
  Cards. Product identifiers, URLs, money, media, availability, and order are
  supplied by the target.
- The component exposes no product count, columns, current item, selected
  spotlight id, loading flag, query, sort, pagination, or analytics event.
- It has no controlled/uncontrolled state. Framework targets receive ordinary
  props/children and re-render when their owning data changes.
- Shopify may expose target data/editor settings such as selected collection and
  product limit without adding them to the neutral contract.

## Token And Value Audit

- Featured Collection owns semantic section/container spacing, header spacing,
  title typography, and spotlight gap.
- Link owns accent/hover/focus text styling; Carousel owns track focus, snap,
  overflow, smooth-scroll/reduced-motion behavior; Collection Grid owns grid
  gap/density; Product Card owns media, surface, type, Price, focus, and motion.
- Add complete H2 size, line-height, weight, and letter-spacing references; do
  not leave docs CSS to repair heading presentation.
- Private `--_featured-*` variables may express header rhythm and carousel card
  basis. Container thresholds and `rem` card geometry are private responsive
  rules, not public tokens.
- Structural zeroes, list reset, `minmax(0, 1fr)`, `min-inline-size: 0`, and
  `role=list` are semantics/containment, not customization API.
- Remove duplicate public focus/accent/body-size tokens when their only owner is
  Link or Carousel.

## Visual And Content Audit

- Baseline images under `output/playwright/refinement-batch-61/before/` show one
  card per row in constrained Desktop Exhibit, an unrelated forced three-column
  Studio rule at Tablet/XL, a large gap from an empty header, and a portrait
  Product Card crop imposed only by Studio.
- The current three records repeat the same vendor, short title pattern, fixed
  Price shape, and no optional Product Card parts. Use six varied canonical
  fixtures to expose long/localized/mixed-script names, badges, missing optional
  content, and varied Price strings without turning fixture data into defaults.
- Grid should show a calm editorial rhythm; Carousel should make overflow and a
  next item visible; Spotlight should enlarge the first composition without
  changing Product Card internals or source order.
- Long title/link/product content must wrap; optional view-all must collapse
  without leaving a blank header or margin; one item must keep a normal card
  width rather than stretch unpredictably.
- Inherited Product Card square media remains a Product Card owner decision and
  is not changed by this section.

## Accessibility And Interaction

- Required heading names the thematic section and product list.
- Preserve native `ul`/`li`; do not use `role=grid`, `row`, `gridcell`,
  `roledescription=carousel`, slide group roles, or a second Arrow-key model.
- Carousel list is focusable so keyboard users can reach and scroll the native
  overflow viewport; ordinary Product Card Links/Buttons remain in normal Tab
  order.
- View all and product navigation use real native destinations and must not be
  cancelled by the docs fixture.
- Focus, contrast, image alternatives, quick-add names, Price labels, forced
  colors, and child motion remain owned by canonical dependencies.
- Dynamic targets announce loading/error/result changes outside the passive
  section and omit it when product data is empty.

## Responsive And Performance

- Name the root container and compose the accepted Collection Grid container in
  Grid mode. Spotlight queries the Featured Collection container. Carousel uses
  logical inline Scroll Snap and a private bounded card basis.
- Test Mobile `390x844`, Tablet `768x1024`, Desktop `1280x800`, and XL
  `1600x1000` in both Exhibit and Studio, plus constrained embedded widths and
  wide direct roots.
- Passive runtime budget is `0 B`: no listeners, observers, timers, network
  requests, layout reads, or component controller.
- DOM and work scale linearly with the short supplied collection. Product limit,
  pagination, virtualization, and lazy-loading policy remain target concerns.
- Sections family ceiling is `6.7 KiB` gzip; reuse dependency CSS and remove
  duplicated rules. The total Web CSS/shared runtime existing exceptions must
  not be reset or hidden.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named section/header/title, optional canonical Link, native product list/items, conditional Collection Grid/Carousel class composition, Product Card children, CSS-only Spotlight. | Implemented, generated, validated and browser-evidenced; no runtime. |
| Shopify | Addable `featured-collection` section, merchant-selected collection, title fallback, variant, bounded product limit, derived view-all URL/label, canonical Product Card snippet and list classes. | Implemented and adapter-ready with localized schema/storefront strings. |
| React / Angular | Required title, variant, optional view-all pair, product children; conditional semantic class composition and no local state. | Planned; controlled API not applicable. |
| Figma | Section header plus repeated canonical Product Card instances in Grid/Carousel/Spotlight frames. | Registered reference is generic; final density and hierarchy require owner review. |
| SwiftUI / Compose | Section heading/action plus target-native lazy/non-lazy product collection; presentation maps to adaptive grid, horizontal list, or emphasized first item. | Conceptual; data, money, navigation and lifecycle remain target-native. |

## Exhibit And Studio Parity

- Exhibit and Studio already share `SectionsStudio`, one contract, one Studio
  definition, and one fixture state.
- Replace the local reduced Product Card renderer with `ProductCardArtwork`, the
  same canonical artwork used by Product Card, Product Slider, and Collection
  Grid.
- Use the same six-item fixture and exact render branch in both modes; conditional
  dependency classes must be derived from `variant` in that one branch.
- Remove site-only Featured Collection columns, media ratio, header response,
  and Carousel layout. Site CSS may only bound the preview stage or supply media
  fixture images.
- Update MDX fallback markup to mirror native list/item and dependency class
  composition without deleting secondary editorial guidance.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Thematic section has optional title and no accessible relationship. | high | Require non-empty title and wire root/list to it. | implementation |
| Repeated products are an unlabelled `div` without list items. | high | Add native `ul`/`li` anatomy and preserve order. | implementation |
| Sections renderer duplicates a reduced Product Card. | high | Consume `ProductCardArtwork`. | implementation |
| Grid/Carousel layout duplicates accepted canonical components. | high | Compose Collection Grid and Carousel classes and dependencies. | user principle / implementation |
| Site CSS owns columns and portrait crop. | high | Remove candidate behavior/visual overrides. | implementation |
| Fixture navigation is fake and cancelled. | high | Use real destinations and native activation. | implementation |
| Empty optional header leaves `24px` blank rhythm. | medium | Make header required with title; render optional Link only as a complete pair. | implementation |
| Spotlight changes only first-child layout but not selection policy. | architecture/commercial | Keep first-supplied-item projection; target/merchant owns selection and ordering policy. | owner / target |
| Shopify dedicated section is explicitly missing. | high | Add minimal target-native section/schema/data/locales and validate it. | implementation |
| Product Card crop and all three presentation aesthetics are unapproved. | visual | Preserve dependency candidate and provide four-viewport/special evidence. | owner at review |

## Evidence And Validation

Baseline artifacts include eight paired viewport screenshots plus Carousel,
Spotlight, and empty-header cases under
`output/playwright/refinement-batch-61/before/`. Measurements prove:

- Root `aria-labelledby`: absent.
- Repeated region: `DIV`, three direct Product Card children, no list items.
- View-all destination: `#collection`, with activation cancelled by React.
- Empty title/link: empty header persists with `24px` bottom margin.
- Carousel at a `484px` track: `812px` scroll width, three `260px` items,
  overflow auto, but no track focus stop.
- Studio candidate columns differ by docs-stage width because site-only CSS
  forces `repeat(3, 1fr)` and repairs it independently.

Final artifacts under `output/playwright/refinement-batch-61/after/` contain
eight paired viewport captures and seven special-mode captures. Measurements
prove:

- Normalized initial Exhibit and Studio root DOM is exactly equal at `6,883`
  characters with FNV-1a `beda6dcc`.
- Every paired render has one named native list, six `li` records, six canonical
  Product Cards, and matching root/list `aria-labelledby` values.
- Empty title and empty required products each omit the root; either incomplete
  view-all half omits only the Link and preserves the header/title.
- One supplied record remains a normal `231px` card in a two-track `532px`
  candidate rather than stretching across the section.
- Carousel is a focusable `UL[role=list]`, `677px` client by `1,888px` scroll
  lane; native ArrowRight scrolling reaches `640px` without component JS.
- Wide Spotlight produces four columns, a two-column first record, and `498px`
  first-card width in a `1,120px` root while preserving DOM/source order.
- Long German heading, unbroken product name, Spanish, Arabic RTL, optional
  omissions and effective 200% zoom have no root overflow. The only descendant
  scroll-width exception is the intentionally visually hidden Price label.
- Pointer view-all navigation reaches `/components/collection-grid`; keyboard
  Enter on the first Product Card reaches `/components/product-card?work=1`.
- Link focus is a `2px` solid outline with `2px` offset. Light title/Card
  contrast is `17.93:1`; the accent Link is `5.88:1` against white.
- Dark tokens, forced colors and effective 200% zoom render without overflow;
  reduced motion clamps all descendant animation/transition durations to
  `0.00001s` and Carousel scroll behavior to `auto`.
- Fresh browser console inspection reports zero errors and zero warnings.
- Sections gzip is `6,464 B` versus `6,407 B` baseline; Neutral Web component
  CSS is `66,551 B` versus `66,440 B`; shared runtime remains `10,501 B`.
- Web/Shopify adapter validation, official Shopify Liquid revision 1,
  temporary Vite production build, generated-copy identity, diff checks and a
  clean `site/dist` status pass. Shopify reports S2 `implemented`, all required
  maturity layers ready, no dead settings and `ready: true`.

## Risks And Open Questions

1. Human review must approve Grid density, heading/action hierarchy, section
   rhythm, Carousel card width/peek/scroll affordance, Spotlight span, and the
   inherited Product Card crop/visual candidate.
2. The owner/target must define commercial rules for which collection is
   featured, how it is sorted, and which record is first in Spotlight. The
   neutral component consumes order and never chooses it.
3. If Carousel later needs explicit controls, it should compose the accepted
   Product Slider/Carousel finite navigation lifecycle rather than adding an
   independent partial controller.
4. Loading, empty, error, price/inventory freshness, analytics, personalization,
   and editor placeholder policies remain target concerns.
5. No component-specific owner artwork exists; the repository render remains a
   review candidate rather than aesthetic approval.

## Readiness Decision

Ready for human review, not stable. The required named section, native list,
canonical Link/Collection Grid/Carousel/Product Card composition, passive
three-variant contract, target-owned merchandising policy and dedicated
Shopify Section Adapter are implemented and evidenced. Human review must still
approve the inherited Product Card candidate and S2's Grid density,
heading/action rhythm, Carousel affordance and Spotlight emphasis. Commercial
selection/order remains an explicit target/product decision rather than a
neutral component blocker. No stability promotion was made.
