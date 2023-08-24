//@ts-check
import { test} from '@playwright/test';
import { DashboradPage } from '../src/pageobjects/DashboardPage';
import {EntryListPage} from '../src/pageobjects/EntryListPage'



test.describe('Dashbord access validation', () => {
    test.beforeEach(async ({page, baseURL}) => {
        await page.goto(<string>baseURL);
    })    
    
    test('Accessing dashborad', async ({page}) => {
        let entryListPage:EntryListPage = new EntryListPage(page);
        await entryListPage.goToDashboard();
    })

    test('Backing to list', async ({page}) => {
        let entryListPage:EntryListPage = new EntryListPage(page);
        let dashboard:DashboradPage = await entryListPage.goToDashboard();
        await dashboard.goToListing();
    })
})
