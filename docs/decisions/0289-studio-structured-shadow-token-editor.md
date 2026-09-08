# 0289. Studio Structured Shadow Token Editor

Status: Accepted

Date: 2026-08-25

## Context

Studio exposed a shadow token as one editable CSS string such as
`0px 4px 6px -1px rgba(23, 23, 23, 0.10)`. Although this preserved the raw
custom-property value, it required an owner to remember CSS box-shadow order,
syntax, units, and alpha notation. Narrow token fields also truncated the
string and made changes difficult to understand or author safely.

The owner referenced Figma's separated shadow controls and requested the same
concept without requiring a popover.

## Decision

- A Studio token control whose presentation category is `shadow` renders an
  inline structured editor instead of a raw CSS text input.
- The editor exposes individually named X, Y, Blur, Spread, Color, and Opacity
  fields. Length fields accept numbers and show their unit as a badge; opacity
  is presented as a percentage; color provides both a native picker and an
  editable hexadecimal value.
- The editor shows the normalized token name and a small live shadow sample.
- Every valid field edit serializes back to the same public shadow custom
  property and updates the preview immediately. Invalid or incomplete drafts
  do not replace the last valid value.
- Blur and opacity are bounded to valid ranges. X, Y, and spread retain signed
  values. Reset restores the current theme's canonical token value.
- The implementation lives in the shared site-owned `StudioInspector`. It
  applies to the current 22 shadow controls across 20 Studio panels without
  adding component properties, changing source tokens, or altering adapters.
- A shadow value outside the supported single-layer token anatomy falls back to
  the existing complete text editor rather than being partially interpreted.

## Consequences

- Owners can edit shadows without knowing CSS value order or alpha syntax.
- The public token remains the sole preview override; the structured fields are
  presentation and authoring affordances, not a new semantic contract.
- Card and every other affected component retain their current maturity status
  until independently approved through human review.
