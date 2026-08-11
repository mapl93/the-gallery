# Review Sort / Filter Bar Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

V8 Review Toolbar is now a truthful labelled control group rather than an
incomplete ARIA toolbar widget. Registry, contract `0.3.0`, renderer and docs
declare the same canonical Select and Button dependencies. The root owns only
group semantics, a structural border and container-responsive placement; every
child keeps its own value, options, keyboard model, focus and activation.

The shared renderer preserves normal Tab order, omits the complete component
when both optional slots are absent, and reports docs-only Select/action events
without claiming result updates or navigation. The former viewport query is now
a root-container query, and the wrapper no longer overrides Select typography.

The result is prepared for explicit human review, not stable. Provider, option
inventory, URL/result lifecycle, write-review destination and component-specific
Figma artwork remain open product/target boundaries.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Related review controls only; no provider, options, results, URL or write-flow ownership. |
| Anatomy and composition | pass | One named group, optional control wrapper/Select and optional Button or native-link action. |
| Variants, states and modes | pass | Both slots, either slot, empty omission, child open/changed/focus/activation, themes and special modes. |
| Public API | pass | Accessible group name and two semantic slots only; values, options, layout measures and result state stay child/target-owned. |
| Controlled/uncontrolled | pass | Static Web may use native selection; frameworks control the child or use its default without a wrapper-owned copy. |
| Canonical dependencies | pass | Registry and contract declare Select and Button; no duplicated control markup or behavior. |
| Tokens and visual system | pass | Structural border is the sole public token; 8/12/16px layout facts stay private; child typography override removed. |
| Accessibility and motion | pass | `group` plus name, two normal Tab stops, no toolbar arrow interception, native fallback, forced colors and zero reduced-motion transitions. |
| Responsive/content resilience | pass | Root-container response at 320/480/628px plus 280px localized RTL/200% containment. |
| Runtime and assets | pass | Zero neutral Review Toolbar orchestration or assets; Select enhancement remains independently canonical. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated and identical; provider target deliberately remains planned. |
| Exhibit/Studio parity | pass | One renderer and fixture; byte-identical root DOM at all four viewports. |
| Human readiness | pass | Dossier, ADR, contract, docs, targets, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Browser Evidence

- The root exposes `role="group"` and the accessible name `Review controls`.
  The enhanced Select trigger and write-review Button are the only two
  sequential Tab stops; no child receives a wrapper-managed roving index.
- ArrowRight leaves focus on the Select trigger. ArrowDown opens the canonical
  listbox, End targets its last option, and Enter commits `helpful`. The hidden
  native Select retains the same value and the fixture reports that no reviews
  were fetched.
- Tab moves from the Select trigger to the write-review Button. Enter activates
  the child Button and the fixture reports that no destination is configured.
- Inspector reset restores `recent`, both slots and an empty feedback region.
- Control-only composition renders one canonical Select and no action. Action-
  only composition renders one canonical Button and no Select. Disabling both
  slots leaves no `.review-toolbar` or feedback placeholder.
- Removing Select enhancement exposes one visible focusable native Select with
  all three options. Selecting `rated` updates the native value and dispatches
  the same truthful target-boundary feedback.
- A 320px and 480px root stacks both children at full width inside a 1440px
  viewport. A 628px root keeps them inline. This proves host-container rather
  than page-viewport response.
- At 280px, RTL and 200% type, the root has
  `scrollWidth === clientWidth === 280`. The long German action wraps; the long
  Arabic Select value uses the canonical hidden-overflow ellipsis while its
  full visible label remains readable.
- Light-mode sampled text/graphic contrast is at least `7.81:1`; dark-mode is
  at least `12.09:1`. Forced colors resolves the structural/control borders to
  system black. Root, Select trigger and Button transition durations are `0s`
  under reduced motion.
- Exhibit/Studio root `outerHTML` is identical at Mobile, Tablet, Desktop and XL
  with SHA-256
  `1056a34eed3dfcbd6f5e6fd77e0956c97561c97ed213881d5eb52e22f4c59c8b`.

Twenty final screenshots live under
`output/playwright/refinement-batch-54/final/`; eight before images remain under
`output/playwright/refinement-batch-54/before/`.

