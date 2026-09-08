# Component Dossier: Card

Status: `stable`

Target reviewed: Neutral Web and shared composition

Contract: `components/contracts/card.contract.json`

## Recommendation

Retain Card as a passive compositional surface with only the accepted visual
`variant` property. Keep media, body, footer, semantic host, content, navigation,
and actions consumer-owned. Preserve current hover presentation only on
hover-capable fine pointers and remove all decorative lift/zoom under reduced
motion. Do not add an artificial content API or make the Card root generically
clickable.

## Purpose And Limits

- Card groups related content and optional actions within one visual surface.
- The semantic host depends on content: `article`, `section`, `aside`, `li`, or a
  neutral container.
- Optional media, body, and footer regions standardize clipping and spacing.
- Card owns surface, border, radius, shadow, padding, and accepted hover
  presentation.
- Card does not own titles, media data, navigation destinations, action events,
  selection, disclosure, loading, or commerce behavior.
- Product Card, Article Card, Author Card, and Artist Card consume Card rather
  than copy its shell. Review is a domain component, and Gift Card is a commerce
  identity; neither belongs to this layout-card dependency family.

## Current Gallery Baseline

- Registry identity: `B1`, layout, no dependencies.
- Contract: `0.3.0`, `stable`; five anatomy parts, three variants, one size, two
  visual states, five behavior rules, one property, and 10 public tokens.
- Canonical variants: Default, Flat, Elevated.
- Hover lift and media zoom apply only to hover-capable fine pointers; reduced
  motion removes both transitions and transforms.
- Root clipping is released during `:focus-within`, preserving the surface/media
  crop at rest without clipping an edge-aligned descendant focus indicator.
- Body and footer inherit resilient wrapping for localized and unbroken content.
- Shared Exhibit/Studio renderer uses semantic `article` fixture content and
  canonical Card classes. Its site-owned fixture uses the shared licensed
  editorial media collection rather than a CSS-drawn pseudo-placeholder.
