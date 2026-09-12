# Reading / navigation / author visual values checkpoint

Date: 2026-09-12. Baseline: `e7adb86`. Decision: ADR 0377.

Three components, 21 roles, public inventories 3 / 27 / 25. Existing design
values and native behavior remain; reading percentage is explicitly not a token.

50 component/variant/theme/viewport cases (320/600/900/1200/1800, Light/Dark)
produce 400 unchanged geometry/type/color/spacing/border/radius comparisons.
A fresh CLI consumer verifies height/track overrides and controlled 75 percent
through the installed runtime. RTL transform origin, TOC border/nesting/inset,
native Enter-to-fragment navigation and short/narrow sticky fallback pass.
Author gaps respond independently and a 240px RTL embedding fits; screenshot
inspected. Studio verifies automatic reading to the end, decorative semantics,
height/reset, TOC and Author controls/reset; all three Exhibit catalogues pass.

Evidence in ignored `output/playwright/reading-navigation-values/` includes
installed provenance, old CSS, fixture, script, result JSON and screenshot.
Harness fixes used browser location instead of unavailable runner URL and
restored the reference viewport after testing TOC's narrow fallback. Final
phase passes, each phase cleans its resources, owned fixture removed and no
owned browser/server remains. No remote navigation, messages or deployments.

Source, catalogue, docs and both generated adapter gates pass. Hosted article
source, Theme Editor lifecycle, author privacy and explicit stable approval
remain target-specific work; these are not inferred from local structural QA.
