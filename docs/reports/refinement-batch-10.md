# Component Refinement Batch 10

Status: Color Picker and File Upload complete for human review; Pin Input awaits an owner architecture decision

Date: 2026-07-13

Components: Color Picker, File Upload, Pin Input

## Outcome

Color Picker and File Upload are prepared for explicit human stability review.
Both have research dossiers, reconciled semantic contracts/APIs, canonical source
refinements, byte-identical Exhibit/Studio rendering, generated Web/Shopify
translation, real-browser interaction/accessibility/responsive evidence, and
component audits.

Pin Input research is complete but implementation is intentionally unchanged.
The current accepted multiple-native-input architecture conflicts with strong
single-input OTP/autofill evidence; changing that value owner requires the owner
choice documented in `docs/OPEN-QUESTIONS.md` and its dossier.

No contract moved to `stable`; Button remains the only historically approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- HTML/WAI evidence establishes named native radios and one native FileList as
  authoritative selection/form owners. Open UI, Shopify, and mature systems
  support visible names/status, 44px option targets, and target-owned upload work.
- Color Picker is an authored-option Swatch Group, not `input[type=color]`.
- File Upload enhancement reads only native file names and drag presence; it does
  not replace native drop or own upload/validation/preview work.
- HTML/web.dev/Apple OTP evidence recommends one full-code native text input,
  while ADR 0021 accepted individual cells. ADR 0095 explicitly defers this
  architecture change rather than inferring it.

## Browser Evidence Summary

- Color Picker Arrow navigation emitted one native input/change pair, submitted
  the selected stable value, reset correctly, and exposed required value-missing.
- File Upload selected/submitted/reset a real native File, announced one/two exact
  names, and kept drag visual state bounded without `preventDefault` or FileList
  assignment.
- Both components have exact Exhibit/Studio canonical markup (`2,277` and `990`
  characters respectively), zero console errors/warnings, zero normal/extreme RTL
  overflow, and passing disabled/special-media states.
- Light non-text minima are `3.07:1`; dark minima are `5.22:1`. Sampled text
  minima are `7.81:1` light and `12.09:1` dark. Focus/selected boundaries reach
  at least `10.37:1` light and `17.93:1` dark where sampled.
- Sixteen canonical screenshots cover 2 ready components × Exhibit/Studio ×
  Mobile/Tablet/Desktop/XL. Six supplemental after images cover keyboard selected,
  selected focus, dark, and extreme RTL. Six desktop before images preserve all
  three original Batch 10 baselines under `output/playwright/refinement-batch-10/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Forms CSS | `7,931 B` | `6.4 KiB` | documented exception |
| Shared theme runtime | `10,283 B` | `8 KiB` | documented exception |
| New File Upload behavior delta | `529 B` | `1 KiB` | pass |
| Neutral Web components CSS | `59,762 B` | `64 KiB` | pass |

Color Picker remains `0 B` runtime. The CSS delta from the Batch 09 measurement
is `617 B`; Forms rules were not moved to another family. File Upload adds no
network, FileReader, object URL, polling, observer, or asset. ADR 0095 records the
new measured rationale without changing any ceiling.

## Validation

- Registry/docs, DTCG source, all 183 contracts, and all 183 Studio definitions.
- Neutral Web and Shopify adapter generation/validation.
- Structural certification, Exhibit/Studio parity, static preview audit, global
  refinement audit, temporary full docs build, syntax/diff checks, and explicit
  `site/dist` verification.
- Real-browser keyboard/pointer/native form/FileList/reset/drag/required/multiple/
  RTL/content/contrast/forced-color/reduced-motion and four-viewport evidence.

## Remaining Human Risks And Question

1. Color Picker needs visual approval of target/fill sizing, selected ring/check,
   spacing, labels, validation, and focus.
2. File Upload needs approval of dashed boundary, padding/icon/type hierarchy,
   selected/drag/validation, and focus.
3. Both need component-specific owner visual evidence or explicit acceptance of
   the repository render; shared Studio frames are traceability only.
4. **Owner decision required for Pin Input:** approve one full-code native owner
   with derived cells, or explicitly retain multiple one-character native inputs
   and define their complete-code form/autofill convention.

## Program Progress

The global matrix is regenerated at the end of this batch. Expected progress is
183 components, 94 dependency edges, 30 dossiers, and 27 components ready for
human review; only Button is human-approved. Pin Input remains researched but not
ready, so the next autonomous dependency-safe work may proceed around it until a
dependent component requires that ownership decision.
