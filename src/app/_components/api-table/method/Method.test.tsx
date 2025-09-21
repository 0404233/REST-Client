import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import Method from './Method';
import { RequestMethod } from '@/_types/request';

describe('Method component', () => {
  let setMethod: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setMethod = vi.fn();
    render(<Method setMethod={setMethod} />);
  });

  it('renders a select with all HTTP methods', () => {
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const options = Array.from(select.options).map((opt) => opt.value);

    expect(options).toEqual(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
  });

  it('defaults to GET and applies the GET color class', () => {
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    expect(select.value).toBe('GET');
    expect(select).toHaveClass('text-green-500');
  });

  it('calls setMethod and updates class when user selects POST', async () => {
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    await userEvent.selectOptions(select, 'POST');
    expect(setMethod).toHaveBeenCalledTimes(1);
    expect(setMethod).toHaveBeenCalledWith('POST' as RequestMethod);
    expect(select.value).toBe('POST');
    expect(select).toHaveClass('text-yellow-300');
  });

  it('updates color class correctly for each method', async () => {
    const mapping: Record<RequestMethod, string> = {
      GET: 'text-green-500',
      POST: 'text-yellow-300',
      PUT: 'text-sky-500',
      PATCH: 'text-orange-500',
      DELETE: 'text-rose-600',
    };
    const select = screen.getByRole('combobox') as HTMLSelectElement;

    for (const method of Object.keys(mapping) as RequestMethod[]) {
      await userEvent.selectOptions(select, method);
      expect(select.value).toBe(method);
      expect(select).toHaveClass(mapping[method]);
      setMethod.mockClear();
    }
  });
});
