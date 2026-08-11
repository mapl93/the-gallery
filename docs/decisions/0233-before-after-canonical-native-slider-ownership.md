# ADR 0233: Before / After Canonical Native Slider Ownership

- Status: Accepted
- Date: 2026-07-20
- Decision owner: The Gallery owner
- Applies to: S17 Before / After Image Slider
- Depends on: ADR 0094 and canonical H2 Slider / Range

## Context

S17 was described as draggable but implemented as a passive fixed midpoint with
an inert visual handle and opaque optional control slot. This exposed neither a
value nor native pointer, touch, keyboard, focus, form or reset behavior.

The owner selected `S17-A`: one interactive comparison composed from canonical
Slider rather than a custom visual drag engine.

## Decision

1. One horizontal native `input[type="range"]` is the sole value, focus,
   pointer, touch, keyboard, form and reset owner.
2. Bounds are fixed to `0..100`, step `1`, with default `50`; the value is the
   revealed After percentage.
3. CSS clipping and the decorative divider derive from the canonical Slider's
   synchronized private progress variable. No second state or hidden value is
   introduced.
4. Neutral Web is uncontrolled and emits native `input` and `change`.
   Framework adapters may expose controlled `value` and uncontrolled
   `defaultValue` around that same native owner.
5. The component requires one non-empty localized control label and both Before
   and After media. Invalid required content omits the complete root.
6. Description and visible Before/After state labels are optional target
   content. Media, alternatives, crop, loading, rights and alignment remain
   target-owned.
7. Logical reveal origin and divider motion follow writing direction.
8. No animation, polling, per-frame JavaScript, custom pointer capture or
   independent layout loop is introduced. The existing canonical Slider
   enhancement owns bounded synchronization and form reset.
9. Without enhancement, the authored comparison remains static and the inactive
   control affordance is hidden to avoid value/presentation desynchronization.
10. Exhibit and Studio render one shared fixture through one shared renderer.

## Consequences

- Before / After depends on canonical Slider.
- The opaque `control` slot and inert generated-handle contract are removed.
- The canonical native input supplies browser keyboard and touch behavior; the
  divider remains decorative and unfocusable.
- Final media ratio, crop, divider/thumb artwork, state-label treatment and
  fixture remain human visual review work.
- The contract remains `pilot`; this decision does not promote it to `stable`.
