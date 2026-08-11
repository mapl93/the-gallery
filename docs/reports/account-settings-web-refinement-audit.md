# Account Settings Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-08-10

## Outcome

Account Settings is a passive, target-controlled account-preference section
shell. ADR 0266 records the owner-selected per-section commitment model:

- profile-like deferred edits use an explicit canonical Form;
- effects that truly apply on activation use canonical Switch outside an
  unrelated Save action;
- marketing, notification, privacy, and regulated consent remain policy-backed
  records rather than generic booleans; and
- settings hosted by a platform are linked or omitted instead of copied.

U9 owns only a bounded measure, repeated heading-labelled native sections,
optional descriptions, and composition rhythm. Targets retain the account
schema, data provider, authentication, protected-data policy, mutation,
validation, dirty/pending/error/conflict state, consent evidence, feedback,
focus, routing, and analytics.

The shared fixture now demonstrates one deliberate Profile Form and one
immediate non-consent Display group. Exhibit and Studio render the same
`AccountSettingsArtwork`, fixture, DOM, styles, and public `sections` slot.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive section shell; not an account schema, universal Form, persistence adapter, consent ledger, authentication gate, router, or analytics client. |
| Anatomy and composition | pass | Generic root; two native heading-labelled sections; optional description; content/control parts; canonical Form, Input, Button, and Switch composition. |
| Variants, sizes, and states | pass | One intrinsic shell; explicit-save and immediate-section composition states; provider and async states remain target-owned. |
| Public API and ownership | pass | Required non-empty `sections` is the only public property; commitment lifecycle is documented per section rather than flattened into root props. |
| Tokens and hardcoded values | pass | Semantic public border/text/rhythm/type tokens; private maximum measure/rhythm aliases; logical sizing; no U9 breakpoint. |
| Accessibility and motion | pass | Native labelled sections, visible control labels, successful names, autocomplete purposes, Space activation, visible focus, no internal live region, forced-colors focus, and zero reduced-motion animation. |
| Responsive/content resilience | pass | Eight natural viewport captures, exact-width parity, localized RTL at 200px, effective 200-percent text at 320px, dark, forced colors, and reduced motion. |
| Runtime and assets | pass | `0 B` neutral U9 runtime; no request, observer, timer, storage, state mirror, icon, provider SDK, or target script. |
| Cross-target translation | conditional | Neutral Web is implemented; each target still needs a real account provider and per-section data/policy integration. |
| Documentation and verification | pass | Dossier, ADRs 0192/0266, contract 0.3.0, registry, renderer, MDX, Studio, evidence, reports, and matrix agree. |

## Decision Evidence

- HTML section/Form semantics support thematic heading-labelled sections and
  explicit Form boundaries:
  <https://html.spec.whatwg.org/multipage/sections.html#the-section-element>
  and <https://html.spec.whatwg.org/multipage/forms.html#the-form-element>.
- WAI grouping guidance supports visible labels and programmatic grouping
  without turning the shell into a widget:
  <https://www.w3.org/WAI/tutorials/forms/grouping/>.
- APG Switch requires a stable label, binary checked state, and Space
  activation: <https://www.w3.org/WAI/ARIA/apg/patterns/switch/>.
- Open UI defines Switch as an immediate-effect control:
  <https://open-ui.org/components/switch.attribute.explainer/>.
- Current Shopify customer-account Switch guidance uses Switch for immediate
  effects and directs explicit-submit choices to Checkbox:
  <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/forms/switch>.
- Shopify customer-account extensions use platform web components and explicit
  extension targets, so copied theme CSS alone is not U9 behavior readiness:
  <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components>.

These references converge on native section/Form semantics and leaf-control
state ownership. None provides a portable account schema or one universal save
model.

## Contract And Browser Evidence

- Contract `0.3.0` declares seven anatomy parts, six structural states, nine
  behavior boundaries, one required slot, canonical dependencies, public
  semantic tokens, and explicit adapter ownership.
- Batch 150 finds a passive `DIV`, two direct native `SECTION`s labelled by
  visible H2s, one Profile Form, two named/autocomplete-aware Inputs, one named
  submitter, two named immediate Display Switches, one labelled/described group,
  and zero U9 live/status regions.
- FormData serializes `displayName=Alex Morgan`, `email=alex@example.com`, and
  submitter `intent=update-profile`.
- Editing Profile does not submit, show feedback, or change a Display Switch.
  Deliberate submit fires once. Pointer and Space change the Display Switches
  without an additional Form submission.
