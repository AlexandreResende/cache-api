import { EventEmitter } from 'events';

import { CACHE } from '../Events';
import { logger } from '../Logger';
import { IBaseCommand } from './IBaseCommand';
import { IDeleteEntryCacheRepository } from '../repositories/ICacheRepository';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'DeleteCacheEntryCommand', useClass: DeleteCacheEntryCommand }])
export default class DeleteCacheEntryCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cache: IDeleteEntryCacheRepository,
  ) {}

  async execute(events: EventEmitter, payload: { key: string }): Promise<void | boolean> {
    await this.cache.deleteKey(payload.key);

    logger.info(`Deleted cache entry which key is ${payload.key}`);

    return events.emit(CACHE.CACHE_ENTRY_DELETED, {});
  }
}