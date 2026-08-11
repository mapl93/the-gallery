# 0150. Passive Ordered Lookbook And Target-Owned Hotspots

Status: Accepted

Date: 2026-07-15

## Context

S6 Lookbook presents a finite asymmetric sequence of target-owned media. ADR
0082 already accepts an optional title, required `items` slot, item-level
`wide`/`tall` anatomy and target-owned activation. It does not define a neutral
media record, hotspot result, commerce model, Lightbox or Popover lifecycle.

The implementation nevertheless emitted an unnamed section, generic wrappers,
four passive tab stops, hover-only captions, image zoom and an empty infinitely
pulsing hotspot. Viewport, anonymous-container and Studio rules competed over
columns and coordinates. Shopify had copied CSS but no complete target-native
projection.

HTML grouping semantics, WAI image guidance, CSS Grid source-order rules, Open
UI/Radix overlay research and Shopify block/settings guidance establish a safe
neutral boundary without resolving the remaining aesthetic and target-profile
choices.

## Decision

- Lookbook is a passive finite editorial sequence. It does not imply selection,
  navigation, commerce, disclosure, Lightbox, drag, pagination, virtualization
  or an APG Grid keyboard model.
- A non-empty title names a native `section` through `aria-labelledby`; an
  untitled composition uses a generic `div`. Missing required items omits the
  root.
- The canonical fixture and MDX use native `ol`/`li` plus complete target-owned
  `figure`/`figcaption` compositions. Source order is authoritative and sparse
  Grid placement never uses dense packing, CSS order or runtime repositioning.
- `wide` and `tall` remain item-level anatomy. Their initial one/two/four-track
  thresholds, clamped row height, spans and edge gap are private visual
  candidates, not public API or approved identity.
- Supplied captions are persistently visible. Passive cells receive no
  tabindex, pointer cursor, hover/focus zoom, event or implied action. Lookbook
  adds no authored motion.
- A hotspot exists only as a target-owned native link or button with a real
  result. It owns its accessible name, destination or disclosure lifecycle,
  coordinates, data and analytics. A disclosure composes canonical Popover or
  a complete target-native equivalent; S6 does not reproduce partial overlay
  behavior.
- Caption contrast uses the existing primary/inverse semantic pair with a
  private `60%` adaptive scrim. Overlay opacity is not public configuration:
  arbitrary values could create incoherent contrast. A new fixed “on dark
  media” semantic token requires a separate owner/token decision.
- One named `lookbook` container owns responsive behavior. Viewport and
  Studio-specific S6 columns, spans and coordinates are removed. The `200px`
  effective-width case bounds heading padding with the repository's accepted
  token-plus-percentage pattern.
- Neutral Web has no store, listener, observer, request, timer, measurement,
  custom element or runtime. Exhibit and Studio use the same renderer, fixture,
  validity rule, DOM and canonical CSS.
- Shopify owns a localized addable Section Adapter. Reorderable image blocks
  contain complete image/decorative-alt/caption/layout data. An optional product
  resource becomes a native product link with block-owned percentage
  coordinates. Shopify settings do not expand the neutral contract.
- The contract advances to `0.3.0` and remains `pilot`. Automated evidence may
  prepare Lookbook for human review but cannot approve its aesthetics or promote
  it to `stable`.

## Consequences

- Neutral Web gains truthful conditional root/list/figure semantics, strict
  omission, persistent content, zero passive focus and intrinsic response.
- Targets can add legitimate native activation without making passive media
  appear interactive or duplicating Popover behavior.
- Shopify can reach full adapter maturity while product resources, routing,
  localization, editor data and media delivery remain target-owned.
- Human review must approve the private density, rows, spans, crop, edge gap,
  caption surface/type, hotspot appearance, two-property neutral API and target
  activation profiles before stability.
- Component-specific Figma evidence follows browser visual approval. The
  current generic Studio shell reference is traceability, not S6 approval.
