# 0199. Native Related Article List And Target Recommendation Ownership

Status: Accepted

Date: 2026-07-17

## Context

Related Articles had an optional heading, a generic grid `div`, viewport media
queries and separate Studio responsive overrides. Clearing the title or article
slot left an unlabelled or empty section. The registry also promised next/prev
navigation even though ADR 0079 and the L10 contract explicitly excluded the
adjacent `.article-nav` family pending an owner architecture decision.

HTML supplies thematic section, contextual heading, unordered-list, list-item
and nested article semantics. APG recommends naming an important section from
its visible heading without proliferating landmarks. Open UI defines no Related
Articles widget; Radix and Polaris keep collection layout, item rendering and
data behavior separate. Shopify exposes article collections separately from
`next_article` and `previous_article`, and does not define a portable related-
article ranking policy.

Article Card already owns one passive native article summary, one primary Link
containing contextual media and the complete title, optional target metadata
and intrinsic card variants. Related
Articles should compose that canonical implementation instead of copying it.

## Decision

- L10 is one passive named thematic section with a required non-empty visible
  contextual heading and a required non-empty collection of canonical Article
  Cards. Missing either omits the complete root.
- Neutral Web uses `section[aria-labelledby]`, a target-unique heading id,
  `ul.related-articles__grid` and one `li.related-articles__item` per Article
  Card. It adds no explicit region/list role, widget semantics or root focus.
- Each item contains exactly one complete canonical Article Card. Article Card
  retains article, heading, Link, Badge, media, metadata, optional-content,
  focus and navigation ownership.
- The v1 target supplies an explicitly curated ordered set of at most three
  canonical Article Cards, excludes the current article and duplicates, and
  preserves curator order. No tag fallback, automatic ranking or
  personalization is inferred. The target still owns storage, freshness,
  destinations, tracking, analytics, SEO, loading/error/refresh and no-result
  policy.
- The L10 grid uses logical intrinsic `auto-fit/minmax` layout based on available
  inline space. Viewport breakpoints and docs-only column overrides are removed.
  The minimum card measure remains a private composition detail.
- `title` and `articles` are the complete neutral semantic API. Column count,
  card measure/variant, item count, heading rank, section spacing, border,
  source and lifecycle are not public L10 properties.
- One shared `RelatedArticlesArtwork` and fixture render Exhibit and Studio.
  Fixture content and heading ranks are evidence, not defaults.
- L10 owns zero neutral runtime, assets, requests, observers, state, events,
  focus management, live regions or animation.
- `.article-nav` remains unchanged and explicitly outside L10 anatomy, API,
  fixture, evidence and adapter mapping. Previous/Next Article Navigation is
  not registered in v1; it may later become a separate canonical component or
  explicit target composition and is never interpreted as L10.
- Article-page hosts place L10 after primary article content and before
  Comments. Author Card and Share Actions may be positioned around that
  boundary without changing L10.
- Shopify implements the curated source through an article-template-only
  section whose native `article_list` setting is limited to three. It preserves
  editor order, excludes the current article and duplicates, composes the
  canonical Article Card snippet, and omits invalid/empty output. First real
  template placement remains host-owned.
- Contract and Studio metadata advance to `0.3.0`, remain `pilot`, and cannot
  become `stable` without explicit human review.

## Owner Confirmation

Owner decision 52 accepts the maximum-three curated v1 source, current-article
and duplicate exclusions, curator order, absence of tag fallback and
personalization, placement after primary article content and before Comments,
and no registered Previous/Next Article Navigation in v1. Curated target data
mapping and final human visual/stability review are implementation gates, not
open neutral architecture decisions.

## Consequences

- Assistive technology receives one named collection and native list structure
  while keyboard users encounter only the canonical card destinations.
- The same L10 instance responds to its real host width in article body,
  sidebar or wide footer contexts without JavaScript or viewport leakage.
- Exhibit, Studio and canonical source no longer maintain different responsive
  implementations or separate L10 fixtures.
- Targets can store the accepted ordered curation in native CMS/editor data
  without coupling neutral source to Shopify, React or another platform API.
- Previous/next navigation remains legacy source evidence only and is no longer
  falsely described as implemented L10 behavior.
- Human review still decides real consumer placement, final grid/card visuals,
  L10-specific design direction and explicit stability approval.

## References

- <https://html.spec.whatwg.org/multipage/sections.html#the-section-element>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element>
- <https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/>
- <https://open-ui.org/components/card.research/>
- <https://www.radix-ui.com/themes/docs/components/grid>
- <https://polaris-react.shopify.com/components/lists/resource-list>
- <https://shopify.dev/docs/api/liquid/objects/blog>
- <https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#article_list>
- <https://shopify.dev/docs/api/storefront/latest/objects/Article>
- <https://www.w3.org/TR/css-contain-3/>
- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
