# Header Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Header now behaves as a container-responsive site masthead, composes canonical
Button actions, provides one logical action-adornment hook, and keeps route and
global service ownership outside neutral source. Compact and expanded navigation
respond to Header width rather than the outer viewport.

No visual approval, production overlay certification, or `stable` promotion is
implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Site identity/navigation/action composition; search, cart, auth, menu, routing and data remain targets. |
| Anatomy and composition | pass | Native header/logo/nav/links plus optional actions, canonical Button dependency, badge and connected trigger. |
| Variants, sizes, states | pass | Sticky default; compact/expanded container modes; link/current/focus, count and special-media states. |
| Public API and ownership | pass | Brand, destinations, action slots, formatted count and connected trigger; no Header-local controlled state. |
| Tokens and visual system | pass | Nineteen existing public references; threshold, gaps, heights, badge and underline geometry remain private. |
| Accessibility and motion | pass | Native page-shell semantics, labelled navigation, current link, named Button actions/count, focus, reduced motion and forced colors. |
| Responsive/content resilience | pass | Container query, bounded nav scroll, logical geometry and long localized RTL evidence without root overflow. |
| Runtime and assets | pass | `0 B` Header runtime; actions use existing Button; no observer, timer, request, asset or continuous read. |
| Cross-target translation | pass | Neutral composition and target services are separately documented for Web, Shopify and future targets. |
| Documentation and verification | pass | Dossier, ADR 0100, one renderer/fixture, before/live after evidence, adapters and this report. |

## Contract And Browser Evidence

- Contract `0.3.0` records logo/navigation/actions/count/trigger boundaries,
  compact and expanded modes, canonical action composition, and target services.
- At a 390px viewport the `358px` Header has no inline overflow; nav is hidden,
  Search/Account are fixture-prioritized away, and named Cart/Menu Buttons remain.
- The editorial canvases are intentionally narrower than 48rem, so their 24
  canonical matrix captures remain compact. A supplemental `900px` host verifies
  expanded mode: root/stage are exactly `900px`, nav is `491px`, and the menu
  trigger is hidden.
- In localized RTL stress, root client/scroll width remains `900/900px`; nav owns
  `552px` visible and `760px` scroll content with `overflow-x: auto`.
- Light contrast is `17.93:1` logo/current text, `7.81:1` normal nav, and
  `10.37:1` cart badge. The current link's former `3.56:1` orange text was fixed:
  primary text now carries meaning and the orange remains a state underline.
  Dark uses `#fafafa` current, `#d4d4d4` normal, and `#fb923c` underline on
  `#171717`.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  expanded host, localized RTL scroll, dark keyboard focus, and forced-colors/
  reduced-motion captures supplement them.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native site header/nav/links plus canonical Buttons and target controllers. | CSS/docs composition evidenced; production services pending. |
| Shopify | Section schema/data plus synchronized classes/assets; theme runtime owns services. | Static composition validates; Header maturity warning remains for runtime gaps. |
| React / Angular | Brand/nav/action slots and controlled service state outside Header. | Strategy documented; adapter not certified. |
| Figma | Compact/expanded anatomy, current/focus/action/count states and tokens. | Studio validates; no service ownership. |
| SwiftUI / Compose | Native masthead/navigation/action facilities preserving priorities and names. | Conceptual mapping only. |

## Performance And Risks

- Header adds no neutral JS. Global CSS is `3,624 B / 3.7 KiB`; shared runtime is
  the unchanged documented `10,321 B` exception; complete Web CSS is
  `61,364 B / 64 KiB`.
- Human review must approve sticky height, wordmark scale, padding, border,
  underline, icon Buttons, badge geometry, compact priority, internal nav scroll,
  and focus treatment.
- Search, cart, account, mobile menu, mega menu, sticky focus offset, section
  grouping, action priority, and production focus/scroll coordination remain
  explicit ADR 0086/Open Questions target work.

## Validation

Contracts, Studio, docs/registry, public-token compatibility, synchronized Web/
Webflow/Shopify outputs, accessibility/container/keyboard/contrast/RTL/overflow/
special-media probes, four-viewport visual evidence plus a wide host, TypeScript,
structural/parity/static-preview/refinement audits, temporary docs build,
deterministic performance, diff checks, and `site/dist` verification are included
in Batch 15.
