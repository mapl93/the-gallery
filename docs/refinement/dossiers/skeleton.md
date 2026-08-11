# Component Dossier: Loading Skeleton

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target and embedded Shopify class contract

Contract: `components/contracts/skeleton.contract.json`

## Recommendation

Retain A12 Loading Skeleton as the accepted decorative geometry primitive from
ADR 0064. Its only semantic property remains `variant`; consumers own dimensions
and loading lifecycle, while the containing target region owns `aria-busy`,
localized status text and replacement with real content. Do not add a loading
boolean, content slot, number of lines, announcement string or framework-style
child masking API to neutral source.

Refine the existing implementation by removing composition-owned margins,
constraining intrinsic presets to their container, stopping shimmer after three
1.5-second cycles, using a solid base when reduced motion is requested, and
using a visible static system-color shape in forced colors. Preserve the current
six shape choices, semantic color/radius/height tokens and zero JavaScript.

The `OPEN-QUESTIONS` entry that asks whether `variant`, decorative shapes and
composition-owned dimensions are accepted is stale: ADR 0064 already accepts
all three. It can be moved to Recently Resolved without new owner input.

## Purpose And Limits

- Reserves recognizable low-fidelity geometry for content that is expected but
  not yet available, reducing perceived wait and layout shift.
- Fits partial page, card, list, text, media, action and avatar placeholders when
  the consumer can predict the final geometry.
- Is not a progress meter, spinner, blocking preloader, empty/error state,
  suspense/data client, timeout policy or announcement service.
- Does not own when loading begins/ends, what content replaces it, whether stale
  content is preferable, whether interaction stays available or how requests
  fail/retry.
- Does not infer dimensions from future content. Consumers compose dimensions
  or use the existing geometry presets and must reserve the final layout space.

## Current Gallery Baseline

- Registry A12, Primitives, no dependencies; contract `0.2.0`, `pilot`.
- One optional `variant` maps Default, Text, Title, Image, Button and Circle to
  the existing modifier classes. Default has no intrinsic size.
- Canonical CSS uses surface-secondary/base and surface-primary/shine, radius
  small/medium/full, Button minimum height and a `1.5s ease-in-out infinite`
  linear-gradient animation.
- Text is `1em x 80%` plus an `8px` bottom margin; Title is `1.5em x 60%` plus a
  `12px` bottom margin; Image is a full-width square; Button is `140px` wide at
  Button minimum height; Circle owns radius only and receives fixture dimensions.
- Reduced motion removes animation but leaves the gradient at `0 0`, producing
  a static shine band rather than the neutral base surface.
- Forced colors removes `background-image`, leaves transparent background and
  keeps the infinite animation running; the placeholder becomes visually absent
  while still consuming animation work.
- Studio and Exhibit share `SkeletonStudio` and one Default fixture. The fixture
  puts `role="status"`, `aria-busy="true"` and an author name on an otherwise
  empty wrapper. The decorative Skeleton is correctly `aria-hidden`.
- MDX's primary fallback instead shows a five-shape stack and therefore does not
  mirror the shared Default fixture. Its empty named Status relies on an
  accessible name rather than real localized status content.
- Shopify uses the generated copied CSS as an embedded class contract. It needs
  no dedicated Liquid, schema or JavaScript; the consuming section owns loading
  data and region semantics.
