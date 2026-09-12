# 0355. Material And Glaze Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

ADR 0293 expands Material Library by ten scoped roles and Glaze Guide by thirteen.
Material publishes card minimum width, media height, padding, independent
subtitle/classification/description/property gaps, property offset, tracking and
border. Glaze publishes sample/detail minima, sample aspect ratio, independent
name/code/fact gaps, fact offset, detail padding, sample/detail borders and the
existing target-hook focus geometry. Borders/focus alias system dimensions;
spacing factors retain the shared element-gap basis and current defaults.
Profiles contain 32 and 41 public values. Registry now mirrors those inventories;
Studio exposes all shared roles and separate primary/secondary text controls.

R1/R2 remain passive under ADRs 0201/0202. Glaze's legacy interaction projection
hooks are retained for compatibility, documented in a separate Studio group,
and do not create focus/selection behavior in the neutral sample figures.
Production choice still requires an accepted complete widget composition.
Canonical Tag remains Material Library's dependency; Glaze gains none.

Sample appearance is target record content, not a system palette role. The MDX
fallback now renders the existing Studio sample illustrations instead of giving
a generic placeholder specific off-white/green appearance descriptions. This
illustration data does not become a public design token or a chemical/color
certification. Shared record/rendering policy otherwise remains unchanged.

Both generated target outputs follow source; copy-and-own adoption is explicit.
No modes, runtime, record schemas, Shopify Liquid or stability promotion.

## Evidence

`docs/reports/2026-09-12-reference-checkpoint.md` records 608 installed-consumer
comparisons, independent control edits, omission and semantic boundaries,
reserved focus projection, Studio/Exhibit and resource cleanup.
