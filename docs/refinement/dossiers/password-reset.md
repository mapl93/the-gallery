# Component Dossier: Password Reset

Status: `human-review-ready`

Target under review: Neutral Web password-recovery request/confirmation shell
and Shopify current-account omission boundary

Contract: `components/contracts/password-reset.contract.json`

## Recommendation

Define U2 as a narrow, passive password-recovery shell with a required visible
title, required guidance, and an optional passive illustration. Owner-selected
U2-A and ADR 0259 establish mutually exclusive target-controlled compositions:
the request uses canonical Form, Input, and Button; provider-confirmed feedback
replaces it with canonical Alert. Preserve the five semantic properties and do
not invent a public `state` or `success` boolean API.

The neutral shell remains framework-independent and adds zero shared runtime.
Targets own request state, loading, failure, retry, rate limiting, abuse
defenses, account lookup, email delivery, reset tokens, routes, and focus after
replacement. Shopify v1 intentionally omits U2 because current customer
accounts use passwordless authentication. Classic recovery and token-backed
reset belong only to a separately versioned compatibility adapter.

Contract maturity remains `pilot`. The accepted policy makes U2 ready for human
review; final visual treatment and live provider/target evidence remain required
before Shopify readiness or `stable`.

## Purpose And Limits

- Presents a titled surface where a user can request password-recovery
  instructions using the identifier required by a target.
- Supports a complete target-owned request Form and optional confirmed feedback.
- Supports a passive decorative illustration that does not communicate state
  or become part of the accessible name.
- Is the request step, not the password-change step reached through a valid
  token. New-password and confirmation fields belong to a separate target flow.
- Is not an identity provider, account existence oracle, email sender, reset
  token generator, password policy, rate limiter, captcha, abuse detector,
  session manager, account router, or authentication state machine.
- Requires request Form and provider-confirmed Alert to be mutually exclusive,
  while the target owns provider truth, timing, replacement, and focus.
- Does not prescribe provider-specific success/error copy or expose whether a
  supplied identifier belongs to an account.

## Repository Baseline Before Refinement

- Registry U2 depends only on Input and Button. It omits canonical Form and
  Alert even though the fixture contains a native form and bespoke success
  feedback.
- Contract `0.1.0`, `pilot`, declares six anatomy parts, one variant, one size,
  two states, two behaviors, five semantic properties, and eleven public visual
  tokens.
- Account Studio contains a local `Field` helper that repeats Input markup and
  omits the submitted field `name`. Its U2 form uses only
  `.password-reset__form`, not canonical `.form`.
- Account Studio replaces the form from local React state and renders success
  as a bespoke `div[role=status]`. This fixture behavior risks being mistaken
  for a public mutually-exclusive state even though the product boundary is
  unresolved.
- Account CSS duplicates Alert padding, tint, border radius, success text
  derivation, and type. It uses physical `max-width`, width, height, margin and
  padding, plus hardcoded `8px`, `12px`, `16px`, `24px`, `48px`, and `440px`.
- The root is not labelled programmatically by its visible title. Title and
  guidance omit the stable line-height tokens.
- Existing Mobile/Desktop images show the request fixture and apparent Exhibit/
  Studio visual alignment. They do not certify Tablet/XL, DOM identity,
  required-content omission, form omission, success insertion, native
  constraint validation, FormData, focus, long/localized/unbroken content,
  RTL, 200px containers, effective 200 percent, dark, forced colors, reduced
  motion, or dependency composition.
- The registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
  inspector `1020:480` resolve to the generic Button Component Detail/Studio
  shell. They are not U2-specific artwork or owner approval.
- Shopify has source-identical Account CSS but no selected account template,
  Liquid form, data/error mapping, behavior, or editor invocation. Its target
  status must distinguish current managed accounts from classic accounts.
