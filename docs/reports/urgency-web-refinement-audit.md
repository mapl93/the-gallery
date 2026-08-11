# Urgency Indicators Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Date: 2026-07-16

Owner-decision reconciliation: 2026-07-21, ADR 0252

Component: Urgency Indicators (`G8`, dependency order `90`)

Contract: `components/contracts/urgency.contract.json` `0.4.0`, `pilot`

## Outcome

Urgency Indicators is now a passive, text-complete commercial signal. It
requires one non-empty target-supplied message and one explicitly selected Low
Stock, Selling Fast, Viewers or Recent Sale claim type. Invalid or unset values
omit the complete root. The optional cue is decorative, and the base owns no
claim default, generated metric, data source, focus behavior, live region,
motion or neutral runtime.

The infinite pulse and Error treatment for Selling Fast are removed. The named
cue/message anatomy, complete Body Small semibold typography, logical sizing,
intrinsic wrapping, Studio presentation and generated CSS targets are
reconciled. ADR 0252 retains all four types and accepts their target
qualification boundaries. Shopify remains intentionally planned until a real
adapter proves its authoritative source, threshold/window, refresh/expiry,
privacy, stale/error omission and selected-variant/current-market scope where
applicable.

G8 is therefore `human-review-ready` and remains `pilot`. It was not promoted
to `stable`, and no production data adapter is implied.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One passive commercial signal; no inventory, analytics, popularity, verification or announcement service. |
| Anatomy and omission | pass | Required native paragraph and named message, optional hidden cue; blank message and unset/invalid type omit the root. |
| Public API | pass | Required `message` and `variant`; no threshold, count, source, freshness, icon, color, motion or placement API. |
| Native semantics | pass | Native `p`, complete visible text, hidden cue, zero widget/control/live semantics. |
| Accessibility | pass | Zero focusable descendants, zero status/alert/live regions, sufficient text contrast, no color-only meaning and no motion. |
| Responsive containment | pass | Direct `96–800px` roots and long/localized/unbroken/RTL/effective-200% content have equal client/scroll dimensions. |
| Claim variants | pass | Low Stock/Selling Fast use Warning-family presentation; Viewers/Recent Sale use neutral text; all four are static. |
| Exhibit / Studio parity | pass | One `MarketingStudio` renderer/fixture; normalized DOM, equal-width computed styles/rectangles and opaque pixels are exactly equal. |
| DOM / CSS / runtime | pass | Native three-node composition, no listener/observer/timer/request/layout read/asset or neutral JavaScript selector. |
| Generated targets | pass | Canonical, Webflow and Shopify Marketing CSS are source-identical; Web and Shopify adapters validate. |
| Shopify target | deferred honestly | Copied CSS only. A production adapter must prove the accepted ADR 0252 source, qualification, freshness, privacy and omission requirements. |
| Human stability | ready for review | Four-type semantics and truth policy are accepted; visual treatment, live adapter proof and G8-specific design evidence remain review gates. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Contract | Partial generated/icon anatomy, Default + Animated states and a required property that still received a runtime fallback. | Native root, optional cue and required message; Default-only passive state; explicit valid type and strict root omission. |
| Claim default | Renderer silently used Low Stock when `variant` was absent. | No runtime default; unset or invalid type returns no root. |
| Message | Untrimmed renderer content could produce an empty indicator. | Trimmed required message; blank/whitespace content returns no root. |
| Meaning | Cue anatomy varied by type and Viewers described an unsupported `strong` part. | Every claim is complete in visible text; one consistently named cue is always decorative. |
| Selling Fast | Error-family treatment implied system failure or critical feedback. | Warning-family treatment, still pending final owner visual approval. |
| Motion | Low Stock dot and Selling Fast icon pulsed forever at `1.5s`; reduced motion only disabled it for opted-in users. | No animation or transition in any media mode; obsolete G8 reduced-motion rules and keyframes removed. |
| Typography | Derived `87.5%` body size, hardcoded weight and incomplete profile. | Existing Body Small size/line height/body family/semantic semibold tokens form one complete profile. |
| Geometry | Hardcoded `6px` gap, physical max width and generic SVG selector. | Private ratio of existing element-gap token, logical inline sizing and cue-scoped `1rem` geometry. |
| Fixture | `Sample inventory: 3 pieces remain` could look like a current claim in isolation. | `Example only: 3 pieces remain` remains visibly documentary. |
| Studio | Error swatch preceded Warning and a four-option segmented control wrapped in the inspector. | One accurate Warning swatch plus neutral text controls; compact select exposes all four treatments. |
| Shopify | Copied CSS only with an underspecified future behavior. | Still planned by design, with explicit truth/freshness/qualification decisions registered before implementation. |

