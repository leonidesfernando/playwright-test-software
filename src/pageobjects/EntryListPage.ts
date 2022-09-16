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
        this.btnNewEntry = this.getBy('#novoLancamento');
        this.inputSearch = this.getBy('#itemBusca');
        this.btnDashboard = this.getBy("a[title='Gráfico']");
    }

    public async openFirstToEdit():Promise<EntryPage> {
        await this.clickButton(Button.EDIT);
        return new EntryPage(this.page);
    }

    public async removeFirstEntryByDescription(description: string): Promise<void> {
        await this.clickButton(Button.DELETE);
        await this.searchByDescription(description);
        let grid = await this.getGrid();
        await grid.mustBeEmpty();
    }

    protected async clickButton(btn: Button): Promise<void>{
        let grid = await this.getGrid();
        let locator = this.page.locator(grid.getButtonAtByClass(1, 6, btn.toString()));
        await locator.click();
    }

    public async newEntry(): Promise<EntryPage>{
        await this.btnNewEntry.click();
        return new EntryPage(this.page);
    }

    public async findEntry(description: string): Promise<void> {
        await this.searchByDescription(description);
        let grid = await this.getGrid();
        await grid.findItemAt(description, 1, 1);
    }

    private async searchByDescription(description: string): Promise<void>{
        expect(description).not.toBeNull();
        await expect(this.page).toHaveURL(/lancamentos/);
        await this.inputSearch.fill('');
        await this.inputSearch.fill(description);
        await this.inputSearch.press('Enter');
    }

    private async getGrid(): Promise<GridUI>{
        return new GridUI('#tabelaLancamentos', this.page);
    }

    public async goToDashboard(): Promise<DashboradPage>{
        await expect(this.page).toHaveURL(/lancamentos/);
        await this.btnDashboard.click();
        await expect(this.page).toHaveURL(/dashboard/);
        let dashboard = new DashboradPage(this.page);
        await dashboard.checkingDashboard();
        return dashboard;
    }
}
