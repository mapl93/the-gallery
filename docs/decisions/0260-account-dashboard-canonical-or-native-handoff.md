# ADR 0260: Account Dashboard Canonical Or Native Handoff

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U3 Account Dashboard and cross-target account-surface translation
- Refines: ADRs 0186 and 0258

## Context

ADR 0186 established Account Dashboard as a passive, labelled navigation
overview composed from canonical Card, Link, and optional Button. It correctly
kept customer data, authorization, routes, actions, privacy, and lifecycle out
of neutral source, but left the Shopify account profile unresolved.

The owner selected a canonical-or-native-handoff policy. Targets that control
their account view render authorized destination data through canonical U3.
Targets that own a non-replaceable account screen use that native surface,
document the limitation, and do not claim visual or functional parity.

Shopify's current theme entry is the Shopify-controlled `shopify-account`
component and its account sheet. Hosted account pages and Customer Account UI
extensions are platform surfaces, while custom storefronts can use the Customer
Account API to supply an independently controlled view. These are different
translation profiles, not interchangeable U3 markup.

## Decision

- U3 remains a canonical target-agnostic component. It is not removed merely
  because a platform-owned account screen cannot render its visual composition.
- A target-controlled account view projects a non-empty greeting, authorized
  destinations, real routes, privacy-safe copy, and optional semantic account
  actions through canonical U3 and its Card, Link, and Button dependencies.
- A platform-owned non-replaceable view uses the platform-native experience.
  Its adapter records intentional U3 omission or semantic handoff and must not
  claim renderer, DOM, visual, or full functional parity.
- Shopify v1 themes hand off to the controlled `shopify-account` sheet and
  hosted current-account pages. They do not emit a speculative Liquid clone of
  U3.
- A Shopify Customer Account full-page extension or headless storefront may
  project the U3 semantic contract only when that target owns the rendered
  view. It still uses target-native components, routes, authorization, data,
  privacy, and lifecycle behavior.
- Classic customer-account Liquid, if maintained, is a separately versioned
  compatibility adapter. It is neither the Shopify v1 default nor an automatic
  fallback.
- The Shopify adapter remains `planned` / `ready:false` until one of these real
  target profiles is implemented and evidenced. A correct native handoff is a
  documented translation boundary, not target implementation proof.
- Neutral U3 keeps the accepted three-property API (`greeting`,
  `headerActions`, `cards`), zero neutral runtime, and `pilot` status. Human
  visual review remains required before `stable`.

## Consequences

- Neutral Web and future target-controlled renderers keep one coherent Gallery
  identity and can share the same semantic component contract.
- Shopify themes use the supported current-account experience without shipping
  obsolete or misleading dashboard markup.
- Cross-target reports distinguish canonical projection, target-native handoff,
  and separately versioned compatibility instead of presenting them as parity.
- Target owners still define authorization, destination availability/order,
  personalization, sign-out, loading/error/expired state, redirects, privacy,
  analytics, and live integration evidence.

## Not Approved

This decision does not approve:

- customer/session data, route schemas, counts, loading states, or sign-out
  effects as new neutral U3 properties;
- a universal Shopify Liquid Account Dashboard;
- automatic classic-account fallback;
- a claim that Shopify-controlled account UI is visually equivalent to U3; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component>
- <https://shopify.dev/docs/apps/build/customer-accounts>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest>
- <https://shopify.dev/docs/api/customer/latest>
