import { Page, Locator } from "@playwright/test";
import { BlogPageSelectors } from "../selectors/pageSelectors";
import { pages } from "../shared/constants";
import { getBlogPageLocator } from "../helpers/elementHelpers";

export class BlogPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Elements
  private getLocator(selector: keyof typeof BlogPageSelectors): Locator {
    return getBlogPageLocator(this.page, selector);
  }

  get searchWrapper(): Locator {
    return this.getLocator("searchWrapper");
  }

  get searchInput(): Locator {
    return this.getLocator("searchInput");
  }

  get searchIcon(): Locator {
    return this.getLocator("searchIcon");
  }

  get toggleSwitch(): Locator {
    return this.getLocator("toggleSwitch");
  }

  get blogList(): Locator {
    return this.getLocator("blogList");
  }

  get blogItem(): Locator {
    return this.getLocator("blogItem");
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

  async countBlogItems(): Promise<number> {
    return await this.blogItem.count();
  }
}
