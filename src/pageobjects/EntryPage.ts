//@ts-check
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class EntryPage extends BasePage {

    private readonly inputDescription:Locator;
    private readonly inputDate:Locator;
    private readonly inputAmount:Locator;
    private readonly selectCategory:Locator;
    private readonly btnCancel:Locator;
    private readonly radioIncome:Locator;
    private readonly radioSpent:Locator;
    private readonly radioTransf:Locator;
    private readonly btnSave:Locator;

    constructor(page:Page){

      super(page)
      this.btnSave = this.getBy('button[id="btnSalvar"]');
      this.inputDescription = this.getBy('input[id="description"]');
      this.inputDate = this.getBy('input[name="entryDate"]');
      this.inputAmount = this.getBy('input[id="amount"]');
      this.selectCategory = this.getBy('[id="category"]');
      this.btnCancel = this.getBy('button[id="cancelar"]');  
      this.radioIncome = this.getBy('#INCOME');
      this.radioSpent = this.getBy('#EXPENSE');
      this.radioTransf = this.getBy('#TRANSF');
    }

    public async saveEntry(description: string, date: string, value: string, category: string, typeEntry: string):Promise<void> {
    
        await this.fillData(description, date, value, category, typeEntry);
        await this.btnSave.click();
    }

    private async fillData(description: string, date: string, value: string, category: string, typeEntry: string):Promise<void> {
        await this.fillDescription(description);
        await this.inputDate.click();
        await this.inputDate.dblclick();
        

        await this.inputDate.fill(date);
        //await this.inputDate.fill('2024-11-20');
        await this.inputDescription.click();
        await this.inputAmount.fill(value);
        await this.selectTypeEntry(typeEntry)
        await this.selectCategory.selectOption(category)

      }

      private async fillDescription(description: string):Promise<void> {
        await this.inputDescription.fill('');
        if(description && (description.trim() != '')){
          await this.inputDescription.fill(description);
        }
      }

      private async selectTypeEntry(typeEntry: string): Promise<void> {
        switch(typeEntry){
          case 'TRANSF':
            this.radioTransf.click();
            break;
          case 'RENDA':
            this.radioIncome.click();
            break;
          case 'DESPESA':
            this.radioSpent.click();
            break;
        }
    }
}
