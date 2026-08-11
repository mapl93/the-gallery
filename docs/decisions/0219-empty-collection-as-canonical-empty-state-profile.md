# 0219. Empty Collection As Canonical Empty State Profile

> Update (2026-07-20): ADR 0236 resolves the inherited heading boundary.
> Empty Collection receives contextual native heading markup from its host;
> heading rank is not an E7 property or visual control.

Status: Accepted

Date: 2026-07-19

## Context

E7 duplicated canonical Empty State's centered composition, icon, title,
message and action styling. Its fixture rendered “Clear filters” as navigation,
invented `#all-works` when only a label existed, hardcoded H2, admitted an empty
required heading and inherited a docs-shell heading divider. The local CTA also
recreated Button colors, spacing, hover, focus and motion.

ADRs 0064 and 0112 already accept Empty State as passive resolved-absence
composition with required title, optional message/decorative icon and one
canonical Button-or-Link action. Cart Empty establishes a domain-profile
precedent. ADR 0120 assigns collection recovery to E7 while leaving Grid data,
loading, filtering, pagination, announcements and focus outside the Grid.

External systems distinguish no-data from user-action/no-results states, but no
standard chooses Gallery's source-of-truth, recovery, copy, filter retention,
focus or Shopify section-refresh policy. WCAG may require an exposed status
message when an in-place action produces “no results”; it does not make every
static empty view a live region.

## Decision

- E7 remains a named Collection-domain resolved-empty profile. Removing or
  merging its registry identity is an owner architecture decision, not a source
  cleanup.
- The Web root layers `.empty-collection` on canonical `.empty-state`.
  `EmptyCollectionArtwork` delegates all anatomy and presentation to
  `EmptyStateArtwork`; the family hook owns only zero-min safety.
- The semantic API aligns with canonical Empty State: required non-empty
  `title`, optional concise `message`, optional decorative `icon` and one
  optional `action` composition slot.
- Missing title omits the full profile. Blank optional content omits its node.
  Fixture copy, icon and action are not defaults.
- The action slot contains one canonical Button for a command or Link for
  navigation. E7 exposes no local CTA style, action label, href, callback,
  fallback URL, disabled/loading state or action-kind enum.
- Static or route-rendered E7 remains ordinary content with no widget role,
  landmark, focus, tabindex, live region, trap or custom keyboard model.
- The target authoritatively distinguishes genuinely empty inventory from
  filtered/search no-results and other accepted causes. E7 adds no public cause
  enum before target truth, copy and lifecycle policy are accepted.
- The collection coordinator atomically replaces stale Grid/Pagination output,
  decides which filter/sort controls remain useful, owns action behavior,
  URL/history, localized dynamic Status output, focus and analytics.
- Loading, error, permissions, offline and unresolved-data states use truthful
  alternatives and are not inferred as E7.
- Under ADR 0236, the host supplies contextual native heading markup. Heading
  rank is not an E7 property or visual Studio control.
- E7 adds no visual tokens, local viewport/container query, runtime, framework
  dependency or asset. Canonical dependencies own content resilience, themes,
  forced colors and reduced motion.
- Exhibit and Studio mount one `EmptyCollectionArtwork`, one initial fixture and
  the same target-owned Button action composition. MDX fallback mirrors the
  canonical classes and documents Button/Link alternatives.
- Under ADR 0249, Shopify remains planned until its owning collection section
  proves source-inventory versus filtered/search truth, localized copy,
  filter/Grid/Pagination replacement, Button-versus-Link recovery, URL/history,
  focus/status and section-refresh behavior.
- E7 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- E7 no longer ships a parallel Empty State or Button implementation.
- Command and navigation semantics stay accurate without expanding E7's API or
  leaking React/Shopify details into neutral source.
- Collection CSS recovers most of the duplicated E7 bytes and retains family
  budget headroom for maintenance rather than resetting the ceiling.
- Target adapters can select the same profile from their native collection
  truth while retaining native action, announcement and focus behavior.
- ADR 0249 resolves E7 identity and lifecycle ownership without adding a cause
  enum. Real-target data distinction, Shopify mapping, final visuals and
  component-specific Figma evidence remain required.
