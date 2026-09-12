# Auth / Password Reset useful measure checkpoint

Date: 2026-09-12. ADR 0369. Parent: `7cf7e4b`.

Owner-approved A implemented: 440px useful maximum plus existing responsive
outer padding, rather than including page padding in a 440px border box.
21 new source roles; 29/25 public values; named Studio and shared Exhibit controls.

## Evidence

- Fresh CLI installation of both dependency closures. Light/Dark at
  320/900/1200/1800px: useful width 272/440/440/440px for both components;
  no root overflow. At XL, outer width is 760px with 160px per side.
- 368 element comparisons against the old CSS with the approved A width probe
  preserve typography, colors, gaps, vertical padding and borders.
- Inherited maximum 520px and padding factor .25 yield 520px useful +40px
  per side independently. Vertical padding, title weight and Reset icon size
  are authored through the same public controls/source path.
- Narrow 280px parent, RTL and long title fit when the embedding explicitly
  sets horizontal padding factor to zero. Screenshot inspected. Responsive
  page padding is not automatically inferred from arbitrary parent width.
- Studio's 688px preview parent gives 368px useful with canonical XL padding;
  this is now honest source behavior. Maximum 500 plus padding zero gives
  500px useful; factor .25 keeps 500px useful and adds 40px per side.
  Reset customization restores all initial geometry. Exhibit lists the token.
- Local Studio sign-in submission reports no credentials sent; Password Reset
  reaches its existing confirmation. No real authentication/recovery request.
- Source/Web/Shopify builds, docs and catalogue validators pass (1342 paths,
  10736 comparisons over eight matrices). One browser/tab/server; cleanup,
  owned-resource gate and process scan pass. Owned public fixture removed.

Ignored evidence: `output/playwright/auth-values/` holds fixtures, old CSS,
installed consumer/provenance, harness/results and screenshots.

## Limits and adoption

The maximum is conditional on available space. A very narrow embedding must
choose suitable padding through tokens; 160px page padding per side does not
suit every nested layout. Current title weight 700 is preserved, not reapproved
as the global heading standard. No screen-reader certification, hosted account
handoff, Shopify editor test, deployment, stable promotion or automatic copy
update. Consumers adopt new account CSS together with its token dependency.
