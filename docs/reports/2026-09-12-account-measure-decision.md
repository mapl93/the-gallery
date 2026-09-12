# Account form measure: pending owner decision

Date: 2026-09-12. Source head: `fede5ab`.

Status: diagnosis and browser-only proposals. Auth Forms and Password Reset
canonical CSS, contracts, tokens and Studio metadata are unchanged.

## Confirmed issue

`components/css/account.css:12` limits Auth to 440px. Border-box sizing at line
17 and inline-size at line 19 include the padding from line 24 inside that
measure. The same construction appears in Password Reset at lines 105–121.
The padding uses `--space-layout-container`, an alias of the page/container
margin rather than a component inset. Its responsive increase consumes most
of the 440px at large viewports.

`site/src/styles/studio.css:1395` applies width 100% and padding 0 to both Studio
wrappers, with a 440px maximum at line 1403. Thus Studio conceals the source
compression and changing the source padding token there cannot show its effect.

Fresh CLI installation of both dependency closures and native MDX fixtures:

| Viewport | Outer width | Padding per side | Useful form width |
| --- | --- | --- | --- |
| 320px | 320px | 24px | 272px |
| 900px | 440px | 48px | 344px |
| 1200px | 440px | 120px | 200px |
| 1800px | 440px | 160px | 120px |

Both components produce these measurements. At 1800px Studio instead has a
440px outer/form width with zero padding. The shrinking content on a wider
screen is a real source/presentation mismatch, not a preference about a few
pixels of whitespace.

## Reviewable alternatives

- **A — 440px useful form measure (recommended):** separate content measure and
  outer spacing. The browser probe expands the outer maximum by both existing
  padding sides: `inline-size: min(100%, calc(440px + 2 *
  var(--space-layout-container)))`. At 1800px this yields 760px outer, 160px
  padding per side and 440px form. It retains the useful measure shown in Studio.
- **B — 440px total outer measure:** retain the current maximum and use the
  actual system component/container inset role for inner padding. The probe
  sets `padding-inline: var(--tg-space-container-padding-md)`. At 1800px this
  yields 440px outer, 32px per side and 376px useful form width.

Both can be implemented with public tokens, but the maximum token's meaning,
initial layout and Studio reconciliation differ. Neither alternative is in
canonical CSS. Owner selection requested after inspecting both screenshots.
Do not silently approve a layout or introduce a new responsive mode.

## Evidence and limits

Eight source viewport samples, four option/component samples and two Studio
samples saved under ignored `output/playwright/account-measure/`: result JSON,
CLI provenance, harness, current/A/B Auth and Password Reset screenshots.
The initial B probe mistakenly used the page-gutter alias and reproduced the
compression. It was discarded; the final B measurement uses the distinct
container-padding role above, and final screenshots/results were refreshed.

All phases use one headless browser/tab and one owned server. Cleanup, resource
gates and process scans pass; owned temporary public fixtures were removed.
No credentials entered or sent, no recovery request, Shopify change, source
mutation, authentication service or maturity promotion. Current native heading
weights remain 700; this measure proposal does not change typography.

## Acceptance after selection

Define useful versus outer maximum explicitly in source tokens/contract/docs;
expose the chosen measure and appropriate independent padding/spacing controls
in Studio/Exhibit; remove the site overrides that hide source values. Verify
useful width at 320/900/1200/1800px, container narrowing, inherited token updates,
RTL/long content, native entry/recovery preview and reset. Keep actual account
provider integration under ADR 0258 and its separate target evidence gates.
