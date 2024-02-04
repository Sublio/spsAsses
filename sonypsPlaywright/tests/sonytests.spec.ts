import { test, expect, Page } from '@playwright/test';
import { CarouselPage } from './carouselPage';

let page: Page;
let carouselPage: CarouselPage;

let itemsInCarouselConstant = 7;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  carouselPage = new CarouselPage(page);
  await page.goto('https://www.playstation.com/en-gb/');
});

test.afterEach(async () => {
  await page.close();
});

test('Test can select each item in carousel', async () => {
  const itemCount = await carouselPage.getCarouselItemCount();

  expect(itemCount).toBe(itemsInCarouselConstant);

  for (let i = 0; i < itemCount; i++) {
    await carouselPage.clickCarouselItem(i);
    const isSelected = await carouselPage.isCarouselCellSelected(i);
    
    expect(isSelected).toBe(true);
  }
});

test('Carousel switch cell selection automatically after time constant', async ({ page }) => {
  test.setTimeout(120000);
  const itemCount = await carouselPage.getCarouselItemCount();
  const timeConstant = 10000; // 10 seconds in milliseconds
  const pollingInterval = 1000; // Poll every 1 second
  const maxAttempts = timeConstant / pollingInterval; // Maximum attempts based on timeConstant

  expect(itemCount).toBe(itemsInCarouselConstant);

  for (let i = 0; i < itemCount; i++) {
    let isSelected = false;
    let attempts = 0;

    while (!isSelected && attempts < maxAttempts) {
      // Wait for the specified polling interval
      await page.waitForTimeout(pollingInterval);
      
      // Check if the element has the "is-selected" class
      isSelected = await carouselPage.isCarouselCellSelected(i);
      attempts++;
    }

    // Cell should eventually become selected
    expect(isSelected).toBe(true);

    // Log what's going on with current cell
    console.log(`Cell ${i} is selected.`);
  }
});

test('carousel cell selection and central div', async ({ page }) => {
  const cellIndex = 3;

  await carouselPage.clickCarouselItem(cellIndex);

  await page.waitForTimeout(1000); //Small timeout to wait for animation

  const isContentVisible = await carouselPage.isCellVisible(cellIndex);
  expect(isContentVisible).toBeTruthy();
});

