import { expect, type Locator, type Page } from '@playwright/test';

export class RecipePage {
  //основная информация
  readonly page: Page;
  readonly savedRecipeTitle: Locator;
  readonly listOfIngridients: Locator;
  readonly addToFavorite: Locator;

  constructor(page: Page) {
    //Main section
    this.page = page;
    this.savedRecipeTitle = page.locator("h1.font-bold")
    this.listOfIngridients = page.locator("//div[@data-slot='card' and .//h3[contains(.,'Ингредиенты')]]//ul")
    this.addToFavorite = page.locator("//span[text()='Сохранить']")
  }

  async goto(recipesId: String) {
    await this.page.goto(`/recipes/${recipesId}`);
  }
}