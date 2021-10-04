import { EventEmitter } from "events";
import { Request, Response } from "express";

import { CACHE } from "../../Events";
import Container from "../../di";
import { HttpResponseHandler } from "../ResponseHandler";

export class GetAllStoredKeysController {
  async handleRequest(_: Request, res: Response): Promise<void> {
    const keysRetrieved = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.GET_ALL_STORED_KEYS_EVENT, keysRetrieved);

    const command = await Container.resolve("getAllStoredKeysCommand", events);

    await command.execute();
  }
}