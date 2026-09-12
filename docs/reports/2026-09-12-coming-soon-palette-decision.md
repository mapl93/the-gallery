# Coming Soon dark-media palette decision

Date: 2026-09-12. Source baseline: `0892a21`. Status: awaiting owner choice.

## Confirmed problem

`components/css/coming-soon.css:32` selects theme-relative inverse text whenever
background media exists. Dark resolves this to #171717, while lines 37–48 retain
a black gradient at 0.6–0.78 opacity. Muted copy uses the same text at 86% alpha.
The actual Studio media fixture reproduces dark text over the darkened image.

Local evidence: `output/playwright/coming-soon-palette/`, including current-dark,
option-a and option-b screenshots, computed colors and restored-state proof.
Temporary diagnostic styles were inserted only in the browser and then removed;
no component CSS, source tokens, contracts or adapters changed.

WCAG 2.2's text contrast reference is 4.5:1 for ordinary text and 3:1 for qualifying
large text. Source checked 2026-09-12:
https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Using sRGB channel compositing with opaque SDR media, a black scrim of at least
0.6 bounds the underlying channels at 102/255. The neutral-background sweep
finds a best-case current muted-copy ratio of 2.769:1 (opaque title 3.122:1).
These are compositing calculations, not sampled antialiased screenshot pixels.
They do not certify arbitrary media, custom colors, HDR or unrelated controls.

## Reviewable alternatives

A, recommended: fixed white on-media text in both themes; retain the black scrim
and muted-copy alpha. This follows the owner-approved Hero/Article Hero direction.
The limiting neutral background yields 5.742:1 opaque / 4.754:1 muted text.

B: retain theme-relative inverse text and pair it with a white scrim in Dark.
The image becomes visibly lighter; the neutral bound is 6.293:1 opaque /
5.093:1 muted text. Light keeps its current white text/black scrim. This is a
separate aesthetic choice, not a technical requirement.

Both proposals preserve the actual Input and Button colors, structure and
behavior in the comparison. The no-image presentation remains normal semantic
text. The selected implementation should use appropriate public source tokens,
contracts and shared Studio/Exhibit controls; browser-only literals above are
diagnostic proposals, not the planned authoring API.

## Acceptance after selection

- Independent public media-text/scrim values anchored to existing system roles.
- Default contrast and geometry checked in Light/Dark, with/without media and at
  the existing responsive breakpoints; forced colors and reduced motion retained.
- Real Studio overrides/reset and Exhibit documentation; copy-and-own adoption
  guidance for consumers with intentional inverse-text overrides.
- Generated Web and Shopify parity, relevant validators, commit and push.
- No promotion to stable or hosted Shopify certification from these checks.

All owned browser/server resources were closed; the final resource gate passed.
The owner choice is pending. Source-value coverage for remaining components,
paired-control labels and target delivery remain separate backlog; resolving
static swatches does not close all nine original audit areas.
