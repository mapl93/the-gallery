# Loading Skeleton Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Loading Skeleton is now a finite, decorative, container-safe shape primitive.
Its six accepted geometry choices, semantic surfaces and zero-runtime boundary
remain intact, while component-owned margins, narrow-container overflow,
infinite shimmer, frozen reduced-motion shine and transparent forced-color
output are removed. Consumers own dimensions, loading lifecycle, busy region,
localized Status text and replacement content.

This is a human-review candidate, not a stability promotion. Button remains the
only component with explicit human approval.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Predictable temporary geometry only; not progress, data client, timeout/error policy, suspense boundary or empty state. |
| Anatomy and composition | pass | One hidden decorative shape; target-owned busy region, optional real Status text and replacement content remain outside the primitive. |
| Variants, sizes and states | pass | Default, Text, Title, Image, Button and Circle; no public size, loading or line-count state; finite/static media modes documented. |
| Public API and ownership | pass | Exactly optional `variant`; no content slot, dimensions, events, focus or controlled/uncontrolled state. |
| Tokens and visual system | pass | Six existing semantic surface/radius/height references; gradient, geometry, cycles and fixture dimensions remain private. |
| Accessibility and motion | pass | Shape has `aria-hidden`, zero focusables and no role/name; target fixture demonstrates `aria-busy` plus actual Status text; shimmer ends at 4.5s. |
| Responsive/content resilience | pass | Four viewports in both modes, all variants, 120px container, long Arabic/RTL status, dark, forced colors, reduced motion and 200% zoom. |
| Runtime and assets | pass | No Skeleton selector or behavior in shared JS; no listener, observer, timer, request, layout read or asset. |
| Cross-target translation | pass | Neutral Web and generated Shopify CSS implemented; framework, Figma and native ownership boundaries documented. |
| Exhibit/Studio parity | pass | Shared renderer and fixture produce exact serialized inner HTML; MDX fallback mirrors the same semantic composition. |
| Human readiness | pass | Architecture, implementation, evidence and reports are reconciled; visual approval remains pending and maturity stays `pilot`. |

## Contract And Browser Evidence

- Contract `0.3.0` retains one `variant` property and records decorative root,
  target lifecycle, finite motion, media alternatives, container geometry and
  cross-target ownership.
- The default DOM has one `aria-hidden="true"` shape, no Skeleton role or name,
  zero focusables, an external named region with `aria-busy="true"`, and a
  separate Status containing `Loading content`.
- All six variants use `max-width: 100%`, zero bottom margin and existing radius
  tokens. Measured fixture geometry is Default `320x64`, Text `256x15`, Title
  `192x22.5`, Image `224x224`, Button `140x40` and Circle `64x64` pixels.
- The Button preset contracts to `120x40px` inside a `120px` wrapper; wrapper and
  document client/scroll widths remain equal. Long Arabic region and Status text
  at Mobile produce a `311px` shape inside a `311px` region with no page overflow.
- CSS reports `1.5s linear 3`; the Web Animation is running after reload with a
  computed `4500ms` end and is absent after 4.8 seconds. It becomes a static base
  rather than continuing indefinitely.
- Reduced motion reports no animation, no image and solid `rgb(245,245,245)`.
  Forced colors plus reduced motion reports no animation/image and an opaque
  browser-resolved `GrayText` system color.
- Dark mode resolves the gradient to semantic `rgb(38,38,38)` and
  `rgb(23,23,23)` surfaces. At 200% CSS zoom the document remains `785/785px`
  client/scroll width and the shape stays within its responsive wrapper.
- Exhibit and Studio serialize the exact same renderer markup. Browser console
  inspection ends with zero errors and zero warnings.
- Twenty after images and two before images are stored under
  `output/playwright/refinement-batch-26/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Empty decorative element plus variant class; target owns size, busy region, Status and replacement. | Implemented and browser-evidenced with finite CSS-only motion and zero runtime. |
| Shopify | Generated copied CSS embedded in target Liquid composition. | Implemented and validated; no dedicated root/schema/runtime required. |
| React / Angular | Conditional target rendering around one or more hidden decorative shapes. | Boundary documented; data, lifecycle and dimensions remain framework-owned. |
| Figma | Six shape choices with semantic surface/radius presentation controls and consumer-owned dimensions. | Studio validates; visual approval and source-file inspection remain pending. |
| SwiftUI / Compose | Target-native redaction/placeholder shapes hidden from accessibility. | Conceptual mapping; lifecycle, announcement and reduced motion remain native. |

## Performance And Risks

- Final Primitives CSS is `10,543 B / 10.3 KiB`, leaving `4 B`; complete Web
  component CSS is `64,799 B / 64 KiB`, leaving `737 B`.
- Shared runtime remains `10,171 B / 8 KiB`, an existing `1,979 B` exception;
  Skeleton adds `0 B`. Primitives and complete Web CSS both add `0 B` relative
  to the Batch 26 baseline.
- Human review must approve surface contrast, shimmer strength/rate, finite stop,
  line proportions, Button width, radii and fixture scale. No owner visual asset
  is available beyond non-inspectable Studio trace IDs.
- Targets must guarantee close placeholder/final geometry, clear busy state,
  avoid duplicate announcements across composed shapes and own longer-motion
  policy if they override the finite presentation.
- The Primitives budget remains effectively exhausted; later work must reduce
  existing CSS or record an explicit exception.

## Validation

Contract, Studio, registry/docs, DTCG source, Neutral Web and Shopify adapters,
semantic DOM, all variants, localized RTL, dark, forced colors, reduced motion,
finite completion, zoom, four-viewport evidence, TypeScript, structural/parity/
static-preview/refinement audits, temporary docs build, deterministic gzip,
generated-copy identity, diff checks and `site/dist` cleanliness are included in
Batch 26.
