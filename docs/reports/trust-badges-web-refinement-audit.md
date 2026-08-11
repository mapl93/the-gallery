# Trust Badges Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Trust Badges (`G5`, dependency order `88`)

Contract: `components/contracts/trust-badges.contract.json` `0.3.0`, `pilot`

## Outcome

Trust Badges is now one passive native list of short, text-complete,
target-supplied commercial assurances. Each valid `li` requires visible text;
an optional visual is always decorative. Blank/icon-only records and the empty
root are omitted. An optional localized accessible label names the list only
when surrounding visible context does not already do so.

Default and Compact use complete semantic typography profiles and intrinsic
wrapping. Targets own claim truth, evidence, qualification, localization,
jurisdiction, publication, updates and related policy destinations. G5 adds no
neutral runtime and was not promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Compact passive assurances are separated from status Badge, section-scale Shipping Info, Payment Icons, certification records, policy navigation and claim governance. |
| Anatomy and omission | pass | Required native root/item/text, optional decorative visual and accessible label; blank records/root are omitted in the first-party renderer and Shopify adapter. |
| Public API | pass | `variant`, required `items` and optional `accessibleLabel`; no icon catalogue, verification, status, geometry, breakpoint, event or analytics API. |
| Native semantics | pass | `ul[role=list]` + `li`; no widget role, control, live region, focus model or keyboard behavior. |
| Accessibility | pass | Complete visible wording, all fixture icons hidden, optional label omission, zero focusable/live descendants and native list/listitem accessibility tree. |
| Responsive containment | pass | Direct `200–1200px` roots wrap in one to three rows with client/scroll equality and all descendants contained. |
| Content resilience | pass | One item/no icon/no label, localized long copy, unbroken token, Arabic RTL and effective-200% type remain contained. |
| Theme and modes | pass | Light/dark text contrast passes; forced colors retains readable text; G5 authors no motion. |
| Exhibit / Studio parity | pass | One `MarketingStudio` renderer/fixture; normalized outer HTML and SHA-256 are equal, and an equal-width opaque canvas is byte-identical. |
| DOM / CSS / runtime | pass | No G5 listener, observer, timer, request, client, asset, layout read or neutral JavaScript selector. |
| Generated targets | pass | Canonical, Webflow and Shopify Marketing CSS are source-identical; Web and Shopify adapters generate successfully. |
| Shopify target | pass | Target-ready localized section with strict statement filtering, optional decorative image, variant/label settings, editor block attributes and blank presets. |
| Human stability | pending | Final alignment, density, icon treatment/color, wording, placement and corrected G5-specific owner reference require explicit review. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Contract | Generic root/badge/icon anatomy; implicit list/text/omission/claim ownership. | Native root/item/icon/text anatomy, strict omission, intrinsic wrapping, target-claim boundary and cross-target mappings. |
| Accessible name | English fixture-only `aria-label` outside the public API. | Optional localized `accessibleLabel`, omitted when empty or unnecessary. |
| Required content | Disabling items left an empty `ul`. | Required Studio slot is checked/disabled and the renderer returns no root when invalid. |
| Item meaning | Visible text existed but had no named part or explicit text-complete rule. | Required `.trust-badge__text`; optional `.trust-badge__icon` is always redundant and decorative. |
| Typography | Numeric fractions of Body size without family, semantic weight or line-height. | Complete Body Small and Caption profiles with relative line-height floors. |
| Spacing and containment | Hardcoded physical gaps/padding and anonymous text containment. | Existing semantic element-gap input, private ratios, logical sizing and explicit wrapping part. |
| Shopify | Copied CSS only; contract reported planned. | Addable localized section with valid blocks, schema/data/editor mapping, strict empty omission and no G5 script. |
| Fixture claims | Unqualified checkout/delivery/packaging claims looked like Gallery promises. | Every sample begins with “Example”; target truth/evidence remains explicit. |

Before evidence: `output/playwright/parity/marketing/trust-badges-*.png`
(`4` Mobile/Desktop Exhibit/Studio PNGs).

After evidence: `output/playwright/batch85-trust-badges/after/` (`13` PNGs):
paired Mobile, Tablet, Desktop and XL, Default/Compact roots, equal-width
Exhibit/Studio roots and dark mode.

## DOM, Composition And Responsive Evidence

Normalized Exhibit and Studio `.trust-badges` outer HTML is exactly equal with
SHA-256
`3641477f05912f8b050e73c5d192b2b49108b21a6c14aba2f83ab7e1eae18ed1`.
At the same `520px` root width, every computed class, font, color, gap, padding,
part rectangle and item rectangle is equal. Once the transparent root is placed
on the same opaque evidence background/origin, both screenshots are byte-equal
at `6,921 B`.

Different row counts in the full Exhibit/Studio Desktop screenshots are correct
container response: the documentation surfaces provide different available
content widths. No component selector or fixture diverges.

| Direct root | Client/scroll | Height client/scroll | Rows | Result |
| ---: | ---: | ---: | ---: | --- |
| `200px` | `200/200` | `192/192` | 3 | contained |
| `240px` | `240/240` | `192/192` | 3 | contained |
| `320px` | `320/320` | `156/156` | 3 | contained |
| `520px` | `520/520` | `120/120` | 2 | contained |
| `700px` | `700/700` | `84/84` | 1 | contained |
| `900px` | `900/900` | `84/84` | 1 | contained |
| `1200px` | `1200/1200` | `84/84` | 1 | contained |

