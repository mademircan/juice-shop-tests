import { test, expect, request } from '@playwright/test';

const API_URL = 'http://localhost:3000/api'
const REST_URL = 'http://localhost:3000/rest'

let authHeader: Record<string, string> = {};

test.beforeAll(async ({ request, baseURL }) => {
  const response = await request.post(`${baseURL}/rest/user/login`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: 'test@test.com',
      password: '12345'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  const token = body.authentication?.token;

  authHeader = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
});


test.describe('/rest/basket/:id', () => {
  test('GET existing basket by id is not allowed via public API', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/rest/basket/1`);
    expect(res.status()).toBe(401);
  });

  test('GET empty basket when requesting non-existing basket id', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/rest/basket/123`, {
      headers: authHeader
    });

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toMatch(/application\/json/);

    const json = await res.json();
    expect(json.data).toEqual(null);
  });

  test('GET existing basket with contained products by id', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/rest/basket/1`, {
      headers: authHeader
    });

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toMatch(/application\/json/);

    const json = await res.json();

    expect(json.data.id).toBe(1);
    expect(Array.isArray(json.data.Products)).toBeTruthy();
    expect(json.data.Products.length).toBe(3);
  });
});