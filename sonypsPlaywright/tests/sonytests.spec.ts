import { test, expect, Page } from '@playwright/test';
import { CarouselPage } from './carouselPage';

let page: Page;
let carouselPage: CarouselPage;

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

  expect(itemCount).toBe(7);

  for (let i = 0; i < itemCount; i++) {
    await carouselPage.clickCarouselItem(i);
    const isSelected = await carouselPage.isCarouselCellSelected(i);
    
    expect(isSelected).toBe(true);
  }
});
