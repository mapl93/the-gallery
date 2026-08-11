# Refinement Batch 61: Featured Collection

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 61 turns S2 into a truthful passive merchandising composition. A required
visible title names a native product list; each record consumes the canonical
Product Card; the optional collection action consumes Link; Grid and Carousel
reuse their accepted source contracts; Spotlight owns only first-record parent
layout. Empty/partial composition is omitted coherently and fixture navigation
is real.

The batch also adds the dedicated Shopify Section Adapter named in the accepted
target direction. Collection choice, product limit, order, inventory, price
freshness and commercial spotlight policy remain target concerns and do not
expand the neutral five-property API.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Dependencies are Link, Carousel, Product Card and Collection Grid.
- Root/list naming and `ul`/`li` anatomy replace the unlabelled repeated `div`.
- `ProductCardArtwork` replaces the reduced local Product Card duplication.
- Studio-only columns, portrait crop, responsive repair and Carousel layout are
  removed; source CSS owns the candidate.
- Grid, Carousel and Spotlight preserve target-supplied DOM/source order and
  add no neutral controller or state.
- Shopify receives localized schema/storefront strings, canonical Product Card
  rendering and five minimal merchant settings.
- ADR 0146 records the passive composition and target data boundary.

## Browser Evidence

- Exhibit and Studio normalized initial root DOM is exactly equal: `6,883`
  characters, FNV-1a `beda6dcc`.
- Eight paired final viewports cover Mobile, Tablet, Desktop and XL; eight
  special captures cover Carousel, Spotlight, one product, stress/RTL, focus,
  dark, forced colors and effective 200% layout.
- Empty title/products omit S2; either incomplete collection-Link half omits
  only the Link.
- Carousel is a focusable named native list (`677px` client / `1,888px`
  scroll); ArrowRight reaches `640px` with no component runtime.
- Wide Spotlight has four columns and a two-column first record without visual
  or DOM reordering.
- Real pointer and keyboard navigation, focus outline, dark/forced colors,
  reduced motion, localized/extreme content, contrast and overflow checks pass.
- Fresh browser console inspection reports zero errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,407 B` | `6,464 B` | `6,861 B` | pass; `397 B` remaining |
| Neutral Web component CSS | `66,440 B` | `66,551 B` | `65,536 B` | existing gap `1,015 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; `0 B` added |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, temporary Vite production build, official
Shopify Liquid revision 1, real-browser matrix, deterministic budgets,
source/generated identity, console, diff and `site/dist` checks pass. Shopify
reports S2 `implemented`, every required maturity layer ready, no dead settings
and `ready: true`; its remaining maturity warnings concern other planned
components.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve Grid density, heading/action rhythm and section spacing.
2. Approve Carousel width/peek/affordance and Spotlight emphasis.
3. Approve the inherited Product Card visual candidate.
4. Confirm the neutral API and minimal Shopify settings.
5. Define commercial collection/order/spotlight policy in each consumer.
6. Add component-specific Figma examples after browser approval.

See `docs/refinement/dossiers/featured-collection.md`,
`docs/reports/featured-collection-web-refinement-audit.md`, and ADR 0146.

## Program Position

After Batch 61, the program has 102 dossiers and 89 components ready for human
review. All 183 automated gates pass. The graph has 128 declared dependency
edges, maximum depth 3, no missing dependencies and no cycles. The next
dependency-safe component is Image with Text (S3, review order 163).
