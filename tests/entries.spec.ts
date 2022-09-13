import { test, expect } from '@playwright/test';

//import { LoginPage } from '../src/pageobjects/LoginPage'
import {EntryListPage} from '../src/pageobjects/EntryListPage'
import {EntryPage} from '../src/pageobjects/EntryPage'
//const LoginPage = require('../dist/LoginPage')
import {LoginHelper} from '../src/helper/LoginHelper'
import {DataGen} from '../src/utils/DataGen'

const uaParser = require('ua-parser-js');


const url = 'http://localhost:8080'

test.describe.configure({ mode: 'parallel' });


test.beforeEach(async ({ page }) => {
    let loginHelper = new LoginHelper(page, url);
    await loginHelper.doLogin();
});


test('Add a new entry', async ({ page }) => {

    const getUA = await page.evaluate(() => navigator.userAgent);
    const userAgentInfo = await uaParser(getUA);
    const browserName = userAgentInfo.browser.name;

    let date = DataGen.strDateCurrentMonth();
    let description = `${DataGen.productName()} ${browserName} on ${date}`;
    let value = DataGen.moneyValue();
    let category = DataGen.getCategory();
    let typeEntry = DataGen.getTipoLancamento(category);

    let entryListPage = new EntryListPage(page);
    //let entryPage = new EntryPage(page);
    let entryPage = await entryListPage.newEntry();
    await entryPage.saveEntry(description, date, value, category, typeEntry);
})
