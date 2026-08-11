# Refinement Batch 101 — Account Settings

Status: Refined; persistence, account-data, consent, Shopify architecture, and
human visual review required; remains `pilot`

Date: 2026-07-17

Component: Account Settings (`U9`, dependency order `114`)

## Outcome

Batch 101 replaces a universal account Form, a false global-save claim,
duplicated Input/Switch trees, site-only Switch icons/reordering, fixed widths,
and root-owned submit/change behavior with one passive target-controlled
section shell. It composes canonical Form, Input, Button, and Switch children
without deciding account schema or persistence.

Exhibit and Studio now use the same `AccountSettingsArtwork`, fixture, DOM, and
single required `sections` slot. U9 owns no account data, requests, controlled
state, validation, authentication, consent, persistence, status, or runtime.
Shopify remains planned until the owner selects a current account surface and
its API/scopes/protected-data/lifecycle policy.

## Delivered

- Permanent U9 dossier, detailed audit, ADR 0192, Shopify boundary, and explicit
  account/persistence/consent/target questions.
- Contract `0.2.0`, registry, Studio metadata, MDX, Account CSS, shared Account
  Settings and Switch renderers, and generated adapter reconciliation.
- Passive generic root, native heading-labelled sections, optional descriptions,
  canonical profile Form/Inputs/Button, and immediate notification Switches.
- Successful FormData names/autocomplete purposes, section-labelled Switch
  group, pointer/Space interaction, and honest external demo feedback.
- Logical/tokenized named-container layout, one private maximum measure,
  private rhythm aliases, zero U9 breakpoint, and zero neutral runtime.
- Four retained baseline images plus thirteen authoritative final images across
  four viewports, exact-container parity, direct 320/200px, localized RTL,
  effective 200 percent, dark, forced colors, and reduced motion.
- Regenerated Neutral Web, Webflow, and Shopify projections; `site/dist`
  untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; static audit covers 251 previews with zero errors.
- One passive root, two labelled native sections, one canonical Form, two named
  Inputs, one submitter, two named Switches, one labelled group, and zero
  internal live regions pass.
- FormData includes display name, email, and named submitter; pointer and Space
  change independent immediate Switches with visible focus and honest external
  status only after interaction.
- At 512px, Exhibit and Studio share DOM hash `5aa03bd8` and computed-style hash
  `dd2d395f`.
- Eight viewport checks and direct 320px, localized RTL/unbroken 200px, and
  effective-200-percent checks have zero component/section/document overflow.
- Dark contrast is `17.18:1`/`12.09:1`; forced colors preserves solid focus;
  reduced motion reports `0s` Switch track/thumb transitions.
- Official Shopify validation revision 1 passes. U9 remains `planned`,
  `ready:false`; target-ready count remains 79.
- Browser evidence used one named headless session, one tab, and one managed
  server per short phase; cleanup closed all owned resources and freed 4173.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U9 CSS slice | `347 B` | `570 B` | component observation | `+223 B`; passive anatomy, type/rhythm, logical containment, and named container become explicit |
| Account CSS | `2,776 B` | `2,847 B` | `3,072 B` | pass; `225 B` headroom |
| Neutral Web component CSS | `68,459 B` | `68,597 B` | `65,536 B` | existing program gap `3,061 B`; U9 delta `+138 B` gzip |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U9 delta `0 B` |
| Shopify U9 runtime | `0 B` added | `0 B` added | target observation | no account/persistence behavior added |

Account CSS SHA-256 is
`7d492490e8a15610b98d95caa61e62646971ab4d66b27a4f3fbacca06613d76d`;
the U9 slice SHA-256 is
`390bb3424f06810acb6f130b68bf036d66cfec79e2e242f900581c648e7514f6`.

## Risks And Open Questions

- Which settings and writable account fields are v1, and which belong to the
  platform rather than The Gallery?
- Which sections use one global Form, independent Forms, immediate changes, or
  deferred controls? Who owns dirty/pending/error/retry/focus/status lifecycle?
- Which notification or marketing settings are consent records with legal,
  timestamp, source, unsubscribe, or double-opt-in requirements?
- Does Shopify use a Profile extension, full-page extension, authenticated
  headless API, explicit compatibility surface, or omission?
- Human review must approve measure, divider/type/control rhythm, Switch order,
  fixture copy, final visuals, and corrected U9-specific Figma artwork.
- Complete Web CSS and shared runtime remain above their existing program
  ceilings; U9 stays within Account family budget and adds no runtime.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive,
accessibility, adapter, performance, and evidence work is complete. Account
schema, persistence, lifecycle, consent, selected Shopify architecture, and
human visual/product decisions determine cross-target completion. U9 is not
yet human-review-ready across targets and remains `pilot`; no automatic
`stable` promotion was made.
