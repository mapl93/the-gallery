# Hover Card Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Hover Card is now a passive supplemental destination preview with canonical
title/description anatomy, hover/focus parity, pointer-transfer persistence,
temporary Escape dismissal, bounded localized content and direction-correct RTL
centering. The destination link remains authoritative and no public `open`,
delay, placement, portal, or collision property is added.

No visual approval, assistive-technology duplication policy, or `stable`
promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Sighted supplemental preview behind a complete native destination; no required information or rich interaction. |
| Anatomy and composition | pass | Root, link trigger, passive content, optional title/description; no focusable preview descendants. |
| Variants, sizes, states | pass | One bounded treatment; hidden/hover/focus/dismissed, RTL/localized, dark, reduced-motion and forced-colors modes. |
| Public API and ownership | pass | Zero scalar properties; interest/dismissal internal to target cycle; delay/placement remain services. |
| Tokens and visual system | pass | Fifteen existing public references; dimensions, offset and translation remain private. |
| Accessibility and motion | pass | Keyboard reveal, dismissible/hoverable/persistent content, unchanged link focus, `0s` reduced motion. |
| Responsive/content resilience | pass | 390px Arabic RTL proof with equal widths and physical bounds inside the stage. |
| Runtime and assets | pass | `0 B` neutral Hover Card runtime; no observer, request, asset or geometry loop. |
| Cross-target translation | pass | Web interest cycle and Shopify/framework/Figma/native preview boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0102, contract/docs/Studio/registry, one renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.2.0`: 4 anatomy parts, 1 variant, 1 size, 4 states,
  5 behaviors, 0 scalar properties and 15 public token references.
- Focusing or hovering the native link reveals the preview. Moving the pointer
  from link to surface keeps it visible. Escape suppresses the surface for the
  current interest cycle without moving link focus; leaving/blur and renewed
  interest reset the dismissed state.
- The preview contains canonical title and description typography and no
  focusable element or information unavailable at the destination.
- At 390px, Arabic RTL content keeps the stage `358/358px` and surface
  `278/278px` client/scroll width. The surface lies at physical x `55–335px`;
  the direction-aware private translation prevents off-canvas movement.
- Light title/description contrast is `17.93:1`/`7.81:1`; dark is
  `17.18:1`/`12.09:1`. Reduced motion is `0s`; forced colors preserves the
  boundary and native link focus is visible.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, dark, forced-colors, reduced-motion, focus and dismissed
  captures supplement two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native link plus passive adjacent preview; CSS interest states and target Escape cycle. | Canonical anatomy/lifecycle evidenced; future interest invokers remain progressive. |
| Shopify | Artist/product/collection link plus optional supplemental theme preview. | Shared CSS ships; data/delay/collision adapter remains planned. |
| React / Angular | Trigger/content composition with internal interest, delay and dismissal state. | Strategy documented; no required controlled API. |
| Figma | Hidden/hover/focus/open-inspection/dismissed states and passive anatomy. | Studio validates; no destination or collision ownership. |
| SwiftUI / Compose | Native preview/hover affordance where available with destination fallback. | Conceptual mapping only. |

## Performance And Risks

- Hover Card adds no neutral JS. Batch 17 Layout is the documented
  `5,845 B / 4.8 KiB` exception (`930 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `62,398 B / 64 KiB`.
- Human review must approve width, padding, typography rhythm, radius, shadow,
  offset, link/surface relationship and timing feel.
- Target owners still choose delay, collision, portal, touch alternative and
  whether duplicate supplemental content is exposed to assistive technology.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, WCAG interest lifecycle,
focus, contrast/RTL/content/overflow/special-media probes, four-viewport visual
evidence, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks and `site/dist`
verification are included in Batch 17.
