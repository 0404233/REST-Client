'use client';

import { useTranslations } from 'next-intl';

const Button = () => {
  const t = useTranslations('common');

  return (
    <button
      className="text-xl duration-200 hover:text-[#f02eaa] cursor-pointer"
      aria-label={t('submit')}
    >
      {t('submit')}
    </button>
  );
};

export default Button;
