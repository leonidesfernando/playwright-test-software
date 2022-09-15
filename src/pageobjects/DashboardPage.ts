//@ts-check
import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboradPage extends BasePage{

    private readonly btnList !: Locator;
    private readonly pieChart !: Locator;
    private readonly tableChat !: Locator;

    constructor(page:Page){
        super(page)
        this.btnList = this.getBy('a[title="Listagem"]')
        this.pieChart = this.getBy('#pieChart')
        this.tableChat = this.getBy('#tableChart')
    }

    public async goToListing(){
        this.btnList.click();
        await expect(this.page).toHaveURL(/lancamentos/);
    }
    
    public async checkingDashboard(){
        await expect(this.pieChart).toBeVisible()
        await expect(this.tableChat).toBeVisible()
    }

}