# Component Dossier: Collection Hero

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/collection-hero.contract.json`

## Recommendation

Keep Collection Hero as a passive, target-agnostic collection introduction with
one context-ranked native heading, optional concise description, optional
target-formatted count, and optional semantic image. Presence of the image
derives the image-backed presentation class; do not expose a separate `variant`
property that can contradict the image slot.

Preserve the current centered editorial candidate and its dark image treatment
in the default light theme. Replace the fixed black scrim with a semantic
foreground-derived scrim paired with inverse text so the relationship also
survives the accepted dark theme. Keep intrinsic geometry private, use public
tokens for meaningful surface, text, spacing, type, and opacity roles, and add
no neutral runtime.

The repository candidate can be refined without an owner decision because the
existing visual direction, content model, and contract already agree on a
concise plain-text description. Human review must still approve the image crop,
minimum hero depth, title scale, copy width, spacing, and overlay density before
any `stable` promotion.

## Purpose And Limits

- Introduces one collection with its visible identity and optional supporting
  summary before collection controls or results.
- Supports text-only and image-backed compositions without changing the
  information hierarchy.
- Keeps image alternative text contextual: informative media receives a useful
  alternative; decorative atmosphere uses `alt=""`.
- Lets the embedding page choose the heading rank. A collection template can
  render `h1`; a docs preview nested below its own page title can render `h2`.
- Accepts an already formatted count string. Formatting, pluralization,
  filtering semantics, and commerce data remain target responsibilities.
- Uses a concise plain-text description. Long-form or richly structured
  collection narrative belongs in a separate content region, not inside this
  compact hero contract.
- Is not a carousel, product grid, filter status region, breadcrumb, navigation
  landmark, image focal-point editor, recommendation engine, or live results
  announcer.
- Owns no controlled/uncontrolled state, events, focus movement, keyboard model,
  motion, fetching, or target-specific data client.

## Current Gallery Baseline

- Registry `E1`, Collection, review order `75`, dependency depth `0`, with no
  canonical component dependencies.
- Contract `0.1.0`, `pilot`: seven anatomy entries, two visual variants, one
  size, two states, two behaviors, and six properties. `variant` and `image` can
  currently disagree, creating image markup without contrast mode or contrast
  mode without image markup.
- Canonical CSS uses the archival surface, centered content, a `300px` image
  minimum height, a `680px` content maximum, fixed `16px`/`12px` vertical
  margins, fixed black `rgba(..., .68)` overlay, and `.9` text opacity.
- The fixed overlay and `--color-text-inverse` pair is correct only in the light
  theme: the accepted dark theme maps inverse text to a dark value while the
  overlay remains black.
- CollectionStudio already supplies the registered renderer to both Exhibit and
  Studio, but its independent variant and image controls reproduce the contract
  contradiction. It renders `h2` correctly inside the docs page, whose own
  visible title is `h1`.
- The MDX fallback uses a styled `div role="img"` rather than the real image
  anatomy used by the shared renderer, and its reference table documents the
  contradictory independent variant property.
- Shopify has a template-composed section with collection title, description,
  image, and count. It currently shows the image automatically, uses the title
  as image alt text, emits unescaped title and untranslated count copy, and
  exposes no merchant controls.
- Baseline deterministic gzip is Collection CSS `2,152 B / 2.5 KiB`, complete
  Web component CSS `65,452 B / 64 KiB`, and shared neutral runtime `10,492 B / 8
  KiB`. The complete bundle has only `84 B` of headroom and the shared runtime
  already has a recorded exception, so this refinement should be CSS-neutral or
  reducing and add `0 B` runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Living Standard: headings and sections](https://html.spec.whatwg.org/multipage/sections.html#headings-and-sections) | Native headings establish document hierarchy; sectioning context does not create a portable automatic rank. | Keep one visible native heading and let the embedding target choose its contextual rank rather than expose a decorative level switch. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Alternative text depends on the image purpose and surrounding context; decorative images use a null alternative. | Preserve explicit `imageAlt`, permit the empty string, and do not copy the collection title into alt by default. |
| [WCAG 2.2: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Normal text needs a 4.5:1 contrast ratio and large text 3:1. Background images require testing across supplied frames. | Use a semantic contrast layer and test real, light, dark, and high-variance image samples; the overlay is not evidence by itself. |
| [Open UI component index](https://open-ui.org/components/) | Open UI does not define a Hero or Collection Hero widget with interoperable states or events. | Use ordinary semantic HTML and CSS; do not invent a widget role, keyboard model, or target-neutral event API. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Radix covers behavior-heavy primitives but has no Hero primitive. | Absence supports a passive composition rather than a React-derived primitive API. |
| [Shopify collection object](https://shopify.dev/docs/api/liquid/objects/collection) | The object supplies title, description, image, `products_count`, and `all_products_count`; `products_count` represents the current filtered view. | Shopify can map native collection data directly, localize the rendered count, and document that a filter implementation must keep visible counts synchronized. |
| [Shopify Dawn collection banner](https://github.com/Shopify/dawn/blob/main/sections/main-collection-banner.liquid) | Dawn uses a native `h1`, optional description and image settings, and the collection image's own alt text. Its visual layout differs from Gallery. | Reuse the target-native data/settings concepts only. Keep Gallery's centered overlay composition and canonical classes. |

No applicable APG widget pattern exists: Collection Hero is static page content,
not a composite control. Polaris app-page APIs are also not a storefront visual
contract and therefore do not supply a transferable Hero API.

## Owner Reference And Visual Direction

- No component-specific owner artwork is recorded for Collection Hero. The
  Studio `designReference` identifies the accepted inspector frame, not an
  independent hero composition to copy.
- The current shared fixture is therefore the visual candidate: `Quiet Forms`,
  a concise curatorial sentence, `24 works`, and wide editorial ceramic media.
- Preserve its centered hierarchy, full-bleed crop, archival text-only surface,
  and image-backed contrast treatment.
- Human review remains required for crop, focal area, minimum depth, title
  prominence, line length, vertical rhythm, and overlay density.

## Anatomy And Composition

| Part | Required | Direction |
| --- | --- | --- |
| Root | yes | A `section`, `header`, or target-appropriate neutral container; no landmark role is forced. |
| Image | no | Real target media behind content; presence derives image-backed mode. |
| Overlay | conditional/generated | Pseudo-element contrast layer only when image is present. |
| Content | yes | Centered, width-bounded stack above media and overlay. |
| Title | yes | Exactly one visible native heading at the surrounding document's rank. |
| Description | no | Concise plain text, not rich long-form markup. |
| Count | no | Target-formatted readable text; not a live region by default. |

Collection Hero has no child component dependency. It must not duplicate
Collection Grid, Filters, Breadcrumb, or navigation markup.

## States, Modes, And Content Matrix

| Dimension | Required coverage | Expected result |
| --- | --- | --- |
| Composition | text-only, image-backed | Image presence is the single source of truth for the image-backed class and contrast layer. |
| Optional content | title only; title + description; title + count; all content | Optional nodes are omitted without empty gaps. |
| Image semantics | informative alt, decorative empty alt | Both remain valid; title is not injected as an automatic substitute. |
| Theme | light, dark | Foreground/scrim pairing retains contrast in both accepted modes. |
| Contrast modes | forced colors | Text-only content remains readable; image-backed content receives a system-color fallback instead of depending on image pixels. |
| Width | mobile, tablet, desktop, XL; narrow embedded container | Padding and wrapping respond to available inline size; no viewport-only component breakpoint is required. |
| Copy | short, long, empty optionals, localized, unbroken extreme | Title and copy wrap without clipping or horizontal overflow; required title is never empty. |
| Media | very light, very dark, high variance, missing | Contrast is measured for supplied image frames; missing media yields text-only mode. |

There is no disabled, hover, focus, pressed, selected, loading, controlled, or
uncontrolled state. Reduced motion is not applicable because the component owns
no animation or transition.

## Public API

| Property | Type | Required | Direction |
| --- | --- | --- | --- |
| `title` | string | yes | Visible collection identity. |
| `description` | string | no | Concise plain-text summary. |
| `count` | string | no | Already localized and target-formatted count. |
| `image` | slot | no | Optional collection media; its presence derives image-backed presentation. |
| `imageAlt` | string | no | Contextual alternative; meaningful text or empty string. Relevant only when image exists. |

Remove `variant` from the public property surface. Keep `default` and
`with-image` as documented CSS composition modes, with the latter derived from
the image slot. Do not expose overlay opacity, content width, minimum height,
crop, alignment, heading rank, description markup, or section padding as neutral
properties in v1.

The component emits no events. Heading rank, target image object, URL/loading
policy, localized count, and target data loading are adapter concerns.

## Token And Hardcoded Audit

| Concern | Current | Direction |
| --- | --- | --- |
| Text-only surface | `--color-surface-archival` | Public semantic token; keep. |
| Text | primary/inverse | Public semantic roles; keep as a paired theme-aware relationship. |
| Image scrim | fixed black at `.68` | Replace with the active primary text color at `--opacity-overlay`; this remains opposite inverse text in both themes. |
| Root spacing | section/container tokens | Keep public semantic roles; use token-bounded intrinsic sizing for narrow containers. |
| Content rhythm | fixed `16px` and `12px` margins | Use a grid stack and `--space-layout-element-gap`; omit empty nodes. |
| Type | heading family plus display/article roles; count at `.875em` | Keep semantic title/description roles; retain the count's private relative hierarchy without inventing a component token. |
| Minimum image depth | `300px` | Keep as a private intrinsic geometry value; it is not a consumer-facing semantic option or token. |
| Content width | `680px` | Keep as a private readable-width geometry value rather than public customization API. |
| Copy opacity | `.9` | Remove. Typography supplies hierarchy and full-opacity text protects contrast. |
| Media crop | `cover` | Keep as private composition; focal point remains target media data, not a neutral contract property. |

The permanent Collection family budget is `2.5 KiB` gzip. Collection Hero must add no
JavaScript and should not grow the complete Web CSS bundle from the baseline.

## Accessibility And Semantics

- Render one required visible native title heading at the correct page rank.
- Do not add `role="banner"`, `role="region"`, or an accessible name by default;
  the component's visible heading is sufficient content structure and multiple
  banners/regions would add noise.
- Use a real image when media conveys content. An informative image needs useful
  context-specific alt text; a decorative image uses `alt=""`.
- Never derive alt from the title merely to avoid an empty attribute.
- Verify 4.5:1 for normal description/count text and 3:1 only where the rendered
  title qualifies as large text. Test image frames rather than relying on the
  nominal overlay value.
- Forced-colors mode must not leave text readability dependent on the image.
- Do not mark the count as `aria-live`. Filters/results own any live update
  announcement and must coordinate the displayed count separately.
- No interactive descendants are owned, so there is no component keyboard or
  focus contract. Reduced motion is not applicable.

## Responsive And Extreme Content

- Root padding should use token-bounded intrinsic values tied to available
  inline size, not viewport media queries.
- Preserve a private minimum depth only in image-backed mode; text-only mode
  grows from content and semantic padding.
- Content uses a readable maximum and `min-inline-size: 0`; title, description,
  and count use safe wrapping.
- Omit optional empty nodes. Required empty title is invalid input and should be
  caught by target/schema validation, not replaced by generated copy.
- Validate: one-word title, multi-line localized title, long description,
  count omitted, decorative image, missing image, long unbroken token, 200%
  zoom, and all four evidence widths.

## Cross-Target Translation

### Neutral Web

- Native contextual heading plus optional `p` nodes and optional real `img`.
- Add `.collection-hero--with-image` only when `.collection-hero__image` exists.
- CSS owns layout, crop, theme pairing, overflow safety, and forced-colors; no JS.

### Shopify

- Collection template owns `h1` and maps `collection.title`, a plain-text
  projection of `collection.description`, `collection.image`, and localized
  `collection.products_count`.
- Merchant settings may show/hide description, image, and count because these
  correspond directly to optional contract parts. Image presence derives the
  class.
- Use `collection.image.alt`, preserving a blank value when decorative. Do not
  substitute the collection title.
- Keep Gallery CSS and composition; Dawn is evidence for native data/settings,
  not a visual source.

### Future React, Figma, SwiftUI, And Compose

- React renders the same five semantic inputs and derives the class from media;
  no controlled-state API is required.
- Figma exposes title, description visibility/content, count visibility/content,
  and image composition. It does not expose a contradictory independent variant.
- SwiftUI/Compose use a semantic heading/text/media stack and derive contrast
  mode from image presence; platform image-description APIs map `imageAlt`.

## Exhibit And Studio Parity Plan

- Keep one registered `CollectionStudio` renderer and fixture for both surfaces.
- Remove the variant control and derive the class from `values.image`.
- Show `imageAlt` only while the image slot is enabled.
- Keep `h2` in the docs renderer because the Studio/Exhibit document already
  owns the page `h1`; document target-owned heading rank explicitly.
- Make the first MDX fallback mirror the same real-image anatomy and fixture.
- Remove the docs-only mobile minimum-height override after canonical CSS owns
  the responsive geometry.
- Run structural Exhibit/Studio parity and static Preview audits, then capture
  mobile, tablet, desktop, and XL views plus light/dark/forced-colors evidence.

## Performance And Runtime Budget

- Collection CSS family: `<= 2.5 KiB` deterministic gzip.
- Complete Web component CSS: remain below `64 KiB`; the `65,452 B` baseline
  leaves only `84 B` for necessary refinement and favors deletion over growth.
- Shared neutral runtime: `+0 B`; Collection Hero is passive.
- Component-owned requests, observers, timers, listeners, and layout loops: `0`.
- Shopify may use native image responsive candidates; the neutral component does
  not choose preload/eager policy because page position determines it.

## Risks And Questions

- Human review is still required for visual density, crop, type balance, and
  overlay strength; automated contrast only covers tested images and frames.
- A future requirement for rich hero description, focal-point editing, alternate
  alignments, or multiple hero layouts would expand the contract and needs an
  explicit product/architecture decision.
- Filter implementations must keep the visible count synchronized if they
  change `products_count`; Collection Hero is not itself a live-result owner.
- The Studio design reference is generic. A later owner-supplied Collection Hero
  artwork should be compared as evidence before visual changes are accepted.
- `stable` remains blocked on explicit human review.

## Acceptance Plan

1. Refine contract, CSS, Studio metadata/renderer, MDX, Shopify section, and
   locale/schema data from this dossier.
2. Validate contracts, Studio metadata, docs, source/public token coverage,
   neutral Web adapter, Shopify adapter, static previews, parity, and refinement
   program.
3. Test image-derived class behavior, optional-node omission, contextual heading,
   alt semantics, localized count, overflow, themes, and forced colors.
4. Capture deterministic before/after mobile, tablet, desktop, and XL evidence
   plus relevant special modes.
5. Record the decision, certification report, batch report, progress matrix, and
   unresolved human-review gate without promoting the contract to `stable`.
