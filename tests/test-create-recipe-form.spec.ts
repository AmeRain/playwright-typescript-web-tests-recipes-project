import { test, expect } from '@playwright/test';
import { AddRecipePage } from '../pages/AddRecipePage';

test.use({ launchOptions: { slowMo: 500 } });

let addRecipePage: AddRecipePage;

test.describe('Add recipe page', () => {
  test.beforeEach(async ({ page }) => {
    addRecipePage = new AddRecipePage(page);
    await addRecipePage.goto();
  });

  test('Заполнение основной формы при создании рецепта', async ({ page }) => {
    await addRecipePage.goto();
    await addRecipePage.fillTitle('Грузинский салат');
    await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
    await addRecipePage.fillServings('4');
    await addRecipePage.fillCookTime('40');
    await addRecipePage.fillNotes('салат довольно жирный');
    await expect(addRecipePage.filledLabel).toContainText('1/7 заполнено');

    await expect(addRecipePage.filledPercentageLabel).toContainText('14%');
    await expect(addRecipePage.readyLabel).toContainText('готово');
    await expect(addRecipePage.readyIcon).toBeVisible();

    await expect(addRecipePage.readyIngredientsIcon).toBeVisible;
    await addRecipePage.checkMessageRecipesReady();
  });


  test('Заполнение основной информации и ингредиентов при создании рецепта', async ({ page }) => {
    await addRecipePage.goto();
    await addRecipePage.fillTitle('Грузинский салат');
    await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
    await addRecipePage.fillServings('4');
    await addRecipePage.fillCookTime('40');
    await addRecipePage.fillNotes('салат довольно жирный');

    await addRecipePage.ingredientsBlock.click();
    await addRecipePage.fillIngredients('Укроп');
    await addRecipePage.inputCountOfIngredients('1');
    await addRecipePage.fillQuantityIngridient('шт');
    await addRecipePage.addIngredientButton.click();
    await addRecipePage.fillIngredients('Грецкие орехи', 1);
    await addRecipePage.inputCountOfIngredients('25', 1);
    await addRecipePage.fillQuantityIngridient('шт', 1);

    await addRecipePage.checkIngredientCount(2);
    await expect(addRecipePage.filledStepsLabel).toContainText('2/2 обязательных');
    await expect(addRecipePage.readyToSave).toBeVisible();
    await expect(addRecipePage.mainBlockIsReadyLabel).toContainText('готово');
    await expect(addRecipePage.mainBlockIsReadyIcon).toBeVisible;
    await expect(addRecipePage.ingredientsBlockIsReadyIcon).toBeVisible;
    await expect(addRecipePage.messageThereAreUnsavedChanges).toBeVisible();
    await expect(addRecipePage.messageRecipesAdvice).not.toBeVisible();
    await expect(addRecipePage.messageReadyToSave).toBeVisible();
  });

});