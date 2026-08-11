# Component Dossier: Auth Forms (Login / Register)

Status: `human-review-ready`

Target under review: Neutral Web authentication shell and Shopify current
customer-account delegation boundary

Contract: `components/contracts/auth-forms.contract.json`

## Recommendation

Define U1 as a narrow, passive authentication-entry shell that requires a
visible title and one complete canonical Form composition. Compose canonical
Input, Password Input, Button, Link, and Divider parts for the sign-in fixture;
do not copy their fields, focus, validation, reveal, navigation, or action
behavior into Account CSS. Keep login versus registration out of the variant
API, as required by ADR 0078.

The neutral shell should remain framework-independent and add zero shared
runtime. Targets own credentials, request/session state, generic server errors,
rate limiting, MFA or passkeys, provider handoff, routes, redirects, analytics,
and account access. Owner-selected U0-A/U1-A and ADR 0258 establish that Shopify
v1 delegates to current managed customer-account authorization, API, and
extension profiles. Classic customer Liquid, if maintained, is a separately
versioned compatibility adapter rather than a universal template or fallback.

Contract maturity remains `pilot`. The resolved architecture allows U1 to enter
human review, while final visual treatment and live target proof remain required
before Shopify readiness or `stable`.

## Purpose And Limits

- Presents a titled entry point for a target-owned authentication flow.
- Supports a complete primary Form, optional supporting copy, optional password
  recovery navigation, optional alternative authentication actions, and optional
  account-mode or legal footer content.
- Supports sign-in, registration, passwordless, SSO, or another target-authored
  flow through composition; it does not encode those flows as U1 variants.
- Is not an identity provider, credential store, session manager, password
  policy, user-enumeration defense, rate limiter, MFA challenge, passkey widget,
  captcha, account router, status announcer, or customer-data access gate.
- Is not Password Reset U2. U1 may link to recovery; U2 presents the separate
  recovery-request surface.
- Does not decide whether an authentication action submits locally, redirects,
  opens a target-controlled flow, or is managed outside the theme.

## Repository Baseline Before Refinement

- Registry U1 depends on Input, Button, and Form. It omits Password Input, Link,
  and Divider even though the canonical fixture needs all three.
- Contract `0.1.0`, `pilot`, declares eleven anatomy parts, one variant, one
  size, five CSS states, three behaviors, seven semantic properties, and
  seventeen public visual tokens.
- The contract describes generated pseudo-element divider lines and a bespoke
  `.auth__social-btn`, duplicating canonical Divider and Button.
- Account Studio contains a local `Field` helper. It renders password as a plain
  Input instead of canonical Password Input, copies auth buttons and links, and
  omits a native field `name` from the helper.
- The primary form uses only `.auth__form`, not canonical `.form`; the optional
  result message is a site-owned demo status and is correctly outside the U1
  contract but not yet clearly separated in shared artwork.
- Account CSS duplicates Button padding, border, radius, typography, hover,
  focus, icon geometry, motion, and Link color/decoration. It also generates
  divider rules instead of composing Divider.
- Physical spacing includes `8px`, `10px`, `12px`, `16px`, `20px`, `24px`, and
  `32px`; text uses calculated Body sizing rather than the stable Body Small
  tokens. The root uses physical `max-width` and padding properties rather than
  logical sizing.
- Existing Mobile/Desktop images show the main sign-in fixture and current
  visual baseline. They do not certify Tablet/XL, blank required content,
  optional-slot permutations, long/localized/unbroken content, RTL, effective
  200 percent, native submit/validation, password reveal, dark, forced colors,
  reduced motion, exact dependency composition, or full Exhibit/Studio parity.
- The registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
  inspector `1020:480` resolve to the generic Button Component Detail/Studio
  shell. They are not U1-specific artwork or owner approval.
- Shopify has source-identical Account CSS but no account Liquid/template data,
  behavior, editor mapping, or invocation. Its manifest correctly reports U1 as
  `css-ready`, `ready:false`.
