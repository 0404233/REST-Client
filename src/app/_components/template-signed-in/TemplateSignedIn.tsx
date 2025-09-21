import { User } from 'firebase/auth';
import ClientTools from './client-tools/ClientTools';
import React from 'react';
import { useTranslations } from 'next-intl';

type TemplateNotSignedInProps = {
  user: User | null;
  children?: React.ReactNode;
};

const TemplateSignedIn = ({ user, children }: TemplateNotSignedInProps) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-3xl italic">{t('welcomeBack')}, {user ? user.email : t('user')}!</h1>
      <ClientTools />
      {children}
    </div>
  );
};

export default TemplateSignedIn;
