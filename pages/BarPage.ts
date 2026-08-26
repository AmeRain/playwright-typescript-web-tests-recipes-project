import { expect, type Locator, type Page } from '@playwright/test';

export class BarPage {
  readonly page: Page;
  readonly isMobile: Boolean;
  readonly favoriteFilter: Locator;
  readonly deleteFromFavoritesButton: Locator;
  readonly listTitlesOfBeverage: Locator;
  readonly filterBtnExpand: Locator;
  readonly closeFilterBtn: Locator
  
  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;
    this.favoriteFilter = page.getByRole('button', { name: 'Избранное' });
    this.deleteFromFavoritesButton = page.getByRole('button', { name: 'Удалить рецепт из сохранённых' });
    this.listTitlesOfBeverage = page.locator("//article//h3");
    this.filterBtnExpand = page.locator("//button[@data-slot='dialog-trigger']")
    this.closeFilterBtn = page.locator("//button[./*[contains(.,'Закрыть')]]")
  }

  async goto() {
    await this.page.goto('/bar');
    await this.page.waitForLoadState('networkidle'); 
  }

  //add category enum instead of string
  async choosePreperationWayFilter(preperationWay: string = 'Нагреть') {
    if (this.isMobile) await this.filterBtnExpand.click()
    const preperationWayFilter = this.page.locator(`//button[contains(.,'${preperationWay}')]`).filter( {visible: true} );
    await expect(preperationWayFilter).toBeVisible();
    await expect(preperationWayFilter).toBeEnabled();
    await preperationWayFilter.hover();
    await preperationWayFilter.click();
    if (this.isMobile) await this.closeFilterBtn.click()
  }

  async getListOfBeverageTitles(): Promise<string[]> {
    return await this.listTitlesOfBeverage.allTextContents();
  }

  async getTagsNamesOfBeverage(beverageName: string): Promise<string[]> {
    return await this.page.locator(` //article[contains(.,'${beverageName}')]//div[contains(@class,'rounded-full')]`).allTextContents();
  }

}