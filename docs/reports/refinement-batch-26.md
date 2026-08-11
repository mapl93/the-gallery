# Component Refinement Batch 26

Status: Loading Skeleton ready for human review

Date: 2026-07-14

Components: Loading Skeleton

## Outcome

Loading Skeleton's dossier, ADR, contract, canonical CSS, shared Exhibit/Studio
renderer and fixture, Studio metadata, registry, MDX fallback, generated
adapters, browser evidence and individual audit are reconciled. The component
remains `pilot`, adds no runtime and is ready for human stability review.

`site/dist` was not rebuilt or modified. No component was promoted to `stable`;
Button remains the only human-approved stable component.

## Research And Decision

- WAI-ARIA assigns busy lifecycle to the updated region and Status to actual
  advisory content; APG defines no Skeleton widget or keyboard pattern.
- WCAG moving-content guidance, reduced-motion media queries and forced-colors
  behavior support finite shimmer and static media alternatives.
- Open UI, Radix and Polaris show useful placeholder geometry patterns but no
  stable cross-target state/dimension API to import into neutral source.
- ADR 0111 preserves ADR 0064's six-value decorative contract, target ownership,
  semantic tokens and zero runtime while accepting the finite/media/container
  corrections.

## Browser Evidence Summary

- Exhibit and Studio produce exact shared renderer HTML: one hidden decorative
  shape, an external busy region and separate real Status text.
- Six variants have zero outside margin and documented geometry. A 140px Button
  preset contracts to 120px without wrapper or document overflow.
- Motion runs three 1.5-second linear cycles and is absent after 4.8 seconds.
  Reduced motion is a static semantic base; forced colors is a static opaque
  system-color shape.
- Both modes pass Mobile, Tablet, Desktop and XL. Long Arabic/RTL status, dark,
  200% zoom and special-media probes retain containment and semantic ownership.
- Twenty after and two before images are stored under
  `output/playwright/refinement-batch-26/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | `10,543 B` | `10.3 KiB` | pass (`4 B` headroom) |
| Shared neutral runtime | `10,171 B` | `8 KiB` | existing exception (`1,979 B` over); Skeleton delta `0 B` |
| Neutral Web components CSS | `64,799 B` | `64 KiB` | pass (`737 B` headroom) |

Relative to the Batch 26 baseline, all three measurements are unchanged. The
refinement pays for finite and media-safe behavior through CSS simplification
and consumes no additional family-budget headroom.

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; canonical source CSS/JS
  remains reconciled with generated copies. Known unrelated Shopify maturity
  warnings remain non-blocking backlog.
- Structural certification, Exhibit/Studio parity, static previews and global
  refinement audits pass across all 183 components.
- TypeScript, complete Vite build into `/tmp`, browser semantic/responsive/
  special-media probes, deterministic gzip, diff checks and explicit
  `site/dist` cleanliness pass.

## Remaining Human Review And Risks

1. Approve the repository candidate's neutral surfaces, shimmer strength/rate,
   three-cycle stop, geometry proportions, Button width, radii and fixture scale,
   or provide visual evidence.
2. Targets must match placeholder/final geometry, return busy state to false,
   coordinate one localized Status owner and own any deliberate longer-motion
   policy.
3. No inspectable owner visual reference is available beyond Studio trace IDs.
4. Primitives has only `4 B` gzip headroom; shared runtime retains its existing
   exception and complete Web CSS has `737 B` headroom.
5. Pin Input separately still needs the owner choice between one full-code
   native value owner and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 67 dossiers
and 63 components ready for human review. Only Button is human-approved. The
next dependency-safe component is Empty State (review order 68).
