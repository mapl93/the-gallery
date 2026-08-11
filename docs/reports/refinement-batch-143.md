# Refinement Batch 143: Target-Controlled Password Recovery Replacement

Date: 2026-07-21

Component: `U2` / `password-reset`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

Owner-selected U2-A is reconciled across ADRs 0185/0258/0259, contract `0.3.0`,
shared renderer, Studio target simulation, CSS, MDX, dossier, audit, Shopify
translation, evidence, open questions, and the global progress matrix.

Password Reset now renders exactly one target-selected presentation: canonical
Form/Input/Button for the request, or canonical polite Alert only after provider
confirmation. The confirmed presentation replaces the Form and receives focus
when the removed submitter would otherwise strand it. No public success boolean,
neutral transition machine, request/provider/token runtime, or additional
semantic property was introduced.

Shopify v1 intentionally omits U2 because current customer accounts use
passwordless authentication. Classic Liquid recovery and the distinct
token-backed password-reset step require a separately versioned compatibility
adapter and are never an automatic fallback.

## Evidence

Batch 143 records fourteen images and a machine-readable summary under
`output/playwright/refinement-batch-143/`. One final headless Chromium context
and one page prove:

- one request Form, named required Email Input, submitter and no live region in
  all eight paired Mobile/Tablet/Desktop/XL captures;
- native invalid focus/valueMissing and exact
  `email=alex@example.com` FormData;
- complete request removal after simulated provider confirmation;
- one focused canonical `role=status`, `aria-live=polite`, `tabindex=-1` Alert;
- strict missing-composition and blank-title omission;
- exact normalized request parity at `1,044` characters and matching
  `4d2efb8b` hashes;
- localized Arabic RTL containment at exactly `200px`;
- solid `2px` keyboard/forced-colors focus, `0s` reduced motion, zero overflow,
  zero console/page errors, and zero assertion failures.

One preliminary pass stopped on a harness label mismatch and another revealed
retained test-only RTL width in later screenshots. Every run closed Chromium in
`finally`; the final pass refreshed the route before special modes. The managed
server was stopped and the owned-resource gate is clean.

## Validation

- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready globally, 60 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets, valid;
- TypeScript and external Vite build: pass without rebuilding `site/dist`;
- refinement matrix: `157 / 183` ready for human review and `26` remaining; and
- performance: 18 surfaces, 10 pass and 8 documented gaps with zero
  undocumented gaps.

U2 is `1,683 B` raw / `540 B` gzip and adds `0 B` neutral runtime. Account CSS
is `2,853 / 3,072 B`, leaving `219 B` headroom. Neutral component CSS decreases
to `71,884 B` gzip; existing program gaps remain documented and separate.

Human visual review, live provider/security lifecycle proof, corrected U2-
specific artwork, and explicit stability review remain pending. No `stable`
promotion is claimed.
