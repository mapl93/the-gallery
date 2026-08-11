# Component Dossier: Artist Card

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify translation

Contract: `components/contracts/artist-card.contract.json`

## Recommendation

Refine Artist Card as a passive artist summary by default. Its root should remain
an `article` in the shared specimen; a target may instead use a native `a[href]`
or `button` only when it owns one coherent destination or action. Hover motion,
pointer affordance and root focus must be limited to those native interactive
roots so a passive record never promises activation.

Compose the optional over-media label from canonical Badge and keep portrait,
name, medium, location and target-formatted piece count as the Artist Card
content API. Omit optional elements when their values are absent. Do not make
canonical Card a dependency yet: the current flat portrait-plus-metadata
candidate has no Card surface, body or footer shell, and adopting one would be a
visual product decision rather than an implementation correction.

Keep the `3 / 4` portrait ratio, portrait radius, overlay inset, metadata rhythm
and image scale as private compositional decisions pending human visual review.
Do not add ratio, density, columns, destination, activation, image URL or event
properties. Targets own media sources and alt decisions, navigation/action,
loading priority, analytics and artist-data mapping.

## Purpose And Limits

- Summarizes one artist or maker inside a directory, exhibition, residency,
  collection or editorial surface.
- Owns a portrait region, required display name, optional Badge composition and
  optional descriptive metadata.
- Does not own artist discovery, filtering, sorting, an artist profile, a CMS
  record, a generic Card surface or commerce behavior.
- Is passive by default and has no neutral controlled/uncontrolled state, event
  API, listener, observer, timer, request or component JavaScript.
- A target may make the whole root a single native link or button only when that
  choice is accepted for the containing experience and there are no nested
  interactive descendants.

## Current Gallery Baseline

- Registry identity `F6a`, category `storytelling`, no dependencies; contract
  `0.1.0`, `pilot`; eight anatomy parts, one variant/size, three states, one
  behavior, six properties and thirteen public tokens.
- The default shared renderer uses a passive `article`, a decorative fixture
  portrait, optional badge text, a required name and three metadata paragraphs.
  Exhibit and Studio already produce exact initial `outerHTML` at Mobile,
  Tablet, Desktop and XL.
- Optional metadata paragraphs render even when their strings are empty. The
  badge reproduces padding, type, radius and color instead of composing Badge.
- Canonical hover motion applies to every `.artist-card:hover`, including the
  passive article. `:focus-within` also outlines the passive root around any
  descendant focus without establishing a single-card interaction contract.
- The portrait uses `3 / 4`, the shared specimen is constrained to `280px`, and
  the candidate fits without page or card overflow at all four docs viewports.
  Measured portrait ratio is `0.75`; card height is approximately `528px` on
  Mobile/Tablet and `536px` on Desktop/XL.
- Canonical typography is incomplete: text styles omit accepted line-height and
  family tokens, metadata margins depend partly on a docs-only paragraph reset,
  and physical top/left positioning does not express logical direction.
- The MDX fallback uses a transparent tracking image with meaningful portrait
  alt text even though no portrait information is visually present.
- Shopify receives copied CSS and a generated `planned` manifest entry. There
  is no accepted artist Liquid model, destination policy or dedicated snippet.
- The registered Figma frame is the generic Button Studio pilot. It contains no
  Artist Card, portrait, metadata, interaction or responsive evidence.
