import { expect, type Locator, type Page } from '@playwright/test';

export class BarPage {
  readonly page: Page;
  readonly favoriteFilter: Locator;
  readonly deleteFromFavoritesButton: Locator;
  readonly listTitlesOfBeverage: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.favoriteFilter = page.getByRole('button', { name: 'Избранное' });
    this.deleteFromFavoritesButton = page.getByRole('button', { name: 'Удалить рецепт из сохранённых' });
    this.listTitlesOfBeverage = page.locator("//article//h3");
  }

  async goto() {
    await this.page.goto('/bar');
    await this.page.waitForLoadState('networkidle'); 
  }

  //add category enum instead of string
  async choosePreperationWayFilter(preperationWay: string = 'Нагреть') {
    const preperationWayFilter = this.page.locator(`//button[contains(text(),'${preperationWay}')]`);
    await expect(preperationWayFilter).toBeVisible();
    await expect(preperationWayFilter).toBeEnabled();
    await preperationWayFilter.hover();
    await preperationWayFilter.click();
  }

  async getListOfBeverageTitles(): Promise<string[]> {
    return await this.listTitlesOfBeverage.allTextContents();
  }

  async getTagsNamesOfBeverage(beverageName: string): Promise<string[]> {
    return await this.page.locator(` //article[contains(.,'${beverageName}')]//div[contains(@class,'rounded-full')]`).allTextContents();
  }

}