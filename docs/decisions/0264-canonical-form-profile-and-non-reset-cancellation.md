# ADR 0264: Canonical Form Profile And Non-Reset Cancellation

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U7 Address Form, canonical composition, localized address schemas,
  cancellation, validation, and account-target translation
- Refines: ADRs 0190, 0258, and 0260

## Context

ADR 0190 established U7 as a native address-form shell with target-owned fields
and mutation lifecycle, but intentionally left its relationship to canonical
Form unresolved. Its docs fixture also treated Cancel as a local value reset,
even though cancellation may navigate away or close a containing surface.

The owner selected U7-A. Address Form formally composes canonical Form while
each target retains its locale-specific field inventory, order, names,
autocomplete purposes, requiredness, validation, and protected mutation.
Submit is explicit. Optional Cancel is navigation or close composition and must
not imply reset. Custom and server errors remain field-addressable and use a
useful canonical Form error summary when the error set needs an overview.

## Decision

- U7 is a specialized canonical Form profile, not an independent form system.
  Its Web root carries both `.form` and `.address-form`; field, row, action, and
  optional error-summary composition reuse canonical Form hooks.
- U7 adds `form` to its dependency graph and retains direct Input, Select, and
  Button dependencies because the target supplies those address controls and
  actions inside the specialization.
- The public API remains required `fields` and optional `actions`. U7 does not
  flatten a universal postal schema, form value object, endpoint, lifecycle, or
  provider error model into new root properties.
- Every target supplies its localized address-field inventory, DOM/order,
  visible labels, stable submission names, autocomplete purposes,
  requiredness, values, validation, and create/edit mutation mapping.
- Submit uses explicit native submission. Change, blur, option selection, and
  cancellation do not submit automatically.
- Optional Cancel is a target navigation or close action. A command uses
  canonical Button with `type="button"`; navigation may use canonical Link. It
  never uses `type="reset"`, promises that draft values were discarded, or
  changes fields unless the target separately implements and communicates that
  policy.
- Native constraint validation remains available. Custom and server errors map
  to canonical field messages. When multiple errors need an overview, the
  target composes canonical Form error-summary markup, links entries to the
  affected controls, and deliberately focuses the summary or first invalid
  field according to its submission lifecycle.
- Form and U7 share the component's inline-size query boundary. U7 retains its
  private compact row threshold and maximum measure while canonical Form owns
  its native form and action behavior. DOM, reading, serialization, and focus
  order do not change across widths.
- Authentication, authorization, protected data, locale schema selection,
  dependent region fields, validation service, pending/error/success state,
  conflicts, routing, announcements, focus recovery, analytics, and telemetry
  remain target-owned.
- Shopify v1 uses the hosted current-account Profile/Addresses experience as an
  intentional native handoff with no U7 parity claim. A target-controlled
  headless storefront may project canonical U7 against authenticated Customer
  Account address mutations and field-addressable user errors. Classic Liquid
  remains separately versioned compatibility, never an automatic fallback.
- U7 remains `pilot` and Shopify remains `planned` / `ready:false` pending live
  localized protected-mutation evidence and human visual review.

## Consequences

- Address Form no longer duplicates or merely resembles canonical Form; its
  dependency, DOM hooks, contract, renderer, fixture, and documentation agree.
- Targets can implement valid locale- and provider-specific postal schemas
  without turning the docs fixture into a neutral default.
- Cancel no longer destroys fixture values or makes a false reset guarantee.
- Error handling can reuse the canonical summary and field-message model while
  retaining target-owned insertion, announcement, focus, and mutation policy.
- Current Shopify account UI is not cloned into theme Liquid, while controlled
  headless targets retain a valid semantic projection path.

## Not Approved

This decision does not approve:

- one universal international address schema or field order;
- automatic submission on change, blur, or selection;
- implicit reset or draft destruction from Cancel;
- optimistic protected mutation or provider-independent error normalization;
- a default modern Shopify Liquid customer-address form; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://html.spec.whatwg.org/multipage/forms.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
- <https://open-ui.org/components/customizableselect/>
- <https://shopify.dev/docs/api/customer/latest>
- <https://shopify.dev/docs/api/customer/latest/objects/Mutation>
- <https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component>
