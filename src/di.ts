import { EventEmitter } from "events";

import { IBaseCommand } from "./commands/IBaseCommand";
import { ICommandFactory } from "./factories/ICommandFactory";
import { GetCacheDataCommandFactory } from "./factories/commands/GetCacheDataCommandFactory";

export default class Container {
  private static readonly commandFactories:  Record<string, ICommandFactory> = {
    ["getCacheDataCommand"]: new GetCacheDataCommandFactory(),
  };

  public static resolve(commandName: string, events: EventEmitter): IBaseCommand {
    return this.commandFactories[commandName].create(events);
  };
}
