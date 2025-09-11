'use client';

import { RequestMethod } from 'app/[locale]/rest/page';
import { ChangeEvent, memo, useState } from 'react';

const MethodColors = {
  GET: 'text-green-500',
  POST: 'text-yellow-300',
  PUT: 'text-sky-500',
  PATCH: 'text-orange-500',
  DELETE: 'text-rose-600',
};

type MethodProps = {
  setMethod: (value: RequestMethod) => void;
};

const Method = ({ setMethod }: MethodProps) => {
  console.log('Method');

  const [selectedMethod, setSelectedMethod] = useState<keyof typeof MethodColors>('GET');

  const handleChangeColor = (e: ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value;

    setSelectedMethod(e.target.value as keyof typeof MethodColors);
    setMethod(method as RequestMethod);
  };

  const selectClassName = MethodColors[selectedMethod];

  return (
    <div className="flex flex-col justify-center gap-1 border-[var(--border-url)] border-t-2 border-l-2 border-b-2 p-1">
      <select
        name="method"
        id="method"
        className={`${selectClassName} outline-none italic font-bold`}
        onChange={handleChangeColor}
      >
        <option value="GET" className="text-green-500 bg-zinc-950 cursor-pointer">
          GET
        </option>
        <option value="POST" className="text-yellow-300 bg-zinc-950 cursor-pointer">
          POST
        </option>
        <option value="PUT" className="text-sky-500 bg-zinc-950 cursor-pointer">
          PUT
        </option>
        <option value="PATCH" className="text-orange-500 bg-zinc-950 cursor-pointer">
          PATCH
        </option>
        <option value="DELETE" className="text-rose-600 bg-zinc-950 cursor-pointer">
          DELETE
        </option>
      </select>
    </div>
  );
};

export default memo(Method);
