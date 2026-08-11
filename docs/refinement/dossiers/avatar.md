# Component Dossier: Avatar

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target and Shopify Liquid adapter

Contract: `components/contracts/avatar.contract.json`

## Recommendation

Retain A15 Avatar as a passive identity thumbnail with the four sizes accepted
by ADR 0064: Small 32px, Default 40px, Large 56px and Extra Large 80px. Keep
`size` as the only current semantic property. Image markup and one- or two-
grapheme initials remain explicit target-authored compositions; Avatar itself
does not fetch, derive initials, listen for image errors, swap content, expose a
status badge or become interactive.

Apply only architecture-neutral corrections now: make the fixed geometry
logical and inline-composable, prevent flex shrink, make native images fill and
crop predictably, replace hardcoded weight with the existing semibold token,
normalize private line-height, preserve the circular boundary in forced colors,
clarify standalone versus adjacent identity semantics, and correct Shopify's
redundant image alternative when the same name is visible next to it. Keep all
four diameter values, crop, center alignment, clipping and line-height private.

ADR 0237 records the accepted A15-A direction. Target markup supplies either a
native image with context-appropriate `alt` or pre-derived initials; targets
own source delivery, failure policy, localized derivation and fallback choice.
The existing `size` property couples 32/40/56/80px to Caption, Body Small, Body
Default and Body Large respectively. There is no public image URL, content mode,
loading state, font-size control or neutral fallback runtime.

## Purpose And Limits

- Provides a compact visual representation of a person, organization, account
  or other identity-bearing entity.
- Supports native image content or short target-provided initials; the target
  owns identity records and accurate localized text.
- May be composed inside an author card, testimonial, review, comment, account
  control or other identity context.
- Is not itself a profile destination, account menu trigger, presence/status
  indicator, image uploader, cropper, network loader or fallback state machine.
- Does not derive initials, transliterate names, choose colors by identity,
  handle collisions, announce status or own click/keyboard behavior.
- Does not represent products or general media. Targets should use their
  thumbnail/media pattern for non-identity imagery.

## Pre-Refinement Gallery Baseline

- Registry A15, Primitives, no formal dependency; contract `0.2.0`, `pilot`.
- ADR 0064 accepts one `size` property and explicitly defers automatic fallback,
  image mapping and initials derivation. `docs/OPEN-QUESTIONS.md` additionally
  asks whether initials typography scales with size.
- Canonical CSS defines 32/40/56/80px private diameters, circular clipping,
  semantic background/text/radius and body family. It uses physical width/
  height, block-level Flex on a Span, hardcoded `font-weight: 600`, inherited
  font size and inherited line height, and an inline image without explicit
  display normalization.
- In the docs runtime all four sizes inherit `15px/24px` initials typography.
  The 32px and 80px avatars therefore render identical text despite a 2.5x
  diameter difference. This is recorded evidence, not permission to choose a
  scale.
- The shared initials fixture is a Span with `role="img"`, `aria-label="Maria
  Pacheco"`, text `MP`, zero focusables, zero animation and no runtime behavior.
  Each measured size has equal client/scroll width and height.
- MDX documents native image and initials composition, but the contract anatomy
  lists only root and image. Initials have no explicit part, and the contract
  suggests `title` alongside `aria-label` even though title is not a dependable
  primary naming strategy.
- Adjacent Gallery compositions correctly hide redundant initials from assistive
  technology. The dedicated standalone fixture names the image role. Shopify's
  Testimonials image uses the visible adjacent author name as non-empty `alt`,
  causing duplicate identity output.
- Shopify has no automatic initials fallback: the avatar is omitted when no
  image is selected. Its `image_url` requests 96px for a 40px CSS circle, and
  the native image is cropped by shared source CSS.
- Current light initials contrast is 7.17:1 (`#525252` on `#f5f5f5`). Exact
  dark and forced-color output remain browser evidence targets.
- Deterministic level-9 gzip baseline: Primitives CSS `10,472 B`, complete Web
  component CSS `64,778 B`, shared runtime `10,171 B`. Primitives has `75 B`
  below its provisional `10.3 KiB` ceiling; Web has `758 B`; runtime retains its
  existing exception.

## Implemented Result

- Contract `0.4.0` preserves the single `size` property and records passive
  identity, explicit image/initials composition, contextual native naming,
  fixed geometry, forced-color boundary and target-owned fallback lifecycle.
