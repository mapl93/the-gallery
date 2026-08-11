# ADR 0200: Finite Comment Thread And Target-Owned Discussion Lifecycle

- Status: Accepted
- Date: 2026-08-11
- Scope: L11 Comment Section
- Owner evidence: `docs/refinement/owner-decision-responses.md`, decision 53

## Context

L11 began as a visually threaded comment list with raw actions and a composer,
but its portable semantics and target boundary were incomplete. The unresolved
questions included empty presentation, maximum depth, order, pagination,
reactions, authentication, moderation and Shopify's flat native model.

WAI-ARIA APG Feed is not an appropriate default: it describes a scroll-driven
stream that automatically loads articles and requires focus, keyboard,
position, set-size and busy-state coordination. HTML already supplies durable
finite document semantics through a named section, ordered lists and one
article per user comment. Open UI, Radix and Polaris do not provide one
cross-target Comment service contract; their useful primitives remain
composable dependencies.

## Decision

### Neutral structure

- L11 is one fail-closed native `section` named by a non-empty visible heading.
  A non-null discussion slot is also required; missing either omits the root.
- A populated discussion is an `ol` of direct `li` items with one named native
  `article` per comment. L11 never adds Feed, custom collection focus or
  infinite-loading semantics.
- Every record supplies visible author, optional native time and target-
  sanitized content. Stable identity, privacy, localization, direction and
  trust policy remain target-owned.
- Canonical Avatar, Button, Empty State, Pagination, Select, Textarea and Toggle
  are dependencies. Their markup, focus and state contracts are not duplicated.

### Depth and replies

- At most two levels are visible: top-level comments and one nested ordered
  reply list.
- Provider descendants deeper than level two are flattened into that second
  list in authoritative order.
- Every flattened descendant receives visible localized reply-to context naming
  its immediate provider parent.
- Reply actions appear only when an authenticated target composer and
  moderation lifecycle exist. Flat targets may omit actions and nesting without
  fabricating unsupported relationships.

### Empty, order and pagination

- A resolved valid discussion with zero records composes canonical Empty State
  with truthful target copy. Its optional participation action appears only
  when an authenticated composer actually exists.
- Loading, provider error, moderation lock and unavailable are distinct
  target-owned page states, never aliases for empty.
- The default authoritative order is oldest first. An optional canonical Select
  may request another target-verified order; the target replaces the complete
  ordered record set. Neutral CSS and runtime never sort records.
- Long discussions compose finite numbered canonical Pagination. The target
  owns totals, current page, URLs, replacement, history, scroll, focus and
  announcements. Infinite Feed and unbounded insertion are outside v1.

### Reactions

- Every comment record accepts one ordered reaction array containing zero, one
  or multiple items. Each item supplies a stable id, complete localized
  accessible label, optional target-owned icon, optional authoritative count,
  selected state and availability.
- An empty array omits the entire reaction surface.
- Each item is a standalone canonical Toggle button with `aria-pressed`; the
  wrapper is not the exclusive `.toggle-group` because neutral reaction policy
  does not force exclusivity.
- Activation emits a request. The target returns the complete authoritative
  array and may preserve independent selections or atomically deselect other
  items for vocabularies such as Like/Dislike. No public `single | multiple`
  property exists.
- Authentication, permission, persistence, pending/error reconciliation, abuse
  policy and analytics remain target-owned. Optional icon/count never replace
  the required complete label.

### Public API and runtime

- Root properties are `title`, optional `count`, optional `orderControl`,
  required `thread`, optional `pagination` and optional `composer`.
- Reaction records live inside target thread data rather than becoming root
  presentation properties.
- L11 owns no neutral JavaScript, fetch, observer, storage, sort, pagination
  coordinator, mutation state or announcement.
- Section padding, reply inset, Avatar size, text measure, dividers and control
  gaps remain private composition details rather than public API.

### Shopify

- Shopify maps L11 through the article-only addable
  `platforms/shopify/sections/comments.liquid` section.
- It reads published `article.comments`, authoritative count and moderation
  state; composes canonical Empty State and shared Pagination; and uses the
  native `new_comment` form with exact author, email and body names plus
  localized errors and result feedback.
- Shopify's native comment object has no reply or reaction relationship, so the
  adapter is deliberately flat and emits neither behavior.

## Consequences

- Exhibit and Studio can demonstrate deep provider data while producing only
  two visible levels, and can exercise controlled arrays without inventing a
  fixed reaction vocabulary.
- Targets remain free to integrate different providers while preserving the
  same portable structure and canonical child contracts.
- The shared Shopify Pagination snippet is now the single Liquid projection for
  collection and comment pagination.
- ADR 0079's broad Comments behavior question is resolved by this decision;
  real provider/auth/moderation integration, final visual approval and explicit
  human stability review remain open.
- The contract remains `pilot`. Automated conformance never promotes L11 to
  `stable` without owner review.

## References

- [APG Feed pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/)
- [HTML article](https://html.spec.whatwg.org/multipage/sections.html#the-article-element)
- [Shopify article object](https://shopify.dev/docs/api/liquid/objects/article)
- [Shopify comment object](https://shopify.dev/docs/api/liquid/objects/comment)
- [Shopify form tag](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment)
