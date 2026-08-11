# Cart Drawer Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Cart Drawer is now a target-controlled commerce composition inside canonical
Drawer with native list and description-list semantics, canonical Cart Line Item
records, one Quantity value owner, contextual removal, a complete docs modal
lifecycle, container-responsive line geometry and an isolated compact summary.
The target still owns cart records, formatting, totals, mutation, errors,
announcements, checkout and production overlay services.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Reviews and edits target-owned cart lines in Drawer; is not Cart Page, checkout, a cart store, formatter, inventory policy, network client or global overlay coordinator. |
| Anatomy and composition | pass | Canonical Drawer, native item list, shared Cart Line Item records with Price/Quantity/Button dependencies, and isolated `dl` summary. |
| Variants, sizes, states | pass | One commerce composition; Drawer owns placement/state. Populated, one-line and target-authored empty paths; container-responsive line geometry. |
| Public API and ownership | pass | Only `lineItems` and `summary`; target controls collection, line identity, values, constraints, mutations, status, empty/error content and checkout. |
| Tokens and visual system | pass | Existing semantic color/type/spacing/radius/touch tokens; grid, media size, gaps, weights, wrapping and summary emphasis remain private. |
| Accessibility and motion | pass | Named modal dependency, visible Close Button, initial focus, Tab containment, Escape/return, native list/dl, contextual controls, target status and reduced motion. |
| Responsive/content resilience | pass | Four viewports plus 320px container, long Arabic/RTL/mixed money, empty, dark, forced colors, reduced motion and 200% zoom without horizontal overflow. |
| Runtime and assets | pass | Dead Cart Drawer listeners removed; no neutral cart service, request, observer, timer or asset. Canonical Quantity enhancer remains sole step owner. |
| Cross-target translation | pass | Neutral Web implemented/evidenced; Shopify semantic/form/localization mapping reconciled but honestly remains planned pending target runtime proof. |
| Documentation and verification | pass | Dossier, ADR 0109, contract, registry, CSS/runtime, shared renderer/fixture, Studio, MDX, adapters, browser evidence and this report agree. |

## Contract And Browser Evidence

- Contract `0.4.0` keeps two semantic properties and now depends only on Drawer
  and Cart Line Item. Line anatomy/behavior is delegated to K2; Cart Drawer owns
  only the optional collection region and isolated description-list summary.
- The docs render is a visible-title named `role="dialog"` with `aria-modal`,
  canonical Drawer and Close Button parts. Open/reopen initially focuses Close;
  Tab remains inside; Escape and explicit close restore the trigger.
- The initial render contains one `ul`, two `li`, one `dl`, two terms and two
  definitions. Each line has one product link, one decorative image, one Price,
  one Quantity Selector and one product-context removal Button.
- One Increase action changes Celadon from `1` to `2` exactly once and updates
  the target fixture total/status. Removing Incense keeps focus on the surviving
  Celadon removal; removing the last line shows target-authored empty content,
  omits summary and moves focus to Close.
- At 1280px, the `400px` panel and `385px` body have equal client/scroll widths;
  a line resolves to `80px 209px` columns. Removal has a `53.1 x 44px` target.
- At 320px, the panel/list remain `288/288` and `225/225px`; the item container
  query resolves media/detail columns to `64px 143px` and stacks actions. At
  390px, long Arabic/mixed money keeps document/panel/list widths equal at
  `390/390`, `358/358` and `295/295px`.
- Light primary/supporting contrast is `17.93:1`/`7.81:1`; dark is
  `17.18:1`/`12.09:1`. Forced colors preserves boundaries and actionable text.
  Reduced motion makes Drawer/Close transition duration `0s`.
- The 200% CSS-zoom probe keeps document `800/800px`, panel `368/368px` and list
  `313/313px` client/scroll widths equal.
- Eight canonical after images cover Exhibit/Studio x Mobile/Tablet/Desktop/XL.
  Five more cover 320px, long RTL, dark, forced colors/reduced motion and zoom;
  two before images preserve the former generic/colliding composition.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Canonical Drawer lifecycle plus native lines, Price, Quantity, removal, status and compact summary. | Implemented and evidenced in docs target; production app cart/overlay providers remain target-owned. |
| Shopify | Named Drawer, native update form/list, line keys, media/product/variant data, Price, localized quantities/removal/empty/total, cart and checkout links. | Semantic and form mapping reconciled; remains planned pending lifecycle, mutation/section refresh, error/status and editor/store proof. |
| React / Angular / Hydrogen | Controlled target cart/store and Drawer lifecycle with mutation promises/status and canonical dependency mapping. | Boundary documented; no neutral framework store or raw money API. |
| Figma | Empty/populated/many-line states, optional line parts, compact summary, scroll and Drawer placement. | Studio validates source presentation; richer commercial states and visual approval remain open. |
| SwiftUI / Compose | Native sheet/drawer, list rows, formatted text, steppers/buttons, summary and async target cart store. | Conceptual mapping; platform modal, focus and announcement behavior remains native. |

## Performance And Risks

- After the Batch 83 K2 consolidation, final Global CSS is `4,351 B / 3.7 KiB`,
  `563 B` over its existing family exception. Complete Web component CSS is
  `67,755 B / 64 KiB`, an existing program gap of `2,219 B`; shared runtime is
  `10,501 B / 8 KiB`, an existing program gap of `2,309 B`.
- Consolidation removes `317 B` gzip from Global CSS relative to Cart Drawer's
  prior certified candidate. No cart service/runtime was added by K2.
- Human review must approve media size/crop, line density, text hierarchy,
  separator strength, removal treatment, footer balance and narrow-container
  stacking.
- Production targets must choose mutation/pending/error/rollback/undo policy,
  focus after removal, status cadence, empty/error visuals and one overlay/cart
  service. Shopify must additionally choose form navigation versus Ajax/Section
  Rendering and prove editor/live-store behavior.
- No owner-provided Cart Drawer visual reference is registered; review the
  repository candidate or supply replacement evidence.

## Validation

Contracts, Studio, registry/docs, DTCG source, Neutral Web, Shopify, locale JSON,
semantic DOM, lifecycle/interaction/mutation paths, contrast, long localized RTL
content, dark/forced-colors/reduced-motion/zoom, four-viewport evidence,
TypeScript, structural/parity/static-preview/refinement audits, temporary docs
build, deterministic performance, diff checks, generated-copy identity,
component-console checks and `site/dist` verification are included in Batch 24;
shared K2 Mobile/Desktop regression, official Liquid validation and regenerated
adapter identity are refreshed in Batch 83.
