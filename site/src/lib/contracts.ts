export interface ContractSource {
  registry: string;
  css: {
    file: string;
    selector: string;
  };
  docs: string;
}

export interface ContractAnatomyPart {
  name: string;
  selector: string | null;
  className?: string | null;
  required: boolean;
  generated?: boolean;
  description: string;
}

export interface ContractOption {
  name: string;
  className: string | null;
  default: boolean;
  description: string;
}

export interface ContractState {
  name: string;
  selectors: string[];
  description: string;
}

export interface ContractBehavior {
  name: string;
  selectors?: string[];
  attributes?: string[];
  events?: string[];
  description: string;
}

export interface ContractTargetMapping {
  kind: 'content' | 'optionClass' | 'class' | 'attribute' | 'slot' | 'collection';
  selector?: string;
  source?: 'variants' | 'sizes';
  classNames?: string[];
  attribute?: string;
  values?: Record<string, string | boolean | number | null>;
  removeWhen?: Array<string | boolean | number>;
  valueFrom?: 'property';
  elements?: string[];
}

export interface ContractProperty {
  name: string;
  type: 'string' | 'string-list' | 'boolean' | 'number' | 'enum' | 'slot';
  required: boolean;
  defaultValue?: string | boolean | number;
  minimum?: number;
  maximum?: number;
  step?: number;
  values?: string[];
  valuesFrom?: 'variants' | 'sizes';
  unsetBehavior?: string;
  description: string;
  targetMappings: Record<string, ContractTargetMapping[]>;
}

export interface ContractAdapter {
  status: 'implemented' | 'planned' | 'unsupported';
  kind: string;
  notes?: string;
}

export interface ComponentContract {
  $schema: string;
  contractVersion: string;
  slug: string;
  name: string;
  registryId: string;
  category: string;
  status: 'draft' | 'pilot' | 'stable' | 'deprecated';
  summary: string;
  dependencies: string[];
  source: ContractSource;
  anatomy: ContractAnatomyPart[];
  variants: ContractOption[];
  sizes: ContractOption[];
  states: ContractState[];
  behavior?: ContractBehavior[];
  properties?: ContractProperty[];
  tokens: {
    public: Record<string, string[]>;
  };
  accessibility: string[];
  adapters: Record<string, ContractAdapter>;
}

// Keep the eager module map bound to the current repository contract inventory;
// Vite must re-evaluate this module when a pre-v1 contract is replaced in place.
const contractModules = import.meta.glob('../../../components/contracts/*.contract.json', {
  eager: true,
  import: 'default',
}) as Record<string, ComponentContract>;

const contractsBySlug = Object.fromEntries(
  Object.values(contractModules).map((contract) => [contract.slug, contract])
) as Record<string, ComponentContract>;

export function getComponentContract(slug: string): ComponentContract | undefined {
  return contractsBySlug[slug];
}

export function hasComponentContract(slug: string): boolean {
  return slug in contractsBySlug;
}

export function getComponentContracts(): ComponentContract[] {
  return Object.values(contractsBySlug).sort((a, b) => a.registryId.localeCompare(b.registryId));
}
