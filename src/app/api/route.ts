import { NextRequest } from 'next/server';
import { adminAuth, firestore } from 'app/_lib/firebaseAdmin';
import { BASE_URL } from '../[locale]/rest/page';

interface AnalyticsData {
  userId: string;
  duration: number;
  statusCode: number;
  method: string;
  requestSize: number;
  responseSize: number;
  endpoint: string | null;
  url: string;
  error?: string;
  requestDetails?: {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
  };
}

interface RequestData {
  body: unknown;
  headers: Record<string, string>;
}

async function saveAnalytics(analyticsData: AnalyticsData): Promise<void> {
  try {
    await firestore.collection('requestHistory').add({
      ...analyticsData,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Failed to save analytics:', error);
  }
}

async function authenticateRequest(request: NextRequest): Promise<string | null> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

function extractIdFromUrl(url: string): string | null {
  const idPart = url.substring(BASE_URL.length);
  return /^\d+$/.test(idPart) ? idPart : null;
}

async function handleApiRequest(
  request: NextRequest,
  method: string,
  handler: (url: string, requestData?: RequestData) => Promise<Response>
): Promise<Response> {
  const startTime = Date.now();
  let statusCode = 500;
  let responseSize = 0;
  let requestBodySize = 0;
  let userId: string | null = null;
  let errorDetails: string | null = null;
  let requestDetails: AnalyticsData['requestDetails'] | undefined = undefined;

  try {
    userId = await authenticateRequest(request);

    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
      return Response.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    let response: Response;

    if (method !== 'GET' && method !== 'DELETE') {
      try {
        const requestData: RequestData = await request.json();
        requestBodySize = new TextEncoder().encode(JSON.stringify(requestData)).length;
        requestDetails = {
          url: url,
          method: method,
          headers: requestData.headers,
          body: JSON.stringify(requestData.body),
        };

        response = await handler(url, requestData);
      } catch (error) {
        errorDetails = error instanceof Error ? error.message : 'Invalid request body';
        statusCode = 400;
        throw new Error(errorDetails);
      }
    } else {
      requestDetails = {
        url: url,
        method: method,
        headers: {},
      };

      response = await handler(url);
    }

    const result = await response.json();
    statusCode = response.status;
    responseSize = new TextEncoder().encode(JSON.stringify(result)).length;

    const endTime = Date.now();
    const duration = endTime - startTime;

    await saveAnalytics({
      userId,
      duration,
      statusCode,
      method,
      requestSize: requestBodySize,
      responseSize,
      endpoint: url,
      url: request.url,
      requestDetails,
    });

    return Response.json(result, { status: response.status });
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    errorDetails = error instanceof Error ? error.message : 'Unknown error';

    if (userId) {
      const url = request.nextUrl.searchParams.get('url');
      await saveAnalytics({
        userId,
        duration,
        statusCode,
        method,
        requestSize: requestBodySize,
        responseSize,
        error: errorDetails,
        endpoint: url,
        url: request.url,
        requestDetails,
      });
    }

    return Response.json({ error: errorDetails }, { status: statusCode });
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  return handleApiRequest(request, 'GET', async (url: string) => {
    const response = await fetch(url, { method: 'GET' });
    return response;
  });
}

export async function POST(request: NextRequest): Promise<Response> {
  return handleApiRequest(request, 'POST', async (url: string, requestData?: RequestData) => {
    if (!requestData) {
      throw new Error('Request data is required for POST');
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(requestData.body),
      headers: {
        'Content-Type': 'application/json',
        ...requestData.headers,
      },
    });

    return response;
  });
}

export async function PUT(request: NextRequest): Promise<Response> {
  return handleApiRequest(request, 'PUT', async (url: string, requestData?: RequestData) => {
    if (!requestData) {
      throw new Error('Request data is required for PUT');
    }

    const id = extractIdFromUrl(url);
    if (!id) {
      throw new Error('ID is required for PUT request');
    }

    const response = await fetch(`${BASE_URL}${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData.body),
      headers: {
        'Content-Type': 'application/json',
        ...requestData.headers,
      },
    });

    return response;
  });
}

export async function PATCH(request: NextRequest): Promise<Response> {
  return handleApiRequest(request, 'PATCH', async (url: string, requestData?: RequestData) => {
    if (!requestData) {
      throw new Error('Request data is required for PATCH');
    }

    const id = extractIdFromUrl(url);
    if (!id) {
      throw new Error('ID is required for PATCH request');
    }

    const response = await fetch(`${BASE_URL}${id}`, {
      method: 'PATCH',
      body: JSON.stringify(requestData.body),
      headers: {
        'Content-Type': 'application/json',
        ...requestData.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`PATCH request failed: ${response.statusText}`);
    }

    return response;
  });
}

export async function DELETE(request: NextRequest): Promise<Response> {
  return handleApiRequest(request, 'DELETE', async (url: string) => {
    const id = extractIdFromUrl(url);
    if (!id) {
      throw new Error('ID is required for DELETE request');
    }

    const response = await fetch(`${BASE_URL}${id}`, {
      method: 'DELETE',
    });

    return response;
  });
}
