import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import Joi from 'joi';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import { CACHE } from '../../Events';
import { HttpResponseHandler } from '../ResponseHandler';
import CreateCacheEntryCommand from '../../commands/CreateCacheEntryCommand';
import Controller from '../Controller';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: CreateCacheEntryController }])
export class CreateCacheEntryController extends Controller {
  constructor(
    @inject('CreateCacheEntryCommand') public readonly command: CreateCacheEntryCommand,
  ) {
    super('post', '/cache');
  }

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
      return HttpResponseHandler.sendCreated(res, data);
    };
    const cacheOperationSuccess = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };
    const cacheKeyAlreadyExists = (data: object) => {
      return HttpResponseHandler.sendConflict(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CREATE_CACHE_ENTRY, cacheEntryCreated);
    events.on(CACHE.CACHE_KEY_ALREADY_EXISTS, cacheKeyAlreadyExists);
    events.on(CACHE.UPDATED_OLDEST_ENTRY, cacheOperationSuccess);

    await this.command.execute(events, req.body);
  }
}