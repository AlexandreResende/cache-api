import { EventEmitter } from "events";

import { collections } from "../../infra/db";
import { ICommandFactory } from "../ICommandFactory";
import { IBaseCommand } from "../../commands/IBaseCommand";
import CacheRepository from "../../repositories/CacheRepository";
import UpdateCacheEntryCommand from "../../commands/UpdateCacheEntryCommand";

export class UpdateCacheEntryCommandFactory implements ICommandFactory  {
  async create(events: EventEmitter): Promise<IBaseCommand> {
    const collection = (await collections())["dummy"];
    const cache = new CacheRepository(collection);

    return new UpdateCacheEntryCommand(events, cache);
  }
}