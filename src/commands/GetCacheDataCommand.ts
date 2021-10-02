import { EventEmitter } from "events";

import { CACHE } from '../Events';
import { IBaseCommand } from "./IBaseCommand";

type getCacheData = { key: string };

export default class GetCacheDataCommand implements IBaseCommand {
  constructor(
    private readonly events: EventEmitter,
    private readonly cache = { get: (key: string) => { return { message: 'key gotten' } }, set: () => {} },
  ) {}

  async execute(payload: getCacheData): Promise<void | boolean> {
    return this.events.emit(CACHE.CACHE_RETRIEVED_EVENT, this.cache.get(payload.key));
  }
}