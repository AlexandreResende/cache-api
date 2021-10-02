import { EventEmitter } from "events";
import { Request, Response } from "express";

import { CACHE } from "../../Events";
import Container from "../../di";
import { HttpResponseHandler } from "../ResponseHandler";

export class GetCacheDataController {
  async handleRequest(req: Request, res: Response): Promise<void> {
    const cacheDataRetrieved = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };
    const cacheDataNotFound = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    }

    const events = new EventEmitter();
    events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheDataRetrieved);
    events.on(CACHE.CACHE_NOT_FOUND_EVENT, cacheDataNotFound);

    const command = Container.resolve("getCacheDataCommand", events);

    await command.execute({ key: req.params.key });
  }
}