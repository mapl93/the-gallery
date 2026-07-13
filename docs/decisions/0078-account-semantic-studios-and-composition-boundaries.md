# 0078. Account Semantic Studios And Composition Boundaries

Status: Accepted

Date: 2026-07-12

## Context

The nine Account components had canonical CSS and structural contracts but no
semantic properties or Studios. Several roots represent collections of records
or dependency-owned forms, so flattening fixture fields, addresses, orders, or
products into root-level properties would incorrectly make repeated target data
part of the component API.

## Decision

- Auth Forms exposes title, supporting copy, its required Form composition, and
  optional recovery, divider, social-auth, and footer regions. Login versus
  Register is not introduced as a mode or variant without a source decision.
- Password Reset exposes passive icon content, title, guidance, required request
  form, and optional success feedback. Studio may demonstrate a successful
  request locally, but request/success is not promoted to a boolean public state
  until its ownership is decided.
- Account Dashboard exposes its customer greeting, optional header actions, and
  required navigation-card composition. Card data and responsive column count
  remain composition and canonical CSS concerns.
- Order History exposes an optional accessible region name and a required order
  collection slot. Order number, date, total, and status remain per-row target
  data rather than component-wide properties.
- Order Detail exposes its title plus optional metadata, tracking, and purchased
  line-item regions. Tracking stage inventory and order-state mapping remain
  target-owned.
- Address Book exposes the address-card collection and optional add-address
  label. Default state and mutations remain per-card target behavior.
- Address Form exposes field and action composition regions. Input, Select, and
  Button retain their own labels, validation, autocomplete, and submission
  semantics.
- Wishlist exposes title, optional count, and Product Card composition. The
  product-level wishlist toggle remains inside that composition pending a
  decision about reusable ownership.
- Account Settings exposes a required section collection. Individual setting
  titles, descriptions, controls, validation, and persistence remain composed
  dependency or target concerns.
- Canonical Account CSS adds missing structural hooks, visible focus styles, and
  reduced-motion fallbacks using existing public tokens. No new token values or
  component variants are introduced.
- Studio fixture customer data, dates, orders, addresses, icons, and product
  content are site-owned inspection data and are not contract defaults.

## Consequences

- Account Studios can remain useful without freezing commerce records or target
  authentication policy into flat public properties.
- Public contracts now map only the semantic regions the component owns.
- Unresolved product-boundary decisions remain recorded in
  `docs/OPEN-QUESTIONS.md` and do not block technical completion at `pilot`.
- All nine Account contracts require owner review before promotion to `stable`.
