# Component Dossier: Spinner

Status: `human-review-ready`

Target reviewed: Neutral Web and consumer-owned loading region

Contract: `components/contracts/spinner.contract.json`

## Recommendation

Retain ADR 0063's decorative spinner graphic and optional visible Status
composition. Keep four sizes and target-owned loading lifecycle/`aria-busy`.
Long status text is now resilient, forced colors preserve head/track
differentiation, status text uses semantic body leading, and the Studio padding
override is removed so Exhibit and Studio exercise canonical overlay composition.

## Purpose And Limits

- Indicates unknown-duration work after an action or within a scoped region.
- The graphic is decorative; visible Status text or the busy region communicates
  purpose. Empty label intentionally yields only `aria-hidden="true"` artwork.
- It is not measurable Progress, Skeleton content, Button loading ownership,
  cancellation, timeout, error, or full-page blocking behavior.

## Current Gallery Result

- Registry `A23`, primitive, no dependencies; contract `0.3.0`, `pilot`.
- Four CSS diameters: `16/24/40/56px`; animation `0.75s` linear infinite.
- Default composition is `role="status"` with visible `Loading collection`; the
  graphic is hidden from assistive technology. Role Status supplies implicit
  polite live behavior.
- Empty label removes Status and leaves one decorative graphic.
- Reduced motion stops rotation (`animation:none`, `0s`).
- Forced colors now maps track to `GrayText` and head to `CanvasText`, retaining
  differentiation when reduced motion stops rotation.
- At `390px`, extreme status text now keeps overlay and document at `326px` and
  `390px`; status content wraps within the canonical `40px` padding.
- Exhibit and Studio use the same `40px` canonical overlay composition.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA `status`](https://www.w3.org/TR/wai-aria/#status) and [`aria-busy`](https://www.w3.org/TR/wai-aria/#aria-busy) | Status is a polite live region; busy belongs on content being updated and can defer announcements. | Keep one announcement owner and document the consumer region. |
| [Shopify Spinner](https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/spinner) | Indeterminate only, contextual label, scoped placement, no cancellation/timeout, warns about many simultaneous spinners. | Gallery's passive lifecycle boundary aligns; label ownership differs deliberately. |
| [Polaris Spinner](https://polaris-react.shopify.com/components/feedback-indicators/spinner) | Used for short/non-skeleton work, contextual accessibility label, two sizes; not entire-page loading. | Four Gallery sizes remain a visual choice; avoid expanding lifecycle API. |
| [Media Queries 5 reduced motion](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) | Users can request minimized non-essential motion. | Preserve static recognizable loading artwork when rotation stops. |

APG, Radix, and Open UI do not define a distinct Spinner widget beyond status,
busy-region, and decorative-image semantics.

## API, Tokens, And Runtime

- `size` and optional visible `label` remain the complete semantic API.
- Public colors, full radius, and body size/line-height are stable across targets.
- Diameters, `2px` stroke, `0.75s` speed, `12px` gap, and overlay padding are
  private composition; add body line-height rather than a new token.
- CSS-only: zero component JS, requests, observers, timers, or DOM updates.
  Targets remove the spinner when complete and own timeout/error/cancellation.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Forced colors erased head/track distinction. | resolved | CanvasText/GrayText remain distinct. |
| Long status text expanded the page. | resolved | Overlay is bounded and indivisible text wraps. |
| Studio changed canonical overlay padding. | resolved | Root override removed; stage owns placement only. |
| Body text lacked semantic line height. | resolved | Existing body line-height token is public and rendered. |
| Four sizes versus mature-system smaller sets. | visual input | Retain accepted sizes pending owner review. |

## Cross-Target Translation

Web/Shopify render decorative artwork plus consumer status/busy semantics.
Framework targets compose the same two concerns without announcing both. Figma
maps four sizes and loading/reduced-motion annotation. SwiftUI/Compose use native
indeterminate indicators and consumer-owned accessible loading text.

## Readiness Decision

Ready for human review; remains `pilot`. Semantics, empty label, four sizes,
reduced motion, forced colors, extreme content, canonical padding, contrast,
four viewports, byte-identical parity, and adapters pass. Human review must
approve diameter set, stroke, speed, spacing, and overlay padding before any
`stable` promotion.
