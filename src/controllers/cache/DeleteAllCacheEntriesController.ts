import { EventEmitter } from "events";
import { Request, Response } from "express";

import { CACHE } from "../../Events";
import Container from "../../di";
import { HttpResponseHandler } from "../ResponseHandler";

export class DeleteAllCacheEntriesController {
  async handleRequest(_: Request, res: Response): Promise<void> {
    const allCacheEntryDeleted = (data: object) => {
      return HttpResponseHandler.sendNoContent(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.ALL_CACHE_ENTRIES_DELETED, allCacheEntryDeleted);

    const command = await Container.resolve("deleteAllCacheEntriesCommand", events);

    await command.execute();
  }
}