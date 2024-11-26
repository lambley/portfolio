import { test, expect } from "@playwright/test";
import { BlogPage } from "../pages/blogPage";
import { pages } from "../shared/constants";
import { checkElementsContainTexts } from "../helpers/elementHelpers";
import { notFoundBlog } from "@/utils/constants/notFoundTypes";

test.describe("Blog Page", () => {
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);

    // mock latest_data api endpoint
    await page.route("**/api/v1/latest_data", async (route) => {
      const mockResponse = {
        latestPortfolio: notFoundBlog,
        latestBlog: notFoundBlog,
      };
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(mockResponse),
      });
    });

    await blogPage.navigateToHome();
    await blogPage.navigateTo(pages.blog);
    await blogPage.waitForLoad();
  });

  test.describe("Elements", () => {
    test("should display a search element", async () => {
      await expect(blogPage.searchWrapper).toBeVisible();
      await expect(blogPage.searchInput).toBeVisible();
    });

    test("search input should contain an svg icon", async () => {
      await expect(blogPage.searchIcon).toBeVisible();

      // focus on input
      await blogPage.searchInput.focus();
      await expect(blogPage.searchIcon).not.toBeVisible();
    });

    test("should have a 'new' toggle switch", async () => {});
  });

  test.describe("Blog List", () => {});
});
