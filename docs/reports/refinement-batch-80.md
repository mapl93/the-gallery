# Refinement Batch 80 — Gift Card Page

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Gift Card Page (`P2`, dependency order `181`)

## Outcome

Batch 80 replaces a nested-main, ambiguous commerce form and duplicated action
implementation with a contextual issued-card credential composed from
canonical Button and Input. Six required strings gate rendering; copy remains
visible and selectable with truthful success/fallback; details/QR are native;
navigation is real; the form is an absent-by-default pilot target slot.

Exhibit and Studio share exact normalized markup and fixtures. Responsive
behavior is component-container-driven. Shopify gains a dedicated localized
gift-card document with real platform data, QR, Apple Wallet, copy and print
while neutral P2 adds zero runtime.

## Delivered

- Permanent P2 dossier, detailed audit and ADR 0161.
- Contract `0.3.0`, direct Button/Input dependencies, registry, Studio metadata
  and MDX reconciliation.
- Shared contextual renderer with strict required omission, optional slots and
  no nested main.
- Native selectable code/status/details/QR, real navigation, canonical controls
  and media-independent card contrast.
- Container-responsive canonical CSS with no P2 Studio layout fork.
- Target-native Shopify `gift_card.liquid`, EN/ES copy and isolated QR/copy/
  print asset.
- Paired before baseline and Mobile/Tablet/Desktop/XL after evidence plus RTL/
  long, 200%, dark, forced-colors and reduced-motion captures.
- Regenerated Neutral Web, Webflow and Shopify assets/manifests.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate.
- The global matrix now records 121 dossiers and 104 components ready for human
  review across 183 components and 137 dependency edges.
- One visible document main, contextual P2 section, six required render gates,
  optional-part omission, native details/figure and zero fake destinations are
  confirmed.
- Copy success/fallback, exact selection, real navigation, focus order and the
  pilot form's named native required validation pass.
- Direct `200/320/520/1120px` hosts, four viewports, Arabic RTL/long/unbroken,
  effective 200%, light/dark, forced colors and reduced motion remain contained.
- Exhibit and Studio normalized complete outer HTML is exactly equal.
- Canonical/Webflow/Shopify Pages CSS is source-identical; P2 owns zero neutral
  runtime.
- Shopify CLI `3.92.1` isolated P2 Theme Check reports zero offenses; four
  unrelated full-theme baseline errors remain recorded.
- Both brief Playwright/server phases were closed immediately; port `4173` is
  free, no owned browser/server process remains and `site/dist` is untouched.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Pages + Coming Soon CSS | `3,632 B` | `3,783 B` | `5,427 B` | pass; `1,644 B` remaining |
| Neutral Web component CSS | `67,099 B` | `67,304 B` | `65,536 B` | existing gap `1,768 B`; batch delta `+205 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P2 delta `0 B` |
| Shopify target runtime | `0 B` | `594 B` | target-only | isolated QR/copy/print behavior |

Canonical/Webflow/Shopify Pages copies share SHA-256
`5e291258cb404407e93f5b1c2d80fc6294b128e6f8b76301ee14316a910b9267`.

## Risks And Open Questions

- Blocking technical implementation decisions: none.
- Human review must approve layout, card/media/scrim, type, code, QR, spacing,
  action hierarchy, the six-field core and twelve-property API.
- Retention of the pilot `form` slot and dedicated future detail properties
  remain architecture/product decisions.
- Purchase, redemption, balance freshness, accounts, wallet, print, QR data and
  services remain target decisions.
- P2-specific Figma evidence and framework/native adapters remain absent.
- Existing total Web CSS/runtime and full-theme Shopify findings remain global
  program gaps, not P2 neutral runtime or target offenses.

## Readiness Decision

`human-review-ready`. Research, canonical source refinement, target translation,
evidence and component-scoped gates are complete. Contract stays `pilot`; no
stability promotion was made.
