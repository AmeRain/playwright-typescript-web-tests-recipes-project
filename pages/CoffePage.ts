import { expect, type Locator, type Page } from '@playwright/test';

export class CoffeePage {
  readonly page: Page;
  readonly instrumentsFilter: Locator;
  readonly saveFilterButton: Locator;
  readonly listTitlesOfBeverage: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.instrumentsFilter = page.getByRole('button', { name: 'Оборудование' });
    this.saveFilterButton = this.page.getByRole('button', { name: 'Готово' })
    this.listTitlesOfBeverage = page.locator("//article//h3");
  }

  async goto() {
    await this.page.goto('/coffee');
    await this.page.waitForLoadState('networkidle'); 
  }

  //add category enum instead of string
  async chooseInstrument(instrument: string = 'Турка') {
     await this.instrumentsFilter.click();
    await this.page.getByRole('checkbox', { name: 'Турка' }).click();
    await this.page.getByRole('button', { name: 'Готово' }).click();
  }

  async getListOfBeverageTitles(): Promise<string[]> {
    return await this.listTitlesOfBeverage.allTextContents();
  }

  async getTagsNamesOfBeverage(beverageName: string): Promise<string[]> {
    return await this.page.locator(`//article[contains(.,'${beverageName}')]//div[contains(@class,'space-y-2')]//div`).allTextContents();
  }

}