import { Page } from "@playwright/test";
import { HomePageSelectors } from "../selectors/homePageSelectors";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // methods
  async goto() {
    await this.page.goto("http://localhost:3000");
  }

  async waitForLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  // elements
  get headline() {
    return this.page.locator(HomePageSelectors.headline);
  }

  get typewriter() {
    return this.page.locator(HomePageSelectors.typewriter);
  }

  get avatar() {
    return this.page.locator(HomePageSelectors.avatar);
  }

  get downloadLink() {
    return this.page.locator(HomePageSelectors.downloadLink);
  }

  get bioTexts() {
    return this.page.locator(HomePageSelectors.bioTexts);
  }
}
