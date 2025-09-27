//@ts-check
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RemoveAllModalPage extends BasePage{

  private readonly textRemoveAllToBeTyped !: Locator;
  private readonly inputTextDeleteAll !: Locator;
  private readonly btnYesRemoveAll !: Locator;
  private readonly btnCancelRemoveAll !: Locator;

  constructor(page:Page){
    super(page);
    this.textRemoveAllToBeTyped = this.getBy('#textRemoveAllSystem');
    this.inputTextDeleteAll = this.getBy('#textDeleteAll');
    this.btnCancelRemoveAll = this.getBy('#btnCancelRemoveAll');
    this.btnYesRemoveAll = this.getBy('#btnYesRemoveAll');
  }

  public async removeAll(confirmRemove: boolean): Promise<void>{

    const text = await this.textRemoveAllToBeTyped.inputValue();
    await this.inputTextDeleteAll.fill(text);
    if(confirmRemove){
      await this.btnYesRemoveAll.click();
    }else{
      await this.btnCancelRemoveAll.click();
    }
    await expect(this.btnCancelRemoveAll).toBeHidden();
  }
}