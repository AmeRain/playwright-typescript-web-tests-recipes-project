# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-create-recipe-form.spec.ts >> Add recipe page >> Заполнение основной формы при создании рецепта
- Location: tests/test-create-recipe-form.spec.ts:14:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('//span[contains(.,\'Основное\')]/following-sibling::span//svg')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('//span[contains(.,\'Основное\')]/following-sibling::span//svg')

```

```yaml
- status: Новый рецепт · Wife Recipes
- banner:
  - link "Wife Recipes Домашняя книга рецептов":
    - /url: /recipes
  - navigation "Основная навигация":
    - link "Рецепты":
      - /url: /recipes
    - link "Что приготовить":
      - /url: /what-to-cook
    - link "Меню":
      - /url: /meal-plan
    - link "Вдохновение":
      - /url: /inspiration
    - button "Открыть меню разделов": Ещё
    - link "Добавить рецепт":
      - /url: /recipes/new
    - button "Поиск рецептов"
    - button "Открыть кухонного помощника"
    - button "Включить тёмную тему"
    - button "E e2e@wife-recipes.test"
- main:
  - link "Все рецепты":
    - /url: /recipes
  - heading "Новый рецепт" [level=1]
  - paragraph: Добавь блюдо, ингредиенты, шаги, фото и КБЖУ.
  - paragraph: Редактор
  - heading "Новый рецепт" [level=2]
  - paragraph: Заполни базовую информацию, ингредиенты, шаги и фото.
  - text: Черновик включён Есть несохранённые изменения
  - button "Начать с чистого листа"
  - complementary:
    - text: Нужно дозаполнить
    - paragraph: Заполненность рецепта
    - paragraph: 1/7 заполнено
    - paragraph: 14%
    - progressbar "Заполненность рецепта"
    - paragraph: Обязательное
    - paragraph: 1/2 обязательных
    - button "Основное готово"
    - button "Ингредиенты 0"
    - paragraph: Дополнительно
    - paragraph: 0/5 дополнительных
    - button "Фото 0"
    - button "Шаги 0"
    - button "КБЖУ 0/4"
    - button "Категории 0"
    - button "Теги 0"
    - text: "Обязательные разделы: 50%"
    - paragraph: Черновик включён
    - paragraph: Форма автоматически сохраняется в этом браузере. Изображения-файлы после обновления страницы не восстановятся.
    - paragraph: "Последнее сохранение: 25.08, 10:27"
    - button "Очистить черновик"
  - button "Основная информация Свернуть" [expanded]
  - heading "Основная информация" [level=3]
  - paragraph: Название, описание, время, порции и личные заметки.
  - text: Название
  - textbox "Название":
    - /placeholder: "Например: Куриная грудка с картошкой"
    - text: Грузинский салат
  - text: Краткое описание
  - textbox "Краткое описание":
    - /placeholder: "Например: простой белковый ужин на каждый день"
    - text: Салат с ореховым соусом по грузински
  - text: Порции
  - spinbutton "Порции": "4"
  - text: Время приготовления
  - spinbutton "Время приготовления": "40"
  - text: Источник
  - textbox "Источник":
    - /placeholder: https://...
  - text: Заметки
  - textbox "Заметки":
    - /placeholder: Любые дополнительные заметки по рецепту.
    - text: салат довольно жирный
  - button "Фото рецепта Обложка и дополнительные изображения. Развернуть"
  - button "Категории Выбери один или несколько подходящих разделов. Развернуть"
  - button "Теги Добавь слова, по которым рецепт будет проще найти. Развернуть"
  - button "Ингредиенты Структурированный список для пересчёта порций. Развернуть"
  - button "Текстовые ингредиенты Свободный список без автоматического пересчёта. Развернуть"
  - button "Шаги Последовательность приготовления блюда. Развернуть"
  - button "Связанные рецепты Блюда, которые удобно готовить вместе или использовать как основу. Развернуть"
  - button "КБЖУ Ручные значения для всего рецепта или расчёт по связанным продуктам. Развернуть"
  - text: Нужно дозаполнить
  - paragraph: Есть незаполненные обязательные поля
  - 'button "Перед сохранением лучше заполнить: ингредиенты. Нажми, чтобы перейти."'
  - button "Создать рецепт"
