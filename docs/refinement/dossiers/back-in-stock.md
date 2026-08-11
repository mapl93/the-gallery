# Component Dossier: Back In Stock Alert

Status: `human-review-ready`

Date: 2026-07-20

Registry: `D8` / `back-in-stock`

Accepted direction: D8-A / ADRs 0214 and 0243

## Recommendation

Keep Back In Stock as a selected-variant/current-market availability-request
profile around one native form composed from canonical Input and Button. D8
owns the framed context, intrinsic layout and coherent `idle`, `submitting`,
`confirmed` and `retryableError` presentation. The target integration owns the
provider and drives those states only from real results.

Bind every request to the exact selected variant and current market. “Back in
stock” means that the connected inventory authority later confirms the variant
is purchasable under that market's policy. Preorder, backorder, incoming and
reserved states are not silently equivalent.

After confirmed acceptance, retain the complete form, make the email read-only
instead of disabled, disable resubmission and add truthful adjacent status.
Retryable error keeps the field editable and submit available. Availability
service consent remains separate from marketing consent.

Shopify should host an installed provider app block. The theme publishes and
refreshes exact variant/market context, canonical state classes and styling; it
does not invent a theme-owned notification database, customer/metafield record
or fake registration endpoint.

Keep D8 `pilot`. The implementation is ready for human stability review, but
final visuals, D8-specific Figma evidence and a live selected-provider Shopify
integration remain pending.

## Purpose And Limits

- Offers one service-notification request for an exact selected variant in the
  current market.
- Collects one email address through canonical native Input semantics.
- Submits one native form through canonical primary Button semantics.
- Presents idle, in-flight, provider-confirmed and retryable-provider-error
  states without changing the field-validation model.
- Keeps the form and submitted context visible after confirmation.
- Does not define inventory truth, availability calculation, preorder,
  backorder, reservation, waitlist priority or replenishment policy.
- Does not choose a provider, endpoint, queue, verification service, inventory
  observer or delivery channel.
- Does not infer acceptance from email validity or native `submit`.
- Does not infer marketing consent from availability-service consent or vice
  versa.
- Does not own persistence, idempotency, deduplication, abuse/rate limits,
  retention/deletion, delivery, retry, expiry, stale-record handling,
  unsubscribe or analytics.
- Does not expose internal padding, container threshold, button width, status
  accent geometry, field validation colors or provider schema as public API.

## Accepted Source Facts And Owner Decisions

- The repository remains the source of truth; Figma and external providers are
  evidence/targets.
- ADR 0034 requires explicit human review before `stable`.
- ADR 0075 requires the four canonical Input validation families and primary
  Button composition, not duplicate D8 field/action anatomy.
- ADR 0214 makes native submit a request boundary rather than success and keeps
  neutral D8 at zero runtime.
- The owner selected D8-A: exact selected variant plus current market, connected
  provider authority, distinct service/marketing consent, retained/locked
  confirmed form and retryable error.
- ADR 0243 records that decision and the Shopify app-provider boundary.
- Canonical Input owns value/default/reset, label, email/autocomplete/required,
  read-only, validation, associated message, icon, focus and hover.
