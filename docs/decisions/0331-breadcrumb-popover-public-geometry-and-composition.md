# 0331. Breadcrumb And Popover Public Geometry And Composition

Status: Accepted

Date: 2026-09-09

## Decision

Continue the owner-authorized public customization work from ADR 0293. Promote
six Breadcrumb and ten Popover visual values from private constants into source
component tokens; reuse medium/semibold weights. This supersedes ADR 0102 only
where it kept these visual values private. Preserve ADR 0100/0102 semantic and
runtime boundaries and ADR 0286's optional decorative arrow. Both remain pilot.

Breadcrumb exposes segment gap, wrapped-row gap and block-padding factors
0.25/0/0.5, underline offset 0.2em, focus width/offset 2px. Typography, color,
target size and motion stay shared. Underline thickness remains font-dependent
auto rather than inventing a new numeric default. URLs, separator content,
ordered hierarchy/current page and parent external layout remain composition.

Popover exposes arrow size 0.5rem, entrance displacement 0.25rem, block/inline
padding factors 0.75/1, minimum/maximum width 12.5rem/20rem, total viewport gutter
factor 2, shared surface/arrow border 1px, arrow inline-inset factor 1 and title-gap
factor 0.25. Factors use the existing responsive spacing base. Entrance movement
is distinct from trigger placement. Width remains intrinsic within limits; the
minimum should not exceed maximum, because native CSS minimum sizing wins.

The arrow's vertical position derives from its size and shared border. Its
fixed 45-degree rotation requires physical top/left strokes, even when logical
placement moves to the right in RTL. Physical right/bottom border removal fixes
the previous mismatch without adding a direction-dependent public value.

Studio exposes every declared visual role, including existing family, line
heights, easing and layer. Remove the fixed Studio width that masked source
bounds; the local preview adds its container bound and places the panel in flow
below its trigger to reserve the actual content height. Exhibit uses equivalent
local placement. Placement is target-owned, not a new component layout mode.

Studio's example fields compose InputArtwork, and Exhibit uses complete Input
anatomy. Their values remain local fixture state; Reset restores them. Remove
partial Input class imitation and conflicting field CSS. No Input dependency
is added to Popover's neutral contract, which permits arbitrary content.

## Acceptance

Compare default canonical geometry in eight matrices. Verify responsive factors,
independent width/padding/arrow/border/focus values, wrapped long breadcrumbs,
LTR/RTL arrow strokes, forced colors and reduced motion. Exercise Studio token
controls, local field editing/reset, natural Tab order, Escape/outside dismissal,
optional arrow and Exhibit. Regenerate and validate Web/Shopify outputs and a
copy-and-own CLI consumer. Do not infer complete collision handling, native
popover certification or Shopify remote delivery from these local checks.
