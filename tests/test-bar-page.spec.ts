import { test, expect } from '@playwright/test';
import { BarPage } from '../pages/BarPage';

let barPage: BarPage;
test.describe('Bar page', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    barPage = new BarPage(page, isMobile);
    await barPage.goto();
  });

test('Bar page: Filter by tag', async ({ page }) => {
  const preperationWay = 'Нагреть';
  await barPage.choosePreperationWayFilter(preperationWay);
  await expect(barPage.listTitlesOfBeverage.nth(0)).toContainText('Горячий Тодди');
  let listOfTags = await barPage.getTagsNamesOfBeverage('Горячий Тодди');
  expect(listOfTags.some(tag => tag.includes('Горячий напиток'))).toBe(true);
});

test('Bar page: Filter by favorite button', async ({ page, isMobile }) => {
  if (isMobile) await barPage.filterBtnExpand.click()
  await barPage.favoriteFilter.click();
  if (isMobile) await barPage.closeFilterBtn.click()
  await expect(barPage.deleteFromFavoritesButton).toBeVisible();
  const listOfBeverage = await barPage.getListOfBeverageTitles();
  expect(listOfBeverage.some(beverage => beverage == 'Мохито')).toBe(true);
});
});