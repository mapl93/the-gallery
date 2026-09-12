# 0373. Article Card Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293: 22 source roles and 44 public values expose Article Card's media
ratios, featured media share/content minimum, horizontal media bounds, independent
spacing, focus geometry, underline and editorial tracking. Existing shared type,
color and gap bases remain. Card surface and Badge anatomy keep their owners.

Featured's editable share reserves its content minimum before allocating media;
the default .6 share and 16rem minimum reproduce the prior 3fr/2fr layout. The
private container thresholds still choose layout; excerpt line counts remain
semantic properties and the complete excerpt remains in DOM. One native Link
retains its destination and keyboard behavior (ADR 0267).

A browser-only comparison found current H3 size/H4 leading is 28/32px at XL,
versus 28/34px using H3 leading. Both are legible in the measured fixture. Keep
the current compact pairing, expose existing type roles, and document the
optional alternative instead of treating a 2px preference as an owner blocker.
No change to variant-specific font families or weights.

Both target outputs update. No new runtime, source layer, responsive mode,
platform, deployment or maturity promotion. Copies require explicit adoption.

## Evidence

`docs/reports/2026-09-12-article-card-values-checkpoint.md`.
