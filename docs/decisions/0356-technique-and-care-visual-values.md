# 0356. Technique And Care Visual Values

Status: Accepted for visual controls; Technique text-only layout awaiting owner choice

Date: 2026-09-12

## Decision

Under ADR 0293, Technique Explainer gains six component roles and Care
Instructions gains eight. Technique exposes step padding, independent ordinal,
name and additional-detail gaps, divider thickness and the text share remaining
after the grid gap. The existing 30rem query and alternating source layout
remain. The initial 0.5 share preserves equal columns through one private track
expression reused on opposite sides; no duplicated public responsive catalogue.

Care exposes icon size, intrinsic item minimum, surface padding, header gap and
inset, item rhythm and independent surface/header border thickness. Borders
alias system dimensions. Padding factors retain their grid-gap basis;
text/content gaps retain the element-gap basis. These profiles have 28 and 27
public values, mirrored in registry and completely exposed through Studio and
shared Exhibit metadata. Optional visual helpers remain content/target-owned.

Both components keep their accepted passive semantics (ADRs 0203/0204), optional
content, variants and zero runtime. Studio's outer Care frame remains site-owned.
The existing wide text-only Technique step still occupies its alternating
half-column: this checkpoint does not select a new editorial direction.

## Owner choice still pending

When Technique omits media at desktop widths, should its text occupy the entire
step or retain the existing alternating half-column? Both are viable visual
choices; the blank half is not classified here as a proven accessibility or
architecture error. The accepted contract defines media as optional, but prior
wide evidence only covered steps with media. Browser-only samples document the
tradeoff, with no new behavior or public responsive property.

At a 912px step width, current text measures 440px and alternates left/right;
the alternative measures 912px and remains on the text-start side. The owner
was asked to decide after reviewing both. Source retains the current treatment.
The next change must preserve the source order and complete media-step behavior.

## Acceptance and adoption

See `docs/reports/2026-09-12-guidance-checkpoint.md`: 744 installed-consumer
comparisons, control probes, units, omission/reset and reference inventory.
Generated Web/Shopify CSS and tokens are regenerated, not deployed. Consumers
explicitly adopt both copies. Components remain pilot; target data/editor work
and Technique's pending visual choice are not declared complete.
