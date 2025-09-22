'use client';

import LinkTemplate from './link-template/LinkTemplate';
import { useAuth } from '../../_context/AuthContext';
import LoadingSkeleton from '../loading-skeleton/LoadingSkeleton';
import { useTranslations } from 'next-intl';

const AuthLinks = () => {
  const { user, loading, logout } = useAuth();
  const t = useTranslations('auth');

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
          <LinkTemplate href="/" onClick={logout}>
            {t('signOut')}
          </LinkTemplate>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
