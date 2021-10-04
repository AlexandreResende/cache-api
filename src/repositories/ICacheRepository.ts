import { Document } from "mongodb";

export type CacheData = string;

export type GetCache = { _id: string; key: string, data: CacheData };

export interface ICacheRepository extends ICache, IFindAllKeysCacheRepository {}

export interface ICache {
  get(key: string): Promise<Document | null>;
  set(key: string, data: CacheData): Promise<void>
}

export interface IFindAllKeysCacheRepository {
  getAllKeys(): Promise<Document>;
}

export interface IDeleteEntryCacheRepository {
  deleteKey(key: string): Promise<void>;
}