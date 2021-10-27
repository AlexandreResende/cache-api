import { EventEmitter } from 'events';

import { CACHE } from '../Events';
import { logger } from '../Logger';
import { IBaseCommand } from './IBaseCommand';
import { IDeleteAllCacheRepository } from '../repositories/ICacheRepository';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'DeleteAllCacheEntriesCommand', useClass: DeleteAllCacheEntriesCommand }])
export default class DeleteAllCacheEntriesCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cache: IDeleteAllCacheRepository,
  ) {}

  async execute(events: EventEmitter, ): Promise<void | boolean> {
    await this.cache.deleteAll();

    logger.info('Deleted all cache entries');

    return events.emit(CACHE.ALL_CACHE_ENTRIES_DELETED, {});
  }
}