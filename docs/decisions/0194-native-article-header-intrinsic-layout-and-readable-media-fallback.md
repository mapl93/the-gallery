# 0194. Native Article Header, Intrinsic Layout, And Readable Media Fallback

Status: Accepted

Date: 2026-07-17

## Context

Article Hero used a native `header` and contextual heading, but full mode kept
inverse text and a large minimum height when its selected background media was
absent. Split mode retained an empty second column without split media. Source
response used viewport breakpoints while Studio separately supplied a surface,
radius, no-media colors, and container response. Exhibit, Studio, MDX, Neutral
Web, and Shopify therefore did not share one complete implementation.

HTML defines `header` as introductory content that usually contains a heading
and does not create a new section. It demonstrates byline and publication
`time` inside an article header. APG and Open UI define no Hero widget. WAI
makes image alternative text contextual, while WCAG requires readable contrast
over varying images and reflow at narrow effective widths. Radix and Polaris
likewise treat comparable title/media/layout work as semantic composition rather
than a Hero-specific interaction primitive.

## Decision

- L2 is a passive native `header` that introduces the surrounding article with
  one required complete contextual heading. It is not the article boundary, a
  landmark/widget, page shell, action surface, data service, formatter, reading
  time calculator, SEO owner, or analytics client.
- Full, split, and text-only remain the three public variants. Title is required;
  background media, split media, category, and target metadata remain optional.
- Heading rank, media alternative/meaning, localized metadata, publication and
  duration values, author/taxonomy destinations, and image loading remain owned
  by the composing target.
- A required private `.article-hero__layout` responds to the root's named
  inline-size container. Viewport response and Studio-specific L2 layout rules
  are removed.
- Full and split derive private `.article-hero--without-media` when their
  selected slot is absent. The fallback preserves complete content in normal
  colors and one column, without inverse text on transparency, an empty track,
  substituted media, or runtime measurement.
- Full-image media renders a private visual-only overlay hidden from assistive
  technology. Category/title/metadata use a stable neutral-0 on-image primitive
  through a private alias, and forced-colors mode replaces photographic reliance
  with system colors.
- Complete title and metadata wrap naturally. Source CSS uses existing semantic
  typography/spacing/color tokens. Inline padding is privately bounded between
  the stack scale and the global container margin using component query units,
  so narrow containers retain usable content width. L2 adds no motion or
  JavaScript.
- `ArticleHeroArtwork` is the shared Exhibit/Studio renderer. The docs fixture
  demonstrates semantic publication/duration `time` values and visual-only
  separators; site CSS does not add an L2 surface, radius, breakpoint, or
  no-media implementation.
- Shopify receives a target-native passive snippet that maps verified Article
  fields and explicit variant/heading/show/alt/loading/sizes parameters. It adds
  no duration inference, taxonomy inference, query, section/schema, article
  body, navigation, JavaScript, analytics, or structured data.
- Contract and Studio metadata advance to `0.2.0`, remain `pilot`, and cannot
  become `stable` without explicit human review.

## Consequences

- Missing optional media can no longer produce unreadable or structurally empty
  output, while targets may still reject full-without-media as a future product
  policy.
- Consumer Web, Exhibit, Studio, and Shopify share the same root/layout/media/
  content anatomy and intrinsic response without target-specific React in base
  source.
- Long, localized, narrow, zoomed, dark, forced-colors, and reduced-motion
  contexts retain complete semantic content and zero L2 runtime.
- The overlay is a private safety treatment, not a public art-direction API.
- Human review still decides final surface/radius/elevation, crop/focal point,
  type/rhythm, overlay art direction, category/author links, metadata policy,
  whether full may omit media, first Shopify consumer, and corrected L2-specific
  design evidence.

## References

- <https://html.spec.whatwg.org/multipage/sections.html#the-header-element>
- <https://html.spec.whatwg.org/multipage/sections.html#the-article-element>
- <https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines>
- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/WAI/tutorials/images/>
- <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html>
- <https://www.w3.org/WAI/WCAG22/Techniques/general/G145.html>
- <https://www.w3.org/WAI/WCAG21/Understanding/reflow>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://open-ui.org/components/>
- <https://www.radix-ui.com/themes/docs/components>
- <https://www.radix-ui.com/themes/docs/overview/layout>
- <https://polaris-react.shopify.com/components/layout-and-structure/page>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates/article>
- <https://shopify.dev/docs/api/liquid/objects/article>
- <https://shopify.dev/docs/api/storefront/latest/objects/article>
