# Review Highlights Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

V5 Review Highlights now presents a target-supplied set of review themes as a
passive native list. Registry, contract `0.3.0`, renderer, Studio metadata and
MDX use the same anatomy. Visible counts receive localized accessible units,
while the canonical fixture owns no filtering, navigation, selection, results
or announcements.

Targets may reuse the visual surface as a real link with optional
`aria-current` or a real button with projected `aria-pressed`. The component
styles only truthful native states. The semanticless `.is-active` path, passive
hover behavior and unnecessary passive 44px target are removed.

The result is prepared for explicit human review, not stable. Item mode,
provider taxonomy, count freshness, zero-count policy, result lifecycle and
component-specific Figma artwork remain open.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Scannable target-supplied review classification; no extraction, provider, query, result or announcement ownership. |
| Anatomy and composition | pass | Required native `ul` / `li`, required theme surface/label and optional count with accessible unit. |
| Variants, states and modes | pass | Passive default plus documented navigation/current and button/pressed/disabled target projections; empty, theme, RTL and extreme content covered. |
| Public API | pass | Only optional collection label and required target-owned item composition are public; visual internals remain private. |
| Controlled/uncontrolled | pass | Passive Web has no value; an interactive target must own authored/projected state and reconciliation. |
| Canonical dependencies | pass | No dependency is invented while item mode remains open; native elements own their semantics. |
| Tokens and visual system | pass | Complete body-small/caption typography and semantic surface/text/border/focus tokens; private compact geometry is audited. |
| Accessibility and motion | pass | Native collection, localized count units, truthful state attributes, native activation/disabled/focus and no live region or transition. |
| Responsive/content resilience | pass | Four viewports, empty content and a 220px RTL host at 200% type remain contained. |
| Runtime and assets | pass | Zero listener, observer, timer, request, formatter, layout read, icon, media or font asset. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated; provider/framework/native boundaries documented. |
| Exhibit/Studio parity | pass | One renderer and fixture; exact root DOM at all four viewports. |
| Human readiness | pass | Dossier, ADR, contract, docs, target output, evidence, budgets and gates are complete; status remains `pilot`. |

## Contract And Browser Evidence

- The accessible tree is a named list with four list items: each item exposes
  one theme plus one localized `reviews` unit. The visible numeric badge is
  hidden from the accessibility tree, so the count is not announced twice.
- The canonical fixture has zero focusable controls, statuses or live regions.
- A target-only probe emits exactly two native click events for Enter and Space
  on a button. The component does not mutate `aria-pressed`; the target remains
  the value owner.
- Projected pressed and current surfaces retain white background, dark border
  and semibold text under hover. Links and buttons are 44px high; passive spans
  remain compact at 34px.
- Native disabled blocks activation and resolves to `0.5` opacity. Keyboard
  modality yields a solid 2px focus outline with 2px offset.
- Light passive and selected text contrast measure `7.17:1` and `17.93:1`;
  dark passive text measures `10.21:1`. Forced colors exposes selected state.
- Reduced motion reports `0s`; the component has no transition to suppress.
- A 220px RTL host at 200% type contains long unbroken English, Arabic,
  localized counts and an omitted count: root and document scroll widths equal
  their client widths.
- The empty composition remains a valid native list with zero items.
- Exhibit/Studio root `outerHTML` is identical at Mobile, Tablet, Desktop and
  XL with SHA-256
  `0e6612b81fef543e6ebae9c7b5fa1fd5e38750b9b33dbf2cf757892b965ba098`.

Fifteen final screenshots live under
`output/playwright/refinement-batch-51/final/`; eight before images remain under
`output/playwright/refinement-batch-51/before/`.

## External And Figma Evidence

APG Button supports native Enter/Space, stable labels and explicit
`aria-pressed`. APG radio/toolbar guidance shows that single selection is a
different semantic decision. WCAG status-message guidance assigns result
announcements to the updating results experience. Open UI Press, Radix Toggle
Group and Polaris passive/clickable chips likewise separate passive content,
navigation and controlled selection.

Figma nodes `943:7` and `1020:480` are generic component-detail and Studio
inspector frames, not approved Review Highlights artwork. No visual value was
promoted from them. Full links and source comparison are recorded in
`docs/refinement/dossiers/review-highlights.md`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native list/items with target-selected span, link or button surfaces. | Implemented and evidenced with zero component JavaScript. |
| Shopify | Provider theme app block supplies taxonomy, counts, URLs/actions and generated Reviews CSS. | CSS-ready/planned; no placeholder provider Liquid. |
| Webflow | CMS/provider list with truthful native surfaces and copied CSS. | Generated CSS available; data and behavior remain external. |
| React / Angular | Passive list now; future accepted adapter may expose controlled or initial selection. | Contract-ready only after an item-mode decision. |
| Figma | Passive and target-projection visual states. | Planned; component artwork is absent. |
| SwiftUI / Compose | Flow/list of Text, Link or native control selected by integration. | Conceptual; target owns data and state. |

Canonical source, Shopify and Webflow Reviews CSS are byte-identical. Review
Highlights correctly adds no dedicated provider-free Shopify Liquid file.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,778 B` | `3.7 KiB` (`3,788 B`) | pass; `10 B` remaining and `3 B` recovered from baseline |
| Shared neutral runtime | `10,492 B` | `8 KiB` (`8,192 B`) | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,381 B` | `64 KiB` (`65,536 B`) | existing `1,845 B` program gap after regeneration |

- Human review must approve theme/count hierarchy, density, radius, wrapping
  and selected/current visual strength.
- Passive, navigation, single-select and multi-select modes are not equivalent;
  promoting one requires a product/architecture decision.
- Provider taxonomy, ordering, formatting, freshness, zero-count treatment,
  loading, focus, empty results, URLs and announcements remain target-owned.
- No component-specific Figma artwork exists.
- The family has only `10 B` headroom; later Reviews work must preserve the
  ceiling or raise a separate architecture decision.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, canonical static preview
markup, native list and accessible-count semantics, target projection probes,
four-viewport exact parity, empty/extreme/RTL/200% containment, dark/forced
colors/reduced motion, Neutral Web, Shopify, Webflow, official Shopify artifact
validation, source/generated identity, deterministic gzip, TypeScript, a
temporary Vite build outside `site/dist`, structural/static/parity/refinement
audits and diff checks comprise Batch 51.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise theme/count hierarchy, density, radius, wrapping and
   selected/current treatment.
2. Confirm the passive shared fixture for v1 or choose a separate accepted
   navigation/filter contract.
3. Select provider taxonomy/count, zero-count and result-lifecycle policies per
   target before building integrations.
4. Create component-specific Figma artwork only after browser approval.
5. Keep the contract `pilot` until explicit human stability approval.
