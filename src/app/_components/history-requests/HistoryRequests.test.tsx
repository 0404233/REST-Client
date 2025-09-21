import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeAll, beforeEach, afterAll, vi, expect } from 'vitest';

const { mockRedirect } = vi.hoisted(() => ({ mockRedirect: vi.fn() }));

vi.mock('i18n/navigation', () => ({
  __esModule: true,
  redirect: mockRedirect,
}));

vi.mock('next-intl', () => ({
  __esModule: true,
  useLocale: () => 'en',
}));

import HistoryRequests from './HistoryRequests';
import { RequestHistory } from '@/_types/request';

beforeAll(() => {
  vi.spyOn(Date.prototype, 'toLocaleString').mockReturnValue('DATESTR');
});

afterAll(() => {
  (Date.prototype.toLocaleString as any).mockRestore();
});

describe('HistoryRequests component', () => {
  const requests: RequestHistory[] = [
    {
      id: '1',
      method: 'GET',
      endpoint: '/foo',
      statusCode: 200,
      duration: 500,
      requestSize: 100,
      responseSize: 200,
      timestamp: '2025-09-22T10:00:00Z',
      error: undefined,
      requestDetails: {},
    } as RequestHistory,
    {
      id: '2',
      method: 'POST',
      endpoint: '/bar',
      statusCode: 500,
      duration: 1500,
      requestSize: 3000,
      responseSize: 1050000,
      timestamp: '2025-09-22T11:00:00Z',
      error: 'Server Error',
      requestDetails: undefined,
    } as RequestHistory,
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders each request row with correct badges, text, and metrics', () => {
    render(<HistoryRequests requests={requests} />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('/foo')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('/bar')).toBeInTheDocument();

    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();

    expect(screen.getByText('500ms')).toBeInTheDocument();
    expect(screen.getByText('1500ms')).toBeInTheDocument();

    expect(screen.getByText('200 bytes')).toBeInTheDocument();
    expect(screen.getByText('1.00 MB')).toBeInTheDocument();

    expect(screen.getAllByText('DATESTR')).toHaveLength(2);

    expect(screen.getByText('Error: Server Error')).toBeInTheDocument();

    expect(screen.getByText('Click to restore this request')).toBeInTheDocument();
  });

  it('stores requestDetails and redirects when clicking a row with details', async () => {
    render(<HistoryRequests requests={requests} />);

    await userEvent.click(screen.getByText('Click to restore this request'));

    expect(localStorage.getItem('restoreRequest')).toBe(JSON.stringify(requests[0].requestDetails));

    expect(mockRedirect).toHaveBeenCalledWith({ href: '/rest', locale: 'en' });
  });

  it('does not store or redirect when clicking a row without details', async () => {
    render(<HistoryRequests requests={requests} />);

    const barSpan = screen.getByText('/bar');
    const wrapperDiv = barSpan.parentElement!.parentElement!.parentElement!;

    await userEvent.click(wrapperDiv);

    expect(localStorage.getItem('restoreRequest')).toBeNull();
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
