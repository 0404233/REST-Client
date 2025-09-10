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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-0">
        {label} <span className="text-xl text-red-500">*</span>
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder ?? ''}
        className="px-4 py-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <span className="text-red-600 block text-sm absolute">{error.message}</span>}
    </div>
  );
}
