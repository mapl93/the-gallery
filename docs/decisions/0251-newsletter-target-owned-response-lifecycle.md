# 0251. Newsletter Target-Owned Response Lifecycle

Status: Accepted

Date: 2026-07-21

Builds on: ADRs 0081 and 0164

## Context

ADR 0164 completed G2's native form composition, intrinsic response and
target-native Shopify mapping, but intentionally left one architecture question
open: whether pending, success, error, retry and duplicate handling should be a
neutral Newsletter state machine or remain target-owned.

The owner selected G2-A. Newsletter is a thin title, copy, optional note and
optional confirmed-response placement around canonical Form, Input and Button.
The target that performs the subscription is the only layer able to report its
actual outcome truthfully.

## Decision

- Neutral G2 exposes no pending, success, error, retry, duplicate, provider or
  consent state machine.
- Newsletter continues to own only the titled section, optional description,
  required native Form composition, optional privacy/frequency note, intrinsic
  layout and one optional target-authored response placement.
- Canonical Input remains the sole Email value, name, autocomplete, constraint,
  validity, message, focus and disabled/read-only owner. Canonical Button
  remains the submit activation, focus, disabled and busy owner.
- The consuming target owns consent policy, persistence, submission,
  provider/service integration, duplicate handling, confirmed outcomes, retry,
  value preservation/reset and any resulting focus or announcement behavior.
- A target may render confirmed response content in `.newsletter__status`,
  replace the form, navigate or use another target-native result surface. G2
  does not standardize that placement or infer a result from submission alone.
- Capable Web targets preserve real native form submission and validation.
  Documentation fixtures may intercept a valid submit only when they state
  truthfully that no subscription was sent.
- Shopify v1 uses its native `customer` form, platform field names and only
  server-confirmed errors or success. Those facts do not become neutral states.
- Provider, endpoint, double opt-in, CAPTCHA, throttling, retention, analytics
  and evidence of consent remain target/product policy, not G2 properties.
- G2 remains `pilot`. This architecture decision makes it eligible for human
  visual/stability review but does not constitute that review or promote it to
  `stable`.

## Consequences

- The neutral base remains portable and adds zero runtime, network or provider
  dependency.
- Targets can use their real result and recovery models without pretending one
  provider-independent state machine is universal.
- Form-level results cannot be reused as Email field validation or asserted
  before a target confirms them.
- Existing Batch 83 DOM, interaction, responsive, special-mode and Shopify
  evidence remains valid because G2-A accepts the implemented boundary without
  changing markup, CSS or runtime.
- Final measure, hierarchy, type, surface, field/action treatment, localized
  copy, target integration and G2-specific design evidence remain human-review
  gates.

## References

- <https://html.spec.whatwg.org/multipage/forms.html>
- <https://www.w3.org/WAI/tutorials/forms/>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
- <https://shopify.dev/docs/api/liquid/tags/form#form-customer>
