'use client';

import { baseURL } from 'app/_lib/fetch-data';
import { generateCodeSnippet } from 'app/_lib/codegen';
import { lazy, useCallback, useMemo, useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocale } from 'next-intl';
import { redirect } from 'i18n/navigation';
import { convertHeaders } from 'app/_lib/convertHeaders';
import { substituteVariables, Variable } from '../variables/page';

const ApiTable = lazy(() => import('@/_components/api-table/ApiTable'));
const RequestPanel = lazy(() => import('@/_components/request-panel/RequestPanel'));
const GeneratedCode = lazy(() => import('@/_components/generated-code/GeneratedCode'));

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

const LOCAL_STORAGE_KEY = 'rest-client-variables';

const RestClient = () => {
  const { user } = useAuth();
  const locale = useLocale();

  if (!user) redirect({ href: '/', locale });

  const [responseBody, setResponseBody] = useState<ResponseBody | undefined>();
  const [url, setURL] = useState<string>(baseURL);
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [body, setBody] = useState<string>('');
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { id: '1', key: 'Content-Type', value: 'application/json' },
    { id: '2', key: 'Accept', value: 'application/json' },
  ]);
  const [variables, setVariables] = useState<Variable[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        setVariables(data ? JSON.parse(data) : []);
      } catch {
        setVariables([]);
      }
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const substitutedURL = substituteVariables(url, variables);
      const substitutedBody = substituteVariables(body, variables);
      const substitutedHeaders = headers.map((h) => ({
        ...h,
        key: substituteVariables(h.key, variables),
        value: substituteVariables(h.value, variables),
      }));

      const fetchOptions: RequestInit = {
        method,
        headers: convertHeaders(substitutedHeaders),
      };

      if (method !== 'GET' && body) {
        const contentType = substitutedHeaders.find(
          (h) => h.key.toLowerCase() === 'content-type'
        )?.value;

        if (contentType?.includes('application/json')) {
          try {
            JSON.parse(substitutedBody);
            fetchOptions.body = substitutedBody;
          } catch {
            setResponseBody({
              error: 'Invalid JSON format in request body',
              status: 400,
              ok: false,
            });
            return;
          }
        } else {
          fetchOptions.body = substitutedBody;
        }
      }

      const response = await fetch(`/api?url=${encodeURIComponent(substitutedURL)}`, fetchOptions);
      const result = await response.json();

      setResponseBody(result);
    } catch (err) {
      setResponseBody({
        error: err instanceof Error ? err.message : 'Unknown error',
        status: 500,
        ok: false,
      });
    }
  }, [body, headers, method, url, variables]);

  const handleChangeMethod = useCallback((value: RequestMethod) => {
    setMethod(value);
  }, []);

  const handleChangeHeaders = useCallback((headers: RequestHeader[]) => {
    setHeaders(headers);
  }, []);

  const handleChangeURL = useCallback((url: string) => {
    setURL(url);
  }, []);

  const codeSnippet = useMemo(
    () => generateCodeSnippet({ url, method, headers, body }),
    [body, headers, method, url]
  );

  return (
    <div className="flex flex-col gap-4 w-full border rounded-xl p-6 bg-[var(--bg-rest)]">
      <div>
        <h1 className="text-2xl font-bold">REST Client</h1>
        {responseBody?.error && (
          <p className="text-rose-700 text-xl text-right">{responseBody.error}</p>
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
        setBody={setBody}
        body={body}
      />
    </div>
  );
};

export default RestClient;
