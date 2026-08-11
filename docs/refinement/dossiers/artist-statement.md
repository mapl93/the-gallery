# Component Dossier: Artist Statement Section

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/artist-statement.contract.json`

## Recommendation

Refine Artist Statement as a passive, heading-labelled native section whose
required artist name and statement body remain understandable without portrait,
quotation, signature, CSS, JavaScript, or framework state. Keep the six existing
semantic properties. Make optional portrait composition explicit, let the inner
layout respond to the component's own width, and keep the portrait sticky only in
the wide split mode.

The repository candidate can be corrected without an owner decision. Portrait
ratio/crop, one-third/two-thirds split, sticky treatment, type hierarchy, quote
rule, content measure and private split threshold remain candidates for human
visual review. The component must remain `pilot` until that review.

## Purpose And Limits

- Present a first-person artist statement with a clear artist identity and rich
  editorial body.
- Support an optional contextual portrait, editorial label, highlighted excerpt
  and visual signature/artist mark.
- Use Artist Profile when biography, location, philosophy and destinations are
  the primary content. Artist Statement is authored narrative, not a profile,
  card, authentication record or verification surface.
- Keep heading rank, rich-text sanitization, image source/intrinsic dimensions,
  responsive candidates, focal point, loading priority and image alternative
  purpose target-owned.
- Do not add biography fields, links, actions, social profiles, CMS records,
  authenticity claims, handwriting recognition, image URLs, framework callbacks
  or controlled/uncontrolled state to the neutral contract.
- A signature slot is editorial presentation only. It does not attest identity,
  ownership, authenticity or cryptographic signing.

## Current Gallery Baseline

- Registry: `F8`, `artist-statement`, category `storytelling`, no dependencies.
  Its description incorrectly calls the component an artist biography.
- Contract: `0.1.0`, `pilot`, 11 anatomy parts, one default variant/size/state,
  one narrative-order behavior, six semantic properties and 16 public tokens.
- Canonical source: `components/css/storytelling.css` under
  `.artist-statement`.
- Baseline layout uses a viewport `767px` media query. A narrow embedded
  instance inside a wide viewport therefore needs a docs-site correction.
- The optional portrait is not represented by a layout modifier. When portrait
  is absent at wide widths, the required content occupies only the first grid
  track instead of the available measure.
- Canonical CSS contains unexplained `8/16/24/32px`, `200/300px`, `3px`,
  `1.5`, `1.25em`, `0.1em`, `600` and `767px` literals; type ownership is
  incomplete and physical left properties are used for the quote rule.
- `site/src/styles/studio.css` recreates responsive column and portrait rules,
  so canonical and docs-site layout authorities conflict.
- Exhibit and Studio already mount the same `StorytellingStudio` renderer and
  fixture. The default candidate is passive with zero component focus stops.
- MDX fallback uses the canonical anatomy but lacks a portrait-presence modifier
  and gives the textual signature a redundant `aria-label`.
- Neutral Web is marked implemented. Shopify currently receives copied CSS but
  the contract is marked planned despite the component mapping directly to a
  merchant-configurable content section.
- Global baseline evidence reports a structural pass but only mobile/desktop
  baseline screenshots; no dossier or refinement override exists.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML sections](https://html.spec.whatwg.org/dev/sections.html) | A thematic section should be identified by its contextual heading; heading rank belongs to the document outline. | Use a native `section` labelled by the required artist-name heading; do not freeze the public heading level. |
| [HTML block quotations](https://html.spec.whatwg.org/dev/grouping-content.html#the-blockquote-element) | `blockquote` represents content quoted from another source; any attribution belongs outside the quotation. | Use `blockquote` only for a real artist quotation. Keep the name/signature outside it and do not synthesize `cite`. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Alternative text depends on the image's purpose and context; decorative images use `alt=""`. | Targets decide whether the portrait is informative. A redundant signature image is normally decorative when the required visible name already identifies the artist. |
| [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widget patterns, not an artist-statement widget. | No ARIA widget role, keyboard model, focus management or controlled state belongs in the passive core. |
| [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | Size queries allow descendants to respond to the containing component rather than the page viewport. | Establish one inline-size container and apply the split only when portrait is present and the component is wide enough. |
| [CSS positioned layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) | Sticky content can add repaint/accessibility cost and must not obscure content at zoom. | Restrict sticky portrait presentation to the wide split, preserve source order and verify zoom-equivalent narrow containers. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Open UI does not establish a universal Card anatomy, much less an artist-statement contract. | Do not turn the section into a generic Card or infer interaction from its visual composition. |
| [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Radix treats media ratio as a small composition primitive with an arbitrary ratio rather than identity/content semantics. | Keep portrait ratio private and media target-owned; no React dependency or public ratio property is justified. |
| [Polaris Media Card](https://polaris-react.shopify.com/components/layout-and-structure/media-card) | Polaris pairs visual and written regions and requires written content to stand alone, but its admin actions/dismissal API serves a different product purpose. | Preserve independent text meaning and explicit media composition without copying actions, dismissal or fixed heading rank. |
| [Shopify theme architecture](https://shopify.dev/docs/storefronts/themes/architecture) | Sections are merchant-configurable modules; settings, media and schema belong to the target adapter. | A dedicated section can map the six semantic properties plus target-only media intent without changing the neutral API. |
| [Shopify `image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) | `image_url`/`image_tag` provide responsive image output and loading policy informed by section location. | The adapter should preserve merchant image metadata, generate responsive widths and avoid neutral runtime. |

