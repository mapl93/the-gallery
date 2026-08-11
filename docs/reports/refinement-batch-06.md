# Refinement Batch 06: Table, Data List, Timeline

Date: 2026-07-13

Status: All three ready for human review; none promoted to `stable`

## Batch Result

| Component | Contract | Technical result | Human input |
| --- | --- | --- | --- |
| Table | `0.3.0` | Native caption, named keyboard scroll, sort focus/order synchronization, semantic type, intrinsic overflow, reduced motion, forced colors | Approve density, scrolling, header/focus visuals |
| Data List | `0.3.0` | Native pairs, logical alignment, extreme wrapping, `20rem` container stack, horizontal/RTL resilience | Approve threshold, row rules, gaps, weights |
| Timeline | `0.3.0` | Ordered/current semantics, logical RTL rail, bounded content, semantic type, readable metadata/status, forced colors | Approve rail, markers, hierarchy, semantic mixes |

ADR 0091 records the new caption, scroll ownership, container response, logical
geometry, and readable status direction. ADRs 0065 and 0066 continue to own the
native semantics, sorting boundary, ordered content, and per-entry statuses.

## Shared Evidence

- 24 canonical screenshots: three components, Exhibit and Studio, Mobile
  `390x844`, Tablet `768x1024`, Desktop `1280x800`, and XL `1600x1000`.
- 14 supplemental images: six before cases plus Table focus/sort/forced/reduced,
  Data List extreme/narrow/horizontal-RTL, and Timeline RTL/forced-colors cases.
- Exhibit and Studio initial roots are byte-identical: Table `558`, Data List
  `412`, Timeline `840` tested characters.
- Browser console output contains only the existing docs `/favicon.ico` `404`
  and React development information; no component exception was observed.

Evidence directory: `output/playwright/refinement-batch-06/`.

## Source Changes

- Table: optional native caption property; named focusable wrapper; intrinsic
  readable width; logical alignment; semantic cell/header type; `32px` sort
  target; focus, reduced-motion, and forced-colors rules.
- Data List: bounded root/items, semantic leading, logical alignment, anywhere
  wrapping, `20rem` component query, and forced-color row rules.
- Timeline: logical rail geometry, bounded content, caption/body type pairs,
  secondary metadata, contrast-strengthened status words, and system-color marker
  structure.
- Contracts, registry, Studio metadata/renderers, MDX, dossiers, neutral Web and
  Shopify adapters, ADR, reports, and global matrix are reconciled. `site/dist`
  was not rebuilt.

## Performance

| Surface | Current gzip | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `57,163 B` | `64 KiB` | pass |
| Shared enhancement JS | `5,180 B` | `8 KiB` | pass |
| Primitives CSS | `9,934 B` | `10.3 KiB` | pass |

All three base components add `0 B` JavaScript and no listener, observer, timer,
request, formatter, data model, asset, or continuous work. Table's Studio-only
sort state demonstrates target ownership; row transition stops under reduced
motion.

## Remaining Risks And Questions

1. All three still require owner visual approval; automated evidence cannot
   promote them to `stable`.
2. The `20rem` Data List threshold is a private responsive choice and should be
   calibrated against owner-provided examples if its density feels premature.
3. Table intentionally remains a horizontally scrollable native table. A mobile
   card/list transformation would be target-specific public anatomy and needs a
   separate decision.
4. Timeline title markup must follow consumer document hierarchy; the preview's
   `h4` is fixture context, not a universal target mapping.
5. Existing Shopify maturity warnings and the docs build chunk warning remain
   repository backlog, not regressions from this batch.

## Validation

- Registry, token source, 183 contracts, 183 Studio definitions, and 183 MDX
  pages validate.
- Web and Shopify adapters generate and validate; existing Shopify warnings are
  unchanged and non-blocking.
- Structural certification: `183` pass, `0` gaps, `1` stable, `182` manual.
- Refinement matrix: `183` components, `94` edges, `18` dossiers, `16` ready for
  human review.
- Exhibit/Studio: `183` shared, `0` gaps, full interaction coverage.
- Static previews: `250`, `0` errors, one existing File Upload opacity warning,
  and six information notes.

## Next Dependency-Ordered Batch

Phase 2 primitives are complete except the already isolated Progress Circle
decision. Continue phase 3 with Input, then dependent Textarea, then Checkbox.
The accepted field validation, hover, focus hierarchy, native value, and
composition ADRs apply without reopening prior decisions.
