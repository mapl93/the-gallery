# ADR 0383: Hero Fixed On-Media Color

Status: Accepted

Date: 2026-09-12

The owner selected A from the Hero dark-media contrast comparison. Media-backed
non-split Hero uses `component.hero.onMedia`, aliased to `{color.gray.0}` and
exposed as `--color-hero-on-media`. This replaces its use of theme-relative
inverse text; the existing black scrim and opacity remain. The same text/scrim
pair now applies in Light and Dark, matching Article Hero's fixed on-media intent.

Split, text-only, absent-media content and canonical child controls retain their
own semantic colors. Forced colors and reduced motion remain system/native
boundaries. There is no new theme, source layer, adapter or maturity promotion.

Contract, registry, Studio and Exhibit expose the role. The deprecated Hero
Section forwarding record follows the changed reference without gaining an
independent token family or implementation. The global inverse text alias stays
available for other components. When adopting this change, consumers with an
intentional Hero-only inverse-text override should move that override to the new
on-media role; copy-and-own consumers do not update automatically.

The .6 black scrim and white text meet the measured sRGB contrast bound described
in the diagnostic. Arbitrary author colors, missing scrims and media composition
still require contrast review. See `docs/reports/2026-09-12-hero-palette-checkpoint.md`.
