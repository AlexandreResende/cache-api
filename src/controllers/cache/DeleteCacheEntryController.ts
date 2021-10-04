import { EventEmitter } from "events";
import { Request, Response } from "express";

import { CACHE } from "../../Events";
import Container from "../../di";
import { HttpResponseHandler } from "../ResponseHandler";

export class DeleteCacheEntryController {
  async handleRequest(req: Request, res: Response): Promise<void> {
    const key = req.params.key;
    const cacheEntryDeleted = (data: object) => {
      return HttpResponseHandler.sendNoContent(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CACHE_ENTRY_DELETED, cacheEntryDeleted);

    const command = await Container.resolve("deleteCacheEntryCommand", events);

    await command.execute({ key });
  }
}