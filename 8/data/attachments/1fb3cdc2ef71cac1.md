# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-create-recipe.spec.ts >> Create recipe >> Save recipe with photo and check created recipe
- Location: tests/test-create-recipe.spec.ts:81:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  34  |     await testSupportApi.dispose();
  35  |   });
  36  | 
  37  | 
  38  |   test('Save recipe', async ({page}) => {
  39  | 
  40  |     await test.step('Save recipe and wait for response', async () => {
  41  |       await addRecipePage.goto();
  42  |       await addRecipePage.fillTitle('Грузинский салат');
  43  |       await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
  44  |       await addRecipePage.fillServings('4');
  45  |       await addRecipePage.fillCookTime('40');
  46  |       await addRecipePage.fillNotes('салат довольно жирный');
  47  | 
  48  |       await addRecipePage.ingredientsBlock.click();
  49  |       await addRecipePage.fillIngredients('Укроп');
  50  |       await addRecipePage.inputCountOfIngredients('1');
  51  |       await addRecipePage.fillQuantityIngridient('шт');
  52  |       await addRecipePage.addIngredientButton.click();
  53  |       await addRecipePage.fillIngredients('Грецкие орехи', 1);
  54  |       await addRecipePage.inputCountOfIngredients('25', 1);
  55  |       await addRecipePage.fillQuantityIngridient('шт', 1);
  56  | 
  57  |       await addRecipePage.checkIngredientCount(2);
  58  |       await expect(addRecipePage.filledStepsLabel).toContainText('2/2 обязательных');
  59  |       await expect(addRecipePage.readyToSave).toBeVisible();
  60  |     })
  61  |     
  62  |     await test.step('Save recipe and wait for response', async () => {
  63  | 
  64  |       page.on('request', request => console.log('>>', request.method(), request.url()));
  65  |       page.on('response', response => console.log('<<', response.status(), response.url()));
  66  | 
  67  |       const responsePromise = page.waitForResponse('**/recipes?select=**');
  68  | 
  69  |       await addRecipePage.saveRecipeButton.click();
  70  | 
  71  |       const response = await responsePromise;
  72  |       const responseBody = await response.json();
  73  |       console.log(responseBody);
  74  |     })
  75  | 
  76  |     await addRecipePage.savedRecipeTitle.waitFor({ state: 'visible' });
  77  |     await expect(addRecipePage.savedRecipeTitle).toContainText('Грузинский салат', { timeout: 15000 });
  78  |     extractRecipesIdFromUrl(page.url())
  79  |   })
  80  | 
  81  |     test('Save recipe with photo and check created recipe', async ({page}) => {
  82  | 
  83  |     await test.step('Save recipe and wait for response', async () => {
  84  |       await addRecipePage.goto();
  85  |       await addRecipePage.fillTitle('Грузинский салат');
  86  |       await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
  87  |       await addRecipePage.fillServings('4');
  88  |       await addRecipePage.fillCookTime('40');
  89  |       await addRecipePage.fillNotes('салат довольно жирный');
  90  | 
  91  |       await addRecipePage.photoBlock.click();
  92  |       await addRecipePage.uploadPhoto.setInputFiles(path.join("test-files/", 'salad.png'));
  93  |       await addRecipePage.applyPhotoCut.click();
  94  | 
  95  |       await addRecipePage.ingredientsBlock.click();
  96  |       await addRecipePage.fillIngredients('Укроп');
  97  |       await addRecipePage.inputCountOfIngredients('1');
  98  |       await addRecipePage.fillQuantityIngridient('шт');
  99  |       await addRecipePage.addIngredientButton.click();
  100 |       await addRecipePage.fillIngredients('Грецкие орехи', 1);
  101 |       await addRecipePage.inputCountOfIngredients('25', 1);
  102 |       await addRecipePage.fillQuantityIngridient('шт', 1);
  103 | 
  104 |       await addRecipePage.checkIngredientCount(2);
  105 |       await expect(addRecipePage.filledStepsLabel).toContainText('2/2 обязательных');
  106 |       await expect(addRecipePage.readyToSave).toBeVisible();
  107 |     })
  108 |     
  109 |     await test.step('Save recipe and wait for response', async () => {
  110 | 
  111 |       page.on('request', request => console.log('>>', request.method(), request.url()));
  112 |       page.on('response', response => console.log('<<', response.status(), response.url()));
  113 | 
  114 |       const responsePromise = page.waitForResponse('**/recipes?select=**');
  115 | 
  116 |       await addRecipePage.saveRecipeButton.click();
  117 | 
  118 |       const response = await responsePromise;
  119 |       const responseBody = await response.json();
  120 |       console.log(responseBody);
  121 |     })
  122 |    
  123 |     await expect(recipePage.savedRecipeTitle).toBeVisible();
  124 |     await expect(recipePage.savedRecipeTitle).toContainText('Грузинский салат', { timeout: 15000 });
  125 |     extractRecipesIdFromUrl(page.url())
  126 |     await expect(recipePage.listOfIngridients).toContainText('Укроп');
  127 |     await expect(recipePage.listOfIngridients).toContainText('Грецкие орехи');
  128 |   })
  129 | });
  130 | 
  131 | async function deleteRecipeById(recipeId: string) {
  132 |   if (recipeId != undefined) {
  133 |     const deleteRecipes = await testSupportApi.delete(`${process.env.URL}/api/test-support/v1/recipes/${recipeId}`);
> 134 |     expect(deleteRecipes.ok()).toBeTruthy();
      |                                ^ Error: expect(received).toBeTruthy()
  135 |     console.log((await deleteRecipes.body()).toString());
  136 |   }
  137 |   else console.log("The recipe was not created or failed to get recipesId");
  138 | }
  139 | 
  140 | function extractRecipesIdFromUrl(pageUrl: string): string {
  141 |    const startRecipesId = pageUrl.lastIndexOf('/');
  142 |     recipeId = pageUrl.substring(startRecipesId + 1);
  143 |     console.log('recipeId: ', recipeId);
  144 |     return recipeId;
  145 | }
```