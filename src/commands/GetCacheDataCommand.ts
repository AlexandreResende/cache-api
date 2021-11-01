import { EventEmitter } from 'events';
import faker from 'faker';

import { logger } from '../Logger';
import { CACHE } from '../Events';
import { IBaseCommand } from './IBaseCommand';
import { ICache } from '../repositories/ICacheRepository';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

type getCacheData = { key: string };


@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'GetCacheDataCommand', useClass: GetCacheDataCommand }])
export default class GetCacheDataCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cache: ICache,
  ) {}

  async execute(events: EventEmitter, payload: getCacheData): Promise<void | boolean> {
    console.log('INSIDE COMMAND');
    const cachedData = await this.cache.get(payload.key);

    if (cachedData) {
      logger.info('Cache entry retrieved');

      return events.emit(CACHE.CACHE_RETRIEVED_EVENT, { key: cachedData.key, data: cachedData.data });
    }

    logger.info('Cache key does not exist, creating an entry for this key');
    const data = faker.lorem.word();

    await this.cache.set(payload.key, data);

    return events.emit(CACHE.CACHE_NOT_FOUND_EVENT, { key: payload.key, data });
  }
}