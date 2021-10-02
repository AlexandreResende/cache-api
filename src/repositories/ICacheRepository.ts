export type CacheData = string | number | object;

export interface ICache {
  get(key: string): Promise<CacheData | null>;
  set(key: string, data: CacheData): Promise<void>
}
