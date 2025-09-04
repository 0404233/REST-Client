import { ResponseBody } from 'app/[locale]/rest/page';
import Body from './body/Body';
import Status from './status/Status';

type ResponseTableProps = {
  responseBody?: ResponseBody;
};

const ResponseTable = ({ responseBody }: ResponseTableProps) => {
  const { status, ok, result, error } = responseBody || {
    status: undefined,
    ok: undefined,
    result: [],
    error: undefined,
  };

  return (
    <div className="flex flex-col gap-2 border-1 p-2 rounded-sm">
      <h1 className="text-xl text-emerald-500">Response</h1>
      <Status status={status} ok={ok} />
      <Body result={result} error={error} />
    </div>
  );
};

export default ResponseTable;
