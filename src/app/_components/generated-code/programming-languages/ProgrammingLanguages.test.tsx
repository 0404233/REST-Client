import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProgrammingLanguages from './ProgrammingLanguages';

describe('ProgrammingLanguages Component', () => {
  let mockHandler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHandler = vi.fn();
  });

  it('renders a select with correct name, id and default value', () => {
    render(<ProgrammingLanguages handleChangeLanguage={mockHandler} />);
    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('name', 'language');
    expect(select).toHaveAttribute('id', 'language');
    expect((select as HTMLSelectElement).value).toBe('curl');
  });

  it('renders exactly 7 options with correct labels and values', () => {
    render(<ProgrammingLanguages handleChangeLanguage={mockHandler} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(7);

    expect(options[0]).toHaveTextContent('сURL');
    expect(options[0]).toHaveValue('curl');

    expect(options[6]).toHaveTextContent('Go');
    expect(options[6]).toHaveValue('go');
  });

  it('applies the expected CSS classes on the select element', () => {
    render(<ProgrammingLanguages handleChangeLanguage={mockHandler} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
      'text-xl',
      'outline-none',
      'cursor-pointer',
      'border-1',
      'border-transparent',
      'transition',
      'hover:border-b-[var(--border-b)]'
    );
  });

  it('invokes handleChangeLanguage with the correct event on change', () => {
    render(<ProgrammingLanguages handleChangeLanguage={mockHandler} />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'python' } });

    expect(mockHandler).toHaveBeenCalledTimes(1);
    const eventArg = mockHandler.mock.calls[0][0];
    expect(eventArg).toHaveProperty('target');
    expect(eventArg.target.value).toBe('python');
  });
});
