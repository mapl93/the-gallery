# Component Dossier: Toggle / Toggle Group

Status: `human-review-ready`

Target reviewed: Neutral Web and shared progressive enhancement

Contract: `components/contracts/toggle.contract.json`

## Recommendation

Retain the ADR 0062 single-selection button group: a named `role="group"` whose
target-owned native buttons expose synchronized boolean `aria-pressed` states and
remain ordinary Tab stops. Do not convert it into Radix-style multi-select,
Toolbar, native radio, Switch, or form submission. Add reduced-motion and extreme
content resilience, expose an empty required group name, and verify the existing
uncontrolled web enhancement and target-owned controlled mapping.

## Purpose And Limits

- Selects exactly one compact peer mode such as grid/list presentation.
- Root owns accessible group context and layout only.
- Slotted buttons own visible labels, target values, native activation, and the
  synchronized pressed state.
- Neutral web progressively owns an uncontrolled DOM selection after initial
  enhancement; framework/native targets may own the selected value externally.
- It is not an independent multi-toggle set, formatting toolbar, persistent
  preference Switch, form-submitting radio group, filter chip set, or generic
  segmented control.

## Current Gallery Baseline

- Registry identity: `A19`, primitive, no registered dependencies.
- Contract: `0.3.0`, `pilot`; two anatomy parts, one variant, one size, five
  states, five behavior rules, two group-level properties, and 12 public tokens.
- ADR 0062 fixes the mutually exclusive `aria-pressed` pattern, target-owned
  options/value, whole-group `disabled`, and normal button behavior.
- Shared `theme.js` normalizes one initial selection and synchronizes
  `aria-pressed` plus `.toggle--active` after native click/keyboard activation.
- Browser evidence confirms click and Space leave exactly one selected item,
  Tab advances to the next button, and ArrowRight is not captured.
- Canonical CSS has selected, hover, focus-visible, disabled, content-resilience,
  and reduced-motion rules.
- Studio renders an empty supplied group label verbatim so invalid composition is
  observable.
- At `390px`, three unbroken localized labels make the `326px` group scroll to
  `436px` and expand the document to `468px`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | `aria-pressed` identifies a toggle button; Space and Enter activate it; the visible label should remain stable as pressed changes. | Preserve native buttons, stable child labels, boolean state, and native activation. |
| [WAI-ARIA 1.2 `aria-pressed`](https://www.w3.org/TR/wai-aria/#aria-pressed) | Pressed is a tri-state button property; absence means the button is not a toggle. | Every item needs an explicit boolean value; Gallery's exclusive subset does not use `mixed`. |
| [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) | Mutually exclusive alignment controls are modeled as radios; toolbar items use roving focus and arrows. | That is a valid alternative pattern, but ADR 0062 already chooses ordinary pressed buttons and Tab stops for Gallery. |
| [Radix Toggle Group](https://www.radix-ui.com/primitives/docs/components/toggle-group) | Supports single/multiple, controlled/uncontrolled value, orientation, looping, and roving focus. | Gallery intentionally keeps only exclusive mode selection; those broader APIs are not inferred. |

Open UI does not currently provide a standalone interoperable Toggle Group
contract that supersedes the accepted Gallery boundary.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Group | yes | `role="group"` | Toggle Group | Useful name explains the selected mode dimension. |
| Toggle item | two or more | native `button type="button"` + `aria-pressed` | Target item slot / enhancement | Stable visible label and target value; exactly one true. |

Zero/one item, missing names, missing pressed attributes, multiple true values,
or no true value are invalid for the accepted exclusive pattern.

## Variant, State, And Mode Matrix

- One classless variant and one size.
- States: default, hover, pressed, focus-visible, whole-group disabled.
- Modes: light/dark, forced colors, reduced motion, normal/coarse pointer,
  LTR/RTL, short/long/localized/unbroken labels, two/three/many items, enhanced
  and pre-enhancement source markup.
- Normal Tab order remains accepted. Arrow navigation/roving focus belongs to a
  future Toolbar or radio-style Segmented Control decision.

## Public API And State Ownership

`groupLabel` and `disabled` remain the only group-level properties. Child labels,
values, initial selection, change effects, persistence, and analytics are target
data, not fixed contract defaults. Web enhancement is uncontrolled after reading
authored initial state and emits the native bubbling click. Controlled targets
must update every item atomically and retain exactly one selected value.

## Token And Value Audit

- Public: selected/default/hover/focus colors, medium radius, fast/default motion,
  body type size/family, and disabled opacity.
- `6px 12px` padding, `6px` item gap, `36px` minimum height, and `4px` group gap
  are private geometry rather than consumer controls.
- Component runtime is one group listener with O(item count) updates per
  selection; no observers, timers, assets, or requests.

## Findings And Direction

| Finding | Severity | Direction | Owner |
| --- | --- | --- | --- |
| Decorative transitions continued under reduced motion. | resolved | Transition now resolves to `none` / `0s` without changing selection. | implementation |
| Extreme labels expanded the page horizontally. | resolved | Group and items shrink/wrap; `390px` document and `326px` group no longer overflow. | implementation |
| Studio invented the required group label when empty. | resolved | Supplied empty value renders as `aria-label=""`. | implementation |
| Forced colors could flatten the selected fill into the same system button surface. | resolved | The pressed item now retains an inset `ButtonText` boundary while keyboard focus remains a separate outer outline. | implementation |
| Radix/APG radio alternatives use roving focus. | accepted difference | Preserve ADR 0062 normal Tab behavior; use another component for radio/form/toolbar semantics. | architecture |
| No Toggle-specific owner visual reference exists. | review input | Approve repository render or supply reference. | owner |

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named group, native pressed buttons, progressive exclusive enhancement. | Implemented and evidenced across four viewports, motion, focus, invalid and adversarial states. |
| Shopify | Liquid buttons plus copied CSS/JS; target data owns value/effect. | Implemented; target visual evidence pending. |
| React / Angular | Controlled or uncontrolled item collection with atomic pressed updates. | Contract-ready; no certified adapter. |
| Figma | Selected state, group label annotation, and item instances. | Component-specific reference absent. |
| SwiftUI / Compose | Exclusive mode selection mapped to platform buttons/segmented control while preserving semantics. | Conceptual mapping only. |

## Refinement Evidence

- Exhibit/Studio root markup is byte-identical (`375` tested bytes).
- Eight canonical screenshots cover four viewports in both docs modes.
- Space, pointer, normal Tab order, uncaptured ArrowRight, disabled suppression,
  bubbling click, idempotent enhancement, multiple/empty initial state, forced
  colors, and reduced motion pass.
- Extreme group `scrollWidth` fell from `436px` to `326px`; document width fell
  from `468px` to `390px`.
- Selected/unselected text contrast is at least `5.50:1` in light/dark.
- Full report: `docs/reports/toggle-web-refinement-audit.md`.

## Readiness Decision

Ready for human review; remains `pilot`. Visual approval of the subtle light
border, selected treatment, and extreme wrapping is pending. No `stable`
promotion is authorized.
