# Brand Story Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: Brand Story (`S8`, review order `168`)

## Outcome

Brand Story is now a narrow passive profile of canonical Image with Text rather
than a second media-and-narrative implementation. Required target-owned media,
visible title and narrative body form one named thematic section. Eyebrow and
ordinary editorial signature footer remain independently optional.

Exhibit and Studio use one renderer, fixture, validity rule, normalized DOM and
canonical CSS. Shopify exposes a localized addable section that delegates the
same validation and markup to a shared Liquid composition also consumed by the
general Image with Text section. ADR 0152 records the product and composition
boundary.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Canonical dependency | S8 duplicated grid, media, content and type with no dependency | Registry/contract depend on `image-text`; only signature styling remains S8-owned | pass |
| Required composition | Empty title or missing required slots could leave an incomplete section | Web and Shopify omit the complete profile without media, trimmed title or meaningful body | pass |
| Section naming | Native section had no heading association | Target-unique title id supplies `aria-labelledby` | pass |
| Signature semantics | Generic `div` with redundant replacement label | Optional visible `footer`; text has no redundant label and image purpose is target-owned | pass |
| Tablet grid | Aspect-ratio media stretched from a `394px` track to `632.95px`, obscuring content | Canonical media is constrained to its track; exact `394/394px` split | pass |
| Narrow embedding | XL `160px` padding collapsed `200–260px` roots | Canonical padding is bounded by element/container tokens with `8cqi`; zero overflow at `200–1120px` | pass |
| Responsive ownership | S8 viewport/container rules plus Studio media-height repairs competed | Canonical Image with Text owns intrinsic response; S8 and Studio repair rules removed | pass |
| Public API | Five fields existed but parallel layout details remained implicit | Five semantic slots only: required media/title/body, optional eyebrow/signature | pass |
| Shopify | Copied CSS only, `css-ready` | Shared documented snippet plus localized section; all maturity layers ready | pass |
| Runtime | Passive but structurally duplicated | Zero component runtime, state, focus or motion | pass |

## Contract And API

Contract `0.3.0` remains `pilot` with one default profile and five properties:

- `media` — required target-owned native media slot.
- `eyebrow` — optional short contextual string.
- `title` — required non-empty visible contextual heading.
- `body` — required non-empty target-owned rich-content slot.
- `signature` — optional target-owned text or media footer without proof or
  authenticity semantics.

