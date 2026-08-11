# Accordion Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Accordion now uses contextual headings containing native triggers and native
`hidden` panels, so collapsed descendants leave rendering and focus order. It
supports independent expanded and disabled item states, resilient logical
layout, and special-media fallbacks while leaving the unresolved single/multiple
group model to targets.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Related disclosure sections; mandatory steps, navigation and an implicit exclusive policy remain excluded. |
| Anatomy and composition | pass | Root/item/heading/native trigger/optional icon/panel/optional inner/content. |
| Variants, sizes, states | pass | One vertical treatment; collapsed/expanded/hover/focus/disabled and indicator state. |
| Public API and ownership | pass | Required items plus per-item expanded/disabled; group value, heading rank and region policy remain target/context-owned. |
| Tokens and visual system | pass | Sixteen existing public references; icon size and trigger weight/padding remain private composition. |
| Accessibility and motion | pass | Heading-only trigger, synchronized ARIA/native hidden, Enter/Space, disabled semantics, reduced motion and forced colors. |
| Responsive/content resilience | pass | Long localized RTL content wraps at 320px with no root or stage inline overflow. |
| Runtime and assets | pass | `0 B` neutral runtime; native Button activation; no observer, measurement, request or asset. |
| Canonical dependencies | pass | FAQ Section migrated to the same anatomy and removed duplicated visual-collapse behavior. |
| Documentation and verification | pass | Dossier, ADR 0099, shared renderer, reconstructed before/live after evidence, adapters and this report. |

## Contract And Ownership

- Contract `0.3.0`: 8 anatomy parts, 1 variant, 1 size, 6 states,
  7 behaviors, 3 properties, and 16 public token references.
- Every trigger is a native Button and the only child of a contextual heading.
  Targets synchronize `aria-expanded`, `aria-controls`, stable ids, `hidden`,
  and optional region naming.
- `expanded` and `disabled` are per-item semantics. Frameworks may translate to
  controlled/uncontrolled group values, but the neutral contract does not
  freeze single, multiple, collapsible, or exact-exclusive combinations.
- FAQ Section now composes the canonical heading/hidden structure; this migration
  prevents a later section from retaining the accessibility defect.

## Browser And Visual Evidence

- The accessibility snapshot exposes three level-3 headings and only regions
  whose panels are expanded. Expanding Dimensions while Materials is open proves
  the documented independent/multiple fixture policy; collapsing Materials
  removes its region.
- Pointer click, Space, and Enter produce `false → true → false` while keeping
  focus on Materials; the final associated panel reports `hidden=true`.
- The first-item disabled Studio control maps to a native disabled trigger.
  Disabled-expanded remains representable and cannot be activated.
- Localized RTL stress keeps stage `288/288px` and root `254/254px`
  client/scroll widths. Long heading and body text wrap without colliding with
  the fixed indicator.
- Primary/secondary contrast is `17.93:1`/`7.81:1` in light and
  `17.18:1`/`12.09:1` in dark. Disabled text is not the sole state signal.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  dark, disabled RTL, localized 320px, and forced-colors/reduced-motion captures
  supplement them.
- Two Exhibit/Studio desktop baseline files are source-reconstructed and labelled
  as such because no live baseline file was written by the initial command.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | APG heading/Button/panel or a compatible native-details adapter. | CSS/docs implemented; group coordinator target-owned. |
| Shopify | Liquid headings/buttons/panels or native details plus target behavior. | Generated CSS synchronized; Liquid/group policy pending. |
| React / Angular | Item or group controlled/uncontrolled value with stable ids/events. | Strategy documented; adapter not certified. |
| Figma | Item/header/trigger/content anatomy and collapsed/expanded/disabled states. | Studio metadata validates; no state service. |
| SwiftUI / Compose | Native disclosure item/group with contextual headings. | Conceptual mapping only. |

## Performance And Risks

- Batch 14 adds no neutral JS. Layout is `5,144 B` gzip with the documented
  `229 B` family exception; the full Web CSS bundle is `60,996 B / 64 KiB`.
- Human review must approve group border/radius, dividers, trigger height/
  spacing, weight, icon, hover, focus ring, and immediate panel transition.
- Single/multiple/collapsible group API, optional native-details translation,
  heading rank/region thresholds, safe future height animation, and production
  assistive-technology testing remain open.

## Validation

Contracts, Studio, docs/registry, public-token compatibility, synchronized
Web/Webflow/Shopify outputs, keyboard/state/hidden/disabled/localized/RTL/
contrast/special-media/overflow probes, four-viewport evidence, FAQ consumer
migration, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks, and `site/dist`
verification are included in Batch 14.