- Deterministic level-9 baseline: U2 CSS slice `966 B` raw / `402 B` gzip;
  Account CSS `14,532 B` raw / `2,826 B` gzip against the permanent `3,072 B`
  family ceiling; generated Web component CSS `506,767 B` raw / `68,066 B`
  gzip against the existing `65,536 B` program ceiling; shared runtime
  `53,811 B` raw / `10,501 B` gzip. U2 adds no neutral runtime.
- Baseline files and SHA-256 values are
  `password-reset-exhibit-mobile.png`
  (`99e6c10beca1bcecde3b17cbc60b13020bdb9079c8c8d194ad1bf1c67a4010fa`),
  `password-reset-studio-mobile.png`
  (`e1ec008513c375d639fed712863ea10da6ddc1c3a374b625027d8a82d5b3039e`),
  `password-reset-exhibit-desktop.png`
  (`7b11ed75c59df9968e1693a24c209a5920ff93bf85853bc6b9770df1efb6973b`),
  and `password-reset-studio-desktop.png`
  (`826f993ca9ff34d1cf0027737b28a4526277c7fe733d721342b34157ac01ae11`)
  under `output/playwright/parity/account/`.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) | Native controls distinguish field type and autofill purpose; `email` is a defined autofill field name. | Keep native `type=email`, submitted `name`, `autocomplete=email`, editing, validation, and browser autofill in canonical Input. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Success feedback inserted after an action can use `role=status` without receiving focus. Assertive announcements are inappropriate for ordinary non-urgent success. | Confirmed feedback composes Alert with polite announcement only when dynamically inserted; do not move focus merely to announce it. |
