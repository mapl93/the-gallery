# ADR 0391: Sections Studio Explicit Token Controls

Status: Accepted

Date: 2026-09-12

SectionsStudio statically selects the first swatch token. Split its grouped
colors in Image Text, Multicolumn, Lookbook, Brand Story, FAQ Section, Contact
Section, Shipping Info, Rich Text Section, Instagram Feed and Collage Section.
Logo Bar's single radius role incorrectly used a color swatch; it now uses a
numeric token editor labelled Logo radius. No public role or default changes.

Extend the reviewed static-renderer guard to SectionsStudio, covering resolved
color groups and non-color swatches. Existing paired editors remain accessible
and are not changed by this correction. Their labels can be refined separately.

Studio and Exhibit consume the same metadata. This does not define media-palette
policy, interaction semantics or new token values for these components.
