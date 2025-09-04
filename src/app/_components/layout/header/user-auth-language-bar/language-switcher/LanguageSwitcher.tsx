'use client';

import { useState } from 'react';
import ImageTemplate from './image-template/ImageTemplate';

const LanguageSwitcher = () => {
  const [activeLang, setActiveLang] = useState('en');

  return (
    <div className="flex gap-4">
      <ImageTemplate src="/usa.png" lang="en" activeLang={activeLang} setLang={setActiveLang} />
      <ImageTemplate src="/germany.png" lang="de" activeLang={activeLang} setLang={setActiveLang} />
    </div>
  );
};

export default LanguageSwitcher;
