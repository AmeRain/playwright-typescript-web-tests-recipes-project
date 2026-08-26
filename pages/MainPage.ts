import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly isMobile: Boolean;
  readonly categoriesFilter: Locator;
  readonly tagsFilter: Locator;
  readonly timeFilter: Locator;
  readonly item: Locator;
  readonly listOfItemsTimeLabel: Locator;
  readonly filterBtnExpand: Locator
  readonly applyFilterBtn: Locator

  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;
    this.categoriesFilter = page.getByRole('combobox').filter({ hasText: 'Все категории' });
    this.tagsFilter = page.getByRole('combobox').filter({ hasText: 'Все теги' });
    this.timeFilter = this.isMobile ? page.getByRole('spinbutton', { name: 'До N минут' }) : page.getByPlaceholder('До N минут');
    this.item = page.getByRole('main');
    this.listOfItemsTimeLabel = page.locator("//article//span[contains(.,'мин')]");
    this.filterBtnExpand = page.locator("//button[@data-slot='dialog-trigger']")
    this.applyFilterBtn = page.locator("//button[contains(.,'Показать') and not(contains(.,'ещ'))]")
  }

  async goto() {
    await this.page.goto('/recipes');
  }

  //add category enum instead of string
  async chooseCategory(categoryName: string = 'Завтрак') {
    if (this.isMobile) await this.filterBtnExpand.click()
    await this.categoriesFilter.click();
    await this.page.getByRole('option', { name: categoryName }).click();
    if (this.isMobile) await this.applyFilterBtn.click()
  }

  async chooseTag(tagName: string = 'курица') {
    if (this.isMobile) await this.filterBtnExpand.click()
    await this.tagsFilter.click();
    await this.page.locator(`//span[contains(.,'#${tagName}')]`).click();
    if (this.isMobile) await this.applyFilterBtn.click()
  }

   async enterTime(time: number = 10) {
    if (this.isMobile) await this.filterBtnExpand.click()
    await this.timeFilter.click();
    await this.timeFilter.fill(time.toString());
    if (this.isMobile) await this.applyFilterBtn.click()
  }

  async getFirstItemTime(): Promise<number | undefined> {
    await expect(this.listOfItemsTimeLabel.first()).toBeVisible();
    let cookTimeWithText = await this.listOfItemsTimeLabel.first().textContent();
    let cookTime = cookTimeWithText?.split(' ')[1];
    return cookTime ? Number(cookTime) : undefined;
  }
}