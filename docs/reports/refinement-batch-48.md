# Component Refinement Batch 48

Status: Star Rating Display technically refined; architecture input required

Date: 2026-07-15

Component: Star Rating Display

## Outcome

V2 Star Rating's dossier, standards research, passive shape-state decision,
contract, canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX,
generated adapters, browser evidence and individual audit are reconciled. The
contract remains `pilot`; no component was promoted to `stable`.

A11 compact Rating versus V2 richer Star Rating identity remains an explicit
owner architecture decision. Review Summary's `0.1` aggregate precision also
requires an explicit target projection policy before it can map truthfully to
V2's strict half-step anatomy. `site/dist` was not rebuilt or modified. Button
remains the only human-approved stable component.

## Safe Refinement

- The root remains one passive, unfocusable image with a required localized
  value-and-scale label.
- Exactly five hidden state containers replace the former five labelled-by-color
  SVG roots.
- Full uses solid fill, empty uses a complete outline, and half layers clipped
  fill over a complete outline. Monochrome and forced colors retain meaning.
- Canonical `data-state="empty|half|full"` replaces the pilot's legacy
  `data-filled` and `.is-*` markers without compatibility aliases.
- Accent and secondary text tokens replace Button-background and border tokens.
- Default/large modes remain public while `1rem`/`1.5rem`, gap and partial-fill
  geometry stay private.
- `ratingValue`, `label` and `size` remain the complete semantic API. No scale,
  precision, formatter, event, controlled state, provider or runtime is added.
- Exhibit and Studio use one renderer and initial fixture. Lucide remains a
  site-only fixture dependency, not a neutral contract surface.
- Web, Shopify and Webflow consume regenerated canonical CSS. V2 Shopify remains
  CSS-ready/planned until identity and provider policy are accepted.
- ADR 0133 records the safe implementation and every deferred boundary.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` holds in Mobile, Tablet, Desktop and
  XL with SHA-256
  `04385e21407639469ba67d72af7119f70abf90b447123ae02350bb534193d3c1`,
  zero focus stops and no overflow.
- The accessibility snapshot is one image named `4.5 out of 5 stars`; all five
  state containers hide their icon subtrees.
- `0`, `0.5`, `4.5` and `5` produce the expected five-state sequences with five
  or six SVGs and no normalizer or component calculation.
- Default is `88x16px`; large is `128x24px`. A `160px` host contains large with
  equal client/scroll widths.
- A long Arabic label in RTL retains an LTR star sequence and equal widths.
- At 200% root font scale, large becomes `256x48px` and the document remains
  `1600/1600px`.
- Light fill/outline contrast is `3.56:1 / 7.81:1`; dark is
  `7.92:1 / 12.09:1`.
- Forced colors resolves both layers to system text while form remains distinct;
  reduced motion reports only `0s` animation/transition durations.
- Eight before, eight final viewport and nine state/special images live under
  `output/playwright/refinement-batch-48/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,426 B` | `3.7 KiB` | pass (`362 B` remaining; `-14 B` from Batch 47 baseline) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; Star Rating adds `0 B`) |
| Neutral Web components CSS | `67,058 B` | `64 KiB` | current gap (`1,522 B` over) |

All ceilings remain unchanged. Existing total-CSS/runtime overages stay explicit
program gaps; shape distinction and semantic correctness were not removed to
manufacture a pass.

## Human And Architecture Queue

Choose retain-with-boundary versus deliberate A11/V2 consolidation. If retained,
approve V2's cross-target use case and the projection policy for aggregates that
are not half steps. Then review accent, outline weight, shapes, sizes, gap and
alignment in standalone, Review Summary and Review Card contexts, and produce
component-specific Figma artwork.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
copied CSS, mandatory Shopify docs/official validation artifact
`star-rating-batch-48` revision 2, structural/static/parity/refinement audits,
browser semantics/states/preferences/RTL/scale/narrow containment, source/
generated identity, deterministic gzip, TypeScript, a temporary Vite build
outside `site/dist`, diff checks, a final component runtime probe with only the
site-wide missing-favicon `404`, and `site/dist` cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 109 dependency edges,
89 dossiers and 77 components ready for human review. Star Rating Display is
`refined-decision-needed`; it remains excluded from readiness until architecture
input. Star Input (`V3`, review order 150) is the next dependency-order candidate.
