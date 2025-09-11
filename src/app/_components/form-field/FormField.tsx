import { FormFieldProps } from '@/_types/form-field.type';

export default function FormField({
  type,
  name,
  label,
  register,
  placeholder,
  error,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[var(--foreground)] mb-0">
        {label} <span className="text-xl text-red-500">*</span>
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        autoComplete="on"
        placeholder={placeholder ?? ''}
        className="px-4 py-2 w-full cursor-pointer border border-[var(--border-url)] rounded-md 
                   focus:border-[var(--border-url-focus)] focus:outline-none"
      />
      {error && <span className="text-red-600 block text-sm absolute">{error.message}</span>}
    </div>
  );
}
