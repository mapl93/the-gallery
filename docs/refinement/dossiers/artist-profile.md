# Component Dossier: Artist Profile

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify section translation

Contract: `components/contracts/artist-profile.contract.json`

## Recommendation

Keep Artist Profile as a passive, editorial section for one named maker. Use a
native `section` associated with the visible artist-name heading, an internal
layout wrapper that responds to the component container, an optional portrait
whose text alternative remains target-authored, ordered biography content, an
optional semantic quotation, and an optional action slot composed from the
canonical Button component when the destinations need call-to-action emphasis.

Preserve the existing portrait-first source order and current archival surface.
Do not add an Artist Profile widget role, keyboard model, data store, heading-
level enum, portrait-position variant, size scale, social-network schema, or
target-neutral artist record. Those decisions either belong to the surrounding
document/target or would introduce a new product API without owner evidence.

The current visual direction is ready for human review: the implementation is
isolated from docs-site heading styles, the no-portrait composition fills the
available width, the neutral source owns container response, and Shopify consumes
the same anatomy and canonical Button classes. Human review must still approve
the portrait ratio and crop, wide split, archival surface, quote treatment,
action emphasis, and vertical rhythm before any `stable` promotion.

## Purpose And Limits

- Introduces one artist or maker through identity, location, authored biography,
  an optional philosophy quotation, portrait media, and contextual destinations.
- Primary contexts are collection/editorial landing pages, maker stories, studio
  introductions, and exhibition narratives.
- Artist Profile owns the narrative order, section association, media/content
  composition, optional-part resilience, container response, and content rhythm.
- The target owns artist data, rich-text sanitization, portrait asset/focal point,
  alternative text, heading rank, destination URLs, analytics, routing, and any
  future CMS or metaobject connection.
- Button owns action geometry, variants, focus, hover, disabled and busy states.
- It is not Avatar, Artist Card, an author byline, a social-link list, a contact
  card, a carousel, or a schema for an artist database.
- No neutral JavaScript, controlled state, uncontrolled state, events, live
  regions, focus movement, or reduced-motion branch is required.

## Pre-Refinement Gallery Baseline

- Registry `F1`, category `storytelling`, no declared dependencies; contract
  `0.1.0`, `pilot`; ten anatomy parts, one default variant/size/state, one
  behavior, seven properties, and seventeen public tokens.
- ADR 0080 already accepts portrait, label, name, location, biography,
  philosophy, action composition, and preserved source order. It leaves no open
  Artist Profile product boundary.
- The root itself is the grid and switches at viewport `768px`. It therefore
  responds to the page rather than its actual container.
- The optional portrait is structurally unsafe at wide sizes: removing it leaves
  the content in one half of the two-column root.
- The docs site applies higher-specificity `h2` styles to the canonical name.
  Browser evidence shows an unintended border, `40px` top margin, `8px` bottom
  padding, `20px` size, and docs line height instead of the component's declared
  heading scale.
- Site-only Storytelling CSS also replaces Artist Profile padding, gap and
  biography spacing, so the shared renderer is not yet a faithful consumer of
  canonical source CSS.
- The shared renderer uses two canonical `.btn` anchor presentations but wraps
  them in an unnecessary navigation landmark and the registry does not declare
  Button as a dependency.
- Shopify has a dedicated section and schema, but the contract says `planned`.
  The section always emits an empty portrait wrapper, hard-codes `The Maker`,
  adds an undeclared location icon, lacks section-to-heading association, and
  does not expose the contract's label property.
- Existing evidence covers only Mobile/Desktop baseline screenshots. It does not
  prove Tablet/XL, text-only composition, short/long/empty optional content,
  localized/RTL content, dark mode, forced colors, zoom, focus, or exact initial
  Exhibit/Studio DOM parity.
