import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,

  // Reporter config: HTML report in each suite folder
  reporter: [
    ['html', { outputFolder: 'results/playwright-report', open: 'never' }]
  ],

  use: {
    headless: true,
    trace: 'on-first-retry',           // Trace only on retry
    screenshot: 'only-on-failure',     // Screenshot on failure
    video: 'retain-on-failure',        // Video on failure
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
