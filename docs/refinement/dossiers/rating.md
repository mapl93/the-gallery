# Component Dossier: Rating Stars

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target and Shopify Liquid adapter

Contract: `components/contracts/rating.contract.json` (`0.4.0`, `pilot`)

Decision: ADR 0235

## Recommendation And Accepted Direction

Use A11 `rating` as The Gallery's only canonical passive rating display. The
owner selected consolidation: the former V2 `star-rating` identity is deprecated
before v1 and owns no permanent alias, CSS, renderer, fixture, token, behavior,
or adapter. Review Summary and Review Card compose Rating; Star Input remains
the separate interactive field.

Rating receives an already-valid half-step value, a matching localized text
alternative, optional complete localized review-count text, and `default | lg`
presentation. Invalid required composition emits no root. Raw provider data,
normalization, rounding, missing-data policy, aggregation, structured data,
review navigation, and announcements stay target-owned.

This candidate is prepared for human visual and stability review. Its contract
remains `pilot`; this dossier does not authorize promotion to `stable`.

## Purpose, Uses, And Limits

- Presents a read-only rating from `0` through `5` in `0.5` steps.
- Fits product cards, product summaries, review summaries, review cards, and
  other compact metadata surfaces.
- Exposes one named star image and optional independently readable count text.
- Is not a rating input, aggregate calculator, provider model, formatter,
  review link, live region, progress indicator, or validation control.
- Does not infer a five-point value from another scale or silently round an
  exact aggregate. Targets must supply the deliberate half-step projection.
- Does not render when `ratingValue` is invalid, `accessibleLabel` is blank, or
  `size` is unsupported.

## Research Dossier

