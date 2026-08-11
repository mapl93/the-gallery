# Popup Web Refinement Audit

Status: `human-review-ready-deprecated-migration`; not `stable`

Date: 2026-07-20

Component: G4 Popup (`popup`)

Contract: `components/contracts/popup.contract.json` (`0.3.0`, `deprecated`)

Decision: ADR 0224

## Outcome

G4 no longer implements a centered modal overlay. It forwards to canonical B9
Popover and uses the same `.popover` CSS, `FloatingMenuStudio` renderer,
Dimensions fixture and one-property Studio definition. Former Popup CSS,
variants, modal semantics, duplicated Close Button and Marketing renderer code
are removed.

## Before / After

| Finding | Before | Final | Result |
| --- | --- | --- | --- |
| Identity | Independent ambiguous Popup beside Popover and Modal | Deprecated record to one canonical Popover | pass |
| Position | Fixed full-screen centered overlay | Panel aligned directly below its trigger | pass |
| Modality | Backdrop, `role=dialog`, `aria-modal=true` | No backdrop, modal role, inertness, scroll lock or trap | pass |
| Open owner | `data-open` split between overlay and Slide root | Canonical `open` / `.popover--open` | pass |
| Variants | Default, Split and bottom Slide | One canonical Popover surface; old variants removed | pass |
| Dismissal | Close button mount/unmount demo only | Trigger toggle, Escape with restoration and outside dismissal | pass |
| Focus | Modal obligations claimed but not implemented | Natural Tab enters first field; closed fields are hidden | pass |
| Composition | Duplicated surface/close/media/body CSS | Canonical trigger, panel, arrow, title and content | pass |
| Exhibit / Studio | Marketing-specific renderer/fixture | Same B9 renderer and fixture in both modes | pass |
| Target ownership | CSS-ready G4 implied | No G4 Shopify/future adapter; use Popover or Modal semantically | pass |

## Browser Evidence

Directory: `output/playwright/refinement-layout/popup-popover-0224/`

- 16 final captures: Popover and deprecated Popup, Exhibit and Studio, Mobile
  390x844, Tablet 768x1024, Desktop 1280x800 and XL 1600x1000.
- Additional `popup-studio-focus-mobile.png` and
  `popup-studio-closed-mobile.png` verify interactive and closed states.
- G4 and B9 artwork normalize to the exact same `1234` characters and FNV-1a
  hash `2a80e829`; each contains the same four fields.
- Desktop panel geometry is left-aligned with the trigger and begins 22px below
  its bottom edge. No `.popup-overlay` or `.popup*` artwork class exists.
- Repeated trigger closure reports `aria-expanded=false`, `hidden=true` and
  zero available panel focusables.
- Escape from the first field closes and restores the trigger. Outside pointer
  interaction closes. Tab from the open trigger focuses Width (`100%`).
- Final console inspection reports zero errors and warnings.

## Contract, Accessibility And Targets

- Contract status is `deprecated`; dependency is canonical `popover`; source is
  `components/css/layout.css` / `.popover`.
- The only property is semantic `open`, matching B9. Content and trigger remain
  composition; geometry and role remain target services.
- The surface has no default role. A small form uses ordinary labels/inputs and
  natural Tab order. Modal marketing campaigns use canonical Modal.
- Neutral Web and Shopify generated adapters validate all 183 components.
  Shopify correctly marks G4 unsupported/deprecated rather than inventing a
  second Liquid adapter.

## Performance

| Surface | Before | Final | Delta |
| --- | ---: | ---: | ---: |
| Marketing family CSS | 5,335 B | 4,930 B | -405 B gzip |
| Neutral component CSS | 69,470 B | 69,078 B | -392 B gzip |
| Shared runtime | 13,078 B | 13,078 B | 0 B |

Fixed ceilings were not raised. Existing seven program gaps remain documented;
the migration itself removes duplicated bytes and introduces no neutral work.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web` / `validate:adapter:web`
- `npm run build:adapter:shopify` / `validate:adapter:shopify`
- TypeScript `--noEmit`
- real Chromium geometry, toggle, Escape, outside, Tab, focus and four-view tests
- structural, Exhibit/Studio and refinement audits
- `npm run audit:refinement:performance -- --allow-gaps`
- `npm run evidence:assert-clean`
- `git diff --check`

## Readiness

`human-review-ready-deprecated-migration`. Canonical Popover can be reviewed;
G4 has no independent stability path and cannot be promoted to `stable`.
