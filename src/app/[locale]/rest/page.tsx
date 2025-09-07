'use client';

import ApiTable from '@/_components/api-table/ApiTable';
import RequestPanel from '@/_components/request-panel/RequestPanel';
import { getAllPosts, getPost, updatePost, deletePost } from 'app/_lib/fetch-data';
import { useCallback, useState } from 'react';

type Result = Record<string, any>;

export type ResponseBody = {
  status?: number;
  ok?: boolean;
  result?: Result[];
  error?: string;
};

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestHeader = {
  id: string;
  key: string;
  value: string;
};

const RestClient = () => {
  const [responseBody, setResponseBody] = useState<ResponseBody>();
  const [url, setURL] = useState<string>('https://jsonplaceholder.typicode.com/posts');
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [headers, setHeaders] = useState<RequestHeader[]>([{ id: '1', key: '', value: '' }]);
  // СДЕЛАТЬ BODY и изменить для функции
  // СДЕЛАТЬ id
  // СДЕЛАТЬ Generated Code

  const handleSubmit = useCallback(async () => {
    let response;

    switch (method) {
      case 'GET':
        response = await getAllPosts(url);
        break;
      case 'POST':
      case 'PUT':
      case 'PATCH':
        response = await updatePost({ url, body, method, headers, id });
        break;
      case 'DELETE':
        response = await deletePost({ url, method });
        break;
      default:
        response = await getAllPosts(url);
    }

    if (!response) {
      setResponseBody((prev) => ({
        ...prev,
        error: 'Request execution error',
      }));
      return;
    }

    const { status, ok, result } = response;
    // console.log(status, ok, result);

    setResponseBody({
      status,
      ok,
      result,
      error: '',
    });
  }, []);

  const handleChangeMethod = useCallback((value: RequestMethod) => {
    setMethod(value);
  }, []);

  const handleChangeHeaders = useCallback((headers: RequestHeader[]) => {
    setHeaders(headers);
  }, []);

  const handleChangeURL = useCallback((url: string) => {
    setURL(url);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full border-1 rounded-xl p-4 bg-[var(--bg-rest)]">
      <h1 className="text-2xl">REST Client</h1>
      <ApiTable
        handleSubmit={handleSubmit}
        handleChangeMethod={handleChangeMethod}
        handleChangeURL={handleChangeURL}
      />
      <RequestPanel handleChangeHeaders={handleChangeHeaders} responseBody={responseBody} />
    </div>
  );
};

export default RestClient;
