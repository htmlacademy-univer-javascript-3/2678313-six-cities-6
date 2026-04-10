import { Locator, Page } from '@playwright/test';

export class PlaywrightPage {
  constructor(page: Page, url = 'https://playwright.dev/') {
  this.url = url;
  this.page = page;
  this.searchButton = this.page.locator('button[aria-label="Search (Ctrl+K)"]');
  this.searchInput = this.page.locator('input#docsearch-input');
  this.searchHitsGroup = this.page.locator('ul#docsearch-list');
  }

  private readonly url: string;

  private readonly page: Page;

  public readonly searchButton: Locator;

  public readonly searchInput: Locator;

  public readonly searchHitsGroup: Locator;

  public async load(): Promise<void> {
  await this.page.goto(this.url);
  }
}
