import type { MouseEvent, ReactNode } from 'react';

export type AddressBookActionVariant = 'link' | 'outline' | 'secondary' | 'danger';
export type AddressBookActionSize = 'sm' | 'default';

export interface AddressBookAction {
  id: string;
  label: string;
  accessibleLabel: string;
  variant?: AddressBookActionVariant;
  size?: AddressBookActionSize;
}

export interface AddressBookRecord {
  id: string;
  recipient: string;
  lines: readonly string[];
  isDefault?: boolean;
  defaultLabel?: string;
  actions?: readonly AddressBookAction[];
}

interface AddressBookArtworkProps {
  records: readonly AddressBookRecord[];
  newAddressLabel?: string;
  newAddressIcon?: ReactNode;
  className?: string;
  onAction?: (
    record: AddressBookRecord,
    action: AddressBookAction,
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
  onNewAddress?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const actionVariants = new Set<AddressBookActionVariant>([
  'link',
  'outline',
  'secondary',
  'danger',
]);

export default function AddressBookArtwork({
  records,
  newAddressLabel = '',
  newAddressIcon,
  className = '',
  onAction,
  onNewAddress,
}: AddressBookArtworkProps) {
  const visibleNewAddressLabel = newAddressLabel.trim();
  const normalizedRecords = records.map((record) => ({
    ...record,
    id: record.id.trim(),
    recipient: record.recipient.trim(),
    lines: record.lines.map((line) => line.trim()).filter(Boolean),
    defaultLabel: record.defaultLabel?.trim(),
    actions: record.actions?.map((action) => ({
      ...action,
      id: action.id.trim(),
      label: action.label.trim(),
      accessibleLabel: action.accessibleLabel.trim(),
      variant: action.variant ?? 'link',
      size: action.size ?? 'sm',
    })) ?? [],
  }));
  const recordIds = new Set(normalizedRecords.map(({ id }) => id));
  const hasCompleteRecords = normalizedRecords.length > 0
    && recordIds.size === normalizedRecords.length
    && normalizedRecords.filter(({ isDefault }) => isDefault).length <= 1
    && normalizedRecords.every((record) => {
      const actionIds = new Set(record.actions.map(({ id }) => id));
      return Boolean(record.id && record.recipient && record.lines.length)
        && (!record.isDefault || Boolean(record.defaultLabel))
        && actionIds.size === record.actions.length
        && record.actions.every((action) => (
          Boolean(action.id && action.label && action.accessibleLabel)
          && action.accessibleLabel.toLocaleLowerCase().includes(action.label.toLocaleLowerCase())
          && actionVariants.has(action.variant)
          && (action.size === 'sm' || action.size === 'default')
        ));
    });

  if (!hasCompleteRecords) return null;

  return (
    <ul className={['address-grid', className].filter(Boolean).join(' ')}>
      {normalizedRecords.map((record) => (
        <li className="address-card" key={record.id}>
          <div className="address-card__body">
            {record.isDefault && (
              <span className="badge address-card__default-tag">{record.defaultLabel}</span>
            )}
            <p className="address-card__name" dir="auto">{record.recipient}</p>
            <p className="address-card__text">
              {record.lines.map((line, index) => (
                <span dir="auto" key={`${record.id}-line-${index}`}>{line}</span>
              ))}
            </p>
          </div>
          {record.actions.length > 0 && (
            <div className="address-card__actions">
              {record.actions.map((action) => (
                <button
                  className={[
                    'btn',
                    `btn--${action.variant}`,
                    action.size === 'sm' ? 'btn--sm' : '',
                  ].filter(Boolean).join(' ')}
                  type="button"
                  aria-label={action.accessibleLabel}
                  onClick={(event) => onAction?.(record, action, event)}
                  key={action.id}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
      {visibleNewAddressLabel && (
        <li className="address-card address-card--new">
          <button
            className="btn btn--outline address-card__new-action"
            type="button"
            onClick={onNewAddress}
          >
            {newAddressIcon}
            <span>{visibleNewAddressLabel}</span>
          </button>
        </li>
      )}
    </ul>
  );
}
