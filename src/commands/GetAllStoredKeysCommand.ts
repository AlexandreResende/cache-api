import { EventEmitter } from 'events';

import { logger } from '../Logger';
import { CACHE } from '../Events';
import { IBaseCommand } from './IBaseCommand';
import { IFindAllKeysCacheRepository } from '../repositories/ICacheRepository';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

type getCacheData = { key: string };

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'GetAllStoredKeysCommand', useClass: GetAllStoredKeysCommand }])
export default class GetAllStoredKeysCommand implements IBaseCommand {
  constructor(
    @inject('CacheRepository') private readonly cache: IFindAllKeysCacheRepository,
  ) {}

  async execute(events: EventEmitter, ): Promise<void | boolean> {
    logger.info('Getting all stored keys');
    const keys = await this.cache.getAllKeys();

    return events.emit(CACHE.GET_ALL_STORED_KEYS_EVENT, { keys });
  }
}