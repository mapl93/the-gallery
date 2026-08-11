# Component Dossier: Hover Card

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/hover-card.contract.json`

## Recommendation

Keep Hover Card as a sighted, supplemental preview of the destination behind a
native link. Do not make the preview the only source of information or add a
public `open` property: hover/focus interest remains implicit and target-owned
as accepted in ADR 0072. Add explicit title/description anatomy and a target
state for temporary Escape dismissal so implementations can satisfy WCAG 1.4.13
without turning placement, delay or collision into neutral API.

The surface must be hoverable, remain present while either trigger or content
has hover/focus interest, and reset its dismissed state only after the interest
cycle ends. Touch users follow the underlying link to the same information.

## Purpose And Limits

- Gives a quick visual preview of an artist, artwork, product or collection that
  is fully available at a real link destination.
- Supplements rather than replaces the link's accessible name and destination.
- Contains concise passive content; no forms, destructive commands, required
  instructions or focus trap.
- Activation of the link always retains its native navigation meaning.
- Use Popover for explicit toggling or interactive content and Tooltip for a
  short textual description.

## Gallery Baseline Before This Batch

- Registry `B10`, Layout, no dependencies; contract `0.1.0`, `pilot`.
- Canonical CSS owns only wrapper and content. The Studio fixture uses generic
  `<strong>`/`<p>` children whose typography is actually restyled by site-only
  CSS, so the canonical component is visually incomplete outside the docs.
- Content appears on `:hover` and `:focus-within`, remains pointer-hoverable
  because it is a descendant, and has no shipped runtime.
- There is no Escape-dismissed state, explicit trigger/title/description
  contract, long-content containment, reduced-motion or forced-colors rule.
- The shared renderer permanently applies a site inspection class, so current
  evidence shows the open appearance but does not prove the canonical interest
  lifecycle.
- The Studio reference is shared and not a component-specific owner visual.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WCAG 2.2 Understanding 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) | Author-created hover/focus content must be dismissible, hoverable and persistent. Keyboard-triggered visibility is also required when pointer hover can reveal it. | Preserve hover/focus parity, allow pointer transfer, and add Escape dismissal or guarantee non-obstruction; Gallery should provide both in its target renderer. |
| [Open UI Interest Invokers](https://open-ui.org/components/interest-invokers.explainer/) | `interestfor` is designed for link previews activated by delayed hover/focus interest; proposed `popover="hint"` behavior remains platform-evolving. | Treat native interest invokers as future Web enhancement, not a current cross-target contract or required public property. |
| [Radix Hover Card](https://www.radix-ui.com/primitives/docs/components/hover-card) | Defines Root, Trigger, Portal, Content and Arrow; offers controlled/uncontrolled state, delays and collision handling, and positions the pattern as a sighted preview behind a link. | Preserve the link-destination boundary and target-owned timing/positioning; do not expose rich interaction. |
| [Radix Themes Hover Card](https://www.radix-ui.com/themes/docs/components/hover-card) | Uses concise profile identity and description within a bounded surface. | Explicit title/description parts are a stable visual anatomy without prescribing product-specific data fields. |

## Matches, Differences, And Direction

- Gallery matches Radix's destination-preview purpose and already supports both
  hover and keyboard focus.
- Gallery is stronger than a pointer-only implementation because the visual
  preview remains available to low-vision keyboard users.
- Gallery differs by lacking the WCAG dismissal state and by relying on docs-only
  typography for its canonical fixture.
- Direction: complete passive anatomy and accessibility states in canonical CSS,
  while leaving delay, portal, collision and open control out of v1 public API.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral wrapper | Hover Card | Defines one trigger/content interest region. |
| Trigger | yes | native `a[href]` | Consumer | Destination remains usable without the preview. |
| Content | yes | passive neutral content | Hover Card/consumer | No focusable descendants or required information. |
| Title | no | text/heading appropriate to context | Consumer | Stable identity line. |
| Description | no | paragraph/text | Consumer | Concise supplemental summary. |
| Arrow | no | decorative | Target | Not required in current visual direction. |

No canonical component dependency is required. The trigger may compose Link
styling, but Hover Card must not make Link presentation mandatory.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | `default` only. |
| Size | One bounded preview surface. |
| Hidden | No pointer interaction and not visually present. |
| Hover | Trigger or surface hover reveals/retains content. |
| Focus within | Focusing the native link reveals content. |
| Dismissed | Escape suppresses content for the current interest cycle; leave/blur resets. |
| Touch | No hover requirement; destination provides the complete information. |
| Narrow/localized | Text wraps, long words break, and no document overflow occurs. |
| RTL | Logical alignment and inherited text direction. |
| Reduced motion | Transition removed. |
| Forced colors | System border/text remain visible without relying on shadow. |

## Public API And State Ownership

- No scalar semantic properties are added. Trigger and content remain
  consumer-owned slots/composition.
- Hover/focus interest is uncontrolled platform state. Targets may internally
  control delays and temporary dismissed state, but these are not v1 contract
  properties.
- An implementation event such as `openChange` may exist in frameworks, but it
  must not imply that essential data lives only in the preview.
- Placement, alignment, delay, portal container and collision settings remain
  target services.

## Token And Value Audit

- Current public tokens include only surface, subtle border, large radius,
  extra-large shadow, dropdown z-index, base transition and default easing.
- Canonical title/description styling requires existing primary/secondary text,
  body size/line-height and caption or body-small equivalents; registry,
  contract and Studio must agree if these are consumed.
- `16px`, `260px`, `4px` and `-8px` are current hardcoded values. Padding,
  transform distance and width remain private composition; semantic typography
  should use existing tokens rather than site-only literals.

## Accessibility And Interaction

- The trigger is a real link with a complete accessible name and destination.
- Preview content is supplemental and contains no focusable control. It must not
  replace the trigger name through `aria-label` or an overly long description.
- Reveal on hover and focus; keep visible while pointer is over either trigger
  or surface; Escape dismisses without moving focus; pointer/focus exit resets.
- The target decides whether duplicate preview content is exposed to screen
  readers based on destination parity. It must never hide information that is
  unavailable elsewhere.
- Verify focus remains on the link, link activation still navigates, and touch
  users have the complete destination path.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus hover, focus, pointer transfer,
  Escape, long localized text, RTL, dark, forced colors and reduced motion.
- Surface width is bounded and target collision logic may change side; neutral
  CSS performs no geometry loop.
- Batch 17 begins at Layout `5,257 B`, Web components `61,781 B` and shared
  runtime `10,321 B` gzip. Layout is already `342 B` over its `4.8 KiB` ceiling.
- Neutral runtime target is `0 B`; the docs renderer may exercise dismissal
  locally without adding component-owned production JavaScript.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native link + adjacent passive surface, CSS hover/focus states, target Escape dismissal. Future `interestfor` only when interoperable. | CSS exists; anatomy/lifecycle refinement pending. |
| Shopify | Link to artist/product/collection plus optional theme preview; essential data remains on destination. | Planned; no dedicated Liquid primitive. |
| React / Angular | Trigger/content slots with internal interest/delay/dismissal state; no required controlled API. | Planned. |
| Figma | Hidden/hover/focus/open-inspection states and title/description anatomy. | Planned. |
| SwiftUI / Compose | Platform preview/hover affordance where available; always preserve the destination action. | Planned. |

## Exhibit And Studio Parity

`FloatingMenuStudio` is the shared renderer, but the current permanent inspection
class masks actual behavior. The refined fixture must keep an initial reviewable
open state while also exposing focus, hover, transfer and Escape evidence with
site-only state logic and canonical visual classes.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| No Escape-dismissed state for WCAG 1.4.13. | resolved | Target state and shared-renderer interest lifecycle are evidenced. | implementation |
| Canonical surface lacks title/description typography. | resolved | Explicit passive anatomy uses existing semantic tokens. | implementation |
| Studio inspection class hides real lifecycle gaps. | resolved | Initial inspection and real interest states share canonical CSS. | implementation |
| Narrow, RTL and unbroken content can overflow or move off-canvas. | resolved | Bounded wrap-safe geometry uses direction-aware private translation. | implementation |
| Delay/collision/provider policy is unaccepted. | non-blocking | Keep target-owned under ADR 0072. | owner/architecture later |

## Evidence And Validation

- Contemporary before evidence contains Exhibit and Studio desktop captures
  under `output/playwright/refinement-batch-17/before/`.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, dark, forced-colors, reduced-motion, focus and Escape-dismissed
  evidence is under `output/playwright/refinement-batch-17/after/`.
- At 390px, the Arabic RTL stage remains `358/358px` and the surface
  `278/278px` client/scroll width. The surface resolves between physical x
  `55–335px`, proving the direction-aware private translation remains centered
  rather than moving off-canvas.
- Light title/description contrast is `17.93:1`/`7.81:1`; dark is
  `17.18:1`/`12.09:1`. Reduced motion computes `0s`; forced colors preserves a
  visible boundary and native link focus remains visible.
- Live probes confirm hover and focus reveal, pointer transfer from trigger to
  content persistence, Escape dismissal without moving link focus, and reset on
  the next interest cycle. The link remains the complete native destination.
- Contracts, docs/Studio, copied/generated adapters, TypeScript, structural/
  parity/static/refinement audits, temporary build, deterministic performance,
  diff checks and `site/dist` cleanliness are included in Batch 17.

## Risks And Open Questions

1. Exact width, padding, radius and shadow have no component-specific owner
   reference and remain subject to human visual review.
2. Open UI interest invokers are emerging evidence, not a cross-target baseline.
3. Whether duplicate preview content should be exposed to assistive technology
   depends on the destination and must not become a blanket `aria-hidden` rule.

## Readiness Decision

Hover Card is prepared for explicit human stability review and remains `pilot`.
Surface geometry, radius/shadow, delay, collision, duplicate assistive-
technology exposure policy and final visual treatment still need human or target
approval.
