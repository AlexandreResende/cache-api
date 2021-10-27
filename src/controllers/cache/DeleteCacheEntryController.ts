import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import DeleteCacheEntryCommand from '../../commands/DeleteCacheEntryCommand';

import { CACHE } from '../../Events';
import Controller from '../Controller';
import { HttpResponseHandler } from '../ResponseHandler';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: DeleteCacheEntryController }])
export class DeleteCacheEntryController extends Controller {
  constructor(
    @inject('DeleteCacheEntryCommand') public readonly command: DeleteCacheEntryCommand,
  ) {
    super('delete', '/cache/:key');
  }

  async handleRequest(req: Request, res: Response): Promise<void> {
    const key = req.params.key;
    const cacheEntryDeleted = (data: object) => {
      return HttpResponseHandler.sendNoContent(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.CACHE_ENTRY_DELETED, cacheEntryDeleted);

    await this.command.execute(events, { key });
  }
}