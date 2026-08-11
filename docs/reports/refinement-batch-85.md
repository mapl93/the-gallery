# Refinement Batch 85 — Discount Field

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Discount / Promo Field (`K4`, dependency order `98`)

## Outcome

Batch 85 makes K4 the native, target-controlled discount-code composition for
Web and documents an executable Shopify translation. Native details/summary
owns disclosure, canonical Input owns label/value/validation, canonical Button
owns action states, and the target supplies the confirmed code list and commerce
result.

The obsolete one-code API, custom disclosure controller, duplicated Input
markup, forced uppercase and 28px icon-only removal action are removed. Exhibit
and Studio share one renderer and fixture. K4 remains independent of Shopify,
React, Figma and future targets.

## Delivered

- Permanent K4 dossier, detailed audit and ADR 0176.
- Contract `0.2.0`, registry, Studio metadata, MDX and canonical Cart CSS
  reconciliation.
- Shared `InputArtwork` and `DiscountFieldArtwork` consumed by Exhibit and
  Studio with one DOM, dependency composition and target-owned feedback boundary.
- Localized `discount-field.liquid`, standard storefront action controller and
  Main Cart composition outside the existing native cart form.
- Four viewports per mode plus invalid, applied codes, localized 200px RTL,
  dark, reduced motion, forced colors and effective 200% zoom evidence.
- Regenerated Neutral Web, Webflow and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; Exhibit and Studio remain structurally shared across all 183.
- Exact K4 subtree parity, native disclosure/form/list semantics, associated
  Input error, preserved candidate, contextual removal, 44px target, focus
  return, apply disabled/busy and no K4 live region are confirmed.
- Official Shopify validation passes Discount Field, Main Cart, both locales
  and its target controller. Standard actions hydrate and replace confirmed
  code records without treating Liquid as the sole manual-code truth.
- Canonical, Webflow and Shopify Cart CSS copies are byte-identical.
- Browser/server evidence is closed: port 4173 is free and no owned Playwright
  session or Gallery server remains.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K4 CSS slice | `573 B` | `711 B` | component slice observation | `+138 B`; native anatomy/list/44px action |
| Cart CSS | `3,063 B` | `3,062 B` | `3,072 B` | pass; `10 B` remaining |
| Neutral Web component CSS | `67,821 B` | `67,871 B` | `65,536 B` | existing gap `2,335 B`; batch delta `+50 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K4 delta `0 B` |
| Shopify K4 runtime | `0 B` | `1,668 B` | target observation | dedicated standard-action controller |

Cart CSS SHA-256 is
`0fe732dd671d54f852a6bfb3120f9751253223ed9f2914dcee028e4395aba28e`;
K4 slice SHA-256 is
`c68b30dbb606c0986fad7288016adb9a124cf334a490f3acb2eafb7d60b18bb5`.

## Risks And Open Questions

- Blocking neutral technical decisions: none.
- Human review must approve native marker/prominence, Input/Button balance,
  rhythm, code-row treatment, removal emphasis and stacking threshold.
- Normalization, allowed characters, stack/replace policy, maximum count,
  applicability wording, retry/stale-cart handling, totals refresh, status,
  focus and analytics remain target/product choices.
- Shopify remains planned until configured/default action behavior, live cart
  refresh, editor rendering, warnings/errors and production performance are
  proven in a real store.
- Existing total Web CSS/runtime gaps remain program gaps. Cart CSS is within
  its ceiling by only `10 B`; later Cart work must recover family budget first.

## Readiness Decision

`human-review-ready`. Research, canonical composition, target translation,
special-mode evidence and component-scoped gates are complete. Contract stays
`pilot`; no stability promotion was made.
