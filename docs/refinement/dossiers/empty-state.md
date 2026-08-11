# Component Dossier: Empty State

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target and Shopify Liquid adapter

Contract: `components/contracts/empty-state.contract.json` (`0.4.0`, `pilot`)

Decision: ADR 0236, extending ADRs 0064 and 0112

## Recommendation And Accepted Direction

Use Empty State only after the target has truthfully resolved that the owning
content area has nothing to present. Keep required non-empty title content,
optional concise message, optional decorative icon, and at most one canonical
Button-or-Link recovery action.

The owner selected contextual native heading ownership. The page, panel, dialog,
or section supplies the correct `h1` through `h6`; heading rank is not a visual
Studio control or target-agnostic property. The title stays a genuine heading
and `.empty-state__title` keeps presentation independent of its native tag.

The implementation candidate is prepared for human visual/stability review. It
remains `pilot`; no promotion to `stable` is authorized.

## Purpose, Use Cases, And Limits

- Represents resolved absence such as no saved items, an empty cart, no
  collection results, or a missing page destination.
- Replaces the empty content area instead of coexisting with stale rows,
  controls, totals, pagination, or result content.
- May explain the absence and offer one truthful next step.
- Is not loading, progress, generic error, permission diagnosis, onboarding,
  data fetching, retry orchestration, query/filter state, Status, Alert, or a
  focus-management primitive.
- Does not invent recovery copy, destination, command, disabled/loading action
  state, announcement, result count, or provider lifecycle.

## Research Dossier

