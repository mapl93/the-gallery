# Refinement Batch 146: U5 Order Detail Decision Reconciliation

Date: 2026-07-21

## Outcome

U5 Order Detail is now `human-review-ready` and remains `pilot`. Owner decision
U5-A is recorded in ADR 0262: canonical Steps renders only from a provider-
trusted finite ordered milestone model, and purchased records compose canonical
Cart Line Item in an explicitly read-only profile.

When authoritative processing, fulfilment, shipment, pickup, return, refund,
partial, split, or cancellation facts do not form a truthful linear sequence,
the target omits Steps and renders ordinary semantic status content. U5 never
normalizes those facts into a universal tracking enum. Purchased quantity stays
text; mutation, removal, save-for-later, add-to-cart, and other cart commands
remain prohibited.

The neutral renderer, fixture, DOM, CSS and runtime did not need changes. Batch
97 remains the applicable visual, semantic, interaction, responsive and parity
evidence.

## Target Boundary

- Target-controlled views may project one authorized authoritative order
  through canonical U5.
- Shopify v1 themes hand off to the hosted current-account Order status page and
  do not emit a theme-owned U5 clone or claim parity.
- Customer Account extensions and headless Customer Account API views are
  distinct target-controlled profiles with native disclosure, data, routes,
  authorization, provider truth and lifecycle ownership.
- Classic Liquid remains separately versioned compatibility rather than a v1
  default or automatic fallback.
- Shopify remains `planned` / `ready:false` pending live target proof.

## Evidence And Performance

The eighteen final images and machine-readable measurements, interactions and
parity results in `output/playwright/refinement-batch-97/` remain valid. They
cover paired Exhibit/Studio Mobile, Tablet, Desktop and XL; title and optional-
region omission; canonical ordered Steps; read-only purchased items; keyboard
and forced-color focus; light/dark; reduced motion; direct narrow containers;
localized RTL/unbroken content at 200px; and effective 200 percent reflow.

No server or browser was started for this decision-only reconciliation. U5
remains `1,414 B` raw / `535 B` gzip, SHA-256
`8beca73ee03aad41f43f0f9056c59a5c51c0fa8b62aed14854f152f59876a16b`,
and adds `0 B` runtime. Account CSS remains `2,853 / 3,072 B` gzip with `219 B`
headroom. Existing neutral CSS/runtime gaps remain documented and unchanged.

## Validation

- Registry, source tokens, all 183 contracts, all 183 Studio definitions, docs,
  Neutral Web adapter and Shopify adapter: pass.
- Static previews, structural component audit, refinement matrix, deterministic
  performance, TypeScript, external Vite build, diff checks, `site/dist`
  cleanliness and evidence-resource cleanup: pass.
- Shopify retains 90 global target-ready components and does not promote U5.
- Refinement matrix: `160 / 183` ready for human review and `23` remaining.

Human review must still approve title/meta hierarchy, spacing, Steps and line-
item density, narrow behavior, responsive threshold, fixture copy and U5-
specific visual references. Live protected-data/provider evidence also remains
target work. No `stable` promotion is claimed.
