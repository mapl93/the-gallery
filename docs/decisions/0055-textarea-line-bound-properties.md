# 0055. Textarea Line-Bound Properties

Status: Accepted

Date: 2026-07-12

## Context

Textarea already exposes resize direction through ADR 0053. The owner also
requires configurable minimum and maximum visible line counts so native resizing
can be constrained without hard-coded consumer CSS.

HTML provides a `rows` attribute for initial height but no native maximum-row
constraint, and `rows` alone does not establish both resize boundaries. The
component therefore needs a progressive mapping from semantic line counts to
CSS minimum and maximum heights.

## Decision

- Textarea exposes numeric `minLines` and `maxLines` properties.
- `minLines` defaults to `4`, preserving the existing approximately `120px`
  minimum. It maps to `data-min-lines` when configured away from the default.
- `maxLines` is optional. Its absence means no maximum and its presence maps to
  `data-max-lines`.
- Both properties accept positive whole numbers with a step of `1`.
- The shared web enhancer calculates pixel boundaries from computed line height,
  vertical padding, and borders, then writes component-private CSS variables.
- An effective maximum lower than the effective minimum is clamped to the
  minimum. Studio also normalizes its values to keep the inspector coherent.
- The enhancer observes attribute changes, added fields, font readiness, and
  viewport resize so target output remains aligned with computed typography.
- The behavior remains progressive: without JavaScript, the established
  `120px` minimum and unbounded maximum remain functional fallbacks.

## Consequences

- Consumers can constrain native resize using line counts rather than duplicated
  pixel formulas.
- Typography token changes continue to determine the physical height of a line.
- The attributes are component API, while `--_textarea-min-height` and
  `--_textarea-max-height` remain private implementation details.
- Auto-grow, character-based sizing, persistence of user-resized dimensions, and
  a disabled-resize option remain separate future decisions.
