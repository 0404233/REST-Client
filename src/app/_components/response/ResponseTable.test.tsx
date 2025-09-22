import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

vi.mock('./status/Status', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('div', {
      'data-testid': 'status',
      'data-status': String(props.status),
      'data-ok': String(props.ok),
    }),
}));

vi.mock('./body/Body', () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement('div', {
      'data-testid': 'body',
      'data-result': JSON.stringify(props.result),
      'data-error': props.error === undefined ? 'undefined' : String(props.error),
    }),
}));

import ResponseTable from './ResponseTable';
import { ResponseBody } from '@/_types/request';

describe('ResponseTable component', () => {
  it('renders fallback message when no status is provided', () => {
    render(<ResponseTable />);
    expect(screen.getByText(/Click[\s\S]*to complete the request/)).toBeInTheDocument();
  });

  it('renders Status and Body when responseBody has a status', () => {
    const fakeBody: ResponseBody = {
      status: 201,
      ok: true,
      result: [{ id: 1, foo: 'bar' }],
      error: undefined,
    };

    render(<ResponseTable responseBody={fakeBody} />);

    const statusNode = screen.getByTestId('status');
    expect(statusNode).toHaveAttribute('data-status', '201');
    expect(statusNode).toHaveAttribute('data-ok', 'true');

    const bodyNode = screen.getByTestId('body');
    expect(bodyNode).toHaveAttribute('data-result', JSON.stringify(fakeBody.result));
    expect(bodyNode).toHaveAttribute('data-error', 'undefined');
  });

  it('handles undefined result and error gracefully', () => {
    const fakeBody: ResponseBody = {
      status: 404,
      ok: false,
      result: [],
      error: 'Not Found',
    };

    render(<ResponseTable responseBody={fakeBody} />);

    const statusNode = screen.getByTestId('status');
    expect(statusNode).toHaveAttribute('data-status', '404');
    expect(statusNode).toHaveAttribute('data-ok', 'false');

    const bodyNode = screen.getByTestId('body');
    expect(bodyNode).toHaveAttribute('data-result', JSON.stringify([]));
    expect(bodyNode).toHaveAttribute('data-error', 'Not Found');
  });
});
