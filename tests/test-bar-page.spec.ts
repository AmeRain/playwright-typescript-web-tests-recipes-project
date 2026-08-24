import { test, expect } from '@playwright/test';
import { BarPage } from '../pages/BarPage';

let barPage: BarPage;
test.describe('Bar page', () => {
  test.beforeEach(async ({ page }) => {
    barPage = new BarPage(page);
    await barPage.goto();
  });

test('Bar page: Filter by tag', async ({ page }) => {
  const preperationWay = 'Нагреть';
  await barPage.choosePreperationWayFilter(preperationWay);
  await expect(barPage.listTitlesOfBeverage.nth(0)).toContainText('Горячий Тодди');
  let listOfTags = await barPage.getTagsNamesOfBeverage('Горячий Тодди');
  expect(listOfTags.some(tag => tag.includes('Горячий напиток'))).toBe(true);
});

test('Bar page: Filter by favorite button', async ({ page }) => {
  await barPage.favoriteFilter.click();
  await expect(barPage.deleteFromFavoritesButton).toBeVisible();
  const listOfBeverage = await barPage.getListOfBeverageTitles();
  expect(listOfBeverage.some(beverage => beverage == 'Мохито')).toBe(true);
});
});