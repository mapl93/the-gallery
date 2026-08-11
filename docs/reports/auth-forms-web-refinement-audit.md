# Auth Forms Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Date: 2026-07-21

## Outcome

Auth Forms is a passive, labelled authentication-entry shell composed from
canonical Form, Field Wrapper, Input, Password Input, Button, Link, and Divider
implementations. U1 owns only the authentication surface anatomy and spacing.
Native fields and canonical dependencies retain value, validity, autofill,
paste, keyboard, password visibility, submission, reset, focus, and navigation.
Targets retain credentials, requests, generic server feedback, rate limiting,
MFA/passkeys, providers, redirects, sessions, authorization, and account data.

Owner-selected U0-A/U1-A and ADR 0258 resolve the final target architecture
blocker. Shopify v1 delegates authentication to the current managed customer-
account authorization/account experience and uses Customer Account API or
extension profiles only in authenticated target context. U1 does not become a
theme-owned Shopify credential Form. Classic customer Liquid, if maintained,
is a separately versioned compatibility adapter rather than a fallback.

The neutral renderer, fixture, CSS, and Studio surface remain unchanged from
Batch 93 and add no U1 runtime. The resolved architecture makes U1 ready for
human visual review without pretending that documented delegation is a live
Shopify integration. Shopify remains `planned`, `ready:false`; no visual approval
or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Labelled authentication-entry shell; not an identity provider, credential/session store, password policy, MFA/passkey flow, rate limiter, router, authorization gate, or result announcer. |
| Anatomy and composition | pass | Required visible title and complete canonical Form; optional subtitle, recovery Link, labelled alternative Button group with canonical Dividers, and footer. |
| Variants, sizes, and states | pass | One intrinsic shell; target flows are compositions rather than Login/Register/MFA/provider visual variants. Optional, invalid, dependency and target lifecycle states are explicit. |
| Public API and ownership | pass | Seven semantic properties: `title`, `subtitle`, `form`, `forgotAction`, `dividerLabel`, `socialActions`, and `footer`; no U1 controlled state. |
| Tokens and hardcoded values | pass | Fifteen stable public text/type/spacing tokens; canonical dependencies own control visuals. Private `440px` maximum measure remains internal geometry. |
| Accessibility and motion | pass | Native form/labels, correct purpose tokens, one password value owner, Button/Link semantics, focus order, method-specific names, visible focus, forced colors, no U1 live region, and zero U1 motion. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, long Spanish, RTL at exactly `200px`, and effective `200%` reflow remain evidenced from the unchanged renderer. |
| Runtime and assets | pass | `0 B` U1 runtime; no listener, observer, timer, request, credential copy, provider SDK, brand asset, or internal status region. |
| Cross-target translation | pass with live-target gate | Neutral Web and CSS projections pass. Shopify v1 mapping is intentionally managed/hosted or authenticated headless; classic Liquid is a separate compatibility target. Live target proof remains pending. |
| Documentation and verification | pass | Dossier, ADRs 0184/0258, contract `0.3.0`, registry, CSS, renderer, Studio, MDX, target notes, evidence, adapters, and matrices agree. |

## Standards And Reference Direction

- HTML autofill supplies native `username` and `current-password` purpose
  tokens, so U1 preserves native named controls rather than inventing an
  authentication widget.
- WCAG 2.2 Accessible Authentication supports password-manager, paste, and
  assistance-compatible entry; U1 does not add cognitive tests or block native
  assistance.
- APG defines no authentication composite pattern. Native Form, fields,
  Buttons, and Links retain their platform interaction.
- Radix and Polaris expose composable field/action/feedback primitives rather
  than one universal authentication state machine.
- OWASP generic-response, throttling, MFA, and automated-attack controls remain
  in the target security lifecycle.
- Shopify's current Customer Account API documentation requires authorization
  endpoint discovery and authenticated customer context before protected API
  access. That flow is target infrastructure, not a theme Form or neutral U1
  property.

## Contract And Browser Evidence

- Contract `0.3.0` declares seven canonical dependencies, twelve anatomy parts,
  five states, six behaviors, seven semantic properties, one intrinsic
  variant/size profile, and fifteen public visual tokens.
- Browser inspection from Batch 93 finds one labelled `SECTION`, one native
  `form.form.auth__form`, one required named email input with
  `autocomplete="username"`, one required named password input with
  `autocomplete="current-password"`, one explicit submitter, two
  `type="button"` alternatives, two Links, two canonical Dividers, and zero
  Status/Alert/live-region descendants inside U1.
