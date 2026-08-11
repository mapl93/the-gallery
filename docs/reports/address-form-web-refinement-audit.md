# Address Form Web Refinement Audit

Status: `human-review-ready`; remains `pilot`

Date: 2026-08-10

## Outcome

Address Form is one native `form.form.address-form` specialization of canonical
Form. It owns only the localized address composition shell, optional compact
rows, optional action placement, and its container response. Canonical Form,
Input, Select, and Button retain their semantics and behavior. The target owns
address schema, values, locale order, authentication, validation, mutation,
pending/error/success state, routing, cancellation, recovery, privacy, and
telemetry.

Owner decision U7-A and ADR 0264 resolve the earlier architecture questions.
The public API remains required `fields` and optional `actions`. Submit is
explicit. Cancel is an optional navigation or close action and never an implicit
reset. Shopify v1 intentionally hands current customer addresses to hosted
Profile/Addresses; headless Customer API and separately versioned classic
compatibility remain distinct target profiles.

Exhibit and Studio use the same `AddressFormArtwork`, fixture state, canonical
children, DOM, CSS, and behavior. The neutral implementation adds no U7 runtime.
No `stable` or Shopify target-ready promotion is claimed.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Native Form specialization; not an address schema, validator, geocoder, auth gate, API client, mutation coordinator, router, live region, or telemetry client. |
| Anatomy and composition | pass | Required native root and complete fields region; optional rows/actions; canonical Form/Input/Select/Button hooks are present. |
| Variants, sizes, and states | pass | One neutral intrinsic profile; responsive rows, optional actions, child validity, and external lifecycle boundaries are defined. |
| Public API and ownership | pass | Only required `fields` and optional `actions`; field state, target lifecycle, layout thresholds, and provider details remain private or target-owned. |
| Tokens and hardcoded values | pass | Two semantic spacing tokens are public; maximum measure and query threshold are private composition. |
| Accessibility and motion | pass | Native names/required validation, visible labels, input-purpose metadata, first-invalid focus, forced-color focus, and zero reduced-motion activity. |
| Responsive/content resilience | pass | Mobile, Tablet, Desktop, XL, equal 480px containers, localized RTL at 200px, and effective 200-percent checks have zero overflow. |
| Runtime and assets | pass | `0 B` U7 runtime delta; no listener, observer, timer, fetch, validator, provider SDK, state store, icon, or target asset. |
| Cross-target translation | pass with integration risks | Web implementation and target mappings are documented; provider authentication/mutation evidence stays target-owned and Shopify remains `planned`. |
| Documentation and verification | pass | Dossier, ADRs, contract, registry, CSS, shared renderer, Studio, MDX, adapters, evidence, validators, and matrix agree. |

## Contract And Composition

- Contract `0.3.0` declares dependencies on Form, Input, Select, and Button.
- Root: native `FORM` carrying `.form.address-form` and the shared
  `container-name: form address-form` inline-size boundary.
- Fields: required `.form__section.address-form__fields` containing the complete
  target-selected localized controls.
- Rows: optional `.form__row.address-form__row`; layout only, without extra
  grouping semantics or field API.
- Actions: optional `.form__actions.address-form__actions`; explicit submit plus
  optional Button `type="button"` or Link cancellation.
- The fixture has five named, required controls: `givenName`, `familyName`,
  `addressLine1`, `city`, and `country`. This inventory is evidence, not a
  universal address schema.
- There is no U7 controlled/uncontrolled value model. Child controls and target
  adapters retain their own value strategies.

## Interaction And Accessibility Evidence

- Emptying First name and activating Save leaves the form invalid, reports
  `valueMissing`, focuses the first field, and creates no false success message.
- Explicit Save serializes five named controls and reports honestly that the
  docs target did not persist an address.
- Selecting Mexico alone produces no submission feedback. Activating Cancel
  keeps `Changed draft` and `Mexico`, uses `type="button"`, finds no reset
  control, and reports only a navigation/close request.
- Omitting optional actions removes both Buttons while retaining the form and
  required fields. The Studio control for required `fields` remains disabled.
- U7 contains no internal live/status/alert region and no author-created
  combobox/listbox/option roles.
