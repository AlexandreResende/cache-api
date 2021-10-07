import sinon from "sinon";
import { EventEmitter } from "events";

import { ICache } from "../../../../src/repositories/ICacheRepository";
import CreateCacheEntryCommand from "../../../../src/commands/CreateCacheEntryCommand";
import { updateOldestEntryFactory } from "./UpdateOldestEntryCommandFactory";

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
  const updateOldestEntryCommand = updateOldestEntryFactory(
    events,
    { getOldestEntry, update, updateWithId, ...cache }
  );

  return new CreateCacheEntryCommand(
    events,
    { set, get, isCacheFull, getOldestEntry, updateWithId, update, ...cache },
    updateOldestEntryCommand,
  );
}