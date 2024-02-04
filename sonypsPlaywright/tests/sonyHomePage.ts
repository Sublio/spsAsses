import { Page, ElementHandle } from '@playwright/test';

export class SonyHomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.sony.co.uk');
  }

  async getTitle() {
    return this.page.title();
  }


  async clickMySonyIcon(): Promise<void> {
    const mySonyIcon: ElementHandle | null = await this.page.$('[aria-label="My Sony"]');
    if (mySonyIcon) {
      await mySonyIcon.click();
    } else {
      throw new Error('My Sony icon not found');
    }
  }

  async clickMySonyLink(): Promise<void> {
    const mySonyLink: ElementHandle | null = await this.page.$('a[href="https://www.sony.co.uk/mysony/login?returnUri=https://www.sony.co.uk/"]');
    if (mySonyLink) {
      await mySonyLink.click();
    } else {
      throw new Error('My Sony link not found');
    }
  }
}
