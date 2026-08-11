# 0184. Passive Auth Shell And Target-Owned Authentication

Status: Accepted

Shopify architecture deferral superseded by ADR 0258: Shopify v1 uses current
customer-account authorization/API/extension profiles; classic Liquid is a
separately versioned compatibility adapter only.

Date: 2026-07-17

## Context

Auth Forms duplicated Input/Password, Button, Link, Divider, focus, motion, and
icon presentation inside Account Studio and Account CSS. Its contract described
generated divider lines and a bespoke social button, while the fixture's
credential fields were missing complete canonical composition and one native
field name. The name “Login / Register” also risked turning fixture flows into
an unsupported variant API.

ADR 0078 already keeps login versus registration in target composition. HTML
defines native autofill purposes such as `username` and `current-password`.
WCAG 2.2 Accessible Authentication supports password entry when users can rely
on labelled native controls, autofill/password managers, and paste. APG defines
no special authentication widget. Radix and Polaris expose composable form,
field, action, link, and feedback primitives rather than a universal auth state
machine. OWASP places generic responses, rate limits, and automated-attack
defenses in the application security lifecycle.

Shopify also has two materially different surfaces. Latest customer accounts
use Shopify-managed account UI/hosted authentication, while Liquid still
documents `customer_login`, `create_customer`, and recovery forms for classic
accounts. One working-looking Liquid form cannot represent both safely.

## Decision

- U1 is a passive authentication-entry shell, not an authentication system or a
  login/register mode switch.
- A non-empty visible `title` and complete canonical `form` slot are required.
  Invalid missing required content omits the complete shared renderer.
- The root is a native section labelled by its title. No authentication ARIA
  role, composite widget role, or custom keyboard model is introduced.
- The stable semantic properties remain `title`, `subtitle`, `form`,
  `forgotAction`, `dividerLabel`, `socialActions`, and `footer`. The accepted
  `socialActions` name remains for compatibility, but the slot may contain SSO,
  email-link, social-provider, or another target-owned alternative method.
- U1 composes canonical Form, Field Wrapper, Input, Password Input, Button, Link,
  and Divider. Account CSS owns only the narrow measure, flow, alignment, and
  spacing between those dependency-owned parts.
- Native fields retain one value/validity owner, labels, names, type,
  autocomplete, autofill, paste, submission, reset, and constraint validation.
  Password Input retains the one secret value and synchronized reveal action.
- Alternative authentication actions use canonical Buttons with `type=button`
  and method-specific names so they do not submit the credential Form.
  Recovery and account-mode destinations use canonical Links.
- Pending, disabled policy, generic server errors, announcements, focus after
  failure, retry, lockout/rate limiting, MFA/passkeys, provider redirect,
  credentials, sessions, authorization, analytics, and account-data access are
  target-owned. U1 adds no result live region or neutral runtime.
- Shopify U1 remains `planned` for target integration, but ADR 0258 resolves the
  architecture: v1 delegates to current Shopify-managed authorization and
  Customer Account API/extension profiles. Classic Liquid is not emitted as a
  universal customer-account implementation and requires a separately
  versioned compatibility adapter if maintained.
- The registered Figma nodes remain traceability only because they resolve to
  the generic Button Studio shell, not U1 artwork or visual approval.
- U1 remains `pilot`; implementation and evidence do not authorize `stable`
  without explicit human review.

## Consequences

- Exhibit and Studio can use one renderer and one fixture while the neutral
  source stays independent of React, Shopify, Figma, and provider SDKs.
- Dependency focus, hover, disabled, validation, forced-colors, reduced-motion,
  and controlled/uncontrolled contracts remain canonical instead of being
  reimplemented by Account.
- Static Web and framework targets can supply different auth flows without
  changing U1 anatomy or inventing flat provider/credential properties.
- Shopify target readiness is honest about the customer-account architecture;
  copied Account CSS alone cannot mark U1 ready.
- Human review still decides title hierarchy, maximum measure, page inset,
  alignment, divider treatment, optional-section rhythm, fixture content, and
  whether U1-specific owner artwork supersedes the neutral candidate.

## References

- <https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill>
- <https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://www.radix-ui.com/primitives/docs/components/form>
- <https://shopify.dev/docs/api/app-home/web-components>
- <https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html>
- <https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component>
- <https://shopify.dev/docs/api/liquid/tags/form#form-customer_login>
