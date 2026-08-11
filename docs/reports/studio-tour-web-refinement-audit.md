# Studio Tour Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

R13 Studio Tour is now a contextual profile of canonical Process Timeline rather
than a second ordered-step implementation. Registry, contract `0.3.0`, MDX,
Studio metadata and the shared browser renderer all declare the same direct
dependency. The visible heading is required, the root and native ordered lane
share that label, three direct canonical steps exercise the composition, and
invalid required composition is omitted.

The inert full-surface play Button, duplicated step/grid CSS, passive image
hover motion, video-specific contract anatomy and Studio-only layout overrides
are gone. Optional supplementary media is now a passive native `figure` in the
neutral fixture. A real player remains target-owned until media type, provider,
consent, loading, captions, transcript, playback, modal and analytics policy is
accepted.

The result is prepared for explicit human review, not stable. Human review must
approve the inherited Process Timeline visual language, the contextual
introduction and the supplementary-media treatment. Dedicated Shopify media and
record schemas remain deliberately unimplemented because their architecture is
still open.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Ordered editorial studio walkthrough only; no progress, player, consent, CMS, booking or analytics ownership. |
| Anatomy and composition | pass | Required named section/header/heading/ordered lane/steps, optional introduction and optional passive supplementary figure. |
| Variants, states and modes | pass | One contextual profile; required/invalid, media present/absent, light/dark, forced colors, reduced motion, RTL and intrinsic overflow are evidenced. |
| Public API | pass | Required `heading` and `steps`; optional `eyebrow`, `intro` and `media`; no duplicate layout or fake playback controls. |
| Controlled/uncontrolled | pass | None: the component is passive and owns no selected, current, open, playing or completion value. |
| Canonical dependencies | pass | Direct Process Timeline dependency; canonical track, step, numbering, media, focus, overflow and responsive behavior are reused. |
| Tokens and visual system | pass | Only profile-owned introduction/media tokens remain; dependency-owned step, marker, focus, motion and layout tokens were removed. |
| Accessibility and motion | pass | Non-empty visible label, native `ol`/`li`, no duplicate spoken numbers, native lane focus/scroll, no fake action and no profile motion. |
| Responsive/content resilience | pass | Four viewports plus long localized content, full Arabic RTL, media omission, heading omission and 200% zoom without document overflow. |
| Runtime and assets | pass | Zero component listener, observer, timer, request, state store, custom control, icon or neutral runtime contribution. |
| Cross-target translation | pass | Web implemented; Shopify CSS/manifest synchronized while record and media behavior remain honestly planned. |
| Exhibit/Studio parity | pass | One renderer and one initial fixture; byte-identical component root DOM. |
| Human readiness | pass | Dossier, ADR, contract, docs, adapters, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Implementation Result

- Contract advances from `0.2.0` to `0.3.0`, remains `pilot`, and records
  `process-timeline` as its direct dependency at refinement depth 1.
- `.studio-tour.process-timeline` and the canonical
  `.process-timeline__track`/`.process-step` anatomy replace the independent
  tour grid and step implementation.
- A trimmed non-empty heading and `steps === true` are required by the shared
  renderer. Missing required composition renders nothing, so no dangling
  `aria-labelledby` survives.
- Root and focusable ordered lane reference the same unique visible heading.
  Native list semantics expose sequence; visible markers remain
  `aria-hidden="true"` to avoid duplicate announcement.
- The three-step fixture includes optional canonical media and descriptions.
  The supplementary fixture is a passive `figure` with image and caption, not a
  poster pretending to be a player.
- Studio exposes the five semantic properties and only profile-owned public
  tokens. Track density, orientation, columns, marker, connector, step media,
  focus, motion and playback remain outside the profile API.
- Ceramics CSS now owns only header measure/rhythm, complete eyebrow/intro
  typography and supplementary-media presentation. Studio CSS no longer
  supplies component source behavior.

## Browser Evidence

### Structure, Interaction And State

- The valid root contains one named section, one visible heading, one focusable
  native ordered lane, three direct list items, three visible non-spoken markers
  and zero Buttons.
- Clearing the required heading removes the entire component and leaves zero
  dangling label references. Disabling supplementary media removes the figure
  and still leaves zero Buttons.
- Tab focuses the canonical lane. Four native `ArrowRight` presses move its
  logical scroll position from `0` to `238px`; no custom key handler or smooth
  scroll is installed.
- Mobile measures `358/358px` at the root and `322/560px` inside the lane. The
  page remains `390/390px`, proving overflow is contained by the named canonical
  lane. At 200% CSS zoom, the page remains `390/390px` while the lane retains
  its internal `137/443px` scroll range.
- Browser inspection finds no component listener, request, custom control or
  animation. The only console error is the pre-existing docs-shell
  `/favicon.ico` 404.

### Parity, Content And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) have paired Exhibit/Studio final captures. Initial component
  `outerHTML` is byte-identical at `2,269` characters with SHA-256
  `a7ca742852433da9944f6bc3d9711d2e0c02113f117f2bf905fc88fd1cb972fb`.
- Studio XL uses its `752px` host root and fits a `677/677px` lane. Exhibit XL
  intentionally keeps its narrower documentation host (`584px` root,
  `526/563px` lane), exercising the intrinsic overflow path instead of a
  viewport breakpoint.