Before evidence:
`output/playwright/parity/marketing/urgency-*.png` (`4` Low Stock
Mobile/Desktop Exhibit/Studio PNGs).

After evidence: `output/playwright/batch87-urgency/after/` (`16` PNGs):
paired Mobile, Tablet, Desktop and XL; all four claim types; equal-width
Exhibit/Studio roots; dark and forced-colors roots.

## DOM, Composition And Responsive Evidence

Normalized Exhibit and Studio `.urgency` structure is exactly equal with
SHA-256
`60b871800604d16f1d7687c5b7995374578d7d80b7e2cee4d06f889e890b6ee0`:

```html
<p class="urgency urgency--low-stock">
  <span class="urgency__cue" aria-hidden="true"></span>
  <span class="urgency__message">Example only: 3 pieces remain</span>
</p>
```

In an opaque `520px` canvas, every computed root/cue/message style and relative
rectangle is equal. Both screenshots are byte-identical with SHA-256
`6f221b8a795a8e0d6aefacee7f3b0419adfa3f76b2d0dcb0f3571b22af9d54ef`.
The common result is `520x20px`, with a `16x20px` cue, message beginning at
logical offset `24px`, Body Small `14/20px`, semibold `600`, `8px` current-mode
gap and no motion.

| Direct short root | Client/scroll | Height client/scroll | Result |
| ---: | ---: | ---: | --- |
| `96px` | `96/96` | `80/80` | contained |
| `120px` | `120/120` | `60/60` | contained |
| `160px` | `160/160` | `40/40` | contained |
| `240px` | `240/240` | `20/20` | contained |
| `320px` | `320/320` | `20/20` | contained |
| `520px` | `520/520` | `20/20` | contained |
| `800px` | `800/800` | `20/20` | contained |

| Stress content | Width | Height client/scroll | Result |
| --- | ---: | ---: | --- |
| Long Spanish | `96px` | `180/180` | contained |
| Long Spanish | `160px` | `80/80` | contained |
| Long Spanish | `320px` | `40/40` | contained |
| Arabic RTL | `96px` | `80/80` | contained |
| Arabic RTL | `160px` | `40/40` | contained |
| Arabic RTL | `320px` | `20/20` | contained |
| Unbroken 104-character token | `96px` | `300/300` | contained |
| Unbroken 104-character token | `160px` | `160/160` | contained |
| Unbroken 104-character token | `320px` | `80/80` | contained |
| Effective 200% type | `160px` | `200/200` | contained |

The component uses no viewport query. It consumes the current container and the
existing token modes; the direct-root results prove behavior independently of
the documentation shell.

## Accessibility, Content And Special Modes

- The accessibility snapshot is one paragraph named by its visible text:
  `Example only: 3 pieces remain`.
- The cue has `aria-hidden="true"`; the root and message have no ARIA role,
  `aria-live`, tabindex or interactive descendant.
- Clearing the required message to whitespace produces `0` roots. Selecting
  Studio's unset value produces `0` roots. Restoring Low Stock produces exactly
  `1` valid root.
- Every stress fixture reports zero focusable descendants and zero live regions.
- Low Stock and Selling Fast compute to the same Warning-family text/cue
  treatment without animation. Viewers and Recent Sale compute to neutral
  secondary text/cues without animation.
- Light contrast is `5.36:1` for Low Stock/Selling Fast and `7.81:1` for
  Viewers/Recent Sale on white. Dark contrast is `13.20:1` and `12.09:1`
  respectively on `#171717`.
- Forced colors maps root, cue and message to system black while preserving the
  visible text. Root, cue and message report `animation-name:none`, `0s`
  animation and `0s` transition.
- Reduced motion reports the same zero-motion result; G8 has no mode-specific
  exception because it has no authored motion.
- The final single-tab session logged no G8 error or warning. The docs app made
  one unrelated `favicon.ico` request that returned `404`; it is recorded as
  documentation-shell debt rather than hidden or attributed to the component.

