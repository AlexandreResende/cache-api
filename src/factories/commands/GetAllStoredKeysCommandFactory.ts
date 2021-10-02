import { EventEmitter } from "events";

import { database } from "../../infra/db";
import { ICommandFactory } from "../ICommandFactory";
import { IBaseCommand } from "../../commands/IBaseCommand";
import CacheRepository from "../../repositories/CacheRepository";
import GetAllStoredKeysCommand from "../../commands/GetAllStoredKeysCommand";

export class GetAllStoredKeysCommandFactory implements ICommandFactory  {
  async create(events: EventEmitter): Promise<IBaseCommand> {
    const db = await database();
    const cache = new CacheRepository(db);

    return new GetAllStoredKeysCommand(events, cache);
  }
}