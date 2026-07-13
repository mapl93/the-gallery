# 0056. Checkbox Native State And Validation Composition

Status: Accepted

Date: 2026-07-12

## Context

Checkbox had only Default, Checked, Hover, and Focus selectors. Its contract did
not expose native form properties, disabled or indeterminate behavior, or the
field-wide Error, Success, and Warning validation variants. Adding messages
inside the wrapping label would duplicate Field Wrapper and make message clicks
toggle the control.

## Decision

- Checkbox keeps a native `input[type="checkbox"]` inside a wrapping label.
- Checkbox exposes `label`, `name`, `value`, `variant`, `checked`,
  `indeterminate`, `disabled`, `required`, and `describedBy` properties.
- Checked, disabled, required, name, and value retain native input behavior.
- `data-indeterminate="true"` is a progressive initialization hook for the
  native `indeterminate` property. User change clears the initial marker.
- Default, Error, Success, and Warning are independent from unchecked, checked,
  and indeterminate selection states.
- Validation color covers the box border, selected fill, label, hover, and
  focused outer ring. Hover preserves the active validation family.
- Focus uses the accepted lighter `4px` outer ring with no gap.
- Checkbox owns visual validation and `aria-invalid`/`aria-describedby` on its
  native control. Field Wrapper owns helper and validation message content.
- Field Wrapper gains the missing `.field__warning` message class so Error,
  Success, and Warning composition is symmetrical.
- Checkbox retains one default `20px` control size. Alternate sizes are not
  inferred.
- The Check and Minus indicators use Lucide geometry embedded in canonical CSS;
  neutral Web and Shopify do not gain a runtime icon dependency.
- Forced-colors mode restores native checkbox appearance, and reduced-motion
  mode removes the control transition.

## Consequences

- Checkbox can be certified without inventing a parallel message component.
- Radio and other choice controls may reuse the validation-ownership boundary,
  but their native state and indicator anatomy still require individual review.
- Indeterminate remains a visual/group-summary state; native form submission
  continues to depend on checked.
- Future alternate sizes, custom indicator slots, or tri-state form values need
  separate explicit decisions.
