import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';

vi.mock('i18n/navigation', () => ({
  __esModule: true,
  Link: ({ href, onClick, children, className }: any) => (
    <a data-testid="link" href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

import LinkTemplate from './LinkTemplate';

describe('LinkTemplate component', () => {
  it('renders children inside Link with correct href and className', () => {
    render(
      <LinkTemplate href="/home">
        <span data-testid="child">Go Home</span>
      </LinkTemplate>
    );

    const link = screen.getByTestId('link');
    const child = screen.getByTestId('child');

    expect(child).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toContainElement(child);
    expect(link).toHaveClass(
      'text-sm',
      'font-bold',
      'cursor-pointer',
      'text-[var(--foreground)]',
      'border-1',
      'border-transparent',
      'hover:border-b-[var(--foreground)]',
      'transition-border',
      'duration-300'
    );
  });

  it('calls onClick when Link is clicked', async () => {
    const handleClick = vi.fn();
    render(
      <LinkTemplate href="/about" onClick={handleClick}>
        About
      </LinkTemplate>
    );

    const link = screen.getByTestId('link');
    await userEvent.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not break when onClick is not provided', async () => {
    render(<LinkTemplate href="/no-click">No Click</LinkTemplate>);

    const link = screen.getByTestId('link');
    await expect(userEvent.click(link)).resolves.toBeUndefined();
  });
});
