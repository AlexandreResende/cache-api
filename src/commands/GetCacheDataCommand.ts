import { EventEmitter } from "events";
import faker from "faker";

import { logger } from "../Logger";
import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";
import { ICache } from "../repositories/ICacheRepository";

type getCacheData = { key: string };

export default class GetCacheDataCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: ICache,
  ) {}

  async execute(payload: getCacheData): Promise<void | boolean> {
    const cachedData = await this.cache.get(payload.key);

    if (cachedData) {
      logger.info("Cache entry retrieved");

      return this.events.emit(CACHE.CACHE_RETRIEVED_EVENT, { key: cachedData.key, data: cachedData.data });
    }

    logger.info("Cache key does not exist, creating an entry for this key");
    const data = faker.lorem.word();

    await this.cache.set(payload.key, data);

    return this.events.emit(CACHE.CACHE_NOT_FOUND_EVENT, { key: payload.key, data });
  }
}