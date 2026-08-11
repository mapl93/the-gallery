# Tag Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Tag is a compact passive value label with one optional conditionally named
native remove button. The target owns mutation, DOM removal, focus destination,
and any announcement. Invalid unnamed removal degrades safely to a passive Tag;
selection, editing, navigation, and Tags Input collection behavior remain out of
scope.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Value/category/filter label with optional removal; not Badge, Link, selectable chip, field, or collection controller. |
| Anatomy and composition | pass | Root, required label, optional native remove, generated decorative X; no duplicate component behavior. |
| Variants, sizes, states | pass | Passive/removable, one compact size, default/fine-hover/focus/native-disabled, long/RTL/dark/forced modes. |
| Public API and ownership | pass | `label`, `removeAction`, conditional `removeLabel`, `removalDisabled`; target owns state/focus/result. |
| Tokens and visual system | pass | Body-small typography, surface/text/border/focus, full radius, icon basis and disabled opacity; 24px floor/private spacing stay internal. |
| Accessibility and motion | pass | Named native Button, Enter/Space, 24px target, visible focus, native disabled, target-owned status/focus, no custom deletion keys or motion. |
| Responsive/content resilience | pass | Four viewports plus 320px Arabic RTL/unbroken content, invalid/passive, disabled, dark and forced colors without overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; decorative CSS mask only, no listener, state store, icon package, timer, or request. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native request/state/focus boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0106, contract/Studio/registry/MDX, shared renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: four anatomy parts, one variant, one size, four states, three
  behaviors, four properties, 10 public token references, no dependency.
- The canonical remove control is `button type="button"`, named
  `Remove Stoneware filter`, and measures exactly `24×24px`. An all-whitespace
  `removeLabel` produces zero remove controls while the passive Tag remains.
- Enter and Space both request removal. The target-local fixture announces
  `Stoneware removed`, focuses the surviving `Restore Stoneware` Button, and
  returns focus to the named remove Button when the fixture restores the value.
- Disabled maps to the native attribute and cannot be activated. Fine-pointer
  hover increases affordance opacity; focus uses a visible 2px outline.
- Light text/surface contrast is `7.17:1`; dark is `10.21:1`. Forced colors
  preserve Canvas/CanvasText structure, full glyph opacity, Highlight focus and
  GrayText disabled treatment.
- A long Arabic RTL value at 320px remains within a `256×50px` root with equal
  client/scroll width and `0px` document overflow.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  focus, invalid naming, removal destination, disabled, Arabic RTL, dark and
  forced-colors captures supplement two contemporaneous desktop before images.
- Browser console inspection reports zero errors and warnings.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Passive `span` + optional named native Button; target event/focus lifecycle. | CSS, native behavior, validity and content resilience evidenced. |
| Shopify | Passive Liquid tag; Link only when removal is navigation, otherwise target Button/controller. | Canonical copied CSS and collection navigation use remain valid. |
| React / Angular | Controlled label/action props; callback requests removal; consumer reconciles and focuses. | Strategy documented; Studio state is not neutral runtime. |
| Figma | Passive/removable/disabled and action-state examples. | Studio validates presentation; mutation/focus excluded. |
| SwiftUI / Compose | Text capsule with optional native removal control. | Conceptual mapping; focus/announcement APIs stay adapter-specific. |

## Performance And Risks

- Batch 21 Primitives is `10,356 B / 10.3 KiB`, complete Web component CSS is
  `64,070 B / 64 KiB`, and neutral runtime is unchanged at `10,321 B`.
- Human review must approve the surface, border, full radius, compact spacing,
  X stroke/size/opacity, body-small type, focus treatment and 24px action target.
- Tags Input deletion/focus/validation/duplicate policy remains the next
  dependency-safe decision. Whole-tag click, selection, Link/edit/drag/avatar/
  icon/tone modes remain separate proposals.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native Button/disabled/
focus behavior, contrast, long/localized/RTL content, invalid naming, dark/
forced-colors, four-viewport evidence, TypeScript, structural/parity/static-
preview/refinement audits, temporary docs build, deterministic performance,
diff checks, and `site/dist` verification are included in Batch 21.
