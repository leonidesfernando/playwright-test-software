// services/apiClient.ts
import { request, APIRequestContext, APIResponse } from '@playwright/test';
import { getBaseApiUrl, getUsername, getPassword } from '../../config';


export class ApiClientService {
  private token: string | null = null;
  private context: APIRequestContext | null = null;
  private userId: number = 0;


  constructor() {}

  private async authenticate(): Promise<void> {
    if (this.token) return; // already authenticated

    const loginContext = await request.newContext({ baseURL: getBaseApiUrl() });
    const response = await loginContext.post('/api/auth/signin', {
      data: {
        username: getUsername(),
        password: getPassword(),
      },
    });

    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()} ${response.statusText()}`);
    }

    const body = await response.json();
    this.token = body.token;
    this.userId = body.id;


    this.context = await request.newContext({
      baseURL: getBaseApiUrl(),
      extraHTTPHeaders: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public async getUserId(): Promise<number>{
    if(this.userId == 0){
      await this.authenticate();
    }
    return this.userId;
  }

  public async get(path: string): Promise<APIResponse> {
    await this.authenticate();
    return this.context!.get(path);
  }

  public async post(path: string, data: any): Promise<APIResponse> {
    await this.authenticate();
    return this.context!.post(path, { data });
  }

  public async put(path: string, data: any): Promise<APIResponse> {
    await this.authenticate();
    return this.context!.put(path, { data });
  }

  public async delete(path: string): Promise<APIResponse> {
    await this.authenticate();
    return this.context!.delete(path);
  }

  public async deleteAll(path: string, data: any): Promise<APIResponse> {
    await this.authenticate();
    return this.context!.delete(path, { data });
  }

  public clearToken(): void {
    this.token = null;
    this.context = null;
  }
}
