import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import VariablesPage from './page';
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { useAuth } from '../../_context/AuthContext';
import { useTranslations } from 'next-intl';

vi.mock('../../_context/AuthContext', () => ({
  useAuth: vi.fn(),
}));
const mockedUseAuth = vi.mocked(useAuth);

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);

vi.mock('../../_components/template-signed-in/TemplateSignedIn', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="signed-in">{children}</div>,
}));
vi.mock('../../_components/template-not-signed-in/TemplateNotSignedIn', () => ({
  __esModule: true,
  default: () => <div data-testid="not-signed-in">Please sign in</div>,
}));

const LOCAL_STORAGE_KEY = 'rest-client-variables';

describe('VariablesPage', () => {
  beforeEach(() => {
    mockedUseTranslations.mockReturnValue(((key: string) => key) as any);

    const store: Record<string, string> = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((k: string) => store[k] ?? null),
        setItem: vi.fn((k: string, v: string) => {
          store[k] = v;
        }),
        removeItem: vi.fn((k: string) => {
          delete store[k];
        }),
        clear: vi.fn(() => {
          Object.keys(store).forEach((k) => delete store[k]);
        }),
      },
      configurable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders nothing while loading', () => {
    mockedUseAuth.mockReturnValue({ loading: true, user: null } as any);
    const { container } = render(<VariablesPage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('prompts to sign in when not authenticated', () => {
    mockedUseAuth.mockReturnValue({ loading: false, user: null } as any);
    render(<VariablesPage />);
    expect(screen.getByTestId('not-signed-in')).toBeInTheDocument();
  });

  it('shows VariablesContent when signed in', () => {
    mockedUseAuth.mockReturnValue({ loading: false, user: { uid: 'u1' } } as any);
    render(<VariablesPage />);
    expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('variables');
  });

  it('adds a variable and persists to localStorage', async () => {
    mockedUseAuth.mockReturnValue({ loading: false, user: {} } as any);
    render(<VariablesPage />);

    fireEvent.change(screen.getByPlaceholderText('name'), {
      target: { value: 'foo' },
    });
    fireEvent.change(screen.getByPlaceholderText('value'), {
      target: { value: 'bar' },
    });
    fireEvent.click(screen.getByText('add'));

    await waitFor(() => {
      expect(screen.getByText('foo')).toBeInTheDocument();
      expect(screen.getByText('bar')).toBeInTheDocument();
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify([{ name: 'foo', value: 'bar' }])
    );
  });

  it('edits an existing variable and persists the change', async () => {
    const initial = JSON.stringify([{ name: 'a', value: '1' }]);
    window.localStorage.getItem = vi.fn().mockReturnValue(initial);

    mockedUseAuth.mockReturnValue({ loading: false, user: {} } as any);
    render(<VariablesPage />);

    fireEvent.click(screen.getByText('edit'));
    expect((screen.getByPlaceholderText('name') as HTMLInputElement).value).toBe('a');
    expect((screen.getByPlaceholderText('value') as HTMLInputElement).value).toBe('1');

    fireEvent.change(screen.getByPlaceholderText('name'), {
      target: { value: 'alpha' },
    });
    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(screen.getByText('alpha')).toBeInTheDocument();
    });

    expect(window.localStorage.setItem).toHaveBeenLastCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify([{ name: 'alpha', value: '1' }])
    );
  });

  it('deletes a variable and updates localStorage', async () => {
    const initial = JSON.stringify([
      { name: 'x', value: '1' },
      { name: 'y', value: '2' },
    ]);
    window.localStorage.getItem = vi.fn().mockReturnValue(initial);

    mockedUseAuth.mockReturnValue({ loading: false, user: {} } as any);
    render(<VariablesPage />);

    const deleteButtons = screen.getAllByText('delete');
    fireEvent.click(deleteButtons[1]);

    await waitFor(() => {
      expect(screen.queryByText('y')).toBeNull();
    });

    expect(window.localStorage.setItem).toHaveBeenLastCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify([{ name: 'x', value: '1' }])
    );
  });
});
