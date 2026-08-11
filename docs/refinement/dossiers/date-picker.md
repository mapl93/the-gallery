# Component Dossier: Date Picker

Status: `human-review-ready`

Target reviewed: Neutral Web single-date text input with calendar popup

Contract: `components/contracts/date-picker.contract.json`

## Recommendation

Keep the accepted single-date text field plus custom calendar, but make the text
editable and give users an explicit calendar trigger. The input remains the form
value owner. The calendar is an anchored popup dialog containing one roving-focus
grid, month navigation, and a live month label. Selecting a day writes an ISO
`YYYY-MM-DD` value, dispatches native events, closes, and returns focus. Preserve
single-date scope, one calendar month, and four validation families; do not infer
date ranges, time, presets, locale formatting policy, or multi-month layout.

## Purpose And Limits

- Selects one calendar date with either direct text entry or spatial calendar
  navigation.
- Native `input[type="date"]` remains a viable target-native adapter but cannot
  guarantee Gallery popup presentation across browsers.
- Date Picker is not a date range, time picker, scheduling engine, recurrence
  editor, timezone converter, or natural-language parser.
- ISO date storage/transport is distinct from localized display formatting.
  The current contract only accepts ISO text and does not define a locale API.
- Min/max and disabled-date policy are semantic capabilities but are not yet
  represented consistently in source and require careful contract mapping.

## Current Gallery Result

- Registry `H4`; contract `0.3.0`, still `pilot`: thirteen anatomy parts, four
  variants, one size, seventeen states, nine behaviors, thirteen properties,
  and fifty-one public token references.
- One editable native text input owns the local ISO value and form lifecycle; an
  independent trigger opens a named non-modal calendar dialog.
- The labelled grid has seven weekday headers, six explicit weeks, forty-two
  native gridcell buttons, one roving Tab stop, full date labels, and distinct
  today/selected/outside/disabled semantics.
- Shared Web behavior owns local-date math, inclusive bounds, direction-aware
  keyboard movement, selection events, dismissal/focus return, and form reset
  without UTC conversion, network, polling, or background timers.
- Exhibit and Studio consume the same canonical fixture, CSS, contract, and
  behavior boundary.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Date state](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)) | Native date values are valid date strings without timezone and own min/max/step, events, validity, form value, and reset. | Use ISO `YYYY-MM-DD` as the neutral form value and preserve native target options. |
| [APG Date Picker Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/) | Editable date input opens a labeled dialog; the grid has one roving tab stop, full weekday names, live month/year, and explicit focus management. | Treat the multi-control calendar as a dialog popup rather than an input-owned grid active descendant. |
| [APG Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) | Direct input needs format description; calendar grid supports arrows, Home/End, Page keys, selection, high contrast, and focus return. | Add format guidance and complete keyboard/special-mode behavior. |
| [Open UI Datepicker research](https://open-ui.org/components/datepicker.research/) | Manual input, format, disabled dates, range, open, navigation, and read-only vary across systems. | Keep the accepted editable single-date subset and record richer modes explicitly. |
| [Shopify Polaris Date Picking](https://polaris-react.shopify.com/patterns/date-picking) | Merchants can type or use a calendar; the pattern composes TextField, Popover, Card, and DatePicker. | Preserve field ownership and target-native composition rather than embedding framework assumptions. |
| [Polaris Date Picker](https://polaris-react.shopify.com/components/selection-and-input/date-picker) | Use a button trigger in a popover, close single selection, provide keyboard navigation, and always offer text entry. | Add an explicit trigger and close/return-focus on single selection. |
| [Carbon Date Picker](https://carbondesignsystem.com/components/date-picker/usage/) | Anatomy includes label, editable date field, format help, icon, calendar, navigation, weekdays, and days. | Current field/calendar anatomy is broadly aligned but missing editable input/help/trigger semantics. |

## Recommended Ownership And API Direction

- Required anatomy: root, editable text input, calendar trigger, popup dialog,
  header/month label, previous/next controls, weekday headers, grid, rows, cells,
  and one focusable day button per roving position.
- Input owns `value`, `name`, required validity, disabled/read-only behavior,
  FormData, native `input`/`change`, and reset. Calendar selection updates that
  single owner; the calendar does not add a hidden mirrored field.
- Public concepts should include `variant`, `value`, `open`, `name`, `disabled`,
  `readOnly`, `required`, `min`, `max`, and `describedBy`. A locale/format API is
  deferred; neutral source accepts and emits ISO dates.
- Disabled/read-only inputs cannot open the calendar. Out-of-range days are
  disabled and exposed with native `disabled` plus `aria-disabled` as needed.
- Framework adapters may control value/open by updating the same semantic owner
  and consuming native events; uncontrolled HTML uses authored value and reset.

## Alternatives And Non-Decisions

1. `input[type="date"]` offers strongest browser-native behavior and should be
   used by targets that prioritize native pickers, but cannot provide the accepted
   Gallery calendar across engines.
2. A non-dialog `role="grid"` combobox popup could keep DOM focus in the input,
   but the calendar also contains month navigation buttons; a dialog gives those
   controls an established focus model.
3. Date range, multiple months, week numbers, presets, localization, and time are
   useful mature-system modes but remain separate product/API decisions.

## Browser, Content, And Performance Evidence

- Keyboard selection committed `2026-07-13`, emitted exactly `input` then
  `change`, submitted FormData, closed, and returned focus to the input.
- Bounded navigation reached August, maintained inclusive availability and one
  roving day; reset restored `2026-07-12`, July 2026, and closed state.
- A fivefold unbroken Field label wraps at 390px with zero document/input
  overflow. RTL calendar alignment remains logical and fully in the viewport.
- Text contrast samples are `17.93:1` primary, `7.81:1` ordinary days, and
  `10.37:1` selected days. Reduced motion and forced-colors focus pass.
- Eight after and two before captures cover both docs modes and four viewports.
  ADR 0094 documents bounded Forms/runtime exceptions; total neutral CSS passes.

## Current Risks And Human Questions

1. Human visual approval is needed for the calendar width, day target, header,
   selected/today/outside states, trigger icon, shadow, and field relationship.
2. No Date Picker-specific owner visual reference is registered.
3. Date ranges, localized editable formats, first-day-of-week policy, disabled
   date sets, and multi-month layout remain future product/API decisions. ISO
   single-date v1 can be reviewed without resolving them.

## Readiness Decision

Ready for human review; remains `pilot`. Input/dialog/grid semantics, local ISO
ownership, bounds, keyboard/focus, events/FormData/reset, extreme/RTL content,
contrast, special media, four viewports, shared docs consumption, and adapters
pass. Human visual approval is required before any `stable` promotion.
