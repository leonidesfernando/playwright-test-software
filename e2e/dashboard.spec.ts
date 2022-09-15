//@ts-check
import { test, expect, Page } from '@playwright/test';
import {LoginHelper} from '../src/helper/LoginHelper'
import {EntryListPage} from '../src/pageobjects/EntryListPage'

test.describe('Dashbord access validation', async () => {
    let page:Page;
    let entryListPage:EntryListPage;

    test.beforeAll(async ({browser, baseURL}) => {
        page = await browser.newPage();
        expect(baseURL).not.toBeNull()
        let loginHelper = new LoginHelper(page, <string>baseURL);
        await loginHelper.doLogin();
        entryListPage = new EntryListPage(page);
    })

    test.afterAll(async ({baseURL}) => {
        let loginHelper = new LoginHelper(page, <string>baseURL);
        await loginHelper.doLogout();
    })

    test('Accessing dashborad', async ({}) => {
        await entryListPage.goToDashboard();
    })
})
