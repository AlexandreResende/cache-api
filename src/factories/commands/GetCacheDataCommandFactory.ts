import { EventEmitter } from "events";

import { ICommandFactory } from "../ICommandFactory";
import GetCacheDataCommand from "../../commands/GetCacheDataCommand";

export class GetCacheDataCommandFactory implements ICommandFactory  {
  create(events: EventEmitter) {
    const cache = {
      get: (key: string) => { return { message: `key gotten: ${key}`} },
      set: () => { return undefined; },
    };

    return new GetCacheDataCommand(events, cache);
  }
}