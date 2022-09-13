import { Locator, Page } from "@playwright/test";
import { EntryPage } from "./EntryPage";

export class EntryListPage {

    private readonly page:Page;
    private readonly btnNewEntry:Locator;

    constructor(page: Page){
        this.page = page;
        this.btnNewEntry = page.locator('#novoLancamento')
    }

    public async newEntry(){
        await this.btnNewEntry.click();
        return new EntryPage(this.page);
    }


}
