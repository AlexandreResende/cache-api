import sinon from "sinon";
import { EventEmitter } from "events";

import { ICache } from "../../../../src/repositories/ICacheRepository";
import GetCacheDataCommand from "../../../../src/commands/GetCacheDataCommand";

export function getCacheDataCommandFactory(
  events: EventEmitter,
  cache: Partial<ICache>
) {
  const get = sinon.stub();
  const set = sinon.stub();

  return new GetCacheDataCommand(
    events,
    { get, set, ...cache }
  );
}