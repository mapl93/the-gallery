# 0138. Native Review Form Composition And Target-Owned Submission

Status: Accepted

Date: 2026-07-15

## Context

V7 Review Form entered component refinement with its neutral boundary mostly
accepted by ADR 0085: one native form composes Star Input, Input, Textarea, File
Upload, Select, and Button, while provider and submission workflow remain open.
The implementation and formal graph nevertheless disagreed in several places:

- registry and contract declared only `star-input` as a dependency even though
  the contract and renderer explicitly composed six canonical components;
- the shared renderer left Input and Select messages unassociated;
- File Upload used a generic root, merged selection status into guidance, and
  omitted canonical selected-file status anatomy;
- an image-only docs policy looked like a neutral review default; and
- unused Review Form field/photo selectors preserved a second implied markup
  contract after child ownership had been accepted.

The Reviews CSS family had only one deterministic gzip byte below its permanent
ceiling. Refinement therefore also needed to remove duplicate ownership rather
than add a silent budget exception.

## Decision

- `.review-form` is one native `form`. It owns only optional accessible naming,
  field/group layout, action wrapping, one native submit-request boundary, and
  optional target-owned response composition.
- The required semantic composition is one canonical Star Input, one canonical
  Textarea and one canonical native submit Button. Canonical Input, File Upload
  and Select are optional slots. Structural wrappers remain optional.
- Registry and contract dependencies are reconciled to the actual canonical
  composition: `star-input`, `input`, `textarea`, `file-upload`, `select`, and
  `button`. These are source graph edges, not copied implementations.
- Each child retains its native name, value, label, description, validation,
  disabled, reset, form-data and controlled/uncontrolled ownership. Review Form
  does not expose parallel child-value or child-state properties.
- Every visible child message is programmatically associated with its control.
  Static guidance and reviewed validation examples are not alerts.
- File Upload uses its canonical label-root anatomy with one native file input,
  primary instruction, visible policy hint, and independent polite selected-file
  status. The docs fixture may use `accept="image/*"` only when its text states
  that the production policy remains target-owned.
- A native submit event means that client-side native constraints admitted a
  submit request. It does not confirm upload, persistence, moderation or success.
  The Studio fixture may intercept the request locally only with truthful copy.
- Endpoint, encoding, authentication, anti-abuse, required field policy, file
  policy, server validation, aggregate errors, pending, retries, success, reset,
  redirect and focus behavior remain target-owned.
- Button owns submit, disabled, busy, duplicate-prevention and loading
  presentation when a target starts a real asynchronous request.
- Unused Review Form field/photo hooks are removed. Width, field gap and action
  wrapping remain private composition; no new public token is introduced.
- Exhibit and Studio continue to mount one `ReviewsStudio` renderer, one Studio
  definition and one initial fixture. The MDX fallback mirrors the same semantic
  boundary.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- The HTML Standard makes names the form-data keys, runs native constraint
  validation before submission, constructs a form entry list, and emits a
  cancelable submit event. Native validation never replaces server validation.
- WAI form guidance requires programmatic labels, visible instructions,
  associated inline feedback, and truthful notification of results. Aggregate
  error alerts and focus movement are deliberate workflow choices.
- Open UI text and file research keeps native name/value and file-selection
  behavior in the controls, including one focusable file input, selected-file
  feedback, and native constraints.
- Radix Form demonstrates root/field/control/message/submit composition on top
  of native validation, but also shows why framework field parts must not replace
  The Gallery's already canonical child components.
- Polaris form controls keep label, details, error, name, required, disabled,
  current/default value and standard events in each control rather than in a
  generic form shell.

These sources support native composition and clear ownership. They do not select
a review provider, policy, transport or visual identity for The Gallery.

## Performance

Review Form adds no neutral orchestration listener, observer, timer, request,
formatter, layout read, animation or asset. Select and File Upload progressive
enhancers remain independently owned child runtime. The Studio submit handler
and Upload icon are documentation-target behavior only.

The permanent Reviews family ceiling remains `3.7 KiB` (`3,788 B`) gzip, total
Neutral Web component CSS remains `64 KiB`, and shared runtime remains `8 KiB`.
Final measurements and existing program exceptions are recorded in Batch 53;
this decision raises no ceiling.

## Target Boundary

- Neutral Web is native markup plus canonical CSS and child enhancers.
- Shopify needs a selected provider theme app block or other accepted app
  integration for data, auth, endpoint, files, moderation and response state.
  This ADR does not authorize placeholder review Liquid.
- Webflow maps to its native form/integration surface while retaining canonical
  class and child boundaries.
- React and Angular may control one value per child or use child defaults, then
  handle one form submit request. They must not duplicate field state in Review
  Form.
- SwiftUI and Compose use target-native rating, fields, file/media picker and
  submit controls with target-owned asynchronous workflow.
- Current Figma references are generic Studio/Button frames. Component-specific
  Review Form artwork remains a human visual target after browser review.

## Open Human And Product Boundary

This decision intentionally does not approve:

- field order, density, 600px form width, gaps, child variants, upload surface,
  submit emphasis or editorial copy;
- which optional controls appear or which fields are required;
- accepted files, count, size, dimensions, consent, scanning or moderation;
- provider, record schema, verification, endpoint, authentication, CAPTCHA,
  validation, pending, retry, success, reset, redirect or analytics behavior;
- aggregate error-summary or post-submit focus strategy;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- The dependency graph now describes the actual source composition.
- Assistive technology receives one native form, canonical child controls,
  complete message relationships, truthful file-selection status, and no false
  submission-success claim.
- Targets can implement provider workflows without changing the neutral form or
  duplicating child markup and state.
- Removing legacy hooks recovers family budget and makes unsupported anatomy
  fail visibly instead of surviving behind compatibility CSS.
- Human visual review, target policy and explicit stability approval remain
  required.
