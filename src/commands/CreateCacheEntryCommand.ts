import { EventEmitter } from "events";

import { logger } from "../Logger";
import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";
import { CacheData, ICache } from "../repositories/ICacheRepository";

type getCacheData = { key: string, data: CacheData };

export default class CreateCacheEntryCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: ICache,
  ) {}

  async execute(payload: getCacheData): Promise<void | boolean> {
    logger.info("Create cache entry");
    const entry = await this.cache.get(payload.key);

    if (entry) {
      return this.events.emit(CACHE.CACHE_KEY_ALREADY_EXISTS, { key: payload.key });
    }

    const result = await this.cache.set(payload.key, payload.data);

    this.events.emit(CACHE.CREATE_CACHE_ENTRY, result);
  }
}