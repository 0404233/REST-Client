'use client';

import { ChangeEvent, useState } from 'react';

type EndpointProps = {
  handleChangeURL: (value: string) => void;
};

const Endpoint = ({ handleChangeURL }: EndpointProps) => {
  const [url, setURL] = useState<string>('https://jsonplaceholder.typicode.com/posts');

  const hgandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setURL(url);
    handleChangeURL(url);
  };

  return (
    <div className="flex flex-col gap-1 w-full mr-1">
      <input
        type="text"
        id="url"
        placeholder="Enter endpoint"
        className="border-1 py-1 px-2 rounded-xs outline-none"
        value={url}
        onChange={hgandleChange}
      />
    </div>
  );
};

export default Endpoint;
