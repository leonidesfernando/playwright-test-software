//@ts-check
import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboradPage extends BasePage{

    private readonly btnList !: Locator;
    private readonly pieChart !: Locator;
    private readonly tableChat !: Locator;
    private readonly loadingChart !: Locator;

    constructor(page:Page){
        super(page)
        this.btnList = this.getBy('a[title="Listagem"]');
        this.pieChart = this.getBy('#pieChart');
        this.tableChat = this.getBy('#tableChart');
        this.loadingChart = this.getBy('#loadingDivPie');
    }

    public async goToListing(): Promise<void>{
        this.btnList.click();
        await expect(this.page).toHaveURL(/lancamentos/);
    }
    
    public async checkingDashboard(): Promise<void>{
        await expect(this.loadingChart).toHaveCount(0);
        await expect(this.pieChart).toBeVisible();
        await expect(this.tableChat).toBeVisible();
    }

}
