# Badge Neutral Web Certification Audit

Status: Pending owner review

Date: 2026-07-12

## Scope

This audit reviews Badge as a passive status and metadata primitive. It does not
infer interactive chip behavior, icons, alternate sizes, or automatic live
region semantics.

## Reconciliation

- Badge remains one inline non-interactive element.
- Info, Success, Warning, and Error are variants rather than interaction states.
- Info is the classless default; `.badge--info` is not introduced.
- The semantic API covers label, variant, and announceChanges.
- Static badges have no live-region role. `announceChanges=true` adds
  `role="status"` for dynamic content only.
- Visible text carries meaning without relying on color.

## Final Evidence

- Automated gate: pass; no structural failures or web-manifest drift.
- Contract: 1 anatomy part, 4 variants, 1 size, 1 passive state, 2 behavior
  rules, 3 semantic properties, and 11 public tokens.
- Studio: 4 groups, 8 controls, all 3 semantic properties represented,
  5 token controls, and all 11 public tokens referenced.
- Warning resolves to `rgb(254, 243, 199)` background and
  `rgb(245, 158, 11)` text at the reviewed light theme.
- Enabling Announce changes sets `role="status"`; it is absent by default.
- Default Badge typography resolves to `12px`, derived from the reviewed `16px`
  body token, and retains the documented compact non-wrapping presentation.
- The mobile Exhibit produces no horizontal document overflow.
- Exhibit renders one canonical artwork and MDX retains a compact secondary
  variant reference.

## Owner Review Required

Badge remains `pilot` pending visual approval and confirmation that one anatomy
part, one compact size, and no interactive states are sufficient.

## Validation

- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:previews:static`
- `npm --prefix site run build -- --outDir /tmp/the-gallery-radio-badge-tag`
- `git diff --check`
