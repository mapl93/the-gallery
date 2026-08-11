# 0193. Native Article Card, Single Destination, And Target Metadata

Status: Accepted

Date: 2026-07-17

## Context

Article Card rendered two adjacent Links to the same article: an informative
media Link and a title Link. Its passive root nevertheless lifted on hover and
zoomed the image, while title and excerpt content were clamped. Canonical Badge
was a declared dependency but L1 duplicated its visual contract. Featured and
horizontal layouts depended on viewport breakpoints in source and different
container overrides in Studio. Exhibit, Studio, Related Articles, MDX, and
Shopify did not share one renderer or target composition.

HTML provides a native self-contained `article` composition and contextual
heading semantics; APG defines no generic Card widget. WAI guidance makes image
alternative text contextual and documents adjacent image/text Links to the
same destination as redundant. Open UI Card research has no stable anatomy,
and link-area delegation remains an incubating proposal whose current
workarounds conflict with nested interactive descendants. Shopify exposes
article title, URL, image, published timestamp, excerpt, author, and related
content fields, but does not establish one portable reading-time or taxonomy
policy.

## Decision

- L1 is a passive native `article` summary with one required contextual heading
  and one required primary title Link. It is not a Card widget, router, tracking
  client, query, formatter, reading-time calculator, taxonomy service, or
  whole-card activation primitive.
- The complete visible title is the only required article destination. Root and
  media do not forward, stretch, or duplicate activation. Optional author,
  taxonomy, and supplementary target Links remain independent native targets.
- Media is optional and non-interactive. Targets provide contextual informative
  alternative text or an explicit empty value when the image is decorative or
  redundant.
- Category composes canonical passive Badge visuals. Article Card owns only its
  placement. Metadata and author are target-owned compositions; dates and
  durations use machine-readable `time[datetime]` when present.
- Standard, featured, minimal, horizontal, and editorial remain the five public
  variants. A private `.article-card__layout` lets featured and horizontal
  layouts respond to the root's named inline-size container.
- Source CSS preserves complete title and excerpt wrapping, uses logical
  dimensions and existing semantic tokens, and removes root hover motion,
  media zoom, duplicated Badge visuals, and Article Card motion exceptions.
- The source does not add a default surface, border, elevation, or content
  truncation. Those are owner decisions recorded as open questions.
- `ArticleCardArtwork` is the shared docs renderer for L1 and Related Articles.
  Exhibit and Studio use the same fixture and canonical markup; site CSS does
  not add an Article Card surface or responsive implementation.
- Shopify receives a target-native snippet that maps verified `article` fields,
  validates the five variants and heading rank, accepts explicit show flags and
  optional passed blog label, and adds no JavaScript, inferred taxonomy,
  calculated duration, or source truncation.
- `.article-card--skeleton` remains unresolved presentation evidence rather than
  a public property, registered variant, or certified loading state.
- Contract and Studio metadata advance to `0.2.0`, remain `pilot`, and cannot
  become `stable` without explicit human review.

## Consequences

- Keyboard users encounter one required article destination rather than two
  adjacent redundant stops, while future independent author/category actions
  remain structurally valid.
- Long, localized, zoomed, and narrow content stays perceivable. Card response
  is consistent across consumer Web, Exhibit, and Studio without site-specific
  breakpoints.
- Badge changes propagate canonically instead of being shadowed by L1.
- Shopify can render the same neutral anatomy from native data without claiming
  ownership of list queries, locale policy, reading duration, taxonomy, image
  selection, or analytics.
- Human review still decides final surface/elevation, crop and visual rhythm,
  skeleton ownership, whether a future supported combined-link composition is
  desirable, metadata policy, truncation policy, and corrected L1-specific
  design evidence.

## References

- <https://html.spec.whatwg.org/multipage/sections.html#the-article-element>
- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/WAI/tutorials/images/>
- <https://www.w3.org/WAI/WCAG22/Techniques/html/H2>
- <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://open-ui.org/components/card.research/>
- <https://open-ui.org/components/link-area-delegation.explainer/>
- <https://www.radix-ui.com/themes/docs/components/card>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/2025-07/ui-components/layout-and-structure/card>
- <https://shopify.dev/docs/api/liquid/objects/article>
- <https://shopify.dev/docs/api/storefront/latest/objects/article>
