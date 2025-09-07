'use client';

import { RequestMethod } from '@/_types/request';
import Button from './button/Button';
import Endpoint from './endpoint/Endpoint';
import Method from './method/Method';
import { memo } from 'react';

type ApiTableProps = {
  handleSubmit: () => void;
  handleChangeMethod: (value: RequestMethod) => void;
  handleChangeURL: (value: string) => void;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const ApiTable = ({
  handleSubmit,
  handleChangeMethod,
  handleChangeURL,
  body,
  setBody,
  id,
  setId,
}: ApiTableProps) => {
  console.log('ApiTable');

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex w-full gap-2">
        <Method setMethod={handleChangeMethod} />
        <Endpoint handleChangeURL={handleChangeURL} />
        <Button onClick={handleSubmit} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="request-body" className="text-sm font-medium">
          Request Body (JSON or text)
        </label>
        <textarea
          id="request-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full min-h-[120px] p-2 border rounded-md text-sm font-mono"
          placeholder='{"title": "Hello", "body": "World"}'
        />

        <label htmlFor="request-id" className="text-sm font-medium">
          Resource ID (for PUT/PATCH)
        </label>
        <input
          id="request-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
          placeholder="e.g. 123"
        />
      </div>
    </div>
  );
};

export default memo(ApiTable);

