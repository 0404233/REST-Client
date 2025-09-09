'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { formSchema } from 'app/_lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase/firebase';

type FormSchema = z.infer<typeof formSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormSchema) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', { message: "Passwords don't match" });
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-lg m-auto space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-0">
          Email <span className="text-xl text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          className="px-4 py-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-red-600 block text-sm absolute">{errors.email.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-0">
          Password <span className="text-xl text-red-500">*</span>
        </label>
        <input
          {...register('password')}
          type="password"
          className="px-4 py-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <span className="text-red-600 block text-sm absolute">{errors.password.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="conf-password" className="block text-sm font-medium text-gray-700 mb-0">
          Confirm password <span className="text-xl text-red-500">*</span>
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="px-4 py-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-600 block text-sm absolute">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <button
        disabled={!isValid}
        className="px-2 py-1.5 border-2 text-white border-gray-700 rounded-md cursor-pointer bg-blue-500"
      >
        Sign up
      </button>
    </form>
  );
}
