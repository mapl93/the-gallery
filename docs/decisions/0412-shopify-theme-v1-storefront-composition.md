# ADR 0412: Shopify Theme V1 Storefront Composition

Status: Accepted

Date: 2026-09-15

## Context

The owner asked to begin the Shopify storefront before the complete design-system
review finishes. The referenced Figma page supplies visual direction and layout
inspiration only. The Gallery repository remains authoritative for tokens,
typography, component contracts and generated target assets.

The storefront must therefore be useful with a deliberately small component
surface without promoting unfinished components, copying Figma values into
source, or forcing the future Work content model to be decided prematurely.

## Decision

- Build the first storefront as a Shopify Online Store 2.0 theme composition.
  Figma informs rhythm, hierarchy and image-led layout; it supplies no tokens,
  fonts, component API or data model.
- Migrate the global header and footer from static layout section calls to
  Shopify header and footer section groups. Existing section setting ids remain
  stable so Shopify can migrate saved static-section settings.
- Use Shopify's current `shopify-account` component whenever customer accounts
  are enabled. Do not recreate current account authentication or hosted account
  pages in theme Liquid.
- Preserve native navigation and form fallbacks. Search submits to Shopify's
  search route, product purchase retains the native product form, cart updates
  retain the native cart form, and every enhanced header action keeps a real
  destination when one exists.
- Add one target-owned overlay coordinator for Mobile Menu, Search and Cart
  Drawer. It owns mutual exclusion, focus containment, Escape and backdrop
  dismissal, focus restoration, scroll locking and inert background. It does
  not add predictive search, Ajax cart mutation or a second commerce model.
- Introduce storefront-only editorial compositions for the landing gateway,
  collection product tile, Search results, Work index and Journal index. The
  Journal article template composes the existing Article Hero, Article Body,
  Author Card, Related Articles and Comments surfaces. These compositions may compose
  canonical Gallery primitives and Shopify resources, but they are not new
  neutral component contracts or Product Card variants.
- Keep the existing canonical Product Card and its review history unchanged.
  The storefront's media-led product tile lets the site proceed while Product
  Card's final cross-target visual direction remains independently reviewable.
- Implement Work initially as merchant-curated section blocks referencing
  Shopify products, collections or editorial destinations. This creates a
  useful page template without selecting metaobjects, metafields or a permanent
  cross-resource taxonomy. A future data-model decision may replace the authoring
  source without changing the visible layout contract.
- Use The Gallery's existing public tokens and Shopify brand settings. Target
  CSS may own structural composition and private derivations but must not create
  a parallel public token catalogue.

## Boundaries

- This decision does not promote any Gallery component to `stable`.
- The storefront-only compositions do not enter `registry.json`, component
  contracts, Studio or Exhibit.
- Predictive search, Ajax add-to-cart, live cart section replacement, permanent
  Work records, review presentation and provider integrations remain separate
  target decisions.
- Local Liquid, schema and browser checks do not certify hosted Theme Editor,
  real catalog data, checkout, customer accounts or production performance.
  Upload, hosted QA and publication require their own authorized checkpoint.
- `settings_data.json` remains merchant/runtime state and is not canonical
  source.

## Consequences

- The website can be assembled and edited now with substantially fewer surfaces
  than the complete design system.
- The theme remains progressively functional without its optional overlay
  enhancement and avoids locking editorial work into an unreviewed CMS model.
- Header/footer composition follows Shopify's current section-group direction,
  while generated Gallery CSS and token outputs remain source-derived.
