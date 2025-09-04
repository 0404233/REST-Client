'use client';

import AuthLinks from '@/_components/auth-links/AuthLinks';
import AuthForm from '@/_components/auth-form/AuthForm';
import { useState } from 'react';

const Account = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  return (
    <section className="flex flex-col items-center gap-4 p-4 border-1 rounded-xl">
      <AuthForm isSignIn={isSignIn} />
      <AuthLinks />
    </section>
  );
};

export default Account;
