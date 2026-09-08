# 0275. Required Field Indicator Standard

Status: Accepted

Amended by ADR 0295: the required marker now uses the public semantic
`--color-field-required` color with a red default instead of inheriting the label.

Date: 2026-08-12

Owner confirmation: apply the centered Select required asterisk consistently
to every field that exposes a required property

## Context

During the human review of Select, the owner accepted a visible asterisk beside
the label, aligned with the text rather than raised like a superscript. The
repository already exposed `required` across native inputs, choice controls,
composite fields, and commerce option groups, but the visual treatment was not
consistent: some fields used a textual `(required)`, some used a raised or
validation-colored marker, and some showed no visual change.

The marker must improve visual recognition without replacing native form
semantics, duplicating group markers on every choice, or inventing a visible
label for a component whose target composition deliberately supplies only an
accessible name.

## Decision

- Every component whose public contract exposes `required` shows one decorative
  `*` when it has a visible owned or composing label, legend, or primary field
  instruction.
- The marker is optically centered with that text, uses a `0.25em` inline gap,
  uses `--color-field-required` (ADR 0295), and is not rendered as a superscript.
- Native `required`, native constraint validation, or an explicit
  `aria-required` composition remains the semantic authority. The marker alone
  never makes a field required.
- The generated marker uses an empty accessible alternative and is not included
  in the label or legend text. Assistive technologies receive requiredness from
  the native or ARIA state.
- A named choice group shows the marker once on its group legend. Radio,
  Segmented Control, Color Picker, Star Input, Subscription Option, and Variant
  Selector do not repeat it on every option label.
- Checkbox and Switch place the marker on their single visible choice label.
- File Upload places it on the primary upload instruction that labels its native
  file input.
- Composite controls such as Combobox, Date Picker, Number Input, Password
  Input, Pin Input, Quantity Selector, and Tags Input use the composing Field
  Wrapper label. If a target intentionally supplies only an accessible name,
  the adapter does not invent a visible label solely to display an asterisk.
- `required` remains a semantic boolean property. It is neither a variant nor an
  interaction state.
- Target adapters translate this rule to their native presentation mechanisms
  while preserving the same single-marker and semantic-authority boundaries.

## Web Projection

- Family CSS owns independently installable marker selectors and the shared
  optical treatment.
- Native `:required` or `aria-required="true"` may activate the marker through
  composition selectors. Explicit `--required` classes remain available for
  generated renderers and targets that project contract mappings directly.
- Text fixtures and target locales use the plain label text; `(required)` is not
  embedded in localized content.

## Certification Consequences

- A component with a public `required` property cannot become `stable` if its
  visible required affordance contradicts this decision.
- Group controls must prove one group-level marker rather than one marker per
  option.
- Visual evidence must confirm that toggling Required changes the marker and the
  semantic required state together without changing the accessible label text.
- Applying this rule does not promote any component. Each component still
  requires its own dependency-ordered human visual approval.