| [WAI form notification](https://www.w3.org/WAI/tutorials/forms/notifications/) | Users need concise, clear result feedback after form submission, including success and error outcomes. | Target errors remain connected to canonical fields/Form; confirmed request feedback remains visible text rather than color or icon alone. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines form controls and Alert but no password-reset composite widget. | Use a labelled section, native Form, Input, Button, and Alert; invent no reset role or composite keyboard model. |
| [Open UI component research](https://open-ui.org/components/) | Open UI researches individual controls and does not define a consensus password-reset shell. | Treat U2 as Gallery composition and keep target lifecycle outside the neutral component API. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Radix composes Root, Field, Label, Control, Message, validity, and Submit; native and server validation feed those parts. | Preserve Form/Input ownership instead of copying a field or flattening target errors into U2. |
| [Polaris Email Field](https://shopify.dev/docs/api/app-home/web-components/forms/email-field) | Email Field exposes label, name, autocomplete, required, value/defaultValue, help, and explicit errors. | The fixture uses canonical Input with a visible label and native submitted semantics; value ownership remains target/dependency state. |
| [OWASP Forgot Password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) | Recovery requests should return consistent messages and timing, resist excessive submissions, and send random, expiring, single-use credentials through a side channel. | U2 copy must not disclose account existence. Timing, rate limits, delivery, tokens, and account mutation remain target security responsibilities. |
| [Shopify theme templates](https://shopify.dev/docs/storefronts/themes/architecture/templates) | Latest customer accounts operate independently of themes; customer login/reset templates are no longer required for that architecture. | Do not fabricate a universal theme-owned U2 implementation for managed accounts. |
| [Shopify Liquid form](https://shopify.dev/docs/api/liquid/tags/form#form-recover_customer_password) | Classic `recover_customer_password` generates the `/account/recover` request form; `reset_customer_password` is the distinct new-password step. | If classic support is selected, map U2 only to the recovery request form and keep token-backed password replacement outside U2. |

The sources agree on native labelled email submission, visible result feedback,
polite dynamic success semantics, generic non-enumerating copy, composable form
parts, and target-owned security/lifecycle. They do not establish one universal
request/success replacement policy or one Shopify account implementation.

## Matches, Differences, And Direction

- Keep the five accepted semantic properties: `icon`, `title`, `text`, `form`,
  and `successMessage`. Do not add a public `state`, `sent`, `loading`, or
  `email` property while the source decision is open.
- Require trimmed `title` and `text`. A request rendering additionally requires
  the Form slot; invalid missing required request content omits the complete
  shared artwork.
- Render `section.password-reset[aria-labelledby]`; the title owns the region
  name. Guidance remains visible supporting prose rather than being repeated as
  an automatic accessible description on the email field.
- Compose `.form.password-reset__form`, canonical Input and canonical Button.
  The fixture uses `type=email`, `name=email`, `autocomplete=email`, and
  `required`.
- Compose `.alert.alert--success.password-reset__success` for confirmed visible
  feedback. When inserted dynamically, its announcement is polite. U2 CSS owns
  placement only; canonical Alert owns feedback color, border, type, radius,
  wrapping, and announcement mapping.
- Keep the optional icon decorative and site-fixture-only. Lucide remains a
  Studio source and is not added to the target-agnostic contract.
- Account CSS owns only maximum measure, page inset, text alignment, heading/
  guidance flow, icon placement, and spacing between canonical dependencies.
- The shared site fixture demonstrates confirmed feedback coexisting with the
  request Form after a valid submit. Docs and the contract label that relation
  as target-owned fixture behavior, not a public U2 mode or universal policy.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/canonical composition | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `section.password-reset[aria-labelledby]` | U2 region/flow |
| Icon | no | passive `.password-reset__icon[aria-hidden=true]` | U2 placement; target/site asset |
| Header | yes | `header.password-reset__header` | U2 arrangement |
| Title | yes | heading `.password-reset__title` with stable id | U2 localized content |
| Guidance | yes | `p.password-reset__text` | U2 supporting content |
| Request Form | required for request rendering | `form.form.password-reset__form` | canonical Form/native target submission |
| Identifier field | target composition | canonical Input | Input/native control |
| Submit action | target composition | canonical Button submitter | Button/Form |
| Confirmation | no | canonical `Alert` success profile with `.password-reset__success` context class | Alert/target lifecycle |
| Errors/pending/retry | target composition | field/Form feedback, Alert, Status, Button state | dependencies/target lifecycle |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral recovery-request shell; email, username, SMS, or provider methods remain target composition. |
| Size | One intrinsic narrow profile with a private maximum measure; no public size option. |
| Required content | Non-empty title and guidance; request fixture additionally requires a complete Form. |
| Icon | Passive illustration present/absent; it never supplies meaning or a name. |
| Request form | Required for request composition and omitted from provider-confirmed composition; no nested Form or copied field/action markup. |
| Confirmation | Non-empty canonical Alert content replacing the request Form only after provider confirmation. |
| Field state | Default/error/success/warning, required/read-only/disabled and controlled/uncontrolled value remain Input/target states. |
| Submission | Idle/pending/succeeded/failed/rate-limited/retrying/navigating remain target states. |
| Request/success relationship | Mutually exclusive request or confirmed composition; target owns selection, transition, provider truth, and focus. |
| Environment | Mobile/Tablet/Desktop/XL, narrow container, effective 200%, LTR/RTL, light/dark, forced colors, reduced motion, keyboard-only. |

Invalid combinations include a blank title or guidance, an unlabeled identifier,
a submitted control without `name`, a Button outside the intended Form that
submits accidentally, nested forms, duplicate Input or Alert presentation,
assertive success for an ordinary request, focus moved only to announce success,
copy that reveals account existence, a public success boolean inferred from the
site fixture, or a classic Shopify form rendered for managed customer accounts.

## Public API And State Ownership

- `icon` — optional passive illustration slot.
- `title` — required non-empty visible recovery-request title.
- `text` — required non-empty visible guidance.
- `form` — conditionally required complete canonical Form slot for request,
  containing target-owned identifier, validation, submission, and action.
- `successMessage` — conditionally required non-empty provider-confirmed Alert
  content replacing the Form.

U2 has no independent controlled/uncontrolled state. Native Input owns static Web value,
constraint validity, autofill, editing, submission, and reset; stateful targets
may control those dependency APIs. The target owns pending/disabled policy,
request success/failure, composition selection and replacement/navigation,
focus, retry, errors, account lookup, delivery, rate limiting, abuse controls,
tokens, sessions, and analytics.

## Token, Hardcoded Value, And Runtime Audit

- Retain only U2-owned semantic text, typography, and spacing tokens. Form,
  Input, Button, and Alert retain their public tokens.
- Use private `--_password-reset-*` variables for maximum measure, illustration
  size, and internal spacing aliases; do not expose a token for every internal
  relation.
- Use logical sizing/margins and stable heading/body line-height tokens.
  Private `440px` maximum measure and `48px` passive illustration size remain
  ordinary geometry unless human review establishes reusable semantic tokens.
- Remove U2 success color, tint, radius, padding, and type declarations because
  canonical Alert owns them.
- Passive neutral runtime budget is `0 B`. U2 adds no listener, observer, timer,
  request, account lookup, credential/token store, provider SDK, or generic
  target lifecycle.
- Account CSS must stay at or below its permanent `3,072 B` gzip ceiling. The
  current candidate measures `2,853 B`, leaving `219 B` headroom. U2 is
  `1,683 B` raw / `540 B` gzip and adds zero neutral runtime.

## Responsive And Evidence Requirements

- Use logical sizing and intrinsic wrapping; no viewport breakpoint is needed
  inside U2. Form controls, alerts, and text must stay inside narrow containers.
- Test request, no-icon, no-form, blank-title omission, blank-guidance omission,
  confirmed success, long localized copy, long email, unbroken content, RTL,
  200px container, and effective 200 percent.
- Test native label/name/type/autocomplete/required semantics, empty-submit
  constraint validation and focus, valid FormData, Tab/Enter submission,
  polite success insertion, absence of duplicate live regions, and reset.
- Capture Exhibit and Studio at Mobile, Tablet, Desktop, and XL plus focus,
  native invalid, success, no-icon, no-form/blank omission, long/RTL/narrow,
  light, dark, forced colors, reduced motion, and effective 200 percent.

## Cross-Target Translation

| Target | Mapping | Status/gap |
| --- | --- | --- |
| Neutral Web | Labelled passive section plus canonical Form, Input, Button, and optional Alert. | Implementable with zero U2 runtime; target owns request lifecycle. |
| Shopify current customer accounts | Shopify-managed passwordless account surface. | Selected v1 direction intentionally omits U2 because there is no customer password to reset. |
| Shopify classic customer accounts | Separately versioned Liquid `recover_customer_password` request adapter; token-backed `reset_customer_password` stays a distinct step. | Outside v1; no automatic fallback. |
| Headless Shopify / custom identity provider | Target-owned recovery flow only when the selected identity provider actually supports passwords. | Request, errors, delivery, focus and follow-up remain target integration. |
| Webflow / Framer | Canonical CSS projection and native form connected to a target recovery service. | Visual composition available; security and delivery require target integration. |
| React / Angular / Hydrogen | Composed dependency controls plus external request state and Alert insertion. | Contract-ready; no framework dependency in base source. |
| Figma | U2 frame composed from canonical Input, Button, and Alert instances. | Planned; registered generic Button nodes do not approve U2 visuals. |
| SwiftUI / Compose | Native labelled email field, submit action, result message, and target recovery model. | Conceptual; preserve native input and accessibility behavior. |

## Risks, Alternatives, And Open Questions

1. Human review must approve maximum measure, page padding, heading hierarchy,
   alignment, icon scale/treatment, form rhythm, Alert placement, fixture copy,
   and the neutral candidate without U2-specific owner artwork.
2. Each target must prove provider-confirmed replacement and move focus only
   when removal of the focused request control would otherwise strand it.
3. Shopify v1 omission is intentional, but any later classic compatibility
   adapter needs separate versioning, lifecycle, routes, errors and evidence.
4. Targets must define generic request/error language, pending/disabled policy,
   uniform response timing, focus after failure or replacement, retry and rate
   limits, captcha/abuse controls, identifier policy, email delivery, token
   expiry/single use, routes, telemetry, privacy, and support escalation.
5. The optional icon is a Studio fixture choice. Its LockKeyhole appearance is
   not a contract default, target asset, or owner-approved brand treatment.

The accepted direction keeps the passive shell and target-owned lifecycle while
making the two render compositions mutually exclusive. A public
`request|success` property and a neutral recovery state machine remain rejected
because they entangle provider truth, security, routing and framework runtime.
Shopify current accounts, classic Liquid and custom identity providers remain
separate target profiles rather than interchangeable markup.

## Readiness Decision

The neutral implementation, provider-confirmed replacement behavior, browser
evidence, generated adapter reconciliation, and report make U2
`human-review-ready`. U2-A resolves the request/confirmation policy, and U0-A
plus ADR 0259 make Shopify v1 omission explicit.

Contract `0.3.0` stays `pilot`; no automatic `stable` promotion is allowed.

## Final Implementation And Evidence

- Contract `0.3.0` declares canonical Form, Input, Button, and Alert
  dependencies, labelled section/header anatomy, native request semantics,
  target-owned lifecycle, polite confirmed feedback, resilience requirements,
  five semantic properties, and fourteen U2-owned public visual tokens.
- Exhibit and Studio consume the same `PasswordResetArtwork`, canonical
  dependency artwork, fixture data, and implementation. Standalone Alert and U2
  both consume `AlertArtwork`; no success presentation is duplicated in
  Account CSS.
- Exact normalized request DOM parity and computed-style parity pass after
  pointer state is normalized. The request tree contains one labelled section,
  one native Form, one named required email Input with `autocomplete="email"`,
  and one submit Button. Confirmed composition replaces those request parts with
  one canonical polite Alert.
- Empty submission preserves native constraint validation and focuses the
  invalid Input. Valid submission serializes `email=alex@example.com`; after
  simulated target confirmation, one `role=status` Alert replaces the Form and
  receives focus because the focused submitter was removed. This target-owned
  fixture behavior adds no public U2 state property.
- Mobile, Tablet, Desktop, and XL pass in Exhibit and Studio. Long localized
  RTL content at exactly `200px`, a 640px effective-200-percent check, dark
  mode, forced colors, reduced motion, native invalid focus, keyboard focus,
  no-icon, and required-title omission remain contained.
- Batch 94 retains the request and environment baseline. Batch 143 refreshes
  confirmed replacement/focus plus paired viewport and parity evidence under
  `output/playwright/refinement-batch-143/`.
- The final browser console has zero errors and zero warnings. The one headless
  Playwright session, one tab, and managed docs server were closed; port 4173
  is free and the owned-resource gate passes.

## Final Performance And Target Result

- U2 is `1,683 B` raw / `540 B` gzip after deleting confirmation spacing that
  only applied when the Form incorrectly remained below the Alert.
- Account CSS is `2,853 / 3,072 B` gzip, leaving `219 B` headroom.
- Neutral Web component CSS is `71,884 / 65,536 B` and shared runtime is
  `22,807 / 8,192 B`; both gaps are already documented and U2 adds `0 B`
  runtime. Shopify U2 adds no target JavaScript.
- Canonical, Webflow, and Shopify Account CSS remain byte-identical after
  adapter generation. Account SHA-256 is
  `6e12c6a3384739f76b415494f9c88a8dc9cb5d6c7c1e21839a0290dcf77ae5d3`;
  the U2 slice SHA-256 is
  `2f9aab49e7d10de77654896d17e8a3e5c18a0278abad6cd4a252b1ce8bba92de`.
- Neutral Web is implemented. Shopify v1 intentionally omits U2 because current
  customer accounts are passwordless; contract status remains `planned` /
  `ready:false` for any separately versioned compatibility integration.
