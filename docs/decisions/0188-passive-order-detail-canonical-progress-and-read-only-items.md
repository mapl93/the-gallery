# 0188. Passive Order Detail With Canonical Progress And Read-Only Items

Status: Accepted

Date: 2026-07-17

Refined by: ADR 0262

## Context

Order Detail exposed the four semantic regions accepted by ADR 0078, but its
implementation had two independent docs trees and a second stepper system.
Studio rendered a section and `h2`; MDX rendered an article and `h1`. Both used
generic tracking divs, custom dots/connectors, U5-specific completed/current
classes, and duplicated colors, type, radius, geometry, and current-state
styling already owned by canonical Steps. Studio had also begun composing
canonical Cart Line Item while the MDX fallback serialized a separate fixture.

HTML ordered lists and `aria-current="step"` provide appropriate semantics for
an intentional stage sequence. APG and Open UI define no Order Detail or
Stepper widget requiring custom roles or keyboard behavior. WCAG supports
programmatically named sections and readable non-color relationships. Radix
demonstrates composing metadata with canonical leaves instead of flattening a
domain record into parent properties.

Shopify's modern Order status page is hosted independently of themes and owns
line items, fulfillment progress, customer/payment information, authentication
states, redaction, and defined extension targets. Legacy `customers/order`
Liquid templates are deprecated. A headless view or explicit legacy
compatibility profile remains possible, but those targets are not equivalent.

## Decision

- U5 is a passive single-order semantic section, not an order query,
  authentication/authorization gate, status state machine, tracker, formatter,
  router, refund/return controller, telemetry client, or lifecycle coordinator.
- Stable semantic properties remain required `title` and optional `meta`,
  `tracking`, and `lineItems`. Repeated order records and target lifecycle are
  not flattened into additional U5 properties.
- A trimmed non-empty title is required. It labels
  `section.order-detail[aria-labelledby]`; a missing title omits the complete
  renderer. Targets choose the heading rank appropriate to the page outline.
- Metadata remains target-owned semantic composition. Native `time[datetime]`,
  canonical Badge, or key/value content may be used when appropriate, but none
  becomes mandatory U5 anatomy through the fixture.
- Tracking is an optional canonical Steps composition. Registry and contract
  replace the unused Badge dependency with Steps. U5 removes its parallel
  `.order-tracking` anatomy, state classes, connectors, indicators, tokens, and
  styling.
- Targets supply finite ordered stages only when the provider exposes a
  trustworthy milestone model and project them to canonical completed/current/
  upcoming Steps. At most one is current; completion has non-color meaning. U5
  does not own a current index, stage inventory, mutation, navigation, or
  automatic progress calculation.
- ADR 0262 resolves non-linear or uncertain progress: omit Steps and render
  ordinary target-authored semantic status content rather than inferring a
  sequence from processing, fulfillment, shipping, pickup, return, partial,
  split, cancellation, or refund state.
- Purchased items use a non-empty native `ul` of canonical Cart Line Item
  records. Purchased quantity is readable detail text. Quantity Selector,
  remove, and save-for-later controls are omitted.
- Product destinations remain optional native Cart Line Item Links. Target
  routing owns navigation, history, focus, and feedback; the site fixture may
  intercept its real fixture URL and announce demo feedback outside U5.
- The U5 root is a named inline-size container. U5 CSS owns only section rhythm,
  title/metadata placement, a private header threshold, and containment.
  Canonical dependencies own their internals, responsiveness, focus, forced
  colors, motion, and visual tokens.
- Exhibit and Studio use one docs-only `OrderDetailArtwork`, the same fixture,
  DOM, omission rules, and contract controls. MDX retains only a canonical
  static fallback for environments without the shared renderer.
- U5 owns zero neutral JavaScript. Loading, redacted, unavailable, error,
  not-found, expired-session, live updates, formatting, announcements, privacy,
  analytics, and telemetry remain target composition.
- Shopify remains `planned`. ADRs 0260 and 0262 resolve hosted Order status
  handoff versus target-controlled extension/headless projection and separately
  versioned compatibility without treating them as parity.
- Registered Figma nodes remain traceability only because they resolve to the
  generic Button Studio shell, not U5 artwork or visual approval.
- This refinement advanced the contract to `0.2.0`; ADR 0262 later advances it
  to `0.3.0`. It remains `pilot`, and automated evidence cannot promote it to
  `stable` without explicit human review.

## Consequences

- Order Detail has one semantic shell and one implementation path across Exhibit
  and Studio while retaining target freedom for order schemas and disclosure.
- Canonical Steps and Cart Line Item own their existing anatomy, state visuals,
  tokens, accessibility, responsive behavior, and future target adapters.
- Deleting the second progress system recovers Account family performance room
  instead of spending the remaining budget on another responsive implementation.
- Targets can omit metadata, progress, or items independently without empty
  wrappers or synthetic status.
- Shopify readiness remains honest about hosted, extension, headless, and
  deprecated compatibility profiles.
- Human review still decides title/meta hierarchy, spacing, tracking density,
  narrow orientation/overflow, line-item density, visual values, fixture copy,
  target status truth, and corrected U5-specific design evidence.

## References

- <https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html>
- <https://www.w3.org/WAI/WCAG22/Techniques/general/G141>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element>
- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/TR/wai-aria-1.3/#aria-current>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://open-ui.org/components/>
- <https://www.radix-ui.com/themes/docs/components/data-list>
- <https://shopify.dev/docs/apps/build/customer-accounts/order-status-page>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/order-status>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates>
- <https://shopify.dev/docs/api/liquid/objects/order>
