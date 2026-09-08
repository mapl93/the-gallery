import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  Heart,
  LockKeyhole,
  MapPin,
  Package,
  Plus,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import AuthFormsArtwork from './AuthFormsArtwork';
import PasswordResetArtwork from './PasswordResetArtwork';
import AccountDashboardArtwork from './AccountDashboardArtwork';
import AccountSettingsArtwork, {
  AccountSettingsSectionArtwork,
} from './AccountSettingsArtwork';
import OrderHistoryArtwork, { type OrderHistoryItem } from './OrderHistoryArtwork';
import OrderDetailArtwork, { type OrderDetailLineItem } from './OrderDetailArtwork';
import AddressBookArtwork, { type AddressBookRecord } from './AddressBookArtwork';
import AddressFormArtwork from './AddressFormArtwork';
import EmptyStateArtwork from './EmptyStateArtwork';
import InputArtwork from './InputArtwork';
import ProductCardArtwork from './ProductCardArtwork';
import SwitchArtwork from './SwitchArtwork';
import type { StepsArtworkItem } from './StepsArtwork';
import WishlistArtwork from './WishlistArtwork';
import { editorialMedia } from './editorialMedia';

interface AccountStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

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
    emptyState: true,
  },
  'account-settings': {
    sections: true,
  },
};

const accountCards = [
  {
    id: 'orders',
    title: 'Orders',
    description: 'Track recent purchases and view receipts.',
    href: '#orders',
    linkLabel: 'View orders',
    icon: <Package className="account-card__icon" aria-hidden="true" />,
  },
  {
    id: 'addresses',
    title: 'Addresses',
    description: 'Manage shipping and billing destinations.',
    href: '#addresses',
    linkLabel: 'Manage addresses',
    icon: <MapPin className="account-card__icon" aria-hidden="true" />,
  },
  {
    id: 'saved-works',
    title: 'Saved works',
    description: 'Return to pieces you have collected here.',
    href: '#saved-works',
    linkLabel: 'View saved works',
    icon: <Heart className="account-card__icon" aria-hidden="true" />,
  },
];

const orders: readonly OrderHistoryItem[] = [
  {
    id: '1048',
    numberLabel: 'Order #1048',
    href: '#order-1048',
    dateLabel: 'July 8, 2026',
    dateTime: '2026-07-08',
    statusLabel: 'Shipped',
    statusVariant: 'info',
    totalLabel: '$120.00',
  },
  {
    id: '1032',
    numberLabel: 'Order #1032',
    href: '#order-1032',
    dateLabel: 'June 21, 2026',
    dateTime: '2026-06-21',
    statusLabel: 'Delivered',
    statusVariant: 'success',
    totalLabel: '$248.00',
  },
  {
    id: '1017',
    numberLabel: 'Order #1017',
    href: '#order-1017',
    dateLabel: 'May 14, 2026',
    dateTime: '2026-05-14',
    statusLabel: 'Cancelled',
    statusVariant: 'error',
    totalLabel: '$86.00',
  },
];

const orderDetailTracking: readonly StepsArtworkItem[] = [
  { id: 'confirmed', title: 'Confirmed', status: 'completed' },
  { id: 'prepared', title: 'Prepared', status: 'completed' },
  { id: 'shipped', title: 'Shipped', status: 'current' },
  { id: 'delivered', title: 'Delivered', status: 'upcoming' },
];

const orderDetailLineItems: readonly OrderDetailLineItem[] = [
  {
    id: 'order-1048-celadon-study-4',
    title: 'Celadon Study No. 4',
    href: '#product',
    details: ['Celadon / Medium', 'Quantity 1'],
    imageSrc: editorialMedia.texturedVase,
    imageAlt: '',
    currentPrice: '$120.00',
    currentPriceLabel: 'Price',
  },
];

