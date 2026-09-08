import type {
  ChangeEventHandler,
  HTMLAttributes,
  ReactNode,
} from 'react';
import type { InputArtworkVariant } from './InputArtwork';

interface FileUploadArtworkProps {
  id: string;
  label: string;
  emptyStatus: string;
  hint?: string;
  name?: string;
  accept?: string;
  capture?: 'user' | 'environment';
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  variant?: InputArtworkVariant;
  selectedFileNames?: string;
  describedBy?: string;
  icon?: ReactNode;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onDragEnter?: HTMLAttributes<HTMLLabelElement>['onDragEnter'];
  onDragOver?: HTMLAttributes<HTMLLabelElement>['onDragOver'];
  onDragLeave?: HTMLAttributes<HTMLLabelElement>['onDragLeave'];
  onDrop?: HTMLAttributes<HTMLLabelElement>['onDrop'];
}

export default function FileUploadArtwork({
  id,
  label,
  emptyStatus,
  hint = '',
  name = '',
  accept = '',
  capture,
  multiple = false,
  required = false,
  disabled = false,
  invalid = false,
  variant = 'default',
  selectedFileNames = '',
  describedBy = '',
  icon,
  className = '',
  onChange,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}: FileUploadArtworkProps) {
  const visibleLabel = label.trim();
  const visibleHint = hint.trim();
  const visibleEmptyStatus = emptyStatus.trim();
  const visibleSelection = selectedFileNames.trim();
  if (!id.trim() || !visibleLabel || !visibleEmptyStatus) return null;

  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;
  const statusId = `${id}-status`;
  const describedByIds = [visibleHint ? hintId : '', describedBy.trim()]
    .filter(Boolean)
    .join(' ') || undefined;
  const rootClassName = [
    'file-upload',
    variant === 'default' ? '' : `file-upload--${variant}`,
    visibleSelection ? 'file-upload--selected' : '',
    className.trim(),
  ].filter(Boolean).join(' ');

  return (
    <label
      className={rootClassName}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        className="file-upload__input"
        id={id}
        type="file"
        name={name || undefined}
        accept={accept || undefined}
        capture={capture}
        multiple={multiple}
        required={required}
        disabled={disabled}
        aria-invalid={invalid || variant === 'error' || undefined}
        aria-labelledby={labelId}
        aria-describedby={describedByIds}
        onChange={onChange}
      />
      {icon}
      <span
        className={`file-upload__text${required ? ' file-upload__text--required' : ''}`}
        id={labelId}
      >
        {visibleLabel}
      </span>
      {visibleHint && (
        <span className="file-upload__hint" id={hintId}>{visibleHint}</span>
      )}
      <span
        className="file-upload__status"
        id={statusId}
        role="status"
        data-empty-label={visibleEmptyStatus}
      >
        {visibleSelection || visibleEmptyStatus}
      </span>
    </label>
  );
}
