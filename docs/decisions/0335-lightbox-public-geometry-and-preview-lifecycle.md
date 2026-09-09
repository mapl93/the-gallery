# 0335. Lightbox Public Geometry And Preview Lifecycle

> The palette decision recorded as pending below is resolved by ADR 0336.

Status: Accepted

Date: 2026-09-09

## Decision

Continue owner-authorized ADR 0293 with fifteen Lightbox geometry values and 38
public roles. Preserve ADR 0238's image collection, optional loop, bounded zoom
and private pan/swipe state. Keep the media-canvas palette decision in
OPEN-QUESTIONS pending owner response; this is not complete color coverage.

Expose viewport padding, figure maximum width and viewport-height factor, image
viewport-height factor, figure gap, separate close/navigation/zoom inset factors,
zoom gap, caption width, fallback viewport/absolute bounds and fallback border.
Defaults preserve canonical geometry. Dynamic viewport units and safe-area
maximums remain CSS mechanics. The current Close Button/Icon Button tokens own
control geometry, border, radius, disabled opacity and focus. Typeface, regular
weight and body line height are explicitly applied at the Lightbox root so
scoped token overrides take effect without depending on a distant body rule.
Existing navigation placement stays in anatomy and leaves the state inventory.

Studio removes its extra image sizing and 340px cap so canonical bounds and
intrinsic image dimensions govern the rendered artwork. Fixture colors remain
artwork presentation. Keep LightboxArtwork mounted with open=false and supply
its trigger ref so the shared Modal effect can restore focus after closing.
Previously the parent unmounted that lifecycle on close. Resolved :dir(rtl)
handles nested direction; zoom-control focus uses the same existing on-scrim
foreground as navigation/Close. No new neutral runtime or global modal service
is introduced. Lightbox remains pilot; no remote Shopify certification.

## Acceptance

Compare canonical defaults across themes and widths. Verify customized image,
caption, control and fallback geometry through CLI and Studio. Check bounds,
reduced/forced media, nested direction, finite/loop navigation, zoom/reset and
focus return. Confirm Product Gallery uses the same component tokens. Separate
fixture changes from canonical default parity and pending color choices.
