import { Page, expect } from '@playwright/test';

export async function dismissCookies(page: Page) {
  await page.getByText('Dismiss').click();
}

export async function navigateToLogin(page: Page) {
  await page.locator('#navbarAccount').click(); 
  await page.locator('#navbarLoginButton').click();
}

export async function login(page: Page, email: string, password: string) {
  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.locator('#loginButton').click();
}

export async function signup(page: Page, email: string, password: string) {
  await page.getByRole('link', { name: 'Not yet a customer?' }).click();
  await page.getByLabel('Email').fill(email);
  await page.locator('#passwordControl').fill(password);
  await page.locator('#repeatPasswordControl').fill(password);
  await page.locator('mat-select[name="securityQuestion"]').click()
  await page.keyboard.press('ArrowDown+Enter');
  await page.getByText('Answer').fill('12345')
  await page.getByText('Register').click();
}
