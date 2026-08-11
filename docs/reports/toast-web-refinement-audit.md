# Toast Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Toast is now one flow-sized passive notification item with independent visual
and announcement priority, semantic hidden state, an optional safe canonical
Button action, canonical dismissal, and no embedded viewport/queue/timer policy.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive short feedback; required decisions, durable history, validation, and service state remain excluded. |
| Anatomy and composition | pass | Root/icon/content/title/message/action/close; Button and Close Button dependencies replace duplicated close styles. |
| Variants, sizes, states | pass | Info/Success/Error/Warning, visible/hidden, None/Polite/Assertive, optional parts, narrow action wrap, special media. |
| Public API and ownership | pass | Nine semantic properties; placement, duration, queue, swipe, portal, and z-index are excluded. |
| Tokens and visual system | pass | Fifteen public references; body-small type and semantic spacing replace arithmetic/hardcoded item spacing. |
| Accessibility and motion | pass | Live semantics on content only, urgency independent from color, no focus move, semantic hidden state, special media. |
| Responsive/content resilience | pass | Four viewports, 320px localized error, RTL, minimal content, and container-driven action row pass. |
| Runtime and assets | pass | `0 B` neutral runtime; no timer, queue, observer, provider, global listener, request, or asset. |
| Cross-target translation | pass | Web provider boundary, Shopify host API, frameworks, Figma, and native snackbar mappings documented. |
| Documentation and verification | pass | Dossier, ADR 0098, shared renderer, real before/after evidence, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 7 anatomy parts, 4 variants, 1 size, 2 CSS states,
  5 behaviors, 9 properties, 15 public token references, and Button/Close Button
  dependencies.
- The item owns visible content and actions only. A target service owns dynamic
  insertion/removal, viewport, queue, duration, pause, duplicate, Escape, swipe,
  persistence, and durable recovery.
- `announcement` defaults to None. A visual variant never changes live priority;
  optional actions are excluded from `.toast__content` and must be safe to ignore.

## Browser And Visual Evidence

- Initial presentation leaves focus on `body`; showing from the persistent docs
  trigger leaves focus on `Show toast`. Dismiss and Undo remove the item and
  return focus to that trigger instead of losing it to `body`.
- Polite maps content to status/live polite/atomic true; Assertive maps alert/
  assertive/atomic; None removes all three. Error plus Polite remains status,
  proving visual and announcement independence.
- Action and Close are siblings of the live content, not descendants. Their
  classes compose canonical `.btn` and `.close-btn` contracts.
- At a `320px` viewport the localized Error item is `256×290px`, moves action
  below content through its own container, and has zero root/stage overflow.
- A minimal fixture omits title, icon, action, dismiss, and live attributes while
  retaining the required message. RTL and all four visual variants remain intact.
- Light title/message/focus contrast is `17.93:1`/`7.81:1`/`17.93:1`; dark is
  `17.18:1`/`12.09:1`/`17.18:1`. Light decorative variant accents are Info
  `3.68:1`, Success `2.54:1`, Warning `2.15:1`, Error `3.76:1`; text—not the
  decorative icon/border—carries meaning. Human review may choose stronger
  accents without making color the sole indicator.
- Forced colors adds a system boundary and reduced motion computes `0s` with no
  visible transform. Exhibit/Studio canonical markup is byte-identical at
  `1,032` characters and all four viewports have zero horizontal overflow.
- Eight canonical after captures plus dark, forced-colors/reduced-motion, 320px
  localized Error/Polite, RTL, and minimal states supplement two real before
  captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | One semantic item inside an application-owned announcer/viewport/provider. | CSS item implemented; service architecture remains open. |
| Shopify | Host Toast API where available; theme service otherwise. | Generic CSS generated; contract remains planned for target-native lifecycle. |
| React / Angular | Provider/service owns queue/timer/viewport; item props preserve neutral semantics. | Strategy documented; adapter not yet certified. |
| Figma | Item anatomy, content, variants, visible state, and tokens. | Studio metadata validates; no timing/announcement engine. |
| SwiftUI / Compose | Native snackbar/transient notification with safe action and urgency boundary. | Conceptual mapping only. |

## Performance And Risks

- Removing fixed placement/z-index and duplicate Close CSS funds the responsive
  item rules. Toast adds no neutral runtime and shares the final Batch 13 CSS
  measurements.
- Human review must approve feedback accents, title/message hierarchy, action/
  close layout, 32px inherited Close target, shadow/radius, width, and the target
  viewport's eventual placement.
- Dynamic assistive-technology timing, multiple queued announcements, pause/
  resume, duration, deduplication, Escape, swipe, and durable alternatives require
  target-level certification.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, certification/parity/
static-preview/refinement audits, live-priority/focus/action/hidden/minimal/
container/RTL/contrast/special-media/overflow probes, temporary build,
performance, and `site/dist` checks are included in Batch 13.
