'use client';

import { useAuth } from '@/context/AuthContext';
import ClientTools from './client-tools/ClientTools';

const TemplateSignedIn = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl italic">Welcome Back, {user ? user.email : 'User'}!</h1>
      <ClientTools />
    </div>
  );
};

export default TemplateSignedIn;
