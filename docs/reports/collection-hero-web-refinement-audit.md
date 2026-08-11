# Collection Hero Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-14

## Outcome

Collection Hero is now a passive, coherent collection introduction whose image
slot derives image-backed composition. It has one contextual heading, optional
concise description, optional target-formatted count, explicit image semantics,
theme-paired contrast, forced-colors handling, intrinsic narrow-container
spacing, safe content wrapping, and one shared Exhibit/Studio implementation.

Shopify now maps native collection data through a validated, editor-ready
section with optional description/image/count settings, collection-image alt,
escaped/plain-text content, and localized plural count. The candidate is ready
for human review of visual direction. It is not `stable`, and no human approval
is inferred.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive collection identity/summary only; no grid, filters, navigation, live status, rich narrative, media editor, or runtime contract. |
| Anatomy and composition | pass | Root, optional real image, generated overlay, content, one required contextual heading, optional description, and optional count. |
| Variants, sizes and states | pass | Text-only and image-backed modes; image presence alone derives the latter; one intrinsic size across light/dark/forced colors and four widths. |
| Public API and ownership | pass | Five coherent properties: title, description, count, image, imageAlt. Heading rank, formatting, data, loading, crop, focal point, and geometry stay target/private. |
| Tokens and visual system | pass | Twelve existing public tokens; private 300px/680px/.875em geometry; semantic primary/inverse/scrim pairing; no component token invented. |
| Accessibility and interaction | pass | Native contextual heading, contextual/empty alt, no widget role/live region/interactive descendants, measured contrast, forced-colors system fallback; interaction/motion not applicable. |
| Responsive/content resilience | pass | Token-bounded intrinsic padding; mobile through XL; text-only/image-backed; long Spanish copy, empty optionals, unbroken title, absent media, and no horizontal overflow. |
| Runtime and assets | pass | `0 B` neutral runtime, no events/listeners/observers/timers/requests/layout loop; media remains target/fixture data. |
| Cross-target translation | pass for Web/Shopify | Neutral Web generates/validates; Shopify section is implemented and ready; framework/native/Figma mappings are documented and remain planned. |
| Exhibit/Studio parity | pass | Exact identical `499`-character initial outerHTML from one renderer and fixture; Studio no longer exposes contradictory variant control. |
| Architecture/readiness | **human-review-ready** | ADR 0119 records passive semantics, image-derived mode, heading/count/image ownership, theme pairing, and Shopify translation; visual approval remains human. |

## Research And Decision Evidence

