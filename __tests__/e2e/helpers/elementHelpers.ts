import { Page, Locator, expect } from "@playwright/test";
import {
  HomePageSelectors,
  BlogPageSelectors,
  PortfolioPageSelectors,
} from "../selectors/homePageSelectors";

export async function checkElementsContainTexts(
  elements: Locator,
  expectedTexts: string[]
) {
  const count = await elements.count();
  expect(count).toBe(expectedTexts.length);

  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    await expect(element).toHaveText(expectedTexts[i]);
  }
}

function getLocator<T extends Record<string, any>>(
  page: Page,
  selectors: T,
  key: keyof T
) {
  return page.locator(selectors[key as string]);
}

export function getHomePageLocator(
  page: Page,
  key: keyof typeof HomePageSelectors
) {
  return getLocator(page, HomePageSelectors, key);
}

export function getBlogPageLocator(
  page: Page,
  key: keyof typeof BlogPageSelectors
) {
  return getLocator(page, BlogPageSelectors, key);
}

export function getPortfolioPageLocator(
  page: Page,
  key: keyof typeof PortfolioPageSelectors
) {
  return getLocator(page, PortfolioPageSelectors, key);
}
