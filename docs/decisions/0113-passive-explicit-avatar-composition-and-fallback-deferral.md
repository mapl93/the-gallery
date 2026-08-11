# 0113. Passive Explicit Avatar Composition And Fallback Deferral

> Update (2026-07-20): ADR 0237 supersedes the fallback and initials-scale
> deferrals after the owner accepted A15-A. The passive semantics and technical
> corrections in this ADR remain valid.

Status: Accepted

Date: 2026-07-14

## Context

ADR 0064 accepted Avatar's four sizes and explicit image or initials
composition while deferring image mapping, initials derivation and automatic
fallback. The implementation still used block Flex and physical dimensions,
allowed a fixed square to shrink through a narrow flex row, inherited initials
line height, hardcoded semibold weight, left native image display implicit and
could lose its circular boundary in forced colors. The contract suggested
`title` as an initials naming mechanism, and Shopify repeated an adjacent visible
author name through non-empty image alternative text.

The repository's open questions also ask whether initials typography should
scale with the four diameters. Current evidence shows all sizes inheriting the
same 15px font size. Choosing a type scale or a framework-style image/fallback
lifecycle would resolve explicit visual and architecture questions by
assumption, so those choices remain outside this decision.

## Decision

- Avatar remains a passive circular identity thumbnail with exactly one public
  semantic property: `size`. Small is 32px, Default 40px, Large 56px and Extra
  Large 80px.
- Targets explicitly author either a native `img` or pre-derived one- or two-
  grapheme initials. Neutral source does not fetch, preload, derive, listen for
  errors, delay fallback, select responsive sources or swap content.
- Native image is a direct child that fills the logical square, displays as a
  block and uses private centered cover crop. `src`, `srcset`, `sizes`, CDN
  transforms, focal point and failure policy remain target-owned.
- A standalone native image uses contextual non-empty `alt`; a native image
  beside the same visible identity uses `alt=""`. A standalone initials
  composition uses one `role="img"` named with the full identity through
  `aria-label` or `aria-labelledby`; redundant adjacent initials are hidden.
  `title` is not recommended as the primary naming mechanism.
- Avatar has no focus, keyboard, activation, disabled state, status, live
  region or widget role. An actionable identity composes a canonical named Link
  or Button around the passive Avatar. Status remains separately named/textual.
- Geometry uses logical inline/block dimensions, inline Flex presentation,
  exact no-shrink flex basis and middle inline alignment. Box sizing preserves
  the public outer diameter when forced colors adds its system-color boundary.
- Existing surface, text, full-radius and body-family tokens remain. Hardcoded
  weight is replaced by `--tg-font-weight-semibold`; private line height becomes
  `1`. Diameters, crop, alignment, clipping and line height are not new public
  customization API.
- Invalid long initials remain clipped and cannot expand the fixed root. Neutral
  source does not truncate, tokenize or infer valid localized initials.
- Shopify Testimonials keeps the target image object and visible adjacent name,
  but changes the redundant image alternative to null. It does not gain an
  automatic initials fallback.
- Exhibit and Studio continue using one `AvatarStudio` renderer and initials
  fixture. Studio exposes only the accepted size property and existing semantic
  presentation tokens; content/loading controls are not invented.
- Automatic versus explicit fallback, formal public image mapping and initials
  font-size scaling remain deferred. The recommended future direction is
  explicit neutral composition plus target-owned fallback and a discrete
  semantic type scale. Alternatives remain documented for owner input.
- Avatar remains `pilot` and is not ready for human stability review while the
  deferred architecture/visual decisions are open.

## Performance

Avatar adds no listener, observer, timer, request, formatter, initials parser,
image preloader, layout read or asset. Deterministic level-9 gzip measures:

- Primitives CSS: `10,495 B` against the provisional `10.3 KiB` ceiling,
  leaving `52 B`.
- Neutral Web component CSS: `64,808 B` against `64 KiB`, leaving `728 B`.
- Shared neutral runtime: `10,171 B` against the provisional `8 KiB` ceiling,
  retaining its existing `1,979 B` exception and adding `0 B` for Avatar.

Relative to the Batch 28 baseline, Primitives increases `23 B`, complete Web
component CSS increases `30 B`, and runtime is unchanged. The bounded CSS delta
covers logical/no-shrink geometry, native image normalization, tokenized weight,
private line height and a forced-color boundary.

## Consequences

- Web and Shopify preserve one framework-independent CSS identity while targets
  retain truthful control of identity records, image delivery and fallback.
- Four fixed sizes stay exact in Flex, inline, RTL, localized, forced-color and
  200% zoom contexts. Native images retain aspect ratio through cover crop.
- Assistive technology receives one contextual identity representation rather
  than duplicate image and adjacent-name announcements.
- Framework adapters may implement automatic fallback only after the owner
  accepts a cross-target model or explicitly scopes it as target-native behavior.
- Human review must still approve diameters, neutral surface/text, crop, circle,
  weight and the future initials type scale after architecture input.
