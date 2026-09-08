# Component Dossier: Popup

Status: `human-review-ready-deprecated-migration`

Target reviewed: canonical Popover, Neutral Web, Shopify and future targets

Contract: `components/contracts/popup.contract.json` (`0.3.0`, `deprecated`)

Decision: `docs/decisions/0224-popup-deprecation-to-canonical-anchored-popover.md`

## Recommendation And Accepted Direction

Do not retain G4 as a modal-like Popup. The owner clarified that the intended
surface is contextual floating content anchored to its trigger, which is
already canonical B9 Popover. G4 is therefore a deprecated pre-v1 migration
record and owns no independent implementation.

Page-blocking marketing campaigns remain valid compositions of canonical Modal.
That use case does not restore Popup as a second component.

## Purpose And Limits

- Reveals concise supplemental or marketing content beside the explicit Button
  that opened it.
- May contain a small target-composed form while preserving natural Tab order.
- Is non-modal: no backdrop, inert page, scroll lock, focus trap or default
  `role="dialog"`.
- Closes on repeated trigger activation, Escape and outside interaction.
- Long workflows or mandatory decisions use Modal; menu-shaped action lists use
  Dropdown Menu; passive destination preview content composes Popover, while a
  short non-interactive explanation uses Tooltip.

## Research And Reference Analysis

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [shadcn/ui Base Popover](https://ui.shadcn.com/docs/components/base/popover) | The supplied reference presents floating content immediately beside its trigger and composes trigger, portal, positioner, popup, title/description and arrow. | Use one explicit trigger/panel relationship and anchored surface; do not treat it as a centered overlay. |
| [Open UI Popup research](https://open-ui.org/components/popup.research/) | Popups are transient, commonly anchored, top-layer surfaces with light dismissal and content that may be interactive. | Preserve trigger/outside/Escape dismissal and arbitrary concise content in canonical Popover. |
| [Open UI Popover explainer](https://open-ui.org/components/popover.research.explainer/) | Native popover goals include top-layer rendering, Escape/outside light dismiss and author-controlled positioning. | Web may use native Popover; cross-target `open` remains the semantic state. |
| [APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | A Button toggles controlled content through synchronized expanded state. | Use a native Button with `aria-expanded` and `aria-controls` for class-driven targets. |
| [APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal dialogs inert background content and contain focus. | Those behaviors are explicitly absent; use Modal when they are required. |

The owner's screenshot shows a Dimensions panel directly below “Open popover,”
with no page backdrop. The shared fixture now preserves that spatial model and
four labelled editable fields without copying the external library API.

## Migration Anatomy

| Former G4 | Canonical result |
| --- | --- |
| `.popup-overlay` | removed; non-modal Popover has no backdrop |
| `.popup` | `.popover` |
| `.popup__title` | optional `.popover__title` composition |
| `.popup__body` / `.popup__text` | required `.popover__content` composition |
| `.popup__close` | removed; trigger/Escape/outside dismissal belongs to Popover lifecycle |
| `.popup__media` | target content inside Popover when concise and appropriate |
| `.popup--split` / `.popup--slide` | removed; neither is a Popover semantic variant |

Canonical Popover anatomy is trigger, root/panel, optional arrow/title and
required content. Trigger composition remains adjacent in DOM where practical.

## State, API And Ownership

- The temporary G4 contract mirrors canonical `open` only, default `false`.
- Controlled targets expose `open` / `openChange`; uncontrolled targets may own
  initial open state and the same dismissal transitions.
- Trigger label, panel content, optional title/arrow and small-form fields are
  slots/composition, not G4 scalar properties.
- Placement, side, alignment, offset, collision, portal/top-layer use,
  autofocus and content-derived role remain target services.
- Closed interactive content is `hidden` in the shared renderer and unavailable
  to Tab and accessibility APIs.

## Accessibility And Interaction Matrix

| Case | Expected result | Evidence |
| --- | --- | --- |
| Open | Trigger expanded; panel visible and anchored | pass |
| Repeated trigger | Close and remove all four fields from focus order | pass |
| Escape inside field | Close and restore trigger focus | pass |
| Outside pointer | Close without forcing trigger focus | pass |
| Tab from trigger | Enter first field naturally; no trap | pass |
| Semantics | No backdrop, `aria-modal` or forced dialog role | pass |
| Reduced motion / forced colors | Inherited canonical Popover treatment | pass from B9 certification |
| Responsive | 390, 768, 1280 and 1600, Exhibit and Studio | pass |

Desktop geometry measured trigger `left 794`, `bottom 226` and panel `left 794`,
`top 248`; the panel is aligned to and below its trigger rather than centered in
the viewport.

## Tokens, Runtime And Targets

- G4 now references the same 15 canonical Popover token decisions for surface,
  border, text, radius, shadow, z-index, typography, spacing and motion.
- Arrow size, padding and bounds remain private Popover geometry.
- No neutral listener, timer, observer, network request or positioning loop was
  added. The docs renderer owns demonstration interactions locally.
- Web forwards to canonical `.popover` and may progressively use native
  `popover="auto"` / `popovertarget`.
- Shopify exposes no G4 adapter; a target composes canonical Popover or Modal.
- React/Angular map controlled/uncontrolled open state plus target positioning.
  Figma maps open/closed surface anatomy. Native targets use platform popover.

## Performance

Removing the duplicate G4 block reduces Marketing from `5,335 B` to `4,930 B`
gzip and Neutral Web component CSS from `69,470 B` to `69,078 B`. Shared runtime
remains `13,078 B`; the G4 migration adds `0 B`. Existing program gaps remain
documented and no ceiling was raised.

## Risks And Human Review

- Human review must approve canonical Popover width, padding, field density,
  arrow, shadow and anchor spacing.
- Target collision handling may place the panel on another side; that is not a
  new public variant.
- Consumer migration must remove former Split/Slide/overlay assumptions.
- G4 cannot become `stable`; it is removable after the pre-v1 migration review.

## Evidence

- Final matrix and focus/closed states:
  `output/playwright/refinement-layout/popup-popover-0224/`.
- Existing B9 special-mode evidence:
  `output/playwright/refinement-batch-17/after/`.
- Detailed audit: `docs/reports/popup-web-refinement-audit.md`.
