import { expect, Locator, Page } from '@playwright/test';

export class LoginPage{
    private readonly _loginInput:Locator;
    private readonly _passwordInput:Locator;

    private readonly _logoutLink:Locator;

    constructor(page:Page){
        this._loginInput = page.locator('input[id="user"]');
        this._passwordInput = page.locator('input[id="password"]');
        this._logoutLink = page.locator('#logout')

    }

    get loginInput(): Locator{
        return this._loginInput
    }

    get passwordInput(): Locator{
        return this._passwordInput;
    }

    get logoutLink(): Locator{
        return this._logoutLink;
    }
}
