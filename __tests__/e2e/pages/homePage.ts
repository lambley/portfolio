import { Page, Locator } from "@playwright/test";
import { HomePageSelectors } from "../selectors/pageSelectors";
import { pages } from "../shared/constants";
import { getHomePageLocator } from "../helpers/elementHelpers";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Elements
  private getLocator(selector: keyof typeof HomePageSelectors): Locator {
    return getHomePageLocator(this.page, selector);
  }

  get headline(): Locator {
    return this.getLocator("headline");
  }

  get typewriter(): Locator {
    return this.getLocator("typewriter");
  }

  get avatar(): Locator {
    return this.getLocator("avatar");
  }

  get downloadLink(): Locator {
    return this.getLocator("downloadLink");
  }

  get bioTexts(): Locator {
    return this.getLocator("bioTexts");
  }

  get contactForm(): Locator {
    return this.getLocator("contactForm");
  }

  get latestComponent(): Locator {
    return this.getLocator("latest");
  }

  get latestItemLinks(): Locator {
    return this.getLocator("latestLinks");
  }

  // methods
  async navigateToHome(): Promise<void> {
    await this.page.goto("http://localhost:3000");
  }

  async navigateTo(page: pages): Promise<void> {
    if (page === pages.home) {
      await this.navigateToHome();
      return;
    }
    await this.page.goto(`http://localhost:3000/${page}`);
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async clickDownloadCV(): Promise<void> {
    await this.page.locator(HomePageSelectors.downloadLink).click();
  }

  async getDownloadLinkTarget(): Promise<string | null> {
    return await this.page
      .locator(HomePageSelectors.downloadLink)
      .getAttribute("target");
  }
}
