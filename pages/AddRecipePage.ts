import { expect, type Locator, type Page } from '@playwright/test';

export class AddRecipePage {
  //основная информация
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly servingsInput: Locator;
  readonly cookTimeInput: Locator;
  readonly notesInput: Locator;
  //идикаторы заполненности и готовности
  readonly filledLabel: Locator;
  readonly filledPercentageLabel: Locator;
  readonly readyLabel: Locator;
  readonly readyIcon: Locator;
  readonly readyIngredientsIcon: Locator;
  readonly mainBlockIsReadyLabel: Locator;
  readonly mainBlockIsReadyIcon: Locator;
  readonly ingredientsBlockIsReadyIcon: Locator;
  readonly filledStepsLabel: Locator;
  // readonly messageRecipesReadyLabel: Locator;
  //попап с сообщением о незаполненных обязательных полях
  readonly additionalMessageRecipesReadyLabel: Locator;
  readonly messageRecipesRequiredFieldsLabel: Locator;
  readonly messageRecipesAdvice: Locator;
  readonly messageReadyToSave: Locator;
  readonly messageThereAreUnsavedChanges: Locator;
  readonly readyToSave: Locator;
  //доп информация
  readonly ingredientsBlock: Locator;
  readonly ingredientsInput: Locator;
  readonly ingredientsCountInput: Locator;
  readonly addIngredientButton: Locator;
  readonly ingredientsQuantityCombobox: Locator;
  readonly photoBlock: Locator;
  readonly applyPhotoCut: Locator;
  readonly uploadPhoto: Locator;

  //Save recipe
  readonly saveRecipeButton: Locator;
  readonly savedRecipeTitle: Locator;

  constructor(page: Page) {
    //Main section
    this.page = page;
    this.titleInput = page.getByTestId('recipe-title-input');
    this.descriptionInput = page.getByTestId('recipe-description-input');
    this.servingsInput = page.getByTestId('recipe-portions-input');
    this.cookTimeInput = page.getByTestId('recipe-cooking-time-input');
    this.notesInput = page.getByTestId('recipe-notes-input');

    this.filledLabel = page.locator("//p[contains(.,'Заполненность рецепта')]/following-sibling::p");
    this.filledPercentageLabel = page.locator("//div[@class='mt-4' and .//p[contains(.,'Заполненность рецепта')]]//p[contains(.,'%')]");
    this.readyLabel = page.locator("//span[contains(.,'Основное')]/following-sibling::span");
    this.readyIcon = page.locator("//span[./span[contains(.,'Основное')]]/preceding-sibling::span/*[local-name()='svg']");
    this.readyIngredientsIcon = page.locator("//span[contains(.,'Ингредиенты')]/following-sibling::span//svg");
    this.messageThereAreUnsavedChanges = page.getByText('Есть несохранённые изменения');
    this.mainBlockIsReadyLabel = page.locator("//span[contains(.,'Основное')]/following-sibling::span");
    this.mainBlockIsReadyIcon = page.locator("//span[.//span[contains(.,'Основное')]]/preceding-sibling::*/*[contains(@class,'lucide-check-icon')]");
    this.ingredientsBlockIsReadyIcon = page.locator("//span[.//span[contains(.,'Ингредиенты')]]/preceding-sibling::*/*[contains(@class,'cide-circle-icon')]");
    // this.messageRecipesReadyLabel = page.locator("//div[@class='mt-4' and .//p[contains(.,'Заполненность рецепта')]]//p[contains(.,'Есть несохранённые изменения')]");
    this.additionalMessageRecipesReadyLabel = page.getByText('Нужно дозаполнить').nth(1);
    this.messageRecipesRequiredFieldsLabel = page.getByText('Есть незаполненные обязательные поля');
    this.messageRecipesAdvice = page.locator("//button[contains(.,'Перед сохранением лучше заполнить: ингредиенты. Нажми, чтобы перейти')]");
    this.messageReadyToSave = page.locator("//button[contains(.,'Обязательные поля заполнены, рецепт можно сохранять')]");

    //Ingredients section
    this.ingredientsBlock = page.locator("//span[contains(.,'Ингредиенты') and following-sibling::span[contains(.,'список')]]/following-sibling::span");
    this.ingredientsInput = page.locator("//*[contains(@data-test,'recipe-ingredient-') and contains(@data-test,'-name-input')]");
    this.ingredientsCountInput = page.locator("//*[contains(@data-test,'recipe-ingredient-') and contains(@data-test,'-amount-input')]");
    this.addIngredientButton = page.getByTestId('recipe-ingredient-add');
    this.readyToSave = page.getByText('Готово к сохранению');
    this.ingredientsQuantityCombobox = page.locator("//*[contains(@data-test,'recipe-ingredient-') and contains(@data-test,'-unit-select')]");
    this.filledStepsLabel = page.getByRole('complementary');

    //Photo block
    this.photoBlock = page.locator("button[aria-controls=recipe-form-section-images]");
    this.applyPhotoCut = page.locator("//div[@id='recipe-form-section-images']//button[contains(.,'Применить обрезку')]")
    this.uploadPhoto = page.locator("div#recipe-form-section-images input")

    this.saveRecipeButton = page.getByTestId('recipe-save');
    this.savedRecipeTitle = page.locator("h1.font-bold")
  }

  async goto() {
    await this.page.goto('/recipes/new');
  }

  //add category enum instead of string
  async fillTitle(title: string = 'Грузинский салат') {
    await this.titleInput.click();
    await this.titleInput.fill(title);
  }

  async fillDescription(description: string = 'Салат с ореховым соусом по грузински') {
    await this.descriptionInput.click();
    await this.descriptionInput.fill(description);
  }

  async fillServings(servings: string = '4') {
    await this.servingsInput.click();
    await this.servingsInput.fill(servings);
  }

  async fillCookTime(cookTime: string = '40') {
    await this.cookTimeInput.click();
    await this.cookTimeInput.fill(cookTime);
  }

  async fillNotes(notes: string = 'салат довольно жирный') {
    await this.notesInput.click();
    await this.notesInput.fill(notes);
  }

  async checkMessageRecipesReady() {
    await expect(this.additionalMessageRecipesReadyLabel).toBeVisible();
    await expect(this.messageRecipesRequiredFieldsLabel).toBeVisible();
    await expect(this.messageRecipesAdvice).toBeVisible();
  }

  async inputCountOfIngredients(inputCount: string = '1', ingridientIndex?: number) {
    const ingredientsCountInput = ingridientIndex ? this.ingredientsCountInput.nth(ingridientIndex) : this.ingredientsCountInput;
    await ingredientsCountInput.click();
    await ingredientsCountInput.fill(inputCount);
  }

  async fillIngredients(ingredientName: string = 'Укроп', ingridientIndex?: number) {
    const input = ingridientIndex ? this.ingredientsInput.nth(ingridientIndex) : this.ingredientsInput.first();
    await input.click();
    await input.fill(ingredientName);
  }

  async fillQuantityIngridient(quantityIngredientName: string = 'шт', quantityIngredientIndex?: number) {
    const input = quantityIngredientIndex ? this.ingredientsQuantityCombobox.nth(quantityIngredientIndex) : this.ingredientsQuantityCombobox.first();
    await input.click();
    await this.page.getByRole('option', { name: quantityIngredientName }).click();
  }

  async checkIngredientCount(count: number) {
    await expect(this.page.getByRole('button', { name: `Ингредиенты ${count}` })).toBeVisible();
  }
}