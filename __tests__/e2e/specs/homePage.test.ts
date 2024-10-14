import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test.describe("Home Page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

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

  test("should display the download CV link", async () => {
    await expect(homePage.downloadLink).toBeVisible();
    await expect(homePage.downloadLink).toHaveText("Download my CV");
    await expect(homePage.downloadLink).toHaveAttribute(
      "href",
      "https://drive.google.com/file/d/15az5jAl01qd-3bCD3o2CqrL090N0n7gR/view?usp=sharing"
    );
  });

  test("should display correct bio information", async () => {
    const bioTexts = homePage.bioTexts;
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
