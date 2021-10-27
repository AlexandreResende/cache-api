import EventEmitter from 'events';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import { CACHE } from '../Events';
import { logger } from '../Logger';
import { CacheData, IGetOldestEntryRepository, IUpdateCacheEntryRepository } from '../repositories/ICacheRepository';
import { IBaseCommand } from './IBaseCommand';

type GetCacheData = { key: string, data: CacheData };

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'UpdateOldestEntryCommand', useClass: UpdateOldestEntryCommand }])
export class UpdateOldestEntryCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cacheRepository: IGetOldestEntryRepository & IUpdateCacheEntryRepository,
  ) {}

  async execute(events: EventEmitter, payload: GetCacheData): Promise<void | boolean> {
    logger.info('Getting oldest entry');
    const oldestEntry = await this.cacheRepository.getOldestEntry();

    logger.info(`Updating oldest entry which key is ${oldestEntry.key}`);
    await this.cacheRepository.updateWithId(oldestEntry._id, payload);

    return events.emit(CACHE.UPDATED_OLDEST_ENTRY, { key: payload.key, data: payload.data });
  }
}