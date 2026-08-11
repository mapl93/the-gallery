# 0240. Inspectable Variant Availability And Combined Listing Coordination

Status: Accepted

Date: 2026-07-20

## Context

ADR 0116 established native option groups and left the commercial availability
policy and target coordinator open. The owner accepted D4-A: sold-out values stay
selectable for inspection, while nonexistent combinations and genuinely unusable
values use native disabled. ADR 0239 then established one product-page or Quick
View coordinator for all dependent product projection.

Shopify's `product_option_value.available` is contextual top-down purchase
availability. Its `variant` property instead identifies the exact variant for an
option value combined with the other selected values, if that combination exists.
Its `product_url` property identifies a sibling product for Combined Listings.
Granular `option_values` plus the Section Rendering API provide the high-variant
update path without serializing an unbounded variant catalogue.

## Decision

- Variant Selector preserves native fieldset/legend/same-name radio semantics.
- A sold-out value has an exact associated variant whose `available` value is
  false. It remains selectable, uses localized sold-out text and a non-color cue,
  and can lead to truthful product information or a separate Back In Stock flow.
- A value with no exact associated variant and no sibling `product_url` is a
  nonexistent combination and is natively disabled. Genuinely unusable values
  use the same native disabled boundary.
- Every option retains a complete localized text label. The legend visibly
  derives the current selected value; the redundant fragment remains hidden from
  the accessible group name.
- Native `input` and `change` are semantic selection requests. Variant Selector
  does not update Price, media, form state, URL, inventory, structured data or a
  live region itself.
- Shopify resolves selected option-value ids through the existing target-only
  product coordinator. It cancels superseded work, requests one section, replaces
  one bounded product region, restores option focus, updates all dependent server-
  rendered facts, and writes one stable status.
- When an option supplies `product_url`, the coordinator requests that same-origin
  sibling product and updates the visible path as well as `variant` or
  `option_values`. The incoming product URL becomes the base for later selection.
- The neutral runtime remains unchanged. Shopify-specific Liquid objects, target
  events, URLs and Section Rendering behavior do not become neutral properties.
- Live-store high-variant, unavailable, Combined Listing, app-block and theme-
  editor verification remains target release evidence, not a neutral human-review
  blocker.
- Variant Selector remains `pilot`; human review is required before `stable`.

## Public Boundary

The neutral API continues to expose repeated group label, option label, native
name/value, initial checkedness, required/group-disabled/option-disabled state,
commercial unavailable state and localized unavailable text. It does not expose
variant ids, product URLs, option-value ids, selling plans, inventory, request
state, structured data or target event payloads.

Framework adapters bind one controlled value or uncontrolled default per group.
Static Web remains natively uncontrolled after authored initial `checked` state.

## Accessibility

Sold-out and disabled are not communicated by color alone. Sold-out swatches use
an associated localized status and diagonal mark; sold-out pills use text plus a
line mark. Disabled values preserve the native disabled state and a distinct
reduced-emphasis treatment. Selected and focus-visible boundaries remain separate
in light, dark and forced colors.

## Performance

Variant Selector adds no neutral JavaScript. The shared target coordinator is
already budgeted as Shopify-only integration evidence and remains one listener,
one in-flight request and one bounded replacement per product surface. Combined
Listing support adds no catalogue payload, polling, timer, storage or analytics.

## Consequences

- Buyers can inspect sold-out merchandise without gaining a purchasable form
  state.
- Impossible combinations are not falsely presented as inspectable stock states.
- Shopify high-variant and Combined Listing navigation share one server-rendered
  source of truth and one atomic update path.
- Neutral Web, React, future native targets and Figma preserve the same semantic
  states without depending on Shopify objects or URLs.
- Human review still must approve swatch/pill geometry, hidden label treatment,
  selected/focus/unavailable/disabled visuals, spacing and typography.
