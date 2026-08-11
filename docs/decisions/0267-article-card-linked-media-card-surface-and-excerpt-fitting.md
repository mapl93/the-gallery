# ADR 0267: Article Card Linked Media, Card Surface, And Excerpt Fitting

- Status: Accepted
- Date: 2026-08-10
- Owners: The Gallery
- Scope: L1 Article Card destination anatomy, loading, canonical Card
  composition, surface, and excerpt fitting
- Refines: ADR 0193

## Context

ADR 0193 established a passive native article summary but kept media outside
the only title Link, retained unresolved `.article-card--skeleton` presentation,
did not compose the accepted canonical Card surface, and prohibited source
clamping while the owner had not yet selected a fitting API.

The owner selected L1-A. The HTML anchor content model permits flow content but
forbids interactive descendants. CSS Overflow Level 4 defines `line-clamp` and
its legacy compatibility behavior. Canonical Card already owns surface,
border, radius, shadow, pointer-aware hover, descendant-focus clipping, and
reduced motion. Canonical Skeleton already owns loading presentation.

## Decision

- L1 is a native `article` composed on canonical `.card`.
- One native `.article-card__primary-link` contains contextual media, passive
  summary content, and the complete visible contextual title as one article
  destination. The root has no delegated click or keyboard behavior.
- The primary Link has no nested interactive descendants. Passive category
  Badge, author destinations, and any future independent actions remain outside
  it. Media never gains a duplicate destination.
- Category composes canonical passive Badge. Article Card owns only its
  placement outside the Link.
- Article Card composes canonical Card media/body/footer classes. Card retains
  ownership of surface, border, shadow, radius, color, pointer-aware hover,
  media treatment, focus-within clipping, and reduced motion.
- `surface` is an independent semantic axis with `default | flat | elevated`,
  defaulting to `default` and mapping to canonical Card variants.
- Existing `variant` remains the independent Article Card layout/profile axis:
  `standard | featured | minimal | horizontal | editorial`.
- `excerptLines` is `none | 2 | 3 | 4`, defaulting to `none`. Numeric values
  apply a visual CSS line clamp; the complete target-supplied excerpt remains in
  DOM and is never shortened or mutated by neutral source.
- Loading composes canonical Skeleton externally. Skeleton is replaced by
  Article Card when authoritative article data is ready. L1 exposes no loading
  variant, `aria-busy` lifecycle, or internal Skeleton markup; legacy
  `.article-card--skeleton` CSS is removed.
- Metadata remains target-formatted and passive inside the primary Link.
  Reading time is never inferred. Independent metadata/author destinations stay
  outside the Link.
- The shared docs renderer serves L1 and Related Articles. Shopify maps the same
  one-Link anatomy, layout, surface, excerpt fitting, Article resource fields,
  and optional parts without JavaScript.
- L1 remains `pilot`; explicit human review is required before `stable`.

## Consequences

- Media and title expose one unambiguous destination without duplicate Links or
  experimental whole-card JavaScript delegation.
- Article Card no longer shadows Card or Skeleton ownership.
- Surface and layout are independently configurable without multiplying
  combined variants.
- Consumers can request bounded editorial fitting while keeping authoritative
  source content intact.
- Author or future action Links can remain valid siblings instead of invalid
  interactive descendants.

## Not Approved

This decision does not approve:

- root click forwarding, stretched-link overlays, or custom Link keyboard code;
- nested Links, Buttons, or other interactive descendants inside the primary
  Link;
- duplicate media and title destinations;
- Article Card-owned surface tokens or copied Card visual rules;
- an internal loading/busy state or `.article-card--skeleton` variant;
- inferred reading time, destructive excerpt mutation, or automatic clamps;
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://html.spec.whatwg.org/dev/text-level-semantics.html#the-a-element>
- <https://www.w3.org/WAI/WCAG22/Techniques/html/H2>
- <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- <https://drafts.csswg.org/css-overflow-4/#line-clamp>
- <https://open-ui.org/components/card.research/>
- <https://www.radix-ui.com/themes/docs/components/card>
- <https://shopify.dev/docs/api/liquid/objects/article>
