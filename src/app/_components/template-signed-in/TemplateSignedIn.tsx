import { User } from 'firebase/auth';
import ClientTools from './client-tools/ClientTools';
import React from 'react';

type TemplateNotSignedInProps = {
  user: User | null;
  children?: React.ReactNode;
};

const TemplateSignedIn = ({ user, children }: TemplateNotSignedInProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl italic">Welcome Back, {user ? user.email : 'User'}!</h1>
      <ClientTools />
      {children}
    </div>
  );
};

export default TemplateSignedIn;
