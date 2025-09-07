'use client';

import React from 'react';

type Props = {
  code: string;
};

const GeneratedCode: React.FC<Props> = ({ code }) => {
  if (!code || code.trim() === '') {
    return (
      <div className="mt-4 text-sm text-gray-500">Not enough data to generate request code!</div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Generated code:</h2>
      <pre className="bg-gray-900 text-white p-4 rounded-md overflow-auto text-sm">{code}</pre>
    </div>
  );
};

export default GeneratedCode;
