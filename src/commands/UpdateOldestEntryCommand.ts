import EventEmitter from "events";

import { CACHE } from "../Events";
import { logger } from "../Logger";
import { CacheData, IGetOldestEntryRepository, IUpdateCacheEntryRepository } from "../repositories/ICacheRepository";

type GetCacheData = { key: string, data: CacheData };

export class UpdateOldestEntryCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cacheRepository: IGetOldestEntryRepository & IUpdateCacheEntryRepository
  ) {}

  async execute(payload: GetCacheData): Promise<void | boolean> {
    logger.info("Getting oldest entry");
    const oldestEntry = await this.cacheRepository.getOldestEntry();

    logger.info(`Updating oldest entry which key is ${oldestEntry.key}`);
    await this.cacheRepository.updateWithId(oldestEntry._id, payload);

    return this.events.emit(CACHE.UPDATED_OLDEST_ENTRY, { key: payload.key, data: payload.data });
  }
}