# ADR 0257: Gift Wrap Dedicated Sellable Line And Authoritative Cart State

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: K11 Gift Wrap commercial model, neutral ownership, Shopify adapter,
  cart synchronization, docs evidence, and future target translation
- Supersedes: the commercial-model deferral in ADR 0183

## Context

ADR 0183 correctly refined the neutral Gift Wrap Option into one canonical
native Checkbox plus optional canonical Price, but left its target commerce
meaning open. A cart attribute, per-line property, and dedicated merchandise
line have materially different price, tax, inventory, fulfillment, refund,
discount, and checkout consequences.

The owner selected K11-A: one order-level sellable gift-wrap line backed by a
dedicated target product or variant at quantity one. The component itself still
cannot own commerce data or mutation; targets must map checkedness to their
native cart model and reconcile from authoritative state.

## Decision

- Neutral K11 remains one wrapping canonical Checkbox with required visible
  label and optional complete canonical target-formatted Price. It emits only
  native checkedness and adds no cart, price, inventory, or status runtime.
- A target implementing K11 maps selected state to exactly one order-level
  sellable gift-wrap line at quantity one. The line remains explicit in cart
  totals, checkout, tax, discounts, refunds, fulfillment, and order records.
- A truthful zero price is still rendered through canonical Price when the
  configured gift-wrap merchandise is free. Omitting Price does not claim zero.
- One target cart coordinator owns eligibility, dedicated merchandise identity,
  inventory, tax/shipping policy, mutation, idempotency, mixed-cart policy,
  pending, failure, retry, feedback, focus, analytics, totals, and Cart Drawer
  synchronization.
- After every mutation, the target reconciles Checkbox state from the coherent
  authoritative cart snapshot. Optimistic checkedness can represent a request
  while pending but never becomes a second source of truth.
- Shopify exposes two global theme settings: an opt-in switch and one dedicated
  product picker. The adapter renders only a configured product with exactly
  one variant, using that variant's real availability and Price.
- Shopify Cart Page and Cart Drawer render the same target-native `gift-wrap`
  snippet. Existing gift-wrap merchandise remains a normal visible cart line,
  but target templates suppress its quantity editor so normal UI cannot raise
  the order-level quantity above one; removal remains available.
- Shopify `gift-wrap.js` is target-only. It uses locale-aware Ajax Cart API
  routes, reads `/cart.js` before and after a request, adds the configured
  variant at quantity one, removes matching line keys, normalizes matching lines
  to one on a selected request, reconciles every rendered K11 surface, and emits
  a target cart-updated event with the confirmed snapshot.
- Target feedback is outside the canonical K11 label. Success is a deliberate
  polite status; failure is a visible alert and restores focus to the Checkbox.
- The Shopify implementation remains non-target-ready until a live theme proves
  merchant configuration, eligibility, section/Drawer refresh, real discounts,
  inventory/tax/fulfillment policy, empty/mixed-cart behavior, errors, focus,
  and editor invocation. Static Liquid and mocked Ajax proof are necessary but
  not sufficient.
- K11 keeps its seven-property neutral API, zero public K11 tokens, and `0 B`
  neutral runtime. Contract `0.3.0` remains `pilot`; automated evidence can make
  it ready for human review but cannot promote it to `stable`.

## Accessibility And Runtime Requirements

- The canonical native Checkbox remains the only checkedness, Space, focus,
  disabled, and event owner.
- Pending target mutation temporarily disables the control and marks only the
  target wrapper busy. Confirmed state always comes from the cart snapshot.
- Price stays canonical and bidirectionally isolated. The visible label remains
  an accessible name even when the configured price is zero.
- Target success/error feedback is not duplicated inside K11 or by multiple cart
  surfaces. Every surface reconciles from the same confirmed cart payload.
- Neutral K11 runtime stays zero. Shopify runtime is budgeted as target adapter
  work and must abort disconnected or superseded requests.

## Consequences

- Gift wrapping has honest accounting and operational semantics instead of a
  checkbox whose price could diverge from checkout.
- The same neutral component can map to an equivalent sellable service in other
  targets without importing Shopify objects or Ajax routes into base source.
- Merchants must configure and maintain a dedicated single-variant product with
  the intended price, channel availability, inventory, tax, shipping,
  fulfillment, refund, discount, and localization rules.
- Cart surfaces need one coherent refresh lifecycle before Shopify can be called
  production-ready.

## Not Approved

This decision does not approve:

- a cart attribute, per-line property, hidden fee, raw formatted-price string,
  or component-owned money calculation;
- a second Checkbox state store, inferred success, silent failure, duplicate
  live regions, or stale optimistic confirmation;
- a multi-variant product picker, quantity above one, or invisible accounting
  line;
- a neutral Shopify dependency or neutral cart runtime;
- Shopify target readiness from static validation alone; or
- promotion from `pilot` to `stable`.
