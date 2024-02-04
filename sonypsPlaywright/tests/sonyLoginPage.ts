import { Page, ElementHandle } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.sony.co.uk/mysony/login?returnUri=https://www.sony.co.uk/');
  }

  async getEmailTextField(): Promise<ElementHandle | null> {
    return await this.page.$('input[id="mySonyId"][name="mySonyId"]');
  }

  async enterEmail(email: string): Promise<void> {
    const emailTextField = await this.getEmailTextField();
    if (emailTextField) {
      await emailTextField.type(email);
    } else {
      throw new Error('Email text field not found');
    }
  }

  async getSignInButton(): Promise<ElementHandle | null> {
    return await this.page.$('button[name="Sign in"]');
  }

  async clickSignInButton(): Promise<void> {
    await this.page.waitForSelector('button[name="Sign in"]');
    const signInButton = await this.getSignInButton();
    if (signInButton) {
      await signInButton.click();
    } else {
      throw new Error('Sign-In button not found');
    }
  }
}

