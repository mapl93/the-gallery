# Prose / Article Body visual values checkpoint

Date: 2026-09-12. Baseline: `c032612`. Decision: ADR 0376.

42 source roles (24 foundational Prose, 18 Article Body) and 80 public controls.
No new registry component, layer or mode. Prose works independently; Article
Body composes it and canonical Product Card/Price with an explicit exclusion.

## Measured corrections

- Consecutive paragraph gap: 0px before, existing medium 16px after.
- Pull quote nested blockquote: generic 3px side border / 16px inset before,
  intended zero border/inset and inherited quote accent after.
- Callout paragraph: 0px before, existing compact 8px after.
- Attribution: 8px retained, now independently editable.
- Authored ul/ol: hidden markers before, native disc/decimal after.

These are source precedence/semantic-content repairs, not new typography or
layout direction. Five viewports (320/600/900/1200/1800), two themes and drop-cap
on/off produce 20 cases and 1300 unchanged font/radius element comparisons.
Corrected margins/quote values/list markers and no root overflow are asserted
separately rather than falsely claiming full default visual parity.

Independent custom width, flow, callout, attribution, quote borders, table width,
commerce width and media ratio pass. Prose type changes preserve Product Card
text; standalone Prose width responds. Native table keyboard scrolling, forced
focus, 200px RTL/drop-cap fallback, Studio editing/reset and Exhibit exposure
pass. Final RTL screenshot inspected. No screen-reader or live CMS/store tests.

Evidence in ignored `output/playwright/article-body-values/`: fresh installed
CLI consumer/provenance, before CSS, fixture, scripts, JSON and screenshot.
Early harness assertions were corrected to measure CSS min() geometry and await
native scroll completion; each failed phase also closed resources. Final phase
passes; owned fixture removed, browser/server/process checks clean.

Three composition-validator regressions and docs/adapter/source gates pass;
1477 source paths compare across eight matrices (11816 values). Shopify assets
are regenerated, not deployed or certified live. Copy adoption remains explicit.
