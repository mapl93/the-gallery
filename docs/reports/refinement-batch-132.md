# Refinement Batch 132: Collection Promo Owner-Decision Reconciliation

Date: 2026-07-20

Component: `E6` / `collection-promo`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected E6-A is now reconciled across the permanent decision record,
contract, registry, Studio metadata, component documentation, dossier, audit and
global progress matrix. ADR 0248 bounds neutral v1 to first-party editorial
content, one optional complete explicit Link CTA, target-owned placement and
unchanged product pagination/count/filter truth.

The existing implementation and batch 127 evidence already match that decision,
so no DOM, CSS, renderer, runtime or browser-evidence regeneration was required.
Final editorial artwork, E6-specific Figma evidence, explicit Shopify
collection-grid block/record integration and human stability review remain
truthful gates. No `stable` promotion is claimed.

## Validation

- component contracts: 183 valid;
- Studio metadata: 183 definitions;
- docs/registry/source CSS validation: pass;
- static previews and Exhibit/Studio structural parity: pass;
- refinement decisions: 67 owner decisions covered;
- refinement matrix: E6 enters the human-review queue;
- Web and Shopify adapters: valid at their documented maturity;
- Collection budget: `2,366 / 2,560 B` gzip, `194 B` headroom;
- owned evidence resources: clean; and
- `site/dist`: not rebuilt.

## Preserved Browser Evidence

The structured `failures: []` result, natural viewport captures, direct host
probes, interaction, content resilience, contrast, forced-colors, reduced-motion
and Exhibit/Studio parity evidence remain in
`output/playwright/refinement-batch-127/`.
