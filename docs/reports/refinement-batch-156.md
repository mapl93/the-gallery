# Refinement Batch 156: Blog Sidebar Decision Reconciliation

Date: 2026-08-11

Component: Blog Sidebar (`L8`)

Result: `human-review-ready`; remains `pilot`

## Scope

Reconciled the refined neutral implementation with owner decision 51:

- public identity is **Blog Sidebar**, not Blog Sidebar / Tag Cloud;
- canonical Topic anatomy is `.blog-sidebar__topics`, `__topic` and
  `__topic-link`;
- `.tag-cloud*` remains only as a temporary migration alias to remove before
  the public v1 contract freezes;
- the initial profile is Recent Articles + Topics as native Link lists; and
- order, limits, contextual headings and records remain target page data,
  while Search and Newsletter stay separate complete compositions.

## Source Result

- Contract `0.3.0`, registry, Studio metadata, MDX and the shared renderer now
  agree on the public identity, canonical selectors and composition boundary.
- Topic destinations are canonical native Links and never compose passive Tag.
- `platforms/shopify/snippets/blog-sidebar.liquid` projects an explicit Shopify
  Blog into bounded Recent Articles and Topics modules without adding Search or
  Newsletter shortcuts.
- Webflow and Shopify Blog CSS remain source-identical with canonical CSS.
- L8 owns no runtime and remains `pilot`.

## Validation

- docs, registry, tokens, 183 contracts, 183 Studio definitions, 67 recorded
  owner decisions, 254 static previews, Neutral Web adapter, Shopify adapter,
  TypeScript, temporary production build and structural component audit pass;
- Shopify now reports 91 target-ready components and 61 dedicated Liquid
  templates, with the same 12 unrelated documented warnings;
- the global matrix reports `170/183` ready for human review;
- eight Exhibit/Studio natural viewport captures have zero root, part or
  document overflow;
- exact equal-width DOM/style parity matches at 620px (`584f0721` /
  `58e4591a`);
- named native aside semantics, two headed lists, seven canonical Links, four
  canonical Topic links, zero Tag composition, blank-label and empty-section
  fail-close, native navigation, RTL at 200px, effective 200-percent text and
  text spacing pass;
- all seven keyboard stops retain visible 2px focus and 44px target height;
- light/dark resting and hover contrast ratios range from `7.00:1` to
  `17.93:1`, using CSS Color 4-safe pixel conversion;
- forced colors and reduced motion pass, with no console/page errors;
- one headless session and one tab were used, then closed; the pre-existing
  user server was preserved and the final resource gate is clean; and
- `site/dist` was not rebuilt.

## Performance

- L8: `1,908 B` raw / `644 B` level-9 gzip against the `669 B` observation
  ceiling, with zero runtime.
- Blog: `5,148 / 5,529 B` audited gzip, `381 B` headroom.
- Neutral CSS and shared runtime retain existing documented program gaps; L8
  adds no runtime and remains within its component/family budgets.

## Evidence

- Dossier: `docs/refinement/dossiers/blog-sidebar.md`
- Audit: `docs/reports/blog-sidebar-web-refinement-audit.md`
- ADR: `docs/decisions/0198-passive-complementary-blog-sidebar-and-canonical-module-composition.md`
- Current browser evidence: `output/playwright/refinement-batch-156/`
- Original before/refinement evidence: `output/playwright/refinement-batch-107/`

Migration-alias removal, real page placement/editor exposure, final visual
judgment and explicit human stability review remain required before `stable`.
