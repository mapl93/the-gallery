# 0186. Passive Account Navigation Shell And Target-Owned Account Data

Status: Accepted

Date: 2026-07-17

Refined by: ADR 0260

## Context

Account Dashboard rendered an unlabelled section, a generic div collection,
bespoke account-card surface and Link behavior, and a working-looking no-op Sign
out Button. Registry declared no dependencies even though the artwork used
Button classes and reproduced Card/Link tokens, hover, focus, and motion. Its
responsive tracks were controlled by viewport breakpoints rather than component
width.

WAI page-structure guidance favors named regions, logical headings, and native
content relationships. WCAG Link Purpose requires destination names that are
meaningful alone or in programmatic context. APG defines no account-dashboard
widget; applying `role=grid` would introduce a composite keyboard model that a
visual card grid does not need. Radix groups related content/actions through
Card, while Polaris distinguishes page-level headings/actions from Sections,
Links, and Buttons.

Shopify's current account architecture also is not one theme-owned dashboard.
The Shopify-controlled account component opens a menu sheet with hosted Orders
and Profile destinations. Current customer accounts expose hosted pages and
extension targets; headless implementations use a separate account API. Legacy
theme accounts are deprecated and remain only a compatibility concern. Those
surfaces cannot be represented honestly by one copied U3 Liquid template.

## Decision

- U3 is a passive account-navigation overview, not an authentication, customer
  query, router, session, sign-out, or personalization controller.
- A non-empty visible `greeting` and a complete non-empty `cards` composition
  are required. Missing required content omits the complete shared renderer.
- The root is a native section labelled by its visible greeting/title. The
  heading level follows page context and is not a visual variant property.
- The stable semantic properties remain `greeting`, `headerActions`, and
  `cards`. Repeated records and dependency-owned controls remain inside slots;
  no customer, route, count, column, loading, or sign-out property is added.
- The destination collection is a native list. CSS grid is presentation only;
  no `role=grid`, roving tabindex, or directional keyboard model is introduced.
- U3 composes canonical Card, Link, and Button. Each destination is a native
  list item with Card body/footer anatomy and one explicit meaningful Link.
  Account CSS does not duplicate Card surface/motion or Link/Button states.
- Icons remain decorative target/site assets. Lucide is a Studio fixture source
  and is not added to the neutral contract.
- U3 becomes a named inline-size container. One/two/three-track presentation is
  private responsive composition, not a public columns API.
- The site fixture may report account-action and navigation activation outside
  U3, but no neutral runtime or working-looking no-op behavior is added.
- Targets own authentication, authorization, customer data, destination schema,
  availability/order/routes, loading/errors, sign-out, session expiry,
  personalization, privacy, telemetry, analytics, and support flows.
- Shopify U3 remains `planned`. ADR 0260 resolves the profile policy: current
  theme surfaces use truthful native handoff, while target-controlled extension
  or headless views may project the canonical semantics. These profiles are not
  interchangeable and do not imply parity or target readiness.
- The registered Figma nodes remain traceability only because they resolve to
  generic Button Studio, not U3 artwork or visual approval.
- U3 remains `pilot`; implementation and evidence do not authorize `stable`
  without explicit human review.

## Consequences

- Exhibit and Studio can share one renderer and fixture while neutral source
  remains independent of React, Shopify, Figma, and account providers.
- Card, Link, and Button retain canonical surface, focus, pointer, forced-color,
  reduced-motion, and action/navigation ownership.
- Static Web and framework targets can supply different account data, routes,
  and actions without changing U3 anatomy or introducing a flat state machine.
- Shopify target readiness remains honest about native handoff,
  target-controlled extension/headless projection, and separately versioned
  deprecated compatibility profiles.
- Human review still decides greeting hierarchy, page inset, density, Card
  treatment, track thresholds, icon treatment, link rhythm, fixture content,
  full-card versus explicit-Link interaction, and target mapping.

## References

- <https://www.w3.org/WAI/tutorials/page-structure/>
- <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/grid/>
- <https://open-ui.org/components/>
- <https://www.radix-ui.com/themes/docs/components/card>
- <https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page>
- <https://shopify.dev/docs/api/app-home/web-components/actions/link>
- <https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component>
- <https://shopify.dev/docs/apps/build/customer-accounts>
- <https://shopify.dev/docs/api/liquid/objects/routes>
