# Before / After, Marquee and Collage visual-value checkpoint

Date: 2026-09-13. Baseline: `8639104`. ADR 0404.

42 public roles expose existing visual choices while retaining native interaction
and existing palettes. `output/playwright/before-marquee-collage-values/` contains
before CSS, harness, result and screenshots. Cloned Studio fixtures retain styles
and remove docs classes; they are not fresh CLI installs. Five widths and two
themes across three components yield 30 cases / 600 element comparisons, preserving
default geometry/type/borders. All narrow RTL roots report 288px client/scroll.

Actual Studio checks divider width, crop, independent label padding, native Arrow
value change (50 to 51 with synchronized progress), Marquee type/rule edits,
Pause/Resume and reduced motion (no copy, no animation), Collage caption em padding,
column overrides and capped feature span. Reset and Exhibit controls pass; forced
colors produces a Canvas caption background. Collage screenshot inspected.
The initial harness expected Pause after Tab had correctly triggered focus-pause;
the harness was adjusted to handle that existing behavior, with no runtime change.
Browser/server resources closed after both phases.

Catalogue: 1924 paths / 15392 comparisons. Web/Shopify generation, docs/contracts/
Studio and certification inventories validate. This closes this visual-value pass
for active Sections; it does not certify every state, arbitrary-brand contrast,
Shopify hosted behavior, provider integrations or consumer adoption. No stable
promotion, site/dist rebuild or hosted publication.
