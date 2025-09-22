'use client';

import { useTranslations } from 'next-intl';
import { Link } from 'i18n/navigation';

const EmptyHistoryRequests = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4">
      <h1>{t('noRequests')}</h1>
      <Link
        href="/rest"
        className="flex flex-col gap-4 transition-text duration-200 hover:text-[#f02eaa]"
      >
        {t('restClient')}
      </Link>
    </div>
  );
};

export default EmptyHistoryRequests;
