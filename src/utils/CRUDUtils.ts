import { Page } from "@playwright/test";
import { EntryListPage } from "../pageobjects/EntryListPage";
import { DataGen } from "./DataGen";
import PlaywrightUtils from "./PlaywrightUtils";

export const CrudUtils = {

    async genCrudData (page: Page): Promise<any>{

        let data = {date: '', description: '', value: '', category: '', typeEntry: ''};
    
        data.date = DataGen.strDateCurrentMonth();
        data.description = `${DataGen.productName()} ${await PlaywrightUtils.getBrowserName(page)} on ${data.date}`;
        data.value = DataGen.moneyValue();
        data.category = DataGen.getCategory();
        data.typeEntry = DataGen.getTipoLancamento(data.category);
        return data;
    },
    
    async addEntry(entryListPage: EntryListPage, page: Page) {
        const data:{date:'', description:'', value:'', category:'', typeEntry:''} = await CrudUtils.genCrudData(page);
        let entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(data.description, data.date, data.value, data.category, data.typeEntry);
        return data;
    }

}