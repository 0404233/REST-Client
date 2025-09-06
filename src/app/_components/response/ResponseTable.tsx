import { ResponseBody } from 'app/[locale]/rest/page';
import Body from './body/Body';
import Status from './status/Status';
import { memo } from 'react';

type ResponseTableProps = {
  responseBody?: ResponseBody;
};

const ResponseTable = ({ responseBody }: ResponseTableProps) => {
  console.log('ResponseTable');

  const { status, ok, result, error } = responseBody || {
    status: undefined,
    ok: undefined,
    result: [],
    error: undefined,
  };

  return (
    <div className="flex flex-col gap-2">
      <Status status={status} ok={ok} />
      <Body result={result} error={error} />
    </div>
  );
};

export default memo(ResponseTable);
