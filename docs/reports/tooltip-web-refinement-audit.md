# Tooltip Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Tooltip now preserves the trigger's accessible name and supplies explicit,
described, non-interactive content with hover, focus, controlled-open, and
Escape-dismissed states. Its visual baseline wraps localized content, supports
hover transfer, passes light/dark contrast, and has forced-color/reduced-motion
fallbacks without adding neutral runtime.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Supplemental short text only; required, interactive, validation, and touch-only information remain excluded. |
| Anatomy and composition | pass | Root, required consumer trigger, required `role=tooltip` content, optional decorative arrow. |
| Variants, sizes, states | pass | One compact top presentation; hidden/hover/focus/open/dismissed plus special-media handling. |
| Public API and ownership | pass | Required `content`/`trigger`, optional `open`; ids, delay, collision, portal and provider remain target-owned. |
| Tokens and visual system | pass | Ten existing public references; offset, maximum measure, padding and arrow remain private composition. |
| Accessibility and motion | pass | Name and description are separate; Escape preserves focus; hoverable/persistent content; reduced motion and forced colors. |
| Responsive/content resilience | pass with target boundary | 320px localized text wraps without inline overflow; viewport collision/side switching remains a declared target service. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no provider, timer, observer, measurement, request or asset. |
| Cross-target translation | pass | Web, Shopify host/theme, frameworks, Figma and native boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0099, shared renderer, reconstructed before/live after evidence, adapters and this report. |

## Contract And Ownership

- Contract `0.3.0`: 4 anatomy parts, 1 variant, 1 size, 5 states,
  6 behaviors, 3 properties, and 10 public token references.
- The trigger remains consumer-owned and retains its visible/accessibility name.
  Target-generated ids connect it to `.tooltip__content` with
  `aria-describedby`.
- Content is short plain text and never enters the tab order. Rich or
  interactive content belongs to Popover or another disclosure.
- The docs target locally demonstrates state and Escape. Its React listener and
  generated id are not neutral runtime or cross-target API.

## Browser And Visual Evidence

- Accessibility inspection reports trigger name `Material details`, no
  `aria-label`, described content `View material details`, and a stable
  `aria-describedby` relationship.
- Focus reveals the Tooltip; Escape changes it to hidden while focus remains on
  `Material details`. Hovering content itself keeps `visibility: visible`.
- Light text/surface contrast is `16.89:1`; dark is `7.00:1`. The former inverse
  text pairing is preserved only in the reconstructed baseline, where it is
  visibly unreadable.
- A 128-character localized string wraps to `272 × 112px` inside a `288px`
  stage with equal client/scroll widths. Collision-aware vertical placement is
  intentionally not claimed by neutral CSS.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL with
  real hover. Dark, forced colors/reduced motion, Escape, and localized 320px
  captures supplement them.
- Six desktop baseline files were reconstructed from pre-edit `HEAD` source
  because the initial live capture command wrote no files. They are explicitly
  stored under `before-reconstructed` and are not represented as contemporaneous.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Focusable trigger + explicit described Tooltip; target owns ids/state/delay/collision. | CSS and docs evidence implemented; production service pending. |
| Shopify | Host `s-tooltip`/`interestFor` when equivalent, otherwise neutral markup plus target runtime. | Generated CSS synchronized; host/theme testing pending. |
| React / Angular | Controlled/uncontrolled open facility, relationship, delay/collision provider. | Strategy documented; adapter not certified. |
| Figma | Trigger/content anatomy and hidden/open/focus/hover states. | Studio metadata validates; no runtime ownership. |
| SwiftUI / Compose | Native help/tooltip affordance or anchored supplementary label. | Conceptual mapping only. |

## Performance And Risks

- Batch 14 Layout CSS is `5,144 B` gzip, `229 B` above the provisional
  `4.8 KiB` family ceiling; ADR 0099 records the exception without changing the
  rubric. Neutral Web components remain under budget at `60,996 B / 64 KiB`.
- Human review must approve statement surface, primary text, offset, maximum
  measure, arrow, radius, compact typography, and focus relationship.
- Touch policy, global delay/skip-delay, portals, collision, alternative
  placements, disabled triggers, and production assistive-technology behavior
  remain target decisions/tests.

## Validation

Contracts, Studio, docs/registry, public-token compatibility, synchronized
Web/Webflow/Shopify outputs, keyboard/hover/Escape/name/description/content/
contrast/special-media/overflow probes, four-viewport visual evidence,
TypeScript, structural/parity/static-preview/refinement audits, temporary docs
build, deterministic performance, diff checks, and `site/dist` verification are
included in Batch 14.
