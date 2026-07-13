import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  Bell,
  Check,
  ChevronDown,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface AccountStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  autoComplete?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'auth-forms': {
    title: 'Welcome back',
    subtitle: 'Sign in to view your collection and orders.',
    form: true,
    forgotAction: true,
    dividerLabel: 'or continue with',
    socialActions: true,
    footer: true,
  },
  'password-reset': {
    icon: true,
    title: 'Reset your password',
    text: 'Enter your email address and we will send you a reset link.',
    form: true,
    successMessage: 'Check your inbox for a password reset link.',
  },
  'account-dashboard': {
    greeting: 'Good afternoon, Alex',
    headerActions: true,
    cards: true,
  },
  'order-history': {
    label: 'Recent orders',
    orders: true,
  },
  'order-detail': {
    title: 'Order #1048',
    meta: true,
    tracking: true,
    lineItems: true,
  },
  'address-book': {
    addresses: true,
    newAddressLabel: 'Add address',
  },
  'address-form': {
    fields: true,
    actions: true,
  },
  wishlist: {
    title: 'Saved works',
    count: '3 items',
    products: true,
  },
  'account-settings': {
    sections: true,
  },
};

const accountCards = [
  { title: 'Orders', description: 'Track recent purchases and view receipts.', icon: Package },
  { title: 'Addresses', description: 'Manage shipping and billing destinations.', icon: MapPin },
  { title: 'Saved works', description: 'Return to pieces you have collected here.', icon: Heart },
];

const orders = [
  { number: '#1048', date: 'July 8, 2026', status: 'Shipped', state: 'shipped', total: '$120.00' },
  { number: '#1032', date: 'June 21, 2026', status: 'Delivered', state: 'delivered', total: '$248.00' },
  { number: '#1017', date: 'May 14, 2026', status: 'Cancelled', state: 'cancelled', total: '$86.00' },
];

const wishlistProducts = [
  { title: 'Celadon Study No. 4', vendor: 'Lucia Ferrer', price: '$120.00' },
  { title: 'Contour Vessel', vendor: 'Mara Vidal', price: '$148.00' },
  { title: 'Ash Glaze Bowl', vendor: 'Noah Sato', price: '$86.00' },
];

const countries = ['Argentina', 'Mexico', 'Spain'];

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

