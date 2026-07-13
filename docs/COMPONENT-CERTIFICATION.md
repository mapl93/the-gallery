# Component Certification

This document defines how The Gallery distinguishes structural component coverage
from target-ready component maturity.

The first certification target is neutral web, following ADR 0034. Certification
for Shopify, React, Figma, native, and future targets is independent.

## Status Meaning

### `draft`

The contract is incomplete or under active structural design.

### `pilot`

The contract is present and passes the repository's structural validation. Some
facts may be conservative, mechanically derived, or not yet reviewed in a browser.

### `stable`

The component has passed every applicable neutral web gate below, unresolved
product decisions have been answered, and the evidence has been reviewed by a
human. No audit script may assign this status automatically.

### `deprecated`

The component remains documented for migration but should not be selected for new
work.

## Evidence Rules

- Concrete source files and scripts are current implementation facts.
- Accepted ADRs define architecture and policy.
- Contracts, registry metadata, CSS, MDX, and generated manifests must agree.
- Historical documents are evidence, but a conflict with current canonical source
  is a review gap rather than permission to change source behavior.
- Figma is a target. A Figma property may inform reconciliation, but it does not
  override the repo source of truth.
- An absent fact is not inferred. It is recorded as missing or requiring review.

## Neutral Web Gates

### 1. Identity And Ownership

- The registry entry, contract slug, id, name, category, dependencies, selector,
  CSS source, and docs source agree.
- The component has one clear canonical CSS ownership surface.

### 2. Anatomy And Content

- Required and optional anatomy is complete.
- Content, slots, generated elements, and composition boundaries are explicit.
- Native element semantics are documented where element choice changes behavior.

### 3. Presentation

- Every real variant and size is represented exactly once.
- Defaults are explicit and supported by source evidence.
- Boolean modifiers and other capabilities are not hidden only in CSS.

### 4. State And Behavior

- Resting, interaction, validation, visibility, loading, and disabled states are
  represented when applicable.
- Every value-entry field exposes `default`, `error`, `success`, and `warning`
  validation variants before it can become `stable`, unless an accepted ADR
  records a component-specific exemption.
- Error, Success, and Warning cover the same available anatomy: label, control
  border, associated message, fixed indicator or icon, and focused outer ring.
  A selected, checked, filled, or active state does not substitute for
  validation.
- Hover and focus preserve the active validation color family instead of falling
  back to Default presentation tokens.
- Required JavaScript or progressive enhancement exists and is testable.
- Keyboard, focus, dismissal, motion, and state synchronization are verified when
  applicable.

### 5. Public Customization API

- Every public token is referenced by canonical CSS and defined by the neutral web
  token target.
- Private `--_` variables remain implementation details unless intentionally
  promoted.
- Semantic properties and target mappings are explicit before Studio exposes them.
- Studio grouping and control selection do not create new component capabilities.
- A Studio definition references every reviewed semantic property exactly once and
  only exposes tokens declared public by the component contract.

### 6. Accessibility

- Native semantics, roles, labels, relationships, focus behavior, keyboard input,
  disabled behavior, busy behavior, and live-region behavior are verified where
  applicable.
- Validation messages are programmatically associated with their field. Error
  exposes `aria-invalid="true"`; Success and Warning do not misuse
  `aria-invalid`.
- Error, Success, and Warning remain distinguishable without relying on color
  alone.
- Focus indication, contrast, reduced motion, and touch target requirements are
  checked against the actual rendered component.

### 7. Canonical Documentation

- The MDX page has one canonical preview suitable for Exhibit.
- Exhibit and Studio mount the same registered renderer and initial fixture when
  Studio support exists; MDX preview markup is fallback and audit evidence only.
- Relevant properties and states can be exercised without rendering a wall of
  redundant variants.
- When Studio metadata exists, its renderer uses canonical component CSS, covers
  every declared control, and is verified at desktop and mobile widths.
- Usage, accessibility, and technical specification agree with the contract.
- Examples avoid unexplained inline styling and unstable external assets.

### 8. Adapter And Browser Verification

- The contract marks neutral web implemented.
- The generated web adapter manifest matches current registry and contract facts.
- `platforms/web/index.css` loads tokens before component CSS.
- Desktop and mobile rendering, light and dark themes, interaction, overflow, and
  text fit are verified in a real browser where applicable.

## Automated Audit Boundary

`npm run audit:components` records facts that can be established mechanically:

- File and selector presence.
- Registry, contract, token, and web-manifest alignment.
- Source component tokens reaching public aliases consumed by contract and CSS.
- Contract depth counts.
- Studio definition, property-binding, and design-reference coverage.
- Exhibit preview evidence and registered Studio renderer interaction evidence.
- Inline-style and external-asset evidence.

The audit emits structural failures and human-review flags. A passing automated
gate means only that no machine-detectable structural gap was found.

## Review Order

Certification should follow dependency and site-use leverage rather than registry
alphabetical order:

1. Foundations and the public components required by the docs shell.
2. Primitive and form components.
3. Overlays and interactive components.
4. Layout and content compositions.
5. Commerce and domain-specific components.

The exact site kernel is confirmed from the implemented Exhibit, Studio, and
navigation requirements. It is not hardcoded into the certification script.
