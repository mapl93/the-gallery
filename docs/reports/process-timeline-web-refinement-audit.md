# Process Timeline Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Process Timeline (`F2`)

## Outcome

Process Timeline is reconciled as a passive, section-labelled ordered narrative
with visible numbering, optional target-owned media and one intrinsic horizontal
lane. Equal tracks share available inline space and overflow natively only when
their content does not fit. Contract, registry, canonical CSS, MDX, shared
Exhibit/Studio renderer, Studio metadata, Shopify Liquid/locales, generated Web
and Shopify adapters, dossier, ADR, open questions and browser evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual proposal. The neutral component bundle is `153 B` over its
permanent `64 KiB` ceiling; this is an explicit program-level gap, not a silent
budget increase or a reason to weaken semantic typography or focus treatment.

## Research And Decision

- WAI and HTML ordered-list guidance support direct `ol`/`li` composition for
  sequential information, contextual headings and compound item content.
- The WAI scrollable-content rule and browser evidence support a sequentially
  focusable native overflow lane without custom arrow-key handling.
- Open UI has no interoperable Timeline widget. Radix Scroll Area and Polaris
  Ordered List reinforce native scrolling and native ordered semantics instead
  of carousel, listbox, progress or application roles.
- Shopify sections and blocks provide the target-native ordered merchant data,
  editor attributes, images and optional content required by the neutral
  anatomy.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, found
  generic Studio/Button artwork, not Process Timeline artwork. No marker,
  connector, media or responsive decision was inferred from it.

ADR 0124 records the safe boundary: one named native section, direct ordered
items, visible but accessibility-hidden duplicate numbers, an intrinsic one-row
lane, native overflow/snap/focus, logical decorative connectors, optional-part
omission, target-owned media semantics and zero component runtime.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: nine anatomy parts, one variant, one size,
  two states, eight behaviors, two semantic properties, twenty-three public
  tokens and no canonical dependencies.
- The target supplies one unique heading `id`; both native section and ordered
  lane reference it. The track uses `role="list"` for list-style-removal
  resilience and `tabindex="0"` as the cross-browser keyboard-scroll fallback.
- Visual numbers are `aria-hidden="true"`, so native list order remains the one
  accessible source of position and count. Images and descriptions are omitted
  independently instead of producing empty wrappers.
- `.process-timeline__track` is an inline intrinsic grid with equal implicit
  tracks, a private readable minimum, native horizontal overflow and snap. It no
  longer switches or wraps according to the page viewport.
- The connector uses logical geometry and aligns with the number marker. It is
  decorative, survives RTL/forced colors and never carries sequence alone.
- Heading, step title, description and marker use complete source typography
  tokens. The pale statement surface uses primary text for the numbered marker;
  inverse text was rejected after measured light-theme contrast failure.
- Canonical source owns list/title reset, responsive inset and focus treatment.
  Process Timeline-specific docs-site padding and reset rules are removed.
- Exhibit and Studio use the same `StorytellingStudio` renderer and fixture.
- Shopify renders the same section/heading/`ol`/`li` anatomy, preserves authored
  block order and editor attributes, conditionally emits optional content,
  preserves informative/decorative image intent, localizes fallback/schema
  strings and reports `implemented`, `section-adapter`, `ready: true`.

## Browser Evidence

### Parity And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) produce exact initial Exhibit/Studio `outerHTML` parity. The
  clean initial component HTML is `1,702` characters.
- Every initial render exposes one region and one list named `From earth to
  kiln`, three direct list items, one `H2`, three `H3` step headings, three
  hidden duplicate visual numbers and three meaningful image alternatives.
- Mobile root/track widths are `310/262px` with `560px` scroll width; Tablet is
  `688/592px` with no overflow. Exhibit Desktop is `532/447px`, Studio Desktop
  `644/541px`, Exhibit XL `536/450px` and Studio XL `704/591px`; constrained
  hosts expose the same `592px` intrinsic content width through native overflow.
