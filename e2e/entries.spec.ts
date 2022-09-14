//@ts-check

import { test, expect, Page } from '@playwright/test';
import {EntryListPage} from '../src/pageobjects/EntryListPage'
//import {EntryPage} from '../src/pageobjects/EntryPage'
import {LoginHelper} from '../src/helper/LoginHelper'
import {DataGen} from '../src/utils/DataGen'

const uaParser = require('ua-parser-js');


//const url = 'http://localhost:8080'

//test.describe.configure({ mode: 'parallel' });

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



test.describe('Add new Entry', async () => {
    let page:Page;
    let entryListPage:EntryListPage;
    let data:{ date: string; description: string; value: string; category: string; typeEntry: string; };

    test.beforeAll(async ({browser, baseURL}) => {
        page = await browser.newPage();
        data = await genData(page);
        //
        expect(baseURL).not.toBeNull()
        let loginHelper = new LoginHelper(page, <string>baseURL);
        await loginHelper.doLogin();
        entryListPage = new EntryListPage(page);
    })
    
    test.beforeEach(async ({ baseURL }) => { });

    test('Add a new entry and find it', async ({}) => {
        const {date, description, value, category, typeEntry} = data;
    
        let entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(description, date, value, category, typeEntry);
        await entryListPage.findEntry(data.description);
    })
})

test.describe('CRUD - Edit an entry', async () => {

    let page:Page;
    let entryListPage:EntryListPage;
    let data:{ date: string; description: string; value: string; category: string; typeEntry: string; };

    test.beforeAll(async ({browser, baseURL}) => {
        page = await browser.newPage();
        data = await genData(page);
        //
        expect(baseURL).not.toBeNull()
        let loginHelper = new LoginHelper(page, <string>baseURL);
        await loginHelper.doLogin();
        entryListPage = new EntryListPage(page);
    })


    test('Editing', async({}) => {
        const {date, description, value, category, typeEntry} = data;
        let entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(description, date, value, category, typeEntry);
        
        entryPage = await entryListPage.openFirstToEdit()
        const newDescription = `${description} - Edited`
        await entryPage.saveEntry(newDescription, date, value, category, typeEntry);
        
        await entryListPage.findEntry(newDescription);
    })
})