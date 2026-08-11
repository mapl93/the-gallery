# Divider Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/divider.contract.json` (`0.3.0`)

## Result

Divider now keeps its visual axis, accessible orientation, and forced-colors
render in agreement. The accepted `variant`, `orientation`, and `semantics` API
remains unchanged. No size, thickness, length, arbitrary spacing, or color
property was added.

The component is technically ready for human review. It is not promoted to
`stable`; the existing question about exclusive variants versus orthogonal
emphasis/spacing remains owner/architecture input.

## Source Reconciliation

- Structural vertical `hr` now receives `aria-orientation="vertical"` in the
  shared renderer. Horizontal keeps the implicit ARIA default.
- Decorative semantics continues to map to `aria-hidden="true"` and does not add
  a redundant orientation attribute.
- Forced colors maps the rule background to the `CanvasText` system color.
- Contract, Studio, MDX, neutral Web, and Shopify CSS copies are aligned.
- The four existing public tokens remain the complete customization surface.
  Literal `1px`/`2px` rule thickness stays private geometry.

## State And Geometry Evidence

The browser matrix measured all six variant/orientation combinations:

| Orientation | Variant | Rule | Active-axis margin |
| --- | --- | ---: | ---: |
| Horizontal | Default | `468 x 1px` | `32px 0` |
| Horizontal | Decorative | `468 x 2px` | `32px 0` |
| Horizontal | Section | `468 x 1px` | `96px 0` |
| Vertical | Default | `1 x 192px` | `0 32px` |
| Vertical | Decorative | `2 x 192px` | `0 32px` |
| Vertical | Section | `1 x 192px` | `0 96px` |

The bounded parent owns vertical length; no viewport breakpoint, observer, or
runtime measurement is introduced.

## Before And After

- Before: a structural vertical divider had visual
  `data-orientation="vertical"` but inherited the horizontal accessibility
  default.
- After: the same node exposes `aria-orientation="vertical"`, no
  `aria-hidden`, and remains a native `hr` separator.
- Before forced colors: the authored background resolved to white on the white
  system canvas and the rule disappeared.
- After forced colors: it resolves to black `CanvasText` while retaining the
  measured `1 x 192px` geometry.

Evidence:

- `output/playwright/refinement-batch-02/divider-vertical-structural-forced-colors-desktop.png`
- `output/playwright/refinement-batch-02/divider-vertical-structural-forced-colors-desktop-after.png`

## Exhibit And Studio Parity

Exhibit and Studio render identical default markup:

```html
<hr class="divider" aria-hidden="true">
```

The same renderer, fixture, classes, and attributes are used in both modes.
Eight canonical screenshots cover `390 x 844`, `768 x 1024`, `1280 x 800`, and
`1600 x 1000`. Decorative and Section desktop evidence is also stored under
`output/playwright/refinement-batch-02/`.

## Performance And Targets

- Component JS, listeners, observers, timers, assets, and network requests: zero.
- Primitives CSS: `9,335 B` gzip, below the `10.3 KiB` ceiling.
- Neutral component CSS: `56,336 B` gzip, below the `64 KiB` ceiling.
- Neutral Web and Shopify adapters contain the canonical rule. React, Angular,
  Figma, SwiftUI, and Compose remain planned target translations, not certified
  artifacts.

## Human Review Input

1. Recommended for v1: retain `default | decorative | section` as the existing
   exclusive variant set because it avoids an API migration without consumer
   evidence that combined decorative emphasis plus section spacing is required.
2. Alternative: split emphasis and spacing into orthogonal properties, allowing
   combinations but expanding the state matrix and every target mapping.
3. Approve the repository render as the Divider visual reference or provide a
   component-specific reference.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run audit:components`
- `npm run audit:refinement`
- `git diff --check`

`site/dist` was not rebuilt.
