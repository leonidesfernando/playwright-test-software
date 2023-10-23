import { EntryListPage } from "../pageobjects/EntryListPage";
import { DataGen } from "./DataGen";
import PlaywrightUtils from "./PlaywrightUtils";

export const CrudUtils = {

    async genCrudData (): Promise<any>{

        const data = {date: '', description: '', value: '', category: '', typeEntry: ''};
    
        data.date = DataGen.strDateCurrentMonth();
        data.description = `${DataGen.productName()} ${await PlaywrightUtils.getBrowserName()} on ${data.date} - ${DataGen.number()}`;
        data.value = DataGen.moneyValue();
        data.category = DataGen.getCategory();
        data.typeEntry = DataGen.getTipoLancamento(data.category);
        return data;
    },
    
    async addEntry(entryListPage: EntryListPage): Promise<any>{
        const data:{date:'', description:'', value:'', category:'', typeEntry:''} = await CrudUtils.genCrudData();
        const entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(data.description, data.date, data.value, data.category, data.typeEntry);
        return data;
    }

}