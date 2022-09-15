//@ts-check
import { Locator, Page, expect } from "@playwright/test";
import { GridUI } from "../components/GridUI";
import { BasePage } from "./BasePage";
import { EntryPage } from "./EntryPage";
import { DashboradPage } from "./DashboardPage";

enum Button {
    EDIT = 'btn-primary',
    DELETE = 'btn-danger'
}

export class EntryListPage extends BasePage {

    private readonly btnNewEntry !: Locator;
    private readonly inputSearch !: Locator;
    private readonly btnDashboard !: Locator;
  

    constructor(page: Page){
        super(page);
        this.btnNewEntry = this.getBy('#novoLancamento')
        this.inputSearch = this.getBy('#itemBusca')
        this.btnDashboard = this.getBy("a[title='Gráfico']")
    }

    public async openFirstToEdit() {
        await this.clickButton(Button.EDIT)
        return await new EntryPage(this.page);
    }

    protected async clickButton(btn: Button){
        let grid = await this.getGrid();
        let locator = await this.page.locator(await grid.getButtonAtByClass(1, 6, btn.toString()))
        await locator.click();
    }

    public async newEntry(){
        await this.btnNewEntry.click();
        return new EntryPage(this.page);
    }

    public async findEntry(description: string) {
        await this.searchByDescription(description);
        let grid = await this.getGrid();
        await grid.findItemAt(description, 1, 1);
    }

    private async searchByDescription(description: string){
        await expect(description).not.toBeNull()
        await this.inputSearch.fill('')
        await this.inputSearch.fill(description)
        await this.inputSearch.press('Enter')
    }

    private getGrid(): GridUI{
        return new GridUI('#tabelaLancamentos', this.page);
    }

    public async goToDashboard(){
        await expect(this.page).toHaveURL(/lancamentos/);
        await this.btnDashboard.click();
        await expect(this.page).toHaveURL(/dashboard/);
        let dashboard = new DashboradPage(this.page);
        await dashboard.checkingDashboard();
    }
}
