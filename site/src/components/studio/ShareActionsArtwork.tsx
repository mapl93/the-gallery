import type { MouseEvent, ReactNode } from 'react';
import { Copy, Mail, Send, Share2 } from 'lucide-react';

export const shareActionIds = [
  'native',
  'copy',
  'email',
  'whatsapp',
  'facebook',
  'x',
  'pinterest',
  'linkedin',
  'telegram',
  'reddit',
  'instagram',
  'threads',
  'tiktok',
] as const;

export type ShareActionId = (typeof shareActionIds)[number] | (string & {});

export interface ShareActionArtworkItem {
  id: ShareActionId;
  label: string;
  kind: 'button' | 'link';
  href?: string;
  icon?: ReactNode;
}

interface ShareActionsArtworkProps {
  label: string;
  actions: readonly ShareActionArtworkItem[];
  variant?: 'inline' | 'stacked' | string;
  className?: string;
  onActionRequest?: (
    event: MouseEvent<HTMLButtonElement>,
    action: ShareActionArtworkItem,
  ) => void;
  onNavigate?: (
    event: MouseEvent<HTMLAnchorElement>,
    action: ShareActionArtworkItem,
  ) => void;
}

interface ShareActionsFixtureOptions {
  onActionRequest?: ShareActionsArtworkProps['onActionRequest'];
  onNavigate?: ShareActionsArtworkProps['onNavigate'];
}

function normalizeActions(actions: readonly ShareActionArtworkItem[]) {
  const seen = new Set<string>();

  return actions.flatMap((action) => {
    const id = String(action.id).trim();
    const label = action.label.trim();
    const href = action.href?.trim();
    if (!id || !label || seen.has(id)) return [];
    if (action.kind === 'link' && !href) return [];
    seen.add(id);
    return [{ ...action, id, label, href }];
  });
}

export function buildShareActionsFixture(): ShareActionArtworkItem[] {
  return [
    {
      id: 'native',
      label: 'System share',
      kind: 'button',
      icon: <Share2 className="btn__icon btn__icon--leading" aria-hidden="true" />,
    },
    {
      id: 'copy',
      label: 'Copy link',
      kind: 'button',
      icon: <Copy className="btn__icon btn__icon--leading" aria-hidden="true" />,
    },
    {
      id: 'email',
      label: 'Email',
      kind: 'link',
      href: 'mailto:studio@example.com?subject=Studio%20note&body=https%3A%2F%2Fexample.com%2Fstudio-note',
      icon: <Mail className="btn__icon btn__icon--leading" aria-hidden="true" />,
    },
    {
      id: 'send-to-studio',
      label: 'Send to studio',
      kind: 'link',
      href: '#send-to-studio',
      icon: <Send className="btn__icon btn__icon--leading" aria-hidden="true" />,
    },
  ];
}

export default function ShareActionsArtwork({
  label,
  actions,
  variant = 'inline',
  className = '',
  onActionRequest,
  onNavigate,
}: ShareActionsArtworkProps) {
  const groupLabel = label.trim();
  const visibleActions = normalizeActions(actions);
  if (!groupLabel || visibleActions.length === 0) return null;

  const layout = variant === 'stacked' ? 'stacked' : 'inline';

  return (
    <div
      className={[
        'share-buttons',
        `share-buttons--${layout}`,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
      role="group"
      aria-label={groupLabel}
    >
      {visibleActions.map((action) => {
        const content = (
          <>
            {action.icon}
            <span dir="auto">{action.label}</span>
          </>
        );

        if (action.kind === 'link') {
          return (
            <a
              className="btn btn--outline btn--sm share-buttons__action"
              href={action.href}
              key={action.id}
              onClick={(event) => onNavigate?.(event, action)}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            className="btn btn--outline btn--sm share-buttons__action"
            type="button"
            key={action.id}
            onClick={(event) => onActionRequest?.(event, action)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

export function ShareActionsFixture({
  onActionRequest,
  onNavigate,
}: ShareActionsFixtureOptions) {
  return (
    <ShareActionsArtwork
      label="Share this studio note"
      actions={buildShareActionsFixture()}
      onActionRequest={onActionRequest}
      onNavigate={onNavigate}
    />
  );
}
