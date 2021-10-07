import { Document } from "mongodb";

export type CacheData = string;

export type GetCache = { _id: string; key: string, data: CacheData };

export interface ICacheRepository extends
  ICache,
  IFindAllKeysCacheRepository,
  IDeleteEntryCacheRepository,
  IDeleteAllCacheRepository,
  IUpdateCacheEntryRepository,
  ICheckCacheLoadRepository,
  IGetOldestEntryRepository {}

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

export interface IDeleteAllCacheRepository {
  deleteAll(): Promise<void>;
}

export interface IUpdateCacheEntryRepository {
  updateWithId(id: string, updatedData: { key: string, data: string}): Promise<void>
  update(key: string, data: string): Promise<void>;
}

export interface ICheckCacheLoadRepository {
  isCacheFull(): Promise<boolean>;
}

export interface IGetOldestEntryRepository {
  getOldestEntry(): Promise<Document>;
}