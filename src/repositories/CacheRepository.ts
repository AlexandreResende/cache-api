import { CacheData, ICacheRepository } from "./ICacheRepository";

export default class CacheRepository implements ICacheRepository {
  constructor() {}

  async get(key: string): Promise<CacheData> {
    return '';
  }

  async set(): Promise<void> {}
}