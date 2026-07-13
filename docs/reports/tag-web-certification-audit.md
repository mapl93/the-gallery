# Tag Neutral Web Certification Audit

Status: Pending owner review

Date: 2026-07-12

## Scope

This audit reviews Tag as a compact represented value with an optional remove
request. It distinguishes component presentation from application-owned
removal, focus recovery, and announcement behavior.

## Reconciliation

- Tag separates required `.tag__label` content from an optional native
  `.tag__remove` button.
- The semantic API covers label, removeAction, removeLabel, and
  removalDisabled.
- The remove action uses native Enter, Space, disabled, and focus behavior.
- The consuming target owns state mutation, DOM removal, focus destination, and
  contextual announcement.
- The fixed X indicator uses embedded Lucide geometry with no adapter runtime
  dependency.
- Tag remains distinct from passive Badge and navigational Link.

## Final Evidence

- Automated gate: pass; no structural failures or web-manifest drift.
- Contract: 4 anatomy parts, 1 variant, 1 size, 4 states, 3 behavior rules,
  4 semantic properties, and 9 public tokens.
- Studio: 5 groups, 13 controls, all 4 semantic properties represented,
  9 token controls, and all 9 public tokens referenced.
- The remove action is a native `type="button"` with the fixture name
  `Remove Stoneware filter` and a `20px x 20px` control box.
- Tags use `12px` inline padding when passive. When a remove action exists, the
  final padding becomes `8px` to compensate for the icon control box and keep
  the visible left and right space balanced.
- Focus resolves to `rgb(23, 23, 23) solid 2px` with a `2px` offset, following
  non-field button focus rather than the field-focus hierarchy.
- The generated indicator exposes the accepted Lucide X path through CSS mask
  geometry.
- Remove disabled sets the native attribute and makes the action unavailable.
- Turning off Remove action hides both the button and its dependent Studio
  controls. Activating the enabled action makes the Studio harness update its
  target-owned state and announce `Tag removed`.
- The mobile Exhibit produces no horizontal document overflow.
- The Shopify collection filter now separates `.tag__label` from its
  target-native removal link and uses the shared generated indicator.

## Owner Review Required

Tag remains `pilot` pending visual approval and confirmation that one neutral
variant, one compact size, and a `20px` inline remove control are sufficient.

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
