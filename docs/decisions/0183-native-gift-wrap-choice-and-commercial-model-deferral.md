# 0183. Native Gift Wrap Choice And Commercial Model Deferral

Status: Accepted

Date: 2026-07-17

Partially superseded by ADR 0257, which selects one order-level sellable
gift-wrap line and authoritative target cart reconciliation.

## Context

Gift Wrap rendered two conflicting structures in Exhibit and Studio, duplicated
Checkbox layout, represented price as an unstructured string, omitted native
name/value properties from its API, and described a nonexistent message field
in the registry. The contract treated selection as cart mutation but did not
identify who owns live checkedness, failure reconciliation, or totals.

ADR 0077 already requires K11 to compose Checkbox and leaves cart mutation to
the target. ADRs 0056 and 0108 establish native Checkbox and passive
target-formatted Price ownership. Shopify documents materially different data
contracts for order-level cart attributes, product-form line properties, and
sellable variants. Choosing among them affects pricing, inventory, fulfillment,
tax, removal, checkout visibility, and Ajax synchronization.

## Decision

- K11 is one wrapping native Checkbox label. The root carries both `.gift-wrap`
  and `.checkbox`; its native `.checkbox__input` remains the sole selection,
  keyboard, disabled, form, focus, and reset owner.
- Stable properties are required non-empty `label`, optional `selected=false`,
  optional canonical `price` slot, optional native `name`, optional
  `value="on"`, optional `disabled=false`, and optional `describedBy`.
- `selected` maps to initial `checked` in static Web. Native Web becomes
  uncontrolled after parsing; stateful adapters may bind the live checked
  property and native change event without adding another selection owner.
- Price is no longer an unstructured K11 string. When present, the slot contains
  one complete canonical Price with target-formatted text and its own localized
  part labels and bidirectional isolation.
- A blank option label is invalid and omits the shared docs renderer. Missing
  Price omits its wrapper and does not imply that gift wrapping is free.
- K11 owns no pending state, cart request, optimistic policy, error, retry,
  result status, totals calculation, stale-response handling, focus recovery,
  analytics, availability policy, or persistence model. Those remain in the
  target commerce lifecycle.
- Neutral runtime remains zero. Checkbox and native form behavior provide the
  complete base interaction.
- Shopify remained `planned` until the owner selected a commercial model. ADR
  0257 later chooses one dedicated sellable product/variant line at quantity
  one and defines the target reconciliation boundary.
- The shared docs implementation extracts canonical `CheckboxArtwork` and
  `GiftWrapArtwork`; Studio composes the existing `PriceArtwork`. MDX fallback
  markup follows the same anatomy and fixture.
- Figma nodes `943:7` and `1020:480` remain traceability only because they
  resolve to the generic Button Studio shell rather than K11-specific artwork.
- K11 remains `pilot`. ADR 0257 resolves the commercial-model blocker, allowing
  the implementation candidate to enter human review while live target proof,
  explicit visual review, and `stable` promotion remain separate gates.

## Consequences

- Web consumers receive native semantics, label activation, form behavior, and
  canonical price formatting without Gallery runtime.
- K11 no longer duplicates Checkbox indicator/state or Price formatting.
- A target may use the same neutral visual composition with any accepted cart
  model, but its name/value, mutation, totals, and reconciliation must be
  supplied deliberately.
- Shopify cannot be marked target-ready merely because copied CSS, Liquid, or a
  mocked Ajax lifecycle exists; live commerce and cart-surface proof is required.
- Human review still decides border, padding, price prominence, cart placement,
  unavailable treatment, and whether owner-specific artwork supersedes the
  neutral candidate.
