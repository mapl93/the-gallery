import raw from '../../../registry.json';

export interface Component {
  slug: string;
  name: string;
  category: string;
  file: string;
  selector: string;
  description: string;
  variants?: string[];
  sizes?: string[];
  dependencies: string[];
  tokens?: Record<string, string[]>;
}

export interface Category {
  key: string;
  name: string;
  description: string;
  file: string | null;
  count: number;
}

const componentsMap = (raw as any).components as Record<string, any>;
const categoriesMap = (raw as any).categories as Record<string, any>;

export function getComponents(): Component[] {
  return Object.entries(componentsMap).map(([slug, data]) => ({
    slug,
    name: data.name,
    category: data.category,
    file: data.file,
    selector: data.selector,
    description: data.description,
    variants: data.variants,
    sizes: data.sizes,
    dependencies: data.dependencies ?? [],
    tokens: data.tokens,
  }));
}

export function getComponent(slug: string): Component | undefined {
  return getComponents().find((c) => c.slug === slug);
}

export function getCategories(): Category[] {
  return Object.entries(categoriesMap).map(([key, data]) => ({
    key,
    name: data.name,
    description: data.description,
    file: data.file,
    count: data.count,
  }));
}

export function getComponentsByCategory(category: string): Component[] {
  return getComponents().filter((c) => c.category === category);
}
