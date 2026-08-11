# Refinement Batch 144: U3 Account Dashboard Decision Reconciliation

Date: 2026-07-21

## Outcome

U3 Account Dashboard is now `human-review-ready` and remains `pilot`. Owner
decision U3-A is recorded in ADR 0260: target-controlled account views project
authorized destinations through canonical U3, while platform-owned
non-replaceable screens use a documented native handoff without claiming visual
or functional parity.

The neutral implementation did not need visual, DOM, CSS, fixture, or runtime
changes. It already provides one labelled native section, one native destination
list, canonical Card/Link composition, optional canonical account actions,
container-driven tracks, strict omission, exact Exhibit/Studio parity, and zero
U3 runtime. Batch 95 remains the applicable visual and interaction evidence.

## Contract And Target Boundary

- Contract `0.3.0` preserves the accepted `greeting`, `headerActions`, and
  `cards` API and makes canonical projection versus native handoff explicit.
- Shopify v1 theme/current accounts use the controlled `shopify-account` sheet
  and hosted pages. A theme-owned U3 clone is intentionally omitted.
- Target-owned Customer Account full-page extensions or headless storefronts
  may project U3 semantics using target-native components, authorization, data,
  routes, privacy, and lifecycle behavior.
- Classic Liquid is separately versioned compatibility, not the v1 default or
  an automatic fallback.
- Shopify remains `planned` / `ready:false`; documentation of the correct
  boundary is not live target proof.

## Evidence

The sixteen final images plus machine-readable interactions, measurements and
parity results in `output/playwright/refinement-batch-95/` remain valid because
this batch changes no renderer, fixture, CSS, dependency, or runtime source.
They cover paired Exhibit/Studio Mobile, Tablet, Desktop and XL; light/dark;
keyboard and forced-color focus; reduced motion; a direct three-track container;
localized RTL/unbroken content at 200px; and effective 200 percent reflow.

No server or browser was started for this decision-only reconciliation. The
owned-resource gate remained clean.

## Performance

- U3 remains `2,772 B` raw / `754 B` gzip and adds `0 B` neutral runtime.
- Account CSS is `2,853 / 3,072 B` gzip, leaving `219 B` headroom.
- Neutral component CSS is `71,884 / 65,536 B` and shared runtime is
  `22,807 / 8,192 B`; both existing program gaps remain documented and U3 adds
  no delta in this batch.
- U3 slice SHA-256 remains
  `a821d5ea347a08a00c73cc4ae3abc1b7887ab464a0ac736bee54d009e5f6b34b`.

## Validation

- Registry, source tokens, all 183 contracts, all 183 Studio definitions, and
  docs validation: pass.
- Neutral Web and Shopify component adapters: pass; Shopify retains 90 global
  target-ready components and does not promote U3.
- Static preview, structural component audit, refinement matrix, deterministic
  performance, TypeScript, external Vite build, diff checks, `site/dist`
  cleanliness, and evidence-resource cleanup: pass.
- Refinement matrix: `158 / 183` ready for human review and `25` remaining.

Human review must still approve page inset, greeting hierarchy, Card density,
track thresholds, icon and copy rhythm, explicit-Link versus any future
whole-card composition, and U3-specific visual references. No `stable`
promotion is claimed.
