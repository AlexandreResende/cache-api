import { EventEmitter } from "events";
import { Request, Response } from "express";
import joi from "joi";

import { CACHE } from "../../Events";
import Container from "../../di";
import { HttpResponseHandler } from "../ResponseHandler";
import Joi from "joi";

export class CreateCacheEntryController {
  async handleRequest(req: Request, res: Response): Promise<void> {
    const schema = Joi.object({
      key: Joi.string().required(),
      data: Joi.string().required(),
    });
    const payload = req.body;

    const payloadValidation = schema.validate(payload);

    if (payloadValidation.error) {
      return HttpResponseHandler.sendBadRequest(res, payloadValidation.error.details);
    }

    const cacheEntryCreated = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CREATE_CACHE_ENTRY, cacheEntryCreated);

    const command = await Container.resolve("createCacheEntryCommand", events);

    await command.execute(req.body);
  }
}