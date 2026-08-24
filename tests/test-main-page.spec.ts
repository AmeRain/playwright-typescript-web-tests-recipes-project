import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

let mainPage: MainPage;


test.describe('Main page', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.goto();
  });

  test('Main page: Filter by category', async ({ page }) => {
    const categoryName = 'Завтрак';
    await mainPage.chooseCategory(categoryName);
    await expect(mainPage.item).toContainText(categoryName);
  });

  test('Main page: Filter by tags', async ({ page }) => {
    const tagName = 'курица';
    await mainPage.chooseTag(tagName);
    await expect(mainPage.item).toContainText(tagName);
  });

  test('Main page: Filter by cook time', async ({ page }) => {
    await mainPage.enterTime(10);
    await expect(mainPage.listOfItemsTimeLabel).toHaveCount(3);
    const cookTime = await mainPage.getFirstItemTime();
    expect(cookTime).toBeLessThanOrEqual(10);
  });
})