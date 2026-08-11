# Refinement Batch 84 — Cart Summary

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Cart Summary (`K3`, dependency order `96`)

## Outcome

Batch 84 makes K3 the passive, target-controlled summary composition for Cart
Page. It presents complete target-formatted facts in a native association list,
composes canonical Button disabled/busy behavior, keeps express checkout opaque,
responds to its container and leaves totals, checkout and status policy to the
target.

Component-owned sticky positioning and the docs-only override are removed.
Exhibit, Studio and Cart Page share one renderer; Shopify Main Cart consumes one
dedicated target-native Liquid snippet. Cart Drawer keeps its accepted isolated
compact summary.

## Delivered

- Permanent K3 dossier, detailed audit and ADR 0175.
- Contract `0.2.0`, registry, Studio metadata, MDX and canonical Cart CSS
  reconciliation.
- Shared `CartSummaryArtwork` consumed by K3 and Cart Page with one fixture, DOM,
  Button implementation and target-owned result boundary.
- Localized `cart-summary.liquid` using distinct Shopify subtotal, discount and
  total facts, native checkout submission and opaque provider actions.
- Four-viewports-per-mode evidence plus busy/result/minimal/invalid, localized
  200px RTL, dark/reduced-motion, forced colors and 200% zoom.
- Regenerated Neutral Web, Webflow and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; Exhibit and Studio remain shared across all 183.
- Native region/heading/description-list relationships, total emphasis, Button
  order, no K3 live region and required-part omission are confirmed.
- Checkout activates once; busy disables duplicate activation and uses the
  canonical Button spinner; result/status remains target-owned.
- Official Shopify Liquid validation passes Cart Summary, Main Cart, Cart Line
  Item, Price and Quantity Selector files.
- Canonical/Webflow/Shopify Cart CSS copies are byte-identical.
- Browser/server evidence is closed: port 4173 is free and no owned Playwright
  session or Gallery server remains.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K3 CSS slice | `541 B` | `622 B` | component slice observation | `+81 B`; passive semantics/composition only |
| Cart CSS | `3,021 B` | `3,063 B` | `3,072 B` | pass; `9 B` remaining |
| Global CSS | `4,351 B` | `4,351 B` | `3,789 B` | existing family gap `562 B`; batch delta `0 B` |
| Neutral Web component CSS | `67,755 B` | `67,821 B` | `65,536 B` | existing gap `2,285 B`; batch delta `+66 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K3 delta `0 B` |

Cart CSS SHA-256 is
`c1faf1e6342310b5cf743ba4a60a941d52800d8123b2bc1c712c0037b8275812`;
K3 slice SHA-256 is
`3853abfefc534a5cd68b89d3ca382610b57bd5854787d012ed653f1debc5d311`.

## Risks And Open Questions

- Blocking technical implementation decisions: none.
- Human review must approve surface/radius, title/total hierarchy, row density,
  note strength, checkout prominence, express separation, narrow stacking and
  parent sticky placement.
- Estimate/final policy, tax/duty/shipping qualification, currency/discount
  presentation, snapshot consistency, checkout errors/recovery, announcements,
  focus and analytics remain target/product choices.
- Shopify remains planned until real cart form or Ajax/Section Rendering,
  errors/status, provider controls and editor/live-store behavior are proven.
- Existing total Web CSS/runtime gaps remain program gaps. Cart CSS is within
  its ceiling by only `9 B`; later Cart work must first recover family budget.

## Readiness Decision

`human-review-ready`. Research, canonical composition, target translation,
special-mode evidence and component-scoped gates are complete. Contract stays
`pilot`; no stability promotion was made.
