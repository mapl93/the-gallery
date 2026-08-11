# Badge Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Badge is a bounded passive status/metadata label with four semantic feedback
variants and explicit live-status opt-in. It remains non-interactive, uses
visible text rather than color alone, maps to semantic caption typography, and
preserves exceptional content without truncation or page overflow.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive status/metadata only; not an action, Tag, counter overlay, progress control, or notification. |
| Anatomy and composition | pass | One required bounded text root; no icon/action/slot ambiguity. |
| Variants, sizes, states | pass | Info/Success/Warning/Error, one compact size, static and explicit dynamic-status modes. |
| Public API and ownership | pass | `label`, `variant`, `announceChanges`; target owns vocabulary and update timing. |
| Tokens and visual system | pass | Caption size/line-height/family, feedback surfaces/defaults, primary text mix and full radius; casing/padding/tracking stay private. |
| Accessibility and motion | pass | Static role absent, explicit `status` role present, no tab stop, text-independent meaning, forced colors, no motion. |
| Responsive/content resilience | pass | Four viewports plus 320px long/unbroken/Arabic RTL, dark and forced colors with zero page/internal overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, timer, request, icon, or animation. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native passive/live boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0106, contract/Studio/registry/MDX, shared renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: one anatomy part, four variants, one size, one passive state,
  two behaviors, three properties, 13 public token references, no dependency.
- The default fixture exposes neither role nor `tabindex`. Enabling Announce
  changes maps the same root to `role="status"` without moving focus.
- All light-theme text/background ratios exceed WCAG AA for small text: Info
  `6.33:1`, Success `5.34:1`, Warning `4.80:1`, and Error `6.59:1`.
  Batch 44's Artist Card dependency audit also corrected the canonical
  semantic-text mix from 55% to 10% feedback color: dark Info, Success, Warning,
  and Error now resolve to `5.92:1`, `4.92:1`, `4.58:1`, and `5.64:1`.
- A 46-character unbroken label at 320px wraps to `256×36px`; client and scroll
  widths both resolve to `256px` and document overflow is `0px`.
- Arabic RTL, dark, and forced-colors captures preserve readable text and a
  visible boundary. Forced colors resolve to Canvas/CanvasText with a 1px
  system-color outline.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL; long
  dynamic status, Arabic RTL, dark and forced-colors captures supplement two
  contemporaneous desktop before images.
- Browser console inspection reports zero errors and warnings.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Passive `span`, semantic variant class, optional existing `status` role. | CSS, semantics, contrast and content resilience evidenced. |
| Shopify | Passive Liquid text/class; dynamic role only when target updates content. | Copied CSS is canonical; vocabulary remains target data. |
| React / Angular | Stateless label/variant plus optional role mapping. | Strategy documented; no neutral runtime needed. |
| Figma | One compact component with four tones and long-label example. | Studio validates presentation; announcement behavior excluded. |
| SwiftUI / Compose | Native text capsule/status treatment. | Conceptual mapping; live-region API stays adapter-specific. |

## Performance And Risks

- Batch 21 Primitives is `10,356 B / 10.3 KiB`, complete Web component CSS is
  `64,070 B / 64 KiB`, and neutral runtime is unchanged at `10,321 B`.
- Human review must approve uppercase/tracking, full radius, compact padding,
  caption role, background/foreground strength, wrapping shape and the four
  semantic colors, or provide component-specific visual evidence.
- Icons, dots, counts, ribbons, arbitrary colors, larger sizes, and progress
  remain outside v1 and require separate proposals.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, roles, contrast, long/
localized/RTL content, dark/forced-colors, four-viewport evidence, TypeScript,
structural/parity/static-preview/refinement audits, temporary docs build,
deterministic performance, diff checks, and `site/dist` verification are
included in Batch 21.
