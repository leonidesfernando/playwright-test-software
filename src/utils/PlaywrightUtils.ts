//@ts-check
import { Page } from '@playwright/test';
const uaParser = require('ua-parser-js');

export default class PlaywrightUtils{

    static async getBrowserName(page: Page):Promise<string> {
        const getUA = await page.evaluate(() => navigator.userAgent);
        const userAgentInfo = await uaParser(getUA);
        const browserName = userAgentInfo.browser.name;
        return browserName;
    }

}