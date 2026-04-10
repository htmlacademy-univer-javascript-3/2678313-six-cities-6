import { Page, expect } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  readonly sortingType = this.page.locator('.places__sorting-type');
  readonly sortingOptions = this.page.locator('.places__option');
  readonly prices = this.page.locator('.place-card__price-value');
  readonly ratings = this.page.locator('.place-card__stars');

  async open() {
    await this.page.goto('/');
  }

  async waitForCards() {
    await expect(this.page.locator('.cities__card.place-card').first()).toBeVisible();
  }

  async selectSorting(option: string) {
    await this.sortingType.click();
    await this.page.locator('.places__option', { hasText: option }).click();
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.prices.allTextContents();
    return texts.map((item) => Number(item.replace('€', '')));
  }

  async getTitles(): Promise<string[]> {
    return this.page.locator('.place-card__name a').allTextContents();
  }

  async openFirstOffer() {
    await this.page.locator('.place-card__name a').first().click();
  }

  async getFirstOfferTitle() {
    return (await this.page.locator('.place-card__name a').first().textContent()) ?? '';
  }

  async getRatings() {
    const widths = await this.ratings.evaluateAll((elements) =>
    elements.map((element) => Number((element as HTMLElement).style.width.replace('%', '')))
  );



  return widths;
}

}