- No neutral JavaScript references Skeleton. Deterministic level-9 gzip baseline:
  Primitives CSS `10,543 B`, complete Web component CSS `64,799 B`, shared
  runtime `10,171 B`. Primitives has only `4 B` below its provisional `10.3 KiB`
  ceiling; Web has `737 B`; runtime retains its existing exception.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA 1.2 `aria-busy` and Status](https://www.w3.org/TR/wai-aria-1.2/#aria-busy) | `aria-busy` tells assistive technology that an owned region is being modified and must return to false when complete. Status is a polite, atomic live region whose content is advisory and must not receive focus. | The consumer's real content region owns busy lifecycle. If an announcement is useful, provide actual localized Status text outside the decorative shape; do not make Skeleton itself a live region. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG has no Skeleton widget pattern or keyboard model. | Keep Skeleton unfocusable, non-interactive and free of widget roles. |
| [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Automatically moving content presented alongside other content needs pause/stop/hide when it lasts more than five seconds unless essential; a full-page-only preloader is a narrow exception. | Bound the decorative shimmer to 4.5 seconds. Targets that intentionally require longer motion need their own compliant control/essential-preloader policy. |
| [WAI C39 reduced-motion technique](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html) and [Media Queries 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) | `prefers-reduced-motion: reduce` requests removal or replacement of non-essential animation that can cause discomfort or distraction. | Replace shimmer with the solid base surface; do not leave a frozen shine stripe. |
| [CSS Color Adjustment 1](https://www.w3.org/TR/css-color-adjust-1/#forced) | Forced-colors mode removes non-URL background images and supplies system colors. | Stop the now-useless animation and render a static `GrayText` system-color shape without opting out of the user's palette. |
| [Open UI Skeleton research](https://open-ui.org/components/skeleton.research/) | Surveyed systems converge on Skeleton/Placeholder/Shimmer naming and rectangle/circle/text/group concepts but not a standardized element or API. | The accepted narrow Gallery shape enum is defensible; do not claim a platform primitive or copy a broad system API. |
| [Radix Themes Skeleton](https://www.radix-ui.com/themes/docs/components/skeleton) | Radix may replace children while preserving their shape or accept responsive width/height values. | Matching replacement geometry is useful evidence, but child masking, loading state and responsive dimensions remain framework/consumer behavior rather than neutral Gallery API. |
| [Polaris feedback indicators](https://polaris-react.shopify.com/components/feedback-indicators) | Polaris offers body/display text, page, tabs and thumbnail Skeletons as low-fidelity representations, reserving Spinner for content that cannot be represented. | Use Skeleton when future structure is predictable; use Spinner/Progress for other loading feedback. Gallery keeps reusable shape primitives instead of target-specific page components. |
| [web.dev CLS guidance](https://web.dev/articles/optimize-cls) | Placeholders and Skeleton UI should reserve sufficient space for late content to avoid surprising layout shifts. | Consumers must make placeholder and final content geometry agree; Default remains dimensionless and target-owned. |

No component-specific owner image is stored in the repository or attached to
this batch. Studio's Figma file/frame IDs are traceability metadata, not an
inspectable reference. Human review must approve the repository candidate or
provide replacement evidence.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Skeleton root | yes | ordinary decorative element, normally `aria-hidden="true"` | Skeleton/consumer | One visual shape; no widget, image, progressbar, status or busy semantics. |
| Loading region | outside component | consumer's existing section/list/card region with conditional `aria-busy` | target | Set true only while its content is incomplete and false/remove after atomic replacement. |
| Status text | optional, outside component | localized text in `role="status"` | target | Use when loading needs an explicit polite announcement; actual text, not empty visual shape. |
| Replacement content | outside component | target-native content | target | Must replace placeholder promptly and preserve predicted geometry where practical. |

Skeleton has no canonical component dependency. Composite cards, lists, pages
and target sections compose one or more Skeleton shapes; Skeleton never duplicates
their markup or attempts to infer their content model.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | Default, Text, Title, Image, Button, Circle. One enum; no combined or target-specific variants. |
| Size | No public size property. Default and Circle require consumer dimensions; presets provide only their existing low-fidelity geometry. |
| Loading lifecycle | Target-controlled absent/present/replaced state; no controlled/uncontrolled state inside Skeleton. |
| Animation | Up to three 1.5-second shimmer cycles, then a static shape; no infinite base motion. |
| Reduced motion | Immediate static base surface. |
| Forced colors | Immediate static `GrayText` system-color shape. |
| Theme | Light and dark semantic surfaces. |
| Direction | Geometry has no reading order; use container-safe width and no inline margin ownership. |
| Container | Maximum inline size 100%; target dimensions and final-content geometry remain authoritative. |

Unsupported combinations include interactive descendants, focus, disabled or
selected states, visible placeholder text inside the shape, Skeleton as resolved
empty/error content, and a decorative shape that owns `aria-busy` or Status.

## Public API And State Ownership

- `variant` — optional enum mapped to the six canonical geometry choices;
  Default adds no modifier.

There are no content/slot properties, dimensions, line count, loading boolean,
accessible-label property, events, focus, keyboard behavior or internal state.
The target controls presence, dimensions, region busy lifecycle, localized
status, data request, timeout, stale/error content, replacement and any pause
mechanism required by a deliberately longer target animation.

## Token And Value Audit

- Keep `--color-surface-secondary` as base and `--color-surface-primary` as the
  moving highlight; both are existing cross-target semantic surface decisions.
- Keep `--radius-sm`, `--radius-md`, `--radius-full` and
  `--space-button-min-height` because the current shape presets reference them.
- Keep gradient stops, 200% travel, `1.5s` duration, three-cycle limit, `1em`,
  `1.5em`, `80%`, `60%`, `140px` and fixture dimensions private. They define
  low-fidelity composition, not consumer configuration.
- Remove Text/Title bottom margins. Spacing between repeated shapes belongs to
  the consumer's Stack/Grid, not to the primitive.
- Do not create Skeleton component tokens or expose arbitrary colors, gradient
  stops, travel, duration, iteration count, width, height or margin in Studio.

## Visual And Content Audit

- The base should remain a quiet neutral surface; the highlight may signal
  temporary loading without looking like actual text or an enabled control.
- Text and Title are different height/line-length presets. Image reserves a
  square. Button approximates existing Button height. Circle owns curvature but
  not diameter.
- Test Default plus all modifiers, repeated rows, narrow container, long loading
  status, RTL/localized status, light/dark, forced colors and 200% zoom.
- Skeleton has no short/long/empty visible content. Extreme-content testing
  applies to the adjacent target status and final replacement geometry.
- Exact neutral tones, shimmer strength/rate, line proportions, button width,
  radii and fixture composition remain human visual-review items.

## Accessibility And Interaction

- Each visual shape is decorative and hidden from assistive technology.
- The consumer places `aria-busy="true"` on the region being updated, then sets
  it false/removes it only after the replacement is complete.
- Optional loading announcements use real localized Status text. Skeleton has no
  accessible name, live-region role, focus, pointer/touch action or keyboard
  model.
- Do not announce every shape or every animation cycle. One target status owner
  prevents redundant loading speech across composite placeholders.
- Shimmer stops before five seconds, reduced motion is static from first paint,
  and forced colors retains visible geometry without background animation.

## Responsive And Performance

- Use `max-width: 100%` and remove component-owned margins. Image remains a
  container-width square; fixed Button width must shrink in narrower containers.
- Evidence target: Exhibit/Studio at 390/768/1280/1600, all six variants, a
  120px container, repeated shapes, long Arabic Status text, dark, forced colors,
  reduced motion, finite-animation completion and 200% zoom.
- Neutral runtime budget is exactly `0 B`: no listener, observer, timer, layout
  read, data request, formatter or asset. CSS animation must not survive when its
  background image is suppressed.
- Primitives starts with only `4 B` under its provisional family ceiling. The
  refinement must reduce or hold gzip size rather than create a hidden exception.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Decorative empty element plus variant class; target owns size, busy region, Status and replacement. | Implemented and evidenced with finite motion, media alternatives, containment and zero runtime. |
| Shopify | Same generated CSS class contract embedded in target Liquid composition. | Implemented and validated; no dedicated Liquid/schema/runtime required. Consumer section owns async data and semantics. |
| React / Angular | Conditional target rendering or suspense/data state around decorative shapes; existing region owns busy/status. | Planned; no neutral child-masking or loading state. |
| Figma | Six visual shape choices with semantic surface/radius controls and consumer-owned dimensions. | Studio trace exists; visual approval remains open. |
| SwiftUI / Compose | Redacted/placeholder shapes hidden from accessibility; native target region/state announces loading and replacement. | Planned; target-native animation and reduced-motion APIs required. |

## Exhibit And Studio Parity

`SkeletonStudio` is registered for both Exhibit and Studio, so the live Default
fixture and component implementation are shared. Exact serialized inner HTML
matches in both views. The MDX fallback now mirrors the same Default semantic
composition. Studio-only classes define fixture dimensions without becoming
contract defaults.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Infinite shimmer can run alongside other page content indefinitely. | high | Stop after three 1.5-second cycles; targets that need longer movement own a compliant control/exception. | implementation |
| Forced colors removes the gradient, leaves the shape transparent and keeps invisible animation work. | high | Stop animation and use static `GrayText` system-color background. | implementation |
| Reduced motion freezes a shine band instead of replacing motion with the neutral base. | medium | Use a solid base background with no animation. | implementation |
| Text/Title own vertical margins that belong to a Stack/Grid consumer. | medium | Remove margins; keep only shape geometry. | implementation |
| Empty named Status wrapper does not demonstrate real localized advisory content or region lifecycle. | medium | Use a target busy region plus separate actual visually hidden Status text in the shared fixture/fallback. | docs target |
| MDX fallback differs from the shared Default fixture. | medium | Mirror Default anatomy and status composition. | docs target |
| Fixed Button width can overflow a container narrower than 140px. | medium | Apply root `max-width: 100%`. | implementation |
| `OPEN-QUESTIONS` repeats decisions already accepted by ADR 0064. | documentation drift | Move the item to Recently Resolved and preserve the accepted boundary. | documentation |
| Primitives has `4 B` gzip headroom. | constrained | Offset all additions through removal/simplification and record exact delta. | program/implementation |

## Evidence And Validation

- Before evidence: Exhibit and Studio desktop captures in
  `output/playwright/refinement-batch-26/before/`.
- Baseline DOM measures all six variants, confirms one hidden decorative shape,
  zero focusables and an external named Status/busy wrapper.
- Baseline browser inspection proves infinite `1.5s` animation, reduced-motion
  gradient retention and forced-color transparency with invisible animation.
- After evidence covers both modes at 390/768/1280/1600, all variants, a 120px
  Button container, long Arabic/RTL Status, dark, forced colors, reduced motion,
  finite completion and 200% zoom. Exact shared renderer markup was confirmed.
- Measured shimmer is `1.5s linear 3`, running immediately after reload with a
  `4500ms` effect end and absent after 4.8 seconds. Reduced motion is a solid
  semantic base; forced colors is a static opaque browser-resolved `GrayText`.
- Default/Text/Title/Image/Button/Circle measure `320x64`, `256x15`, `192x22.5`,
  `224x224`, `140x40` and `64x64px`, all with zero bottom margin and 100% maximum
  width. Button contracts to `120x40px` without overflow.
- Browser console inspection has zero errors/warnings. Twenty after and two
  before captures live under `output/playwright/refinement-batch-26/`.
- Docs, contracts, Studio, tokens, Web/Shopify adapters, structural, parity,
  static-preview and refinement audits, TypeScript, temporary Vite build,
  deterministic gzip, generated-copy identity, `git diff --check` and
  `site/dist` cleanliness pass.

## Risks And Open Questions

1. Human review must approve surface contrast, shimmer strength/rate, three-cycle
   stop, line proportions, Button width, radii and fixture scale.
2. No owner visual reference is available beyond Studio trace IDs.
3. Consumer targets must prove that placeholder and final content geometry match
   closely enough to prevent layout shift and that `aria-busy` returns to false.
4. Composite products must choose one localized Status owner rather than
   announcing each Skeleton shape.
5. Primitives is at its provisional gzip ceiling; later primitive work may need
   deliberate CSS reduction or an explicit budget revision.

## Readiness Decision

`human-review-ready`: ADR 0111, contract, CSS, shared renderer/fallback,
cross-target documentation, browser evidence, adapters and validation are
reconciled. The component remains `pilot`; human approval is still required for
surfaces, shimmer, geometry and radii before any stability promotion.
