# Hero fixed on-media palette checkpoint

Date: 2026-09-12. Baseline: `8225821`. Owner choice: A. ADR 0383.

One source color role, aliased to system neutral white; Hero retains 58 public
values because the new role replaces its inverse-text reference. Both generated
targets and the deprecated Hero Section forwarding metadata follow that role.
Adoption guidance preserves the global inverse role and explains local overrides.

Evidence in `output/playwright/hero-palette/`: fresh CLI dependency slice/install
record, previous CSS, harness, result.json and inspected Studio Dark screenshot.

- 60 combinations of full, split, text-only, fullscreen, no media and slideshow;
  five widths from 320 to 1800px; both themes. 620 element comparisons preserve
  geometry, typography, backgrounds and canonical Button/Icon Button colors.
  Only the intended on-media foreground changes in Dark; root overflow absent.
- A parent override changes full Hero description to #ffcc00; split remains
  outside that customization. Forced colors hide the scrim and render text as
  CanvasText even when the author chooses another foreground.
- Enter advances the installed slideshow to slide 2 of 3. Reduced motion hides
  its timing indicator. No network, subscription or commerce action is invoked.
- Studio and Exhibit in Dark render white headings and expose the new role.
  The deprecated Hero Section page still forwards the canonical renderer.

Source/adapter builds, canonical catalogue, validate:docs and component,
refinement and target performance audits pass. Existing Shopify asset advisories
remain. All owned browser/server resources are closed; cleanup gate passes and
public fixture is removed. No site/dist, hosted upload or stable promotion.

This fixes the demonstrated default text/scrim mismatch. The previous diagnostic
records contrast mathematics for the exact default sRGB pair. It is not a
certification of every authored image, missing scrim or custom palette. Hosted
Shopify behavior and explicit adoption remain separate.
