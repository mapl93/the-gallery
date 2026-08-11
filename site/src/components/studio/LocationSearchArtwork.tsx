import type {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
} from 'react';
import InputArtwork from './InputArtwork';
import RadioArtwork from './RadioArtwork';

export type LocationSearchStatus = 'ready' | 'loading' | 'empty' | 'error';

export interface LocationSearchRecord {
  id: string;
  name: string;
  address: string;
  availability?: string;
  readiness?: string;
  hours?: string;
  distance?: string;
  services?: readonly string[];
  phoneLabel?: string;
  phoneHref?: string;
  directionsLabel?: string;
  directionsHref?: string;
}

interface LocationSearchFrameProps {
  idPrefix: string;
  rootClassName: string;
  heading: string;
  description?: string;
  queryLabel: string;
  query: string;
  queryPlaceholder?: string;
  searchLabel: string;
  useLocationLabel?: string;
  status: LocationSearchStatus;
  statusMessage?: string;
  map?: ReactNode;
  children?: ReactNode;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: FormEventHandler<HTMLFormElement>;
  onUseLocation?: () => void;
  className?: string;
}

function LocationSearchFrame({
  idPrefix,
  rootClassName,
  heading,
  description = '',
  queryLabel,
  query,
  queryPlaceholder = '',
  searchLabel,
  useLocationLabel = '',
  status,
  statusMessage = '',
  map,
  children,
  onQueryChange,
  onSearch,
  onUseLocation,
  className = '',
}: LocationSearchFrameProps) {
  const visibleHeading = heading.trim();
  const visibleQueryLabel = queryLabel.trim();
  const visibleSearchLabel = searchLabel.trim();
  const visibleDescription = description.trim();
  const visibleUseLocationLabel = useLocationLabel.trim();
  const visibleStatus = statusMessage.trim();

  if (!idPrefix || !visibleHeading || !visibleQueryLabel || !visibleSearchLabel) return null;

  const headingId = `${idPrefix}-heading`;
  const descriptionId = `${idPrefix}-description`;
  const statusId = `${idPrefix}-status`;
  const busy = status === 'loading';

  return (
    <section
      className={['location-search', rootClassName, className].filter(Boolean).join(' ')}
      aria-labelledby={headingId}
      aria-describedby={visibleDescription ? descriptionId : undefined}
      aria-busy={busy || undefined}
      data-status={status}
    >
      <header className="location-search__header">
        <h2 className="location-search__heading" id={headingId} dir="auto">{visibleHeading}</h2>
        {visibleDescription && (
          <p className="location-search__description" id={descriptionId} dir="auto">
            {visibleDescription}
          </p>
        )}
      </header>

      <form className="location-search__form" role="search" onSubmit={onSearch}>
        <InputArtwork
          id={`${idPrefix}-query`}
          className="location-search__query"
          label={visibleQueryLabel}
          type="search"
          name="location-query"
          value={query}
          placeholder={queryPlaceholder}
          autoComplete="postal-code"
          disabled={busy}
          onChange={onQueryChange}
        />
        <button className="btn location-search__submit" type="submit" disabled={busy}>
          {visibleSearchLabel}
        </button>
      </form>

      {visibleUseLocationLabel && onUseLocation && (
        <button
          className="btn btn--link btn--sm location-search__geolocate"
          type="button"
          disabled={busy}
          onClick={onUseLocation}
        >
          {visibleUseLocationLabel}
        </button>
      )}

      {visibleStatus && (
        <p
          className="location-search__status"
          id={statusId}
          role={status === 'error' ? 'alert' : 'status'}
          dir="auto"
        >
          {visibleStatus}
        </p>
      )}

      {status === 'ready' && children}
      {status === 'ready' && map && <div className="location-search__map">{map}</div>}
    </section>
  );
}

export interface PickupLocationSelectorArtworkProps {
  idPrefix: string;
  heading: string;
  description?: string;
  queryLabel: string;
  query: string;
  queryPlaceholder?: string;
  searchLabel: string;
  useLocationLabel?: string;
  selectionLabel: string;
  locations: readonly LocationSearchRecord[];
  selectedLocationId?: string;
  status: LocationSearchStatus;
  statusMessage?: string;
  map?: ReactNode;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: FormEventHandler<HTMLFormElement>;
  onUseLocation?: () => void;
  onLocationSelect: (locationId: string) => void;
  className?: string;
}

