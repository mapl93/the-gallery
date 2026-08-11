# Refinement Batch 72 — Comparison Table

Status: Neutral refinement complete; Shopify architecture input needed; no
stability promotion

Date: 2026-07-15

Component: Comparison Table (`S13`, dependency order `173` before dependency
reconciliation)

## Outcome

Batch 72 converts Comparison Table from a focusable section that duplicated
table presentation into a passive conditional context wrapper around canonical
Data Table. The visible title now remains outside the one named horizontal
scroll owner; native caption/header relationships and text-complete statuses are
present; Exhibit and Studio emit exact shared markup; narrow, localized, RTL,
zoom, theme, forced-color, and keyboard evidence passes with zero S13 runtime.

The neutral source and Web/Webflow/Shopify CSS projections are complete.
Shopify remains intentionally `css-ready` rather than target-ready because no
accepted matrix editor/data model exists. The recommended bounded two-offering
block profile and two alternatives are documented for owner selection.

## Delivered

- Permanent Comparison Table dossier and refinement audit.
- ADR 0155 for passive semantics, canonical Data Table composition, overflow,
  status, API, performance, and target boundaries.
- Contract `0.3.0`, registry dependency/description, and reduced Studio controls.
- Conditional shared renderer with native caption, labelled wrapper, canonical
  classes, meaningful status text, and strict required-slot omission.
- Source Sections CSS with intrinsic measure/title/highlight/status ownership;
  duplicate table CSS and S13-specific Studio icon repair removed.
- Adjacent canonical Data Table final-row separator fix for row-header tables.
- Updated MDX, Shopify adapter guidance, Open Questions, and component matrix
  inputs.
- Eight before and nineteen after captures across paired viewports, direct
  widths, focus, untitled, localized RTL extreme, 200% text, dark, and forced
  colors.
- Regenerated Web, Webflow, and Shopify assets; official Shopify CSS validation
  passes for artifact `comparison-table-s13-batch72`, revision 2.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate.
- Comparison Table Exhibit/Studio DOM is exactly equal: `2,425` characters,
  FNV-1a `214e2bd7`.
- Direct `200–1120px` roots contain ordinary content; only the canonical table
  wrapper overflows below its private `36rem` table minimum.
- ArrowRight scrolls `0 -> 40px` while title x-position remains `40px`.
- Untitled mode emits `DIV`, no unnamed section/heading, and retains table and
  wrapper names.
- Seven-column localized RTL extreme content and effective 200% text remain
  outer-contained.
- Light/dark check contrast is `3.29:1`/`8.93:1`; cross is
  `7.81:1`/`12.09:1`; forced colors and reduced motion pass.
- S13 contains no interactive cell, active animation, listener, observer,
  request, timer, layout read, target asset, or neutral runtime.
- Final browser console has zero errors/warnings; tracked `site/dist` remains
  untouched.

## Budgets

| Surface | Final | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections CSS | `6,836 B` gzip | `6,861 B` | pass; `25 B` remaining |
| Neutral Web component CSS | `67,167 B` gzip | `65,536 B` | existing program gap `1,631 B` |
| Shared neutral runtime | `10,501 B` gzip | `8,192 B` | existing program gap; S13 delta `0 B` |

Canonical/Webflow/Shopify Sections and Primitives copies are pairwise
source-identical.

## Program Position

Comparison Table gains one canonical `data-table` dependency, increasing the
global graph to `131` edges and changing S13 from dependency depth `0` to `1`.
The dossier count becomes `113`. Human-review-ready remains `98 of 183` because
S13 is intentionally `architecture-input-needed`; its neutral visual candidate
can be reviewed, but complete cross-target readiness awaits the Shopify choice.
