# ADR 0379: Share and Related Article Layout Values

Status: Accepted

Date: 2026-09-12

Apply ADR 0293 with one Share Actions gap multiplier and five Related Articles
roles: block padding, title/grid gaps, track minimum and border width. Public
inventories are 2 and 14. Multipliers preserve responsive system roles; border
aliases dimension.1 and the existing 12rem track measure remains explicit.

Share composes canonical Button; Related composes canonical Article Card.
Native action identity, capabilities and invocation, curated article records,
visible title/section naming, required-content omission and the accepted record
policy remain unchanged. The grid adapts to its parent using the public minimum.
Legacy article-nav remains outside L10 and public v1; it is not tokenized as
part of this component. There is no new component, platform, mode or runtime.

Studio/Exhibit share public metadata, both adapters regenerate and copies must
adopt the new values. Provider invocation, hosted integration and stable review
remain separate. Evidence: `docs/reports/2026-09-12-share-related-values-checkpoint.md`.
