import { type ComponentType, lazy } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MdxComponent = ComponentType<any>;

/**
 * MDX content registry — auto-discovered from `content/components/*.mdx`.
 * Every component page lives in a single canonical MDX file.
 */
const mdxModules = import.meta.glob<{ default: MdxComponent }>('./components/*.mdx');

const mdxPages = Object.fromEntries(
  Object.entries(mdxModules).map(([path, loader]) => [
    path.split('/').pop()!.replace(/\.mdx$/, ''),
    loader,
  ])
) as Record<string, () => Promise<{ default: MdxComponent }>>;

const cache: Record<string, MdxComponent> = {};

/**
 * Returns a lazy React component for the MDX page, or null if none exists.
 */
export function getMdxPage(slug: string): MdxComponent | null {
  if (!mdxPages[slug]) return null;
  if (!cache[slug]) {
    cache[slug] = lazy(mdxPages[slug]);
  }
  return cache[slug];
}

/** Check if a component has a custom MDX page. */
export function hasMdxPage(slug: string): boolean {
  return slug in mdxPages;
}
