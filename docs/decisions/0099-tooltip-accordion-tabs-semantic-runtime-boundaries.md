# 0099. Tooltip, Accordion, And Tabs Semantic Runtime Boundaries

Status: Accepted

Date: 2026-07-13

## Context

ADR 0071 introduced narrow semantic Studios for Tooltip, Accordion, and Tabs,
but component refinement exposed three gaps. Tooltip generated text from the
trigger's `aria-label`, replacing rather than supplementing its accessible
name. Accordion visually collapsed panels without removing their descendants
from the accessibility tree and omitted the APG heading wrapper. Tabs did not
declare the tablist label, activation model, disabled state, roving focus, or
panel focus path needed for target implementations to interoperate.

The neutral source must describe stable cross-target meaning while leaving
provider, group, routing, and positioning services to adapters. The docs target
also needs one shared Exhibit/Studio implementation that can exercise those
obligations without turning a React fixture into canonical runtime.

## Decision

- Tooltip requires a consumer-owned trigger slot and short, non-interactive
  content. Web markup renders an explicit `role="tooltip"` node with a unique
  target-owned ID and relates it to the trigger through `aria-describedby`;
  Tooltip must never replace the trigger's accessible name.
- Tooltip content appears while its trigger is hovered or focused, remains
  visible while the pointer crosses into or hovers the content, and dismisses
  with Escape without moving focus. The target owns ID generation, open/close
  orchestration, delayed opening, collision-aware placement, portal policy, and
  any provider-level skip-delay behavior. Tooltip content remains
  non-interactive; interactive disclosures use another component.
- The Tooltip public presentation uses the existing statement surface with
  primary text. This replaces the former inverse-text pairing whose light-theme
  contrast was insufficient. Offset, arrow size, and maximum measure remain
  private composition values.
- Accordion repeats item compositions containing a semantic heading, native
  Button trigger, optional decorative indicator, associated panel, and content.
  `aria-expanded`, `aria-controls`, IDs, `hidden`, and optional region naming
  remain synchronized. Collapsed panels use native `hidden` so descendants
  leave rendering and focus order.
- Accordion exposes required item composition plus per-item `expanded` and
  `disabled` semantics. Single versus multiple expansion, collapsibility,
  heading level, region-use threshold, and group value ownership remain
  consumer or target decisions; no group API is inferred here.
- Tabs v1 is a labelled horizontal tablist with paired tabs and panels. Exactly
  one enabled tab is selected, one enabled tab participates in roving
  `tabindex`, disabled tabs are skipped, and only the selected panel is visible.
  The visible panel is programmatically focusable so Tab can move into content.
- Tabs exposes required `label` and item composition, per-item `selected` and
  `disabled`, plus `automatic` or `manual` activation. Arrow Left/Right follows
  rendered direction; Home/End navigate the enabled set. In automatic mode,
  focus selects; in manual mode, Enter or Space selects after focus moves.
  Vertical orientation, routed tabs, closable tabs, lazy loading, and overflow
  menus are deferred rather than silently supported.
- Exhibit and Studio use the same site renderer and fixtures. The renderer's
  local React state, Escape listener, generated IDs, and keyboard handlers are
  target evidence, not neutral component runtime or public defaults.
- FAQ Section's docs consumer adopts the canonical Accordion heading and
  `hidden` composition and removes its duplicated grid-collapse behavior.
- Tooltip, Accordion, and Tabs remain `pilot`. Automated readiness does not
  promote them to `stable` without explicit human review.
- This ADR supersedes ADR 0071 only for Tooltip, Accordion, and Tabs. It keeps
  ADR 0071's Breadcrumb decision, site-fixture boundary, and target ownership
  principle.

## Performance

Batch 14 adds no neutral JavaScript, provider, timer, observer, portal, request,
or asset. Deterministic level-9 gzip measurements after refinement are:

- Layout CSS: `5,144 B` against the provisional `4.8 KiB` family ceiling.
- Shared neutral runtime: `10,321 B`, unchanged and covered by the existing
  documented runtime exception.
- Neutral Web component CSS: `60,996 B` against the `64 KiB` ceiling.

The `229 B` Layout overage is recorded as a review exception, not a silent
budget change. The delta buys explicit semantic nodes, native hidden panels,
disabled/focus states, content resilience, hover persistence, reduced-motion,
forced-color, and direction-aware presentation for three previously skeletal
components. The permanent family ceiling remains unchanged until the remaining
Layout components provide evidence for a deliberate recalibration.

## Consequences

- Neutral Web, Webflow, and Shopify can share canonical CSS while implementing
  target-native services and value ownership around the same parts.
- React and Angular adapters may expose controlled/uncontrolled conveniences,
  but must preserve one logical state owner and the declared semantic model.
- Shopify may map Tooltip to host interest/tooltip facilities and Tabs to host
  components when their semantics match; otherwise Liquid plus target runtime
  must implement the same obligations rather than copy docs React behavior.
- Figma maps anatomy, states, activation intent, and tokens but owns no IDs,
  keyboard behavior, focus, visibility service, or announcements.
- SwiftUI and Compose use native disclosure/help/tab facilities where possible
  while preserving naming, disabled, selection, and content boundaries instead
  of reproducing DOM mechanics.
- Provider delay/collision policy, Accordion group API, richer Tabs modes, and
  final visual treatment remain explicit open questions for human or target
  decisions.
