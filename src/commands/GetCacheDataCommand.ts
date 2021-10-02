import { EventEmitter } from "events";

import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";

type getCacheData = { key: string };

interface ICache {
  get(key: string): object;
  set(): void;
}

export default class GetCacheDataCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache: ICache,
  ) {}

  async execute(payload: getCacheData): Promise<void | boolean> {
    const cachedData = this.cache.get(payload.key);

    this.events.emit(CACHE.CACHE_RETRIEVED_EVENT, cachedData);
  }
}