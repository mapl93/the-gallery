import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  Check,
  Minus,
  PackageOpen,
  Plus,
  ShoppingBag,
  X,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface CartStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'cart-page': {
    title: 'Your cart', count: '2 items', continueLabel: 'Continue shopping',
    continueHref: '#collection', lineItems: true, summary: true,
  },
  'cart-line-item': {
    image: true, imageAlt: 'Celadon glazed stoneware vessel', title: 'Celadon Study No. 4',
    href: '#product', variant: 'Celadon / Medium', quantitySelector: true,
    removeLabel: 'Remove', saveLabel: 'Save for later', price: '$120.00', comparePrice: '$150.00',
  },
  'cart-summary': {
    title: 'Order summary', rows: true, note: 'Taxes and shipping calculated at checkout.',
    checkoutLabel: 'Checkout', checkoutDisabled: false, express: true,
  },
  'discount-field': {
    toggleLabel: 'Add discount code', expanded: true, input: true, applyLabel: 'Apply',
    applied: false, appliedCode: 'STUDIO10', removeLabel: 'Remove STUDIO10 discount',
  },
  'free-shipping-bar': {
    text: 'You are $35 away from free shipping.', value: 65, max: 100, achieved: false,
  },
  'cart-upsell': {
    title: 'Complete the set', items: true, addLabel: 'Add', addDisabled: false,
  },
  'cart-empty': {
    icon: true, title: 'Your cart is empty',
    message: 'Explore the collection to find a work for your space.',
    actionLabel: 'Browse collection', href: '#collection',
  },
  'quick-view': {
    gallery: true, title: 'Celadon Study No. 4', vendor: 'Lucia Ferrer',
    description: 'Hand-thrown stoneware finished with a satin celadon glaze.',
    productForm: true, fullLinkLabel: 'View full details', href: '#product',
  },
  'sticky-atc': {
    visible: true, image: true, imageAlt: 'Celadon glazed stoneware vessel',
    title: 'Celadon Study No. 4', price: '$120.00', actionLabel: 'Add to cart',
    actionDisabled: false,
  },
  'cart-note': { toggleLabel: 'Add an order note', expanded: true, field: true },
  'gift-wrap': { selected: false, label: 'Add gift wrapping', price: '$8.00', disabled: false },
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

function CartMedia({ className = '', alt = '' }: { className?: string; alt?: string }) {
  return <img src={transparentImage} alt={alt} className={`${className} docs-studio__cart-media`} />;
}

