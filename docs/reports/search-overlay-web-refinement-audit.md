# Search Overlay Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Search Overlay is now a named modal dialog with visible title, canonical Close
Button, a native labelled search form/control, bounded viewport layout, and
optional target-owned result/status content. Linked results remain native
list/link content rather than an implicit combobox.

No visual approval, search-provider certification, production overlay
certification, or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Temporary global search task; provider, ranking, data, analytics, status truth, and orchestration remain targets. |
| Anatomy and composition | pass | Named modal root, native search form, header/title/Close Button, native label/input, optional list/link result parts. |
| Variants, sizes, states | pass | One bounded dialog; open/closed, input/result focus, result hover, optional results, dark and special-media states. |
| Public API and ownership | pass | Seven semantic properties with one open/query owner; trigger, provider, inertness, scroll and lifecycle remain targets. |
| Tokens and visual system | pass | Twenty-one existing public references; 40rem panel, 3rem media, padding and viewport geometry remain private. |
| Accessibility and motion | pass | Visible dialog name, native labelled search, canonical dismissal, cyclic focus/Escape/restoration, no live default, special media. |
| Responsive/content resilience | pass | Bounded mobile panel, internal results scroll, long localized title/result/placeholder, four viewports, and no inline overflow. |
| Runtime and assets | pass | `0 B` neutral Search runtime; docs React demonstrates lifecycle without provider, observer, timer, request, or neutral asset. |
| Cross-target translation | pass | Semantic form/dialog source and provider/runtime responsibilities are separately documented across targets. |
| Documentation and verification | pass | Dossier, ADR 0101, one renderer/fixture, real before/after evidence, adapters, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 14 anatomy parts, 1 variant, 1 size, 5 states,
  8 behaviors, 7 properties, 21 public token references, and direct Close Button
  dependency.
- The shared renderer exposes one `role="dialog"` with `aria-modal="true"` and a
  title ID referenced by `aria-labelledby`. Native label `for` equals the search
  input ID, result content is a `ul > li > a` inventory, and `aria-live` count is
  zero.
- Initial focus lands on the search input. `Shift+Tab` reaches Close and another
  `Shift+Tab` wraps to the final result. `Escape` unmounts the dialog, restores
  `Open search`, and leaves zero hidden dialog focusables; reopen returns focus to
  the input.
- At a 390px viewport, localized stress keeps overlay `358/358px`, panel
  `326/326px`, long title `238/238px`, unbroken result `210/210px`, and input
  `290/290px` client/scroll widths. Content wraps or clips inside its native
  control without page overflow.
- Light title/input/result contrast is `17.93:1` and price is `7.81:1`; dark title/
  input/result is `17.18:1` and price `12.09:1`. Result focus is visibly bounded.
  Reduced motion computes `0s`; forced colors preserves system panel/input/focus
  boundaries and linked-result affordance.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL.
  Localized extreme, dark, forced-colors, reduced-motion, and focus captures
  supplement two real desktop before captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native named modal/search form with optional target-owned results and one overlay/query owner. | CSS/docs lifecycle evidenced; production provider/orchestrator remains target-owned. |
| Shopify | Semantic Liquid form, title, Close Button, input, and injection region. | Static mapping validates; predictive service, truthful status and modal runtime keep adapter planned. |
| React / Angular | Controlled/default query convenience plus framework dialog and provider integration. | Strategy documented; adapter not certified. |
| Figma | Title/dismiss/query/result anatomy, open/focus/empty/loading/error visual states. | Studio validates current source states; no provider or runtime ownership. |
| SwiftUI / Compose | Native searchable/modal search facilities with linked result navigation. | Conceptual mapping only. |

## Performance And Risks

- Search Overlay adds no neutral JS. Batch 16 Global CSS is the documented
  `4,028 B / 3.7 KiB` exception; Web CSS remains `61,781 B / 64 KiB`; shared
  runtime is unchanged at `10,321 B`.
- Human review must approve backdrop opacity, top offset, 40rem width, radius,
  shadow, title scale, Close target, field border/focus thickness, result density,
  media size, hover/focus, mobile padding, and long-title rhythm.
- Provider/API, query timing, cancellation, ranking, record types, prices, loading/
  empty/error truth, announcements, backdrop dismissal, inertness, scroll locking,
  route cleanup, mutual exclusion, and global trigger coordination remain open.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, dialog/form/label/list/
focus-cycle/Escape/restoration/closed-focusable/no-live/contrast/content/overflow/
special-media probes, four-viewport evidence, TypeScript, structural/parity/
static-preview/refinement audits, temporary build, performance, diff checks, and
`site/dist` verification are included in Batch 16.
