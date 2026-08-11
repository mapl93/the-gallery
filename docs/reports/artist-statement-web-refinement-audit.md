# Artist Statement Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-15

Component: Artist Statement Section (`F8`)

## Outcome

Artist Statement is reconciled as a passive, heading-labelled artist-authored
narrative with required name and rich body, optional portrait, editorial label,
genuine quotation and text/image signature. Portrait absence, intrinsic
component-width reflow, canonical typography, source order, content resilience,
accessibility, shared Exhibit/Studio rendering and a target-native Shopify
section are implemented and evidenced.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the portrait crop, split, sticky treatment, type hierarchy, quote rule,
rhythm and signature presentation. It must also confirm that those internal
visual decisions remain outside the v1 semantic API.

## Research And Decision

- [Native HTML sections](https://html.spec.whatwg.org/dev/sections.html) and
  [block quotations](https://html.spec.whatwg.org/dev/grouping-content.html#the-blockquote-element)
  supply the durable thematic and quotation semantics. Heading rank remains
  contextual; attribution remains outside `blockquote`.
- The [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) makes image
  purpose contextual. Targets own portrait alt; a signature image redundant
  with the visible required name is decorative.
- WAI-ARIA APG defines no Artist Statement widget. The passive core has no role,
  keyboard model, focus management, live region or controlled state.
- [CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
  support component-owned reflow. The split cannot depend on a wide page
  viewport.
- Open UI Card research does not converge on universal content anatomy. Radix
  isolates aspect ratio, while Polaris composes media with independently useful
  written content; neither justifies actions or public internal geometry here.
- [Shopify theme architecture](https://shopify.dev/docs/storefronts/themes/architecture)
  supports a merchant-configurable section, and [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag)
  supports responsive target media without neutral runtime.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480` found only the generic Button Studio prototype and no
  Artist Statement, portrait, quote or signature evidence.

ADR 0131 records the safe boundary: passive heading-labelled composition,
explicit optional portrait, container-responsive stacked/split modes, wide-only
sticky portrait, target-owned media/rich content and zero neutral runtime.

## Contract And Implementation Result

- Registry description now distinguishes authored statement from biography and
  Artist Profile.
- Contract `0.2.0` remains `pilot`: 12 anatomy parts, one default variant/size,
  two portrait states, six behaviors, six semantic properties and 23 declared
  public tokens.
- The root is a target-ID-labelled native `section`. Required name and rich body
  remain meaningful with CSS, portrait, quote, signature and JavaScript absent.
- Portrait presence applies `.artist-statement__layout--with-portrait`. Absence
  leaves one readable full-width narrative column instead of an empty grid track.
- Portrait then content is the authoritative DOM/source order in every mode.
  CSS never reorders them.
- A private `42rem` content-box query enables the `1:2` wide split and sticky
  portrait. Narrow and medium hosts remain stacked with static media.
- Canonical CSS owns complete caption/heading/quote/article/signature typography,
  logical spacing, robust wrapping, portrait `3:4` crop, quote rule, narrative
  measure, signature-image cap and forced-color boundary.
- The quote contains a paragraph. Text signature uses its visible content
  without a redundant replacement label. The fixture portrait description is
  truthful to the scene and does not identify a fictional artist.
- Studio exposes six semantic values/slots and curated declared token controls.
  It does not expose threshold, ratio, columns, crop, sticky behavior, quote
  thickness, URLs, alt policy or target events.
- MDX fallback, shared renderer, contract, Studio metadata, registry and source
  CSS agree. Site CSS no longer repairs canonical columns, portrait geometry or
  signature typography.

## Browser Evidence

### Parity, Semantics And Docs Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1280x1000`) and XL
  (`1600x1080`) produce exact initial Exhibit/Studio `outerHTML` parity with
  SHA-256 `8033cf7cab6b55b977098505bc4a17587af773c6daa96f3f21243e6f19aaceaf`.
- Candidate widths are `310/310`, `688/688`, `372/484` and `536/704px` for
  Exhibit/Studio. Every candidate has equal client/scroll width and zero neutral
  focusable descendants.
- Every shared tree is a `SECTION` labelled by its contextual `H2`, with one
  portrait, one genuine quotation and portrait-then-content source order.
- Docs candidates remain stacked because their actual content boxes are below
  the private threshold, even where the page viewport is desktop or XL. This is
  container ownership, not a viewport fallback.

### Optional Content, Containers And Extreme Content

- Portrait-off removes the media wrapper and modifier. The `484px` Studio
  candidate becomes one `436px` narrative track with no overflow or focus stop.
- Minimal mode removes portrait, eyebrow, quote and signature, leaving only the
  required heading/body and no empty optional wrapper.
- Isolated `260/320/520px` hosts have equal client/scroll widths, one content
  track and static portrait. At `720/900px`, the component resolves
  `192+384px / 252+504px` tracks and sticky portrait.
- Source order remains portrait then content in every isolated host. The
  portrait narrows intrinsically at `260/320px`, caps at `300px` in the stacked
  `520px` host and follows its grid track in wide mode.
- A `320px` RTL fixture with long Arabic strings and an unbroken Latin identifier
  has no overflowing descendant and preserves source order.
- The signature-image mode uses a decorative empty alt and resolves the private
  `200px` inline cap without overflow.

### Contrast And Preferences

- Primary/secondary text on the primary surface measures `17.93:1 / 7.81:1`
  light and `17.18:1 / 12.09:1` dark. Quote text matches secondary contrast and
  body text matches primary contrast.
- The decorative quote rule measures `2.40:1` light and `3.49:1` dark. It does
  not communicate state, grouping required for comprehension or other
  information; quoted semantics and indentation remain without color.
- Forced colors maps text and the `2px` quote rule to system CanvasText, with no
  overflow or authored animation.
- Reduced motion reports zero subtree animations and a maximum `0s` transition.
  Artist Statement authors no motion or component runtime.
- Eight before images, eight final viewport images and twelve special-mode
  images live under `output/playwright/refinement-batch-46/`.
- The final isolated component console reports zero errors and zero warnings.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Labelled section, explicit portrait modifier, genuine quotation, rich content and container-responsive passive CSS. | Implemented, generated and validated; no component runtime. |
| Shopify | Localized merchant section with responsive portrait, image intent, eyebrow, name, quote, rich body and mutually exclusive text/image signature. | Target-native and validated; public invalid empty-body output is omitted while design mode provides guidance. |
| Webflow | Canonical target-agnostic CSS with target-authored semantic content and media. | Generated path remains available; CMS/image mapping stays target-owned. |
| React / Angular | Contextual section/heading and children/slots; target owns rich-text sanitization and image component. | Planned; no framework state/callback belongs in the base contract. |
| Figma | Portrait present/absent, optional-content combinations, narrow/wide containers, localized extremes and signature modes. | Planned; registered artwork contains no component-specific evidence. |
| SwiftUI / Compose | Passive semantic group with target image and attributed-text composition. | Conceptual; media/data lifecycle remains target-owned. |

Neutral Web embeds source CSS once. Shopify's generated `storytelling.css` is
byte-identical to canonical source. The Shopify adapter now reports 56
target-ready components, 28 dedicated Liquid templates and 19/19 schema-ready
components. Its official file validation passes; no Artist Statement JavaScript
is added.

## Performance And Risks

- Storytelling CSS is `4,805 B / 4.2 KiB`, a `504 B` exception and `+53 B` from
  Batch 45.
- Complete neutral Web component CSS is `67,780 B / 64 KiB`, a `2,244 B`
  current program gap and `+1,078 B` from Batch 45's recorded bundle.
- Shared runtime is `10,580 B / 8 KiB`, the existing `2,388 B` exception and
  `+88 B` from Batch 45's recorded bundle. Artist Statement itself adds `0 B`,
  listener, observer, timer or request.
- Human review must approve portrait crop/radius/sticky behavior, split ratio and
  threshold, content measure/inset, type hierarchy, quote rule and signature
  treatment.
- Owner/architecture must confirm that portrait side, layout modes, ratio, crop,
  focal point, sticky behavior, heading rank, quote attribution, signature
  medium, media URLs/alt/loading and events remain outside the neutral v1 API.
- A future shared artist record/metaobject remains an independent target
  architecture decision; the Shopify section does not infer it.

All ceilings remain unchanged. Existing Storytelling/global/runtime overages are
explicit program gaps rather than silently raised budgets.

## Validation

Registry/docs, source tokens, 183 contracts, 183 Studio definitions, Neutral
Web, Shopify and copied CSS, mandatory Shopify documentation research and
official validation, structural/static/parity/refinement audits, exact
four-viewport DOM parity, semantic/optional probes, isolated containers, narrow
reflow, localized RTL extremes, light/dark contrast, forced colors, reduced
motion, deterministic gzip, source/generated identity, temporary site build
outside `site/dist`, diff checks, final console inspection and explicit
`site/dist` cleanliness comprise Batch 46.

`site/dist` was not rebuilt or modified.

## Remaining Human Review

- Approve or revise portrait `3:4` crop, radius, sticky behavior, `1:2` wide
  split and `42rem` threshold.
- Approve or revise content measure/inset, heading/quote/body hierarchy, rhythm,
  quote rule and text/image signature presentation.
- Confirm that the six semantic properties are the maximum coherent neutral API
  and that internal geometry, heading rank, media mechanics and target events
  remain private/target-owned.
- Decide later whether Shopify artist data should remain direct section content
  or map to an accepted shared artist/metaobject model.
- Produce component-specific Figma artwork and complete human visual review.
- Do not promote the contract to `stable` without explicit human approval.
