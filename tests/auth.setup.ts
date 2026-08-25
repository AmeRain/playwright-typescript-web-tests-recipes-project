import { expect, test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('авторизация', async ({ page }) => {
  console.log(`URL: ${process.env.BASE_URL}`)
  await page.goto('/login');

  await page.getByLabel('Email').fill(process.env.TEST_EMAIL);
  await page.getByLabel('Пароль').fill(process.env.TEST_PASSWORD);
  await page.getByRole('button', { name: 'Войти' }).click();


  await page.waitForLoadState('networkidle'); 
  await page.waitForTimeout(10000);
  await expect(page).toHaveURL(/\/recipes/);

  await page.context().storageState({ path: authFile });
});