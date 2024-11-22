//@ts-check
import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboradPage extends BasePage{

    private readonly btnList !: Locator;
    private readonly doughnutChart !: Locator;
    private readonly tableChat !: Locator;

    constructor(page:Page){
        super(page)
        this.btnList = this.getBy('a[title="Entries"]');
        this.doughnutChart = this.getBy('#doughnutChart');
        this.tableChat = this.getBy('#tableChart');
    }

    public async goToListing(): Promise<void>{
        this.btnList.click();
        await expect(this.page).toHaveURL(/entries/);
    }
    
    public async checkingDashboard(): Promise<void>{
        await expect(this.doughnutChart).toBeVisible();
        await expect(this.tableChat).toBeVisible();
    }

}
