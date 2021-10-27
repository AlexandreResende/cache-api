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
    super('get', '/cache');
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    console.log('INSIDE CONTROLLER!!!!!');
    const cacheDataRetrieved = (data: object) => {
      console.log('response2222', data);
      return HttpResponseHandler.sendSuccess(res, data);
    };
    const cacheDataNotFound = (data: object) => {
      console.log('response2222', data);
      return HttpResponseHandler.sendCreated(res, data);
    };
    console.log('+++++++++++=');
    const events = new EventEmitter();
    events.on(CACHE.CACHE_RETRIEVED_EVENT, cacheDataRetrieved);
    events.on(CACHE.CACHE_NOT_FOUND_EVENT, cacheDataNotFound);
    console.log('==============');

    console.log(this.getCacheDataCommand);

    await this.getCacheDataCommand.execute(events, { key: req.params.key });
  }
}