# Component Dossier: Combobox / Autocomplete

Status: `human-review-ready`

Target reviewed: Neutral Web editable combobox with list autocomplete

Contract: `components/contracts/combobox.contract.json`

## Recommendation

Implement Combobox as an editable native text input with manual list
autocomplete. DOM focus remains in the input; `aria-activedescendant` identifies
the highlighted option; selection is distinct from highlight; and arbitrary
typed text remains valid. The shared Web behavior should filter authored options,
manage keyboard/pointer selection, synchronize native events and form reset, and
light-dismiss the popup. Do not turn it into Select, multi-select Tags Input, or
an async data client.

## Purpose And Limits

- Acquires text while offering a filtered single-choice suggestion list.
- It is useful for long, changing, remote-backed, or partially known option sets.
- Select remains the finite non-searchable choice; Tags Input owns multiple
  values; Command Palette owns actions; Search owns query submission.
- Combobox may accept arbitrary text. Restricting values to the authored list is
  a separate semantic mode and is not inferred.
- Data fetching, ranking, virtualization, persistence, and server errors remain
  target-owned. The neutral behavior filters options already present in the DOM.

## Current Gallery Result

- Registry `H3`; contract `0.3.0`, still `pilot`: six anatomy parts, four
  validation variants, one size, thirteen states, nine behaviors, ten properties,
  and forty-one public token references.
- The native editable input is the only focus/value/form owner. Options are
  non-interactive `role="option"` elements outside the Tab order.
- Shared Web behavior filters authored options, protects IME composition,
  separates highlight/selection, handles keyboard/pointer commit and dismissal,
  and synchronizes native events/reset without a hidden mirror.
- Popup geometry uses logical positioning, container bounds, existing field
  contrast/focus rules, reduced motion, and forced-colors behavior.
- Exhibit and Studio consume the same canonical anatomy, fixture, CSS, contract,
  and progressive behavior boundary.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [APG Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | Editable manual-list autocomplete keeps DOM focus in the input, uses `aria-activedescendant`, supports standard text editing, Arrow navigation, Enter, Escape, and a listbox popup. | Adopt manual list autocomplete and never intercept ordinary text-editing keys. |
| [APG Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | Options are single accessible strings and must not contain interactive descendants. | Use non-button option elements with `role="option"`; the input is the only tab stop. |
| [Open UI Combobox explainer](https://open-ui.org/components/combobox.explainer/) | Emerging native work connects editable inputs to customizable suggestion sources and follows APG keyboard behavior. | Keep the neutral API close to native input/options and retain a no-script text fallback. |
| [Open UI Combobox research](https://open-ui.org/components/combobox.research/) | Filtering, suggestions, loading, clearing, grouping, disabled options, free-form text, and multi-select vary widely. | Support the accepted flat manual-list subset; record richer modes rather than assuming them. |
| [Carbon Combo Box](https://carbondesignsystem.com/components/dropdown/usage/) | Mature comboboxes open from the field, filter as users type, highlight matches, accept custom values, and close after selection. | Current free-form/manual-filter direction is appropriate. |

## Recommended Ownership And API Direction

- Required anatomy: root, native editable input, listbox, and option. Empty/status
  content and a decorative selected check are optional.
- Input owns current text, name, required validity, disabled state, native events,
  FormData, and reset. Selection sets the input value and emits native `input`
  then `change`; typing emits the browser's native input event.
- Public concepts: `variant`, `value`, `placeholder`, `open`, `name`, `disabled`,
  `required`, `autocomplete`, and `describedBy`. Options remain authored child
  content/data, not a flattened string property.
- Open may be controlled by an adapter, but the base Web enhancer treats authored
  class/ARIA state as initialization and maintains one runtime state owner.
- Highlight is ephemeral navigation state; selected value and typed value remain
  distinct. Escape closes without replacing the current text.

## Alternatives And Non-Decisions

1. `<input list><datalist>` is the strongest native fallback but current popup
   styling and behavior are not consistently customizable; keep it as future
   progressive enhancement evidence, not the v1 visual implementation.
2. A restricted “must select an option” mode is useful for locations/products
   but changes validity and blur behavior; it requires an explicit future property.
3. Async loading, groups, rich options, clear buttons, and multi-select are common
   but remain target/product decisions.

## Browser, Content, And Performance Evidence

- Filtering highlighted and selected “Celadon”, kept focus in the input, emitted
  `input` then `change`, submitted native FormData, and cleared active descendant
  on close. Disabled results skip; Tab preserves free-form text; reset restores.
- Every option is `role="option"`, `tabindex="-1"`; no list item receives DOM
  focus. The transparent selected check cannot intercept pointer input.
- A fivefold unbroken Field label wraps at 390px with zero document/root/input
  overflow. RTL popup alignment stays logical and inside the viewport.
- Label/input/option samples measure `17.93:1`; reduced motion is `0s` and forced
  colors uses system borders plus a `4px` Highlight focus outline.
- Eight after captures plus two before captures are stored for four viewports.
  ADR 0094 documents Forms/runtime budget exceptions; total neutral CSS passes.

## Current Risks And Human Questions

1. Human visual approval is needed for field/icon/popup geometry, option density,
   selected check treatment, and empty state.
2. No Combobox-specific owner visual reference is registered.
3. Restricted selection, async loading presentation, grouped/rich options, and a
   clear button remain explicit future product/API decisions.

## Readiness Decision

Ready for human review; remains `pilot`. Manual-list focus, free-form ownership,
filtering/IME, selection/events/FormData/reset, disabled/empty/extreme/RTL content,
special media, four viewports, shared docs consumption, and adapters pass. Human
visual approval is required before any `stable` promotion.
