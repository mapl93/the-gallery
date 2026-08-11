# Star Input Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

V3 Star Input is now a fixed five-point native radio group whose DOM, visual
order and keyboard progression all run from `1` through `5`. It exposes a
visible group label, one shared form name, localized real text for every choice,
one current value, required/disabled/description semantics and independent
Default, Error, Success and Warning families. Native selection, constraint
validation, form serialization, reset and `input`/`change` events remain the
behavior source of truth; the neutral component adds no JavaScript.

The previous RTL layout trick reversed the visual sequence to `5, 4, 3, 2, 1`
while DOM values remained ascending. It also depended on English `aria-label`
strings and did not compose the accepted field validation states. Those gaps are
removed without creating a compatibility alias or a provider workflow.

This result is prepared for explicit human review, not stable. The owner must
still approve the shape, primary and validation colors, focus weight, density,
spacing and composed use. Review submission, provider data, moderation,
authentication and post-submit behavior remain target-owned.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Fixed `1..5` value entry; not passive display, half-step scale, formatter, aggregate, provider, submit workflow or clearable input. |
| Anatomy and composition | pass | Required native fieldset, visible legend, choices wrapper, five labels, five native radios, five real localized label strings and decorative indicators. |
| Variants and states | pass | Default/Error/Success/Warning, empty/`1`/`4`/`5`, hover preview, focus, required, disabled and checked states are explicit. |
| Public API and ownership | pass | `label`, `name`, `value`, `variant`, `required`, `disabled`, `describedBy` and native change are the semantic surface; geometry and icon details stay private. |
| Controlled/uncontrolled | pass | Web markup supports one initial checked value and native ownership; framework targets may use value/change or initial value and must synchronize reset deliberately. |
| Tokens and visual system | pass | Existing input validation/focus families, Button primary selection, text, touch-target, gap, typography, radius, motion and opacity tokens compose private Star Input variables. |
| Accessibility and motion | pass | One named group, five named radios, native arrows/Space/Tab, error-only `aria-invalid`, described feedback, 44px targets, 4px focus, forced colors and zero transition under reduced motion. |
| Responsive/content resilience | pass | Four canonical viewports, 220px host, long/unbroken feedback, Arabic RTL, 200% root scale, light/dark and no document overflow. |
| Runtime and assets | pass | No Star Input selector, listener, observer, timer, request, formatter, layout read, animation or asset in the neutral runtime. |
| Cross-target translation | pass | Neutral Web, Shopify CSS and Webflow CSS are generated; provider/form workflow and localized strings stay target-owned. |
| Exhibit/Studio parity | pass | One `ReviewsStudio` renderer and fixture yield exact root DOM in both modes at all four viewports. |
| Human readiness | pass | Dossier, ADR, contracts, docs, browser evidence, generated targets and validations are complete; status remains `pilot` pending explicit review. |

## Contract And Browser Evidence

- Contract `0.3.0` records the fixed ascending scale, required anatomy,
  validation variants, real choice-label requirement, native behavior and
  controlled/uncontrolled target mapping.
- The accessibility tree exposes one group named `Your rating` and five radios
  named `1 star` through `5 stars`; the SVGs add no accessible image noise.
- Default value `4` checks exactly one radio. Right moves focus and selection to
  `5`, Left returns to `4`, and Right from `5` wraps natively to `1`.
- Native keyboard selection emits `input:5` followed by `change:5` without
  component event synthesis.
- An empty required clone is invalid; selecting `3` makes it valid and serializes
  `studio-rating=3`; reset restores default `4`; disabling the fieldset removes
  the group from `FormData` and makes all five inputs match `:disabled`.
- Clearing Studio's value plus enabling Required yields no checked radio and
  native invalidity. Disabling the fieldset prevents programmatic focus from
  moving to a radio.
- Error alone emits `aria-invalid="true"`; Success and Warning keep associated
  feedback without claiming invalidity.
- Every label is exactly `44x44px`. Desktop left positions are ascending at
  approximately `844, 888, 932, 976, 1020px`; the baseline was reversed at
  approximately `983, 939, 895, 851, 807px`.
- Hovering value `2` previews exactly `[1, 2]`; hovering value `5` previews all
  five. Disabled labels do not react to pointer hover.
- Focus on value `4` has a `4px solid` outline. In forced colors, indicator and
  label resolve to system text and focus resolves to a system highlight color.
- Reduced motion reports `transition-duration: 0s` and no transition property.
- Light filled, empty-outline and legend contrast are `10.37:1`, `3.09:1` and
  `17.93:1` on white. Dark results are `14.10:1`, `5.30:1` and `17.18:1` on
  `rgb(23, 23, 23)`.
- In RTL, the localized legend and feedback follow the context while the fixed
  numeric sequence deliberately remains LTR and ascending. In a `220px` host,
  root and host client/scroll widths are equal; document overflow remains zero.
