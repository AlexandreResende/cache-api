import EventEmitter from "events";

import { CACHE } from "../Events";
import { CacheData, IGetOldestEntryRepository, IUpdateCacheEntryRepository } from "../repositories/ICacheRepository";

type GetCacheData = { key: string, data: CacheData };

export class UpdateOldestEntryCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cacheRepository: IGetOldestEntryRepository & IUpdateCacheEntryRepository
  ) {}

  async execute(payload: GetCacheData): Promise<void | boolean> {
    const oldestEntry = await this.cacheRepository.getOldestEntry();

    await this.cacheRepository.updateWithId(oldestEntry._id, payload);

    return this.events.emit(CACHE.UPDATED_OLDEST_ENTRY, { key: payload.key, data: payload.data });
  }
}