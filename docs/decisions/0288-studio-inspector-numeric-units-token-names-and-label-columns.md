# 0288. Studio Inspector Numeric Units, Token Names, And Label Columns

Status: Accepted

Date: 2026-08-25

## Context

Studio exposed simple dimensional tokens through text inputs that visually
separated the number from the unit, but derived the unit from the editable
value itself. A mistyped or malformed suffix such as `xp` therefore became part
of the custom-property override. The browser rejected the complete value and a
Card radius authored as `100` appeared to collapse to `0px`.

The inspector also transformed token identifiers by replacing every hyphen
with a slash before removing their complete technical prefix. Tokens such as
`--shadow-sm` and `--tg-space-component-xs` consequently appeared with a
misleading `//` prefix. Finally, every control row reserved a fixed `64px`
label column, forcing ordinary labels onto multiple lines even when the panel
had enough room.

## Decision

- Simple numeric tokens use a number-only editor. Studio owns the token's CSS
  unit, shows that unit as a small badge beside the human-readable token name,
  and writes a valid combined value such as `100px` or `350ms` to the preview.
- Pasting or typing a supported unit remains tolerant: Studio extracts the
  number and writes it with the canonical unit. Empty or invalid drafts do not
  replace the last valid preview value.
- Composite values such as box shadows remain complete text values. Studio
  does not present a misleading single-unit badge for them.
- Display names remove the CSS custom-property, Gallery, and known token-family
  prefixes before converting hierarchy separators to `/`. The technical token
  identifier remains available as the control title.
- The complete Customize panel shares one label column. It grows to the widest
  visible label across all groups up to `128px`; labels remain on one line while
  they fit and wrap only after that cap. Every control continues to fill the
  common right column.
- These rules belong to the shared site-owned `StudioInspector`. They apply to
  every Customize panel without changing component contracts, canonical CSS,
  adapter output, Exhibit fixtures, or maturity status.

## Consequences

- Numeric edits remain immediately visible because Studio cannot emit a
  malformed unit from a number-only field.
- Token labels describe hierarchy without leaking raw CSS punctuation.
- Customize rows preserve a consistent two-column rhythm while still bounding
  label width on narrow panels.
- Component stability remains an independent human decision.
