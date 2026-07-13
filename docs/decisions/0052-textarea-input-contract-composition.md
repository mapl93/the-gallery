# 0052. Textarea Input Contract Composition

Status: Accepted

Date: 2026-07-12

## Context

Textarea already composes the canonical Input classes for its label, field,
message, validation variants, and interaction states. Its previous contract and
documentation described only a Default variant, which understated the behavior
implemented by that composition and left Studio without an interactive renderer.

Creating a separate Textarea field hierarchy would duplicate Input selectors,
tokens, and accessibility rules. Treating Textarea as visually identical to a
single-line Input would also erase its native multi-line value and resize
semantics.

## Decision

- Textarea composes the canonical `.input` root, `.input__label`,
  `.input__field`, and `.input__message` anatomy.
- The native field combines `.input__field` and `.textarea__field`.
- Textarea inherits the shared Default, Error, Success, and Warning variants and
  their hover, focus-visible, disabled, and validation-focus behavior.
- `.textarea__field` owns only the established multi-line differences: a
  `120px` minimum height and vertical resizing.
- The semantic property surface is `label`, `value`, `placeholder`, `message`,
  `variant`, and `disabled`.
- A textarea value maps to native element content, not to a `value` attribute.
- Textarea does not expose Input icon slots. Adding adornments or icon
  composition requires a separate accepted component decision.
- Studio may reuse Input renderer infrastructure, but it must render a real
  `<textarea>` and omit controls that Textarea does not own.
- No new public Textarea token, semantic size property, or component-token layer
  is introduced for the existing minimum height in this cycle.

## Consequences

- Textarea stays aligned with future accepted Input field-state changes without
  duplicating the field token hierarchy.
- Contracts, docs, Studio, and adapters now describe the behavior already
  supplied by canonical source composition.
- Password Input, Number Input, and other Input-derived fields may use this as a
  composition precedent, but each still requires its own anatomy and behavior
  review before certification.
- A future request for alternate Textarea heights, fixed resizing, auto-grow, or
  icon adornments remains an explicit product decision rather than an inferred
  API.