- The Switch labels/names are `Compact account layout` /
  `compactAccountLayout` and `Show order thumbnails` / `orderThumbnails`; the
  fixture contains no consent-like marketing, notification, email-update, or
  security Switch.
- Demo feedback appears adjacent to, never inside, U9 and explicitly states
  that no account setting was saved.
- Required `sections` is checked/disabled in Studio. A forced malformed omission
  fails closed with no U9 root and a normal reload restores both sections.
- At exact `512px` width, Exhibit and Studio normalized DOM share FNV-1a
  `d43da67e`; selected computed styles share `fe73d09c`.
- Mobile, Tablet, Desktop, and XL in both modes have zero root, part, and
  document overflow. Localized RTL at `200px` and effective `200%` text at
  `320px` remain contained.
- Forced colors retains a solid `4px` Switch focus outline and visible border.
  Reduced motion retains zero non-zero animation/transition and zero running
  animation. Console and page-error sets are empty.
- The run used one page in the stable `gallery-refinement` headless session and
  reused a responsive user-owned server. Cleanup closed the owned browser,
  preserved the external server, and passed `evidence:assert-clean`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Passive `div`, heading-labelled sections, canonical child Forms/controls, adjacent target feedback. | Implemented and evidenced with zero U9 runtime. |
| Shopify customer accounts | Select a supported Profile/block/full-page extension or hosted link per section; use current platform Form/Switch/Checkbox components and authenticated services. | `planned`; U9 does not claim target readiness without the chosen surface, scopes, provider, policy, and live mutation evidence. |
| Shopify theme/storefront | Explicit compatibility flow, app block/proxy, hosted handoff, or omission. | Copied CSS is visual compatibility only. |
| Headless / Hydrogen | Authenticated service composes explicit Forms and immediate controls against its customer model. | Contract-ready; data, auth, mutation, consent, feedback, and recovery remain integration-owned. |
| React / Angular | Passive slot shell preserving child controlled/uncontrolled strategies. | Contract-ready; no framework store in neutral source. |
| Figma | Section/header/content composition and selected canonical child states. | Planned; existing generic registered nodes are not U9 visual approval. |
| SwiftUI / Compose | Native settings sections, forms, toggles, hosted handoffs, and target data lifecycle. | Translation documented; target implementation remains future work. |

Canonical Account CSS and generated Web/Shopify projections must remain
source-derived. Shopify remains `planned`, `ready:false`; no speculative
customer-account mutation was added.

## Performance And Risks

- U9 CSS is `1,669 B` raw / `525 B` gzip with SHA-256
  `f381bf95e04db4d4d674be83fa35fbded325256465e8695cd4cf0a54b111f2cd`.
- Account CSS is `16,435 B` raw / `2,826 B` gzip and passes its `3,072 B`
  family ceiling with `246 B` headroom; SHA-256 is
  `8c82120ce39fbaee8f6becda07c2f6b1d481f1ad1382b1696c90252faf76a76b`.
- Current generated Web component CSS is `535,334 B` raw / `71,886 B` gzip;
  the existing program-level overage remains a global remediation item rather
  than a U9-local failure.
- Shared runtime is `117,741 B` raw / `22,836 B` gzip with SHA-256
  `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`;
  U9 adds `0 B`.
- Live consumers still need provider-specific evidence for authenticated
  mutation, protected data, dirty/pending/failure/conflict recovery, consent
  records, platform handoffs, and focus/announcement behavior.
- Human review must approve maximum measure, divider/title/copy/control rhythm,
  fixture content, four-viewport visuals, and corrected U9-specific artwork.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, 254 static
previews, Neutral Web and Shopify adapters, native semantics, FormData,
explicit/immediate separation, pointer/keyboard behavior, focus, honest
feedback, exact Exhibit/Studio parity, four viewports, localized RTL/effective
200-percent modes, dark, forced colors, reduced motion, deterministic
performance, generated-copy identity, temporary production build, visual
inspection, diff checks, `site/dist` cleanliness, and owned-resource cleanup are
included in Batch 150.

## Readiness Decision

`human-review-ready`. ADR 0266 resolves the neutral per-section commitment
model and the implementation, contract, documentation, evidence, and adapter
boundary agree. U9 remains `pilot`; live target integrations and human visual
review remain required. No automatic `stable` or Shopify target-ready promotion
was made.