S8 does not expose Image with Text presentations/actions, crop, ratio, side,
breakpoint, inset, heading level, CMS object or signature medium. It has no
controlled/uncontrolled state. Media, rich text, sanitization, localization,
asset purpose and editor lifecycle remain target-owned.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Organization/studio origin or philosophy profile; distinct from artist, collection, hero and proof records. |
| Anatomy and composition | `pass` | Named native section, required canonical media/content/title/body, optional eyebrow/footer. |
| Variants and modes | `pass` | One fixed profile; complete/incomplete, optional parts, text/image signature and theme modes documented. |
| Public API | `pass` | Five stable semantic inputs; generic layout controls remain on Image with Text. |
| State ownership | `pass` | No local state; target content editors own their own lifecycle. |
| Tokens and values | `pass` | Canonical tokens inherited; S8 owns signature type/color and two private media caps only. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, themes and extremes; aesthetics await owner approval. |
| Accessibility | `pass` | Required visible heading names native section; contextual alt ownership; footer semantics; zero focus stops. |
| Interaction and motion | `pass` | Passive component, no keys/listeners/observers/timers/animation. |
| Responsive behavior | `pass` | Intrinsic auto-fit composition, exact tablet tracks and contained `200–1120px` roots. |
| Content resilience | `pass` | Optional omission, long Spanish, Arabic RTL, unbroken strings and image signature. |
| Runtime and assets | `pass` locally / global gap | S8 adds no JS or bundled asset; family CSS remains below its ceiling. |
| Cross-target translation | `pass` for Web/Shopify/Webflow | Shopify is target-ready; framework/Figma/native projections remain planned. |
| Documentation parity | `pass` | One renderer/fixture; normalized Exhibit/Studio DOM hash is identical. |
| Verification | `pass` | Source validators, adapters, browser matrix, budgets, copies, console, diff and clean `site/dist`. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-67/` with nine
  baseline and 19 final captures.
- Exhibit and Studio normalize to FNV-1a `c1e58f96` at Mobile `390x844`,
  Tablet `820x1000`, Desktop `1440x1000` and XL `1920x1200`. Only the
  target-unique React id changes when the shared renderer remounts.
- Every final root is `.brand-story.image-text`, named by its visible `h2`,
  with informative fixture alt, native footer signature and zero focusable
  surfaces.
- Tablet is an exact `394px 394px` grid. Media and content share the same
  `450.72px` row; no media overlap remains.
- Direct `200/260/520/900/1120px` roots remain exact-width with equal
  client/scroll width and no descendant outside the root. They produce
  `200/260/520/450+450/560+560px` tracks and
  `32/32/41.6/72/89.6px` inline content padding under XL tokens.
- Blank trimmed title yields zero roots. Required Media and Body controls are
  checked and disabled; disabling Signature removes only the footer.
- Long Spanish, Arabic RTL and unbroken content remain contained; RTL preserves
  media-before-content DOM order. A purpose-labelled signature image is capped
  at `200x40px`.
- Dark theme resolves root/title/signature to `rgb(23 23 23)` /
  `rgb(250 250 250)`. Forced colors resolves black/white and confirms `0s`
  animation/transition. A fresh load reports HTTP 200, zero console errors,
  zero page errors and zero failed requests.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,758 B` | `6,731 B` | `6,861 B` | pass; `27 B` reduction, `130 B` remaining |
| Neutral Web component CSS | `66,920 B` | `66,881 B` | `65,536 B` | existing gap `1,345 B`; delta `-39 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; delta `0 B`; S8 adds no behavior |

Canonical, Shopify and Webflow Sections CSS are SHA-256-identical:
`9d9f3d6dc5e7eb5fe139225b7afa89842b946f7daa253985855c5466fb9a2b97`.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced canonical profile. |
| Shopify | `implemented`, `target-ready`; localized section, ten live settings, preset and shared Image with Text snippet. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin profile around canonical Image with Text projection. |
| Figma | Generic Studio shell traceability only; component-specific variants await visual approval. |
| SwiftUI / Compose | Documented target-native adaptive composition with target-owned content/media semantics. |

Shopify official validation passed artifact `brand-story-s8-batch67`, revision
3, for the shared snippet, both sections, both schema locale files and generated
Sections CSS. The final subsequent source delta is the CSS-only container-padding
bound and passes the repository Shopify adapter validator; the revision 4
official runner completed without returning a summary, so revision 3 is the
last captured official result.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- `npm run audit:exhibit-studio`
- `npm run audit:components`
- `npm run audit:refinement`
- TypeScript no-emit and isolated site production build
- official Shopify Liquid validation, artifact `brand-story-s8-batch67`
- Chromium paired viewports, validity/optional composition, direct roots,
  localization, RTL, unbroken content, signature image, themes, forced colors,
  reduced motion and clean-console matrix
- source/generated identity, `git diff --check` and clean `site/dist` status

## Human Review Queue

1. Approve the inherited `4 / 3` crop, default split, content density and
   transition from stacked to split.
2. Approve the italic text signature treatment and its private image cap.
3. Decide whether signature images require alternate theme assets, should
   prefer text/inline SVG, or should normally be omitted.
4. Confirm the five-property API and Brand Story's separate discoverable value
   relative to composing Image with Text directly.
5. Define target heading-rank, sanitizer and future CMS/metaobject record policy.
6. Add component-specific Figma evidence and framework/native projections after
   visual approval.

## Readiness

`ready for human review`: the neutral profile and Shopify projection are
semantically, visually, responsively, technically and documentarily complete
for review. Contract remains `pilot`; no `stable` promotion was made.
