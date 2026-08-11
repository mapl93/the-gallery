# Artist Profile Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Artist Profile (`F1`)

## Outcome

Artist Profile is reconciled as a passive, section-labelled biography with an
optional portrait, ordered rich content, a native quotation and canonical Button
actions. Its responsive split follows the component container rather than the
viewport, and adapters explicitly add the portrait-present layout modifier only
when portrait markup exists. Contract, registry, canonical CSS, MDX, shared
Exhibit/Studio renderer, Studio metadata, Shopify Liquid/locales, generated Web
and Shopify adapters, dossier, ADR, open questions and browser evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual proposal. The neutral component bundle is `85 B` over its
permanent `64 KiB` ceiling; this is an explicit program-level gap, not a silent
budget increase or a reason to remove semantic typography.

## Research And Decision

- WAI region, accessible-name and image guidance support a native section named
  by its visible heading and target-authored informative/decorative image alt.
- HTML supplies the native `blockquote` and link semantics; Artist Profile has
  no widget role or keyboard model.
- Open UI has no standardized Artist Profile primitive. Radix and Polaris
  reinforce explicit media, identity and action composition instead of a new
  cross-target profile record or interactive wrapper.
- Shopify sections, schema and `image_picker` support target-native merchant
  configuration, media alt/focal point and omitted optional output.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, found
  generic Studio/Button artwork, not Artist Profile artwork. No portrait, split,
  quotation or spacing decision was inferred from it.

ADR 0123 records the accepted safe boundary: section labelling, an isolated
inline-size container, required layout wrapper, explicit portrait-present BEM
modifier, target-owned media/rich content, contextual heading, native quotation,
canonical actions and zero component runtime.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: eleven anatomy parts, one variant, one size,
  two states, nine behaviors, seven semantic properties, twenty-four public
  tokens and Button as the one canonical dependency.
- The target supplies a unique `aria-labelledby`/heading `id` pair. The heading
  class fully restores its accepted family, size, line-height, weight, margins,
  padding and border against host documentation styles.
- `.artist-profile` establishes `container-type: inline-size`; the required
  `.artist-profile__layout` remains one column by default. Targets add
  `.artist-profile__layout--split` only with portrait markup, and it resolves to
  two equal minmax columns above the private `36rem` component threshold.
- Portrait media is omitted completely when absent. Informative/decorative alt,
  asset, focal point and loading policy remain target-owned.
- Label, name, location, multi-paragraph biography and philosophy have explicit
  semantic typography. Biography owns resilient wrapping and internal rhythm;
  the logical quote rule follows inline-start in both directions.
- The actions wrapper is an ordinary group, not a navigation landmark. Its two
  fixture destinations are native anchors using canonical Button classes.
- Site-only Artist Profile padding, gap, biography and responsive overrides are
  removed. Exhibit and Studio use the same `StorytellingStudio` renderer and
  fixture.
- Shopify conditionally emits portrait and split modifier together, associates
  the section and heading, maps every accepted field, uses rich text and
  `image_tag`, localizes fallback/schema strings and reports `implemented`,
  `section-adapter`, `ready: true`.

## Browser Evidence

### Parity And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) produce exact initial Exhibit/Studio outerHTML parity. The clean
  initial component HTML is `1,209` characters.
- Every initial render exposes one region named `Marina Paz`, one informative
  image, one contextual `H2`, one native quotation, two real links and no nested
  navigation landmark.
- Exhibit root widths are `310/688/532/536px`; Studio widths are
  `310/688/644/704px`. The layout follows actual component content width: Mobile,
  constrained Desktop and XL remain one column, while Tablet resolves to two
  `284px` columns. No root overflows.
- In the explicit wide-container probe, a `704px` root with `640px` content uses
  two `304px` columns with portrait and modifier. Removing the portrait also
  removes the modifier and yields one `640px` content column.

### Optional Content, Semantics, And Keyboard

- The minimum accepted render contains only name and biography. Portrait, label,
  location, philosophy and actions produce zero empty optional wrappers.
- The section has one resolvable heading reference and no duplicate heading id.
  Image alt is non-empty in the fixture; the action group contains no buttons or
  extra landmark, only two native destination anchors.
- Focusing the first action and pressing Enter dispatches one native click while
  preserving focus. Action order is `View works -> Studio journal`.
- The name resolves to Lora `28/35px`, weight `600`, with zero leaked margin,
  padding or border from docs-site `h2` styles.

### Content, Themes, And Preferences

- Mixed Arabic/CJK/Latin content, a long unbroken identifier and long action
  labels fit a `688px` root without component or viewport overflow. The actions
  wrap to `112px`; RTL moves the `3px` quote rule to the physical right side.
- At 200% page zoom the component reflows to one column with no component or
  viewport horizontal overflow.
- Light contrast is `16.12:1` name, `7.02:1` location/biography, `5.29:1` quote
  and `10.37:1` primary action. Dark contrast is `9.92:1`, `6.99:1`, `5.75:1`
  and `16.79:1` respectively.
- Forced colors preserves the quote boundary and a solid system focus outline;
  the final clean probe resolves a `3px` focused outline. Reduced motion resolves
  both canonical action transition durations to `0s`; Artist Profile has no
  animation of its own.
- The final browser session reports zero console errors or warnings.

Four before images, eight viewport-after images and seven special-state images
live under `output/playwright/refinement-batch-38/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Section-labelled native composition, isolated container grid, optional image, contextual heading, rich content, blockquote and canonical Buttons. | Implemented, generated and validated; no neutral runtime. |
| Shopify | Configurable section, conditional portrait/split modifier, media alt/focal point, rich text, unique heading association, localized schema/fallbacks and canonical Button. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid and locales validated. |
| React / Angular | Passive semantic fields/slots; target supplies heading element, media and destinations. | Direction documented; packages planned. |
| Figma | Portrait/text-only, optional parts, narrow/wide, light/dark, focus and localized examples. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Target-native image/text/quotation/action composition. | Conceptual; data and loading remain target-owned. |

## Performance And Risks

- Storytelling CSS is `3,847 B / 4.2 KiB`, leaving `453 B` and adding `105 B`
  from the pre-refinement baseline.
- Complete neutral Web component CSS is `65,621 B / 64 KiB`, an `85 B` overage
  and `94 B` increase from Batch 37. The ceiling remains binding; no budget was
  rewritten. A shared-bundle optimization or accepted budget decision is needed
  before program-level v1 certification.
- Shared neutral runtime is `10,492 B / 8 KiB`, the existing `2,300 B`
  exception. Artist Profile adds `0 B` component runtime and no asset request.
- Human review must approve portrait ratio/crop, equal columns, threshold,
  archival surface, radius, typography, quote rule, spacing, Button emphasis and
  the absence of alternate position/density/alignment/surface variants.

## Validation

Registry/docs, DTCG/Web component-token compatibility, 183 contracts, 183 Studio
definitions, Neutral Web and Shopify adapter generation/validation, mandatory
Shopify Liquid/locales validation, source/generated CSS identity, structural
certification, static Preview audit, exact Exhibit/Studio parity, four viewport
modes, optional-state omission, native keyboard activation, localized/extreme
content, RTL, zoom, light/dark contrast, forced colors, reduced motion,
deterministic gzip, global refinement audit, temporary site build outside
`site/dist`, diff checks, console cleanliness and explicit `site/dist`
cleanliness comprise Batch 38. `site/dist` is not rebuilt or modified.
