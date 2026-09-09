# 0334. Carousel And Scroll Area Public Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Continue owner-authorized ADR 0293 with nine Carousel and four Scroll Area source
values. Preserve ADR 0104's native finite scrolling and target-owned collection
state. Carousel exposes 26 public roles, Scroll Area eight. Both remain pilot.

Carousel exposes slide gap, control inset, pagination gap and offset as factors
of the shared spacing base; independent dot diameter, active scale, shared
track/dot focus width and separate focus insets. Existing values are preserved.
Navigation exposes the five geometry/focus inputs it actually inherits from
Icon Button, without duplicating their source definitions. Slide dimensions,
artwork, collection density, snapping, placement mechanics and finite bounds
remain consumer or structural concerns. Previous/next placement leaves the
state inventory and remains documented anatomy. Icon direction uses resolved
:dir(rtl), including LTR subtrees inside RTL documents.

Studio replaces the first-dot-to-index effect with explicit inspector navigation.
Dots, native scrolling, status and reset share synchronized selection; Reset
returns the viewport immediately. Moving to a finite bound transfers focus from
a navigation button that becomes disabled to the native track, as already done
by Product Slider. There is no new neutral scroll runtime, observer or service.

Scroll Area exposes track tint (transparent alias), focus width/inset and the
existing 6px non-standard fallback thickness. Existing thumb, hover, focus and
radius roles remain compatible. Studio labels hover/radius/thickness as WebKit
fallback only. The standard path retains thin, and coarse input returns to auto
width. The fallback also returns to auto under coarse input, correcting the old
12px rule to match the already accepted platform-width policy. No keyword is
misrepresented as a dimension token; no pixel guarantee is made for native UI.
Forced colors retain system scrollbar styling. Content frame dimensions remain
outside this single-overflow-node primitive.

## Acceptance

Compare initial geometry in both themes and responsive widths. Verify token
changes through a CLI consumer and Studio/Exhibit, keyboard focus, actual slide
selection/reset, finite navigation, native direct scrolling, nested direction,
coarse and reduced-motion behavior. Verify scrollbar standard properties and
fallback declarations separately; do not claim fallback paint from pseudo-style
computed values. Validate source, catalogue, contracts, Studio, docs and adapters.

## Technical References

[CSS Scrollbars Level 1](https://www.w3.org/TR/css-scrollbars-1/) defines
scrollbar-width as auto/thin/none and lets the platform select actual geometry.
The [current editor's draft](https://drafts.csswg.org/css-scrollbars/)
clarifies that a non-auto standard color suppresses non-standard author styling.
This is a technical browser boundary, not an arbitrary Gallery design limit.
