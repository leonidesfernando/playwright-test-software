//@ts-check
import { expect, Page } from "@playwright/test";

export class BasePage{

    private readonly _page !: Page;

    constructor(page:Page){
        this._page = page;
        expect(this._page).not.toBeNull()
    }

    public get page(): Page{
        return this._page;
    }
    
    protected getBy(locator:string){
        return this.page.locator(locator);
    }
}