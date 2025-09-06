'use client';

import { RequestMethod } from 'app/[locale]/rest/page';
import Button from './button/Button';
import Endpoint from './endpoint/Endpoint';
import Method from './method/Method';
import { memo } from 'react';

type ApiTableProps = {
  handleSubmit: () => void;
  handleChangeMethod: (value: RequestMethod) => void;
  handleChangeURL: (value: string) => void;
};

const ApiTable = ({ handleSubmit, handleChangeMethod, handleChangeURL }: ApiTableProps) => {
  console.log('ApiTable');

  return (
    <div className="flex w-full">
      <Method setMethod={handleChangeMethod} />
      <Endpoint handleChangeURL={handleChangeURL} />
      <Button onClick={handleSubmit} />
    </div>
  );
};

export default memo(ApiTable);
