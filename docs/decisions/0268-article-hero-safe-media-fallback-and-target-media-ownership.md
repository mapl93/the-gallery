# ADR 0268: Article Hero Safe Media Fallback And Target Media Ownership

- Status: Accepted
- Date: 2026-08-10
- Owners: The Gallery
- Scope: L2 Article Hero variants, missing-media behavior, neutral surface, and
  target-owned media/metadata policy
- Refines: ADR 0194

## Context

ADR 0194 established a passive native article header with full, split, and
text-only profiles, but the final status still treated missing-media behavior,
surface, crop, metadata, and target policy as open. The owner selected L2-A and
required one safe no-media fallback for the media-dependent profiles.

HTML defines `header` as introductory content without creating a new section.
WAI image guidance makes alternative text contextual, and WCAG contrast/reflow
requirements apply across every crop and effective viewport. No APG or Open UI
Hero widget pattern supersedes those native document semantics.

## Decision

- Retain `full`, `split`, and `text-only` as the only neutral variants.
- `full` and `split` derive a private `without-media` state when their selected
  media slot is absent. They collapse to readable normal-flow content without
  inverse colors, overlay assumptions, media-dependent minimum height, an empty
  grid track, a substituted image, or hidden title/metadata.
- Unknown variant input normalizes to `full` before the missing-media state is
  derived, so malformed input also fails safely.
- `text-only` never requires media and never receives the missing-media state.
- The root remains an unframed passive native `header`; it gains no Card
  surface, border, elevation, action, landmark role, tabindex, or runtime.
- The host supplies heading rank, contextual alt text, crop/focal point,
  responsive sources/sizes, loading priority, category/author destinations,
  metadata inventory/order/locale, and any duration policy.
- Full-media contrast uses one private visual-only scrim. Overlay opacity,
  minimum height, content measure, crop, tracks, thresholds, and internal
  spacing are implementation details rather than public semantic properties.
- Exhibit and Studio consume one renderer and fixture. Shopify maps native
  Article fields to the same semantic anatomy while target query, schema,
  editor, image, locale, and analytics policy remain integration-owned.
- L2 remains `pilot`; explicit human review is required before `stable`.

## Consequences

- Every supported and malformed media-dependent configuration keeps required
  title and supplied metadata readable.
- Consumers retain three clear editorial choices without a combinatorial
  surface or alignment API.
- The neutral source remains independent of CMS, router, image service,
  localization library, analytics provider, React, Shopify, and Figma.
- Live targets must prove crop and contrast with their real images rather than
  treating one overlay-opacity measurement as universal approval.

## Not Approved

This decision does not approve:

- a fourth variant or public fallback-mode property;
- automatic cross-substitution between background and split media;
- inverse text over transparency or an empty media column;
- a Card surface, border, radius, elevation, or generic CTA on neutral L2;
- public overlay, crop, focal-point, threshold, track, height, alignment, or
  spacing properties;
- inferred duration, taxonomy, author destination, date formatting, SEO,
  structured data, analytics, query, or loading priority;
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://html.spec.whatwg.org/multipage/sections.html#the-header-element>
- <https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines>
- <https://www.w3.org/WAI/tutorials/images/>
- <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- <https://www.w3.org/WAI/WCAG21/Understanding/reflow.html>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://open-ui.org/components/>
- <https://shopify.dev/docs/api/liquid/objects/article>
