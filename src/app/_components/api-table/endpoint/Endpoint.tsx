'use client';

import { BASE_URL } from 'app/api/route';
import { ChangeEvent, useState } from 'react';

type EndpointProps = {
  handleChangeURL: (value: string) => void;
};

const Endpoint = ({ handleChangeURL }: EndpointProps) => {
  const [url, setURL] = useState<string>(BASE_URL);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        className="border-2 py-1 px-2 outline-none border-[var(--border-url)]
                   focus:text-[var(--border-url-focus)]
                   focus:outline-none transition-colors cursor-pointer
                   "
        value={url}
        onChange={handleChange}
      />
    </div>
  );
};

export default Endpoint;
