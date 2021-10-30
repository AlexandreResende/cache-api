import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import { CACHE } from '../../Events';
import Controller from '../Controller';
import { HttpResponseHandler } from '../ResponseHandler';
import GetCacheDataCommand from '../../commands/GetCacheDataCommand';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: GetCacheDataController }])
export class GetCacheDataController extends Controller {
  constructor(
    @inject('GetCacheDataCommand') private readonly getCacheDataCommand: GetCacheDataCommand
  ) {
    super('get', '/cache/:key');
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    const cacheDataRetrieved = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };
    const cacheDataNotFound = (data: object) => {
      return HttpResponseHandler.sendCreated(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheDataRetrieved);
    events.on(CACHE.CACHE_NOT_FOUND_EVENT, cacheDataNotFound);

    await this.getCacheDataCommand.execute(events, { key: req.params.key });
  }
}