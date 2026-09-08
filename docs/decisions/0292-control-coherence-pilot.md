# 0292. Canonical Catalogue and Control Coherence Pilot

Status: Accepted; owner reviewed the overall pilot with a spacing follow-up

Date: 2026-09-08

## Context

The owner requested an audit before changes, then authorized a remote checkpoint
and implementation of the first bounded stages. Input and Button must share
visual density when placed side by side, including icons and loading. The
repository remains canonical. Figma is an editable target; Shopify brand controls
should be available in the editor. Those integrations follow this local pilot.

## Decision

- Keep the existing source layers, source format, modes and public CSS names.
- Read the docs token catalogue from `tokens/source/`, with explicit theme and
  viewport selection, alias definitions, resolved values and source provenance.
  Foundations must distinguish source role values from actual CSS behavior.
- Preserve Input's existing 46 px default height. Align Button to it with the
  existing dimension.46 primitive, 10 px vertical padding and a 1.5 line-height
  at its existing 16 px default font. Preserve horizontal responsiveness, icon
  sizes, and small/large Button options. Permit growth for wrapped content.
- Give Input's five existing public layout aliases explicit component source
  decisions. Do not export every private CSS property or add a shared control
  abstraction until other components demonstrate a need.
- Apply ADR 0274 to Input and its Textarea composition: validation variant and
  focus state remain separate axes. Retain combined CSS selectors as evidence.
- Improve Danger Button text contrast using existing red.600/red.700 backgrounds
  and white text. Keep legacy migration parity for those same values.
- Mix accent and feedback text utilities with primary text, following existing
  component treatments. Check actual primary-surface combinations in both themes;
  custom backgrounds and future brand overrides require their own validation.
- Provide a site-owned composition pilot using canonical web control markup.
  This page is not a new component, contract, platform adapter or size API.

## Checkpoints and boundaries

1. Remote rollback baseline: `431fd1b2f7adad75940214f9abe1f725c7274f56`
   on `codex/v1-component-refinement`.
2. Structural gates: token graph, eight-matrix legacy parity, public CSS mappings,
   contracts, Studio metadata and generated web/Shopify adapters.
3. Browser evidence: Light/Dark, all four viewport ranges, text/icons/loading,
   keyboard focus, validation variants, long content and reduced motion.
4. Owner visual review: alignment, perceived density and Danger treatment.
   Existing component maturity is not newly certified by automated checks.
5. Later: bounded Shopify editor controls and a Figma Professional pilot in
   “The Gallery Design System”, after the control baseline is accepted. Verify
   current platform capabilities before implementing either bridge.

No Figma or Shopify remote changes, publication, deployment, migration of the
remaining target pipelines or rebuilding tracked site/dist are part of this
implementation. Copy-and-own consumers need a reviewed update; copies do not
receive these changes automatically.

## Owner review follow-up — 2026-09-08

The owner approved the overall treatment and requested more separation between
Input's label, field and supporting message, suggesting 2–4 px. Canonical Input
already uses a 4 px flex gap. The pilot's `display: contents` composition lost
that gap on desktop and used 8 px on mobile. The site-owned grid now preserves
4 px in both layouts, without changing Input tokens or its 46 px control height.

The Foundations route is a temporary review fixture for the shared control
rule. Once representative commercial compositions cover the same cases, retire
this route and its links while retaining the recorded decision and evidence.
This review does not promote any additional component to stable.
