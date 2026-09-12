# Quick View / Sticky ATC checkpoint

Date: 2026-09-12. ADR 0367. Parent: `a5022ff`.

Eleven roles expand public profiles to 9/20 values, replacing empty inventories.

## Evidence

- Fresh CLI consumer with dependency closure. 376 element comparisons preserve
  geometry/font/color/padding/margins/borders/radii across two fixtures, four
  widths (320/600/900/1200px) and Light/Dark.
- Quick View 800px maximum, gallery gap 16px, details gap 8px and gallery share
  0.6 produce the expected 437.39px track from the available 745px minus gap.
  Narrow RTL fits. Existing Modal height/scroll boundaries remain active.
- Sticky padding 12/14px, border 3px, inner/info gaps 10/16px, image 64px and
  title weight 400 apply. Reduced motion computes zero transition duration;
  narrow RTL fits and the compact layout still omits its image.
- Studio rem measure and gap controls work. One modal is present; Escape closes
  and the trigger reopens it. Sticky padding controls apply, the Button associates
  with the existing form and submits the local preview. Hidden state is inert and
  aria-hidden. Reset and shared Exhibit inventory pass.
- Screenshots inspected. Every bounded phase closes the one browser/tab and
  managed server; resource gate and process scan pass. Owned public fixture removed.
- Generated adapters, source and docs validation pass.

Ignored evidence: `output/playwright/quick-sticky/` includes provenance,
comparison CSS, fixtures, harness/results and screenshots.

## Limits

Modal/Product Gallery rich-media lifecycle is not recertified here. Studio's
bounded modal can scroll at narrow measures; a screenshot shows its initial
viewport only. No real fixed-header/keyboard/safe-area collision, live purchase,
Shopify editor or complete screen-reader proof. Targets still own those gates.
No source mode, runtime, target deployment or stable promotion was added.
