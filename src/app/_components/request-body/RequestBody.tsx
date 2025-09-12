'use client';

import { ChangeEvent, memo, useState } from 'react';

type RequestBodyProps = {
  setBody: (value: Record<string, string> | string) => void;
};

const RequestBody = ({ setBody }: RequestBodyProps) => {
  console.log('RequestBody');
  const [localBody, setLocalBody] = useState<string>('');

  const handleChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalBody(value);

    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object' && parsed !== null) {
        setBody(parsed);
      } else {
        setBody(value);
      }
    } catch {
      setBody(value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="request-body" className="text-lg font-semibold italic">
        Request Body (JSON or TEXT Editor)
      </label>
      <textarea
        id="request-body"
        value={localBody}
        onChange={handleChangeBody}
        className="w-full min-h-[120px] p-2 border rounded-md text-sm font-mono"
        placeholder='{"title": "Hello", "body": "World"} or text'
      />
    </div>
  );
};

export default memo(RequestBody);
