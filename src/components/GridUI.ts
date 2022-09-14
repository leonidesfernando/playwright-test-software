//@ts-check

import { Locator, Page, expect } from "@playwright/test";

export class GridUI{

  private readonly id:string;
  private readonly page: Page;

  public constructor(id:string, page:Page){
    this.id = id;
    this.page = page;
  }


  public async findItemAt(item: string, line: number, column: number) {
    await this.mustHaveValueAtCell(line, column, item);
  }

  public mustNotFindItem(item: string, line:number, column: number){
    //this.getValueAtLine(line, column).filter(`:contains(${item})`).should('have.length', 0)
    //this.mustBeEmpty()
  }

  public async mustHaveValueAtCell(line: number, column: number, value: string) {

    let locator = await this.page.locator(this.getLineSelector(line, column)).first()
    let extractedValue = await locator.innerText()
    expect(extractedValue).toEqual(value)
  }

  public getButtonAtByClass(line: number, column: number, btnClass: string) {
    return `table${ this.id }.table:first-of-type tbody > tr:nth-of-type(${line}) td a.${btnClass}`;
  }

  protected async getValueAtLine(lineIndex: number, column: number) {
    const str =  await this.getLineSelector(lineIndex, column);
    await expect(str).not.toBeNull()
    return await this.page.locator(str);
  }

  private getLineSelector(lineIndex: number, column: number) {
    return `table${this.id}.table:first-of-type tbody > tr:nth-of-type(${lineIndex}) td:nth-of-type(${column})`;
  }

  protected mustBeEmpty(): void {
    expect(this.existsAnyItem()).toBeFalsy();
  }

  private existsAnyItem(): boolean {

    let result: boolean = true;
    /*CypressUtils.waitElementBeVisible(this.id);
    cy.get(this.id).then($table => {
      if ($table.find("ui-empty-table").length == 0) {
        result = false;
        return false;
      }
    });*/
    return result;
  }

}
