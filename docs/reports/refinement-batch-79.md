# Refinement Batch 79 — 404 Page

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: 404 Page (`P1`, dependency order `180`)

## Outcome

Batch 79 replaces a nested-main, page-specific field/action/link composition
with a contextual missing-resource section composed from canonical Empty State,
Input, Button and Link. Required content and at least one recovery path now gate
rendering; native search validation, truthful local feedback, real destinations
and a native suggestion list replace hidden-only/no-op fixtures.

Exhibit and Studio share exact normalized markup and fixtures. Responsive
behavior is component-container-driven. Shopify retains platform-owned 404
response/search/routing while gaining localized canonical P1 composition. P1
adds zero neutral runtime.

## Delivered

- Permanent P1 dossier, detailed audit and ADR 0160.
- Contract `0.3.0`, registry dependency/token audit, Studio metadata and MDX.
- Shared contextual renderer with strict required/recovery omission and no
  nested main.
- Canonical Empty State/Input/Button/Link composition, real navigation and
  target-owned truthful search feedback.
- Container-responsive canonical CSS with no P1 Studio layout fork.
- Localized Shopify JSON-template section mapping with real search and two
  semantic editor toggles.
- Before baseline plus paired Mobile, Tablet, Desktop and XL after evidence;
  RTL/long, 200%, dark, forced-colors and reduced-motion captures.
- Regenerated Neutral Web, Webflow and Shopify assets/manifests.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate.
- The global program matrix now records 120 dossiers and 103 components ready
  for human review across 183 components and 135 dependency edges.
- One visible document main, contextual P1 section, hidden redundant code,
  visible Input label, named required search field, native list and zero fake
  fragment destinations are confirmed.
- Native empty/valid search, real navigation, focus order and local truthful
  feedback pass.
- Direct `200/320/520/1120px` hosts, four viewports, Arabic RTL/long/unbroken,
  effective 200%, light/dark contrast, forced colors and reduced motion remain
  contained.
- Exhibit and Studio normalized complete outer HTML is exactly equal.
- Canonical/Webflow/Shopify Pages CSS is source-identical; P1 owns zero neutral
  runtime.
- Shopify CLI `3.92.1` isolated P1 Theme Check reports zero offenses; four
  unrelated full-theme baseline errors remain recorded.
- The single Playwright session and single strict Vite server were closed;
  ports `4173` and `5173` are free and `site/dist` remains untouched.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Pages + Coming Soon CSS | `3,503 B` | `3,632 B` | `5,427 B` | pass; `1,795 B` remaining |
| Neutral Web component CSS | `67,007 B` | `67,099 B` | `65,536 B` | existing gap `1,563 B`; batch delta `+92 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P1 delta `0 B` |

Canonical/Webflow/Shopify Pages copies share SHA-256
`0687af5e1825bf7b6ba40b027fce5979010efb7b98c99f7f0c135703871ae07e`.

## Risks And Open Questions

- Blocking implementation decisions: none for technical refinement.
- Human review must approve layout/hierarchy/code/illustration/search/
  suggestions, the seven-property API and the at-least-one-recovery rule.
- HTTP/cache/router/search/suggestion/localization/analytics remain target
  product decisions.
- Contextual heading ownership remains open; Shopify intentionally retains the
  accepted Empty State H3 gap and P1 remains pilot.
- P1-specific Figma evidence and framework/native adapters remain absent.
- Existing total Web CSS/runtime and full-theme Shopify findings remain global
  program gaps, not P1 runtime or target offenses.

## Readiness Decision

`human-review-ready`. Research, canonical source refinement, target translation,
evidence and component-scoped gates are complete. Contract stays `pilot`; no
stability promotion was made.
