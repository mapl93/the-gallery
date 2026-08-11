# Refinement Batch 142: Current Customer Account Boundary And Passive Auth Entry

Date: 2026-07-21

Component: `U1` / `auth-forms`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected U0-A/U1-A is reconciled across ADRs 0184/0258, contract `0.3.0`,
MDX, dossier, audit, Shopify translation, current Customer Account API evidence,
open questions, and the global progress matrix.

Auth Forms remains one passive labelled shell requiring a target-authored title
and complete canonical Form. Login, registration, passwordless, MFA, passkeys,
and provider handoff are separate target flows, not U1 variants. U1 keeps seven
semantic properties, canonical Form/Field/Input/Password Input/Button/Link/
Divider dependencies, zero component state machine, and `0 B` neutral runtime.

Shopify v1 intentionally delegates authentication to the current managed
customer-account authorization/account experience. Customer Account API or UI
extensions operate only in their target-authenticated context; U1 is not emitted
as a theme-owned credential Form. Classic Liquid is a separately versioned
compatibility adapter only and has no automatic fallback.

This resolves the architecture decision but does not make Shopify target-ready.
A live managed-account handoff, extension, or authenticated headless consumer
must still prove authorization, routes, sessions, feedback, focus, errors, and
editor/target behavior.

## Evidence And Validation

No canonical markup, CSS, renderer, fixture, or Studio implementation changed,
so Batch 93's 22 images and native validation/FormData/password visibility,
alternative-action semantics, focus order, exact Exhibit/Studio parity, four
viewports, localized RTL/200px, effective-200%, contrast, forced-colors, and
reduced-motion evidence remain current.

The Shopify Customer Account workflow searched the current official reference
and validated a minimal authenticated customer identity query against the
bundled `2026-04` schema as artifact
`u1-current-customer-boundary-batch142`, revision 1. This proves API schema
compatibility only; it does not claim authentication or a live integration.

- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready globally, 60 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets, valid;
- TypeScript and external Vite build: pass without rebuilding `site/dist`;
- refinement matrix: `156 / 183` ready for human review and `27` remaining;
- performance: 18 surfaces, 10 pass and 8 documented gaps with zero
  undocumented gaps; and
- final resource gate: clean without starting a docs server or Gallery browser.

U1 remains `2,326 B` raw / `662 B` gzip with `0 B` neutral runtime. Account CSS
is `2,857 / 3,072 B`, leaving `215 B` headroom. Existing neutral CSS/runtime
program gaps remain separate and are unchanged by this decision-only batch.

Human visual review, live target lifecycle proof, corrected component-specific
artwork, and explicit stability review remain pending. No `stable` promotion is
claimed.
