import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import GetAllStoredKeysCommand from '../../commands/GetAllStoredKeysCommand';

import { CACHE } from '../../Events';
import Controller from '../Controller';
import { HttpResponseHandler } from '../ResponseHandler';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: GetAllStoredKeysController }])
export class GetAllStoredKeysController extends Controller {
  constructor(
    @inject('GetAllStoredKeysCommand') private readonly command: GetAllStoredKeysCommand,
  ) {
    super('get', '/cache/keys');
  }

  async handleRequest(_: Request, res: Response): Promise<void> {
    const keysRetrieved = (data: object) => {
      return HttpResponseHandler.sendSuccess(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.GET_ALL_STORED_KEYS_EVENT, keysRetrieved);

    await this.command.execute(events);
  }
}