import { EventEmitter } from "events";

import { CACHE } from '../Events';
import { logger } from "../Logger";
import { IBaseCommand } from "./IBaseCommand";
import { IDeleteEntryCacheRepository } from "../repositories/ICacheRepository";

export default class DeleteCacheEntryCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: IDeleteEntryCacheRepository,
  ) {}

  async execute(payload: { key: string }): Promise<void | boolean> {
    await this.cache.deleteKey(payload.key);

    logger.info(`Deleted cache entry which key is ${payload.key}`);

    return this.events.emit(CACHE.CACHE_ENTRY_DELETED, {});
  }
}