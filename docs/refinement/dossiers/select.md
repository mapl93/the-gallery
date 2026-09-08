# Component Dossier: Select

Status: `stable`

Target reviewed: Neutral Web

Contract: `components/contracts/select.contract.json`

## Recommendation

Keep the accepted progressively enhanced single-choice Select and its native
`<select>` as the form-value owner. The generated trigger now follows the
select-only combobox pattern, reflects native `required`, and exposes stable
`name` and `required` properties. Multiple, listbox-sized, and grouped controls
remain native rather than losing semantics. Do not add search, free-form entry,
asynchronous results, or alternate sizes; those remain Combobox or owner-review
decisions.

## Purpose And Limits

- Select chooses one value from a finite, authored list.
- It is appropriate when the choice list is known and filtering is unnecessary.
- Combobox owns editable input, filtering, remote results, and free-form values.
- Radio owns small choice sets whose options should remain simultaneously
  visible. Menu owns actions, not form values.
- Select does not own validation policy, form submission, option fetching, or
  product-specific option semantics.

## Current Gallery Baseline

- Registry identity: `A3`, primitive, no component dependencies.
- Contract: `0.8.0`, `stable`; 12 anatomy parts, 4 validation variants, 1 size,
  9 states, 14 behavior rules, 6 properties, and 52 public tokens.
- The authored source is a label, native select/options, and optional message.
  `components/js/theme.js` generates the control, trigger, value, indicator,
  listbox, options, and selected checks only after enhancement succeeds.
- The native select remains the form owner and no-JavaScript fallback. Generated
  selection emits native `input` and `change` events.
- Exhibit and Studio use the shared renderer and fixture; the distributed
  enhancer was additionally exercised directly for progressive-enhancement,
  fallback, extreme-content, and native-form evidence.
- The automated neutral-web gate passes and the owner approved the complete
  component in the live review on 2026-08-12.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: select](https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element) | Native select owns name/value, disabled/required validity, options, reset, and form submission. | Preserve the native element as the canonical value and validity owner. |
