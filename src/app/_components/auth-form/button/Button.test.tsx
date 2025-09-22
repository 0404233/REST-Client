import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => {
    return key === 'submit' ? 'Submit' : key;
  },
}));

import Button from './Button';

describe('Button component', () => {
  it('renders a button with the localized text', () => {
    render(<Button />);

    const btn = screen.getByRole('button', { name: 'Submit' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Submit');
  });

  it('sets aria-label to the same localized text', () => {
    render(<Button />);

    const btn = screen.getByRole('button', { name: 'Submit' });
    expect(btn).toHaveAttribute('aria-label', 'Submit');
  });
});
