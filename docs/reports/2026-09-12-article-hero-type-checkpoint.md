# Article Hero compact typography checkpoint

Date: 2026-09-12. Baseline: `b8131d2`. Decision: ADR 0375.

Owner option A is implemented in canonical Blog CSS. Existing H2 size/leading
apply below 40rem component width, with Display above. Family, weight, tracking,
content, semantics and the existing layout threshold are retained. Contract and
Studio expose both role pairs; the inventory grows from 40 to 42 without adding
source tokens or modes. Generated Web and Shopify assets follow source.

Browser evidence uses a fresh CLI consumer: 130 variant/theme/container/viewport
samples, including the 639/640px boundary at 900/1200/1800px viewports and 300px
embedding at 320px. All expected token metrics and root overflow checks pass.
Baseline family/weight/tracking and wide metrics match; independent 34/42px
compact and 58/68px wide overrides work. Narrow RTL screenshot inspected.
Studio compact editing, reset and Exhibit catalogue exposure pass.

Evidence: ignored `output/playwright/article-hero-type-final/` contains the
consumer, before CSS, fixture, script, result JSON, screenshot and runner logs.
Only one browser/tab/server was used; cleanup and process scan are clean and
the temporary public fixture was removed. Adapter and docs validators pass.

This is local browser and generated-target evidence, not hosted Shopify/editor
certification or stable promotion. Consumer copies must adopt the changed CSS
and relevant contract metadata. Continue Article Body and editorial coverage.
