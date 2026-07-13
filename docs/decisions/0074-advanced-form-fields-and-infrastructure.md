# 0074. Advanced Form Fields And Infrastructure

Status: Accepted

Date: 2026-07-12

## Context

The remaining Forms components had structural CSS contracts but incomplete
semantic properties, inconsistent field presentation, and static documentation
fixtures. Combobox and Date Picker did not yet own a complete input surface,
while Password Input consumed Input field styles without composing the Input
root that defined their private variables. Form infrastructure also lacked the
property boundaries needed by Studio.

## Decision

- Combobox, Date Picker, and Password Input expose the same independent
  `default`, `error`, `success`, and `warning` validation axis used by the
  other value-entry fields.
- Hover preserves the active validation family. Focus uses the accepted
  four-pixel, zero-offset outer ring and the matching inner border.
- Combobox owns its editable text input and listbox relationship. The listbox
  may grow independently from the input up to a viewport-safe maximum.
- Date Picker owns a native text input and a custom calendar surface. Open,
  selected date, today, outside-month, disabled day, and validation states are
  separate concerns.
- Password Input owns complete field styling instead of depending on private
  Input variables. Visibility and text-backed strength are independent from
  validation. Studio uses Lucide Eye and EyeOff fixtures only.
- Field Wrapper owns label, helper text, required indicator, and feedback
  composition. It may present the four feedback families, but the composed
  control remains responsible for native required and invalid state.
- Fieldset preserves native `fieldset`, `legend`, `disabled`, and description
  association semantics. It is not a generic decorative container.
- Inline Error owns visible message content, an optional decorative icon, and
  announcement priority. The invalid control owns `aria-invalid` and
  `aria-describedby`.
- Form exposes only existing layout and composition behavior: responsive row
  columns, optional actions, optional error summary, native validation policy,
  and autocomplete policy. Submission, pending state, validation logic, and
  error-summary focus management remain target-owned behavior.
- Operational form headings and legends use the body font family.
- No new public tokens are introduced. All additions consume existing input,
  feedback, typography, spacing, radius, shadow, motion, and opacity tokens.
- Studio renders the canonical web classes with site-owned example content and
  interactions. Fixture labels, options, dates, icons, and form values are not
  component defaults or target-agnostic API.

## Consequences

- All fifteen Forms components now have reviewed semantic property surfaces
  and interactive or compositionally faithful Studios.
- Validation behaves consistently across direct fields without conflating
  selected, checked, open, visible, strength, or disabled state.
- Form infrastructure can be reused by later commerce and account components
  without duplicating label, feedback, grouping, or error-summary decisions.
- Contracts remain `pilot` until owner review and the applicable neutral-web
  certification gates are complete.
