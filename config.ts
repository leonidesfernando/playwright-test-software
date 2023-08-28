import { expect } from '@playwright/test';
import config from './config.json';
import dotenv from 'dotenv';

dotenv.config();

const env: string = process.env.ENV_NAME || 'test';

const configuration = getConfig();

export function getBaseUrl(): string {
  validate(configuration.baseUrl, 'baseUrl');
  return configuration.baseUrl;
}

export function getUsername(): string {

  validate(configuration.username, 'username');
  return configuration.username;
}

export function getPassword(): string {
  validate(configuration.password, 'password');
  return configuration.password;
}

function getConfig(): any {
  return config[env];
}

function validate(property: any, propertyName:string){
  expect(property, `The ${propertyName} must not be undefined. Check the config.json file`).not.toBeUndefined();
  expect(property, `The ${propertyName} must not be null. Check the config.json file`).not.toBeNull();
  expect(property, `The ${ propertyName } must not be empty. Check the config.json file`).not.toEqual('');
}