# 0057. Radio Native Group And Validation Composition

Status: Accepted

Date: 2026-07-12

## Context

Radio had only Default, Checked, Hover, and Focus selectors. It used hard-coded
control dimensions and spacing, exposed no semantic properties, did not cover
disabled or required behavior, and did not implement the accepted Error,
Success, and Warning field-validation families.

## Decision

- Radio keeps a native `input[type="radio"]` inside a wrapping label.
- Related radios use one shared native `name`; Fieldset and Legend own the group
  question and boundary.
- Radio exposes `label`, `name`, `value`, `variant`, `checked`, `disabled`,
  `required`, and `describedBy` properties.
- Default, Error, Success, and Warning are independent from native checked state.
- Validation color covers the control border, selected dot, label, hover, and
  focused outer ring. Hover preserves the active validation family.
- Focus uses the accepted lighter `4px` outer ring with no gap.
- Radio owns visual validation and `aria-invalid`/`aria-describedby` on its
  native control. Field Wrapper owns feedback content.
- Control size and label gap reuse the existing Input icon spacing tokens.
- Radio retains one default `20px` control size. Alternate sizes are not
  inferred.
- Native disabled, required, form submission, reset, arrow-key movement, and
  mutual exclusion remain intact.
- Forced-colors mode restores native radio appearance, and reduced-motion mode
  removes the control transition.

## Consequences

- Radio and Checkbox now share one validation-composition boundary without
  collapsing their different native selection semantics.
- Named-group behavior remains the responsibility of native HTML rather than
  custom JavaScript.
- Future alternate sizes, custom selected indicators, or non-native radio-group
  widgets need separate explicit decisions.
