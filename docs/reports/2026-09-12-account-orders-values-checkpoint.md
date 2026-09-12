# Account overview / order values checkpoint

Date: 2026-09-12. ADR 0370. Parent: `512a085`.

22 source roles; Dashboard/History/Detail public inventories 28/17/20.

## Evidence

- Fresh CLI dependency-closed installation and MDX fixtures: 890 element
  comparisons preserve geometry, typography, colors, padding, margins, borders
  and radii at 320/600/900/1200/1800px in Light/Dark.
- Independent Dashboard padding 24px, icon 48px, greeting/card weights 500/700,
  grid gap 32px. Narrow 300px RTL composition with explicit zero outer padding
  fits; screenshot inspected.
- History separator 3px, number/total weights 500/700 and vertical padding 8px
  apply. Native time/datetime remains and narrow RTL fits.
- Detail padding 30px and region gap 64px apply. Exactly one current Steps item
  remains, and read-only order lines have no quantity input or mutation button.
- Studio padding/border controls, native local navigation feedback, reset and
  shared Exhibit inventory pass. Feedback no longer reduces artwork width;
  the same Auth sign-in feedback regression check passes.
- First browser phase caught Dashboard shrinking to padding-only width after
  removing the site override. Diagnostic bounds showed a 32px root/zero-width
  grid caused by intrinsic size containment inside flex, not a Link defect.
  Canonical fill sizing and a vertical Account fixture composition fix it.
  The complete final phase passes including real pointer clicks, without force.
- Source/Web/Shopify builds and documentation/catalogue gates pass. One browser,
  tab and server per phase; all cleanup/resource gates/process scans pass;
  owned public fixture removed.

Ignored evidence: `output/playwright/account-orders/`, including installed
provenance, old CSS, comparison results, diagnostic and final screenshots.

## Limits

This is visual/customization and local composition evidence. No customer data,
order query, authentication, real destination navigation, hosted account page,
Shopify editor, screen-reader certification or deployment. Responsive area
layouts retain their earlier contracts; pilots are not promoted to stable.
