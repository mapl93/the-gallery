# 0098. Modal, Drawer, And Toast Item Ownership

Status: Accepted

Date: 2026-07-13

## Context

ADR 0070 established the first narrow Studio APIs for Modal, Drawer, and Toast
and deliberately left focus, inertness, dismissal, and content composition to
targets. Component refinement now requires their stable semantic composition,
canonical dependencies, content resilience, announcement boundaries, and
cross-target translation to be explicit without deciding the still-open global
overlay or toast-provider architecture.

The previous CSS duplicated Close Button styles in Drawer and Toast, treated a
Toast item as its own fixed viewport, allowed transparent hidden Toast content
to remain semantically present, and did not partition long Modal content. The
shared docs renderer showed the surfaces but did not demonstrate the target
lifecycle needed to evaluate them.

## Decision

- Modal requires a visible localized title, primary content, a named native
  dismiss action composed with Close Button, and its dismiss label. A short
  `descriptionId` and canonical Button action region are optional. `open`
  remains false by contract default.
- Drawer uses the same modal-dialog ownership model. It requires title, content,
  dismiss action, and label; footer is optional. Default remains physical right
  and `left` remains physical left. This ADR does not reinterpret placement as
  logical start/end or add non-modal, bottom-sheet, swipe, or resize modes.
- Button and Close Button are canonical dependencies of Modal, Drawer, and
  Toast. Layout CSS keeps only component-specific placement hooks and does not
  duplicate their geometry, hover, focus, disabled, or transition contracts.
- Modal and Drawer CSS own bounded surface presentation, long-title containment,
  header/body/footer partition, body overscroll containment, dynamic viewport
  bounds, reduced motion, and forced-color boundaries.
- Targets still own trigger relationships, controlled/uncontrolled lifecycle,
  focus entry/containment/restoration, true outside inertness, page scroll lock,
  Escape/backdrop policy, portal/top-layer choice, stacking, mutual exclusion,
  exit completion, and cleanup. A Web adapter may use native `dialog`; it is not
  mandated as the cross-target source model.
- The documentation target demonstrates initial focus, Tab/Shift+Tab
  containment, Escape, backdrop request, and logical focus restoration inside
  its bounded stage. This is target evidence, not neutral runtime.
- Toast is one passive notification item. It owns surface, visual feedback
  variant, content, optional decorative icon, optional safe Button action,
  optional named Close Button, announcement priority, visibility, and item
  motion. It no longer owns fixed viewport position or z-index.
- Toast announcement semantics belong on `.toast__content`, excluding actions
  from the live string. `none` emits no live attributes, `polite` maps to status,
  and `assertive` maps to alert; visual Error never implies assertive priority.
- Hidden Toast items use visibility plus `aria-hidden` mapping. Production
  targets may unmount instead. Showing a Toast never moves focus; a safe action
  must remain ignorable and have a durable alternative when timing is finite.
- Toast viewport placement, queueing, deduplication, duration, hover/focus/window
  pause, Escape policy, swipe, persistence, and removal are target services.
- Required Studio composition slots remain visible and disabled. Site-only
  fixture labels, content, icons, focus demonstration, triggers, and containment
  are not contract defaults or target APIs.
- This ADR supersedes only ADR 0070's narrow property limits for these three
  components. It preserves ADR 0070's target-owned lifecycle and site-fixture
  boundaries.
- All three contracts remain `pilot`; automated readiness never implies
  `stable` without explicit human review.

## Performance

Deterministic level-9 gzip measurements after Batch 13 are:

- Layout CSS: `4,639 B` against the `4.8 KiB` family ceiling.
- Shared neutral runtime: `10,335 B`, unchanged and still covered by the
  existing documented runtime exception.
- Neutral Web component CSS: `60,664 B` against the `64 KiB` ceiling.

Relative to the Batch 13 start, Layout CSS adds `249 B`, neutral runtime adds
`0 B`, and the complete Web component bundle adds `208 B`. No component adds a
timer, provider, queue, observer, portal, network request, asset, value mirror,
or document-level listener. The docs-only renderer uses local React handlers and
animation-frame focus handoff for bounded evidence.

## Consequences

- Neutral Web and Shopify receive the same generated canonical CSS and declared
  dependencies; target-native Liquid/host lifecycle remains separate.
- React and Angular adapters may expose `open/defaultOpen` or equivalent
  controlled/uncontrolled facilities while preserving the same semantic parts
  and lifecycle obligations.
- Figma maps anatomy, content, states, placement, overflow, and tokens without
  owning focus, announcements, timers, or provider behavior.
- SwiftUI and Compose map to their native dialog/sheet/snackbar facilities while
  preserving naming, dismissibility, passive announcement, and safe-action
  boundaries rather than copying DOM mechanics.
- Physical Drawer placement, visual treatment, native-dialog strategy, global
  overlay coordination, and Toast provider policy remain explicit human or
  target decisions.
