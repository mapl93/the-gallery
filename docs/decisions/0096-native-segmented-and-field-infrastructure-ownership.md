# 0096. Native Segmented And Field Infrastructure Ownership

Status: Accepted

Date: 2026-07-13

## Context

Segmented Control, Field Wrapper, Fieldset, and Inline Error complete a shared
form-infrastructure layer, but their previous implementations did not agree on
native ownership, required composition, live-region timing, or Exhibit/Studio
fixtures. Segmented Control was visually radio-like without a canonical group
label or complete form lifecycle. Field Wrapper and Fieldset omitted their
central content slots from the public contract. Inline Error announced static
fixture content by default, even though live regions only help when content is
inserted or changed after the accessibility tree exists.

The refinement must preserve native browser semantics, remain target-agnostic,
reuse canonical controls, and avoid adding runtime for behavior already owned by
HTML.

## Decision

- Segmented Control is a compact single-choice field backed by one native
  `fieldset`, a visible `legend`, and same-name native radios. It is not Tabs, a
  navigation control, a multi-select toggle group, or a group of independent
  actions.
- Each segment has an authored label and stable submitted value. Native radios
  own mutual exclusion, focus, Arrow/Space behavior, `input`/`change`, required
  validity, FormData, and reset. Static `checked` is an uncontrolled default;
  framework adapters control one group value rather than independent booleans.
- Group disabled state maps to the fieldset; option disabled state maps to the
  individual radio. Required-invalid semantics do not automatically select the
  visual Error variant.
- Segment targets are at least `44px`. The horizontal surface may stack in a
  narrow container without changing source order, role, or native keyboard
  behavior. Focus, validation families, forced colors, and reduced motion use
  the accepted field hierarchy and existing public tokens.
- Field Wrapper is composition only: visible label, one required canonical
  control slot, optional helper description, and at most one current feedback
  message. It does not own value, validity, events, reset, disabled state,
  validation timing, or controlled/uncontrolled behavior.
- Target adapters or consumers author/generate label, control, description, and
  feedback ids. The composed control owns `required`, `aria-invalid`, and the
  ordered `aria-describedby` references. The wrapper adds no identity runtime.
- Fieldset maps directly to native `fieldset`/first `legend`, exposes one
  required content slot, and preserves native disabled propagation except for
  content inside the first legend. It is generic; fixtures may compose canonical
  Radio without making Radio a required Fieldset dependency.
- Field Wrapper and Fieldset own internal flow only. Parent layout owns exterior
  spacing; neither component imposes a bottom margin.
- Inline Error is a text-first associated message with a passive icon. Its
  default announcement mode is `none` for content already present at load.
  `polite` maps to status semantics and `assertive` maps to alert semantics only
  when a target inserts or changes urgent feedback dynamically. Association and
  announcement timing remain target-owned.
- Required slot controls in Studio are visible but cannot be switched off.
  Exhibit and Studio use the same renderer, fixture, canonical component
  markup, and native owner.
- All four components remain CSS/HTML-only and reuse existing public form,
  surface, type, spacing, radius, focus, opacity, and validation tokens. Target
  geometry, wrapping, color mixes, and internal alignment remain private
  composition.
- Automated readiness does not promote any contract to `stable`; explicit human
  visual and semantic approval is still required.

## Performance Exception

After this refinement, canonical Forms CSS measures `8,594 B` gzip against the
unchanged `6.4 KiB` family ceiling. Shared runtime remains `10,283 B` against the
unchanged `8 KiB` ceiling. The complete Neutral Web component CSS bundle measures
`60,422 B` and remains below its `64 KiB` ceiling.

Relative to Batch 10:

- Forms CSS adds `663 B` gzip for four complete component surfaces, including
  native state, validation-family preservation, container response, forced
  colors, reduced motion, and long-content containment.
- Shared runtime adds `0 B`; all interaction and lifecycle behavior remains
  native or target-owned.
- The Neutral Web component bundle adds `660 B` gzip and retains `5,114 B` of
  headroom under the global ceiling.
- No component adds a bundled asset, observer, timer, polling loop, or network
  request.

ADRs 0092 through 0095 already record the preceding Forms/runtime budget gaps.
This decision records the new delta and rationale without changing any ceiling.
Moving rules into site CSS or another family would hide source cost rather than
reduce it. The exception permits human-review readiness under ADR 0088; it does
not decide future CSS/runtime modularization.

## Consequences

- Neutral Web and Shopify generated adapters receive identical canonical CSS and
  native semantics. Dedicated Liquid/editor schemas and data mapping remain
  target-native work.
- React and Angular can map Segmented Control to one controlled group value and
  compose Field Wrapper/Fieldset without mirrored native state. Figma maps
  semantic properties and states but owns no form state or live-region timing.
- SwiftUI and Compose use their nearest native single-choice, field grouping,
  helper/error, and accessibility announcement owners while preserving the same
  semantic boundaries.
- Group labels, option labels/values, field labels, controls, legends, content,
  and inline-error messages are required authored/localized data where their
  corresponding slots are required. Empty required content is invalid
  configuration rather than a blank component state.
- Label scale, target density, selected treatment, validation hierarchy,
  field/fieldset spacing, and Inline Error presentation still require explicit
  human approval before any affected contract may become `stable`.
