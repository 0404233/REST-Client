'use client';

import { useState } from 'react';
import Button from './button/Button';
import HeadersTable from './headers-table/HeadersTable';
import { RequestHeader } from 'app/[locale]/rest/page';

type RequestHeadersProps = {
  handleChangeHeaders: (headers: RequestHeader[]) => void;
};

const RequestHeaders = ({ handleChangeHeaders }: RequestHeadersProps) => {
  const [isOpenTable, setIsOpenTable] = useState<boolean>(false);

  const handleChangeOpenTable = () => {
    setIsOpenTable(!isOpenTable);
  };

  return (
    <div className="flex flex-col gap-4 items-start border-1 p-2 rounded-sm duration-200 hover:border-orange-300">
      <Button handleChangeOpenTable={handleChangeOpenTable} />
      {isOpenTable && <HeadersTable handleChangeHeaders={handleChangeHeaders} />}
    </div>
  );
};

export default RequestHeaders;
