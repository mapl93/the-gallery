# Cart Page / Cart Line Item checkpoint

Date: 2026-09-12. Decision: ADR 0364. Parent: `6604cf3`.

Twenty-four source roles expand profiles to 22/31 public values. All consumed
roles are exposed in Studio and Exhibit.

## Evidence

- Fresh CLI install of Cart Page/Line Item and their dependency closure.
- 464 element comparisons across two fixtures, four widths (320/600/900/1200px)
  and both themes preserve geometry, font, color, spacing, border and radius.
- Page custom header gap 15px, title basis 160px, summary width 360px,
  underline offset 4.8px and focus thickness 4px all apply. Explicit flow and
  short viewport degrade to static; wide default is sticky. Narrow RTL fits.
- Line gap/padding 10/15px, divider/image border 3/2px, media 120px,
  detail/quantity/action-top/action gap 6/8/12/12px, custom background and title
  weight 400 apply. Focus thickness 4px; compact media 48px, RTL and omitted
  media fit without horizontal overflow.
- Studio wide page measures 1788px with a token-authored 480px summary. Initial
  evidence caught the generic page cap limiting the preview to 688px; corrected
  before final evidence. Summary now fills the track.
- Studio line media controls, native Quantity Selector increment, reset and
  Exhibit inventory pass. Wide and narrow screenshots inspected.
- Web/Shopify adapters, docs and source validation pass. The source validator
  required the explicit spelling 0.2em instead of .2em, corrected before build.
- Each phase closes one headless browser and managed server. Resource gates and
  process scan show no remaining owned resources; temporary public fixture removed.

Ignored evidence: `output/playwright/cart-values/` contains before CSS, fixture,
CLI provenance, harness, result JSON and screenshots.

## Limits

Basic positioning checked; no new complete sticky-scroll, screen-reader, live
cart, payments, Shopify editor or mutation certification. Custom colors require
consumer contrast checks. Excessive media/track values can exceed available
space. Copy-and-own adoption is explicit; no deployment or stable promotion.
