//@ts-check
import { test } from '@playwright/test';

export default class PlaywrightUtils{

    static async getBrowserName():Promise<string> {
        return test.info().project.name;
    }

}