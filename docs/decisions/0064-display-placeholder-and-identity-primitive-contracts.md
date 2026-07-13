# 0064. Display, Placeholder, And Identity Primitive Contracts

Status: Accepted

Date: 2026-07-12

## Context

Rating Stars, Loading Skeleton, Empty State, Divider, and Avatar had canonical
CSS, pilot contracts, and MDX examples, but no reviewed semantic properties or
interactive Studio definitions. Their source already established useful
presentation and composition boundaries, while several tempting controls were
not supported by a canonical mapping.

## Decision

- Rating Stars remains a passive display primitive. It exposes the required
  accessible label and optional localized review-count text. The target adapter
  owns conversion of rating data into filled, half-filled, and empty star
  anatomy; neutral web does not accept or parse a numeric rating value.
- Loading Skeleton exposes only its existing shape variant. Default dimensions
  remain composition-owned, and Studio dimensions are preview fixtures rather
  than public defaults. Individual shapes are decorative; the containing region
  owns busy or status announcements. Reduced-motion behavior remains canonical.
- Empty State exposes required title content plus optional message, decorative
  icon, and recovery-action slots. Actions compose Button or Link and do not
  create a local action style. Empty State represents resolved absence, not a
  loading state.
- Divider separates visual `variant`, `orientation`, and `semantics`. Default,
  Decorative, and Section control appearance or spacing; Horizontal and Vertical
  control the separation axis; Decorative and Structural determine whether the
  native separator is hidden from assistive technology.
- Avatar exposes only its four existing sizes. Image markup and initials are
  valid compositions, but image loading, initials derivation, and automatic
  fallback are not current component capabilities and are not exposed in Studio.
- No new component-scoped tokens are introduced. Studio exposes the semantic
  public tokens already referenced by canonical CSS.
- All sample copy, counts, star values, icons, actions, names, initials, and
  placeholder dimensions in Studio are fixtures, not component defaults.

## Consequences

- The five components now have conservative semantic property surfaces and
  interactive Studio evidence without inventing target behavior.
- Rating value generation and Avatar content fallback remain explicit future
  decisions if target-agnostic mappings are later required.
- The contracts remain `pilot` until owner review and browser evidence satisfy
  every neutral-web stable gate.
