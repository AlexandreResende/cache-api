import { EventEmitter } from "events";
import faker from "faker";

import { logger } from "../Logger";
import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";
import { IDeleteEntryCacheRepository } from "../repositories/ICacheRepository";

export default class DeleteCacheEntryCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: IDeleteEntryCacheRepository,
  ) {}

  async execute(payload: { key: string }): Promise<void | boolean> {
    await this.cache.deleteKey(payload.key);

    return this.events.emit(CACHE.CACHE_ENTRY_DELETED, {});
  }
}