| Source | Relevant evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI grouped images tutorial](https://www.w3.org/WAI/tutorials/images/groups/) | A star group conveying one rating should have one complete text alternative rather than five redundant image names. | Name `.rating__stars` once and hide each visual star. |
| [WAI-ARIA `img` role](https://www.w3.org/TR/wai-aria-1.2/#img) | An image role represents one graphic; its descendants do not remain independent semantic content. | Keep optional count outside the image subtree as ordinary text. |
| [WCAG 2.2 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) and [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | State cannot rely only on hue; star indicators benefit from solid versus outline form. | Full, half, and empty use solid, partial-fill, and outline shapes in addition to color. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widgets but no passive rating-display pattern. | Add no keyboard, focus, slider, meter, radio, or live-region behavior. |
| [Open UI component research](https://open-ui.org/components/) | There is no standardized passive Rating element or cross-target API. | Keep the narrow repository-owned contract and native semantics. |
| [Radix Primitives](https://www.radix-ui.com/primitives) and [Polaris components](https://polaris.shopify.com/components) | Neither system establishes a canonical passive star-rating primitive. | Do not copy framework state or admin-specific APIs. |
| [MUI Rating](https://mui.com/material-ui/react-rating/) and [Spectrum Rating](https://spectrum.adobe.com/page/rating/) | Mature systems support read-only ratings, fixed five-star anatomy, fractional precision, multiple sizes, and non-color state distinction. | Preserve the useful half-step value and two semantic sizes without importing framework ownership. |
| [Shopify Liquid Rating object](https://shopify.dev/docs/api/liquid/objects/rating) | Shopify exposes value and scale explicitly. | The Shopify adapter reads official data, verifies a five-point scale, localizes copy, and owns nearest-half projection. |

No component-specific owner image is stored in the repository. The Studio Figma
IDs are generic traceability metadata, not component-specific visual approval.
Human review must therefore approve or revise the repository candidate directly.

## Anatomy And Slots

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root `.rating` | yes | Ordinary inline container; no role or tab stop | Rating |
| Stars `.rating__stars` | yes | `role="img"` plus required localized `aria-label` | Rating/target |
| Star `.rating__star` | exactly five in the shared renderer | Decorative `aria-hidden="true"` full, half, or empty glyph/SVG | target supplies value; Rating renders state |
| Half fill `::before` | conditional/private | Inline-start 50% fill over an outlined star | CSS composition |
| Count `.rating__count` | optional | Ordinary localized text with `dir="auto"` | target |

There are no named content slots, actions, icons exposed as API, or interactive
descendants. Count omission removes its element instead of rendering an empty
placeholder.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported values and behavior |
| --- | --- |
| Variant | One passive default variant |
| Size | `default` (`--typo-body-size`) and `lg` (private `1.5rem`) |
| Value | Required `0`, half steps, or `5`; invalid/non-finite/non-half-step values emit no root |
| Star state | Empty outline, full solid, half outline plus inline-start partial fill |
| Count | Omitted or complete localized text; no inferred review link |
| Direction | Star sequence is fixed LTR; count uses `dir="auto"`; root wraps logically |
| Theme | Light, dark, forced colors |
| Motion | No animation or transition; reduced motion is naturally identical |
| Container | Intrinsic inline size, wrapping count, `max-inline-size: 100%`, no horizontal overflow |

No hover, focus, pressed, selected, disabled, loading, error, busy, controlled,
or uncontrolled state exists because Rating is passive.

## Public API And Ownership

| Property | Type | Required | Contract |
| --- | --- | --- | --- |
| `ratingValue` | number `0..5`, step `0.5` | yes | Target-supplied normalized display value; maps to `data-rating`. |
| `accessibleLabel` | localized string | yes | Complete value and scale; maps to `.rating__stars[aria-label]` and must agree with visual states. |
| `reviewCount` | localized string | no | Complete visible count including its noun; omission removes `.rating__count`. |
| `size` | `default | lg` | no | Semantic presentation choice; changes geometry only. |

Rating emits no events and owns no state lifecycle. A target must change
`ratingValue` and `accessibleLabel` atomically. The target also owns provider
scale conversion, exact-to-half projection, missing versus zero policy,
aggregation, count formatting, asynchronous updates, review destination, and
schema/structured data.

Review Summary deliberately separates its exact `ratingValue` (`0.1` step) from
its explicit `ratingDisplayValue` (`0.5` step) passed to Rating. Neutral Web does
not decide that projection.

## Tokens, Private Variables, And Hardcoded Values

Public semantic tokens:

- `--color-text-accent`: full and partial fill.
- `--color-text-secondary`: empty outlines and count text.
- `--typo-body-size`: default star geometry.
- `--font-family-body`, `--typo-body-sm-size`, and
  `--typo-body-sm-line-height`: count typography.

Private composition:

- `--_rating-filled`, `--_rating-empty`, and `--_rating-size`.
- `0.25rem` root gap, `0.125rem` star gap, `1.5rem` large geometry, fixed five
  positions, 50% half fill, fixed LTR sequence, wrapping, and glyph choice.

These literals are stable internal anatomy, not consumer-facing semantic
decisions. No Rating-specific public token, arbitrary color, star count,
precision, clip percentage, gap, icon, or dimension API is added.

## Visual And Content Audit

- Default stars are 16px; `lg` stars are 24px.
- Full stars use `★`; empty stars use `☆`; half stars retain the outline and
  overlay a solid inline-start half.
- The optional count uses body-small typography and remains visually secondary.
- Stars do not shrink; long localized count text may wrap and uses
  `overflow-wrap: anywhere`.
- Evidence covers omitted count, `0`, `0.5`, `3.5`, `5`, default/large, Arabic
  RTL text, light/dark, forced colors, reduced motion, mobile through XL, and
  effective 200% zoom.

Human review must approve accent, outline weight, half-fill treatment, default
and large scale, gap, count hierarchy, line alignment, and composed appearance
inside Review Summary and Review Card.

## Accessibility And Interaction

- The accessibility tree exposes one image name for the stars and optional
  independent count text.
- Individual star glyphs are hidden; assistive technology does not hear five
  redundant characters.
- Full/half/empty meaning survives monochrome through shape, not color alone.
- Forced colors resolves stars and count to `CanvasText` while preserving form.
- The component has zero focusables, no keyboard model, no pointer action, no
  live region, no motion, and no runtime listener.
- Star Input is the canonical native radio-group component for value entry.

## Responsive, Extreme Content, And Runtime

- Canonical paired evidence exists at 390, 768, 1280, and 1600 CSS pixels.
- A 430px mobile RTL stage with a long Arabic count has equal stage
  `scrollWidth`/`clientWidth` (`398/398`) and Rating `280/280`.
- Effective 200% zoom keeps Rating inside its stage (`329.72px` within
  `1504px`) with no component overflow.
- The shared renderer rejects `3.7`, blank labels, and missing values by emitting
  no `.rating` root.
- Reduced-motion inspection finds zero animated and zero transitioned nodes.
- Neutral component runtime budget is exactly `0 B`; Rating adds no listener,
  observer, timer, request, formatter, asset, or layout read.
- Rating's CSS slice is `1,551 B` raw / `598 B` gzip (level 9). The complete
  Primitives family is exactly `10,547 B`, meeting but fully consuming its fixed
  ceiling after removal of redundant flex-item declarations.

## Cross-Target Translation

| Target | Mapping | Current result |
| --- | --- | --- |
| Neutral Web | Canonical classes, one named image, decorative states, optional count, CSS only | Implemented and evidenced |
| Shopify | Official Rating metadata, explicit five-point compatibility, target-owned nearest-half projection, localized label/count, `default | lg` | Implemented and adapter-validated |
| React / Angular | Render the same strict passive anatomy from already-valid props | Planned; framework state is unnecessary |
| Figma | Five explicit states plus optional count and two size presentations | Planned; generic trace IDs do not constitute approval |
| SwiftUI / Compose | One accessibility element for rating, decorative native shapes, separate count | Planned; native target owns formatting and announcements |

The deprecated V2 slug does not create another translation. Consumers must use
canonical Rating before v1.

## Exhibit And Studio Parity

`RatingStudio` and `RatingArtwork` own one fixture and renderer for both views.
The canonical Exhibit and Studio roots serialize to byte-for-byte identical
`outerHTML` in the final fixture. The deprecated Star Rating route maps to that
same renderer and fixture only as migration documentation; it emits no legacy
selector. Review Summary and Review Card render canonical `.rating` roots.

## Evidence And Validation

- Eight paired Rating images cover Exhibit/Studio at mobile, tablet, desktop,
  and XL under `output/playwright/refinement-primitives/rating-0235/`.
- Additional images cover large size, long RTL content, dark, forced colors,
  200% zoom, deprecated migration, Review Summary, and Review Card.
- Browser inspection confirms exact Exhibit/Studio DOM, five decorative stars,
  one named image, zero focusables, optional count omission, strict invalid
  composition, one tab, and zero console errors/warnings.
- Dark colors resolve to `rgb(251, 146, 60)` and `rgb(212, 212, 212)`; forced
  colors resolves all informative parts to system `CanvasText`.
- Contract, Studio, docs, token, Web adapter, Shopify adapter, static preview,
  TypeScript, refinement, parity, performance, and diff gates are part of the
  final batch validation. `site/dist` is not rebuilt.

## Risks And Human Review Questions

1. Approve or revise the star form, half-fill treatment, accent, secondary
   outline, two sizes, spacing, count hierarchy, and baseline alignment.
2. Approve the canonical fixture's `3.5` value and visible `24 reviews` count as
   the documentation example; they are fixture content, not defaults.
3. Provider integrations still require explicit scale, rounding, missing/zero,
   aggregate synchronization, structured-data, and review-link policies.
4. The Primitives family has no remaining gzip headroom; later primitive work
   must simplify source or obtain an explicit budget decision.
5. Do not promote Rating to `stable` without explicit human review.
