import { CircleAlert } from 'lucide-react';

interface InlineErrorArtworkProps {
  id?: string;
  message: string;
  icon?: boolean;
  announcement?: 'none' | 'polite' | 'assertive';
}

export default function InlineErrorArtwork({ id, message, icon = true, announcement = 'none' }: InlineErrorArtworkProps) {
  return <div id={id} className="inline-error"
    role={announcement === 'assertive' ? 'alert' : announcement === 'polite' ? 'status' : undefined}
    aria-live={announcement === 'none' ? undefined : announcement}
    aria-atomic={announcement === 'none' ? undefined : true}>
    {icon && <CircleAlert className="inline-error__icon" aria-hidden="true" focusable="false" />}
    <span className="inline-error__message">{message}</span>
  </div>;
}
