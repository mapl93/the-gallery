# 0197. Neutral Author Identity And Target-Owned Context

Status: Accepted

Date: 2026-07-17

## Context

Author Card exposed one required name, optional Avatar, role, biography and
links, plus full/compact presentation. Its two documentation surfaces disagreed
about semantics: static MDX used a labelled `aside` and neutral name text while
Studio used an unlabelled `section` and guessed `h2`. Compact serialized
biography and links and hid them only through CSS. Destination anchors used
Button classes, L6 duplicated focus styling instead of depending on Link, and
viewport CSS plus a Studio container override reconstructed responsive behavior
twice.

HTML cannot supply one universal author-card root. An article `footer` may own
author information, `aside` is only truthful for tangential content, and
`address` is limited to contact information for its nearest article/body and
cannot contain headings or general biography content. Heading rank and whether
the name is a Link also depend on the host document. Native `rel="author"` can
describe a truthful author-information or contact destination, but the
component cannot infer which target URL qualifies.

Shopify Liquid exposes `article.user` name, bio, email, homepage and image, with
`article.author` as a name fallback. Storefront `ArticleAuthor` exposes a
different subset. Automatic publication of contact fields, provider routes,
multiple authors, role/social data and placement are product/target policies,
not neutral component behavior.

## Decision

- L6 represents exactly one passive target-supplied author and requires one
  non-empty visible name. Missing or blank name omits the complete component.
- Neutral Web uses a `div` root and neutral `p` name. The consuming article owns
  contextual `footer`, tangential `aside`, contact-only `address`, heading rank,
  linked-name, structured-data and placement semantics.
- The optional visual identity composes canonical Avatar. Targets explicitly
  author its image or pre-derived initials, contextual alternative, semantic
  size, loading and fallback policy. Adjacent duplicate identity is normally
  hidden from assistive technology or uses empty image alt.
- Author destinations compose canonical native Link, not Button styling. The
  target supplies complete localized labels, href, security/relationship
  attributes, privacy policy and `rel="author"` only when truthful.
- Full remains the classless framed composition and renders supplied optional
  Avatar, role, biography and Links. Compact is unframed and renders only
  Avatar, name and role; biography and Links are omitted from the DOM.
- L6 stays singular. Multiple-author targets repeat it inside an appropriate
  semantic collection rather than adding a provider-specific author-array API.
- CSS uses intrinsic flex wrapping, logical dimensions, canonical semantic
  tokens and complete text/Link wrapping. The viewport breakpoint, Studio-only
  response override, hardcoded spacing/type values and duplicate Link focus
  rule are removed. No new public token is introduced.
- L6 state evidence exposed canonical Link Nav hover using a pure accent that
  failed normal-text contrast on the light surface. The correction belongs to
  Link source: Nav hover reuses its accepted accent/primary mix, so every
  consumer receives a passing state without an Author Card override.
- `AuthorCardArtwork`, its explicit data fixture, Avatar fixture and Link fixture
  become the shared Exhibit/Studio implementation. Fixture initials, icons,
  labels, destinations and author data are not contract defaults.
- The Shopify snippet maps an explicit user or `article.user`, falls back only
  to `article.author` for required name, and passively maps optional image and
  biography. Homepage and email are off by default and require both explicit
  opt-in and an explicit localized visible label. It derives no initials and
  owns no section/schema/consumer.
- L6 owns no controlled/uncontrolled state, provider model, fetch, listener,
  observer, timer, request, storage, live region, focus manager, asset,
  animation, fallback derivation or neutral JavaScript.
- Contract and Studio metadata advance to `0.2.0`, remain `pilot`, and cannot
  become `stable` without final visual approval and explicit human review.

## Owner Confirmation

Owner decision 50 accepts direction `L6-A` without changing this contract:

- the neutral `div` root and host-owned semantic context are intentional;
- `full` and `compact` remain the only L6 presentation variants;
- multiple authors use a host-owned collection of canonical Author Cards rather
  than a hidden multi-author mode or provider record array;
- public email is omitted by default; homepage and social destinations appear
  only when explicitly supplied and approved by the target;
- Shopify may map approved public name, biography and Avatar facts.

This confirmation makes the implemented neutral boundary eligible for human
review. It does not approve one universal article placement, one provider data
source, public contact consent, final visuals, or `stable` maturity.

## Consequences

- Exhibit and Studio now prove the same required-name omission, neutral DOM,
  full/compact content boundary, canonical Avatar/Link composition and intrinsic
  response instead of two locally serialized interpretations.
- Hosts can choose correct article semantics without invalid nested headings or
  forcing general biography into `address`.
- Compact consumers cannot accidentally retain unavailable author destinations
  in hidden DOM, while copied defensive CSS still protects incompatible markup.
- Shopify gains a target-native passive mapping without silently publishing
  email/homepage or claiming a first article owner, Theme Editor API, headless
  parity or provider schema. A host that has multiple authors repeats canonical
  singular Author Cards.
- Real hosts still choose their contextual wrapper/heading/link policy and
  targets approve concrete data/privacy consumers. Final surface, Avatar
  placement, type/rhythm, Link treatment, Avatar fallback follow-up and
  L6-specific design evidence remain explicit human or target review work.

## References

- <https://html.spec.whatwg.org/dev/sections.html#the-address-element>
- <https://html.spec.whatwg.org/dev/sections.html#the-aside-element>
- <https://html.spec.whatwg.org/dev/links.html#link-type-author>
- <https://www.w3.org/WAI/tutorials/images/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/link/>
- <https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
- <https://open-ui.org/components/card.research/>
- <https://www.radix-ui.com/primitives/docs/components/avatar>
- <https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/avatar>
- <https://shopify.dev/docs/api/liquid/objects/article>
- <https://shopify.dev/docs/api/liquid/objects/user>
- <https://shopify.dev/docs/api/storefront/latest/objects/articleauthor>
