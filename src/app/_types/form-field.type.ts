import { authFormSchema, loginFormSchema } from 'app/_lib/formSchema';
import { FieldError, UseFormRegister } from 'react-hook-form';
import z from 'zod';

export type AuthFormSchema = z.infer<typeof authFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export type FormFieldProps = {
  type: string;
  placeholder?: string;
  name: keyof AuthFormSchema | keyof LoginFormSchema;
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<AuthFormSchema> | UseFormRegister<LoginFormSchema>;
};
