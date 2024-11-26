import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { checkElementsContainTexts } from "../helpers/elementHelpers";
import {
  notFoundPortfolio,
  notFoundBlog,
} from "@/utils/constants/notFoundTypes";
test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    // mock latest_data api endpoint
    await page.route("**/api/v1/latest_data", async (route) => {
      const mockResponse = {
        latestPortfolio: notFoundPortfolio,
        latestBlog: notFoundBlog,
      };
      route.fulfill({
        contentType: "application/json",
        body: JSON.stringify(mockResponse),
      });
    });

    await homePage.navigateToHome();
  });

  test.describe("Header", () => {
    test("should display the correct headline", async () => {
      await homePage.waitForLoad();
      await expect(homePage.headline).toHaveText(
        "Fullstack Developer 💻 | Web-Dev Enthusiast 🌐 | Bookworm 📚 | Dog Lover 🐶"
      );
    });

    test("should show the Typewriter component", async () => {
      await expect(homePage.typewriter).toBeVisible();
    });

    test("should show the avatar image", async () => {
      await expect(homePage.avatar).toBeVisible();
      const srcValue = await homePage.avatar.getAttribute("src");
      expect(srcValue).toContain("aaron.png");
    });
  });

  test.describe("Download CV", () => {
    test("should display the download CV link", async () => {
      await expect(homePage.downloadLink).toBeVisible();
      await expect(homePage.downloadLink).toHaveText("Download my CV");
      await expect(homePage.downloadLink).toHaveAttribute(
        "href",
        "https://drive.google.com/file/d/15az5jAl01qd-3bCD3o2CqrL090N0n7gR/view?usp=sharing"
      );
    });

    test("should open the CV download link in a new tab", async () => {
      const target = await homePage.getDownloadLinkTarget();
      expect(target).toBe("_blank");
    });
  });

  test.describe("Bio Information", () => {
    test("should display correct bio information", async () => {
      const bioTexts = homePage.bioTexts;
      const expectedTexts = [
        "Experienced Ruby on Rails and JavaScript developer skilled in startup and technical consultancy settings, and well-practiced at working within agile methodology environments. Passionate about learning and advancing my skills in fullstack development and DevOps.",
        "Formerly, specialized in non-fiction publishing with a focus on physical and digital sales, including ecommerce and data analytics.",
        "Currently learning NestJS framework and using Redis and Docker.",
      ];

      await checkElementsContainTexts(bioTexts, expectedTexts);
    });
  });

  test("should display the Contact Form", async () => {
    await expect(homePage.contactForm).toBeVisible();
  });

  test("should display the Latest component", async () => {
    await expect(homePage.latestComponent).toBeVisible();
  });

  test("should show two elements in the Latest component", async () => {
    const latestItems = homePage.latestItemLinks;
    await expect(latestItems).toHaveCount(2);
  });
});
