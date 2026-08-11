# Password Reset Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Date: 2026-07-21

## Outcome

Password Reset is one passive labelled recovery shell with mutually exclusive
target-controlled presentations. The request presentation composes canonical
Form, Input, and Button. Only after provider confirmation does the target
replace the complete request Form with one canonical polite Alert. U2 does not
expose a public success boolean, transition machine, request client, provider,
token, delivery, or security lifecycle.

Owner-selected U2-A and ADR 0259 correct the prior fixture behavior, which kept
the editable request Form below confirmed feedback. The shared renderer now
contains exactly one of Form or confirmed Alert. The Studio target simulation
moves focus to the Alert root because replacement removes the focused
submitter; this remains target behavior rather than public U2 API.

Shopify v1 intentionally omits U2 because current customer accounts use
passwordless authentication. Classic `recover_customer_password` and the
distinct token-backed `reset_customer_password` step may exist only in a
separately versioned compatibility adapter. Neutral and framework targets that
actually use passwords can continue to compose U2.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive recovery request/confirmation shell; not an identity provider, account oracle, email sender, token service, password-change form, rate limiter, router, or state machine. |
| Anatomy and composition | pass | Required labelled section/header; optional decorative illustration; exactly one canonical request Form or provider-confirmed Alert. |
| Variants, sizes, and states | pass | One intrinsic shell; target-controlled request and confirmed compositions, dependency field states, invalid/omission, target lifecycle and environment modes are defined. |
| Public API and ownership | pass | Five properties: `icon`, `title`, `text`, conditional `form`, and conditional `successMessage`; no public `state`, `sent`, `success`, `loading`, or provider fields. |
| Tokens and hardcoded values | pass | Fourteen stable public text/type/spacing tokens; canonical dependencies own control/Alert visuals. Private `440px` measure and `48px` illustration remain internal geometry. |
| Accessibility and motion | pass | Labelled native section, visible native Email label, `name`/type/autocomplete/required, validation/FormData, polite confirmed Alert, target focus recovery, forced colors, and zero U2 motion/runtime. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL plus Arabic RTL at exactly `200px` remain contained without overflow. |
| Runtime and assets | pass | `0 B` U2 runtime; site target state uses React already owned by Studio and adds no neutral listener/request/provider SDK/asset. |
| Cross-target translation | pass with live-target gate | Neutral composition is implemented. Shopify current accounts intentionally omit U2; classic/password targets require explicit separate integration and proof. |
| Documentation and verification | pass | Dossier, ADRs 0185/0258/0259, contract `0.3.0`, CSS, shared renderer, Studio, MDX, evidence, adapters, and matrices agree. |

## Standards And Reference Direction

- Native Email input semantics own type, submitted name, autofill, editing,
  validation, keyboard submission, and reset.
- WCAG Status Messages supports polite programmatic success announcement without
  forcing focus solely for announcement. U2 moves focus only because target
  replacement removes the focused submitter.
- APG and Open UI define no password-reset composite widget; native Form/Input/
  Button plus canonical Alert remain the correct composition.
- OWASP recovery guidance requires generic non-enumerating responses, uniform
  timing, abuse controls, secure expiring single-use credentials, and no account
  mutation before valid proof. Those remain provider/target responsibilities.
- Shopify current customer accounts use passwordless one-time-code sign-in, so
  password reset is not part of that target surface. Legacy password accounts
  are a distinct compatibility architecture.

## Contract And Browser Evidence

- Contract `0.3.0` declares four canonical dependencies, seven anatomy parts,
  two target-selected states, five behaviors, five semantic properties, one
  intrinsic variant/size profile, and fourteen public visual tokens.
- All eight paired Mobile/Tablet/Desktop/XL request captures contain one
  labelled section, one native Form, one named required Email Input, one submit
  Button, zero Alert/live regions, and zero root/descendant/document overflow.
- Native request inspection preserves `type=email`, `autocomplete=email`,
  `required`, and no neutral state/success/loading Studio control.
- Empty submit retains the Form, focuses Email, exposes `valueMissing`, and
  creates no Alert. Valid submission serializes exactly
  `email=alex@example.com` through native FormData.
- After simulated provider confirmation, the Form, Email, and submitter counts
  are all zero; exactly one canonical success Alert remains with
  `role=status`, `aria-live=polite`, `tabindex=-1`, and programmatic focus.
- Disabling the request Form before confirmation and blanking the required title
  both omit the complete root. There is no half-valid empty shell.
