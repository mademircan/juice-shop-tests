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