- Baseline deterministic gzip is `3,742 B` for Storytelling CSS against a
  `4.2 KiB` ceiling, `65,527 B` for all neutral component CSS against `64 KiB`,
  and `10,492 B` for shared neutral runtime against the existing `8 KiB`
  exception. Artist Profile itself adds no runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI region landmark example](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/region.html) and [H101](https://www.w3.org/WAI/WCAG21/Techniques/html/H101) | A native `section` becomes a region when it has an accessible name; a visible heading referenced by `aria-labelledby` is the direct technique. | Associate the section with the artist-name heading using a target-unique id. Do not add a separate hidden name. |
| [APG accessible names practice](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Names should communicate purpose, remain concise, and prefer visible labels. An article/region benefits from a useful name. | The visible artist name is the section name; action labels must identify their destinations. |
| [WAI Images tutorial](https://www.w3.org/WAI/tutorials/images/) | Informative images need a concise equivalent; decorative images use `alt=""`; purpose and surrounding context determine the choice. | Keep alternative text target-authored. Shopify uses media alt and falls back to the artist name; the neutral slot must not guess from pixels. |
| [HTML `blockquote`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element) | `blockquote` represents content quoted from another source; citation content is optional and separate. | Preserve semantic `blockquote` for the philosophy quotation. Do not synthesize a `cite` property when the surrounding artist identity already supplies context. |
| [Open UI Card research](https://open-ui.org/components/card.research/) and [component matrix](https://open-ui.org/research/component-matrix/) | Cross-system cards commonly expose media, header, metadata and actions, but Open UI has no standardized Artist Profile primitive or agreed Card anatomy. | Use ordinary semantic HTML and explicit slots; do not invent a browser-level profile role or copy a generic card API. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) and [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) | Mature composition keeps media, identity text and actions as separate parts; Avatar adds explicit image/fallback lifecycle only for compact identity imagery. | Artist Profile remains a larger editorial composition. It may reuse canonical actions but should not depend on Avatar or inherit its fallback protocol. |
| [Polaris web components](https://shopify.dev/docs/api/app-home/web-components), [Avatar](https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/avatar), and [interaction guidance](https://shopify.dev/docs/api/polaris/using-polaris-web-components) | Polaris separates media/identity from Link and Button semantics and warns against nested interactive elements. | Keep the portrait passive and compose each action as its own native anchor/Button without making the whole profile interactive. |
| [Shopify sections](https://shopify.dev/docs/storefronts/themes/architecture/sections), [section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema), and [image settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings) | Sections are merchant-configurable modules; `image_picker` returns an image with alt/focal-point data and `image_tag` preserves focal-point cropping. | Map each semantic field to a setting, preserve the image object's authored data, supply a preset, and keep the section editor-ready without target-neutral CMS assumptions. |

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct inspection shows the generic Studio shell and
the Button pilot, not Artist Profile artwork. It validates inspector grouping
and the reuse of canonical Button controls, but supplies no component-specific
evidence for portrait ratio, crop, column proportions, quote treatment, surface,
or spacing. The repository candidate therefore remains the proposal for human
visual review; no aesthetic was inferred from the unrelated frame.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `section.artist-profile` | Artist Profile / target | Associated with the visible name heading; establishes the component container and archival surface. |
| Layout | yes | `.artist-profile__layout` | Artist Profile | Internal grid keeps the root queryable and preserves source order. |
| Portrait | no | `.artist-profile__portrait` | Artist Profile / target | Omitted completely when absent; no empty placeholder in neutral Web. |
| Portrait image | conditional | native `img` | target | Informative alt or `alt=""` according to context; target owns asset, focal point and loading policy. |
| Content | yes | `.artist-profile__content` | Artist Profile | Ordered text/action column. |
| Label | no | paragraph/text | target | Editorial eyebrow, not the accessible section name. |
| Name | yes | contextual heading | target | Visible section label; class does not mandate a fixed document rank. |
| Location | no | paragraph/text | target | Human-readable content; no required icon or machine-readable address contract. |
| Biography | yes | rich-content slot | target | Sanitized paragraphs/lists/inline semantics; Artist Profile owns only vertical rhythm and containment. |
| Philosophy | no | native `blockquote` | Artist Profile / target | Short quotation whose author is understood from the surrounding profile. |
| Actions | no | ordinary group | target / Button | No extra `nav` landmark; each destination/action retains its own native semantics. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one default editorial treatment. Portrait position, column ratio,
  compact density and alternate surfaces are not accepted public options.
- Required content: name plus non-empty biography. Heading rank and rich-text
  element choices remain target context.
- Portrait: informative image; decorative image; or omitted. Omission collapses
  the wide grid to one content column.
- Optional content: label, location, philosophy and actions independently present
  or absent without empty wrappers.
- Actions: none; one destination; or a short wrapped set of canonical Buttons.
  Link-style text can remain target composition when lower emphasis is desired.
- Container: narrow single column; wide two-column media/content split. Response
  follows the component content box, not viewport width.
- Content extremes: short and long names, multi-paragraph/list biography, long
  unbroken tokens, localized scripts, long action labels, and empty optional
  fields must not overflow.
- Themes: semantic colors inherit light/dark source modes. Forced colors must
  preserve portrait boundary, quote boundary and canonical action focus.
- Reduced motion: not applicable to Artist Profile itself; composed Button owns
  its own preference behavior.
- RTL: source order remains portrait then content. Text direction follows
  authored content and the quotation border uses the logical inline-start side.

## Public API And State Ownership

Keep the seven accepted semantic properties:

- `portrait` — optional target-owned media slot.
- `label` — optional editorial eyebrow.
- `name` — required artist display name and visible section heading.
- `location` — optional human-readable location.
- `biography` — required rich-content slot.
- `philosophy` — optional quotation string.
- `actions` — optional target-owned action composition using canonical controls.

Do not add `artist`, `artistId`, `headingLevel`, `portraitAlt`, `portraitPosition`,
`imageRatio`, `alignment`, `surface`, `socialLinks`, `works`, `loading`, or
`onAction` properties. The media slot already carries native alt/focal-point data;
heading rank belongs to the containing document; destinations and artist records
belong to the target; layout and surface are currently single accepted choices.

Artist Profile is passive and has no controlled/uncontrolled strategy. Server or
CMS data is rendered directly. Action activation is native Button/anchor behavior,
not an Artist Profile event. A framework adapter may accept typed slot content,
but must not create duplicate internal artist state.

## Token And Value Audit

- Public colors: archival surface, primary/secondary text, accent text and
  decorative border. Secondary can be inherited by label/location/biography;
  name and quotation override it intentionally.
- Public typography: heading family/size/line-height/weight, article size/line-
  height, body size/line-height for location, caption size/line-height/weight,
  accent family, and supporting quote size/line-height.
- Public spacing: container inset, section inset, grid gap and element gap.
- Public radius: the existing large portrait radius.
- The `3 / 4` portrait ratio, `3px` quote rule, `0.1em` label tracking, italic
  quote style and `36rem` layout threshold remain private composition. They are
  not broadly useful cross-target controls and would create incoherent public
  combinations if exposed independently.
- Replace the label's calculated `75%` body size with the existing caption token;
  use existing line-height and weight source tokens to prevent host-style drift.
- Remove the one-use private background alias. Keep no color, spacing or radius
  literal that duplicates an accepted semantic token.
- Storytelling family budget is `4.2 KiB` gzip; complete neutral component CSS is
  capped at `64 KiB`. The final family measurement passes at `3,847 B`. The full
  bundle is `65,621 B`, an explicit `85 B` gap; the ceiling was not rewritten
  and semantic typography was not removed to manufacture a pass.

## Accessibility And Interaction

- Associate the native section with the visible artist-name heading through a
  target-unique id. Do not add a redundant `aria-label`.
- Use a document-appropriate native heading level. The class controls appearance,
  not outline rank.
- Keep the portrait non-interactive. Supply useful alt when it adds identity or
  context; use empty alt only when adjacent content makes it decorative.
- Preserve media-before-content DOM order at every container size.
- Use `blockquote` only for an actual quotation; ordinary emphasis belongs in
  biography rich text.
- Do not turn the action group into a navigation landmark. Native anchors with
  href remain keyboard reachable and Button owns visible focus.
- Long localized content and 200% zoom must reflow without viewport overflow or
  horizontal scrolling.
- Artist Profile adds no custom keyboard behavior, focus movement, ARIA widget
  role, live announcement, animation, or reduced-motion workaround.

## Responsive And Performance

- Add a required layout wrapper so the root can establish an inline-size
  container and its descendant grid can switch at a private `36rem` content-box
  threshold.
- Narrow mode stacks portrait then content. Wide mode uses two minmax columns and
  vertically centers the two regions.
- When portrait is absent, the layout remains one full-width content column at
  every size through structural CSS, not JavaScript.
- Biography and action content wrap intrinsically; action Buttons may wrap as a
  group while each label remains usable.
- DOM/work is constant in the component shell and linear only in target-provided
  rich content/actions. There are no listeners, observers, layout reads, image
  transforms, requests, timers, or component assets.
- Neutral runtime contribution remains `0 B`. Native image loading and navigation
  remain target/browser responsibilities.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Section-labelled native composition, internal container-responsive layout, optional native image, contextual heading, rich content, blockquote, canonical Button actions. | Implemented, generated, browser-verified and ready for human review. |
| Shopify | Dedicated configurable section using `image_picker`, text/richtext/URL settings, unique heading association, image alt/focal point, canonical Button class and omitted empty wrappers. | `implemented`, `section-adapter`, target-ready; Liquid and locales validated. |
| React / Angular | Passive component accepting semantic fields and native/rich-content slots; target supplies heading element and action destinations. | Planned; no local state or lifecycle service required. |
| Figma | Portrait/text-only, short/long biography, optional quote/actions, narrow/wide, light/dark and focus examples. | Planned; registered reference is generic Studio artwork. |
| SwiftUI / Compose | Native section/layout with image, text hierarchy, quotation and target-native links/buttons. | Conceptual; CMS/image loading remains target-owned. |

## Exhibit And Studio Parity

- Exhibit and Studio keep one `StorytellingStudio` renderer, one fixture and
  exact initial outerHTML parity at all four required viewports.
- The fixture should expose the complete initial anatomy, real editorial media,
  two biography paragraphs, semantic quotation and two canonical Button anchors.
- Studio controls may toggle optional slots and edit text only through the seven
  accepted properties. The required biography remains present in evidence even
  if the generic slot control can temporarily hide it for resilience testing.
- Remove Artist Profile-specific padding, gap, biography and container overrides
  from site CSS so both modes render the canonical source implementation.
- The docs site may intercept fixture navigation, but that interception is not
  component runtime and may not change href, role, keyboard order or focus style.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Docs `h2` styles override the canonical artist name. | high | Fully define/reset canonical name typography with sufficient component specificity. | implementable now |
| Viewport query ignores actual component width. | high | Introduce internal layout and root container query. | implementable now |
| Optional portrait leaves an empty wide column. | high | Omit wrapper and collapse layout structurally when portrait is absent. | implementable now |
| Site-only padding/gap/biography/container rules hide source behavior. | high | Remove Artist Profile from those site overrides. | implementable now |
| Default actions compose Button without a registry dependency. | medium | Declare Button dependency and keep native destination anchors. | implementable now |
| Action group creates an unnecessary `nav` landmark. | medium | Use an ordinary group; controls retain native semantics. | implementable now |
| Shopify adapter is real but marked planned and drifts from the contract. | high | Reconcile label, optional wrappers, unique section name, media alt/focal point and canonical Button markup; mark implemented. | implementable now |
| Figma reference is generic and supplies no Artist Profile artwork. | medium | Keep repository candidate and request only human aesthetic approval, not implementation input. | human review |
| Portrait ratio/crop, surface, quote rule and action emphasis are unapproved. | medium | Preserve current proposal and record explicit human-review questions. | owner visual review |

## Human Review Questions

- Approve or revise the `3:4` portrait ratio and target-owned `cover` crop.
- Approve equal wide columns and the private `36rem` content-container threshold.
- Approve the archival surface, large portrait radius and current section insets.
- Approve caption-uppercase label treatment and heading/article scale.
- Approve italic accent quotation with logical inline-start decorative rule.
- Approve primary plus outline Button emphasis and action-group wrapping.
- Confirm that portrait position, compact density, alignment and alternate surface
  should remain absent from the v1 public API.

## Exit Criteria

- Contract, registry, canonical CSS, MDX, Studio metadata/renderer and Shopify
  section agree on anatomy, Button dependency, target ownership and adapter state.
- Section association, heading isolation, portrait/no-portrait, optional content,
  native actions, RTL/logical rule, zoom/reflow, light/dark, forced colors and
  reduced-motion non-applicability are verified in a real browser.
- Exhibit and Studio initial DOM are identical at Mobile, Tablet, Desktop and XL;
  screenshots plus special-state evidence are retained outside `site/dist`.
- Contract/docs/Studio, Web adapter, Shopify adapter and mandatory Shopify theme
  validation pass; source/generated Storytelling CSS are byte-identical.
- Storytelling remains within its permanent gzip ceiling; the measured `85 B`
  global CSS overage is explicit in the dossier/report and runtime adds zero
  component bytes.
- Dossier/report/matrix are updated to `human-review-ready`; contract remains
  `pilot` until explicit owner approval.

## Certification Result

- Canonical CSS, contract `0.2.0`, registry, MDX, Studio metadata/renderer,
  Shopify section/locales and both generated adapters agree on eleven anatomy
  parts, two portrait states, nine behaviors, seven properties, twenty-four
  public tokens and Button as the one dependency.
- Exact Exhibit/Studio outerHTML parity passes at Mobile, Tablet, Desktop and
  XL. The initial component HTML is `1,209` characters and exposes one region
  named by the artist heading, one informative image, one quote, two links and
  no nested navigation landmark.
- A `640px` content box resolves to two `304px` columns only with portrait and
  `.artist-profile__layout--split`; removing both returns one `640px` column.
  The minimum render contains only name/biography and zero empty optional shells.
- Arabic/CJK/Latin extremes, an unbroken identifier, long actions, RTL logical
  border and 200% zoom produce no component or viewport horizontal overflow.
- Light/dark text, quote and primary-action contrast pass. Forced colors retains
  a system focus outline and quote boundary; reduced motion resolves canonical
  action transitions to `0s`. The final console has zero errors or warnings.
- Storytelling CSS is `3,847 B / 4.2 KiB`; neutral component CSS is
  `65,621 B / 64 KiB`; shared runtime is the existing `10,492 B / 8 KiB`
  exception and Artist Profile contributes `0 B` runtime.
