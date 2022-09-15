//@ts-check
import { Page } from "@playwright/test";

export class BaseUI{
    private readonly _page !: Page;

    constructor(page:Page){
        this._page = page;
    }

    public get page(): Page{
        return this._page;
    }
}