## External And Figma Evidence

The [WAI-ARIA APG Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
requires a composite arrow-key focus model and recommends toolbar only for at
least three controls. [WAI-ARIA 1.2 Group](https://www.w3.org/TR/wai-aria-1.2/#group)
provides the correct logical grouping without a landmark or composite keyboard
contract. [Open UI Select research](https://open-ui.org/components/select.research/)
keeps value/options/popup ownership in Select, while
[Radix Toolbar](https://www.radix-ui.com/primitives/docs/components/toolbar)
demonstrates the full roving-focus, arrows and Home/End behavior deliberately
not claimed here.

[Polaris Select](https://shopify.dev/docs/api/app-home/web-components/forms/select)
keeps current/default selection, disabled state and change behavior in the
control. Shopify's [theme app extension configuration](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration)
identifies product reviews as an app-block use case and requires responsive
adaptation to the containing section. That supports the provider boundary; it
does not authorize placeholder review Liquid.

Figma nodes `943:7` and `1020:480` are generic Button component-detail and
Studio inspector frames, not approved Review Toolbar artwork. No layout or
visual value was promoted from them. Full comparison and links are recorded in
`docs/refinement/dossiers/review-toolbar.md`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Labelled group plus canonical Select and Button/anchor with normal Tab order. | Implemented and evidenced with zero wrapper runtime. |
| Shopify | Review-provider theme app block supplies controls, data, eligibility, results and write flow. | Generated CSS ready/planned; no provider-free placeholder Liquid. |
| Webflow | Native Select/action composition using copied canonical classes. | Generated CSS available; provider and result behavior remain external. |
| React / Angular | Controlled or uncontrolled child Select plus target activation/navigation. | Contract-ready; no parallel toolbar state store. |
| Figma | Adaptive group composed from accepted Select/Button instances. | Planned; component artwork is absent. |
| SwiftUI / Compose | Target-native picker/menu and action in an adaptive stack. | Conceptual; result lifecycle remains target-owned. |

Canonical `components/css/reviews.css`, Shopify `assets/reviews.css` and Webflow
`reviews.css` are byte-identical. Shopify remains at 56 target-ready components;
official artifact `review-toolbar-batch-54` revision 1 passes.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,717 B` | `3.7 KiB` (`3,788 B`) | pass; `71 B` remaining and `20 B` added for container response |
| Shared neutral runtime | `10,492 B` | `8 KiB` (`8,192 B`) | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,335 B` | `64 KiB` (`65,536 B`) | existing `1,799 B` program gap after regeneration |

- Human review must approve spacing, structural border, Select/action emphasis,
  inline-versus-stacked threshold and long-content treatment.
- Provider, allowed sort/filter options, default selection, URL state, loading,
  count, empty/error results, announcements and focus retention remain target-owned.
- Write-review navigation, inline form, overlay, authentication and eligibility
  are not selected by this batch.
- A real APG toolbar would require at least three appropriate controls and the
  full non-conflicting focus model; the current composition deliberately is not one.
- No component-specific Figma artwork exists.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, canonical static preview,
group/name/focus semantics, Select enhanced/native keyboard and value behavior,
action activation, slot/empty omission, four-viewport exact parity, host-container
response, 280px localized RTL/200% containment, light/dark contrast, forced
colors, reduced motion, Neutral Web, Shopify, Webflow, official Shopify artifact,
source/generated identity, deterministic gzip, TypeScript, a temporary Vite
build outside `site/dist`, structural/static/parity/refinement audits and diff
checks comprise Batch 54.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise spacing, border, Select/action emphasis, inline layout,
   30rem host threshold and localized long-content treatment.
2. Decide real sort/filter option inventory, labels, default selection and URL model.
3. Select provider, data/result lifecycle, loading/count/empty/error behavior,
   focus retention and announcements before target integration.
4. Decide whether write-review navigates, reveals Review Form, opens an overlay,
   or remains provider-owned, including eligibility and authentication.
5. Create component-specific Figma artwork only after browser approval.
6. Keep the contract `pilot` until explicit human stability approval.
