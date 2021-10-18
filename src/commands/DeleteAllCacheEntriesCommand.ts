import { EventEmitter } from "events";

import { CACHE } from '../Events';
import { logger } from "../Logger";
import { IBaseCommand } from "./IBaseCommand";
import { IDeleteAllCacheRepository } from "../repositories/ICacheRepository";

export default class DeleteAllCacheEntriesCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: IDeleteAllCacheRepository,
  ) {}

  async execute(): Promise<void | boolean> {
    await this.cache.deleteAll();

    logger.info("Deleted all cache entries");

    return this.events.emit(CACHE.ALL_CACHE_ENTRIES_DELETED, {});
  }
}