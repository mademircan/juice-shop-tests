import { test, expect, request } from '@playwright/test';

const API_URL = 'http://localhost:3000/api'
const REST_URL = 'http://localhost:3000/rest'

let authHeader: Record<string, string> = {};
const jsonHeader = { 'Content-Type': 'application/json' };
const tamperingProductId = 1; // Adjust if needed


test.beforeAll(async ({ request, baseURL }) => {
  const response = await request.post(`${baseURL}/rest/user/login`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: 'test@test.com',
      password: '12345'
    }
  });
});

test.describe('/api/Products/:id', () => {

  test('GET existing product by id', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/api/Products/1`);

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toMatch(/application\/json/);

    const body = await res.json();

    const product = body.data;
    expect(typeof product.id).toBe('number');
    expect(typeof product.name).toBe('string');
    expect(typeof product.description).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.deluxePrice).toBe('number');
    expect(typeof product.image).toBe('string');
    expect(typeof product.createdAt).toBe('string');
    expect(typeof product.updatedAt).toBe('string');

    expect(product.id).toBe(1);
  });

  test('GET non-existing product by id', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/api/Products/4711`);

    expect(res.status()).toBe(404);
    expect(res.headers()['content-type']).toMatch(/application\/json/);

    const body = await res.json();
    expect(body.message).toBe('Not Found');
  });

  test('PUT update existing product (intentional vulnerability test)', async ({ request, baseURL }) => {
    const res = await request.put(`${baseURL}/api/Products/${tamperingProductId}`, {
      headers: jsonHeader,
      data: {
        description: '<a href="http://kimminich.de" target="_blank">More...</a>'
      }
    });

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toMatch(/application\/json/);

    const body = await res.json();
    expect(body.data.description).toBe('<a href="http://kimminich.de" target="_blank">More...</a>');
  });
});