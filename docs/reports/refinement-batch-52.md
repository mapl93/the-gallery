# Refinement Batch 52: Photo Reviews Gallery

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 52 refines V6 Photo Reviews as a passive native collection of
target-supplied review images. Exhibit and Studio share the same list renderer
and fixture. A target may add a real link or button inside an item, but Photo
Reviews does not infer provider, moderation, download or enlarged-media
behavior from the square visual surface.

## Safe Refinement

- The contract advances to `0.3.0` without promotion from `pilot`.
- Native list/list-item semantics replace authored collection roles; optional
  action semantics move to a separate nested native surface.
- The direct-image compatibility selector, passive overlay and passive motion
  are removed. Only target actions receive hover, focus, disabled and
  reduced-motion treatment.
- The action focus treatment now uses a two-tone semantic perimeter so it does
  not disappear over dark or light photo edges.
- Public API stays limited to an optional label and target-owned items. Image
  delivery, fallback, state and overlay lifecycle remain target-owned.
- Neutral Web, Shopify and Webflow CSS were regenerated; no provider Liquid or
  target framework behavior was invented.

## Browser Evidence

- Exhibit and Studio root DOM is identical at Mobile, Tablet, Desktop and XL:
  `482b73ec0a6e9e9998962975eec838ce48f30f9f1b00eceed266f8b14faef36e`.
- The accessible tree is one named list with four informative images, zero
  controls and zero live regions.
- Target-only link/button probes pass native Enter, Space, disabled, hover and
  two-tone keyboard-focus behavior while leaving state ownership external.
- Empty, dark, reduced-motion, forced-colors and 96/220/640px RTL hosts at 200%
  type are captured. Fifteen final and eight before images preserve evidence.
- Reduced motion suppresses both transition and transform; forced colors
  removes the decorative overlay.

## Performance

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,787 B` | `3,788 B` | pass; `1 B` remaining |
| Shared neutral runtime | `10,492 B` | `8,192 B` | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,395 B` | `65,536 B` | current `1,859 B` program gap |

The four docs-only source JPEGs total `1,311,728 B`; they are fixture evidence,
not a production target budget.

## Human Review Queue

1. Approve density, crop, gap, radius, overlay/zoom, two-tone focus and the
   four-photo editorial composition.
2. Confirm passive v1 presentation or choose a target action/overlay model.
3. Resolve provider, moderation, caption, duplicate and production image
   delivery policy per target.
4. Create Photo Reviews-specific Figma artwork after browser approval.

## Validation

Contracts, Studio, docs, TypeScript, temporary site build outside `site/dist`,
Neutral Web, Shopify, Webflow copies, official Shopify artifact validation,
source/generated CSS identity, static previews, structural certification,
Exhibit/Studio parity, refinement progress, four viewports, special modes,
deterministic budgets and diff checks pass.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Program Position

After Batch 52, the program has 93 dossiers and 81 components flagged as ready
for human review. Review Form (V7, dependency order 154) is next.

See the detailed audit in
`docs/reports/photo-reviews-web-refinement-audit.md` and the decision in
`docs/decisions/0137-native-review-photo-list-and-target-owned-media-activation.md`.
