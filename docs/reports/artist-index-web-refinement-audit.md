# Artist Index Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Artist Index Grid (`F6`)

## Outcome

Artist Index is reconciled as a heading-labelled passive directory with native
result-list semantics, authoritative target order, component-width one/two/
three-column layout, optional target-owned filters and zero neutral runtime.
Contract, registry, canonical CSS, MDX, shared Exhibit/Studio renderer, Studio
metadata, generated Web/Shopify outputs, dossier, ADR and browser evidence
agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual proposal and decide filtering plus formal Artist Card
composition. Shopify remains honestly `css-ready` until an artist data and
filter/result/URL model is accepted; no product collection filter or merchant
schema was invented.

## Research And Decision

- HTML and Open UI support a labelled section plus native list for repeated
  compound records, while mature systems do not converge on one Card anatomy.
- APG and WAI-ARIA distinguish independent pressed toggle buttons from
  exclusive radio choices; selected styling cannot choose semantics.
- Radix requires explicit single/multiple and controlled/uncontrolled value
  ownership. Polaris treats filtering as a composite lifecycle spanning values,
  applied state, results, notices, keyboard access and narrow-screen policy.
- Shopify storefront filtering is coupled to product collection/search objects
  and URL parameters. It is not an artist-directory data source.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480` found the generic Button Studio prototype, not Artist
  Index artwork or states.

ADR 0128 records the safe boundary: passive native list, intrinsic container
tracks, unresolved optional filtering, no implied Artist Card dependency, exact
shared renderer and zero neutral runtime. ADR 0080's selection and synchronization
questions remain open.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: eight anatomy parts, one variant/size, five
  states, one behavior, four semantic properties, twenty-six public tokens and
  no dependency.
- `.artist-index` is a heading-labelled section with native header and optional
  introduction. Complete typography and robust wrapping use existing tokens.
- `.artist-index__grid` is a reset native `ul`; each `.artist-index__item` is a
  native `li` wrapping one target-owned record. No grid/listbox role, roving
  tabindex, sorting or CSS reordering exists.
- Canonical container thresholds resolve one track by default, two from private
  `27rem`, and three from private `44rem`. Site-only padding/column rules are
  removed.
- Optional control hooks have touch-sized layout, fine-pointer hover,
  focus-visible, selected/disabled, forced-colors and reduced-motion treatment.
  They do not select a target semantic model.
- The shared default fixture omits filters and removes the previous React state
  that changed pressed appearance without updating results. Studio exposes a
  site-only explanatory slot placeholder only when explicitly enabled.
- Fictional artist media uses empty alternatives rather than attributing
  unrelated repository assets to named people. Real targets own portrait
  meaning, source and alternative text.
- MDX uses native list anatomy and no inert filter buttons. Exhibit and Studio
  share the same renderer, fixture and initial markup.
- Neutral Web embeds the exact canonical Storytelling CSS once. Shopify's copy
  is byte-identical and passes official validation, while dedicated Liquid/data
  remains deliberately planned.

## Browser Evidence

### Parity And Responsive Layout

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) produce exact initial Exhibit/Studio `outerHTML` parity. Clean
  component HTML is `1,771` characters.
- Exhibit roots are `310/688/532/536px`; Studio roots are
  `310/688/644/704px`. Actual candidates resolve `1/2/2/2` tracks, always expose
  three list items, expose zero filter controls and have zero root/page overflow.
- Isolated `260/580/900px` roots resolve `1/2/3` tracks with content widths
  `218.4/487.2/756px`, proving component-width rather than page-width ownership.

### Semantics, Optional Filters And Interaction Hooks

- Accessibility inspection exposes one heading-labelled `section`, one native
  `ul`, three native `li`, three target-owned `article` records, preserved
  `Marina Paz / Noa Kim / Iris Bell` source order and zero focusable descendants.
- All three fixture images have empty alternatives because they are decorative
  editorial evidence, not authoritative portraits of the fictional records.
- Initial filters are omitted. No pressed, checked, selected or live state is
  claimed by the passive shared candidate.
- A synthetic target-control specimen proves default/selected/disabled/long
  hooks, native Enter dispatch exactly once, visible focus, wrapping, a minimum
  44px target and zero overflow. The specimen is evidence, not neutral API.

### Content, Themes, Reflow And Preferences

- Long Arabic heading/metadata, RTL direction and a repeated unbroken Latin name
  remain contained in a `368px` root; root, host, items and page all have zero
  overflow.
- Mobile uses a `310px` root, narrower than the standard `320px` reflow test,
  without horizontal overflow.
- Light contrast is `17.93:1` for heading/name and `7.81:1` for secondary text;
  dark contrast is `17.18:1` and `12.09:1` respectively.
- Forced colors resolves selected hooks to Highlight/HighlightText and idle
  controls to CanvasText boundaries. Reduced motion resolves transition duration
  to `0s`.
- Four before images, eight final viewport images and seven special-state images
  live under `output/playwright/refinement-batch-43/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Labelled native section/list, ordered target records, optional target filters and intrinsic container tracks. | Implemented, generated and validated; no component runtime. |
