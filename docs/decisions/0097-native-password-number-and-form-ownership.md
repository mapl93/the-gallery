# 0097. Native Password, Number, And Form Ownership

Status: Accepted

Date: 2026-07-13

## Context

Password Input, Number Input, and Form complete the next form-infrastructure
review step, but their previous contracts and previews did not consistently
identify native value/form owners. Password Input mixed a current-password
fixture with permanent strength feedback and an undersized physical-positioned
reveal action. Number Input coerced empty edits, duplicated only part of the
already accepted Quantity Selector stepping model, and encoded fixture bounds as
component defaults. Form could render a form-like wrapper, used viewport rather
than container capacity, and forced static error content into alert semantics.

The refinement must preserve native HTML ownership, canonical composition,
target-agnostic source, exact Exhibit/Studio rendering, and accepted target-owned
security, validation, submission, and persistence boundaries.

## Decision

- Password Input has one native password field as its sole secret, value,
  validity, autofill, form, and reset owner. Reveal changes only the `type` of
  that same node and synchronizes a non-submit button's icon, accessible name,
  `aria-pressed`, and `aria-controls`.
- Reveal never creates a mirrored field or prevents paste/password-manager
  behavior. Disabled makes field and action unavailable; readonly keeps the
  secret focusable and submittable. Deliberate visual verification may remain
  available on readonly content.
- Strength is an optional, text-backed presentation for new-password contexts.
  `none` is the semantic default. Policy, scoring, breach checking, and dynamic
  announcement timing are target-owned; static strength is not a live region.
- Per ADR 0074, Password Input keeps a complete canonical CSS surface aligned to
  Input's public tokens and does not depend on Input's private custom properties.
- Number Input remains distinct from commerce-oriented Quantity Selector under
  ADR 0060. Both use one native `input[type="number"]` owner and may share the
  same internal progressive stepping algorithm without sharing public classes,
  contracts, or product meaning.
- Number step actions call native `stepDown()`/`stepUp()`, emit bubbling `input`
  then `change` only after a real value change, derive boundary/readonly/disabled
  availability, and resynchronize after native form reset or constraint changes.
  Direct editing remains nullable and is not clamped or coerced to zero.
- Number Input is for real numbers, not digit strings. Prefixes, suffixes,
  locale parsing/formatting, wheel policy, scrubbing, units, and commerce state
  remain outside this v1 contract pending product/cross-target decisions.
- Numeric glyphs keep LTR ordering inside an RTL surrounding interface so signs,
  decimals, and exponents remain readable; component placement and action order
  still follow logical interface direction.
- Form maps to a real native `<form>` on Web and requires a canonical content
  slot. Named controls own values and validity; activated submitters participate
  in form data; explicit submit/reset/button types preserve native lifecycle.
- Form owns composition and responsive layout only. Field Wrapper and controls
  own field relationships; Button owns action presentation. Validation logic,
  error-summary insertion/announcement/focus timing, pending state, requests,
  server errors, analytics, and persistence remain target-owned.
- Form columns respond to the component's inline-size container and never change
  source/tab order. Narrow actions stack without introducing viewport-coupled
  layout behavior.
- A static error summary is not automatically an alert. When present it contains
  text-first linked errors and can be focused by the target at the correct
  validation lifecycle moment.
- Exhibit and Studio use one renderer, fixture, canonical component DOM, and
  native owner for each component. Required Studio composition slots remain
  visible and cannot be disabled.
- Existing semantic type, space, surface, field, focus, validation, opacity,
  radius, transition, and forced-color tokens are reused. Geometry, alignment,
  container thresholds, and color mixes remain private composition details.
- Automated readiness does not promote any contract to `stable`; explicit human
  visual and semantic approval remains required.

## Performance Exception

Deterministic level-9 gzip measurements after Batch 12 are:

- Canonical Forms CSS: `9,303 B` against the unchanged `6.4 KiB` ceiling.
- Shared progressive runtime: `10,335 B` against the unchanged `8 KiB` ceiling.
- Neutral Web component CSS bundle: `60,456 B`, below the `64 KiB` ceiling with
  `5,080 B` headroom.

Relative to the Batch 12 start measurement, Forms CSS adds `724 B`, shared
runtime adds `65 B`, and the Neutral Web bundle adds `223 B`. The `65 B` shared
behavior delta is below the `1 KiB` per-reviewed-behavior ceiling. Password Input
and Form add no component runtime. Number Input reuses the existing delegated
Quantity Selector lifecycle and adds no second observer, polling loop, timer,
hidden value owner, parser, asset, or network request.

ADRs 0092 through 0096 record the preceding Forms/runtime budget gaps. This ADR
records the measured Batch 12 delta and rationale without raising any ceiling or
deciding runtime modularization. The exception permits human-review readiness
under ADR 0088, not automatic stability.

## Consequences

- Neutral Web and Shopify generated adapters receive byte-identical canonical
  Forms CSS and shared runtime. Shopify-specific Liquid schemas, data mapping,
  validation, submission, security policy, and editor readiness remain
  target-native work.
- React and Angular may expose controlled/uncontrolled values while preserving
  the same native owner, event order, nullable numeric editing, names, submitter,
  validity, and reset semantics. They must not mirror secrets or collapse an
  entire Form into one hidden value object.
- Figma represents semantic states, content, composition, and tokens without
  owning secret values, numeric validity, form submission, or live-announcement
  timing.
- SwiftUI and Compose use their nearest native secure-entry, numeric-entry, form
  grouping, and validation-summary owners while preserving the same public
  boundaries rather than copying DOM-specific mechanics.
- Password policy and strength presentation, Number density/formatting, and Form
  hierarchy/error presentation still require explicit human or later product
  approval before affected contracts may become `stable` or expand their API.
