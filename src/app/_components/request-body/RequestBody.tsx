'use client';

import { ChangeEvent, memo, useState } from 'react';

type RequestBodyProps = {
  setBody: (value: Record<string, string>) => void;
};

const RequestBody = ({ setBody }: RequestBodyProps) => {
  console.log('RequestBody');
  const [localBody, setLocalBody] = useState<string>();

  const handleChangeBody = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    let parsedBody: Record<string, string>;

    try {
      parsedBody = JSON.parse(value);
      setLocalBody(value);
      setBody(parsedBody);
    } catch {
      setBody({ error: 'Invalid JSON format in request body' });
      return;
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
        placeholder='{"title": "Hello", "body": "World"}'
      />
    </div>
  );
};

export default memo(RequestBody);
