# 0124. Native Intrinsic Process Timeline Lane

Status: Accepted

Date: 2026-07-14

## Context

Process Timeline already exposed a title and ordered target-owned steps under
ADR 0080, with the requirement that narrow horizontal overflow remain keyboard
scrollable. The implementation did not yet satisfy that contract consistently.
Its viewport `768px` query converted a flex lane into a wrapping grid even when
the actual component host remained narrow. In the docs Exhibit at a `1440px`
browser viewport, a `484px` track became two columns plus a third wrapped item;
decorative connectors continued as if every step occupied one row and expanded
the measured scroll width.

The canonical CSS depended on site-only list resets and padding, and incomplete
typography allowed host heading styles to drift. The shared renderer used native
`ol`/`li`, while MDX and Shopify simulated the list with generic elements.
Shopify lacked section labelling, keyboard-overflow semantics, target-owned image
alternatives, optional-content omission and localization, despite already
shipping a dedicated section and template composition.

WAI and HTML guidance support a native ordered list for sequential information.
The WAI ACT scrollable-content rule requires an overflowing region or descendant
to be reachable through sequential focus so the browser can scroll it by
keyboard. Open UI and Polaris converge on ordered compound list items but no
interoperable Timeline widget. Radix Scroll Area keeps native scrolling and does
not synthesize arrow-key behavior. Shopify section blocks provide merchant-
reorderable target records and editor attributes.

## Decision

- Process Timeline is a passive native section associated with one visible
  contextual heading through a target-unique `aria-labelledby`/`id` pair.
- The ordered lane is a native `ol` with direct `li` steps. Targets may add the
  redundant `role="list"` where list-marker removal needs Safari/VoiceOver
  resilience; no listbox, carousel, progress, feed or application role is used.
- The `title` and ordered `steps` properties remain the complete neutral API.
  Each target-owned step supplies a required title and optional media and
  description. No target-neutral process record, current status or navigation
  event is introduced.
- The lane uses one row at every available inline size. Equal implicit tracks
  share free space above a private readable minimum and overflow horizontally
  when supplied steps no longer fit. This intrinsic response replaces viewport
  switching and wrapped rows.
- Section block spacing retains the public section token. Inline inset is capped
  by a private percentage of the actual host, so desktop-mode page margins do
  not consume most of a narrow embedded component; the public container token
  remains the maximum.
- Native horizontal overflow, scroll snap and overscroll containment remain CSS
  behavior. Targets ensure an overflowing lane is sequentially focusable on
  their supported browsers, give it the visible-heading label, and do not add
  custom scroll-key handlers.
- Every step keeps a visible decimal marker. The marker is `aria-hidden` because
  native ordered-list semantics already expose position and count. Decorative
  connectors supplement the visible order but never convey sequence alone.
- The connector remains a private visual detail. It stays in the one-row lane,
  uses logical inline placement and aligns with the numbered marker rather than
  the media. Its retention and exact treatment remain subject to human visual
  approval.
- Step image and description regions are independently optional and omitted
  completely when absent. Targets own image source, loading, focal point and
  whether alternative text is informative or empty for decorative media.
- Timeline and step title classes fully define visual typography, margins,
  padding and border so host documentation styles cannot change component
  presentation. Description and marker typography use complete existing source
  token pairs instead of fractional calculations and literal weights.
- The component owns no controlled/uncontrolled state, listener, observer,
  timer, request, custom scrollbar, live region, animation or asset. Native
  browser scrolling and target data remain authoritative.
- Site-only Process Timeline padding, title and list-reset rules are removed so
  Exhibit and Studio consume canonical source CSS directly.
- Shopify maps section blocks in merchant-authored order, preserves
  `block.shopify_attributes`, associates section/track/heading, omits empty
  optional parts, preserves image data and decorative intent, localizes schema
  and fallback strings, and is marked implemented only after target validation.
- Process Timeline remains `pilot`. Complete evidence can make it ready for
  human review, but only explicit human approval can promote it to `stable`.

## Performance

Process Timeline adds no component runtime, observer, layout read, formatter,
listener, request, animation, custom scrollbar or bundled asset. DOM and layout
work scale linearly with target-supplied steps. The intrinsic grid removes two
viewport rules and custom scrollbar styling. The permanent Storytelling
`4.2 KiB` and complete component CSS `64 KiB` gzip ceilings remain binding and
are not reset by this decision.

## Consequences

- Web, Shopify and future targets share one ordered, labelled composition without
  making React, Liquid, a CMS record, progress state or viewport breakpoint
  canonical.
- A Process Timeline embedded in a narrow host remains a single understandable
  lane even when the page viewport is wide; wrapping can no longer disconnect
  decorative connectors from sequence.
- The same source order and native list semantics survive touch, pointer,
  keyboard, localization, RTL, zoom and optional-media cases.
- Exhibit and Studio can prove exact DOM parity using canonical source CSS rather
  than site-owned resets or layout overrides.
- Human review still owns marker size/color, connector retention, `4:3` media
  crop, private track minimum, centered alignment, type hierarchy, section
  insets, gaps, snap preview and the absence of additional public layout modes.
