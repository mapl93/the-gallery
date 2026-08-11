# Combobox / Autocomplete Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Combobox now implements editable manual-list autocomplete while keeping DOM focus
in the native text input. Authored options filter locally, highlight and selected
state remain distinct, options are not Tab stops, IME composition is protected,
and native events/FormData/reset remain authoritative. Exhibit and Studio consume
the same canonical anatomy, fixture, CSS, and behavior contract.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Editable suggestions with free-form text; finite Select, multi-value Tags Input, actions, and remote data stay separate. |
| Anatomy and composition | pass | Six parts; native input plus non-interactive listbox options and optional check/empty status. Canonical Input semantics are reused. |
| Variants, sizes, states | pass | Four validation families, one size, 13 open/highlight/selection/focus/disabled/empty states. |
| Public API and ownership | pass | Ten semantic properties; native input owns value, name, required, events, validity, FormData, and reset. |
| Accessibility and motion | pass | APG manual-list focus model, `aria-activedescendant`, disabled-option skipping, light dismissal, forced colors, and reduced motion. |
| Responsive/content resilience | pass | Logical popup alignment, 390px containment, unbroken/localized text wrapping, free-form/empty/disabled options, RTL, and four viewports. |
| Runtime and assets | exception accepted | Delegated bounded listeners/filtering and option observer only; no fetch, polling, timer, hidden owner, or component asset. ADR 0094 records the shared budget exception. |
| Cross-target/documentation | pass | Target boundaries, shared renderer/fixture, screenshots, direct browser probes, generated adapters, and report are complete. |

## Contract, API, And Ownership

- Contract `0.3.0`: 6 anatomy parts, 4 variants, 1 size, 13 states,
  9 behaviors, 10 properties, and 41 public token references.
- Input semantics are `role="combobox"`, `aria-autocomplete="list"`, expanded
  state, controls relationship, and transient active descendant. Options remain
  `role="option"`, `tabindex="-1"`, and contain no interactive descendants.
- Typing filters only authored options with locale-aware folding. Composition
  events suspend filtering so IME text is not committed prematurely.
- Arrow/Home/End navigation is non-cycling and skips disabled/hidden options;
  Enter commits, Escape closes, and Tab keeps free-form text without forced
  selection. Pointer selection uses delegation and returns focus to the input.
- Static input value is the uncontrolled default. Frameworks may control that
  same input and open state after native events; no hidden selected-value mirror
  exists.

## Browser And Visual Evidence

- Typing highlighted the expected “Celadon” option; Enter committed it, emitted
  `input` then `change`, closed the list, retained input focus, cleared the active
  descendant, updated `aria-selected`, and submitted the native name/value.
- Disabled-only results were skipped. Tab preserved an authored free-form value.
  Reset restored the initial input value and selection presentation.
- All authored suggestions exposed `role="option"` and `tabindex="-1"`; DOM
  focus never moved into the listbox.
- At 390px, a fivefold unbroken localized Field label wraps to `326px` with
  document/root/input overflow `0px`. RTL aligns popup inline-start to the
  physical right, keeps it inside the viewport, and produces no page overflow.
- Text samples measure `17.93:1` for label, input value, and option text. Reduced
  motion resolves transition duration to `0s`; forced colors uses system borders
  and a `4px` Highlight focus outline. The transparent check is pointer-passive.
- Eight after screenshots cover Exhibit/Studio at Mobile, Tablet, Desktop, and
  XL; two before screenshots preserve the static-button-option baseline.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native text input, authored listbox/options, canonical CSS, shared enhancer. | Implemented and browser-evidenced. |
| Shopify | Liquid authors the same input/options and target-owned data source; copied enhancer filters present DOM. | Adapter validates; remote/editor lifecycle remains target work. |
| React / Angular | Controlled/uncontrolled input value and open state; options remain child/data composition. | Strategy documented; adapter not yet certified. |
| Figma | Validation, open, highlight, selection, empty, disabled, and content anatomy. | Metadata validates; runtime filtering is not represented. |
| SwiftUI / Compose | Native editable field with target suggestion surface and focus semantics. | Conceptual mapping only. |

## Performance

- Forms CSS: `7,314 B` gzip versus `6.4 KiB`; shared runtime: `9,754 B`
  versus `8 KiB`. ADR 0094 accepts this bounded Batch 09 exception without
  changing the ceilings.
- Neutral components CSS is `58,405 B` gzip versus `64 KiB` — pass.
- Runtime work is proportional to authored options; large-data virtualization,
  ranking, loading, and network behavior remain target-owned.

## Remaining Human Risks

1. Approve the `46px` field, popup width/max-height/gap, option density, selected
   emphasis/check, empty state, validation mixes, shadow, and focus hierarchy.
2. Accept the repository render as visual evidence or provide a Combobox-specific
   owner reference; the registered Studio frame is shared.
3. Restricted selection, grouped/rich options, async status, clear action,
   virtualization, and multi-select remain explicit future product/API choices.

## Validation

Contracts, Studio, docs, Neutral Web, Shopify, structural certification,
Exhibit/Studio parity, static preview audit, real-browser keyboard/form/reset/RTL/
special-media tests, four viewports, temporary docs build, and diff checks are
included in Batch 09 validation.
