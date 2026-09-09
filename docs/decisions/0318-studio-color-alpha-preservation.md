# 0318. Studio Color Alpha Preservation

Status: Accepted

Date: 2026-09-09

## Context and decision

Studio's swatch editor converted RGBA to six-digit hex, discarded alpha, displayed
an opaque chip, and saved an opaque value on the first RGB edit. It also mapped
unsupported expressions to fabricated black: Empty State uses color-mix with
60% secondary text and transparent, which exercised that failure. Correct both
shared authoring paths before continuing component customization.

Keep a native sRGB color picker, display the real alpha over a checkerboard sample,
and expose a named percentage field beside each token name. RGB editing preserves
alpha; opacity editing preserves RGB, including fractional source channels. A zero
alpha remains zero until the owner edits opacity. Clamp the percentage to the CSS
alpha domain 0–100; this is a color validity constraint, not a design preference.
Do not round source alpha merely when opening or leaving an untouched editor.

Support hex 3/4/6/8 digits, absolute RGB/RGBA number/percentage forms and transparent.
Keep other CSS forms in the existing complete text editor with their real visual sample; do not partly parse
relative colors, color functions or unresolved aliases into fabricated black.
This is site-owned token tooling allowed by ADR 0282, not a new component API.
Reuse the existing bounded numeric field used by the structured shadow editor;
shadow behavior and source tokens remain unchanged. Reset and theme changes follow
the current canonical value and display its opacity. No adapters or `site/dist`
need regeneration for this site-only change.

Verify real RGB/alpha edits, transparent and theme values, reset, keyboard focus,
narrow inspector layout, unsupported text fallback and the shadow editor regression.
Components retain their existing maturity and target delivery status.

Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/rgb
