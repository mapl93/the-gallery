# Divider Neutral Web Refinement Audit

Status: Approved stable by owner on 2026-08-25

Date: 2026-08-25

Contract: `components/contracts/divider.contract.json` (`0.4.0`, `stable`)

## Result

Divider now has two visual variants: Default and Decorative. The former Section
variant was removed because its only effect was external whitespace that belongs
to the composing parent. Both orientations now have zero external margin.

The public `semantics` property remains compatible. Studio presents it as the
clearer `Purpose: Visual only | Semantic`. Purpose intentionally
changes accessibility-tree exposure without changing appearance.

The owner approved the complete component after renewed Light/Dark review of
its visual styles, axes, purpose, Customize controls, and top-aligned Studio
presentation.

## Source Reconciliation

- Canonical `.divider--section` styling and its registry/contract option were
  removed.
- `.divider` sets `margin: 0`; vertical orientation no longer substitutes a
  horizontal layout gap.
- The former public spacing references were removed from Divider's customization
  surface. Parent layouts may still use their own spacing tokens.
- `--color-border-subtle` and `--color-border-decorative` remain the complete
  public customization surface.
- Literal `1px`/`2px` rule thickness remains private geometry.
- Contract, Studio metadata, MDX, dossier, registry, Neutral Web, Webflow, and
  Shopify copies are reconciled from canonical sources.

## State And Geometry Evidence

| Orientation | Variant | Rule | External margin |
| --- | --- | ---: | ---: |
| Horizontal | Default | `1px` high | `0px` |
| Horizontal | Decorative | `2px` high | `0px` |
| Vertical | Default | `1px` wide | `0px` |
| Vertical | Decorative | `2px` wide | `0px` |

The bounded parent owns vertical length. No viewport breakpoint, observer, or
runtime measurement is introduced.

At the desktop Studio fixture, the horizontal rule measured `672px` across and
the bounded vertical rule measured `192px` high. Exhibit measured `520px` across
because its parent pedestal is narrower; thickness, margins, color, markup, and
renderer remained identical. In Light, Default resolved to `rgb(229, 229, 229)`
and Decorative to `rgb(191, 161, 147)`. In Dark, against the `rgb(23, 23, 23)`
stage, they resolved to `rgb(64, 64, 64)` and `rgb(139, 101, 83)` respectively.

## Purpose Evidence

- Visual only: the rule has `aria-hidden="true"`.
- Semantic separator: the rule remains visually identical and is exposed as a
  native separator.
- Semantic vertical: the rule additionally has
  `aria-orientation="vertical"`.
- Browser comparison confirmed identical width, height, four margins, and color
  before and after changing only Purpose.

## Exhibit And Studio Parity

ADR 0087 makes both views mount the same registered Divider renderer, contract,
Studio definition, implementation, and initial fixture. The default fixture is:

```html
<hr class="divider" aria-hidden="true">
```

Exhibit removes only the Studio inspector. It does not render the MDX preview as
a second live implementation.

## Performance And Targets

- Component JS, listeners, observers, timers, assets, and network requests: zero.
- Neutral Web and Shopify adapters contain the regenerated canonical rule.
- The performance audit reports `19/21` passing surfaces and no required gaps;
  its two diagnostic aggregate overages are pre-existing global bundle items
  documented by ADR 0273, not Divider regressions.
- React, Angular, Figma, SwiftUI, and Compose remain planned translations rather
  than certified artifacts.

## Accepted Human Decision

ADR 0281 records the owner decision applied in this pass:

1. Keep Default and Decorative as the only visual variants.
2. Make the parent layout own all surrounding spacing.
3. Keep the public semantic property and present it in Studio as Purpose with
   Visual only and Semantic options.
4. Do not manufacture a visual difference for purpose.

On 2026-08-25, in direct response to the explicit stability question, the owner
said “Perfecto, vamos con el siguiente componente.” This closes the renewed
human review and promotes Divider to `stable` without promoting any other
component.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:refinement-decisions`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:components`
- `npm run audit:refinement`
- `npm run audit:refinement:performance`
- `npm run audit:exhibit-studio-parity`
- temporary docs build outside `site/dist`
- `git diff --check`

`site/dist` was not rebuilt.
