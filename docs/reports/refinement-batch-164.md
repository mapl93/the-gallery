# Refinement Batch 164 — Firing Schedule Certification

Date: 2026-08-11

Component: R6 `firing-info` (public identity: Firing Schedule)

Result: ready for explicit human review; remains `pilot`

## Implemented Direction

Owner decision 60 and ADR 0271 supersede the passive fact-card candidate. R6
now accepts one normalized Celsius/seconds program and derives both required
representations:

- a real elapsed-time ramp chart with planned and optional actual curves;
- one canonical Data Table row per stable planned segment.

The pure neutral model validates ordered segments, derives ramp/hold durations
and points, requires an estimated duration for `full` rate, validates strictly
ordered observations, correlates optional summaries, converts display units and
falls back to planned when actual data is unavailable. It has no DOM, framework,
network, timer, observer, persistence or equipment dependency.

The public controlled surface supports planned/actual/both, collecting/complete
and Celsius/Fahrenheit. Chart geometry, ticks, line treatment, table measure and
scroll thresholds remain private. Exhibit and Studio consume the same renderer
and fixture. The old `FiringInfoArtwork` path is only a pre-v1 re-export alias.

## Evidence Result

Batch 164 records:

- eight paired natural Exhibit/Studio captures at Mobile, Tablet, Desktop and
  XL;
- four rows, eight both-mode columns, two curves and exactly two named overflow
  focus owners in every natural fixture;
- explicit informative SVG name/description/caption and canonical native table
  caption/scope relationships;
- planned, actual, both, fallback, collecting, complete, Celsius, Fahrenheit
  and missing-summary behavior;
- no raw-sample rows or focus stops and no live regions or component scripts;
- exact normalized Exhibit/Studio DOM hash `16c77db5` and style hash
  `3b242ce7`;
- light/dark AA text contrast and `3.56:1` minimum series contrast;
- forced-color unfilled dashed/solid curves, visible boundaries/focus and zero
  active reduced-motion parts;
- direct `240/390/720px`, RTL/long, localized Fahrenheit, effective 200% text,
  user spacing and print resilience with zero root/document overflow;
- zero browser console or page errors.

The former Batch 115 passive-card captures remain the before evidence. Final
captures and executable probes live under
`output/playwright/refinement-batch-164/`.

## Targets And Performance

- Contract, Studio metadata and docs-site TypeScript validation pass.
- Neutral Web and Shopify adapter validators pass; known Shopify maturity
  warnings are unrelated to R6.
- Webflow and Shopify Ceramics CSS are source-identical to canonical CSS.
- The neutral Web firing model is source-identical to its source helper.
- R6 CSS is `4,663 B` raw / `1,162 B` gzip level 9.
- Ceramics CSS is `5,345 B` gzip against `5,427 B`, leaving `82 B` headroom.
- The neutral model is `5,930 B` raw / `1,610 B` gzip.
- Global Web CSS and shared-runtime overages remain previously documented; R6
  adds no shared runtime.

One headless Chromium session named `gallery-refinement`, one tab and one
pre-existing user-owned server were used sequentially. The browser closed, the
server was preserved and `evidence:assert-clean` passed. `site/dist` was not
rebuilt.

## Remaining Gates

- production record, provenance, validation, applicability and localization;
- maximum segment/sample counts and bounded update cadence;
- technical/safety approval and separately composed warnings/instructions;
- first Shopify consumer/editor integration;
- print/export/offline/audit-history product decisions;
- removal of internal slug and legacy aliases before the public v1 freeze;
- final visual review and explicit human stability approval.

No `stable` promotion is authorized.
