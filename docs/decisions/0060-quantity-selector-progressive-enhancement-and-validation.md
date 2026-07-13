# 0060. Quantity Selector Progressive Enhancement And Validation

Status: Accepted

Date: 2026-07-12

## Context

Quantity Selector had canonical structure and styling, but its decrement and
increment buttons were inert in neutral web. Its contract also omitted the
validation variants required for value-entry fields by ADR 0049 and ADR 0050.
Shopify rendered compatible data attributes, yet no shared behavior consumed
them.

Quantity Selector is a compact commerce control. Duplicating visible label and
feedback anatomy inside it would overlap with Field Wrapper and make the control
harder to compose in product cards, cart lines, and forms.

## Decision

- Neutral web owns a progressive quantity enhancer in `components/js/theme.js`.
  It updates by `step`, clamps to `min` and `max`, emits bubbling `input` and
  `change` events, and synchronizes step-button availability.
- The native `input[type="number"]` remains the value and keyboard source of
  truth. Native Arrow Up and Arrow Down behavior is preserved.
- The semantic contract exposes numeric `value`, `min`, `max`, and `step`, plus
  whole-control `disabled`, the four accessible names/relationships, and the
  canonical validation variant.
- `disabled` makes the field and both buttons unavailable. A button disabled at
  `min` or `max` is a derived boundary state, not a separate public property.
- Quantity Selector exposes Default, Error, Success, and Warning by reusing the
  accepted Input semantic color and focus families. Hover preserves the active
  validation family and focus uses the accepted `4px`, zero-offset outer ring.
- Quantity Selector owns the compact control border and indicators. A composing
  Field Wrapper owns visible label and feedback content; `aria-describedby`
  connects that content to the native number field. Only Error sets
  `aria-invalid="true"`.
- Inventory rules, line-item persistence, and server synchronization remain
  target-owned. Neutral web only owns local stepping and native constraints.
- The component keeps one size. Fixed input width and icon geometry remain
  private implementation details rather than public tokens.

## Consequences

- Exhibit can demonstrate one functional quantity selector instead of a wall of
  examples.
- Studio can exercise semantic constraints, validation, disabled behavior, and
  every existing public token without inventing commerce defaults.
- Shopify reuses the same data attributes and shared enhancer while continuing
  to own cart naming and inventory values.
- The generic Number Input remains a separate later reconciliation; this
  decision does not merge or deprecate either component.
