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
import { UpdateOldestEntryCommand } from "./UpdateOldestEntryCommand";

type getCacheData = { key: string, data: CacheData };

export default class CreateCacheEntryCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: ICache &
      ICheckCacheLoadRepository &
      IGetOldestEntryRepository &
      IUpdateCacheEntryRepository,
    private readonly updateOldestEntryCommand: UpdateOldestEntryCommand,
  ) {}

  async execute(payload: getCacheData): Promise<void | boolean> {
    logger.info("Create cache entry");
    const entry = await this.cache.get(payload.key);

    if (entry) {
      return this.events.emit(CACHE.CACHE_KEY_ALREADY_EXISTS, { key: payload.key });
    }

    const isCacheFull = await this.cache.isCacheFull();

    if (isCacheFull) {
      return this.updateOldestEntryCommand.execute(payload);
    }

    const result = await this.cache.set(payload.key, payload.data);

    this.events.emit(CACHE.CREATE_CACHE_ENTRY, result);
  }
}