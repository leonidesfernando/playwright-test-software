import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

export class LoginHelper{
    readonly page:Page;
    readonly loginPage:LoginPage;
    readonly url:string;

    constructor(page:Page, url:string){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.url = url;
    }

    /**
     * doLogin
     */
    public async doLogin() {

        await this.page.goto(this.url);
        await expect(this.page).toHaveTitle(/Login - Simple WebApp/);
        await expect(this.page).toHaveURL(/login/);
        await this.loginPage.loginInput.click();
        await this.loginPage.loginInput.fill('user');
        await this.loginPage.passwordInput.fill('a');
        await this.loginPage.passwordInput.press('Enter');

        await expect(this.page).toHaveURL(/lancamentos/);
    }

    public async doLogout(){
        await this.loginPage.logoutLink.click();
        await expect(this.page).toHaveURL(/login/);

    }
}