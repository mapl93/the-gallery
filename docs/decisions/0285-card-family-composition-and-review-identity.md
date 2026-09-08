# 0285. Card Family Composition And Review Identity

Status: Accepted

Date: 2026-08-25

## Context

During Card's live human review, the owner asked whether every component named
as a card actually uses the canonical Card base. Product Card and Article Card
already composed it. Author Card duplicated its border and radius, while Artist
Card kept an independent flat shell. Review Card represented a complete review
record with rating, media, helpfulness, and reply behavior rather than a generic
surface.

The component family needs one structural rule without forcing unrelated domain
objects into Card anatomy or changing their meaning merely because their old
name contained “Card”.

## Decision

- Components whose identity is a specialized card surface compose canonical
  Card instead of duplicating its shell.
- Author Card always renders `.card.author-card`. Its Full presentation uses the
  default Card surface; Compact additionally renders `.card--flat` and keeps its
  semantic omission of biography and links.
- Artist Card always renders `.card.card--flat.artist-card`. Card owns the shared
  flat shell; Artist Card continues to own portrait, Badge, metadata, and its
  optional native interactive-root boundary.
- Product Card and Article Card retain their existing canonical Card
  composition. Product Card also retains its accepted stationary-surface
  override.
- Review Card is renamed to Review across registry, contract, canonical CSS,
  Exhibit, Studio, dossiers, reports, and generated adapters. Its stable
  registry identity `V4` is retained.
- Review deliberately does not depend on Card. It is a self-contained semantic
  review article with its own required Rating composition and optional review
  interactions, not a generic surface variant.
- Gift Card remains a commerce/product concept and is unaffected by the Card
  layout-family rule.
- No component is promoted to `stable` by this architectural decision.

## Consequences

- Author Card and Artist Card receive Card through their declared dependency
  closure in Neutral Web and Shopify outputs.
- Author Card no longer owns duplicate border and radius styling; its Studio
  panel no longer presents those Card-owned values as Author Card API.
- Artist Card preserves its current flat visual treatment while gaining a
  canonical base.
- Review becomes easier to understand as a domain component and no longer
  implies that its complex anatomy is merely a Card variant.
- Existing historical ADRs and audit records may retain the former Review Card
  wording when describing the state at that time; current source and active
  documentation use Review.
