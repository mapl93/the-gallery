# 0079. Blog Semantic Source And Composition Boundaries

Status: Accepted

Date: 2026-07-12

## Context

The eleven Blog components had canonical CSS and structurally valid pilot
contracts, but their anatomy and states were mechanically derived and their
contracts did not yet expose conservative semantic properties. Several
descriptions also crossed unresolved product boundaries around loading,
reading-state calculation, taxonomy navigation, sharing, article navigation,
and comment behavior.

The Blog family can mature its static editorial source without assigning those
behaviors to neutral web or to any future target adapter.

## Decision

- Article Card exposes its five registry variants, title and destination, and
  optional category and excerpt content. Media, metadata, and author identity
  remain target-owned slots. The existing skeleton selector is recorded as
  presentation evidence but is not promoted to a semantic property or variant.
- Article Hero maps the registry's `full`, `split`, and `text-only` options to
  the existing `.article-hero--image`, `.article-hero--split`, and
  `.article-hero--text` classes. Full and split media and article metadata remain
  target-owned slots.
- Article Body exposes target-owned semantic rich content as one required slot.
  The existing drop-cap class is the only additional public presentation
  property in this pass.
- Reading Progress exposes its visual indicator as a target-owned slot. The
  contract does not define progress calculation, scroll synchronization, or
  whether the component is a progressbar or a decorative reading aid.
- Table of Contents originally exposed in-flow/sticky presentation, an optional
  title/label, and opaque target-owned items. ADR 0196 and ADR 0270 supersede
  that boundary with a required named native navigation, validated target-owned
  nested heading records, canonical Links, controlled `currentSectionId`, and
  safely degrading sticky-by-default or explicit flow placement.
- Author Card originally exposed full/compact presentation, author text,
  optional Avatar composition and target-owned profile/social links. ADR 0197
  and owner decision 50 supersede that boundary with one fail-closed passive
  singular identity, neutral host-owned semantics, canonical Avatar/Link
  composition, repeated canonical cards for multiple authors, and privacy-safe
  explicit destination supply.
- Category Nav originally exposed an accessible region label and target-owned
  category items without deciding whether they navigate or filter. ADR 0229
  supersedes this boundary with the accepted Filter Bar identity and controlled
  in-place choice composition.
- Blog Sidebar originally exposed target-owned repeated sections rather than
  separate search/category/recent/tag APIs. ADR 0198 and owner decision 51
  supersede that boundary with the public Blog Sidebar identity, canonical
  Topic-list selectors, temporary `.tag-cloud*` migration aliases, an initial
  Recent Articles + Topics Link-list profile, target-owned order/limits/headings
  and separately composed Search/Newsletter lifecycles.
- Share Buttons originally mapped only the registry-backed `.share-buttons`
  family without choosing between it and `.share`. ADR 0230 supersedes that
  boundary: public Share Actions uses one named `.share-buttons`
  inline/stacked group, canonical Button leaves, curated-plus-custom semantic
  action ids, capability omission and target-owned provider/result behavior.
- Related Articles exposes its heading and one-to-three curated Article Card
  collection. ADR 0199 plus owner decision 52 fix current/duplicate exclusion,
  curator order, no tag/personalized fallback, after-content/before-Comments
  placement, and no registered Previous/Next Article Navigation in v1. The
  adjacent `.article-nav` family is never L10.
- Comments exposes its heading, target-formatted count, target-owned thread, and
  optional target-owned composer. Sorting, reply behavior, authentication,
  moderation, optimistic updates, and count synchronization remain outside the
  neutral contract.
- Canonical Blog CSS adds box sizing, width and overflow containment, responsive
  stacking, visible focus, touch targets, and reduced-motion fallbacks using
  existing public tokens. It does not add tokens, product variants, or runtime
  behavior.
- All eleven contracts remain `pilot`. Structural validation is not a maturity
  promotion and the unresolved questions below must be answered before affected
  components can become `stable`.

## Unresolved Questions

This decision intentionally does not resolve:

- Whether Article Card skeleton presentation belongs to Article Card or the
  standalone Skeleton component.
- Reading Progress identity is resolved by ADR 0228 and Table of Contents state
  ownership by ADR 0270: L4 is decorative, L5 receives optional controlled
  `currentSectionId`, and a capable target derives both from one bounded shared
  reading-state service without a second L5 observer.
- Filter Bar identity, selection semantics and target query/result ownership are
  resolved by ADR 0229; final visuals and concrete target consumers remain open.
- Blog Sidebar composition is resolved by ADR 0198 and owner decision 51:
  navigation Topics use Link, Search appears only as a complete separately owned
  composition, Newsletter stays separate, and L8 adds no per-module root API.
- Which share family is canonical and which layer owns provider URLs, Web Share,
  copy feedback, and fallbacks.
- Related Articles source, limit, placement and Article Navigation boundaries
  are resolved by ADR 0199 and owner decision 52; real consumer placement,
  final visuals and explicit stability review remain pending.
- Comments structure, two-level flattening, valid empty state, oldest-first
  order, finite Pagination, controlled reaction arrays and target lifecycle
  ownership are resolved by ADR 0200 and owner decision 53. Real provider,
  authentication/moderation and final visual evidence remain target/human gates.

## Consequences

- Blog contracts now describe explicit editorial anatomy and adapter mappings
  without freezing target content models into root-level properties.
- Targets can consume useful pilot contracts while retaining ownership of CMS,
  taxonomy, reading-state, sharing, and comment integrations.
- Studio and documentation presentation can be added in a later pass without
  using fixture content as component defaults.
- Human review and resolution of the listed product boundaries remain required
  before any Blog contract is promoted to `stable`.
