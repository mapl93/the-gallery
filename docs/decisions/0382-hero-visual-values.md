# ADR 0382: Hero Visual Values

Status: Accepted

Date: 2026-09-12

Apply ADR 0293 to the canonical marketing Hero (G1), retaining ADR 0223's
layout, fullscreen, media and runtime contracts. Add 35 source roles, bringing
its public inventory to 58 values shared by contract, registry, Studio and
Exhibit. The deprecated Hero Section gains no implementation or token family.

Expose content measures, five sets of height bounds/container shares,
independent content/action/control insets and gaps, split media share, label
tracking, scrim tint, progress height/opacity and parallax media scale/travel.
Spacing factors keep shared responsive layout bases live; component-specific
rem bounds preserve existing measures without expanding the primitive scale.
Scrim tint aliases the shared overlay color. Compact H3 metrics and the shared
touch-target measure also enter the explicit public inventory.

Default geometry, typography and palette remain. Fullscreen viewport sizing,
stacking thresholds, native controls, current-slide state, autoplay interval,
looping, reduced motion and forced-color cues remain semantic/structural. The
runtime-owned private interval is not promoted to a competing visual token.
Parallax scale and travel are editable together; authored media must cover the
chosen travel and retain the reduced-motion fallback.

Both generated targets follow canonical sources. Evidence and the separate
pre-existing dark on-media contrast decision are in
`docs/reports/2026-09-12-hero-values-checkpoint.md`. No hosted upload or maturity
promotion. Existing consumer copies require explicit adoption.
