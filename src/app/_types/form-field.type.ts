import { authFormSchema, loginFormSchema } from 'app/_lib/formSchema';
import z from 'zod';
import { Path, UseFormRegister, FieldError, FieldValues } from 'react-hook-form';

export type AuthFormSchema = z.infer<typeof authFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder?: string;
  name: Path<T>;
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
};
