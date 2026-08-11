# Scroll Area Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Scroll Area is now a deliberately small native-overflow primitive: exactly one
scroll node, optional named-region/focus semantics when direct keyboard access
is required, a visible focus boundary, standards-based scrollbar styling, and
progressive coarse-pointer, forced-colors, and WebKit treatment. It does not own
custom rails, thumbs, drag logic, observers, axis APIs, or container dimensions.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Native bounded overflow surface; not a virtualizer, custom scrollbar engine, or layout sizing abstraction. |
| Anatomy and composition | pass | One required root/viewport plus native content and optional labelled-region semantics; no duplicate scrolling wrapper. |
| Variants, sizes, states | pass | Default native mode; labelled focusable, unlabelled passive, focus-visible, coarse-pointer, and forced-colors states. |
| Public API and ownership | pass | Optional semantic `label` only; axis, size, scrollbar position, and content stay layout/target concerns. |
| Tokens and visual system | pass | Four accepted public color/focus references; native width and progressive scrollbar geometry remain private. |
| Accessibility and motion | pass | Conditional region/name/tab stop, native keyboard/touch/wheel behavior, visible focus, system forced colors, and no motion. |
| Responsive/content resilience | pass | Four viewports, two-axis extreme content, Arabic RTL, keyboard paging, coarse pointer, and bounded page width. |
| Runtime and assets | pass | No listener, observer, timer, request, drag controller, animation, or asset. |
| Cross-target translation | pass | Native overflow and platform-scroll ownership are documented for Web, Shopify, frameworks, Figma, and native targets. |
| Documentation and verification | pass | Dossier, ADR 0104, semantic MDX, contract/Studio/registry, shared renderer/fixture, before/after evidence, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 4 anatomy parts, 1 variant, 1 size, 3 states,
  5 behaviors, 1 property, 4 public token references, and no component
  dependency or neutral runtime.
- With a label, Exhibit and Studio expose one named focusable region. PageDown
  moves native `scrollTop` from `0` to `201px` of a `258px` maximum while the
  root displays a solid `2px` focus outline.
- Clearing the label removes `role`, `tabindex`, and `aria-label` together, so
  content already reachable through descendants does not gain a redundant
  landmark or keyboard stop.
- An Arabic RTL extreme fixture measures `324×278px` client area against
  `940×621px` scroll content while document width remains equal to the `390px`
  viewport. Both native axes remain usable without page overflow.
- Forced colors computes system `auto` scrollbar colors and preserves the focus
  boundary. Coarse pointers use platform `auto` width rather than a narrow
  custom rail; the component authors no transition or animation.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  keyboard focus, Arabic RTL/two-axis extremes, dark, and forced-colors captures
  supplement two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Single `overflow: auto` node with optional named region/focus stop and progressive scrollbar CSS. | CSS, keyboard, semantics, and special media evidenced. |
| Shopify | Shared class contract around a Liquid content region; platform scrolling remains native. | Copied class adapter is implemented; no target runtime needed. |
| React / Angular | Thin wrapper forwarding label and native layout/content props without mirroring scroll state. | Strategy documented; adapter not certified. |
| Figma | Bounded viewport with overflow indication and light/dark examples. | Studio validates appearance; native scrolling is not simulated as API. |
| SwiftUI / Compose | Native scroll container and platform scroll indicators. | Conceptual mapping only. |

## Performance And Risks

- Scroll Area adds no neutral runtime. Batch 19 Layout is the documented
  `6,822 B / 4.8 KiB` exception (`1,907 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `63,507 B / 64 KiB`.
- Human review must approve scrollbar width/color, focus boundary, corner
  behavior, coarse-pointer fallback, and whether the repository render is the
  visual reference.
- A public axis/size/position API, always-on custom rail, custom thumb dragging,
  virtualization, scroll shadows, and scroll-state events require separate
  semantic and performance decisions.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native keyboard/touch/
wheel behavior, labelled/unlabelled semantics, RTL/two-axis extremes, focus and
special-media probes, four-viewport evidence, TypeScript, structural/parity/
static-preview/refinement audits, temporary docs build, deterministic
performance, diff checks, and `site/dist` verification are included in Batch 19.
