import { APIResponse, expect } from "@playwright/test";
import { ApiClientService } from "./ApiClientService";
import { StringUtils } from "../utils/StringUtils";
import { MessageResponse } from "./MessageResponse";
import { MessageResponseWithStatus } from "./MessageResponse";


export interface EntryPayload {
  id: number;
  category: 'FOOD'|'WAGE'|'LEISURE'|'PHONE_INTERNET'|'CAR'|'LOAN'|'INVESTMENTS'|'CLOTHING'|'OTHER';
  amount: string;
  description: string;
  entryDate: string; // ISO date string
  entryType: 'INCOME' | 'EXPENSE' | 'TRANSF';
  userId: string;
}

export interface EntrySearchPayload{
    searchItem: string,
    searchOnlyCurrentMonth: boolean,
    page: number,
    userId: string
}

export interface EntriesSearchResult{
    totalSpend: string,
    totalEarnings: string,
    grandTotalExpenses: string,
    grandTotalWinnings: string,
    entries: [],
    p: number,
    pageSize: number,
    totalRecords: number,
    pages: [],
    itemSearch: string
}

export class EntryApiServce{

  private apiClientService:ApiClientService;

  constructor(apiClientService:ApiClientService){
    this.apiClientService = apiClientService;
  }

  public async add(paramData:EntryPayload): Promise<MessageResponseWithStatus> {
    const paramUserId = (await this.apiClientService.getUserId()).toString();
    const data: EntryPayload = {
        id: 0,
        category: paramData.category,
        amount: paramData.amount,
        description: paramData.description,
        entryDate: paramData.entryDate,
        entryType: paramData.entryType,
        userId: paramUserId
    };

    const apiResponse = await this.apiClientService.post('/api/entries/add', data);
    return this.toMessageWithStatus(apiResponse);
  }

  public async search(paramData: EntrySearchPayload): Promise<EntriesSearchResult>{
    paramData.userId = (await this.apiClientService.getUserId()).toString();
    const searchResponse = await this.apiClientService.post('/api/entries/search', paramData);
    const response = await searchResponse.json();
    expect.soft(searchResponse.status).toBeTruthy();

    const searchResult: EntriesSearchResult ={
      ...response
    }
    return searchResult;
  }

  public async get(entryId: number): Promise<EntryPayload>{
    const response = await this.apiClientService.get(`/api/entries/get/${entryId}`);
    const paramUserId = (await this.apiClientService.getUserId()).toString();
    const responseData = await response.json();
    const data: EntryPayload = {
        id: responseData.id,
        category: await StringUtils.normalizeCategory(responseData.category) as EntryPayload['category'],
        amount: responseData.amount,
        description: responseData.description,
        entryDate: responseData.entryDate,
        entryType: responseData.entryType.toLocaleUpperCase(),
        userId: paramUserId
    };
    return data;
  }

  public async update(data:EntryPayload): Promise<MessageResponseWithStatus> {
    const apiResponse = await this.apiClientService.put('/api/entries/update', data);
    return this.toMessageWithStatus(apiResponse);
  }

  public async delete(entryId:number): Promise<MessageResponseWithStatus> {
    const apiResponse = await this.apiClientService.delete(`/api/entries/remove/${entryId}`);
    return this.toMessageWithStatus(apiResponse);
  }


  public async deleteAll(): Promise<APIResponse>{
    const user = {id: (await this.apiClientService.getUserId()).toString()};
    const response = await this.apiClientService.deleteAll('/api/entries/removeAll', user);
    return response;
  }

  private async toMessageWithStatus(apiResponse: APIResponse):Promise<MessageResponseWithStatus> {
    const response:MessageResponse = await apiResponse.json();
    const status:number = apiResponse.status();
    const responseWithStatus: MessageResponseWithStatus = {
      ...response,
      status
    };
    return responseWithStatus;
  }
}
