# Component Dossier: Logo Bar / Trust Bar

Status: `human-review-ready`

Target reviewed: Neutral Web native mark collection with optional canonical
Marquee presentation

Contract: `components/contracts/logo-bar.contract.json`

Owner decision: `S12-B`, recorded in
`docs/refinement/owner-decision-responses.md` and ADR 0232

## Recommendation

Implement one Logo Bar with `static | marquee` presentations and a static
default. The component owns the semantic collection profile and visual treatment
of target-supplied marks. It does not own another motion engine: `marquee`
composes canonical S18 Marquee, including its one authoritative list, bounded
inert copy, logical direction, semantic pace, persistent Pause/Resume control,
focus and hover suspension, hidden-document suspension, reduced-motion mode and
no-JavaScript fallback.

This implements the owner's selected `S12-B` direction without turning private
mark geometry, gaps, color treatment, clone count or raw timing into public API.

## Purpose, Use Cases, And Limits

- Presents a finite, ordered collection of organizations, publications,
  certifications, payment brands or other trust marks associated with nearby
  content.
- Supports passive informative or decorative marks and native linked marks when
  a real destination exists.
- May include a visible contextual label. The target chooses an appropriate
  heading level when the label participates in the surrounding document
  outline.
- Does not create endorsement, certification, sponsorship or partnership by
  rendering an asset. Targets own truthful claims, ordering, destinations,
  accessible names and brand-use permission.
- Does not own provider data, analytics, consent, asset delivery, image loading,
  freshness or destination routing.
- Must not be the sole location for critical policy, price, availability,
  status, deadline, instruction or error information.

## Current Gallery Baseline

- Registry `S12`; contract `0.2.0`, `pilot`; `static | marquee`; no recorded
  dependencies.
- The static CSS uses a generic flex container rather than a native list. It
  hardcodes `28px` mark height, `120px` maximum width, grayscale and `0.4`
  opacity, then adds pointer-only emphasis even to passive marks.
- The marquee CSS translates one unduplicated container for `20s` to `-50%`.
  It does not provide a seamless source/copy track, persistent control, logical
  direction, semantic pace or an owned runtime.
- The shared Exhibit/Studio renderer uses text placeholders, an unnamed
  `section`, a generic child `aria-label`, and no representative informative,
  decorative or linked mark semantics.
- Studio previously disabled the advertised animation with site-only CSS, so
  selecting the variant could not prove behavior.
