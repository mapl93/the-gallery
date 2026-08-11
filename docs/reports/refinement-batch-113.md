# Refinement Batch 113 — Exact Variant/Market Back In Stock

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Component: Back In Stock Alert (`D8`, review order `74`)

Accepted decision: D8-A / ADR 0243

## Outcome

Batch 113 closes Back In Stock's canonical identity, availability, consent,
state and Shopify architecture questions. One request is tied to the exact
selected variant and current market; only the connected inventory authority
decides when it becomes purchasable. Availability-service consent remains
separate from marketing consent.

The component owns coherent idle, submitting, confirmed and retryable-error
presentation while the target/provider owns persistence and transition truth.
Confirmed keeps the form/context and blocks resubmission. Retryable error keeps
editing and retry available.

## Delivered

- Accepted ADR 0243 and reconciled ADR 0214/open-question wording.
- Back In Stock contract `0.3.0`, registry, MDX and Studio state control.
- Shared renderer with exact variant/market fixture and no false provider claim.
- Semantic confirmed/error feedback surfaces with shape-distinct boundaries.
- Shopify Main Product current-market publication and product coordinator event
  projection alongside the exact selected variant.
- Provider app-block integration/certification guide.
- Human-review-ready dossier and certification audit.
- Eight paired viewport captures, confirmed/error/special-mode evidence and a
  deterministic Shopify app-host replacement proof.
- Regenerated Neutral Web and Shopify adapters; Shopify target-ready count is
  `89`; `site/dist` remains untouched.

## Verification Summary

- Exact Exhibit/Studio normalized DOM hash `31348d8a`; exact style hash
  `1f3cd214`.
- Eight natural viewports and 200/320/480/720px direct hosts have zero root,
  form and document overflow.
- Empty and malformed email block native submit and create no provider status.
- FormData includes email, product fixture, exact variant and current market.
- Preview submit truthfully enters retryable error because no provider exists;
  it never claims waitlist success.
- Submitting makes email read-only, sets form/Button busy, disables submit and
  emits zero repeat submits.
- Confirmed retains one form, uses `role=status`, keeps email read-only but not
  disabled and disables submit.
- Retryable error uses `role=alert`, restores editing and enables submit.
- Shopify bounded replacement updates variant `111 -> 222`, market
  `market-a -> market-b`, app-block DOM, visible URL/status and emitted event.
- Light/dark contrast, forced colors, reduced motion, RTL, effective 200
  percent, text spacing and extreme content pass.
- Browser/server cleanup reports port 4173 free and the stable session closed.
- Structural certification remains `183/183`; refinement readiness advances to
  `141` components after the final audit.

## Budgets

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| D8 CSS slice | `887 B` | Product family | semantic profile/states only |
| Product CSS | `4,954 B` | `5,324 B` | pass; `370 B` headroom |
| Neutral component CSS | `71,147 B` | `65,536 B` | documented `5,611 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap; D8 delta zero |
| Shopify product coordinator | `2,129 B` | target evidence | existing coordinator plus market context |

No ceiling is raised. Program-level performance gaps remain documented rather
than being attributed to D8.

## Evidence

Manifest:
`output/playwright/refinement-product/back-in-stock-0243/manifest.json`.

The Shopify proof certifies the theme host/context/replacement contract. It does
not certify an uninstalled provider's persistence, inventory or delivery.

## Risks And Open Questions

- Approve surface, measure, heading/action hierarchy, density, narrow stacking
  and confirmed/error visual treatment.
- Supply or approve D8-specific Figma artwork.
- Select and certify each deployment's provider and operational policies.
- Run live Shopify install/add/remove/reorder/localization, exact payload,
  repeated replacement and storefront tests.
- Reduce or explicitly accept existing neutral distribution gaps before v1.

## Readiness Decision

Back In Stock is `human-review-ready`. Exact variant/market context,
availability/consent boundaries, coherent request states, canonical
composition, accessibility, responsive behavior, parity and Shopify app-host
translation are reconciled. Human visual and live-provider review remain
pending; no `stable` promotion is authorized.
