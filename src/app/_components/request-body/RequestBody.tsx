import { memo } from 'react';
import BodyEditor from './body-editor/BodyEditor';

type RequestBodyProps = {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const RequestBody = ({ body, setBody, id, setId }: RequestBodyProps) => {
  console.log('RequestBody');

  return (
    <div className="flex flex-col gap-4 rounded-sm">
      <BodyEditor body={body} setBody={setBody} id={id} setId={setId} />
    </div>
  );
};

export default memo(RequestBody);
