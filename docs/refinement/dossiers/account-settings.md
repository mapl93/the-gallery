# Component Dossier: Account Settings

Status: `human-review-ready`

Target under review: Neutral Web account-preference section shell; Shopify
projection conditional on the selected current customer-account architecture

Contract: `components/contracts/account-settings.contract.json`

## Recommendation

Define U9 as a passive, target-controlled account-preference section shell. Its
neutral responsibility is a bounded content measure plus repeated thematic
sections with a visible contextual heading, optional description, and a
composition region. It must not be the form, request, persistence, validation,
authentication, customer-data, routing, status, or analytics owner.

Use a generic `div.account-settings` root because the root exists to arrange
already-titled sections. Every
child is a native `section.account-settings__section` labelled by its visible
heading. A section description is visible content with a stable ID so a
target-owned Form or logical control group can reference it when useful. The
required `sections` slot remains U9's only public property; section schemas,
titles, descriptions, controls, actions, order, persistence strategy, and
account API remain target composition.

Remove root `submit` and `change` behavior from the contract. ADR 0266 records
the owner-selected U9-A direction: every target documents one truthful
commitment lifecycle per section. Profile-like deferred sections compose their
own canonical Form; effects that apply at activation compose immediate controls
outside unrelated Forms; consent remains a policy-backed record; and settings
hosted by a platform are linked or omitted. A global Form is valid only when
every section it contains is coherently deferred under the same lifecycle.

Canonical Switch already means an immediate binary effect. Open UI and current
Polaris customer-account guidance both distinguish that behavior from a
deferred choice that waits for a Save action. If a setting is deferred, the
target must use the semantically appropriate canonical control rather than put
a Switch behind an unrelated Save button. The docs fixture demonstrates one
profile Form and one immediate Display group, but it must announce
truthfully that intercepted demo actions do not save account data.

Compose the canonical Form, Input, Button, and Switch implementations. Add Form
as an explicit dependency instead of reproducing a form stack or action row in
Account Studio. Replace the duplicated local Input and Switch trees with shared
artwork renderers. Keep demo values and controlled React state in the docs
target only. Render target feedback adjacent to, not inside, U9 and only after
an action creates a real message.

Use one named `account-settings` container, logical dimensions, existing
spacing/type tokens, and private maximum-measure and rhythm variables. Remove
all U9-only Studio width, grid, icon, switch-order, and action overrides. U9
must not change canonical Switch part order, iconography, focus, motion, hit
target, or validation presentation.

The contract remains `pilot`. The neutral commitment model is resolved. Each
consumer still chooses its actual account inventory, platform-hosted handoffs,
data providers, consent policy, authentication/protected-data architecture,
and mutation lifecycle. Human review still owns final visual approval and any
component-specific owner artwork.

## Purpose And Limits

- Organizes target-defined account preferences into concise titled sections.
- Supplies a consistent content measure, divider rhythm, copy hierarchy, and
  composition region for canonical controls and Forms.
- Allows a documented per-section mixture of explicit save, immediate effect,
  policy-backed consent, platform handoff, and non-persistence content without
  encoding target data behavior in the base component.
- Is not an account schema, profile model, customer API, password flow,
  notification service, consent ledger, authentication gate, permissions
  engine, persistence adapter, mutation queue, dirty-state tracker, validation
  engine, error summary, router, live region, telemetry client, or analytics
  client.
- Does not prescribe profile, password, security, notification, privacy,
  subscription, deletion, or marketing sections.
- Does not own child labels, names, values, autocomplete purposes,
  requiredness, checked state, validation, action labels, submitters, focus, or
  controlled/uncontrolled behavior.
- Does not imply that all settings share one save lifecycle or that a visual
  Switch is a deferred checkbox.

## Repository Baseline Before Refinement

- Registry `U9`, account, depends on Input, Button, and Switch and describes
  fixed profile, password, and notification sections. Contract `0.1.0`,
  `pilot`, exposes only `sections` but also assigns both `submit` and `change`
  to the root, effectively claiming every persistence model at once.
