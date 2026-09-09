# 0298. Repo-to-Figma Form Pilot

Status: Implemented and verified; owner visual review pending; unpublished

Date: 2026-09-08

## Context

The owner authorized continuing after the Shopify pilot, preferring the existing
The Gallery Design System file. The Shopify checkpoint was committed and pushed
as `0f13e5e` before Figma work. Repository source remains authoritative.

Discovery found seven historical pages, 584 variables, four collections and
existing component artwork. Therefore the pilot uses separate Gallery Pilot
pages and collections inside that file, preserving historical content.

## Decision

- Scope the pilot to Button, Input, Select and Textarea, plus their icon/option
  utilities and three form compositions.
- Select tokens from the four public contract inventories and traverse aliases.
  Preserve existing Light/Dark and four viewport modes; add no source modes.
- Project 134 source tokens plus 20 private adapter calculations into 154
  variables across Primitives, Colors and Metrics collections. These collections
  are Figma output organization, not additional source-token layers.
- Preserve cross-collection aliases and stable variable/component/style IDs.
  The identity map lives in `platforms/figma/pilot/manifest.json`.
- Use six text styles and one Select shadow style for composite properties.
  Convert dimensions to px and opacity fractions to Figma binding percentages.
  Preserve Inter as the current interface family; fallback stacks remain in code.
- Derive CSS color mixes through a bounded Chromium capture with source hashes.
  Unitless Button line height, optical slot width and focus expansion are
  explicit adapter calculations, not new public tokens.
- Use the Plugin API for this pilot, compatible with the verified Professional
  file. This is not a decision about the general delivery or publishing model.
- Preserve independent Variant and State axes. Component constructors reuse
  existing sets; token/style/geometry updates preserve instance overrides.
- Represent focus through an actual stroked outline. Zero-blur expanded shadows
  retained spread metadata but failed the native PNG visual check.
- Keep the library unpublished. No maturity promotion, broad migration,
  historical-file cleanup or Shopify publication follows from this checkpoint.

## Acceptance and evidence

The dated report and `platforms/figma/pilot/evidence.json` record:

1. 154 variables with valid names, types, code syntax, modes and alias targets.
2. 90 editable variants: 30 Button and 20 per field component.
3. The original 584 variables remain outside the pilot collections.
4. Input and Button are 46 px high and share the same vertical position in all
   three adjacent-control compositions.
5. Changing both field gaps from 4 to 8 px updates Input, Select and Textarea
   instances; restoring aliases returns the entire recorded geometry and content.
6. Repeated variable/style/constructor updates create no duplicate identities.
7. The local source/evidence validator and current docs validation pass.

## Remaining limits

This is a static, default-density form pilot. CSS arithmetic requires resync.
It is not a bidirectional bridge, automatic structural component migrator,
published library, full DTCG 2025.10 interchange implementation or native
accessibility/behavior certification. See the pilot README for exact exclusions.
