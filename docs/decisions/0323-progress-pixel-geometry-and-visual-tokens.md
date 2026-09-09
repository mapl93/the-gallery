# 0323. Progress Pixel Geometry And Visual Tokens

Status: Accepted

Date: 2026-09-09

## Owner decision

The owner explicitly selected independent circle diameter and ring width through
pixel tokens, retaining the current appearance as the starting point. The previous
36-unit viewBox scaled its 4-unit stroke to 16/3 visible CSS pixels at 48px diameter.
Treating the old 4px declaration as a visible 4px token would change that baseline.

## Decision

Expose ten source roles: bar track height, label gap, label row/column gaps, preferred
label width, circle diameter/stroke width, indeterminate segment width, duration and
easing. Reuse the existing semibold value weight, for 21 public visual roles.
Preserve 6px track, 48px circle, 5.333333px visible stroke, 30% segment and 1500ms
CSS ease-in-out motion. That CSS curve differs from the existing semantic in-out
curve, so retain its coordinates explicitly rather than substitute a different feel.

Current Circle SVG has no scaling viewBox. Percentage center coordinates and CSS
radius derived from diameter minus stroke keep the ring contained. pathLength=100
normalizes percentage dash lengths for any radius. Hide the fill at zero to avoid
the round-capped zero-length dash appearing as a progress dot. Preserve range,
visible/accessibility text separation, invalid composition and Bar-only indeterminate.

The old radius approximation rendered at 21.2px. Fitting the same 48px diameter and
16/3px stroke uses 21.333333px instead: a deliberate 0.133333px radius correction,
not a new visual scale. Existing viewBox markup retains its radius and gets a
non-scaling stroke; copied consumers must adopt current SVG markup to gain exact
percentage normalization and radius fitting. CSS/tokens alone do not migrate markup.

The Bar track becomes an inline-size container. Indeterminate movement ends at
120cqw, preserving the previous endpoint of a 30% segment translated by 400% while
allowing segment width to change. Container units measure this actual track; they
do not create another breakpoint or token catalogue. Zero/negative SVG radius is
bounded by the geometry domain; consumers must still choose a stroke smaller than
the circle and readable compact text. No arbitrary editor or platform cap is added.

The MDX Bar example also uses its declared 65% value rather than a 70%-width utility.
Rendered progress is semantic data, not a design token. No new runtime or Shopify
Circle template is invented; existing Shopify compositions consume Bar and CSS.

## Acceptance and source basis

Compare default Bar geometry and Circle diameter/stroke/typography; record the small
radius correction separately. Test independent small/large Circle dimensions and
stroke, endpoints, non-100 ranges, accessible text, indeterminate/shape transitions,
custom segment width/trajectory, motion preferences, Studio reset and existing Bar
composition. Verify generated Web/Shopify and explicit copy-and-own adoption.

Primary specifications consulted 2026-09-09:
- [SVG circle geometry](https://www.w3.org/TR/SVG2/shapes.html#CircleElement).
- [SVG pathLength normalization](https://www.w3.org/TR/SVG2/paths.html#PathLengthAttribute).
- [CSS container-relative lengths](https://drafts.csswg.org/css-conditional-5/#container-lengths).

These define mechanics; browser evidence and human maturity approval remain separate.
