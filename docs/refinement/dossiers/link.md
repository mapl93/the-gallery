# Component Dossier: Link

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/link.contract.json`

## Recommendation

Retain the accepted native-anchor contract with required `label` and `href`,
three visual variants, optional `target`/`rel`, and current-page semantics. Keep
Link navigational, keep disabled out of the API, and preserve text inheritance.
Add an explicit reduced-motion fallback and verify focus, forced colors,
contrast, wrapping, localization, bidirectional text, and new-context behavior.

## Purpose And Limits

- Link navigates to a resource, route, document fragment, protocol, or download
  destination represented by a real URL.
- Inline, subtle, and navigation presentation can vary without changing native
  anchor behavior.
- Button owns local commands and state changes.
- Link does not own routing libraries, preload/prefetch policy, analytics,
  authorization, external-site trust, disabled state, or unavailable flows.

## Current Gallery Baseline

- Registry identity: `A28`, primitive, no dependencies.
- Contract: `0.3.0`, `pilot`; one anatomy part, three variants, one size, five
  visual states, three behavior rules, six properties, and six public tokens.
- Required properties: `label`, `href`; optional `variant`, `target`, `rel`, and
  `currentPage`.
- Canonical CSS defines Default, Subtle, and Nav, plus hover/focus-visible.
- Link transitions stop under reduced motion and long unbroken labels use
  resilient wrapping.
- Default color mixes accent and primary at a private `70%` ratio; underline
  offset/thickness, focus radius, and Nav weight are internal literals.
- Shared Exhibit/Studio renderer uses a real anchor and fixture destination.
- The registered design reference is the Button pilot frame, not Link-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Strongly prefers native `a[href]`; Enter activates and native links provide context-menu/navigation behavior. | Keep the native anchor and avoid recreating it with `role="link"`. |
| [WAI APG naming guidance](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Interactive elements need useful accessible names; repeated links should be distinguishable unless destinations are identical. | Visible label remains required and contextual names must identify destinations. |
| [HTML Standard: links](https://html.spec.whatwg.org/multipage/links.html) | Native anchors define destinations and relationship/navigation attributes. | `href`, `target`, and `rel` remain native mappings. |
| [Radix Themes Link](https://www.radix-ui.com/themes/docs/components/link) | Uses the `a` element and exposes typography/underline presentation. | Gallery keeps a smaller reviewed variant surface and inherits surrounding type. |
| [Shopify Polaris Link](https://shopify.dev/docs/api/app-home/web-components/actions/link) | Distinguishes navigation from prominent actions and supports external/new-context destinations. | Gallery's native navigation boundary maps cleanly; target-specific tone/download/language remain adapter or host attributes until reviewed. |

Open UI defines no separate Link control beyond native platform behavior.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root/label | yes | `a[href]` | Link + consumer | Visible child content supplies the accessible name. |

Inline icons may be consumer content only when their accessible treatment and
direction are correct; Link currently exposes no icon slots. Surrounding prose,
navigation landmarks, and list structure remain parent composition.

## Variant, Size, State, And Mode Matrix

- Variants: Default underlined, Subtle, Nav.
- Size: inherited from surrounding content; no separate size property.
- States: default, hover, focus-visible, Subtle hover, Nav hover.
- Semantic mode: current page via `aria-current="page"` without a fourth visual
  variant.
- Destination modes: current browsing context or explicit native target/rel.
- Themes: light/dark/forced colors; normal/reduced motion; LTR/RTL/bidirectional.
- Invalid configurations: missing/empty label or missing/empty `href`.

## Public API And State Ownership

The six accepted properties are cross-target and validable. `currentPage` is
consumer-controlled navigation context. Native navigation and browser history own
activation state. `target` and `rel` are passed through; the component does not
silently rewrite consumer relationship policy. No disabled property is added. A
future `download`, language, or referrer-policy mapping requires explicit demand
and cross-target review rather than API maximalism.

## Token And Value Audit

- Colors: accent, primary, secondary, focus border.
- Motion: fast duration and default easing.
- The `70%` accent mix, `2px` underline offset, `1px` thickness, `2px` focus
  radius, and `500` Nav weight are private visual decisions. They need evidence,
  not automatic public tokens.
- No JS, SVG, font, or network asset is component-owned.

## Visual And Content Audit

Evidence must cover short and long labels, localized text, an unbroken URL-like
label, inline wrapping across lines, surrounding body-size inheritance, LTR/RTL,
all variants, current page, and external/new-context attributes. Empty required
content is invalid and should be documented rather than rendered as an unnamed
focus stop.

## Accessibility And Interaction

Real `a[href]` supplies Tab focus, Enter activation, context menu, destination
preview, and browser semantics. Visible text supplies the name. Focus-visible
must remain visible in forced colors and across wrapped lines. Color cannot be the
only link cue in surrounding text; Default remains underlined, while Subtle/Nav
are appropriate only where context supplies affordance. Motion is decorative and
must stop under reduced motion.

## Responsive And Performance

Link inherits type and wraps within its container; it has no viewport breakpoint,
observer, listener, timer, or component JavaScript. CSS cost belongs to the
primitives family. Navigation/network cost is destination- and browser-owned.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native `a[href]`, classes, `target`, `rel`, conditional `aria-current`. | Implemented and evidenced. |
| Shopify | Liquid anchor and canonical classes/attributes. | CSS adapter exists; target visual evidence pending. |
| React / Angular | Router adapter may compose the host but must preserve link semantics and native attributes. | Contract-ready; no adapter certified. |
| Figma | Variant, label, and current-page presentation; href/rel/target are prototype metadata. | Link-specific visual reference absent. |
| SwiftUI / Compose | Native navigation/link destination plus Gallery presentation. | Conceptual mapping only. |

## Exhibit And Studio Parity

Exhibit and Studio mount the same Link renderer, anchor fixture, local values,
and canonical CSS. Studio controls are metadata-only and do not introduce router
behavior or a second implementation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Link transitions continued under reduced motion. | resolved | Canonical transition duration resolves to `0s`. | implementation |
| Contrast/forced-colors evidence was not component-specific. | resolved | All variants exceed `4.5:1` in light/dark; forced-color keyboard focus remains visible. | implementation |
| Long/unbroken and bidirectional labels were not evidenced. | resolved | Unbroken German and inherited RTL Arabic fixtures produce no horizontal overflow. | implementation |
| Empty required values can be authored through Studio controls. | documented invalid | `label` and `href` remain required; the renderer does not invent a name or destination. | implementation |
| No Link-specific visual reference exists. | review input | Approve repository render or provide a reference. | owner |

## Evidence And Validation

- Exhibit and Studio render identical anchor markup and `View the collection`
  fixture.
- Eight final screenshots cover both surfaces at all four viewports; Subtle, Nav,
  localization, forced-colors, reduced-motion, and keyboard-focus images are in
  `output/playwright/refinement-batch-02/`.
- Enter navigates to the configured fragment. Studio maps `_blank`, `noopener`,
  and Current page to native `target`, `rel`, and `aria-current="page"`.
- Light contrast ratios are `5.89`, `7.81`, and `17.93`; dark ratios are `9.94`,
  `12.09`, and `17.18` for Default, Subtle, and Nav respectively.
- Author Card follow-up evidence on 2026-07-17 found the former pure-accent Nav
  hover at `3.56:1` light. Canonical Nav hover now reuses the accepted
  accent/primary mix and passes at `5.88:1` light / `9.95:1` dark without a
  component-local override or runtime/API change.
- A previously `555.66px` unbroken label now fits its `326px` stage with no
  scroll overflow. RTL Arabic inherits `direction: rtl` without overflow.
- Full results: `docs/reports/link-web-refinement-audit.md`.

## Risks And Open Questions

- Human visual approval is required for the current mix ratio, underline,
  typography, and hover treatments.
- Whether download/language/referrer policy become semantic properties is
  deferred until a cross-target consumer need exists.
- Router and native-app adapters must not turn navigation into a local command.

## Readiness Decision

Ready for human review, not `stable`. Technical gates are complete. Human review
must approve the current color mix, underline, typography, and hover treatments
or provide a Link-specific visual reference.
