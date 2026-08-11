# Drawer Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Drawer is now a modal-dialog composition with physical right/left presentation,
required naming/content/dismissal, optional persistent footer, canonical Button
dependencies, and a fixed-header/body-scroll/fixed-footer partition. It reuses
Modal lifecycle obligations instead of inventing a second accessibility model.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Supporting modal task; permanent sidebars, bottom sheets, swipe, resize, and domain state remain excluded. |
| Anatomy and composition | pass | Overlay/root/header/title/close/body plus optional footer; canonical Button and Close Button. |
| Variants, sizes, states | pass | Physical right/default and left, open/closed, scroll partition, reduced motion, and forced colors. |
| Public API and ownership | pass | Seven semantic properties; lifecycle, safe areas, swipe, scroll position, and geometry remain private/target-owned. |
| Tokens and visual system | pass | Thirteen public references; duplicated close tokens/styles removed and title typography fully owned. |
| Accessibility and motion | pass | Modal dialog naming/focus/Escape/restoration obligations, visible dismissal, physical-placement warning, special media. |
| Responsive/content resilience | pass | Four viewports, full-width narrow edge, left placement, localized long scroll, RTL, and optional-minimal cases. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no timer, observer, provider, swipe engine, request, or asset. |
| Cross-target translation | pass | Web sheet/dialog, Shopify host/theme, frameworks, Figma, and native mappings documented. |
| Documentation and verification | pass | Dossier, ADR 0098, shared renderer, real before/after evidence, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 7 anatomy parts, 2 variants, 1 size, 6 CSS states,
  6 behaviors, 7 properties, 13 public token references, and Button/Close Button
  dependencies.
- `default` remains physical right and `left` remains physical left, including
  RTL. A target must choose intentionally; the neutral API does not auto-flip.
- Open state may be wrapped by controlled/uncontrolled adapter convenience, but
  target lifecycle remains the only focus/inert/scroll-lock owner.

## Browser And Visual Evidence

- Initial focus lands on Close. Tab advances to Done, wraps to Close, and
  Shift+Tab wraps to Done. Escape and the docs backdrop request restore focus to
  the current `Open drawer` invoker after close and reopen.
- The left Studio control produces `.drawer--left`; at desktop the `400px`
  panel is at stage offset `0` with `292px` remaining on the right.
- The localized narrow case scrolls a `1,200px` body inside a `268px` body
  viewport while title, close, and footer remain available; stage overflow is 0.
- Removing the optional footer removes its DOM cleanly. Required content and
  dismiss slots remain visible and disabled in Studio.
- Light/dark title and focus-indicator contrast are `17.93:1` and `17.18:1`.
  Forced colors adds a system boundary; reduced motion computes `0s` transitions
  and no open transform.
- Exhibit/Studio canonical inner markup is byte-identical at `963` characters;
  stage/inner/root horizontal overflow is zero at all four viewports.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL.
  Dark, forced-colors/reduced-motion, left placement, long localized scroll,
  RTL, and minimal optional states supplement two real before captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native dialog styled as side sheet or equivalent modal target lifecycle. | CSS implemented; docs behavior evidenced; production mapping remains target choice. |
| Shopify | Host Sheet/Modal or Liquid structure with theme navigation/cart/filter state. | Generated class adapter validates; target-native behavior remains. |
| React / Angular | `open/defaultOpen`, portal, placement, lifecycle callbacks. | Strategy documented; adapter not yet certified. |
| Figma | Placement/open/overflow/content/actions and tokens. | Studio metadata validates; no runtime ownership. |
| SwiftUI / Compose | Native sheet/drawer preserving modal task and explicit side intent. | Conceptual mapping only. |

## Performance And Risks

- Drawer removes duplicate Close Button CSS and adds no JS. It shares the final
  `4,639 B` Layout and `60,664 B` Web bundle results.
- Human review must approve physical placement, 400px width, mobile full-width
  edge, backdrop/shadow, section spacing, 32px inherited Close target, and full
  footer action treatment.
- Logical placement, bottom sheets, non-modal inspectors, swipe, snap points,
  safe-area policy, and nested focus contexts remain explicit later decisions.
- Mobile Menu and Cart Drawer still need target-level proof that they compose,
  rather than duplicate, this lifecycle.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, certification/parity/
static-preview/refinement audits, keyboard/dismissal/placement/optional/scroll/
RTL/contrast/special-media/overflow probes, temporary build, performance, and
`site/dist` checks are included in Batch 13.
