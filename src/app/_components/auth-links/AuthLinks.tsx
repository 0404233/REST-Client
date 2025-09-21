'use client';

import LinkTemplate from './link-template/LinkTemplate';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import LoadingSkeleton from '../loading-skeleton/LoadingSkeleton';
import { useTranslations } from 'next-intl';

const AuthLinks = () => {
  const { user, loading } = useAuth();
  const t = useTranslations('auth');

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
          <LinkTemplate href="/login">{t('signIn')}</LinkTemplate>
          <LinkTemplate href="/register">{t('signUp')}</LinkTemplate>
        </>
      )}

      {user && (
        <>
          <LinkTemplate href="/">{t('main')}</LinkTemplate>
          <LinkTemplate href="/" onClick={onSignOut}>
            {t('signOut')}
          </LinkTemplate>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
