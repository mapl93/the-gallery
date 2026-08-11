# Refinement Batch 92 — Gift Wrap Option

Status: Refined; commercial-model decision required; remains `pilot`

Date: 2026-07-17

Component: Gift Wrap Option (`K11`, dependency order `105`)

## Outcome

Batch 92 replaces K11's divergent Checkbox copies and arbitrary price string
with one wrapping canonical Checkbox and an optional complete canonical Price.
Native selection, keyboard, form value, reset, disabled state, focus, monetary
parts, and localization now remain with their canonical dependencies. K11 adds
no neutral runtime and owns only cart-specific arrangement.

Exhibit and Studio now use the same `GiftWrapArtwork`, `CheckboxArtwork`,
`PriceArtwork`, renderer, and fixture. Shopify stays intentionally planned
until the owner chooses an order-level attribute, sellable product/variant, or
per-line property model.

## Delivered

- Permanent K11 dossier, detailed audit, ADR 0183, and open commercial-model
  decision.
- Contract `0.2.0`, registry dependency correction, Studio metadata, MDX, and
  Cart CSS reconciliation.
- Required wrapping native Checkbox, required visible label, optional complete
  Price slot, native name/value/disabled/described-by mapping, and strict blank
  label omission.
- Shared Checkbox artwork reused by standalone Checkbox and Gift Wrap; shared
  Gift Wrap renderer reused by Exhibit and Studio.
- Zero K11 public visual tokens, zero K11 runtime, and explicit target ownership
  for commercial mutation, totals, status, focus, failure, and analytics.
- Mobile/Tablet/Desktop/XL per mode plus selected, focus, disabled, no-price,
  dark, forced-colors, reduced-motion, RTL/200px, and effective-200% evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static preview audit reports zero errors.
- Exhibit and Studio serialize exact identical K11 DOM and computed styles with
  one native checkbox, one canonical label, one optional canonical Price, and
  no internal live region.
- Click/Space, Studio controlled synchronization, disabled state, FormData
  absent/present mapping, native reset, focus, no-price naming, blank-label
  omission, and inspector reset pass.
- Four viewports, RTL at `200px`, effective zoom `2`, light/dark contrast,
  forced colors, and reduced motion pass without root or document overflow.
- Shopify official validation passes. K11 remains `css-ready`, `ready:false`,
  and the global target-ready count remains 79 because the commercial model is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closes both and leaves port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K11 CSS slice | `323 B` | `326 B` | component observation | `+3 B`; canonical semantic composition |
| Cart CSS | `3,057 B` | `3,028 B` | `3,072 B` | pass; `44 B` headroom |
| Neutral Web component CSS | `67,991 B` | `67,998 B` | `65,536 B` | existing program gap `2,462 B`; batch delta `+7 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K11 delta `0 B` |
| Shopify K11 runtime | `0 B` added | `0 B` added | target observation | no model-dependent no-op behavior added |

Cart CSS SHA-256 is
`ba1f5ae0626d877720732833c9cadd43111e0d54ae7dbd77f9db3b44c0256882`;
K11 slice SHA-256 is
`2241500ff18f5866ddfffb7f96db889dab2b95e1e3b90cec011cdada267ea462`.

## Risks And Open Questions

- Owner input is required on Shopify's commercial model: order-level cart
  attribute, dedicated sellable product/variant, per-line property, another
  explicit architecture, or target omission.
- Human review must approve border, padding, label/price hierarchy, checkbox
  alignment, disabled treatment, cart placement, default selection, free-price
  policy, and the neutral candidate without K11-specific Figma artwork.
- Each target must own availability, actual money, inventory/tax/fulfillment,
  optimistic versus confirmed state, pending/error/retry/status/focus, totals,
  stale cart refresh, removal, analytics, checkout display, and Cart Drawer
  parity.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive, and
evidence work is complete, but the commercial model determines the target
implementation. K11 is not human-review-ready or Shopify target-ready until
the owner selects that model and the resulting implementation is evidenced.
It remains `pilot`; no automatic `stable` promotion was made.