- region "Notifications alt+T":
  - list
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { AddRecipePage } from '../pages/AddRecipePage';
  3  | 
  4  | test.use({ launchOptions: { slowMo: 500 } });
  5  | 
  6  | let addRecipePage: AddRecipePage;
  7  | 
  8  | test.describe('Add recipe page', () => {
  9  |   test.beforeEach(async ({ page }) => {
  10 |     addRecipePage = new AddRecipePage(page);
  11 |     await addRecipePage.goto();
  12 |   });
  13 | 
  14 |   test('Заполнение основной формы при создании рецепта', async ({ page }) => {
  15 |     await addRecipePage.goto();
  16 |     // await page.getByRole('button', { name: 'Добавить рецепт' }).click();
  17 |     await addRecipePage.fillTitle('Грузинский салат');
  18 |     await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
  19 |     await addRecipePage.fillServings('4');
  20 |     await addRecipePage.fillCookTime('40');
  21 |     await addRecipePage.fillNotes('салат довольно жирный');
  22 |     await expect(addRecipePage.filledLabel).toContainText('1/7 заполнено');
  23 | 
  24 |     await expect(addRecipePage.filledPercentageLabel).toContainText('14%');
  25 |     await expect(addRecipePage.readyLabel).toContainText('готово');
> 26 |     await expect(addRecipePage.readyIcon).toBeVisible();
     |                                           ^ Error: expect(locator).toBeVisible() failed
  27 | 
  28 |     await expect(addRecipePage.readyIngredientsIcon).toBeVisible;
  29 | 
  30 |     // await expect(addRecipePage.messageRecipesReadyLabel).toBeVisible();
  31 | 
  32 |     await addRecipePage.checkMessageRecipesReady();
  33 |     //div[./p[contains(.,'Есть незаполненные обязательные поля')]]/following-sibling::button
  34 |   });
  35 | 
  36 | 
  37 |   test('Заполнение основной информации и ингредиентов при создании рецепта', async ({ page }) => {
  38 |     await addRecipePage.goto();
  39 |     await addRecipePage.fillTitle('Грузинский салат');
  40 |     await addRecipePage.fillDescription('Салат с ореховым соусом по грузински');
  41 |     await addRecipePage.fillServings('4');
  42 |     await addRecipePage.fillCookTime('40');
  43 |     await addRecipePage.fillNotes('салат довольно жирный');
  44 | 
  45 |     await addRecipePage.ingredientsBlock.click();
  46 |     await addRecipePage.fillIngredients('Укроп');
  47 |     await addRecipePage.inputCountOfIngredients('1');
  48 |     await addRecipePage.fillQuantityIngridient('шт');
  49 |     await addRecipePage.addIngredientButton.click();
  50 |     await addRecipePage.fillIngredients('Грецкие орехи', 1);
  51 |     await addRecipePage.inputCountOfIngredients('25', 1);
  52 |     await addRecipePage.fillQuantityIngridient('шт', 1);
  53 | 
  54 |     await addRecipePage.checkIngredientCount(2);
  55 |     await expect(addRecipePage.filledStepsLabel).toContainText('2/2 обязательных');
  56 |     await expect(addRecipePage.readyToSave).toBeVisible();
  57 |     await expect(addRecipePage.mainBlockIsReadyLabel).toContainText('готово');
  58 |     await expect(addRecipePage.mainBlockIsReadyIcon).toBeVisible;
  59 |     await expect(addRecipePage.ingredientsBlockIsReadyIcon).toBeVisible;
  60 |     await expect(addRecipePage.messageThereAreUnsavedChanges).toBeVisible();
  61 |     await expect(addRecipePage.messageRecipesAdvice).not.toBeVisible();
  62 |     await expect(addRecipePage.messageReadyToSave).toBeVisible();
  63 |   });
  64 | 
  65 | });
```