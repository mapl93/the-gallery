# Popover Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## 2026-08-25 Owner Consolidation

Owner decision 83 and ADR 0286 remove Hover Card from the active pre-v1
inventory and make Popover the single canonical floating surface. Contract
`0.4.0` now has two properties: `open` and independent `showArrow`, defaulting
to `true`. Exhibit renders the default arrow; Studio uses the same Popover
implementation and can omit that anatomy with its Show arrow toggle. Popover
remains `pilot`.

## Outcome

Popover is now a bounded non-modal floating-surface contract with content-
derived semantics, portable and native-Web open mappings, semantic typography,
natural focus order, and explicit target lifecycle obligations. It adds no
dialog assumption, placement API, collision engine, or neutral runtime.

No visual approval, target positioning decision, or `stable` promotion is
implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Concise trigger-owned non-modal content; Dialog/Menu and rich workflow boundaries are explicit. |
| Anatomy and composition | pass | Required panel/content, optional arrow/title, and target-owned native trigger relationship. |
| Variants, sizes, states | pass | One compact treatment; closed/open, focus, narrow/localized, dark, reduced-motion and forced-colors modes. |
| Public API and ownership | pass | `open` owns visibility and `showArrow` owns decorative arrow presence; role/positioning remain contextual. |
| Tokens and visual system | pass | Fifteen existing public references; padding, bounds, arrow and offset remain private. |
| Accessibility and motion | pass | No forced dialog semantics or trap; synchronized relationship, Escape/outside lifecycle, focus restoration and `0s` reduced motion. |
| Responsive/content resilience | pass | 390px long/unbroken localized proof with equal root/surface client and scroll widths. |
| Runtime and assets | pass | `0 B` neutral Popover runtime; no listener, observer, timer, request, asset or measurement loop. |
| Cross-target translation | pass | Class/native Web mapping and Shopify/framework/Figma/native boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0102, contract/docs/Studio/registry, one renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.4.0`: 4 anatomy parts, 1 variant, 1 size, 2 contract states,
  7 behaviors, 2 properties and 15 public token references.
- The trigger has a complete native Button name, synchronized `aria-expanded`
  and `aria-controls`, no `aria-haspopup="dialog"`, and the passive fixture
  exposes no dialog role.
- Escape closes and restores the trigger; repeated activation toggles; outside
  pointer interaction dismisses; closed content is hidden and non-interactive.
- A live native probe confirms `showPopover()` activates `:popover-open` with
  opacity `1`, visible pointer interaction, and `hidePopover()` closure.
- At 390px, long localized content keeps the stage `358/358px` and surface
  `318/318px` client/scroll width. An unbroken title wraps within the bounded
  `320px` surface without document overflow.
- Light title/content contrast is `17.93:1`/`7.81:1`; dark is
  `17.18:1`/`12.09:1`. Reduced motion is `0s`; forced colors and focus remain
  visible.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized, dark, forced-colors, reduced-motion and focus captures supplement
  two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Portable `.popover--open`; progressive `popover="auto"`, invoker and `:popover-open`. | CSS and live native mapping evidenced; positioning/focus service remains consumer owned. |
| Shopify | Liquid trigger/panel plus native Popover or bounded theme controller. | Shared CSS ships; dedicated Liquid/runtime remains planned. |
| React / Angular | Controlled/uncontrolled open, change event, trigger/content composition and target position/focus service. | Strategy documented; adapter not certified. |
| Figma | Trigger/panel/arrow/title/content anatomy and closed/open/focus states. | Studio validates; no semantic role or collision ownership. |
| SwiftUI / Compose | Native popover/popup with equivalent non-modal state and dismissal. | Conceptual mapping only. |

## Performance And Risks

- Popover adds no neutral JS. Batch 17 Layout is the documented
  `5,845 B / 4.8 KiB` exception (`930 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `62,398 B / 64 KiB`.
- Human review must approve width, padding, title/content rhythm, radius, shadow,
  arrow treatment and default visual hierarchy.
- Target owners still choose placement, alignment, collision, portal, native
  top-layer use, autofocus for genuinely interactive content and rich-content
  escalation to Dialog.

## 2026-07-20 Migration Verification

ADR 0224 deprecates G4 Popup into this canonical implementation. Both routes
use the exact same anchored Dimensions artwork (`1234` normalized characters,
FNV-1a `2a80e829`), four-view Exhibit/Studio matrix and focus/closed evidence.
Escape, outside interaction, trigger toggle and natural Tab entry pass; closed
fields are hidden. Removing duplicate G4 CSS saves `405 B` gzip in Marketing
and `392 B` in the neutral component bundle with no runtime delta.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native/class lifecycle,
keyboard/focus, contrast/content/overflow/special-media probes, four-viewport
visual evidence, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks and `site/dist`
verification are included in Batch 17.
