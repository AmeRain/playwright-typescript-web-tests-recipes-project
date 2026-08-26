import { expect, type Locator, type Page } from '@playwright/test';

export class CoffeePage {
  readonly page: Page;
  readonly isMobile: Boolean;
  readonly instrumentsFilter: Locator;
  readonly saveFilterButton: Locator;
  readonly listTitlesOfBeverage: Locator;
  readonly filterBtnExpand: Locator;
  readonly closeFilterBtn: Locator
  readonly closeFilterBtn2: Locator
  
  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;
    this.instrumentsFilter = page.getByRole('button', { name: 'Оборудование' });
    this.saveFilterButton = this.page.getByRole('button', { name: 'Готово' })
    this.listTitlesOfBeverage = page.locator("//article//h3");
    this.filterBtnExpand = page.locator("//button[@data-slot='dialog-trigger']").filter({ visible: true })
    this.closeFilterBtn = page.locator("//button[./*[contains(.,'Закрыть')]]").nth(1)
    this.closeFilterBtn2 = page.locator("//button[./*[contains(.,'Закрыть')]]")

  }

  async goto() {
    await this.page.goto('/coffee');
    await this.page.waitForLoadState('networkidle'); 
  }

  //add category enum instead of string
  async chooseInstrument(instrument: string = 'Турка') {
    if (this.isMobile) await this.filterBtnExpand.click()
    await this.instrumentsFilter.click();
    await this.page.getByRole('checkbox', { name: 'Турка' }).click();
    if (this.isMobile){ 
      await this.closeFilterBtn.click();
      await this.closeFilterBtn2.click();
    } else await this.page.getByRole('button', { name: 'Готово' }).click();
  }

  async getListOfBeverageTitles(): Promise<string[]> {
    return await this.listTitlesOfBeverage.allTextContents();
  }

  async getTagsNamesOfBeverage(beverageName: string): Promise<string[]> {
    return await this.page.locator(`//article[contains(.,'${beverageName}')]//div[contains(@class,'space-y-2')]//div`).allTextContents();
  }

}