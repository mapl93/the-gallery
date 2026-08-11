# ADR 0176: Native Discount Disclosure And Controlled Code List

Date: 2026-07-16

## Status

Accepted

## Context

K4 Discount Field used an unnamed section, a Button-driven form hidden through
CSS data attributes and one `applied` boolean plus one `appliedCode` string. The
docs target treated every non-empty submission as success, forced uppercase,
hid entry after application and rendered a 28px icon-only removal action.

That model cannot represent current commerce targets. Shopify Cart Ajax accepts
multiple comma-separated discount codes, Storefront
`cartDiscountCodesUpdate` replaces a list and returns per-code applicability,
and standard storefront actions accept `discountCodes` while returning cart,
errors and warnings. Other targets also vary in normalization, stacking,
eligibility and persistence.

The neutral component needs progressive Web behavior, complete canonical
dependency composition and a stable semantic boundary without becoming a cart
or promotion engine.

## Decision

1. K4 uses native `details` and `summary` as its Neutral Web disclosure. Static
   markup maps `expanded` to the initial `open` attribute and then remains
   natively uncontrolled. Stateful adapters may control the live `open`
   property and `toggle` event.
2. The entry form requires canonical Input and Button. Input exclusively owns
   label, value, validation, associated message and native field attributes.
   Button owns disabled, busy, focus and activation presentation.
3. `toggleLabel`, `expanded`, `input` and `applyLabel` remain semantic public
   properties. Input and `applyLabel` become required.
4. Add `applyDisabled` and `applyBusy`. They project target request state to the
   canonical Button and prevent duplicate submission without changing its
   visible label.
5. Replace `applied`, `appliedCode` and `removeLabel` with optional
   `appliedCodes` composition. It contains a native list of zero or more
   target-confirmed code records and contextual canonical removal Buttons.
6. The neutral contract does not expose raw IDs, amounts, currency,
   applicability objects, normalization, case conversion, stackability,
   endpoint/cart identifiers, maximum count, errors, retries, status copy or
   analytics.
7. The target owns validation, request lifecycle, confirmed code records,
   replacement/removal payload, totals refresh, contextual announcements and
   focus after removal. K4 itself is not a live region.
8. Presence of a confirmed code is conveyed by native list content and target
   status, not success color alone. The full-radius success pill and its public
   success token are removed.
9. K4 is container-responsive, owns no external margin or neutral runtime and
   must keep the Cart family at or below its accepted CSS ceiling.
10. Shopify maps through a dedicated localized snippet and current target-native
    cart actions/events. Its adapter remains `planned` until runtime, warning,
    section refresh, editor and live-store behavior are proven.

## Consequences

- Static Web entry/disclosure works without a component listener or framework.
- K4 can represent no code, one code and multiple codes without incoherent
  boolean/string combinations or a universal commerce record schema.
- Applying another code remains possible after a successful code when the
  target allows it; no universal auto-collapse policy is imposed.
- Validation stays adjacent and associated through canonical Input. Apply and
  removal states reuse canonical Button rather than parallel markup/behavior.
- Shopify and Storefront adapters must preserve the complete confirmed code list
  when adding/removing and check returned warnings/applicability before claiming
  success.
- Existing consumers of the pilot `applied`, `appliedCode` and `removeLabel`
  properties must migrate to the `appliedCodes` slot. No compatibility alias is
  added because the old model encodes the wrong cardinality and ownership.
- Visual treatment, native marker prominence, density, applied-record surface
  and removal emphasis still require explicit human review.
- Contract remains `pilot`; this decision does not authorize `stable` promotion.
