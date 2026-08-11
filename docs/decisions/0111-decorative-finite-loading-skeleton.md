# 0111. Decorative Finite Loading Skeleton

Status: Accepted

Date: 2026-07-14

## Context

ADR 0064 accepted Loading Skeleton as a decorative shape primitive with one
`variant` property, composition-owned dimensions and target-owned loading
lifecycle. The implementation still ran an infinite shimmer, owned vertical
spacing in its Text and Title presets, allowed the fixed Button preset to
overflow a narrow container, and became transparent while continuing to animate
in forced colors. The shared docs fixture also put Status and busy semantics on
an empty named wrapper instead of demonstrating a real content region and
localized advisory text.

WAI-ARIA provides region-level `aria-busy` and Status semantics but no Skeleton
widget or keyboard model. WCAG's moving-content guidance creates a five-second
boundary for non-essential motion displayed alongside other content. Reduced
motion and forced-colors media features also require alternatives that do not
depend on a moving background image.

## Decision

- Loading Skeleton remains one ordinary decorative element, normally hidden
  from assistive technology. It has no widget, image, progress, Status, live
  region, busy, focus or keyboard semantics.
- The public semantic API remains exactly the six-value `variant` choice:
  Default, Text, Title, Image, Button and Circle. Loading state, dimensions,
  line count, content masking, announcement text and events are not added.
- Consumers own dimensions, presence, data and request lifecycle, timeouts,
  stale/error policy and replacement with real content. The affected target
  region owns `aria-busy`; an optional target-owned Status contains actual
  localized text.
- The base shimmer uses the existing surface tokens and runs three linear
  1.5-second cycles, then becomes static. A target that deliberately needs
  longer motion owns its pause, stop, hide or essential-preloader policy.
- Reduced motion renders a static base surface from first paint. Forced colors
  stops animation and uses the `GrayText` system color, without opting out of
  the user's forced palette.
- Text and Title own geometry but no outside margin. Every preset has
  `max-width: 100%`; target layout and final-content geometry remain
  authoritative.
- Gradient stops, travel, duration, iterations, preset proportions and fixture
  dimensions remain private composition details. No new public token or runtime
  behavior is introduced.
- Exhibit and Studio use one `SkeletonStudio` renderer and Default fixture. The
  MDX fallback mirrors the same anatomy. Studio dimensions remain fixture-only.
- Shopify consumes the generated CSS as an embedded class contract. Its
  sections own loading records, region semantics and replacement; no dedicated
  Liquid root, schema or neutral JavaScript is required.
- Loading Skeleton remains `pilot`. Automated and visual evidence makes it ready
  for human review but does not promote it to `stable`.

## Performance

Loading Skeleton adds no listener, observer, timer, request, formatter, layout
read or asset. The browser's CSS animation is finite and absent in reduced
motion and forced colors. Deterministic level-9 gzip measures:

- Primitives CSS: `10,543 B` against the provisional `10.3 KiB` ceiling,
  leaving `4 B`.
- Neutral Web component CSS: `64,799 B` against `64 KiB`, leaving `737 B`.
- Shared neutral runtime: `10,171 B` against the provisional `8 KiB` ceiling,
  retaining its existing `1,979 B` exception and adding `0 B` for Skeleton.

All three measurements are unchanged from the Batch 26 baseline. The CSS
refinement therefore consumes no additional family-budget headroom.

## Consequences

- Consumers receive predictable low-fidelity shapes without importing data,
  lifecycle, status-announcement or layout ownership into neutral source.
- Motion terminates before five seconds and cannot continue invisibly after a
  user media mode removes the gradient.
- Narrow containers, repeated composition, RTL, localized Status text and 200%
  zoom do not introduce component-owned spacing or horizontal overflow.
- Web and Shopify can share the same generated CSS, while framework, Figma and
  native targets map the narrow variant contract to target-native composition.
- Human review must still approve neutral surfaces, shimmer strength/rate,
  three-cycle stop, geometry proportions, radii and fixture scale. Targets must
  separately prove that placeholder and final geometry avoid layout shift and
  that busy state returns to false.
