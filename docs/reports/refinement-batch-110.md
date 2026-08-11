# Refinement Batch 110 — Inspectable Variant Availability

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Component: Variant Selector (`D4`, review order `70`)

Accepted decision: D4-A / ADR 0240

## Outcome

Batch 110 closes Variant Selector's availability and target-coordinator
boundaries. Sold-out values remain selectable for truthful inspection or Back In
Stock composition; nonexistent combinations and genuinely unusable values use
native disabled. The neutral component remains a native radio-group composition
with zero runtime.

Shopify now distinguishes exact variant existence from sold-out state, uses
granular high-variant Section Rendering, and follows a Combined Listing sibling
`product_url` through the same atomic product coordinator.

## Delivered

- Accepted ADR 0240 and updated ADR 0116/open-question resolution.
- Variant Selector contract `0.3.0`, registry, MDX and shared Studio fixture.
- Explicit selectable sold-out and disabled invalid examples for swatches/pills.
- Shopify exact `option_value.variant` classification and localized Sold out /
  Unavailable combination text.
- Same-origin Combined Listing request/path handling and product URL target event.
- Renewed human-review-ready dossier and certification audit.
- Regenerated Neutral Web and Shopify adapters; Shopify target-ready count is
  `86`; `site/dist` untouched.

## Verification Summary

- Exhibit/Studio outer HTML is exactly equal (`2,811` characters).
- Eight Mobile/Tablet/Desktop/XL captures plus sold-out, localized RTL, dark,
  forced-colors/reduced-motion and 200% zoom evidence.
- Native arrows select sold-out Porcelain and XL, skip disabled Ash and XXL, and
  preserve exact `input` then `change` ordering.
- Two sold-out inputs remain enabled; two nonexistent values are disabled.
- Minimum measured target is `44×44px`; no redundant roles or component live
  regions exist.
- All responsive, localized RTL and zoom roots have equal client/scroll widths.
- Combined Listing proof synchronizes sibling path, variant, Product Info,
  merchandise id, structured data, focus, event and one status from one response;
  the same-origin guard blocks an external URL without a request.
- Final browser console reports zero errors and zero warnings.
- One managed fixed-port server, one headless Playwright session and one tab were
  used. Cleanup reports port 4173 free, server stopped and session closed.
- Contracts, Studio, docs, decision, Web/Shopify adapter and syntax validators
  pass. Theme Check has no findings in modified Variant Selector files.
- Structural certification remains `183/183`; refinement readiness advances to
  `138` components after the final audit.

## Budgets

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap |
| Shopify product coordinator | `2,133 B` | target evidence | target-only; no neutral delta |

The performance audit reports 18 surfaces, 10 pass and 8 documented gaps, with
zero undocumented gaps. No ceiling was raised.

## Evidence

Manifest:
`output/playwright/refinement-product/variant-selector-0240/manifest.json`.

The Shopify proof uses deterministic local Section Rendering responses. It is
behavioral adapter evidence, not a substitute for a live merchant catalogue.

## Risks And Open Questions

- Approve swatch/pill geometry, label visibility, selected/focus/sold-out/
  disabled marks, spacing, wrapping and typography.
- Run live Shopify high-variant, sold-out, nonexistent, Combined Listing,
  selling-plan, app-block and theme-editor integration before target release.
- Require authoritative exact-combination existence and stock in every target.
- Reduce or explicitly accept existing neutral CSS/runtime distribution gaps
  before v1 packaging.

## Readiness Decision

Variant Selector is `human-review-ready`. Native group semantics, D4-A commerce
state, controlled/uncontrolled ownership, keyboard behavior, accessibility,
responsive layout, target translation and Exhibit/Studio parity are reconciled.
Human visual review remains pending; no `stable` promotion is authorized.
