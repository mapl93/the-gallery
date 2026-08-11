# Refinement Batch 154: Table of Contents Decision Reconciliation

Date: 2026-07-19

Component: Table of Contents (`L5`)

Result: `human-review-ready`; remains `pilot`

## Scope

Reconciled the previously refined component with owner decision 49:

- target-supplied ordered nested heading records;
- optional controlled `currentSectionId`;
- `placement: sticky | flow`, default `sticky`;
- shared Reading Progress service boundary without a second L5 observer; and
- Shopify exposure only from structured records or verified preprocessing.

## Source Result

- Contract and Studio metadata advance to `0.3.0`.
- Shared renderer validates record ids, labels, children, and uniqueness;
  malformed required data fails the complete root closed.
- Canonical Links use encoded fragments and zero/one controlled
  `aria-current="location"`.
- Sticky is bounded in capable wide/tall viewports and degrades to static flow
  for explicit flow, mobile, zoomed, or short contexts.
- A viewport-taller sticky list remains internally scrollable and exposes its
  focused last Link.
- Neutral L5 runtime remains zero.
- ADR 0270 records the accepted cross-target boundary.

## Validation

- docs, contract, Studio, registry, TypeScript, Neutral Web adapter, Shopify
  adapter, generated-copy identity, and JSON checks pass;
- eight Exhibit/Studio natural viewport captures and special-mode evidence pass;
- DOM/style parity hashes match at 400px (`3c0e99de` / `4bf82dfe`);
- controlled current, unmatched/static, invalid records, optional title,
  sticky/flow/fallback/tall-list, fragment navigation, focus, contrast, RTL,
  effective 200%, text spacing, dark, forced colors, and reduced motion pass;
- console/page errors are empty;
- one Playwright session/tab was used and closed; the pre-existing user server
  was preserved and the evidence resource gate is clean;
- `site/dist` was not rebuilt.

## Performance

- L5: `2,025 B` raw / `750 B` gzip, zero runtime.
- Blog: `5,130 / 5,529 B` gzip, `399 B` headroom.
- Neutral CSS and shared runtime retain existing documented program gaps; L5
  changes neither runtime nor gap policy.

## Evidence

- Dossier: `docs/refinement/dossiers/table-of-contents.md`
- Audit: `docs/reports/table-of-contents-web-refinement-audit.md`
- ADR: `docs/decisions/0270-controlled-table-of-contents-records-and-placement.md`
- Browser: `output/playwright/refinement-batch-154/`

Explicit human visual review remains required before `stable`.
