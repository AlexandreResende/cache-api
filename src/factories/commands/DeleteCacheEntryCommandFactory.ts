import { EventEmitter } from "events";

import { collections } from "../../infra/db";
import { ICommandFactory } from "../ICommandFactory";
import { IBaseCommand } from "../../commands/IBaseCommand";
import CacheRepository from "../../repositories/CacheRepository";
import DeleteCacheEntryCommand from "../../commands/DeleteCacheEntryCommand";

export class DeleteCacheEntryCommandFactory implements ICommandFactory  {
  async create(events: EventEmitter): Promise<IBaseCommand> {
    const collection = (await collections())["dummy"];
    const cache = new CacheRepository(collection);

    return new DeleteCacheEntryCommand(events, cache);
  }
}