const addressBookRecords: readonly AddressBookRecord[] = [
  {
    id: 'alex-morgan',
    recipient: 'Alex Morgan',
    lines: ['18 Gallery Lane', 'Buenos Aires, C1001'],
    isDefault: true,
    defaultLabel: 'Default',
    actions: [
      {
        id: 'edit',
        label: 'Edit',
        accessibleLabel: 'Edit address for Alex Morgan',
        variant: 'link',
        size: 'sm',
      },
    ],
  },
  {
    id: 'studio',
    recipient: 'Studio',
    lines: ['42 Workshop Road', 'Mendoza, M5500'],
    actions: [
      {
        id: 'edit',
        label: 'Edit',
        accessibleLabel: 'Edit address for Studio',
        variant: 'link',
        size: 'sm',
      },
    ],
  },
];

const wishlistProducts = [
  {
    productId: 'celadon-study-no-4',
    variantId: 'celadon-study-no-4-large-seafoam',
    title: 'Celadon Study No. 4',
    selection: 'Large · Seafoam',
    vendor: 'Lucia Ferrer',
    price: '$120.00',
  },
  {
    productId: 'celadon-study-no-4',
    variantId: 'celadon-study-no-4-small-porcelain',
    title: 'Celadon Study No. 4',
    selection: 'Small · Porcelain white',
    vendor: 'Lucia Ferrer',
    price: '$112.00',
  },
  {
    productId: 'ash-glaze-bowl',
    variantId: 'ash-glaze-bowl-small-ash-grey',
    title: 'Ash Glaze Bowl',
    selection: 'Small · Ash grey',
    vendor: 'Noah Sato',
    price: '$86.00',
    availabilityLabel: 'No longer available',
  },
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authFeedback, setAuthFeedback] = useState('');
  const [resetEmail, setResetEmail] = useState('alex@example.com');
  const [resetSent, setResetSent] = useState(false);
  const resetConfirmationRef = useRef<HTMLDivElement>(null);
  const [dashboardFeedback, setDashboardFeedback] = useState('');
  const [orderFeedback, setOrderFeedback] = useState('');
  const [orderDetailFeedback, setOrderDetailFeedback] = useState('');
  const [addressFeedback, setAddressFeedback] = useState('');
  const [addressFirstName, setAddressFirstName] = useState('Alex');
  const [addressLastName, setAddressLastName] = useState('Morgan');
  const [addressLine, setAddressLine] = useState('18 Gallery Lane');
  const [addressCity, setAddressCity] = useState('Buenos Aires');
  const [addressCountry, setAddressCountry] = useState('Argentina');
  const [addressFormFeedback, setAddressFormFeedback] = useState('');
  const [wishlistFeedback, setWishlistFeedback] = useState('');
  const [profileName, setProfileName] = useState('Alex Morgan');
  const [profileEmail, setProfileEmail] = useState('alex@example.com');
  const [compactAccountLayout, setCompactAccountLayout] = useState(true);
  const [orderThumbnails, setOrderThumbnails] = useState(false);
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

  useEffect(() => {
    if (contract.slug !== 'password-reset' || !resetSent) return undefined;
    const frame = requestAnimationFrame(() => resetConfirmationRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [contract.slug, resetSent]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setEmail('alex@example.com');
    setPassword('');
    setPasswordVisible(false);
    setAuthFeedback('');
    setResetEmail('alex@example.com');
    setResetSent(false);
    setDashboardFeedback('');
    setOrderFeedback('');
    setOrderDetailFeedback('');
    setAddressFeedback('');
    setAddressFirstName('Alex');
    setAddressLastName('Morgan');
    setAddressLine('18 Gallery Lane');
    setAddressCity('Buenos Aires');
    setAddressCountry('Argentina');
    setAddressFormFeedback('');
    setWishlistFeedback('');
    setProfileName('Alex Morgan');
    setProfileEmail('alex@example.com');
    setCompactAccountLayout(true);
    setOrderThumbnails(false);
    setSettingsFeedback('');
  }

  function renderAuthForms() {
    const submit = (event: FormEvent) => {
      event.preventDefault();
      setAuthFeedback('Demo sign-in submitted. No credentials were sent.');
    };
    return (
      <>
        <AuthFormsArtwork
          id={`${id}-auth`}
          className="docs-studio__auth"
          title={String(values.title || '')}
          subtitle={String(values.subtitle || '')}
          form={values.form === true}
          forgotAction={values.forgotAction === true}
          dividerLabel={String(values.dividerLabel || '')}
          socialActions={values.socialActions === true}
          footer={values.footer === true}
          email={email}
          password={password}
          passwordVisible={passwordVisible}
          onEmailChange={(event) => setEmail(event.target.value)}
          onPasswordChange={(event) => setPassword(event.target.value)}
          onPasswordVisibleChange={setPasswordVisible}
          onSubmit={submit}
          onAlternativeAction={(method) => setAuthFeedback(
            method === 'email-link'
              ? 'Demo email-link sign-in selected. No request was sent.'
              : 'Demo single sign-on selected. No request was sent.'
          )}
          onNavigate={(event) => event.preventDefault()}
        />
        <p className="docs-studio__account-feedback" role="status" aria-live="polite">{authFeedback}</p>
      </>
    );
  }

  function renderPasswordReset() {
    const submit = (event: FormEvent) => {
      event.preventDefault();
      setResetSent(true);
    };
    return (
      <PasswordResetArtwork
        id={`${id}-reset`}
        className="docs-studio__password-reset"
        title={String(values.title || '')}
        text={String(values.text || '')}
        icon={values.icon === true
          ? <LockKeyhole className="password-reset__icon" aria-hidden="true" />
          : undefined}
        form={values.form === true}
        email={resetEmail}
        successMessage={String(values.successMessage || '')}
        showSuccess={resetSent}
        confirmationRef={resetConfirmationRef}
        onEmailChange={(event) => {
          setResetEmail(event.target.value);
          setResetSent(false);
        }}
        onSubmit={submit}
      />
    );
  }

  function renderDashboard() {
    const greeting = String(values.greeting || '');
    const hasCompleteComposition = greeting.trim().length > 0 && values.cards === true;

    return (
      <>
        <AccountDashboardArtwork
          id={`${id}-dashboard`}
          className="docs-studio__account-dashboard"
          greeting={greeting}
          headerActions={values.headerActions === true ? (
            <button
              className="btn btn--outline btn--sm"
              type="button"
              onClick={() => setDashboardFeedback('Demo sign-out action selected. No session changed.')}
            >
              Sign out
            </button>
          ) : undefined}
          destinations={values.cards === true ? accountCards : []}
          onNavigate={(destination, event) => {
            event.preventDefault();
            setDashboardFeedback(`Demo navigation to ${destination.title} selected. No route changed.`);
          }}
        />
        {hasCompleteComposition && dashboardFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {dashboardFeedback}
          </p>
        )}
      </>
    );
  }

  function renderOrderHistory() {
    const hasCompleteComposition = values.orders === true;

    return (
      <>
        <OrderHistoryArtwork
          className="docs-studio__order-list"
          label={String(values.label || '')}
          orders={hasCompleteComposition ? orders : []}
          onNavigate={(order, event) => {
            event.preventDefault();
            setOrderFeedback(`Demo navigation to ${order.numberLabel} selected. No route changed.`);
          }}
        />
        {hasCompleteComposition && orderFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {orderFeedback}
          </p>
        )}
      </>
    );
  }

  function renderOrderDetail() {
    const title = String(values.title || '');
    const hasCompleteComposition = title.trim().length > 0 && values.lineItems === true;

    return (
      <>
        <OrderDetailArtwork
          className="docs-studio__order-detail"
          title={title}
          meta={values.meta === true ? (
            <>Placed <time dateTime="2026-07-08">July 8, 2026</time></>
          ) : undefined}
          trackingLabel={values.tracking === true ? 'Order progress' : ''}
          trackingItems={values.tracking === true ? orderDetailTracking : []}
          lineItemsLabel={values.lineItems === true ? 'Purchased items' : ''}
          lineItems={values.lineItems === true ? orderDetailLineItems : []}
          onLineItemNavigate={(item, event) => {
            event.preventDefault();
            setOrderDetailFeedback(`Demo navigation to ${item.title} selected. No route changed.`);
          }}
        />
        {hasCompleteComposition && orderDetailFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {orderDetailFeedback}
          </p>
        )}
      </>
    );
  }

  function renderAddressBook() {
    const hasCompleteComposition = values.addresses === true;

    return (
      <>
        <AddressBookArtwork
          className="docs-studio__address-book"
          records={hasCompleteComposition ? addressBookRecords : []}
          newAddressLabel={String(values.newAddressLabel || '')}
          newAddressIcon={<Plus className="btn__icon btn__icon--leading" aria-hidden="true" />}
          onAction={(record) => setAddressFeedback(
            `Demo edit action for ${record.recipient} selected. No address changed.`,
          )}
          onNewAddress={() => setAddressFeedback(
            'Demo add-address action selected. No form opened.',
          )}
        />
        {hasCompleteComposition && addressFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {addressFeedback}
          </p>
        )}
      </>
    );
  }

  function renderAddressForm() {
    const hasCompleteComposition = values.fields === true;
    const submit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const namedFields = [...new FormData(event.currentTarget).keys()];
      setAddressFormFeedback(
        `Demo submit received ${namedFields.length} named address fields. No address was saved.`,
      );
    };

    const requestFixtureCancellation = () => {
      setAddressFormFeedback(
        'Demo close or navigation requested. Draft values were not reset or submitted.',
      );
    };

    return (
      <>
        <AddressFormArtwork
          className="docs-studio__address-form"
          onSubmit={submit}
          fields={hasCompleteComposition ? (
            <>
              <div className="form__row form__row--2col address-form__row">
                <InputArtwork
                  className="docs-studio__account-field"
                  id={`${id}-address-first`}
                  label="First name"
                  name="givenName"
                  value={addressFirstName}
                  autoComplete="given-name"
                  required
                  onChange={(event) => setAddressFirstName(event.target.value)}
                />
                <InputArtwork
                  className="docs-studio__account-field"
                  id={`${id}-address-last`}
                  label="Last name"
                  name="familyName"
                  value={addressLastName}
                  autoComplete="family-name"
                  required
                  onChange={(event) => setAddressLastName(event.target.value)}
                />
              </div>
              <InputArtwork
                className="docs-studio__account-field"
                id={`${id}-address-line`}
                label="Address"
                name="addressLine1"
                value={addressLine}
                autoComplete="address-line1"
                required
                onChange={(event) => setAddressLine(event.target.value)}
              />
              <div className="form__row form__row--2col address-form__row">
                <InputArtwork
                  className="docs-studio__account-field"
                  id={`${id}-address-city`}
                  label="City"
                  name="city"
                  value={addressCity}
                  autoComplete="address-level2"
                  required
                  onChange={(event) => setAddressCity(event.target.value)}
                />
                <div className="select docs-studio__account-field">
                  <label className="select__label" htmlFor={`${id}-address-country`}>Country</label>
                  <div className="select__control">
                    <select
                      className="select__field"
                      id={`${id}-address-country`}
                      name="country"
                      value={addressCountry}
                      autoComplete="country-name"
                      required
                      onChange={(event) => setAddressCountry(event.target.value)}
                    >
                      <option value="">Choose a country</option>
                      {countries.map((country) => (
                        <option value={country} key={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          actions={values.actions === true ? (
            <>
              <button className="btn btn--outline" type="button" onClick={requestFixtureCancellation}>
                Cancel
              </button>
              <button className="btn" type="submit">Save address</button>
            </>
          ) : null}
        />
        {hasCompleteComposition && addressFormFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {addressFormFeedback}
          </p>
        )}
      </>
    );
  }

  function renderWishlist() {
    return (
      <>
        <WishlistArtwork
          className="docs-studio__wishlist"
          title={String(values.title || '')}
          titleId={`${id}-wishlist-title`}
          count={String(values.count || '')}
          products={values.products === true ? wishlistProducts.map((product, index) => (
            <li
              className="wishlist__item"
              key={product.variantId}
              data-saved-product-id={product.productId}
              data-saved-variant-id={product.variantId}
            >
              <ProductCardArtwork
                title={product.title}
                href="#product"
                imageAlt={`${product.title}, ${product.selection}, ceramic artwork fixture`}
                mediaIndex={index + 1}
                vendor={product.vendor}
                description={product.selection}
                badgeLabel={product.availabilityLabel}
                currentPrice={product.price}
                className="docs-studio__product-card docs-studio__wishlist-product"
                footerAction={(
                  <button
                    className="btn btn--outline btn--sm"
                    type="button"
                    aria-label={`Remove ${product.title}, ${product.selection}, from saved works`}
                    onClick={() => setWishlistFeedback(
                      `Demo removal requested for ${product.title}, ${product.selection}. No saved item was changed.`,
                    )}
                  >
                    Remove
                  </button>
                )}
              />
            </li>
          )) : null}
          emptyState={values.emptyState === true ? (
            <EmptyStateArtwork
              className="docs-studio__wishlist-empty"
              title="No saved works yet"
              titleElement="h3"
              message="Explore the collection and save works to return to later."
              icon={<Heart />}
              action={<a className="btn btn--outline" href="/components/product-card">Explore works</a>}
            />
          ) : undefined}
        />
        {wishlistFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {wishlistFeedback}
          </p>
        )}
      </>
    );
  }

  function renderSettings() {
    const submitProfile = (event: FormEvent) => {
      event.preventDefault();
      setSettingsFeedback('Demo profile submission received. No account settings were saved.');
    };

    return (
      <>
        <AccountSettingsArtwork
          sections={values.sections === true ? (
            <>
              <AccountSettingsSectionArtwork
                id={`${id}-settings-profile`}
                title="Profile"
                description="Update the details used across your account."
              >
                <form className="form" autoComplete="on" onSubmit={submitProfile}>
                  <div className="form__row" data-columns="one">
                    <InputArtwork
                      id={`${id}-settings-name`}
                      label="Name"
                      name="displayName"
                      value={profileName}
                      autoComplete="name"
                      onChange={(event) => setProfileName(event.target.value)}
                    />
                    <InputArtwork
                      id={`${id}-settings-email`}
                      label="Email address"
                      type="email"
                      name="email"
                      value={profileEmail}
                      autoComplete="email"
                      onChange={(event) => setProfileEmail(event.target.value)}
                    />
                  </div>
                  <div className="form__actions">
                    <button className="btn" type="submit" name="intent" value="update-profile">
                      Update profile
                    </button>
                  </div>
                </form>
              </AccountSettingsSectionArtwork>
              <AccountSettingsSectionArtwork
                id={`${id}-settings-display`}
                title="Display"
                description="These demo display preferences take effect immediately and are not consent records."
              >
                <div
                  className="account-settings__controls"
                  role="group"
                  aria-labelledby={`${id}-settings-display-title`}
                  aria-describedby={`${id}-settings-display-description`}
                >
                  <SwitchArtwork
                    id={`${id}-settings-compact-layout`}
                    label="Compact account layout"
                    name="compactAccountLayout"
                    value="enabled"
                    checked={compactAccountLayout}
                    onChange={(event) => {
                      setCompactAccountLayout(event.target.checked);
                      setSettingsFeedback('Demo compact-layout change requested. No account setting was saved.');
                    }}
                  />
                  <SwitchArtwork
                    id={`${id}-settings-order-thumbnails`}
                    label="Show order thumbnails"
                    name="orderThumbnails"
                    value="enabled"
                    checked={orderThumbnails}
                    onChange={(event) => {
                      setOrderThumbnails(event.target.checked);
                      setSettingsFeedback('Demo order-thumbnail change requested. No account setting was saved.');
                    }}
                  />
                </div>
              </AccountSettingsSectionArtwork>
            </>
          ) : null}
        />
        {settingsFeedback && (
          <p className="docs-studio__account-feedback" role="status" aria-live="polite">
            {settingsFeedback}
          </p>
        )}
      </>
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
          onPropertiesChange={(next) => {
            setValues((current) => ({ ...current, ...next }));
            if (contract.slug === 'account-dashboard') setDashboardFeedback('');
            if (contract.slug === 'order-history') setOrderFeedback('');
            if (contract.slug === 'order-detail') setOrderDetailFeedback('');
            if (contract.slug === 'address-book') setAddressFeedback('');
            if (contract.slug === 'address-form') setAddressFormFeedback('');
            if (contract.slug === 'wishlist') setWishlistFeedback('');
            if (contract.slug === 'account-settings') setSettingsFeedback('');
          }}
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