### Mature-System Comparison

- Native HTML supplies every durable semantic needed: section, contextual
  heading, rich flow content, quotation and image.
- Open UI and WAI-ARIA define no Artist Statement widget or universal Card
  activation model.
- Radix isolates media geometry; Polaris composes media and independent written
  content. Neither supports making crop, URL, heading rank or every spacing
  literal part of the neutral semantic API.
- Shopify supports a target-native content section with editor settings, but
  those settings remain a Liquid/data mapping rather than canonical source.
- No reference supports viewport-owned reflow, an empty portrait column,
  redundant ARIA labels, framework state or an authenticity meaning for the
  signature slot.

### Owner Reference Analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Read-only inspection finds the frame
`02 / Component Detail - Studio`, Button-oriented Content/Presentation/Layout/
Appearance controls and no Artist Statement, portrait, quote or signature
design evidence. The reference validates the Studio shell only. Repository
before/after evidence remains the visual candidate for owner review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | heading-labelled `section.artist-statement` | Artist Statement | Passive thematic section; target supplies a unique heading `id`. |
| Layout | yes | neutral layout wrapper | Artist Statement | One column by default; explicit portrait modifier enables wide split. |
| Portrait | no | media wrapper | target | Omitted completely when absent; remains before content in source order. |
| Portrait image | conditional | `img`, `picture` or target media | target | Target owns alt purpose, intrinsic dimensions, source set, focal point and loading. |
| Content | yes | ordered content group | Artist Statement | Full-width readable measure when portrait is absent. |
| Eyebrow | no | short text | target | Editorial classification, omitted when empty. |
| Artist name | yes | contextual heading | target | Names the section; heading level follows the surrounding document. |
| Quote | no | `blockquote` | target | Only for content genuinely quoted from the artist/source. |
| Body | yes | rich-content slot | target | Owns prose semantics and sanitization; empty required content is invalid. |
| Signature | no | text or media slot | target | Editorial mark only; omitted when absent. |
| Signature image | conditional | `img` inside signature | target | Decorative when redundant; otherwise requires an equivalent text alternative. |

No canonical component dependency is required. The section does not duplicate
Artist Profile, Card, Avatar, Button or Certificate markup/behavior.

## Variant, Size, State, And Mode Matrix

- Variant and size: default only; available width is determined by the host.
- Portrait: absent (one readable content column) or present (stacked narrow,
  one-third/two-thirds split wide, sticky portrait only wide).
- Optional content: eyebrow, quote and signature independently present/absent;
  no empty wrappers.
- Required content: artist name and body. Targets should reject or omit an
  invalid instance rather than present an unexplained empty section.
- Media purpose: informative or decorative; failed/missing media removes the
  optional portrait wrapper where the target can detect it.
- Signature: text, target image/media or absent. It never changes component
  authenticity state.
- Themes/preferences: light, dark, forced colors and reduced motion. The
  component authors no motion.
- Responsive: isolated narrow/medium/wide containers plus Mobile, Tablet,
  Desktop and XL docs shells; source order remains portrait then narrative.
- Unsupported: loading, selected, expanded, disabled, busy, error, validation,
  interaction, destination, controlled/uncontrolled, CMS synchronization and
  authentication states.

## Public API And State Ownership

Keep the existing six properties:

- `portrait` — optional target-owned media slot.
- `eyebrow` — optional short editorial string.
- `name` — required artist display name and contextual heading content.
- `quote` — optional genuine quotation string/content.
- `body` — required target-owned rich content.
- `signature` — optional target-owned text or media mark.

Do not add `headingLevel`, `layout`, `columns`, `sticky`, `ratio`, `crop`,
`focalPoint`, `imageUrl`, `imageAlt`, `loading`, `signatureAlt`, `href`, events,
CMS records or framework callbacks. Portrait presence maps to an implementation
modifier, not a new semantic property. The neutral component has no state or
controlled/uncontrolled strategy.

## Token And Value Audit

- Use existing semantic text, decorative-border, heading/accent/body families,
  caption/heading/article weights, sizes and line heights.
