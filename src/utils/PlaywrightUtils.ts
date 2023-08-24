//@ts-check
const _globals = require("../../node_modules/@playwright/test/lib/common/globals");

export default class PlaywrightUtils{

    static async getBrowserName():Promise<string> {
        const curTestInfo = await (0, _globals.currentTestInfo)();
        return curTestInfo._test._projectId;
    }

}