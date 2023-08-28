//@ts-check
import { test, expect, Page } from '@playwright/test';
import {EntryListPage} from '../src/pageobjects/EntryListPage';
import { CrudUtils } from '../src/utils/CRUDUtils';
import { getBaseUrl } from '../config';


test.describe('CRUD - Add, Edit and Remove an entry',() => {

    test.beforeEach(async ({page}) => {
        await page.goto(getBaseUrl());
    })

    test('Add a new entry and find it', async ({page}) => {
        let entryListPage = new EntryListPage(page);
        let data = await CrudUtils.addEntry(entryListPage);
        await entryListPage.findEntry(data.description);
    })

    test('Editing', async({page}) => {
        let entryListPage = new EntryListPage(page);
        let data = await CrudUtils.addEntry(entryListPage);
        let entryPage = await entryListPage.openFirstToEdit();
        const newDescription = `${data.description} - Edited`;
        await entryPage.saveEntry(newDescription, data.date, data.value, data.category, data.typeEntry);        
        await entryListPage.findEntry(newDescription);
    });

    test('Removing an entry', async ({page}) => {
        let entryListPage = new EntryListPage(page);
        let data = await CrudUtils.addEntry(entryListPage);
        await entryListPage.findEntry(data.description);
        await entryListPage.removeFirstEntryByDescription(data.description);
    });
})


