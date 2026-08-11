# 0204. Passive Native Care Guidance List

Status: Accepted

Date: 2026-07-17

Owner confirmation: 2026-08-11, decision 58

## Context

R4 Care Instructions exposed optional title, required target-owned items, and
Default/Do/Don't root variants, while ADR 0083 required icon and color to
support rather than replace text. Its renderer nevertheless emitted a generic
`div` grid of generic `div` records, so the visible collection relationship was
not programmatically available. The root was always a section even when the
optional title was removed, and the visible title did not explicitly label it.

Canonical CSS used hardcoded type scaling that reduced explanatory care copy to
approximately 12px and Studio added its own narrow layout/margin correction.
The category renderer also owned a duplicate local fixture and markup rather
than an independently reusable Exhibit/Studio artwork boundary.

The repository has no approved care-record schema, product applicability or
claim-validation service, mixed item-tone model, standardized symbol source,
Shopify content source, R4-specific Figma visual source, or owner-approved
safety/legal/editorial policy.

## Decision

- Neutral R4 is passive text-first care guidance. It is not a checklist, choice
  list, alert, validation summary, acknowledgement flow, task-status widget,
  disclosure, or workflow controller.
- With a non-empty title, the root is a native section labelled by its visible
  contextual heading. Without a title it is a generic div and emits no
  `aria-labelledby`.
- The required non-empty collection uses `ul > li`. Each complete item requires
  a stable key and non-empty visible instruction label. Missing or invalid
  records are omitted; no remaining records omits R4.
- The unordered list carries the compatibility class
  `.care-instructions__grid` on the same element. It uses the matching explicit
  `role="list"` because visual markers are removed and current Safari/VoiceOver
  combinations can otherwise suppress list exposure.
- Optional supporting icons are redundant presentation and are hidden from
  assistive technology. Any unique meaning must be present in visible text.
- Default, Do, and Don't remain homogeneous root treatments and change only
  supporting icon color. They create no ARIA state. Visible heading/item text,
  not green/red or icon shape, communicates recommendation or prohibition.
- One instance always has one homogeneous neutral, recommended, or avoid tone.
  A Do/Don't presentation composes separate canonical R4 instances rather than
  mixed per-item tone or state.
- Public semantic values remain `default`, `do`, and `dont` for compatibility.
  Targets may display friendlier localized vocabulary such as
  Recommended/Avoid without changing those stable values.
- Legal or safety warnings compose separately through reviewed rich content or
  canonical Alert and are never inferred from `do`/`dont` tone.
- Legacy item-level Do/Don't selectors remain CSS compatibility hooks and do
  not become a mixed-record public property without a later product decision.
- Canonical CSS owns an intrinsic component-width grid, complete wrapping,
  semantic typography and forced-color boundaries. Studio no longer owns R4
  layout or margin overrides.
- Exhibit and Studio use one `CareInstructionsArtwork`, one fixture, and the
  same canonical CSS.
- The root API remains optional `title`, required non-empty `items`, and
  optional `variant`. Records, item tone, icon identity/size, columns,
  breakpoint, alignment, spacing, border, radius, and heading rank do not become
  public properties.
- R4 owns zero neutral runtime and remains `pilot`; automated evidence cannot
  promote it to `stable`.

## Consequences

- The related collection is programmatically available and remains complete
  without CSS, icons, color, or grid presentation.
- Title removal no longer creates an untitled section or broken label
  relationship.
- Responsive behavior follows the component host in every consumer instead of
  a Studio-only rule.
- A real acknowledgement, choice, warning interaction, or task list must
  compose separately accepted canonical behavior components with truthful
  state, events, keyboard behavior, focus, announcements, and
  controlled/uncontrolled rules.
- R0 assigns care records, product applicability, safety/legal/editorial review,
  localization and revisions/recalls to targets. Production proof, symbol
  policy, Shopify mapping, final grid aesthetics, R4-specific design evidence,
  and human approval remain target evidence gates.
