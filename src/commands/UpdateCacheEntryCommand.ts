import { EventEmitter } from 'events';

import { CACHE } from '../Events';
import { logger } from '../Logger';
import { IBaseCommand } from './IBaseCommand';
import { IUpdateCacheEntryRepository } from '../repositories/ICacheRepository';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'UpdateCacheEntryCommand', useClass: UpdateCacheEntryCommand }])
export default class UpdateCacheEntryCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cache: IUpdateCacheEntryRepository,
  ) {}

  async execute(events: EventEmitter, payload: { key: string, data: string }): Promise<void | boolean> {
    await this.cache.update(payload.key, payload.data);

    logger.info(`Update cache entry which key is ${payload.key}`);

    return events.emit(CACHE.CACHE_ENTRY_UPDATED, {});
  }
}