- Canonical Button owns submit, busy, disabled, focus, activation suppression,
  label placement and reduced motion.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI form labels](https://www.w3.org/WAI/tutorials/forms/labels/) | Visible labels identify controls. | One canonical visible Email label; placeholder is only a hint. |
| [WAI form instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) | Requirements and purpose should be available before or associated with input. | State notification scope and service-only use before submission. |
| [WAI form validation](https://www.w3.org/WAI/tutorials/forms/validation/) | Native constraints help but server/provider validation remains necessary. | Preserve `type=email`/`required`; provider failure is not an Input syntax variant. |
| [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Submission outcomes need perceivable feedback. | Confirmed uses adjacent status; retryable failure uses adjacent alert semantics. |
| [WCAG 2.2 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Results must be programmatically determinable without unnecessary focus change. | Retain focus/context and add truthful state-timed feedback. |
| [HTML email input](https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)) | Email input supplies native value sanitization and mismatch validation. | Keep one native canonical email owner. |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) | Named successful controls, submitters, FormData and reset are platform behavior. | Preserve one complete native form and provider-owned field encoding. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Form/Input/Button converge; Back In Stock does not exist as a universal primitive. | Domain profile over canonical primitives, not a second control system. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Native field/control/message/submit composition separates field and server messages. | Keep canonical Input validation separate from provider response. |
| [Shopify ProductVariant](https://shopify.dev/docs/api/liquid/objects/product) | Selected variant and availability reflect Shopify commerce context, including continue-selling cases. | Exact selected variant is identity, not a universal availability predicate. |
| [Shopify market](https://shopify.dev/docs/api/liquid/objects/market) | Liquid exposes the current market and its stable ID. | Publish the current market with selected variant context. |
| [Shopify app blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks) | Installed apps render storefront UI in theme-supported app-block hosts. | Main Product hosts the provider; the theme does not pretend to be the app. |

The sources converge on native form semantics, separate field/server feedback,
truthful async states and explicit target integration. They do not establish a
universal provider or availability predicate.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner |
| --- | --- | --- | --- |
| Root | yes | generic `.back-in-stock` with request `data-state` | D8 |
| Heading | yes | contextual native heading | D8 + target |
| Description | no | supporting prose | D8 + target |
| Form | yes | named native `form.back-in-stock__form` | D8 + target |
| Email | yes | canonical `.input` with native email field | Input + target |
| Submit | yes | canonical primary `.btn[type=submit]` | Button + target |
| Request context | target-required | exact variant/market named values or native model data | target |
| Feedback | conditionally required | adjacent status/alert content | D8 semantics + target truth/copy |

Required heading, label, action label, complete native form and exact target
context fail closed in adapters. Description omits without an empty node.
Confirmed/retryable-error requests without non-empty feedback resolve to idle.

## State, Variant, Size And Mode Matrix

| State/mode | Contract |
| --- | --- |
| `idle` | Editable Email, enabled submit and no provider result claim. |
| `submitting` | Form/Button `aria-busy=true`, Email `readonly`, submit disabled, visible label preserved and repeat submit suppressed. |
| `confirmed` | Form retained, Email read-only/focusable/submittable, submit disabled, truthful adjacent `role=status`. |
| `retryableError` | Form retained, Email editable, submit enabled, truthful adjacent `role=alert`. |
| Field Default/Error/Success/Warning | Canonical Input only; field Success is never provider confirmation. |
| Native empty/type mismatch | Constraint validation blocks submit and focuses the field; no provider state appears. |
| Narrow host | One column, Input then full-width Button. |
| Wide host | Input and intrinsic Button share one row. |
| RTL/localized/200 percent | Logical layout and container response retain source/tab order. |
| Forced colors | Root, field/action focus and status boundary remain visible. |
| Reduced motion | D8 adds no motion; canonical transitions/busy animation stop. |

D8 has one visual variant and one intrinsic size. Provider, replacement,
compact/banner/card and viewport-specific variants are not public API.

## Public API And Configurability

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `heading` | string | required | Visible contextual purpose and form-name source. |
| `description` | string | optional | Notification promise/expectation copy. |
| `form` | slot | required complete | Native Input/Button form plus exact variant/market target data. |
| `requestState` | enum | optional; `idle` | `idle`, `submitting`, `confirmed`, `retryableError`. |
| `feedback` | slot | optional/conditional | Truthful localized provider response content. |

Input configures email label/value/default/name/placeholder/autocomplete,
required, validation, message and icon. Button configures its visible action
label. D8 does not duplicate those APIs.

Provider endpoint, field names, variant/market encoding, service notice,
optional independent marketing control and provider policies remain adapter
concerns. Internal layout and state-accent composition stay private.

## Controlled/Uncontrolled And Runtime

Input remains the sole controlled/uncontrolled email owner. D8 owns no mirrored
value store. A framework target may forward Input bindings and one controlled
`requestState`; an HTML target can use native value/FormData/reset and update
state attributes after a provider response.

Neutral D8 adds zero listener, observer, timer, request, storage, formatter,
layout read, custom element or asset. Native form behavior remains available.
Provider runtime belongs exclusively to the target integration.

## Tokens, Layout And Performance

- D8 owns surface, border, contextual typography, intrinsic rhythm and
  confirmed/error feedback surfaces.
- Input owns field, icon, focus, disabled/read-only and validation tokens.
- Button owns action, focus, busy, disabled and motion tokens.
- Status text remains primary text on semantic feedback background plus a
  shape-distinct inline boundary; color is not the only state cue.
- One private container threshold replaces viewport media behavior.
- D8 CSS is `3,291 B` raw / `887 B` deterministic gzip.
- Product CSS is `30,194 B` raw / `4,954 B` gzip, `370 B` below the permanent
  `5,324 B` ceiling.
- D8 neutral runtime remains `0 B`. Shopify reuses the existing product
  coordinator; the exact context addition does not create a second observer or
  request path.

## Accessibility And Content Resilience

- One visible heading names one native form.
- One visible label and associated message identify the email field.
- Native `type=email`, `autocomplete=email` and required semantics are retained.
- Field Error alone uses `aria-invalid=true`; field Success/Warning do not.
- Submit events do not imply success.
- Submitting and confirmed use `readonly`, preserving focus, selection and
  successful form data while blocking resubmission through canonical Button.
- Confirmed uses status semantics; retryable error uses alert semantics.
- Existing focus is not moved on confirmed state.
- Service-only notice is explicit and distinct from marketing consent.
- Eight natural viewports, direct 200/320/480/720px hosts, RTL, extreme text,
  effective 200 percent, text spacing, light/dark, forced colors and reduced
  motion pass without component/document overflow.

## Cross-Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Implemented native form/CSS/state projection; target supplies context/provider transitions. |
| React docs | Implemented shared renderer/fixture with exact Exhibit/Studio parity. |
| Shopify | Implemented canonical class/state + Main Product `@app` host, current variant/market publication, bounded replacement and event projection; installed provider remains external. |
| Webflow / Framer | CSS projection ready; provider form/runtime must implement exact context and state truth. |
| React / Angular / Hydrogen | Thin wrapper over canonical children plus controlled request state; no provider in base. |
| Figma | Planned idle/validation/submitting/confirmed/retryable-error compositions; no provider engine. |
| SwiftUI / Compose | Native email/action/status translation with application-service ownership. |

## Evidence And Readiness

Final manifest:
`output/playwright/refinement-product/back-in-stock-0243/manifest.json`.

- Failures, console errors and page errors: zero.
- Exact normalized Exhibit/Studio DOM hash: `31348d8a`; exact non-geometric
  style hash: `1f3cd214`.
- Native invalid, FormData/reset, submitting, confirmed and retryable-error
  behavior pass.
- Shopify harness replaces the provider app-block region, advances variant
  `111 -> 222` and market `market-a -> market-b`, then emits both identities.
- Generated Shopify adapter advances to 89 target-ready components.
- Resource cleanup leaves port 4173 free and the named browser/server stopped.

## Remaining Risks And Questions

1. Human approval of surface, measure, heading/action hierarchy, density,
   narrow stacking and semantic feedback color/border treatment.
2. D8-specific owner/Figma artwork.
3. Selection and live certification of each deployment's provider, including
   verification, deduplication, abuse, retention, delivery, retry, expiry and
   unsubscribe policy by market.
4. Shopify install/add/remove/reorder/localization, repeated Section Rendering,
   exact payload and real storefront proof with that provider.
5. Existing global neutral CSS/runtime distribution gaps remain program-level
   v1 packaging risks, not D8-local failures.

## Readiness Decision

D8-A's exact identity, availability, consent, state, canonical composition,
accessibility, responsive, runtime and Shopify app-host boundaries are
reconciled. Back In Stock is `human-review-ready`, stays `pilot`, and is not
promoted to `stable` without explicit visual and live-target review.
