import { test, expect } from '@playwright/test';
import { dismissCookies, login, navigateToLogin, signup } from '../../utils/utils';

test('User should be able to add item/items into basket and complete the purchase', async ({ page }) => {
  await page.goto('/');
  await dismissCookies(page);
  await navigateToLogin(page);
  await login(page, "test1@test.com", "12345");

  const productCount = await page.locator('div.mdc-card').count();
  expect(productCount).toBeGreaterThan(0);
  const firstAdd = page.locator('button[aria-label="Add to Basket"]').first();
  await firstAdd.click();

  await page.getByText('Your Basket').click();
  const basketCount = await page.locator('mat-row', { hasText: 'Apple Juice (1000ml)' }).count();
  expect(basketCount).toBeGreaterThan(0);

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByText('John Smith').click();
  await page.getByText('Continue').click();
  await page.getByText('1 Days').click(); 
  await page.getByText('Me want it!').click();
  await page.getByText('Continue').click();
  await page.getByRole('radio').click();
  await page.getByText('Continue').click();
  await page.getByText('Place your order and pay').click();
  await expect(page.getByText('Thank you for your purchase')).toBeVisible({ timeout: 10000 });
  
});


test('User should be able to submit a feedback through Customer Feedback form', async ({ page }) => {
  await page.goto('/');
  await dismissCookies(page);
  await navigateToLogin(page);
  await login(page, "test1@test.com", "12345");

  await page.getByLabel('Open Sidenav').click();
  await page.getByText('Complaint').click();

    // fill in complaint form
  await page.getByPlaceholder('What would you like to tell us?').fill('This is an automated test complaint — product arrived late.');
  await page.getByText('Submit').click();

  await expect(page.locator('div.confirmation')).toBeVisible();

});