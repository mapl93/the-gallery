import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Grid2X2,
  List,
  PackageSearch,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialMedia } from './editorialMedia';

interface CollectionStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'collection-hero': {
    variant: 'with-image', title: 'Quiet Forms', description: 'A study in balance, texture, and useful objects.',
    count: '24 works', image: true, imageAlt: 'Stoneware vessels arranged in soft gallery light',
  },
  'collection-grid': { columns: 3, items: true },
  filters: { bar: true, activeFilters: true, filterGroups: true, sidebar: true },
  pagination: { label: 'Collection pages', currentPage: 3, pageItems: true },
  'view-toggle': { groupLabel: 'Collection view', activeView: 'grid', disabled: false },
  'collection-promo': {
    variant: 'span-2', media: true, mediaAlt: 'Celadon vessels in the gallery', eyebrow: 'Curated edit',
    title: 'Objects for the daily ritual', ctaLabel: 'Explore the edit', href: '#collection-edit',
  },
  'empty-collection': {
    icon: true, heading: 'No works found', text: 'Try removing a filter or exploring the full collection.',
    ctaLabel: 'Clear filters', href: '#all-works',
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

function initialFixtureValues(contract: ComponentContract): StudioPropertyValues {
  return {
    ...Object.fromEntries((contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])),
    ...(fixtureValues[contract.slug] ?? {}),
  } as StudioPropertyValues;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function CollectionMedia({ className = '', alt = '' }: { className?: string; alt?: string }) {
  return <img src={editorialMedia.tableware} alt={alt} className={`${className} docs-studio__collection-media`} />;
}

export default function CollectionStudio({ contract, definition }: CollectionStudioProps) {
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls.filter((control) => control.tokens).map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [selectedFilters, setSelectedFilters] = useState(['Stoneware', 'Available']);

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

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setSelectedFilters(['Stoneware', 'Available']);
  }

  function setValue(name: string, value: StudioPropertyValue) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function renderProductCard(index: number) {
    return (
      <article className="product-card docs-studio__collection-card">
        <div className="product-card__media"><CollectionMedia className="product-card__image" alt={`Studio work ${index}`} /></div>
        <div className="product-card__body"><h3 className="product-card__title"><a href={`#work-${index}`} onClick={(event) => event.preventDefault()}>Study No. {index}</a></h3></div>
        <div className="product-card__footer"><span className="price"><span className="price__current">${84 + index * 18}.00</span></span></div>
      </article>
    );
  }

  function renderHero() {
    const className = variantClass(contract, values.variant);
    return (
      <section className={['collection-hero', className, 'docs-studio__collection-hero'].filter(Boolean).join(' ')}>
        {values.image === true && <CollectionMedia className="collection-hero__image" alt={String(values.imageAlt || '')} />}
        <div className="collection-hero__content">
          <h2 className="collection-hero__title">{String(values.title)}</h2>
          {String(values.description || '') && <p className="collection-hero__description">{String(values.description)}</p>}
          {String(values.count || '') && <p className="collection-hero__count">{String(values.count)}</p>}
        </div>
      </section>
    );
  }

  function renderGrid() {
    const columns = Math.max(2, Math.min(6, Number(values.columns) || 4));
    return (
      <div className="collection-grid docs-studio__collection-grid" data-columns={columns}>
        {values.items === true && [1, 2, 3, 4, 5, 6].map(renderProductCard)}
      </div>
    );
  }

  function toggleFilter(label: string) {
    setSelectedFilters((current) => current.includes(label)
      ? current.filter((item) => item !== label)
      : [...current, label]);
  }

  function renderFilterGroups() {
    if (values.filterGroups !== true) return null;
    return (
      <>
        <div className="filter-group">
          <button className="filter-group__title" type="button">Material</button>
          <div className="filter-group__options">
            {['Stoneware', 'Porcelain', 'Earthenware'].map((label) => (
              <label className="checkbox" key={label}>
                <input className="checkbox__input" type="checkbox" checked={selectedFilters.includes(label)} onChange={() => toggleFilter(label)} />
                <span className="checkbox__label">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <button className="filter-group__title" type="button">Availability</button>
          <div className="filter-group__options">
            <label className="checkbox"><input className="checkbox__input" type="checkbox" checked={selectedFilters.includes('Available')} onChange={() => toggleFilter('Available')} /><span className="checkbox__label">Available now</span></label>
          </div>
        </div>
      </>
    );
  }

  function renderFilters() {
    const groups = renderFilterGroups();
    return (
      <section className="filters docs-studio__filters">
        {values.bar === true && <div className="filters__bar"><strong>24 works</strong><span>Sort: Featured</span></div>}
        {values.activeFilters === true && selectedFilters.length > 0 && (
          <div className="filters__active" aria-label="Active filters">
            {selectedFilters.map((label) => <span className="tag" key={label}><span className="tag__label">{label}</span><button className="tag__remove" type="button" aria-label={`Remove ${label}`} onClick={() => toggleFilter(label)} /></span>)}
          </div>
        )}
        {values.sidebar === true ? <div className="filters__layout"><aside className="filters__sidebar">{groups}</aside><div className="docs-studio__filter-results">24 matching works</div></div> : groups}
      </section>
    );
  }

  function renderPagination() {
    const current = Math.max(1, Math.min(4, Number(values.currentPage) || 1));
    const change = (next: number) => setValue('currentPage', Math.max(1, Math.min(4, next)));
    return (
      <nav className="pagination docs-studio__pagination" aria-label={String(values.label)} data-current-page={current}>
        {values.pageItems === true && <>
          <a className="pagination__link" href="#previous" aria-label="Previous page" aria-disabled={current === 1 || undefined} onClick={(event) => { event.preventDefault(); change(current - 1); }}><ArrowLeft aria-hidden="true" /></a>
          {[1, 2, 3, 4].map((page) => page === current
            ? <span className="pagination__current" aria-current="page" key={page}>{page}</span>
            : <a className="pagination__link" href={`#page-${page}`} onClick={(event) => { event.preventDefault(); change(page); }} key={page}>{page}</a>)}
          <span className="pagination__ellipsis" aria-hidden="true">...</span>
          <a className="pagination__link" href="#next" aria-label="Next page" aria-disabled={current === 4 || undefined} onClick={(event) => { event.preventDefault(); change(current + 1); }}><ArrowRight aria-hidden="true" /></a>
        </>}
      </nav>
    );
  }

  function renderViewToggle() {
    const activeView = String(values.activeView || 'grid');
    return (
      <div className="view-toggle" role="group" aria-label={String(values.groupLabel)} data-view={activeView}>
        <button className="view-toggle__btn" type="button" aria-label="Grid view" aria-pressed={activeView === 'grid'} disabled={values.disabled === true} onClick={() => setValue('activeView', 'grid')}><Grid2X2 aria-hidden="true" /></button>
        <button className="view-toggle__btn" type="button" aria-label="List view" aria-pressed={activeView === 'list'} disabled={values.disabled === true} onClick={() => setValue('activeView', 'list')}><List aria-hidden="true" /></button>
      </div>
    );
  }

  function renderPromo() {
    const className = variantClass(contract, values.variant);
    return (
      <article className={['collection-promo', className, 'docs-studio__collection-promo'].filter(Boolean).join(' ')}>
        {values.media === true && <CollectionMedia className="collection-promo__media" alt={String(values.mediaAlt || '')} />}
        {values.media === true && <div className="collection-promo__overlay" />}
        <div className="collection-promo__content">
          {String(values.eyebrow || '') && <span className="collection-promo__eyebrow">{String(values.eyebrow)}</span>}
          <h2 className="collection-promo__title">{String(values.title)}</h2>
          {String(values.ctaLabel || '') && <a className="collection-promo__cta" href={String(values.href || '#collection-edit')} onClick={(event) => event.preventDefault()}>{String(values.ctaLabel)}<ArrowRight aria-hidden="true" /></a>}
        </div>
      </article>
    );
  }

  function renderEmpty() {
    return (
      <section className="empty-collection docs-studio__empty-collection">
        {values.icon === true && <PackageSearch className="empty-collection__icon" aria-hidden="true" />}
        <h2 className="empty-collection__heading">{String(values.heading)}</h2>
        {String(values.text || '') && <p className="empty-collection__text">{String(values.text)}</p>}
        {String(values.ctaLabel || '') && <a className="empty-collection__cta" href={String(values.href || '#all-works')} onClick={(event) => event.preventDefault()}>{String(values.ctaLabel)}</a>}
      </section>
    );
  }

  function renderPreview() {
    if (contract.slug === 'collection-hero') return renderHero();
    if (contract.slug === 'collection-grid') return renderGrid();
    if (contract.slug === 'filters') return renderFilters();
    if (contract.slug === 'pagination') return renderPagination();
    if (contract.slug === 'view-toggle') return renderViewToggle();
    if (contract.slug === 'collection-promo') return renderPromo();
    return renderEmpty();
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue="default" tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={() => undefined} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}><div className="docs-studio__stage-inner docs-studio__collection-stage-inner">{renderPreview()}</div></section>
      </div>
    </div>
  );
}
