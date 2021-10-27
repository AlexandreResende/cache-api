import { EventEmitter } from 'events';

import { logger } from '../Logger';
import { CACHE } from '../Events';
import { IBaseCommand } from './IBaseCommand';
import {
  CacheData,
  ICache,
  IGetOldestEntryRepository,
  ICheckCacheLoadRepository,
  IUpdateCacheEntryRepository
} from '../repositories/ICacheRepository';
import { UpdateOldestEntryCommand } from './UpdateOldestEntryCommand';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

type getCacheData = { key: string, data: CacheData };


@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'CreateCacheEntryCommand', useClass: CreateCacheEntryCommand }])
export default class CreateCacheEntryCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cacheRepository: ICache &
      ICheckCacheLoadRepository &
      IGetOldestEntryRepository &
      IUpdateCacheEntryRepository,
    @inject('UpdateOldestEntryCommand') private readonly updateOldestEntryCommand: UpdateOldestEntryCommand,
  ) {}

  async execute(events: EventEmitter, payload: getCacheData): Promise<void | boolean> {
    logger.info('Creating cache entry');
    const entry = await this.cacheRepository.get(payload.key);

    if (entry) {
      return events.emit(CACHE.CACHE_KEY_ALREADY_EXISTS, { key: payload.key });
    }

    const isCacheFull = await this.cacheRepository.isCacheFull();

    if (isCacheFull) {
      logger.info('Cache is full, updating oldest value');

      return this.updateOldestEntryCommand.execute(events, payload);
    }

    const result = await this.cacheRepository.set(payload.key, payload.data);

    events.emit(CACHE.CREATE_CACHE_ENTRY, result);
  }
}