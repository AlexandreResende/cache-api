import { EventEmitter } from "events";
import { Request, Response } from "express";

import { CACHE } from "../../Events";
import Container from "../../di";
import { HttpResponseHandler } from "../ResponseHandler";

export class UpdateCacheEntryController {
  async handleRequest(req: Request, res: Response): Promise<void> {
    const updateCacheEntryCreated = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CACHE_ENTRY_UPDATED, updateCacheEntryCreated);

    const command = await Container.resolve("updateCacheEntryCommand", events);

    await command.execute(req.body);
  }
}