| Source | Relevant evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI page-structure headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) | Heading ranks communicate surrounding document structure; a fixed level cannot be correct in every page, panel, and dialog. | Host supplies contextual native rank; visual class remains tag-independent. |
| [WAI status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Dynamic status updates may need programmatic notification without moving focus, while initial static content is not automatically a live region. | Static Empty State has no live role; a pre-existing target Status owner announces qualifying transitions. |
| [WAI decorative images](https://www.w3.org/WAI/tutorials/images/decorative/) | Redundant imagery can be hidden when adjacent visible text carries the meaning. | Optional icon is `aria-hidden`; meaningful illustrations require a different contract. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widgets but no Empty State widget. | Keep ordinary content semantics and compose native Button/Link. |
| [Open UI component research](https://open-ui.org/components/) | No standardized Empty State element or lifecycle API exists. | Preserve narrow repository-defined content and composition. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | No Empty State primitive establishes cross-framework state ownership. | Do not add framework lifecycle or callback APIs. |
| [Shopify Polaris Empty state](https://polaris.shopify.com/components/layout-and-structure/empty-state) and [Shopify POS Empty State](https://shopify.dev/docs/api/pos-ui-extensions/2026-01/web-components/layout-and-structure/emptystate) | Mature Shopify surfaces separate heading/subheading, illustration, and actions, but target constraints differ. | Keep comparable anatomy with one narrower action and target-owned heading context. |

No component-specific owner image is stored in the repository. Generic Studio
Figma trace IDs do not constitute visual approval.

## Anatomy And Slots

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root `.empty-state` | yes | Ordinary passive grouping container | Empty State |
| Icon `.empty-state__icon` | no | Decorative wrapper with `aria-hidden="true"` | optional target slot |
| Title `.empty-state__title` | yes | Non-empty contextual native `h1`-`h6` | content from `title`; element from host |
| Message `.empty-state__message` | no | Ordinary paragraph | target |
| Action | no, at most one | Canonical Link for navigation or Button for a command | target-composed slot |
| Dynamic announcement | outside | Pre-existing Status/live-region owner when a transition qualifies | target |

Invalid required composition has no Empty State root. The shared docs renderer
returns `null` for blank title. Shopify also fails closed when title or validated
`heading_tag` is absent.

## Variant, State, Size, And Mode Matrix

| Dimension | Supported behavior |
| --- | --- |
| Variant | One centered default presentation |
| Size | One intrinsic, container-responsive composition |
| State | `resolved-empty` only |
| Slots | Title-only; title+message; title+icon; title+action; full composition |
| Action | Omitted; one canonical Link; or one canonical Button |
| Heading | Host-supplied `h1` through `h6`, visually identical |
| Direction | LTR/RTL logical layout and localized wrapping |
| Theme | Light, dark, forced colors |
| Motion | No component animation or transition; reduced motion is naturally identical |
| Width/zoom | Narrow direct containers through XL and effective 200% zoom |

There is no loading, error, disabled, selected, pressed, controlled, or
uncontrolled Empty State state. A composed Button may own its own states.

## Public API And Ownership

| Property | Type | Required | Boundary |
| --- | --- | --- | --- |
| `title` | string | yes | Non-empty visible heading content; does not choose native rank. |
| `message` | string | no | Concise supporting explanation or next step; omitted when blank. |
| `icon` | decorative slot | no | Reinforces title; hidden from assistive technology. |
| `action` | Button-or-Link slot | no | One target-controlled canonical action. |

Heading rank is a required host composition decision, not a fifth property.
There are no callbacks, href, labels, announcements, variants, sizes, result
counts, lifecycle, focus, or controlled/uncontrolled properties.

## Tokens, Private Variables, And Hardcoded Values

Public semantic tokens:

- colors: `--color-text-disabled`, `--color-text-primary`,
  `--color-text-secondary`;
- spacing: `--space-layout-section-gap`, `--tg-space-stack-md`;
- title type: `--font-family-heading`, `--tg-typography-h3-weight`,
  `--typo-h3-size`, `--typo-h3-line-height`;
- message type: `--font-family-body`,
  `--tg-typography-body-default-weight`, `--typo-body-size`,
  `--typo-body-line-height`.

Private composition includes 64px icon geometry, 24ch/40ch measures, centered
alignment, 20% inline-padding cap, emergency wrapping, and direct-child action
containment. They do not become public API because they are not stable semantic
consumer decisions.

## Visual, Responsive, And Content Audit

- One centered vertical stack uses section rhythm and medium content spacing.
- Required title uses complete H3 visual typography regardless of native rank;
  message uses complete body typography.
- Decorative icon is intentionally subdued; canonical action retains its own
  appearance, focus, and interaction semantics.
- Optional parts collapse with no empty semantic nodes.
- Long localized and unbroken title/message/action copy wraps safely.
- Existing evidence covers 200px direct width, mobile/tablet/desktop/XL, Arabic
  RTL, 200% zoom, light/dark, forced colors, reduced motion, title-only,
  no-action, Link activation, and all native H1-H6 tags.

Human review must approve icon tone/scale, centered composition, title/message
hierarchy, block rhythm, line measure, wrapping, and canonical action treatment.

## Accessibility And Interaction

- Required title remains a genuine contextual heading, never ordinary text.
- Icon is hidden because title supplies meaning.
- Static/initial root has no role, live region, focus, keyboard model, or
  pointer action.
- Dynamic no-results/removal transitions use a target-owned Status owner that
  already exists before its content changes; Empty State does not move focus
  merely to announce absence.
- Link and Button slots preserve their canonical keyboard, focus, disabled,
  loading, accessible-name, destination, and event contracts.
- The target atomically replaces stale content and retains only controls that
  remain truthful for the accepted absence cause.

## Cross-Target Translation

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Ordinary root, decorative icon, host-ranked native title, optional paragraph, canonical action slot | Implemented and browser-evidenced |
| Shopify | Required validated adapter-only `heading_tag`; H1 main cart/404, H3 cart drawer; icon/message/Link mapping | Implemented and adapter-validated |
| React / Angular | Required host heading element/slot plus canonical Button/Link; target owns lifecycle/status/focus | Planned |
| Figma | Slot presence and semantic presentation only; no heading-level control | Studio metadata implemented; final design target pending |
| SwiftUI / Compose | Native header trait/semantics selected by host plus optional action | Planned |

## Exhibit And Studio Parity

`EmptyStateStudio` and `EmptyStateArtwork` are shared by Exhibit and Studio. The
docs fixture explicitly supplies H2 under the component page H1. Nested Gallery
fixtures explicitly supply H2 or H3 based on their owning structure; no renderer
has a hidden default heading rank. Fixture copy, Lucide icons, href, and action
label are evidence content, not component defaults.

## Runtime And Performance

- Neutral runtime is exactly `0 B`: no listener, observer, timer, request,
  formatter, parser, layout read, animation, or asset.
- Empty State CSS slice is `1,005 B` raw / `436 B` gzip-9.
- Primitives is `10,547 / 10,547 B`; Empty State adds no new CSS in ADR 0236.
- Shopify heading selection is render-time Liquid composition, not browser
  runtime.

## Evidence And Validation

- Prior Batch 27 evidence already covers four paired viewports, H1-H6 visual
  equality, title-only/no-action/full states, narrow/RTL/unbroken content,
  Link activation/focus, dark, forced colors, reduced motion, and 200% zoom.
- ADR 0236 final evidence rechecks exact Exhibit/Studio DOM, explicit H2
  selection, invalid blank-title omission, the absence of a Studio heading
  control, and composed H3 use.
- Contract, Studio, docs, tokens, Web/Shopify adapters, TypeScript, static
  previews, component/refinement/parity/performance audits, diff checks, and
  resource cleanup form the final validation gate. `site/dist` is not rebuilt.

## Risks And Human Review Questions

1. Approve or revise the icon, hierarchy, centered alignment, spacing, measure,
   wrapping, and action treatment.
2. Confirm that the documentation fixture is representative but not a default.
3. Targets still need truthful absence-cause classification, replacement,
   recovery, announcement, URL/history, and focus policies.
4. Future adapter authors must not reintroduce a fixed heading tag or expose
   heading rank as appearance.
5. Primitives has no remaining gzip headroom.
6. Do not promote Empty State to `stable` without explicit human review.
