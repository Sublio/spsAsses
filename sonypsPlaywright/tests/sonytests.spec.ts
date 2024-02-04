import { test, expect, Page } from '@playwright/test';
import { SonyHomePage } from './sonyHomePage';

let page: Page;
let sonyHomePage: SonyHomePage;

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  sonyHomePage = new SonyHomePage(page);
  await sonyHomePage.open();
  await sonyHomePage.clickMySonyIcon();
  await sonyHomePage.clickMySonyLink();
});

test.afterEach(async () => {
  await page.close();
});

test('has title', async () => {
  const title = await sonyHomePage.getTitle();
  await expect(title).toMatch(/Sony/);
});

test('example test', async () => {
  console.log("Test");
});
