# Card Neutral Web Refinement Audit

Status: Approved stable by owner on 2026-08-25

Date: 2026-08-25

Contract: `components/contracts/card.contract.json` (`0.3.0`, `stable`)

## Result

Card remains a passive compositional surface with one public semantic property,
`variant`. It now gates decorative hover motion to fine pointers, honors reduced
motion, preserves full-bleed descendant focus, and contains localized/unbroken
body and footer content. No clickable, destination, content, media URL, selected,
or arbitrary style API was invented.

The owner approved the complete component after renewed live Light/Dark review
of the three variants, Hover behavior, editorial fixture, compact composition,
structured Studio appearance controls, and cross-surface parity.

## Source Reconciliation

- Default, Flat, and Elevated remain the only variants and the only size remains
  the existing default spacing.
- Hover lift and media zoom are inside `(hover: hover) and (pointer: fine)`.
- Reduced motion sets Card and media transition duration to `0s` and suppresses
  both transforms.
- `:focus-within` releases root overflow clipping so a descendant outline can
  extend beyond a full-bleed edge. The media region still owns its crop.
- Body and footer use `min-width: 0` and `overflow-wrap: anywhere`.
- Body and footer now share the existing compact component inset
  (`--tg-space-component-xs`, `16px` in the reviewed desktop mode) instead of
  the former `32px` layout element gap.
- The one Exhibit/Studio fixture now renders the licensed site-owned
  `textured-vase.jpg` editorial image instead of a CSS-drawn pseudo-placeholder.
  This does not create a Card media-source property or target asset dependency.
- Contract and Studio expose Default/Hover as the state axis independently from
  Default/Flat/Elevated variants. Combined hover selectors remain CSS evidence,
  not additional public states, in accordance with ADR 0274.
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

The three table rows are Variant + Hover coverage combinations. They do not
define `Flat hover` or `Elevated hover` as separate contract states.

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
the same editorial vessel fixture in both modes. Eight canonical screenshots
cover the four required viewports; Flat and Elevated have additional desktop
images.

## Performance And Targets

- Component JS, observers, timers, target assets, and network requests: zero;
  the editorial image is a documentation fixture only.
- The largest dependency-closed Layout install slice measures `21,070 B`
  against its `23,552 B` ceiling, leaving `2,482 B` headroom.
- The Storytelling install slice remains the program's one documented required
  gap at `25,072 B / 21,504 B` because Artist Card now correctly includes its
  Card dependency. The unchanged ceiling and exact gap remain visible in the
  performance report and Artist Card audit.
- The neutral component CSS aggregate is a diagnostic, not install delivery;
  its current `73,144 B / 65,536 B` overage remains reported separately.
- Web and Shopify receive the same canonical CSS. Product Card and Article Card
  retain their existing Card composition; Author Card now composes Default/Flat
  Card and Artist Card composes Flat Card under owner decision 82. Product Card
  retains its accepted stationary surface override. Review deliberately keeps
  its independent domain anatomy after the Review Card rename.
- Framework, Figma, and native adapters remain planned and must preserve host and
  child-composition ownership.

## Accepted Human Decision

The owner approved the current fine-pointer Hover treatment on 2026-08-25:
Default/Elevated retain the `-2px` lift and shadow progression, Flat remains a
no-op, and optional media keeps the `1.03` zoom under the existing pointer and
reduced-motion gates (ADR 0284).

During the same live review, the owner identified the CSS-drawn fixture as not
reading like the image placeholders used elsewhere, found the `32px` content
inset excessive, and found the body-to-footer distance too large. ADR 0287
records the shared editorial-image fixture and compact `16px` component inset.

After reviewing those corrections and the structured shadow controls live, the
owner said “Ok listo aprobado el componente, cual es el siguiente?” on
2026-08-25. ADR 0290 records that explicit approval and promotes Card to
`stable` without promoting any specialized Card composition.

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
