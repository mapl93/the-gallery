# 0130. Passive Container-Responsive Exhibition Page Composition

Status: Accepted

Date: 2026-07-14

## Context

ADR 0080 established Exhibition Page as a semantic hero and information
composition with target-owned featured-work and participating-artist slots. It
intentionally did not decide whether Product Card, Artist Card, links or another
component owns those records and interactions.

The initial candidate did not fully satisfy that boundary. Canonical CSS used a
viewport-height hero and viewport-width information breakpoint, while the docs
site overrode hero height, section padding and record columns. An embedded
`372px` candidate therefore retained a wide two-column layout when the page
viewport was wide. Optional hero media had no valid absent state: inverse Button
text remained on a transparent surface after the media and scrim disappeared.

The information layout was an untitled `section` with a hardcoded English
accessible name. Works used a generic grid in the shared renderer, MDX repeated
manual list roles, fixture artist portraits claimed fictional identities, and
the contract exposed unused Button/focus tokens. The registered Figma reference
contains the generic Button Studio pilot and no Exhibition Page artwork.

HTML, WAI and WCAG support a labelled article, native name-value/repeated-list
semantics, context-dependent image alternatives and reflow at narrow equivalent
widths. Open UI, Radix and Polaris do not establish an exhibition-specific Card
or activation contract. Shopify requires explicit template, section/block,
schema, image and record-model decisions rather than supplying a universal
exhibition data source.

## Decision

- The shared candidate is a heading-labelled `article.exhibition-page`. A full
  target page owns the surrounding `main` landmark and contextual heading level.
- The hero is required and has two truthful presentation states. Without media
  it uses the statement surface and primary text. With media, adapters apply
  `.exhibition-hero--with-media`, target media, a decorative private scrim and
  inverse text.
- Hero media remains a target-owned slot. Targets own source, intrinsic size,
  responsive candidates, loading priority, crop/focal policy and alternative
  text according to purpose.
- The optional information layout is a neutral `div`, not an untitled landmark
  with a hardcoded localized name. Metadata uses native `dl`/`dt`/`dd` markup.
- Works and artists use visible-heading sections when present. Repeated passive
  fixtures use native lists; target-owned interactive records retain their own
  native semantics, names, focus and activation.
- Product Card, Artist Card, links, actions, lightbox, filtering, commerce, CMS
  records and target events remain outside the neutral contract. No dependency
  is added while the accepted product boundary is open.
- The root establishes an inline-size container. Information layout responds to
  a private `44rem` component threshold; works and artist tracks use intrinsic
  bounded Grid. Responsive behavior no longer depends on page viewport or
  docs-only column overrides.
- Hero min/max height, narrow-container caps, container-relative scale, `20ch` title measure, scrim
  color, information ratio, `11rem` record-track minima, `3.5rem` compact
  avatar, letter spacing and micro-rhythm remain private compositional values.
  They are not public properties.
- Existing semantic surface, inverse/primary/secondary text, border, complete
  typography, layout spacing, full-radius and scrim-opacity tokens replace
  incomplete typography plus Button/focus token leakage.
- Fixture hero/work images may have truthful informative alternatives. Fixture
  artist portraits use empty alt because repository photography does not
  establish the fictional identities. Targets decide alt from actual purpose.
- Exhibit and Studio retain one renderer, fixture and exact initial DOM. The
  docs site may own artwork media and frame padding but not canonical layout.
- Shopify receives exact generated CSS and remains `css-ready`. A dedicated
  JSON template, sections/blocks, schema, dynamic sources, responsive media,
  editor behavior and work/artist models remain planned.
- The neutral component adds no JavaScript, focus stop, controlled/uncontrolled
  state, listener, observer, request or timer.
- Contract version advances to `0.2.0` and remains `pilot`. Automated evidence
  may make it ready for human review; only explicit human approval may promote
  it to `stable`.

## Open Human And Target Boundaries

This decision intentionally does not approve:

- formal Product Card or Artist Card composition and record interaction modes;
- universal links, actions, lightbox, filtering, commerce or page routing;
- the private hero height/crop/scrim/title measure, information ratio, section
  rhythm, track minima or compact artist-record visual direction;
- a structured cross-target date-range API or responsive media/focal contract;
- Shopify exhibition, work and artist records, page template, section/block
  schema, dynamic sources, editor settings or destination policy.

## Consequences

- Narrow embedded candidates reflow from their own width and no longer inherit
  a wide page layout.
- Optional hero media can be omitted without illegible inverse text or an empty
  media promise.
- Assistive technology receives a labelled article, visible-heading regions,
  native metadata and repeated lists without a hardcoded English landmark.
- Exhibit, Studio and neutral targets share canonical responsive authority;
  docs-only layout corrections can be removed.
- Future targets can compose accepted record components or native interaction
  without requiring the neutral page to predict that product decision.
- Shopify remains honestly incomplete until target data/editor architecture is
  accepted; generated CSS validation does not imply a sellable page template.
- Owner visual review and the unresolved dependency/data boundaries still block
  `stable`, even when all automated gates pass.
