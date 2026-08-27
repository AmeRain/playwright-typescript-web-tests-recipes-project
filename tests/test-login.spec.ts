import { test, expect } from '@playwright/test';

// test('test auth faild', async ({ page }) => {
//   await page.goto('/login');
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('user');
//   await page.getByRole('textbox', { name: 'Пароль' }).click();
//   await page.getByRole('textbox', { name: 'Пароль' }).fill('pass');
//   await page.getByRole('button', { name: 'Войти' }).click();

//   await expect(page.getByRole('link', { name: 'Wife Recipes' })).not.toBeVisible();
//   await expect(page.getByLabel('Добавить рецепт')).not.toBeVisible();
// });

test('test-show', async ({ page }) => {
  await test.step('Go to main page site', async () => {
    await page.goto('/');
  });
  await test.step('Icon logo and button "Добавить рецепт" is visible', async () => {
    await expect(page.getByTestId('app-home')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Добавить рецепт' })).toBeVisible();
  });
});