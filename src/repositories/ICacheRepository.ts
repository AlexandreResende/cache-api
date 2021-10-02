import { Document } from "mongodb";

export type CacheData = string | number | object;

export type GetCache = { _id: string; key: string, data: CacheData };

export interface ICache {
  get(key: string): Promise<Document | null>;
  set(key: string, data: CacheData): Promise<void>
}
