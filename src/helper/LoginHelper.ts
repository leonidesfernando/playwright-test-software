import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { getPassword, getUsername } from '../../config';
import { HomePage } from '../pageobjects/HomePage';


export class LoginHelper{
    private readonly page !: Page;
    private readonly loginPage !: LoginPage;
    private readonly homePage !: HomePage;
    private readonly url !: string;

    constructor(page:Page, url:string){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.url = url;
    }

    /**
     * doLogin
     */
    public async doLogin(language: string):Promise<void> {

        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(/login/);
        await this.loginPage.loginInput.click();
        await this.loginPage.loginInput.fill(getUsername());
        await this.loginPage.passwordInput.fill(getPassword());
        await this.loginPage.passwordInput.press('Enter');

        await expect(this.page).toHaveURL(/entries/);
        await this.selectLanguage(language);
    }


    public async doLogout(): Promise<void>{
        await expect(this.homePage.logoutLink).toBeVisible()
        await this.homePage.logoutLink.click();
        await expect(this.page).toHaveURL(/login/);

    }

    private async selectLanguage(language: string):Promise<void> {
        switch (language) {
            case 'EN':
                this.selectEnLanguage()
            break
            case 'BR':
                this.selectBrLanguage()
            break
            default:
                throw new Error(`Language ${language} not supported. Only the langs EN, BR are supported`)
        }
    }

    private async selectEnLanguage():Promise<void> {
        this.homePage.enLanguage.click()
    }

    private async selectBrLanguage():Promise<void> {
        this.homePage.brLanguage.click()
    }
}
