# 0189. Passive Address Book As A Native Record List

Status: Accepted

Date: 2026-07-17

Refined by: ADR 0263

## Context

Address Book exposed the two semantic properties accepted by ADR 0078, but its
implementation had two independent docs trees and a second control/status
system. Studio rendered an unnamed section of articles and headings; MDX
rendered a different section, records, action inventory, heading rank, and SVG.
The default marker duplicated Badge typography and color. The add-address card
duplicated Button hover, focus, motion, typography, and icon geometry.

Saved addresses are one unordered collection of compound records. HTML provides
native `ul`/`li` semantics for that relationship. The HTML `address` element is
reserved for contact information for its nearest article or document and must
not be used for arbitrary postal addresses; ordinary paragraphs are the correct
base. APG defines no Address Book widget or custom keyboard model, while native
Buttons already provide action semantics and Enter/Space activation. Repeated
actions require distinguishable names that retain their visible labels.

Shopify latest customer accounts already include a hosted Addresses profile
surface. Its current extension point adds supplementary content after that
surface and does not render for B2B customers. Authenticated headless Customer
Account API mutations and explicitly versioned deprecated-account Liquid are
separate profiles, not interchangeable implementations.

## Decision

- U6 is a passive collection of target-owned saved-address records, not an
  authentication/authorization gate, query, formatter, validator, geocoder,
  mutation coordinator, confirmation dialog, router, live region, or telemetry
  client.
- Stable semantic properties remain required `addresses` composition and
  optional `newAddressLabel`. Recipient fields, record count/order, default
  index, action inventory, routes, and lifecycle are not flattened into U6
  properties.
- The renderer requires a non-empty complete collection with unique record
  identifiers, a non-empty recipient, one or more non-empty postal lines, and at
  most one target-authoritative default record. Invalid required content omits
  the complete renderer.
- The root is `ul.address-grid`; each saved record is `li.address-card`. U6 adds
  no `grid`, `listbox`, `option`, selection, or roving-tabindex semantics.
- Recipient and postal data use paragraphs. Recipient and each target-formatted
  line use `dir="auto"`; line spans preserve locale-specific composition and
  resilient wrapping. The HTML `address` element is intentionally omitted.
- A default record composes passive canonical Badge with visible target-owned
  text. At most one default is valid. U6 removes its custom marker typography,
  color, positioning, and default-border color.
- Record actions and the optional add-address entry point compose canonical
  native Buttons or Links. Repeated action names include their visible label
  plus record context. ADR 0263 defines Add/Edit, protected Delete, conditional
  Set Default, authoritative reconciliation, and target-owned disabled/busy,
  confirmation/undo, recovery, focus, and feedback behavior.
- A blank `newAddressLabel` omits the complete add list item. A non-empty label
  renders one final `li` containing a canonical action; fixture iconography is
  docs content, not target-agnostic API.
- Canonical Card is not composed in this profile. Its current whole-card hover
  lift would imply that a record containing nested controls is itself
  interactive. U6 owns only a static neutral record surface.
- The root is a named inline-size container with intrinsic auto-fit tracks.
  Track minimum and add-action minimum block size remain private composition
  variables. U6 owns no viewport breakpoint or local motion.
- Exhibit and Studio use one docs-only `AddressBookArtwork`, one fixture, one DOM
  tree, one omission policy, and the same contract controls. MDX keeps only a
  canonical static fallback for environments without the registered renderer.
- U6 owns zero neutral JavaScript. Loading, empty, unauthorized, redacted,
  expired, offline, pending, success, error, confirmation, recovery, privacy,
  announcements, analytics, and telemetry remain target composition.
- Shopify remains `planned`. ADRs 0260 and 0263 resolve hosted Profile/Addresses
  handoff versus target-controlled extension/headless projection and separately
  versioned compatibility without treating them as parity.
- Registered Figma nodes remain traceability only because they resolve to the
  generic Button Studio shell, not U6 artwork or owner visual approval.
- This refinement advanced the contract to `0.2.0`; ADR 0263 later advances it
  to `0.3.0`. It remains `pilot`, and automated evidence cannot promote it to
  `stable` without explicit human review.

## Consequences

- Address Book now has one semantic implementation across Exhibit and Studio,
  with native collection relationships and no duplicate component action state.
- Canonical Badge and Button own their existing visuals, keyboard behavior,
  focus, forced-colors behavior, reduced-motion policy, and future adapters.
- Targets retain freedom to model locale-specific addresses and valid action
  policies without teaching U6 a fixed commerce schema.
- Invalid collection input fails closed rather than exposing partial protected
  records or an empty semantic shell.
- Shopify readiness remains honest about hosted, extension, headless,
  deprecated, and B2B boundaries.
- Human review still decides record density, action policy, default wording,
  final visual values, long/localized address composition, delete recovery,
  target profile, and corrected U6-specific design evidence.

## References

- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element>
- <https://html.spec.whatwg.org/multipage/sections.html#the-address-element>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/button/>
- <https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/>
- <https://www.w3.org/WAI/WCAG22/Understanding/label-in-name>
- <https://open-ui.org/components/list.research/>
- <https://www.radix-ui.com/themes/docs/components/badge>
- <https://www.radix-ui.com/themes/docs/components/data-list>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/customer-account-profile-addresses-render-after>
- <https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/customer-accounts>
- <https://shopify.dev/docs/api/customer/latest/objects/mutation>
