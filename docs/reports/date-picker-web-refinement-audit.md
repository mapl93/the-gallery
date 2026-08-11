# Date Picker Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Date Picker now has one editable local-date text owner, an explicit trigger, a
named non-modal calendar dialog, a complete six-week grid with roving focus,
direction-aware keyboard navigation, inclusive bounds, native selection events,
and form reset. Local `YYYY-MM-DD` values never pass through UTC. Exhibit and
Studio share the canonical fixture, anatomy, CSS, and behavior contract.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One local calendar date by text or calendar; ranges, time, recurrence, timezone, and locale policy remain out of scope. |
| Anatomy and composition | pass | Thirteen parts: native input, independent trigger, dialog/header/nav, labelled grid, weekday/row/day structures. Canonical Field/Input semantics are reused. |
| Variants, sizes, states | pass | Four validation families, one size, 17 open/focus/today/selected/outside/disabled/bounded states. |
| Public API and ownership | pass | Thirteen properties cover value/form/edit/bounds/open/validation; the native text input is the sole value owner. |
| Accessibility and motion | pass | Named non-modal dialog, labelled grid, one roving day, full date labels, keyboard/focus return, bounds, forced colors, reduced motion. |
| Responsive/content resilience | pass | Container query below 300px, logical anchoring, long labels/month text, bounded months, RTL, and four viewports. |
| Runtime and assets | exception accepted | Cached formatters/bounds, delegated day events, bounded calendar generation, no UTC conversion/network/polling/continuous layout. ADR 0094 records the shared budget exception. |
| Cross-target/documentation | pass | Native target mappings, shared renderer/fixture, screenshots, isolated browser probes, adapters, and report complete. |

## Contract, API, And Ownership

- Contract `0.3.0`: 13 anatomy parts, 4 variants, 1 size, 17 states,
  9 behaviors, 13 properties, and 51 public token references.
- The editable input owns `value`, `name`, `required`, `disabled`, `readonly`,
  autocomplete, FormData, validity, native events, and reset. It exposes the
  combobox/dialog relationship; the separate trigger remains keyboard reachable.
- The calendar is a labelled `role="dialog"` containing a labelled grid, seven
  weekday column headers, six row groups, and 42 native day buttons exposed as
  gridcells. Only one enabled day has `tabindex="0"`.
- Arrow keys move by day/week; Home/End stay within the week; Page keys move by
  month and Shift+Page by year. Enter/Space select once; Escape and dismissal
  close safely and return focus without hiding a focused descendant.
- Inclusive ISO `min`/`max` disable days and month controls. Static value/open
  state are uncontrolled defaults; framework targets may control the same native
  value and observe the same `input`/`change` sequence.

## Browser And Visual Evidence

- Keyboard selection committed `2026-07-13`, closed expanded state, and returned
  focus to the input. Selection emitted exactly `input` then `change`, and
  FormData submitted the selected ISO date.
- Next-month navigation reached August 2026; inclusive bounds left August 6
  available, disabled next-month movement where required, and maintained one
  roving Tab stop. Reset restored `2026-07-12`, July 2026, and closed state.
- The open dialog exposes seven weekday headers and six explicit weeks; it is
  non-modal and leaves the independent trigger in normal Tab order.
- At 390px, a fivefold unbroken localized Field label wraps to `326px` with zero
  document/input overflow. RTL anchors the 320px calendar to logical inline-start,
  keeps it in the viewport, and produces zero page overflow.
- Contrast samples are `17.93:1` for label/input text, `7.81:1` for ordinary day
  text, and `10.37:1` for selected-day text. Reduced motion is `0s`; forced colors
  uses CanvasText/Highlight/HighlightText and `4px` focus outlines.
- Eight after screenshots cover Exhibit/Studio at Mobile, Tablet, Desktop, and
  XL; two desktop before screenshots preserve the partial/static grid baseline.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Editable text owner, explicit native trigger, dialog/grid, canonical CSS/runtime. | Implemented and browser-evidenced. |
| Shopify | Liquid renders the same input/trigger/hooks; target data may supply bounds. | Adapter validates; dedicated editor/template work remains. |
| React / Angular | Controlled/uncontrolled ISO value and open state with the same events/focus contract. | Strategy documented; adapter not yet certified. |
| Figma | Field, trigger, open calendar, validation, today/selected/disabled states. | Metadata validates; date math and focus are target behavior. |
| SwiftUI / Compose | Native date selection adapted to one local date and explicit bounds. | Conceptual mapping only. |

## Performance

- Forms CSS: `7,314 B` gzip versus `6.4 KiB`; shared runtime: `9,754 B`
  versus `8 KiB`. ADR 0094 accepts this bounded Batch 09 exception without
  changing the ceilings.
- Neutral components CSS is `58,405 B` gzip versus `64 KiB` — pass.
- Closed calendars perform no background rendering. Month generation is bounded
  to 42 day nodes, uses cached formatters, and delegates day events.

## Remaining Human Risks

1. Approve the `46px` field, 32px trigger, 320px surface, 40px navigation,
   36px minimum days, spacing, round selected day, shadow, validation, and focus.
2. Accept the repository render as Date Picker visual evidence or provide a
   component-specific owner reference; the registered Studio frame is shared.
3. Locale display/edit format, first weekday, ranges, multiple months, disabled
   date sets, time, presets, and natural-language parsing remain separate choices.

## Validation

Contracts, Studio, docs, Neutral Web, Shopify, structural certification,
Exhibit/Studio parity, static preview audit, decomposed real-browser keyboard/
bounds/form/reset/RTL/special-media tests, four viewports, temporary docs build,
and diff checks are included in Batch 09 validation.
