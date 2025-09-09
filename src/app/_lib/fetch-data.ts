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
  const currentURL = method != 'POST' ? url + '/' + id : url;
  const currentHeaders = convertHeaders(headers);

  try {
    const response = await fetch(currentURL, {
      method: method,
      body: JSON.stringify(body),
      headers: currentHeaders,
    });
    const { status, ok } = response;
    const result = await response.json();
    return { status, ok, result };
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = async (props: Pick<FetchOptions, 'url' | "method" | "id">) => {
  const { url, method, id } = props;
  const currentURL = url + '/' + id;

  try {

    const response = await fetch(currentURL, {
      method: method
    });
    const { status, ok } = response;
    return { status, ok };
  } catch (error) {
    console.error(error)
  }
}