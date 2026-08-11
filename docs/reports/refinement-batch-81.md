# Refinement Batch 81 — Policy Page Template

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Policy Page Template (`P3`, dependency order `182`)

## Outcome

Batch 81 replaces an incomplete generic legal-page shell with a passive,
self-contained policy document. Non-empty title/body gate rendering; exact date
semantics are independent from localized visible copy; optional in-page
navigation is named, ordered and composed from canonical Link; the target owns
the semantic body and complete content lifecycle.

Exhibit and Studio share exact normalized markup, fixture and canonical CSS.
Responsive behavior is component-container-driven. Shopify gains a strict
reusable snippet mapping a real `policy` object's title/body while neutral P3
adds zero runtime and invents no route, template, date or index.

## Delivered

- Permanent P3 dossier, detailed audit and ADR 0162.
- Contract `0.3.0`, direct Link dependency, registry, Studio metadata and MDX
  reconciliation.
- Shared contextual article renderer with strict required and conditional
  optional omission, native exact date and target-ranked body sections.
- Complete semantic document-flow CSS, explicit wide-content overflow hook,
  named container response and removal of the P3 Studio geometry fork.
- Truthful Shopify `policy` snippet plus adapter inference support for Liquid
  `{% doc %}` blocks.
- Paired before baseline and Mobile/Tablet/Desktop/XL after evidence plus RTL/
  long, 200%, dark, forced-colors and reduced-motion captures.
- Regenerated Neutral Web, Webflow and Shopify assets/manifests.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate.
- The global matrix now records 122 dossiers and 105 components ready for human
  review across 183 components and 138 dependency edges.
- One document main, labelled contextual article, exact native time, optional
  named index, ordered canonical Links, unique targets and contextual body
  hierarchy are confirmed.
- Empty title/body and incomplete date/index combinations follow the strict
  omission rules; real fragment navigation and visible keyboard focus pass.
- Direct `200/320/520/1120px` hosts, four viewports, Arabic RTL/long, effective
  200%, light/dark, forced colors and reduced motion remain contained.
- Exhibit and Studio normalized complete outer HTML is exactly equal.
- Canonical/Webflow/Shopify Pages CSS is source-identical; P3 owns zero neutral
  runtime.
- Shopify CLI `3.92.1` full Theme Check has zero P3 offenses; four errors and 55
  warnings remain in the unrelated theme baseline.
- Both bounded Playwright/server evidence phases were closed immediately; port
  `4173` is free, no owned browser/server process remains and `site/dist` is
  untouched.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Pages + Coming Soon CSS | `3,783 B` | `4,099 B` | `5,427 B` | pass; `1,328 B` remaining |
| Neutral Web component CSS | `67,304 B` | `67,626 B` | `65,536 B` | existing gap `2,090 B`; batch delta `+322 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P3 delta `0 B` |

Canonical/Webflow/Shopify Pages copies share SHA-256
`997b194efbab43034d9226f2f7f96802660860eec8f969f3cbff9ead42feb380`.

## Risks And Open Questions

- Blocking technical implementation decisions: none.
- Human review must approve article measure, hierarchy, date tone, index
  treatment, content rhythm, wide-content treatment and the six-property API.
- Policy content, revisions, effective dates, localization, types, stable ids,
  trust/sanitization and publishing remain architecture/product decisions.
- Generated/sticky/current-section index behavior remains target-owned and
  unapproved.
- Shopify policy inventory integration, P3-specific Figma evidence and
  framework/native adapters remain absent.
- Existing total Web CSS/runtime and full-theme Shopify findings remain global
  program gaps, not P3 neutral runtime or target offenses.

## Readiness Decision

`human-review-ready`. Research, canonical source refinement, truthful target
translation, evidence and component-scoped gates are complete. Contract stays
`pilot`; no stability promotion was made.
