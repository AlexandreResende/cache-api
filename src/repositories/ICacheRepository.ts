export type CacheData = string | number | object;

export interface ICacheRepository {
  get(key: string): Promise<CacheData>;
  set(): Promise<void>
}