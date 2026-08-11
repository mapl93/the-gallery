# 0241. Native Product Submission And Same-Form Target Enhancement

Status: Accepted

Date: 2026-07-20

## Context

ADR 0117 established Product Form as a real native form composing canonical
Variant Selector, Quantity Selector and Button, but left the final purchase
strategy, coordinator, supplementary scope and one-of-one Quantity policy open.
The owner accepted D5-A: a JavaScript-free native submission baseline with an
optional target-owned Ajax enhancement of that same form.

HTML forms already provide named successful controls, constraint validation,
activated submitters, FormData and reset without client JavaScript. Shopify's
product form tag supplies the platform-native add-to-cart boundary, while its
Cart Ajax API can accept the form's same data when a target chooses an in-page
cart experience. WAI guidance assigns understandable validation and result
notification timing to the owning workflow, not to a layout wrapper.

ADRs 0239 and 0240 now provide the one Shopify product coordinator that replaces
the bounded server-rendered product surface and therefore refreshes Product
Form's hidden merchandise id, quantity rules and submit availability together.

## Decision

- Product Form always has one complete real form and FormData path. It remains
  functional through native submission without JavaScript.
- A capable target may intercept the same valid `submit` and FormData for Ajax.
  It must not construct a second purchase model or parallel mutation path.
- That target enhancement owns pending, endpoint selection, response parsing,
  Cart Drawer or cart-count updates, error, retry, focus, announcements,
  analytics and rollback. Neutral Product Form owns none of that runtime.
- The shared product coordinator owns resolved merchandise id and dependent
  product state. Product Form consumes the server-rendered projection and does
  not resolve variants, retain an all-variants catalogue or mirror child values.
- Unavailable and pending remain distinct. Unavailable reflects an unpurchasable
  projection; pending exists only while a target-controlled asynchronous
  lifecycle is active and uses canonical Button busy semantics.
- Accelerated checkout and a generic supplementary-field slot are excluded from
  neutral v1. Selling plans, personalization, uploads, gifts and preorder flows
  require separately accepted canonical compositions.
- Quantity remains an optional canonical composition. Shopify exposes one block
  setting to show it; when omitted, the native product form submits the
  platform's implicit quantity of one.
- Shopify's implemented baseline is the Liquid product form plus the existing
  bounded product coordinator. An Ajax cart enhancement is optional and is not
  required for Product Form's human-review readiness.
- Product Form remains `pilot`; target and visual evidence do not authorize a
  `stable` promotion without explicit human review.

## Public Boundary

The neutral API remains the optional canonical Variant Selector and Quantity
Selector slots, required localized submit label, unavailable state, pending
state and optional target feedback placement. Action URL, platform merchandise
id, quantity policy, Ajax enablement, cart response, selling-plan data and
supplementary commerce fields are target data or separate composition—not
Studio appearance properties.

## Accessibility

Native constraint validation, explicit submitter semantics, child labels,
keyboard behavior and reset are preserved. The asynchronous target owns exactly
one result-announcement and focus policy; Product Form does not add a live region
by default. Repeat activation is blocked only while pending, and visible
unavailability is explained when adjacent option content is insufficient.

## Performance

Product Form adds zero neutral JavaScript. The existing Shopify coordinator
retains one delegated change listener, one cancellable request and one bounded
replacement per product surface. This decision adds no request, listener,
observer, timer, storage, asset or catalogue payload. A future Ajax cart adapter
must be measured in its target batch without raising neutral budgets.

## Consequences

- Native and enhanced Shopify experiences share one validity and data path.
- Section replacement prevents stale merchandise, quantity and submit state
  without a client-side variants database.
- Cart Drawer behavior is not implied by Product Form readiness; any such target
  enhancement must arrive with its own complete lifecycle evidence.
- Final form rhythm, action geometry, feedback treatment and narrow layout still
  require human visual approval.
