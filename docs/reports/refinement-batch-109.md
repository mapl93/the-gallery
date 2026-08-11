# Refinement Batch 109 — Truthful Product Info Projection

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Component: Product Info (`D3`, dependency order `59`)

Accepted decision: D3-A / ADR 0239

## Outcome

Batch 109 closes Product Info's previously open projection and target-coordinator
boundaries. Product Info remains passive and accepts either truthful unresolved
product data or an exact selected-variant projection. One page or Quick View
coordinator owns all dependent updates and at most one localized status.

Shopify now renders product Price ranges only before resolution, exact variant
Price/SKU/inventory/availability afterward, merchant-reorderable/app-compatible
Main Product blocks, and a target-only granular Section Rendering coordinator.
Neutral Web and the shared Exhibit/Studio renderer remain independent of Shopify.

## Delivered

- Accepted ADR 0239 and supersession notes for the former open boundary.
- Product Info contract `0.3.0`, registry/docs/Studio projection updates, renewed
  dossier and certification audit.
- Shopify Price, Product Info and Product Form exact-variant mapping.
- Shopify Main Product block composition and one stable update-status owner.
- Target-only coordinator with granular option ids, bounded render replacement,
  cancellation, focus restoration, URL/structured-data synchronization, event
  output and disconnected-root cleanup.
- Localized range, SKU, inventory, availability and update messages.
- Regenerated Neutral Web and Shopify adapters; `site/dist` untouched.

## Verification Summary

- Product Info Exhibit/Studio outer HTML is exactly equal (`1,460` characters).
- Eight primary Mobile/Tablet/Desktop/XL captures cover Exhibit and Studio.
  Special evidence covers optional omission, long Arabic RTL, dark, forced
  colors/reduced motion and 200% zoom.
- One canonical Price remains when description and metadata are omitted.
- No component overflow occurs in any primary viewport, RTL or zoom case.
- Product Info owns no live region, tab stop, state, listener or neutral runtime.
- Deterministic Shopify Section Rendering responses prove exact `variant=222`
  and unresolved `option_values=11` URL states, synchronized Price/metadata/
  structured data, focus restoration, one status and target event detail.
- Browser console reports zero errors and zero warnings.
- One managed fixed-port server, one headless Playwright session and one tab were
  used. Cleanup reports port 4173 free, server stopped and session closed.
- Contract, Studio, docs, decision, Web/Shopify adapter and syntax validators
  pass. Theme Check reports no findings in modified Product Info files.
- Structural certification remains `183/183`; refinement readiness advances to
  `137` components after the final audit.

## Budgets

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap |
| Shopify product coordinator | `2,075 B` | target evidence | target-only; no neutral delta |

The performance audit reports 18 surfaces, 10 pass and 8 documented gaps, with
zero undocumented gaps. No ceiling was raised.

## Evidence

Manifest:
`output/playwright/refinement-product/product-info-0239/manifest.json`.

The Shopify coordinator proof is a deterministic local Section Rendering harness,
not a live store. It verifies the adapter contract without opening another server,
browser or tab.

## Risks And Open Questions

- Approve title/vendor/subtitle hierarchy, typography, spacing, metadata density
  and rich-description styling.
- Document and validate sanitizer/allowed-embed policy per target.
- Run live Shopify integration with real high-variant, unavailable, media,
  selling-plan and app-block data before target release.
- Reduce or explicitly accept the existing neutral CSS/runtime distribution gaps
  before v1 packaging.

## Readiness Decision

Product Info is `human-review-ready`. Semantic ownership, truthful projection,
accessibility, responsive behavior, target translation, runtime boundary and
Exhibit/Studio parity are reconciled. Human visual review remains pending; no
`stable` promotion is authorized.
