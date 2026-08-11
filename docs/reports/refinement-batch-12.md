# Component Refinement Batch 12

Status: Password Input, Number Input, and Form complete for human review

Date: 2026-07-13

Components: Password Input, Number Input, Form

## Outcome

All three components are prepared for explicit human stability review. They have
source-backed research dossiers, reconciled native ownership/contracts/APIs,
canonical implementations, exact Exhibit/Studio rendering, generated Web and
Shopify translation, browser interaction/accessibility/responsive evidence, and
component audit reports.

Password Input now has one same-node secret owner and optional target-authored
strength. Number Input shares native stepping infrastructure with Quantity
Selector without merging their public identities. Form is a real native form
and container-responsive composition whose validation/submission lifecycle
remains target-owned.

No contract moved to `stable`; Button remains the only historically approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- HTML, WCAG/WAI, Open UI research, GOV.UK, Radix, Shopify, Base UI, and React
  Aria evidence establishes native secure/numeric/form ownership, paste/autofill,
  same-node reveal, native stepping/validity/events, linked text errors, and
  target-owned advanced policy/lifecycle boundaries.
- ADR 0097 records one password owner, distinct-but-shared Number/Quantity
  stepping infrastructure, a real native Form root, container responsiveness,
  optional non-live static feedback, cross-target mappings, and performance.
- Pin Input remains paused on its explicit owner architecture choice; Batch 12
  progressed around it without altering its contract or implementation.

## Browser Evidence Summary

- Password reveal preserves node identity/value, synchronizes its complete
  accessible action state, allows paste/autofill, removes optional strength
  cleanly, and covers disabled/readonly, focus, RTL, dark, forced-color, and
  reduced-motion behavior.
- Number Input preserves native step alignment, input/change order, nullable
  direct edits, validity, FormData, reset, disabled/readonly and boundary state;
  signed numeric glyphs remain correct in RTL.
- Form preserves named FormData plus the activated submitter, native reset/
  validity/noValidate/autocomplete, linked summary-to-field focus, source order,
  three-column capacity, and narrow full-width action stacking.
- All three have byte-identical Exhibit/Studio canonical output and zero sampled
  root/stage overflow. Twenty-four canonical screenshots cover 3 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL. Fifteen supplemental after images
  cover dark, focus/visibility/readonly/three-column, extreme RTL, and forced
  colors. Six desktop before images reconstruct the exact pre-refinement source
  baseline and are explicitly named `-reconstructed` rather than presented as
  live historical captures.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Forms CSS | `9,303 B` | `6.4 KiB` | documented exception |
| Shared theme runtime | `10,335 B` | `8 KiB` | existing documented exception |
| Batch 12 shared behavior delta | `65 B` | `1 KiB` | pass |
| Password Input runtime | `0 B` | `0 B` passive/native | pass |
| Form runtime | `0 B` | `0 B` passive/native | pass |
| Neutral Web components CSS | `60,456 B` | `64 KiB` | pass (`5,080 B` headroom) |

Deterministic level-9 gzip measurement shows `724 B` Forms CSS, `65 B` shared
runtime, and `223 B` complete Web bundle growth from the Batch 12 starting
measurement. No component adds an asset, hidden value owner, polling loop, timer,
network client, or request. ADR 0097 records the rationale without changing any
ceiling.

## Validation

- Registry/docs, DTCG source, all 183 contracts, and all 183 Studio definitions.
- Neutral Web and Shopify adapter generation/validation.
- Structural certification, Exhibit/Studio parity, static preview and global
  refinement audits, temporary full docs build, syntax/diff checks, and explicit
  `site/dist` verification.
- Real-browser identity/reveal/paste/step/event/form-data/submitter/reset/
  validity/readonly/disabled/container/summary/RTL/content/contrast/forced-color/
  reduced-motion probes and four-viewport evidence.

## Remaining Human Risks And Open Input

1. Password Input needs approval of responsive reveal density, icon geometry,
   strength treatment, validation colors, and focus hierarchy.
2. Number Input needs approval of action density, numeric viewport, separators,
   radius, icons, validation colors, and focus hierarchy.
3. Form needs approval of section hierarchy, row/action spacing, narrow stacking,
   error-summary surface, and linked-error presentation.
4. None has a component-specific owner visual reference; accept the repository
   renders or provide replacement evidence.
5. Password-manager/screen-reader, numeric locale/assistive technology, and
   dynamic Form validation lifecycles still require target/device testing.
6. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The global matrix is regenerated at the end of this batch. Expected progress is
183 components, 94 dependency edges, 37 dossiers, and 34 components ready for
human review; only Button is human-approved. Work may continue around Pin Input
until a dependent component requires its unresolved value-owner architecture.
