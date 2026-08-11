# Spinner Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/spinner.contract.json` (`0.3.0`)

## Result

Spinner remains a CSS-only decorative loading graphic with four visual sizes and
an optional visible Status composition. Long copy, canonical padding, semantic
leading, reduced motion, and forced-colors differentiation are reconciled without
adding lifecycle or announcement properties.

## Semantics And Ownership

- With `label`, the renderer emits one `role="status"` wrapper, visible text,
  and one `.spinner[aria-hidden="true"]`. Status supplies implicit polite live
  behavior; no redundant explicit `aria-live` or `aria-busy` is emitted.
- Empty optional `label` removes the Status wrapper and leaves one decorative
  graphic. It does not fabricate an accessible name.
- The consumer-owned region being updated owns `aria-busy`, completion,
  timeout, cancellation, error, blocking behavior, and removal.
- Sizes are `16`, `24`, `40`, and `56px`; reduced-motion measurement uses static
  geometry and resolves animation to `none / 0s`.

## Responsive Content Before/After

At `390px`, the baseline unbroken status expanded the overlay to `657px` and the
document to `524px`. The comparable after fixture remains within a `326px`
overlay and `390px` document; its text has equal `246px` client/scroll width.
A stronger repeated fixture also stayed at `326px` with canonical `40px` padding.

Studio no longer replaces that padding with `24px`. Exhibit and Studio therefore
exercise the same root composition, while the docs stage owns only placement.

## Contrast, Motion, And Forced Colors

- The animated head versus composited track measures `11.69:1` in light and
  `9.27:1` in dark.
- Under forced colors plus reduced motion, `GrayText` track and `CanvasText` head
  remain distinct; the tested XL ring retained `56 x 56px` geometry.
- Status text uses body `16/24px` and wraps indivisible content.
- Diameter, `2px` stroke, `0.75s` speed, `12px` gap, and `40px` overlay padding
  remain private visual composition rather than public tokens.

## Exhibit, Studio, Runtime, And Targets

Exhibit and Studio initial root markup is byte-identical (`187` tested bytes).
Eight canonical screenshots cover four viewports in both modes, supplemented by
before/after, forced-colors, and reduced-motion evidence.

Component runtime is `0 B`: no JavaScript, listener, observer, timer, request, or
asset. Web/Shopify compose decorative artwork with consumer-owned status/busy
semantics. Framework targets preserve one announcement owner; SwiftUI/Compose
may use native indeterminate artwork; Figma maps the four reviewed sizes and a
reduced-motion annotation.

## Human Review Input

Approve the repository render or provide a Spinner-specific reference for the
four diameters, stroke, speed, gap, and overlay padding. The semantic/lifecycle
boundary is fixed by ADR 0063. No `stable` promotion is authorized.

Evidence lives under `output/playwright/refinement-batch-05/`; `site/dist` was
not rebuilt.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:tokens:web-components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- `npm run audit:refinement`
- `git diff --check`
