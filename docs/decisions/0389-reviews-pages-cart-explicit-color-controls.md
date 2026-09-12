# ADR 0389: Reviews, Pages and Cart Explicit Color Controls

Status: Accepted

Date: 2026-09-12

ReviewsStudio, PagesStudio and CartStudio use static first-token swatches.
Separate grouped color roles in Review Summary, Review, Review Highlights,
Photo Reviews, Star Input, Coming Soon, Policy Page and Free Shipping Bar.
No source values, token identities, CSS or behavior change.

Star Input's grouped roles were selected through a regular-expression binding,
not an explicit list. Resolve the existing contract inventory into named
single-token controls. Name the roles for empty/hovered/selected stars, default
focus, and error/success/warning star, label and focus values. Mixed colors are
labelled as mix bases where appropriate. State semantics remain independent.

Extend the reviewed static-renderer guard to these three renderers. It validates
resolved tokens, including pattern bindings. State-aware renderer capabilities
remain outside this restriction. Studio and Exhibit share the same metadata.
