'use client';

import { ChangeEvent, memo } from 'react';

type RequestBodyProps = {
  body: string;
  setBody: (value: string) => void;
};

const RequestBody = ({ body, setBody }: RequestBodyProps) => {

  const handleChangeBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="request-body" className="text-lg font-semibold italic">
        Request Body (JSON or TEXT Editor)
      </label>
      <textarea
        id="request-body"
        value={body}
        onChange={handleChangeBody}
        className="w-full min-h-[120px] p-2 border rounded-md text-sm font-mono"
        placeholder='{"title": "Hello", "body": "World"} or text'
      />
    </div>
  );
};

export default memo(RequestBody);
