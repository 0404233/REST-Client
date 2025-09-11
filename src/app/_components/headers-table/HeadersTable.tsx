import { useEffect, useState } from 'react';

import { RequestHeader } from 'app/[locale]/rest/page';
import HeaderRow from './header-row/HeaderRow';

export type Header = {
  id: string;
  key: string;
  value: string;
};

type HeadersTableProps = {
  handleChangeHeaders: (headers: RequestHeader[]) => void;
};

export const HeadersTable = ({ handleChangeHeaders }: HeadersTableProps) => {
  console.log('HeadersTable');
  const [headers, setHeaders] = useState<Header[]>([
    { id: '1', key: 'Content-Type', value: 'application/json; charset=UTF-8' },
    { id: '2', key: 'Content-Type', value: 'text/plain' },
    { id: '3', key: 'Accept', value: 'application/json' },
  ]);

  useEffect(() => {
    handleChangeHeaders(headers);
  }, [handleChangeHeaders, headers]);

  const addHeader = () => {
    const newHeader: Header = {
      id: Date.now().toString(),
      key: '',
      value: '',
    };
    setHeaders((prev) => [...prev, newHeader]);
  };

  const updateHeader = (id: string, field: keyof Header, value: string | boolean) => {
    setHeaders((prev) =>
      prev.map((header) => (header.id === id ? { ...header, [field]: value } : header))
    );
  };

  const removeHeader = (id: string) => {
    setHeaders((prev) => prev.filter((header) => header.id !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {headers.map((header) => (
          <HeaderRow
            key={header.id}
            header={header}
            onChange={updateHeader}
            onRemove={removeHeader}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addHeader}
        className="text-start font-bold cursor-pointer hover:text-emerald-400 transition"
      >
        + Add header
      </button>
    </div>
  );
};

export default HeadersTable;
