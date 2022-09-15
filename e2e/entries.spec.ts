//@ts-check
import { test, expect, Page } from '@playwright/test';
import {EntryListPage} from '../src/pageobjects/EntryListPage'
import {LoginHelper} from '../src/helper/LoginHelper'
import {DataGen} from '../src/utils/DataGen'

const uaParser = require('ua-parser-js');


async function getBrowserName(page: Page) {
    const getUA = await page.evaluate(() => navigator.userAgent);
    const userAgentInfo = await uaParser(getUA);
    const browserName = userAgentInfo.browser.name;
    return browserName;
}

async function genData(page: Page){

    let data = {date: '', description: '', value: '', category: '', typeEntry: ''};

    data.date = DataGen.strDateCurrentMonth();
    data.description = `${DataGen.productName()} ${await getBrowserName(page)} on ${data.date}`;
    data.value = DataGen.moneyValue();
    data.category = DataGen.getCategory();
    data.typeEntry = DataGen.getTipoLancamento(data.category);
    return data;
}

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


test.describe('Grouping with describe to: Add new Entry', async () => {
    
    test('Add a new entry and find it', async ({}) => {
        const {date, description, value, category, typeEntry} = await genData(page);
        let entryListPage = await new EntryListPage(page);
    
        let entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(description, date, value, category, typeEntry);
        await entryListPage.findEntry(description);
    })
})

test.describe('Grouping again to: Edit an entry', async () => {

    test('Editing', async({}) => {
        const {date, description, value, category, typeEntry} = await genData(page);
        let entryListPage = await new EntryListPage(page);
        let entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(description, date, value, category, typeEntry);
        
        entryPage = await entryListPage.openFirstToEdit();
        const newDescription = `${description} - Edited`;
        await entryPage.saveEntry(newDescription, date, value, category, typeEntry);
        
        await entryListPage.findEntry(newDescription);
    })
})