export function PickupLocationSelectorArtwork({
  idPrefix,
  heading,
  description,
  queryLabel,
  query,
  queryPlaceholder,
  searchLabel,
  useLocationLabel,
  selectionLabel,
  locations,
  selectedLocationId = '',
  status,
  statusMessage,
  map,
  onQueryChange,
  onSearch,
  onUseLocation,
  onLocationSelect,
  className,
}: PickupLocationSelectorArtworkProps) {
  const visibleSelectionLabel = selectionLabel.trim();
  const visibleLocations = locations.filter((location) => (
    location.id.trim()
    && location.name.trim()
    && location.address.trim()
    && location.availability?.trim()
  ));
  const readyWithoutLocations = status === 'ready' && visibleLocations.length === 0;
  const resolvedStatus = readyWithoutLocations ? 'empty' : status;
  const resolvedStatusMessage = readyWithoutLocations
    ? 'No eligible pickup locations.'
    : resolvedStatus === 'empty' && !statusMessage?.trim()
      ? 'No eligible pickup locations.'
      : statusMessage;
  const resolvedSelectedLocationId = visibleLocations.some((location) => location.id === selectedLocationId)
    ? selectedLocationId
    : '';

  if (!visibleSelectionLabel) return null;

  return (
    <LocationSearchFrame
      idPrefix={idPrefix}
      rootClassName="pickup-location-selector"
      heading={heading}
      description={description}
      queryLabel={queryLabel}
      query={query}
      queryPlaceholder={queryPlaceholder}
      searchLabel={searchLabel}
      useLocationLabel={useLocationLabel}
      status={resolvedStatus}
      statusMessage={resolvedStatusMessage}
      map={map}
      onQueryChange={onQueryChange}
      onSearch={onSearch}
      onUseLocation={onUseLocation}
      className={className}
    >
      <fieldset
        className="pickup-location-selector__group"
        data-selected-location-id={resolvedSelectedLocationId || undefined}
      >
        <legend className="pickup-location-selector__legend" dir="auto">
          {visibleSelectionLabel}
        </legend>
        <ul className="location-search__results pickup-location-selector__results">
          {visibleLocations.map((location) => {
            const descriptionId = `${idPrefix}-location-${location.id}-details`;
            const selected = resolvedSelectedLocationId === location.id;
            return (
              <li
                className="location-search__result pickup-location-selector__result"
                data-selected={selected || undefined}
                key={location.id}
              >
                <RadioArtwork
                  id={`${idPrefix}-location-${location.id}`}
                  className="pickup-location-selector__choice"
                  label={location.name}
                  name="pickup-location"
                  value={location.id}
                  checked={selected}
                  describedBy={descriptionId}
                  onCheckedChange={(checked) => { if (checked) onLocationSelect(location.id); }}
                />
                <div className="location-search__result-details" id={descriptionId}>
                  <p className="location-search__address" dir="auto">{location.address.trim()}</p>
                  <p className="pickup-location-selector__availability" dir="auto">
                    {location.availability?.trim()}
                  </p>
                  {location.readiness?.trim() && (
                    <p className="location-search__meta" dir="auto">{location.readiness.trim()}</p>
                  )}
                  {location.hours?.trim() && (
                    <p className="location-search__meta" dir="auto">{location.hours.trim()}</p>
                  )}
                  {location.distance?.trim() && (
                    <p className="location-search__meta" dir="auto">{location.distance.trim()}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </LocationSearchFrame>
  );
}

export interface StoreLocatorArtworkProps {
  idPrefix: string;
  heading: string;
  description?: string;
  queryLabel: string;
  query: string;
  queryPlaceholder?: string;
  searchLabel: string;
  useLocationLabel?: string;
  resultsLabel: string;
  locations: readonly LocationSearchRecord[];
  status: LocationSearchStatus;
  statusMessage?: string;
  map?: ReactNode;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: FormEventHandler<HTMLFormElement>;
  onUseLocation?: () => void;
  onDirections?: (locationId: string) => void;
  className?: string;
}

export function StoreLocatorArtwork({
  idPrefix,
  heading,
  description,
  queryLabel,
  query,
  queryPlaceholder,
  searchLabel,
  useLocationLabel,
  resultsLabel,
  locations,
  status,
  statusMessage,
  map,
  onQueryChange,
  onSearch,
  onUseLocation,
  onDirections,
  className,
}: StoreLocatorArtworkProps) {
  const visibleResultsLabel = resultsLabel.trim();
  const visibleLocations = locations.filter((location) => (
    location.id.trim() && location.name.trim() && location.address.trim()
  ));
  const readyWithoutLocations = status === 'ready' && visibleLocations.length === 0;
  const resolvedStatus = readyWithoutLocations ? 'empty' : status;
  const resolvedStatusMessage = readyWithoutLocations
    ? 'No locations found.'
    : resolvedStatus === 'empty' && !statusMessage?.trim()
      ? 'No locations found.'
      : statusMessage;

  if (!visibleResultsLabel) return null;

  return (
    <LocationSearchFrame
      idPrefix={idPrefix}
      rootClassName="store-locator"
      heading={heading}
      description={description}
      queryLabel={queryLabel}
      query={query}
      queryPlaceholder={queryPlaceholder}
      searchLabel={searchLabel}
      useLocationLabel={useLocationLabel}
      status={resolvedStatus}
      statusMessage={resolvedStatusMessage}
      map={map}
      onQueryChange={onQueryChange}
      onSearch={onSearch}
      onUseLocation={onUseLocation}
      className={className}
    >
      <section className="store-locator__results" aria-labelledby={`${idPrefix}-results-heading`}>
        <h3 className="store-locator__results-heading" id={`${idPrefix}-results-heading`} dir="auto">
          {visibleResultsLabel}
        </h3>
        <ul className="location-search__results">
          {visibleLocations.map((location) => (
            <li className="location-search__result store-locator__result" key={location.id}>
              <article aria-labelledby={`${idPrefix}-location-${location.id}-name`}>
                <h4 className="location-search__result-name" id={`${idPrefix}-location-${location.id}-name`} dir="auto">
                  {location.name.trim()}
                </h4>
                <address className="location-search__address" dir="auto">{location.address.trim()}</address>
                {location.hours?.trim() && <p className="location-search__meta" dir="auto">{location.hours.trim()}</p>}
                {location.services && location.services.length > 0 && (
                  <p className="location-search__meta" dir="auto">{location.services.join(' · ')}</p>
                )}
                <div className="store-locator__actions">
                  {location.phoneHref?.trim() && location.phoneLabel?.trim() && (
                    <a className="link" href={location.phoneHref}>{location.phoneLabel}</a>
                  )}
                  {location.directionsHref?.trim() && location.directionsLabel?.trim() && (
                    <a
                      className="link"
                      href={location.directionsHref}
                      onClick={(event) => {
                        if (!onDirections) return;
                        event.preventDefault();
                        onDirections(location.id);
                      }}
                    >
                      {location.directionsLabel}
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </LocationSearchFrame>
  );
}

export const locationSearchFixture: readonly LocationSearchRecord[] = [
  {
    id: 'palermo-gallery',
    name: 'Palermo Gallery',
    address: 'Costa Rica 4827, Buenos Aires',
    availability: 'Pickup available for this selection',
    readiness: 'Usually ready within two hours',
    hours: 'Open today, 11:00–19:00',
    distance: '1.2 km away',
    services: ['Pickup', 'Exhibitions', 'Accessibility'],
    phoneLabel: 'Call gallery',
    phoneHref: 'tel:+541155550100',
    directionsLabel: 'Get directions',
    directionsHref: '/directions/palermo-gallery',
  },
  {
    id: 'recoleta-studio',
    name: 'Recoleta Studio',
    address: 'Arenales 1932, Buenos Aires',
    availability: 'Pickup available for this selection',
    readiness: 'Usually ready next business day',
    hours: 'By appointment, 10:00–17:00',
    distance: '3.8 km away',
    services: ['Pickup', 'Studio visits'],
    phoneLabel: 'Call studio',
    phoneHref: 'tel:+541155550200',
    directionsLabel: 'Get directions',
    directionsHref: '/directions/recoleta-studio',
  },
];
