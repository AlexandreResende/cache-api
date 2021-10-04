import { EventEmitter } from "events";

import { logger } from "../Logger";
import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";
import { IFindAllKeysCacheRepository } from "../repositories/ICacheRepository";

type getCacheData = { key: string };

export default class GetAllStoredKeysCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: IFindAllKeysCacheRepository,
  ) {}

  async execute(): Promise<void | boolean> {
    logger.info("Getting all stored keys");
    const keys = await this.cache.getAllKeys();

    return this.events.emit(CACHE.GET_ALL_STORED_KEYS_EVENT, { keys });
  }
}