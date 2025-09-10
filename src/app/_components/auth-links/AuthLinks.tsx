'use client';

import LinkTemplate from './link-template/LinkTemplate';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/firebase';

const AuthLinks = () => {
  const { user } = useAuth();

  const onSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex gap-4 items-center">
      {!user && (
        <>
          <LinkTemplate href={'/login'}>Sign in</LinkTemplate>
          <LinkTemplate href={'/register'}>Sign up</LinkTemplate>
        </>
      )}

      {user && (
        <>
          <LinkTemplate href={'/'} onClick={onSignOut}>
            Sign Out
          </LinkTemplate>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
