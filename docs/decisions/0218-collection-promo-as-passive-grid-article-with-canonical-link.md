# 0218. Collection Promo As A Passive Grid Article With Canonical Link

Status: Accepted

Date: 2026-07-18

## Context

E6 Collection Promo already presented a recognizable editorial media tile with
one title and CTA, but it duplicated canonical Link hover/focus presentation,
invented a fallback destination when only CTA text existed, left overlay/icon
semantics implicit, rendered missing titles, used a viewport breakpoint and
applied `grid-column: span 2` to the nested article.

ADR 0120 makes `.collection-grid__items` the CSS grid and each direct native
`li.collection-grid__item` the actual grid item. A nested E6 article cannot span
those tracks by styling itself. ADR 0065 establishes native canonical Link for
navigation. ADR 0076 already accepts E6's editorial statement role, inverse text
only with media plus overlay, and Default/Span 2 presentation.

WAI guidance supports native anchors with visible names and contextual image
alternatives. Open UI documents full-card link-area delegation as an incubating
proposal and records tradeoffs in current wrapper, pseudo-element and JavaScript
workarounds. Shopify supports customizable blocks but requires target decisions
about block ownership, source order, reflow, pagination and editor scope.

## Decision

- E6 is a passive self-contained `article` intended to occupy one canonical
  Collection Grid list item. The root has no href, role, tabindex, click handler,
  key handler or link-area delegation.
- One non-empty visible title is required. Missing title fails closed in the
  shared docs renderer and must fail validation or omit the tile in production
  adapters.
- The title is a real heading, but its rank is target-document context. Heading
  level is not a public E6 visual property and is not hardcoded by the neutral
  contract.
- Eyebrow and media are optional. Blank eyebrow omits its element. Media is a
  target-supplied native image; responsive source, dimensions, crop, focal point,
  loading and decoding remain target-owned.
- `mediaAlt` is contextual. Informative media gets concise alternative text;
  decorative or redundant media gets empty alt. It is never generated from the
  title or file name.
- The passive overlay renders only with media and is hidden from accessible
  naming. Without media, E6 uses the statement surface and primary text. With
  media plus overlay, it uses inverse text. The scrim is drawn from current
  primary text at the private overlay density so that scrim and inverse copy
  remain opposite in both light and dark themes, matching ADR 0119 rather than
  pairing dark-mode inverse text with a fixed black scrim.
- E6 composes canonical Link. `ctaLabel` and `href` are an optional required
  pair: when both are non-empty, exactly one visible native anchor renders; when
  either is absent, the complete CTA is omitted. No fallback URL is invented.
- The Web candidate includes one passive target-supplied directional indicator
  with its own E6 class. It is hidden from accessible naming, mirrors in RTL and
  is not a public icon-library or icon-choice property.
- Default and Span 2 remain accepted variants. Collection Grid owns list
  membership and grid placement. When an E6 child requests Span 2, the parent
  `li` spans two tracks only while the named Collection Grid container supports
  at least two. Narrow one-track layouts never create an implicit second track.
- Internal padding/minimum-block geometry follows an E6 inline-size container,
  not the viewport. Content remains in source order and may grow/wrap; E6 adds no
  line clamp, fixed text height, CSS order or dense packing.
- Canonical Link owns native Enter/click behavior, wrapping, base focus/hover and
  reduced-motion behavior. E6 supplies only contextual inherited/system color,
  underline emphasis and logical icon direction.
- Forced colors suppress media/overlay visually without removing informative
  image semantics, restores system surface/text/boundary/link/focus colors and
  retains the same article content.
- E6 adds no neutral listener, observer, timer, request, storage, analytics,
  delegated link area, animation, framework dependency or component-owned asset.
- Exhibit and Studio mount one `CollectionPromoArtwork`, one initial fixture,
  one canonical class composition and the same navigation path. MDX Preview is a
  matching static fallback, not a second implementation.
- Shopify remains planned until the owner accepts the promo eligibility,
  insertion/pagination/count/order/span policy and a theme/section block,
  snippet, schema, data, localization, editor and live-store implementation.
- E6 remains `pilot`; automated evidence cannot promote it to `stable`.

## Open Human Boundary

This decision intentionally does not approve:

- eligible destination/content types or whether a CTA is product-required;
- paid/sponsored content, disclosure, targeting, frequency or measurement policy;
- insertion pages, indexes, source ordering or automatic placement;
- universal Span 2 availability across parent densities and targets;
- title-link/full-card-link migration or native `target`/`rel` API expansion;
- heading-rank policy beyond target-context ownership;
- Shopify block/editor/pagination/product-count architecture;
- final height, crop/focal point, padding, overlay, type, tracking, radius, focus,
  underline, icon or one/two-track visual rhythm;
- current generic Figma nodes as E6-specific evidence; or
- promotion from `pilot` to `stable` without explicit human review.

The supported alternatives are a future explicitly reviewed single native
anchor wrapping all otherwise non-interactive tile content, or target omission
when a collection implementation cannot preserve truthful disclosure, source
order, pagination, counts and reflow. Neither is silently selected here.

## Consequences

- E6 consumes canonical Link instead of maintaining a parallel navigation
  implementation.
- Required-pair omission removes invented destinations and unnamed/false links.
- Media alternatives, overlay passivity and target heading ownership become
  explicit and portable across targets.
- Span 2 affects the actual Collection Grid item and safely collapses in narrow
  containers without DOM reordering or implicit tracks.
- Container response, logical properties, forced-color system rendering and
  zero neutral runtime make the candidate certifiable without choosing its
  commercial or Shopify product policy.
- Final visuals, E6-specific Figma evidence, target promotion policy, Shopify
  integration and explicit stability approval remain visible owner decisions.

## References

- <https://www.w3.org/WAI/ARIA/apg/patterns/link/>
- <https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/>
- <https://www.w3.org/WAI/tutorials/images/decision-tree/>
- <https://www.w3.org/TR/WCAG22/#contrast-minimum>
- <https://open-ui.org/components/card.research/>
- <https://open-ui.org/components/link-area-delegation.explainer/>
- <https://www.radix-ui.com/themes/docs/components/card>
- <https://polaris-react.shopify.com/components/layout-and-structure/card>
- <https://shopify.dev/docs/storefronts/themes/architecture/blocks/index>
- <https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks>
