import { test, expect, Page } from '@playwright/test';

// Define a global variable to store the page instance
let page: Page;
let url: string = "https://www.sony.co.uk"

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  
  // Open the desired URL before each test
  await page.goto(url);
});

test.afterEach(async () => {
  await page.close();
});

test('has title', async () => {
  await expect(page).toHaveTitle(/Sony/);
});

test('example test', async () => {
    console.log("Test")
});
