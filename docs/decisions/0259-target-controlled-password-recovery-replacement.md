# ADR 0259: Target-Controlled Password Recovery Replacement

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: U2 Password Reset request/confirmation composition, focus, Shopify
  current customer accounts, and compatibility targets
- Refines: ADRs 0185 and 0258

## Context

ADR 0185 correctly makes Password Reset a passive recovery-request shell and
keeps provider/security lifecycle outside neutral source. Its site fixture kept
the request Form mounted while adding confirmed Alert feedback because the
request-versus-confirmation policy was unresolved.

The owner selected U2-A: request and provider-confirmed presentations are
mutually exclusive target-controlled compositions, not a neutral success
boolean or transition machine. The target owns the actual provider response and
replaces the request Form only when that response is confirmed.

U0-A and ADR 0258 separately establish Shopify v1 on current customer accounts.
That target uses passwordless sign-in by default, so it has no customer password
reset surface to map from U2. Classic password recovery belongs to the separate
legacy account architecture.

## Decision

- U2 continues to require non-empty visible `title` and `text` and optionally
  places one passive decorative illustration.
- A valid request composition supplies one complete canonical Form containing
  target-owned Input and Button dependencies. A valid confirmed composition
  supplies one non-empty `successMessage` rendered through canonical Alert.
- Request Form and confirmed Alert are mutually exclusive in one rendered U2
  instance. The target selects the composition; U2 exposes no public `state`,
  `success`, `sent`, `loading`, transition, timer, request, or provider API.
- The target keeps request composition available through initial submission and
  any truthful field/global error correction or retry. It selects confirmed
  composition only after a provider-confirmed response.
- Dynamic confirmed Alert uses polite status semantics. If replacing the Form
  removes the focused submitter and would strand focus, the target moves focus
  to the Alert root or heading. It does not move focus merely to force an
  announcement when focus remains meaningful.
- The Gallery Studio fixture simulates target confirmation, replaces the Form,
  and focuses the programmatically focusable Alert root. This is evidence of
  target ownership, not a neutral state machine or public property.
- Generic anti-enumeration copy, uniform timing, provider lifecycle, failures,
  retry, rate limiting, abuse controls, delivery, secure token lifecycle,
  routes, privacy, analytics, and support remain target-owned.
- Shopify v1 intentionally omits U2 because current customer accounts are
  passwordless and Shopify-managed. Classic `recover_customer_password` and the
  distinct token-backed `reset_customer_password` step may exist only in a
  separately versioned compatibility adapter.
- Contract `0.3.0` remains `pilot`. U2 may enter human review, but live provider
  proof and final visual approval remain required before target readiness or
  `stable`.

## Consequences

- Confirmed recovery is no longer visually mixed with an editable request Form
  whose submitter already succeeded.
- Neutral source remains target- and framework-independent while targets can
  use provider-specific recovery lifecycles safely.
- Shopify v1 does not expose an irrelevant password-reset surface; targets that
  genuinely support passwords can still compose U2.
- The existing `form` and `successMessage` properties become conditionally
  required composition inputs: one valid presentation needs exactly one of
  them, not both. No new public state property is added.

## Not Approved

This decision does not approve:

- simultaneous request Form and confirmed Alert in one U2 instance;
- a neutral success boolean, request client, timeout, email delivery, token,
  account lookup, or authentication state machine;
- copy, timing, errors, or field treatment that reveals account existence;
- a Shopify v1 classic Liquid fallback; or
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
- <https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html>
- <https://help.shopify.com/en/manual/customers/customer-accounts>
- <https://shopify.dev/docs/api/liquid/tags/form#form-recover_customer_password>
