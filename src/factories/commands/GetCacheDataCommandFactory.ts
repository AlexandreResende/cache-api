import { EventEmitter } from "events";

import { ICommandFactory } from "../ICommandFactory";
import GetCacheDataCommand from "../../commands/GetCacheDataCommand";

export class GetCacheDataCommandFactory implements ICommandFactory  {
  create(events: EventEmitter) {
    const cache = {
      get: () => { return { message: 'got cache message' } },
      set: () => { return undefined; },
    };

    return new GetCacheDataCommand(events, cache);
  }
}