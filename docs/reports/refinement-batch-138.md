# Refinement Batch 138: Cart Page Safe Summary Placement

Date: 2026-07-21

Component: `K1` / `cart-page`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected K1-A is reconciled across ADR 0254, contract `0.3.0`, registry,
canonical CSS, the shared docs renderer, Studio metadata, MDX, Shopify Liquid,
the open-question ledger, dossier, audit and global progress matrix.

Cart Page remains a populated-only composition of one non-empty canonical Cart
Line Item collection and one canonical Cart Summary. The target atomically
replaces it with canonical Cart Empty when the cart becomes empty and retains
ownership of the coherent snapshot, mutations, pending/error/status, focus,
checkout and refresh lifecycle.

The new semantic property `summaryPlacement: sticky | flow` defaults to sticky.
Both modes preserve one summary, one cart snapshot and the same source order.
Canonical CSS enables sticky only in a component at least `56rem` wide and a
viewport at least `36rem` tall; otherwise it degrades to flow. Tall summaries
are bounded to available dynamic viewport height and keep focused controls
reachable. The target owns its real header/safe-area offset and must choose flow
when it cannot prove collision and focus safety.

Shopify exposes the same two choices in the Theme Editor, defaults to sticky,
and maps the owned Gallery Header plus safe-area inset into the private adapter
offset. Its contract remains honestly `planned` pending Theme Editor and
live-store lifecycle proof. No neutral JavaScript, duplicate Cart Summary or
public offset/breakpoint/height property was added. No `stable` promotion is
claimed.

## Evidence

One bounded headless phase used one managed server, one
`gallery-refinement` session and one page. It records:

- eight paired Exhibit/Studio captures at mobile, tablet, desktop and XL with
  zero root, descendant or document overflow;
- sticky selected by default and explicit flow mapped to
  `.cart-page--summary-flow` plus `position: static`;
- automatic flow fallback at `895px` component width and `500px` viewport
  height, with sticky active at `896px` by `900px`;
- a `2,897px` tall summary bounded to `836px`, internally scrolled to focused
  Checkout, which remains fully visible;
- identical normalized Exhibit/Studio default-tree hash `f6099acc`;
- zero console errors, page errors or assertion failures; and
- clean post-run server, port and Playwright resource gates.

Evidence is stored under `output/playwright/refinement-batch-138/`.

## Validation

- 183 contracts and 183 Studio definitions: pass;
- Shopify full-theme validation for `main-cart.liquid` and both schema locales:
  pass;
- Web and Shopify generated adapter validation: pass;
- Cart performance budget: `3,057 / 3,072 B`, `15 B` headroom;
- neutral K1 runtime addition: `0 B`;
- `site/dist`: not rebuilt or modified; and
- explicit human visual, Shopify production, Figma and stability review:
  pending.
