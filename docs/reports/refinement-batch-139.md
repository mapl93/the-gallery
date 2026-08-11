# Refinement Batch 139: Quick View Rich Media And Complete Snapshot

Date: 2026-07-21

Component: `K8` / `quick-view`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected K8-A is reconciled across ADRs 0180/0238/0255, contract `0.3.0`,
the shared docs implementation, MDX, the decision packet, open-question ledger,
dossier, audit, Shopify translation and global progress matrix.

Quick View remains one focused canonical Modal profile over a complete coherent
target-owned product snapshot. It composes canonical Product Gallery, Price,
optional native Product Form and one complete real full-details Link. Modal
exclusively owns modality, inertness, focus, dismissal and restoration; one
target product coordinator owns snapshot readiness, selected variant, media,
availability, Price, Form, URL, purchase result, cart refresh and status.
Incomplete, loading or stale snapshots omit K8.

The docs target now reuses the same five-record rich Product Gallery fixture as
the standalone component: two images plus hosted video, external video and a
model. It controls the current media id and passes `imageDetail="none"`.
Selection, canonical navigation and explicit rich-media activation remain
available, while images are passive and cannot create a nested or transferred
Lightbox. The full-details destination retains Product Gallery's independent
lightbox default. No K8 property, public token, neutral runtime or duplicate
media engine was added.

Shopify already maps complete `product.media` through the canonical
`product-gallery` snippet with `image_detail: 'none'`. Official documentation
search reconfirmed hosted/external-video media mappings, and official artifact
validation passed `quick-view.liquid` plus `product-gallery.liquid`. K8 remains
honestly non-target-ready until live invocation, complete-snapshot loading,
variant/purchase coordination, editor, focus and status evidence exists.

## Evidence

Batch 139 used one isolated headless Chromium context and one page. The browser
closed in `finally`; the repository cleanup gate then confirmed the managed
server stopped, URL unresponsive, port 4173 free and stable CLI session closed.
The preliminary CLI daemon attempt created no browser and was cleaned before
the isolated final run.

The evidence resource manager was hardened after that diagnostic: status and
cleanup now prefer an already-installed local Playwright CLI, enforce a five
second subprocess timeout, and retain the wrapper only as fallback. The final
combined `status + cleanup + assert-clean` check completed in about `1.5s`, so
an `npx` resolution stall can no longer block cleanup indefinitely.

The final evidence records:

- eight paired Exhibit/Studio captures at mobile, tablet, desktop and XL with
  zero root, descendant or document overflow;
- five media records covering `image`, `video`, `external-video` and `model` in
  every capture;
- `imageDetail="none"`, zero image-action Buttons, zero Lightboxes and exactly
  one modal dialog;
- explicit activation of hosted video, external video and model content, with
  the detail image remaining passive;
- target-controlled current id/status updated to `turntable` and
  `2 of 5: Turntable video`;
- title initial focus, close/Escape trigger restoration and current-id
  persistence across close/reopen;
- exact normalized Exhibit/Studio subtree parity: `8,446` characters and
  matching `fac7c618` hashes; and
- zero console errors, page errors or assertion failures.

Direct swipe is inherited through the exact same Product Gallery renderer and
remains covered by the ADR 0238 evidence manifest. Batch 139 artifacts live in
`output/playwright/refinement-batch-139/`.

## Validation

- 183 contracts, 183 Studio definitions and 1,019 semantic properties: pass;
- 254 static previews: 0 errors;
- TypeScript and shared-runtime syntax: pass;
- Neutral Web and Shopify adapters: pass;
- Shopify official artifact validation for Quick View/Product Gallery: pass;
- Shopify adapter inventory: 183 components, 90 target-ready, 59 dedicated
  Liquid templates and 34/34 schema-ready;
- external docs build: 2,508 modules, output only under `/tmp`;
- generated Cart CSS identity, diff whitespace and `site/dist` cleanliness:
  pass;
- Cart family budget: `3,057 / 3,072 B`, `15 B` headroom;
- K8 CSS slice: `1,129 B` raw / `494 B` gzip; neutral runtime delta: `0 B`;
- refinement matrix: `153 / 183` ready for human review, `30` remaining; and
- final owned-resource cleanup: pass.

The performance audit retains eight documented program gaps and zero
undocumented gaps. The largest remain neutral component CSS
`71,891 / 65,536 B` and shared runtime `22,807 / 8,192 B`; this batch introduces
neither. Human visual, mobile presentation, live Shopify, K8-specific Figma and
explicit stability review remain pending. No `stable` promotion is claimed.
