# 0108. Semantic Target-Formatted Price Parts

Status: Accepted

Date: 2026-07-14

## Context

Price previously presented current, compare-at, and unit strings in generic
spans. The compare-at meaning depended on CSS line-through and an optional named
ARIA group, mixed-direction values were not isolated, and long localized ranges
had no explicit wrapping or line-height contract. The Shopify snippet also
assembled unit pricing manually, which omitted non-unit reference values and
bypassed Shopify's localized measurement formatter.

There is no WAI-ARIA APG or Open UI Price widget. HTML already supplies a native
`s` element for content that is no longer accurate or relevant, including prior
retail prices. Locale, currency, precision, ranges, rounding, and measurements
belong to target formatters and commerce data. ADR 0061 separately accepts five
independent OpenType switches for Price and remains in force.

## Decision

- Price is a passive, target-formatted commerce primitive. It owns stable
  current, compare-at, unit, label, and isolated-value parts; it does not parse,
  calculate, validate, fetch, announce, or serialize money data.
- The root is ordinary inline content with no widget, group, status, live-region,
  focus, keyboard, or controlled/uncontrolled semantics.
- The required current value and optional unit value render as text parts. The
  optional compare-at value renders in native `s` only when the target selects
  `on-sale` and supplies a commercially valid relationship.
- Every rendered value uses `bdi`. Targets may provide localized hidden
  `Price`, `Sale price`, `Regular price`, and `Unit price` text as ordinary DOM
  content. Sale meaning must not depend on color or line-through alone.
- `currentPrice`, `currentPriceLabel`, `compareAtPrice`,
  `compareAtPriceLabel`, `unitPrice`, `unitPriceLabel`, and `variant` are the
  semantic content API. The former aggregate `accessibleLabel` and artificial
  group role are removed.
- `alternateDigits`, `slashedZero`, `tabularNumbers`,
  `contextualAlternates`, and `fractions` remain the accepted independent
  presentation switches from ADR 0061. Unsupported font features fail
  progressively.
- Price has one container-responsive size and one passive state. Current uses
  the primary H4 hierarchy; compare-at uses secondary body text; unit uses
  secondary body-small text. Wrapping, gap, weight, strike treatment, hidden
  label mechanics, BDI, and forced-color mapping remain private composition.
- The target owns amounts, currencies, locale, rounding, ranges, free or
  unavailable wording, tax/duty/legal copy, selling plans, deposits, discount
  truth, structured data, and dynamic update announcements.
- Shopify maps product or selected-variant money through platform filters,
  localized label keys, native `s`, `bdi`, and
  `unit_price_with_measurement`. Product-wide versus selected-variant policy,
  volume pricing, and announcement cadence remain adapter/product decisions.
- Exhibit and Studio render the same `PriceStudio` implementation and fixture.
  The contract remains `pilot`; automated evidence does not imply human visual
  approval or `stable` promotion.

## Performance

Price adds no neutral listener, observer, timer, formatter, request, measurement
loop, asset, framework, or runtime state. Deterministic level-9 gzip measures:

- Primitives CSS: `10,454 B` against the provisional `10.3 KiB` ceiling,
  leaving `93 B`.
- Neutral Web component CSS: `64,484 B` against the `64 KiB` ceiling, leaving
  `1,052 B`.
- Shared neutral runtime: `10,321 B`, unchanged.

Relative to the Batch 23 baseline, Primitives adds `98 B`, the complete Web
component bundle adds `92 B`, and neutral runtime adds `0 B`. The CSS delta pays
for explicit type pairs, wrapping, hidden labels, and forced-color behavior; it
does not reset the existing shared-runtime exception.

## Consequences

- Neutral Web and Shopify share a portable semantic boundary without placing
  commerce policy or formatting logic in canonical CSS/HTML.
- React, Angular, Hydrogen, SwiftUI, and Compose adapters may use target-native
  formatters/providers, but they pass or render complete formatted content and
  retain target-owned announcements.
- Figma and Studio can expose stable content, variant, OpenType, and public token
  controls without modeling raw money data, locale algorithms, legal policy, or
  arbitrary private CSS.
- Product Card, Product Info, cart, checkout, and future pricing-table consumers
  compose Price and own their data/update lifecycle. Sale/Sold out Badge,
  financing, tax, tier, and currency controls remain adjacent components.
- Current/compare/unit hierarchy, order, spacing, strike, and color strength are
  prepared candidates that still require explicit human visual approval.
