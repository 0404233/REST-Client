import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RestClient, { BASE_URL, substituteVariables } from './page';
import { useAuth } from '../../_context/AuthContext';
import { useLocale, useTranslations } from 'next-intl';
import { redirect } from 'i18n/navigation';
import { convertHeaders } from 'app/_lib/convertHeaders';
import { generateCodeSnippet } from 'app/_lib/codegen';
import { describe, it, beforeEach, vi, expect } from 'vitest';

vi.mock('../../_context/AuthContext', () => ({
  useAuth: vi.fn(),
}));
const mockedUseAuth = vi.mocked(useAuth);

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  useLocale: vi.fn(),
}));
const mockedUseTranslations = vi.mocked(useTranslations);
const mockedUseLocale = vi.mocked(useLocale);

vi.mock('i18n/navigation', () => ({
  redirect: vi.fn(),
}));
const mockedRedirect = vi.mocked(redirect);

vi.mock('app/_lib/codegen', () => ({
  generateCodeSnippet: vi.fn(),
}));
const mockedGenerate = vi.mocked(generateCodeSnippet);

vi.mock('app/_lib/convertHeaders', () => ({
  convertHeaders: vi.fn(),
}));
const mockedConvert = vi.mocked(convertHeaders);

vi.mock('../../_components/api-table/ApiTable', () => ({
  default: ({ handleSubmit, handleChangeMethod, handleChangeURL }: any) => (
    <div data-testid="api-table">
      <button onClick={handleSubmit}>Submit</button>
      <select data-testid="method-select" onChange={(e) => handleChangeMethod(e.target.value)}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
      <input data-testid="url-input" onChange={(e) => handleChangeURL(e.target.value)} />
    </div>
  ),
}));

vi.mock('../../_components/generated-code/GeneratedCode', () => ({
  default: ({ code }: any) => <pre data-testid="generated-code">{JSON.stringify(code)}</pre>,
}));

vi.mock('../../_components/request-panel/RequestPanel', () => ({
  default: ({ setBody, responseBody }: any) => (
    <div data-testid="request-panel">
      <textarea data-testid="body-input" onChange={(e) => setBody(e.target.value)} />
      {responseBody && <div data-testid="response">{JSON.stringify(responseBody)}</div>}
    </div>
  ),
}));

describe('substituteVariables util', () => {
  it('replaces placeholders with variable values', () => {
    const vars = [
      { name: 'A', value: '1' },
      { name: 'B', value: 'two' },
    ];
    expect(substituteVariables('x={{A}}&y={{B}}&z={{C}}', vars)).toBe('x=1&y=two&z=');
  });
});

describe('RestClient component', () => {
  const fakeUser = { getIdToken: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseTranslations.mockReturnValue(((k: string) => k) as any);
    mockedUseLocale.mockReturnValue('en');
    mockedGenerate.mockReturnValue({ curl: [] });
    mockedConvert.mockReturnValue({});

    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
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
    });
  });

  it('redirects when not signed in', () => {
    mockedUseAuth.mockReturnValue({ user: null } as any);
    render(<RestClient />);
    expect(mockedRedirect).toHaveBeenCalledWith({
      href: '/',
      locale: 'en',
    });
  });

  it('renders UI when signed in', () => {
    mockedUseAuth.mockReturnValue({ user: fakeUser } as any);
    render(<RestClient />);
    expect(screen.getByText('restClient')).toBeInTheDocument();
    expect(screen.getByTestId('api-table')).toBeInTheDocument();
    expect(screen.getByTestId('generated-code')).toBeInTheDocument();
    expect(screen.getByTestId('request-panel')).toBeInTheDocument();
  });

  it('shows error when no auth token', async () => {
    fakeUser.getIdToken.mockResolvedValue(null);
    mockedUseAuth.mockReturnValue({ user: fakeUser } as any);
    render(<RestClient />);
    await userEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('No authentication token available')).toBeInTheDocument();
    });
  });

  it('performs GET request and displays response', async () => {
    fakeUser.getIdToken.mockResolvedValue('tok');
    mockedUseAuth.mockReturnValue({ user: fakeUser } as any);
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: async () => ({ ok: true }),
    } as any);

    render(<RestClient />);
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        `/api?url=${encodeURIComponent(BASE_URL)}`,
        expect.objectContaining({ method: 'GET' })
      );
      expect(screen.getByTestId('response')).toHaveTextContent(
        JSON.stringify({ status: 200, ok: true, result: { ok: true } })
      );
    });
  });

  it('calls generateCodeSnippet on render', () => {
    mockedUseAuth.mockReturnValue({ user: fakeUser } as any);
    render(<RestClient />);
    expect(mockedGenerate).toHaveBeenCalledWith(
      expect.objectContaining({
        url: BASE_URL,
        method: 'GET',
      })
    );
  });
});
