# Refinement Batch 153

Date: 2026-08-10

Component: L3 Article Body / Prose

Result: `human-review-ready`; remains `pilot`

## Decision Closure

- Added accepted ADR 0269 for owner-selected L3-B.
- Moved sole generic `.prose` ownership to Foundations; L3 now consumes it via
  `.article-body.prose` and owns only Article Body BEM extensions.
- Replaced bespoke product embed with canonical Product Card and Price inside
  `.prose-excluded.article-body__commerce-island`.
- Added canonical body-baseline reset at the exclusion boundary so inherited
  Prose typography cannot leak into child contracts.
- Removed full-bleed and bespoke product-embed hooks; host layout owns actual
  breakout outside Prose.
- Kept static callouts passive and bounded old pull-quote/callout aliases to one
  pre-v1 migration cycle.

## Evidence

- Contract `0.3.0`, registry, MDX, Studio definition, shared renderer/fixture,
  Shopify snippet, dossier, audit, ADR, and progress matrix agree.
- Exact 620px parity: normalized DOM `6376077c`, selected styles `40aea370`.
- Embedded/direct canonical Product Card/Price leaf styles match `54f43a31`.
- Passive `DIV.article-body.prose`, native semantic hierarchy, correct quote
  attribution, passive callout, contextual media, pre/code, captioned/scoped
  table, and two named focusable overflow regions pass.
- Null/whitespace fail closed; drop cap uses logical wide float and ordinary
  narrow fallback.
- Mobile, Tablet, Desktop, and XL in both modes; localized RTL 200px; effective
  200%; text spacing; dark; forced colors; and reduced motion pass with zero
  root/document overflow, console issues, page errors, or L3 motion.
- Machine results and visual artifacts are in
  `output/playwright/refinement-batch-153/`.

## Performance

- L3 CSS: `4,056 B` raw / `1,154 B` gzip; neutral L3 runtime: `0 B`.
- Foundations: `4,963 / 5,427 B` gzip; Blog: `4,972 / 5,529 B` gzip.
- Program audit: 18 surfaces, 11 pass, seven documented gaps, zero undocumented
  gaps. No ceiling was raised.

## Resource Lifecycle

The final run used one headless `gallery-refinement` page, reused and preserved
the responsive external Gallery server, closed the owned browser, and passed
`evidence:assert-clean`. No additional tab, port, server, or normal Chrome was
left running.

## Remaining Human And Target Gates

- Human approval of measure, type/rhythm, drop cap, pull quote, callout,
  media/caption, code/table, Link treatment, commerce island, and four viewports.
- Remove legacy pull-quote/callout aliases before the public v1 contract freeze.
- Live Shopify content-trust, section/template/schema/editor, image, table/code,
  product-selection, locale, SEO, analytics, and empty/error evidence.
- L3-specific Figma artwork/parity remains future work; generic nodes are not
  approval.
- No `stable` or live-target promotion was made.
