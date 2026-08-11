# ADR 0222: Pin Input Independent Native Segment Ownership

- Status: Accepted
- Date: 2026-07-20
- Related: ADR 0220, `docs/refinement/owner-decision-responses.md`

## Context

The baseline Pin Input displayed separate native character fields but had no
complete group label, submission convention, shared Web behavior or cross-mode
certification. The research recommendation proposed one full-code input with
derived visual cells to simplify autofill and form ownership.

The owner explicitly selected the alternative in which every visible cell is a
real, independently clickable and focusable input. A hidden mirrored full-code
field would contradict that choice and create a second state owner.

## Decision

- The canonical root composes Field Wrapper and contains a visible group label,
  one ordered control region, and real native `input[type=text]` segments.
- v1 accepts numeric characters. Every segment uses `maxlength=1`, numeric
  input mode and a numeric pattern. Alphanumeric and masked-secret modes are not
  inferred by this decision.
- Every segment is in ordinary Tab order, directly clickable and independently
  focusable. Accepted typing advances; Backspace on an empty segment moves
  backward; horizontal arrows follow logical visual direction in LTR and RTL.
- Paste and multi-character autofill are progressively distributed across the
  same real inputs. No hidden input, mirrored string field or duplicate form
  owner is introduced.
- Every segment receives the same non-empty target-supplied `name`. Static Web
  preserves order through `FormData.getAll(name)`; a target may join that array
  when its service expects one string.
- Static Web leaves native segment values uncontrolled after their initial
  values. Stateful targets may control one ordered segment collection or expose
  an uncontrolled initial collection, but bind the same native owners.
- Filled state and complete state are derived. Completion does not submit,
  verify, blur, redirect or create a live announcement. Delivery, expiry,
  resend, verification, errors and commercial/account consequences remain
  target-owned.

## Consequences

- The neutral Web runtime gains bounded segment coordination and reset support;
  it makes no request and starts no timer or observer per instance.
- Field Wrapper owns visible label, required marker, description and one current
  validation message. Pin Input owns only group/segment relationships and
  character coordination.
- Shopify and future adapters must preserve real independent segments and the
  repeated-name convention even when their framework API projects one ordered
  value collection.
- This candidate still requires visual and interaction evidence and explicit
  human review. It remains `pilot` and is not promoted to `stable`.
