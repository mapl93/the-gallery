# 0283. Studio Preview Top Alignment

Status: Accepted

Date: 2026-08-25

## Context

Studio's two-column workspace aligned the Customize card to the top of its grid
cell but vertically centered the component inside a fixed `590px` preview
stage. A short component such as Divider therefore began hundreds of pixels
below Customize. The distance changed with preview height and made the two
surfaces look unrelated, especially when the inspector was short.

## Decision

- In the desktop two-column Studio workspace, preview content begins at the same
  vertical coordinate as the Customize card.
- The stage uses start alignment and no desktop block-start padding. It retains
  horizontal centering plus lateral and lower breathing room.
- Category fixtures follow the same top edge. Overlay, fixed-position, and
  viewport simulations may continue to own explicit internal positioning when
  that positioning is part of the fixture being demonstrated.
- The narrow single-column layout may retain responsive padding because the
  preview and inspector no longer share a horizontal alignment line.
- This is site-owned Studio composition. It does not alter a component's
  canonical CSS, renderer, fixture data, public contract, adapter output, or
  Exhibit presentation.

## Consequences

- Short and tall previews have a stable relationship to Customize rather than a
  height-dependent vertical offset.
- All component previews remain horizontally centered in the available stage.
- Component certification and stability remain independent human decisions.
