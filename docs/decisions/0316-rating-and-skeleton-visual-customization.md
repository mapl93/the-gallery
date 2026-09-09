# 0316. Rating And Skeleton Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with canonical Rating and Loading Skeleton, preserving ADRs
0235 and 0111. Rating exposes count gap (0.25rem), star gap (0.125rem), and large
star size (1.5rem), plus shared Body count weight. Both size choices, typography,
and colors are editable through ten public roles. Half-fill clipping, fixed
five-star anatomy, glyphs and left-to-right order remain implementation mechanics.
Required target-normalized value and localized label, optional count, and passive
semantics remain unchanged; the deprecated Star Rating record gains no API.

Skeleton exposes Text/Title height (1em/1.5em), width (80%/60%), Button width
(140px), and requested cycle duration (1500ms). Reuse linear easing and the existing
Button height, color and radius roles for thirteen public controls. Keep Default
dimensions, Circle diameter, external spacing and loading lifecycle target-owned.
Gradient stops, travel, background size, square media and three cycles remain
coherent rendering mechanics. Relative units are preserved, not flattened to px.

Preserve the accepted maximum 4.5-second finite animation: Web clamps each requested
cycle duration to 0–1500ms and repeats three times. Reduced motion and forced colors
still stop it immediately. This is the existing Skeleton contract, not a global
performance or motion ceiling. WCAG 2.2.2 describes when automatic motion over five
seconds alongside other content needs pause/stop/hide; it does not prescribe a
universal 4.5-second animation duration. Longer target-specific loading behavior
remains outside this decorative component and this checkpoint.

Studio shows shape-specific dimension controls and the active Rating size control.
Changing Skeleton shape or customization remounts its decorative preview once so
an already-finished animation can be inspected. The preview adds no timers,
automatic replay, public lifecycle properties, or neutral JavaScript runtime.

## Acceptance and adoption

Verify default geometry across viewport/theme matrices, relative units and all
new controls, Rating shape distinctions and passive naming, and actual finite
animation timing and preference overrides. Exercise installed CSS consumers and
review compositions. Keep human maturity and untested engines explicit.

Generate Web and Shopify from source; existing consumer copies need explicit
adoption. No hosted theme upload, source-format change, new target or Figma work.
Both contracts remain pilot.

Source: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
