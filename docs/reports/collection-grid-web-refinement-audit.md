# Collection Grid Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-14

## Outcome

Collection Grid is now a passive, finite, container-responsive native product
list. It composes one canonical Product Card per `li`, preserves ordinary link
navigation and source order, exposes only a bounded wide-column request plus the
item slot, and adds no neutral runtime. Filtering, sorting, pagination, result
status, empty recovery, loading, data, analytics, and virtualization remain
parent or target concerns.

Exhibit and Studio render exactly the same DOM and six-item fixture. Shopify now
maps native collection data, Product Card snippets, localized editor columns,
and native list anatomy through its validated collection section. The candidate
is ready for human visual review; it is not `stable` and no approval is inferred.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite product-result layout only; no APG composite grid, result provider, masonry, alternate view, infinite feed, selection, or lifecycle ownership. |
| Anatomy and composition | pass | Neutral root, required native `ul`, repeated `li`, and exactly one canonical Product Card per item. |
| Variants, sizes and states | pass | One default presentation; populated, one-item and zero-item content; one/two/three/requested-wide container modes; `2..6` bounded wide count. |
| Public API and ownership | pass | Only `columns` and `items`; no state/events/controlled API. Parent/target owns data and result lifecycle. |
| Tokens and visual system | pass | Three existing spacing tokens, one compatibility hook, private responsive geometry, no new public token or duplicated Product Card visual values. |
| Accessibility and interaction | pass | Native list semantics, no `grid` role/roving focus, six links in DOM Tab order, child focus preserved in forced colors, no Grid motion. |
| Responsive/content resilience | pass | Named inline-size container; 288px embed, four review widths, one/six columns, empty/one item, mixed scripts, missing media, unbroken text, RTL and no component overflow. |
| Runtime and assets | pass | `0 B` neutral runtime, no listeners/observers/timers/fetch/layout loop/animation/assets; supplied Product Card data owns media. |
| Cross-target translation | pass for Web/Shopify | Neutral Web generates/validates; Shopify collection section is implemented and ready; other target mappings are documented and remain planned. |
| Exhibit/Studio parity | pass | Exact identical `5,873`-character initial outerHTML from one renderer, definition and fixture. |
| Architecture/readiness | **human-review-ready** | ADR 0120 records native semantics, container modes, API/ownership, canonical composition, zero runtime and Shopify translation. |

## Research And Decision Evidence

- The [HTML Standard `ul` model](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element)
  supports a native unordered list of products with direct `li` children.
