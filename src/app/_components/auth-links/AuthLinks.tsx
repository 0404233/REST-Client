'use client';

import LinkTemplate from './link-template/LinkTemplate';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import LoadingSkeleton from '../loading-skeleton/LoadingSkeleton';

const AuthLinks = () => {
  const { user, loading } = useAuth();

  const onSignOut = () => {
    signOut(auth);
  };

  if (loading) {
    return <LoadingSkeleton w={6} h={6} b={2} />;
  }

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
          <LinkTemplate href={'/'}>Main</LinkTemplate>
          <LinkTemplate href={'/'} onClick={onSignOut}>
            Sign Out
          </LinkTemplate>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
