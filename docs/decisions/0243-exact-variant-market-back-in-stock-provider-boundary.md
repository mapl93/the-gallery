# 0243. Exact Variant/Market Back In Stock Provider Boundary

Status: Accepted

Date: 2026-07-20

## Context

ADR 0214 removed Back In Stock's duplicated Input/Button implementation and its
false submit-equals-success behavior, but left the request identity,
availability meaning, consent, confirmed presentation and Shopify architecture
open. The owner accepted decision D8-A in the commerce-core packet.

A universal Back In Stock engine cannot infer that quantity, incoming stock,
preorder, backorder or another inventory fact means the same thing in every
market. A storefront theme also cannot truthfully store registrations, observe
inventory and deliver notifications without an application/provider.

## Decision

- One request is bound to the exact currently selected variant and current
  market. The neutral form carries that context through target-owned form or
  model data without standardizing vendor field names or transport.
- “Back in stock” occurs only when the connected inventory authority confirms
  that variant is purchasable under that market's policy. Preorder, backorder,
  incoming and reserved states are not silently equivalent.
- Back In Stock owns four coherent presentation states: `idle`, `submitting`,
  `confirmed` and `retryableError`. The target integration alone drives
  transitions from real provider results.
- Submitting makes the email read-only, marks the form and canonical Button
  busy, and disables repeat activation without replacing the action label.
- Confirmed requires truthful localized feedback, keeps the complete form in
  place, keeps the submitted email focusable/readable, disables resubmission
  and exposes adjacent status semantics. Existing focus is not moved.
- Retryable error requires truthful localized feedback, keeps the field
  editable and the canonical Button available, and uses error announcement
  semantics without erasing the customer's context.
- A requested confirmed or retryable-error state without feedback resolves to
  idle rather than creating an unexplained locked/error surface.
- Availability-service consent is explicit and separate from marketing
  consent. Neither is inferred from the other.
- The target provider owns persistence, verification, idempotency,
  deduplication, abuse and rate limits, retention/deletion, inventory
  observation, delivery, retry, expiry, stale-record handling, unsubscribe and
  analytics.
- Shopify v1 uses an installed app/provider block. Main Product already accepts
  `@app` blocks; it now exposes the current market alongside the selected
  variant, re-renders the app block with the bounded product region and emits
  both identities after selection changes. The Gallery theme does not ship a
  notification database, customer/metafield workaround or fake endpoint.
- Neutral D8 remains zero-runtime. The provider adapter owns networking and
  state transitions while consuming canonical class/state contracts.
- D8 remains `pilot`; app-host readiness and automated evidence do not replace
  live provider/editor proof or explicit human visual review.

## Consequences

- The API replaces an independently combinable `pending` boolean with one
  `requestState` enum, preventing pending/confirmed/error combinations that
  cannot be explained.
- Canonical Input's `readOnly` contract preserves the submitted email as a
  focusable, selectable, successful form value while canonical Button owns
  busy and disabled behavior.
- Field validation success stays distinct from provider confirmation.
- Exhibit and Studio can prove all four presentations with one renderer while
  their submit fixture remains truthful about having no provider.
- Shopify's theme adapter can be certified as an app-block host and class/state
  projection without pretending the external service is bundled.
- Final provider selection/configuration is a target deployment concern, not a
  new neutral component property.
