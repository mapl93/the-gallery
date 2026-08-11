# Refinement Batch 99 — Address Form

Status: Refined; Form dependency, address policy, Shopify account architecture,
mutation lifecycle, and human visual review required; remains `pilot`

Date: 2026-07-17

Component: Address Form (`U7`, dependency order `112`)

## Outcome

Batch 99 replaces divergent MDX/Studio form trees, unnamed/duplicated responsive
rules, missing submission names, and a second local Select widget with one
native form shell. The shared composition uses canonical Input, the native
canonical Select base, and canonical Buttons. Five fixture controls now have
stable names, explicit labels, valid autocomplete purposes, native required
validation, and honest explicit-submit behavior.

Exhibit and Studio now use the same `AddressFormArtwork`, fixture state, DOM, and
two-property API. U7 owns no address schema, validation service, mutation, or
account state and adds no runtime. Shopify stays intentionally planned until
the owner selects hosted latest accounts, authenticated headless Customer API,
deprecated Liquid compatibility, or omission. Formal Form dependency remains
open rather than being inferred.

## Delivered

- Permanent U7 dossier, detailed audit, ADR 0190, Shopify adapter boundary, and
  explicit Form/address/account/lifecycle questions.
- Contract `0.2.0`, registry, Studio metadata, MDX, Account CSS, shared renderer,
  and generated adapter reconciliation.
- Native form/required validation/FormData, five names and autocomplete purposes,
  canonical Input/native Select/Button composition, and external fixture
  feedback.
- Two stable semantic properties, three public spacing tokens, named-container
  one/two-column response, private measure/query values, and zero U7 runtime.
- Retained four-image baseline plus Mobile/Tablet/Desktop/XL per mode,
  equal-container parity, native invalid focus, explicit submit, no-auto-submit
  Select, cancel isolation, optional action omission, keyboard focus, direct
  320/200px, localized RTL, effective 200 percent, light/dark, forced colors,
  and reduced motion evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static audit covers 250 previews with zero errors.
- Exhibit and Studio serialize exact identical U7 DOM. At an equal `480px`
  component width, normalized DOM and selected computed-style hashes match.
- One native form, five named/required/labelled controls, five correct
  autocomplete purposes, one native Select, zero author widget roles/enhanced
  Select copies, and zero U7 live regions pass.
- Native invalid blocking/focus, Tab focus, country selection without submit,
  five-field FormData, explicit submit, external feedback, cancel restore, and
  optional action omission pass.
- Four viewports, direct 320/200px, localized RTL/unbroken content, effective
  200 percent, light/dark contrast, forced colors, reduced motion, and zero
  U7/document overflow pass.
- Shopify official validation passes. U7 remains `planned`, `ready:false`, and
  global target-ready count remains 79 because account architecture is
  deliberately unresolved.
- Browser evidence used one named headless session, one tab, and one managed
  server at a time; final cleanup closed both and left port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U7 CSS slice | `282 B` | `405 B` | component observation | `+123 B`; explicit intrinsic/logical/container contract replaces hardcoded and duplicate queries |
| Account CSS | `2,871 B` | `2,920 B` | `3,072 B` | pass; `152 B` headroom |
| Neutral Web component CSS | `68,366 B` | `68,452 B` | `65,536 B` | existing program gap `2,916 B`; batch delta `+86 B` compressed |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U7 delta `0 B` |
| Shopify U7 runtime | `0 B` added | `0 B` added | target observation | no account-architecture-dependent behavior added |

Account CSS SHA-256 is
`c11b0b4a9a42f48579ca7667135a7058fd2eacd8f1612129d47c3fdf9d1f02cb`;
the U7 slice SHA-256 is
`8c0ed9f156bd3fab3e4c89c9a3c92ef2e83d23a9e8ebc5823549e4ff26f52728`.

## Risks And Open Questions

- Owner architecture input is required on formal Form dependency versus the
  retained direct native form shell around Input, Select, and Button.
- Owner product/target input is required on address fields, locale order,
  billing/shipping scope, requiredness, country/zone dependencies, and dirty-
  state cancellation.
- Owner architecture input is required on Shopify hosted latest accounts,
  authenticated headless Customer API, explicit deprecated Liquid
  compatibility, or target omission.
- Targets must own authentication, field mapping, validation/user errors,
  pending/disabled state, first-invalid/error-summary focus, cancellation,
  success routing, feedback, privacy, telemetry, and analytics.
- Human review must approve max measure, spacing, row threshold, action
  alignment, fixture copy, final visuals, and corrected U7-specific Figma
  artwork.
- Complete Neutral Web CSS and shared runtime remain above their existing
  program ceilings; U7 adds no runtime but adds `86 B` compressed global CSS.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive,
adapter, performance, and evidence work is complete, but Form dependency,
address/cancellation policy, selected Shopify profile, mutation lifecycle, and
human visual/product decisions determine cross-target completion. U7 is not yet
human-review-ready across targets and remains `pilot`; no automatic `stable`
promotion was made.
