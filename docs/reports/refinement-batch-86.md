# Refinement Batch 86 — Free Shipping Bar

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Free Shipping Bar (`K5`, dependency order `99`)

## Outcome

Batch 86 makes K5 the passive target-controlled free-shipping composition for
Web. It consumes canonical Progress, requires localizable message/range
semantics, derives achieved state and keeps every commercial calculation in the
target. The obsolete parallel track/fill, hardcoded English name and independent
achieved boolean are removed.

Exhibit and Studio share one Free Shipping Bar renderer and fixture; canonical
Progress also consumes the extracted shared Progress renderer. K5 remains
independent of Shopify, React, Figma and future targets.

## Delivered

- Permanent K5 dossier, detailed audit and ADR 0177.
- Contract `0.2.0`, registry, Studio metadata, MDX and canonical Cart CSS
  reconciliation.
- Shared `ProgressArtwork` and `FreeShippingBarArtwork` consumed by Exhibit and
  Studio with canonical dependency anatomy and one derived range model.
- Parameter-driven `free-shipping-bar.liquid` that passes the official validator
  without selecting a subtotal/total, threshold, placement or refresh policy.
- Four viewports per mode plus achieved, localized 200px RTL, dark, reduced
  motion, forced colors and effective 200% evidence.
- Regenerated Neutral Web, Webflow and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; Exhibit and Studio remain structurally shared across all 183.
- Exact `439`-character K5 subtree parity, passive root, named canonical
  progressbar, synchronized clamp, derived achieved state, invalid omission,
  no live region and no visible duplicate value line are confirmed.
- Responsive widths, RTL/localized wrapping, `7.81:1` message contrast,
  `9.51:1` fill/track contrast, dark, reduced motion, forced colors and effective
  200% behavior pass with one browser tab and zero current console errors.
- Shopify Liquid receives explicit parameters only and passes official plus
  repository validation; target status remains planned pending product/editor/
  live-store decisions.
- Canonical, Webflow and Shopify Cart CSS copies are byte-identical.
- Browser/server evidence is closed: port 4173 is free and no owned Playwright
  session or Gallery server remains.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K5 CSS slice | `423 B` | `411 B` | component slice observation | `-12 B`; canonical Progress reuse |
| Cart CSS | `3,062 B` | `3,005 B` | `3,072 B` | pass; `67 B` remaining |
| Neutral Web component CSS | `67,871 B` | `67,838 B` | `65,536 B` | existing gap `2,302 B`; batch delta `-33 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K5 delta `0 B` |
| Shopify K5 snippet | `0 B` | `830 B` | target observation | parameter-only Liquid; no runtime |

Cart CSS SHA-256 is
`80f75cd28e4b18fc9bd8fbe4e8c4a77e7e26ef8bfafa426bd6bce8712911f130`;
K5 slice SHA-256 is
`6afd12f48d237d391cb5df7aa4d77ba6d2cebafbd0e8f18d14d9a429cc93c10e`.

## Risks And Open Questions

- Blocking neutral technical decisions: none.
- Human review must approve surface, alignment, rhythm, density, canonical
  primary fill, achieved emphasis and removal of success-only color.
- Qualifying amount, threshold, exclusions, discounts/tax/duty/gift-card policy,
  market/currency/destination, wording, placement, refresh, status and analytics
  remain target/product decisions.
- Shopify remains planned until a source of truth, settings ownership, cart
  refresh, editor composition and live-store behavior are explicitly selected
  and proven.
- Existing total Web CSS/runtime gaps remain program gaps. Cart now has `67 B`
  headroom; later Cart work should preserve or increase it.

## Readiness Decision

`human-review-ready`. Research, canonical composition, parameter-driven target
translation, special-mode evidence and component-scoped gates are complete.
Contract stays `pilot`; no stability promotion was made.
