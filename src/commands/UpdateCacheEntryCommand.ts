import { EventEmitter } from "events";

import { CACHE } from '../Events';
import { logger } from "../Logger";
import { IBaseCommand } from "./IBaseCommand";
import { IUpdateCacheEntryRepository } from "../repositories/ICacheRepository";

export default class UpdateCacheEntryCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: IUpdateCacheEntryRepository,
  ) {}

  async execute(payload: { key: string, data: string }): Promise<void | boolean> {
    await this.cache.update(payload.key, payload.data);

    logger.info(`Update cache entry which key is ${payload.key}`);

    return this.events.emit(CACHE.CACHE_ENTRY_UPDATED, {});
  }
}