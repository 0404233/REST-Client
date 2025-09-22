'use client';

import { usePathname, useRouter } from 'next/navigation';
import ImageTemplate from './image-template/ImageTemplate';

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split('/')[1] || 'en';

  const handleSwitch = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    const newPath = segments.join('/') || '/';
    router.replace(newPath);
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => handleSwitch('en')}>
        <ImageTemplate src="/usa.png" lang="en" activeLang={currentLocale} setLang={() => {}} />
      </button>
      <button onClick={() => handleSwitch('ru')}>
        <ImageTemplate src="/russia.png" lang="ru" activeLang={currentLocale} setLang={() => {}} />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
