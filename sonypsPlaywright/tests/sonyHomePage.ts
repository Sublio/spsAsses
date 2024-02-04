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
    try {
      const signInButton = await this.page.waitForSelector('a.GlobalHeaderCrm__SignUpButton', { state: 'visible' });
      
      if (signInButton) {
        await signInButton.click();
      } else {
        throw new Error('Sign-In button not found');
      }
    } catch (error) {
      console.error('Error while clicking My Sony link:', error);
      throw error; // Re-throw the error for further handling in your test script
    }
  }
}
