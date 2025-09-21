import { NextRequest } from 'next/server';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');

    if (BASE_URL !== url) {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const response = await fetch(url, {
      method: 'GET',
    });
    const result = await response.json();

    return Response.json({ result, status: response.status, ok: response.statusText });
  } catch {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { body, headers } = await request.json();

    const url = request.nextUrl.searchParams.get('url');

    if (BASE_URL !== url) {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: body,
      headers: headers,
    });

    const result = await response.json();

    return Response.json({
      result,
      status: response.status,
      ok: response.ok,
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'POST failed',
        status: 500,
        ok: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { body, headers } = await request.json();
    const url = request.nextUrl.searchParams.get('url');
    const id = url?.split('/')[4];

    if (!id) {
      return Response.json({ error: `ID is required for PUT request` }, { status: 400 });
    }

    if (BASE_URL + id !== url) {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const resourceUrl = `${BASE_URL}${id}`;

    const response = await fetch(resourceUrl, {
      method: 'PUT',
      body: body,
      headers: headers,
    });

    const result = await response.json();

    return Response.json({
      result,
      status: response.status,
      ok: response.ok,
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'POST failed',
        status: 500,
        ok: false,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { body, headers } = await request.json();
    const url = request.nextUrl.searchParams.get('url');
    const id = url?.split('/')[4];

    if (!id) {
      return Response.json({ error: `ID is required for PATCH request` }, { status: 400 });
    }

    const resourceUrl = `${BASE_URL}${id}`;

    const response = await fetch(resourceUrl, {
      method: 'PATCH',
      body: body,
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`PATCH request failed: ${response.statusText}`);
    }

    const result = await response.json();

    return Response.json({
      result,
      status: response.status,
      ok: response.ok,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'PATCH failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    const id = url?.split('/')[4];

    if (!id) {
      return Response.json({ error: `ID is required for PATCH request` }, { status: 400 });
    }

    const resourceUrl = `${BASE_URL}${id}`;

    const response = await fetch(resourceUrl, {
      method: 'DELETE',
    });

    return Response.json({
      result: `Resource with ID ${id} was successfully deleted`,
      status: response.status,
      ok: response.ok,
    });
  } catch {
    return Response.json({ error: 'DELETE failed' }, { status: 500 });
  }
}
