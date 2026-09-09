# 0339. Product Info And Product Slider Public Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with eight Product Info and seven Product Slider source roles.
Product Info exposes identity/content spacing factors, vendor tracking, title,
rich heading and metadata term weights, rich-list inset and metadata minimum
column width. Existing global roles remain the inputs for type sizes, leading,
families, text colors and main gaps. Explicit root body family/weight allows
scoped overrides to reach inherited text. This supersedes ADR 0115's private-only
ownership for those visual values, preserving passive semantics and target-owned
rich-content/variant coordination.

Uppercase vendor and italic editorial subtitle retain their accepted treatment;
the rich description retains native underlined links and browser focus. They are
not encoded as generic string tokens or new source types in this batch.

Product Slider exposes header/track and navigation gap factors, title flex basis
and weight, and visible-item counts at the existing compact/48rem/64rem layouts.
Defaults remain 2/3/4. One private column formula consumes the active public count;
container queries change only that input. Counts below one use one to avoid an
invalid division or negative card width. This is a geometric minimum, not a
collection limit. No new source modes, breakpoints or duplicate token catalogue
are introduced. Title weight aliases the current browser-default bold role so
heading rank no longer implicitly controls that visual value.

Carousel and Icon Button provide the used focus, control and motion tokens.
Product Card owns item visuals; its complete catalogue is not duplicated here.
Quick Look terminology replaces the stale quick-add mention in Slider's contract.
No runtime, data, autoplay, loop, loading, sanitizer or Shopify coordinator changes.
Both components remain pilot; local validation does not grant human approval.

## Acceptance

Compare default geometry across both themes and existing container thresholds.
Verify spacing/type/metadata overrides, narrow and RTL rich content, changed card
counts, finite navigation, inherited focus/controls, Studio/reset and Exhibit.
Validate source, contracts, metadata, docs, copied CLI output and adapters.