- All three default tracks are equal: `176px` when constrained and approximately
  `181.33px` when the `592px` Tablet lane can distribute its free space. No page
  or component-root horizontal overflow occurs.

### Semantics, Optional Content, And Keyboard

- The section and list resolve the same unique visible heading reference. The
  ordered lane keeps native list semantics; connectors and visual numbers do
  not duplicate the accessible sequence.
- The optional-content probe keeps three steps but renders only two images and
  two descriptions, with zero empty optional wrappers.
- One supplied item expands to the full `592px` lane. Eight supplied items keep
  a `1,576px` scroll width; native scrolling reaches the `984px` maximum and
  makes the final item visible.
- Sequential Tab focus reaches the mobile lane with a `2px` solid primary focus
  outline and `2px` offset. Native ArrowRight changes `scrollLeft` from `0` to
  `149` without any component key handler.

### Content, Themes, And Preferences

- Mixed localized/extreme content remains contained; a long unbroken item does
  not exceed its grid track. RTL maps the logical connector to the physical left
  while retaining source order and lane containment.
- At 200% CSS zoom the document remains `768px` wide and only the named lane
  overflows (`255px` client / `576px` scroll); neither page nor root gains a
  horizontal scrollbar.
- Light contrast is `17.93:1` title, `7.81:1` description and `16.89:1` marker.
  Dark contrast is `17.18:1`, `12.09:1` and `7.00:1` respectively.
- Forced colors preserves a `2px` system focus outline, visible marker boundary
  and connector. Reduced motion resolves component animation and transition to
  `0s` and native scroll behavior to `auto`.
- The recurring docs-site `favicon.ico` 404 is baseline noise; no
  Process Timeline console error or warning was observed.

Four before images, eight viewport-after images and seven special-state images
live under `output/playwright/refinement-batch-39/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named section, contextual heading, native ordered one-row lane, direct items, optional media/text and native overflow. | Implemented, generated and validated; no component runtime. |
| Shopify | Configurable ordered blocks, unique heading association, editor attributes, optional media/text, decorative-alt intent and localized schema/fallbacks. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid and locales validated. |
| React / Angular | Passive title plus ordered step records/slots; target supplies contextual headings and media. | Direction documented; packages planned. |
| Figma | One/three/eight steps, optional content, narrow/wide, light/dark, focus and localized examples. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Target-native ordered accessible groups in a horizontal scroll container when required. | Conceptual; data and media remain target-owned. |

## Performance And Risks

- Storytelling CSS is `3,912 B / 4.2 KiB`, leaving `388 B` and adding `65 B`
  from the Batch 38 baseline.
- Complete neutral Web component CSS is `65,689 B / 64 KiB`, a `153 B` overage
  and `68 B` increase from Batch 38. The ceiling remains binding; no budget was
  rewritten. Shared-bundle optimization or an explicit owner decision is needed
  before program-level v1 certification.
- Shared neutral runtime is `10,492 B / 8 KiB`, the existing `2,300 B`
  exception. Process Timeline adds `0 B` component runtime and no asset request.
- Human review must approve the one-row lane, private minimum, `4:3` crop,
  `36px` marker, statement surface, connector, centered hierarchy, spacing,
  snap preview and absence of additional orientation/density/alignment options.

## Validation

Registry/docs, DTCG/Web component-token compatibility, 183 contracts, 183 Studio
definitions, Neutral Web and Shopify adapter generation/validation, mandatory
Shopify Liquid/locales validation, source/generated CSS identity, structural
certification, static Preview audit, exact Exhibit/Studio parity, four viewport
modes, optional/one/eight-item states, native keyboard scrolling,
localized/extreme content, RTL, zoom, light/dark contrast, forced colors,
reduced motion, deterministic gzip, global refinement audit, temporary site
build outside `site/dist`, diff checks and explicit `site/dist` cleanliness
comprise Batch 39. `site/dist` is not rebuilt or modified.
