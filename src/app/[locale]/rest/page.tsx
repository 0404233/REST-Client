'use client';

/* 

RESTful-клиент
Этот маршрут должен быть частным.

Остальной клиентский код должен загружаться отложенно (чтобы неавторизованный пользователь не мог загрузить код).

Селектор метода. Выбранный метод должен быть отражен в URL-адресе приложения (например, http://restclient.com/GET ).

Обратите внимание, что редактор тела запроса должен поддерживать как минимум JSON(+) и простой текст(проверить работает или нет и если что доделать). 

*/

import ApiTable from '@/_components/api-table/ApiTable';
import RequestPanel from '@/_components/request-panel/RequestPanel';
import GeneratedCode from '@/_components/generated-code/GeneratedCode';
import { baseURL, fetchData } from 'app/_lib/fetch-data';
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
  const [responseBody, setResponseBody] = useState<ResponseBody | undefined>();
  const [url, setURL] = useState<string>(baseURL);
  const [method, setMethod] = useState<RequestMethod>('GET');
  const [body, setBody] = useState<Record<string, string>>();
  const [headers, setHeaders] = useState<RequestHeader[]>([
    { id: '1', key: 'Content-Type', value: 'application/json; charset=UTF-8' },
    { id: '2', key: 'Content-Type', value: 'text/plain' },
    { id: '3', key: 'Accept', value: 'application/json' },
  ]);

  const handleSubmit = useCallback(async () => {
    try {
      if (body?.error) throw new Error('Invalid JSON format in request body');

      const result = await fetchData({ url, method, headers, body });

      if (result) setResponseBody(result);
    } catch (err) {
      setResponseBody({
        error: err instanceof Error ? err.message : 'Unknown error',
        status: 500,
        ok: false,
      });
    }
  }, [url, method, headers, body]);

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
        {responseBody?.error && (
          <p className="text-rose-400 text-xl text-right">{responseBody.error}</p>
        )}
        {body?.error && <p className="text-rose-400 text-xl text-right">{body.error}</p>}
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
