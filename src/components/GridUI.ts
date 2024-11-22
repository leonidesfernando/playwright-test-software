//@ts-check
import { Page, expect, Locator } from "@playwright/test";
import { BaseUI } from "./BaseUI";
import { StringUtils } from "../utils/StringUtils";

export class GridUI extends BaseUI{

  private readonly id:string;

  public constructor(id:string, page:Page){
    super(page);
    this.id = id;
  }

  public async findItemAt(text:string, line:number):Promise<void> {

    const [description, category, entryType] = await Promise.all([
      this.getTextItemAtLineBy(text, line),
      this.getTextItemAtLineBy(text, line),
      this.getTextItemAtLineBy(text, line)
    ]);

    expect(await StringUtils.containsText([description, category, entryType], text)).toBe(true);
  }

  /**
   * 
   * @param text - text to be found
   * @param line - which line the text must be found
   * @param columnNumber - where should used to perform the search(description, category, entryType but using the column numbers)
   */
  private async getTextItemAtLineBy(text:string, line: number): Promise<string>{
    let locator = this.page.locator(`${this.id} tr:nth-of-type(${line}) td:has-text("${text}")`);

    return await locator.innerText();
  }

  public getButtonAtByClass(line: number, column: number, btnClass: string): string {
    return `${this.id} tr:nth-of-type(${line}) td a.${btnClass}`;
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

    const cssClasses = await this.page.locator(`${this.id}`).getAttribute("class");
    if (cssClasses?.includes('ui-empty-table')){
      return false;
    }
    return await this.page.locator(`#description1`).count() > 0;
  }

}
