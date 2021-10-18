import sinon from "sinon";
import { EventEmitter } from "events";

import { IDeleteAllCacheRepository } from "../../../../src/repositories/ICacheRepository";
import DeleteAllCacheEntriesCommand from "../../../../src/commands/DeleteAllCacheEntriesCommand";

export function deleteAllCacheEntriesFactory(
  events: EventEmitter,
  cache: Partial<IDeleteAllCacheRepository> = {},
) {
  const deleteAll = sinon.stub();

  return new DeleteAllCacheEntriesCommand(
    events,
    { deleteAll, ...cache },
  );
}