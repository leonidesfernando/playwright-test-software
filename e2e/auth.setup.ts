import { test as setup, expect } from '@playwright/test';
import {LoginHelper} from '../src/helper/LoginHelper';

const authFile = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page, baseURL }) => {

  expect(baseURL).not.toBeNull();
  let loginHelper = new LoginHelper(page, <string>baseURL);
  await loginHelper.doLogin();

  await page.context().storageState({ path: authFile });
});