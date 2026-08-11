# Component Refinement Batch 21

Status: Badge and Tag complete for human review

Date: 2026-07-14

Components: Badge, Tag

## Outcome

Both dependency-free commerce primitives are prepared for explicit human
stability review before Tags Input consumes Tag. Research dossiers, accepted
semantic boundaries, canonical CSS, one shared Exhibit/Studio renderer and
fixture, contracts, Studio metadata, registry, docs, generated/copied targets,
browser behavior, responsive/special-media evidence, and individual reports are
reconciled.

Badge remains passive and text-first, with dynamic `status` semantics only by
explicit opt-in. Tag remains a passive value plus one conditionally named native
removal request; the target owns mutation, focus and announcement. Neither
contract moved to `stable`; Button remains the only human-approved component.
`site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA/WCAG status, Button, accessible-name and target-size requirements;
  Open UI prior-art research; Radix Badge; and Shopify Polaris Badge/Tag/Chip
  establish the narrow passive/status and named-removal boundaries.
- ADR 0106 retains the accepted public properties and rejects arbitrary visual
  Badge API, whole-Tag interaction, selection/editing/navigation, custom
  deletion keys, target state, and Tags Input behavior from these primitives.
- Contracts, registry, MDX, Studio metadata, shared renderer and canonical CSS
  describe the same compositions. No target-agnostic component dependency or
  neutral JavaScript was added.

## Browser Evidence Summary

- Badge exposes no role/tab stop by default and maps explicit announcement mode
  to `role="status"`. Its four light variants resolve to `6.33:1`, `5.34:1`,
  `4.80:1`, and `6.59:1` text contrast. A 46-character unbroken 320px label
  wraps to `256×36px` with no internal/page overflow; Arabic RTL, dark and
  forced colors remain bounded.
- Tag exposes one `type="button"` action named `Remove Stoneware filter` at
  `24×24px`. An empty/whitespace name omits the action. Enter and Space remove
  the fixture value, focus a surviving Restore Button, and restore focus to the
  recreated remove action. Native disabled, real focus, fine-pointer hover,
  light/dark contrast (`7.17:1`/`10.21:1`), Arabic RTL and forced colors pass.
- Browser console inspection reports zero errors and warnings.
- Twenty-seven after images include 16 canonical captures for 2 components ×
  Exhibit/Studio × Mobile/Tablet/Desktop/XL plus 11 dynamic, localized/RTL,
  invalid, removal/focus, disabled, dark and forced-colors cases. Four
  contemporaneous desktop before captures are retained under
  `output/playwright/refinement-batch-21/before/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | `10,356 B` | `10.3 KiB` | pass (`191 B` headroom) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 21 runtime delta | `0 B` | `0 B` target-owned behavior | pass |
| Neutral Web components CSS | `64,070 B` | `64 KiB` | pass (`1,466 B` headroom) |

Relative to the Batch 21 baseline, Primitives adds `88 B`, neutral runtime
source adds `0 B`, and the complete Web component bundle adds `89 B`
deterministic gzip. The CSS delta covers semantic typography, content
containment, system-color fallbacks, the 24px action floor, logical sizing and
fine-pointer hover gating.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Primitives CSS and
  shared JS are byte-identical to canonical source. Shopify's 24 existing non-
  blocking maturity warnings remain backlog.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. All static previews and the refinement audit pass.
- TypeScript, a complete Vite build into `/tmp`, browser semantics/interaction/
  content/responsive/special-media probes, zero browser console errors or
  warnings, deterministic gzip, syntax/diff checks, and explicit `site/dist`
  cleanliness pass.

## Remaining Human Risks And Open Input

1. Badge needs approval of casing, tracking, compact padding, caption type,
   radius, wrapping shape, foreground strength and all four semantic palettes.
2. Badge icons/dots/counts/ribbons/progress, arbitrary colors and larger sizes
   remain intentionally excluded pending concrete cross-target need.
3. Tag needs approval of surface/border, full radius, compact spacing, X weight/
   opacity, body-small type, focus treatment and the 24px action target.
4. Tags Input must next decide collection/add/remove announcements, deletion
   keys, validation, duplicate/order/serialization and focus policy without
   changing Tag's primitive boundary by assumption.
5. Selectable/clickable/linked/editable/draggable/avatar/icon/tone Tag modes
   remain separate future proposals.
6. No component-specific owner visual references are registered; accept the
   repository renders or provide replacement evidence.
7. Shared runtime remains above `8 KiB`; this batch adds `0 B` and does not reset
   the documented exception.
8. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 104 dependency edges, 62 dossiers,
and 59 components ready for human review. Only Button is human-approved; both
Batch 21 components remain `pilot` pending explicit human review. The next
dependency-safe component is Tags Input (review order 63); Price follows it at
review order 64.
