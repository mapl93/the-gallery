# Card Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/card.contract.json` (`0.3.0`)

## Result

Card remains a passive compositional surface with one public semantic property,
`variant`. It now gates decorative hover motion to fine pointers, honors reduced
motion, preserves full-bleed descendant focus, and contains localized/unbroken
body and footer content. No clickable, destination, content, media URL, selected,
or arbitrary style API was invented.

## Source Reconciliation

- Default, Flat, and Elevated remain the only variants and the only size remains
  the existing default spacing.
- Hover lift and media zoom are inside `(hover: hover) and (pointer: fine)`.
- Reduced motion sets Card and media transition duration to `0s` and suppresses
  both transforms.
- `:focus-within` releases root overflow clipping so a descendant outline can
  extend beyond a full-bleed edge. The media region still owns its crop.
- Body and footer use `min-width: 0` and `overflow-wrap: anywhere`.
- Card still has no role, tab stop, accessible name, event, or component JS.
  Host semantics and descendant behavior remain consumer-owned.

## Variant And Pointer Evidence

A real headed fine-pointer pass produced:

| Variant | Rest | Fine-pointer hover |
| --- | --- | --- |
| Default | small shadow, no transform | medium shadow, `translateY(-2px)` |
| Flat | no shadow, no transform | no shadow, no transform |
| Elevated | medium shadow, no transform | large shadow, `translateY(-2px)` |

A coarse/no-hover pass kept `transform: none` and the resting shadow. Under
reduced motion, Card and media transition duration resolve to `0s`; Card and image
transforms remain `none` even in a fine-pointer hover context.

Evidence includes `card-fine-pointer-hover-desktop.png`,
`card-coarse-pointer-desktop-after.png`, and
`card-forced-colors-reduced-motion-desktop-after.png` under
`output/playwright/refinement-batch-02/`.

## Focus Before And After

The stress fixture composed a full-width native link directly against the Card
content edge with a `2px` outline and `2px` offset.

- Before: Card `overflow: hidden`; the expected outline extended from `771px` to
  `1137px` while the Card bounds were `774px` to `1134px`, so both sides clipped.
- After: focused Card resolves `overflow: visible`; the same outline crosses the
  edge without clipping.

Evidence: `card-focus-clipping-before-desktop.png` and
`card-focus-full-bleed-desktop-after.png`.

## Content Before And After

The mobile fixture combined an unbroken German heading, Japanese body copy, and
a long localized Spanish footer.

- Before: heading scroll width was `613px` inside `276px`; Card scroll width grew
  to `637px` inside a `324px` client width.
- After: heading scroll width equals `276px`; Card scroll width equals `324px`;
  no body, footer, Card, or stage overflow remains.
- An empty Card collapses to its `2px` bordered shell without runtime failure,
  but is documented as invalid composition because it has no meaningful content
  or accessible purpose.

Evidence: `card-extreme-localized-mobile.png` and
`card-extreme-localized-mobile-after.png`.

## Exhibit And Studio Parity

Default Card markup and fixture text are byte-identical between Exhibit and
Studio. The renderer uses `article.card`, optional media/body/footer regions, and
the same Stoneware vessel fixture in both modes. Eight canonical screenshots
cover the four required viewports; Flat and Elevated have additional desktop
images.

## Performance And Targets

- Component JS, observers, timers, assets, and network requests: zero.
- Layout/overlay CSS: `4,403 B` gzip, below the `4.8 KiB` ceiling.
- Neutral component CSS: `56,336 B` gzip, below the `64 KiB` ceiling.
- Web and Shopify receive the same canonical CSS. Product Card continues to
  consume Card and retains its own media crop and focus treatment.
- Framework, Figma, and native adapters remain planned and must preserve host and
  child-composition ownership.

## Human Review Input

Approve the repository render or provide a Card-specific reference for:

- Default, Flat, and Elevated shadow differentiation.
- The `-2px` hover lift and `1.03` media zoom.
- Current radius, border, padding, and media/body/footer proportions.

No architecture decision is required unless whole-card navigation is proposed;
that remains outside the generic Card contract.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run audit:components`
- `npm run audit:refinement`
- `git diff --check`

`site/dist` was not rebuilt.
