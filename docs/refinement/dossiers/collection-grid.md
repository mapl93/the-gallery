# Component Dossier: Collection Grid

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/collection-grid.contract.json`

## Recommendation

Keep Collection Grid as a passive, finite product-list layout that composes one
canonical Product Card per item. Use a native `ul`/`li` list inside a
container-owning root; do not apply the APG `grid` role, roving focus, selection,
or arrow-key navigation to a storefront collection. Preserve the accepted two-
column base, three-column intermediate mode, and configurable two-through-six
wide mode, but make those transitions respond to the component container rather
than the viewport.

The public API remains only `columns` and `items`. `columns` is the requested
wide-container count and maps through `data-columns`; intermediate responsive
counts, list geometry, wrappers, and item sizing remain private composition. The
grid does not own filtering, sorting, pagination, result announcements, product
data, quick add, loading, empty-state messaging, or virtualization.

The current Gallery render can be prepared for human review without choosing a
new Product Card ratio or visual style. Human review must still approve gap,
page padding, responsive density, the inherited Product Card crop, and the
overall collection rhythm before `stable` promotion.

## Purpose And Limits

- Presents a browsable collection of comparable products in stable DOM order.
- Primary contexts are collection pages, category/search result compositions,
  and other finite storefront result surfaces.
- Product Card owns product identity, media, navigation, Badge, Button, Price,
  focus, and quick-add semantics.
- Filter Panel owns faceted filtering controls; Pagination owns result boundaries;
  View Toggle owns an explicit alternate presentation request; Empty Collection
  owns recovery messaging when no results exist.
- Collection Grid is not Product Slider, an APG composite grid, a data table, a
  masonry gallery, an infinite feed, or a result provider.
- Sorting, filtering, fetching, pagination, live result announcements, inventory,
  responsive image selection, loading priority, analytics, and virtualization
  remain target/application concerns.

## Current Gallery Baseline

- Registry identity: `E2`, category `collection`, selector `.collection-grid`,
  dependency `product-card`.
- Contract: `0.1.0`, `pilot`; one root anatomy part, one default variant/size,
  `columns` and `items` properties, and three public spacing tokens.
- Canonical CSS makes the root itself the grid, forces two columns by default,
  switches to three and configurable desktop columns with viewport media
  queries, and applies page-level section/container padding.
- Studio exposes columns, Product Card items, grid gap, and a section-space
  token. The section-space control is visually dead because the site-only
  `.docs-studio__collection-grid` class sets `padding: 0`.
- Collection Studio duplicates a reduced Product Card instead of consuming the
  extracted `ProductCardArtwork` used by the Product Card and Product Slider
  renderers.
- MDX uses direct Product Card children without native list/item anatomy.
- Neutral Web is implemented. Shopify already renders collection products through
  `snippets/product-card.liquid` inside `sections/main-collection.liquid`, but the
  contract still says planned, the section does not map `columns`, and the
  manifest reports `planned-contract-with-liquid-template`.
- Existing parity evidence covers only Mobile/Desktop and six links. It does not
  prove Tablet/XL, all column values, embedded containers, empty/one/extreme item
  counts, localized text, themes, forced colors, or reduced motion.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: `ul`](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element) | `ul` represents a list whose order does not change the document's meaning; its direct items are `li`. | A sortable product result set remains an unordered native list even though its current DOM order must be preserved visually. |
| [WAI-ARIA APG Grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) | `grid` is a composite widget with one tab stop and author-managed Arrow/Home/End focus movement. | A passive product-card layout must not use `role="grid"`; normal link/Button tab order remains intact. |
| [Open UI List research](https://open-ui.org/components/list.research/) | List research treats lists as sequential items that may contain compound media/text surfaces. | Native list composition is a closer model than inventing a Collection Grid widget. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix focuses on behavior-heavy ARIA primitives and does not define a collection-layout primitive; styling/layout stays consumer-owned. | Collection Grid should remain CSS/HTML-only and target-agnostic, not acquire React state or a controlled/uncontrolled model. |
| [Polaris Resource List](https://polaris-react.shopify.com/components/lists/resource-list) | Resource List accepts items plus an item renderer and composes filtering, sorting, empty state, selection, and pagination only when those workflows are required. | Preserve an explicit repeated-item composition boundary while leaving admin selection/workflow features out of the storefront grid. |
| [Shopify Dawn collection grid](https://github.com/Shopify/dawn/blob/main/sections/main-collection-product-grid.liquid) | Dawn paginates collection products, renders each through one card snippet inside `ul`/`li`, and exposes desktop/mobile layout settings at the section adapter. | Shopify should map collection data, pagination and the accepted Gallery desktop count without copying Dawn's broader merchant API or visual identity. |
| [Shopify Liquid `paginate`](https://shopify.dev/docs/api/liquid/tags/paginate) | `collection.products` is a supported paginated array and Liquid loops have bounded page behavior. | Pagination and page size remain the Shopify section's data concern; Grid receives only the current Product Card items. |
| [CSS Containment / container queries](https://drafts.csswg.org/css-conditional/#container-queries) | A named inline-size query container lets descendant layout respond to available component width. | Make `.collection-grid` the named container and its inner list the responsive grid. |
| [WCAG Reflow understanding](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html) | Content should reflow without two-dimensional page scrolling at an equivalent 320 CSS-pixel width. | Add zero-min tracks/items and a one-column fallback for constrained embedded containers while preserving the accepted two-column mobile page mode. |

### Owner reference analysis

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
inspector `1020:480`. Direct inspection shows a generic Studio shell and Button
example, not Collection Grid artwork. It supports the inspector layout only and
provides no Collection Grid-specific evidence for density, media ratio, gap,
padding, or card styling. No component-specific owner visual reference was
available, so the repository candidate is preserved for human review rather than
reinterpreted from unrelated artwork.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral `div.collection-grid` | Collection Grid | Owns page spacing, `data-columns`, and named inline-size containment; no landmark or widget role. |
| Items | yes | `ul.collection-grid__items`, optionally empty | Collection Grid | Owns CSS grid and native list semantics; no `role="grid"`. |
| Item | repeated | `li.collection-grid__item` | Collection Grid | Preserves DOM/visual order and zero-min track behavior. |
| Product Card | one per item | canonical `article.card.product-card` | Product Card | Owns every product link/action/content and nested dependency. |

No Product Card markup, price formatting, Badge, Button, image, or quick-add
behavior may be recreated by Collection Grid.

## Variant, Size, State, And Mode Matrix

- Variant: Default only.
- Size: one responsive size; `columns` is a semantic wide-layout property, not a
  second size family.
- Content modes: populated; zero items; one item; repeated items. Empty recovery
  UI belongs to Empty Collection rather than becoming a Grid variant.
- Responsive modes: one column below the safe embedded threshold; two columns at
  the base page/container width; three at `48rem`; requested `2..6` at `64rem`.
- Themes: light and dark inherit Product Card and token output; Grid adds no
  color, border, typography, icon, or shadow.
- Interaction: none at root/list/item; child Product Cards retain normal Tab
  sequence and focus behavior.
- Motion: none at Grid; Product Card owns its own reduced-motion behavior.
- Forced colors: no Grid override; list/layout semantics and child focus survive.
- RTL: CSS Grid and DOM order remain logical; Grid adds no directional control.

## Public API And State Ownership

- `columns: number` — optional, default `4`, integer `2..6`; requested number of
  columns only when the component container reaches the wide mode. Web maps it to
  `data-columns` and Shopify maps it from a section setting.
- `items: slot` — required ordered collection of canonical Product Cards; it may
  contain zero items while the parent decides whether to compose Empty Collection.
- No events, value, selection, current item, active cell, loading flag, or
  controlled/uncontrolled state exist.
- Filtering/sorting/pagination may replace the supplied item collection and own
  result announcements/focus. Collection Grid remains a pure projection.
- Invalid `columns` values must be rejected/clamped by adapters; the base CSS
  falls back to four wide columns when no valid mapped attribute is present.

## Token And Value Audit

- Public tokens: `--space-layout-grid-gap`, `--space-layout-section-gap`, and
  `--space-layout-container`; all are canonical CSS references and Web aliases.
- `--grid-columns` is the existing compatibility hook named by ADR 0076. The
  semantic public path is `columns -> data-columns`; new internal responsive
  composition should use a `--_` private variable while retaining compatibility.
- `48rem` and `64rem` are private responsive geometry already accepted for the
  related Product Slider composition; they are not public token candidates.
- Zero margins/padding/list markers and `minmax(0, 1fr)` are structural reset and
  overflow rules, not semantic customization.
- Product typography, media, surface, Price, Badge, Button, focus, and motion
  tokens belong to Product Card and its dependencies.

## Visual And Content Audit

- Preserve the current page-level section/container padding and grid-gap token.
- Do not override Product Card crop, typography, surface, border, shadow, badges,
  Price, quick add, or focus presentation.
- Use six varied canonical Product Cards in the shared fixture to show short,
  long, Spanish, mixed-script, optional-content, and price examples.
- Verify zero items, one item, six desktop columns, long localized text, an
  unbroken title, a missing child image, and extreme price content without Grid
  or page overflow.
- A one-item Grid should occupy the first normal track rather than stretch a
  Product Card across the whole page.
- The inherited square Product Card ratio remains an unresolved Product Card
  visual decision; Collection Grid must be retested if that dependency changes.

## Accessibility And Interaction

- Use native list/item elements and ordinary document navigation.
- Never add APG `grid`, `row`, or `gridcell` roles without also implementing the
  composite focus model; that behavior is out of scope.
- Preserve source DOM order; do not use CSS `order`, dense packing, masonry, or
  layout-only reordering.
- Root/list/item need no accessible name, focus stop, live region, `aria-busy`,
  or keyboard handler.
- Each Product Card retains its own descriptive title link and optional
  contextual action names.
- Dynamic target updates announce result counts/status outside Collection Grid;
  replacing the list must not duplicate Product Card announcements.
- Grid adds no motion; reduced-motion and forced-color duties remain with child
  components and global tokens.

## Responsive And Performance

- The root becomes a named inline-size container and the inner list responds to
  it, making embedded desktop-width cases behave like narrow components.
- Preserve two/three/configured-wide density with a safe single-column fallback
  when less than the accepted two-card content width is available.
- `minmax(0, 1fr)` plus `min-inline-size: 0` prevents long child content from
  widening tracks.
- Passive runtime budget: `0 B`; no listeners, observers, timers, fetches, layout
  reads, animation loops, or new neutral JavaScript.
- DOM/work scale linearly with supplied products. Pagination/virtualization are
  target concerns for large collections.
- No component asset request is allowed; fixture/product media is supplied data.
- Collection CSS ceiling is `2.5 KiB` gzip and total component CSS ceiling is
  `64 KiB`; the responsive anatomy must fit without resetting either budget.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Root container, native list/items, Product Card children, `data-columns`, CSS-only container modes. | Source refinement required; neutral runtime remains zero. |
| Shopify | `main-collection` paginates `collection.products`, renders one canonical `product-card` snippet per `li`, and maps localized editor `columns`. | Liquid exists; contract/status/anatomy/schema require reconciliation and validation. |
| React / Angular | Root wrapper, semantic `ul`/`li`, Product Card children, integer `columns` prop; no component state. | Straight composition; packages remain planned. |
| Figma | Repeated Product Card instances in one responsive layout frame; columns control for wide composition. | Target should not infer Grid visuals from the generic Studio reference. |
| SwiftUI / Compose | Lazy/non-lazy grid chosen by target data scale, canonical Product Card item view, adaptive two/three/configured-wide presentation. | Conceptual; target-native collection semantics/performance remain adapter work. |

## Exhibit And Studio Parity

- Both modes already mount `CollectionStudio` with one definition and initial
  fixture, but its Grid branch currently duplicates Product Card markup.
- Replace that duplicate with the extracted `ProductCardArtwork` used by Product
  Card/Product Slider, wrapped in canonical list items.
- Keep site-only preview classes limited to stage width and removal of page-level
  padding inside the constrained artwork frame.
- Remove the dead section-space Studio control; keep the meaningful Grid gap and
  wide-column controls.
- Update the MDX Preview as fallback/audit evidence for the same list/item anatomy.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Viewport media queries make embedded grids respond to page width. | high | Add root containment and descendant container queries. | implementation |
| Root lacks native list/item anatomy. | high | Add `ul.collection-grid__items` and repeated `li.collection-grid__item`; avoid APG grid. | implementation |
| Studio duplicates incomplete Product Card markup. | high | Consume `ProductCardArtwork`. | implementation |
| Section-space Studio token is dead under the fixture padding override. | medium | Remove the dead control; retain source token inventory. | implementation |
| Shopify renders cards but does not map columns and contract says planned. | high | Add localized `columns`, canonical list anatomy, and mark Shopify implemented after validation. | implementation |
| Existing evidence omits Tablet/XL, themes, special modes and edge content. | high | Capture full Batch 35 evidence and DOM/layout probes. | implementation |
| Product Card ratio/candidate is not human-approved. | inherited visual | Preserve current dependency; retest Grid after any accepted Product Card visual change. | owner / Product Card review |
| Registered Figma nodes are generic Studio/inspector artwork. | visual | Do not derive Collection Grid aesthetics from them; present repository candidate. | owner at review |

## Evidence And Validation

The shared initial root is exactly equal between Exhibit and Studio at `5,873`
characters. Both render one neutral root, one `ul[role="list"]`, six direct
`li` children, six canonical Product Card articles, and six title links in the
same order.

Measured container behavior has no component overflow: `311px -> 1` column and
`657px -> 2` columns in both modes; Studio's wider review canvas proves
`836px -> 3` and `1,056px -> 4`, while Exhibit's intentionally narrow artwork
panel remains at two. Studio maps Wide columns `2 -> 2` and `6 -> 6` in the
wide canvas. An injected `288px` embed falls back to one column; a one-item grid
keeps the first of four normal tracks; and an empty native list remains present
without adding status or focus behavior.

The mobile stress fixture combines an unbroken title, long French vendor,
Arabic title, missing image request, mixed currencies, and canonical fallback
media without component or page overflow. RTL preserves list/root bounds and
DOM order. Dark mode resolves the Product Card surface to `rgb(23, 23, 23)`.
Forced colors produces a solid `4px` card focus outline; reduced motion makes
both card and image transitions `0s`. Sequential Tab navigation visits all six
title links in DOM order.

Four before, eight viewport-after, and six special-state screenshots are stored
under `output/playwright/refinement-batch-35/`. Final validation includes
contracts, Studio, docs, Web/Shopify adapter builds, Shopify Liquid validation,
static Preview/parity/refinement audits, deterministic gzip, a temporary docs
build outside `site/dist`, diff checks, generated/source identity, and explicit
`site/dist` cleanliness.

## Risks And Open Questions

1. Human review must approve Grid gap, page padding, two/three/wide density,
   six-column readability, overall rhythm, and the inherited Product Card crop.
2. If Product Card later changes ratio or content density, Collection Grid visual
   evidence must be refreshed; Grid must not pre-empt that owner decision.
3. Shopify's filtering/sorting refresh lifecycle, result announcement, mobile
   filter surface, and focus policy remain target-owned Filter Panel work.
4. Infinite scrolling, progressive loading, virtualization, and result-provider
   APIs are not accepted v1 Collection Grid scope.
5. No Collection Grid-specific owner artwork exists; automated evidence cannot
   approve the candidate or promote `pilot` to `stable`.

## Readiness Decision

Collection Grid is ready for human review. Its purpose, native anatomy,
container response, public API, dependency ownership, accessibility model,
target translation, zero-runtime budget, shared renderer, and evidence are
coherent. Contract status remains `pilot`; no automated result is human visual
approval and no promotion to `stable` is made.

Human review must approve grid gap, page padding, one/two/three/wide density,
six-column readability, overall collection rhythm, and the inherited Product
Card crop/visual candidate. Parent result lifecycle, alternate presentation,
and large-data strategies remain explicit future decisions.

Not ready yet. Research supports a native list, canonical Product Card
composition, container-responsive layout, unchanged two-property API, and a
reconciled Shopify section. Source refinement and full browser/target evidence
remain required before human review.
