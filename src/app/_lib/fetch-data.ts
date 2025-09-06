import { RequestHeader } from "app/[locale]/rest/page";
import { convertHeaders } from "./convertHeaders";

type FetchOptions = {
  url: string;
  body: Record<string, string>;
  method: string;
  headers: RequestHeader[]
  id?: string;
}

export const getAllPosts = async (url: string) => {
  try {
    const response = await fetch(url);
    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    console.error(error)
  }
}

export const getPost = async (url: string) => {
  try {
    const response = await fetch(url);
    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    console.error(error)
  }
}

export const updatePost = async (props: FetchOptions) => {
  const { url, body, method, headers, id } = props;

  const currentHeaders = convertHeaders(headers);

  try {


    await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: currentHeaders,
    });
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = async (props: Pick<FetchOptions, 'url' | "method">) => {
  const { url, method } = props;

  try {
    await fetch(url, {
      method: method
    });
  } catch (error) {
    console.error(error)
  }
}

/* 
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
*/