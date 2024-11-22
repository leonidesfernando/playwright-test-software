import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/*
https://medium.com/@manabie/how-to-use-playwright-in-cucumberjs-f8ee5b89bccc
https://www.genui.com/resources/getting-started-with-bdd-using-cucumber-io
https://www.indiumsoftware.com/blog/automation-using-playwright-library-with-cucumber-js/
https://talent500.co/blog/how-to-integrate-cucumber-with-playwright/
*/

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'http://localhost:8080',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Capture screenshot after each test failure.
    video: 'retain-on-failure', //Record video only when retrying a test for the first time.
    headless: true,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'], // Launch in fullscreen mode
    },
    //viewport: { width: 1920, height: 1080 }
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    /*{
      name: 'chromium',
      use: {
        //...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        viewport: null
      },
      dependencies: ['setup'],
    },*/

    {
      name: 'firefox',
      use: {
        //...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
        viewport:null
      },
      dependencies: ['setup'],
    },

/*    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
