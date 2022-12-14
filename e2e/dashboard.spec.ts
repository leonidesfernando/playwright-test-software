//@ts-check
import { test, expect, Page } from '@playwright/test';
import {LoginHelper} from '../src/helper/LoginHelper'
import { DashboradPage } from '../src/pageobjects/DashboardPage';
import {EntryListPage} from '../src/pageobjects/EntryListPage'

let page:Page;
test.beforeAll(async ({browser, baseURL}) => {
    page = await browser.newPage();
    expect(baseURL).not.toBeNull();
    let loginHelper = new LoginHelper(page, <string>baseURL);
    await loginHelper.doLogin();
})

test.afterAll(async ({baseURL}) => {
    let loginHelper = new LoginHelper(page, <string>baseURL);
    await loginHelper.doLogout();
})


test.describe('Dashbord access validation', async () => {

    
    test('Accessing dashborad', async ({}) => {
        let entryListPage:EntryListPage = new EntryListPage(page);
        entryListPage.goToDashboard();
    })

    test('Backing to list', async ({}) => {
        let entryListPage:EntryListPage = new EntryListPage(page);
        let dashboard:DashboradPage = await entryListPage.goToDashboard();
        dashboard.goToListing();
    })
})
