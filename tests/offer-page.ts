import { expect, Page } from '@playwright/test';

export class OfferPage {
  constructor(private page: Page) {}

  async getTitle() {
    return (await this.page.locator('.offer__name').textContent()) ?? '';
  }

  async checkNearPlacesVisible() {
    await expect(this.page.locator('.near-places__title')).toBeVisible();
  }
}