function Field({ id, label, type = 'text', value, autoComplete, required, onChange }: FieldProps) {
  return (
    <div className="input docs-studio__account-field">
      <label className="input__label" htmlFor={id}>{label}</label>
      <div className="input__control">
        <input
          className="input__field"
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          required={required}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

function AccountMedia({ className = '', alt = '' }: { className?: string; alt?: string }) {
  return <img src={transparentImage} alt={alt} className={`${className} docs-studio__account-media`} />;
}

export default function AccountStudio({ contract, definition }: AccountStudioProps) {
  const id = useId();
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls
      .filter((control) => control.tokens)
      .map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('');
  const [authFeedback, setAuthFeedback] = useState('');
  const [resetEmail, setResetEmail] = useState('alex@example.com');
  const [resetSent, setResetSent] = useState(false);
  const [addressFeedback, setAddressFeedback] = useState('');
  const [addressFirstName, setAddressFirstName] = useState('Alex');
  const [addressLastName, setAddressLastName] = useState('Morgan');
  const [addressLine, setAddressLine] = useState('18 Gallery Lane');
  const [addressCity, setAddressCity] = useState('Buenos Aires');
  const [addressCountry, setAddressCountry] = useState('Argentina');
  const [addressCountryOpen, setAddressCountryOpen] = useState(false);
  const [addressCountryHighlight, setAddressCountryHighlight] = useState(0);
  const [addressFormFeedback, setAddressFormFeedback] = useState('');
  const [savedProducts, setSavedProducts] = useState(() => wishlistProducts.map(() => true));
  const [wishlistTouched, setWishlistTouched] = useState(false);
  const [profileName, setProfileName] = useState('Alex Morgan');
  const [profileEmail, setProfileEmail] = useState('alex@example.com');
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [settingsFeedback, setSettingsFeedback] = useState('');

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => [
        token,
        computed.getPropertyValue(token).trim(),
      ])));
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
    setEmail('alex@example.com');
    setPassword('');
    setAuthFeedback('');
    setResetEmail('alex@example.com');
    setResetSent(false);
    setAddressFeedback('');
    setAddressFirstName('Alex');
    setAddressLastName('Morgan');
    setAddressLine('18 Gallery Lane');
    setAddressCity('Buenos Aires');
    setAddressCountry('Argentina');
    setAddressCountryOpen(false);
    setAddressCountryHighlight(0);
    setAddressFormFeedback('');
    setSavedProducts(wishlistProducts.map(() => true));
    setWishlistTouched(false);
    setProfileName('Alex Morgan');
    setProfileEmail('alex@example.com');
    setEmailUpdates(true);
    setSmsUpdates(false);
    setSettingsFeedback('');
  }

  function renderAuthForms() {
    const submit = (event: FormEvent) => {
      event.preventDefault();
      setAuthFeedback('Demo sign-in submitted. No credentials were sent.');
    };
    return (
      <section className="auth docs-studio__auth">
        <header className="auth__header">
          <h2 className="auth__title">{String(values.title)}</h2>
          {String(values.subtitle || '') && <p className="auth__subtitle">{String(values.subtitle)}</p>}
        </header>
        {values.form === true && (
          <form className="auth__form" onSubmit={submit}>
            <Field id={`${id}-auth-email`} label="Email address" type="email" value={email} autoComplete="username" required onChange={setEmail} />
            <Field id={`${id}-auth-password`} label="Password" type="password" value={password} autoComplete="current-password" required onChange={setPassword} />
            {values.forgotAction === true && (
              <div className="auth__forgot"><a href="#reset" onClick={(event) => event.preventDefault()}>Forgot password?</a></div>
            )}
            <button className="btn btn--full" type="submit">Sign in</button>
          </form>
        )}
        <p className="docs-studio__account-feedback" role="status" aria-live="polite">{authFeedback}</p>
        {values.socialActions === true && (
          <>
            {String(values.dividerLabel || '') && <div className="auth__divider">{String(values.dividerLabel)}</div>}
            <div className="auth__social">
              <button className="auth__social-btn" type="button"><Mail aria-hidden="true" />Continue with email link</button>
              <button className="auth__social-btn" type="button"><ShieldCheck aria-hidden="true" />Continue with single sign-on</button>
            </div>
          </>
        )}
        {values.footer === true && <p className="auth__footer">New to the gallery? <a href="#register" onClick={(event) => event.preventDefault()}>Create an account</a></p>}
      </section>
    );
  }

  function renderPasswordReset() {
    const submit = (event: FormEvent) => {
      event.preventDefault();
      setResetSent(true);
    };
    return (
      <section className="password-reset docs-studio__password-reset">
        {values.icon === true && <LockKeyhole className="password-reset__icon" aria-hidden="true" />}
        <h2 className="password-reset__title">{String(values.title)}</h2>
        <p className="password-reset__text">{String(values.text)}</p>
        {resetSent && String(values.successMessage || '') ? (
          <div className="password-reset__success" role="status">{String(values.successMessage)}</div>
        ) : values.form === true ? (
          <form className="password-reset__form" onSubmit={submit}>
            <Field id={`${id}-reset-email`} label="Email address" type="email" value={resetEmail} autoComplete="email" required onChange={setResetEmail} />
            <button className="btn btn--full" type="submit">Send reset link</button>
          </form>
        ) : null}
      </section>
    );
  }

  function renderDashboard() {
    return (
      <section className="account-dashboard docs-studio__account-dashboard">
        <header className="account-dashboard__header">
          <h2 className="account-dashboard__greeting">{String(values.greeting)}</h2>
          {values.headerActions === true && <div className="account-dashboard__actions"><button className="btn btn--outline btn--sm" type="button">Sign out</button></div>}
        </header>
        {values.cards === true && (
          <div className="account-dashboard__grid">
            {accountCards.map(({ title, description, icon: Icon }) => (
              <article className="account-card" key={title}>
                <Icon className="account-card__icon" aria-hidden="true" />
                <h3 className="account-card__title">{title}</h3>
                <p className="account-card__description">{description}</p>
                <a className="account-card__link" href={`#${title.toLowerCase().replace(' ', '-')}`} onClick={(event) => event.preventDefault()}>View {title.toLowerCase()}</a>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderOrderHistory() {
    return (
      <section className="order-list docs-studio__order-list" aria-label={String(values.label || '') || undefined}>
        {values.orders === true && orders.map((order) => (
          <article className="order-row" key={order.number}>
            <a className="order-row__number" href={`#order-${order.number.slice(1)}`} onClick={(event) => event.preventDefault()}>{order.number}</a>
            <span className="order-row__date">{order.date}</span>
            <span className={`order-row__status order-row__status--${order.state}`}>{order.status}</span>
            <span className="order-row__total">{order.total}</span>
          </article>
        ))}
      </section>
    );
  }

  function renderOrderDetail() {
    const tracking = [
      { label: 'Confirmed', state: 'done' },
      { label: 'Prepared', state: 'done' },
      { label: 'Shipped', state: 'active' },
      { label: 'Delivered', state: '' },
    ];
    return (
      <section className="order-detail docs-studio__order-detail">
        <header className="order-detail__header">
          <h2 className="order-detail__title">{String(values.title)}</h2>
          {values.meta === true && <span className="order-detail__meta">Placed July 8, 2026</span>}
        </header>
        {values.tracking === true && (
          <div className="order-tracking" aria-label="Order progress">
            {tracking.map((step) => (
              <div
                className={`order-tracking__step${step.state ? ` order-tracking__step--${step.state}` : ''}`}
                aria-current={step.state === 'active' ? 'step' : undefined}
                key={step.label}
              >
                <span className="order-tracking__dot" aria-hidden="true" />
                <span className="order-tracking__label">{step.label}</span>
              </div>
            ))}
          </div>
        )}
        {values.lineItems === true && (
          <div className="order-detail__items">
            <article className="cart-line docs-studio__account-order-line">
              <AccountMedia className="cart-line__image" alt="Celadon glazed stoneware vessel" />
              <div className="cart-line__info">
                <a className="cart-line__title" href="#product" onClick={(event) => event.preventDefault()}>Celadon Study No. 4</a>
                <span className="cart-line__variant">Celadon / Medium</span>
                <span className="docs-studio__account-order-quantity">Quantity 1</span>
              </div>
              <div className="cart-line__prices"><span className="cart-line__price">$120.00</span></div>
            </article>
          </div>
        )}
      </section>
    );
  }

  function renderAddressBook() {
    return (
      <div className="docs-studio__address-book">
        {values.addresses === true && (
          <section className="address-grid">
            <article className="address-card address-card--default">
              <span className="address-card__default-tag">Default</span>
              <h3 className="address-card__name">Alex Morgan</h3>
              <p className="address-card__text">18 Gallery Lane{`\n`}Buenos Aires, C1001</p>
              <div className="address-card__actions"><button className="btn btn--link btn--sm" type="button" onClick={() => setAddressFeedback('Default address ready to edit.')}>Edit</button></div>
            </article>
            <article className="address-card">
              <h3 className="address-card__name">Studio</h3>
              <p className="address-card__text">42 Workshop Road{`\n`}Mendoza, M5500</p>
              <div className="address-card__actions"><button className="btn btn--link btn--sm" type="button" onClick={() => setAddressFeedback('Studio address ready to edit.')}>Edit</button></div>
            </article>
            {String(values.newAddressLabel || '') && (
              <button className="address-card address-card--new" type="button" onClick={() => setAddressFeedback('New address form opened.')}> <Plus aria-hidden="true" /><span>{String(values.newAddressLabel)}</span></button>
            )}
          </section>
        )}
        <p className="docs-studio__account-feedback" role="status" aria-live="polite">{addressFeedback}</p>
      </div>
    );
  }

  function renderAddressForm() {
    const submit = (event: FormEvent) => {
      event.preventDefault();
      setAddressFormFeedback('Address saved in this preview.');
    };
    return (
      <form className="address-form docs-studio__address-form" onSubmit={submit}>
        {values.fields === true && (
          <div className="address-form__fields">
            <div className="address-form__row">
              <Field id={`${id}-address-first`} label="First name" value={addressFirstName} autoComplete="given-name" required onChange={setAddressFirstName} />
              <Field id={`${id}-address-last`} label="Last name" value={addressLastName} autoComplete="family-name" required onChange={setAddressLastName} />
            </div>
            <Field id={`${id}-address-line`} label="Address" value={addressLine} autoComplete="street-address" required onChange={setAddressLine} />
            <div className="address-form__row">
              <Field id={`${id}-address-city`} label="City" value={addressCity} autoComplete="address-level2" required onChange={setAddressCity} />
              <div className={`select select--enhanced docs-studio__account-field${addressCountryOpen ? ' select--open' : ''}`}>
                <label className="select__label" id={`${id}-address-country-label`} htmlFor={`${id}-address-country-trigger`}>Country</label>
                <div className="select__control">
                  <select
                    className="select__field select__native"
                    id={`${id}-address-country`}
                    name="country"
                    value={addressCountry}
                    autoComplete="country-name"
                    required
                    tabIndex={-1}
                    aria-hidden="true"
                    onChange={(event) => setAddressCountry(event.target.value)}
                  >
                    {countries.map((country) => <option key={country}>{country}</option>)}
                  </select>
                  <button
                    className="select__field select__trigger"
                    id={`${id}-address-country-trigger`}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={addressCountryOpen}
                    aria-controls={`${id}-address-country-listbox`}
                    aria-labelledby={`${id}-address-country-label`}
                    aria-activedescendant={addressCountryOpen ? `${id}-address-country-option-${addressCountryHighlight}` : undefined}
                    onClick={() => {
                      setAddressCountryHighlight(countries.indexOf(addressCountry));
                      setAddressCountryOpen((open) => !open);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        setAddressCountryOpen(false);
                        return;
                      }
                      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        event.preventDefault();
                        const direction = event.key === 'ArrowDown' ? 1 : -1;
                        setAddressCountryOpen(true);
                        setAddressCountryHighlight((current) => (current + direction + countries.length) % countries.length);
                        return;
                      }
                      if ((event.key === 'Enter' || event.key === ' ') && addressCountryOpen) {
                        event.preventDefault();
                        setAddressCountry(countries[addressCountryHighlight]);
                        setAddressCountryOpen(false);
                      }
                    }}
                  >
                    <span className="select__value">{addressCountry}</span>
                    <ChevronDown className="select__indicator" aria-hidden="true" />
                  </button>
                  <div
                    className="select__listbox"
                    id={`${id}-address-country-listbox`}
                    role="listbox"
                    aria-labelledby={`${id}-address-country-label`}
                    hidden={!addressCountryOpen}
                  >
                    {countries.map((country, index) => (
                      <div
                        className="select__option"
                        id={`${id}-address-country-option-${index}`}
                        key={country}
                        role="option"
                        tabIndex={-1}
                        aria-selected={country === addressCountry}
                        data-highlighted={index === addressCountryHighlight || undefined}
                        onPointerMove={() => setAddressCountryHighlight(index)}
                        onClick={() => {
                          setAddressCountry(country);
                          setAddressCountryOpen(false);
                        }}
                      >
                        <span className="select__option-label">{country}</span>
                        <Check className="select__option-check" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {values.actions === true && <div className="address-form__actions"><button className="btn btn--outline" type="button" onClick={() => setAddressFormFeedback('Changes discarded in this preview.')}>Cancel</button><button className="btn" type="submit">Save address</button></div>}
        <p className="docs-studio__account-feedback" role="status" aria-live="polite">{addressFormFeedback}</p>
      </form>
    );
  }

  function renderWishlist() {
    const savedCount = savedProducts.filter(Boolean).length;
    const displayCount = wishlistTouched ? `${savedCount} ${savedCount === 1 ? 'item' : 'items'}` : String(values.count || '');
    return (
      <section className="wishlist docs-studio__wishlist">
        <header className="wishlist__header"><h2 className="wishlist__title">{String(values.title)}</h2>{displayCount && <span className="wishlist__count" aria-live="polite">{displayCount}</span>}</header>
        {values.products === true && (
          <div className="wishlist__grid">
            {wishlistProducts.map((product, index) => (
              <article className="product-card docs-studio__wishlist-product" key={product.title}>
                <div className="product-card__media">
                  <AccountMedia className="product-card__image" alt={`${product.title} artwork fixture`} />
                  <button
                    className="wishlist-btn docs-studio__wishlist-toggle"
                    type="button"
                    aria-label={`${savedProducts[index] ? 'Remove' : 'Save'} ${product.title}`}
                    aria-pressed={savedProducts[index]}
                    onClick={() => {
                      setSavedProducts((current) => current.map((saved, itemIndex) => itemIndex === index ? !saved : saved));
                      setWishlistTouched(true);
                    }}
                  >
                    <Heart fill={savedProducts[index] ? 'currentColor' : 'none'} aria-hidden="true" />
                  </button>
                </div>
                <div className="product-card__body">
                  <span className="product-card__vendor">{product.vendor}</span>
                  <h3 className="product-card__title"><a href="#product" onClick={(event) => event.preventDefault()}>{product.title}</a></h3>
                </div>
                <div className="product-card__footer"><span className="price"><span className="price__current">{product.price}</span></span></div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderSettings() {
    const submit = (event: FormEvent) => {
      event.preventDefault();
      setSettingsFeedback('Settings saved in this preview.');
    };
    return (
      <form className="account-settings docs-studio__account-settings" onSubmit={submit}>
        {values.sections === true && (
          <>
            <section className="account-settings__section">
              <h2 className="account-settings__section-title">Profile</h2>
              <p className="account-settings__section-description">Update the details used across your account.</p>
              <div className="docs-studio__account-settings-fields">
                <Field id={`${id}-settings-name`} label="Name" value={profileName} autoComplete="name" onChange={setProfileName} />
                <Field id={`${id}-settings-email`} label="Email address" type="email" value={profileEmail} autoComplete="email" onChange={setProfileEmail} />
              </div>
            </section>
            <section className="account-settings__section">
              <h2 className="account-settings__section-title">Notifications</h2>
              <p className="account-settings__section-description">Choose how you receive order and collection updates.</p>
              <div className="docs-studio__account-switches">
                <label className="switch">
                  <input className="switch__input" type="checkbox" role="switch" checked={emailUpdates} onChange={(event) => setEmailUpdates(event.target.checked)} />
                  <span className="switch__track" aria-hidden="true"><span className="switch__thumb" /></span>
                  <span className="switch__label"><Bell aria-hidden="true" />Email updates</span>
                </label>
                <label className="switch">
                  <input className="switch__input" type="checkbox" role="switch" checked={smsUpdates} onChange={(event) => setSmsUpdates(event.target.checked)} />
                  <span className="switch__track" aria-hidden="true"><span className="switch__thumb" /></span>
                  <span className="switch__label"><ShieldCheck aria-hidden="true" />Security messages</span>
                </label>
              </div>
            </section>
            <section className="account-settings__section docs-studio__account-settings-actions">
              <button className="btn" type="submit">Save changes</button>
              <span className="docs-studio__account-feedback" role="status" aria-live="polite">{settingsFeedback}</span>
            </section>
          </>
        )}
      </form>
    );
  }

  function renderPreview() {
    if (contract.slug === 'auth-forms') return renderAuthForms();
    if (contract.slug === 'password-reset') return renderPasswordReset();
    if (contract.slug === 'account-dashboard') return renderDashboard();
    if (contract.slug === 'order-history') return renderOrderHistory();
    if (contract.slug === 'order-detail') return renderOrderDetail();
    if (contract.slug === 'address-book') return renderAddressBook();
    if (contract.slug === 'address-form') return renderAddressForm();
    if (contract.slug === 'wishlist') return renderWishlist();
    return renderSettings();
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue="default"
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className="docs-studio__stage docs-studio__stage--account"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__account-stage-inner docs-studio__account-stage-inner--${contract.slug}`}>
            {renderPreview()}
          </div>
        </section>
      </div>
    </div>
  );
}
