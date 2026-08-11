# 0198. Passive Complementary Blog Sidebar And Canonical Module Composition

Status: Accepted

Date: 2026-07-17

## Context

Blog Sidebar promised search, categories, recent posts, and a tag cloud while
exposing only one opaque sections slot. Its root lacked a required accessible
name, CSS duplicated Link hover/focus/motion behavior, and Studio applied the
passive Tag component to navigational anchors. Static MDX claimed that Tag was
not applied, so Exhibit, Studio, documentation, contract, and dependencies did
not describe the same implementation.

HTML defines `aside` for content tangential to but supportive of surrounding
content. Repeated complementary landmarks need distinct useful names, thematic
sections normally need headings, and grouped destinations retain native lists.
A search module has independent landmark, form, input, submit, query, result,
focus, validation, and announcement semantics. It cannot be reduced to a CSS
slot promise. The accepted Tag contract is a passive value label with optional
removal and explicitly directs navigation to Link.

## Decision

- L8 is one passive complementary layout. Neutral Web renders a native `aside`
  only when the target supplies a non-empty localized accessible label and one
  or more non-empty semantic sections. Missing either omits the complete root.
- The target authors repeated thematic sections and owns their contextual
  heading elements/ranks, module inventory/order, content, routes, data,
  localization, sanitization, SEO, analytics, privacy, and provider policy.
- Recent-post, category, archive, and topic destinations use native lists and
  compose canonical Link anchors. L8 depends on Link and no longer depends on
  Tag.
- Optional search, newsletter, and filter modules keep their complete canonical
  contracts. Search composes its search landmark, Form, field semantics, Input,
  Button, and target lifecycle. Removable active filters may compose Tag in
  their separate module. L8 adds no root property per module.
- L8 exposes only `label` and `sections`. It does not expose layout gap, title
  case/tracking, separator, topic-pill geometry, width, column, breakpoint,
  sticky offset, collapse, or responsive visibility as semantic API.
- CSS uses logical intrinsic containment, accepted semantic tokens, complete
  wrapping, touch-sized Link destinations, and local topic-pill presentation.
  Canonical Link owns shared hover, focus-visible, forced-color, and reduced-
  motion behavior.
- `BlogSidebarArtwork` and its explicit fixture become the shared Exhibit and
  Studio implementation. Fixture modules, strings, destinations, counts, and
  heading rank are evidence content, not contract defaults.
- L8 owns no controlled/uncontrolled value, listener, observer, timer, request,
  storage, disclosure, selection, search, form, focus manager, live region,
  asset, animation, sticky behavior, or neutral JavaScript.
- Contract and Studio metadata remain `pilot` and cannot become `stable`
  without final visual approval and explicit human review.

## Owner Confirmation

Owner decision 51 accepts `L8-A` and refines the public/target boundary:

- the public name is **Blog Sidebar**;
- `.blog-sidebar__topics`, `.blog-sidebar__topic`, and
  `.blog-sidebar__topic-link` are the canonical Topic-list anatomy;
- legacy `.tag-cloud*` selectors are temporary migration aliases only and must
  be removed before the public v1 contract freezes;
- the initial v1 module profile is Recent Articles and Topics as native Link
  lists;
- module order, limits, headings and records remain target page-composition
  data rather than L8 root properties;
- Search renders only when a real target supplies its complete form/result
  lifecycle; Search and Newsletter remain separate canonical or target
  compositions, not root booleans;
- Shopify may map explicit `blog.articles` and `blog.all_tags` through the same
  profile while its real placement and editor exposure remain target-owned.

Contract and Studio metadata advance to `0.3.0`. This confirmation makes the
implemented neutral and Shopify profile eligible for human review; it does not
approve final page placement, visuals, alias removal timing, or `stable`.

## Consequences

- Exhibit, Studio, MDX, registry, contract, dependency graph, and CSS now agree
  on one fail-closed named complementary composition.
- Navigational topics preserve native Link behavior and valid HTML instead of
  turning a passive/removable Tag into an anchor.
- New editorial modules can compose inside the stable sections boundary without
  expanding the root API or duplicating their semantics and runtime.
- Neutral Web stays platform-agnostic and runtime-free. Shopify has a reusable
  snippet for explicit Blog data, contextual heading rank, target limits/order,
  current-article exclusion and no Search/Newsletter shortcut.
- Real page placement/editor exposure, alias removal before v1 freeze, sidebar
  width/mobile order, title/topic visuals and L8-specific design evidence remain
  explicit target or human-review work.

## References

- <https://html.spec.whatwg.org/dev/sections.html#the-aside-element>
- <https://html.spec.whatwg.org/dev/sections.html#the-section-element>
- <https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#complementarylandmark>
- <https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html>
- <https://www.w3.org/WAI/tutorials/page-structure/regions/>
- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html>
- <https://www.radix-ui.com/themes/docs/components/layout>
- <https://www.radix-ui.com/primitives/docs/guides/composition>
- <https://polaris-react.shopify.com/components/layout-and-structure/page>
- <https://shopify.dev/docs/api/liquid/objects/blog>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates/blog#filter-articles-by-tag>
- <https://shopify.dev/docs/api/liquid/filters/link_to_tag>
- <https://shopify.dev/docs/storefronts/themes/navigation-search/search>
