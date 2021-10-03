import { EventEmitter } from "events";

import { collections } from "../../infra/db";
import { ICommandFactory } from "../ICommandFactory";
import { IBaseCommand } from "../../commands/IBaseCommand";
import CacheRepository from "../../repositories/CacheRepository";
import CreateCacheEntryCommand from "../../commands/CreateCacheEntryCommand";

export class CreateCacheEntryCommandFactory implements ICommandFactory  {
  async create(events: EventEmitter): Promise<IBaseCommand> {
    const collection = (await collections())["dummy"];
    const cache = new CacheRepository(collection);

    return new CreateCacheEntryCommand(events, cache);
  }
}