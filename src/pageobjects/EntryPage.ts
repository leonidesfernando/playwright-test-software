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
      this.inputDescription = this.getBy('input[id="descricao"]');
      this.inputDate = this.getBy('input[id="datepicker"]');
      this.inputAmount = this.getBy('input[id="valor"]');
      this.selectCategory = this.getBy('[id="categoria"]');
      this.btnCancel = this.getBy('button[id="cancelar"]');  
      this.radioIncome = this.getBy('#tipoLancamento1');
      this.radioSpent = this.getBy('#tipoLancamento2');
      this.radioTransf = this.getBy('#tipoLancamento3');
    }

    public async saveEntry(description: string, date: string, value: string, category: string, typeEntry: string) {
    
        await this.fillData(description, date, value, category, typeEntry);
        await this.btnSave.click();
    }

    private async fillData(description: string, date: string, value: string, category: string, typeEntry: string) {
        await this.fillDescription(description);
        await this.inputDate.fill(date);
        await this.inputDescription.click();
        await this.inputAmount.fill(value);
        await this.selectTypeEntry(typeEntry)
        await this.selectCategory.selectOption(category)
      }

      private async fillDescription(description: string) {
        await this.inputDescription.fill('');
        if(description && (description.trim() != ''))
          await this.inputDescription.fill(description);
      }

      private async selectTypeEntry(typeEntry: string) {
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
