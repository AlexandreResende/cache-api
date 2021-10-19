import sinon from "sinon";
import { EventEmitter } from "events";

import { IDeleteEntryCacheRepository } from "../../../../src/repositories/ICacheRepository";
import DeleteCacheEntryCommand from "../../../../src/commands/DeleteCacheEntryCommand";

export function deleteCacheEntryFactory(
  events: EventEmitter,
  cache: Partial<IDeleteEntryCacheRepository> = {},
) {
  const deleteKey = sinon.stub();

  return new DeleteCacheEntryCommand(
    events,
    { deleteKey, ...cache },
  );
}