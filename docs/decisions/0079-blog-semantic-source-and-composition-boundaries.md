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
- Table of Contents exposes in-flow and sticky presentation, an optional title
  and accessible label, and target-owned heading items. Heading extraction and
  active-section synchronization remain target-owned.
- Author Card exposes full and compact presentation, author text, optional
  Avatar composition, and target-owned profile or social links.
- Category Nav exposes an accessible region label and target-owned category
  items. It does not decide whether items navigate or filter in place.
- Blog Sidebar exposes target-owned repeated sections rather than separate
  search, category, recent-post, and tag APIs.
- Share Buttons maps only the registry-backed `.share-buttons` inline and sticky
  classes and exposes target-owned actions. This does not select a canonical
  family between `.share-buttons` and `.share` or assign provider behavior.
- Related Articles exposes its heading and Article Card collection. The adjacent
  `.article-nav` family is not added to its semantic property surface.
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
- Whether Reading Progress and Table of Contents calculate reading state in a
  shared neutral enhancement or receive state from each target, and whether
  Reading Progress is semantic or decorative.
- Whether Category Nav navigates to category pages or filters the current result
  set and which layer synchronizes URLs and results.
- Whether Blog Sidebar composes Input and Tag or owns independent search and tag
  APIs.
- Which share family is canonical and which layer owns provider URLs, Web Share,
  copy feedback, and fallbacks.
- Whether `.article-nav` belongs to Related Articles or becomes a separate
  registered component.
- Which Comments behaviors belong to the neutral component and which belong to
  targets.

## Consequences

- Blog contracts now describe explicit editorial anatomy and adapter mappings
  without freezing target content models into root-level properties.
- Targets can consume useful pilot contracts while retaining ownership of CMS,
  taxonomy, reading-state, sharing, and comment integrations.
- Studio and documentation presentation can be added in a later pass without
  using fixture content as component defaults.
- Human review and resolution of the listed product boundaries remain required
  before any Blog contract is promoted to `stable`.
