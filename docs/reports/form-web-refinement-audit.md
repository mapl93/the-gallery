# Form Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Form is now an explicit native Web form and composition/layout primitive with a
required canonical content slot, named controls, native submitter/form/reset/
validity ownership, container-responsive rows, resilient actions, and an
optional linked error summary whose insertion, announcement, and focus timing
remain target-owned.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Native form composition/layout is explicit; schema validation, requests, pending state, analytics, and persistence are excluded. |
| Anatomy and composition | pass | Native root, required content, sections/rows, canonical actions, and linked summary parts are reconciled. |
| Variants, sizes, states | pass | One visual variant/size plus one/two/three columns, actions, summary, native invalid, and target pending boundaries. |
| Public API and ownership | pass | Six semantic properties; named controls and submitter own entry-list/reset/validity semantics, not a mirrored Form object. |
| Tokens and visual system | pass | Nine existing public references; internal flow, thresholds, and geometry remain private. |
| Accessibility and motion | pass | Real form, labels/names, explicit button types, linked text errors, target-owned announcement/focus, forced colors, and no motion. |
| Responsive/content resilience | pass | Component container—not viewport—controls rows; four viewports plus 800/320px and localized RTL probes pass. |
| Runtime and assets | pass | Layout-only component; no listener, observer, request, timer, asset, client, or value mirror. |
| Cross-target translation | pass | Native Web, Shopify Liquid/App Home, frameworks, Figma, and native-mobile boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0097, shared renderer, 13 after captures, native-form probes, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 12 anatomy parts, 1 variant, 1 size, 6 states,
  6 behaviors, 6 properties, and 9 public token references.
- Named controls own their current/default values and validity; the activated
  named submitter participates in `FormData`; reset restores native defaults.
- Form owns internal source-order layout only. Field Wrapper owns association,
  controls own value/validity, Button owns action presentation, and targets own
  submission/validation/pending/error-summary lifecycle.

## Browser And Visual Evidence

- Default form data is `name=Avery+Stone&email=avery%40example.com`; the Save
  submitter adds `intent=save`. Reset restores `Avery Stone`; validity passes.
- Error mode creates one invalid email with linked feedback and summary. The
  summary has `tabindex=-1` but no forced live role; activating its link focuses
  the invalid field. `noValidate` and autocomplete map directly.
- An `800px` component produced three `256px` tracks. At `320px`, it produced
  one `320px` track and two stacked full-width actions. A `326px` localized RTL
  fixture preserves source order and equal client/scroll width.
- Light summary title-link/boundary/heading contrast is
  `7.24:1`/`6.21:1`/`17.93:1`; dark is `9.05:1`/`8.64:1`/`17.18:1`. Forced
  colors maps the summary to system text/background/border; Form adds no motion.
- Exhibit and Studio canonical output is byte-identical. Eight canonical
  captures cover both views at Mobile/Tablet/Desktop/XL; dark, focused-summary,
  three-column XL, extreme-RTL, and forced-colors images supplement two
  reconstructed desktop baselines clearly labeled as reconstructions.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Real native form, named controls/submitter, canonical fields/actions, and container CSS. | Implemented and browser-evidenced. |
| Shopify | Native Liquid form or target `s-form`, with target data/validation/submission lifecycle. | Class adapter implemented and validates; editor/data review remains. |
| React / Angular | Native form event/data semantics with optional coordinated field state. | Strategy documented; adapter not yet certified. |
| Figma | Sections/rows/content/actions/summary/states and tokens. | Metadata validates; no submission or validation ownership. |
| SwiftUI / Compose | Native form grouping/actions/validation summary and target handler. | Conceptual mapping only. |

## Performance And Risks

- Component runtime is `0 B`; no listener, observer, request, timer, asset,
  generated-id store, schema engine, or value mirror is introduced. ADR 0097
  records the shared Forms CSS exception.
- Human review must approve section hierarchy, row/action gaps, narrow stacking,
  summary surface, error links, and canonical Button composition.
- Dynamic screen-reader announcement and focus behavior require target lifecycle
  testing. Server errors, pending/disabled submit, multi-step flows, and HTTP
  versus programmatic persistence remain outside v1 base.

## Validation

Contracts, Studio, registry/docs, public-token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, native browser
form-data/submitter/reset/validity/summary/container/RTL/contrast/special-media
probes, four-viewport evidence, temporary docs build, performance, syntax, diff,
and `site/dist` checks are included in Batch 12.
