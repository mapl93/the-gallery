# 0337. Product Gallery Public Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with 22 Product Gallery values and 46 public roles. Expose
compact/wide layout gap factors, main media ratio, image/selection focus geometry,
AR/navigation inset factors, thumbnail gap/size/border and state opacities,
wide rail minimum width/maximum height, media Badge inset/padding/line height,
and dot size/gap. Existing source roles own colors, radii, shadow, type, motion
and composed Icon Button geometry. Thumbnail opacity roles alias the existing
0.6/0.8/1 primitives instead of duplicating numbers.

Keep the accepted 48rem container switch and current mobile thumbnail/dot groups.
Only layout differences change inside the container query. The wide rail width
is the greater of its minimum and the thumbnail size so larger authored thumbnails
do not get cut off by the old 80px column. Badge maximum width derives from its
inset; no independent conflicting maximum is introduced. These calculations are
private structural relationships between public values.

Use an inset selection focus ring inside thumbnail/dot bounds. The old 4px
outset ring was clipped by the thumbnail overflow rail. The new default inset
is 4px and preserves resting layout; image focus remains inset 4px. Resolved
:dir(rtl) handles activation, AR positioning and navigation in nested directions.
The 1px forced-color Badge border remains a structural system-color fallback.

Button owns explicit media activation presentation; Badge supplies typography;
Icon Button owns navigation and Lightbox owns image detail. Product Gallery
exposes the child values it uses directly without copying all of Lightbox's API.
No media-provider, loading, gesture, collection, auto-play or target coordinator
behavior changes. Mobile selector density remains a separate owner visual review
item; this rollout preserves the current implementation. Component remains pilot.

## Acceptance

Compare resting defaults at compact and wide container widths in both themes.
Verify larger thumbnails/rail bounds, selected/hover opacity, badge layout,
ratio/gaps, focus paint in overflowing selectors, nested direction and Studio
editing/reset. Check that selection, explicit activation and Lightbox composition
continue to work. Validate source, contracts, docs, Studio, CLI and adapters.

Compact dots wrap when their token-sized targets and gaps exceed available width;
the target size does not silently shrink and no collection-count cap is imposed.
