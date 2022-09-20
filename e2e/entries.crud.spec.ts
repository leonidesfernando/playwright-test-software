//@ts-check
import { test, expect, Page } from '@playwright/test';
import {EntryListPage} from '../src/pageobjects/EntryListPage';
import {LoginHelper} from '../src/helper/LoginHelper';
import {DataGen} from '../src/utils/DataGen';
import PlaywrightUtils from '../src/utils/PlaywrightUtils';

let page:Page;

async function genCrudData(page: Page): Promise<any>{

    let data = {date: '', description: '', value: '', category: '', typeEntry: ''};

    data.date = DataGen.strDateCurrentMonth();
    data.description = `${DataGen.productName()} ${await PlaywrightUtils.getBrowserName(page)} on ${data.date}`;
    data.value = DataGen.moneyValue();
    data.category = DataGen.getCategory();
    data.typeEntry = DataGen.getTipoLancamento(data.category);
    return data;
}

async function addEntry(entryListPage: EntryListPage) {
    const data:{date:'', description:'', value:'', category:'', typeEntry:''} = await genCrudData(page);
    let entryPage = await entryListPage.newEntry();
    await entryPage.saveEntry(data.description, data.date, data.value, data.category, data.typeEntry);
    return data;
}



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



test.describe('CRUD - Add, Edit and Remove an entry', async () => {

    test('Add a new entry and find it', async ({}) => {
        let entryListPage = new EntryListPage(page);
        let data = await addEntry(entryListPage);
        await entryListPage.findEntry(data.description);
    })

    test('Editing', async({}) => {
        let entryListPage = new EntryListPage(page);
        let data = await addEntry(entryListPage);
        let entryPage = await entryListPage.openFirstToEdit();
        const newDescription = `${data.description} - Edited`;
        await entryPage.saveEntry(newDescription, data.date, data.value, data.category, data.typeEntry);        
        await entryListPage.findEntry(newDescription);
    });

    test('Removing an entry', async () => {
        let entryListPage = new EntryListPage(page);
        let data = await addEntry(entryListPage);
        await entryListPage.findEntry(data.description);
        await entryListPage.removeFirstEntryByDescription(data.description);
    });
})


