import sinon from "sinon";
import { EventEmitter } from "events";

import { ICache } from "../../../../src/repositories/ICacheRepository";
import CreateCacheEntryCommand from "../../../../src/commands/CreateCacheEntryCommand";

export function createCacheEntryFactory(
  events: EventEmitter,
  cache: Partial<ICache> = {},
) {
  const get = sinon.stub();
  const set = sinon.stub();
  const isCacheFull = sinon.stub();
  const getOldestEntry = sinon.stub();
  const update = sinon.stub();
  const updateWithId = sinon.stub();

  return new CreateCacheEntryCommand(
    events,
    { set, get, isCacheFull, getOldestEntry, updateWithId, update, ...cache }
  );
}