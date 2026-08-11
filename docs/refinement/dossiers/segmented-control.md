# Component Dossier: Segmented Control

Status: `human-review-ready`

Target reviewed: Neutral Web native single-choice segmented field

Contract: `components/contracts/segmented-control.contract.json`

## Recommendation

Keep Segmented Control as a compact, native radio-backed field for selecting
exactly one value. Give the group a visible label, one shared native name, stable
option values, required/disabled semantics, and an optional description/error
association. Use a native `fieldset`/`legend` and let radios own focus, Arrow/
Space behavior, `input`/`change`, form submission, validity, and reset. Do not
use this component for independent actions or tab panels; Button Group, Toggle
Group, or Tabs own those interaction models.

## Purpose And Limits

- Selects one of a small number of short, mutually exclusive values.
- Suitable for display preference, density, cadence, or another immediately
  understandable choice where all options fit together.
- It is not a toolbar of actions, multi-select toggle group, navigation bar, or
  tablist controlling labelled panels.
- Validation presentation is independent from the selected option.
- Option content is authored data; the base component does not infer labels,
  values, icons, or view behavior.

## Pre-Refinement Gallery Baseline

- Registry `H9`; contract `0.2.0`, `pilot`: four anatomy parts, four validation
  variants, one size, four states, three behaviors, seven properties, and
  twenty-two public token references.
- The Exhibit fixture is an unlabelled `div` group; Studio adds a hardcoded
  `role="radiogroup"`/`aria-label`, so the two surfaces do not share canonical
  markup or group labelling.
- The contract describes `disabled` per option while Studio uses it as a whole-
  group control. It omits required validity, group disabled ownership, native
  events, FormData/reset, and controlled/uncontrolled guidance.
- Segment height is below the 44px interaction target. Long labels, a narrow
  container, disabled/required-invalid, reduced motion, and forced colors are
  not certified.
- The registry promises a sliding indicator, but the implementation uses a
  selected surface and shadow; no indicator moves.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | A radio group has one name; Tab enters/exits, Space selects, and arrows move and select. | Preserve native radio behavior rather than recreating roving focus. |
| [WAI grouping controls](https://www.w3.org/WAI/tutorials/forms/grouping/) | Related radio choices should be grouped visually and programmatically, normally with `fieldset` and `legend`. | Make the group label visible and canonical on Web. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Mature APIs expose root value/defaultValue, name, required, disabled, orientation, and per-item values/disabled state. | Model one group owner plus authored option values; keep controlled/uncontrolled translation target-owned. |
| [Radix Segmented Control](https://www.radix-ui.com/themes/docs/components/segmented-control) | Radix uses Toggle Group for switching values or views and offers size/visual variants. | Useful visual evidence, but its button model does not replace Gallery's accepted form-value radio semantics. |
| [Polaris Choice List](https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/components/selection-and-input/choice-list) | Polaris exposes a title, selected values, name, error, group disabled state, and clearly labelled either/or choices. | Keep a concise visible group label and explicit submitted values. |
| [Polaris Button Group](https://polaris-react.shopify.com/components/actions/button-group) | Segmented Button Group arranges related actions and pressed buttons. | Route action groups to Button Group rather than overloading this field. |

## Recommended Ownership And API Direction

- Required anatomy: native fieldset root, visible legend, options surface,
  repeated option label, native radio, and visible option text.
- Public concepts: `groupLabel`, validation `variant`, option `label`, shared
  `name`, option `value`, uncontrolled `checked`, `required`, whole-group
  `disabled`, per-option `optionDisabled`, and `describedBy`.
- The named radios own mutual exclusion, events, validity, FormData, and reset.
  Static checkedness is the uncontrolled default; framework adapters control one
  group value, not independent booleans.
- Required-invalid is semantic and does not automatically choose Error styling.
- Keep the accepted one size and horizontal presentation. A narrow container may
  stack segments without changing source order or radio semantics.

## Alternatives And Non-Decisions

1. A custom ARIA radiogroup is unnecessary while native radios satisfy the
   required keyboard and form behavior.
2. A Toggle Group/button model is valid for immediate actions but would change
   this component's current submitted-value contract.
3. Tabs are required when options label and control tabpanels; styling radios as
   tabs would misrepresent name, role, and keyboard behavior.
4. Icons, orientation, multiple visual variants, full-width mode, and animated
   sliding indicators remain product/presentation decisions and are not added.

## Implemented Result

- Contract `0.3.0` now defines 6 anatomy parts, 4 validation variants, 1 size,
  7 states, 5 behaviors, 10 semantic properties, and 31 existing public token
  references.
- The canonical renderer uses one native fieldset/legend and same-name radios
  with stable values, group/per-option disabled ownership, required validity,
  and a required visible group label.
- The visual surface supplies `44px` minimum targets, one inner plus one outer
  focus boundary, validation-family-preserving hover/focus, forced-colors
  treatment, and reduced-motion transitions. A `320px` container query stacks
  options without changing source order or semantics.
- Registry, MDX, Studio metadata, renderer, contract, and canonical CSS agree;
  the false sliding-indicator promise was removed. No JavaScript was added.

## Browser, Content, And Performance Evidence

- Exhibit and Studio stage markup is byte-identical at 626 characters. Eight
  canonical after captures cover both surfaces at Mobile, Tablet, Desktop, and
  XL; dark-focus, group-disabled, and `350px` extreme-RTL captures supplement
  two desktop before baselines.
- Three visible targets measure `44px` in the normal fixture. At `286px`
  container width, the extreme localized RTL fixture stacks, keeps all targets
  at `44px`, and produces no root or stage overflow.
- Native `ArrowRight` moves focus/selection from `grid` to `list`, emits
  `input:list` then `change:list`, submits `gallery-view=list`, and reset restores
  `grid`. Clearing a required group is invalid; fieldset disabled propagation
  removes the value from FormData.
- Selected text measures `17.93:1` in light mode and `17.18:1` in dark mode.
  Reduced-motion transitions resolve to `0s`; focus exposes distinct 2px inner
  and 4px outer boundaries. Forced colors preserves readable
  `CanvasText`/`Canvas` selected content and a 2px `Highlight` selection
  boundary; the Size Chart consumer audit corrected a filled treatment that
  Chromium emulation rendered over the selected label.
- Component runtime remains `0 B`. Batch CSS totals and the `663 B` Forms delta
  are recorded in ADR 0096; no asset or request is added.

## Cross-Target Translation

- Neutral Web and Shopify map to fieldset/legend plus named native radios and
  canonical CSS. Shopify data/schema/editor composition remains target work.
- React and Angular control one group value/default value and consume native
  input/change semantics rather than mirroring option booleans.
- Figma maps group/option content, validation, selected/disabled/focus states,
  and existing tokens but owns no form state. SwiftUI and Compose map to their
  nearest native single-choice owner with target-specific presentation.

## Current Risks And Human Questions

1. Human visual approval will be needed for the visible group label, 44px target,
   selected surface, focus hierarchy, validation treatments, and narrow stacking.
2. No Segmented Control-specific owner visual reference is registered; Studio
   points to the shared pilot frame.
3. The Grid/List/Compact fixture is example content, not a semantic default.

## Readiness Decision

Ready for explicit human visual and semantic review. Automated gates, generated
adapters, shared rendering, native interaction, responsive/content, contrast,
special-media, and performance evidence are complete. The contract remains
`pilot`; no `stable` promotion is implied.
