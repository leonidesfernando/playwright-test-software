import { test as base, expect } from '@playwright/test';
import { ApiClientService } from '../../src/services/ApiClientService';
import { EntriesSearchResult, EntryApiServce, EntryPayload, EntrySearchPayload } from '../../src/services/EntryApiServce';
import { CrudUtils } from '../../src/utils/CRUDUtils';
import {StringUtils} from '../../src/utils/StringUtils'
import { MessageResponseWithStatus } from '../../src/services/MessageResponse';


type EntryTestFixtures = {
  entry: EntryPayload;
};
  
const apiClientService = new ApiClientService();
const entryService = new EntryApiServce(apiClientService);


const test = base.extend<EntryTestFixtures>({
  entry: async ({}, use) => {
    const entryData: EntryPayload = await CrudUtils.genCrudData();
    const response:MessageResponseWithStatus = await entryService.add(entryData);
    expect.soft(response.message).toBe('entry.added');
    expect.soft(response.status).toBeTruthy();
    expect.soft(response.id).toBeGreaterThan(0);
    entryData.id = response.id!;
    await use(entryData);
  }
});


test.describe.serial('Entry API tests', async () =>{

  const fields: string[] = ['category', 'description', 'entryType'];
  for(const field of fields){
    test(`SEARCH Entry by ${field}`, async ({entry}) => {
      const map:Map<string,string> = new Map();
      map.set('category', await StringUtils.normalizeCategory(entry.category));
      map.set('description', entry.description);
      map.set('entryType', entry.entryType);

      const formSearch: EntrySearchPayload = {
        searchItem: map.get(field)!,
        searchOnlyCurrentMonth: true,
        page: 1,
        userId: ''
      };
      
      const response: EntriesSearchResult = await entryService.search(formSearch);
      expect.soft(response.pageSize).toBeGreaterThan(0)
      expect.soft(response.totalRecords).toBeGreaterThan(0)
      expect.soft(response.itemSearch).toBe(formSearch.searchItem)

      for(const entry of response.entries){
        let item = await StringUtils.normalizeCategory(String(entry[field]).toString());
        expect.soft(item.toLowerCase()).toContain(formSearch.searchItem.toLowerCase())
      }
    })
  }

  test('SEARCH and do NOT FIND entry', async () => {
      const formSearch: EntrySearchPayload = {
        searchItem: 'ee%&**not-find',
        searchOnlyCurrentMonth: true,
        page: 1,
        userId: ''
      };
      const response: EntriesSearchResult = await entryService.search(formSearch);
      expect.soft(response.pageSize).toBe(0)
      expect.soft(response.totalRecords).toBe(0)
      expect.soft(response.itemSearch).toBe(formSearch.searchItem)
      expect.soft(response.entries).toHaveLength(0)
      expect.soft(response.pages).toHaveLength(0)
  })

  test('GET, ADD and Update Entry', async ({entry}) => {
    const response: EntryPayload = await entryService.get(entry.id);

    response.description += ' - Edited';
    const responseUpdate = await entryService.update(response);

    expect.soft(responseUpdate.message).toBe('entry.updated');
    expect.soft(responseUpdate.status).toBeTruthy();
    expect.soft(responseUpdate.id).toBe(entry.id);
  })

  test('ADD and DELETE Entry', async({entry}) => {
    const response = await entryService.delete(entry.id);
    expect.soft(response.message).toBe('entry.removed');
    expect.soft(response.status).toBeTruthy();
    expect.soft(response.id).toBe(entry.id);
  })

})
