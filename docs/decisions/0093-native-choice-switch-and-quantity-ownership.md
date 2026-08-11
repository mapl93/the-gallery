# 0093. Native Choice, Switch, And Quantity Ownership

Status: Accepted

Date: 2026-07-13

## Context

Radio, Quantity Selector, and Switch already use native inputs, but their pilot
contracts did not describe a complete controlled/uncontrolled boundary. Radio's
custom selected state rendered as a hollow ring, Quantity duplicated the HTML
stepping algorithm and could preserve a step mismatch, and Switch blurred
immediate on/off semantics with Checkbox while omitting submitted value behavior.

The v1 refinement program also requires later controls to apply the accepted
field contrast, first-line alignment, logical geometry, reduced-motion, and
forced-colors rules without creating target-specific state owners.

## Decision

- Radio remains one native `input[type="radio"]` inside a visible wrapping
  label. Fieldset/Legend owns the named group question and Field Wrapper owns
  associated feedback.
- Static Radio `checked` establishes default checkedness. Native named groups own
  later mutual exclusion, keyboard movement, `input`/`change`, validity,
  FormData, and reset. Framework adapters control one group value rather than
  independent booleans that can produce multiple checked items.
- Radio keeps one `20px` control centered in a `24px` body line. Its checked
  presentation is a central dot separated from the boundary by the field
  surface, not a hollow selected ring.
- Quantity Selector keeps one editable native `input[type="number"]` as its sole
  value, constraint, validity, form, and reset owner. Decrement and increment
  buttons are explicit named actions and do not store a second quantity.
- Quantity exposes `name`, `required`, and `readOnly`. Read-only quantity remains
  focusable and submittable while both step actions are unavailable; disabled
  quantity remains unavailable and omitted from native form data.
- Quantity button enhancement calls native `stepDown()` and `stepUp()` so HTML
  owns step-base alignment. A non-positive, invalid, or unsupported step falls
  back to `1` in adapter behavior. Button actions emit bubbling `input` and
  `change` only when the native value changes.
- Static Quantity `value` establishes the initial value. Native editing owns the
  later value; framework adapters may bind the live value and native events
  without a hidden mirror field.
- Switch is an immediate binary on/off setting. It has no indeterminate state,
  its visible label does not change with checkedness, and target consumers own
  the immediate side effect, persistence, pending state, and failure recovery.
- Neutral Web Switch uses one native `input[type="checkbox"]` with
  `role="switch"`. It exposes submitted `value` with the native default `on`,
  plus `name`, `checked`, `required`, `disabled`, and associated description.
- Static Switch `checked` establishes default checkedness. Native input owns later
  Space/click, `input`/`change`, FormData, validity, and reset. Framework adapters
  expose checked/defaultChecked and change without a mirror state owner.
- Radio, Quantity, and Switch apply the accepted private `70%` semantic/text mix
  to non-text semantic boundaries and indicators and the `55%` mix to semantic
  label text where applicable. No new public color token is introduced.
- Their default off or unselected boundaries apply the accepted private `60%`
  default-boundary/text mix so the neutral control remains perceivable against
  its field surface in both themes.
- Switch thumb placement and Quantity separators use logical inline geometry.
  Radio and Switch labels use stable body leading, bounded inline size, and
  anywhere wrapping. Reduced motion stops decorative transitions; forced colors
  uses native or system-color presentation.

## Consequences

- Native Web form, constraint, keyboard, and reset behavior remains authoritative.
- React, Angular, Shopify, SwiftUI, Compose, and future targets translate the same
  semantic ownership without copying a Web-only state model.
- Radio does not become a separate custom Radio Group component; a future
  first-class group API still requires its own accepted decision.
- Quantity inventory and cart persistence and Switch immediate side effects stay
  outside the target-agnostic base.
- Quantity's contract schema still cannot express mathematical
  `exclusiveMinimum: 0`; the documented and tested adapter fallback to `1`
  handles non-positive step without expanding the schema in this decision.
- Switch retains its existing Small, Default, and Large visual sizes. Their final
  proportions and all three components' visual treatment still require explicit
  human approval before stability promotion.
