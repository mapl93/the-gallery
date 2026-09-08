# Component Dossier: Popover

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/popover.contract.json`

## Owner Update: Hover Card Consolidation (2026-08-25)

Owner decision 83 and ADR 0286 remove Hover Card from the pre-v1 inventory and
make Popover the single floating-surface identity. Contract `0.4.0` adds
`showArrow: boolean`, default `true`; it independently renders or omits the
decorative arrow without changing semantics or behavior. Historical statements
below that `open` is the only property or that Hover Card is a separate
component are superseded by this decision.

## Recommendation

Keep Popover as a non-modal, trigger-owned floating surface with public `open`
state and independent `showArrow` presentation. Do not assign `role="dialog"` or `aria-haspopup="dialog"` by
default: HTML popovers do not acquire semantics automatically, and the correct
role depends on their content. Require a native Button trigger, a stable
trigger/panel relationship, Escape and outside dismissal, focus restoration
when keyboard dismissal would otherwise lose focus, and natural Tab order.

For capable Web targets, document `popover="auto"` plus `popovertarget` as the
preferred progressive enhancement because the platform supplies top-layer,
light-dismiss and close-request behavior. Preserve `.popover--open` as the
portable neutral Web state mapping and style `:popover-open` equivalently; the
contract still leaves portals, anchor geometry and collision handling to the
target under ADR 0072.

## Purpose And Limits

- Reveals concise supplemental content or a small set of related controls next
  to an explicit trigger without blocking the page.
- Appropriate for artwork details, secondary settings, compact explanations or
  small forms whose context remains clear.
- Not a modal: it does not inert the page, lock scroll or trap focus.
- Not a Menu: an action list that requires arrow-key menu semantics is Dropdown
  Menu, not a generic Popover.
- Not a Tooltip: activation is explicit and content may be
  interactive. The former Hover Card identity is consolidated into this same
  Popover surface by owner decision 83 and ADR 0286.
- Long workflows, destructive confirmation and content requiring isolation use
  Modal or Drawer.

## Gallery Baseline Before This Batch

- Registry `B9`, Layout, no canonical component dependencies; contract `0.2.0`,
  `pilot`.
- Canonical CSS exposes root, optional arrow/title, required content and the
  `.popover--open` state. It uses absolute positioning and no runtime.
- The shared `FloatingMenuStudio` fixture starts open but forces
  `role="dialog"`, `aria-label` and `aria-haspopup="dialog"` for static details.
  It toggles on click but does not implement Escape, outside dismissal or focus
  restoration.
- CSS contains hardcoded physical padding, minimum/maximum widths, offsets and a
  calculated type size; it lacks logical properties, long-word containment,
  reduced-motion and forced-colors treatment.
- Native `popover`/`popovertarget` and `:popover-open` are not mapped.
- The stored Studio design reference is shared rather than a component-specific
  owner specimen. Repository rendering is therefore the only current visual
  reference, pending human aesthetic review.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WHATWG HTML Popover](https://html.spec.whatwg.org/multipage/popover.html) | `popover="auto"` enters the top layer, light-dismisses, responds to close requests, and can be invoked by a Button through `popovertarget`; authors must still supply appropriate semantics. The trigger should be near the panel in DOM order when possible. | Prefer native Web behavior where available, but never infer a universal ARIA role from the visual pattern. |
| [Open UI Popover explainer](https://open-ui.org/components/popover.research.explainer/) | Popovers are ephemeral top-layer content that close when the user moves on; `auto` and `manual` differ in dismissal and mutual exclusion. | `open` remains the cross-target state; dismissal mode and stack coordination belong to target adapters. |
| [Radix Popover](https://www.radix-ui.com/primitives/docs/components/popover) | Separates Root, Trigger, Anchor, Portal, Content, Close and Arrow; supports controlled/uncontrolled state, modal choice, focus hooks and collision data. | Preserve explicit anatomy and state ownership, but do not expose portal/collision/side details as neutral v1 API. |
| [Shopify Polaris Popover](https://polaris-react.shopify.com/components/overlays/popover) | Uses a clearly labelled activator, secondary content/actions, focus target choice, Escape/outside/Tab dismissal and focus return. It cautions that `aria-haspopup` can harm some screen-reader flows. | Keep trigger naming and focus lifecycle explicit; omit a forced `aria-haspopup` value unless content semantics require it. |

## Matches, Differences, And Direction

- Gallery already matches mature systems on controlled visibility, optional
  arrow, compact surface and target-owned positioning.
- It differs by forcing dialog semantics in the only live renderer and by
  omitting target behavior from that renderer, so current evidence does not
  prove the contract requirements.
- It also lacks the standardized Web mapping now supported by current engines.
- Direction: add semantic state selectors and robust visual containment, then
  make the shared docs target demonstrate the required lifecycle without
  shipping React behavior as neutral runtime.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Trigger | yes | native `button` | Consumer/target | Owns the accessible name, expanded state and panel relationship. Not restyled by Popover. |
| Root/panel | yes | neutral element; role chosen from content | Popover | Floating surface, visibility and visual containment. |
| Arrow | no | decorative | Popover | `aria-hidden`; target may omit after collision/side changes. |
| Title | no | context-appropriate heading/text | Consumer | Labels the panel only when the selected semantic role requires a name. |
| Content | yes | natural document/control semantics | Consumer | May contain concise interactive content; natural Tab order is preserved. |

No dependency is registered: the trigger composes a native button or the
canonical Button markup without making Button presentation mandatory.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | `default` only. |
| Size | One bounded compact surface; content determines height. |
| Closed | Visually hidden and absent from pointer/accessibility interaction. |
| Open | `.popover--open` or Web `:popover-open`; trigger state remains synchronized. |
| Focus | Natural Tab order; no trap. Focus may stay on trigger for passive content or move to a target-selected first node for interactive content. |
| Dismissed | Trigger toggle, Escape, outside interaction; native `auto` can own this on Web. |
| RTL | Logical spacing/alignment; positioning service interprets start/end. |
| Narrow | Surface wraps and remains within target-reported available width. |
| Reduced motion | Opacity/transform transition removed. |
| Forced colors | System border and text remain perceivable without shadow. |

## Public API And State Ownership

- `open` owns visibility, with controlled and uncontrolled target
  implementations allowed.
- `showArrow` is an independent boolean presentation property, defaults to
  `true`, and omits or natively hides the decorative arrow when false.
- Targets expose `openChange`/dismiss equivalents and keep trigger state in sync.
- Trigger label, title, content and close control remain composition. Arrow
  presence is the one explicit visual boolean and carries no semantic meaning.
- Role is content-derived: no default, `dialog` only for a correctly implemented
  non-modal dialog, `menu` only through Dropdown Menu, and native semantics when
  sufficient.
- Placement, alignment, offsets, collision padding, portal container, modal
  mode and autofocus target remain target services rather than v1 public API.

## Token And Value Audit

- Current public tokens cover primary surface/border/text, secondary text,
  medium radius, large shadow, dropdown z-index, fast transition, default easing
  and body size.
- Direction adds existing body line-height and caption size/line-height only if
  used by canonical title/content typography; no new tokens are invented.
- Padding, arrow geometry, offsets and maximum width remain private
  compositional values. Hardcoded `12px 16px`, `200px`, `320px`, `8px`, `4px`
  and `0.875` must be reconciled with existing semantic sources or documented as
  private geometry.

## Accessibility And Interaction

- Use a native Button with an accessible name; synchronize `aria-expanded` and
  `aria-controls` for class-driven targets. Native `popovertarget` supplies the
  computed relationship on capable browsers.
- Do not add `aria-haspopup="dialog"` simply because the content floats.
- Escape and outside interaction close; keyboard dismissal restores focus if it
  moved inside. Repeated trigger activation toggles.
- Non-modal content does not trap focus or inert page content.
- Verify closed content is removed from the accessibility tree, open content has
  appropriate content-derived semantics, and trigger/panel names are not
  duplicated.

## Responsive And Performance

- Capture Mobile 390, Tablet 768, Desktop 1280 and XL 1600 in Exhibit and Studio,
  plus long localized content, RTL, focus, dark, forced colors and reduced
  motion.
- Target positioning must clamp to available viewport/container geometry while
  open; neutral CSS performs no measurement loop.
- Batch 17 begins at Layout `5,257 B`, Web components `61,781 B` and shared
  runtime `10,321 B` deterministic gzip. Layout is already `342 B` over its
  provisional `4.8 KiB` ceiling; any delta must be reported rather than hidden.
- Neutral runtime delta target is `0 B`; native Web behavior or target-local docs
  behavior does not justify a new component-owned client.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Class state universally; `popover="auto"`/`popovertarget` and `:popover-open` when the target can use native top layer. | CSS exists; semantic/runtime refinement pending. |
| Shopify | Theme Liquid composes trigger and panel; theme JS or native Popover API owns lifecycle and collision. | Planned; no dedicated Liquid primitive. |
| React / Angular | Controlled/uncontrolled `open`, `onOpenChange`, trigger/content slots and target positioning/focus service. | Planned. |
| Figma | Trigger, panel, optional arrow/title, closed/open/focus states; placement remains presentation metadata. | Planned. |
| SwiftUI / Compose | Platform popover/popup with equivalent non-modal state and dismissal semantics. | Planned. |

## Exhibit And Studio Parity

`FloatingMenuStudio` is already the shared Exhibit/Studio renderer. The fixture
must stop forcing dialog semantics, exercise toggle/Escape/outside dismissal and
focus restoration, and keep site-only positioning separate from canonical CSS.
MDX remains fallback/editorial evidence, not a second canonical renderer.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Fixture forces dialog semantics for passive details. | resolved | Content-derived role; no default `aria-haspopup`. | implementation |
| Contract requirements are not exercised by the shared renderer. | resolved | Target-local toggle, Escape/outside dismissal and focus restoration are evidenced. | implementation |
| Surface can overflow or misread RTL because of physical/hardcoded geometry. | resolved | Logical properties, wrap containment and private geometry. | implementation |
| Native HTML Popover mapping is undocumented. | resolved | Progressive Web mapping preserves the same cross-target state. | implementation/adapter |
| Portal/collision/autofocus policy has no owner decision. | non-blocking | Keep target-owned under ADR 0072. | owner/architecture later |

## Evidence And Validation

- Contemporary before evidence contains Exhibit and Studio desktop captures
  under `output/playwright/refinement-batch-17/before/`.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized extreme, dark, forced-colors, reduced-motion and focus evidence is
  under `output/playwright/refinement-batch-17/after/`.
- At 390px, the localized extreme stage remains `358/358px` and the surface
  `318/318px` client/scroll width. The long unbroken title wraps safely inside a
  `320px` bounded surface with no root overflow.
- Light title/content contrast is `17.93:1`/`7.81:1`; dark is
  `17.18:1`/`12.09:1`. Reduced motion computes `0s`; forced colors preserves a
  system boundary and focus remains visible.
- A live native-Web probe confirms `showPopover()`, `:popover-open`, opacity `1`,
  visible pointer interaction and `hidePopover()` closure. The class-driven
  renderer separately proves synchronized expanded/hidden state, Escape/outside
  dismissal, no forced dialog role and trigger focus restoration.
- Contracts, docs/Studio, copied/generated adapters, TypeScript, structural/
  parity/static/refinement audits, temporary build, deterministic performance,
  diff checks and `site/dist` cleanliness are included in Batch 17.

## Risks And Open Questions

1. Exact surface width, padding, arrow placement and shadow lack a
   component-specific owner reference and require human visual review.
2. Native Popover top-layer geometry is a Web implementation choice, not a
   promise that every target uses the same DOM or positioning algorithm.
3. Rich forms may need a Dialog instead; the v1 boundary must be enforced in
   guidance rather than inferred from arbitrary content.

## G4 Migration Follow-up

ADR 0224 applies the owner's anchored-surface correction: deprecated G4 Popup
now points to this canonical component and owns no overlay, CSS, renderer,
fixture, runtime or adapter. The shared Dimensions fixture mirrors the owner's
reference with four labelled fields, proves natural Tab entry and remains
anchored below the trigger. Canonical Popover's API stays `open` only; marketing
copy or a small form is content composition, while page-blocking campaigns use
Modal. Final paired evidence is in
`output/playwright/refinement-layout/popup-popover-0224/`.

## Readiness Decision

Popover is prepared for explicit human stability review and remains `pilot`.
Surface width, padding, arrow, shadow, placement/collision service and rich-
content focus policy still require human or target approval.
