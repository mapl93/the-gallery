# ADR 0258: Current Customer Account Target Boundary And Passive Auth Entry

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U0 Account family target boundary, U1 Auth Forms, Shopify current
  customer accounts, compatibility adapters, and future target translation
- Refines: ADRs 0078 and 0184

## Context

ADR 0184 establishes U1 as a passive, labelled authentication-entry shell and
correctly refuses to treat Shopify-managed current customer accounts and classic
customer Liquid as interchangeable markup. The remaining Shopify architecture
choice blocked U1 from entering human review even though its neutral renderer,
canonical dependencies, interaction evidence, and accessibility evidence were
complete.

The owner selected U0-A and U1-A. Targets exclusively own identity/account
services, and U1 remains one passive shell requiring a target-authored title and
one canonical Form composition. Sign-in, registration, MFA, passkeys, passwordless
and provider handoff are distinct target routes or flows rather than U1 visual
variants.

For Shopify v1, the owner selected the current Customer Account API and
extension model. Shopify's current documentation exposes an authorization
discovery/OAuth flow before authenticated Customer Account API access. Classic
`customer_login`, `create_customer`, and recovery Liquid forms belong to a
different account architecture.

## Decision

- Neutral U1 keeps its seven semantic properties, one labelled passive shell,
  canonical Form/field/Button/Link/Divider composition, zero U1 state machine,
  and `0 B` neutral runtime.
- Shopify v1 delegates authentication to Shopify-managed current customer
  account authorization and hosted account experience. A theme must link or
  hand off to that target flow; it must not render U1 as a fabricated local
  credential Form.
- An authenticated headless target may compose U1 before its own authorization
  handoff, but endpoint discovery, state/nonce, PKCE, token exchange, session,
  redirects, and protected Customer Account API operations remain target-owned.
  None becomes neutral U1 API or runtime.
- Customer Account UI extensions operate inside Shopify's target model. They do
  not turn the neutral U1 shell into a universal theme login template.
- Classic customer Liquid is outside the Shopify v1 adapter. If explicitly
  maintained later, it must be a separately versioned compatibility adapter
  with its own routes, errors, recovery, editor behavior, evidence, and
  deprecation policy.
- The Shopify U1 contract mapping remains `planned` / `ready:false` until a real
  current-account handoff, extension, or authenticated headless consumer is
  implemented and evidenced. The architecture is resolved even though the
  integration is not yet target-ready.
- U1 may enter human visual review because there is no remaining neutral or
  cross-target architecture decision. Its contract remains `pilot`; automated
  evidence and an intentional Shopify omission do not authorize `stable`.

## Accessibility And Security Boundary

- Neutral targets preserve visible labels, native names/types/autocomplete,
  paste, password managers, canonical password reveal, native validation,
  keyboard order, and target-authored generic errors.
- Shopify-hosted authorization owns credential entry and its accessibility,
  security, rate-limit, MFA/passkey, session, and redirect lifecycle.
- U1 never treats a visible shell or a successful submit event as authenticated
  identity. Protected customer data is available only from target-confirmed
  authenticated context.

## Consequences

- The Gallery does not ship obsolete classic-account markup as its primary
  Shopify v1 implementation.
- The same neutral shell remains useful for Webflow, Framer, React, Angular,
  Hydrogen, SwiftUI, Compose, and other target-authored authentication flows.
- Shopify target readiness stays honest: documented delegation is a correct
  translation boundary, but live authorization and post-authenticated API proof
  are still required.
- Future Account components can apply the same U0-A rule without reopening the
  managed-versus-classic decision. Each component still needs its own data,
  action, lifecycle, and human-review evidence.

## Not Approved

This decision does not approve:

- a theme-owned Shopify v1 credential Form, universal `customer_login` Liquid,
  or automatic classic-account fallback;
- credential, token, provider, session, MFA, passkey, authorization, protected
  data, or redirect properties in neutral U1;
- treating a Customer Account API query as authentication itself;
- a bundled provider SDK or brand asset in neutral source; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://shopify.dev/docs/api/customer/latest>
- <https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component>
- <https://shopify.dev/docs/api/liquid/tags/form#form-customer_login>
