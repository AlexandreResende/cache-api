import { EventEmitter } from 'events';
import { Request, Response } from 'express';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import { CACHE } from '../../Events';
import { HttpResponseHandler } from '../ResponseHandler';
import DeleteAllCacheEntriesCommand from '../../commands/DeleteAllCacheEntriesCommand';
import Controller from '../Controller';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: DeleteAllCacheEntriesController }])
export class DeleteAllCacheEntriesController extends Controller {
  constructor(
    @inject('DeleteAllCacheEntriesCommand') public readonly command: DeleteAllCacheEntriesCommand,
  ) {
    super('delete', '/cache');
  }

  async handleRequest(_: Request, res: Response): Promise<void> {
    const allCacheEntryDeleted = (data: object) => {
      return HttpResponseHandler.sendNoContent(res, data);
    };

    const events = new EventEmitter();
    events.on(CACHE.ALL_CACHE_ENTRIES_DELETED, allCacheEntryDeleted);


    await this.command.execute(events);
  }
}