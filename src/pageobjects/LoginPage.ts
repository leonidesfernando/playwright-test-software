//@ts-check
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
    private readonly _loginInput !:Locator;
    private readonly _passwordInput !:Locator;

    constructor(page:Page){
        super(page)
        this._loginInput = this.getBy('input[id="username"]');
        this._passwordInput = this.getBy('input[id="password"]');
    }

    get loginInput(): Locator{
        return this._loginInput
    }

    get passwordInput(): Locator{
        return this._passwordInput;
    }
}
