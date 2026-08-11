# 0094. Native Range, Autocomplete, And Calendar Ownership

Status: Accepted

Date: 2026-07-13

## Context

Slider, Combobox, and Date Picker had target-agnostic class contracts, but their
essential neutral-Web behavior was either absent or confined to Studio fixtures.
Slider did not synchronize its active fill or prevent two handles from crossing;
Combobox rendered interactive option buttons without a complete editable-combobox
focus model; Date Picker exposed a read-only input and forty-two independent Tab
stops without a calendar-dialog focus model.

The refinement program requires native value/form ownership, parity between docs
surfaces, cross-target semantic mappings, container resilience, reduced motion,
forced colors, and measured runtime. It does not authorize range-date, locale,
orientation, remote-data, or component-token product decisions.

## Decision

- Every Slider handle remains a native `input[type="range"]`. Single mode owns one
  named native value; range mode owns separately named lower and upper values.
- Slider fill and visible value are derived from the native input values. Lower and
  upper handles cannot cross and do not exchange semantic ownership. Track pointer
  activation moves the nearest handle with one bounded geometry read.
- Horizontal orientation, one visual size, and the existing validation families
  are the v1 scope. Vertical orientation, marks, tooltips, scale transforms, unit
  formatting, and Number Input composition require separate decisions.
- Combobox remains an editable native text input using manual list autocomplete.
  DOM focus stays on the input while `aria-activedescendant` identifies a highlighted
  suggestion. Highlight and selection are distinct states.
- Combobox options are non-interactive `role="option"` elements. Arrow keys move a
  non-cycling highlight, Enter commits it, Escape closes the popup, and Tab retains
  the authored free-form value. Composition events protect IME input.
- The neutral enhancer filters only options already authored in the DOM. Remote
  search, loading/error state, grouping, rich options, multi-select, restricted
  selection, and clear actions stay target-owned until separately specified.
- Date Picker owns one editable native text value serialized as local
  `YYYY-MM-DD`. It never converts a date-only value through UTC.
- Date Picker exposes a separately focusable native trigger button and an anchored,
  named, non-modal `role="dialog"`. The input owns `role="combobox"`,
  `aria-haspopup="dialog"`, `aria-autocomplete="none"`, expanded state, form
  attributes, and the selected value.
- The calendar contains a labelled grid with weekday column headings, six explicit
  week rows, and native day buttons exposed as gridcells. One enabled day owns the
  roving Tab stop.
- Date keyboard behavior is direction-aware: arrows move by day/week, Home and End
  move within a week, Page keys move by month, Shift plus Page keys move by year,
  Enter/Space select, and Escape closes and returns focus to the input.
- Inclusive `min` and `max` ISO bounds disable unavailable days and month controls.
  Selection emits bubbling `input` followed by `change`; native reset restores the
  authored input value and closes the popup.
- Static values establish uncontrolled defaults. Framework targets may control
  value and open state after observing the same native events; they must not add a
  hidden mirror owner.
- The three components reuse existing public field, surface, action, type, spacing,
  radius, shadow, motion, z-index, and opacity tokens. Contrast strengthening,
  logical positioning, component geometry, and active-fill math remain private
  composition rather than a new component-token layer.
- Shared enhancers use bounded event work, delegated option/day events, attribute or
  child observers only where authored state can change, no polling, no component
  network client, and no continuous layout loop. Closed popups perform no background
  rendering work.

## Performance Exception

After implementing the three previously delegated behaviors and the final
content-resilience correction, canonical Forms CSS measures `7,314 B` gzip
against the `6.4 KiB` family ceiling and shared runtime measures `9,754 B` gzip
against the `8 KiB` ceiling. The complete neutral component CSS bundle measures
`58,405 B` gzip and remains below its `64 KiB` ceiling. No rules were moved
between families to evade measurement.

This is a documented exception under ADR 0088 rather than a budget rewrite:

- Slider requires engine-specific native track/thumb/focus selectors and separate
  single/range geometry.
- Combobox requires editable-input filtering, IME protection, highlight/selection
  separation, dismissal, events, reset, and dynamic authored-option support.
- Date Picker requires local-date parsing, bounded month generation, full grid
  semantics, roving focus, keyboard movement, selection events, dismissal, and
  reset.

These are essential behaviors that were previously delegated while the adapters
were marked implemented. Their measured additions are accepted for human-review
readiness, but the ceilings remain unchanged and later batches do not inherit an
automatic allowance. A future runtime modularization or distribution-budget change
is an architecture decision and remains outside this ADR.

## Consequences

- Neutral Web and Shopify receive the same canonical CSS and progressive behavior;
  target-native templates must render the documented native owners and hooks.
- React and future framework adapters translate lower/upper values, editable query,
  selected ISO date, open state, and events without changing semantic ownership.
- Figma represents reviewed semantic properties and states but does not own runtime
  filtering, form state, or calendar math.
- Date ranges, localized edit formats, first-weekday policy, multi-month calendars,
  time selection, rich/remote autocomplete, restricted combobox selection, and
  advanced slider scales remain explicit open product or architecture choices.
- Visual proportions, density, popup surfaces, fill strength, and calendar styling
  still require explicit human approval before any component is promoted to
  `stable`.
