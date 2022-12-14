//@ts-check
import { Page, expect, Locator } from "@playwright/test";
import { BaseUI } from "./BaseUI";

export class GridUI extends BaseUI{

  private readonly id:string;

  public constructor(id:string, page:Page){
    super(page);
    this.id = id;
  }


  public async findItemAt(item: string, line: number, column: number):Promise<void> {
    await this.mustHaveValueAtCell(line, column, item);
  }

  public async mustHaveValueAtCell(line: number, column: number, value: string):Promise<void> {

    let locator = this.page.locator(this.getLineSelector(line, column)).first()
    let extractedValue = await locator.innerText()
    expect(extractedValue).toEqual(value)
  }

  public getButtonAtByClass(line: number, column: number, btnClass: string): string {
    return `table${ this.id }.table:first-of-type tbody > tr:nth-of-type(${line}) td a.${btnClass}`;
  }

  protected async getValueAtLine(lineIndex: number, column: number): Promise<Locator> {
    const str = this.getLineSelector(lineIndex, column);
    expect(str).not.toBeNull()
    return  this.page.locator(str);
  }

  private getLineSelector(lineIndex: number, column: number): string {
    return `table${this.id}.table:first-of-type tbody > tr:nth-of-type(${lineIndex}) td:nth-of-type(${column})`;
  }

  public async mustBeEmpty(): Promise<void> {
    expect(await this.existsAnyItem()).toBeFalsy()
  }

  private async existsAnyItem(): Promise<boolean> {
    await expect(this.page.locator(this.id)).toBeVisible()
    return await this.page.locator(`${this.id}.ui-empty-table`).count() == 0;
  }

}
