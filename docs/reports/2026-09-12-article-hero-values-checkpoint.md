# Article Hero visual values checkpoint

Date: 2026-09-12. ADR 0374. Parent: `6603239`.

20 source roles; 40 public values.

## Evidence

- Fresh CLI consumer. 600 element comparisons preserve geometry, fonts, colors,
  padding, margins, borders/radii and normalized background RGBA over full,
  split, text and both no-media fallbacks at 320/600/900/1200/1800px in Light/Dark.
- Image minimum 600px, inset 60px, content maximum 500px and custom text/overlay
  colors apply. Forced-colors emulation restores CanvasText over Canvas.
- Split share .4 produces 480/720px tracks at 1200px. A 300px RTL parent fits
  geometrically; screenshot inspected. Current Display type remains large in
  a narrow parent at desktop viewport, so word-breaking can occur; passing
  overflow checks is not a claim of optimal editorial legibility.
- Text outer maximum 640px is independent from an image-content maximum 400px.
- Studio wide image height 35rem/560px, overlay opacity, absent-media normal
  colors, removal of overlay, customization reset and shared Exhibit pass.
- Source/Web/Shopify/docs/catalogue gates pass. One browser/tab/server and clean
  cleanup/resource/process gates. Owned public fixture removed.

Ignored evidence: `output/playwright/article-hero-values/` contains installed
provenance, old CSS, fixture/harness/results and screenshot.

## Limits

No all-image/crop contrast certification, Shopify article/editor integration,
screen-reader certification, deployment or maturity promotion. Default .68
scrim and white text preserve existing intent, but arbitrary new image/color
combinations need their own review. Viewport-scaled Display typography has not
been redefined for narrow desktop embeddings in this checkpoint.
