# ADR 0262: Provider-Trusted Order Tracking And Read-Only Purchases

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U5 Order Detail, tracking truth, purchased-item composition, and
  account-target translation
- Refines: ADRs 0188, 0258, and 0260

## Context

ADR 0188 established Order Detail as a passive title-labelled composition with
optional metadata, canonical Steps, and canonical Cart Line Item. It left open
whether The Gallery should define one tracking sequence and which current
account profile should render the component.

The owner selected U5-A. U5 receives one authoritative target order through
composition slots. Canonical Steps is valid only when the provider supplies a
trustworthy finite ordered milestone model. Otherwise the target renders
ordinary truthful status content and U5 does not infer a progress sequence.
Purchased products reuse Cart Line Item in an explicitly read-only profile.

## Decision

- U5 remains a passive composition with required `title` and optional `meta`,
  `tracking`, and `lineItems`; it owns no order schema or state machine.
- `tracking` composes canonical Steps only when the target can prove a
  trustworthy ordered milestone model for the specific lifecycle it presents.
  The target supplies the order, labels, completion, and at most one current
  step.
- U5 never normalizes processing, fulfilment, shipment, pickup, return,
  cancellation, refund, partial, or split states into a universal stage enum.
- When provider facts are not a truthful linear sequence, the target omits
  Steps and uses ordinary semantic status content in `meta` or another
  target-owned composition. Absence of Steps does not imply missing data.
- `lineItems` composes canonical Cart Line Item in a read-only purchase profile.
  Quantity is text; quantity mutation, removal, save-for-later, add-to-cart, and
  other cart commands are prohibited inside U5.
- Product navigation is optional and remains a native target-owned destination
  when useful and authorized.
- Protected loading, authorization/redaction, unavailable/not-found/error,
  provider links, live updates, announcements, focus recovery, and account
  session lifecycle remain with the owning target surface under U0.
- Target-controlled views may project an authoritative order through canonical
  U5. Platform-owned non-replaceable Order status screens use native handoff and
  do not claim U5 visual or functional parity.
- Shopify v1 uses the hosted current-account Order status page. Customer Account
  extensions and headless API views are separate target-owned profiles; classic
  Liquid remains separately versioned compatibility.
- Shopify remains `planned` / `ready:false` pending real target evidence. U5
  remains `pilot` pending human visual review.

## Consequences

- The Gallery can reuse certified Steps without fabricating progress for orders
  whose provider facts are non-linear or incomplete.
- Purchased-order presentation reuses Cart Line Item anatomy without leaking
  cart mutation behavior into historical records.
- Neutral source remains independent of commerce providers, target routing,
  protected data, and framework state.
- Target owners still define disclosure, milestone credibility, status copy,
  product destinations, formatting, provider links, lifecycle, security, and
  operational evidence.

## Not Approved

This decision does not approve:

- a universal U5 tracking-stage enum or current-index API;
- inferred progress from financial, fulfilment, carrier, pickup, return, or
  refund state;
- Cart Line Item quantity/removal/cart commands inside Order Detail;
- a universal Shopify Liquid Order Detail; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://www.w3.org/TR/wai-aria-1.3/#aria-current>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element>
- <https://shopify.dev/docs/apps/build/customer-accounts/order-status-page>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/order-status>
- <https://shopify.dev/docs/api/customer/latest>
