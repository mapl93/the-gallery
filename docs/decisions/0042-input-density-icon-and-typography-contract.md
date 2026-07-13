# 0042. Input Density, Icon, And Typography Contract

Status: Accepted

Date: 2026-07-12

## Context

Input rendered at `50px` high because its `16px / 24px` value text used `12px`
vertical padding. Its generic icon class had size and color but no accepted
positioning anatomy. Input typography sizes were also exposed under public
`--space-input-*` names even though they represent typography.

The owner reviewed these gaps before neutral-web certification.

## Decision

- Default Input vertical padding is `10px`, producing a `46px` field with the
  existing `24px` value line height and `1px` borders.
- Input supports independent passive `leadingIcon` and `trailingIcon` slots that
  may coexist inside `.input__control`.
- Passive icons never become action controls. Interactive field affordances use
  specialized components such as Password Input.
- Positioned icons compose `.input__icon` with `.input__icon--leading` or
  `.input__icon--trailing` and use an `8px` public icon gap.
- Input exposes semantically named `--typo-input-*` size and line-height aliases.
- Existing `--space-input-*-size` aliases remain generated as compatibility
  aliases but are no longer part of Input's reviewed public contract.

## Consequences

- Input has a denser default presentation aligned with the stable `16px` body
  scale.
- Icon composition has explicit anatomy, spacing, and accessibility guidance.
- Studio can demonstrate every reviewed semantic property and public token while
  rendering the canonical Input implementation.
- Existing consumers of the old size aliases are not broken during migration.
