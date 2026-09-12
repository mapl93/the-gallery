# Material Library and Glaze Guide checkpoint

Date: 2026-09-12

Decision: ADR 0355. 23 new roles; public profiles 32 and 41.

## Delivery and evidence

Canonical geometry/spacing moves into source tokens, contracts, registry and
Studio, with Exhibit derived from the same inventory. Existing shared values
remain anchors. Material text gaps and Glaze sample/fact gaps can be customized
independently. Reserved Glaze target-hook controls are labelled separately from
passive sample controls. Sample illustration colors remain target content; MDX
now uses the same existing illustrations as Studio, replacing generic placeholders.

- A fresh CLI consumer installs Material Library, canonical Tag and Glaze Guide
  in the generated dependency order. 608 element comparisons across widths
  320/600/900/1200, light/dark and complete/minimal compositions preserve geometry
  within 0.02 CSS px and computed font/colors/gaps/padding/margins/borders/radii.
- Material custom probe: minimum width 180px yields five columns with six records
  in the tested wide container; media 220px, padding 15px, border 3px, subtitle
  gap 8px, classification 6px, description 10px, tag gap 12px and offset 18px.
- Glaze custom probe: aspect ratio 1.5, name gap 8px, code gap 6px, padding 30px,
  fact-group gap 12px, fact offset 18px, term/value gap 4px and borders 3px/4px.
  Narrow RTL layout fits; forced colors preserves sample boundary. Actual samples
  contain no links, buttons, tabindex or selection attributes.
- A separate native-link projection probe confirms the retained target hook's
  4px focus outline and 6px offset. This verifies CSS consumption only and does
  not deliver or certify a selectable glaze widget.
- Studio media 12rem resolves to 192px; classification tracking remains in em;
  title omission produces a neutral div with no dangling accessible label.
  Glaze aspect/code-gap edits and optional featured-detail removal work. Reset
  restores defaults. Exhibit includes visual roles and reserved hook values.
- Custom screenshots inspected. Ignored evidence:
  `output/playwright/reference-values/`. Temporary public fixture removed.
  One browser/server closed, resource gate clean, no remaining test processes.

## Validation and boundaries

Source/Web/Shopify adapter builds, docs/contracts/Studio/CLI validation,
canonical catalogue and structural certification/refinement/performance
inventories pass. Catalogue: 1,140 paths and 9,120 compiler comparisons.
Maturity remains 5 stable, 173 pilot, 4 deprecated. Shopify performance guidance
still has advisory overages; no hosted target certification is claimed.

No new runtime, modes, content schema, Shopify Liquid/upload, Figma, tool
installation, site/dist or stable promotion. Existing colors are preserved;
this does not certify arbitrary media, chemical/safety claims, record provenance,
production choice behavior, screen readers or consumer customizations. Generated
Shopify CSS is available; target data/editor work remains pending. Copy-and-own
consumers explicitly adopt updated tokens and CSS together.
