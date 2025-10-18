// global-teardown.ts
import { request, FullConfig, APIResponse } from '@playwright/test';

import {ApiClientService} from './src/services/ApiClientService'; 
import {EntryApiServce} from './src/services/EntryApiServce';
import {MessageResponseWithStatus, MessageResponse} from './src/services/MessageResponse';

export default async function globalTeardown(config: FullConfig): Promise<void> {

  const apiClientService = new ApiClientService();
  const entryService = new EntryApiServce(apiClientService);

  console.log('');
  console.log('TEARDOWN');
  console.log('\u2713 Initializing teardown');
  const apiResponse:APIResponse = await entryService.deleteAll();
    
  const response:MessageResponse = await apiResponse.json();
  const status:number = apiResponse.status();
  const responseWithStatus: MessageResponseWithStatus = {
    ...response,
    status
  };

  if(responseWithStatus.status === 200){
    console.log('\u2713 User cleanup successful')
  }

  /* request.dispose()
  Closes and cleans up that request context.
  Frees up resources associated with the context (e.g., internal handles, memory).
  Prevents memory leaks in long-running processes (like when you do many requests in scripts or global setup/teardown).
  */
  await apiResponse.dispose();
  console.log('\u2713 Finalized teardown');
}
