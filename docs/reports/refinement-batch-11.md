# Component Refinement Batch 11

Status: Segmented Control, Field Wrapper, Fieldset, and Inline Error complete for human review

Date: 2026-07-13

Components: Segmented Control, Field Wrapper, Fieldset, Inline Error

## Outcome

All four components are prepared for explicit human stability review. They have
research dossiers, reconciled contracts/APIs, canonical source refinements,
byte-identical Exhibit/Studio rendering, generated Web/Shopify translation,
real-browser interaction/accessibility/responsive evidence, and component audits.

Segmented Control now has one native radio group owner. Field Wrapper and Fieldset
are explicit composition primitives that consume canonical controls without
duplicating value behavior. Inline Error defaults to no live announcement and
exposes deliberate Polite/Assertive modes for target-owned dynamic timing.

No contract moved to `stable`; Button remains the only historically approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- APG/WAI/HTML evidence establishes native fieldset/legend/radio semantics,
  normal radio keyboard behavior, first-legend disabled exceptions, explicit
  label/control/description association, and text-first error identification.
- Radix, React Aria, and Polaris support one group value plus authored options,
  field composition, and target-owned ids/state. Action groups and Tabs remain
  separate components.
- Live-region evidence requires announcement timing to be deliberate; static
  Inline Error content therefore defaults to None.
- ADR 0096 records these ownership boundaries, required Studio slots, shared
  renderers, and the measured performance exception.

## Browser Evidence Summary

- Segmented Control preserves native Arrow selection, input/change order,
  required validity, FormData/reset, group/per-option disabled semantics, `44px`
  targets, dual focus rings, and `286px` container stacking.
- Field Wrapper resolves all label/helper/feedback relationships and removes
  absent feedback references when switching to Default. Error keeps invalid state
  on the composed canonical Input.
- Fieldset exposes one named native group, composes canonical Radio, submits/
  resets the selected value, and preserves native disabled propagation/form
  exclusion plus the first-legend exception.
- Inline Error maps None/Polite/Assertive exactly to no live attributes,
  status/polite/atomic, and alert/assertive/atomic.
- All four have byte-identical Exhibit/Studio canonical markup, zero sampled
  root/stage overflow, passing dark/forced-color/reduced-motion behavior, and
  sampled text contrast of at least `7.26:1` light and `10.03:1` dark.
- Thirty-two canonical screenshots cover 4 components × Exhibit/Studio ×
  Mobile/Tablet/Desktop/XL. Ten supplemental after images cover focus, disabled,
  dark, Polite, and extreme RTL. Eight desktop before images preserve the Batch
  11 baseline under `output/playwright/refinement-batch-11/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Forms CSS | `8,594 B` | `6.4 KiB` | documented exception |
| Shared theme runtime | `10,283 B` | `8 KiB` | existing documented exception; `0 B` Batch 11 delta |
| Four Batch 11 component runtimes | `0 B` | `0 B` passive/native | pass |
| Neutral Web components CSS | `60,422 B` | `64 KiB` | pass (`5,114 B` headroom) |

Forms CSS adds `663 B` and the complete Web bundle adds `660 B` relative to
Batch 10. The implementation adds no asset, observer, timer, polling loop,
network request, or hidden state owner. ADR 0096 records the rationale without
changing any ceiling.

## Validation

- Registry/docs, DTCG source, all 183 contracts, and all 183 Studio definitions.
- Neutral Web and Shopify adapter generation/validation.
- Structural certification, Exhibit/Studio parity, static preview audit, global
  refinement audit, temporary full docs build, syntax/diff checks, and explicit
  `site/dist` verification.
- Real-browser keyboard/native form/reset/required/disabled/association/live-
  region/RTL/content/contrast/forced-color/reduced-motion and four-viewport
  evidence.

## Remaining Human Risks And Open Input

1. Segmented Control needs visual approval of label/target density, selected
   treatment, focus, validation families, and narrow stacking.
2. Field Wrapper needs approval of label/message scale, required marker,
   feedback hierarchy, and internal spacing.
3. Fieldset needs approval of border/padding/legend interruption, description
   spacing, disabled opacity, and narrow flow.
4. Inline Error needs approval of surface, type/icon alignment, and wrapping;
   target assistive-technology testing remains necessary for dynamic validation.
5. None has a component-specific owner visual reference; accept the repository
   renders or provide replacement evidence.
6. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The global matrix is regenerated at the end of this batch. Expected progress is
183 components, 94 dependency edges, 34 dossiers, and 31 components ready for
human review; only Button is human-approved. Work may continue around Pin Input
until a dependent component requires its unresolved value-owner architecture.
