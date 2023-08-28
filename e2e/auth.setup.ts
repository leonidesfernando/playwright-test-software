import { test as setup, expect } from '@playwright/test';
import {LoginHelper} from '../src/helper/LoginHelper';
import { getBaseUrl } from '../config.ts'

const authFile = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page }) => {
  const baseURL: string = getBaseUrl();
  expect(baseURL).not.toBeNull();
  let loginHelper = new LoginHelper(page, baseURL);
  await loginHelper.doLogin();

  await page.context().storageState({ path: authFile });
});