# 0059. Price Semantic Content And Sale Composition

Status: Accepted

Date: 2026-07-12

## Context

Price had canonical CSS for current, compare-at, and unit-price content, but its
contract exposed no semantic properties. It also duplicated `on-sale` as both a
variant and a state, the canonical Exhibit showed two prices at once, and the
Shopify snippet used a non-existent current-price modifier while nesting a
sold-out Badge inside the Price root.

## Decision

- Price remains a passive display primitive with one size.
- Price exposes `currentPrice`, `compareAtPrice`, `unitPrice`, `variant`, and
  `accessibleLabel`.
- Monetary values are already-formatted strings supplied by the target. Price
  does not own numeric amount parsing, currency selection, or locale formatting.
- `currentPrice` is required. Compare-at and unit-price content are optional and
  their elements are omitted when no value is supplied.
- Default is the classless variant. `on-sale` maps to `.price--on-sale` on the
  root and is not duplicated as a state.
- Current price uses the primary text color in both variants. On-sale meaning is
  communicated by the compare-at value and strikethrough, not an error color.
- An optional localized `accessibleLabel` maps to `aria-label` on the root so a
  target can explain compare-at meaning without relying on color or
  strikethrough alone. Implementations that supply it expose the aggregate as a
  named group.
- Sold-out status remains an external Badge composition. It is not a Price
  variant, state, or child owned by the Price primitive.
- Studio sample amounts and labels are fixtures, not component defaults.
- Shopify uses its money filters for formatted strings and composes the
  canonical root and element classes.

## Consequences

- Neutral-web, Studio, and Shopify share one small semantic surface without
  coupling the source contract to a money library.
- Consumers may change locale and currency formatting independently from Price
  presentation.
- Product cards and product-detail compositions decide where sold-out status is
  rendered relative to Price.
- Future tax labels, price ranges, subscriptions, installment messaging, and
  structured currency amounts require separate explicit decisions rather than
  expanding this passive primitive implicitly.
