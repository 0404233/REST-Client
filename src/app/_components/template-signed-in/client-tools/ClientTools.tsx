'use client';

import { Link } from 'i18n/navigation';
import { useTranslations } from 'next-intl';

const ClientTools = () => {
  const t = useTranslations();

  return (
    <div className="flex gap-4">
      <Link
        href="/rest"
        className="border-1 border-transparent duration-300 hover:border-b-[var(--border-b)]"
      >
        {t('restClient')}
      </Link>
      <Link
        href="/history"
        className="border-1 border-transparent duration-300 hover:border-b-[var(--border-b)]"
      >
        {t('history')}
      </Link>
      <Link
        href="/variables"
        className="border-1 border-transparent duration-300 hover:border-b-[var(--border-b)]"
      >
        {t('variables')}
      </Link>
    </div>
  );
};

export default ClientTools;
