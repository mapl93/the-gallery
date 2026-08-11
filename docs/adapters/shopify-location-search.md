# Shopify Location Search Boundary

Status: architecture and integration contract documented; live target pending

Components: D9 Pickup Location Selector and D9a Store Locator

Decision: ADR 0244

## Two Different Shopify Sources

Shopify's native `variant.store_availabilities` is a variant-scoped pickup
availability source. It can inform D9 for the selected variant and already
accounts for transfer-backed availability and pickup time. It is not a general
branch directory and cannot be the sole Store Locator source.

The base theme does not yet select a location provider or persistence contract.
Until those are chosen and exercised live, both adapter records remain planned.
CSS classes alone do not make either component target-ready.

## D9 Pickup Location Selector

The target integration must:

1. Bind results to the exact selected product, variant and current market.
2. Use a stable location id namespace owned by the connected integration;
   visible names or addresses are never identifiers.
3. Publish only eligible choices and preserve Shopify's own `available` and
   `pick_up_time` meaning, including transfer-backed results.
4. Submit manual search through the chosen geocoder/search service. Geolocation
   begins only after the explicit localized action.
5. Emit one selected stable id to the existing product/fulfilment coordinator.
   A variant or market replacement clears an ineligible choice before new
   results become interactive.
6. Persist pickup intent through an accepted app/provider, cart-line property,
   cart attribute, or checkout integration. The mechanism must be documented
   and verified; the theme must not invent one silently.
7. Never display selection as reserved stock or confirmed fulfilment. Product
   Form, Cart or Checkout owns provider confirmation, rejection and stale repair.
8. Render `.location-search.pickup-location-selector` and compose canonical
   Input, Button and Radio markup instead of copying controls.

The current Main Product coordinator already publishes selected variant and
market identity and replaces the bounded product region. D9 must consume that
one coordinator rather than add a second variant listener.

## D9a Store Locator

Store Locator needs a general location directory supplied by a Shopify app,
metaobject-backed source, Storefront integration, or another accepted provider.
It must not derive the directory from one variant's store availability.

The target owns branch query, geocoding, ordering, hours/services/contact data,
directions destinations, optional map credentials/tiles/attribution, loading,
empty/error/retry, stale suppression, privacy and analytics. Store Locator does
not write cart, customer, preferred-store or pickup-selection state.

## Optional Map

Both components may receive one synchronized target map. Map and list project
the same current location id. Provider load failure, denied geolocation, missing
credentials or usage-limit errors leave manual search and the list available.
Provider attribution remains visible as required.

## Required Live Evidence

- Selected-variant and current-market changes while an old request is in flight.
- Transfer-backed and ordinary eligible pickup records.
- Selection, change, invalidation and truthful Cart/Checkout confirmation or
  rejection without any reservation claim.
- Manual search, no results, provider error, retry and stale suppression.
- Geolocation support, grant, denial, timeout and error, with no prompt before
  the explicit action.
- General Store Locator data independent of a product variant.
- Optional map/list synchronization, attribution and map-failure fallback.
- Theme Editor add/remove/reorder, localization, repeated Section Rendering,
  keyboard/focus, mobile/desktop, forced colors and reduced motion.

## Official Shopify Evidence

- https://shopify.dev/docs/storefronts/themes/delivery-fulfillment/pickup-availability
- https://shopify.dev/docs/api/liquid/objects/store_availability
- https://shopify.dev/docs/api/storefront/latest/objects/StoreAvailability
