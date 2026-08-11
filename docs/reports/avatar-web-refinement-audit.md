# Avatar Web Refinement Audit

Status: Human-review-ready implementation candidate; remains `pilot`

Date: 2026-07-20

## Outcome

Avatar is a passive, exact-size, inline-composable identity thumbnail with
logical no-shrink geometry, normalized native image crop, contextual identity
naming, tokenized weight, forced-color boundary, exact Exhibit/Studio parity and
zero neutral runtime. ADR 0237 applies the accepted A15-A direction: targets
resolve image or initials explicitly, and `size` couples 32/40/56/80px to
Caption/Body Small/Body Default/Body Large typography. No component was
promoted to `stable`.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Compact identity representation only; not thumbnail, uploader, crop service, trigger, status, data owner or network loader. |
| Anatomy and composition | pass | Passive root plus explicit native image or target-provided initials; external Link/Button and status composition documented. |
| Variants, sizes and states | pass | One circular presentation and exact 32/40/56/80px sizes; no public color, shape, status or lifecycle state. |
| Public API and ownership | pass | `size` is the only property and couples coherent diameter/type steps; image delivery, initials derivation and fallback remain target-owned. |
| Tokens and visual system | pass | Existing surface, text, radius, body family and semibold weight; geometry/crop/line-height remain private. |
| Accessibility and interaction | pass | Contextual native alt or one named initials image; redundant adjacent identity hidden/null-alt; zero focusables and no widget behavior. |
| Responsive/content resilience | pass | Four viewports, all sizes, inline and 120px Flex composition, five localized forms, invalid long clipping, dark, forced colors and zoom. |
| Runtime and assets | pass | No Avatar behavior in shared JS; no listener, observer, timer, request, parser, preloader, layout read or new asset. |
| Cross-target translation | pass | Web and Shopify consume one CSS scale; all targets resolve one explicit image-or-initials composition without neutral runtime. |
| Exhibit/Studio parity | pass | One renderer and fixture produce exact serialized Avatar markup; MDX mirrors standalone and contextual native composition. |
| Architecture/readiness | **ready for human review** | ADR 0237 resolves the architecture and semantic scale; exact visuals still require owner review. |

## Contract And Browser Evidence

- Contract `0.4.0` keeps one `size` property and records passive identity,
  explicit composition, contextual native naming, fixed geometry, forced-color
  boundary and target-owned image/fallback lifecycle.
- Exhibit and Studio serialize the exact same
  `<span class="avatar" role="img" aria-label="Maria Pacheco">MP</span>`
  fixture. It has zero focusables, no animation and no component runtime.
- Small, Default, Large and Extra Large measure exact 32, 40, 56 and 80px outer
  squares with equal client/scroll dimensions in normal colors and fixed flex
  bases. At Desktop, initials resolve to 12, 14, 16 and 20px through Caption,
  Body Small, Body Default and responsive Body Large; Body Large is 18px on
  narrower modes. Private line height is `1` and weight resolves through the
  semibold token to 600.
- In ordinary prose the root computes to `inline-flex`, `vertical-align: middle`
  and 32px. In a 120px Flex row an 80px Avatar remains exactly 80px while the
  wrapper stays `120/120px` client/scroll width.
- A 1800x2700 local portrait renders as a block with `object-fit: cover` in exact
  80x80 and 56x56 boxes. Standalone image alt is non-empty; adjacent image alt
  is empty. Standalone initials have one image role/full label; adjacent initials
  are hidden.
- Latin, accented, Arabic/RTL, CJK and emoji-grapheme initials all remain exact
  56px squares. Invalid `MARIAPACHECO` produces 89px internal scroll width but
  is clipped inside the 56px root and does not expand the `1280/1280px` document.
- A canonical Link wrapper owns its visible two-pixel focus outline, href and
  Enter activation to `/components`; its Avatar child is hidden as redundant.
- Initials contrast is 7.17:1 in light (`#525252` on `#f5f5f5`) and 10.21:1 in
  dark (`#d4d4d4` on `#262626`). Forced colors keeps a 40px outer square with a
  one-pixel CanvasText boundary, CanvasText initials, no animation and no focus.
- At 200% CSS zoom the default Avatar renders as an 80x80 visual square from its
  40x40 CSS box while the document remains `800/800px` client/scroll width.
- Sixteen final images are stored under
  `output/playwright/refinement-primitives/avatar-0237/`, with the invalid full-
  page zoom diagnostic intentionally excluded from the evidence manifest.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Passive Span/Div with explicit initials or direct native image and four class sizes. | Refined and browser-evidenced with semantic size/type pairings. |
| Shopify | Embedded generated class around a Shopify image object beside visible author text. | Implemented and validated; redundant alt is null and target fallback stays target-owned. |
| React / Angular | Render one target-resolved image or initials composition. | Planned; may use target-native fallback internally without changing neutral API. |
| Figma | Four size/type choices with semantic neutral presentation and fixture initials. | Studio validates the same accepted pairings. |
| SwiftUI / Compose | Native clipped image or target-provided initials at fixed semantic sizes. | Conceptual mapping; loading/failure, names and interaction remain native. |

## Performance And Risks

- Final Primitives CSS is `10,539 / 10,547 B` gzip. The Avatar slice is `958 B`
  raw / `446 B` gzip with SHA-256
  `0dae2fb55791c8a9ad2c41aac23a452cd4aaeb9231c27fdc89609da590838bc4`.
  Avatar adds `0 B` runtime and no asset; the `70,362 / 65,536 B` global Web CSS
  and shared-runtime exceptions remain documented program gaps rather than
  Avatar-specific regressions.
- Human review must approve diameters, circle, neutral surface/text, crop,
  weight, accepted type scale and imagery. No component-specific owner visual
  asset is available beyond non-inspectable Studio trace IDs.
- Targets must prevent duplicate names, non-interactive click roots, color-only
  status and low-quality initials derivation for localized names.

## Validation

Contract, Studio, registry/docs, DTCG source, Neutral Web and Shopify adapters,
locale JSON, semantic DOM, four sizes, image crop, contextual identity naming,
canonical Link composition, localized/extreme initials, inline/narrow layout,
dark, forced colors, reduced motion, zoom, contrast, four-viewport evidence,
TypeScript, structural/parity/static-preview/refinement audits, deterministic
gzip, generated-copy identity, diff checks and `site/dist` cleanliness are
included in the final ADR 0237 validation.
