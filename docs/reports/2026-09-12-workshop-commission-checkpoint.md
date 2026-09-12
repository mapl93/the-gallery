# Workshop Listing / Commission Form checkpoint

Date: 2026-09-12

Decision: ADR 0361. Fourteen source roles; 23/18 public values.

## Local evidence

- Fresh CLI consumer installs both components and their canonical dependencies.
  376 element comparisons across 320/600/900/1200 and light/dark preserve default
  geometry within 0.02 CSS px, fonts, colors, gaps, padding, borders and radii.
  The MDX Workshop consumer fixture has one record; Studio separately exercises
  the shared multi-record renderer.
- Workshop custom body/footer/metadata gaps are 10/12/14px, footer padding 16px,
  border 3px and media square. Accent share zero matches the primary text color.
  Narrow RTL stays inside the host and the native details link receives focus.
- Commission custom width 500px, padding 16px, section/header/fields/action gaps
  48/8/12/10px pass. Narrow RTL actions fill their row without document overflow;
  canonical fields remain visible under forced colors.
- Studio edits rem minimum/maximum measures and media aspect. Editing Grid gap
  yields 40px in Workshop and 30px in Commission after removing the competing
  site clamp. Commission's 30rem maximum is respected after its broad site width
  override is excluded. Required composition toggles stay locked; optional
  upload omission and reset work. Exhibit lists both new profiles.
- Studio's real form rejects empty required fields, accepts valid name/email/
  request input, produces the explicitly local preview result and resets native
  values. No submission/upload service was contacted. File transport and file
  selection are not tested by this checkpoint.
- The first harness incorrectly tried to toggle a required slot; it was corrected
  to check Studio's intentional lock. A subsequent measure assertion exposed
  the actual Studio width override, corrected in source. Final full evidence
  passes. Screenshots inspected under ignored `output/playwright/intake-values/`.
  Temporary public fixture removed; all evidence phases closed browser/server,
  resource gate is clean and no remaining test processes were found.

Source/Web/Shopify builds and adapter validators, docs/contracts/Studio,
catalogue and structural certification/refinement/performance inventories pass.
Catalogue: 1,206 paths, 9,648 compiler comparisons. Maturity unchanged:
5 stable, 173 pilot, 4 deprecated. Existing Shopify advisory performance
overages remain; they do not represent target certification.

No new runtime, source modes, Figma work, installations, site/dist, Shopify
upload or stable promotion. Production workshop/commission records, privacy,
services, all locales, full assistive-technology behavior and hosted Shopify
editor evidence remain outside this checkpoint.