| Shopify | Exact canonical CSS plus future section/template artist records. | `css-ready`, `ready: false`; Liquid/data/filter lifecycle intentionally planned pending owner/target decisions. Official CSS validation passes. |
| Webflow | Canonical target-agnostic CSS copy and target-authored semantic markup. | Generated source path remains available through the component build. |
| React / Angular | Passive title/introduction/results composition; target defines any complete filter value/event lifecycle. | Planned; no state service in neutral source. |
| Figma | One/two/three tracks, optional filter region, themes and localized/extreme records. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Native labelled section/list or lazy grid with target records and platform-native optional filtering. | Conceptual; selection/navigation/data remain target-owned. |

## Performance And Risks

- Storytelling CSS is `4,571 B / 4.2 KiB`, a `271 B` exception and `195 B`
  increase from Batch 42.
- Complete neutral Web component CSS is `66,419 B / 64 KiB`, an `883 B` program
  gap and `128 B` increase from Batch 42. The ceiling remains binding.
- Shared runtime is `10,492 B / 8 KiB`, the existing `2,300 B` exception.
  Artist Index adds `0 B` runtime, listener, observer, timer or request.
- Human review must approve the `27rem`/`44rem` thresholds, maximum three
  columns, gap, section inset, heading rhythm, result visual direction and
  optional filter treatment.
- Owner/product/architecture must separately decide selection model, `All`
  policy, value/result/URL/status lifecycle and formal Artist Card dependency.
- Shopify remains a documented target gap until an artist data/editor/route
  model is accepted. This is explicit rather than hidden behind product filters.

## Validation

Registry/docs, source tokens, 183 contracts, 183 Studio definitions, neutral
Web, Shopify and Webflow adapters, official Shopify CSS validation, structural
certification, static Preview audit, exact Exhibit/Studio parity,
source/generated CSS identity, four viewport modes, isolated tracks, native
semantics, synthetic target hooks/Enter, localized RTL extremes, narrow reflow,
light/dark contrast, forced colors, reduced motion, deterministic gzip, global
refinement audit, temporary site build outside `site/dist`, diff checks, final
component-console inspection and explicit `site/dist` cleanliness comprise
Batch 43.

The fresh site console contains only the pre-existing shell-level
`/favicon.ico` 404. `site/dist` was not rebuilt or modified.

## Remaining Human Review

- Approve or revise track thresholds/count/gap, section inset and heading/
  introduction rhythm.
- Approve or revise filter density, radius, selected surface, focus, wrapping
  and the filter-off default fixture.
- Decide single, multiple, navigation or target-specific filter semantics and
  the complete value/result/URL/status lifecycle.
- Decide whether Artist Index formally composes Artist Card.
- Define the Shopify artist source and editor model before dedicated Liquid.
- Confirm that columns, thresholds, density, filter mode/values, record anatomy,
  heading rank, destinations and events remain outside the v1 neutral API.
- Do not promote the contract to `stable` without explicit human approval.
