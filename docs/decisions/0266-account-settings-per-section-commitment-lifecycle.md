# ADR 0266: Account Settings Per-Section Commitment Lifecycle

- Status: Accepted
- Date: 2026-08-10
- Owners: The Gallery
- Scope: U9 Account Settings save boundaries, immediate controls, consent, and
  platform-hosted settings
- Refines: ADR 0192

## Context

ADR 0192 correctly made U9 a passive section shell and prevented it from
claiming one universal persistence model. It intentionally left global save,
independent section save, immediate effects, consent, and target handoff open.
The owner selected U9-A: a documented mixture per section based on each
setting's truthful commitment lifecycle.

Open UI describes Switch as an immediate-effect binary control. WAI-ARIA APG
defines its stable label and checked state, and current Shopify customer-account
Switch guidance explicitly recommends Switch for immediate effects and Checkbox
for choices that require explicit submission. Notification, marketing, privacy,
and similar consent may also require policy records that cannot be represented
truthfully as ordinary booleans.

## Decision

- U9 remains a passive generic shell. Required `sections` remains its only public
  property; it owns no account schema, root Form, request, storage, validation,
  status, authentication, consent ledger, router, telemetry, or analytics.
- Every target documents one commitment lifecycle for every rendered section.
- Profile-like deferred edits compose canonical Form and submit deliberately.
  The target owns dirty state, validation, pending, failure, conflict,
  authentication expiry, confirmed feedback, focus, refresh, and audit history.
- Effects that truly apply at activation compose canonical Switch and remain
  outside unrelated Save actions. A provisional binary value that waits for
  submission uses canonical Checkbox or another appropriate deferred control.
- A global Form is allowed only when every included setting is coherently
  deferred under the same submission and recovery lifecycle. It never wraps
  immediate Switches or independent policy records merely for visual grouping.
- Marketing, notification, privacy, and other regulated consent remain separate
  policy-backed controls and records. Targets own copy, purpose, legal basis,
  evidence, timestamps, source, confirmation/double-opt-in, revocation,
  unsubscribe, retention, and audit requirements.
- Settings owned by the target platform are linked or omitted rather than
  copied into a neutral flow that cannot preserve provider authentication,
  policy, mutation, conflict, and recovery semantics.
- The docs fixture demonstrates one explicit Profile Form and one immediate
  Display group. Its Switches are non-consent presentation preferences. Demo
  feedback remains outside U9 and never claims persistence.
- Shopify maps sections independently to supported customer-account profile,
  block, or full-page extensions, authenticated service/API operations,
  policy-backed consent flows, hosted links, or omission. Theme CSS alone is
  not behavior readiness.
- U9 remains `pilot`; explicit human review and live target mutation/policy
  evidence are required before `stable` or Shopify target-ready promotion.

## Consequences

- Consumers can understand when a control takes effect without guessing whether
  an unrelated Save button applies to it.
- Canonical Form, Input, Button, Switch, Checkbox, feedback, and policy surfaces
  retain their own semantic and controlled/uncontrolled contracts.
- U9 avoids flattening a heterogeneous account domain into unstable root props.
- Platform-hosted settings remain authoritative and are not cloned for visual
  parity at the cost of incorrect behavior.
- The fixture no longer misrepresents notification/security consent as generic
  immediate switches.

## Not Approved

This decision does not approve:

- one unconditional global Save action for all settings;
- a Switch whose state remains provisional until later Form submission;
- generic booleans for marketing, notification, privacy, or regulated consent;
- copied platform-hosted settings without provider lifecycle parity;
- target mutation, provider SDK, or account state in neutral U9 source; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://html.spec.whatwg.org/multipage/forms.html#the-form-element>
- <https://www.w3.org/WAI/ARIA/apg/patterns/switch/>
- <https://open-ui.org/components/switch.attribute.explainer/>
- <https://www.radix-ui.com/primitives/docs/components/switch>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/forms/switch>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components>