- ADR 0231 now supplies the missing canonical motion boundary. Keeping the old
  Logo Bar animation would duplicate and contradict that accepted owner.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML image alternative-text guidance](https://html.spec.whatwg.org/multipage/images.html) | Logos representing an entity need that identity; decorative images use an empty alternative; linked images need a name that communicates the link purpose. | Each target-supplied mark must be classified as informative, decorative or functional. |
| [WAI decorative images](https://www.w3.org/WAI/tutorials/images/decorative/) | Decorative images use a null alternative so assistive technology can ignore them. | Passive decoration and every motion-only copy must stay out of the accessibility tree. |
| [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Automatically moving parallel content lasting more than five seconds needs a pause, stop or hide mechanism unless essential. | Logo Bar cannot own an uncontrolled infinite animation; canonical Marquee supplies the required persistent control. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | No interoperable Logo Bar or Marquee widget model exists. | Use native section/list/image/link semantics and a Gallery-owned progressive presentation rather than inventing an ARIA widget role. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | No Logo Bar primitive defines a portable component API. | Preserve target-agnostic composition instead of inheriting a React-shaped contract. |
| [Polaris components](https://polaris-react.shopify.com/components) | Polaris does not define an equivalent Logo Bar contract. | Shopify needs a target-native section/block mapping over the same source semantics. |
| [Shopify block object](https://shopify.dev/docs/api/liquid/objects/block) and [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) | Ordered theme blocks can expose editor attributes and native images preserve target-supplied alternative text. | A future Shopify section can map ordered image/link blocks into the same list and select static or canonical marquee enhancement. |

WAI-ARIA APG defines no Logo Bar pattern. Native HTML is therefore the primary
semantic evidence; Logo Bar is not a composite widget and adds no custom role.

## Owner Reference Audit

The Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, nodes
`943:7` and `1020:480`. Those nodes show Button controls and “Add to cart”
artwork rather than Logo Bar. They cannot approve S12 anatomy, mark assets,
layout, sizing, color or motion.

No component-specific visual reference is currently available. The owner has
approved the semantic/architectural direction, not final artwork. Mark box,
spacing, borders, label treatment, wrapping density and brand-color policy stay
explicit human-review questions.

## Anatomy And Composition

| Part | Requirement | Neutral Web semantics |
| --- | --- | --- |
| root | required when at least one valid mark exists | `section` when a visible contextual label names it; otherwise `div` |
| label | optional | target-chosen contextual heading in product output; its id labels the section |
| viewport | required | canonical Marquee viewport; visually clips only after valid motion enhancement |
| track | required | canonical Marquee presentation track |
| source list | required | one authoritative `ul` in target-authored order |
| item | one or more | native `li`; layout only |
| mark | required per valid item | target-owned `img` or SVG with informative, empty or functional naming |
| destination | optional per item | native `a` only when a real URL exists |
| visual copy | marquee only, generated | canonical Marquee copy, `aria-hidden`, inert and non-interactive |
| playback control | marquee only after valid enhancement | canonical compact Button with localized next-action label |

The root is omitted when the target provides no valid marks. Static output does
not render a hidden playback control. Marquee output requires at least two marks
to enhance; one mark remains readable and static.

## State, Variant, Size, And Mode Matrix

| Dimension | v1 scope | Behavior |
| --- | --- | --- |
| presentation | `static | marquee` | Static defaults to intrinsic wrapping; marquee opts into canonical S18 Auto. |
| item mode | passive or native link | Mixed collections are valid; only real links receive pointer and focus treatment. |
| mark meaning | informative, decorative or functional | Target decides per record; generated copies are always decorative. |
| direction | `forward | reverse` | Marquee-only logical direction inherited from S18; physical travel adapts to RTL. |
| pace | `slow | default | fast` | Marquee-only distance-normalized semantic preset inherited from S18. |
| playback | pending, playing, temporary pause, durable pause, hidden pause | Inherited from the one canonical Marquee state owner. |
| content count | empty, one, many | Empty omits root; one stays static; many may wrap or enhance. |
| size | one default | Mark optical box and gap stay private pending visual review. |
| color mode | light, dark, forced colors | Arbitrary raster/brand assets are not recolored or filtered by the component. |
| reduced motion/no JS | static | Source list remains readable; no visual copy or usable motion control. |

Neutral Web motion is uncontrolled for the live component lifetime and emits the
canonical Marquee playback event. Framework targets may project controlled state
around that same owner; they must not introduce a second state machine.

## Public API

Expose only cross-target semantic decisions:

- `presentation`: `static | marquee`, default `static`.
- `label`: optional visible contextual label; its final heading element is
  target/context owned rather than a fixed public rank.
- `marks`: required ordered composition slot or target record collection.
- `direction`: `forward | reverse`, default `forward`, relevant only to
  `marquee`.
- `pace`: `slow | default | fast`, default `default`, relevant only to
  `marquee`.
- `pauseLabel` and `resumeLabel`: localized next-action Button labels required
  when `marquee` is selected.

Per-record asset, alternative-text intent and optional destination belong to the
`marks` composition rather than seven parallel component arrays. Do not expose
gap, dimensions, opacity, grayscale, wrapping threshold, duration, pixels per
second, clone count, translation distance or pause-on-hover flags.

## Token And Hardcoded-Value Audit

| Current value | Assessment | Direction |
| --- | --- | --- |
| `--space-layout-container` | existing public layout token | retain through canonical Marquee/root layout |
| `--color-border-subtle` | existing public semantic token | retain for private section boundaries pending visual review |
| `--color-text-secondary` | existing public semantic token | use for the docs fixture's current-color vector artwork; do not recolor consumer raster assets |
| body typography multiplied by `.75`, weight `600`, tracking `.08em`, uppercase | private hardcoded label recipe | replace with an existing body-small typography recipe; keep visual casing private |
| `16px`, `24px 40px` | private hardcoded spacing | reconcile to existing semantic spacing tokens where appropriate |
| `28px`, `120px` | private mark geometry | move into component-private variables with container-responsive bounds |
| opacity `.4`, grayscale `1` and passive hover | misleading brand/interaction treatment | remove; only native links receive an interaction state |
| `20s`, `linear`, `infinite`, `-50%` | duplicate incomplete runtime | remove; canonical Marquee owns measured motion |

No new public component token is justified. Private `--_logo-bar-*` values own
optical geometry until owner visual review accepts a stable public decision.

## Responsive, Content, And Accessibility Tests

- Empty, one, two and many marks; mixed aspect ratios; informative, decorative,
  linked and mixed record sets.
- Optional label omitted; short, long, localized and unbroken labels.
- Static wrapping and marquee enhancement in `200px`, mobile, tablet, desktop
  and XL containers.
- Light, dark, forced colors, reduced motion, RTL and 200% zoom.
- No JavaScript source-order fallback and a failed/insufficient enhancement.
- No horizontal page overflow, clipped focus, distorted assets, fabricated
  accessible names, duplicate focus stops or duplicate accessible records.
- Pointer and keyboard access for the authoritative linked mark; generated links
  must be inert and unfocusable.
- Exact normalized Exhibit/Studio DOM and behavior parity from one renderer and
  fixture.

## Runtime And Performance Budget

- Static: zero component JavaScript work beyond the shared renderer, zero
  observer entry, zero clone, zero timer and zero layout read.
- Marquee: reuse S18's one bounded enhancement entry, one shared ResizeObserver,
  at most one visual copy and CSS-transform animation; no polling, per-frame
  JavaScript, network request or component asset.
- Linked visual copies remain inert and create zero additional tab stops.
- Target images should provide intrinsic dimensions. Loading/eager policy stays
  contextual because above-the-fold marks may be immediately visible.
- The Sections family must remain within its recorded CSS budget; any global
  budget overage stays documented rather than hidden by a component exception.

## Cross-Target Translation

| Target | Mapping |
| --- | --- |
| Neutral Web | native labelled section/generic root, list, target images/SVG and optional links; canonical Marquee attributes/runtime only when selected |
| Shopify | future target-native section with ordered image/link blocks, explicit alt/entity intent and `block.shopify_attributes`; editor preview should remain static unless that target enhancement is certified |
| React/Angular | thin renderer over the same ordered records; canonical runtime or equivalent single playback owner, never framework-only source semantics |
| Webflow/Framer | native collection and links; marquee controls expose only accepted presentation, direction, pace and localized labels |
| Figma | static component/set with variants documenting the motion profile; visual motion cannot certify runtime accessibility |
| SwiftUI/Compose | ordered passive/link marks with equivalent accessibility naming and one platform-native playback owner |

## Risks And Human Questions

1. Provide or relink component-specific Logo Bar artwork; current Figma nodes
   belong to Button.
2. Human review must approve contextual label hierarchy, borders, padding, mark
   optical boxes, gap, wrap density, color policy and linked visual state.
3. Product/content owners must verify every trust claim, entity name,
   destination and brand-use right.
4. Shopify editor preview, block limits, image settings and target-native
   runtime remain adapter implementation work, not Neutral Web assumptions.

## Readiness Decision

The architectural decision and implementation are reconciled. Source, contract,
shared renderer, Exhibit/Studio parity, adapter artifacts, interaction,
responsive/accessibility evidence, performance accounting and automated gates
are complete. S12 is ready for human stability review, remains `pilot`, and
must not be promoted to `stable` without explicit owner review.
