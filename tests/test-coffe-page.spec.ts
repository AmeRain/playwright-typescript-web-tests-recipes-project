import { test, expect } from '@playwright/test';
import { CoffeePage } from '../pages/CoffePage';

let coffeePage: CoffeePage;
test.describe('Coffee page', () => {
  test.beforeEach(async ({ page }) => {
    coffeePage = new CoffeePage(page);
    await coffeePage.goto();
  });

test('test filter on coffe page', async ({ page }) => {
  let coffeeName = 'Кофе по-турецки';
  await coffeePage.goto(); 
  await coffeePage.chooseInstrument('Турка');
  await expect(page.getByRole('article').first()).toContainText('Турка');
  const listOfBeverage = await coffeePage.getListOfBeverageTitles();
  expect(listOfBeverage.some(beverage => beverage.includes(coffeeName))).toBe(true);
  const listOfTags = await coffeePage.getTagsNamesOfBeverage(coffeeName);
  expect(listOfTags.some(tag => tag.includes('Турка'))).toBe(true);
});
});