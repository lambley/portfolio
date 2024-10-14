import { test, expect } from "@playwright/test";
import { HomePageSelectors } from "../selectors/homePage";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display the correct headline", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    const headline = page.locator(HomePageSelectors.headline);
    await expect(headline).toHaveText(
      "Fullstack Developer 💻 | Web-Dev Enthusiast 🌐 | Bookworm 📚 | Dog Lover 🐶"
    );
  });

  test("should show the Typewriter component", async ({ page }) => {
    const typewriter = page.locator(HomePageSelectors.typewriter);
    await expect(typewriter).toBeVisible();
  });

  test("should show the avatar image", async ({ page }) => {
    const avatar = page.locator(HomePageSelectors.avatar);
    await expect(avatar).toBeVisible();
    const srcValue = await avatar.getAttribute("src");
    expect(srcValue).toContain("aaron.png");
  });

  test("should display the download CV link", async ({ page }) => {
    const downloadLink = page.locator(HomePageSelectors.downloadLink);
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveText("Download my CV");
    await expect(downloadLink).toHaveAttribute(
      "href",
      "https://drive.google.com/file/d/15az5jAl01qd-3bCD3o2CqrL090N0n7gR/view?usp=sharing"
    );
  });

  test("should display correct bio information", async ({ page }) => {
    const bioTexts = page.locator(HomePageSelectors.bioTexts);
    const expectedTexts = [
      "Experienced Ruby on Rails and JavaScript developer skilled in startup and technical consultancy settings, and well-practiced at working within agile methodology environments. Passionate about learning and advancing my skills in fullstack development and DevOps.",
      "Formerly, specialized in non-fiction publishing with a focus on physical and digital sales, including ecommerce and data analytics.",
      "Currently learning NestJS framework and using Redis and Docker.",
    ];

    const count = await bioTexts.count();
    expect(count).toBe(expectedTexts.length);

    for (let i = 0; i < count; i++) {
      const bioText = bioTexts.nth(i);
      await expect(bioText).toContainText(expectedTexts[i]);
    }
  });
});
