# Refinement Batch 93 — Auth Forms

Status: Refined; Shopify account-architecture decision required; remains `pilot`

Date: 2026-07-17

Component: Auth Forms (Login / Register) (`U1`, dependency order `106`)

## Outcome

Batch 93 replaces U1's duplicated fields, social buttons, links, focus rules,
and generated divider with one passive authentication shell composed from the
canonical Form, Field Wrapper, Input, Password Input, Button, Link, and Divider.
The same password node owns editing and visibility. Alternative actions cannot
submit the password Form accidentally. The site demo status remains outside U1.

Exhibit and Studio now use the same `AuthFormsArtwork`, dependency artwork,
renderer, and fixture. Shopify stays intentionally planned until the owner
chooses Shopify-managed customer accounts, a temporary classic Liquid strategy,
an explicit versioned pair, or no theme-owned account form.

## Delivered

- Permanent U1 dossier, detailed audit, ADR 0184, and open Shopify
  customer-account architecture decision.
- Contract `0.2.0`, corrected seven-dependency graph, Studio metadata, MDX, and
  Account CSS reconciliation.
- Required labelled shell and complete native Form, canonical email and Password
  Input, explicit submitter, recovery/account Links, canonical alternative
  Buttons and Dividers, and strict blank-title omission.
- Shared Password Input artwork reused by standalone/advanced controls and U1;
  shared Auth Forms renderer reused by Exhibit and Studio.
- Seven semantic properties, fifteen stable U1 tokens, zero U1 runtime, and
  explicit target ownership for credentials, requests, feedback, security,
  sessions, providers, navigation, authorization, and account data.
- Mobile/Tablet/Desktop/XL per mode plus reveal, native invalid, submit,
  alternative action, focus, form-only, blank-title, long/localized, RTL/200px,
  light/dark, forced-colors, reduced-motion, and effective-200% evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static preview audit reports zero errors.
- Exhibit and Studio serialize exact identical U1 DOM and computed styles with
  one labelled section, one native Form, two named fields, one password owner,
  explicit submit/alternative Buttons, native Links, canonical Dividers, and no
  internal live region.
- Native invalid focus/validity, valid FormData submission, password
  Space/Enter reveal without value loss, alternative non-submission, link
  semantics, seven-item focus order, and external demo status pass.
- Four viewports, long Spanish, RTL at `200px`, 200% reflow, light/dark contrast,
  forced colors, and reduced motion pass without U1 horizontal overflow.
- Shopify official validation passes. U1 remains `css-ready`, `ready:false`, and
  the global target-ready count remains 79 because the account architecture is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closes both and leaves port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U1 CSS slice | `723 B` | `662 B` | component observation | `-61 B`; canonical semantic composition |
| Account CSS | `2,649 B` | `2,826 B` | `3,072 B` | pass; `246 B` headroom |
| Neutral Web component CSS | `67,958 B` | `68,066 B` | `65,536 B` | existing program gap `2,530 B`; batch delta `+108 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U1 delta `0 B` |
| Shopify U1 runtime | `0 B` added | `0 B` added | target observation | no architecture-dependent no-op behavior added |

Account CSS SHA-256 is
`cd3f370daab9d284a69e2386ce4c4f6a543ce606ff7a811235c19ba7ecefd17c`;
the U1 slice SHA-256 is
`ac94629b4b5b696baa5f59d6147556268c2ec3a396486cb6141c36cbec5fec40`.

## Risks And Open Questions

- Owner input is required on Shopify-managed accounts versus classic
  `customer_login` / `create_customer` Liquid, an explicit versioned strategy,
  or target omission.
- Human review must approve maximum measure, page padding, heading hierarchy,
  alignment, optional-section rhythm, divider treatment, fixture copy, provider
  icons, and the neutral candidate without U1-specific Figma artwork.
- Each target must own credentials, pending/disabled policy, generic errors,
  focus, retry/lockout/rate limiting, MFA/passkeys, provider availability,
  redirects, sessions, authorization, privacy, telemetry, analytics, and support.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive, and
evidence work is complete, but the selected Shopify account architecture
determines the target implementation. U1 is not human-review-ready across
targets or Shopify target-ready until the owner selects that architecture and
the resulting target is implemented and evidenced. It remains `pilot`; no
automatic `stable` promotion was made.
