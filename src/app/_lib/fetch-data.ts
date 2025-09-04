type FetchOptions = {
  url: string;
  body: Record<string, string>;
  method: string;
  headers: Record<string, string>
  id?: string;
}

/*
                              
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}

*/
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
  try {

    const { url, body, method, headers, id } = props;

    await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
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

