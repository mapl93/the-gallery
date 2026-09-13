# ADR 0405: Review Summary and Star Input Visual Values

Status: Accepted

Date: 2026-09-13

Expose ten Review Summary roles for column measures, cell/row/detail spacing,
track height and rule width; five Star Input roles for visual star size, focus
width and the existing default/validation color mixtures. Legend weight uses
the existing semibold token. Defaults, paired semantic field colors, native
radio semantics and the shared touch-target size remain unchanged. The required
marker's geometry follows ADR 0275; its existing public color is retained.

Review counts, percentages and selected values remain data. Star Rating V2 is a
deprecated reference to Rating, and Review Pagination composes Pagination; neither
requires a duplicate visual-token family. Normalize Star Input's public motion
inventory under the registry's existing transition category when synchronizing
it, without changing the motion token itself. Studio/Exhibit and Web/Shopify
consume the matching public inventories. Consumers adopt copied changes explicitly.
