import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
  type ReactNode,
} from 'react';

type InitialFocus = 'dialog' | 'title' | 'close' | 'first-action';

interface ModalArtworkProps {
  id: string;
  title: string;
  open: boolean;
  dismissLabel: string;
  triggerLabel: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  closeIcon?: ReactNode;
  descriptionId?: string;
  actions?: ReactNode;
  triggerClassName?: string;
  triggerDisabled?: boolean;
  overlayClassName?: string;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  closeClassName?: string;
  bodyClassName?: string;
  initialFocus?: InitialFocus;
  dismissOnBackdrop?: boolean;
  showTrigger?: boolean;
  returnFocusRef?: RefObject<HTMLElement | null>;
  onDialogKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

function classes(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function ModalArtwork({
  id,
  title,
  open,
  dismissLabel,
  triggerLabel,
  children,
  onOpenChange,
  closeIcon,
  descriptionId,
  actions,
  triggerClassName,
  triggerDisabled = false,
  overlayClassName,
  className,
  headerClassName,
  titleClassName,
  closeClassName,
  bodyClassName,
  initialFocus = 'close',
  dismissOnBackdrop = true,
  showTrigger = true,
  returnFocusRef,
  onDialogKeyDown,
}: ModalArtworkProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const capturedReturnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const titleId = `${id}-title`;

  useEffect(() => {
    if (open) {
      if (!wasOpenRef.current) {
        const activeElement = document.activeElement;
        capturedReturnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body
          ? activeElement
          : null;
      }
      wasOpenRef.current = true;
      const frame = requestAnimationFrame(() => {
        const dialog = dialogRef.current;
        const firstAction = dialog?.querySelector<HTMLElement>('.modal__footer button:not([disabled])');
        const target = initialFocus === 'title'
          ? titleRef.current
          : initialFocus === 'close'
            ? closeRef.current
            : initialFocus === 'first-action'
              ? firstAction
              : dialog;
        (target ?? closeRef.current ?? dialog)?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!wasOpenRef.current) return undefined;
    wasOpenRef.current = false;
    const capturedReturnTarget = capturedReturnFocusRef.current;
    capturedReturnFocusRef.current = null;
    const frame = requestAnimationFrame(() => {
      const explicitReturnTarget = returnFocusRef?.current;
      const returnTarget = explicitReturnTarget?.isConnected
        ? explicitReturnTarget
        : capturedReturnTarget?.isConnected
          ? capturedReturnTarget
          : triggerRef.current;
      returnTarget?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [initialFocus, open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onOpenChange(false);
      return;
    }

    onDialogKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key !== 'Tab') return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>([
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(','))).filter((element) => (
      !element.hidden && element.getAttribute('aria-hidden') !== 'true'
    ));

    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;
    const activeIndex = activeElement instanceof HTMLElement
      ? focusable.indexOf(activeElement)
      : -1;
    if (event.shiftKey && activeIndex <= 0) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeIndex === -1 || activeElement === last)) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (dismissOnBackdrop && event.target === event.currentTarget) onOpenChange(false);
  }

  if (!open) {
    if (!showTrigger) return null;
    return (
      <button
        ref={triggerRef}
        className={classes('btn', triggerClassName)}
        type="button"
        aria-haspopup="dialog"
        aria-controls={id}
        aria-expanded="false"
        disabled={triggerDisabled}
        onClick={() => onOpenChange(true)}
      >
        {triggerLabel}
      </button>
    );
  }

  return (
    <div
      className={classes('modal-overlay', overlayClassName)}
      aria-hidden="false"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className={classes('modal', className)}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className={classes('modal__header', headerClassName)}>
          <h2
            ref={titleRef}
            className={classes('modal__title', titleClassName)}
            id={titleId}
            tabIndex={initialFocus === 'title' ? -1 : undefined}
            dir="auto"
          >
            {title}
          </h2>
          <button
            ref={closeRef}
            className={classes('close-btn', 'modal__close', closeClassName)}
            type="button"
            aria-label={dismissLabel}
            onClick={() => onOpenChange(false)}
          >
            {closeIcon}
          </button>
        </div>
        <div className={classes('modal__body', bodyClassName)}>{children}</div>
        {actions && <div className="modal__footer">{actions}</div>}
      </div>
    </div>
  );
}
