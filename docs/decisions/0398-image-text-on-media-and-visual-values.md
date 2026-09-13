# ADR 0398: Image with Text On-Media and Visual Values

Status: Accepted

Date: 2026-09-13

The owner selected A from the rendered alternatives: Image with Text Overlay
keeps white text and its existing black scrim in both themes. Its new on-media
color aliases neutral white; its scrim tint aliases the existing overlay color.
Replace this component's inverse-color reference, retaining the global inverse
role for unrelated consumers. Normal content, composed Button and forced colors
keep their own semantic treatment.

Fifteen public roles expose that palette plus current content measure, media
ratio, preferred overlay minimum height bounds/share, split-column measure,
eyebrow tracking, content gap, responsive vertical/horizontal padding shares and
solid scrim endpoint. Keep shared spacing inputs, opacity, typography and existing
container behavior. These bounds control the preferred minimum height, not a cap
that clips taller content. There are no new source units or responsive modes.

Contracts, registry and Studio feed Exhibit; generated Web/Shopify follow source.
Consumers with intentional Image-with-Text-only inverse overrides should move
those to the new on-media role when adopting the CSS/tokens together. Copy-and-own
updates are explicit. No blanket photography contrast or target certification.
