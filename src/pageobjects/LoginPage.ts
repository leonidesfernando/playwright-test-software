//@ts-check
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
    private readonly _loginInput !:Locator;
    private readonly _passwordInput !:Locator;
    private readonly _logoutLink !:Locator;

    constructor(page:Page){
        super(page)
        this._loginInput = this.getBy('input[id="user"]');
        this._passwordInput = this.getBy('input[id="password"]');
        this._logoutLink = this.getBy('#logout')
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
