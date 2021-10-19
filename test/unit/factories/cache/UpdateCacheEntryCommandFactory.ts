import sinon from "sinon";
import { EventEmitter } from "events";

import UpdateCacheEntryCommand from "../../../../src/commands/UpdateCacheEntryCommand";
import { IUpdateCacheEntryRepository } from "../../../../src/repositories/ICacheRepository";

export function updateCacheEntryFactory(
  events: EventEmitter,
  cache: Partial<IUpdateCacheEntryRepository> = {},
) {
  const update = sinon.stub();
  const updateWithId = sinon.stub();

  return new UpdateCacheEntryCommand(
    events,
    { update, updateWithId, ...cache },
  );
}