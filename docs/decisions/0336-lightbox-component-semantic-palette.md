# 0336. Lightbox Component Semantic Palette

Status: Accepted

Date: 2026-09-09

## Decision

The owner selected Lightbox-specific tokens anchored to existing design-system
values. Complete ADR 0335 with five palette inputs, bringing Lightbox to 43
public roles. These names carry component meaning and live in the accepted
component layer. Semantic naming does not require an additional global semantic
layer between every component role and primitive. No shared media family is
introduced without another concrete consumer.

| Component role | Source value | Public alias |
| --- | --- | --- |
| scrimColor | `{color.overlay}` | `--color-lightbox-scrim` |
| scrimOpacity | `0.92` | `--opacity-lightbox-scrim` |
| foregroundColor | `{color.gray.0}` | `--color-lightbox-foreground` |
| controlSurfaceColor | `{color.gray.0}` | `--color-lightbox-control-surface` |
| controlTextColor | `{color.gray.900}` | `--color-lightbox-control-text` |

Keep source aliases and all existing initial colors. The shared overlay role
already expresses backdrop tint; the white/dark control values have no suitable
theme-independent global surface/text role. In particular, text.inverse becomes
gray.900 in dark mode, so it does not fit Lightbox's consistently dark backdrop.
The existing 92% density is a component decision; no existing opacity role has
that value and no single-use numeric primitive is necessary.

The backdrop combines tint alpha and density with the same color-mix policy as
Modal. Foreground serves caption, counter, fallback border/text and control focus.
Close, navigation and zoom use the control surface/foreground. Hover preserves
that foreground: the inherited Icon Button hover previously replaced it with
page text, which also changed to light text on light controls in dark mode.
Forced colors continues to use Canvas, CanvasText, ButtonFace and ButtonText.

Studio exposes all five inputs; Exhibit derives its reference from the same
metadata. Primitive edits propagate to their referring roles; component-role
edits affect only the explicitly consuming Lightbox implementation and its
compositions, including Product Gallery. CSS --_ variables remain private
bindings and runtime transforms remain private state. No consumer copies or
remote Shopify theme are silently updated. Lightbox remains pilot.

## Acceptance

Verify alias targets and generated references, initial colors in both themes,
local component overrides and upstream global primitive overrides, alpha times
density, hover/focus, forced colors, Studio edits/reset, Exhibit discovery and
Product Gallery inheritance. Validate source, contracts, docs and adapters.
This closes the palette-scope question in OPEN-QUESTIONS, not target certification.
