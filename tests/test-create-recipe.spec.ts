import { test, expect, APIRequestContext } from '@playwright/test';
import { AddRecipePage } from '../pages/AddRecipePage';
import path from 'path';
import { RecipePage } from '../pages/RecipePage';

test.use({ launchOptions: { slowMo: 500 } });

let addRecipePage: AddRecipePage;
let recipePage: RecipePage;
let testSupportApi: APIRequestContext;
let recipeId: string;

test.describe('Create recipe', () => {

  test.beforeEach(async ({ page }) => {
    addRecipePage = new AddRecipePage(page);
    recipePage = new RecipePage(page);
    await addRecipePage.goto();
  }); 

  test.beforeAll(async ({playwright}) => {
    testSupportApi = await playwright.request.newContext({
      // baseURL: `${process.env.URL}/api/test-support/v1`,
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        Accept: 'application/json',
      },
    })
  })

  test.afterAll(async ({ }) => {
    await deleteRecipeById(recipeId);
    // Dispose all responses.
    await testSupportApi.dispose();
  });


  test('Save recipe', async ({page}) => {

    await test.step('Save recipe and wait for response', async () => {
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
    })
    
    await test.step('Save recipe and wait for response', async () => {

      page.on('request', request => console.log('>>', request.method(), request.url()));
      page.on('response', response => console.log('<<', response.status(), response.url()));

      const responsePromise = page.waitForResponse('**/recipes?select=**');

      await addRecipePage.saveRecipeButton.click();

      const response = await responsePromise;
      const responseBody = await response.json();
      console.log(responseBody);
    })

    await addRecipePage.savedRecipeTitle.waitFor({ state: 'visible' });
    await expect(addRecipePage.savedRecipeTitle).toContainText('Грузинский салат', { timeout: 15000 });
    extractRecipesIdFromUrl(page.url())
  })

    test('Save recipe with photo and check created recipe', async ({page}) => {

    await test.step('Save recipe and wait for response', async () => {
      await addRecipePage.goto();
      await addRecipePage.fillTitle('Грузинский салат');
      await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
      await addRecipePage.fillServings('4');
      await addRecipePage.fillCookTime('40');
      await addRecipePage.fillNotes('салат довольно жирный');

      await addRecipePage.photoBlock.click();
      await addRecipePage.uploadPhoto.setInputFiles(path.join("test-files/", 'salad.png'));
      await addRecipePage.applyPhotoCut.click();

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
    })
    
    await test.step('Save recipe and wait for response', async () => {

      page.on('request', request => console.log('>>', request.method(), request.url()));
      page.on('response', response => console.log('<<', response.status(), response.url()));

      const responsePromise = page.waitForResponse('**/recipes?select=**');

      await addRecipePage.saveRecipeButton.click();

      const response = await responsePromise;
      const responseBody = await response.json();
      console.log(responseBody);
    })
   
    await expect(recipePage.savedRecipeTitle).toBeVisible();
    await expect(recipePage.savedRecipeTitle).toContainText('Грузинский салат', { timeout: 15000 });
    extractRecipesIdFromUrl(page.url())
    await expect(recipePage.listOfIngridients).toContainText('Укроп');
    await expect(recipePage.listOfIngridients).toContainText('Грецкие орехи');
  })
});

async function deleteRecipeById(recipeId: string) {
  if (recipeId != undefined) {
    const deleteRecipes = await testSupportApi.delete(`${process.env.URL}/api/test-support/v1/recipes/${recipeId}`);
    expect(deleteRecipes.ok()).toBeTruthy();
    console.log((await deleteRecipes.body()).toString());
  }
  else console.log("The recipe was not created or failed to get recipesId");
}

function extractRecipesIdFromUrl(pageUrl: string): string {
   const startRecipesId = pageUrl.lastIndexOf('/');
    recipeId = pageUrl.substring(startRecipesId + 1);
    console.log('recipeId: ', recipeId);
    return recipeId;
}