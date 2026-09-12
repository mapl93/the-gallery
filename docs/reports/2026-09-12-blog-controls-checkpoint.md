# Blog Studio control reachability checkpoint

Date: 2026-09-12. Baseline: `c25c150`. ADR 0387.

Eight Blog pages now expose the independent roles formerly hidden behind
first-token swatches. Spacing and typography groups previously configured as
color swatches use matching single-value editors. Labels distinguish Author
Card name/bio/role typography and identify shared spacing bases explicitly.

Five binding regression tests pass, including the former Blog multi-color and
non-color swatch defects. The validator scopes its capability rule through the
existing renderer registry; it does not prohibit Button's state-aware controls.

## Browser evidence

`output/playwright/blog-controls/` contains the previous metadata, harness,
results and inspected Author Card inspector screenshot.

- Eight Studio pages change a formerly inaccessible color role to #663399 and
  reset customization. Corresponding Exhibit reference labels are present.
- Article Hero uses Text only to test normal metadata color; its fixed media
  palette is unchanged. Filter Bar uses Multiple and an unselected option's
  hover border. Blog Sidebar tests the topic link's hover surface.
- Article Body decorative quote border, Table of Contents inactive link,
  Article Card excerpt, Author Card role and Comments date respond to edits.
- Article Body quote padding responds to the large spacing base (40px), Table
  of Contents list gap to extra-small spacing (20px), and Author Card name size
  and padding to their respective shared bases (24px and 40px).
- Color inputs dispatch their native input event; this checks bindings, not the
  operating system's picker dialog. Numeric edits use actual textboxes and Tab.

Initial harness attempts used the wrong variant label and clicked a visually
hidden radio instead of its visible label. The corrected harness passes without
component changes. Every phase, including failures, closed owned resources.
Final resource gate is clean. No deployment, target rebuild, site/dist output,
source token change or maturity promotion. Other renderer families remain in
separate checkpoints; this is not a site-wide accessibility certification.
