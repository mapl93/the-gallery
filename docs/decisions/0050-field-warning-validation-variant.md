# 0050. Field Warning Validation Variant

Status: Accepted

Date: 2026-07-12

Amended by: ADR 0051 for validation-aware hover behavior.

## Context

The field validation requirement initially covered Default, Error, and Success.
The owner requested a fourth Warning variant in yellow for values that require
attention without necessarily being invalid.

The canonical token source already exposes semantic Warning colors through
`color.feedback.warning.default` and `color.feedback.warning.background`. A new
token source layer or component-specific value is unnecessary.

## Decision

- Every value-entry field includes a `warning` validation variant alongside
  `default`, `error`, and `success` before promotion to `stable`.
- Warning uses the existing semantic Warning family. Neutral-web compatibility
  aliases expose its label, message, icon, unfocused and focused inner border,
  and focused outer border roles.
- Warning covers the same available anatomy and `4px` focus-ring hierarchy as
  Error and Success.
- Warning communicates attention through associated descriptive text as well as
  color or an optional status icon.
- Warning does not set `aria-invalid` and does not use alert semantics merely by
  being present. Error remains the invalid state.

## Consequences

- Input and Select expose `.input--warning` and `.select--warning` in their
  current contracts, Studio definitions, docs, and generated adapters.
- The semantic color remains theme-aware and can be customized at the existing
  Warning token layer.
- Remaining value-entry fields must include Warning during their individual
  certification cycles or document a component-specific exemption.
