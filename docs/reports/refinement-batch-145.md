# Refinement Batch 145: U4 Order History Decision Reconciliation

Date: 2026-07-21

## Outcome

U4 Order History is now `human-review-ready` and remains `pilot`. Owner decision
U4-A is recorded in ADR 0261: U4 renders passive authoritative target-formatted
summaries and never defines a universal order or status schema.

Every row retains one descriptive canonical Link, one native `time`, one
readable target-authored canonical Badge summary, and one already-formatted
total. Financial and fulfilment values remain separate target facts. When one
Badge summary cannot preserve the distinctions users need, the target must use a
richer composition outside U4 rather than create undocumented U4 states.

The neutral renderer, fixture, DOM, CSS and runtime did not need changes. Batch
96 remains the applicable visual, semantic, interaction, responsive and parity
evidence.

## Target Boundary

- Target-controlled account views may project protected authoritative order
  data through canonical U4.
- Shopify v1 themes hand off to the hosted current-account Order index and do
  not emit a theme-owned U4 clone or claim parity.
- Customer Account full-page extensions and headless Customer Account API views
  are distinct target-controlled profiles with native data, routes,
  authorization, formatting and lifecycle ownership.
- Classic Liquid remains separately versioned compatibility rather than a v1
  default or automatic fallback.
- Shopify remains `planned` / `ready:false` pending live target proof.

## Evidence And Performance

The eighteen final images and machine-readable measurements, interactions and
parity results in `output/playwright/refinement-batch-96/` remain valid. They
cover paired Exhibit/Studio Mobile, Tablet, Desktop and XL; conditional
section/div semantics; native list/Link/time/Badge structure; keyboard and
forced-color focus; light/dark; reduced motion; direct two/four-area containers;
localized RTL/unbroken content at 200px; and effective 200 percent reflow.

No server or browser was started for this decision-only reconciliation. U4
remains `1,984 B` raw / `665 B` gzip, SHA-256
`4e048d82755306f12d74e9d7ad4548d33d61f7819849b1508e70bfca418db1c2`,
and adds `0 B` runtime. Account CSS remains `2,853 / 3,072 B` gzip with `219 B`
headroom. Existing neutral CSS/runtime gaps remain documented and unchanged.

## Validation

- Registry, source tokens, all 183 contracts, all 183 Studio definitions, docs,
  Neutral Web adapter and Shopify adapter: pass.
- Static previews, structural component audit, refinement matrix, deterministic
  performance, TypeScript, external Vite build, diff checks, `site/dist`
  cleanliness and evidence-resource cleanup: pass.
- Shopify retains 90 global target-ready components and does not promote U4.
- Refinement matrix: `159 / 183` ready for human review and `24` remaining.

Human review must still approve row density, separators, typography, alignment,
Badge presentation, responsive thresholds, localized copy, list-versus-table
product fit and U4-specific visual references. Live protected-data integration
and state-copy evidence also remain target work. No `stable` promotion is
claimed.
