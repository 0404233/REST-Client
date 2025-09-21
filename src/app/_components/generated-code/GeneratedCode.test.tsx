import React, { ChangeEvent } from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import GeneratedCode from './GeneratedCode';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

vi.mock('./programming-languages/ProgrammingLanguages', () => ({
  __esModule: true,
  default: ({ handleChangeLanguage }: any) => (
    <select
      data-testid="lang-select"
      onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeLanguage(e)}
    >
      <option value="curl">curl</option>
      <option value="js">js</option>
    </select>
  ),
}));

describe('GeneratedCode Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders notEnoughData when no code prop', () => {
    render(<GeneratedCode code={null as any} />);
    const msg = screen.getByText('notEnoughData');
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveClass('mt-4', 'text-sm', 'text-gray-500');
  });

  it('renders heading, selector, and default code block', () => {
    const sample = { curl: ['A'], js: ['B'] };
    render(<GeneratedCode code={sample} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('generatedCode');

    const select = screen.getByTestId('lang-select') as HTMLSelectElement;
    expect(select.value).toBe('curl');

    const pre = screen.getByText('A', { selector: 'pre' });
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveClass(
      'bg-gray-900',
      'text-neutral-400',
      'p-4',
      'rounded-md',
      'overflow-auto',
      'text-sm'
    );
  });
});
