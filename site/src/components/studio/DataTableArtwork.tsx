import { Children, type ReactNode } from 'react';

interface DataTableArtworkProps {
  children: ReactNode;
  caption?: string;
  captionHidden?: boolean;
  wrapperLabel?: string;
  wrapperClassName?: string;
  tableClassName?: string;
}

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function DataTableArtwork({
  children,
  caption = '',
  captionHidden = true,
  wrapperLabel = '',
  wrapperClassName,
  tableClassName,
}: DataTableArtworkProps) {
  const normalizedCaption = caption.trim();
  const normalizedWrapperLabel = wrapperLabel.trim();

  if (Children.count(children) === 0) return null;

  return (
    <div
      className={classes('table-wrapper', wrapperClassName)}
      tabIndex={0}
      aria-label={normalizedWrapperLabel || (
        normalizedCaption ? `${normalizedCaption} table scroll area` : 'Data table scroll area'
      )}
    >
      <table className={classes('table', tableClassName)}>
        {normalizedCaption && (
          <caption className={captionHidden ? 'visually-hidden' : undefined}>
            {normalizedCaption}
          </caption>
        )}
        {children}
      </table>
    </div>
  );
}
