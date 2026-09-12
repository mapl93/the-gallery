# Technique Explainer and Care Instructions checkpoint

Date: 2026-09-12

Decision: ADR 0356. Fourteen roles; public profiles 28/27.

## Delivery

Technique publishes padding, three independent text gaps, divider and wide
text share. Care publishes icon size, intrinsic minimum, padding, header/item
rhythm and two border widths. Existing defaults and system relationships remain;
registry, Studio and Exhibit now expose the same full inventory. Both adapters
are regenerated. No component runtime, semantic property or data model changed.

## Browser evidence

- Fresh CLI consumer, canonical installed CSS order. 744 element comparisons
  at 320/600/900/1200 widths in both themes: Technique with/without media and
  detail; Care full/minimal plus do/dont treatments. Geometry within 0.02 CSS px;
  computed font, color, background, padding, gap, border, radius and margin agree.
- Technique custom probe: 912px step with 30px gap and 0.6 text share resolves
  to 529.1875px text in BOTH alternating positions. Padding 22.5px, divider 3px,
  ordinal/name/details gaps 6/8/12px.
- Care custom probe: padding 30px, border 3px, icon 60px, header gap 18px,
  header inset 12px, header rule 2px, item gap 6px and three occupied columns.
  Narrow RTL fits; forced colors retains the solid boundary.
- Studio Technique share/ordinal-gap and Care 3rem icon edits work; icon resolves
  to 48px. Blank title produces an unnamed div; reset restores the named section.
  Exhibit displays both new inventories.
- An initial harness assertion counted a zero-width collapsed auto-fit track
  as a visible Care column. The harness now counts occupied tracks; no source
  fix was needed. Both the failed and final phases closed their single browser
  and server, passed the resource gate and left no test processes.
- Custom/choice screenshots inspected; ignored evidence lives under
  `output/playwright/guidance-values/`. Temporary public fixture removed.

## Pending visual decision

Technique without media currently retains alternating half-columns in wide
containers. At the tested 912px step measure, text is 440px wide at x=144/616.
A browser-only full-width alternative measures 912px at x=144 for each step.
Screenshots: `option-current-half-columns.png` and `option-full-width.png`.
The owner has been asked which composition to retain. Source remains current;
this is an editorial choice, not an invented claim that one layout is invalid.

## Validation and limits

Source/Web/Shopify adapter builds, docs/contracts/Studio/CLI checks, source
catalogue and structural certification/refinement/performance inventories pass.
Catalogue: 1,154 paths and 9,232 compiler comparisons. Maturity remains 5 stable,
173 pilot, 4 deprecated. Shopify performance guidance has its existing advisory
overages; generated assets are not hosted certification.

No new JS, tools installed, Figma, site/dist, Shopify Liquid/upload, source
modes or stable promotion. Content safety/accuracy, localization and production
Shopify data/editor mappings remain target responsibilities. Existing colors
are preserved; no broad palette or screen-reader certification is claimed.
Copy-and-own consumers explicitly adopt updated tokens and component CSS.
