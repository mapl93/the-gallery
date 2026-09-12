# Firing Schedule visual-controls checkpoint

Date: 2026-09-12

Decision: ADR 0359. Eighteen additional source roles; 39 public values.

Fresh CLI consumer installs Firing Schedule with canonical Data Table. Source,
contract, registry, Studio and shared Exhibit reference expose spacing, chart
and table minimum measures, legend geometry, borders, focus and series controls.

## Local evidence

- 536 element comparisons at 320/600/900/1200 in light/dark preserve geometry
  within 0.02 CSS px, fonts, colors, padding, borders, strokes, dashes, opacity
  and the fixture's path data.
- Custom outer padding 30px, header inset 8px, chart gap 12px, legend gaps
  6/18px, item gap 8px, legend width 50px, shared series/legend stroke 4px,
  grid 2px, chart/header borders 3/2px and planned dash 12/6px pass.
  A test-only native circle confirms CSS radius 7px overrides its 4-unit
  attribute. This is a geometry probe, not a real single-sample renderer test.
- Chart/table minima 850/900px scroll internally while the root fits 320px.
  Focus is independently 4px with 6px offset. Forced-color actual-series stroke
  remains 5px to preserve the existing distinction.
- Studio edits rem minimum width and stroke; planned/actual selection changes
  the rendered series, Fahrenheit displays 68°F for the 20°C start, removal of
  observed samples falls back to planned, and reset restores both series.
  Exhibit lists the new controls. This does not retest all model arithmetic.
- Axis text from the 12px caption token has measured SVG scale factors 0.863867
  and 1.508301 at tested viewport widths 720/1200: nominal on-screen font sizes
  10.3664/18.0996px. Screenshots compare current behavior with a browser-only
  inverse-scale probe. No production typography change or accessibility failure
  is asserted; the owner's choice is pending.
- Custom and scaling screenshots inspected. Evidence is ignored under
  `output/playwright/firing-values/`. Temporary public fixture removed; one
  browser/server closed, resource gate clean and no remaining test processes.

Source/Web/Shopify builds and adapter validation, docs/contracts/Studio/CLI,
source catalogue and structural certification/refinement/performance inventories
pass. Catalogue: 1,191 paths, 9,528 compiler comparisons. Maturity unchanged:
5 stable, 173 pilot, 4 deprecated. Existing Shopify advisory performance overages
remain; generated CSS is not hosted Shopify certification or deployment.

No new runtime, Figma, source modes, installations, site/dist or stable promotion.
Production records, complete accessible chart/table review and Shopify editor
mapping remain outside this visual checkpoint. Consumers adopt CSS/tokens
explicitly; the pending internal slug migration remains governed by ADR 0271.
