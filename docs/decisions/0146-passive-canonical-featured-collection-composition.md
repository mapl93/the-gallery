# 0146. Passive Canonical Featured Collection Composition

Status: Accepted

Date: 2026-07-15

## Context

S2 Featured Collection exposed Grid, Carousel, and Spotlight presentation over
target-supplied products, but its implementation duplicated reduced Product Card
markup, grid geometry, and Carousel scrolling. The repeated region was an
unlabelled `div`; the thematic section could render without a heading; Studio
owned product ratio, columns, and breakpoints; fixture links were cancelled; and
Shopify had no dedicated section despite adapter documentation naming Featured
Collection as a priority Section Adapter.

Accepted Link, Carousel, Product Card, Product Slider, and Collection Grid work
already establishes the relevant ownership boundaries. HTML provides native
section/list semantics. WAI-ARIA Carousel guidance shows that autoplay and a
claimed slide engine add control, focus, pause, naming, and announcement duties.
The Gallery also requires composed components to consume canonical dependencies
and prohibits target queries or commerce state from entering neutral source.

## Decision

- Featured Collection is a passive, finite merchandising section. It requires a
  non-empty visible title and one or more target-supplied canonical Product
  Cards. Invalid empty input omits the section.
- The required title names both the thematic `section` and native `ul`; each
  product is wrapped by one `li` and contains exactly one canonical Product Card.
- The optional collection destination composes canonical Link and renders only
  from a complete label/destination pair.
- Grid composes canonical Collection Grid root/items/item classes. Carousel
  composes canonical Carousel root/track/slide classes as a focusable native
  multi-card scroll list. Spotlight is the only section-owned layout and gives
  the first supplied item more columns at wide component-container sizes.
- Carousel has no autoplay, loop, dots, previous/next controls, slide group
  semantics, transform track, second Arrow-key model, or neutral controller. A
  future controlled carousel requires composition with the accepted finite
  Carousel/Product Slider lifecycle and a new decision.
- The target supplies collection selection, product order, limit, money,
  availability, price freshness, commercial spotlight choice, loading, empty,
  error, analytics, and update announcements. Neutral CSS only projects the
  first supplied record; it never selects or reorders a product.
- Card density, Carousel basis, Spotlight spans, and responsive thresholds are
  private layout geometry. They are not public semantic properties or tokens.
- Exhibit and Studio use the same Sections renderer, six-item fixture,
  `ProductCardArtwork`, native list anatomy, dependency classes, destinations,
  and initial state. Site-only CSS may not implement S2 columns, Product Card
  ratio, Carousel behavior, or section breakpoints.
- Shopify owns a dedicated addable Section Adapter with a selected collection,
  title, presentation, target-only product limit, and view-all visibility. It
  renders the canonical Product Card snippet and localizes storefront/editor
  strings. The broader settings inventory in the early adapter documentation is
  not automatically public API; settings must pass the configurability test.
- The contract remains `pilot`. Automated evidence can prepare S2 for review but
  cannot approve its visual identity or promote it to `stable`.

## Consequences

- S2 declares Link, Carousel, Product Card, and Collection Grid dependencies and
  no longer maintains parallel leaf markup or behavior.
- Native list order, ordinary Product Card Tab order, direct scroll paths, RTL,
  reduced motion, forced colors, and dependency focus behavior remain intact.
- Web remains framework-free and adds zero component runtime or asset requests.
- Shopify becomes measurable through Liquid, schema, data, behavior,
  template-composition, and editor-preview layers without making Shopify
  collection objects part of the neutral contract.
- Human review must approve section rhythm, title/action hierarchy, Grid
  density, Carousel peek/affordance, Spotlight emphasis, and the inherited
  Product Card visual candidate.
- Commercial collection selection, sorting, spotlight order, personalization,
  loading/error UX, and data freshness remain explicit target/product questions.
