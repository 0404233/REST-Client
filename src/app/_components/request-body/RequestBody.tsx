import { memo } from 'react';
import BodyEditor from './body-editor/BodyEditor';
import GeneratedCode from './generated-code/GeneratedCode';

const RequestBody = () => {
  console.log('RequestBody');

  return (
    <div className="flex flex-col gap-4  border-1 p-2 rounded-sm">
      <GeneratedCode />
      <BodyEditor />
    </div>
  );
};

export default memo(RequestBody);
