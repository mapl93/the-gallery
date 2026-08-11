# 0187. Native Order Summary List And Target-Owned Status Truth

Status: Accepted

Date: 2026-07-17

Refined by: ADR 0261

## Context

Order History rendered separate Exhibit and Studio trees. MDX used a labelled
section, articles, native dates, Badge, hidden Link labels, and U4-specific
status modifiers. Studio used a section that could become unnamed, articles,
plain spans for dates, bespoke status classes without Badge, bespoke anchors
without canonical Link, and silently prevented navigation. Account CSS then
duplicated Link color/hover/focus, Badge radius/type/colors, target status names,
and both viewport and anonymous-container response.

WCAG Info and Relationships supports programmatic grouping for repeated
content, while Link Purpose favors meaningful destination text. Native `time`
preserves localized visible content and machine-readable date values. APG
defines no order-history widget; applying table/grid roles would introduce
relationships or keyboard behavior that this compact responsive summary does
not expose. Open UI treats list items as valid compound-content surfaces, and
Radix demonstrates composing metadata with canonical Link and Badge.

Shopify also has multiple non-interchangeable account surfaces. Latest customer
accounts provide a hosted Order index and extension targets independently of
themes. Headless implementations use Customer Account API state. Deprecated
theme compatibility can access `customer.orders`, order URLs, and localized
financial/fulfillment labels through Liquid, but that is not a current universal
theme implementation.

## Decision

- U4 is a passive order-summary list, not an order query, authentication,
  authorization, status normalization, formatting, routing, pagination,
  telemetry, or lifecycle controller.
- Stable semantic properties remain optional `label` and required `orders`.
  Repeated records, IDs, destinations, dates, statuses, Badge projections,
  totals, count, and order remain inside target-owned composition.
- A trimmed non-empty label selects `section.order-list[aria-label]`. Blank or
  omitted label selects an ordinary `div.order-list`; U4 never emits an unnamed
  section solely to preserve a tag.
- The collection is a native `ul` and every summary a native `li`. CSS grid
  areas are presentation only; U4 adds no table/grid role, roving tabindex,
  arrow-key model, or whole-row activation.
- Each order composes one descriptive native canonical Link, one `time` with
  `datetime`, one passive canonical Badge with readable target text, and one
  already-formatted total isolated bidirectionally.
- Canonical Link owns focus, hover, navigation semantics, forced colors, and
  reduced motion. Canonical Badge owns Info/Success/Warning/Error visuals.
  U4-specific status classes and duplicated dependency visuals are removed.
- Pending, shipped, delivered, cancelled, financial, fulfillment, return, and
  refund values are target truth, not U4 states. ADR 0261 requires the target to
  preserve separate source facts and author one truthful localized summary for
  the canonical Badge; richer status composition stays outside U4.
- Missing, empty, duplicated, or incomplete required order composition omits the
  complete renderer. Loading, empty, error, expired-session, refreshing,
  pagination, announcements, and focus policies remain target composition.
- U4 is a named inline-size container. Private one-, two-, and four-area layouts
  follow component width while DOM/reading/focus order stays number, date,
  status, total.
- The site fixture may intercept a real fixture Link and report demo navigation
  outside U4. Neutral U4 adds no runtime, callback state, or internal live region.
- Shopify remains `planned`. ADRs 0260 and 0261 resolve current hosted Order
  index handoff versus target-controlled extension/headless projection and
  separately versioned compatibility without treating them as parity.
- Registered Figma nodes remain traceability only because they resolve to the
  generic Button Studio shell, not U4 artwork or visual approval.
- U4 remains `pilot`; implementation and evidence do not authorize `stable`
  without explicit human review.

## Consequences

- Exhibit and Studio can share one renderer, fixture, DOM, semantic API, and
  canonical dependency composition.
- Link and Badge retain one implementation of interaction, visual semantics,
  tokens, forced colors, and reduced motion.
- Static Web and framework targets can supply different order schemas, status
  taxonomies, date/currency formats, destinations, and lifecycle coordinators
  without changing U4 anatomy.
- Shopify target readiness remains honest about hosted, extension, headless,
  and deprecated compatibility profiles.
- Human review still decides row density, separator treatment, typography,
  alignment, Badge projection, responsive thresholds, localized fixture copy,
  table versus list product needs, and target status mapping.

## References

- <https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships>
- <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/grid/>
- <https://open-ui.org/components/list.research/>
- <https://www.radix-ui.com/themes/docs/components/data-list>
- <https://shopify.dev/docs/apps/build/customer-accounts>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates>
- <https://shopify.dev/docs/api/liquid/objects/customer>
- <https://shopify.dev/docs/api/liquid/objects/order>
