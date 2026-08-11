import {
  useEffect,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import {
  locationSearchFixture,
  PickupLocationSelectorArtwork,
  StoreLocatorArtwork,
  type LocationSearchStatus,
} from './LocationSearchArtwork';

interface LocationStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtures: Record<string, StudioPropertyValues> = {
  'pickup-location-selector': {
    heading: 'Choose a pickup location',
    description: 'Search locations eligible for the selected piece in your current market.',
    queryLabel: 'City, region, or postal code',
    query: '',
    queryPlaceholder: 'Try Palermo',
    searchLabel: 'Search',
    useLocationLabel: 'Use my location',
    selectionLabel: 'Eligible pickup locations',
    locations: true,
    selectedLocationId: 'palermo-gallery',
    status: 'ready',
    statusMessage: '2 eligible pickup locations.',
    map: false,
  },
  'store-locator': {
    heading: 'Find a gallery or studio',
    description: 'Explore branches, opening hours, services, and contact details.',
    queryLabel: 'City, region, or postal code',
    query: '',
    queryPlaceholder: 'Try Recoleta',
    searchLabel: 'Search',
    useLocationLabel: 'Use my location',
    resultsLabel: 'Nearby locations',
    locations: true,
    status: 'ready',
    statusMessage: '2 locations found.',
    map: false,
  },
};

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    const source = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    return source?.find((option) => option.default)?.name ?? property.values?.[0] ?? null;
  }
  return '';
}

function initialValues(contract: ComponentContract): StudioPropertyValues {
  return {
    ...Object.fromEntries((contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])),
    ...(fixtures[contract.slug] ?? {}),
  } as StudioPropertyValues;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function statusCopy(slug: string, status: LocationSearchStatus): string {
  if (status === 'loading') return 'Searching locations…';
  if (status === 'empty') return 'No matching locations. Try another city, region, or postal code.';
  if (status === 'error') return 'Locations could not be loaded. The manual search remains available for retry.';
  return slug === 'pickup-location-selector' ? '2 eligible pickup locations.' : '2 locations found.';
}

export default function LocationStudio({ contract, definition }: LocationStudioProps) {
  const defaults = useMemo(() => initialValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls.filter((control) => control.tokens).map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(defaults);
  const [visibleLocationIds, setVisibleLocationIds] = useState(() => locationSearchFixture.map((location) => location.id));
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => [token, computed.getPropertyValue(token).trim()])));
    };
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const status = ['ready', 'loading', 'empty', 'error'].includes(String(values.status))
    ? String(values.status) as LocationSearchStatus
    : 'ready';
  const visibleLocations = values.locations === true
    ? locationSearchFixture.filter((location) => visibleLocationIds.includes(location.id))
    : [];

  function updateProperties(next: StudioPropertyValues) {
    setValues((current) => {
      const nextStatus = typeof next.status === 'string' && ['ready', 'loading', 'empty', 'error'].includes(next.status)
        ? next.status as LocationSearchStatus
        : null;
      return {
        ...current,
        ...next,
        ...(nextStatus ? { statusMessage: statusCopy(contract.slug, nextStatus) } : {}),
      };
    });
  }

  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = String(values.query || '').trim().toLocaleLowerCase();
    const matches = locationSearchFixture.filter((location) => (
      !query || `${location.name} ${location.address}`.toLocaleLowerCase().includes(query)
    ));
    setVisibleLocationIds(matches.map((location) => location.id));
    setValues((current) => ({
      ...current,
      ...(contract.slug === 'pickup-location-selector'
        && !matches.some((location) => location.id === String(current.selectedLocationId || ''))
        ? { selectedLocationId: '' }
        : {}),
      status: matches.length > 0 ? 'ready' : 'empty',
      statusMessage: matches.length > 0
        ? `${matches.length} ${contract.slug === 'pickup-location-selector' ? 'eligible pickup ' : ''}${matches.length === 1 ? 'location' : 'locations'} found.`
        : statusCopy(contract.slug, 'empty'),
    }));
  }

  function useFixtureLocation() {
    setVisibleLocationIds(['palermo-gallery']);
    setValues((current) => ({
      ...current,
      query: 'Palermo',
      status: 'ready',
      statusMessage: 'Preview action used a local fixture; no device location permission was requested.',
    }));
  }

  function reset() {
    setValues({ ...defaults });
    setVisibleLocationIds(locationSearchFixture.map((location) => location.id));
    setTokenOverrides({});
  }

  const map = values.map === true ? (
    <div className="location-search__map-fixture" role="img" aria-label="Supplemental location map preview">
      <span>Supplemental map</span>
      <small>The searchable list remains complete without it.</small>
    </div>
  ) : undefined;

  const common = {
    idPrefix: `${contract.slug}-${uid}`,
    heading: String(values.heading || ''),
    description: String(values.description || ''),
    queryLabel: String(values.queryLabel || ''),
    query: String(values.query || ''),
    queryPlaceholder: String(values.queryPlaceholder || ''),
    searchLabel: String(values.searchLabel || ''),
    useLocationLabel: String(values.useLocationLabel || ''),
    locations: visibleLocations,
    status,
    statusMessage: String(values.statusMessage || ''),
    map,
    onQueryChange: (event: ChangeEvent<HTMLInputElement>) => setValues((current) => ({ ...current, query: event.target.value })),
    onSearch: runSearch,
    onUseLocation: useFixtureLocation,
  };

  const preview = contract.slug === 'pickup-location-selector' ? (
    <PickupLocationSelectorArtwork
      {...common}
      className="docs-studio__location-search"
      selectionLabel={String(values.selectionLabel || '')}
      selectedLocationId={String(values.selectedLocationId || '')}
      onLocationSelect={(locationId) => setValues((current) => ({
        ...current,
        selectedLocationId: locationId,
        statusMessage: 'Pickup intent updated for this preview; inventory is not reserved.',
      }))}
    />
  ) : (
    <StoreLocatorArtwork
      {...common}
      className="docs-studio__location-search"
      resultsLabel={String(values.resultsLabel || '')}
      onDirections={(locationId) => setValues((current) => ({
        ...current,
        statusMessage: `Directions requested for ${locationId}; navigation remains target-owned.`,
      }))}
    />
  );

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue={status}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={updateProperties}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className="docs-studio__stage-inner docs-studio__location-stage-inner">{preview}</div>
        </section>
      </div>
    </div>
  );
}
