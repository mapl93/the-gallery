# Refinement Batch 166 — Commission Form Decision Reconciliation

Date: 2026-08-11

Component: R8 `commission-form`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 62 confirms `R8-A`, matching ADR 0208 and the current
implementation:

- R8 is an embeddable commission-intake composition, not a universal field or
  record schema;
- the target owns the Form root and submission lifecycle;
- a standalone consumer wraps R8 in canonical Form/native semantics;
- an embedded consumer reuses its owning Form and never nests forms;
- required canonical fields remain the viability gate;
- optional title, guidance, File Upload and Button actions omit independently;
- reference upload renders only with a verified secure app/backend path;
- validation, privacy, retention, provider behavior and confirmed outcomes
  remain target-owned.

No component source change was required.

## Existing Evidence Reused

The current R8 CSS slice is byte-identical to the fully evidenced Batch 117
slice:

`333c2eaf95aca275ce9d30e840c23c1f55bb128753aa56fe60c988a61d6aaabf`

Batch 117 already proves strict field omission, optional region omission,
canonical Input/Textarea/File Upload/Button composition, native names,
required/email/autocomplete validation, submitter/FormData, one FileList, Enter,
native reset, truthful local feedback, keyboard source order, eight paired
natural viewports, direct `200/320/520/640px` roots, long filename, localized
RTL, effective 200% text, user spacing, AA contrast, forced colors, reduced
motion, exact normalized DOM/style parity, source-identical target CSS and zero
neutral R8 runtime. Representative captures were visually re-inspected during
reconciliation.

## Current Targets And Performance

- R8 CSS: `1,695 B` raw / `566 B` gzip, exact Batch 117 SHA;
- Ceramics CSS: `36,881 B` raw / `5,345 B` gzip against `5,427 B`, leaving
  `82 B` headroom;
- R8 runtime/listeners/observers/timers/requests: zero;
- Webflow and Shopify Ceramics CSS: source-identical;
- current global contract, Studio, docs, parity, adapter and component audits
  pass.

No browser or server was opened for this source-identical decision
reconciliation. The pre-existing user-owned Gallery server was not touched,
`site/dist` is unchanged and resource cleanliness remains passing.

## Remaining Gates

- approved field inventory, consent/privacy/retention and business validation;
- real submission provider, security, idempotency and response lifecycle;
- verified upload validation/scanning/storage/deletion path when enabled;
- first standalone/embedded and Shopify consumers;
- final visual review and R8-specific design evidence;
- explicit human stability approval.

No `stable` promotion is authorized.
