# Article Card visual values checkpoint

Date: 2026-09-12. ADR 0373. Parent: `417e2b3`.

22 source roles; 44 public values.

## Evidence

- Fresh CLI consumer. 800 element comparisons preserve geometry, fonts, colors,
  margins, padding, borders and radii over five layout variants, five viewport
  widths (320/600/900/1200/1800px) and Light/Dark.
- Featured .5 media share produces equal 599px tracks at 1198px; .9 share with
  300px content minimum in a 598px parent gives 298/300px without overflow.
- Horizontal 240px media maximum and ratio 1 produce square media. Link focus
  thickness 6px applies, one native destination remains and has no nested links
  or buttons. Narrow RTL fits; screenshot inspected.
- Studio Featured share, Horizontal ratio, excerpt-lines property, real local
  Link activation, customization reset and shared Exhibit inventory pass.
- Separate browser-only leading comparison (`output/playwright/article-leading/`)
  confirms current 28/32 versus alternative 28/34, weights unchanged at 600
  Featured and 400 Editorial. No overlapping title lines were observed. This
  optional visual choice is not presented as a defect or blocking decision.
- Source/Web/Shopify/docs/catalogue gates pass. Each evidence phase used one
  browser/tab/server and passed cleanup/resource/process gates. Public fixtures
  were removed after checking ownership markers.

Ignored final evidence: `output/playwright/article-card-values/` with installed
provenance, old CSS, fixtures, harness/results and screenshot.

## Limits

No hosted Shopify resource/editor integration, full Card hover/forced-colors
recertification, screen-reader certification or deployment. Alternative heading
metrics are not implemented. Complete visual values do not promote pilot status
or automatically update existing consumers.
