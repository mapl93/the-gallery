# Firing Schedule axis-type checkpoint

Date: 2026-09-12

Decision: ADR 0360, owner option A. Contract 0.3.3; 40 public values.

## Verified locally

- Fresh CLI installation includes only the selected Firing Schedule axis module
  and runtime core alongside dependency-closed CSS and canonical tokens. Explicit
  subsequent adoption of upstream edits preserves its install provenance.
- Sixteen viewport/theme samples across 320/600/720/900/1200/1600 and return
  resizing retain the 12px axis size within 0.001px. All native fixture labels
  remain inside the SVG; path data is unchanged and overflow stays inside the
  component. Twenty animation-frame observations per sample verify settling.
- Live 16px typography and 0.75rem with a 20px root yield 16px/15px respectively.
  A 50rem author minimum, hidden/revealed chart and viewBox changes preserve the
  token size. Font/spacing measurements can expand the intrinsic chart minimum.
- Studio Fahrenheit conversion, typography editing and reset pass. All pairs
  of the rendered 16px localized axis labels preserve at least the configured
  4px separation within 0.1px tolerance; editing the new gap to 8px preserves
  that separation. This checks real Studio glyph bounds, not only token values.
- Repeated enhancement keeps one resize observer per plot. Three explicit
  destroy/reinitialize cycles and removal/reinsertion release/recreate it as
  expected. A shadow-root consumer receives a host gap change and disposes its
  observer. Scoped mutation observers share the same disposal path.
- Native chart naming and equivalent table remain without the runtime. Existing
  forced-color actual-series stroke remains 5px. Studio and Exhibit load.
- Screenshots inspected; ignored evidence lives in `output/playwright/firing-axes/`.
  The initial fitting implementation exposed adjacent-width oscillation in glyph
  measurement; final evidence adds a settling assertion and passes after the
  internal rounding guard. Temporary public fixture removed, browser/server
  closed, resource gate clean and no remaining test processes.

Source/Web/Shopify builds, adapter validators, TypeScript, docs/contracts/Studio,
CLI install plus 20 copy-protection scenarios, catalogue and structural
certification/refinement/performance inventories pass. Catalogue: 1,192 paths,
9,536 compiler comparisons. The performance inventory retains two existing
Shopify advisory overages and zero errors; it is not target certification.
Maturity remains 5 stable, 173 pilot, 4 deprecated.

## Boundaries

The tested browser is local Chromium. This does not certify Safari/Firefox,
arbitrary text transforms, every locale/font or full screen-reader behavior.
The existing uniformly scaled chart is the supported projection. No model
arithmetic, source format, mode, platform, Figma, installation, site/dist,
Shopify upload or stable promotion. Shopify runtime output is generated evidence,
not a delivered Liquid schedule or hosted editor certification. Native fallback
retains SVG-scaled text when enhancement is unavailable.