- At 200% root font size, all targets remain `44x44px`, root client/scroll width
  remains `220/220px`, and document overflow remains zero.
- Exhibit and Studio have exact initial `outerHTML` at Mobile, Tablet, Desktop
  and XL with SHA-256
  `9d05fc9af96445a1d973a906486ff5f4986cff465e9983b32112dcb3cf290812`.
- Eight paired before images plus one exploratory mobile capture, eight final
  viewport images, and 15 validation/value/hover/focus/disabled/required/RTL/
  dark/forced-colors/reduced-motion/narrow/scale images live under
  `output/playwright/refinement-batch-49/`.

## External And Figma Evidence

- WAI-ARIA APG's radio rating example and radio-group pattern support one named
  exclusive group with native-equivalent arrow behavior and a visible group
  label.
- WHATWG radio and fieldset semantics support shared-name grouping, required
  constraint validation, mutual exclusion, form/reset behavior and disabled
  descendants.
- Open UI has radio research but no accepted dedicated rating-input primitive;
  native radio composition remains the interoperable base.
- Radix Radio Group exposes value/defaultValue/change/name/required/disabled and
  direction; Shopify Choice List exposes group label/name/selected/default/error
  and details. Both reinforce semantic group configuration rather than public
  icon geometry.
- Figma nodes `943:7` and `1020:480` are generic Studio shell/inspector frames,
  not approved Star Input artwork. No visual value was promoted from them.

The full comparison and source links are recorded in
`docs/refinement/dossiers/star-input.md`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native fieldset/legend plus five labelled radios and decorative indicators. | Implemented, generated and browser-evidenced with zero component JS. |
| Shopify | Generated canonical Reviews CSS and future native group markup with target-localized labels. | CSS-ready/planned; provider/form workflow remains undefined. Official artifact `star-input-batch-49`, revision 1, passes. |
| Webflow | Byte-identical canonical Reviews CSS plus platform-owned form service. | Generated path available; submission and localization stay target-owned. |
| React / Angular | Controlled `value + onChange` or one initial/default value. | Planned; controlled reset synchronization is required. |
| Figma | Group label, five values, filled/outline selection and four validation families. | Planned; current references are generic frames only. |
| SwiftUI / Compose | Native exclusive selection with one named group and localized value labels. | Conceptual; target owns validation announcements and form lifecycle. |

Canonical `components/css/reviews.css`, Shopify `assets/reviews.css` and Webflow
`reviews.css` are byte-identical. Shopify's full adapter remains at 56
target-ready components, 28 dedicated Liquid templates and 19/19 schema-ready
components. No Star Input Liquid file was invented.

## Performance And Risks

- Reviews CSS is `3,724 B / 3.7 KiB`, leaving `64 B`; this is `298 B` above the
  Batch 48 baseline.
- Complete Neutral Web component CSS is `67,376 B / 64 KiB`, a `1,840 B`
  program gap.
- Shared runtime is `10,501 B / 8 KiB`, retaining a `2,309 B` exception. Star
  Input adds `0 B` component runtime.
- Human review must approve outline/filled star shape, primary and validation
  colors, 28px artwork inside the 44px target, zero inter-star gap, focus weight,
  legend hierarchy and alignment in standalone/composed contexts.
- No component-specific Figma artwork exists yet.
- Every target must supply five truthful localized choice labels; the neutral
  contract does not hardcode an English pluralization policy.
- Controlled framework adapters can defeat native form reset unless their state
  owner handles reset explicitly.
- Provider, authentication, moderation, duplicate prevention, submission,
  success/error and post-submit focus belong to Review Form/target work.
- Reviews CSS has only `64 B` headroom. Later review-family work must preserve
  the ceiling or explicitly justify an architecture-level budget change.

All ceilings remain unchanged. Existing total-CSS/runtime overages remain
visible program gaps rather than being hidden by a budget increase.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studio definitions, Neutral Web,
Shopify and copied CSS, mandatory Shopify documentation research and official
CSS validation revision 1, exact four-viewport DOM parity, accessibility,
keyboard/event/form/validation/hover probes, RTL/narrow/zoom/contrast/special
colors, deterministic gzip, source/generated identity, a temporary Vite build
outside `site/dist`, structural/static/parity/refinement audits, TypeScript,
diff checks, a final runtime probe with zero errors and explicit `site/dist`
cleanliness comprise Batch 49.

`site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve or revise filled/outline shape, selection and validation colors.
2. Approve the 44px target, 28px artwork, zero gap, legend typography, focus
   weight and alignment across standalone and Review Form contexts.
3. Confirm that the fixed five-point scale remains the intended v1 public
   boundary; half steps, alternate counts and clearable selection remain out.
4. Create component-specific Figma artwork only after browser approval.
5. Keep the contract `pilot` until explicit human stability approval.
