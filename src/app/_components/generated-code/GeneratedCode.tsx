'use client';

import React, { ChangeEvent, useState } from 'react';
import ProgrammingLanguages from './programming-languages/ProgrammingLanguages';

type Props = {
  code: Record<string, string[]>;
};

const GeneratedCode: React.FC<Props> = ({ code }) => {
  const [language, setLanguage] = useState<string>('curl');

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setLanguage(language);
  };

  if (!code) {
    return (
      <section className="mt-4 text-sm text-gray-500">
        Not enough data to generate request code!
      </section>
    );
  }

  return (
    <section>
      <div className="flex gap-4 items-center mb-2">
        <h2 className="text-xl font-semibold italic ">Generated code:</h2>
        <ProgrammingLanguages handleChangeLanguage={handleChangeLanguage} />
      </div>
      <pre className="bg-gray-900 text-neutral-400 p-4 rounded-md overflow-auto text-sm">
        {code[language].join('\n')}
      </pre>
    </section>
  );
};

export default GeneratedCode;
