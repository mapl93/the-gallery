import type { ReactNode } from 'react';
import BadgeArtwork from './BadgeArtwork';
import PriceArtwork from './PriceArtwork';
import RadioArtwork from './RadioArtwork';

export type SubscriptionPurchaseOptionKind = 'oneTime' | 'recurring';

export interface SubscriptionPurchaseOption {
  id: string;
  kind: SubscriptionPurchaseOptionKind;
  label: string;
  checkoutPrice: string;
  perDeliveryPrice?: string;
  cadence?: string;
  savings?: string;
  terms?: ReactNode;
  disabled?: boolean;
}

export const subscriptionPurchaseOptionFixture: readonly SubscriptionPurchaseOption[] = [
  {
    id: 'one-time',
    kind: 'oneTime',
    label: 'One-time purchase',
    checkoutPrice: '$120.00',
  },
  {
    id: 'plan-monthly',
    kind: 'recurring',
    label: 'Deliver every month',
    checkoutPrice: '$102.00',
    perDeliveryPrice: '$102.00',
    cadence: 'Every month',
    savings: 'Save 15%',
    terms: 'Renews monthly. Pause or cancel before the next renewal.',
  },
  {
    id: 'plan-bimonthly',
    kind: 'recurring',
    label: 'Deliver every two months',
    checkoutPrice: '$108.00',
    perDeliveryPrice: '$108.00',
    cadence: 'Every two months',
    savings: 'Save 10%',
    terms: 'Renews every two months. Pause or cancel before the next renewal.',
  },
];

interface SubscriptionOptionArtworkProps {
  idPrefix: string;
  legend: string;
  description?: string;
  name: string;
  options: readonly SubscriptionPurchaseOption[];
  selectedValue: string;
  oneTimePriceLabel: string;
  checkoutChargeLabel: string;
  perDeliveryLabel: string;
  cadenceLabel: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onValueChange: (value: string) => void;
}

export default function SubscriptionOptionArtwork({
  idPrefix,
  legend,
  description = '',
  name,
  options,
  selectedValue,
  oneTimePriceLabel,
  checkoutChargeLabel,
  perDeliveryLabel,
  cadenceLabel,
  required = true,
  disabled = false,
  className = '',
  onValueChange,
}: SubscriptionOptionArtworkProps) {
  const visibleLegend = legend.trim();
  const visibleDescription = description.trim();
  const groupName = name.trim();
  const visibleOneTimePriceLabel = oneTimePriceLabel.trim();
  const visibleCheckoutChargeLabel = checkoutChargeLabel.trim();
  const visiblePerDeliveryLabel = perDeliveryLabel.trim();
  const visibleCadenceLabel = cadenceLabel.trim();
  const seenIds = new Set<string>();
  const validOptions = options.flatMap((option) => {
    const id = option.id.trim();
    const label = option.label.trim();
    const checkoutPrice = option.checkoutPrice.trim();
    const perDeliveryPrice = option.perDeliveryPrice?.trim() ?? '';
    const cadence = option.cadence?.trim() ?? '';
    if (!id || seenIds.has(id) || !label || !checkoutPrice) return [];
    if (option.kind === 'recurring' && (!perDeliveryPrice || !cadence)) return [];
    seenIds.add(id);
    return [{ ...option, id, label, checkoutPrice, perDeliveryPrice, cadence }];
  });
  const oneTimeCount = validOptions.filter((option) => option.kind === 'oneTime').length;

  if (
    !idPrefix
    || !visibleLegend
    || !groupName
    || !visibleOneTimePriceLabel
    || !visibleCheckoutChargeLabel
    || !visiblePerDeliveryLabel
    || !visibleCadenceLabel
    || validOptions.length < 2
    || oneTimeCount > 1
  ) return null;

  const descriptionId = visibleDescription ? `${idPrefix}-description` : undefined;
  const resolvedSelectedValue = validOptions.some((option) => option.id === selectedValue)
    ? selectedValue
    : '';

  return (
    <fieldset
      className={['fieldset', 'subscription-option', className.trim() || null].filter(Boolean).join(' ')}
      aria-describedby={descriptionId}
      disabled={disabled}
    >
      <legend className="fieldset__legend subscription-option__legend" dir="auto">
        {visibleLegend}
      </legend>
      {visibleDescription && (
        <p
          className="fieldset__description subscription-option__description"
          id={descriptionId}
          dir="auto"
        >
          {visibleDescription}
        </p>
      )}
      <div className="fieldset__content subscription-option__choices">
        {validOptions.map((option) => {
          const checked = resolvedSelectedValue === option.id;
          const summaryId = `${idPrefix}-${option.id}-summary`;
          const recurringId = option.kind === 'recurring'
            ? `${idPrefix}-${option.id}-recurring`
            : undefined;
          const termsId = option.terms ? `${idPrefix}-${option.id}-terms` : undefined;
          const describedBy = [summaryId, recurringId, checked ? termsId : undefined]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              className="subscription-option__item"
              data-kind={option.kind === 'oneTime' ? 'one-time' : 'recurring'}
              key={option.id}
            >
              <div className="subscription-option__header">
                <RadioArtwork
                  id={`${idPrefix}-${option.id}`}
                  className="subscription-option__choice"
                  label={option.label}
                  name={groupName}
                  value={option.id}
                  checked={checked}
                  required={required}
                  disabled={option.disabled === true}
                  describedBy={describedBy || undefined}
                  onCheckedChange={(next) => { if (next) onValueChange(option.id); }}
                />
                <div className="subscription-option__summary" id={summaryId}>
                  {option.savings?.trim() && (
                    <BadgeArtwork
                      className="subscription-option__savings"
                      label={option.savings}
                      variant="success"
                    />
                  )}
                  <span className="subscription-option__price-label" dir="auto">
                    {option.kind === 'oneTime'
                      ? visibleOneTimePriceLabel
                      : visibleCheckoutChargeLabel}:
                  </span>
                  <PriceArtwork
                    className="subscription-option__checkout-price"
                    currentPrice={option.checkoutPrice}
                  />
                </div>
              </div>

              {option.kind === 'recurring' && recurringId && (
                <div className="subscription-option__recurring" id={recurringId}>
                  <span className="subscription-option__price-label" dir="auto">
                    {visiblePerDeliveryLabel}:
                  </span>
                  <PriceArtwork
                    className="subscription-option__delivery-price"
                    currentPrice={option.perDeliveryPrice}
                  />
                  <p className="subscription-option__cadence" dir="auto">
                    <span className="subscription-option__meta-label">{visibleCadenceLabel}: </span>
                    {option.cadence}
                  </p>
                </div>
              )}

              {option.terms && (
                <div className="subscription-option__details">
                  <div className="subscription-option__terms" id={termsId} dir="auto">
                    {option.terms}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
