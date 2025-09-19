import { RequestHeader, ResponseBody } from 'app/[locale]/rest/page';
import { convertHeaders } from './convertHeaders';
import { formatBody } from './codegen';

type FetchOptions = {
  url: string;
  method: string;
  headers: RequestHeader[];
  body?: Record<string, string>;
};

export const baseURL = 'https://jsonplaceholder.typicode.com/posts/';

export const fetchData = async (props: FetchOptions): Promise<ResponseBody> => {
  const { url, method } = props;

  switch (method) {
    case 'GET':
      return await getAllPosts(url);
    case 'POST':
      return await addNewPost(props);
    case 'PUT':
      return await updateFullPost(props);
    case 'PATCH':
      return await updatePostResource(props);
    case 'DELETE':
      return await deletePost(props);
    default:
      return await getAllPosts(url);
  }
};

export const getAllPosts = async (url: string): Promise<ResponseBody> => {
  try {
    if (baseURL !== url) throw new Error('Invalid URL format');

    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching posts');
  }
};

export const addNewPost = async (props: FetchOptions) => {
  const { url, body, method, headers } = props;

  try {
    const currentBody = formatBody({ body });

    if (baseURL !== url) throw new Error('Invalid URL format');
    if (!currentBody) throw new Error('Invalid Body format');

    const currentHeaders = convertHeaders(headers);

    const response = await fetch(url, {
      method: method,
      body: currentBody,
      headers: currentHeaders,
    });
    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    throw new Error(`POST failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const updateFullPost = async (props: FetchOptions) => {
  const { url, body, method, headers } = props;

  const id = url.split('/')[4];
  const currentBody = formatBody({ body, id });

  try {
    if (!id) throw new Error('Invalid ID');
    if (baseURL + id !== url) throw new Error('Invalid URL format');
    if (!currentBody) throw new Error('Invalid Body format');

    const currentHeaders = convertHeaders(headers);

    const response = await fetch(url, {
      method: method,
      body: currentBody,
      headers: currentHeaders,
    });
    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    throw new Error(`PUT failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const updatePostResource = async (props: FetchOptions) => {
  const { url, body, method, headers } = props;

  const id = url.split('/')[4];

  try {
    const currentBody = formatBody({ body });

    if (!id) throw new Error('Invalid ID');
    if (baseURL + id !== url) throw new Error('Invalid URL format');
    if (!currentBody) throw new Error('Invalid Body format');

    const currentHeaders = convertHeaders(headers);

    const response = await fetch(url, {
      method: method,
      body: currentBody,
      headers: currentHeaders,
    });
    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    throw new Error(`PATCH failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const deletePost = async (props: Pick<FetchOptions, 'url' | 'method'>) => {
  const { url, method } = props;

  const id = url.split('/')[4];

  try {
    if (!id) throw new Error('Invalid ID');
    if (baseURL + id !== url) throw new Error('Invalid URL');

    const response = await fetch(url, {
      method: method,
    });
    const { status, ok } = response;
    return { status, ok };
  } catch (error) {
    throw new Error(`DELETE failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
