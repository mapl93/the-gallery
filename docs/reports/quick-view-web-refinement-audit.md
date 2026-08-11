# Quick View Web Refinement Audit

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-21

## Outcome

Quick View is now a product-decision profile of canonical Modal rather than a
static card that imitates an overlay. It composes one Product Gallery, one
target-formatted Price, an optional native Product Form and an optional native
Link. Modal owns dialog anatomy and the visible dismiss action; K8 owns only the
domain composition and private container-responsive layout.

The semantic surface is limited to required `title`, `dismissLabel`, `gallery`
and `price`; semantic `open`; optional `vendor`, `description` and
`productForm`; and a coherent optional `fullLinkLabel`/`href` pair. Blank
required content, one-sided Links and a composition with no continuation omit
the invalid surface. No K8 visual token, raw money, product record, variant,
portal, breakpoint or commerce lifecycle was made public.

Owner-selected K8-A and ADR 0255 now resolve the inherited semantic boundary.
One target coordinator opens K8 only from a complete coherent product snapshot;
the same canonical Product Gallery receives the full image, hosted-video,
external-video and model collection with `imageDetail="none"`; images remain
passive; and the complete-product Link leads to the default lightbox product
experience. The component is ready for human visual review, while Shopify live
invocation/purchase proof, mobile visual direction and explicit stability review
remain pending. Contract maturity stays `pilot`; no stability promotion was
made.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Focused product inspection/continuation only; not a product page, product store, variant resolver, media engine, cart client or analytics owner. |
| Anatomy and composition | pass | Canonical Modal header/title/close/body plus Product Gallery, Price, native Product Form and native Link; duplicated image/price/form/link anatomy removed. |
| Variants, sizes and states | pass | Closed/open, Form only, Link only, both and the complete rich-media collection are defined; mobile centered/sheet/full-screen treatment remains a visual review item. |
| Public API and ownership | pass | Ten semantic properties/slots; strict required content and coherent continuation; target owns lifecycle, product data and controlled/uncontrolled adapter APIs. |
| Tokens and hardcoded values | pass | Zero K8 public visual tokens; one private gap and private `42rem` container threshold; inherited dependencies own visible decisions. |
| Accessibility and motion | pass in docs target | Named modal dialog, title initial focus, Tab/Shift+Tab containment, Escape/backdrop close, visible close, logical restoration, forced colors and reduced motion passed. |
| Responsive/content resilience | pass | Exact shared renderer at four viewports, container-dependent one/two-column changes, long Arabic RTL, unbroken content and effective 200 percent without horizontal overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no new listener, observer, request, timer or neutral asset. Lifecycle and commerce coordination remain target work. |
| Cross-target translation | partial by design | Neutral Web contract/CSS and shared docs target are implemented; Shopify maps complete product.media with no-detail Gallery but live invocation/coordination remains `needs-target-work`; future mappings are documented. |
| Documentation and verification | pass | Dossier, ADR 0180, contract, registry, shared renderers, CSS, Studio, MDX, Liquid, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.3.0` declares Modal, Product Gallery, Price, Product Form and Link
  dependencies, fourteen anatomy parts, five states, ten behaviors, ten
  semantic properties and zero K8 public visual tokens.
- Exhibit and Studio serialize the same normalized `8,446`-character dialog
  subtree with matching `fac7c618` hashes. Each contains exactly one
  `role=dialog[aria-modal=true]`, visible labelled title, contextual Close
  Button, the five-record/four-type rich Product Gallery, Price, native Form and
  native Link.
- Batch 139 proves `imageDetail="none"`, zero image actions, zero Lightboxes and
  exactly one modal dialog across all eight natural captures. Hosted video,
  external video and model select and activate explicitly; the second image
  remains passive.
- Canonical selection updates the target-controlled current id and polite status
  to `turntable` / `2 of 5: Turntable video`. Close and Escape restore the
  trigger; reopen restores title focus while preserving that coordinator-owned
  current id. Direct swipe remains the exact inherited Product Gallery renderer
  already certified in
  `output/playwright/refinement-product/product-gallery-0238/manifest.json`.
- Initial focus enters the H2 title with `tabindex=-1`. Tab order is Close,
  Add to cart, full-details Link and wraps to Close; Shift+Tab wraps to the Link.
  Escape and backdrop each close the dialog. A dialog opened from its trigger
  returns focus to that trigger.
- The docs-target form prevents navigation, emits one localized fixture Status
  and disables repeat submission. This proves Product Form composition only;
  it is not neutral or Shopify purchase-success behavior.
- Link-only yields one dialog, zero Forms and one Link. No continuation, a
  one-sided Link or a blank title yields zero dialogs. Closed state yields one
  named trigger and zero dialogs.
- Studio dialog/container widths resolve to `310px / 1 column` at Mobile,
  `688px / 2 columns` at Tablet, `628px / 1 column` at Desktop and
  `688px / 2 columns` at XL. The intentionally non-monotonic result proves the
  `42rem` decision follows the preview container, not the page viewport. No
  dialog or body has horizontal overflow.
- Long Arabic RTL content wraps the title to three lines with no title/body/root
  overflow. Effective 200 percent zoom also has no dialog/body horizontal
  overflow.
- Light contrast measures `17.93:1` title, `7.81:1` secondary copy,
  `5.89:1` Link and `10.37:1` Button. Dark measures `17.18:1`, `12.09:1`,
  `9.94:1` and `17.93:1` respectively.
- Keyboard focus exposes a solid `2px` outline with `2px` offset. Forced colors
  is active with a system-visible solid outline. Reduced motion reports `0s`
  overlay animation and `0s` dialog transition.
- Seventeen prior lifecycle/special-mode images are stored in
  `output/playwright/refinement-batch-89/`: Exhibit and Studio at Mobile,
  Tablet, Desktop and XL, plus closed, Link-only, submitted form, focus-visible,
  dark, forced colors, reduced motion, long RTL and effective 200 percent.
- Nine refreshed rich-media images plus the machine-readable summary are stored
  in `output/playwright/refinement-batch-139/`. The final isolated headless
  browser used one context and one page, produced zero console/page/assertion
  failures, and closed in `finally`; the managed server, port 4173 and stable CLI
  session all pass the repository cleanup gate.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Canonical Modal/Product Gallery/Price/Product Form/Link classes and slots; native dialog or equivalent proven lifecycle supplied by target. | CSS/contract implemented and docs-target lifecycle evidenced; no neutral Quick View runtime. |
| Shopify | Dedicated product-context snippet composes canonical gallery, price, form, icon/close and full-product route with localized labels. | Liquid/data ready, but overall `template-detected`, `ready:false`; invocation, loading, rich/high-variant sync and purchase lifecycle remain target work. |
| Webflow / Framer | Copied canonical CSS/profile with target-authored overlay and product coordination. | CSS projection byte-identical; behavior not certified by this batch. |
| React / Angular / Hydrogen | Controlled/uncontrolled Dialog adapter plus one parent product coordinator and canonical children. | Contract-ready; no framework dependency in base source. |
| Figma | Modal profile composed from child instances and optional-slot visibility. | Planned; generic Studio trace is not K8 artwork or visual approval. |
| SwiftUI / Compose | Native sheet/dialog/full-screen presentation with native media and purchase children. | Conceptual; presentation, focus and state remain platform-owned. |

The Shopify Liquid workflow searched current product quick-view guidance before
implementation and validated `quick-view.liquid`, `product-form.liquid` and both
locale files as artifact `k8-quick-view-shopify-9d2c4b7e`, revision 2. Adapter
inventory now detects 59 dedicated Liquid templates; K8 honestly remains
non-ready while the global target-ready count is 90.

Batch 139 additionally searched current Shopify product-media documentation and
validated `quick-view.liquid` plus `product-gallery.liquid` as artifact
`k8-quick-view-rich-media-batch139`, revision 1. Both passed; the validator used
its cached official schemas only after the live schema host failed DNS lookup.

## Performance And Risks

- K8 CSS changes from `1,314 B` raw / `566 B` gzip to `1,129 B` raw /
  `494 B` gzip, a `-72 B` gzip component delta.
- Complete Cart CSS is `17,085 B` raw and `3,057 / 3,072 B` under the permanent
  deterministic audit, leaving `15 B` headroom.
- Complete Web component CSS is `535,579 B` raw / `71,891 B` deterministic
  gzip. The documented program gap is `6,355 B` above the unchanged `65,536 B`
  ceiling; this is not a K8 release exception.
- Shared neutral runtime is `117,741 B` raw / `22,807 B` deterministic gzip, so
  K8 still adds `0 B`. The documented `14,615 B` program gap remains separate.
- Canonical, Webflow and Shopify Cart CSS are byte-identical. Cart SHA-256 is
  `c2a93f2603708a33d43d16da7168f6fa6215b0f9ba95c0b7b60c518c7fcaff51`;
  K8 slice SHA-256 is
  `3c02f5070efd5485dd7a466731e5a04cdbd51fff678ecd73659b5feba364eceb`.
- ADR 0255 fixes one target product coordinator, complete-snapshot omission,
  full rich-media obligation, optional Product Form with real-Link
  continuation, and no-detail image behavior. Each target must now prove its
  concrete loading/invocation implementation; mobile centered-modal versus
  sheet/full-screen and final visual treatment remain human review choices.
- Shopify must still prove live product loading, selected-variant synchronization,
  price/media/availability/URL updates, high-variant behavior, native/Ajax
  submission, errors, Cart Drawer refresh, editor preview and focus/status
  outcomes.
- Product Gallery rich media/Lightbox and Product Form coordination are
  inherited canonical contracts. K8 fixes their composition boundary without
  duplicating either: full rich media, controlled current id, image detail none,
  native Form, and one target coordinator.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, static
previews, Web/component token compatibility, Neutral Web adapter, Shopify
adapter, Shopify Liquid artifact validation, generated CSS identity,
four-viewport/special-mode browser inspection, exact normalized shared-renderer
parity, rich-media activation, passive no-detail images, one-dialog invariants,
invalid composition, keyboard/focus, contrast, deterministic performance,
structural/certification/refinement audits, diff checks, `site/dist` cleanliness
and owned-resource cleanup are covered by Batches 89 and 139.