- Canonical CSS now uses logical no-shrink inline geometry, block-normalized
  direct native images, centered cover crop, semibold token weight, private
  line-height 1 and a forced-color system boundary while retaining exact
  32/40/56/80px outer squares. Initials use Caption/Body Small/Body Default/
  Body Large semantic size tokens in the same order.
- Shopify Testimonials uses null image alt beside the same visible author name.
  It retains target-owned image delivery and gains no inferred fallback.
- Exhibit and Studio serialize exact shared initials markup. MDX adds contextual
  native-image guidance without exposing image loading or content mode in
  Studio.
- Sixteen final images cover both modes/four viewports, all sizes, native image
  crop, contextual names, localized/extreme initials, inline/narrow
  composition, dark, forced colors, reduced motion and effective 200% zoom.
- The final deterministic performance audit records the current Primitives,
  complete Web CSS and shared-runtime surfaces. Avatar adds no runtime or asset;
  its semantic type mapping remains within the fixed Primitives budget.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Image alternatives depend on purpose and context; informative images need equivalent text, while images duplicating adjacent identity can use null alt. | Target markup owns accurate native `alt`; adjacent name makes the avatar decorative, standalone identity needs a name. |
| [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) | `img` is a non-interactive document-structure role whose name may come from author-provided labeling. ARIA should not replace available native semantics. | Native `img` is preferred for image content; standalone initials may use one named image role. Avatar itself gets no widget keyboard model. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines no Avatar widget or interaction pattern. | Keep Avatar passive; a clickable identity composes canonical Link or Button outside it. |
| [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) | Separates Root, native Image and Fallback; its framework runtime controls loaded/error rendering and optional delayed fallback. | Parts are useful comparative anatomy, but loading status and delay are framework behavior that ADR 0064 does not authorize in neutral source. |
| [Shopify Polaris Avatar](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/media-and-visuals/avatar) | Current framework-agnostic target exposes source, initials, alt, five sizes and automatic image fallback/error handling. | Confirms useful target-native fallback capability, while also showing why one neutral source string/error callback would import target behavior into the base contract. |
| [Polaris React Avatar](https://polaris-react.shopify.com/components/images-and-icons/avatar) | Recommends person/business identity, contextual alt including empty alt beside a visible name, five fixed sizes and automatic source-to-initials fallback. | Supports contextual naming and discrete size families. React-specific customer/color/fallback behavior is evidence, not Gallery source. |
| [CSS `object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit) | `cover` preserves image aspect ratio while filling and clipping the replaced-element box. | Keep private centered cover crop and explicit image box fill; focal point and responsive source policy remain target-owned. |

Open UI defines no accepted Avatar element and APG defines no Avatar pattern.
There is therefore no platform behavior contract to import. Radix and Shopify
agree on image/fallback anatomy and discrete sizes but differ in API, size count,
color generation and runtime ownership.

No component-specific owner image is stored in the repository or attached to
this batch. Studio's Figma file/frame IDs are traceability metadata, not an
inspectable visual reference. The local editorial photographs are fixture assets,
not Avatar art direction.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | ordinary clipped container; no intrinsic role | Avatar classes + target markup | Becomes one named `img` role only for standalone non-native initials composition. |
| Image | conditional | native `img` with contextual `alt` | target | Use non-empty alt when it uniquely conveys identity; use `alt=""` when visible adjacent text already names the entity. |
| Initials | conditional | short text inside root | target | Pre-derived one or two user-perceived graphemes; standalone root needs `aria-label`/`aria-labelledby`, adjacent duplicate uses `aria-hidden`. |
| Fallback lifecycle | outside neutral contract | target-native conditional rendering | target adapter | Loading, error, delay, source selection and replacement are explicitly target-owned, not hidden component runtime. |
| Interaction | outside | canonical Link or Button wrapper | composition | Wrapper owns destination/action name, focus, keyboard and disabled state; Avatar remains passive. |
| Status/presence | outside | separate named/textual status pattern | composition | Never encode online/state only through avatar color or an unlabeled dot. |

Exactly one of native image or initials is the current authored content. The
contract does not yet define simultaneous image and fallback parts. Avatar has
no canonical component dependency; Author Card, Testimonials, Comments and
Review surfaces consume it.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One circular neutral presentation; no color, shape, customer/business or status variants. |
| Size | Small 32px, Default 40px, Large 56px, Extra Large 80px. |
| Content | Explicit target-resolved native image or target-provided initials; only one composition renders. |
| Identity context | Standalone named representation or adjacent redundant/decorative representation. |
| Interaction | None. Compose Link/Button externally when actionable. |
| Theme | Semantic surface/text tokens in light and dark. |
| Direction/localization | Fixed logical square; initials are target-derived and may use localized scripts/graphemes. |
| Forced colors | Identity text/image remains perceivable and the circular boundary should not disappear. |
| Reduced motion | No component motion. |

Unsupported combinations include an unnamed standalone initials image, a native
image without `alt`, both image and initials shown simultaneously without an
accepted fallback model, arbitrary long names inside the circle, color-only
status, focus on the Avatar root, or local click handlers on a non-interactive
Span/Div.

## Public API And State Ownership

- `size` — optional four-value diameter choice; Default is classless.
- Image composition — target-authored native `img`, not yet a contract property.
- Initials composition — target-authored short text, not yet a contract property.
- Identity naming — contextual native `alt`, `aria-label`, `aria-labelledby` or
  redundant hidden treatment in target markup.

There is no current `src`, `srcset`, `sizes`, `alt`, `name`, `initials`,
`contentMode`, fallback delay/error/loading state, color seed, shape, status,
badge, event or controlled/uncontrolled state. Targets own identity data, image
delivery/crop sources, initial derivation, failure policy, accessible-name
context, interactivity and replacement.

## Token And Value Audit

- Keep surface-secondary, text-secondary, full radius and body family pending
  human visual review. The light pair has strong contrast for text.
- Replace hardcoded 600 with existing `--tg-font-weight-semibold`; do not add an
  Avatar token for an already-semantic global weight.
- Keep 32/40/56/80px diameter mappings private values behind the public size
  enum. They are cross-target behavior, but no accepted semantic size tokens map
  all four and Studio already exposes the meaningful choice.
- Keep cover crop, center alignment, clipping, line-height and flex geometry
  private. Do not expose object fit, object position, radius, icon/status offset,
  border, initials letter spacing or arbitrary diameter controls.
- Map Caption, Body Small, Body Default and Body Large to the four accepted
  sizes. The mapping belongs to `size`; do not expose a free numeric font-size
  control or a second independently combinable type property.

## Visual And Content Audit

- Preserve the quiet neutral circle and current semantic colors until human
  visual review.
- Test four sizes with one- and two-grapheme Latin, accented, Arabic, CJK and
  emoji sequences supplied by the target; document clipping of invalid long
  content rather than deriving/truncating it in CSS or JS.
- Test landscape/portrait/square source images under centered cover crop,
  target-resolved missing-image behavior and high-density Shopify output.
- Test standalone named initials, adjacent hidden initials, standalone native
  image, adjacent null-alt image and Avatar composed inside a real Link/Button.
- Test Mobile/Tablet/Desktop/XL, inline text/list/card containment, dark, forced
  colors, reduced motion and 200% zoom.
- Exact diameter family, neutral colors, crop, circle, initials weight, accepted
  type scale and fixture imagery remain human-review items.

## Accessibility And Interaction

- Native image content uses `img` and always has contextual `alt`. Do not add a
  second named image role around a native image.
- Standalone initials may use one `role="img"` with the full represented name
  from `aria-label` or `aria-labelledby`; the initials themselves are not a
  sufficient accessible name. Do not recommend `title` as the naming mechanism.
- When a visible adjacent name already identifies the same entity, hide initials
  with `aria-hidden="true"` or give the native image `alt=""` to prevent
  duplication.
- Avatar has no focus, keyboard, activation or disabled semantics. A clickable
  avatar is content inside a canonical named Link/Button, which owns its target
  size and state.
- Status must have independent text/semantics. Avatar color alone never conveys
  availability, verification, account state or moderation state.
- There is no motion, live region, announcement, controlled state or target-
  agnostic image-error listener.

## Responsive And Performance

- Fixed sizes do not change at breakpoints; consumers choose the semantic size
  appropriate to density. The square must not flex-shrink in narrow rows.
- Logical inline/block dimensions and `inline-flex` make Avatar safe in RTL,
  prose, lists and Flex/Grid composition without a component container query.
- Native image fills the exact square with centered cover crop and no baseline
  gap. Invalid long initials remain clipped rather than expanding the root.
- Neutral runtime budget is exactly `0 B`: no listener, observer, timer, request,
  initials parser, formatter, image preloader, layout read or asset.
- Primitives remains within its fixed gzip ceiling after the semantic scale;
  global Web CSS/runtime exceptions remain separate documented program gaps.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Span/Div root with explicit initials, or native `img` child; size modifier classes. | Refined with the accepted four semantic size/type pairings. |
| Shopify | Embedded `.avatar` in Testimonials with target image object and visible adjacent name. | Generated target validates; duplicate alt is null and Shopify owns any image-to-initials resolution. |
| React / Angular | One target-resolved image or initials composition. | Planned; target-native fallback may resolve content before rendering without expanding neutral API. |
| Figma | Four size/type choices and semantic neutral presentation; fixture initials only. | Studio validates the accepted mapping and exposes only `size`. |
| SwiftUI / Compose | Native clipped identity image or target-provided initials inside fixed semantic sizes. | Planned; image loading/fallback, names and interaction remain native target concerns. |

## Exhibit And Studio Parity

`AvatarStudio` is registered for both Exhibit and Studio, so the live initials
fixture and canonical implementation are shared with exact serialized markup.
The `size` property is the only Studio control; it changes both diameter and the
accepted semantic initials step. Image content, name and initials remain target
composition or fixtures, not defaults or public controls.
MDX mirrors the standalone named initials fixture and adds contextual image/
adjacent examples without pretending Studio owns image loading.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Automatic versus explicit fallback and public image mapping were open. | resolved | ADR 0237 accepts explicit target-resolved image/initials composition and target-owned loading/failure/source policy. | owner + implementation |
| Initials inherited one 15px value at all four diameters. | resolved | ADR 0237 couples Caption/Body Small/Body Default/Body Large to 32/40/56/80px. | owner + implementation |
| Contract suggested `title` for initials naming. | resolved | Contract/docs now use `aria-label`/`aria-labelledby` or redundant hidden treatment. | implementation |
| Shopify image repeated the adjacent visible author name in alt. | resolved | The exact adjacent-name composition now uses null alt. | implementation/Shopify |
| Root was block Flex despite commonly being inline identity content. | resolved | Logical fixed square uses `inline-flex` and exact no-shrink basis. | implementation |
| Image lacked explicit block normalization. | resolved | Direct native image fills the square as a block with cover crop. | implementation |
| Hardcoded weight duplicated the semibold token. | resolved | `--tg-font-weight-semibold` is now the registered public reference. | implementation |
| Forced-color circle could lose its visual boundary. | resolved | A system-color border preserves the outer circle without disabling user colors. | implementation |
| No component-specific owner visual asset is available. | evidence gap | Preserve current identity and request owner art direction only for human visual review. | owner/human review |

## Evidence And Validation

- Before evidence includes Exhibit/Studio Desktop and Mobile under
  `output/playwright/refinement-batch-28/before/`.
- Baseline four-size metrics are exact 32, 40, 56 and 80px squares with equal
  client/scroll dimensions, fixed inherited `15px/24px` initials, semibold 600,
  no focusables, no animation and no document overflow.
- Final evidence covers both views/four viewports, all sizes, explicit image
  crop, standalone/adjacent semantics, localized and invalid long initials,
  canonical Link composition, inline/flex containment, dark, forced colors,
  reduced motion, 200% zoom and exact shared markup.
- Four sizes retain equal client/scroll squares and their accepted semantic
  initials steps. A 1800x2700 portrait fills exact
  80px/56px boxes. The 80px Avatar remains fixed inside a 120px row; invalid
  long initials clip without expanding the `1280/1280px` document.
- Light/dark contrast is 7.17:1/10.21:1; forced colors retains a 40px outer
  square and one-pixel CanvasText boundary. Sixteen final images are stored
  under `output/playwright/refinement-primitives/avatar-0237/`.
- Docs, contracts, Studio, token, Web/Shopify adapters, structural, parity,
  static-preview and refinement audits, TypeScript, deterministic gzip,
  generated-copy identity, `git diff --check` and `site/dist` cleanliness pass
  in the final ADR 0237 validation.

## Risks And Open Questions

1. Human review must approve diameters, circle, neutral surface/text, cover crop,
   weight, the accepted semantic type scale and any owner-provided imagery.
2. Target adapters must avoid duplicate identity names, color-only status,
   non-interactive click roots and low-quality localized initials derivation.
3. A future target-native automatic fallback must still resolve to one rendered
   image-or-initials composition and must not silently expand the neutral API.
4. Avatar adds no neutral JS. Global Web CSS/runtime budget gaps remain tracked
   separately by the program performance audit.

## Readiness Decision

`human-review-ready`: A15-A resolves composition ownership and the semantic
initials scale; implementation, adapters, shared rendering, accessibility,
responsive evidence and automated gates are reconciled. Avatar remains `pilot`
and requires explicit human visual/stability review before any `stable`
promotion.
