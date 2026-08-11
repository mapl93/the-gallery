# Refinement Batch 161 — Technique Explainer Decision Reconciliation

Date: 2026-08-11

Component: R3 `technique-explainer`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 57 confirms one passive, target-owned, meaningful ordered
explanation. Each valid step has required `name` and `description`; optional
`details` and `media` are bounded target composition and do not define a
universal ceramics process schema. Safety warnings and precautions use
separately reviewed rich content or canonical Alert, never arbitrary untyped
details.

R3 owns no current/completed state, navigation, progress, workflow, focus
model, persistence, service or factual/editorial authority. Non-linear or live
workflow experiences require a separate canonical contract matching their real
semantics.

## Implementation Result

- Contract and Studio metadata advance to `0.3.0` without adding target-specific
  detail controls.
- `TechniqueExplainerArtworkStep` accepts optional `ReactNode` details while
  preserving required string name/description and optional media.
- The fixture demonstrates one ordinary working-note paragraph; two peers omit
  details with no empty wrappers.
- Details render inside the owning `li`, after the complete description and
  before supporting media, with automatic text direction.
- Canonical R3 CSS owns only wrapper rhythm, typography, containment and
  unbroken wrapping; inner target semantics remain target-owned.
- Exhibit and Studio retain one renderer, fixture and implementation.
- Registry, MDX, ADR 0203, dossier, report and open-question boundaries now
  reflect decision 57.

## Evidence Result

Batch 161 contains:

- four paired natural viewports for Exhibit and Studio;
- exact normalized `620px` parity: DOM `6d3dfcf6`, styles `6c53267e`, sequence
  `588px`, overflow `0`;
- native conditional section/div and direct `ol > li` verification;
- one present and two omitted details slots in the same fixture;
- missing-title, missing-steps and one text/details-only step cases;
- `200/320/430/680px` intrinsic containers;
- mixed RTL and repeated unbroken details at `200px`, effective 200% text and
  user spacing, all with overflow `0`;
- light/dark AA contrast, forced-color divider, reduced motion and zero false
  interaction/state/focus/live behavior;
- zero console warnings/errors and page errors.

The first pass correctly exposed a stale generated Web projection that lacked
the new details rule. After canonical Web/Shopify projections were rebuilt, a
focused regression probe and the final complete pass both succeeded. The final
captures and concise result live under
`output/playwright/refinement-batch-161/`.

## Performance And Targets

- R3 CSS: `2,889 B` raw / `771 B` gzip at level 9;
- Ceramics CSS: `34,028 B` raw / `4,858 B` gzip against `5,427 B`, leaving
  `569 B`;
- R3 neutral runtime/listeners/observers/timers/requests: zero;
- Webflow and Shopify Ceramics CSS: source-identical;
- Shopify native R3 remains planned.

The browser used one headless `gallery-refinement` session and one tab. It was
closed explicitly. The pre-existing server on `127.0.0.1:4173` was reused and
preserved; no managed server remained. `npm run evidence:assert-clean` passed,
and `site/dist` is unchanged.

## Remaining Gates

- first production target proof for records, localization, revision,
  applicability, factual/editorial review and rights;
- first rich-details consumer and safety-composition proof;
- production media policy and evidence;
- first Shopify consumer/editor mapping;
- final visual review or R3-specific design evidence;
- explicit human stability review.

No `stable` promotion is authorized.