export default function CartStudio({ contract, definition }: CartStudioProps) {
  const id = useId();
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
  const [quantity, setQuantity] = useState(1);
  const [lineRemoved, setLineRemoved] = useState(false);
  const [lineSaved, setLineSaved] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [upsellAdded, setUpsellAdded] = useState(false);
  const [quickViewAdded, setQuickViewAdded] = useState(false);
  const [stickyAdded, setStickyAdded] = useState(false);
  const [note, setNote] = useState('Please include a handwritten card.');

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

  function setValue(name: string, value: StudioPropertyValue) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setQuantity(1);
    setLineRemoved(false);
    setLineSaved(false);
    setDiscountCode('');
    setUpsellAdded(false);
    setQuickViewAdded(false);
    setStickyAdded(false);
    setNote('Please include a handwritten card.');
  }

  function currentState() {
    if (contract.slug === 'discount-field') return values.applied === true ? 'applied' : 'default';
    if (contract.slug === 'free-shipping-bar') {
      const value = Number(values.value) || 0;
      const max = Math.max(1, Number(values.max) || 1);
      return values.achieved === true || value >= max ? 'achieved' : 'default';
    }
    if (contract.slug === 'sticky-atc') return values.visible === true ? 'visible' : 'hidden';
    return 'default';
  }

  function changeState(next: string) {
    if (contract.slug === 'discount-field') setValue('applied', next === 'applied');
    else if (contract.slug === 'free-shipping-bar') setValue('achieved', next === 'achieved');
    else if (contract.slug === 'sticky-atc') setValue('visible', next === 'visible');
  }

  function renderQuantity() {
    return (
      <div className="qty cart-line__quantity" role="group" aria-label="Quantity">
        <button className="qty__btn qty__btn--decrement" type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
          <Minus className="qty__icon" aria-hidden="true" />
        </button>
        <input className="qty__input" type="number" min={1} value={quantity} aria-label="Quantity" onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} />
        <button className="qty__btn qty__btn--increment" type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>
          <Plus className="qty__icon" aria-hidden="true" />
        </button>
      </div>
    );
  }

  function renderLineItem(useContractValues = true) {
    const item = useContractValues ? values : {
      image: true,
      imageAlt: 'Celadon glazed stoneware vessel',
      title: 'Celadon Study No. 4',
      href: '#product',
      variant: 'Celadon / Medium',
      quantitySelector: true,
      removeLabel: 'Remove',
      saveLabel: 'Save for later',
      price: '$120.00',
      comparePrice: '$150.00',
    };

    if (lineRemoved) {
      return (
        <p className="docs-studio__cart-feedback" role="status">
          Item removed from cart.
          <button className="link" type="button" onClick={() => setLineRemoved(false)}>Undo</button>
        </p>
      );
    }

    return (
      <article className="cart-line docs-studio__cart-line">
        {item.image === true && <CartMedia className="cart-line__image" alt={String(item.imageAlt || '')} />}
        <div className="cart-line__info">
          <a className="cart-line__title" href={String(item.href || '#product')} onClick={(event) => event.preventDefault()}>{String(item.title)}</a>
          {String(item.variant || '') && <div className="cart-line__variant">{String(item.variant)}</div>}
          {item.quantitySelector === true && renderQuantity()}
          <div className="cart-line__actions">
            {String(item.removeLabel || '') && <button className="cart-line__remove" type="button" onClick={() => setLineRemoved(true)}>{String(item.removeLabel)}</button>}
            {String(item.saveLabel || '') && <button className="cart-line__save" type="button" disabled={lineSaved} onClick={() => setLineSaved(true)}>{lineSaved ? 'Saved' : String(item.saveLabel)}</button>}
          </div>
        </div>
        <div className="cart-line__prices">
          {String(item.comparePrice || '') && <div className="cart-line__price-compare">{String(item.comparePrice)}</div>}
          <div className="cart-line__price">{String(item.price)}</div>
        </div>
      </article>
    );
  }

  function renderSummary(useContractValues = true) {
    const summary = useContractValues ? values : {
      title: 'Order summary', rows: true, note: 'Taxes and shipping calculated at checkout.',
      checkoutLabel: 'Checkout', checkoutDisabled: false, express: true,
    };
    return (
      <aside className="cart-summary docs-studio__cart-summary">
        <h2 className="cart-summary__title">{String(summary.title)}</h2>
        {summary.rows === true && <>
          <div className="cart-summary__row"><span>Subtotal</span><span className="cart-summary__value">$120.00</span></div>
          <div className="cart-summary__row"><span>Shipping</span><span className="cart-summary__value">Calculated later</span></div>
          <div className="cart-summary__row cart-summary__row--total"><span>Total</span><span className="cart-summary__value">$120.00</span></div>
        </>}
        {String(summary.note || '') && <p className="cart-summary__note">{String(summary.note)}</p>}
        <button className="btn cart-summary__checkout" type="button" disabled={summary.checkoutDisabled === true}>{String(summary.checkoutLabel)}</button>
        {summary.express === true && <><div className="cart-summary__divider">or</div><div className="cart-summary__express"><button className="btn btn--outline" type="button">Express checkout</button></div></>}
      </aside>
    );
  }

  function renderCartPage() {
    return (
      <section className="cart-page docs-studio__cart-page">
        <section className="cart-page__items">
          <header className="cart-page__header"><h2 className="cart-page__title">{String(values.title)}</h2>{String(values.count || '') && <span className="cart-page__count">{String(values.count)}</span>}</header>
          {String(values.continueLabel || '') && <a className="cart-page__continue" href={String(values.continueHref || '#collection')} onClick={(event) => event.preventDefault()}>{String(values.continueLabel)}</a>}
          {values.lineItems === true && renderLineItem(false)}
        </section>
        {values.summary === true && <section className="cart-page__summary">{renderSummary(false)}</section>}
      </section>
    );
  }

  function renderDiscount() {
    const expanded = values.expanded === true;
    const applied = values.applied === true;
    const apply = (event: FormEvent) => {
      event.preventDefault();
      if (!discountCode.trim()) return;
      setValues((current) => ({ ...current, applied: true, appliedCode: discountCode.trim().toUpperCase(), expanded: false }));
    };
    return (
      <section className="discount-field docs-studio__discount-field" data-applied={applied} data-expanded={expanded}>
        {!applied && <button className="discount-field__toggle" type="button" aria-expanded={expanded} aria-controls={`${id}-discount-form`} onClick={() => setValue('expanded', !expanded)}>{String(values.toggleLabel)}</button>}
        {!applied && expanded && <form className="discount-field__form" id={`${id}-discount-form`} onSubmit={apply}>
          {values.input === true && <div className="input discount-field__input"><label className="input__label" htmlFor={`${id}-discount-code`}>Discount code</label><input className="input__field" id={`${id}-discount-code`} value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} /></div>}
          {String(values.applyLabel || '') && <button className="btn btn--outline discount-field__apply" type="submit">{String(values.applyLabel)}</button>}
        </form>}
        {applied && <div className="discount-field__applied"><Check aria-hidden="true" /><span>{String(values.appliedCode || discountCode || 'STUDIO10')}</span><button className="discount-field__remove" type="button" aria-label={String(values.removeLabel || 'Remove discount')} onClick={() => setValues((current) => ({ ...current, applied: false, expanded: true }))}><X aria-hidden="true" /></button></div>}
      </section>
    );
  }

  function renderShippingBar() {
    const value = Math.max(0, Number(values.value) || 0);
    const max = Math.max(1, Number(values.max) || 1);
    const achieved = values.achieved === true || value >= max;
    const progress = Math.min(100, (value / max) * 100);
    return (
      <section className={`shipping-bar docs-studio__shipping-bar${achieved ? ' shipping-bar--achieved' : ''}`}>
        <div className="shipping-bar__text">{String(values.text)}</div>
        <div className="shipping-bar__track" role="progressbar" aria-label="Free shipping progress" aria-valuemin={0} aria-valuenow={value} aria-valuemax={max}>
          <div className="shipping-bar__fill" style={{ '--_shipping-progress': `${progress}%` } as CSSProperties} />
        </div>
      </section>
    );
  }

  function renderUpsell() {
    return (
      <section className="cart-upsell docs-studio__cart-upsell">
        <h2 className="cart-upsell__title">{String(values.title)}</h2>
        {values.items === true && <div className="cart-upsell__items"><article className="cart-upsell__item"><CartMedia className="cart-upsell__item-image" alt="Celadon incense holder" /><div className="cart-upsell__item-info"><div className="cart-upsell__item-title">Celadon incense holder</div><div className="cart-upsell__item-price">$34.00</div></div><button className="btn btn--sm cart-upsell__action" type="button" disabled={values.addDisabled === true || upsellAdded} onClick={() => setUpsellAdded(true)}>{upsellAdded ? <><Check className="btn__icon btn__icon--leading" aria-hidden="true" />Added</> : String(values.addLabel)}</button></article></div>}
        <span className="visually-hidden" role="status" aria-live="polite">{upsellAdded ? 'Recommendation added to cart.' : ''}</span>
      </section>
    );
  }

  function renderEmpty() {
    return (
      <section className="cart-empty docs-studio__cart-empty">
        {values.icon === true && <PackageOpen className="cart-empty__icon" aria-hidden="true" />}
        <h2 className="cart-empty__title">{String(values.title)}</h2>
        {String(values.message || '') && <p className="cart-empty__message">{String(values.message)}</p>}
        {String(values.actionLabel || '') && <a className="btn cart-empty__action" href={String(values.href || '#collection')} onClick={(event) => event.preventDefault()}>{String(values.actionLabel)}</a>}
      </section>
    );
  }

  function renderQuickView() {
    return (
      <section className="quick-view docs-studio__quick-view" aria-labelledby={`${id}-quick-view-title`}>
        {values.gallery === true && <div className="quick-view__gallery"><CartMedia alt="Celadon glazed stoneware vessel" /></div>}
        <div className="quick-view__info">
          {String(values.vendor || '') && <span className="quick-view__vendor">{String(values.vendor)}</span>}
          <h2 className="quick-view__title" id={`${id}-quick-view-title`}>{String(values.title)}</h2>
          <span className="price"><span className="price__current">$120.00</span></span>
          {String(values.description || '') && <p className="quick-view__description">{String(values.description)}</p>}
          {values.productForm === true && <div className="quick-view__form product-form"><div className="product-form__actions"><button className="btn product-form__submit" type="button" disabled={quickViewAdded} onClick={() => setQuickViewAdded(true)}><ShoppingBag className="btn__icon btn__icon--leading" aria-hidden="true" />{quickViewAdded ? 'Added' : 'Add to cart'}</button></div></div>}
          {String(values.fullLinkLabel || '') && <a className="quick-view__full-link" href={String(values.href || '#product')} onClick={(event) => event.preventDefault()}>{String(values.fullLinkLabel)}</a>}
        </div>
      </section>
    );
  }

  function renderStickyAtc() {
    const visible = values.visible === true;
    return (
      <aside className={`sticky-atc docs-studio__sticky-atc${visible ? ' sticky-atc--visible' : ''}`} aria-hidden={!visible}>
        <div className="sticky-atc__inner"><div className="sticky-atc__info">{values.image === true && <CartMedia className="sticky-atc__image" alt={String(values.imageAlt || '')} />}<span className="sticky-atc__title">{String(values.title)}</span>{String(values.price || '') && <span className="sticky-atc__price">{String(values.price)}</span>}</div><button className="btn sticky-atc__action" type="button" tabIndex={visible ? 0 : -1} disabled={values.actionDisabled === true || stickyAdded} onClick={() => setStickyAdded(true)}>{stickyAdded ? <><Check className="btn__icon btn__icon--leading" aria-hidden="true" />Added</> : String(values.actionLabel)}</button></div>
      </aside>
    );
  }

  function renderCartNote() {
    const expanded = values.expanded === true;
    return (
      <section className="cart-note docs-studio__cart-note" data-expanded={expanded}>
        <button className="cart-note__toggle" type="button" aria-expanded={expanded} aria-controls={`${id}-cart-note-field`} onClick={() => setValue('expanded', !expanded)}>{String(values.toggleLabel)}</button>
        {expanded && values.field === true && <div className="input cart-note__field" id={`${id}-cart-note-field`}><label className="input__label" htmlFor={`${id}-cart-note`}>Order note</label><textarea className="input__field textarea__field" id={`${id}-cart-note`} rows={4} data-resize="vertical" data-min-lines="3" data-max-lines="8" value={note} onChange={(event) => setNote(event.target.value)} /></div>}
      </section>
    );
  }

  function renderGiftWrap() {
    const selected = values.selected === true;
    const disabled = values.disabled === true;
    return (
      <label className="gift-wrap checkbox docs-studio__gift-wrap">
        <span className="gift-wrap__control"><input className="checkbox__input" type="checkbox" checked={selected} disabled={disabled} onChange={(event) => setValue('selected', event.target.checked)} /></span>
        <div className="checkbox__label gift-wrap__info"><div className="gift-wrap__label">{String(values.label)}</div>{String(values.price || '') && <div className="gift-wrap__price">{String(values.price)}</div>}</div>
      </label>
    );
  }

  function renderPreview() {
    if (contract.slug === 'cart-page') return renderCartPage();
    if (contract.slug === 'cart-line-item') return renderLineItem();
    if (contract.slug === 'cart-summary') return renderSummary();
    if (contract.slug === 'discount-field') return renderDiscount();
    if (contract.slug === 'free-shipping-bar') return renderShippingBar();
    if (contract.slug === 'cart-upsell') return renderUpsell();
    if (contract.slug === 'cart-empty') return renderEmpty();
    if (contract.slug === 'quick-view') return renderQuickView();
    if (contract.slug === 'sticky-atc') return renderStickyAtc();
    if (contract.slug === 'cart-note') return renderCartNote();
    return renderGiftWrap();
  }

  const stickyStage = contract.slug === 'sticky-atc';

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue={currentState()} tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={changeState} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className={`docs-studio__stage${stickyStage ? ' docs-studio__stage--cart-sticky' : ''}`} aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}><div className={`docs-studio__stage-inner docs-studio__cart-stage-inner docs-studio__cart-stage-inner--${contract.slug}`}>{renderPreview()}</div></section>
      </div>
    </div>
  );
}
