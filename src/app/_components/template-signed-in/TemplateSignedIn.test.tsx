import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { useTranslations } from 'next-intl';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);

vi.mock('./client-tools/ClientTools', () => ({
  __esModule: true,
  default: () => <div data-testid="client-tools" />,
}));

import TemplateSignedIn from './TemplateSignedIn';
import { User } from 'firebase/auth';

describe('TemplateSignedIn Component', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    const t = ((key: string) => `translated-${key}`) as any;
    t.rich = t;
    t.markup = t;
    t.raw = t;
    t.has = () => true;
    mockedUseTranslations.mockReturnValue(t);
  });

  it('calls useTranslations with no namespace', () => {
    render(<TemplateSignedIn user={null} />);
    expect(mockedUseTranslations).toHaveBeenCalledWith();
  });

  it('renders wrapper with correct layout classes', () => {
    const { container } = render(<TemplateSignedIn user={null} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center', 'gap-3');
  });

  it('renders heading with translated welcomeBack and user email when user is provided', () => {
    const mockUser = { email: 'test@example.com' } as User;
    render(<TemplateSignedIn user={mockUser} />);

    const heading = screen.getByRole('heading', {
      name: 'translated-welcomeBack, test@example.com!',
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-3xl', 'italic');
  });

  it('renders heading with translated welcomeBack and fallback when user is null', () => {
    render(<TemplateSignedIn user={null} />);

    const heading = screen.getByRole('heading', {
      name: 'translated-welcomeBack, translated-user!',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders ClientTools component after the heading', () => {
    render(<TemplateSignedIn user={null} />);

    const clientTools = screen.getByTestId('client-tools');
    expect(clientTools).toBeInTheDocument();
  });

  it('renders children correctly in order', () => {
    const mockUser = { email: 'a@b.com' } as User;
    render(
      <TemplateSignedIn user={mockUser}>
        <span data-testid="child">Hello World</span>
      </TemplateSignedIn>
    );

    const wrapper = screen.getByTestId('client-tools').parentElement!;
    const [heading, clientTools, child] = Array.from(wrapper.children);
    expect(heading.tagName).toBe('H1');
    expect(clientTools).toHaveAttribute('data-testid', 'client-tools');
    expect(child).toHaveAttribute('data-testid', 'child');
    expect(child).toHaveTextContent('Hello World');
  });
});
