import { memo } from 'react';

type RequestBodyProps = {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const RequestBody = ({ body, setBody, id, setId }: RequestBodyProps) => {
  console.log('RequestBody');

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="request-body" className="text-lg font-semibold italic">
        Request Body (JSON or TEXT Editor)
      </label>
      <textarea
        id="request-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full min-h-[120px] p-2 border rounded-md text-sm font-mono"
        placeholder='{"title": "Hello", "body": "World", "userId": "1"}'
      />

      <label htmlFor="request-id" className="text-lg font-semibold italic">
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
  );
};

export default memo(RequestBody);
