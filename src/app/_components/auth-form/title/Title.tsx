'use client';

import { useTranslations } from 'next-intl';

type TitleProps = {
  isSignIn: boolean;
};

const Title = ({ isSignIn }: TitleProps) => {
  const t = useTranslations('auth');

  return (
    <h1 className="text-2xl">{isSignIn ? t('signInToRestClient') : t('createYourAccount')}</h1>
  );
};

export default Title;
