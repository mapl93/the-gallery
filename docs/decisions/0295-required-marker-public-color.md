# 0295. Public Required-Marker Color

Status: Accepted

Date: 2026-09-08

## Context and decision

The owner approved the Button/Select/contact composition and requested a public
color token for the required asterisk, red by default. This supersedes the
`currentColor` choice in ADR 0275; its centered placement, empty accessible
alternative, single marker per group and native/ARIA semantic authority remain.

- `color.field.required` is a shared semantic color, separate from error state.
  It aliases `color.red.600` in Light and `color.red.400` in Dark.
- The generated public alias is `--color-field-required`. All four independently
  installable marker rules in primitives, forms, product and reviews consume it.
- The 20 contracts with a `required` property, plus Fieldset (whose marker derives
  from its required radio children), expose this color. Their Studio metadata
  provides a Required marker swatch, also listed by the shared Exhibit reference.
- A fixed swatch with one explicit token may resolve from metadata in the common
  inspector. Explicit renderer state mappings, including null, remain authoritative.
  This avoids copying the same fixed-token mapping into every field renderer.
- Changing validation variant does not change the marker color. Brand overrides
  should recheck visibility on their actual surfaces.

## Button measurement

The owner also asked whether the contact action had more padding on its right.
Browser measurements show 20 px on both sides, and a 21 px inset (including the
border) to both the label box and the icon box. The 20 px ArrowRight SVG uses a
24-unit viewBox; its stroke ends around coordinate 20, leaving approximately
3.33 px of empty space inside the icon's right edge. This explains the visual
difference. Button padding and the icon geometry are unchanged by this correction.

No new component maturity promotion, consumer-copy migration, Figma write,
Shopify remote change or publication is part of this follow-up.
