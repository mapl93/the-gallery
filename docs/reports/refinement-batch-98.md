# Refinement Batch 98 — Address Book

Status: Refined; action policy, Shopify account architecture, and human visual
review required; remains `pilot`

Date: 2026-07-17

Component: Address Book (`U6`, dependency order `111`)

## Outcome

Batch 98 replaces divergent Exhibit/Studio trees and parallel default/add-action
styling with one passive native saved-address list. The shared composition uses
canonical Badge for readable default truth and canonical Buttons for contextual
record/add actions. Postal data uses paragraphs and direction-aware line spans,
not the HTML `address` element.

Exhibit and Studio now use the same `AddressBookArtwork`, fixture, DOM, and
two-property API. U6 owns no account or mutation state and adds no runtime.
Shopify stays intentionally planned until the owner selects hosted latest
accounts/extensions and B2B behavior, authenticated headless Customer Account
API, deprecated Liquid compatibility, or omission.

## Delivered

- Permanent U6 dossier, detailed audit, ADR 0189, Shopify adapter boundary, and
  explicit action/account/B2B questions.
- Contract `0.2.0`, corrected Badge/Button dependency graph, Studio metadata,
  MDX, Account CSS, registry, and generated adapter reconciliation.
- Native `ul/li`, paragraph postal content, six `dir=auto` nodes, at-most-one
  readable default Badge, record-specific accessible names, native Buttons, and
  external fixture feedback.
- Two stable semantic properties, fifteen U6 tokens, named-container intrinsic
  one/two-column response, private track/add dimensions, and zero U6 runtime.
- Retained four-image baseline plus Mobile/Tablet/Desktop/XL per mode,
  equal-container parity, invalid required-collection rejection, optional add
  omission, keyboard activation/focus, narrow and localized RTL/200px content,
  effective 200 percent, light/dark, forced colors, and reduced motion evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static audit covers 250 previews with zero errors.
- Exhibit and Studio serialize exact identical U6 DOM. At an equal `480px`
  component width, their complete selected computed-style signatures match.
- One native list, three list items, two saved records, one Badge, three Buttons,
  four paragraphs, zero custom widget roles/tabindex/HTML `address`, and zero U6
  live regions pass.
- Tab order, Enter/Space activation, contextual names, external feedback, record
  invariants, optional add omission, invalid collection omission, and restore
  behavior pass.
- Four viewports, direct `320px`, localized RTL/unbroken `200px`, effective 200
  percent, light/dark contrast, forced colors, reduced motion, and zero
  U6/document overflow pass.
- Shopify official validation passes. U6 remains `css-ready`, `ready:false`, and
  global target-ready count remains 79 because account architecture is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closed both and left port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U6 CSS slice | `676 B` | `661 B` | component observation | `-15 B`; duplicate default/add interaction states removed |
| Account CSS | `2,873 B` | `2,871 B` | `3,072 B` | pass; `201 B` headroom |
| Neutral Web component CSS | `68,342 B` | `68,366 B` | `65,536 B` | existing program gap `2,830 B`; batch delta `+24 B` compressed |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U6 delta `0 B` |
| Shopify U6 runtime | `0 B` added | `0 B` added | target observation | no account-architecture-dependent behavior added |

Account CSS SHA-256 is
`6e0f08c5cf61dc9268fab75278e4a95ff638a64e9a1a818aa4fa188195365e36`;
the U6 slice SHA-256 is
`5e79f1306a74485eed9d3d826bf016a37601badab493e532466346dd2c92ca56`.

## Risks And Open Questions

- Owner input is required on which edit/delete/set-default/select actions exist,
  whether they navigate or mutate, and which pending/error/confirmation/recovery
  and focus-restoration policy applies.
- Owner input is required on Shopify hosted latest accounts/extensions and B2B,
  headless Customer Account API, explicit deprecated Liquid compatibility, or
  target omission.
- Human review must approve record density/surface, Badge placement, action
  hierarchy, add treatment, track minimum, fixture content, final visuals, and
  corrected U6-specific Figma artwork.
- Targets must own protected-data authorization/minimization, locale formatting,
  address scope/order/limits, default truth, loading/empty/error/expired states,
  mutation lifecycle, privacy, telemetry, and analytics.
- Complete Neutral Web CSS and shared runtime remain above their existing
  program ceilings; U6 adds no runtime but adds `24 B` compressed global CSS.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive,
adapter, performance, and evidence work is complete, but action/mutation policy,
the selected Shopify account profile and B2B behavior, and human visual/product
decisions determine cross-target completion. U6 is not yet human-review-ready
across targets and remains `pilot`; no automatic `stable` promotion was made.
