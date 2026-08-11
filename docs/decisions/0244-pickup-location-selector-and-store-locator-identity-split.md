# 0244. Pickup Location Selector And Store Locator Identity Split

Status: Accepted

Date: 2026-07-20

## Context

The provisional D9 implementation was a passive Accordion containing a short
pickup-availability snapshot. During owner review, D9-C was selected instead:
the product surface must find and choose an eligible pickup location, while
general branch discovery must remain possible without product context.

Conflating those jobs would make a general locator mutate transaction state or
make the product selector carry unrelated preferred-store and discovery policy.
Both need manual search, optional explicit geolocation, list-first results, an
optional synchronized map, and the same target-owned location/search services.

Native HTML search forms, Fieldset/Radio selection and ordinary list/article/
Link semantics cover the required Web behavior. WAI-ARIA APG defines one-value
Radio Group keyboard behavior and names. W3C Geolocation requires express user
permission. Open UI and Polaris location/search evidence support typed filtering
but do not require a popup listbox for rich records containing multiple details
and actions. Shopify exposes variant-scoped `store_availability`; that source is
not a general store directory and selection is not an inventory reservation.

## Decision

- Rename D9 to `Pickup Location Selector` with canonical slug
  `pickup-location-selector` and root `.pickup-location-selector`.
- Add `Store Locator` as related registry id `D9a`, canonical slug
  `store-locator`, and root `.store-locator`.
- Keep both in the Product family for dependency order, shared CSS distribution,
  and location-service traceability; Store Locator itself requires no product.
- Both compose canonical Input and Button. Pickup Location Selector additionally
  composes canonical native Radio; Store Locator composes canonical Link.
- Manual address, city, region, or postal-code search is always complete.
  Geolocation is optional and can begin only after an explicit localized action.
- Pickup Location Selector receives target-ordered eligible records for the exact
  current product, variant, and market. One `selectedLocationId` emits pickup
  intent to the shared product/fulfilment coordinator.
- Pickup intent never reserves inventory or promises fulfilment. Product Form,
  Cart, or Checkout confirms, rejects, or repairs stale intent truthfully.
- Store Locator is discovery-only. It presents branch identity, address, hours,
  services, contact and explicit target-owned directions. It neither chooses a
  transaction location nor stores a temporary/account preferred store.
- A synchronized map is an optional progressive slot. List and map share current
  identity, but the complete list remains available under map absence/failure.
- Targets own provider models, geocoding, geolocation permission and privacy,
  map tiles/credentials/attribution, ordering, requests, cancellation, retries,
  stale suppression, result status, localization, navigation and analytics.
- Exhibit and Studio use one `LocationStudio`, shared fixture and the same two
  composed renderers. React remains a docs target rather than canonical source.
- Both contracts remain `pilot`; automated and visual evidence cannot promote
  either to `stable` without explicit human review.

## Consequences

- ADR 0215 is superseded and the passive `.store-pickup`/Accordion identity is
  removed rather than retained as an alias or parallel implementation.
- The registry temporarily gains one identity through the split. ADR 0245 removes
  duplicate Certificate Details in the same migration, preserving 183 components.
- Web has coherent search, result and selection presentation without neutral
  provider runtime. Stateful targets expose controlled query/status and, for D9,
  one controlled selected location id; static Web may use native form submission.
- Shopify translation remains truthful: native variant availability can inform
  D9, but intent persistence/confirmation and a general location source still
  require target-native integration and live proof.

## References

- WAI-ARIA APG Radio Group: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
- HTML Standard: https://html.spec.whatwg.org/
- W3C Geolocation: https://www.w3.org/TR/geolocation/
- Open UI Combobox explainer: https://open-ui.org/components/combobox.explainer/
- Radix Radio Group: https://www.radix-ui.com/primitives/docs/components/radio-group
- Shopify pickup availability: https://shopify.dev/docs/storefronts/themes/delivery-fulfillment/pickup-availability
