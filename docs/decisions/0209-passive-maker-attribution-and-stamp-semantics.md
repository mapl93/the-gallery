# 0209. Passive Maker Attribution And Stamp Semantics

Status: Accepted

Date: 2026-07-18

Owner confirmation: decision 63, 2026-08-11

## Context

R9 Maker's Mark was already defined as passive identity content with a required
artist string and optional stamp, studio and year. Its runtime and MDX fallback
nevertheless forced `aside[aria-label="Maker information"]`, creating a
complementary landmark regardless of host context. The simulated MG stamp was a
generic block with `role="img"` even though the adjacent full name already
communicated the same identity, and an empty required artist could leave a
bordered shell.

Source CSS used physical hardcoded geometry, incomplete typography and a
viewport alignment rule, while Studio owned a separate width and stamp
presentation. The repository has no approved maker/person/studio/vendor record,
stamp-media policy, product relationship, provenance/authenticity protocol,
Shopify source or R9-specific Figma evidence.

HTML and WAI distinguish high-level complementary landmarks from ordinary flow
groups, contact information from identity text, work titles from person names,
and informative images from decorative duplicates. Mature Avatar components
represent profile thumbnails or fallbacks; a maker stamp can instead be an
emboss, monogram, signature, logo, irregular graphic or other target media.

## Decision

- R9 remains a passive maker-attribution group, not an artist, studio, vendor,
  product, certificate, provenance or authenticity record.
- A non-empty visible `artist` value is the viability gate. Missing/blank artist
  content omits the complete root; optional stamp/studio/year cannot keep an
  invalid shell alive.
- Neutral Web defaults to a generic non-landmark container. Targets may select
  `aside`, `article`, `section`, `address` or another element only when their
  document context independently justifies that semantic.
- Maker names remain ordinary visible text. R9 does not use `cite` for a person
  or organization and does not use `address` without actual nearest-context
  contact information.
- The target owns stamp markup and alternatives. An informative mark receives
  equivalent native image/graphic semantics; a mark that repeats the adjacent
  visible identity uses a null alternative or is hidden.
- Stamp presentation never proves authenticity, verification, certification,
  authorship, manufacture, ownership or provenance without a separately owned
  substantiated target record.
- R9 does not automatically compose Avatar or Badge. Avatar profile/fallback
  anatomy would constrain valid stamp types, while Badge communicates status
  rather than attribution.
- `studio` and `year` remain complete opaque target-formatted strings. R9 does
  not parse their meaning, infer organization/location/provenance or generate a
  machine-readable date.
- One optional non-empty target-owned `href` may wrap the complete visible maker
  identity in a native canonical Link. Missing destination leaves ordinary
  visible text. Stamp, studio and year remain passive; the root never becomes a
  whole-surface link, and R9 owns no scripted navigation or profile lifecycle.
- `MakersMarkArtwork` and one fixture are the registered Exhibit/Studio path;
  the fixture MG symbol is assistive-hidden because visible Maria Garcia text
  is the identity source. The MDX fallback remains structurally aligned.
- Canonical CSS owns the compact measure, logical surface, stamp wrapper,
  complete text hierarchy, wrapping and component-width stamp alignment. Stamp
  art/shape remains target or fixture presentation.
- Apart from optional canonical Link navigation, R9 owns no focus, action,
  disclosure, selection, live region, request, persistence or neutral
  JavaScript.
- R9 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Repeated maker attributions no longer add complementary-landmark noise or
  generic hidden labels.
- Visible text remains sufficient when stamp media is missing, decorative or
  unavailable, and optional parts omit without empty wrappers.
- A real maker-profile destination is available through one conventional Link
  without making the stamp or whole attribution surface interactive.
- Targets can use real native images, logos, signatures or stamp graphics
  without being forced into Avatar shape/fallback semantics.
- Long localized identity strings and narrow containers retain source order,
  logical geometry and complete wrapping without viewport-specific markup.
- Shopify may map an approved product vendor, metafields or maker-profile
  metaobject only after data ownership and product relationships are decided;
  no source is inferred from R9 presentation.
- Maker/studio/year meaning, media/rights/alternative policy, first profile
  destination and record relationship, provenance/authenticity protocol,
  Shopify mapping, final visuals, R9-specific Figma evidence and explicit human
  approval remain open questions.
