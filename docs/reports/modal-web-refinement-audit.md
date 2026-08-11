# Modal Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Modal is now a named, bounded dialog composition with required content and
canonical dismissal, optional short description/actions, resilient scroll
partition, and an explicit target lifecycle boundary. The shared docs renderer
demonstrates that lifecycle without adding a neutral overlay service.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Focused temporary task; routes, multistep flows, async state, and global coordination remain excluded. |
| Anatomy and composition | pass | Overlay/root/header/title/close/body plus optional footer; Button and Close Button are canonical dependencies. |
| Variants, sizes, states | pass | Centered/default, one bounded size, closed/open/entered/scrolling states and special-media behavior. |
| Public API and ownership | pass | Seven semantic properties; portal, geometry, focus selector, and dismissal policy remain private/target-owned. |
| Tokens and visual system | pass | Fourteen existing public references; width, entrance distance, derived chrome/action gaps, and weight remain private composition. |
| Accessibility and motion | pass | Required visible name/dismissal, optional short description, target modality obligations, reduced motion, and forced-color boundary. |
| Responsive/content resilience | pass | Four viewports, narrow RTL, optional-minimal, and 1,488px localized body-scroll probes pass without overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no timer, observer, portal, provider, document listener, request, or asset. |
| Cross-target translation | pass | Web dialog option, Shopify host/theme, frameworks, Figma, and native-mobile boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0098, shared renderer, real before/after evidence, adapters, and this report. |

## Contract And Ownership

- Contract `0.4.0`: 7 anatomy parts, 1 variant, 1 size, 4 CSS states,
  5 behaviors, 7 properties, 14 public token references, and Button/Close Button
  dependencies.
- The target controls `open` and emits lifecycle events. It may expose
  controlled/uncontrolled convenience, but the neutral contract does not store
  a second open owner or prescribe a portal.
- Title and dismiss action are required. `descriptionId` is valid only for a
  short simple description; rich body content intentionally omits it.

## Browser And Visual Evidence

- Initial focus lands on the least destructive Cancel action. Tab advances to
  Confirm and Close then wraps to Cancel; Shift+Tab wraps in reverse.
- Escape and the docs target's backdrop request both close the surface and
  restore focus to the current `Open modal` invoker, including reopen cycles.
- The long localized mobile case keeps a `141px` header and `81px` footer in a
  `420px` panel while only the `198px` body scrolls (`1,488px` content height).
- Optional actions and description omit the footer and `aria-describedby` while
  required content/dismiss slots remain locked in Studio.
- Light/dark title and focus-indicator contrast against the surface are
  `17.93:1` and `17.18:1`. Forced colors produces a system `1px` boundary;
  reduced motion computes `0s` transitions and no entered transform.
- Exhibit/Studio canonical inner markup is byte-identical at `1,058` characters;
  sampled stage/inner/root horizontal overflow is zero at all four viewports.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL.
  Dark, forced-colors/reduced-motion, long localized scroll, RTL, and minimal
  optional states supplement two real pre-refinement desktop captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native `dialog.showModal()` or equivalent target lifecycle around canonical parts. | CSS implemented; docs lifecycle evidenced; production mapping remains target choice. |
| Shopify | Host Modal where available or Liquid structure plus theme lifecycle. | Generated class adapter validates; target focus/editor review remains. |
| React / Angular | `open/defaultOpen`, lifecycle callbacks, portal/top-layer facility. | Strategy documented; adapter not yet certified. |
| Figma | Open/closed, title/body/actions/overflow and semantic tokens. | Studio metadata validates; no runtime ownership. |
| SwiftUI / Compose | Native modal presentation with name, content, and dismiss path. | Conceptual mapping only. |

## Performance And Risks

- Modal shares the Batch 13 Layout delta; no component JS is added. Layout CSS
  finishes at `4,639 B` gzip and the full Web bundle at `60,664 B`.
- Human review must approve width, backdrop, radius/shadow, title scale, chrome/
  body spacing, 32px inherited Close Button target, focus treatment, and action
  hierarchy.
- Native-dialog versus custom/portal mapping and assistive-technology behavior
  require each production target to certify true inertness and restoration.
- Stacking, mutual exclusion, route dismissal, scroll lock, and destructive
  backdrop policy remain part of the open global overlay architecture.

## Validation

Contracts, Studio, registry/docs, public-token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, focus/keyboard/
dismissal/description/optional/scroll/RTL/contrast/special-media/overflow probes,
temporary docs build, deterministic performance, and `site/dist` checks are
included in Batch 13.
