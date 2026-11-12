import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

/**
 * Labelled form controls with accessible error text (STYLE.md §6 Forms).
 * The label is always visible; errors are linked via aria-describedby.
 */
interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function FieldShell({ id, label, required, hint, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const controlClasses =
  'block w-full rounded-lg border bg-card px-3.5 text-base text-ink placeholder:text-ink-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-0';

function controlState(error?: string): string {
  return error ? 'border-danger' : 'border-line hover:border-ink-muted/50';
}

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

interface BaseFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, BaseFieldProps & InputHTMLAttributes<HTMLInputElement>>(
  function TextField({ id, label, hint, error, required, className = '', ...rest }, ref) {
    return (
      <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${controlClasses} h-11 ${controlState(error)} ${className}`}
          {...rest}
        />
      </FieldShell>
    );
  },
);

type SelectFieldProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
    options: readonly string[];
    placeholder: string;
  };

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { id, label, hint, error, required, options, placeholder, className = '', ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <select
        ref={ref}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlClasses} h-11 ${controlState(error)} ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});

export const TextareaField = forwardRef<HTMLTextAreaElement, BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextareaField({ id, label, hint, error, required, className = '', ...rest }, ref) {
    return (
      <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${controlClasses} min-h-[120px] py-2.5 ${controlState(error)} ${className}`}
          {...rest}
        />
      </FieldShell>
    );
  },
);