- Baseline deterministic gzip is `4,571 B` for Storytelling CSS against the
  existing `4.2 KiB` family ceiling, `66,419 B` for neutral component CSS
  against `64 KiB`, and `10,492 B` for shared runtime against the existing
  `8 KiB` exception. Artist Card must add `0 B` neutral runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML sections and articles](https://html.spec.whatwg.org/multipage/sections.html) | `article` is a self-contained composition; native links and buttons provide their own activation semantics. | Keep a passive article as the default and use a native interactive root only when a target owns activation. |
| [HTML images](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element) | Alternative text depends on the image purpose; images that add no information should not repeat nearby text. | Targets choose useful alt for informative portraits and empty alt for decorative or redundant portraits. |
| [WAI image decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) | Decorative and redundant images use empty alternative text; informative images need a concise equivalent. | Do not encode the artist name automatically as portrait alt or invent a universal portrait policy. |
| [WCAG 2.2 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) | Keyboard focus needs a visible, sufficiently contrasting indicator around the focused control. | A native interactive root receives the existing semantic focus outline; a passive article is not focusable. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Card systems do not converge on one universal element, anatomy or whole-card interaction model. | Do not infer a Card dependency or activation API merely from the component name. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Card is passive by default and can delegate to a native element with `asChild`; visual size and variant are separate concerns. | Preserve passive composition and native semantics, but do not import Radix props or surface styling. |
| [Shopify performance](https://shopify.dev/docs/storefronts/themes/best-practices/performance) and [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) | Themes should prefer HTML/CSS, minimize JavaScript and emit responsive image attributes from Shopify image data. | Keep zero neutral runtime; a future Liquid adapter owns responsive portrait markup, widths, crop and loading priority. |
| [Shopify metaobjects](https://shopify.dev/docs/apps/build/custom-data/metaobjects) | Metaobjects can model reusable merchant-defined records but require an explicit definition and storefront access policy. | An artist metaobject is one possible target model, not an assumption the neutral contract may make. |

### Mature-system comparison

- Native HTML supplies the durable passive article and native interactive-root
  semantics; no ARIA widget pattern is required.
- Open UI confirms that “card” alone does not determine anatomy or interaction.
- Radix separates passive Card composition from native link delegation rather
  than adding click handling to a generic container.
- Shopify supports efficient responsive image output but does not define a
  universal artist record or destination.
- No source supports passive hover zoom, `div` click handling, nested controls
  inside a whole-card link, automatically exposed media-ratio controls or a
  framework-specific base API.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Read-only inspection finds `Exhibit`, `Studio`,
`Button`, `Customize`, Button label/icon/type/size/state controls and Button
tokens. The only reusable instance is a Button. There is no Artist Card artwork
or evidence, so the repository candidate remains a proposal for explicit human
visual review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | passive `article.artist-card`, or one target-owned native `a[href]`/`button` | Artist Card / target | No generic `div` activation or nested interactive descendants. |
| Portrait | no | media wrapper | Artist Card | Private `3 / 4` crop candidate; omitted with no portrait. |
| Portrait image | no | target media / `img` | target | Target owns source, dimensions, loading and alt purpose. |
| Badge | no | `.badge.artist-card__badge` | Badge | Short passive metadata over an existing portrait; omitted without portrait. |
| Name | yes | contextual heading or name text | target | Heading level follows containing page/list outline. |
| Medium | no | text | target | Omit when empty. |
| Location | no | text | target | Omit when empty; logical direction must remain robust. |
| Piece count | no | target-formatted text | target | Omit when empty; no numeric/pluralization logic in the component. |

Canonical Badge is the only accepted component dependency. Generic Card is not
a dependency because Artist Card does not currently use Card surface/body/footer
anatomy; changing that shell remains an owner visual decision.

## Variant, Size, State, And Mode Matrix

- Variant and size: default only. Width follows the containing grid or layout.
- Content: portrait on/off; Badge on/off; each metadata line present/absent;
  short, long, empty, localized, RTL and unbroken values.
- Passive states: default only; no hover, active, focus or disabled promise.
- Native interactive-root states: default, fine-pointer hover, focus-visible
  and native button disabled behavior if a target chooses a button action.
- Preferences: light, dark, forced colors and reduced motion.
- Responsive: isolated narrow/medium/wide containers and Mobile, Tablet,
  Desktop and XL docs shells.
- Unsupported in the neutral core: loading/skeleton, selected, favorite,
  controlled/uncontrolled values, destination/action/event, analytics and image
  loading state.

## Public API And State Ownership

Keep the six semantic properties:

- `portrait` — optional target-owned media slot.
- `badge` — optional short label rendered through canonical Badge when a
  portrait is present.
- `name` — required artist display name.
- `medium` — optional medium or practice.
- `location` — optional human-readable location.
- `pieceCount` — optional target-localized count string.

Do not add `href`, `onActivate`, `interactive`, `target`, `ratio`, `crop`,
`position`, `density`, `columns`, `variant`, `size`, `imageUrl`, `imageAlt`,
`loading`, `favorite`, `selected` or framework event props. The neutral passive
component has no controlled/uncontrolled strategy. A target that chooses native
activation owns its destination/action and accessible name as one boundary.

## Token And Value Audit

- Artist Card should own semantic focus, text, portrait radius, portrait motion,
  heading/body/caption typography and layout gap tokens.
- Badge owns its own color, padding, type, shape and forced-colors contract;
  remove Button color and badge-radius leakage from Artist Card.
- Add accepted heading/body/caption line-height and body-family tokens so the
  canonical CSS does not depend on host paragraph defaults.
- Private candidates: `3 / 4` media ratio, image scale `1.03`, overlay inset,
  metadata micro-rhythm, outline geometry and reset zeroes. Audit them visually
  but do not promote them automatically.
- The site may own fixture width and artwork only; it must not repair canonical
  paragraph margins or duplicate component presentation.

## Visual And Content Audit

- Verify portrait crop, radius, image subject safety, badge placement, name
  hierarchy, metadata rhythm and equal-height grid behavior.
- Text nodes must wrap without expanding the card or page, including long
  localized strings and unbroken content.
- Optional values must disappear from the DOM rather than leave empty
  paragraphs and ambiguous spacing.
- Badge must remain readable over varied imagery; image-specific legibility
  treatment beyond the canonical Badge is a visual decision for human review.
- Test without portrait, with portrait but no Badge, name only, every metadata
  field, empty values, long values, RTL and narrow containers.

## Accessibility And Interaction

- A passive root is not focusable and receives no pointer or hover affordance.
- If a target makes the root interactive, it must use one native `a[href]` or
  `button`, expose a descriptive accessible name, preserve visible focus and
  contain no nested interactive controls.
- The target chooses informative versus decorative portrait alt based on
  context; a redundant portrait may use `alt=""`.
- Name heading level follows document hierarchy and must not be fixed by CSS.
- Badge is passive metadata; do not make it a nested button or live region.
- Reduced motion removes portrait transition/scale. Forced colors preserves the
  native root focus boundary and Badge's canonical treatment.

## Responsive And Performance

- Artist Card is sized by its containing layout; no viewport breakpoint or
  fixed canonical maximum width is required.
- Portrait uses a private aspect ratio and `object-fit: cover`; target image
  markup should provide intrinsic dimensions and responsive candidates.
- Base DOM is one article, optional portrait/Badge, required name and optional
  metadata. It adds `0 B` runtime and performs no layout read, listener,
  observer, request or timer.
- Family budget remains Storytelling CSS `4.2 KiB` gzip; the existing exception
  must be reported rather than silently raised. Global component CSS remains
  `64 KiB`, and shared runtime remains `8 KiB` with its recorded exception.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Passive `article`, optional media and canonical Badge, required name and optional metadata; conditional native-root CSS hooks only. | Source implementation exists but requires refinement and generated-adapter validation. |
| Shopify | Theme snippet/section fed by an accepted artist record, responsive `image_tag`, canonical Badge class and optional native link. | CSS is copied; artist data source, merchant schema, destination and Liquid composition remain honestly `planned`. |
| React / Angular | Passive element/children by default; adapter may delegate root to a native link or button without inventing neutral state. | Planned; no framework event belongs in the base contract. |
| Figma | Portrait/no portrait, Badge/no Badge, metadata combinations, passive/interactive annotations, long/localized/RTL content and four layout widths. | Planned; registered reference is unrelated Button artwork. |
| SwiftUI / Compose | Passive semantic group or native navigation/action container with target-owned async image and metadata. | Conceptual; navigation and media loading stay target-owned. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one fixture and exact initial
  `outerHTML` for Exhibit and Studio.
- The fixture remains passive, uses one decorative portrait and composes Badge.
- Studio exposes the semantic content slots; Badge control is meaningful only
  while portrait is enabled.
- Remove docs-only paragraph repairs after canonical CSS owns its complete text
  reset. Fixture width and generated artwork may remain site presentation.
- MDX fallback must express the same passive anatomy and canonical Badge class
  without a fake meaningful transparent image.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Passive cards receive hover zoom and pointer-like visual emphasis. | high | Limit interaction styling to native interactive roots. | implementable now |
| Passive root receives broad `:focus-within` outline. | high | Focus only the native interactive root; no nested interactive contract. | implementable now |
| Badge duplicates canonical visual semantics. | high | Add Badge dependency and compose `.badge.artist-card__badge`. | implementable now |
| Empty optional metadata remains in the DOM. | medium | Omit empty optional elements in the shared renderer and document target behavior. | implementable now |
| Typography and logical positioning are incomplete. | medium | Use existing full type tokens, logical properties and robust wrapping. | implementable now |
| MDX portrait claims inaccessible visual information. | medium | Use a decorative preview surface or truthful target media. | implementable now |
| Whole-card link versus passive usage is not universally decided. | product boundary | Keep passive default and conditional native hooks; request owner approval before making navigation canonical. | owner |
| Generic Card surface/composition is unresolved. | visual/architecture boundary | Do not add Card dependency without explicit shell approval. | owner |
| Shopify has no accepted artist model or destination. | target boundary | Validate CSS copy and document the planned Liquid/data mapping without inventing it. | owner / target |
| Figma contains no Artist Card evidence. | human review | Use repository before/after evidence and request explicit visual approval. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: eight anatomy parts, one variant/size,
  four states, four behaviors, six semantic properties, seventeen public tokens
  and one canonical Badge dependency.
- Passive Exhibit/Studio markup uses one article, decorative fixture portrait,
  canonical Badge, required heading and omitted-empty metadata.
- Pointer, motion and focus hooks are conditional on a native target link or
  button root. Native disabled buttons leave focus, suppress motion and retain
  an unavailable cursor.
- Complete typography, logical Badge inset, block media sizing, robust wrapping,
  reduced motion and forced-color focus are canonical. Docs CSS no longer
  repairs paragraph margins.
- The MDX fallback uses truthful decorative media anatomy rather than a
  transparent image with an invented portrait description.
- Badge's dependency audit corrected a shared dark-mode contrast regression:
  all four Badge tones now exceed `4.5:1` in both themes without an Artist
  Card-specific override.
- Web and Shopify receive generated source-aligned CSS. Shopify stays honestly
  `css-ready`; no Liquid artist model or destination was invented.

## Evidence And Validation

- Eight before and eight final captures cover Exhibit/Studio at Mobile, Tablet,
  Desktop and XL; exact initial `outerHTML` parity holds at all four sizes.
- The default article has zero focusable descendants, cursor `auto`, no hover
  transform, no outline, no empty metadata and no page/card overflow.
- A synthetic native link is sequentially focusable, has a 2px outline with 2px
  offset, dispatches native Enter exactly once and reaches the private `1.03`
  fine-pointer image scale. A disabled button cannot take focus, does not move
  and resolves to `not-allowed`.
- Portrait-off plus empty metadata produces no portrait, Badge or metadata
  nodes; the hidden Badge Studio control follows the portrait dependency.
- Isolated `180/220/280/480px` hosts preserve full width, `3:4` portrait ratio
  and zero overflow. The `320px` reflow shell resolves a `240px` candidate
  without page overflow.
- Repeated unbroken Arabic plus localized metadata stays within `280px`; RTL
  moves Badge to a 12px logical inline-start inset.
- Light name/metadata contrast is `17.93:1 / 7.81:1`; dark is
  `17.18:1 / 12.09:1`. Canonical Badge tones resolve at or above `13.15:1`
  in light and `4.58:1` in dark.
- Forced colors uses a system Highlight focus boundary and Canvas/CanvasText
  Badge; reduced motion resolves portrait transition to `0s` and transform to
  `none`.
- Storytelling CSS is `4,584 B` gzip, a `284 B` exception against `4.2 KiB`
  and `+13 B` from Batch 43. Neutral component CSS is `66,469 B`, a
  `933 B` program gap against `64 KiB` and `+50 B`; shared runtime remains
  `10,492 B` with no Artist Card runtime. Primitives CSS remains below its
  `10.3 KiB` family ceiling at `10,485 B`.
- Contract, Studio, registry/docs, structural/static/parity/refinement audits,
  temporary site build, generated adapters, source/copy identity and official
  Shopify CSS validation pass. The component console has zero errors/warnings,
  and `site/dist` remains untouched.

## Risks And Open Questions

- Human visual approval is required for portrait ratio/crop/radius, overlay
  placement, typography and metadata rhythm.
- Owner decision: must Artist Card remain passive in some contexts, become a
  whole-card link everywhere, or support both at target level?
- Owner decision: should a future visual shell compose canonical Card?
- Target decision: which Shopify record and destination model represents an
  artist, and does merchant editing require a metaobject or another source?
- Architecture decision: a reusable cross-target media contract may eventually
  supersede the generic portrait slot; do not encode a Web URL now.

## Readiness Decision

Ready for human stability review, but not approved and not `stable`. The
passive/native boundary, canonical dependency, optional content, responsive
containment, accessibility modes, cross-target translation, performance and
Exhibit/Studio parity are technically reconciled. Human review must still
approve the visual candidate and decide activation, generic Card composition
and Shopify artist modeling. The contract remains `pilot` until that explicit
review.
