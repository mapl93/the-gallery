# Component Refinement Batch 09

Status: Complete; components are ready for human review, not automatically stable

Date: 2026-07-13

Components: Slider, Combobox, Date Picker

## Outcome

The dependency-ordered advanced-control batch is prepared for explicit human
stability review. All three components have research dossiers, reconciled
contracts and semantic APIs, canonical CSS/runtime refinements, shared
Exhibit/Studio consumption, generated Web/Shopify translation, real-browser
interaction/accessibility/responsive evidence, and component-level audits.

No contract moved to `stable`; Button remains the only historically approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- HTML and WAI-ARIA APG support native range ownership, editable manual-list
  combobox focus, and a roving calendar grid/dialog.
- Open UI identifies broader slider/autocomplete/date spaces but does not justify
  importing unsettled vertical/rich/remote/range/locale APIs into v1.
- Radix, Carbon, Polaris, and native target patterns informed controlled APIs,
  composition, and target translation without becoming source.
- ADR 0094 records the native owners, event/focus/form lifecycle, bounded shared
  enhancer work, non-decisions, and measured performance exception.

## Implementation Summary

### Slider

- Native single/range owners now synchronize output and fill; lower/upper names
  remain stable and cannot cross.
- Cross-engine thumb/track/focus, RTL progress, validation, disabled, reduced
  motion, forced colors, FormData, events, and reset pass.

### Combobox

- Native editable input keeps DOM focus and uses active descendant for a
  non-cycling, disabled-aware authored option list.
- Filtering, IME, commit/dismissal, free-form Tab, selection, native events,
  reset, FormData, logical popup placement, and extreme content pass.

### Date Picker

- Editable ISO input, independent trigger, non-modal dialog, complete six-week
  grid, roving focus, bounds, direction-aware keys, native selection events, and
  reset are reconciled.
- Calendar values remain local dates with no UTC conversion; richer locale/range/
  time policies remain explicit future decisions.

## Browser Evidence Summary

- Slider events/FormData/reset and ordered range clamping pass; native RTL
  `ArrowRight` moved `60` to `59`.
- Combobox highlighted/selected the intended option, kept focus in the input,
  skipped disabled results, preserved free-form Tab, and restored on reset.
- Date Picker selected `2026-07-13` with one event pair, navigated bounded August,
  maintained one roving day, returned focus, and reset to `2026-07-12`/July.
- At 390px, unbroken localized Field labels and component surfaces produce zero
  document overflow. RTL popup/calendar alignment remains logical and contained.
- Text contrast minima measured `7.81:1` for sampled secondary/day text and
  `10.37:1` for selected-day text; primary samples measured `17.93:1`.
- Reduced motion resolves to `0s`; forced colors uses system boundaries/focus;
  normal fixtures have zero overflow.
- Twenty-four canonical after screenshots cover 3 components × Exhibit/Studio ×
  Mobile/Tablet/Desktop/XL. Six before screenshots are stored alongside them at
  `output/playwright/refinement-batch-09/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Forms CSS | `7,314 B` | `6.4 KiB` | documented exception |
| Shared theme runtime | `9,754 B` | `8 KiB` | documented exception |
| Neutral Web components CSS | `58,405 B` | `64 KiB` | pass |

ADR 0094 accepts the first two measured exceptions for the three essential
behaviors that were previously delegated. The ceilings are unchanged; no family
rules moved to evade measurement, and later components inherit no allowance.

## Validation

- Registry/docs, DTCG source, all 183 contracts, and all 183 Studio definitions.
- Neutral Web and Shopify adapter generation/validation.
- Structural certification, Exhibit/Studio parity, static preview audit, global
  refinement audit, temporary full docs build, and syntax/diff checks.
- Real-browser pointer/keyboard/form/reset/bounds/RTL/content/contrast,
  forced-colors, reduced-motion, and four-viewport evidence.

## Remaining Human Risks

1. Slider needs visual approval of geometry, fill, thumb, shadow, validation,
   labels, and focus.
2. Combobox needs approval of field/list geometry, density, selection/check,
   empty state, shadow, validation, and focus.
3. Date Picker needs approval of field/trigger/calendar/day geometry, hierarchy,
   selection/today treatments, shadow, validation, and focus.
4. All three need component-specific owner evidence or explicit acceptance of
   the repository render. Shared Studio calibration frames are traceability only.

## Program Progress

The global matrix is regenerated at the end of this batch. Expected progress is
183 components, 94 dependency edges, 27 dossiers, and 25 components ready for
human review; only Button is human-approved. The next dependency-safe controls
are Color Picker, File Upload, and Pin Input.
