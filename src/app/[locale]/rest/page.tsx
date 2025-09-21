'use client';

import { generateCodeSnippet } from 'app/_lib/codegen';
import { lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocale, useTranslations } from 'next-intl';
import { redirect } from 'i18n/navigation';
import { convertHeaders } from 'app/_lib/convertHeaders';
import { RequestDetails, RequestHeader, RequestMethod, ResponseBody } from '@/_types/request';
import { Variable } from '../variables/page';

const ApiTable = lazy(() => import('@/_components/api-table/ApiTable'));
const RequestPanel = lazy(() => import('@/_components/request-panel/RequestPanel'));
const GeneratedCode = lazy(() => import('@/_components/generated-code/GeneratedCode'));

const LOCAL_STORAGE_KEY = 'rest-client-variables';
export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';

function substituteVariables(str: string, variables: Variable[]): string {
  return str.replace(/{{\s*([\w\d_]+)\s*}}/g, (_, varName) => {
    const found = variables.find((v) => v.name === varName);
    return found ? found.value : '';
  });
}

const RestClient = () => {
  const { user } = useAuth();
  const locale = useLocale();
  const t = useTranslations();

  if (!user) redirect({ href: '/', locale });

  const [responseBody, setResponseBody] = useState<ResponseBody | undefined>();
  const [url, setURL] = useState<string>(BASE_URL);
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [body, setBody] = useState<string>('');
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { id: '1', key: 'Content-Type', value: 'application/json' },
    { id: '2', key: 'Content-Type', value: 'text/plain' },
    { id: '3', key: 'Accept', value: 'application/json' },
  ]);
  const [variables, setVariables] = useState<Variable[]>([]);

  useEffect(() => {
    const restoreRequest = localStorage.getItem('restoreRequest');
    if (restoreRequest) {
      const details: RequestDetails = JSON.parse(restoreRequest);
      setURL(details.url);
      setMethod(details.method);

      const requestHeaders = Object.entries(details.headers).map(([key, value], index) => {
        return {
          id: String(index + 1),
          key,
          value,
        };
      });

      setHeaders(requestHeaders);

      if (details.body) {
        setBody(details.body);
      }

      localStorage.removeItem('restoreRequest');
    }
  }, []);

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
      const token = await user?.getIdToken();

      if (!token) {
        setResponseBody({
          error: 'No authentication token available',
          status: 401,
          ok: false,
        });
        return;
      }

      const substitutedURL = substituteVariables(url, variables);
      const substitutedBody = substituteVariables(body, variables);
      const substitutedHeaders = headers.map((h) => ({
        ...h,
        key: substituteVariables(h.key, variables),
        value: substituteVariables(h.value, variables),
      }));

      const requestHeaders: HeadersInit = {
        ...convertHeaders(substitutedHeaders),
        Authorization: `Bearer ${token}`,
      };

      const fetchOptions: RequestInit = {
        method: method,
        headers: requestHeaders,
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
              error: t('invalidJson'),
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
      const convertedResponse: ResponseBody = {
        status: response.status,
        ok: true,
        result,
      };
      setResponseBody(convertedResponse);
      setBody('');
    } catch (error) {
      setResponseBody({
        error: error instanceof Error ? error.message : t('invalidUrl'),
        status: 500,
        ok: false,
      });
    }
  }, [body, headers, method, url, variables, t, user]);

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
        <h1 className="text-2xl font-bold">{t('restClient')}</h1>
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
      />
    </div>
  );
};

export default RestClient;