- Use layout content, container inset, section and element spacing plus the
  existing medium radius.
- Replace public `--layout-gutter`/body-size leakage that canonical CSS no longer
  needs; add only the semantic type tokens actually consumed.
- Keep the `3:4` portrait ratio, `42rem` split threshold, one-third/two-thirds
  track ratio, `42rem` narrative measure, quote-rule thickness, editorial
  tracking, body block rhythm and signature image cap private.
- Express repeated rhythm from existing spacing/type tokens where practical.
  Document irreducible geometry instead of publishing one token per literal.
- Physical `border-left`, `padding-left` and `top` become logical properties.

## Visual And Content Audit

- Preserve a calm editorial hierarchy: portrait context, small label, artist
  identity, highlighted quote, full statement and restrained mark.
- Verify portrait crop, radius, sticky behavior and source-order continuity.
- Constrain no-portrait prose to a readable measure rather than filling the full
  `1200px` container or occupying a stale one-third track.
- Reset component heading/paragraph/blockquote margins so host documentation
  styles cannot change the component.
- Test short copy, multi-paragraph long copy, localized/RTL prose, long artist
  names, unbroken content, empty optional regions, portrait absence and both
  textual/decorative signature presentations.
- Fixture photography is informative only when its description truthfully
  describes the scene. A fictional artist identity must not be inferred from
  repository media.

## Accessibility And Interaction

- Associate the section with the required artist-name heading through a
  target-unique `aria-labelledby`/`id` pair in complete adapters/fixtures.
- Keep the heading level contextual. CSS classes own visual hierarchy regardless
  of whether a target chooses `h2`, `h3` or another valid level.
- Use `blockquote` only for quoted content; attribution remains outside.
- Determine portrait/signature alt from purpose. Empty alt is correct for a
  decorative or redundant image, not for informative portrait content.
- Remove redundant `aria-label` from visible textual signatures. Do not claim
  “signed by” unless the target content genuinely carries that meaning.
- No focus stops, keyboard model, live region or pointer behavior belong to the
  passive component. Target descendants retain their own native semantics.
- Verify primary/secondary text and decorative rule contrast in light/dark;
  forced colors must keep the quote boundary perceivable.
- Sticky presentation must not obscure content under zoom/reflow. Reduced motion
  is naturally satisfied because there are no transitions or animations.

## Responsive And Performance

- Root establishes `container-type: inline-size`; an explicit layout modifier
  splits only when portrait exists and the component content box is wide enough.
- Mobile/Tablet/Desktop/XL evidence covers docs-shell contexts. Isolated
  `260/320/520/720/900px` hosts prove container ownership and portrait absence.
- Portrait remains before narrative in source/reading order; no CSS reordering.
- Passive runtime budget is `0 B`: no JavaScript, listener, observer, timer,
  request, animation or component asset.
- Consumer portrait/signature media are data, not bundled assets. Web/Shopify
  adapters should supply intrinsic/responsive image facts.
- Storytelling CSS ceiling remains `4.2 KiB` gzip; total neutral components CSS
  remains `64 KiB`; shared runtime remains `8 KiB`. Existing overages stay
  explicit and cannot be hidden by resetting budgets.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Labelled native section, explicit optional-portrait modifier, rich-content slot, genuine quotation and container-responsive CSS. | Implemented, generated and validated; zero component runtime. |
| Shopify | Merchant section with localized portrait intent, eyebrow, name, quote, rich body and optional text/image signature; responsive `image_tag`; no JS. | Implemented as a localized target-native section; generated adapter and official validation pass. |
| React / Angular | Contextual semantic wrapper and children/slots; target owns heading element, rich-text sanitization and image component. | Planned; no framework state belongs in the base contract. |
| Figma | Portrait present/absent, optional content, narrow/wide containers, long/localized/RTL text and mark modes. | Planned; registered reference contains no component-specific visual evidence. |
| SwiftUI / Compose | Passive semantic group with target image and attributed-text composition; contextual accessibility heading. | Conceptual; media/data lifecycle remains target-owned. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one fixture and exact initial DOM for
  Exhibit and Studio.
- Add the portrait modifier only when the shared fixture renders portrait.
- Keep fixture image description truthful to the scene rather than asserting
  the pictured person is the fictional artist.
- Remove site-owned responsive columns, portrait position/max width and canonical
  signature typography. Site CSS may keep only frame padding and fixture media.
- Studio exposes the six semantic values/slots and a curated set of declared
  public tokens. It must not publish the split threshold, track ratio, sticky
  behavior, crop, quote thickness or private spacing as properties.
- Align MDX fallback semantics and omission behavior; it remains fallback/audit
  evidence rather than a second runtime implementation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Narrow embedded candidates depend on viewport and Studio CSS repairs. | high | Move reflow to canonical container query and delete site layout overrides. | implementable now |
