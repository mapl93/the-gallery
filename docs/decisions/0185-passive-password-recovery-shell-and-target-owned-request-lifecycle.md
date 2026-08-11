# 0185. Passive Password-Recovery Shell And Target-Owned Request Lifecycle

Status: Accepted

Request/confirmation deferral and Shopify architecture are superseded by ADRs
0258/0259: the target selects mutually exclusive request or provider-confirmed
composition; Shopify v1 current customer accounts are passwordless, while
classic recovery is a separately versioned compatibility adapter.

Date: 2026-07-17

## Context

Password Reset duplicated Input markup and Alert-like success presentation in
Account Studio and Account CSS. Its submitted email field lacked a native
`name`, its root was not labelled by the visible title, and the Form did not
compose the canonical Form class. The Studio fixture replaced the request Form
with local success state even though `docs/OPEN-QUESTIONS.md` explicitly leaves
open whether request and success are mutually exclusive public states and which
layer owns that transition.

HTML already provides native email type, name, autofill, validation, submission,
and reset semantics. WCAG defines programmatically determinable status messages,
and canonical Alert already distinguishes static feedback from dynamically
inserted polite or assertive announcements. APG and Open UI define no special
password-reset composite widget. Radix and Polaris expose composable Form and
field parts. OWASP requires generic recovery responses, uniform timing, abuse
defenses, secure expiring single-use credentials, and no account mutation before
valid proof; those are service and target responsibilities rather than visual
component behavior.

Shopify also has materially different account surfaces. Latest customer
accounts operate independently of theme customer templates. Classic Liquid
supports `recover_customer_password` for the request step and a distinct
`reset_customer_password` form for the token-backed new-password step. A single
working-looking theme form cannot represent all account architectures safely.

## Decision

- U2 is a passive password-recovery request shell, not a recovery service,
  password-change form, or request/success state machine.
- Non-empty visible `title`, non-empty visible `text`, and a complete canonical
  `form` slot are required. Invalid missing required content omits the complete
  shared renderer.
- The root is a native section labelled by the title. No password-reset ARIA
  role, composite widget role, or custom keyboard model is introduced.
- The stable semantic properties remain `icon`, `title`, `text`, `form`, and
  `successMessage`. ADR 0259 makes Form and confirmed Alert mutually exclusive
  target compositions without adding `state`, `sent`, `loading`, `email`, or a
  neutral transition property.
- U2 composes canonical Form, Input, Button, and optional Alert. Account CSS
  owns only maximum measure, page inset, text flow, decorative-icon placement,
  and spacing between dependency-owned parts.
- Native Input retains one value/validity owner, visible label, submitted name,
  `type=email`, `autocomplete=email`, required semantics, autofill, editing,
  constraint validation, submission, and reset. Button remains the native
  submitter inside Form.
- `successMessage` is optional confirmed visible content. Targets compose it
  through canonical success Alert. Dynamic insertion uses polite status
  semantics; static feedback uses no live-region attributes. U2 does not move
  focus merely to announce ordinary success.
- The site fixture demonstrates target-confirmed replacement and moves focus to
  the Alert because the focused submitter is removed. It does not promote that
  target lifecycle to a public U2 property.
- The target owns pending/disabled policy, generic errors, request truth,
  uniform response timing, retry, rate limiting, abuse controls, account lookup,
  delivery, secure reset tokens, replacement/coexistence/navigation, focus,
  routes, privacy, telemetry, and analytics. U2 adds no neutral runtime.
- Shopify U2 remains `planned` for compatibility targets, while the v1 current-
  account profile intentionally omits it because passwordless customer accounts
  have no password reset. Classic request and token-backed reset forms are not
  conflated and require a separately versioned adapter.
- The registered Figma nodes remain traceability only because they resolve to
  the generic Button Studio shell, not U2 artwork or visual approval.
- U2 remains `pilot`; implementation and evidence do not authorize `stable`
  without explicit human review.

## Consequences

- Exhibit and Studio can use one renderer and one fixture while neutral source
  stays independent of React, Shopify, Figma, and account providers.
- Input and Alert retain canonical focus, validation, feedback, forced-colors,
  reduced-motion, and controlled/uncontrolled ownership instead of Account
  duplicating them.
- Static Web and framework targets can supply different recovery services and
  transition policies without changing U2 anatomy or inventing a flat state
  machine.
- Shopify target readiness remains honest about account architecture and the
  difference between requesting recovery and setting a new password.
- Human review still decides title hierarchy, maximum measure, page inset,
  alignment, illustration treatment, Form rhythm, Alert placement, fixture
  content, request/success policy, and whether U2-specific owner artwork
  supersedes the neutral candidate.

## References

- <https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill>
- <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://open-ui.org/components/>
- <https://www.radix-ui.com/primitives/docs/components/form>
- <https://shopify.dev/docs/api/app-home/web-components/forms/email-field>
- <https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates>
- <https://shopify.dev/docs/api/liquid/tags/form#form-recover_customer_password>
