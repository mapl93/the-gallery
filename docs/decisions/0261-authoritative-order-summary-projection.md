# ADR 0261: Authoritative Order Summary Projection

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U4 Order History, status truth, and account-target translation
- Refines: ADRs 0187, 0258, and 0260

## Context

ADR 0187 established Order History as a passive native list composed from
canonical Link and Badge, semantic `time`, and target-formatted totals. It left
open whether The Gallery should normalize financial and fulfilment status, and
which Shopify account profile should render the list.

The owner selected U4-A. Each item is an authoritative target-formatted summary
with one descriptive Link, one machine-readable date, one canonical Badge with
readable target-authored status, and one formatted total. Financial and
fulfilment values remain distinct target facts; U4 does not invent a universal
record or status enum.

ADR 0260 separately accepts canonical projection for target-controlled views
and native handoff for non-replaceable platform-owned account screens.

## Decision

- U4 exposes optional `label` and required `orders` composition only. It does
  not expose an order schema, financial/fulfilment enum, query, formatter,
  pagination state, or lifecycle machine.
- Every item contains exactly one descriptive canonical Link, one native
  `time[datetime]`, one readable canonical Badge, and one already-formatted
  total. These are complete target-authored values from an authoritative order
  source.
- Financial and fulfilment state stay distinct in target data. The target may
  author a truthful localized summary label for the single Badge, but U4 never
  collapses those facts into a Gallery enum or derives one from Badge color.
- If one readable summary cannot communicate the required distinctions, the
  target uses a richer order-status composition outside U4 rather than adding
  hidden U4 states or multiple undocumented status controls.
- Loading, empty, error, expired authorization, pagination, refreshing, live
  updates, announcements, and focus recovery belong to the owning account
  surface under U0.
- Target-controlled views may project protected order data through canonical
  U4. Platform-owned non-replaceable Order History screens use native handoff
  and do not claim U4 visual or functional parity.
- Shopify v1 uses the hosted current-account Order index as the theme path.
  Account extensions and headless Customer Account API views are separate
  target-owned profiles; classic Liquid is separately versioned compatibility.
- Shopify remains `planned` / `ready:false` until a real target profile is
  implemented and evidenced. U4 remains `pilot` pending human visual review.

## Consequences

- Neutral and framework targets can present different provider records without
  encoding Shopify or another commerce platform into base source.
- Status text remains understandable without color and truthful when commerce
  systems expose separate financial and fulfilment facts.
- The current Shopify hosted list is not cloned into theme Liquid, while a
  controlled headless or extension view can still implement U4's semantics.
- Target owners still define protected-data access, record ordering, status
  wording, money/date formatting, routing, pagination, lifecycle, privacy, and
  operational evidence.

## Not Approved

This decision does not approve:

- a universal U4 order/status record schema;
- The Gallery financial or fulfilment status enums;
- multiple public Badge/status properties or inferred color semantics;
- a universal Shopify Liquid Order History; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- <https://shopify.dev/docs/apps/build/customer-accounts>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest>
- <https://shopify.dev/docs/api/customer/latest>
