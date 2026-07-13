import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Mail,
  MapPin,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  TriangleAlert,
  X,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface ProductStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'product-card': {
    title: 'Celadon Study No. 4', href: '#product', vendor: 'Lucia Ferrer',
    subtitle: 'Hand-thrown stoneware', imageAlt: 'Celadon glazed stoneware vessel',
    hoverImage: true, badges: true, quickAddAction: true, footer: true,
  },
  'product-gallery': {
    mainAlt: 'Celadon glazed stoneware vessel', controlLabel: 'Show alternate product view', selected: true,
  },
  'product-info': {
    title: 'Celadon Study No. 4', vendor: 'Lucia Ferrer', subtitle: 'One of one',
    description: 'Hand-thrown stoneware finished with a satin celadon glaze.', metadata: true,
  },
  'variant-selector': {
    label: 'Glaze', selectedValue: 'Celadon', optionLabel: 'Celadon', name: 'glaze',
    value: 'celadon', checked: true, disabled: false,
  },
  'product-form': {
    variantSelector: true, submitLabel: 'Add to cart', submitDisabled: false,
  },
  'product-slider': { title: 'Related works', navigation: true, items: true },
  'size-chart': {
    triggerLabel: 'Size guide', title: 'Size guide', closeLabel: 'Close size guide', open: true, activeUnit: true,
  },
  'back-in-stock': {
    heading: 'Join the waitlist', description: 'We will email you when this work becomes available.',
    label: 'Email address', value: '', placeholder: 'name@example.com',
    message: 'We will only use this address for availability updates.', variant: 'default',
    indicator: true, required: true, disabled: false, submitLabel: 'Notify me', submitted: false,
    successMessage: 'You are on the waitlist.',
  },
  'store-pickup': { toggleLabel: 'Check gallery pickup', expanded: true },
  'subscription-option': {
    variant: 'default', selected: true, label: 'Subscribe and save', price: '$102.00',
    savings: 'Save 15%', frequencyLabel: 'Delivery frequency', frequency: 'monthly',
    frequencyMessage: 'You can pause or cancel before the next renewal.', frequencyIndicator: true,
    disabled: false, note: 'Renews automatically until cancelled.',
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

function ProductMedia({ index = 1, className = '', alt = '' }: { index?: number; className?: string; alt?: string }) {
  return <img src={transparentImage} alt={alt} className={`${className} docs-studio__product-media docs-studio__product-media--${index}`} />;
}

export default function ProductStudio({ contract, definition }: ProductStudioProps) {
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
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [swatchValue, setSwatchValue] = useState('celadon');
  const [sizeValue, setSizeValue] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const sliderTrackRef = useRef<HTMLDivElement>(null);

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
    setGalleryIndex(0);
    setSwatchValue('celadon');
    setSizeValue('M');
    setQuantity(1);
    setUnit('metric');
  }

  function setBoolean(name: string, next: boolean) {
    setValues((current) => ({ ...current, [name]: next }));
  }

  function currentState() {
    if (contract.slug === 'size-chart') return values.open === true ? 'open' : 'closed';
    if (contract.slug === 'back-in-stock') return values.submitted === true ? 'submitted' : String(values.variant || 'default');
    if (contract.slug === 'store-pickup') return values.expanded === true ? 'expanded' : 'collapsed';
    if (contract.slug === 'subscription-option') return values.selected === true ? 'selected' : 'default';
    return 'default';
  }

  function changeState(next: string) {
    if (contract.slug === 'size-chart') setBoolean('open', next === 'open');
    else if (contract.slug === 'back-in-stock') setBoolean('submitted', next === 'submitted');
    else if (contract.slug === 'store-pickup') setBoolean('expanded', next === 'expanded');
    else if (contract.slug === 'subscription-option') setBoolean('selected', next === 'selected');
  }

  function renderProductCard(compact = false, index = 1) {
    return (
      <article className={`product-card docs-studio__product-card${compact ? ' docs-studio__product-card--compact' : ''}`}>
        <div className="product-card__media">
          <ProductMedia index={index} className="product-card__image product-card__image--primary" alt={String(values.imageAlt || 'Studio product fixture')} />
          {!compact && values.hoverImage === true && (
            <ProductMedia index={index + 1} className="product-card__image product-card__image--hover" alt="" />
          )}
          {!compact && values.badges === true && <div className="product-card__badges"><span className="badge">New</span></div>}
          {!compact && values.quickAddAction === true && (
            <div className="product-card__quick-add"><button className="btn btn--full" type="button">Quick add</button></div>
          )}
        </div>
        <div className="product-card__body">
          {!compact && String(values.vendor || '') && <span className="product-card__vendor">{String(values.vendor)}</span>}
          <h3 className="product-card__title"><a href={String(values.href || '#product')} onClick={(event) => event.preventDefault()}>{compact ? `Study No. ${index}` : String(values.title || 'Untitled')}</a></h3>
          {!compact && String(values.subtitle || '') && <span className="product-card__subtitle">{String(values.subtitle)}</span>}
        </div>
        {(compact || values.footer === true) && <div className="product-card__footer"><span className="price"><span className="price__current">${90 + index * 12}.00</span></span></div>}
      </article>
    );
  }

  function renderGallery() {
    const labels = ['Front view', 'Side view', 'Glaze detail'];
    return (
      <div className="product-gallery docs-studio__product-gallery">
        <div className="product-gallery__main"><ProductMedia index={galleryIndex + 1} alt={String(values.mainAlt)} /></div>
        <div className="product-gallery__thumbs" aria-label="Product media">
          {labels.map((label, index) => (
            <button className="product-gallery__thumb" type="button" aria-label={label} aria-selected={galleryIndex === index} onClick={() => setGalleryIndex(index)} key={label}>
              <ProductMedia index={index + 1} alt="" />
            </button>
          ))}
        </div>
        <div className="product-gallery__dots" aria-label="Product media pages">
          {labels.map((label, index) => <button className="product-gallery__dot" type="button" aria-label={label} aria-selected={galleryIndex === index} onClick={() => setGalleryIndex(index)} key={label} />)}
        </div>
      </div>
    );
  }

  function renderProductInfo() {
    return (
      <section className="product-info docs-studio__product-info">
        {String(values.vendor || '') && <span className="product-info__vendor">{String(values.vendor)}</span>}
        <h2 className="product-info__title">{String(values.title)}</h2>
        {String(values.subtitle || '') && <span className="product-info__subtitle">{String(values.subtitle)}</span>}
        <span className="price"><span className="price__current">$120.00</span></span>
        {String(values.description || '') && <p className="product-info__description">{String(values.description)}</p>}
        {values.metadata === true && <dl className="product-info__meta"><div><dt>Material</dt><dd>Stoneware</dd></div><div><dt>Dimensions</dt><dd>28 x 16 cm</dd></div></dl>}
      </section>
    );
  }

  function renderVariantSelector() {
    const colors = [['celadon', 'Celadon'], ['ink', 'Ink'], ['chalk', 'Chalk']];
    return (
      <div className="variant-selector docs-studio__variant-selector">
        <div className="variant-selector__group">
          <div className="variant-selector__label">{String(values.label || 'Glaze')} <span>{swatchValue}</span></div>
          <div className="variant-swatches">
            {colors.map(([value, label], index) => (
              <label className={`variant-swatch docs-studio__variant-swatch docs-studio__variant-swatch--${value}${values.disabled === true && index === 2 ? ' variant-swatch--unavailable' : ''}`} key={value}>
                <input type="radio" name={String(values.name || 'glaze')} value={value} aria-label={label} checked={swatchValue === value} disabled={values.disabled === true && index === 2} onChange={() => setSwatchValue(value)} />
                <span className="variant-swatch__color" />
                <span className="variant-swatch__ring" />
              </label>
            ))}
          </div>
        </div>
        <div className="variant-selector__group">
          <div className="variant-selector__label">Size <span>{sizeValue}</span></div>
          <div className="variant-pills">
            {['S', 'M', 'L'].map((value) => <label className="variant-pill" key={value}><input type="radio" name="size" value={value} checked={sizeValue === value} onChange={() => setSizeValue(value)} />{value}</label>)}
          </div>
        </div>
      </div>
    );
  }

  function renderProductForm() {
    return (
      <form className="product-form docs-studio__product-form" onSubmit={(event) => event.preventDefault()}>
        {values.variantSelector === true && renderVariantSelector()}
        <div className="qty" role="group" aria-label="Quantity selector">
          <button className="qty__btn qty__btn--decrement" type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus className="qty__icon" aria-hidden="true" /></button>
          <input className="qty__input" type="number" value={quantity} min={1} readOnly aria-label="Quantity" />
          <button className="qty__btn qty__btn--increment" type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}><Plus className="qty__icon" aria-hidden="true" /></button>
        </div>
        <div className="product-form__actions"><button className="btn product-form__submit" type="submit" disabled={values.submitDisabled === true}><ShoppingBag className="btn__icon btn__icon--leading" aria-hidden="true" />{String(values.submitLabel)}</button></div>
      </form>
    );
  }

  function renderSlider() {
    const move = (direction: number) => sliderTrackRef.current?.scrollBy({ left: direction * sliderTrackRef.current.clientWidth * 0.75, behavior: 'smooth' });
    return (
      <section className="product-slider docs-studio__product-slider">
        <div className="product-slider__header">
          <h2 className="product-slider__title">{String(values.title || '')}</h2>
          {values.navigation === true && <div className="product-slider__nav"><button className="icon-btn" type="button" aria-label="Previous products" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button><button className="icon-btn" type="button" aria-label="Next products" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button></div>}
        </div>
        {values.items === true && <div className="product-slider__track" ref={sliderTrackRef}>{[1, 2, 3, 4].map((index) => <div key={index}>{renderProductCard(true, index)}</div>)}</div>}
      </section>
    );
  }

  function renderSizeChart() {
    const open = values.open === true;
    if (!open) return <button className="size-chart__trigger" type="button" aria-expanded="false" onClick={() => setBoolean('open', true)}><Ruler aria-hidden="true" />{String(values.triggerLabel)}</button>;
    const metric = unit === 'metric';
    return (
      <div className="size-chart docs-studio__product-size-chart">
        <div className="size-chart__drawer is-open docs-studio__product-size-overlay" aria-hidden="false">
          <div className="size-chart__panel" role="dialog" aria-modal="true" aria-labelledby="studio-size-chart-title">
            <div className="size-chart__header"><h2 className="size-chart__title" id="studio-size-chart-title">{String(values.title)}</h2><button className="size-chart__close" type="button" aria-label={String(values.closeLabel)} onClick={() => setBoolean('open', false)}><X aria-hidden="true" /></button></div>
            <div className="size-chart__unit-toggle" aria-label="Measurement unit"><button className="size-chart__unit-btn" type="button" aria-pressed={metric} onClick={() => setUnit('metric')}>CM</button><button className="size-chart__unit-btn" type="button" aria-pressed={!metric} onClick={() => setUnit('imperial')}>IN</button></div>
            <table className="size-chart__table"><thead><tr><th>Size</th><th>Width</th><th>Height</th></tr></thead><tbody><tr><td>S</td><td>{metric ? '24 cm' : '9.4 in'}</td><td>{metric ? '18 cm' : '7.1 in'}</td></tr><tr><td>M</td><td>{metric ? '28 cm' : '11 in'}</td><td>{metric ? '22 cm' : '8.7 in'}</td></tr><tr><td>L</td><td>{metric ? '32 cm' : '12.6 in'}</td><td>{metric ? '26 cm' : '10.2 in'}</td></tr></tbody></table>
            <p className="size-chart__notes">Measurements are approximate because each work is finished by hand.</p>
          </div>
        </div>
      </div>
    );
  }

  function validationIcon(variant: string) {
    if (variant === 'error') return CircleAlert;
    if (variant === 'success') return CircleCheck;
    if (variant === 'warning') return TriangleAlert;
    return Mail;
  }

  function renderBackInStock() {
    const variant = String(values.variant || 'default');
    const Indicator = validationIcon(variant);
    const submitted = values.submitted === true;
    const submit = (event: FormEvent) => { event.preventDefault(); if (values.disabled !== true) setBoolean('submitted', true); };
    return (
      <section className={['back-in-stock', variantClass(contract, values.variant), submitted ? 'is-submitted' : null, 'docs-studio__back-in-stock'].filter(Boolean).join(' ')}>
        <h2 className="back-in-stock__heading">{String(values.heading)}</h2>
        {String(values.description || '') && <p className="back-in-stock__text">{String(values.description)}</p>}
        <form className="back-in-stock__form" onSubmit={submit}>
          <div className="back-in-stock__field"><label className="back-in-stock__label" htmlFor="studio-back-in-stock-email">{String(values.label)}</label><div className="back-in-stock__control"><input className="back-in-stock__input" id="studio-back-in-stock-email" type="email" value={String(values.value || '')} placeholder={String(values.placeholder || '')} required={values.required === true} disabled={values.disabled === true} aria-invalid={variant === 'error' || undefined} aria-describedby="studio-back-in-stock-message" onChange={(event) => setValues((current) => ({ ...current, value: event.target.value }))} />{values.indicator === true && <Indicator className="back-in-stock__indicator" aria-hidden="true" />}</div><p className="back-in-stock__message" id="studio-back-in-stock-message">{String(values.message || '')}</p></div>
          <button className="back-in-stock__submit" type="submit" disabled={values.disabled === true}>{String(values.submitLabel)}</button>
        </form>
        <p className="back-in-stock__success" role="status" aria-live="polite"><Check aria-hidden="true" />{String(values.successMessage)}</p>
      </section>
    );
  }

  function renderStorePickup() {
    const expanded = values.expanded === true;
    return (
      <section className="store-pickup docs-studio__store-pickup" aria-expanded={expanded}>
        <button className="store-pickup__toggle" type="button" aria-expanded={expanded} aria-controls="studio-pickup-content" onClick={() => setBoolean('expanded', !expanded)}><MapPin aria-hidden="true" /><span>{String(values.toggleLabel)}</span><ChevronDown className="store-pickup__toggle-icon" aria-hidden="true" /></button>
        <div className="store-pickup__content" id="studio-pickup-content"><div className="store-pickup__location"><CircleCheck className="store-pickup__status-icon store-pickup__status-icon--available" aria-hidden="true" /><div><div className="store-pickup__location-name">Palermo Gallery</div><div className="store-pickup__location-detail">Ready within two hours</div><div className="store-pickup__location-hours">Today, 11:00-19:00</div></div></div><div className="store-pickup__location"><CircleAlert className="store-pickup__status-icon store-pickup__status-icon--unavailable" aria-hidden="true" /><div><div className="store-pickup__location-name">Recoleta Studio</div><div className="store-pickup__location-detail">Unavailable for pickup</div></div></div></div>
      </section>
    );
  }

  function renderSubscription() {
    const variant = String(values.variant || 'default');
    const selected = values.selected === true;
    return (
      <div className={['subscription-option', variantClass(contract, values.variant), selected ? 'is-selected' : null, 'docs-studio__subscription-option'].filter(Boolean).join(' ')} role="radio" tabIndex={0} aria-checked={selected} onClick={() => setBoolean('selected', !selected)} onKeyDown={(event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); setBoolean('selected', !selected); } }}>
        <div className="subscription-option__header"><span className="subscription-option__radio" aria-hidden="true" /><span className="subscription-option__label">{String(values.label)}</span>{String(values.savings || '') && <span className="subscription-option__savings">{String(values.savings)}</span>}<span className="subscription-option__price">{String(values.price || '')}</span></div>
        <div className="subscription-option__details"><div className="subscription-option__frequency"><label className="subscription-option__frequency-label" htmlFor="studio-frequency">{String(values.frequencyLabel)}</label><div className="subscription-option__frequency-control"><select className="subscription-option__frequency-select" id="studio-frequency" value={String(values.frequency || 'monthly')} disabled={values.disabled === true} aria-invalid={variant === 'error' || undefined} aria-describedby="studio-frequency-message" onClick={(event) => event.stopPropagation()} onChange={(event) => setValues((current) => ({ ...current, frequency: event.target.value }))}><option value="monthly">Every month</option><option value="bimonthly">Every two months</option><option value="quarterly">Every three months</option></select>{values.frequencyIndicator === true && <ChevronDown className="subscription-option__frequency-indicator" aria-hidden="true" />}</div><p className="subscription-option__frequency-message" id="studio-frequency-message">{String(values.frequencyMessage || '')}</p></div>{String(values.note || '') && <p className="subscription-option__note">{String(values.note)}</p>}</div>
      </div>
    );
  }

  function renderPreview() {
    if (contract.slug === 'product-card') return renderProductCard();
    if (contract.slug === 'product-gallery') return renderGallery();
    if (contract.slug === 'product-info') return renderProductInfo();
    if (contract.slug === 'variant-selector') return renderVariantSelector();
    if (contract.slug === 'product-form') return renderProductForm();
    if (contract.slug === 'product-slider') return renderSlider();
    if (contract.slug === 'size-chart') return renderSizeChart();
    if (contract.slug === 'back-in-stock') return renderBackInStock();
    if (contract.slug === 'store-pickup') return renderStorePickup();
    return renderSubscription();
  }

  const overlay = contract.slug === 'size-chart';

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue={currentState()} tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={changeState} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className={`docs-studio__stage${overlay ? ' docs-studio__stage--overlay' : ''}`} aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}><div className="docs-studio__stage-inner docs-studio__product-stage-inner">{renderPreview()}</div></section>
      </div>
    </div>
  );
}
