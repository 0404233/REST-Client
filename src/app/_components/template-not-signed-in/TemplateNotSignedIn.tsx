'use client';

import { useTranslations } from 'next-intl';
import AuthLinks from '../auth-links/AuthLinks';

const TemplateNotSignedIn = () => {
  const t = useTranslations('common');

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl">{t('welcome')}</h1>
      <AuthLinks />
    </div>
  );
};

export default TemplateNotSignedIn;
