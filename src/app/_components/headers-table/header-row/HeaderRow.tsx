export interface Header {
  id: string;
  key: string;
  value: string;
}

import React from 'react';
import { useId } from 'react';

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
        id={useId()}
        value={header.key}
        onChange={(e) => onChange(header.id, 'key', e.target.value)}
        className="w-1/2 border-1 border-gray-300 rounded-sm px-2 py-1 
                   focus:border-emerald-400
                   focus:outline-none transition-colors cursor-pointer"
      />
      <input
        type="text"
        placeholder="value"
        id={useId()}
        value={header.value}
        onChange={(e) => onChange(header.id, 'value', e.target.value)}
        className="w-1/2 border-1 border-gray-300 rounded-sm px-2 py-1 
                   focus:border-emerald-400
                   focus:outline-none transition-colors cursor-pointer"
      />
      <button
        type="button"
        onClick={() => onRemove(header.id)}
        className="border-1 rounded-sm px-2 cursor-pointer hover:text-rose-400 transition"
      >
        ×
      </button>
    </div>
  );
};

export default HeaderRow;