- [WAI-ARIA APG Grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
  requires a composite focus model. Collection Grid intentionally preserves
  ordinary document/link navigation instead.
- [Open UI List research](https://open-ui.org/components/list.research/) treats
  compound media/text items as list content rather than requiring a grid widget.
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
  has no passive collection-layout state primitive, supporting CSS/HTML-only
  ownership.
- [Polaris Resource List](https://polaris-react.shopify.com/components/lists/resource-list)
  demonstrates an item-renderer boundary while keeping workflow features tied to
  explicit product needs.
- [Shopify Dawn's collection grid](https://github.com/Shopify/dawn/blob/main/sections/main-collection-product-grid.liquid)
  and [Liquid paginate](https://shopify.dev/docs/api/liquid/tags/paginate)
  support paginated product data plus one card render per list item at the
  target, without defining Gallery visuals.
- [CSS container queries](https://drafts.csswg.org/css-conditional/#container-queries)
  support density based on available component width.
- [WCAG Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)
  supports the constrained one-column fallback and zero-min track protection.
- The registered Figma frame/inspector are a generic Studio shell and Button
  example, not Collection Grid-specific artwork. No density, crop, gap, padding,
  or visual direction was inferred from them.

## Contract And Implementation Result

- Contract `0.2.0` validates with three anatomy parts, one variant, one size, one
  passive state, four behaviors, two properties, three public tokens, and
  implemented Web/Shopify adapters.
- `.collection-grid` owns the named inline-size container and valid
  `data-columns` mapping. A private `--_collection-grid-columns` value preserves
  the accepted legacy `--grid-columns` compatibility input.
- `.collection-grid__items` owns native list reset, page spacing and CSS Grid.
  `.collection-grid__item` owns only zero-min track safety.
- Container modes measure one column below `20rem`, two from `20rem`, three from
  `48rem`, and requested `2..6` from `64rem`.
- Registry, MDX, contract and Studio metadata describe the same passive model.
  The dead Studio section-padding control is removed; Grid gap and Wide columns
  remain meaningful.
- CollectionStudio uses extracted `ProductCardArtwork`; it no longer maintains
  reduced local Product Card markup. A site-only full-width review workspace
  lets Studio demonstrate intermediate and wide modes without changing the
  canonical component.

## Browser Evidence

- Exhibit and Studio initial Collection Grid outerHTML are exactly equal at
  `5,873` characters: one root, `ul[role="list"]`, six `li`, six Product Card
  articles, and six title links.
- At `390x844`, both roots are `311px` and render one column. At `768x1024`,
  both are `657px` and render two. Studio's review canvas is `836px`/three
  columns at `1280x900` and `1,056px`/four at `1600x1000`; Exhibit remains a
  deliberately narrow two-column artwork panel at those viewports. No measured
  component/page overflow occurs in the default four views.
- Studio maps Wide columns `6` to `data-columns="6"` and six actual tracks, and
  maps `2` back to two. Six-column wrapping remains an explicit human-review
  item rather than a hidden automatic exception.
- A `288px` embedded root renders one column without overflow. One supplied item
  occupies the first of four normal tracks rather than stretching. Zero items
  leave an empty native list and add no Grid status or focus state.
- The content stress case combines an unbroken 68-character title, long French
  vendor, Arabic title, mixed Spanish/Japanese content, mixed currencies, and a
  missing image request. Product Card fallback renders and Grid/page horizontal
  overflow stays false at 390px.
- RTL preserves root/list bounds and all six DOM items. The docs shell itself is
  not an RTL product surface, so only component bounds are asserted.
- Dark mode resolves the Product Card surface to `rgb(23, 23, 23)` without Grid
  overrides. In forced colors the focused Product Card receives a solid `4px`
  outline with `2px` offset. Under reduced motion, Product Card and image
  transition durations are both `0s`.
- Sequential Tab navigation reaches all six title links in DOM order:
  Quiet Form, Tall vessel, Cuenco de gres, Chawan, Porcelain Fold, Night Archive.
- Four before, eight viewport-after, and six special images are stored under
  `output/playwright/refinement-batch-35/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Neutral root, native list/items, canonical Product Cards, `data-columns`, CSS-only container response. | Implemented, generated, validated and browser-tested. |
| Shopify | Paginated `collection.products`, localized `columns` and page-size settings, native list/items, canonical Product Card snippets, target-owned sort/filter/pagination. | Implemented `section-adapter`; CSS, Liquid, schema, data, behavior, composition and editor layers report ready. |
| React / Angular | Wrapper, `ul`/`li`, Product Card children, bounded integer `columns`; no state/events. | Contract proves the model; packages remain planned. |
| Figma | Repeated Product Card instances with wide-column control and responsive layout variants. | Planned; no component-specific owner artwork exists. |
| SwiftUI / Compose | Target-native list/grid with canonical Product Card view and density mapped from available width. | Conceptual; DOM and Liquid details do not leak. |

## Performance And Risks

- Collection CSS is `2,258 B / 2.5 KiB`, leaving `302 B`; Batch 35 adds `70 B`.
- Complete Web component CSS is `65,517 B / 64 KiB`, leaving `19 B`; Batch 35
  adds `42 B`. This ceiling is effectively exhausted.
- Shared runtime is `10,492 B / 8 KiB`, the existing `2,300 B` exception.
  Collection Grid adds `0 B`, no neutral request and no execution work.
- Human review must approve grid gap, page padding, one/two/three/wide density,
  six-column readability, collection rhythm, and the inherited Product Card
  crop/visual candidate.
- Product Card visual/media changes require refreshed Grid evidence. Separate
  mobile/desktop merchant density, live result lifecycle, list view, masonry,
  infinite append and virtualization require explicit future decisions.

## Validation

Registry/docs, DTCG/Web component-token compatibility, 183 contracts, 183
Studio definitions, Neutral Web and Shopify adapter builds and validators,
Shopify Liquid validation of the section and four locale/schema files,
generated/source identity, static Preview audit, structural certification,
exact Exhibit/Studio parity, semantic DOM, Studio property mapping, empty/one/
six-column and embedded modes, four viewports, localized/unbroken/missing-media
content, light/dark, RTL component bounds, forced colors, reduced motion, focus
order, deterministic gzip, global refinement audit, diff checks, a temporary
site build outside `site/dist`, and explicit `site/dist` cleanliness comprise
Batch 35. `site/dist` was not rebuilt or modified.
