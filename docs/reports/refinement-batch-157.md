# Refinement Batch 157 — Related Articles

Date: 2026-08-11

Component: L10 `related-articles`

Result: ready for explicit human review; remains `pilot`

## Decision Reconciliation

Owner decision 52 is implemented as an explicitly curated ordered set of one
to three canonical Article Cards. The target removes the current article and
duplicates, preserves curator order, and does not infer tag fallback, ranking
or personalization. The article-page host places the section after primary
content and before Comments. Previous/Next Article Navigation remains outside
L10 and is not registered in v1.

The neutral contract is `0.3.0`. Shopify maps its native ordered
`article_list` setting, capped at three, into the canonical `article-card`
snippet and applies the same exclusions. The section is article-template-only,
fails closed, exposes validated target settings and still requires a real host
installation before target certification.

## Canonical Composition

- one fail-closed `section[aria-labelledby]`;
- one visible contextual heading;
- one native `ul` with one to three direct `li` children;
- one complete canonical Article Card per item;
- one canonical `article-card__primary-link` per card, containing contextual
  media and complete title;
- no root/list/item activation, live region, Button or `.article-nav` content;
- zero neutral listeners, observers, timers, requests or component assets.

The evidence probe exposed an old L10 test assumption that looked for a Link
inside `.article-card__title`. It was corrected to the current canonical
`.article-card__primary-link` contract, and L10 documentation was reconciled so
the parent no longer describes a superseded child anatomy.

## Browser Evidence

Evidence: `output/playwright/refinement-batch-157/`

- one headless `gallery-refinement` session and one tab;
- eight sequential natural captures: Exhibit and Studio at Mobile, Tablet,
  Desktop and XL;
- seven special captures: keyboard focus, one item, RTL/long/unbroken at
  `200px`, effective 200% text, user text spacing, dark/reduced motion and
  forced colors;
- exact same-container parity at `620px`: DOM hash `2ba84726`, style hash
  `8f35f9bc`, `2,612` serialized characters, two columns/two rows;
- intrinsic response: `1/2/3` columns at `200/430/680px`;
- zero root, part or document overflow in every measured state;
- blank title and absent cards each produce zero component roots;
- three primary Links follow curator order, show solid `4px` keyboard focus,
  and retain native navigation;
- light contrast: heading/Link `17.93:1`, Badge `13.11:1`;
- dark contrast: heading/Link `17.18:1`, Badge `5.94:1`;
- forced colors retains focus and reduced motion has zero active motion;
- zero console warnings/errors and page errors.

The resource lifecycle ended clean: Gallery URL unresponsive, port `4173`
free, managed server stopped and Playwright session closed. No ordinary Chrome
process was opened or terminated.

## Performance

- L10 CSS: `749 B` raw / `407 B` gzip, SHA-256
  `f9ae04ca0cbd403cc2ff5f8cbf4797d24c1875ec881532f317338d4e750872db`;
- Blog CSS: `28,804 B` raw / `5,148 B` gzip against `5,529 B`, leaving
  `381 B`;
- L10 neutral runtime/assets: zero;
- Webflow and Shopify Blog CSS copies: source-identical.

The performance audit reports 11 passing surfaces and seven documented global
gaps, with zero undocumented gaps. None is introduced by this batch.

## Validation

Passed:

- Web and Shopify component adapter builds and validation;
- `npm run validate:docs` for 183 registry components/contracts/Studio pages;
- decision coverage for 67 resolved owner decisions;
- static audit for 254 previews: zero errors;
- docs TypeScript validation;
- isolated production build to
  `/private/tmp/the-gallery-site-batch-157-final`;
- component readiness: 183/183 automated pass, zero structural gaps;
- refinement audit: 183 components, 223 dependency edges, 183 dossiers,
  171 ready for human review;
- `npm run evidence:assert-clean`;
- `site/dist` unchanged.

## Remaining Gates

- first real Shopify article-template installation and live Theme Editor proof;
- approval of final Article Card settings, spacing, heading and intrinsic layout;
- L10-specific design evidence or approval of the repository render;
- explicit human stability review.

No `stable` promotion is authorized by this batch.
