# ADR 0263: Authoritative Address Actions And Protected Deletion

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U6 Address Book, mutation safety, focus recovery, and account-target
  translation
- Refines: ADRs 0189, 0258, and 0260

## Context

ADR 0189 established Address Book as a passive native list of target-owned
records composed with canonical Badge and Button. It left open which actions
were valid, how destructive deletion was protected, and which Shopify account
surface should render the component.

The owner selected U6-A. Add and Edit are canonical actions. Delete requires a
confirmation step or an equivalent guaranteed undo path. Set Default appears
only when the target supports the capability, and at most one record is
authoritatively confirmed as default. Records remain visible and ordered until
the target confirms mutation success.

## Decision

- U6 remains a passive authoritative native record list. It owns no query,
  mutation, optimistic store, confirmation dialog, router, or live region.
- Add and Edit use canonical semantic actions. Navigation uses Link; a local
  command or mutation request uses Button. Visible labels and record context
  provide distinguishable accessible names.
- Delete uses a mutating Button and must not remove a record until the target
  provides authoritative success. Before destructive commitment, the target
  must provide explicit confirmation or an equivalent guaranteed undo path.
- Set Default renders only when supported by the target. The existing default
  remains marked until authoritative success, and at most one returned record
  is treated as default.
- Records remain present and in their authoritative order during pending,
  cancellation, recoverable failure, or undo availability. U6 does not perform
  optimistic record removal or reorder.
- The target owns disabled/busy action state, concurrency, user errors,
  confirmation/undo UI, mutation status announcements, authoritative
  reconciliation, and deliberate focus restoration after success,
  cancellation, undo, or failure.
- Target-controlled views may project protected records through canonical U6.
  Platform-owned non-replaceable Profile/Addresses screens use native handoff
  and do not claim U6 visual or functional parity.
- Shopify v1 uses the hosted current-account Profile/Addresses experience.
  Supplementary extensions and headless Customer Account API views are separate
  target-owned profiles, including their B2B availability and protected-data
  requirements. Classic Liquid remains separately versioned compatibility.
- Shopify remains `planned` / `ready:false` pending live mutation and focus
  evidence. U6 remains `pilot` pending human visual review.

## Consequences

- Address records do not disappear on a request that later fails or is
  cancelled, and destructive behavior has an explicit recovery guarantee.
- Neutral source exposes a stable semantic collection without embedding a
  provider SDK, address schema, optimistic cache, or platform routing model.
- Shopify's hosted address manager is not cloned into theme Liquid, while a
  controlled headless view can still implement U6 against authenticated API
  records and mutations.
- Target owners still define permissions, B2B behavior, confirmation/undo,
  concurrency, status copy, focus destination, redaction, routing, analytics,
  and operational evidence.

## Not Approved

This decision does not approve:

- optimistic removal or default changes before authoritative confirmation;
- Delete without confirmation or guaranteed undo;
- Set Default on targets that do not support it;
- a fixed address field or action schema in U6;
- a universal Shopify Liquid Address Book; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://www.w3.org/WAI/ARIA/apg/patterns/button/>
- <https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/>
- <https://shopify.dev/docs/apps/build/customer-accounts>
- <https://shopify.dev/docs/api/customer/latest/objects/CustomerAddress>
- <https://shopify.dev/docs/api/customer/latest/objects/Mutation>
