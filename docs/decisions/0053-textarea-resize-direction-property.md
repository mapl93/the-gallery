# 0053. Textarea Resize Direction Property

Status: Accepted

Date: 2026-07-12

## Context

ADR 0052 preserved Textarea's existing vertical resize behavior and deferred
alternate directions until an explicit product request. The owner has now
requested configurable vertical, horizontal, and bidirectional resizing.

Resize direction is independent from validation variant and component size. It
must therefore remain a separate semantic property rather than becoming another
variant axis or a token value.

## Decision

- Textarea exposes a `resize` enum with `vertical`, `horizontal`, and `both`.
- `vertical` remains the default and requires no web attribute, preserving
  existing markup and behavior.
- `horizontal` maps to `data-resize="horizontal"` on `.textarea__field`.
- `both` maps to `data-resize="both"` on `.textarea__field`.
- The property uses native CSS `resize` behavior and requires no JavaScript.
- Resize direction is not a validation variant, size, or design token.
- Studio presents the property as a segmented Layout control and renders the
  actual native textarea for all three choices.
- No `none` option is added because disabling resizing was not requested.

## Consequences

- Consumers can choose the resize axis without replacing or overriding the
  canonical component CSS.
- Existing Textarea markup remains vertically resizable by default.
- Horizontal and Both may change a field's inline size; consumers remain
  responsible for placing them in a layout that can accommodate native resize.
- Any future `none`, auto-grow, minimum/maximum dimensions, or resize persistence
  behavior requires another explicit component decision.
