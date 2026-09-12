# Hero dark on-media contrast decision

Date: 2026-09-12. Status: resolved — owner selected A. ADR 0383 and the Hero palette checkpoint
record implementation; the diagnostic below describes the prior baseline.

## Confirmed error and consequence

`components/css/marketing.css:30` selects the theme-relative inverse text role
for media-backed, non-split Hero. Line 81 retains a black scrim at the shared
initial opacity .6. This pairing predates ADR 0382. Dark resolves the foreground
to #171717 while the image stays darkened. The title, label and description
inherit that foreground; canonical child Buttons keep their own colors.

Rendered evidence in `output/playwright/hero-values/palette-result.json`
confirms rgb(23,23,23), black scrim/.6, a 40px title and regular 20px description.
For opaque SDR sRGB media behind this full scrim, even white image pixels become
#666666. The maximum available contrast against #171717 is about 3.12:1; the
regular description cannot reach the required 4.5:1. The solid #867865 media used
in the consumer fixture yields about 1.37:1. This is computed from actual CSS
colors and alpha composition, not anti-aliased text pixels or a token alone.
[WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
distinguishes ordinary 4.5:1 and large-text 3:1 thresholds.

## Reviewable options

The inspected `palette-options.png` shows current, A and B using the same
canonical Hero anatomy, photo, typography and dimensions. Comparison-only height
bounds keep the three cards aligned; the alternatives are local token overrides.
No candidate palette has been applied to canonical source.

- A (recommended): fixed white on-media text with black scrim in both themes,
  matching the existing Article Hero treatment. Introduce the corresponding
  public Hero color role anchored to system neutral white. Full/no-media and
  split normal text remain unchanged. At the current .6 scrim, the worst-case
  white-image bound is about 5.74:1 for white text.
- B: preserve inverse text but pair it with an inverse scrim: white/.6 over media
  in Dark, black/.6 in Light. This intentionally lightens the photograph in Dark.
  For #171717 text over the darkest possible image behind white/.6, the bound is
  about 6.29:1. Express the pairing through theme-aware source roles.

The numerical bounds assume these exact colors, opacity and an opaque SDR
image. Custom values, missing scrims and different image compositions require
fresh contrast review; neither candidate certifies every authored Hero.

AGENTS.md requires asking before changing the owner-facing aesthetic. The
contrast defect is objective; choosing a consistently darkened photograph or a
theme-inverted photograph is not determined by a technical standard. The owner
question is limited to that choice, not permission to repair the defect.

## Acceptance after choice

Verify the paired tokens in full and slideshow, both themes, real image crops,
label/description/title and canonical controls; preserve split, absent-media,
forced-color and reduced-motion behavior. Expose the chosen public roles in
Studio/Exhibit, regenerate both targets, validate and commit/push. Hosted
Shopify verification and copy adoption remain separate.
