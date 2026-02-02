/**
 * Reusable Form Field Components
 *
 * Provides accessible, styled form inputs with integrated error display.
 * Use with useFormValidation hook for complete form handling.
 */

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  hint?: string;
}

type InputFieldProps = BaseFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
type TextareaFieldProps = BaseFieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;
type SelectFieldProps = BaseFieldProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  options: { value: string; label: string }[];
  placeholder?: string;
};

const baseInputStyles = "w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors";
const errorStyles = "border-red-300 focus:border-red-500";
const normalStyles = "border-gray-200 focus:border-amber-500";

export const FormField = forwardRef<HTMLInputElement, InputFieldProps>(
  function FormField({ label, error, touched, required, hint, ...props }, ref) {
    const showError = touched && error;
    const inputId = props.id || props.name;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`${baseInputStyles} ${showError ? errorStyles : normalStyles}`}
          aria-invalid={showError ? "true" : undefined}
          aria-describedby={showError ? errorId : hint ? hintId : undefined}
          {...props}
        />
        {hint && !showError && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {showError && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField({ label, error, touched, required, hint, rows = 4, ...props }, ref) {
    const showError = touched && error;
    const inputId = props.id || props.name;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`${baseInputStyles} resize-none ${showError ? errorStyles : normalStyles}`}
          aria-invalid={showError ? "true" : undefined}
          aria-describedby={showError ? errorId : hint ? hintId : undefined}
          {...props}
        />
        {hint && !showError && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {showError && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField({ label, error, touched, required, hint, options, placeholder, ...props }, ref) {
    const showError = touched && error;
    const inputId = props.id || props.name;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          ref={ref}
          id={inputId}
          className={`${baseInputStyles} ${showError ? errorStyles : normalStyles}`}
          aria-invalid={showError ? "true" : undefined}
          aria-describedby={showError ? errorId : hint ? hintId : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hint && !showError && (
          <p id={hintId} className="text-sm text-gray-500">
            {hint}
          </p>
        )}
        {showError && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label: string;
  description?: string;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  function CheckboxField({ label, description, ...props }, ref) {
    const inputId = props.id || props.name;

    return (
      <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
          {...props}
        />
        <div>
          <span className="font-medium text-gray-900">{label}</span>
          {description && (
            <span className="text-sm text-gray-600 block">{description}</span>
          )}
        </div>
      </label>
    );
  }
);

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string; description?: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  touched,
  required,
}: RadioGroupProps) {
  const showError = touched && error;
  const errorId = `${name}-error`;

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      <div className="space-y-2" role="radiogroup" aria-describedby={showError ? errorId : undefined}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
              value === opt.value
                ? "border-amber-500 bg-amber-50"
                : "border-gray-200 hover:border-amber-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="mt-1 w-4 h-4 text-amber-600 focus:ring-amber-500"
            />
            <div>
              <span className="font-medium text-gray-900">{opt.label}</span>
              {opt.description && (
                <span className="text-sm text-gray-600 block">{opt.description}</span>
              )}
            </div>
          </label>
        ))}
      </div>
      {showError && (
        <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface FormErrorProps {
  error: string | null;
  onDismiss?: () => void;
}

export function FormError({ error, onDismiss }: FormErrorProps) {
  if (!error) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl" role="alert">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-red-700">{error}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700"
            aria-label="Dismiss error"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

interface FormSuccessProps {
  message: string;
  onDismiss?: () => void;
}

export function FormSuccess({ message, onDismiss }: FormSuccessProps) {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-xl" role="status">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-green-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-green-500 hover:text-green-700"
            aria-label="Dismiss message"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  isSubmitting?: boolean;
  isValid?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export function SubmitButton({
  isSubmitting,
  isValid = true,
  children,
  loadingText = "Submitting...",
  className,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || !isValid}
      className={className || "w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-colors"}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
