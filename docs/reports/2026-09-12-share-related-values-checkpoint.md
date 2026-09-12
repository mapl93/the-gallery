# Share Actions / Related Articles layout values checkpoint

Date: 2026-09-12. Baseline: `27f1579`. Decision: ADR 0379.

Six new roles; public inventories 2/14. Forty cases cover Share inline/stacked,
Related one/three cards, five viewports and two themes: 640 unchanged element
geometry/type/color/spacing/border/radius comparisons. Public group gap doubles
without changing child Button geometry; native Space activates only a local
fixture listener. No actual Share, clipboard, email or provider action is invoked.

An 800px Related parent with 350px track minimum yields two columns; a 280px
parent falls to one without overflow. Independent grid gap, section padding,
border, narrow RTL and child composition pass. Studio controls, stacked mode,
required-title omission/reset and both Exhibit catalogues pass. RTL screenshot
inspected; no live target or provider certification is claimed.

Ignored `output/playwright/share-related-values/` holds fresh CLI provenance,
before CSS, fixture, scripts, results and screenshot. Browser/server cleanup and
process scan are clean; owned public fixture removed. Docs, source/catalogue
and both generated adapter validations pass; nothing was deployed or promoted.
