import { ResponseBody } from '@/_types/request';
import Body from './body/Body';
import Status from './status/Status';
import { memo } from 'react';

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

  if (!status)
    return (
      <div className="text-xl">
        Click <span className="text-emerald-500 font-bold italic">{'"Submit"'}</span> to complete
        the request
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <Status status={status} ok={ok} />
      <Body result={result} error={error} />
    </div>
  );
};

export default memo(ResponseTable);