- A long Spanish heading/introduction plus an unbroken German compound remains
  contained at Tablet. A full Arabic fixture mutates heading, intro, all step
  titles/descriptions and caption under `dir="rtl"`; root and document remain
  exact at `358/358px` and `390/390px`.
- Eight baseline captures and sixteen final captures live under
  `output/playwright/refinement-batch-57/`, including omission, keyboard,
  localization, RTL, zoom and special-color evidence.

### Contrast And User Preferences

- Light heading/step-title contrast is `17.93:1`; supporting text is `7.81:1`;
  marker text against its surface is `16.89:1`.
- Dark heading/step-title contrast is `17.18:1`; supporting text is `12.09:1`;
  marker text against its surface is `7.00:1`.
- Forced colors preserves ordered structure, visible marker/connector
  boundaries and readable content. Replaced-image colors remain browser/system
  behavior rather than a component paint dependency.
- Reduced motion adds no Studio Tour transition, transform, animation or smooth
  scroll. The inherited Process Timeline profile is also motion-free.

## External And Figma Evidence

The [HTML Living Standard](https://html.spec.whatwg.org/multipage/grouping-content.html)
defines ordered lists for intentionally ordered items and `figure`/`figcaption`
for self-contained media with a caption. [Open UI List research](https://open-ui.org/components/list.research/)
documents compound ordered-list content without defining a Studio Tour widget,
while [Polaris Ordered List](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/ordered-list)
uses ordered lists for procedures and sequences.

The [HTML media standard](https://html.spec.whatwg.org/multipage/media.html) and
[WAI media accessibility guidance](https://www.w3.org/WAI/media/av/) make real
playback a complete controls, tracks, captions/descriptions/transcript and user
control responsibility. Polaris Video Thumbnail likewise represents a real
clickable player entry point. Those sources support removing the inert poster
action; they do not select a Gallery provider or target architecture.

Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector `1020:480`
contain the generic Button/Studio shell rather than Studio Tour artwork. No tour
layout, media, responsive or aesthetic fact was inferred from that reference.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named contextual section over canonical Process Timeline plus optional introduction and passive/target-owned supplementary media. | Implemented, generated and browser-evidenced; zero neutral runtime. |
| Shopify | Dedicated section or contextual Process Timeline blocks plus optional editorial media settings. | Canonical CSS, assets, manifest and validation synchronized; record/schema/media/player policy remains planned. |
| Webflow | Target-agnostic Ceramics profile over the same canonical dependency. | Source-ready; no target-specific behavior is required. |
| React / Angular | Thin projection around Process Timeline; return `null` for invalid required composition and accept target-owned intro/media slots. | Contract-ready; no independent state coordinator. |
| Figma | Reviewed Process Timeline instance/profile plus introduction and optional passive-media example. | Planned; registered reference is unrelated generic artwork. |
| SwiftUI / Compose | Target-native ordered accessible group with contextual introduction and optional target-native media. | Conceptual; target owns media lifecycle and records. |

Canonical and Shopify Ceramics CSS are byte-identical. Shared source runtime,
Shopify runtime and Web runtime are also byte-identical. No placeholder Studio
Tour Liquid, generic player or merchant record schema was added.

## Performance And Risks

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Ceramics CSS | `4,708 B` | `4,459 B` | `5.3 KiB` (`5,427 B`) | pass; `249 B` removed, `968 B` remaining |
| Neutral Web components CSS | `67,148 B` | `66,947 B` | `64 KiB` (`65,536 B`) | existing `1,411 B` program gap; `201 B` better |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8 KiB` (`8,192 B`) | existing `2,309 B` program exception; `0 B` added |

- Human review must approve inherited Process Timeline marker, connector, step
  media ratio, lane overflow/snap/focus and overall tour density.
- Introduction measure, alignment, typography, rhythm and supplementary-media
  crop/radius/caption are visual candidates rather than accepted stable facts.
- Supported media types, provider, privacy/consent, loading, player controls,
  captions, transcript, playback, modal and analytics ownership remain open.
- Tour record/CMS schema, target maximum steps, localization and Shopify editor
  composition remain target/product decisions.
- Dedicated Shopify/Liquid, Figma and framework adapters remain absent.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web and Shopify
adapters, source/generated CSS/runtime identity, structural certification,
static Preview audit, exact Exhibit/Studio parity, required and optional-part
omission, native lane keyboard scrolling, four viewports, long localized and
full RTL content, 200% zoom, light/dark contrast, forced colors, reduced motion,
deterministic gzip, temporary Vite builds outside `site/dist`, refinement/parity
audits, diff checks and console inspection comprise Batch 57.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise inheritance of Process Timeline's lane, marker, connector,
   `4:3` step media, focus treatment, narrow overflow and snap.
2. Approve or revise introduction measure, alignment, typography and rhythm.
3. Approve or revise supplementary-media presence, `16:9` crop, radius, caption
   treatment and relationship to the ordered sequence.
4. Confirm the five-property API, required heading/steps and absence of grid,
   orientation, density, columns, player controls and playback state.
5. Select media types and target ownership before a dedicated Shopify schema or
   interactive player is certified.
6. Create Studio Tour-specific Figma examples after browser approval and keep
   the contract `pilot` until explicit human stability approval.
