# Reviews, Pages and Cart control reachability checkpoint

Date: 2026-09-12. Baseline: `fa344a8`. ADR 0389.

Eight pages now expose all roles in their former static color groups. The
validator additionally found Star Input's pattern-resolved color group, which
an explicit-name-only inventory missed. This confirms why validation operates
on resolved bindings rather than just the metadata's names array.

Seven regression tests pass. Browser evidence in
`output/playwright/mixed-controls/` verifies each separated color control writes
its intended public variable, all overrides reset, and Exhibit includes each
new role label. Representative actual consumers are also checked on all eight
pages: shipping message, Coming Soon image heading, Policy Page date, Review
Summary filled bar, Review date, highlight text, photo surface and Star Input
legend. All edited roles use #663399 for this binding test; defaults are kept.

This is comprehensive binding evidence for the split groups, not testing every
interaction/state combination or certifying accessibility. Coming Soon's
secondary text over media retains its existing 86% alpha mix; the corrected
harness tests the full-opacity heading instead of expecting opaque body text.
The existing theme-inverted media palette remains for a separate value audit.

The final Review inspector screenshot was inspected. Color input events test
browser bindings, not the native OS picker. Browser/server cleanup passed after
both the failed assertion and final successful run. No source token rebuild,
target output, upload, site/dist change or maturity promotion.
