# Component Dossier: Button

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/button.contract.json`

## Recommendation

Retain the accepted Button contract and implementation as the calibration control.
Its neutral-web behavior was explicitly approved on 2026-07-11 and remains the
only `stable` contract. The expanded v1 program does not reopen that decision.
Tablet, XL, forced-colors, and reduced-motion evidence now refreshes the accepted
render without introducing a new property or visual decision.

## Purpose And Limits

- Button starts an immediate action or submits a form.
- Link navigation remains an allowed host-element mapping only when the semantic
  operation is navigation; a visual Button must not turn arbitrary links into
  commands.
- Button owns label, optional leading and trailing icons, loading placement,
  disabled/busy semantics, variant, size, icon-only, and full-width decisions.
- Button does not own confirmation workflows, asynchronous result messaging,
  routing, authorization, or commerce mutations.

## Current Gallery Baseline

- Registry identity: `A1`, primitive, no registered component dependencies.
- Contract: `0.3.0`, `stable`; 5 anatomy parts, 5 variants, 3 sizes, 6
  states, 3 behavior rules, 10 semantic properties, and 59 public tokens.
- Canonical source: `components/css/primitives.css`; behavior is native HTML and
  CSS, with no component-specific runtime enhancer.
- Properties: `label`, `variant`, `size`, `disabled`, `busy`, `leadingIcon`,
  `trailingIcon`, `iconOnly`, `fullWidth`, and `loadingPosition`.
- Exhibit and Studio share the registered Button renderer and fixture. Studio
  exposes all ten semantic properties.
- The automated neutral-web gate passes. The accepted report is
  `docs/reports/button-web-certification-pilot.md`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) | Native `button` supplies activation, disabled, form association, and submit/reset/button types. | Use native `<button>` for commands and preserve explicit `type` outside intentional submit buttons. |
| [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Buttons require an accessible name; Enter and Space activate; toggle buttons need `aria-pressed`. | Existing keyboard behavior should remain native. Toggle behavior belongs to a separate semantic contract unless explicitly exposed. |
| [Radix Themes Button](https://www.radix-ui.com/themes/docs/components/button) | Mature APIs expose a small visual set plus size, loading, high-contrast, and host composition. | Gallery's five variants, three sizes, busy state, and host-element mappings are appropriately semantic; internal spacing is not a property. |
| [Shopify Polaris Button](https://shopify.dev/docs/api/app-home/web-components/actions/button) | Polaris separates command, submit, link destination, loading, disabled, accessibility label, and tone concerns. | Gallery already covers the stable cross-target subset. Target-specific command systems and tones remain adapter concerns. |

Open UI does not currently define a Button pattern that adds material evidence
beyond native HTML and APG for this contract.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `button` or navigational `a` | Button | Host element owns activation semantics. |
| Leading icon | no | decorative slot | Consumer content | Hidden from assistive technology when the label names the action. |
| Label | yes | text content or accessible label | Button | Remains in the accessibility tree during loading. |
| Trailing icon | no | decorative slot | Consumer content | May coexist with the leading icon. |
| Loading indicator | generated | decorative progress presentation | Button CSS | Replaces only the configured icon side; busy semantics stay on the host. |

No canonical component markup or behavior is duplicated. Studio's Lucide fixture
is presentation-only and is not part of the target-agnostic contract.

## Variant, Size, State, And Mode Matrix

- Variants: Solid, Outline, Ghost, Link, and Destructive.
- Sizes: Small, Medium, and Large; icon-only preserves a square target.
- States: default, hover, active, focus-visible, disabled, and busy.
- Compositions: zero, one, or two icon slots; automatic, leading, or trailing
  loading; intrinsic or full width.
- Light, dark, Mobile, Tablet, Desktop, XL, and forced-colors now have browser
  evidence in Exhibit and Studio where applicable.
- Reduced motion disables the spinner animation without hiding the indicator.

## Public API And State Ownership

The ten properties are understandable, cross-target, validable, and already
reviewed. `busy` is consumer-controlled: the application owns the asynchronous
operation, while Button owns non-reactivation and `aria-busy`. `disabled` is a
separate unavailable state. Native `click`, keyboard activation, and form events
remain platform events. A consumer must supply an accessible `label`, including
for icon-only composition. No internal gap, radius, spinner speed, icon geometry,
or private composition variable should become a semantic property.

## Token And Value Audit

- All 33 Button source tokens are connected; 59 public contract tokens cover
  color, typography, spacing, size, radius, opacity, transition, and easing.
- Private `--_` variables compose resolved values and remain internal.
- Lucide icon choices are site-only fixtures. The generated spinner geometry is
  component presentation, not a public asset or icon API.
- No hardcoded runtime value currently warrants promotion to the public API.

## Visual And Content Audit

The approved render covers icon alignment, label visibility during loading,
stable width, full width, wrapped long labels, and icon-only sizing. The body
type scale no longer controls Button typography. Empty visible labels are valid
only when another accessible naming mechanism is supplied by the host mapping;
Studio does not present that as a normal consumer configuration.

## Accessibility And Interaction

Native button keyboard and focus behavior is preserved. Busy and disabled
buttons cannot reactivate; anchor mappings remove `href` and retain link role
while unavailable. Focus-visible, contrast, dark theme, accessible label
retention, reduced motion, and forced colors passed browser evidence. The focused
forced-colors control retained a `2px` solid outline with `2px` offset; reduced
motion resolved both transition and spinner animation duration to `0s`.

## Responsive And Performance

Button is container-driven through intrinsic sizing, wrapping, and `fullWidth`;
it introduces no viewport media query or layout observer. It has zero
component-specific JavaScript and no network asset. It fits the primitive family
budget in `docs/COMPONENT-REFINEMENT.md`; the shared CSS family measurement will
be recorded by the program report rather than repeated here.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native `button` or navigational `a`, classes and conditional attributes. | Accepted for neutral Web. |
| Shopify | Native button/anchor in Liquid; application sections own mutation and loading lifecycle. | Adapter validates; cross-target visual evidence pending. |
| React / Angular | Thin adapter maps properties and native events without owning state. | Contract-ready; no packaged adapter certified. |
| Figma | Variants, sizes, icon slots, full width, disabled, and busy properties. | Figma remains a target; current owner reference is Button-specific. |
| SwiftUI / Compose | Native Button/action mapping plus Gallery presentation tokens. | Translation documented conceptually; adapter not implemented. |

## Exhibit And Studio Parity

Exhibit and Studio use the shared Button renderer, fixture, and canonical web
adapter CSS. Studio-only classes contain the stage and inspector but do not
recreate Button visuals. The accepted design reference is specific to Button.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Expanded rubric requires Tablet and XL evidence not present in the historical approval package. | resolved | Eight Exhibit/Studio captures now cover all four viewports without changing the accepted design. | implementation |
| Forced-colors evidence is not explicit in the historical report. | resolved | Focus and busy/reduced-motion behavior now have a dedicated browser case. | implementation |
| React, Angular, SwiftUI, Compose, and Figma adapters are not yet certified outputs. | low | Retain contract-ready mappings and certify when those target programs exist. | target owners |

## Evidence And Validation

- Accepted baseline: `docs/reports/button-web-certification-pilot.md`.
- Expanded evidence: eight Exhibit/Studio screenshots at `390 x 844`,
  `768 x 1024`, `1280 x 800`, and `1600 x 1000` under
  `output/playwright/refinement-calibration/`.
- Special-mode evidence:
  `button-forced-colors-reduced-motion-desktop.png`; the spinner remains visible,
  animation is `none`, and the control transition duration is `0s`.
- Validation: contracts, Studio, docs, component and refinement audits, neutral
  Web/Shopify adapter validation, and scoped browser checks pass.

## Risks And Open Questions

There is no blocking product or architecture question for the neutral-web
Button. Target-native loading announcements or command integrations remain
adapter work. Reopening approved visual decisions without new evidence would
create churn and is outside this calibration pass.

## Readiness Decision

Ready under the expanded rubric. The existing neutral-web `stable` approval
remains valid and is not a new automatic promotion. Target-native adapters beyond
the validated Shopify translation retain their own future certification work.
