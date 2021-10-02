import { EventEmitter } from "events";

import { IBaseCommand } from "./commands/IBaseCommand";
import { ICommandFactory } from "./factories/ICommandFactory";
import { GetCacheDataCommandFactory } from "./factories/commands/GetCacheDataCommandFactory";
import { GetAllStoredKeysCommandFactory } from "./factories/commands/GetAllStoredKeysCommandFactory";

export default class Container {
  private static readonly commandFactories:  Record<string, ICommandFactory> = {
    ["getCacheDataCommand"]: new GetCacheDataCommandFactory(),
    ["getAllStoredKeysCommand"]: new GetAllStoredKeysCommandFactory(),
  };

  public static async resolve(commandName: string, events: EventEmitter): Promise<IBaseCommand> {
    return this.commandFactories[commandName].create(events);
  };
}
