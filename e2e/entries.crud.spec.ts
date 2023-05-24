//@ts-check
import { test, expect, Page } from '@playwright/test';
import {EntryListPage} from '../src/pageobjects/EntryListPage';
import {LoginHelper} from '../src/helper/LoginHelper';
import { CrudUtils } from '../src/utils/CRUDUtils';

let page:Page;


test.describe('CRUD - Add, Edit and Remove an entry', async () => {

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

    test('Add a new entry and find it', async ({}) => {
        let entryListPage = new EntryListPage(page);
        let data = await CrudUtils.addEntry(entryListPage, page);
        await entryListPage.findEntry(data.description);
    })

    test('Editing', async({}) => {
        let entryListPage = new EntryListPage(page);
        let data = await CrudUtils.addEntry(entryListPage, page);
        let entryPage = await entryListPage.openFirstToEdit();
        const newDescription = `${data.description} - Edited`;
        await entryPage.saveEntry(newDescription, data.date, data.value, data.category, data.typeEntry);        
        await entryListPage.findEntry(newDescription);
    });

    test('Removing an entry', async () => {
        let entryListPage = new EntryListPage(page);
        let data = await CrudUtils.addEntry(entryListPage, page);
        await entryListPage.findEntry(data.description);
        await entryListPage.removeFirstEntryByDescription(data.description);
    });
})


