'use client';

import { useForm } from 'react-hook-form';
import { authFormSchema } from 'app/_lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'i18n/navigation';
import { useLocale } from 'next-intl';
import FormField from '@/_components/form-field/FormField';
import { AuthFormSchema } from '@/_types/form-field.type';
import { FirebaseError } from 'firebase/app';
import FormButton from '@/_components/form-field/FormButton';

export default function Register() {
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
  } = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: AuthFormSchema) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', { message: "Passwords don't match" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', { message: 'The user with this email already exists' });
          return;
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-lg m-auto space-y-6 bg-[var(--bg-rest)] p-6 rounded-lg shadow-2xl border-2 border-gray-500"
    >
      <FormField type="email" name="email" register={register} label="Email" error={errors.email} />
      <FormField
        type="password"
        name="password"
        register={register}
        label="Password"
        error={errors.password}
      />
      <FormField
        type="password"
        name="confirmPassword"
        register={register}
        label="Confirm password"
        error={errors.confirmPassword}
      />
      <FormButton isValid={isValid} label="Sign up" />
    </form>
  );
}
