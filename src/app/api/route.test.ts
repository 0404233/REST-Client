import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('../[locale]/rest/page', () => ({
  BASE_URL: 'https://jsonplaceholder.typicode.com/posts/',
}));
(global as any).Response = {
  json: (body: any, init: { status: number }) => ({
    _body: body,
    status: init.status,
  }),
};

vi.mock('app/_lib/firebaseAdmin', () => ({
  adminAuth: { verifyIdToken: vi.fn() },
  firestore: {
    collection: vi.fn(() => ({
      add: vi.fn().mockResolvedValue(undefined),
    })),
  },
}));

global.fetch = vi.fn();

import { adminAuth, firestore } from 'app/_lib/firebaseAdmin';
import { GET, POST, PUT, PATCH, DELETE } from './route';

describe('Route handlers', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';

  beforeEach(() => {
    vi.clearAllMocks();

    let calls = 0;
    vi.spyOn(Date, 'now').mockImplementation(() => (calls++ ? 2000 : 1000));
    (adminAuth.verifyIdToken as Mock).mockResolvedValue({ uid: 'user123' });
    (fetch as unknown as Mock).mockResolvedValue({
      status: 200,
      json: async () => ({ data: 42 }),
    });
  });

  function makeReq(urlParam: string | null, authHeader: string | null, body?: any): NextRequest {
    const params = new URLSearchParams();
    if (urlParam !== null) params.set('url', urlParam);
    return {
      headers: { get: () => authHeader },
      nextUrl: { searchParams: params },
      url: 'http://test/handler',
      json: async () => body,
    } as any;
  }

  it('GET без Bearer — 401', async () => {
    const req = makeReq(BASE_URL, null);
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('GET с плохим URL — 400', async () => {
    const req = makeReq('http://bad', 'Bearer tok');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('POST с невалидным JSON — 400', async () => {
    const req = makeReq(BASE_URL + '1', 'Bearer tok');
    req.json = async () => {
      throw new Error('bad json');
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('POST успех — 200', async () => {
    const payload = { foo: 'bar' };
    const req = makeReq(BASE_URL, 'Bearer tok', {
      headers: { 'X-A': '1' },
      body: payload,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it('PUT без числа в конце URL — ошибка >=400', async () => {
    const req = makeReq(BASE_URL + 'abc', 'Bearer tok', {
      headers: {},
      body: { x: 1 },
    });
    const res = await PUT(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('PATCH без числа в конце URL — ошибка >=400', async () => {
    const req = makeReq(BASE_URL + 'foo', 'Bearer tok', {
      headers: {},
      body: { x: 1 },
    });
    const res = await PATCH(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it('DELETE без числа в конце URL — ошибка >=400', async () => {
    const req = makeReq(BASE_URL + 'bar', 'Bearer tok');
    const res = await DELETE(req);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
