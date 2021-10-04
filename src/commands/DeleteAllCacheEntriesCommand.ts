import { EventEmitter } from "events";
import faker from "faker";

import { logger } from "../Logger";
import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";
import { IDeleteAllCacheRepository } from "../repositories/ICacheRepository";

export default class DeleteAllCacheEntriesCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: IDeleteAllCacheRepository,
  ) {}

  async execute(): Promise<void | boolean> {
    await this.cache.deleteAll();

    return this.events.emit(CACHE.ALL_CACHE_DATA_DELETED, {});
  }
}