- Forced colors preserves focused canonical-field outline (`solid 4px`).
- Reduced motion reports zero non-zero transitions/animations and zero running
  animations in the component subtree.

## Responsive And Parity Evidence

- Exhibit and Studio use the same native root and canonical class composition at
  Mobile, Tablet, Desktop, and XL with zero component, descendant, or document
  overflow.
- At an exact 480px root, normalized DOM hashes match (`4cb62358`) and selected
  computed-style hashes match (`2e0d12b3`). Both equality checks are `true`.
- At 200px, long Arabic labels and actions stack in RTL without clipping or
  horizontal overflow; actions remain in DOM order.
- A 640px viewport used for effective 200-percent reflow remains contained.
- Dark-mode, forced-colors, reduced-motion, invalid-focus, omitted-actions, and
  cancellation states have retained screenshots.
- Eighteen final images and machine-readable results live in
  `output/playwright/refinement-batch-148/`.
- Evidence used one named headless Playwright session and one page. There were no
  console or page errors. Cleanup reports the browser/session closed, the
  managed server stopped, and port 4173 free.

## Cross-Target Translation

| Target | Translation | Readiness |
| --- | --- | --- |
| Neutral Web | Canonical native Form plus canonical Input/Select/Button and U7 container CSS. | Implemented and evidenced; zero U7 runtime. |
| Shopify hosted current accounts | Shopify-owned Profile/Addresses instead of cloned theme markup. | Intentional native handoff; no U7 parity claim. |
| Shopify headless | Canonical U7 composition mapped to authenticated Customer Account address inputs and field-addressable errors. | Contract-ready; live auth/mutation/focus evidence remains integration-owned. |
| Shopify classic compatibility | Separately versioned deprecated customer-address Liquid profile if explicitly selected. | Not the v1 default or automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus project-owned forms, data, auth, and mutation services. | Visual projection available; integration remains target-owned. |
| React / Angular / Hydrogen | Native form wrapper forwarding attributes/events around independently controlled or uncontrolled children. | Contract-ready; no framework dependency in base source. |
| Figma | Auto-layout form with field/action composition regions. | Planned; current generic Button nodes are not U7 approval evidence. |
| SwiftUI / Compose | Native Form/TextField/Picker/Button composition with platform validation and mutation. | Conceptual mapping documented. |

## Performance

- U7 CSS slice: `811 B` raw / `318 B` gzip; SHA-256
  `006cd3f1b45428d2a066042802cf1c07349b1ed977b266616760ccfcb7016ffe`.
- Current Account family CSS: `16,435 B` raw / `2,826 B` gzip, passing the
  permanent `3,072 B` ceiling with `246 B` headroom.
- U7 adds `0 B` runtime. Shared runtime is a family/program asset, not charged
  again to this passive composition shell.
- Current global neutral CSS remains over its existing program ceiling; the
  performance audit records that known shared gap separately from U7.

## Remaining Risks

- Human review must approve maximum measure, grouping, field/action rhythm,
  action alignment, row threshold, fixture language, and final visual identity.
- Each target must prove its localized schema, authentication/authorization,
  protected mutation, field-addressable errors, pending/failure recovery,
  first-invalid or summary focus, auth expiry, success routing, and
  announcements.
- Shopify hosted handoff does not prove headless or classic parity. Those remain
  separate implementations if selected.
- U7-specific Figma evidence remains pending and the existing generic Button
  nodes are not visual approval.

## Validation

Batch 148 covers native semantics, serialization, constraint validation,
explicit submission, no-auto-submit selection, non-reset cancellation,
optional action omission, exact Exhibit/Studio DOM and selected-style parity,
four viewports, localized RTL/200px, effective 200 percent, dark mode, forced
colors, reduced motion, one-page lifecycle, and resource cleanup. Repository
validators and adapters are rerun with this report before the matrix is accepted.

## Readiness Decision

`human-review-ready`. The neutral visual, semantic, technical, responsive,
performance, documentation, parity, and target-boundary gates are complete.
Provider-specific integration evidence and human visual approval remain explicit
risks, so the contract stays `pilot`; no automatic `stable` or Shopify
target-ready promotion was made.
