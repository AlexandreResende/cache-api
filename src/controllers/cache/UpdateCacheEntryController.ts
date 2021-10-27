import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import UpdateCacheEntryCommand from '../../commands/UpdateCacheEntryCommand';

import { CACHE } from '../../Events';
import Controller from '../Controller';
import { HttpResponseHandler } from '../ResponseHandler';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: UpdateCacheEntryController }])
export class UpdateCacheEntryController extends Controller {
  constructor(
    @inject('UpdateCacheEntryCommand') private readonly command: UpdateCacheEntryCommand,
  ) {
    super('put', '/cache');
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    const updateCacheEntryCreated = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CACHE_ENTRY_UPDATED, updateCacheEntryCreated);

    await this.command.execute(events, req.body);
  }
}