- The root is a native `form.account-settings`. Account Studio always renders a
  global `Save changes` submitter even though the only open U9 product question
  asks whether persistence is global, immediate, or section-specific.
- The notification Switches sit behind that global Save action. This conflicts
  with the accepted Switch contract's immediate-effect behavior and current
  Open UI/Polaris distinction between immediate Switch and deferred Checkbox.
- Account Studio locally reproduces Input markup through `Field`, reproduces
  Switch input/track/thumb/label markup twice, and adds Lucide icons inside
  Switch labels. It does not consume a shared Account Settings or Switch
  artwork renderer.
- Studio Inputs have no submission `name`, so the global Form cannot serialize
  the displayed profile values. The two Switches likewise have no names or
  submitted values.
- Submit always reports `Settings saved in this preview.` even though no target
  account data is written. An empty `role=status` live region is always present
  inside the final canonical section.
- Runtime Exhibit and Studio use the same registered `AccountStudio`, but U9
  has no isolated shared renderer. MDX serializes a different three-section
  fixture with a Security Button, one profile field, and one checked Switch.
- U9 CSS hardcodes `560px`, `24px`, `16px`, and weight `600`, uses physical
  `max-width`, omits line heights, has no named container, and leaves root and
  content minimum sizing implicit.
- Studio duplicates `560px`, adds two custom `16px` grids, reverses canonical
  Switch label/track order with `order:-1`, forces `space-between`, injects
  fixed `18px` icons, and creates a separate action layout.
- Existing Mobile/Desktop baseline covers only the default fixture. It does not
  verify root behavior when sections are omitted, native FormData, honest
  feedback, Switch-versus-submit separation, direct narrow containers,
  Tablet/XL, localized/RTL/unbroken content, effective 200 percent, dark mode,
  forced colors, or reduced motion.
