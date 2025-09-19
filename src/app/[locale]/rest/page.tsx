'use client';

/* 

Селектор метода. Выбранный метод должен быть отражен в URL-адресе приложения (например, http://restclient.com/GET ).

Обратите внимание, что редактор тела запроса должен поддерживать как минимум JSON(+) и простой текст(проверить работает или нет и если что доделать). 

*/

import { baseURL } from 'app/_lib/fetch-data';
// import { baseURL, fetchData } from 'app/_lib/fetch-data';
import { generateCodeSnippet } from 'app/_lib/codegen';
import { lazy, useCallback, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocale } from 'next-intl';
import { redirect } from 'i18n/navigation';
import { convertHeaders } from 'app/_lib/convertHeaders';
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

const RestClient = () => {
  const { user } = useAuth();
  const locale = useLocale();

  if (!user) redirect({ href: '/', locale });

  const [responseBody, setResponseBody] = useState<ResponseBody | undefined>();
  const [url, setURL] = useState<string>(baseURL);
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [body, setBody] = useState<string | null>(null);
  // const [body, setBody] = useState<Record<string, string>>();
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { id: '1', key: 'Content-Type', value: 'application/json' },
    { id: '2', key: 'Content-Type', value: 'text/plain' },
    { id: '3', key: 'Accept', value: 'application/json' },
  ]);
  console.log(body, typeof body);

  const handleSubmit = useCallback(async () => {
    const fetchOptions: RequestInit = {
      method: method,
      headers: convertHeaders(headers),
    };

    if (method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`/api?url=${url}`, fetchOptions);
    const result = await response.json();

    setResponseBody(result);
    setBody(null);
  }, [body, headers, method, url]);

  // const handleSubmit = useCallback(async () => {
  //   try {
  //     if (body?.error) throw new Error('Invalid JSON format in request body');

  //     const result = await fetchData({ url, method, headers, body });

  //     if (result) setResponseBody(result);
  //   } catch (err) {
  //     setResponseBody({
  //       error: err instanceof Error ? err.message : 'Unknown error',
  //       status: 500,
  //       ok: false,
  //     });
  //   }
  // }, [url, method, headers, body]);

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
      />
    </div>
  );
};

export default RestClient;