- Initial request Exhibit and Studio trees normalize to exactly `1,044`
  characters and matching `4d2efb8b` hashes.
- Long Arabic guidance at exactly `200px` has zero root, descendant, or document
  overflow. Keyboard and forced-colors focus preserve a solid `2px` outline,
  and reduced motion reports `0s` animation/transition duration.
- Fourteen final images and the machine-readable summary live under
  `output/playwright/refinement-batch-143/`.
- The final evidence pass used one headless Chromium context and one page and
  ended with zero console errors, page errors, or assertion failures.

The first preliminary pass stopped on the inspector label `Guidance` after the
harness asked for `Text`; the next valid pass exposed that the harness preserved
the deliberate RTL `200px` inline style in later special-mode screenshots. The
final pass navigates to a fresh Studio route before focus/special modes. Every
runner closes Chromium in `finally`, and the managed server was stopped before
the final resource gate.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Labelled passive shell with exactly one canonical request Form or provider-confirmed Alert. | Implemented and evidenced with zero U2 runtime. |
| Shopify current customer accounts | Shopify-managed passwordless account/sign-in experience. | Selected v1 direction intentionally omits U2; no theme recovery Form. |
| Shopify classic customer accounts | Separately versioned `recover_customer_password` request adapter; `reset_customer_password` is the distinct token-backed step. | Outside v1; no automatic fallback and no target-ready claim. |
| Headless/custom identity provider | U2 only when the selected provider actually supports password recovery. | Contract-ready; provider truth, request, delivery, replacement, focus and security remain target-owned. |
| Webflow / Framer | Canonical CSS/native Form connected to the target recovery service. | Visual composition available; lifecycle/security require integration. |
| React / Angular / Hydrogen | Target-controlled request-versus-confirmed composition using canonical dependencies. | Contract-ready; no framework dependency in base. |
| Figma | Canonical Input, Button and Alert instances in one U2 frame. | Planned; registered generic Button nodes are not U2 artwork or approval. |
| SwiftUI / Compose | Native request field/action or confirmed feedback selected by target provider state. | Conceptual; preserve native input, announcement and focus conventions. |

The Shopify Customer Account search returned no password-recovery operation,
which agrees with current official merchant documentation describing passwordless
customer accounts and no password resets. Classic Liquid recovery remains
documented separately and is not used as a v1 fallback.

## Performance And Risks

- U2 is `1,683 B` raw / `540 B` gzip after removing confirmation spacing that
  only applied while the Form incorrectly remained mounted below Alert.
- The permanent audit records Account CSS at `2,853 / 3,072 B`, leaving `219 B`
  headroom. Account SHA-256 is
  `6e12c6a3384739f76b415494f9c88a8dc9cb5d6c7c1e21839a0290dcf77ae5d3`;
  U2 slice SHA-256 is
  `2f9aab49e7d10de77654896d17e8a3e5c18a0278abad6cd4a252b1ce8bba92de`.
- Neutral component CSS is `71,884 / 65,536 B` and shared runtime is
  `22,807 / 8,192 B`; both gaps are documented. U2 reduces neutral CSS by
  `7 B` compressed in this batch and adds `0 B` runtime.
- Human review must approve maximum measure, page padding, heading hierarchy,
  alignment, illustration scale/treatment, Form rhythm, Alert placement,
  confirmed focus appearance, fixture copy, and component-specific artwork.
- Every password target must prove generic response/error text, uniform timing,
  pending/disabled policy, failure correction/retry, focus, rate limits, abuse
  defense, delivery, token expiry/single use, routes, privacy and support.
- Shopify v1 omission is intentional. A later classic compatibility adapter
  must not blur request and token-backed reset steps or silently downgrade
  current customer accounts.

## Validation

- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- request/confirmed mutual exclusion, native invalid/FormData, focus recovery,
  exact parity, four viewports, RTL/200px, forced colors and reduced motion:
  pass with zero browser failures/errors;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready globally, 60 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets, valid with U2
  intentionally planned;
- TypeScript and external docs build: pass without rebuilding `site/dist`;
- refinement matrix: `157 / 183` ready for human review, `26` remaining;
- performance audit: 18 surfaces, 10 pass, 8 documented gaps, zero undocumented
  gaps; and
- final owned-resource gate: Gallery URL unresponsive, port `4173` free,
  managed server stopped, stable session closed.

Human visual review, live provider lifecycle proof, and explicit stability
review remain pending. No `stable` promotion is claimed.
