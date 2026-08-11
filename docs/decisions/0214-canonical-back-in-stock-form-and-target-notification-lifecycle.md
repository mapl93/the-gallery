# 0214. Canonical Back In Stock Form And Target Notification Lifecycle

Status: Accepted

Date: 2026-07-18

## Context

D8 Back in Stock Alert independently implemented a full email field and primary
button even though canonical Input and Button already own those semantics and
visual states. The D8 root repeated validation variables, control geometry,
focus, motion, disabled and action styles. It also responded to the viewport
rather than its host container.

The docs renderer treated any locally valid native `submit` event as confirmed
provider success, hid the form and displayed a pre-filled success live region.
No endpoint, request, product/variant identity, notification provider or
response existed. The `submitted` boolean therefore conflated an event, pending
work and a confirmed result.

ADR 0075 already requires D8 to demonstrate the four field validation families
and use the primary Button family. It does not require D8 to duplicate those
components. The repo has no accepted availability definition, target identity,
provider, consent/privacy model, Shopify application, duplicate/retry policy or
confirmed-success replacement behavior.

## Decision

- D8 is a product-domain profile around one native form composed from canonical
  Input and canonical primary Button.
- D8 owns only its generic root, required visible heading, optional description,
  intrinsic form layout and optional target-feedback placement.
- Canonical Input remains the sole email value, visible label, native name,
  email/autocomplete/required semantics, validation, associated message, icon,
  disabled, focus, hover and controlled/uncontrolled owner.
- Default, Error, Success and Warning remain demonstrable through Input
  composition. D8 removes its parallel validation modifiers and token system.
  Successful field validation never implies provider acceptance.
- Canonical Button remains the sole submit, disabled, busy/loading, focus,
  activation and reduced-motion owner. Target pending state maps to form
  `aria-busy` and Button busy plus native disabled semantics.
- A native `submit` event is a request boundary, not success. Neutral D8 performs
  no request and does not insert a success message. The docs target may produce
  only explicitly truthful preview feedback.
- The target supplies action/method, stable email name, product/variant/location
  or other notification identity, provider data and request/result lifecycle.
  D8 defines no universal hidden-field names or record schema.
- Optional `.back-in-stock__status` is placement for a truthful target response.
  The target chooses localized content, status/alert/error-summary semantics,
  insertion timing, focus, retry, removal and any confirmed-success replacement.
- The neutral candidate keeps the form visible after feedback. Hiding,
  collapsing, disabling or replacing it after confirmed success remains a
  product/target decision.
- D8 is a named inline-size container. Its two-column form stacks intrinsically
  without viewport breakpoints, DOM reordering or changed keyboard order.
- D8 adds zero neutral runtime, asset, listener, observer, timer, request,
  storage, formatter, layout read or animation.
- Shopify remains planned. Variant availability can inform display, but a
  provider/app, identity model, consent, registration endpoint, inventory
  observation, delivery and editor/result lifecycle require explicit decisions.
- D8 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Back in Stock reuses previously reviewed field/action semantics and removes a
  second implementation path.
- Form validation, provider pending and confirmed result become three separate
  concepts instead of one `submitted` boolean.
- Exhibit and Studio can mount one shared `BackInStockArtwork` and fixture while
  the fallback MDX shows the same canonical classes.
- Product-family CSS recovers budget and the component becomes host-responsive
  without new neutral JavaScript.
- A Web, Shopify, framework or native adapter can choose its real provider and
  data model without forcing those platform details into the base contract.
- Provider selection, availability meaning, product-versus-variant targeting,
  consent/privacy, deduplication, verification, abuse controls, retries,
  delivery, result replacement, final visual values, D8-specific Figma evidence
  and explicit human review remain open.

## Follow-up

ADR 0243 applies the owner's accepted D8-A decision and resolves the open
canonical questions above: the request is bound to the exact selected variant
and current market, provider-confirmed purchasability defines the result,
service consent is separate from marketing consent, confirmed state retains
and locks the form, retryable error keeps it available, and Shopify hosts a
provider app block instead of a theme-owned notification database. Provider
operations and final human visual/target proof remain external review gates.
