# Refinement Batch 140: Sticky Add-to-Cart Eligibility And Safe Presentation

Date: 2026-07-21

Component: `K9` / `sticky-atc`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected K9-A is reconciled across ADRs 0181/0256, contract `0.3.0`, MDX,
dossier, audit, decision packet, Shopify translation and the global progress
matrix.

Sticky Add-to-Cart remains a target-controlled secondary submitter for the one
canonical Product Form. The target exposes it only after the main Product Form
action is no longer usefully visible and coherent product eligibility exists.
Its canonical Button uses native external form association; K9 creates no
second Form, variant state, cart request, result state, status region, observer,
focus manager or fixed-surface coordinator.

One target product coordinator owns visibility observation and hysteresis,
selected merchandise, quantity, selling plan, Price, availability, pending and
result state, cart refresh, deliberate feedback, analytics and focus. Every
target that enables fixed presentation must account for safe-area insets,
reserve enough block-end content or scroll space, and coordinate other
viewport-edge surfaces so focus and checkout-critical content are not covered.
Exact target mechanics and final visual treatment do not become public K9 API.

The existing renderer already satisfied the accepted direction. The batch
therefore changes no canonical markup, CSS, Studio control, Shopify Liquid,
public visual token or neutral runtime. The stable surface remains nine semantic
properties, seven anatomy parts, four states, six behaviors and zero public K9
visual tokens.

## Evidence

Batch 140 records eight paired Exhibit/Studio captures at Mobile, Tablet,
Desktop and XL plus submitted, hidden, unavailable, pending, keyboard-focus,
forced-colors, reduced-motion and long-RTL evidence under
`output/playwright/refinement-batch-140/`.

The successful final pass used one isolated headless Chromium context and one
page. It proves:

- exactly one canonical Price and one canonical Button with no Form nested in
  K9 across all eight natural captures;
- a native external submitter whose owner resolves to
  `sticky-product-form-preview`, preserving merchandise, quantity and the
  activated `intent=add` FormData entry;
- target-owned result feedback outside K9;
- hidden `inert` plus `aria-hidden` and an unfocusable action;
- unavailable disabled without busy, and pending disabled plus
  `aria-busy=true` while preserving “Add to cart”;
- clean optional image/Price omission and complete omission for a blank
  required title;
- zero root, descendant, stage or document overflow in all natural captures;
- long Arabic RTL content wrapping to two lines without overflow;
- a solid `2px` keyboard and forced-colors focus outline;
- reduced-motion transition `0s` / `none`;
- exact normalized Exhibit/Studio parity at `593` characters with matching
  `121e6e78` hashes; and
- zero console errors, page errors or assertion failures.

A sandboxed launch exited before Chromium could create a browser. Two later
preliminary evidence attempts stopped on inspector-test interaction, not
component behavior; the runner closed Chromium in `finally` after each. The
successful pass closed its browser the same way, the managed server received
`Ctrl-C`, and `evidence:cleanup` plus `evidence:assert-clean` confirm the URL
unresponsive, port `4173` free, server stopped and stable session closed.

Static inspection of the mobile Exhibit, desktop Studio and long-RTL capture
confirms the existing candidate remains coherent: narrow mode preserves title,
Price and a full-width action while omitting optional media; wider Studio keeps
image, title, Price and action in one intrinsic row. Final surface chrome,
image policy, density and motion remain human visual review.

## Shopify

The official Liquid workflow was rerun after the required documentation search.
`snippets/sticky-atc.liquid` passed as artifact `k9-sticky-atc-batch140`,
revision 1, using the cached official schema after the live schema host failed
DNS lookup. The static snippet still maps product context, selected-or-first
available variant, canonical Price/Button classes and the existing Product Form
id correctly.

Shopify remains deliberately non-target-ready. A real Main Product consumer
must still prove selected option/quantity coordination, eligibility observation,
native or Ajax purchase outcomes, cart count/Drawer refresh, localized feedback,
focus, safe areas, collisions, virtual-keyboard behavior and editor invocation.

## Validation

- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- refinement decision coverage: 67 accepted decisions across four packets;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready, 59 dedicated Liquid
  templates, 34/34 schema-ready and 17 CSS assets, valid with documented
  planned-contract warnings;
- TypeScript: pass;
- external docs build: 2,508 modules into
  `/tmp/the-gallery-site-k9-batch-140`, with no `site/dist` change;
- canonical/Webflow/Shopify Cart CSS identity and `git diff --check`: pass;
- refinement matrix: `154 / 183` ready for human review, `29` remaining; and
- final owned-resource gate: clean.

The permanent performance audit records 18 surfaces: 10 pass and 8 documented
program gaps, with zero undocumented gaps. K9 remains `1,791 B` raw / `716 B`
gzip and adds `0 B` neutral runtime. Cart is `3,057 / 3,072 B`, leaving `15 B`
headroom. The existing neutral CSS and runtime gaps remain separate and are not
expanded by this decision-only reconciliation.

Human visual review, live target lifecycle proof and explicit stability review
remain pending. No `stable` promotion is claimed.
