import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly categoriesFilter: Locator;
  readonly tagsFilter: Locator;
  readonly timeFilter: Locator;
  readonly item: Locator;
  readonly listOfItemsTimeLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoriesFilter = page.getByRole('combobox').filter({ hasText: 'Все категории' });
    this.tagsFilter = page.getByRole('combobox').filter({ hasText: 'Все теги' });
    this.timeFilter = page.getByPlaceholder('До N минут');
    this.item = page.getByRole('main');
    this.listOfItemsTimeLabel = page.locator("//article//span[contains(.,'мин')]");
  }

  async goto() {
    await this.page.goto('/recipes');
  }

  //add category enum instead of string
  async chooseCategory(categoryName: string = 'Завтрак') {
    await this.categoriesFilter.click();
    await this.page.getByRole('option', { name: categoryName }).click();
  }

  async chooseTag(tagName: string = 'курица') {
    await this.tagsFilter.click();
    await this.page.locator(`//span[contains(.,'#${tagName}')]`).click();
  }

   async enterTime(time: number = 10) {
    await this.timeFilter.click();
    await this.timeFilter.fill(time.toString());
  }

  async getFirstItemTime(): Promise<number | undefined> {
    await expect(this.listOfItemsTimeLabel.first()).toBeVisible();
    let cookTimeWithText = await this.listOfItemsTimeLabel.first().textContent();
    let cookTime = cookTimeWithText?.split(' ')[1];
    return cookTime ? Number(cookTime) : undefined;
  }
}