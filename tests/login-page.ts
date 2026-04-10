import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  readonly emailInput = this.page.locator('input[name="email"]');
  readonly passwordInput = this.page.locator('input[name="password"]');
  readonly submitButton = this.page.locator('.login__submit');

  async open() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
