export interface Header {
  id: string;
  key: string;
  value: string;
}

import React from 'react';

interface HeaderRowProps {
  header: Header;
  onChange: (id: string, field: keyof Header, value: string | boolean) => void;
  onRemove: (id: string) => void;
}
const HeaderRow = ({ header, onChange, onRemove }: HeaderRowProps) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="key"
        value={header.key}
        onChange={(e) => onChange(header.id, 'key', e.target.value)}
        className="border-1 rounded-sm px-2"
      />
      <input
        type="text"
        placeholder="value"
        value={header.value}
        onChange={(e) => onChange(header.id, 'value', e.target.value)}
        className="border-1 rounded-sm px-2"
      />
      <button
        type="button"
        onClick={() => onRemove(header.id)}
        className="border-1 rounded-sm px-2 cursor-pointer"
        aria-label="Remove header"
      >
        ×
      </button>
    </div>
  );
};

export default HeaderRow;
