# Refinement Batch 147: U6 Address Book Decision Reconciliation

Date: 2026-07-21

## Outcome

U6 Address Book is now `human-review-ready` and remains `pilot`. Owner decision
U6-A is recorded in ADR 0263: Address Book remains an authoritative native
record list, while the target owns protected mutation and focus lifecycle.

Add and Edit use canonical actions. Delete requires explicit confirmation or an
equivalent guaranteed undo path. Set Default renders only when supported. A
record and its current default truth remain present and ordered until the target
confirms mutation success; pending, cancellation, failure, and undo availability
do not trigger optimistic removal or reorder.

The neutral renderer, fixture, DOM, CSS and runtime did not need changes. Batch
98 remains the applicable visual, semantic, interaction, responsive and parity
evidence. Its non-mutating site actions correctly demonstrate that U6 itself
does not claim target mutation success.

## Target Boundary

- Target-controlled views may project protected authoritative records through
  canonical U6 and own permissions, confirmation/undo, errors, reconciliation,
  announcements and deliberate focus restoration.
- Shopify v1 themes hand off to hosted Profile/Addresses and do not emit a
  theme-owned U6 clone or claim parity.
- Supplementary Customer Account extensions and headless Customer Account API
  views are distinct target-controlled profiles, including B2B availability and
  protected-data requirements.
- Classic Liquid remains separately versioned compatibility rather than a v1
  default or automatic fallback.
- Shopify remains `planned` / `ready:false` pending live mutation/focus proof.

## Evidence And Performance

The nineteen final images and machine-readable measurements, interactions and
parity results in `output/playwright/refinement-batch-98/` remain valid. They
cover paired Exhibit/Studio Mobile, Tablet, Desktop and XL; native list and
postal semantics; invalid/default/action omission; keyboard and forced-color
focus; light/dark; reduced motion; direct narrow containers; localized RTL/
unbroken content at 200px; and effective 200 percent reflow.

No server or browser was started for this decision-only reconciliation. U6
remains `1,726 B` raw / `661 B` gzip, SHA-256
`5e79f1306a74485eed9d3d826bf016a37601badab493e532466346dd2c92ca56`,
and adds `0 B` runtime. Account CSS remains `2,853 / 3,072 B` gzip with `219 B`
headroom. Existing neutral CSS/runtime gaps remain documented and unchanged.

## Validation

- Registry, source tokens, all 183 contracts, all 183 Studio definitions, docs,
  Neutral Web adapter and Shopify adapter: pass.
- Static previews, structural component audit, refinement matrix, deterministic
  performance, TypeScript, external Vite build, diff checks, `site/dist`
  cleanliness and evidence-resource cleanup: pass.
- Shopify retains 90 global target-ready components and does not promote U6.
- Refinement matrix: `161 / 183` ready for human review and `22` remaining.

Human review must still approve record surface/density, Badge placement, action
hierarchy, Add treatment, responsive track minimum, fixture copy and U6-specific
visual references. Live protected mutation, B2B and focus evidence also remain
target work. No `stable` promotion is claimed.
