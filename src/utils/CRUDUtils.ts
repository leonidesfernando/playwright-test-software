import { EntryListPage } from "../pageobjects/EntryListPage";
import { EntryPayload } from "../services/EntryApiServce";
import { DataGen } from "./DataGen";
import PlaywrightUtils from "./PlaywrightUtils";

export const CrudUtils = {

    //TODO: remove this method and use only the method below genCrudData
    async genCrudDataOld (): Promise<any>{

        const data = {date: '', description: '', value: '', category: '', typeEntry: ''};
    
        data.date = DataGen.strDateCurrentMonth();
        data.description = `${DataGen.productName()} ${await PlaywrightUtils.getBrowserName()} on ${data.date} - ${DataGen.number()}`;
        data.value = DataGen.moneyValue();
        data.category = DataGen.getCategory();
        data.typeEntry = DataGen.getTipoLancamento(data.category);
        return data;
    },

    async genCrudData(): Promise<EntryPayload>{
        const date = DataGen.strDateCurrentMonth();
        const localCategory = DataGen.getCategory();
        const data: EntryPayload = {
            category: localCategory as EntryPayload['category'],
            amount: DataGen.moneyValue(),
            description: `${DataGen.productName()} ${await PlaywrightUtils.getBrowserName()} on ${date} - ${DataGen.number()}`,
            entryDate: date,
            entryType: DataGen.getTipoLancamento(localCategory) as EntryPayload['entryType'],
            userId: '',
            id:0
        };
        return data;
        
    },
    
    async addEntry(entryListPage: EntryListPage): Promise<any>{
        const data:{date:'', description:'', value:'', category:'', typeEntry:''} = await CrudUtils.genCrudDataOld();
        const entryPage = await entryListPage.newEntry();
        await entryPage.saveEntry(data.description, data.date, data.value, data.category, data.typeEntry);
        await entryListPage.closeEntryRegistrySuccessAlert();
        return data;
    }

}