//@ts-check
import { Locator, Page, expect } from "@playwright/test";
import { GridUI } from "../components/GridUI";
import { BasePage } from "./BasePage";
import { EntryPage } from "./EntryPage";
import { DashboradPage } from "./DashboardPage";
import { RemoveAllModalPage } from "./RemoveAllModalPage";
import {getBaseUrl} from "../../config"

enum Button {
    EDIT = 'btn-primary',
    DELETE = 'btn-warning'
}

export class EntryListPage extends BasePage {

    private readonly btnNewEntry !: Locator;
    private readonly inputSearch !: Locator;
    private readonly btnDashboard !: Locator;
    private readonly btnRemoveAll !: Locator;
    private readonly btnReload !: Locator;
    private readonly modalRemoveAll !: RemoveAllModalPage;
    private readonly alertMessage !: Locator;
    private readonly alertCloseButton !: Locator;

    constructor(page: Page){
        super(page);
        this.modalRemoveAll = new RemoveAllModalPage(page);
        this.btnNewEntry = this.getBy('#novoLancamento');
        this.inputSearch = this.getBy('#itemBusca');
        this.btnDashboard = this.getBy("a[title='Dashboard']");
        this.btnRemoveAll = this.getBy("#btnRemoveAll");
        this.btnReload = this.getBy('#btnReload');
        this.alertMessage = this.getBy('div[class] span');
        this.alertCloseButton = this.getBy('#app > header > nav > div > div.container-fluid > div > div > button');
    }

    public async closeEntryRegistrySuccessAlert():Promise<void> {
        this.alertCloseButton.click();
    }

    public async checkSuccessfulEntryRegistryMessage(): Promise<boolean> {
        const message = this.alertMessage.innerText();
        return true;
    }

    public async clickReloadButton(): Promise<void> {
        await this.btnReload.click();
    }

    public async clickRemoveAllButton(removeAll:boolean): Promise<void> {
        await this.btnRemoveAll.click();
        await this.modalRemoveAll.removeAll(removeAll);
    }

    public async openFirstToEdit():Promise<EntryPage> {
        await this.clickFirstButton(Button.EDIT);
        return new EntryPage(this.page);
    }

    public async removeFirstEntryByDescription(description: string): Promise<void> {
        await this.clickFirstButton(Button.DELETE);
        await this.searchByDescription(description);
        await this.listMustBeEmpty();
    }

    public async listMustBeEmpty():Promise<void>{
        let grid = await this.getGrid();
        await grid.mustBeEmpty();
    }

    public async listMustBeNotEmpty(nItems: number): Promise<void> {
        const grid = await this.getGrid();
        expect(await grid.getNumberOfElements()).toBeGreaterThanOrEqual(nItems)
    }

    public async getNumberOfElements(): Promise<number>{
        const grid = await this.getGrid();
        return grid.getNumberOfElements();
    }

    protected async clickFirstButton(btn: Button): Promise<void>{
        let grid = await this.getGrid();
        let locator = this.page.locator(grid.getButtonAtByClass(1, 6, btn.toString()));
        await locator.click();
    }

    public async newEntry(): Promise<EntryPage>{
        await this.btnNewEntry.click();
        this.page.waitForURL(`${getBaseUrl()}/entry`);
        return new EntryPage(this.page);
    }

    public async findEntry(description: string): Promise<void> {
        await this.searchByDescription(description);
        let grid = await this.getGrid();
        await grid.findItemAt(description, 1);
    }

    private async searchByDescription(description: string): Promise<void>{
        expect(description).not.toBeNull();
        await expect(this.page).toHaveURL(/entries/);
        await this.inputSearch.fill('');
        await this.inputSearch.fill(description);
        await this.inputSearch.press('Enter');   
    }

    private async getGrid(): Promise<GridUI>{
        return new GridUI('#tabelaLancamentos', this.page);
    }

    public async goToDashboard(): Promise<DashboradPage>{
        await expect(this.page).toHaveURL(/entries/);
        await this.btnDashboard.click();
        await expect(this.page).toHaveURL(/dashboard/);
        let dashboard = new DashboradPage(this.page);
        await dashboard.checkingDashboard();
        return dashboard;
    }
}
