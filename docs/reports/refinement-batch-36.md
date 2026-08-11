# Component Refinement Batch 36

Status: Collection Filters refined; architecture/product decisions required

Date: 2026-07-14

Components: Collection Filters

## Outcome

Collection Filters' dossier, research, native technical-core decision, contract,
canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX, generated
Web/Shopify adapters, browser evidence, open questions, and individual audit are
reconciled. The contract remains `pilot`; the component is not ready for human
review and no component was promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- The Web evidence uses a neutral root plus one named native GET control form;
  result content is its sibling so consumer forms cannot be nested.
- Always-visible groups use fieldset/legend; inert group-title Buttons are gone.
- Canonical Checkboxes expose stable names/values and serialize/reset correctly.
- Active values use a native list of canonical Tags with target-fixture focus
  recovery after removal.
- The inert sort label and Collection-owned focus token control are removed.
- Registry, contract `0.2.0`, Studio, MDX and generated adapters now agree.
- Neutral runtime remains unchanged. Shopify remains deliberately incomplete and
  reports `needs-target-work`, `ready: false`.

## Blocking Decisions

1. Choose one narrow/adaptive surface: recommended shared form content in a wide
   inline sidebar plus canonical Drawer; alternatives are inline expansion or a
   target-external shell.
2. Choose one commitment boundary: recommended native GET baseline with optional
   target-owned immediate enhancement; alternatives are always-immediate or an
   explicit Apply/Cancel batch.
3. Decide whether group collapse is in v1 and therefore composes Disclosure or
   Accordion.
4. Decide whether sort/result count belong to Filters or a parent Collection
   Toolbar.
5. Define price-range, swatch, zero-count/disabled, large-facet, result-status,
   URL/history, focus, and pagination-reset policy across targets.

## Browser Evidence Summary

- Exhibit and Studio initial outerHTML is exactly equal at `1,853` characters in
  Mobile, Tablet, Desktop and XL: one neutral root, one named GET form, sibling
  results, zero nested forms, one active `ul`, two active items, two fieldsets/
  legends, four named/valued Checkboxes, and zero inert title Buttons.
- FormData, multi-value Material selection, Checkbox-to-Tag synchronization,
  Tag removal, next-action/first-choice focus recovery, reset, empty selection,
  and prevented fixture navigation pass.
- Four default viewports, long French text, mixed CJK/Arabic, an unbroken active
  value, RTL, dark mode, forced-color focus and reduced motion remain overflow-
  free where the current surface is visible.
- The evidence intentionally fails the responsive-readiness gate: Mobile shows
  zero groups in both modes, while a `356px` Exhibit root receives the wide
  sidebar when the page viewport is desktop.
- Four before, eight viewport-after and eight special-state images live under
  `output/playwright/refinement-batch-36/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Collection CSS | `2,257 B` | `2.5 KiB` | pass (`303 B` headroom; `-1 B` from Batch 35) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Filters runtime) |
| Neutral Web components CSS | `65,531 B` | `64 KiB` | pass (`5 B` headroom; `+14 B` from Batch 35) |

## Validation

- Registry/docs, DTCG/Web component tokens, 183 contracts, 183 Studio
  definitions, Neutral Web and Shopify adapters, and structural audits pass.
- Shopify remains `editor-ready`, `ready: false`, with behavior correctly marked
  `needs-target-work`; its generated Collection CSS is byte-identical to source.
- Static Preview, exact parity, semantic/form/content/theme/accessibility browser
  probes, deterministic gzip, global refinement audit, temporary site build,
  diff checks, Liquid validation, generated/source identity, and `site/dist`
  cleanliness comprise the final gate.

## Program Progress

The regenerated program contains 183 components, 106 dependency edges, 77
dossiers and 66 components ready for human review. Collection Filters is marked
`refined-decision-needed`; it does not increase the readiness count. The next
dependency-safe component is Pagination (review order 78), while the filter
decisions remain queued for owner input.
