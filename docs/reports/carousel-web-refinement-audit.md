# Carousel Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Carousel is now a finite, user-controlled native horizontal scroll-snap region
with named slides, canonical Icon Button controls, 44px pagination targets,
bounded first/last states, and one synchronized current/status model for direct
scrolling and explicit navigation. It does not autoplay, loop, virtualize, own
analytics, or hide target collection state inside the neutral source.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite browsable collection; not an autoplay rotator, product-gallery data owner, or virtualization engine. |
| Anatomy and composition | pass | Named region, focusable native track, named slide groups, optional canonical previous/next controls, dots, and stable status. |
| Variants, sizes, states | pass | Default finite mode; first/middle/last, hover, disabled, track focus, dot focus/current, direct-scroll, and reduced-motion states. |
| Public API and ownership | pass | Only item `current` and control `disabled`; collection, index, grouping, lazy loading, and analytics remain target/consumer state. |
| Tokens and visual system | pass | Twelve accepted public references; gap, inset, bullet diameter, and control composition remain private. |
| Accessibility and motion | pass | Named carousel/slide semantics, native scrolling, real Buttons, 44px dot targets, visible focus, synchronized status, no root arrow capture, and reduced-motion fallback. |
| Responsive/content resilience | pass | Four viewports, variable-width direct scroll, Arabic RTL, long content, logical controls, and no page overflow. |
| Runtime and assets | pass | No neutral runtime or asset; the target renderer owns bounded state synchronization with native scrolling. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native collection and state boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0104, semantic MDX, contract/Studio/registry, shared renderer/fixture, before/after evidence, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 8 anatomy parts, 1 variant, 1 size, 8 states,
  6 behaviors, 2 properties, 12 public token references, and canonical
  `icon-button` dependency.
- Exhibit and Studio expose a named carousel region, focusable native track,
  three named slide groups, previous/next Buttons, three 44×44px pagination
  targets, one current dot, and a stable polite status.
- Next navigation moves to Ash and reports `2 / 3`; a direct scroll to the exact
  track end selects Porcelain, reports `3 / 3`, and disables Next. Root arrow
  handling does not steal input from a focused descendant.
- Slide targeting uses the element's logical start rather than a physical
  width multiplication; a `326px` Arabic RTL track with `883px` scroll content
  preserves variable widths, logical controls, and a page width equal to the
  `390px` viewport.
- The track focus boundary computes as a `2px` outline with `-2px` offset.
  Reduced motion changes authored scroll behavior to `auto` and pagination
  transition duration to `0s`; forced colors keeps focus and current-state
  distinctions visible.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  focus, Arabic RTL/long content, dark, and forced-colors captures supplement
  two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native horizontal overflow/snap, named region/groups, Button controls, synchronized current/status state. | CSS/semantics evidenced; collection and synchronization remain target code. |
| Shopify | Liquid media/item collection with native overflow and bounded target JavaScript. | Shared classes copy correctly; dedicated adapter remains planned. |
| React / Angular | Controlled collection/index with optional uncontrolled wrapper and the same native track/control semantics. | Strategy documented; adapter not certified. |
| Figma | First/middle/last, current dot, controls, variable content, and responsive examples. | Studio validates presentation; no scroll/runtime ownership. |
| SwiftUI / Compose | Native horizontal collection with finite index and equivalent labels/actions. | Conceptual mapping only. |

## Performance And Risks

- Carousel adds no neutral runtime. Batch 19 Layout is the documented
  `6,822 B / 4.8 KiB` exception (`1,907 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `63,507 B / 64 KiB`.
- Human review must approve slide width/peek, gap, control placement/shadow,
  dot geometry, current treatment, focus placement, and whether the repository
  render is the visual reference.
- Visible-page grouping, loop, autoplay/pause, lazy loading, virtualization,
  analytics, draggable custom engines, and product-specific media behavior
  remain explicit future product/target decisions.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native-scroll/direct-
scroll/bounds/focus/RTL/content/special-media probes, four-viewport evidence,
TypeScript, structural/parity/static-preview/refinement audits, temporary docs
build, deterministic performance, diff checks, and `site/dist` verification are
included in Batch 19.
