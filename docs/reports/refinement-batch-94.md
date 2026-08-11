# Refinement Batch 94 — Password Reset

Status: Refined; product and Shopify account-architecture decisions required;
remains `pilot`

Date: 2026-07-17

Component: Password Reset (`U2`, dependency order `107`)

## Outcome

Batch 94 replaces U2's implicit native Form and bespoke success surface with
one passive recovery-request shell composed from canonical Form, Input, Button,
and Alert. The fixture now submits one named native email value, preserves
native validation/focus, inserts generic polite confirmation without replacing
the Form, and does not promote fixture lifecycle into public API.

Exhibit and Studio use the same `PasswordResetArtwork`, dependency artwork,
renderer, and fixture. Shopify stays intentionally planned until the owner
chooses Shopify-managed customer accounts, classic Liquid recovery, a
version-aware/headless strategy, or no theme-owned recovery surface.

## Delivered

- Permanent U2 dossier, detailed audit, ADR 0185, and explicit request/success
  plus Shopify account-architecture questions.
- Contract `0.2.0`, corrected four-dependency graph, Studio metadata, MDX, and
  Account CSS reconciliation.
- Required labelled shell, native canonical request Form, named required Email
  Input, explicit submitter, optional passive illustration, canonical polite
  confirmed-feedback Alert, and strict blank-title/guidance omission.
- Shared Alert artwork reused by standalone Alert and U2; shared Password Reset
  renderer reused by Exhibit and Studio.
- Five semantic properties, fourteen stable U2 tokens, zero U2 runtime, and
  explicit target ownership for requests, feedback lifecycle, security,
  delivery, tokens, routes, sessions, and analytics.
- Mobile/Tablet/Desktop/XL per mode plus native invalid, confirmed feedback,
  keyboard focus, no-icon, blank-title, localized RTL/200px, dark, forced
  colors, reduced motion, and effective-200-percent evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static preview audit reports zero errors.
- Exhibit and Studio serialize exact identical U2 DOM and computed styles with
  one labelled section, one native Form, one named email Input, one submitter,
  and optional canonical Alert.
- Native invalid focus/validity, valid FormData submission, retained Form,
  generic polite status, change-to-clear fixture behavior, accessible names,
  and keyboard focus pass.
- Four viewports, long localized RTL content at `200px`, effective 200 percent,
  dark, forced colors, and reduced motion pass without U2 horizontal overflow.
- Shopify official validation passes. U2 remains `css-ready`, `ready:false`, and
  the global target-ready count remains 79 because account architecture is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closes both and leaves port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U2 CSS slice | `402 B` | `499 B` | component observation | `+97 B`; complete semantic layout and canonical Alert composition |
| Account CSS | `2,826 B` | `2,883 B` | `3,072 B` | pass; `189 B` headroom |
| Neutral Web component CSS | `68,066 B` | `68,187 B` | `65,536 B` | existing program gap `2,651 B`; batch delta `+121 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U2 delta `0 B` |
| Shopify U2 runtime | `0 B` added | `0 B` added | target observation | no architecture-dependent no-op behavior added |

Account CSS SHA-256 is
`8bd60198cbb02122774fb5aa57ccc52ce2075024f93d30b3993f18b74dbedfed`;
the U2 slice SHA-256 is
`8d918d39d6836f9126c8452b017672416aabe3caa7a805fb4e4a663eedd1d5dd`.

## Risks And Open Questions

- Owner input is required on whether request and confirmed feedback are public
  mutually exclusive states, may coexist, navigate, or remain target-owned.
- Owner input is required on Shopify-managed accounts versus classic
  `recover_customer_password`, a version-aware/headless strategy, or target
  omission.
- Human review must approve maximum measure, padding, heading hierarchy,
  alignment, icon treatment, Form rhythm, Alert placement, fixture copy, and
  the neutral candidate after corrected U2-specific Figma artwork exists.
- Each target must own pending/disabled policy, generic result/error language,
  focus, uniform timing, retry/rate limiting, abuse defenses, identifier
  policy, delivery, token lifecycle, routes, privacy, telemetry, and support.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive, and
evidence work is complete, but public request/success policy and the selected
Shopify account architecture determine the cross-target implementation. U2 is
not human-review-ready across targets or Shopify target-ready until those
decisions are made and the resulting target is implemented and evidenced. It
remains `pilot`; no automatic `stable` promotion was made.
