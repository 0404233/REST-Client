'use client';

import { useForm } from 'react-hook-form';
import { loginFormSchema } from 'app/_lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'i18n/navigation';
import { useLocale } from 'next-intl';
import FormField from '@/_components/form-field/FormField';
import { LoginFormSchema } from '@/_types/form-field.type';
import { FirebaseError } from 'firebase/app';
import FormButton from '@/_components/form-field/FormButton';

export default function Login() {
  const { user } = useAuth();
  const locale = useLocale();

  useEffect(() => {
    if (user) redirect({ href: '/', locale });
  }, [user, locale]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormSchema) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          setError('password', { message: 'Invalid credential' });
          return;
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-lg m-auto space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <FormField type="email" name="email" register={register} label="Email" error={errors.email} />
      <FormField
        type="password"
        name="password"
        register={register}
        label="Password"
        error={errors.password}
      />
      <FormButton isValid={isValid} label="Sign in" />
    </form>
  );
}