- The [HTML Living Standard](https://html.spec.whatwg.org/multipage/sections.html#headings-and-sections)
  supports context-ranked native headings rather than a decorative level API.
- [WAI Images](https://www.w3.org/WAI/tutorials/images/) makes alternative text
  dependent on purpose and context, including null alternatives for decorative
  images.
- [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
  requires testing text over supplied media rather than treating an overlay
  value as proof.
- [Open UI](https://open-ui.org/components/) and
  [Radix Primitives](https://www.radix-ui.com/primitives) define no Hero widget
  with portable state/events, supporting ordinary semantic HTML and zero
  neutral runtime.
- The [Shopify collection object](https://shopify.dev/docs/api/liquid/objects/collection)
  supplies native title, description, image, `products_count`, and
  `all_products_count`; `products_count` reflects the filtered view.
- [Dawn's collection banner](https://github.com/Shopify/dawn/blob/main/sections/main-collection-banner.liquid)
  provides evidence for native heading, image-alt, and optional section settings
  without becoming Gallery's visual source.
- ADR 0119 accepts the image-derived mode and cross-target ownership boundary.

## Contract And Browser Evidence

- Contract `0.2.0` validates with seven anatomy parts, two derived composition
  modes, one size, two states, five behaviors, five properties, twelve public
  tokens, and Web/Shopify/framework/native/Figma translation notes.
- Exhibit and Studio initial root outerHTML are exactly equal at `499`
  characters: one image, one `h2`, two optional paragraphs, and the derived
  `.collection-hero--with-image` class.
- Studio exposes no Variant control. Turning Image off removes the class and
  image node, hides Image alt, changes minimum height to `auto`, and reveals the
  archival surface. Empty optional count/description nodes are omitted.
- Decorative image input preserves `alt=""`. The shared root has no explicit
  role, no `aria-live`, no interactive descendants, and one contextual `h2`
  below the docs page `h1`.
- At 390px, long Spanish title/copy renders in a `326px` root with four title
  lines, one optional paragraph, `scrollWidth === clientWidth`, and zero page
  overflow. An unbroken 78-character title wraps with no component or page
  overflow and empty description/count produce zero paragraphs.
- The 1800x2700 fixture was composited pixel-by-pixel against the actual semantic
  overlay/text values. Minimum contrast is `5.84:1` in light and `6.06:1` in
  dark across the complete source image, above 4.5:1 for all rendered copy.
- In forced colors, the image node remains semantic but computes visual opacity
  `0`; root/overlay become Canvas, copy becomes CanvasText, and reduced-motion
  preference is active with no component motion to suppress.
- Dark mode pairs `rgb(250,250,250)` at `.6` with `rgb(23,23,23)` text. It is
  technically accessible and token-coherent; its light-scrim visual direction
  remains an explicit human-review item.
- Four before, eight viewport after, and five special-state images are stored in
  `output/playwright/refinement-batch-34/`. Component/browser console produced
  no errors or warnings after filtering the existing dev favicon baseline.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Context-ranked heading, optional real image/description/count, derived class, intrinsic CSS, theme/forced-colors handling, no runtime. | Implemented, generated, validated, and browser-tested. |
| Shopify | Collection-template `h1`, escaped title, plain-text description, collection image alt, localized `products_count`, three merchant visibility settings, derived class. | Implemented `section-adapter`; CSS, Liquid, schema, data, behavior, composition, and editor layers validate ready. |
| React / Angular | Five semantic inputs; media presence derives class; surrounding page chooses heading element. | Contract and Studio prove the model; packages remain planned. |
| Figma | Title, optional description/count/image, contextual alt note, text-only/image-backed derived modes, light/dark examples. | Planned; no component-specific owner artwork exists. |
| SwiftUI / Compose | Native heading/text/image stack, contextual image description, media-derived contrast presentation. | Conceptual; DOM and Liquid details do not leak. |

## Performance And Risks

- Collection CSS is `2,188 B / 2.5 KiB`, leaving `372 B`; Batch 34 adds `36 B`
  for contrast, forced colors, intrinsic spacing, and wrapping.
- Complete Web component CSS is `65,475 B / 64 KiB`, leaving `61 B`; Batch 34
  adds `23 B`. The total ceiling is effectively exhausted.
- Shared runtime is `10,492 B / 8 KiB`, the existing `2,300 B` exception.
  Collection Hero adds `0 B` and no bundled asset request.
- Human review must approve image crop, minimum depth, title scale, readable
  width, spacing, overlay density, and especially light-scrim/dark-text
  presentation in dark mode.
- Future images require their own contrast evidence. A fixed on-media role,
  focal-point control, alternate alignment/layout, rich hero description, or
  live count ownership requires a new explicit decision.
- Shopify count synchronization depends on the target filter/section-refresh
  strategy; Collection Hero deliberately does not become a live result owner.

## Validation

Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, 193 public
Web/component token references, Neutral Web and Shopify adapter builds and
validation, Shopify Liquid validation of five touched files, generated/source
identity, static Preview audit, exact Exhibit/Studio parity, semantic DOM,
image-derived state, optional-node omission, contextual heading/alt probes,
four viewports, long/localized/unbroken content, text-only mode, light/dark,
forced colors, reduced motion, pixel-level contrast, deterministic gzip, global
refinement audit, diff checks, and explicit `site/dist` cleanliness comprise
Batch 34. `site/dist` was not rebuilt or modified.
