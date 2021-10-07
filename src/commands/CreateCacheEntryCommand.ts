import { EventEmitter } from "events";

import { logger } from "../Logger";
import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";
import {
  CacheData,
  ICache,
  IGetOldestEntryRepository,
  ICheckCacheLoadRepository,
  IUpdateCacheEntryRepository
} from "../repositories/ICacheRepository";
import { API } from "../Environment";

type getCacheData = { key: string, data: CacheData };

export default class CreateCacheEntryCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: ICache &
      ICheckCacheLoadRepository &
      IGetOldestEntryRepository &
      IUpdateCacheEntryRepository,
  ) {}

  async execute(payload: getCacheData): Promise<void | boolean> {
    logger.info("Create cache entry");
    const entry = await this.cache.get(payload.key);

    if (entry) {
      return this.events.emit(CACHE.CACHE_KEY_ALREADY_EXISTS, { key: payload.key });
    }

    const isCacheFull = await this.cache.isCacheFull();

    // extract this logic to a different command because it will be repeated when inserting a record
    if (isCacheFull) {
      const oldestEntry = await this.cache.getOldestEntry();

      await this.cache.updateWithId(oldestEntry._id, payload);

      return this.events.emit(CACHE.UPDATED_OLDEST_ENTRY, { key: payload.key, data: payload.data });
    }

    const result = await this.cache.set(payload.key, payload.data);

    this.events.emit(CACHE.CREATE_CACHE_ENTRY, result);
  }
}