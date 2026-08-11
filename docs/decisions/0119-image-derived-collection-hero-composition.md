# 0119. Image-Derived Collection Hero Composition

Status: Accepted

Date: 2026-07-14

## Context

Collection Hero exposed both a `variant` enum (`default` or `with-image`) and an
independent optional image slot. Studio could therefore render image markup
without image contrast treatment, or select image contrast treatment without an
image. The target-agnostic API admitted combinations that had no coherent visual
or semantic meaning.

The canonical image variant also used a fixed black overlay with
`--color-text-inverse`. That pair worked in the light theme, where inverse text
is light, but the accepted dark theme maps inverse text to a dark value while the
fixed overlay stayed black. The component had no forced-colors fallback, copied
site-only mobile height, fixed spacing literals, and partially duplicated its
fallback anatomy.

Collection Hero is ordinary static page content. WAI image guidance makes image
alternative text contextual, HTML leaves heading rank to the surrounding
document, and neither APG nor Open UI defines a Hero widget. Shopify's collection
object supplies title, description, image, and count data, while its target
schema can expose optional content parts without changing neutral semantics.

## Decision

- Collection Hero is a passive collection introduction. It owns no widget role,
  events, live region, keyboard/focus model, controlled/uncontrolled state,
  motion, data fetching, or neutral runtime.
- The public properties are required `title` plus optional `description`,
  `count`, `image`, and `imageAlt`. `variant` is removed as a public property.
- `default` and `with-image` remain documented CSS composition modes. Supplying
  image media is the single source of truth from which adapters derive
  `.collection-hero--with-image`; the class is never selected independently.
- The target renders exactly one visible native title heading at the rank owned
  by the surrounding document. Heading rank is not a decorative component
  property.
- Description remains concise plain text, matching the accepted contract and
  docs candidate. Long-form or structured collection narrative belongs in a
  separate content region.
- Count is an already localized target-formatted string. It is ordinary text,
  not a live region; collection filters/results own update announcements and
  synchronization.
- Image media uses a real target image. Informative media receives useful
  contextual alt text; decorative media preserves `alt=""`. Targets do not copy
  the collection title merely to avoid an empty alternative.
- Image contrast pairs `--color-text-inverse` with a scrim drawn from the current
  `--color-text-primary` at `--opacity-overlay`. The pair remains opposite in
  light and dark themes. Forced colors makes image pixels visually transparent
  while retaining the image node and alt semantics, leaving system Canvas and
  CanvasText colors authoritative.
- Root spacing responds to the containing inline size through token-bounded
  intrinsic values. The `300px` image minimum, `680px` readable width, media
  crop, centered alignment, and compact `.875em` count scale are private
  geometry, not public component tokens or properties.
- Exhibit and Studio use the same CollectionStudio render branch and fixture.
  Image presence derives the class; `imageAlt` is visible only when image media
  is enabled. The nested docs renderer uses `h2` because the component document
  owns `h1`.
- Shopify maps the collection template to native `h1`, escaped title, concise
  plain-text description, image alt, and localized `products_count`. Merchant
  settings show or hide description, image, and count; image visibility derives
  the class. Loading priority remains target-owned.
- The contract remains `pilot`. Automated evidence makes the candidate ready
  for human review but never promotes it to `stable`.

## Performance

Deterministic level-9 gzip after refinement measures:

- Collection CSS: `2,188 B / 2.5 KiB`, a `36 B` increase from the dossier
  baseline and `372 B` of whole-byte headroom.
- Neutral Web component CSS: `65,475 B / 64 KiB`, a `23 B` increase and `61 B`
  of headroom.
- Shared neutral runtime: `10,492 B / 8 KiB`, the existing explicit cumulative
  exception; Collection Hero adds `0 B`.

The small CSS delta pays for image-derived theme pairing, forced-colors media
handling, intrinsic spacing, safe wrapping, and explicit stack rhythm. No
ceiling is reset.

## Consequences

- Consumers cannot construct the former image/variant contradictions.
- Web, Shopify, framework, native, and Figma adapters share five semantic inputs
  while retaining target-native headings, images, data, and loading policy.
- Light mode preserves the current dark-scrim/light-text candidate. Dark mode
  intentionally uses a light scrim with dark text to preserve the accepted
  semantic token opposition; that visual inversion requires explicit human
  aesthetic approval before stability.
- The tested editorial image reaches at least `5.84:1` contrast in light and
  `6.06:1` in dark across every source pixel after compositing. Future media
  still requires frame-specific contrast evidence.
- Rich descriptions, focal-point editing, alternate alignment/layout modes,
  count announcement ownership, or a fixed on-media color token require future
  explicit product or architecture decisions.
- Human review remains responsible for crop, minimum depth, title prominence,
  readable width, spacing, overlay density, and dark-mode visual direction.