| Portrait absence leaves required content in a stale grid track. | high | Add explicit portrait-presence modifier and one-column fallback. | implementable now |
| Registry calls the component a biography. | medium | Describe authored statement purpose and keep Artist Profile boundary explicit. | implementable now |
| CSS has incomplete typography, physical quote geometry and unexplained literals. | medium | Use semantic tokens/logical properties; classify remaining private geometry. | implementable now |
| Text signature has redundant “Signed by” ARIA labelling. | medium | Use visible text without replacement label; reserve image alt for target purpose. | implementable now |
| Shopify is marked planned despite a direct content-section mapping. | medium | Add localized target-native section and validate it without changing neutral API. | implementable now |
| Figma contains no Artist Statement evidence. | human review | Use repository evidence as candidate and request explicit visual approval. | owner |
| Portrait/split/sticky/type/quote visual direction is not human-approved. | human review | Keep values private, document alternatives and leave contract `pilot`. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: 12 anatomy parts, two portrait states, six
  behaviors, six semantic properties and 23 declared public tokens.
- The shared candidate is a native heading-labelled `section`; required content
  is name plus rich body and every optional region disappears without an empty
  wrapper.
- An explicit portrait modifier enables the wide `1:2` composition only at the
  private `42rem` component threshold. Without portrait, the narrative keeps its
  readable measure and uses the available column.
- Canonical CSS owns typography, logical spacing, robust wrapping, portrait
  geometry, quote rule, signature presentation, container response and forced
  colors. Studio retains only site-frame presentation.
- Exhibit and Studio use the same `StorytellingStudio` renderer and fixture; the
  default `outerHTML` hash is identical in all four docs viewports.
- Shopify now has a localized section with responsive portrait output, explicit
  image intent, rich text and mutually exclusive text/image signature. Empty
  required body content is omitted from the storefront and explained only in
  design mode.
- ADR 0131 records the passive/container-responsive boundary and preserves every
  visual/API question that still belongs to human review.

## Evidence And Validation

- Before artifacts: eight Exhibit/Studio captures at Mobile `390x844`, Tablet
  `768x1024`, Desktop `1280x1000` and XL `1600x1080` under
  `output/playwright/refinement-batch-46/before/`.
- Final artifacts: eight Exhibit/Studio captures at the same four viewports plus
  twelve no-portrait, minimal, isolated-container, localized RTL, signature
  image, dark, forced-color and reduced-motion captures under
  `output/playwright/refinement-batch-46/after/`.
- Initial Exhibit/Studio `outerHTML` is byte-identical with SHA-256
  `8033cf7cab6b55b977098505bc4a17587af773c6daa96f3f21243e6f19aaceaf`.
  Every probed root is a heading-labelled `SECTION`, preserves portrait then
  content source order, has zero neutral focus stops and has equal client/scroll
  width.
- Isolated `260/320/520px` hosts remain one column with a static portrait;
  `720/900px` hosts resolve the intended `1:2` tracks and sticky portrait.
- No-portrait and minimal modes remove absent wrappers. A `320px` localized RTL
  fixture with long and unbroken content has no overflowing descendant. The
  decorative signature-image fixture resolves to the private `200px` cap.
- Primary/secondary text contrast is `17.93:1 / 7.81:1` in light and
  `17.18:1 / 12.09:1` in dark. The decorative quote rule is `2.40:1` light and
  `3.49:1` dark; it does not communicate state or information. Forced colors
  maps the rule to a `2px` system-color boundary.
- Reduced motion reports zero animations and a maximum `0s` transition. The
  passive component adds no JavaScript, listener, observer, timer or request.
- Registry/docs/contracts/Studio, Neutral Web, Shopify, structural/static/parity/
  refinement audits, official Shopify validation, deterministic gzip, a
  temporary site build outside `site/dist`, diff checks and a clean final
  component console comprise the completed technical gate.

## Risks And Open Questions

- Human review must approve or revise the private `3:4` crop, sticky portrait,
  one-third/two-thirds wide split, `42rem` threshold/measure, section inset,
  heading/quote/body hierarchy, quote rule and signature treatment.
- Confirm that layout, portrait side, ratio, crop, sticky behavior, heading rank,
  quote attribution, signature medium and density remain outside the v1 neutral
  API.
- Shopify's section can map merchant content directly, but a future shared artist
  record/metaobject remains an independent architecture decision and is not
  inferred here.
- Figma component production and human visual approval remain pending.

## Readiness Decision

Ready for human review, but not approved and not `stable`. The safe technical
refinement, target mapping and evidence gate are complete. Human review must
approve or revise the private visual candidates and confirm that they remain
outside the v1 neutral semantic API.
