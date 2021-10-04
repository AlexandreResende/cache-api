import { EventEmitter } from "events";

import { IBaseCommand } from "./commands/IBaseCommand";
import { ICommandFactory } from "./factories/ICommandFactory";
import { GetCacheDataCommandFactory } from "./factories/commands/GetCacheDataCommandFactory";
import { GetAllStoredKeysCommandFactory } from "./factories/commands/GetAllStoredKeysCommandFactory";
import { CreateCacheEntryCommandFactory } from "./factories/commands/CreateCacheEntryCommandFactory";
import { DeleteCacheEntryCommandFactory } from "./factories/commands/DeleteCacheEntryCommandFactory";
import { DeleteAllCacheEntriesCommandFactory } from "./factories/commands/DeleteAllCacheEntriesCommandFactory";

export default class Container {
  private static readonly commandFactories:  Record<string, ICommandFactory> = {
    ["getCacheDataCommand"]: new GetCacheDataCommandFactory(),
    ["getAllStoredKeysCommand"]: new GetAllStoredKeysCommandFactory(),
    ["createCacheEntryCommand"]: new CreateCacheEntryCommandFactory(),
    ["deleteCacheEntryCommand"]: new DeleteCacheEntryCommandFactory(),
    ["deleteAllCacheEntriesCommand"]: new DeleteAllCacheEntriesCommandFactory(),
  };

  public static async resolve(commandName: string, events: EventEmitter): Promise<IBaseCommand> {
    return this.commandFactories[commandName].create(events);
  };
}
