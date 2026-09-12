# 0352. Exhibition Page Geometry And Optional Information

Status: Accepted for geometry; media palette awaiting owner choice

Date: 2026-09-12

## Decision

Twenty-three scoped source roles expand Exhibition Page to 56 public values
under ADR 0293. Hero bounds/container factors, title measure, label tracking,
shared inline cap, micro-rhythm, description paragraph gap, information share,
detail rule, intrinsic record minima and compact artist anatomy become public.
Zero initial paragraph/name-role gaps alias dimension.0; the detail border
aliases dimension.1. Other factors retain existing type/layout relationships.
Registry now records the contract inventory; scrim opacity uses the existing
opacity category rather than motion. No new schema category is introduced.

The initial hero minimum-height curve is preserved with four meaningful inputs:
24rem minimum, 42rem upper bound, 0.7 container-width scale and a 1.2 narrow
minimum cap. Remove the redundant 180cqi upper cap: the old preferred 70cqi term
is always below it, and the minimum term is bounded by 120cqi. This removes an
inactive constraint rather than exporting a fifth knob. These values determine
min-block-size; actual content can require a taller hero.

Information splits at the existing 44rem content-box threshold only when both
description and metadata exist. Presence is derived through direct-child :has
selectors, with no new semantic property or renderer modifier. When either
region is absent, the remaining region occupies one full column. Wide
description share starts at two thirds of the width remaining after the section
gap; metadata takes the rest. Work/artist grids retain bounded auto-fit minima,
natural target records and source order. No record dependency is added.

Transparent MDX placeholder regions are decorative instead of claiming to
depict specific works. Studio's outer page frame remains site-owned; it does not
override the canonical section padding. Both target CSS outputs are regenerated.
The component remains pilot and has no new runtime or source modes.

## Blocking visual decision

Exhibition's media hero currently uses a fixed black 60% scrim and theme-relative
inverse text. In dark theme inverse resolves to #171717, causing poor contrast.
The actual Studio fixture measurement on 2026-09-12 gives maximum contrast below
3:1 throughout the dates region, so this is an implementation defect, not a
preference. The light version's minimum measured contrast exceeds 5.74:1.

The owner was asked to choose between:

1. Keeping the photo darkened with white text in both themes (recommended;
   preserves the current light composition).
2. Lightening the photo in dark theme while retaining dark text, consistent
   with Collection Hero's theme-relative pairing.

Both options were captured as browser-only review samples. This checkpoint
does not choose or implement either palette, expose the hardcoded black as a
final token default, or claim the media hero is accessibility-complete. The
next palette change must use public tokens anchored to existing system colors,
preserve the no-media surface/text boundary and verify the chosen pairing.

## Acceptance

Preserve full media/no-media defaults at four widths in both themes, with
0.02 CSS px fractional geometry tolerance. Compare the height curve at thirteen
widths, exercise individual visual controls, optional information, intrinsic
records, native semantics, RTL, forced colors and Studio/Exhibit. Validate
source/catalogue, contracts, registry, docs, CLI and adapters. Close all owned
browser/server resources. Copy-and-own consumers adopt changes explicitly.