- Deterministic level-9 baseline: U1 CSS slice `2,185 B` raw / `723 B` gzip;
  Account CSS `14,412 B` raw / `2,649 B` gzip against the permanent `3,072 B`
  family ceiling; generated Web component CSS `506,647 B` raw / `67,958 B`
  gzip against the existing `65,536 B` program ceiling; shared runtime
  `53,811 B` raw / `10,501 B` gzip. U1 adds no neutral runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) | Native form controls distinguish field type, input modality, and autofill purpose. `username` and `current-password` are established autofill tokens. | The composed fields keep native `type`, `name`, and `autocomplete`; U1 does not mirror values or suppress browser/password-manager behavior. |
| [WCAG 2.2 Accessible Authentication](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) | Password entry can satisfy accessible authentication when fields have correct names/purposes and password managers and paste are not blocked. | Keep visible labels, correct autocomplete, paste, reveal, and native keyboard behavior. Do not add cognitive tests or credential-entry restrictions to the base. |
| [WAI form checks](https://www.w3.org/WAI/test-evaluate/preliminary/#forms) | Controls need associated labels, keyboard access, visible required instructions, and discoverable text errors. | Compose canonical field labels and target-supplied error summaries/messages instead of putting validation in U1 CSS. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG lists widget patterns but no authentication-form widget; native form controls already carry the relevant roles and interaction. | Do not invent an ARIA `auth` role or composite keyboard model. Use a labelled section, native form, inputs, buttons, and links. |
| [Open UI component research](https://open-ui.org/components/) | Open UI researches individual controls rather than defining a consensus authentication shell. | Treat U1 as Gallery composition, not as an emerging platform widget with hidden state semantics. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Radix composes Root, Field, Label, Control, Message, ValidityState, and Submit; server validity remains input to the form parts. | Preserve dependency ownership and let target validation feed canonical fields/Form rather than flattening credential/error state into U1. |
| [Polaris Web Components](https://shopify.dev/docs/api/app-home/web-components) | Polaris exposes separate form fields, Button, Link, feedback, and status components rather than a universal Auth composite. | Keep the Gallery API at semantic regions and target composition, not every field/provider/internal state. |
| [Polaris Email Field](https://shopify.dev/docs/api/app-home/web-components/forms/email-field) | Email Field exposes label, name, autocomplete, required, value/defaultValue, and explicit error/help properties. | U1's fixture should use canonical field semantics; controlled/uncontrolled field state belongs to field/target adapters. |
| [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) | Authentication responses can leak account existence; throttling and layered automated-attack defenses belong to the application. | U1 must not synthesize provider-specific success/error truth. Targets author generic server responses and security controls. |
| [Shopify account component](https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component) | Shopify controls the account component for the latest customer accounts; legacy accounts link to a theme sign-in page. | A current Shopify adapter needs an explicit account-version strategy; classic Liquid is not a universal target implementation. |
| [Shopify Liquid form tag](https://shopify.dev/docs/api/liquid/tags/form#form-customer_login) | `customer_login`, `create_customer`, and `recover_customer_password` generate classic customer-account form endpoints and hidden fields. | If classic support is intentionally selected, use native Liquid form tags; do not hand-code actions or imply compatibility with managed accounts. |

The sources agree on native fields, visible labels, correct autofill, composable
form parts, target-owned validation/security, and no special ARIA auth widget.
They do not establish one universal login/register/provider API or one Shopify
account implementation.

## Matches, Differences, And Direction

- ADR 0078 already establishes title plus required Form and optional recovery,
  divider, social-auth, and footer regions; login/register remains composition.
- Keep the seven existing semantic properties to avoid an unsupported breaking
  rename. `socialActions` is retained as the accepted property name, while its
  description clarifies that targets may supply SSO, email-link, social, or
  other alternative methods.
- Require trimmed `title` and the Form slot. Invalid missing required content
  omits the complete artwork instead of rendering an unlabeled/empty shell.
- Render `section.auth[aria-labelledby]`; title owns the region name. Subtitle
  is supporting prose, not an accessible description automatically repeated on
  every field.
- Compose `.form.auth__form`, canonical Input, Password Input, Button, Link, and
  decorative Divider instances. U1 CSS owns only max measure, flow, alignment,
  and spacing between dependency-owned parts.
- The sign-in fixture uses `type="email"`, `name="email"`,
  `autocomplete="username"`, and a single password value owner with
  `name="password"`, `autocomplete="current-password"`, paste, and reveal.
- Site demo feedback remains outside U1. Production status/error presentation
  belongs to the target and canonical Form/field/Alert/Status composition.
- Remove bespoke social-button, link, focus, icon-size, and pseudo-divider CSS;
  dependency contracts remain authoritative for those states.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/canonical composition | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `section.auth[aria-labelledby]` | U1 region/flow |
| Header | yes | `header.auth__header` | U1 arrangement |
| Title | yes | heading `.auth__title` with stable id | U1 localized content |
| Subtitle | no | `p.auth__subtitle` | U1 supporting content |
| Form | yes | `form.form.auth__form` | canonical Form/native target submission |
| Fields | target composition | canonical Input and Password Input | dependencies/native controls |
| Recovery | no | `.auth__forgot` containing canonical Link | Link/target route |
| Primary action | target composition | canonical Button submitter | Button/Form |
| Method divider | no | `.auth__divider` with two decorative Dividers and visible label | U1 arrangement/Divider rules |
| Alternative actions | no | `.auth__social` containing canonical Buttons | Button/target provider handoff |
| Footer | no | `.auth__footer` with canonical Link/content | Link/target navigation/legal content |
| Result/error status | outside U1 | Form summary, field feedback, Alert, or Status | target lifecycle |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral shell. Login/register/passwordless/SSO are composed flows, not U1 variants. |
| Size | One intrinsic narrow profile with a private maximum measure; no public size option. |
| Required content | Non-empty title plus Form slot; missing either omits the complete renderer. |
| Supporting content | Subtitle present/absent; long/localized/mixed-direction text wraps. |
| Recovery | Canonical Link present/absent inside the Form. |
| Alternatives | Actions present/absent; optional readable divider label present/absent. |
| Footer | Supporting navigation/legal composition present/absent. |
| Field state | Default/error/success/warning, required/read-only/disabled, password revealed/concealed remain dependency states. |
| Submission | Idle/pending/succeeded/failed/locked/rate-limited/redirecting remain target states. |
| Environment | Mobile/Tablet/Desktop/XL, narrow container, effective 200%, LTR/RTL, light/dark, forced colors, reduced motion, keyboard-only. |

Invalid combinations include a blank title, missing Form, controls without
names in a submitted form, password Input duplicated beside Password Input,
links implemented as buttons or vice versa, alternative buttons that submit the
password form accidentally, provider-generic accessible names, nested forms,
target errors that disclose account existence, or a Shopify classic form
rendered for a managed customer-account architecture.

## Public API And State Ownership

- `title` — required non-empty visible authentication surface title.
- `subtitle` — optional supporting guidance.
- `form` — required complete canonical Form slot containing target-owned fields,
  validation, submission, and primary action.
- `forgotAction` — optional canonical Link composition for recovery navigation.
- `dividerLabel` — optional visible label separating the primary and alternative
  authentication methods; omitted when no label applies.
- `socialActions` — optional target-owned alternative authentication action
  composition; the accepted name is retained although methods need not be
  social providers.
- `footer` — optional supporting account-mode navigation or legal content.

U1 has no independent controlled/uncontrolled state. Native fields own static
Web values, validity, autofill, editing, submission, and reset. Stateful targets
may control those dependency APIs. The target owns pending/disabled policy,
generic server errors, result announcements, focus after failure, navigation,
provider redirects, session truth, and access to account data.

## Token, Hardcoded Value, And Runtime Audit

- Retain only U1-owned semantic text, typography, and spacing tokens. Button,
  Input, Password Input, Link, Divider, and Form retain their public tokens.
- Use private `--_auth-*` variables for max measure and internal flow aliases;
  do not expose a token for every spacing relationship.
- Replace calculated Body text with stable Body/Body Small tokens and logical
  sizing/margins. A private `440px` maximum measure remains ordinary component
  geometry unless human review establishes a reusable semantic width.
- Remove U1 transition, easing, radius, focus, border, surface, icon geometry,
  and social-button font weight declarations because canonical dependencies own
  them.
- Passive neutral runtime budget is `0 B`. U1 adds no listener, observer, timer,
  request, credential store, asset, provider SDK, or internal live region.
- Account CSS must stay at or below its permanent `3,072 B` gzip ceiling. The
  current permanent audit measures `2,857 B`, leaving `215 B` headroom. U1
  remains `2,326 B` raw / `662 B` gzip and adds zero neutral runtime.

## Responsive And Evidence Requirements

- Use logical sizing and intrinsic wrapping; no viewport breakpoint is needed
  inside U1. Field/Button/Link content must stay inside narrow containers.
- Test full, form-only, no-subtitle, no-recovery, no-alternatives, no-footer,
  blank-title omission, required Form omission, long localized copy, unbroken
  destination labels, RTL, 200px container, and effective 200 percent.
- Test native email/password labels/names/autocomplete, validation, Tab order,
  password reveal with click/Space/Enter, submit, provider buttons not
  submitting, Link navigation semantics, and site demo feedback outside U1.
- Capture Exhibit and Studio at Mobile, Tablet, Desktop, and XL plus focus,
  reveal, invalid submission, optional/minimal content, long/RTL/narrow, dark,
  forced colors, reduced motion, and effective 200 percent.

## Cross-Target Translation

| Target | Mapping | Status/gap |
| --- | --- | --- |
| Neutral Web | Labelled section plus canonical Form, fields, Buttons, Links, and decorative Dividers. | Implementable with zero U1 runtime; target owns authentication lifecycle. |
| Shopify current customer accounts | Shopify-managed authorization/account experience plus authenticated Customer Account API or extension profile. | Selected v1 direction; U1 does not render as a theme credential form. Live handoff/headless proof remains required. |
| Shopify classic customer accounts | Separately versioned compatibility adapter using native Liquid form tags, target errors, routes, and lifecycle. | Not part of Shopify v1 and never an automatic fallback. |
| Webflow / Framer | Canonical CSS projection and native form/actions connected to target auth service. | Visual composition available; credentials/security/session require target integration. |
| React / Angular / Hydrogen | Composed controlled or uncontrolled field/Form dependencies plus external request/session state. | Contract-ready; no framework dependency in base. |
| Figma | U1 frame composed from canonical field, Button, Link, and Divider instances. | Planned; registered generic Button nodes do not approve U1 visuals. |
| SwiftUI / Compose | Native secure/text fields, buttons, links/navigation, and target auth model in a labelled screen/section. | Conceptual; preserve native credential/autofill/accessibility behavior. |

## Risks, Alternatives, And Open Questions

1. Human review must approve maximum measure, page padding, heading hierarchy,
   alignment, optional-section rhythm, divider treatment, fixture copy, and the
   neutral candidate without U1-specific owner artwork.
2. Shopify must still prove a real current-account handoff, extension, or
   authenticated headless authorization/API consumer. The architecture is
   selected; target integration and its route/session/editor evidence are not.
3. Targets must define generic error language, pending/disabled behavior, focus,
   retry, lockout/rate-limit presentation, MFA/passkey progression, session
   redirect, provider availability, telemetry, privacy, and support escalation.
4. `socialActions` is an accepted but narrower property name than the actual
   alternative-method slot. Renaming it would be a breaking public-API decision;
   this batch keeps it and clarifies its meaning.
5. Provider logos are target-owned assets. Studio may use Lucide fixture icons,
   but they are not contract defaults or brand assets.

The accepted direction keeps the neutral shell with target composition.
Explicit login/register variants and a neutral auth state machine remain
rejected because they entangle flow/security architecture. Shopify current
accounts and classic Liquid remain separate adapter profiles rather than
interchangeable markup.

## Readiness Decision

The safe neutral implementation is complete, source-backed, evidenced, and now
`human-review-ready`. U0-A/U1-A resolve the Shopify architecture: v1 maps to the
current managed customer-account authorization/API/extension model, so no
theme-owned U1 credential form is emitted. Classic Liquid remains a separately
versioned compatibility adapter only.

Contract `0.3.0`, canonical composition, CSS, registry, Studio metadata, MDX,
adapter notes, four-viewport evidence, interaction/accessibility states,
performance measurements, generated copies, validations, and resource cleanup
are reconciled in `docs/reports/auth-forms-web-refinement-audit.md` and
`docs/reports/refinement-batch-93.md`. Batch 142 and ADR 0258 reconcile the
accepted target boundary without changing the neutral renderer or repeating
identical browser evidence. U1 remains `pilot`; final visual review, real target
lifecycle proof, and corrected U1-specific owner artwork remain explicit gates
before any `stable` promotion.
