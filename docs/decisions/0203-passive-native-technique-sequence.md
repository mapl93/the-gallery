# 0203. Passive Native Technique Sequence

Status: Accepted

Date: 2026-07-17

Owner confirmation: 2026-08-11, decision 57

## Context

R3 Technique Explainer exposed optional title and required target-owned steps,
while ADR 0083 required meaningful source order and allowed visual alternation
without changing reading order. Its renderer nevertheless emitted unrelated
`article` siblings with only decorative `aria-hidden` numbers, so assistive
technology received no programmatic ordinal relation. Optional title removal
also left a dangling `aria-labelledby` on an unnamed section.

Canonical CSS used a viewport breakpoint while Studio applied a second
consumer-only container rule. The even-step rule assigned media `order: 2`, its
existing position, so the promised wide alternation did not occur. Fixture
photos and generic alternatives also did not truthfully correspond to the
named Prepare, Form, and Finish steps.

The repository has no approved current/completed state, workflow controls,
process schema, Shopify content source, R3-specific Figma visual source, or
owner-approved media/art-direction policy.

## Decision

- Owner decision 57 confirms the passive ordered sequence and adds a stable
  per-step core: `name` and `description` are required; optional `details` and
  `media` slots hold target-composed reviewed content without creating a fixed
  universal ceramics process schema.
- Neutral R3 is a passive ordered editorial explanation. It is not a stepper,
  progress indicator, timeline, task-status widget, navigation model,
  disclosure, tabs, carousel, or workflow controller.
- With a non-empty title, the root is a native section labelled by its visible
  contextual heading. Without a title it is a generic div and emits no
  `aria-labelledby`.
- The required non-empty sequence uses `ol > li`. Each complete step requires a
  stable key, non-empty visible name, and non-empty complete explanation.
  Missing or invalid records are omitted; no remaining records omits R3.
- The visible zero-padded ordinal derives from list position and is
  `aria-hidden`. Native ordered-list semantics, not duplicate target data,
  remain the accessible source of sequence.
- Step text always precedes optional supporting media in DOM order. Informative
  target media requires a truthful contextual alternative; decorative or fully
  redundant image media uses `alt=""`.
- Optional details remain inside the owning list item after the complete
  description and before media. Materials, duration, temperature, tools or
  other facts are target structure, not neutral fields. Safety warnings and
  precautions compose separately as reviewed rich content or canonical Alert,
  never as an arbitrary untyped detail.
- The native list item is sufficient default semantics. R3 does not make each
  step an independently reusable `article` or add an ARIA widget role.
- Canonical CSS establishes a named component container. Narrow hosts stack
  content then media. Wide hosts may place even media at logical inline-start
  for the accepted alternating presentation while keeping step order and
  text-before-media DOM order unchanged.
- Exhibit and Studio use one `TechniqueExplainerArtwork`, one fixture, and the
  same canonical CSS. Studio no longer owns R3 layout or media-size overrides.
- The root API remains optional `title` and required non-empty `steps`. Records,
  number format, media side, breakpoint, tracks, spacing, radius, and heading
  rank do not become public properties.
- R3 owns zero neutral runtime and remains `pilot`; automated evidence cannot
  promote it to `stable`.

## Consequences

- Sequence is programmatically available and remains correct without CSS,
  media, or decorative numbers.
- Title removal no longer creates an unnamed section or broken label reference.
- Responsive behavior follows the component host in every consumer instead of
  global viewport or Studio-only rules.
- A real interactive workflow must compose a separate canonical contract with
  truthful current/completed/progress/navigation semantics, state, events,
  keyboard behavior, focus, announcements, and controlled/uncontrolled rules.
- R0 assigns process records, localization, rights, applicability and factual
  review to targets. Slot constraints are now explicit; production records,
  media policy, Shopify mapping, final aesthetics, R3-specific design evidence
  and human approval remain target evidence gates.
