import React from 'react';
import { FormFieldProps } from '@/_types/form-field.type';
import type { FieldValues } from 'react-hook-form';

export default function FormField<T extends FieldValues>({
  type,
  name,
  label,
  register,
  placeholder,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="relative mb-4">
      <label
        htmlFor={String(name)}
        className="block text-sm font-bold text-[var(--foreground)] mb-1"
      >
        {label} <span className="text-xl text-red-500">*</span>
      </label>

      <input
        {...register(name)}
        id={String(name)}
        type={type}
        autoComplete="on"
        placeholder={placeholder ?? ''}
        className="px-4 py-2 w-full border border-[var(--border-url)] rounded-md
                   focus:border-[var(--border-url-focus)] focus:outline-none"
      />

      {error && (
        <span className="text-red-600 block text-sm absolute top-full mt-1">{error.message}</span>
      )}
    </div>
  );
}
