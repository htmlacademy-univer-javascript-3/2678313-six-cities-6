import { test, expect } from '@playwright/test';
import { LoginPage } from './login-page';
import { MainPage } from './main-page';
import { OfferPage } from './offer-page';

test('user can sign in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('test@test.ru', 'qwerty123');

  await expect(page).toHaveURL('/');
});

test('offers can be sorted', async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();
  await mainPage.waitForCards();

  const defTitles = await mainPage.getTitles();

  await mainPage.selectSorting('Price: low to high');

  const pricesLowToHigh = await mainPage.getPrices();

  expect(pricesLowToHigh).toEqual([...pricesLowToHigh].sort((a, b) => a - b));

  await mainPage.selectSorting('Price: high to low');

  const pricesHighToLow = await mainPage.getPrices();

  expect(pricesHighToLow).toEqual([...pricesHighToLow].sort((a, b) => b - a));

  await mainPage.selectSorting('Top rated first');

  const topRated = await mainPage.getRatings();

  expect(topRated).toEqual([...topRated].sort((a, b) => b - a));

  await mainPage.selectSorting('Popular');

  const popular = await mainPage.getTitles();

  expect(popular).toEqual(defTitles);
});

test('user can open offer page', async ({ page }) => {
  const mainPage = new MainPage(page);
  const offerPage = new OfferPage(page);

  await mainPage.open();

  const firstOfferTitle = await mainPage.getFirstOfferTitle();
  await mainPage.openFirstOffer();

  const offerTitle = await offerPage.getTitle();
  expect(offerTitle).toBe(firstOfferTitle);

  await offerPage.checkNearPlacesVisible();
});
