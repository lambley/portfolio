import { Locator, expect } from "@playwright/test";

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
