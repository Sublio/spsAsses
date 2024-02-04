import { test, expect, Page } from '@playwright/test';
import { SonyHomePage } from './sonyHomePage';
import { LoginPage } from './sonyLoginPage';

let page: Page;
let sonyHomePage: SonyHomePage;
let sonyLoginPage: LoginPage;

test.beforeEach(async ({ browser }) => {
  // const context = await browser.newContext();
  // page = await context.newPage();
  // sonyHomePage = new SonyHomePage(page);
  // sonyLoginPage = new LoginPage(page);
  // await sonyLoginPage.open();
  // await sonyLoginPage.enterEmail("test@example.com");
  // await sonyLoginPage.clickSignInButton();
  //due to onetrust overlay not possible to interact with ui in incognito mode
});

test.afterEach(async () => {
  await page.close();
});

test('Test 1', async () => {
  const title = await sonyHomePage.getTitle();
  await expect(title).toMatch(/Sony/);
});
