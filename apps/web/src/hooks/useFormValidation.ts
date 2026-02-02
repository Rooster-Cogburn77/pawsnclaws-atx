/**
 * Form Validation Hook
 *
 * Provides real-time form validation with Zod schemas.
 * Handles field-level and form-level validation, touched state, and submission.
 */

import { useState, useCallback, useMemo } from "react";
import { z } from "zod";

interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  initialValues: T;
  onSubmit: (data: T) => Promise<void>;
}

interface UseFormValidationReturn<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  submitError: string | null;
  submitSuccess: boolean;

  // Field handlers
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setValues: (values: Partial<T>) => void;
  setTouched: (field: keyof T) => void;
  getFieldError: (field: keyof T) => string | undefined;
  hasFieldError: (field: keyof T) => boolean;
  isFieldTouched: (field: keyof T) => boolean;

  // Form handlers
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  clearSubmitError: () => void;
}

export function useFormValidation<T extends Record<string, unknown>>({
  schema,
  initialValues,
  onSubmit,
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (field: keyof T, value: unknown): string | undefined => {
      // Create a partial object with just this field to validate
      const partialData = { [field]: value };

      // Try to pick the field schema if possible
      try {
        const zodObject = schema as z.ZodObject<z.ZodRawShape>;
        const fieldSchema = zodObject.shape[field as string] as z.ZodTypeAny | undefined;
        if (fieldSchema) {
          const result = fieldSchema.safeParse(value);
          if (!result.success) {
            return result.error.issues[0]?.message;
          }
        }
      } catch {
        // If we can't pick the field, validate the whole object
        const result = schema.safeParse({ ...values, ...partialData });
        if (!result.success) {
          const fieldError = result.error.issues.find(
            (e) => e.path[0] === field
          );
          return fieldError?.message;
        }
      }

      return undefined;
    },
    [schema, values]
  );

  // Validate all fields
  const validateAll = useCallback((): Record<string, string> => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {};
    }

    const newErrors: Record<string, string> = {};
    for (const error of result.error.issues) {
      const path = error.path.join(".");
      if (!newErrors[path]) {
        newErrors[path] = error.message;
      }
    }

    return newErrors;
  }, [schema, values]);

  // Check if form is valid
  const isValid = useMemo(() => {
    const result = schema.safeParse(values);
    return result.success;
  }, [schema, values]);

  // Set a single value
  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValuesState((prev) => ({ ...prev, [field]: value }));

      // Validate on change if field was touched
      if (touched[field as string]) {
        const error = validateField(field, value);
        setErrors((prev) => {
          if (error) {
            return { ...prev, [field]: error };
          }
          const { [field as string]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [touched, validateField]
  );

  // Set multiple values
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }));
  }, []);

  // Mark a field as touched
  const setTouched = useCallback(
    (field: keyof T) => {
      setTouchedState((prev) => ({ ...prev, [field]: true }));

      // Validate on blur
      const error = validateField(field, values[field]);
      setErrors((prev) => {
        if (error) {
          return { ...prev, [field]: error };
        }
        const { [field as string]: _, ...rest } = prev;
        return rest;
      });
    },
    [validateField, values]
  );

  // Get error for a field (only if touched)
  const getFieldError = useCallback(
    (field: keyof T): string | undefined => {
      if (!touched[field as string]) return undefined;
      return errors[field as string];
    },
    [errors, touched]
  );

  // Check if field has error (only if touched)
  const hasFieldError = useCallback(
    (field: keyof T): boolean => {
      if (!touched[field as string]) return false;
      return !!errors[field as string];
    },
    [errors, touched]
  );

  // Check if field is touched
  const isFieldTouched = useCallback(
    (field: keyof T): boolean => {
      return !!touched[field as string];
    },
    [touched]
  );

  // Handle input change
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;

      let parsedValue: unknown = value;

      // Handle different input types
      if (type === "number") {
        parsedValue = value === "" ? undefined : Number(value);
      } else if (type === "checkbox") {
        parsedValue = (e.target as HTMLInputElement).checked;
      }

      setValue(name as keyof T, parsedValue as T[keyof T]);
    },
    [setValue]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name } = e.target;
      setTouched(name as keyof T);
    },
    [setTouched]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      setSubmitSuccess(false);

      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      for (const key of Object.keys(values)) {
        allTouched[key] = true;
      }
      setTouchedState(allTouched);

      // Validate all fields
      const validationErrors = validateAll();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      // Parse and submit
      const result = schema.safeParse(values);
      if (!result.success) {
        setSubmitError("Please fix the errors above");
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(result.data);
        setSubmitSuccess(true);
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateAll, schema, onSubmit]
  );

  // Reset the form
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrors({});
    setTouchedState({});
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, [initialValues]);

  // Clear submit error
  const clearSubmitError = useCallback(() => {
    setSubmitError(null);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    submitError,
    submitSuccess,
    setValue,
    setValues,
    setTouched,
    getFieldError,
    hasFieldError,
    isFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    clearSubmitError,
  };
}
