# Refinement Batch 141: Gift Wrap Sellable Line And Authoritative Cart State

Date: 2026-07-21

Component: `K11` / `gift-wrap`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected K11-A is reconciled across ADRs 0183/0257, contract `0.3.0`,
MDX, dossier, audit, Shopify translation, target runtime evidence, and the
global progress matrix.

Gift Wrap remains one target-agnostic canonical native Checkbox with an
optional complete canonical Price. Its seven-property public API and zero
public K11 visual tokens are unchanged, and it adds `0 B` neutral runtime.
Targets map confirmed selection to exactly one explicit order-level sellable
service line at quantity one and reconcile from authoritative cart state.

Shopify now exposes a global opt-in and dedicated single-variant product picker,
renders the same target-native snippet in Cart Page and Cart Drawer, suppresses
service quantity editing, preserves the normal visible merchandise line and
Price/accounting lifecycle, localizes feedback, and conditionally loads one
target-only Ajax coordinator. The coordinator reads before/after mutation,
adds/removes by variant and line key, normalizes duplicates/quantity, aborts
superseded work, reconciles all rendered surfaces, and owns pending/error/focus
without leaking Shopify into the neutral contract.

The target remains `planned` and `ready:false` until a live merchant theme
proves section/Drawer refresh, eligibility, totals, inventory/tax/fulfillment,
discount/refund behavior, editor invocation, and production error paths.

## Evidence

The neutral renderer, fixture, CSS, Studio surface, and canonical composition
did not change, so Batch 92's 18 images and native click/Space/FormData/reset,
four-viewport, RTL/200px, effective-200%, contrast, focus, forced-colors,
reduced-motion, omission, and exact Exhibit/Studio parity evidence remain the
valid visual baseline.

Batch 141 adds an isolated Shopify runtime proof under
`output/playwright/refinement-batch-141/`. One headless Chromium context and
one page simulate Cart Page and Cart Drawer against an authoritative locale-aware
Ajax cart. The final run proves add, idempotent selection, removal, duplicate
and over-quantity normalization, pending busy/disabled state, cross-surface
reconciliation, visible error, authoritative rollback, and focus recovery with
zero console errors, page errors, or assertion failures.

Two preliminary harness attempts failed only in test mechanics and closed their
browsers in `finally`. The final runner also closes Chromium in `finally`, then
`evidence:cleanup` and `evidence:assert-clean` confirm no owned server, browser,
session, tab, or occupied port remains.

## Shopify And Validation

- official documentation search completed for Ajax cart and line-item identity;
- official Theme Check passes the shared snippet, Cart Page, Cart Drawer,
  layout, global settings, and both locales as artifact
  `k11-gift-wrap-dedicated-line-batch141`, revision 1;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready globally, 60 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets, valid;
- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- TypeScript: pass;
- external Vite build: 2,508 modules into
  `/tmp/the-gallery-site-k11-batch-141`; `site/dist` was not rebuilt;
- refinement matrix: `155 / 183` ready for human review and `28` remaining; and
- performance: 18 surfaces, 10 pass and 8 documented gaps with zero
  undocumented gaps.

K11 CSS remains `579 B` raw / `326 B` gzip with `0 B` neutral runtime. Cart
remains `3,057 / 3,072 B` gzip, leaving `15 B` headroom. The conditionally
loaded Shopify-only coordinator is `6,582 B` raw / `2,211 B` gzip. Existing
neutral CSS/runtime program gaps remain separate and are not expanded by K11.

Human visual review, live target lifecycle proof, and explicit stability review
remain pending. No `stable` promotion is claimed.
