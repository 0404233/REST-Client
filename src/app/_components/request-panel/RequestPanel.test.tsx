import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';

const mockHeadersTable = vi.fn();
vi.mock('../headers-table/HeadersTable', () => ({
  __esModule: true,
  default: (props: any) => {
    mockHeadersTable(props);
    return <div data-testid="headers-table" />;
  },
}));

const mockRequestBody = vi.fn();
vi.mock('../request-body/RequestBody', () => ({
  __esModule: true,
  default: (props: any) => {
    mockRequestBody(props);
    return <div data-testid="request-body" />;
  },
}));

const mockResponseTable = vi.fn();
vi.mock('../response/ResponseTable', () => ({
  __esModule: true,
  default: (props: any) => {
    mockResponseTable(props);
    return <div data-testid="response-table" />;
  },
}));

vi.mock('./button/Button', () => ({
  __esModule: true,
  default: ({ handleOpenPanel, sectionName }: any) => (
    <button data-testid={`btn-${sectionName}`} onClick={() => handleOpenPanel(sectionName)}>
      {sectionName}
    </button>
  ),
}));

import RequestPanel from './RequestPanel';
import { ResponseBody } from '@/_types/request';

describe('RequestPanel Component', () => {
  const handleChangeHeaders = vi.fn();
  const setBody = vi.fn();
  const sampleResponse: ResponseBody = { status: 200 };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders three buttons in a flex container and no panels by default', () => {
    const { container } = render(
      <RequestPanel handleChangeHeaders={handleChangeHeaders} setBody={setBody} />
    );

    const btnContainer = container.getElementsByTagName('section')[0];
    expect(btnContainer).toHaveClass('flex', 'justify-around');

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(screen.queryByTestId('headers-table')).toBeNull();
    expect(screen.queryByTestId('request-body')).toBeNull();
    expect(screen.queryByTestId('response-table')).toBeNull();
  });

  it('opens the headers panel on clicking the headers button', () => {
    render(<RequestPanel handleChangeHeaders={handleChangeHeaders} setBody={setBody} />);
    fireEvent.click(screen.getByTestId('btn-headers'));

    expect(screen.getByTestId('headers-table')).toBeInTheDocument();
    expect(screen.queryByTestId('request-body')).toBeNull();
    expect(screen.queryByTestId('response-table')).toBeNull();

    expect(mockHeadersTable).toHaveBeenCalledWith({
      handleChangeHeaders,
    });
  });

  it('opens the body panel on clicking the body button', () => {
    render(<RequestPanel handleChangeHeaders={handleChangeHeaders} setBody={setBody} />);
    fireEvent.click(screen.getByTestId('btn-body'));

    expect(screen.getByTestId('request-body')).toBeInTheDocument();
    expect(screen.queryByTestId('headers-table')).toBeNull();
    expect(screen.queryByTestId('response-table')).toBeNull();

    expect(mockRequestBody).toHaveBeenCalledWith({ setBody });
  });

  it('opens the response panel on clicking the response button and passes responseBody', () => {
    render(
      <RequestPanel
        handleChangeHeaders={handleChangeHeaders}
        setBody={setBody}
        responseBody={sampleResponse}
      />
    );
    fireEvent.click(screen.getByTestId('btn-response'));

    expect(screen.getByTestId('response-table')).toBeInTheDocument();
    expect(screen.queryByTestId('headers-table')).toBeNull();
    expect(screen.queryByTestId('request-body')).toBeNull();

    expect(mockResponseTable).toHaveBeenCalledWith({
      responseBody: sampleResponse,
    });
  });

  it('ensures only one panel is open at any time when switching sections', () => {
    render(
      <RequestPanel
        handleChangeHeaders={handleChangeHeaders}
        setBody={setBody}
        responseBody={sampleResponse}
      />
    );

    fireEvent.click(screen.getByTestId('btn-headers'));
    expect(screen.queryByTestId('request-body')).toBeNull();
    expect(screen.queryByTestId('response-table')).toBeNull();

    fireEvent.click(screen.getByTestId('btn-body'));
    expect(screen.queryByTestId('headers-table')).toBeNull();
    expect(screen.queryByTestId('response-table')).toBeNull();

    fireEvent.click(screen.getByTestId('btn-response'));
    expect(screen.queryByTestId('headers-table')).toBeNull();
    expect(screen.queryByTestId('request-body')).toBeNull();
  });
});