Default resolves to Inter `14/21px`, weight `400`, row/column gaps `32/48px`.
Compact resolves to Inter `12/16px`, weight `400`, row/column gaps `16/32px`.
The distinction is semantic and functional but remains a human visual-review
boundary.

The initial root is a labelled `UL` with `role=list`, three native `LI` items,
three complete visible example statements and three hidden icons. It contains
zero focusable or live descendants. Clearing the optional label removes the
attribute. A one-item composition without visual or accessible label remains
valid and contained. The required Studio slot remains checked and disabled.

## Accessibility, Content And Special Modes

- The accessibility snapshot exposes one list named “Example purchase
  assurances” and exactly three list items. It exposes no icon names.
- Long localized copy, an unbroken German-style token and Arabic RTL content
  remain contained in a `200px` root with matching client/scroll dimensions.
- Effective 200% type resolves to `30/40px` in the compact evidence context and
  remains contained, with no clipping or overlap.
- Light text contrast is `7.81:1`; dark is `12.09:1`, both above the normal-text
  WCAG AA threshold. The green visual is decorative and never the sole carrier
  of meaning.
- Forced colors maps the statement text to system black and keeps it visible.
  The decorative visual may retain or lose its accent without semantic loss.
- Reduced-motion emulation reports `animation-name:none`, `0s` animation and
  `0s` transition on the root, items and visuals.
- One headless browser tab produced zero new console warnings/errors; the only
  observed initial site error was the pre-existing missing `favicon.ico`, not
  a G5 resource.

The direction follows the HTML Standard's native
[`ul`/`li` semantics](https://html.spec.whatwg.org/dev/grouping-content.html)
and [WAI decorative-image guidance](https://www.w3.org/WAI/tutorials/images/decorative/).
The [WAI ACT decorative exposure rule](https://www.w3.org/WAI/standards-guidelines/act/rules/46ca7f/)
supports excluding redundant visuals from the accessibility tree. Open UI's
[Badge research](https://open-ui.org/components/badge.research/) and
[Radix Themes Badge](https://www.radix-ui.com/themes/docs/components/badge)
do not define an assurance-list widget or justify importing status semantics.

[FTC advertising principles](https://www.ftc.gov/business-guidance/advertising-marketing/advertising-marketing-basics)
and its [small-business advertising FAQ](https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business)
place truthfulness and evidentiary responsibility on the publisher; therefore
G5 never synthesizes or verifies claims. Shopify's
[checkout component inventory](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components)
also separates Badge, Icon, Payment Icon and list/layout concepts.

## Tokens, CSS And Performance

The contract exposes ten existing semantic tokens: secondary text, decorative
success/accent, element gap, body family, Body Small and Caption sizes, weights
and line heights. Icon geometry and relative gap ratios remain private. No new
token, token layer or public geometry property was added.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| G5 CSS slice | `351 B` | `464 B` | family-owned | `+113 B`; complete anatomy/type/containment contract |
| Marketing family CSS | `4,146 B` | `4,181 B` | `4,198 B` | pass; `17 B` remaining |
| Neutral Web component CSS | recorded `67,751 B` | `68,439 B` | `65,536 B` | existing program gap is `2,903 B`; regeneration also reconciled accumulated source state |
| Shared neutral runtime | G5 delta `0 B` | `10,565 B` | `8,192 B` | existing program gap `2,373 B`; no G5 selector or behavior |

Canonical, Webflow and Shopify Marketing CSS share SHA-256
`34ca10019b19c1fa188c070315017f88d6d6abe2d1759f4eca83cd24894b6b94`.
The permanent Marketing ceiling was not raised.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero G5 runtime. |
| Webflow | Source-identical CSS; CMS records and commercial governance remain target-owned. |
| Shopify | `shopify-maturity-v1` implemented/ready section: CSS, Liquid, schema, data, behavior, composition and editor preview all pass. |
| React / Angular | Documented thin native-list wrapper; target props/state own current records and publication lifecycle. |
| Figma | Planned; registered nodes `943:7` and `1020:480` are generic Button/Studio evidence, not G5 visual approval. |
| SwiftUI / Compose | Documented passive collection with decorative visual semantics and target-owned content; planned. |

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `node site/node_modules/typescript/bin/tsc --noEmit -p site/tsconfig.json`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- Chromium paired viewports, direct roots, variants, minimal/optional
  composition, localized/unbroken/RTL/effective-200% content,
  semantic/accessibility tree, contrast, dark, forced colors, reduced motion,
  exact DOM/computed/opaque-pixel parity and console audit
- source/generated identity, deterministic gzip, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise centered alignment, root inset, row/column gaps, icon/text
   gap, visual size/style/success-green convention, Default/Compact density,
   wrapping and placement near product/cart/checkout content.
2. Approve or replace the explicitly illustrative fixture wording; it is not a
   Gallery guarantee and must not become Shopify default claim content.
3. Supply corrected G5-specific Figma/reference evidence; current registered
   nodes show the generic Button detail/Studio shell.
4. Keep truth, evidence, qualifications, jurisdiction, localization, validity,
   publication, policy destinations and updates target-owned unless a later
   accepted architecture decision establishes a shared commercial-claim model.
5. Review the existing total Web CSS/runtime program gaps separately; G5 stays
   inside its Marketing ceiling and adds no neutral runtime.

## Readiness

`human-review-ready`: semantic implementation, cross-target translation,
responsive/content/accessibility evidence, documentation and automated gates
are complete. Explicit human visual/reference approval remains pending. The
contract remains `pilot`; no `stable` promotion was made.
