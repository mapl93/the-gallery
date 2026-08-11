# Refinement Batch 96 — Order History

Status: Refined; commerce-status and Shopify account architecture plus human
visual review required; remains `pilot`

Date: 2026-07-17

Component: Order History (`U4`, dependency order `109`)

## Outcome

Batch 96 replaces divergent article/span trees and duplicated Link/Badge/status
visuals with one conditional semantic shell: a named section when `label` is
present, an ordinary div when it is absent, and a required native list of order
summaries composed from canonical Link and Badge, `time[datetime]`, and `bdi`.

Exhibit and Studio use the same `OrderHistoryArtwork`, fixture, DOM, and two-
property API. Shopify stays intentionally planned until the owner selects the
hosted latest-account Order index/extensions, headless Customer Account API,
deprecated Liquid compatibility, or omission profile. Target financial and
fulfillment truth is projected to readable Badge content without becoming U4
states.

## Delivered

- Permanent U4 dossier, detailed audit, ADR 0187, Shopify adapter boundary, and
  explicit account/status questions.
- Contract `0.2.0`, corrected Link/Badge dependency graph, Studio metadata, MDX,
  Account CSS, registry, and generated adapter reconciliation.
- Conditional section/div root, native `ul/li`, descriptive canonical Links,
  semantic dates, passive readable canonical Badges, isolated formatted totals,
  strict required-content omission, and no grid/table widget roles.
- Two stable semantic properties, eleven U4 tokens, named container response,
  private one/two/four-area layouts, and zero U4 runtime.
- Retained four-image baseline plus Mobile/Tablet/Desktop/XL per mode, two/four-
  area containers, optional-name omission, activation feedback, keyboard focus,
  localized RTL/200px, effective 200 percent, light/dark, forced colors, and
  reduced-motion final evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static audit covers 250 previews with zero errors.
- Exhibit and Studio serialize exact identical U4 DOM. At an equal `520px`
  component width, their complete computed-style signatures are identical.
- Section/div conditional semantics, native list/items, three descriptive Links,
  three semantic dates, three canonical Badges, three `bdi` totals, three focus
  stops, external demo feedback, blank-label behavior, disabled required Orders
  control, and zero grid/table roles/live regions pass.
- Four viewports, direct `520px` two-track and `720px` four-area modes, localized
  RTL/unbroken content at `200px`, effective 200 percent, contrast, forced
  colors, reduced motion, and zero U4/document overflow pass.
- Shopify official validation passes. U4 remains `css-ready`, `ready:false`, and
  global target-ready count remains 79 because account architecture is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closed both and left port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U4 CSS slice | `675 B` | `665 B` | component observation | `-10 B`; native-list/container areas added while duplicated Link/Badge/status/viewport rules were removed |
| Account CSS | `2,999 B` | `3,009 B` | `3,072 B` | pass; `63 B` headroom |
| Neutral Web component CSS | `68,372 B` | `68,458 B` | `65,536 B` | existing program gap `2,922 B`; batch delta `+86 B` compressed and `-275 B` raw |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U4 delta `0 B` |
| Shopify U4 runtime | `0 B` added | `0 B` added | target observation | no account-architecture-dependent no-op behavior added |

Account CSS SHA-256 is
`721d0c165f9c2283e9561963e9bcf385956f3109c1be90eb28651dcd79f20cf7`;
the U4 slice SHA-256 is
`4e048d82755306f12d74e9d7ad4548d33d61f7819849b1508e70bfca418db1c2`.

## Risks And Open Questions

- Owner input is required on financial versus fulfillment status truth,
  combined versus multiple labels/Badges, and partial/refund/return/cancellation
  projections.
- Owner input is required on Shopify hosted latest accounts/extensions,
  headless Customer Account API, explicit deprecated Liquid compatibility, or
  target omission.
- Human review must approve row density, separators, typography, alignment,
  Badge projection, responsive thresholds, fixture content, list versus table
  product needs, and corrected U4-specific Figma artwork.
- Targets must own auth, order data, sort/filter/pagination, loading/error/empty/
  expired states, destinations, formatting, live updates, focus/announcements,
  privacy, telemetry, and analytics.
- Account CSS retains only `63 B` gzip headroom; later account components need
  continued duplicate-rule reclamation or an explicit budget decision.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive,
adapter, performance, and evidence work is complete, but commerce status truth,
the selected Shopify account profile, and human visual/product decisions
determine cross-target completion. U4 is not yet human-review-ready across
targets and remains `pilot`; no automatic `stable` promotion was made.
