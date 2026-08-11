# Steps / Stepper Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Steps is now a passive, labelled ordered progress indicator with canonical
title/description/state anatomy, exactly one current step, text-equivalent
completion meaning, logical horizontal/vertical geometry, RTL-safe ordering,
and bounded many-item overflow. It does not own routing, validation, status
announcements, or interactive workflow navigation.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite linear-process progress; not Tabs, Breadcrumb, Timeline, percentage Progress, or workflow state machine. |
| Anatomy and composition | pass | Labelled `<ol>`, `<li>`, decorative connector/indicator, title, optional description/state text. |
| Variants, sizes, states | pass | Horizontal/vertical; upcoming/current/completed and no-current/static summary boundaries. |
| Public API and ownership | pass | Only `orientation`; ordered content/state data and workflow behavior remain consumer/target-owned. |
| Tokens and visual system | pass | Thirteen existing public references; indicator and connector dimensions stay private. |
| Accessibility and motion | pass | Native ordered-list semantics, one `aria-current="step"`, completion text, no invalid orientation property, no focus stops, and no authored motion. |
| Responsive/content resilience | pass | Four viewports, vertical, Arabic RTL, long text, and eight-item internal overflow with preserved order. |
| Runtime and assets | pass | No JavaScript, listener, observer, timer, request, or asset. |
| Cross-target translation | pass | Web/Shopify ordered-list mapping and framework/Figma/native workflow boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0103, semantic MDX, contract/Studio/registry, one renderer/fixture, before/after evidence, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 9 anatomy parts, 2 orientation variants, 1 size,
  6 states, 5 behaviors, 1 property, and 13 public token references.
- Exhibit and Studio render an `OL` with three `LI` items, exactly one
  `aria-current="step"`, a decorative completed check, and equivalent hidden
  `Completed` text. The root has no `aria-orientation`.
- Horizontal desktop geometry has equal client/scroll width. A 390px Arabic RTL
  fixture stays within the preview with a bounded `326/336px` component width;
  labels and descriptions wrap while DOM/process order remains unchanged.
- An eight-step extreme fixture measures `326px` client width and `896px` scroll
  width with `overflow-x: auto`; scrolling reaches the exact `570px` maximum and
  exposes steps 6–8 without page overflow.
- Vertical mode measures `280/280px` client/scroll width. Completed→current and
  current→upcoming connectors use the correct logical segment colors, and the
  final item has no trailing connector.
- Light current/upcoming/description contrast is `17.93:1`/`7.81:1`/`7.81:1`;
  dark is `17.18:1`/`12.09:1`/`12.09:1`. Current/completed indicator text is
  `10.37:1` light and `17.93:1` dark. The subtle upcoming boundary is decorative
  (`1.26:1` light, `1.73:1` dark); number, title, order, check, weight, and hidden
  state text carry meaning independently of that boundary.
- Root and item transitions compute `0s`; the component installs no reduced-
  motion listener. Forced colors retains numbered/current/completed distinctions
  and connector/boundary structure.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  vertical, localized RTL, many-item top/end, dark, and forced-colors captures
  supplement two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Labelled native ordered list with `aria-current="step"`, textual completion, and logical CSS. | CSS/semantics evidenced; workflow announcements and navigation remain outside the primitive. |
| Shopify | Liquid ordered step data using the shared class contract. | Class adapter is implemented; owning checkout/onboarding workflow controls routes and validation. |
| React / Angular | Typed ordered collection/current state rendered to the same list; native Link/Button only for explicit navigation. | Strategy documented; adapter not certified. |
| Figma | Horizontal/vertical variants and upcoming/current/completed states with long-copy examples. | Studio validates; no workflow ownership. |
| SwiftUI / Compose | Ordered progress content with equivalent current/completed meaning. | Conceptual mapping only. |

## Performance And Risks

- Steps adds no neutral runtime. Batch 18 Layout is the documented
  `6,357 B / 4.8 KiB` exception (`1,442 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `62,893 B / 64 KiB`.
- Human review must approve indicator diameter, connector weight, spacing,
  typography, completed check, horizontal overflow policy, and whether the
  repository render is the visual reference.
- Interactive backward navigation, error/disabled states, automatic orientation,
  branching, skipping, and dynamic live announcements remain explicit target or
  future product choices.
- `.steps__label` and `.steps__item--done` are temporary compatibility aliases;
  their eventual removal requires a migration decision, not silent churn.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, ordered-list/current/
completion/RTL/orientation/overflow/contrast/special-media probes, four-viewport
visual evidence, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks, and `site/dist`
verification are included in Batch 18.
