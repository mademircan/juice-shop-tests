import { test, expect } from '@playwright/test';
import { dismissCookies, login, navigateToLogin, signup } from '../../utils/utils';


test.describe('Authentication', () => {
  const email = `test${Date.now()}@test.com`;
  const password = '12345';

  test('User should be able to login with correct credentials', async ({ page, baseURL }) => {

    await page.goto('/');

    await dismissCookies(page);
    await navigateToLogin(page);
    await signup(page, email, password)
    await login(page, email, password);

    await expect(page.getByText(/Your Basket|Log out|Welcome/i)).toBeVisible();
  });

  test('User should not be able to login with invalid credentials', async ({ page }) => {
    await page.goto('/');

    await dismissCookies(page);
    await navigateToLogin(page);
    await login(page, "invalid_email@test.com", "invalid_password");

    await expect(page.getByText(/Invalid email or password|Unauthorized|Failed/)).toBeVisible();
  });
});