import { defineConfig } from "@playwright/test";

const testUrl = process.env.TEST_URL || 'http://127.0.0.1:3000'

export default defineConfig({
  testDir: "./specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
  reporter: [["list"], ["html", { open: "never" }]],
  webServer: {
    command: 'npm run dev',
    url: testUrl,
    reuseExistingServer: !process.env.CI
  },
});
