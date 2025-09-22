import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.email('Incorrect email'),
  password: z.string().min(8, { message: 'The password is too short' }),
  confirmPassword: z.string(),
});

export const loginFormSchema = z.object({
  email: z.email('Incorrect email'),
  password: z.string().min(1, { message: 'Password is required' }),
});