| [Open UI customizable select](https://open-ui.org/components/customizable-select.explainer/) | Customizable select work aims to retain native semantics while enabling authored trigger and picker presentation. | Gallery's progressive enhancement direction is aligned, but must keep a robust native fallback while the platform model evolves. |
| [WAI-ARIA APG Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | A select-only popup control uses `role="combobox"`, expanded state, popup ownership, and `aria-activedescendant` while focus stays on the trigger. | Add `role="combobox"` to the generated trigger and preserve the existing listbox relationship and active descendant. |
| [WAI-ARIA APG Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | Listbox options expose selection; arrow navigation and typeahead are expected, with disabled options skipped. | Existing generated option roles, keyboard navigation, and typeahead are appropriate. |
| [Radix Select](https://www.radix-ui.com/primitives/docs/components/select) | Mature Select exposes value/defaultValue, open/defaultOpen, name, required, disabled, direction, and composable parts. | Gallery should expose cross-target form semantics, but need not expose popup internals or framework-specific control props in the base contract. |
| [Shopify Polaris Select](https://shopify.dev/docs/api/app-home/web-components/forms/select) | Polaris exposes label, name, value/defaultValue, required, disabled, details, error, and native change/input behavior. | `name` and `required` are stable cross-target omissions; controlled frameworks should adapt through native value/events. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | grouping container | Select | Owns variant and enhanced/open classes. |
| Label | yes | `label` | Select | Associated with the native fallback before enhancement and trigger after it. |
| Required indicator | generated when required | decorative CSS content | Select | An empty accessible alternative keeps the optically centered `*` out of the label name; native `required` remains authoritative. |
| Native field | yes | `select` | Select / form | Canonical options, value, validity, name, reset, and submission owner. |
| Control | generated | presentation wrapper | enhancer | Positions native field, trigger, and popup. |
| Trigger | generated | `button` with `role="combobox"` | enhancer | Focus owner for the enhanced UI. |
| Value | generated | text | enhancer | Mirrors selected option text. |
| Indicator | generated | decorative SVG | enhancer | Fixed Gallery geometry; not a consumer icon slot. |
| Listbox | generated | `role="listbox"` | enhancer | Single-select popup. |
| Option | generated | `role="option"` | enhancer | Mirrors native option availability and selection. |
| Option check | generated | decorative SVG | enhancer | Marks the selected option. |
| Message | no | text; alert only for dynamic errors | consumer/form | Describes both native and enhanced controls. |

No other Gallery component dependency is needed. The custom popup is generated
behavior, not a duplicated second source of option data. `multiple`, `size > 1`,
and `<optgroup>` deliberately skip enhancement and remain functional native
controls until a richer target-agnostic choice anatomy is accepted.

## Variant, Size, State, And Mode Matrix

- Variants: Default, Error, Success, Warning.
- Size: one accepted default size. Alternate sizes are not inferred.
- Field states: default, hover, focus-visible, disabled, and open. Error,
  Success, and Warning remain independent variants that combine with any
  applicable field state.
- Option states: hover, keyboard-highlighted, selected, and disabled.
- Modes: native no-JavaScript fallback and enhanced custom popup; light/dark;
  normal/reduced motion; intrinsic, explicitly sized, and viewport-constrained.
- Mobile, Tablet, Desktop, and XL pass in Exhibit and Studio. Forced colors,
  required semantics, 48 visible localized options plus a hidden prompt, empty
  option lists, and the native grouped/multiple fallback have explicit evidence.

## Public API And State Ownership

Current properties are `label`, `message`, `variant`, `disabled`, `name`, and
`required`. Required maps to the native attribute, the enhanced
`aria-required`, and the synchronized decorative label marker. The native select remains uncontrolled by
default: its selected option supplies initial value and reset behavior. Framework
adapters may control it by setting the native `.value`/selected option and
listening to native `input` and `change`; the enhancer must synchronize without
creating a second value owner. `value`, `defaultValue`, `open`, and `defaultOpen`
should not be added to the target-agnostic contract until their cross-target
mapping and Studio usefulness are decided. Option content remains native child
content rather than a flat string property.

## Token And Value Audit

- 52 public tokens reuse the accepted field color, type, spacing, radius,
  transition, and easing families.
- Private popup geometry, state variables, the `60%` default boundary mix, and
  the perceptual `80%` semantic boundary / `60%` semantic copy mixes remain
  internal.
- The accepted `8px` popup gap and viewport inset are composition literals; they
  should become public only if consumers need a stable cross-target sizing
  decision, not merely because they exist in CSS.
- Chevron and check path data are internal visual geometry and must not add
  Lucide names to the contract.

## Visual And Content Audit

The current field is aligned with Input at `46px`, `16px / 24px` value type, and
the shared validation hierarchy. Its required asterisk uses the label's current
color and an optical vertical adjustment instead of the conventional superscript
position. The popup can be wider than the trigger, never
narrower, aligns away from the viewport edge, and keeps labels unwrapped. A
48-choice localized probe stayed within a `360px` panel, scrolled vertically at
`240px`, preserved the hidden prompt, and caused no page overflow. An empty flat
select enhances without an exception and exposes no generated options.

## Accessibility And Interaction

The trigger exposes `role="combobox"`, `aria-haspopup`, expanded state, controls,
active descendant, label, description, invalid state, and mirrored required
semantics. Arrow keys,
Home/End, Enter, Space, Escape, Tab, typeahead, outside click, focus return,
disabled options, reset, and native event dispatch are implemented. Reduced
motion now resolves field and indicator transitions to `0s` and removes the
decorative rotation; forced-colors evidence preserves the native focus boundary.
Default boundary contrast is `3.07:1` light and `5.19:1` dark. After the owner
found the Light validation colors too dark and difficult to distinguish,
semantic mixing moved from sRGB to OKLCH while retaining neutral field fill and
value text. Current semantic boundary/indicator minima are `3.24:1` light and
`8.06:1` dark; semantic label/message minima are `5.11:1` light and `9.93:1`
dark.

## Responsive And Performance

Select uses intrinsic/container sizing with a viewport-safe popup; it does not
introduce breakpoint-specific semantics. The enhancer creates one trigger,
listbox, and mirrored option per native option, performs a popup bounds read on
open, and observes option/field mutations. It uses shared `theme.js` and adds no
network asset. The current shared runtime is `5,263 B` gzip against the `8 KiB`
ceiling, and the primitives family is `10,378 B` gzip against `10.3 KiB`. No
polling or perpetual layout loop is used.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native select plus progressive trigger/listbox enhancer for flat single choice; richer native shapes remain native. | Implemented and browser-evidenced. |
| Shopify | Native Liquid `select` and options with shared enhancer where eligible. | Generated adapter validates; target theme visual certification remains separate. |
| React / Angular | Native select is value owner; adapters map controlled value and native events. | Strategy documented; adapter not implemented or certified. |
| Figma | Label, message, validation variant, disabled, open and option states. | Current metadata references the Button pilot frame, not component-specific owner evidence. |
| SwiftUI / Compose | Native picker/dropdown mapping with one selected value and form validation. | Conceptual mapping only. |

## Exhibit And Studio Parity

Both surfaces mount the same registered Select renderer, fixture, post-enhancement
anatomy, local state, and canonical classes under ADR 0087; Studio only adds the
inspector. The distributed `theme.js` enhancer is verified separately against the
same contract. The registered design reference is the Button pilot frame and
cannot count as a Select-specific visual reference.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Enhanced trigger lacked `role="combobox"`. | resolved | Added to the enhancer and shared Studio renderer. | implementation |
| Native `required` was not reflected to the enhanced trigger. | resolved | `aria-required` now mirrors native state and required mutations. | implementation |
| Contract omitted stable native `name` and `required` semantics. | resolved | Both properties map to the sole native form owner. | implementation |
| Multiple and grouped native choices could be flattened by the single-choice enhancer. | resolved | They now remain native, preserving unsupported semantics. | implementation |
| Reduced motion still animated the field and chevron. | resolved | Field/indicator transitions resolve to `0s`; rotation is removed. | implementation |
| Error, Success, and Warning looked too dark and insufficiently differentiated in Light. | accepted | Preserve more semantic chroma with private OKLCH mixes: `80%` semantic color for boundaries/indicator and `60%` for label/message. The owner approved the complete Light/Dark result. | owner + implementation |
| Studio mixed validation variants into Focus state options. | resolved | ADR 0274 separates Variant and State globally. Select exposes one generic Focus state, combines it with the selected variant, and never mutates Variant when State changes. | owner + implementation |
| Required changed semantics but had no visible effect in Studio. | accepted and globalized | Native `required`, trigger `aria-required`, and `.select__label--required` stay synchronized; the owner accepted the visual result and ADR 0275 extends the same centered, accessible-name-excluded marker to every required-capable field. | owner + implementation |
| The option panel appears and disappears without a visible transition. | deferred | The owner considers the current Select presentation acceptable for v1 and deferred panel motion until a future cross-target motion review; no target-specific dependency is added in this cycle. | owner |
| No Select-specific owner visual reference is registered. | review input | The repository render is ready to approve or compare with an owner-supplied reference. | owner |
| Alternate sizes remain undecided. | non-blocking | Keep one default size unless the owner requests another size in v1. | owner |

## Evidence And Validation

- Baseline report: `docs/reports/select-web-certification-audit.md`.
- Eight Exhibit/Studio screenshots cover all four rubric viewports.
- Browser interaction selected Mexico with Arrow Down and Enter, returned focus
  to the combobox, and exposed `role="combobox"` plus `aria-required="true"`.
- Required on/off evidence confirms the native attribute, trigger ARIA reflection,
  and centered decorative marker change together without changing the label's
  accessible name.
- Direct enhancer evidence covers 49 generated options (48 visible), localized
  long content, `360px x 240px` constrained scrolling, no page overflow, native
  `name`/`required`, empty options, native grouped/multiple fallback, forced
  colors, and reduced motion.
- JavaScript syntax, contracts, Studio, docs, component/refinement audits, and
  neutral Web/Shopify adapter validation pass.

## Risks And Open Questions

- Human review closed on 2026-08-12 with explicit approval of the complete
  Select after the Light semantic-color correction and global Required-marker
  validation. The docs-site theme selector remains review tooling, not Select
  public API.
- Global modeling decision: Variant and State are orthogonal under ADR 0274.
  Select is reconciled; other pilots with mixed-axis state names remain queued
  for their own component turn rather than being changed in this review.
- Global required-field decision: ADR 0275 standardizes Select's accepted
  centered marker across all required-capable fields while preserving native or
  ARIA requiredness as the semantic authority. This consistency rollout does
  not approve or promote any other component.
- Deferred follow-up: panel entrance and exit motion requires a future
  cross-target decision. It is not a v1 Select approval blocker and must not be
  implemented only in the React documentation target.
- Non-blocking architecture boundary: controlled framework adapters should map
  through native value/events; a cross-target `value` property is deferred until
  its mapping is decided.
- Target follow-up: high-option-count virtualization and asynchronous options
  are out of scope and belong to a different component strategy.

## Readiness Decision

Approved `stable` by the owner on 2026-08-12. The reviewed contract,
implementation, Exhibit/Studio parity, Light/Dark presentation, form and
accessibility semantics, adapter projections, and focused evidence remain the
v1 baseline. Deferred popup motion is explicitly non-blocking and requires a
future cross-target decision before implementation.
