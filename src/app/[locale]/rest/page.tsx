'use client';

import ApiTable from '@/_components/api-table/ApiTable';
import RequestPanel from '@/_components/request-panel/RequestPanel';
import GeneratedCode from '@/_components/generated-code/GeneratedCode';
import { getAllPosts, updatePost, deletePost } from 'app/_lib/fetch-data';
import { generateCodeSnippet } from 'app/_lib/codegen';
import { useCallback, useState } from 'react';

type Result = Record<string, unknown>;

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
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { id: '1', key: 'Content-Type', value: 'application/json; charset=UTF-8' },
    { id: '2', key: 'Content-Type', value: 'text/plain' },
    { id: '3', key: 'Accept', value: 'application/json' },
  ]);
  const [body, setBody] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [methodWithoutID, setMethodWithoutID] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    let response: ResponseBody | undefined;

    try {
      switch (method) {
        case 'GET':
          response = await getAllPosts(url);
          break;
        case 'POST':
        case 'PUT':
        case 'PATCH': {
          if (method !== 'POST' && !id) {
            setMethodWithoutID(!methodWithoutID);
            return;
          }

          let parsedBody: Record<string, string>;

          try {
            parsedBody = JSON.parse(body);
          } catch {
            setResponseBody({ error: 'Invalid JSON format in request body' });
            return;
          }

          response = await updatePost({
            url,
            method,
            headers,
            id,
            body: parsedBody,
          });
          break;
        }
        case 'DELETE':
          response = await deletePost({ url, method, id });
          break;
        default:
          response = await getAllPosts(url);
      }

      if (!response) {
        setResponseBody({ error: 'Request execution error' });
        return;
      }

      const { status, ok, result } = response;

      setResponseBody({
        status,
        ok,
        result,
        error: '',
      });
    } catch (err) {
      if (err instanceof Error) setResponseBody({ error: err.message || 'Unknown error' });
    }
  }, [url, method, body, headers, id]);

  const handleChangeMethod = useCallback((value: RequestMethod) => {
    setMethod(value);
  }, []);

  const handleChangeHeaders = useCallback((headers: RequestHeader[]) => {
    setHeaders(headers);
  }, []);

  const handleChangeURL = useCallback((url: string) => {
    setURL(url);
  }, []);

  const codeSnippet = generateCodeSnippet({ url, method, headers, body });

  return (
    <div className="flex flex-col gap-4 w-full border rounded-xl p-6 bg-[var(--bg-rest)]">
      <div>
        <h1 className="text-2xl font-bold">REST Client</h1>
        {methodWithoutID && (
          <p className="text-rose-400 text-sm italic text-right">Add Resource ID</p>
        )}
      </div>

      <ApiTable
        handleSubmit={handleSubmit}
        handleChangeMethod={handleChangeMethod}
        handleChangeURL={handleChangeURL}
      />

      <GeneratedCode code={codeSnippet} />

      <RequestPanel
        handleChangeHeaders={handleChangeHeaders}
        responseBody={responseBody}
        body={body}
        setBody={setBody}
        id={id}
        setId={setId}
      />
    </div>
  );
};

export default RestClient;
