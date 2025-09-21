'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="container mx-auto w-full h-dvh flex flex-col justify-center items-center gap-4">
      <h2 className="text-5xl text-rose-900">{t('pageNotFound')}</h2>
      <p className="text-xl italic">{t('resourceNotFound')}</p>
      <Link
        href="/"
        className="text-2xl text-amber-400 cursor-pointer hover:text-yellow-200 transition"
      >
        {t('returnHome')}
      </Link>
    </div>
  );
}
