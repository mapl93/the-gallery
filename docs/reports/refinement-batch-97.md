# Refinement Batch 97 — Order Detail

Status: Refined; tracking truth, Shopify account architecture, and human visual
review required; remains `pilot`

Date: 2026-07-17

Component: Order Detail (`U5`, dependency order `110`)

## Outcome

Batch 97 replaces divergent Exhibit/Studio trees and the parallel
`.order-tracking` implementation with one required-title semantic section. The
shared composition uses canonical Steps for optional order progress and
canonical read-only Cart Line Item records for optional purchased products.
Metadata, tracking, and items remain independently optional.

Exhibit and Studio now use the same `OrderDetailArtwork`, fixture, DOM, and
four-property API. U5 owns no commerce state or runtime. Shopify stays
intentionally planned until the owner selects the hosted latest-account Order
status/extensions, headless Customer Account API, deprecated Liquid
compatibility, or omission profile.

## Delivered

- Permanent U5 dossier, detailed audit, ADR 0188, Shopify adapter boundary, and
  explicit tracking/account questions.
- Contract `0.2.0`, corrected Steps/Cart Line Item dependency graph, Studio
  metadata, MDX, Account CSS, registry, and generated adapter reconciliation.
- Required visible title and `section[aria-labelledby]`, semantic fixture date,
  native ordered Steps, one current stage, readable completion, native purchased
  item list, and no cart mutation controls.
- Four stable semantic properties, thirteen U5 tokens, named-container response,
  private stacked/two-column header layout, and zero U5 runtime.
- Retained four-image baseline plus Mobile/Tablet/Desktop/XL per mode,
  equal-container parity, independent optional-region omission, required-title
  omission, keyboard activation/focus, narrow and localized RTL/200px content,
  effective 200 percent, light/dark, forced colors, and reduced motion evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static audit covers 250 previews with zero errors.
- Exhibit and Studio serialize exact identical U5 DOM. At an equal `480px`
  component width, their complete computed-style signatures are identical.
- One labelled section, one semantic date, one four-item ordered progress list,
  two completed stages, one current stage, one native purchased-items list, one
  product Link, zero mutation controls, and zero U5 live regions pass.
- Metadata, tracking, and purchased items can be removed independently; a blank
  required title omits the whole renderer; Reset restores the full fixture.
- Four viewports, a direct `320px` container, localized RTL/unbroken content at
  `200px`, effective 200 percent, contrast, forced colors, reduced motion, and
  zero U5/document overflow pass. Canonical Steps alone owns intentional
  horizontal overflow in very narrow containers.
- Shopify official validation passes. U5 remains `css-ready`, `ready:false`, and
  global target-ready count remains 79 because account architecture is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closed both and left port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U5 CSS slice | `709 B` | `535 B` | component observation | `-174 B`; the duplicate progress system was removed |
| Account CSS | `3,009 B` | `2,873 B` | `3,072 B` | pass; `199 B` headroom |
| Neutral Web component CSS | `68,458 B` | `68,342 B` | `65,536 B` | existing program gap `2,806 B`; batch delta `-116 B` compressed |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U5 delta `0 B` |
| Shopify U5 runtime | `0 B` added | `0 B` added | target observation | no account-architecture-dependent behavior added |

Account CSS SHA-256 is
`9a2372c282043fa0fb9f80e7a1286cc16247aabde9e7b4fb14cb6748b8e45922`;
the U5 slice SHA-256 is
`8beca73ee03aad41f43f0f9056c59a5c51c0fa8b62aed14854f152f59876a16b`.

## Risks And Open Questions

- Owner input is required on which tracking stages exist and whether they
  describe order processing, fulfillment, shipment, pickup, return, or a
  truthful composition of those domains, including partial and split cases.
- Owner input is required on Shopify hosted latest accounts/extensions,
  headless Customer Account API, explicit deprecated Liquid compatibility, or
  target omission.
- Human review must approve title/meta hierarchy, region spacing, progress
  density, narrow horizontal behavior, line-item density, fixture content,
  container threshold, and corrected U5-specific Figma artwork.
- Targets must own authentication, authorization/redaction, data freshness,
  financial/fulfillment/refund truth, loading/error/not-found/expired states,
  destinations, formatting, carrier events, privacy, telemetry, and analytics.
- The complete Neutral Web bundle and shared runtime remain above their existing
  program ceilings even though U5 reduces both its family and global CSS costs.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive,
adapter, performance, and evidence work is complete, but tracking truth, the
selected Shopify account profile, and human visual/product decisions determine
cross-target completion. U5 is not yet human-review-ready across targets and
remains `pilot`; no automatic `stable` promotion was made.
