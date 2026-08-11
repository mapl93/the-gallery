# ADR 0177: Canonical Progress Profile And Derived Shipping Threshold State

Date: 2026-07-16

## Status

Accepted

## Context

K5 Free Shipping Bar declared Progress as a dependency but copied a separate
track, fill, color, radius, height, width variable and transition. Its public
API exposed generic `text`, required value/max, and an independent `achieved`
boolean. Studio hardcoded an English progress name and resolved contradictory
state with `achieved || value >= max`; static MDX maintained another markup
implementation.

Money-like range values also need a localized human-readable interpretation.
ARIA progressbar is read-only, requires an accessible name, expects a current
value within its declared range, and is generally announced as a percentage
unless `aria-valuetext` is supplied.

Commerce targets do not share one eligibility calculation. Shopify alone
exposes `items_subtotal_price` after line-item discounts but before cart
discounts and `total_price` after discounts. Threshold source, excluded goods,
markets, currency, taxes, destinations, placement and cart refresh are product
and target decisions.

## Decision

1. K5 is a passive commerce message plus the determinate Bar profile of
   canonical Progress. It uses `.progress`, `.progress__track` and
   `.progress__bar` rather than K5-owned track/fill implementations.
2. K5 requires `message`, `accessibleLabel`, `value` and positive `max`, and
   accepts optional `valueText`. Generic `text` is renamed to `message` and no
   compatibility alias is added while the contract remains pilot.
3. Remove the `achieved` property. K5 fixes min at zero, clamps the visual and
   accessible current value together, and derives `.shipping-bar--achieved`
   when the clamped value reaches max.
4. Blank required message/name, non-finite value/max, and non-positive max are
   invalid composition. The shared renderer emits no K5 output for them.
5. The root is a passive `div`, not a section, landmark or live region. The
   message is a paragraph. K5 has no focus, keyboard, pointer or neutral event
   contract.
6. The visible message must explicitly communicate remaining or achieved
   meaning. Full width and achieved text emphasis are supplementary and cannot
   make the eligibility claim alone.
7. The target owns qualifying amount, threshold, currency formatting,
   eligibility rules, cart lifecycle and meaningful announcement cadence. K5
   itself does not announce frequent value changes.
8. K5 has one intrinsic composition, no public Progress variant, size, tone or
   animation properties, no external margin, and no neutral runtime.
9. Exhibit and Studio consume one `FreeShippingBarArtwork`, which consumes one
   shared `ProgressArtwork` also used by the canonical Progress Studio.
10. Shopify may expose a parameter-driven Liquid snippet, but the adapter does
    not choose a cart monetary property, merchant setting, placement or refresh
    strategy. It remains planned until those decisions and live/editor proof
    exist.

## Consequences

- Progress semantics, range projection, reduced motion, forced colors and
  visual bar mechanics have one canonical docs-target implementation.
- Consumers of pilot `text` migrate to `message`; consumers of `achieved`
  remove the override and supply a coherent value/max/message projection.
- Targets with exceptional non-amount eligibility can project `value=max` after
  authoritative success, but cannot ask K5 to show contradictory numeric and
  achieved states.
- Optional `valueText` can describe localized money-like progress while the
  visible message remains complete and non-duplicative.
- K5 no longer publishes Progress-owned track/fill/radius/motion tokens or
  relies on a success color. Its own surface, message, border, typography,
  spacing and radius remain semantic composition decisions.
- A parameter-driven Shopify snippet can translate the neutral contract without
  turning one possible subtotal or threshold into system-wide product policy.
- Visual surface, canonical primary fill, achieved emphasis and density still
  require explicit human review. Contract remains `pilot`; this decision does
  not authorize `stable` promotion.
