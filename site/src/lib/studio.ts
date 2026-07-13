export type StudioControlKind =
  | 'text'
  | 'number'
  | 'select'
  | 'segmented'
  | 'state'
  | 'icon'
  | 'slot-composition'
  | 'toggle'
  | 'token'
  | 'token-pair'
  | 'token-swatch';

export interface StudioDesignReference {
  fileKey: string;
  frameNodeId: string;
  inspectorNodeId: string;
}

export interface StudioVisibilityRule {
  property: string;
  equals: string | boolean | number;
}

export interface StudioTokenSource {
  category: string;
  names?: string[];
  match?: string;
}

export interface StudioIconCatalogueSource {
  source: 'lucide';
  defaultLeading: string;
  defaultTrailing: string;
}

export interface StudioControl {
  id: string;
  label: string;
  kind: StudioControlKind;
  properties?: string[];
  source?: 'states';
  optionLabels?: Record<string, string>;
  iconCatalogue?: StudioIconCatalogueSource;
  visibleWhen?: StudioVisibilityRule;
  tokens?: StudioTokenSource;
}

export interface StudioGroup {
  id: string;
  label: string;
  controls: StudioControl[];
}

export interface StudioDefinition {
  $schema: string;
  studioVersion: string;
  slug: string;
  designReference: StudioDesignReference;
  groups: StudioGroup[];
}

const studioModules = import.meta.glob('../content/studio/*.studio.json', {
  eager: true,
  import: 'default',
}) as Record<string, StudioDefinition>;

const studioBySlug = Object.fromEntries(
  Object.values(studioModules).map((definition) => [definition.slug, definition])
) as Record<string, StudioDefinition>;

export function getStudioDefinition(slug: string): StudioDefinition | undefined {
  return studioBySlug[slug];
}

export function hasStudioDefinition(slug: string): boolean {
  return slug in studioBySlug;
}

export function getStudioDefinitions(): StudioDefinition[] {
  return Object.values(studioBySlug).sort((a, b) => a.slug.localeCompare(b.slug));
}