- The registered design reference is the Button pilot frame, not Card-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: sections](https://html.spec.whatwg.org/multipage/sections.html) | HTML supplies semantic sectioning/content containers rather than a `card` element. | Card presentation must not choose semantic meaning for consumers. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Groups related content/actions; supports variants, sizes, inset content, and explicit interactive host composition. | Gallery's variant-only API is conservative; content and interaction remain compositions. |
| [Shopify Polaris Box](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/box) | Generic containers expose layout/surface and optional semantic roles; examples build card layouts by composition. | Shopify can map the surface without importing commerce or navigation behavior. |
| [WAI APG introduction](https://www.w3.org/WAI/ARIA/apg/about/introduction/) | APG is not a design-system catalog and has no generic Card widget pattern. | Use native semantics and patterns of actual descendants rather than inventing Card ARIA. |

Open UI and APG provide no generic Card role or keyboard model.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | context-appropriate host | Card + consumer | Owns visual shell, not meaning. |
| Media | no | neutral media region | Card layout / consumer data | Clips visual content. |
| Media image | no | `img` | consumer | Alt and responsive sources are content/target owned. |
| Body | no | neutral content region | Card layout | Owns accepted padding only. |
| Footer | no | contextual footer region | Card layout / consumer | Holds metadata or actions without inventing them. |

Headings, descriptions, lists, links, and buttons remain native descendant
composition. A whole-card destination may use a target-specific host only when
there are no conflicting nested controls; Product Card uses its accepted
single-link composition instead.

## Variant, Size, State, And Mode Matrix

- Variants: Default, Flat, Elevated.
- Size: one default spacing scale; no new density inferred.
- Visual states: Default and Hover. Hover combines independently with Default,
  Flat, or Elevated; the combined selectors remain implementation evidence, not
  additional public states.
- Modes: light/dark, fine hover pointer, coarse/no-hover pointer, reduced motion,
  forced colors, with/without media/body/footer.
- Card has no controlled value, disabled, busy, selected, expanded, or current
  state. Those belong to composed descendants or specialized components.

## Public API And State Ownership

ADR 0070 accepts only `variant`. That remains the complete semantic property
surface for the generic Card. Content is child composition rather than strings or
slots invented for Studio. Consumers own the host element and descendant state.
No `clickable`, `href`, `selected`, media URL, arbitrary padding, or shadow level
is introduced during this refinement.

ADR 0274 keeps Variant and State orthogonal. Studio therefore exposes one Hover
state and combines it with the selected Default, Flat, or Elevated variant; it
does not publish `Flat hover`, `Elevated hover`, or media hover as separate state
choices.

## Token And Value Audit

- Colors: surface primary and subtle border.
- Radius: medium.
- Shadows: small, medium, large.
- Motion: base and slow durations; default and out easing.
- Spacing: compact component inset (`--tg-space-component-xs`).
- Private `--_card-*` variables correctly compose the reviewed surface.
- Literal `-2px` lift and `1.03` image scale are internal motion geometry, not
  semantic API. Their visual acceptance still requires human review.

## Visual And Content Audit

Evidence covers every variant; absent optional regions; short, long, localized,
and unbroken child content; footer wrapping; nested focus at the clipped boundary;
and narrow/wide containers. Card body/footer own safe wrapping as slot layout;
consumer content still owns intentional no-wrap/code behavior when explicitly
required. The owner-directed compact inset reduces body, footer, and inter-region
spacing together without introducing a density or arbitrary-padding property.

## Accessibility And Interaction

Card adds no role, name, tab stop, or keyboard model. Semantic host, heading
hierarchy, image alt, and descendant accessible names remain consumer-owned.
Nested interactive controls retain native behavior. Card motion is decorative and
must stop under reduced motion. Hover presentation must not be the only carrier
of information or action availability.

## Responsive And Performance

Card is container-sized and introduces no viewport breakpoint or layout observer.
It has zero component-specific JS, network request, asset, or continuous work.
Fine-pointer hover uses transform and shadow; reduced motion must remove both Card
and media transitions/transforms. Card belongs to the layout/overlay CSS family.
The owner approved the existing fine-pointer lift, shadow progression, and
optional media zoom during live review on 2026-08-25 (ADR 0284).

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Contextual host plus canonical classes and child composition. | Implemented and evidenced. |
| Shopify | Contextual Liquid host and canonical CSS class. | Adapter validates; target visual composition pending. |
| React / Angular | Polymorphic/host wrapper or copied classes; children own content/state. | Contract-ready; no adapter certified. |
| Figma | Variant and compositional regions only. | Card-specific reference absent. |
| SwiftUI / Compose | Surface container with child content and Gallery tokens. | Conceptual mapping only. |

## Exhibit And Studio Parity

Exhibit and Studio mount the same Card renderer, article fixture, regions, and
canonical CSS under ADR 0087. Studio stage classes supply fixture media/content
only and must not recreate the Card shell.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Hover lift/zoom was not limited to hover-capable fine pointers. | resolved | Hover media query now gates both effects. | implementation |
| Card had no reduced-motion fallback. | resolved | Card and media transitions resolve to `0s`; transforms resolve to `none`. | implementation |
| Root clipping hid a full-bleed descendant focus ring. | resolved | `:focus-within` releases overflow; the same probe no longer clips. | implementation |
| Long/unbroken body content overflowed from `276px` to `613px`. | resolved | Body/footer use `min-width: 0` and `overflow-wrap: anywhere`; Card scroll width remains `324px`. | implementation |
| Current hover lift, shadow progression, and optional media zoom required visual acceptance. | resolved | Retain the current fine-pointer treatment, Flat no-op, and reduced-motion fallback. | owner, ADR 0284 |
| CSS-drawn fixture media read as an empty placeholder rather than a real image. | resolved | Use the shared licensed editorial image fixture in the one Exhibit/Studio renderer; keep media source target-owned. | owner, ADR 0287 |
| The `32px` body/footer inset and full body-to-footer separation were visually excessive. | resolved | Use the existing compact component inset, currently `16px`, for body/footer alignment and spacing. | owner, ADR 0287 |
| No Card-specific design reference exists. | accepted baseline | The owner approved the refined repository render as the v1 visual baseline. | owner, ADR 0290 |

## Evidence And Validation

- Exhibit and Studio render identical default Card markup and fixture.
- The shared fixture renders `/media/editorial/textured-vase.jpg` as a real
  informative image with the same content and `16px` Card inset in both views.
- Eight final screenshots cover both surfaces at all four required viewports;
  variant and special-mode images share
  `output/playwright/refinement-batch-02/`.
- A headed fine-pointer pass verifies Default `-2px`/medium-shadow hover,
  Flat no-op hover, and Elevated `-2px`/large-shadow hover. A coarse-pointer pass
  keeps `transform: none`.
- Reduced motion resolves Card and media transition durations to `0s` and both
  transforms to `none`.
- Before/after focus and extreme-content screenshots document the two reproduced
  failures and their fixes.
- Full results: `docs/reports/card-web-refinement-audit.md`.

## Risks And Open Questions

- Human visual review closed on 2026-08-25 with explicit approval of the
  complete Card, including resting surfaces, radius, border, media proportion,
  compact inset, variant differentiation, Hover treatment, and structured
  Studio appearance controls.
- If whole-card interaction is later required generically, it needs an explicit
  host/navigation decision rather than an implied hover effect.
- Framework/Figma/native target artifacts remain uncertified.

## Readiness Decision

Approved `stable` by the owner on 2026-08-25. The reviewed Default, Flat, and
Elevated surfaces; independent Default/Hover states; compact editorial
composition; structured Studio appearance controls; accessibility and motion
safeguards; and Exhibit/Studio parity remain the v1 baseline.
