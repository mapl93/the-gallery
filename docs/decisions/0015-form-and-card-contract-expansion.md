# 0015. Form And Card Contract Expansion

Status: Accepted Initial Implementation

Amended by: `0047-custom-select-progressive-enhancement.md`

Date: 2026-05-23

## Context

After Button and Input, the next contract pilots were chosen in this order:

1. Textarea.
2. Select.
3. Card.

This order tests two useful cases:

- Form controls that share or extend Input anatomy.
- A non-form layout primitive with media/body/footer anatomy and visual variants.

## Decision

Add three component contracts:

```text
components/contracts/textarea.contract.json
components/contracts/select.contract.json
components/contracts/card.contract.json
```

## Textarea

Textarea extends Input. The contract makes that dependency explicit:

```text
dependencies: ["input"]
```

The docs example now uses the correct composition:

```html
<div class="input">
  <label class="input__label">Message</label>
  <textarea class="input__field textarea__field"></textarea>
</div>
```

This keeps Textarea aligned with the existing CSS, where `.textarea__field` only adds textarea-specific behavior while `.input__field` provides shared control styling.

## Select

Select is a standalone native form control contract with:

- Root `.select`.
- Label `.select__label`.
- Field `.select__field`.
- Generated indicator as a background image.
- Default, hover, and focus-visible states.

## Card

Card is the first non-form layout contract. It captures:

- Root `.card`.
- Optional `.card__media`.
- Optional `.card__body`.
- Optional `.card__footer`.
- Variants: default, flat, elevated.
- Hover, media hover, flat hover, and elevated hover states.

## Validator Adjustment

Components without explicit registry variants now default to a `default` variant for contract validation. Components without explicit registry sizes already default to a `default` size.

This keeps registry metadata concise while contracts remain explicit.

## Consequences

- The contract layer now validates five components: Button, Input, Textarea, Select, and Card.
- The schema covers compact actions, form controls, form-control extensions, native selects, and layout containers.
- Textarea's actual dependency on Input is now executable contract data.

## Follow-Up Work

- Add Checkbox and Radio to continue the form-control family.
- Add Modal or Drawer to test interactive behavior requirements.
- Add contract metadata to the docs UI once enough components are covered.
