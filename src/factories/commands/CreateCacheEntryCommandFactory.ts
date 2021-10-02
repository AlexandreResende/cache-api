import { EventEmitter } from "events";

import { database } from "../../infra/db";
import { ICommandFactory } from "../ICommandFactory";
import { IBaseCommand } from "../../commands/IBaseCommand";
import CacheRepository from "../../repositories/CacheRepository";
import CreateCacheEntryCommand from "../../commands/CreateCacheEntryCommand";

export class CreateCacheEntryCommandFactory implements ICommandFactory  {
  async create(events: EventEmitter): Promise<IBaseCommand> {
    const db = await database();
    const cache = new CacheRepository(db);

    return new CreateCacheEntryCommand(events, cache);
  }
}