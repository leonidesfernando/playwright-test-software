//@ts-check
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{

  private readonly _logoutLink !:Locator;
  private readonly _brLanguage !:Locator;
  private readonly _enLanguage !:Locator;

  constructor(page:Page){
    super(page);
    this._logoutLink = this.getBy('#logout');
    this._enLanguage = this.getBy('input[id="EN"]');
    this._brLanguage = this.getBy('input[id="BR"]');
  }

      get brLanguage(): Locator{
        return this._brLanguage;
    }

    get enLanguage(): Locator{
        return this._enLanguage;
    }

    get logoutLink(): Locator{
        return this._logoutLink;
    }
}