- Password visibility changes the same password node and preserves its value.
  Native invalid submission focuses Email; valid FormData contains the expected
  named email/password entries. Alternative Buttons never submit the credential
  Form, and recovery/account-mode destinations remain Links.
- Keyboard order, dependency focus indications, accessible tree, light/dark
  contrast, forced colors, and reduced motion all pass.
- Exhibit and Studio produce byte-identical U1 subtrees and matching computed
  root/field/action/link/divider styles from one renderer and fixture.
- Mobile, Tablet, Desktop, and XL have no U1 overflow. Long Spanish, exact
  `200px` RTL, and effective `200%` reflow remain contained.
- Twenty-two final images remain in
  `output/playwright/refinement-batch-93/`: eight paired natural viewports plus
  reveal, invalid, submit, alternative action, focus, form-only, invalid
  omission, localized mobile, RTL/200px, light/dark, forced colors, reduced
  motion, and reflow states. Because no canonical markup, CSS, renderer, fixture,
  or Studio implementation changed in Batch 142, those images remain current
  and were not regenerated.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Labelled passive shell composed from canonical native Form, fields, Buttons, Links, and Dividers. | Implemented and evidenced with zero U1 runtime. |
| Shopify current customer accounts | Managed authorization/account experience; authenticated Customer Account API or extension target when applicable. | Selected v1 direction; no theme U1 credential Form. `planned`, `ready:false` until a live handoff/headless consumer is proved. |
| Shopify classic customer accounts | Native classic Liquid forms in a separately versioned compatibility adapter. | Explicitly outside v1; no fallback or shared-source markup. |
| Webflow / Framer | Canonical CSS projection and native forms/actions connected to a target authentication service. | Visual composition available; credentials, security, and session remain target integration. |
| React / Angular / Hydrogen | Controlled or uncontrolled dependency composition plus external authorization/request/session state. | Contract-ready; no framework dependency in base source. |
| Figma | Canonical field, Button, Link, and Divider instances in one labelled frame. | Planned; registered generic Button nodes are not U1 artwork or visual approval. |
| SwiftUI / Compose | Native secure/text fields, actions/navigation, and target authentication model. | Conceptual; preserve native credential/autofill/accessibility behavior. |

The Shopify Customer Account workflow searched the current official reference
and validated a minimal authenticated customer identity query against the
bundled `2026-04` Customer Account schema as artifact
`u1-current-customer-boundary-batch142`, revision 1. The validation confirms API
shape only; authentication discovery, authorization, session, and target UX
remain outside U1 and unproved in this repository.

## Performance And Risks

- U1 remains `2,326 B` raw / `662 B` gzip and adds `0 B` neutral runtime.
- The permanent audit records Account CSS at `2,857 / 3,072 B`, leaving `215 B`
  headroom. Account SHA-256 is
  `7d492490e8a15610b98d95caa61e62646971ab4d66b27a4f3fbacca06613d76d`;
  the U1 slice SHA-256 is
  `ac94629b4b5b696baa5f59d6147556268c2ec3a396486cb6141c36cbec5fec40`.
- Neutral component CSS remains `71,891 / 65,536 B` and shared runtime remains
  `22,807 / 8,192 B`; U1 expands neither in this decision-only batch.
- Human review must approve maximum measure, page padding, heading hierarchy,
  alignment, optional rhythm, divider treatment, fixture copy, alternative
  action/icon treatment, and the neutral candidate without U1-specific artwork.
- Product targets must prove generic error language, pending/disabled behavior,
  focus, retry/lockout/rate limit, MFA/passkeys, provider availability,
  authorization redirects, session truth, privacy, telemetry, and support.
- Shopify still needs a real managed-account handoff, extension, or authenticated
  headless consumer before target readiness. Intentional theme omission is the
  correct v1 boundary, not evidence that the target flow works.
- The accepted `socialActions` property name is narrower than its actual
  alternative-method slot. It is retained for compatibility and may be renamed
  only through a separate breaking API decision.

## Validation

- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- unchanged exact Exhibit/Studio and interaction/accessibility evidence from
  Batch 93: retained;
- Customer Account API documentation search and `2026-04` GraphQL schema
  validation: pass;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready globally, 60 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets, valid with U1
  intentionally planned;
- TypeScript and external docs build: pass without rebuilding `site/dist`;
- refinement matrix: `156 / 183` ready for human review, `27` remaining;
- performance audit: 18 surfaces, 10 pass, 8 documented gaps, zero undocumented
  gaps; and
- resource gate: Gallery URL unresponsive, port `4173` free, managed server
  stopped, and stable Playwright session closed.

Human visual review, live target lifecycle proof, and explicit stability review
remain pending. No `stable` promotion is claimed.