The direction follows the HTML Standard's
[`strong` semantics](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element)
without forcing emphasis into a string-only base. WAI-ARIA
[`status`](https://www.w3.org/TR/wai-aria-1.2/#status),
[`alert`](https://www.w3.org/TR/wai-aria-1.2/#alert) and the
[APG Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) describe
dynamic announcements, not a passive visual treatment. G8 therefore has no
default live-region behavior.

The complete visible wording satisfies the direction of
[WCAG Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color),
and measured text meets
[WCAG Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum).
Removing the non-essential infinite pulse avoids creating a long-running
blinking control burden under
[WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

## Tokens, CSS And Performance

The contract exposes existing public Warning, primary/secondary text, Body
Small, semibold, element-gap and full-radius tokens. Cue geometry, gap ratio,
color-mix ratio and alignment stay private. No new token or token layer was
created.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| G8 CSS slice | `1,134 B` raw / `510 B` gzip | `1,502 B` raw / `539 B` gzip | family-owned | named anatomy and complete type add `368 B` raw / `29 B` gzip |
| Marketing family CSS | `19,819 B` raw / `4,134 B` gzip | `20,126 B` raw / `4,119 B` gzip | `4,198 B` | Batch 87 pass; current later-program snapshot is `4,782 B` |
| Neutral Web component CSS | recorded `67,741 B` gzip | `67,697 B` gzip | `65,536 B` | Batch 87 gap; current later-program snapshot is `71,754 B` |
| Shared neutral runtime | recorded `10,501 B` gzip | `10,492 B` gzip | `8,192 B` | G8 delta `0 B`; current later-program snapshot is `22,807 B` |

Canonical, Webflow and Shopify Marketing CSS share SHA-256
`b6333ceb8032f0fc429fc178f03561f23df988d5e17928a6f6b7a7cd30a30bb0`.
The permanent Marketing ceiling was not raised.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero G8 runtime. |
| Webflow | Source-identical CSS; CMS/integration owns current approved message/type and must not present static editor copy as live evidence. |
| Shopify theme | Planned. No arbitrary threshold or merchant-entered unverified urgency claim was added. |
| React / Angular | Documented thin conditional native wrapper receiving current target message/type; no framework dependency or internal state in the base. |
| Figma | Planned static examples only. Registered nodes `943:7` and `1020:480` are generic Button/Studio evidence, not G8 approval. |
| SwiftUI / Compose | Documented passive native text/symbol composition with target-owned data lifecycle; planned. |

Shopify Liquid exposes variant availability, inventory tracking/policy and
inventory quantity, but quantity has different meaning when tracking is absent.
The target therefore cannot safely infer Low Stock without an accepted tracked
selected-variant policy and threshold. Selling Fast, Viewers and Recent Sale
also require authoritative external definitions and freshness. Shopify's
[Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
explicitly prohibit fake urgency, stock and viewer claims, so the missing target
adapter is a deliberate correctness boundary.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- site TypeScript `--noEmit`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run validate:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:shopify`
- `npm run audit:refinement`
- Chromium paired viewports; all claim types; strict omission; accessibility
  snapshot; direct roots; short/long/localized/unbroken/RTL/effective-200%
  content; light/dark contrast; forced colors; reduced motion; exact normalized
  DOM/computed/relative-rectangle/opaque-pixel parity; console audit
- source/generated identity, deterministic gzip, `git diff --check`, tracked
  `site/dist` verification and evidence-resource cleanup

## Human Review And Adapter Proof

1. Approve or revise Warning versus neutral treatments, Body Small semibold,
   cue family/geometry, gap, alignment, wrapping and fixture copy.
2. Supply corrected G8-specific Figma/reference evidence; current registered
   nodes show the generic Button detail and Studio shell.
3. For each production target, document and prove the ADR 0252 authoritative
   source, qualification, threshold/window, current-variant/market scope where
   applicable, refresh/expiry, privacy minimum, stale/error omission and
   placement.
4. Ensure a target does not present the same recent-sale fact simultaneously in
   inline Urgency and floating Social Proof.

## Readiness

`human-review-ready`: neutral semantics, strict omission, four-type truth
policy, responsive/content resilience, accessibility, zero-motion behavior,
Studio/Exhibit parity, generated CSS and automated gates are complete. Visual
approval and production-adapter proof remain required. The contract stays
`pilot`; no `stable` promotion was made.
