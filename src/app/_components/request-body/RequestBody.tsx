import BodyEditor from './body-editor/BodyEditor';
import GeneratedCode from './generated-code/GeneratedCode';

const RequestBody = () => {
  return (
    <div className="flex flex-col gap-4  border-1 p-2 rounded-sm">
      <h1 className="text-xl text-sky-400">Request Body</h1>
      <GeneratedCode />
      <BodyEditor />
    </div>
  );
};

export default RequestBody;