- Shopify copies Account CSS but has no selected current profile extension,
  full-page extension, authenticated Customer Account API integration, consent
  mutation, or explicit compatibility profile. CSS presence is not account-
  settings readiness.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` resolve to the generic Button Component Detail/Studio shells. They
  provide no U9 anatomy or visual approval.
- Deterministic gzip level-9 baseline: U9 CSS slice `670 B` raw / `347 B` gzip;
  Account CSS `15,593 B` raw / `2,776 B` gzip against the `3,072 B` family
  ceiling; generated Web component CSS `507,828 B` raw / `68,459 B` gzip
  against the existing `65,536 B` program ceiling; shared runtime `53,811 B`
  raw / `10,501 B` gzip. U9 neutral runtime is currently zero; local controlled
  demo state is site-only.
- Baseline U9 CSS SHA-256 is
  `ddb2378e4e6f6a1088c9a80d9522855fffc6617d179f976f9807d9b39351271a`.
  Baseline Exhibit Desktop/Mobile SHA-256 values are
  `3da372aa7bae05d4e2d22a480b84a976279adfd901c1365fc7664a9bf06eba75`
  and
  `73f8664a8f78653a81d96a8205e2fc9a410dcc5cac02e7bb020bea4ab7e1f93d`;
  Studio Desktop/Mobile values are
  `fea314944b3c284d99a8e8cd8770e1d754a9f957e2e445379bc1bb65b40dea3e`
  and
  `5b433512d24e55fe871c89caa33b857047285e59188d07bfcf3e3939f3c7a064`.
  They are before evidence, not owner approval.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | A section is a thematic grouping typically identified by a heading; `div` is preferred when a wrapper exists only for styling or scripting convenience. | Use a passive `div` root and native heading-labelled child sections; do not turn the shell into an application widget or form landmark. |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html#the-form-element) | A native Form owns associated controls, successful-control names, constraint validation, submitters, reset, and submission events. | Let targets compose canonical Form at the global or section boundary; U9 must not claim Form semantics without a selected persistence boundary. |
| [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) and [Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) | Visible labels identify controls; related controls should be grouped visually and programmatically, commonly with `fieldset`/`legend` or labelled group semantics. | Child Inputs retain labels; target switch groups reference a visible section title/description or use an appropriate Fieldset. U9 supplies IDs, not a universal control group. |
| [APG Switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | A Switch has stable labeling, binary checked state, Space activation, and labelled/described group semantics. | Consume canonical native-checkbox Switch; preserve its label and state ownership and add no parent keyboard model. |
| [Open UI Switch explainer](https://open-ui.org/components/switch.explainer/) | Switching has an immediate effect and differs from Checkbox because it requires no later confirmation. | Do not place notification Switches behind an undifferentiated U9 Save action; deferred target choices need a different canonical control. |
| [Radix Switch](https://www.radix-ui.com/primitives/docs/components/switch) | Mature Switch API separates `defaultChecked`, controlled `checked`, `onCheckedChange`, disabled/required/name/value, and root/thumb parts. | Keep checked strategy and form data on Switch; U9 receives composition, not flattened Switch props or local hidden state. |
| [Polaris customer-account Switch](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/forms/switch) | Current guidance reserves Switch for immediate settings and directs deferred choices to Checkbox. It supports label, checked/defaultChecked, name/value, disabled, and change. | Shopify translation must preserve immediate semantics and cannot map all U9 sections to one generic Liquid form. |
| [Polaris customer-account Form](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/forms/form) | Form groups related fields for one programmatic submit and recommends separate Forms for independent data collection. | A Shopify target selects global or independent Form boundaries; U9 remains the visual shell around those target-native components. |
| [Customer Account API `customerUpdate`](https://shopify.dev/docs/api/customer/latest/mutations/customerupdate) | Current authenticated API updates selected personal information, requires customer write scope, and returns user errors. Separate mutations own marketing consent. | Profile fields, writable data, scopes, protected-data handling, mutation errors, and consent policy are target architecture rather than U9 API. |

Open UI defines Switch behavior but no Account Settings shell. Radix exposes
leaf control state rather than a persistence-aware settings page. Polaris
provides target-native Form, Input, Switch, profile extension, and Customer API
surfaces rather than one portable settings schema. The references converge on
section composition and leaf-control ownership while leaving persistence and
data architecture to the target.

## Matches, Differences, And Direction

- Preserve required `sections` as the only stable semantic property. Do not add
  profile fields, notification booleans, passwords, section arrays, action
  labels, endpoint, pending, error, success, save mode, columns, or breakpoint
  properties.
- Make the root a passive `div`; native child sections own their visible
  headings. A target may place a Form outside the root or inside a section.
- Add header/content/control-group anatomy only as composition parts, not as a
  fixed account schema.
- Remove root `submit`/`change` events and generic persistence promises. Child
  Form, Input, Button, Switch, and target service keep their own events.
- Add canonical Form dependency and use shared Input and Switch renderers. Keep
  direct canonical Button markup only as the dependency's native action.
- Remove Lucide icons and all U9-specific Switch reordering so the composed
  dependency retains its canonical anatomy and visuals.
- Render status only after target/demo interaction, adjacent to U9. The docs
  message states that no account data was saved.
- Use a named container, logical measure, `min-inline-size:0`, wrapping, token
  rhythm, and zero U9 runtime.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root | yes when sections exist | `div.account-settings` | U9 measure/composition only |
| Section | one or more | `section.account-settings__section[aria-labelledby]` | U9 thematic wrapper + target section choice |
| Section header | yes | `.account-settings__section-header` | U9 copy layout |
| Section title | yes per section | contextual heading `.account-settings__section-title[id]` | target content/rank + U9 label relationship |
| Section description | optional | `.account-settings__section-description[id]` | target explanatory content |
| Section content | yes | `.account-settings__section-content` | target composition slot |
| Related-control group | optional | `.account-settings__controls` plus target `role=group` or Fieldset | target semantics + U9 visual stack |
| Form | optional global or per section | canonical `form.form` | Form + target submission boundary |
| Fields/actions | target-defined | canonical Input/Button/other controls | dependency and target data policy |
| Immediate preferences | target-defined | canonical Switch | Switch + target immediate persistence |
| Feedback/error summary | never internal U9 anatomy | adjacent target Status/Alert or Form summary | target lifecycle |

## State, Variant, Size, And Content Matrix

| Dimension | Direction |
| --- | --- |
| Variant | One neutral section shell. No profile/security/marketing/provider variants. |
| Size | One intrinsic maximum measure; child content responds to its own containers. |
| Sections present | Required non-empty target composition; docs renderer fails closed when omitted. |
| Description | Optional per section; title remains required and labels the section. |
| Global explicit save | Allowed only when every included section is coherently deferred under the same Form submission and recovery lifecycle. |
| Section explicit save | Target composes independent canonical Form(s) inside relevant sections. |
| Immediate setting | Target composes canonical Switch and persists/reconciles on change. |
| Deferred binary choice | Target uses Checkbox or another canonical deferred control, not Switch plus hidden Save semantics. |
| Validation | Child control/Form/target-owned; U9 has no invalid state. |
| Pending/success/error/offline/auth | Target-owned and outside U9 anatomy. |
| Content stress | Empty omission, short, long, localized, RTL/mixed, unbroken, direct 320/200px, effective 200 percent, and extreme field/control content remain contained. |
| Media modes | Light, dark, forced colors, reduced motion, coarse pointer, and keyboard inherit dependencies without U9 overrides. |

## Public API And Controlled State

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `sections` | slot | required non-empty composition | Target-selected titled sections, canonical controls, Form boundaries, and actions. |

U9 has no controlled/uncontrolled data state. Form owns native submission and
reset; Input owns its current/default value strategy and validation semantics;
Switch owns current/default checked state and immediate change; Button owns
activation/busy/disabled presentation. The target owns writable fields,
customer truth, dirty state, requests, pending/failure/success, reconciliation,
focus, announcements, authentication, authorization, consent, routing,
analytics, and refresh.

## Tokens, Runtime, And Performance Direction

- Retain only U9-owned border, text, spacing, heading/body typography, and
  semibold heading-weight tokens.
- Replace hardcoded width, section padding, copy margins, and weight with a
  private maximum measure and private aliases to existing semantic tokens.
- Do not expose maximum width, section count, divider policy, gaps, Form
  boundary, control order, action alignment, or breakpoints as public API.
- Remove Studio-only U9 CSS instead of adding compensating selectors.
- Neutral U9 runtime remains exactly `0 B`: no listener, observer, request,
  timer, storage access, state mirror, mutation queue, or live region.
- Account family ceiling remains `3,072 B` gzip. U9 may spend only the existing
  family headroom and should offset added semantic structure by deleting Studio
  duplication; complete Web CSS and shared runtime pre-existing gaps must not
  grow materially.

## Accessibility And Responsive Requirements

- Every native child section has one non-empty visible contextual heading with
  a unique ID and `aria-labelledby`. Heading rank remains target/context owned.
- Section descriptions remain visible, concise, and referenceable. Related
  Switches use one labelled/described group when target composition presents
  them as a logical set.
- Every Input has a visible explicit label, unique ID, stable non-empty name
  when submitted, appropriate autocomplete purpose, and child-owned error
  association.
- Every Switch preserves stable visible label, checked state, Space activation,
  native form value where relevant, focus ring, disabled state, forced colors,
  and reduced motion.
- A deferred Form has an explicit canonical submit Button and target-owned
  validation/error lifecycle. An immediate Switch does not wait for that Button.
- Target-inserted success/failure text uses appropriate Status/Alert semantics
  and sufficient context; empty live regions are not U9 anatomy.
- Use logical sizing, `max-inline-size`, `min-inline-size:0`, emergency wrapping,
  and one named container. Verify no component/document overflow at four
  viewports, 320px, 200px, localized RTL, unbroken text, and effective 200%.

## Cross-Target Translation

| Target | Mapping | Current boundary |
| --- | --- | --- |
| Neutral Web | Passive `div`, heading-labelled `section`s, canonical Form/Input/Button/Switch composition, external target feedback. | Implementable with HTML/CSS and zero U9 runtime. |
| Shopify latest customer accounts | Profile block/full-page extension with Polaris Web Components and authenticated Customer Account API/consent mutations selected per section. | Target-native and viable, but no profile/extension architecture, scopes, protected-data policy, or save boundaries are selected. |
| Shopify theme/storefront | Explicit compatibility form, app block/proxy, or omission. | Latest customer accounts are not a universal theme-Liquid Account Settings page; copied CSS is not behavior readiness. |
| Headless/Hydrogen | Authenticated service composes global/per-section Forms and immediate settings against its own customer model. | Planned; data schema, auth, mutation, consent, and lifecycle required. |
| React / Angular | Passive slot shell; adapters preserve child controlled/uncontrolled strategies and target async state. | Contract-ready after neutral refinement; no framework state store in base source. |
| Figma | Section/header/content composition and selected child states only. | Registered nodes are generic Button shells, not U9 visual approval. |
| SwiftUI / Compose | Native settings sections/forms/toggles with target data and async persistence. | Conceptual; target semantics and lifecycle evidence required. |

## Exhibit And Studio Parity Plan

- Create one `AccountSettingsArtwork` and one titled-section renderer used by
  the registered Account Studio in both Exhibit and Studio.
- Compose shared `InputArtwork`, shared canonical Switch artwork, canonical Form
  classes, and canonical Button classes; remove copied local U9 trees.
- Keep one fixture: explicit profile Form plus immediate non-consent Display
  Switches.
  This fixture illustrates supported composition and is not a component default.
- Put honest site-only action feedback after the canonical root and render it
  only when non-empty.
- Keep MDX as a matching static fallback with the same root/section/Form/group
  boundaries and no competing Security section.
- Remove U9-specific Studio layout and icon overrides. At equal container width,
  normalized DOM and computed canonical styles must match exactly.

## Risks And Open Questions

- Resolved by ADR 0266: U9 uses a documented mixture per section; deferred
  profile changes use explicit canonical Forms, immediate effects use Switch,
  consent is policy-backed, and platform-owned settings are linked or omitted.
- Each consuming product must still select its v1 settings, writable fields,
  hosted handoffs, authentication, protected-data handling, and concrete data
  provider before live integration.
- Targets own dirty-state warnings, confirmed versus optimistic mutation,
  pending/disabled states, retries, conflicts, auth expiry, focus,
  announcements, consent evidence, and audit history; neutral U9 cannot certify
  those without a real target implementation.
- Shopify still requires a chosen Profile/block/full-page extension,
  authenticated service/API, policy-backed consent flow, hosted link, or
  omission per section. Copied CSS is not target behavior readiness.
- Human review must approve maximum measure, divider rhythm, heading scale,
  copy spacing, canonical Switch order, fixture copy, four-viewport visuals,
  and corrected U9-specific owner artwork.

## Accepted Implementation Decision

Proceed with the passive root, titled sections, canonical dependencies, no U9
persistence events/state, logical/tokenized CSS, shared renderer/fixture,
honest external demo feedback, adapters, and evidence. Apply ADR 0266's
per-section commitment lifecycle without adding target data or provider APIs.
Keep final aesthetics, live target integrations, and `stable` promotion outside
automatic certification.

## Implemented Result

- Contract `0.3.0`, registry, Studio metadata, MDX, adapter documentation, ADR
  0192, and ADR 0266 define one passive section shell with required `sections`
  as its only public property and no root events or data state.
- `AccountSettingsArtwork` supplies the shared fail-closed root and labelled
  section renderer. Exhibit and Studio consume that same renderer and fixture.
- The profile fixture composes canonical Form, two named/autocomplete-aware
  Inputs, and one named submit Button. The Display fixture composes two
  immediate non-consent canonical Switches in a section-labelled group.
- `SwitchArtwork` replaces the duplicated Studio Switch tree and is also used
  by the canonical Switch Studio. U9's local Input helper, icon decoration,
  label reordering, action layout, and simulated persistence claim are removed.
- Demo feedback is adjacent site content created only after an interaction and
  states explicitly that no account setting was saved.
- U9 CSS uses logical dimensions, private aliases, semantic tokens, a named
  container, intrinsic containment, and no media breakpoint or runtime.
- Canonical Account CSS is byte-identical in Neutral Webflow and Shopify copied
  projections. Shopify remains `planned`, not target-ready, until its account
  surface, APIs, scopes, consent, and persistence lifecycle are selected.

## Certification Evidence

- Batch 150 finds a passive `DIV`, two native heading-labelled `SECTION`s, one
  canonical Form inside Profile, two successful named/autocomplete-aware
  Inputs, one named submitter, two named immediate Display Switches, one
  labelled/described control group, and zero internal live regions.
- Editing Profile creates no feedback, submits nothing, and does not change the
  immediate controls. Deliberate submit serializes `displayName`, `email`, and
  `intent=update-profile`; the adjacent demo Status explicitly says no account
  setting was saved.
- Pointer and Space activation change the Display Switches without submitting
  the Profile Form. The fixture contains no marketing, notification, security,
  or consent-like Switch. Keyboard and forced-colors focus retain a solid `4px`
  outline.
- The required `sections` Studio control is checked and disabled. A forced
  malformed omission produces no `.account-settings` root; restoring the
  fixture restores both sections.
- At exact `512px` component width, normalized Exhibit and Studio DOM share
  FNV-1a `d43da67e`; selected computed styles share `fe73d09c`.
- Mobile, Tablet, Desktop, and XL in both modes have zero component, part, and
  document overflow. Localized RTL at `200px` and effective `200%` text at
  `320px` also remain contained. Reduced motion retains zero active animation
  or transition and no application console/page error occurs.
- Eight natural viewport images plus commitment, parity, localized, dark,
  forced-color, and reduced-motion evidence and machine-readable results live
  in `output/playwright/refinement-batch-150/`.
- Evidence reused one responsive pre-existing Gallery server, one stable
  headless Playwright session, and one tab. Cleanup closed the owned session,
  preserved the external server, and passed `evidence:assert-clean`.

## Final Performance

- U9 CSS changes from `670 B` raw / `347 B` gzip to `1,669 B` raw /
  `525 B` gzip: `+999 B` raw / `+178 B` compressed for explicit passive
  anatomy, logical containment, token aliases, and typography ownership.
- Account CSS is `16,435 B` raw / `2,826 B` gzip and passes the `3,072 B`
  family ceiling with `246 B` headroom.
- The current generated Web component CSS is `535,334 B` raw / `71,886 B`
  gzip. Its existing program-level budget gap remains tracked independently;
  U9 remains locally within its family budget.
- Shared runtime is `117,741 B` raw / `22,836 B` gzip with SHA-256
  `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`;
  neutral U9 runtime delta is `0 B`.
- Final U9 CSS SHA-256 is
  `f381bf95e04db4d4d674be83fa35fbded325256465e8695cd4cf0a54b111f2cd`;
  final Account CSS SHA-256 is
  `8c82120ce39fbaee8f6becda07c2f6b1d481f1ad1382b1696c90252faf76a76b`.

## Readiness Decision

U9 is `human-review-ready` and remains `pilot`. ADR 0266 resolves the neutral
per-section commitment model; contract, implementation, documentation,
responsive/accessibility evidence, and adapter boundary now agree. A real
consumer still owns account inventory, protected mutation/authentication,
policy-backed consent, platform handoffs, and target-specific lifecycle proof.
Human review must approve final visuals and owner artwork. No `stable` or
Shopify target-ready promotion was made.
