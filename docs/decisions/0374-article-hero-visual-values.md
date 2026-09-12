# 0374. Article Hero Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 with 20 source roles and 40 public values. Preserve current
compact/wide image heights, container-bounded insets, split proportions, content
gaps, category tracking and color mixes. Image-content maximum and text-layout
outer maximum become distinct named values because the latter includes padding
while the former does not; both retain their 45rem initial measures.

Media text aliases neutral white, overlay tint aliases the existing system
`color.overlay`, and opacity remains .68. These meaningful visual values now
have public controls, refining ADR 0194's earlier private-value boundary. The
visual-only overlay anatomy remains aria-hidden. Editing colors or opacity
requires evaluating real image/text combinations; arbitrary author values do
not inherit a contrast guarantee.

Fallback without selected media still removes inverse colors/overlay/empty
tracks. Forced colors keep Canvas/CanvasText; native header, contextual heading,
time metadata and zero runtime remain. Studio/Exhibit share the contract API.

Both target outputs regenerate. No new mode, source layer, runtime, platform,
deployment or maturity promotion. Copy adoption remains explicit.

## Evidence

`docs/reports/2026-09-12-article-hero-values-checkpoint.md`.
